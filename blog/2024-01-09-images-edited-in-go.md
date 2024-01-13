---
favorite: true
title: Editing Images in GoLang
description: A Showcase of outputs
date: 2024-01-09
published: true
tags:
  - softwareEngineering
  - art
---

I started learning the Go programming language as a weekend stress response from my company laying off some great engineers. I'd previous written an image program in Python, and I was curious what it'd look like in Go. The details of that are for another post. This post is mostly yelling "Look at these cool images I made. They're cool, right?"

Before we get into the images - here's how it works kinda. I two upload images via a web UI, and I choose a blend function. One blend function gives a double exposure effect. One blend function replaces the hue - the RGB color ratio - with the hue of another image, which keeping the light values of the first image, etc. I'll demonstrate. I have some transformation settings that only take in one image.

## So first off, the double exposure blend -

![](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-01-09%20image%20editing%20in%20go/doubleExposure.jpg?t=2024-01-13T06%3A31%3A30.227Z)
![](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-01-09%20image%20editing%20in%20go/flrrsBoat.jpg?t=2024-01-13T06%3A31%3A49.289Z)

## What I like to call, the Stencil transform setting

This setting takes in 2 pictures, and replaces all the parts from the first images that are brighter than 50% brightness with the second image. What you end up with is an interesting collage type image.

![](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-01-09%20image%20editing%20in%20go/xrSkiBeach.jpg)
![](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-01-09%20image%20editing%20in%20go/lowerManhattanStencil.jpg?t=2024-01-13T06%3A42%3A10.047Z)

## Hue replacement

![](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-01-09%20image%20editing%20in%20go/IMG_4308.jpeg)
![](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-01-09%20image%20editing%20in%20go/treeSunset.jpg?t=2024-01-13T06%3A42%3A24.773Z)

## Light Quantization -

![](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-01-09%20image%20editing%20in%20go/qauntCloud.jpg?t=2024-01-13T06%3A42%3A35.646Z)
![](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-01-09%20image%20editing%20in%20go/quantizedGranada.jpg?t=2024-01-13T06%3A42%3A48.709Z)

Thank you for viewing. I hope you enjoyed. Let me know if you want a print.
