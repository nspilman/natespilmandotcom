---
favorite: true
title: EPTSS - Staging environment testing plan
description: Ensuring stability of core features
date: 2025-03-03
published: true
---

This post is one of many in my [testing and hardening plan](https://natespilman.com/blog/2025-01-22-eptss-staging-environment-plan) for the [Everyone Plays the Same Song website](https://everyoneplaysthesamesong.com). 

I previously set up a Cypress test managed by a Github Action to confirm our magic link login workflow keeps working. It turns out it's been silently failing for a while. My Google Console project is still in "test" mode, which means my OAuth key is only valid for a week instead of 6 months. 

So to test full functionality, I'm going to add a new login page for username + password login. This will only ever be used, at least for now, by our test users in Staging. 

![eptss homepage](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2025-03-03/eptss-testing-plan/eptss-homepage.png)
## Next steps - 
1. Add username / pw login page for testing purposes. 
2. Create test user in Staging. 
3. Create a bunch of future rounds in Staging, each of which lasting 3 days. Day 1 - signup. Day 2 - voting. day 3. covering / submission. 
4. Build cypress tests to run daily based on the phase of the round. 
	1. Day 1, user signs up for round. 
	2. Day 2, user votes. 
	3. Day 3, user submits cover. 
	4. Day 4 - see day. 

This way, we'll test the major website functionality in full every 3 days. 

## Concerns -
I know it's possible, and probably not even that difficult, but the round creation + choosing which test to run based on round phase gives me pause. But I trust that once I jump in, I'll figure out the details. 