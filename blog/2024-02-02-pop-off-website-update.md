---
favorite: true
title: Pop Off website update
description: An update on the technical progress of Pop Off, the pre-release song promotion site I'm working on for Toneway
date: 2024-02-02
published: true
---

Hey y'all - I wanted to take this time to recap what's been done an look forward to what's outstanding. First off, Pop Off is what I'm calling a song pre-launch fan organization platform, that I plan on launching with Toneway's upcoming song Falling. This project started with an RFC. 
First off, to everyone that commented on the RFC - thank you! The benefit of the RFC was both to get the helpful feedback of friends, but also to get my thoughts organized. 

## Status of things 

The website is deployed at https://the-way-of-tone.netlify.app, and I got auth working on deployed. 

In short, the website is nearly feature complete, but looks far from ready. I'll put together a future post about design, as I'd like to achieve launch feature complete first. I think it should be ready to launch mid February.   
### Completed Functionality - 
- Users can give us their email to access the music streaming page 
- Users can listen to the streamed song from AWS on the auth gated song page 
- Users can fill out the volunteer form, and it's persisted in the database

### Outstanding Work
- [Create a Market Research survey for users to fill out](https://github.com/nspilman/pop-off/issues/8)
- [Better user feedback in the UI via toasts](https://github.com/nspilman/pop-off/issues/23)
- Overall design and polish work
- Copywriting 

### Additional nice-to-haves
- It'd be nice if the share URL were shorter
- Netlify SMPT has some pretty strict rate limiting. Both Mailchimp and AWS have impressive free tiers, at 1000 emails a month and 3000 emails a month respectively. 

