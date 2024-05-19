---
favorite: true
title: "Pitch tracking app: Fixing pitch issues"
description: A quick fix, and learning about sound
date: 2024-05-17
published: true
---
I sent my pitch issue to my good friend Jon Soifer, and he identified the issue was that I was using the length of the coefficient instead of the length of the buffer to calculate the pitch. I don't understand the math enough to understand why, but fixed is fixed. 

[Here's the commit that fixed it. ](https://github.com/nspilman/pitch-tracking/commit/520e0758c1fc7a90bc3b51e891d23fdb5a89a4db)

It's been interesting to learn, though, that unless the buffer size is the full sample rate, the pitch isn't exact. Again, Jon explained this more eloquently than can, but basically the smaller the buffer size, the more inference is required from the `fft`, since it's only receiving a fraction of the full sample. When we pass the full sample to the fft at a time, it returns the pitch in perfect fidelity. The downside is, there's added latency as we wait for the full sample to process. 

Jon suggests using a `window`, which, if I understand correctly, would allow me to keep my buffer size large but more progressively work through it, allowing processing to happen with both speed and fidelity. 