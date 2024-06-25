import fs from "fs/promises";
import path from "path";
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

const isMediaFile = (fileName: string) => {
  const ext = path.extname(fileName).toLowerCase();
  return !!ext.length;
};

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

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
      .from("natespilmanblog")
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
async function deleteLocalFile(filepath: string) {
  try {
    await fs.unlink(filepath);
    console.log(`Deleted local file: ${filepath}`);
  } catch (error) {
    console.error(`Error deleting local file ${filepath}:`, error);
  }
}

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

main();
