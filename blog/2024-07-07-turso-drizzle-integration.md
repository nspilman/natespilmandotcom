---
favorite: true
title: My new go-to data layer is Drizzle + Turso
description: Typescript + Drizzle + Turso is a powerful delight
date: 2024-07-07
published: true
---

I think my new tech stack is `bun/node` + `drizzle` + `turso`. The purpose of this article is to prove this for myself and document the setup. 

First off, some definitions - 
- `bun` and `node` are both server side runtimes of the `Javascript` programming language. `Bun` can also run `Typescript` natively. 
- `drizzle` is an `ORM`, or `Object Relational Mapper` that uses Typescript to define database architecture and relationships, and serves as the API for interacting with said database. - https://orm.drizzle.team/
- `turso` is a cloud database solution that runs a forked version of SQLite. I like turso because it's easy to use and the free tier is the most generous I've seen on the internet. - https://docs.turso.tech/introduction

In short, I like this stack for the following reasons - 
- I am most comfortable writing applications in Typescript 
- As far as I've seen, `drizzle` serves wonderfully as a frontend for your database in `turso`
- The entire stack is simple to set up! 

## A demo - 
We're going to take this from the top. 
Steps - 
1. Spin up a `bun` application 
2. install dependencies to allow usage of `drizzle` and `turso`
3. create `turso` database
4. create the database schema 
5. perform basic CRUD operations to confirm setup! 

Cool. 
Drizzle has great documentation on how to do exactly this [here](https://orm.drizzle.team/learn/tutorials/drizzle-with-turso).  
### Spinning up the Bun application

```zsh
mkdir drizzle-turso-integration 
cd drizzle-turso-integration
bun init
```

I accept all the basic settings and have my project setup. 

### Installing dependencies

Bun dependencies 
```bash
bun add drizzle-orm
bun add -D drizzle-kit

bun add dotenv
bun install @libsql/client
```

Turso CLI - 
````bash
brew install tursodatabase/tap/turso
````
### Create Turso database
Now that we've got everything installed, it's time to use the `turso CLI` to make our database. 

At this point it's really just following the steps here - 
https://orm.drizzle.team/learn/tutorials/drizzle-with-turso#setup-turso-and-drizzle-orm

Within the documentation, we - 
- Create our new database in turso 
- get our connection keys 
- wire put them in our `.env` file and set up the boilerplate connection code

### Create the database schema
We can continue referencing this - https://orm.drizzle.team/learn/tutorials/drizzle-with-turso#setup-turso-and-drizzle-orm

During this step, we - 
- create the database schema in typescript with `drizzle` using the following syntax - 
```typescript
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  email: text("email").unique().notNull(),
});
```
- create a top level `drizzle.config.ts` file to house your global drizzle settings. 
```typescript
import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});
```
- generate the migrations file for the database (the change log from which it will build) and then apply those migrations to create or modify database table(s). 
```
bunx drizzle-kit generate
bunx drizzle-kit migrate
```

### Confirm success
First off, now that I've applied the database migrations, I can use `drizzle studio` to serve as a UI for my database and confirm the tables I expect to exist do indeed exist. 

`bunx drizzle-kit studio`

This spins up a UI at `https://local.drizzle.studio`, and I can clearly see that my migrations were applied, based on the existence of the `posts` and `users` table.  
![[Pasted image 20240707105026.png]]
Not only can I see my data or currently lack thereof, but I can also run SQL directly against the database via the `SQL runner`, or write `drizzle TS api` code in `Drizzle Runner`. I foresee that being super helpful in situations where you want to test your application queries without needing to run your application. Build the queries first in `Drizzle runner` and then insert them into your application with confidence. 

Next I'm going to add a couple of users and give them a couple of posts, and then query the database for posts by user. This should be a pretty simple `Hello World` sort of confirmation that this has all worked. 

#### Creating users
```typescript
import { db } from "../index";
import { InsertUser, usersTable } from "../schema";

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}
```

My `index.ts` file at root level is now 
```typescript
import { createUser } from "./src/db/mutations";

createUser({ name: "Pioneer", age: 102, email: "weouthere@example.com" });
createUser({
  name: "Jefferford",
  age: 39,
  email: "forderjeffington@example.com",
});
createUser({ name: "Brockhampton", age: 54, email: "deathgrips@example.com" });
```

So when I run the app, it will add this user to the database. The great thing with the `drizzle` + `typescript` integration is that as soon as I removed a required field, it alerted me that it was missing. This way, the source of truth is the database schema, and `drizzle` enforces it in the application layer. 

`bun index.ts`
annnnd, boom - 
![Drizzle studio UI confirms that we successfully built our tables](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-07-07-turso-drizzle-integration/drizzle-studio-first-look.png)

Now let's make some a post.

```typescript
import { db } from "../index";
import { InsertPost, postsTable } from "../schema";

export async function createPost(data: InsertPost) {
  await db.insert(postsTable).values(data);
}
```

```typescript
import { createPost } from "./src/db/mutations";

createPost({
  title: "We out here",
  content: "MY SPOON......... IS TOO BI-YIG",
  userId: 1,
});
```

Tadaaaa - 
![we see the created post in drizzle studio](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-07-07-turso-drizzle-integration/drizzle-post-created.png)

I can also now see the foreign key relationship in in the `users` table. 
![drizzle studio displays the FK relationship between the users and posts in the users table](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-07-07-turso-drizzle-integration/drizzle-fk-relationship.png)


And now we confirm everything returns as expected in the application - 
```typescript
import { eq } from "drizzle-orm";
import { db } from "./src/db";
import { postsTable } from "./src/db/schema";

const userOnePosts = await db
  .select()
  .from(postsTable)
  .where(eq(postsTable.userId, 1));
const userTwoPosts = await db
  .select()
  .from(postsTable)
  .where(eq(postsTable.userId, 2));
console.log({ userOnePosts, userTwoPosts });
```

console logs - 
```json
{
  userOnePosts: [
    {
      id: 1,
      title: "We out here",
      content: "MY SPOON......... IS TOO BI-YIG",
      userId: 1,
      createdAt: "2024-07-07 18:12:19",
      updateAt: 2024-07-07T18:12:18.000Z
    }
  ],
  userTwoPosts: []
}
```

And just like that, we're fully wired up. I'm still getting over how painless this process has been, and am excited by the potential. 

