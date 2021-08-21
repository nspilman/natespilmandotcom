---
title: Foundational Patterns of Software Development
date: 2021-08-21T16:13:30.161Z
description: An abstracted list of patterns every developer should be familiar with
tags:
  - Software
  - Development
published: false
---
This is a list of fundamental topics that developers should be familiar with. If you are an experience software engineer, I hope you find this to be an interesting list of abstract concepts. If you are trying to break into the industry, I hope this serves you as a study guide for topics you don't full grasp. This list itself will be abstract, but I'll try to provide concrete examples where applicable. These concepts are not language specific, and can be seen across programming languages and domains. 

**Data Types / Static vs. Dynamically typed languages -** 

Programming languages have data types, such as integers, strings, booleans(true or false),  arrays and dictionaries / objects. Some programming languages (C#, Java, Typescript, etc) with force you to declare the data type of a variable or parameter that you are declaring and yell at you if you ever try to pass a different data type into it. Others (Python, Javascript, etc) do not require type declaration, and have no issue with declaring a variable as one data type and then setting it to another. These are referred to, respectively as Static and Dynamic languages, or Strongly vs. Weakly typed languages. 

**Data Persistence -** 

Often in software applications, we're saving data to reference later. Data is often persisted in databases, but data can also be stored in file systems on servers. The information should be stored outside of your application, so you can turn off and on the application and not lose the data itself. 

**Data in Memory and variables -** 

Software applications can store information in memory. When you declare a variable, you are storing the value in memory to be used later. This variable can be simple strings or complex objects. Data in memory can be persisted to a database or file system, but when you restart the application, in-memory data is wiped. For example, you restart a client-side application every time you refresh the page, meaning any data the application already saved in memory is wiped.

**Conditionally doing things based on whether or not something is true -**

The concept of if and else exists across all (to my knowledge) languages. This concept is foundational to how everything else works - do something if true, do something else if false.