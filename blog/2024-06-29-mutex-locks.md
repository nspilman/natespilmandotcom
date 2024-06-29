---
favorite: true
title: Learning about MuTex Locks
description: 
date: 2024-06-29
published:
---
My good buddy Travis Reyburn recently hit me up about the cool mutex lock work he was doing. As someone who hasn't done much of any concurrency work, I had got lost and quickly. 

First off, I checked the[ muTex lock wikipedia page](https://en.wikipedia.org/wiki/Lock_(computer_science)) to refresh myself on what we were talking about. It turns out MuTex is short of "Mutual Exclusion", and the mutex lock is a pattern to ensure only one of N concurrent threads have access to a resource at once. 

Travis made me these helpful diagrams below. 

## Standard MuTex Lock
First off, heres a standard mutex lock across five threads. This is a FIFO (first in first out) model, where the thread that has been waiting the longest get the lock next. You can see below that the green thread starts waiting soon after the purple thread gets the lock, and therefore gets the lock second. 
![standard mutex lock](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-06-29-mutex-locks/standard-mutex-lock.png)

An example use case for a standard mutex lock is a web server handing traffic. In high-traffic web servers, incoming requests can be queued and processed in order, preventing any single client from monopolizing server resources.

## Cooperative MuTex Lock 

