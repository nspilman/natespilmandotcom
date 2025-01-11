---
favorite: true
title: EPTSS round management process map
description: All the things I do to run EPTSS! Mostly email
date: 2025-01-10
published: true
tags:
  - eptss
---

There's been much discussion about scaling [everyoneplaysthesamesong.com](everyoneplaysthesamesong.com), and a necessary step on my part is process mapping out how the project itself works. I've had a lot of resistance toward this task, and I truly don't know why. My new years resolution was to lean into resistance with curiosity, and here is this in action. 

Let's walk through the admin activities per each round. 

### Before round
- Open round for signups
- Reach out to potential participants to encourage them sign up for round

### Round Start
- Create playlists
- Send welcome email 

### Voting Close - Covering starts
- Announce which song won
- Assign the winning song in the database
- Send checkin emails 
- open song submission 
- Send invitation to listening party 
- Host listening party

## Thoughts on the list
I think the reason I still do most of these things by hand is - 
1. No external pressure to put in the work and write the automation. Each action I need to take takes 10 minutes and then I'm done. 
2. I enjoy injecting my personality into the comms. 

That said, most of it is automate-able and should be automated. 
How to automate - 
1. Create a new database table round specific communications. These events will be dependent on round dates. (aka, send signups announcement email 14 days before signups close). Table columns - 
	1. slug
	2. days_count
	3. direction (from / since)
	4. roundEvent (Signups | voting close | signups open | listening party)
	5. email_id (fk email table below)
	6. population ("round-signed-up" | "mailing_list" )
2. and a new table for **email templates** to send out. Table columns
	1. id
	2. email_subject
	3. email_body_template
3. Write all the email templates & create all the email automation records
4. Write a script to check to see if any emails should be sent out today, and then uses [Resend](https://resend.com/emails) to send the email. 
	1. Darn, I also probably need a `sent_emails` table. 
5. Run a daily Github Action to run the script and send emails when necessary. 


