---
title: A year as a Software Engineer
description: A crude list of what I've learned
date: 2020-05-17T16:49:49.488Z
tags:
  - Software development
  - tech
published: false
---
Time has flown since I started my first full time Software Developer role. I wanted to reflect on my time and try to identify all the important stuff I've learned over the year. I

#### High level role details - 

* The role is Full Stack. 

  * Stack: MS SQL Server, ASP.NET, Vue.Js, Azure DevOps. 
  * I use python and powershell from time to time for scripting purposes. 
* I am part of a self organizing scrum team, following Agile practices to the best of our ability. 
* We have a culture of paired programming. 
* We both maintain a legacy application and build modern microservices. 



I've been fortunate to work on a team of experienced developers, willing to answer the mountain of questions I've had over the year. 



### General Software Development stuff - 

* Educational code bases and enterprise production code bases are very different places. It's the difference between adding a field to a json return object and adding a field to the json return object except the value we're trying to pull is currently not expose to this class, and we'd really rather not break encapsulation for this purpose - so maybe we can tunnel back down to a point where the code paths meet and grab the value there? Let me spend all day trying to figure this out. 
* Getting code to do the thing you want it to do is the easy part. Getting code in a state of long term readability and maintainability is where things get difficult. 

  * When writing a script for my own use, it's fun to see how much I can fit on one line. When writing code that will be checked into a shared code base, I am NOT trying to fit everything on one line. Instead, I'm focusing on ensuring my method names are 100% in line with what the method actually does, my variable names make sense, and that everything is in the same place. 
  * If I start an explanation with "It's a bit of a hack, but", it means I should figure out a cleaner way of achieving what I need to do. No one will be able to read my "creative" code down the line, even if it serves its purpose now. 
* Coding languages and frameworks are all just higher level implementations of often the same thing. Different languages have more straightforward implementations of certain concepts, but at the end of the day, each language can be used to mostly achieve the same outcome. And with that, learning C# will make you a better python developer. Learning Javascript will make you a better Go developer, etc. 
* Repeat code and over-coupling are the enemies of maintainable codebases. 

  * To use a house as an analogy - If you want to turn your bathroom light on, the switch you flip should be in one place and one place only, and it shouldn't require also turning on the kitchen garbage disposal. 
* Legacy codebases are great educators. Code bases evolve, but if you're not careful, parts of the codebase will get left behind. Seeing the benign messes accidentally made is a constant reminder to be mindful of the code that I'm writing. 

  * Maybe there was a low level class that was perfect 10 years ago, but now doesn't make as much sense. Instead of rewriting this class when it was first identified that a change was necessary, someone wrote code on top of this class that modifies the data output to make more sense with our current needs. As time progressed and needs changed, more was built on top of this class, transforming the data into something previously unrecognizable. This code runs fine, but gets more and more difficult to work with, as there is now a behemoth of infrastructure in place to correct the low level error. It would now be quite a large job cleaning this up, as this fix infrastructure is now referenced all over the code base. It would have been a lot less expensive long term to modify the underlying class before it became an overly coupled nightmare, but that ship sailed years ago. 
* If you can't write a unit tests for your code, there's probably something wrong with it. 

  * In the above coupling example, if I were writing a unit test for turning on my bathroom light and found myself having to mock a garbage disposal, that'd be a pretty good indication that I had a problem. 
  * Things that are not unit testable, such as db connections, should have as little business logic as possible. All business logic should have corresponding unit tests. 

### C# .NET Specific stuff

* I learned the joys and pains of object oriented programming. I into the job with mostly experience with Python and JavaScript. I was familiar with Object Oriented concepts, but honestly didn't understand them. 
*
*