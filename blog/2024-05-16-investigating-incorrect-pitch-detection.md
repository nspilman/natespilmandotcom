---
favorite: true
title: "Pitch tracking app: investigating incorrect pitch"
description: isolating variables - the issue is in my fft function
date: 2024-05-16
published: true
---

I've narrowed my pitch detection issue down to the `processAudio` function that does the `fft` calculations. Which is kind of a bummer because that's the area of the workflow that feels the most magic to me, but I guess it's time to learn some magic. 

I know the issue is with the `fft` calculation per the following testing - 
- I sent a sine wav stream directly to the pitch processing function, and it returned the same incorrect information. 
- I sent the sin wav stream to the `BlackHole` device to view the pitch in Ableton. The pitch in Ableton would match what I set in the code, but the program would still return the consistently wrong number. 

Cool, so next steps is to figure out why. 