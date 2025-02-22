---
favorite: true
title: EPTSS - Staging environment plan & intro setup
description: setting up drizzle. Dropping my data (whoops).
date: 2025-01-22
published: true
---
### **Summary**

[Everyoneplaysthesamesong.com](Everyoneplaysthesamesong.com) is going through a "hardening" phase - part of which includes setting up automation testing. I will have automation running in production to ensure the lights are on, but I'll also need a staging environment to test things like cover submission. 

The basic plan is that I'm going to have 1 auth pool, 1 production/staging website and 2 databases that the website will switch between by request. 

Does this sound like a risky plan, because by default anything with access to prod has access to staging and vice versa? Absolutely. Is this also the fastest way to get things tested? Sure is. If successful, we can then split out the auth pools, spin up a staging environment website and truly silo off the databases. 

Below is my plan for rolling out this staging environment. This post will tackle the first bullet

- **Drizzle ORM replaces Supabase SDK**
- **Turso handles staging**, but **production remains on Supabase for now**
- **Users are environment-locked via `staging_enabled` flag**
- **Middleware enforces secure DB switching**


### Drizzle ORM replaces Supabase SDK

1. First, I need to install `postgresql` to access the `pg_dump` command.
```zsh
brew install postgresql@15
```


 2. get my db schema from Supabase 
```zsh
pg_dump --host=db.{YOUR_SUPABASE_PROJECT_ID}.supabase.co \
  --username=postgres --schema=public --no-owner --no-acl --schema-only > schema.sql
`
```
And boom - it worked. I now have a full db schema in my `schema.sql` file.

3. Using LLMs to translate the SQL into `drizzle` schema

ChatGPT generated me my schema. 
I had to then install some depdencies
```
bun i drizzle-orm drizzle-kit postgres
```

4. Replace all `supabase` data fetching calls with `drizzle` calls. This was actually pretty straightforward, as most of fetch code is organized in a service layer. 


The benefit of already have a `data-acccess` layer is that this step didn't take very long at all. 

The commit - 
https://github.com/nspilman/eptss-site/commit/6e7a59e7cf640eb27bf4708cc0302095c0737104

5. Replace postgres auth creation trigger with web hook call 
Since the auth schema and public schema are separate, it's standard practice to create a `public.users` table and copy over user info on creation in the `auth.users` table via a trigger. Since I'm moving to Drizzle to be database agnostic, I can no longer use this method. 

Therefore, [I built a new endpoint on the Nextjs site](https://github.com/nspilman/eptss-site/commit/50e2a0787ca9ea3b39e6f07b438a7a768a18e35b) and configured Supabase to send the user creation payload - password protected - to my server for every new user created. 

## Mistakes along the way
I also managed to drop nearly all the data in the production database when pushing my `drizzle` schema to the production database - `drizzle-kit push`. I may go into more detail later, but basically my schema enforced a uniqueness constraint that I thought was always followed, so I agreed to allow the migration "truncate" the data. What ended up happening was it dropped all my `public.users` , which cascaded into deleting most other records, which are dependent on `public.users` foreign keys. 

Fortunately I took a `pg_dump` backup of the whole database before running `drizzle-kit push` and was able to put all the data back. And now the schema is truly synced with my `drizzle` schema, so a win's a win. 

## current conclusion
I have successfully migrated over to using Drizzle for data queries in production, and therefore I'm ready to move onto `Turso handles staging**, but **production remains on Supabase for now`.
