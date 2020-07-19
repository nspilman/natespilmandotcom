---
title: A year as a Software Engineer
description: A crude list of what I've learned
date: 2020-05-17T16:49:49.488Z
tags:
  - software
  - tech
  - career
published: true
favorite: true

---
Time has flown since I started my first full time software developer role. I wanted to reflect on my time and try to identify all the important stuff I've learned over the year. 

#### High level role details -

* The role is full-stack. 

  * Stack: MS SQL Server, ASP.NET, Vue.Js, Azure DevOps. 
  * I use python and powershell from time to time for scripting purposes. 
* I am part of a self-organizing scrum team, following Agile practices to the best of our ability. 
* We have a culture of paired programming. 
* We both maintain a legacy application and build modern microservices. 

I've been fortunate to work on a team of experienced developers, willing to answer the mountain of questions I've had over the year. 

### General Software Development stuff -

* Educational code bases and enterprise production code bases are very different places. It's the difference between adding a field to a json return object and adding a field to the json return object except the value we're trying to pull is currently not exposed to this class, and we'd really rather not break encapsulation for this purpose - so maybe we can tunnel back down to a point where the code paths meet and grab the value there? Let me spend all day trying to figure this out. 
* Getting code to do the thing you want it to do is the easy part. Getting code in a state of long-term readability and maintainability is where things get difficult. 

  * When writing a script for my own use, it's fun to see how much I can fit on one line. When writing code that will be checked into a shared code base, I am NOT trying to fit everything on one line. Instead, I'm focusing on ensuring my method names are 100% in line with what the method actually does, my variable names make sense, and that everything is in its right place. 
  * If I start an explanation with "it's a bit of a hack, but,..." it means I should figure out a cleaner way of achieving what I need to do. No one will be able to read my "creative" code down the line, even if it serves its purpose now. 
* Coding languages and frameworks are all just higher level implementations of often the same thing. Different languages have more straightforward implementations of certain concepts, but at the end of the day, each language can be used to mostly achieve the same outcome. And with that, learning C# will make you a better Python developer. Learning Javascript will make you a better Go developer, etc. 
* Repeat code and over-coupling are the enemies of maintainable codebases. 

  * To use a house as an analogy - If you want to turn your bathroom light on, the switch you flip should be in one place and one place only, and it shouldn't require also turning on the kitchen garbage disposal. 
* Legacy codebases are great educators. Code bases evolve, but if you're not careful, parts of the codebase will get left behind. Seeing the benign messes accidentally made is a constant reminder to be mindful of the code that I'm writing. 

  * Maybe there was a low level class that was perfect 10 years ago, but now doesn't make as much sense. Instead of rewriting this class when it was first identified that a change was necessary, someone wrote code on top of this class that modifies the data output to make more sense with our current needs. As time progressed and needs changed, more was built on top of this class, transforming the data into something previously unrecognizable. This code runs fine, but gets more and more difficult to work with, as there is now a behemoth of infrastructure in place to correct the low level error. It would now be quite a large job cleaning this up, as this fix infrastructure is now referenced all over the code base. It would have been a lot less expensive long-term to modify the underlying class before it became an overly coupled nightmare, but that ship sailed years ago. 
* If you can't write a unit tests for your code, there's probably something wrong with it. 

  * In the above coupling example, if I were writing a unit test for turning on my bathroom light and found myself having to mock a garbage disposal, that'd be a pretty good indication that I had a problem. 
  * Things that are not unit testable, such as db connections, should have as little business logic as possible. All business logic should have corresponding unit tests. 

### C# .NET Specific stuff

I basically went from not knowing C# to being a competent C# developer. Most of the credit again goes to my brilliant ever-patient coworkers for walking me through all my questions and glaring shortcomings. 

C# is a fantastic language for writing robust, enterprise software. Microsoft is making the development experience easier and easier, and C# & the .NET framework continue improving at a rapid clip. 

Below is a quick list of the more technical things that have stuck with me. 

* Encapsulation is your friend. Everything should be private - encapsulated within the class - by default. Of course things that should be public should be public, but that should be an intentional design decision. 

  * To use a vacuum as an example - aren't we glad that the inner workings of the suction system don't have a public interface? Instead the only public interfaces are the power plug and the on/off button. 
* Interfaces are your friend. This is a concept that took me longer to grasp, but without it it would be impossible to write and test software on a large scale. The way it's always described is as "a contract," which is both true and only makes sense if you already understand the concept. 

  * The way I like to describe it is, say I have a bunch of different classes that represent a bunch of different potential employees. Some of these classes inherit the interface Chef, which means these classes implement all of the methods that is in the Chef interface. In english terms - it means they can cook. If we can a Restaurant class, with the power of interfaces, the Restaurant doesn't need to use any specific class in its code. It instead can write to the Chef interface - knowing confidently that when it calls Chef.Cook() on the interface, any of the classes that implement the Chef interface will know what that means. 
  * Let's say we have class Nate. Nate implements the Chef interface, meaning Nate can do all the things that a Chef can do. It doesn't matter how Nate does it - that's specific to Nate's implementation. Nate can also implement other interfaces. If Nate implemented the SoftwareDeveloper interface, it means that Nate can also be used by the SoftwareCompany class that uses the SoftwareDeveloper in its code. 
  * Interfaces are also necessary for testing. In the above example, if the Kitchen class, instead of coding to the Chef interface, they coded to Nate, which is a class that implements the Chef interface. If I want to test the Kitchen, we now have to instantiate Nate. But if Nate also implements the SoftwareDeveloper interface, there may be a whole lot of stuff that Nate needs for SoftwareDeveloper that we don't need for Chef. If we coded to the interface instead, we wouldn't have to spin up any of the SoftwareDeveloper dependencies to test the Kitchen. Instead we can create a new class - a Mock - that is used for testing purposes only, and doesn't require anything outside of the signature you're specifically mocking.
* I've already alluded to it a few times - but I learned how to write unit tests. I've learned Unit Tests should be seen as the business requirements of the software. "When A occurs, X should be the outcome." Untested code is dangerous code, because when you need to make a change in the future, you don't have a business requirement to test against. 
* I'm a huge fan of paired programming. It's so easy to get lost in the weeds that it's helpful to have someone there to remind you of the bigger picture. It's easy to miss a typo that your pair catches in real time. It's much easier to process a complicated workflow by talking it through with a pair.  

### Soft Skills Stuff -

Most of the items here I learned in my previous role as an Implementation Project Manager at Epic, but found effective application in the new role. 

* It's my responsibility to identify the delta between what I know and what I need to know, and then close that gap. I figure this out by asking questions until I no longer have questions. 

  * I spend a lot of time repeating back explanations to ensure I understand the concepts. Often I was off the mark with my understanding. 
  * One technique I learned at Epic that is works wonders for identifying gaps in understanding is to walk through your entire understanding of a technical workflow/concept/etc with the explicit instruction of "Tell me where I'm wrong." 
* I try my hardest to own my mistakes, publicly laugh at myself, and move on. If I broke something, it's better to own it and do what I can to fix it than try to hide it. There are some specific mistakes I made over the year that we as a team reference as education points. 

  * For example - I merged two feature branches when I meant to merge develop into a feature branch. We didn't notice for a few days. I then had to spend about a day and a half reverting and cherry picking commits to get us back to a clean place. We refer to this as "Branchpocalypse" and no one has made said mistake since. 
* Team culture is paramount. To paraphrase my company's CIO - "We don't want any heroes. If you need to step up and be a hero, do, but then we need to figure out the systematic failure that required you to be a hero." We spend quality time as a team discussing the best way of doing things, and follow team agreements. So says the African proverb - "If you want to go fast, go alone. If you want to go far, go together."
* Project management skills go a long way, even in this technical role. Clear note taking, confirmation that everyone's on the same page, understanding of who's responsible for what and by when, etc, have done me well this year, 

Parting thoughts - 

* Azure DevOps is fantastic. It's a git based platform for maintaining code bases, and building and deploying applications from said code bases. There's learning curve, but the more I use it the more I love it. 
* I look forward to all my second year in the biz will teach me. I look forward to seeing the downstream effects of team decisions made. I look forward to continuing to deliver quality software to our customers. 

Thanks for reading.