---
favorite: true
title: Metadata Title now dynamically rendering at build time
description: An update from the previous post
date: 2024-01-12
published: true
tags:
  - nextJs
  - softwareEngineering
  - "#blog"
---

In [Blog Improvement Opportunities](2024-01-10-blog-improvement-opportunities) I outlined some items I wanted to tackle. Dynamically updating the metadata title is now complete!

Thanks to [these docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) and some trial and error, I made the change[ in this commit](https://github.com/nspilman/natespilmandotcom/commit/96e4160022fb19d247dbf10c85791de431162cea). Now when I want to see my friends my post with some images I made, the url link that renders will include the title of the post.

![a blog post specific met title showing up on the link in iMessage](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-01-11%20updated%20metadata%20title/Pasted%20image%2020240112165030.png?t=2024-01-14T17%3A16%3A24.453Z)

now'iddn'that nice?
