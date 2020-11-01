---
title: Three Stages of the Software Development Journey
description: A high level roadmap for Software Engineer education
date: 2020-11-01T16:15:45.639Z
tags:
  - Development
published: false
favorite: false
---
In conversations I've had with some of the more senior folks at work, I've enjoyed musing about the different milestones in the junior software developer's journey. For the sake of easy consumption, I've distilled them into three sections. 

* Learning how to code
* Using code to solve problems and build applications
* Architecting your code to be readable, reusable and performant 

We're going to use "Building a house" as a metaphor. This is all fairly abstract. Let me know if you have questions about individual sections, and I can do a deeper dive. 



### Learning how to code - 

This is the first and often most difficult step of the coding journey. Whether it's your first or fifth coding language, learning the syntax and understanding how to respond to error messages can be the most dull and non-forgiving aspects of software development. Learning your first language is especially difficult, though, because you likely don't have context around what you're trying to achieve. You're learning concepts that are used across many languages for the first time - for loops, if statements, etc - without being able to see the larger picture. At this point you're learning how to wield your construction equipment without really knowing what the house you're trying to build will look like. 

If you are learning your first programming language, hopefully the instruction you're following includes some sort of project - a small shed or two - so you can more clearly see the end result. Also be patient with yourself with regards to memorizing syntax. I google language specific syntax all the time. 



### Using code to solve problems and build applications - 

This stage is where the magic starts to happen. This is the stage where you recognize what your tools (code) can do to the point where you're ready to apply them to a real world problem. That problem may be "my friend's business needs a website" or "this spreadsheet work can be automated." You start throwing up shacks here and there. This phase is especially magical, because you run into problems you didn't expect, and solve them as you go. You'll build a plumbing system in the bathroom only to realize that it doesn't connect well with the plumbing system in the kitchen, and then you'll figure out the solution. 

Especially at first, your code won't be "good". There will be duplicate logic, coupling you didn't mean to introduce, lack of separation of concern. The living room of your house will be cramped, uncomfortable, and may have a toilet in the corner. And at least at this phase, that is okay. This is how you learn. 

![](https://i.redd.it/6b7und8rs1v21.png)



### Architecting your code to be readable, reusable and performant 

This is the phase where you've thrown up enough shacks and rickety houses that you begin to recognize the architecture you need to build a palace. This is the phase where you say "Maybe that toilet shouldn't be in the living room.", "Maybe that bit of logic that we use in every component should be abstracted into a helper method that all the components call into." At this point the focus is no longer on the coding language, but on the overall structure of what you're trying to build. 

In addition, at this point you're likely not the only developer working on a codebase. As such, your code needs to be readable so that the other developers on your team, as well as future developers who are working on your legacy, can understand what you have built and why you built it that way. At this point I hope you are working with senior developers with a mind for design, as a lot of these concepts are learned through experience of building fragile applications and then rebuilding them more robust. 

Now, at this stage on your developer's journey, will you ever throw up a shack or two with some busted plumbing and a leaky roof? Sure you will, but these should only be personal and/or educational projects. Will you jump back to the first section and learn a new language? Of course, but you'll be bringing your context and experience with you, which will make learning that next language considerably less challenging than your first. 



Happy building!