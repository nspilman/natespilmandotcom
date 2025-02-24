---
favorite: true
title: Retrieving my recent blog posts with Raycast
description: Breaking ground on the blog "search" story
date: 2025-02-23
published: true
tags:
  - raycast
  - blog-dev
  - software
---
Using Raycast feels like a [Metroidvania](https://en.wikipedia.org/wiki/Metroidvania), wherein a build myself a new macro and unlock a new level. 

In [this previous post](https://natespilman.com/2025-02-23-make-website-searchable) from today, I speculate on initial implementations of making this blog searchable. 

I'm happy to report a v0, which is a Raycast script that retrieves the most recently 5 posts and their links. This is a good first step, as if I need to reference a previous post, it's probably one of the most recent ones. 

## The initial setup
I first wanted to set up a script that fetched my recent posts, then render the posts in Raycast to be able to choose between. Ultimately, that would require writing a [custom extension](https://developers.raycast.com/basics/create-your-first-extension). Up until right now while writing this, I thought extensions were for paid users only, so I kept with the script. Incoming extensions build post, I guess. 

This script calls my website api to get the blog post list and then renders the name, description and url. 

When I run it, I get this result: 
![A list of my most recent 5 blog posts, as of Sunday Feb 23, 2025.](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2025-02-23/list-posts/screenshot-of-list-command.jpg)
*This is how I referenced ["my previous post"](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2025-02-23/list-posts/post-list-result.jpg) above.*

So cool - now I can have longer chaining post over the course of a few days and reference the previous post in the beginning without having to go anywhere. Raycast rocks. 

