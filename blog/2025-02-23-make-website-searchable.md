---
favorite: true
title: How to make this website searchable
description: An exploration on exploration
date: 2025-02-23
published: true
---
This website could use Search capabilities. If i want to reference a previous post, I need to physically go the website and find it. My idea endstate is to fire off a `Raycast` command, search how I care to and then copy the URL of the chosen post to my clipboard.

## Perplexity AI's Deep Research
I'm starting with firing off a research prompt to [perplexity.ai](perpexity.ai)'s `Deep Research` mode. 

```
I have a markdown blog in Next.js. Please give me the top 5 options for how to make the blog posts searchable.
```

[Here is the conversation](https://www.perplexity.ai/search/i-have-a-markdown-blog-in-next-0NVZvrRoRrOU5aCyvFlojA). 

## Findings
I learned a lot about Search right there. The main thing I learned, strategically, is that this is a massive topic, and I need to iteratively build this out. I am going to base this off of use case priority. 

Feature possibilities - 
- fuzzy search on title, description, tags, post content
- semantic search on title, description, tags, post content
- search by date range
- search by latest 
- caching at different layers of the stack
- real time UI feedback 
- Raycast integration 

## Plan 
I am going to start with implementing the ability to get the `n` latest posts and pipe the results into Raycast to allow me to copy the desired link to my keyboard. 

This is going to require - 
- A new API route for the search
- A new `blog-service` that is responsible for fetching the blog metadata
- The ability to show returned results in Raycast for copying.

More to come!


