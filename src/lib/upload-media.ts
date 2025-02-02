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

const CONTENT_DIR = "./blog"; // Adjust this to your content directory

const isMediaFile = (fileName: string) => {
  console.log("Checking if media file:", fileName);
  const ext = path.extname(fileName).toLowerCase();
  console.log("Extension:", ext);
  const allowedExtensions = [
    '.jpg', '.jpeg', '.png', '.gif', '.webp',  // images
    '.mp3', '.wav', '.ogg', '.m4a'             // audio
    // add more as needed
  ];
  const isAllowed = allowedExtensions.includes(ext);
  console.log("Is allowed:", isAllowed);
  return isAllowed;
};

const getContentType = (fileName: string) => {
  const ext = path.extname(fileName).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.ogg': 'audio/ogg',
    '.m4a': 'audio/mp4'
    // add more as needed
  };
  return mimeTypes[ext] || 'application/octet-stream';
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
    // Replace spaces with dashes in the filename for upload
    const dashedFilename = filename.replace(/\s+/g, '-');
    const uploadFilePath = `${destinationDirName}/${dashedFilename}`;

    const { data, error } = await supabase.storage
      .from("natespilmanblog")
      .upload(uploadFilePath, fileContent, {
        contentType: getContentType(filename),
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

  const allFiles = await walkDir(contentDir);
  const mdFiles = allFiles.filter((file) => path.extname(file) === ".md");

  for (const file of mdFiles) {
    const content = await fs.readFile(file, "utf-8");
    const mediaRegex = /!\[\[(.*?)\]\]|!\[.*?\]\(((?!http|https:\/\/).*?)\)|(?<!!)\[.*?\]\(((?!http|https:\/\/).*?)\)/g;
    const destinationDirName = file.split("/")[1].split(".")[0];

    let match;
    while ((match = mediaRegex.exec(content)) !== null) {
      let mediaPath = match[1] || match[2] || match[3];
      
      if (mediaPath.includes('http:') || mediaPath.includes('https:')) {
        continue;
      }
      
      if (mediaPath && isMediaFile(mediaPath)) {
        const fullPath = path
          .resolve(path.join(path.dirname(file), 'public', mediaPath))
          .split("/")
          .slice(1)
          .join("/");
          
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

  const allFiles = await walkDir(CONTENT_DIR);
  const mdFiles = allFiles.filter((file) => path.extname(file) === ".md");

  for (const file of mdFiles) {
    let content = await fs.readFile(file, "utf-8");

    // Get original filename with spaces
    const filename = status.localFilepath.split("/")[
      status.localFilepath.split("/").length - 1
    ];
    const escapedLocalPath = filename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Updated regex to match both standard markdown and Obsidian syntax
    const localPathRegex = new RegExp(
      `(?:!\\[\\[${escapedLocalPath}\\]\\]|(?:\\.\\.?\\/)*\\/?${escapedLocalPath})`,
      "g"
    );

    if (localPathRegex.test(content)) {
      // Ensure we're using the dashed version in the remote URL
      const dashedRemoteFilepath = status.remoteFilepath.replace(/\s+/g, '-');
      content = content.replace(localPathRegex, `![](${dashedRemoteFilepath})`);

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
  // console.log({CONTENT_DIR})
  // const contentDirectory = CONTENT_DIR // Adjust this to your content directory
  const files = await findLocalMediaReferences(CONTENT_DIR)
    console.log({files})
      return files.forEach(async ({ fullPath, destinationDirName }) => {
        console.log({fullPath, destinationDirName})
        const status = await uploadFile({
          filepath: fullPath,
          destinationDirName,
        });
        replaceLocalReferenceWithRemote(status);
      })
    // .catch((error) => console.error("Error finding local media files:", error));
};

main();
