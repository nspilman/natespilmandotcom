---
favorite: true
title: Migrating EPTSS Supabase instances
description: Moving the production instance off of my personal Supabase account
date: 2025-03-01
published:
---
This is a work log of the migration. This is a follow up to [this post](https://natespilman.com/blog/2025-01-22-eptss-staging-environment-plan) in which I talk [EPTSS](everyoneplaysthesmesong.com) UX hardening. This new EPTSS specific [Supabase](https://supabase.com) account will house both the prod and staging database. 

After an application refactor (to allow zero records, for when the app is pointed to an empty db), I'm ready to go. 

## Steps - 

1. Run the application locally against the production database and manually test for regressions. 
2. Swap the environment variables in my [Netlify](https://netlify.com) deploy to the new vars 
	1. `NEXT_PUBLIC_SUPABASE_ANON_KEY` - used for auth
	2. `NEXT_PUBLIC_SUPABASE_URL` - used for auth
	3. `DATABASE_URL` - used for CRUD db connection 
3. Confirm we're pointing at the new db (we can check this by confirming the /health page is blank)
4. Perform regression testing on production 
5. Migrate 2 additional keys - 
	1. `SUPABASE_SERVICE_ROLE_KEY` - for cypress testing 
	2. `NEXT_PUBLIC_SUPABASE_USER_CREATION_TOKEN` - for public schema user creation on auth user creation (I'm no longer using a DB trigger for this workflow)
6. Confirm new user creation works 
7. Confirm cypress test works

## Doing the work 
I'm already discovering that the above steps are imperfect, but directionally correct! 

#### confirming the new db connection
I've successfully made it step 3, confirming we're talking to the new DB. 
![the health page shows 1 successful run... odd](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2025-03-01/eptss-db/healthpage-success.png)

But this page doesn't look as expected. Why is there 1 successful run? I mean, I understand that GH action runs on a cron job, but it should have failed? 

It turns out, it did fail! And the test has been failing for a while now. It just does not correctly report "FAILURE" on failure. It fails and then reports 👍. 

So, TODO: fix cypress test. 

But for now, we're live on the new site. 

#### Logging into the site via Magic Link
first, I had to add the production domain to the site url config in Supabase.
![added the production website to the Site Url field in Supabase](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2025-03-01/eptss-db/site-url-config.png)


The initial test took me to `https://everyoneplaysthesamesong.com/https:/everyoneplaysthesamesong.com?token_hash={HASHTOKEN}&type=magiclink&next=https%3A%2F%2Feveryoneplaysthesamesong.com`

which is clearly wrong. My root domain is duplicated. The link from the email itself looks good, so the issue must be in my callback logic. 

[this commit](https://github.com/nspilman/eptss-site/commit/4fc0e5ba12034c5ece961738ef686ba765eab389) fixed the problem. 

#### New user creation test 
![logging in as nate.spilman+newusercreation@gmail.com](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2025-03-01/eptss-db/new-user-creation-test.png)


and boom, my new user is shown in the dashboard!
![my new user is successfully shown in the Supabase user console](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2025-03-01/eptss-db/new-user-creation-success.png)


#### Wiring up Resend
For now I'll use my same [Resend](resend.com) account for sending Magic Link emails. 

![resend has native Supabase integration](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2025-03-01/eptss-db/resend-supabase-integration.png)

I login to my Supabase account through Resend and setup up the integration. 

![setting up the Supabase Resend integration](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2025-03-01/eptss-db/resend-supabase-integration-setup.png)

and just like that, we're set up! 
![an email from login@everyoneplaysthesamesong.com, confirming my Resend integration](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2025-03-01/eptss-db/magic-link-from-resend.png)

## And we're migrated!!

There are a few workflows that don't appear to working, but those won't be necessary for another month or so, based on the timeline of the project. 

