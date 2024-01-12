---
favorite: true
title: Blog Improvement Opportunities
description: How can I make this easier for myself? How can I make this a better experience for the reader?
date: 2024-01-10
published: true
tags:
  - softwareEngineering
  - blog
---
I'm excited to be writing again, but my workflow for throwing together [Images Edited in Go](2024-01-09-images-edited-in-go) was definitely suboptimal, and the end result is also not where it could be. 

## The developer experience  
The main issue I ran into was with images - how to reference them in the Obsidian editor, vs. how to reference them to render to the web. By default when I added an image, the obsidian shorthand would render `![[imageName]]`, instead of `![altText](imageName)`, so I had to manually make those updates. 

In addition, it'd be better if the images didn't live in the repo at all, but instead lived on the web and could be referenced as such. Ideally I'd have a pre-commit script that hoovers up my local images, uploads them to an S3 bucket and then replaces the references in the markdown to the remote images. To start, I'll look into [Supabase Storage](https://supabase.com/docs/guides/storage), and begin manually uploading and referencing images from there. 

I also don't have any user tracking, so I have no sense of who is actually reading these posts. 
## The site itself 
The blogposts themselves could use some better styling. Specifically, the images don't have any sort of min or max heights, so you end up with crazy display sizes depending on your monitor. Code blocks also don't render differently than normal text, and etc. 

as for styling, the mdx tutorial might be exactly what I need.  https://youtu.be/YC6LqIYVHxI?si=L2WOzKygcmZr6t74

In addition, when I share my blog post, it just says "Nate Spilman's website", and there's nothing additional in the metadata to let you know what the blog post is about. I should put the header in the meta title to fix that. 

thanks for reading!
Nate