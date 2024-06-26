---
favorite: true
title: Blog update - using pre-commit hook to upload local media to supabase bucket
description: Replacing the manual steps of uploading media and replacing the media references in my blog markdown files
date: 2024-06-24
published: true
---
This blog post outlines the steps I took to automate uploading local media to Supabase and referencing the remote file. 

When I first started this markdown based blog, I referenced local images and uploaded them to github. I realized this was a problem when I tried adding a large number of images to git and received the error that my commit was too large - filesizewise. 

I migrated to using Supabase Buckets - a user friendly wrapper on top of an Amazon S3 bucket - to upload my media to and reference in my posts. This way, I'm not committing my media - just the remote reference to it. This adds a few additional steps though - manually uploading the file to Supabase, copying the URL and referencing the remote url in my markdown. This automates that process using a node script and a `pre-commit hook` that will run when I fire off a `git commit` command. 

My development steps as as follow - using `Bun` to run `TypeScript`
1. upload media files to Supabase bucket
2. find local media references
3. replace local media references with remote references in blog
4. delete local media files 
5. Put together full script to find local files, upload them to Supabase, replace the local references to remote and delete all the local files 
6. Orchestrate script with pre-commit hook

Full script [here](https://github.com/nspilman/natespilmandotcom/blob/main/src/lib/upload-media.ts) 
## Uploading Media Files to Supabase Bucket

In this section, we'll focus on the `uploadFile` function, which handles the process of uploading media files to a Supabase bucket.

```typescript
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const bucketName = "natespilmanblog";
const storageEndpoint = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}`;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "SUPABASE_URL and SUPABASE_KEY must be set in environment variables"
  );
}

const bucketName = 'natespilmanblog'

const uploadFile = async ({
  filepath,
  destinationDirName,
}: {
  filepath: string;
  destinationDirName: string;
}) => {
  try {
    const fileContent = await fs.readFile(`/${filepath}`);

    const filename = filepath.split("/")[filepath.split("/").length - 1];
    const uploadFilePath = `${destinationDirName}/${filename}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(uploadFilePath, fileContent, {
        contentType: "image/jpeg",
        cacheControl: "3600",
        upsert: true,
      });

    const successPayload = {
      status: "success" as const,
      localFilepath: filepath,
      remoteFilepath: `${storageEndpoint}/${uploadFilePath}`,
    };

    if (error) {
      if (error.message === "The resource already exists") {
        console.log("File uploaded successfully:", data);

        return successPayload;
      } else {
        console.error("Error uploading file:", error);
      }
      return {
        status: "error" as const,
        message: error.message,
        localFilepath: filepath,
      };
    } else {
      console.log("File uploaded successfully:", data);
      return successPayload;
    }
  } catch (error) {
    console.error("Error reading or uploading file:", error);
    return {
      status: "error" as const,
      message: "Error reading or uploading file",
      localFilepath: filepath,
    };
  }
};
```

This function reads the file content, constructs the upload path, and uses the Supabase client to upload the file to the specified bucket. It handles both successful uploads and potential errors, returning a status object with relevant information.

## Step 2 - Finding Local Media References

The `findLocalMediaReferences` function scans Markdown files for local media references:

```typescript
import fs from "fs/promises";
import path from "path";

async function findLocalMediaReferences(contentDir: string): Promise<
  {
    fullPath: string;
    destinationDirName: string;
  }[]
> {
  const mediaFiles: {
    fullPath: string;
    destinationDirName: string;
  }[] = [];

  // Find all .md files in the content directory
  const allFiles = await walkDir(contentDir);
  const mdFiles = allFiles.filter((file) => path.extname(file) === ".md");

  for (const file of mdFiles) {
    const content = await fs.readFile(file, "utf-8");

    // Regular expression to match Markdown image and link syntax
    const mediaRegex =
      /!\[.*?\]\(((?!http|https:\/\/).*?)\)|(?<!!)\[.*?\]\(((?!http|https:\/\/).*?)\)/g;

    const destinationDirName = file.split("/")[1].split(".")[0];

    let match;
    while ((match = mediaRegex.exec(content)) !== null) {
      const mediaPath = match[1] || match[2];
      if (isMediaFile(mediaPath)) {
        const fullPath = path
          .resolve(path.dirname(file), mediaPath)
          .split("/")
          .slice(1)
          .join("/")
          .split(" ")[0];
        mediaFiles.push({ fullPath, destinationDirName });
      }
    }
  }

  return mediaFiles;
}
```
This function uses a regular expression to find local media references in Markdown files, excluding external URLs. It returns an array of objects containing the full path and destination directory name for each media file.

## Step 3 - Replacing Local Media References with Remote References

The `replaceLocalReferenceWithRemote` function updates the Markdown files to use the new remote URLs:

javascript

Copy

```typescript
async function walkDir(dir: string): Promise<string[]> {
  const files = await fs.readdir(dir);
  const paths = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file);
      const stats = await fs.stat(filePath);
      if (stats.isDirectory()) return walkDir(filePath);
      else if (stats.isFile()) return filePath;
      return [];
    })
  );
  return paths.flat();
}

async function replaceLocalReferenceWithRemote(
  status:
    | {
        status: "success";
        localFilepath: string;
        remoteFilepath: string;
      }
    | {
        status: "error";
        localFilepath: string;
        message: string;
      }
) {
  if (status.status !== "success") {
    console.log(
      `Skipping update for ${status.localFilepath} due to non-success status`
    );
    return;
  }

  const contentDir = "./blog"; // Adjust this to your content directory
  const allFiles = await walkDir(contentDir);
  const mdFiles = allFiles.filter((file) => path.extname(file) === ".md");

  for (const file of mdFiles) {
    let content = await fs.readFile(file, "utf-8");

    // Escape special characters in the local filepath for use in regex
    const filename =
      status.localFilepath.split("/")[
        status.localFilepath.split("/").length - 1
      ];
    const escapedLocalPath = filename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Create a regex that matches the local filepath, accounting for possible relative paths and an optional preceding slash
    const localPathRegex = new RegExp(
      `(\\.\\.?\\/)*\\/?${escapedLocalPath}`,
      "g"
    );

    if (localPathRegex.test(content)) {
      // Replace all occurrences of the local path with the remote path, preserving any preceding slash
      content = content.replace(localPathRegex, (match) => {
        const hasLeadingSlash = match.startsWith("/");
        return hasLeadingSlash
          ? `/${status.remoteFilepath}`
          : status.remoteFilepath;
      });

      // Write updated content back to the file
      await fs.writeFile(file, content, "utf-8");
      console.log(
        `Updated references to ${status.localFilepath} in file: ${file}`
      );
      deleteLocalFile(`/${status.localFilepath}`);
    }
  }
}
```
This function replaces all occurrences of the local file path with the new remote URL in the Markdown files, preserving any leading slashes.

## Step 4 - Deleting Local Media Files
After uploading and updating references, we delete the local media files:

```typescript
async function deleteLocalFile(filepath: string) {
  try {
    await fs.unlink(filepath);
    console.log(`Deleted local file: ${filepath}`);
  } catch (error) {
    console.error(`Error deleting local file ${filepath}:`, error);
  }
}
```

This function is called after successfully updating the references in the Markdown files.

## Step 5 - Putting Together the Full Script

The `main` function orchestrates the entire process:

```typescript
const main = async () => {
  const contentDirectory = "./blog"; // Adjust this to your content directory
  await findLocalMediaReferences(contentDirectory)
    .then((files) =>
      files.forEach(async ({ fullPath, destinationDirName }) => {
        const status = await uploadFile({
          filepath: fullPath,
          destinationDirName,
        });
        replaceLocalReferenceWithRemote(status);
      })
    )
    .catch((error) => console.error("Error finding local media files:", error));
};
```


This function ties together all the previous steps: finding local media references, uploading files, replacing references, and deleting local files.

## Step 6 - Orchestrating the Script with a Pre-commit Hook

To run this script automatically before each commit, you can set up a pre-commit hook in your Git repository. Create a file named `pre-commit` in the `.git/hooks/` directory of your repository with the following content:

```
#!/bin/bash

# Exit on any error
set -e

bun run upload-media
```

Make sure to make the hook executable:

`chmod +x .git/hooks/pre-commit`

Now, every time I attempt to make a commit, this script will run automatically, ensuring that all media files are uploaded to Supabase and references are updated before the commit is made.

And Tadaaaaa - right now this image is a local reference on my computer, but will be sent to Supabase and referenced there as soon as I commit my changes to git.  
![An image generated in Midjourney](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-06-24-auto-uploading-media-to-supabase-bucket-via-pre-commit-hook/Pasted-image-20240624194035.png)
