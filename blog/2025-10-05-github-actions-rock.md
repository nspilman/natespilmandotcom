---
favorite:
title: EPTSS - Automating project maintenance tasks with Github Actions
description: From database updates to automating email
date: 2025-10-05
tags:
  - software
  - everyonePlaysTheSameSong
  - github
published: true
---
[Everyone Plays the Same Song](https://everyoneplaysthesamesong.com) has quite a few manual touchpoints that I've been wanting to automate for some time. Since it's a [Next.js](https://nextjs.org/) site deployed on [Netlify](https://netlify.com), I don't have a long running server on which I can set up [cron jobs](https://en.wikipedia.org/wiki/Cron) for things. But what I realized I could do - and did - is set up cron triggered [Github Actions](https://github.com/features/actions) to make requests to the EPTSS website's API layer at regular intervals. 

I've set up three actions - 
- One to assign the winning song to the round as soon as voting is over 
- One to create future rounds when a round closes, so there is always 2 future rounds ahead of the current one 
- One to send round participants reminders that voting and covering rounds are almost over

I've created a secret key in both the website's environment and in the Github Actions scope so that my actions can make their regular requests, which the endpoints will only respect with the proper key. Most requests result in no action, as it's not time in the project for said actions to occur, but this additional request traffic to the site is negligible, and this still keeps me way under the Github Actions request limit for their free tier (2000 minutes/mo at the time of writing).

The Actions themselves are defined in YAML. [Here is an example.](https://github.com/nspilman/eptss-site/commit/5b24596ba26e7199f04686edd9c9b09ab17c4ac8#diff-361904fafd7753be4dbc313498657c7842e65fa29864acb02d7d260c15e77935)
