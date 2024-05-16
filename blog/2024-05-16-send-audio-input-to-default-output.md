---
favorite: true
title: Sending audio input to default output
description: aka, I can now hear what I'm sending in from Ableton
date: 2024-05-16
published: true
---
Via the commit below, I'm now piping the incoming audio stream to my default output. I'm essentially sending my computer's audio the longer way to my default device, with my tuning program as an interceptor. It's a powerful feeling to be intercepting audio data like this. 

There's a bit of latency, which is why I lowered the sample rate. My ignorant observational guess here is that lowering the sample rate decreases latency because I'm making the individual packet of information that needs to make it through the pipeline smaller, which therefore makes it to the listener faster. 

I'm also seeing wildly incorrect tune numbers. To find a fix, I'm first going to generate a sine wave locally and test my tuner. This way, I can shortcut the ports. 
If my tuning is off locally, I'll fix the problem locally. If my tuning is correct, then we can send and receive audio through the ports and see if that's where the distortion is occurring. 

https://github.com/nspilman/pitch-tracking/commit/64e64004ab43ced64f92c84f6bfed4904626ab5b