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

My company laid off some engineers. I survived the layoffs, but my stress response over the weekend got me to start learning Go - a programming language by Google. I'd previous written an image processing application in Python, and I was curious what it'd look like in Go. The details of that are for another post. This post is mostly yelling "Look at these cool images I made. They're cool, right?"

Before we get into the images - here's how it works kinda. I two upload images via a web UI, and I choose a blend function. One blend function gives a double exposure effect. One blend function replaces the hue - the RGB color ratio - with the hue of another image, which keeping the light values of the first image, etc. I'll demonstrate. I have some transformation settings that only take in one image.

## So first off, the double exposure blend -

![](img/2023-01-09-image-processing-in-go/flrrsBoat.jpg)

## What I like to call, the Stencil transform setting

This setting takes in 2 pictures, and replaces all the parts from the first images that are brighter than 50% brightness with the second image. What you end up with is an interesting collage type image.

![[img/2023-01-09-image-processing-in-go/xrSkiBeach.jpg]]
![[lowerManhattanStencil.jpg]]

## Hue replacement

![[img/2023-01-09-image-processing-in-go/IMG_4308.jpeg]]
![[img/2023-01-09-image-processing-in-go/treeSunset.jpg]]

## Light Quantization -

![[img/2023-01-09-image-processing-in-go/qauntCloud.jpg]]
![[img/2023-01-09-image-processing-in-go/quantizedGranada.jpg]]

Thank you for viewing. I hope you enjoyed. Let me know if you want a print.
