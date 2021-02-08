---
title: JDSB Newsletter - 1/11/2021 - Embracing the Refactor
description: Weekly JDSB Newsletter - Embracing the Refactor
date: 2021-01-12T00:53:15.162Z
tags:
  - JDSB
  - Coding
  - Career
published: true
favorite: false
---
Hey JDSBRiders -

I hope this email finds you well! Our biweekly meetup starts in an hour :-)

\--------------------

Code bases evolve. There are competing forces at play at all times. Generally, you have 'Build for the future' on one side of the spectrum and 'You ain't gonna need it (YAGNI)' on the other end. When building a feature, it's important to balance these forces. Agile methodology would say "the best decision is a decision that's easy to change later", but we all know the longer something has been the way it is, the harder it is to safely change.

This is why refactoring is so important. Refactoring code doesn't mean your original code was bad or poorly written. It often occurs that a variable or member on a class is used for one purpose is slowly and sneakily used for a slightly different purpose somewhere else. In this scenario, without a refactor, you're going to have a bad time. What happens when you need to update this class, but the update is only appropriate for one of the multiple uses of the class? Without a proper refactor, your short term fix is only going to make the code base more confusing and difficult to work in in the future.

There may also be times where the need for a new feature calls for a refactor. Imagine you're building a house. You're told you need piping, and recognize your house does not have the proper foundation. You can implement the pipes, but if you don't construct a proper foundation, your pipes will freeze in the winter. Not only that, but adding a foundation will be so much more difficult once you've added the pipes.

Adopt the boyscouts mantra of always leaving a codebase better than when you found it. Embrace the refactor for long term management of your code base.