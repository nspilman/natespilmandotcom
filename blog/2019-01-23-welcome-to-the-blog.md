---
templateKey: blog-post
title: Generating a midi music stream with Python
description: >-
  using python package Mido to send midi information to midi player - an
  introduction
date: 2020-01-24T06:37:03.014Z
tags:
  - python
  - music
  - midi
  - mido
published: true
---
### Getting Started

Today, we will be installing `Mido`, a python midi package. We'll then open a new audio port (will show the ios instructions), and output our midi stream to that port. I'm using Ableton Live 10 Intro as my program to consume the midi stream, but any application that takes in external midi will do.

first off, if you don't have python install on your machine, you can get it [here](https://www.python.org/downloads/).\
Then, install `mido` via `pip install mido`. Full `mido` documentation [here](https://mido.readthedocs.io/en/latest/index.html).

### All Design

The final workflow will be as follows - 

1. Our midi player will be listening to our newly created midi port. 

2. Our python script will attach itself to our newly created midi port and send midi information to it. 

3. Our midi player will play the midi sent from our file. 



The first thing we must do is create our midi port. 

### Creating a new midi port

*we will be going over the steps for mac. [Here](https://docs.microsoft.com/en-us/windows-hardware/drivers/audio/midi-port-driver) are the official docs for windows.*

1.