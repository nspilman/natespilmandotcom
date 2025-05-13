---
favorite: true
title: Using the Supabase CLI for ephemeral integration tests
description: Testing workflows using Colima, the Supabase CLI and Drizzle
date: 2025-04-20
published:
---

[In a previous post](https://natespilman.com/blog/2025-03-03-eptss-testing-plan), I discussed setting up a staging environment to test workflows outside of the Everyone Plays the Same Song production environment. With this post, I'll do one better. 

I realized that my problems related to timing of rounds and precision and persistence of state remained - how can I ensure that there is a round open when I want to test signups? How can I ensure there are songs to vote on when I want to test voting? and etc. 

I'm optimistic that my answer to testing all my workflows is to use an ephemeral database, populate all the data as needed and run the test. The project uses [Supabase](https://supabase.com/) for data persistence and user management, and it turns out, I can use the [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started) to accomplish what I need.  

