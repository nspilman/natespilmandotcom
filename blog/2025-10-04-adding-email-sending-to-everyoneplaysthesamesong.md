---
templateKey: blog-post
title: EPTSS - Setting up Resend for email confirmation on signup
description: And setting myself up for the ability to send email at different events in the future
date: 2025-10-04
tags:
  - software
  - everyonePlaysTheSameSong
  - email
published: true
favorite: false
---

This has been a long awaited feature that I'd been holding off on implemented for some reason. But here we finally are - signing up for a round of Everyone Plays the Same Song will now send you an email confirmation with what you signed up with and the key dates for the round. 

I'm using [Resend](https://resend.com/) - an email service I'm already using for the Magic Links for login - to send these one-off confirmation emails. The free plan allows up to 100 emails a day, which at our size is more than email. There is also a Marketing email feature that I can see myself using to replace my manual announcement emails to the whole mailin list. The free tier has a contact limit of 1000 people - also well within our scope.

[Here is the commit](https://github.com/nspilman/eptss-site/commit/e11ad51d5b447cb1055861f6d9f25e27b5b0497c#diff-7eb5b295f4b6947524ba9eb60dfe09a2ee4bc595176ceccba71710e9817a1f7c) with the change. It also includes a button on the admin panel to send a test email. I tested by signing up for round 28 and via this testing button. 

I then added a [follow up commit](https://github.com/nspilman/eptss-site/commit/fe9309e2ee2a270f20532c6a292c36f884fe6af7) to email me notification emails when folks sign up! 

Time to manually send my "Signup for Round 28" email! Maybe by next time I'll have it automated. 