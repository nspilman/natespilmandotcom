---
favorite: true
title: Supabase bucket storage extension in Raycast
description: Uploading and view media to and from my blog supabase bucket
date: 2025-02-27
published: true
---

Aight, so now that I have my [Upload Media Raycast script](https://natespilman.com/blog/2025-02-22-media-upload-raycast-script) and my [Raycast Extension build post](https://natespilman.com/blog/2024-05-24-raycast-extensions-in-node), it's time to write myself an Extension version of the script!

![fuuuuuuuusioooooooooon HAAAAAAAAAA](https://media4.giphy.com/media/TbYgHMnICI1A4/giphy.gif)

The main thing I need to determine is how to best handle secrets. Per a conversation with [Perplexity.ai](https://www.perplexity.ai/search/raycast-extensions-how-to-hand-M4E1zXIASFa1e_Zc8oxftg), it appears that I should be using the [preferences api](https://developers.raycast.com/api-reference/preferences), and can store my secrets in my [Apple Keychain](https://support.apple.com/guide/keychain-access/what-is-keychain-access-kyca1083/mac).

First step so to copy me existing extension into my new extension dir to get something going. 

I'll also need to determine which APIs I want to hit. [Here is the API spec for Supabase buckets](https://supabase.github.io/storage/) - for safe keeping. 

## Fast Forward & it's done!
Here it is!

![A short video of me using my new bucket storage extension](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2025-02-27/blog-storage-extension/bucket-storage-extnsion-usage-demo.mp4)
	
### Permissions - 
Managing secrets is straight forward. 
1. Define your secrets as 'preferences' - [here](https://github.com/nspilman/raycast-supabase-bucket-manager/blob/main/package.json#L26)
2. configure the extension with your secrets values 

 ![configuring secrets for my Raycast extension](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2025-02-27/raycast-extension/config-raycast-extension-secrets.png)

### Multiple commands in the same extension
My extension can read and write, via two separate commands. There commands are [established in the package json](https://github.com/nspilman/raycast-supabase-bucket-manager/blob/33ca6bb637ebd237da583fcd88700a9ee58c050d/package.json#L12) , and require top-level files with the same name to serve as entry point. [for example](https://github.com/nspilman/raycast-supabase-bucket-manager/blob/main/src/upload.tsx)

### The developer experience
As a React developer, this is heaven. The API is limited, but I haven't wanted for anything unavailable. It is simple and it works. `npm run dev` runs the extension in developer mode, and then `control + c` publishes the extension to your Raycast instance. 


