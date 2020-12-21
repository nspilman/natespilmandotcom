---
title: JDSB Newsletter - 12/21/2020 - Embracing Creative Destruction
description: JDSB Newsletter - 12/21/2020 - Embracing Creative Destruction
date: 2020-12-21T18:52:51.159Z
tags:
  - JDSB
  - Career
  - Code
published: true
favorite: false
---
Hey everyone -

I hope all of you are having a safe and healthy Holiday season. No meetup tonight - see'y'all next Monday. I wanted to discuss creative destruction and refactoring today.

\-------

I find nothing more satisfying than deleting large blocks of code that I no longer need. I think this attitude gives me an advantage. It's very easy to become personally attached to your code, even when it no longer serves a helpful purpose. I invite you not to get attached.

As applications mature, you may find yourself in a situation where either you no longer need a previously all-important class or method, or the entire architectural paradigm you're following no longer supports your needs. In these moments, don't hold what's already written as sacred. Delete, refactor, move, rename.

Now, Creative Destruction != Regression. This is advice specific to code you know very well / code that is well unit tested. Always test for regressions when refactoring your code, but please never use "I wrote it and it's pretty" as a rational to keep code that is no longer serving your greater purpose.

Ideally, every time you refactor an area of your application, you're incrementally making the application better. Embrace creative destruction.