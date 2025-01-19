---
favorite: true
title: initial 360 video learnings with the Meta Quest 3
description: What I've learned about the state of 360 video
date: 2024-07-30
published: true
---

I recently purchased a [Meta Quest 3](https://www.meta.com/quest/quest-3/), and find myself intrigued by 360 video. As the name describes, this is video that one can watch in full VR (virtual reality mode). While watching the video, the viewer can see the video in every direction they turn their head - as if the viewer is physically there. 

I wanted to answer the following questions. 
- What's the state of 360 video cameras? 
- How do I view a 360 video on the meta quest 3? 
- How is 360 video edited? 

## What's the state of 360 video cameras? 
This is the first question that came to mind, since people need access to 360 cameras to make 360 videos. I was actually surprised to see how affordable they could be. 

the [Insta360 X4](https://store.insta360.com/product/x4) is selling at the time of my writing for $500, with the [Insta360 X2](https://www.amazon.com/Insta360-Waterproof-Stabilization-Editing-Streaming/dp/B08M3B9754?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&smid=A1GLZMDF7560DH&th=1) going on amazon for as low as $300. As far as cameras are concerned, these are affordable. I enjoyed [this review](https://www.youtube.com/watch?v=rwhLYK5ONdI) of the X4 model, and the section on editing 360 video informed me of concepts I hadn't considered, such as the idea of using object tracking to keep your 360 video centered on said object. 

I expected to have another paragraph about the other companies in the mix, but Insta360 seems to be the industry leader. They also have professional cameras like this [absolute beast](https://store.insta360.com/product/titan?c=1524&from=homepage).

So in short, for consumer level 360 video, $300 will get you in the door, and $500 will get you the generally recommended model.

## How do I view 360 videos on the Meta Quest 3? 
The Meta Quest 3 has a handful of ways to view 360 videos, some more obvious than others. I'm still investigating, so please don't consider this a complete list. 

### Youtube VR

First, the YouTube VR app has plenty of 360 videos. There are a bunch of curated libraries to start with when you pull up the app, but you can also search videos like normal on the app and filter for 360 videos only. 

I search 360 concerts and found this beautiful cover of Crawling by Linkin Park performed by [Aaron Lewis of Staind](https://www.youtube.com/watch?v=WboSNjFgVVs) . I was essentially seated right in front of them as they performed on stage.

![My initial view of Aaron Lewis performing Crawling on stage with Sully Erna of Godsmack & Friends](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-07-30-intro-to-360-video/staind-singing.jpg)

and I could turn my head right to see 
![](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-07-30-intro-to-360-video/crawling-look-right.jpg)

and ever farther right -
![](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-07-30-intro-to-360-video/crawling-further-right.jpg)

I also looked up 360 videos in Sevilla. They were all short with varying video quality, but it feels wonderful to feel so immersed in Sevilla again. 

![](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-07-30-intro-to-360-video/sevilla-cathedral.jpg)

### Oculus Experiences
I found a cool 360 video company called 360 Labs - https://360labs.net/. They have a full repository of their work [here](https://360labs.net/video). When I click on one, I see an Meta Quest link in the Also On section. I'm brought to [this page](https://www.oculus.com/experiences/media/727426067594005/454911792101393/) on the Oculus website with a `Watch in Device` option. I'm logged into my Oculus account, so it recognizes that I have a Quest 3, and gives me the option to view it as long as it is on the same WiFi network. As soon as I put the device on my head, the video begins to play on the Meta Quest TV app. 

### The Meta Quest TV app 
The build in Meta Quest TV app comes loaded with a bunch of 360 video options. In addition, if you have 360s directly on your device, you can watch them within the Meta Quest TV app. Transferring files between my computer and device has been more challenging than expected, though, and I'll write a follow up post all about that as I get a better understanding of the workflow.

## Editing 360 videos 
It appears that all the major video editing solutions, Da VinciResolve, Final Cut Pro, Adobe Premiere, etc, can all be used for editing 360 video. 

Insta360, the 360 camera company from earlier, also has its own editing software. [This how to guide on their website](https://www.insta360.com/blog/tips/how-to-edit-and-reframe-360.html) . My main learning is the concept of `reframing`. Even though the video is 360, there is still a concept of what part of the video is supposed to be forward. The user can look around, but when they face forward, the part of the video that the editor determined should be front and center will be there. 

This concept of reframing can also be used to turn a 360 video into a 2d cropped video, with the frame reference point in the middle, and everything cropped that's not within the 2d frame. 

Here's how the 360 video looks in 2d on my laptop. The image looks a little warped, which might be a problem in certain contexts, but is not at all a problem here. 
![the 2d render of the 360 Crawling video from earlier](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-07-30-intro-to-360-video/2d-crawling-screenshot.png)
