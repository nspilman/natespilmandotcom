---
title: 'JDSB Newsletter - 2/1/2021 - Logical Scope, in Code and Life'
description: 'Logical Scope, in Code and Life'
date: 2021-02-08T00:48:41.522Z
tags:
  - JDSB
  - Career
  - Code
published: true
favorite: false
---
Hey JDSBRiders -

I hope everyone had a wicked January, and have ridden GME to the Moooooon. But realtalk - the real stonk to ride to the moon is your educational development - and I hope this week's newsletter will assist in that regard.

We have a Technical Interview workshop today lead by the everhelpful Kirk Hilse.

Below are my thoughts on Logical Scope, in Code and Life

\--------------

Logical scope is a topic that I don't think is discussed enough, so here goes nothing.

### In Code:

When we talk logical scope in code, imagine we have a EmailBroker class that is responsible for queueing and sending email. When a request comes in, it routes the request to the appropriate EmailWriter class, which returns a written email to the EmailBroker, which then sends the email. Now - if there were a bug reported with some of the paragraph spacing in the email body, would you investigate the issue in EmailBroker class? Of course not - because the responsibility of the EmailBroker has been encapsulated into the logical scope and responsibility of putting and taking requests. EmailWriter would be the appropriate logical scope to do the investigation.

To compare EmailBroker and EmailWriter, we could find that EmailWriter is significantly more logically complex than EmailBroker. EmailWriter can add feature after feature, balloon into a more and more complex monolith, but this would in no ways affect the logical complexity of EmailBroker, as its only job remains to have off the request. They love in completely different logical scopes.

### In Life:

When someone says "At a high level", this person is setting the logical scope. Complex engineering problems have an uncountably large number of logical scopes, and when miscommunication occurs, it's often that the communicating parties are not discussing the same scope.

Ever ask a yes or no question and get back an answer with assertions of fact, but not the boolean you were looking for? These assertions of fact logically combine into your boolean, but you don't have the knowledge within this logical scope to do the boolean algebra yourself.

If we were to convert this communication breakdown into code, you called a method and expected a boolean response, but the method returned an object with different values. You've now experienced an interpersonal communication runtime error.

When discussing complex matters, taking the time to confirm with the discussion parties*exactly*what logical scope is being discussed will save you frustration down the road.

Hope this helps.

Nate