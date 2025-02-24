---
favorite: true
title: Building my first Raycast Extension
description: and it was easier than I expected
date: 2025-02-24
published: true
tags:
  - blog-dev
  - raycast
  - tech
  - software
---

As a follow up from my previous post about [how to use Raycast to get my most recent blog posts](https://natespilman.com/blog/2025-02-23-retrieve-recent-blog-posts), I took it upon myself to investigate how to create a custom [Raycast extension](https://github.com/raycast/extensions) for the same purpose. 

I did not expect the development process to be so easy. 

## The end result - 

I created the extension `Get Blog Post`, which now lives in my `favorites` when I open up Raycast.

![My Raycast home panel, with my new Get Blog Posts](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2025-02-23/raycast-extensions/new-extension-in-list.jpg)

When I press Enter on the extension, it opens and makes a fetch call to my website for all of of posts. 
![](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2025-02-24/raycast-extension/extension-view.jpg)

And when I select a post, its url copies to my clipboard. 

## The setup
I'm happy to report that, as a [React](https://react.dev/) developer, this couldn't have been easier to set up. 

Raycast has its own node library with a [slim library of UI elements](https://developers.raycast.com/api-reference/user-interface/action-panel) and [React hooks](https://developers.raycast.com/utilities/react-hooks) and much more. 

For more specifics, [here are the Raycast docs.](https://developers.raycast.com/basics/create-your-first-extension)

Below is the entirety of my code - 
```tsx
import { useEffect, useState } from "react";
import { Action, ActionPanel, List } from "@raycast/api";
import { useFetch } from "@raycast/utils";

interface BlogPost {
  title: string;
  description?: string;
  slug: string;
}

export default function Command() {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredList, filterList] = useState<BlogPost[]>([]);

  const BASE_URL = "https://natespilman.com";
  const API_ENDPOINT = `${BASE_URL}/posts`;
  const BLOG_URL = `${BASE_URL}/blog`;
  
  const { data, isLoading } = useFetch<BlogPost[]>(API_ENDPOINT);
  console.log({filteredList})

  useEffect(() => {
    if (data) {
      filterList(
        data.filter((item) => {
          const searchLower = searchText.toLowerCase();
          return (
            (item.title?.toLowerCase() || "").includes(searchLower) || 
            (item.description?.toLowerCase() || "").includes(searchLower)
          );
        })
      );
    }
  }, [searchText, data]);

  return (
    <>
      <List
        filtering={false}
        onSearchTextChange={setSearchText}
        navigationTitle="Search Posts"
        searchBarPlaceholder="Search by title or description"
        isLoading={isLoading}
      >
        {filteredList?.map((item) => (
          <List.Item
            key={item.slug}
            title={item.title}
            subtitle={item.description}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard 
                  title="Select" 
                  content={`${BLOG_URL}/${item.slug}`} 
                />
              </ActionPanel>
            }
          />
        ))}
      </List>
    </>
  );
}
```