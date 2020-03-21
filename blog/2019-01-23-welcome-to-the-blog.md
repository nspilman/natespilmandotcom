---
templateKey: blog-post
title: Generating a midi music stream with Python
date: 2020-01-24T06:37:03.014Z
description: 'using python package Mido to send midi information to Ableton Live - an introduction'
published: true

tags:
  - python
  - music
  - midi
  - mido
---
### Getting Started

Today, we will be installing `Mido`, a python midi package. We'll then open a new audio port (will show the ios instructions), and output our midi stream to that port. I'm using Ableton Live 10 Intro as my program to consume the midi stream, but any application that takes in external midi will do.

first off, if you don't have python install on your machine, you can get it [here](https://www.python.org/downloads/).\
Then, install `mido` via `pip install mido`. Full `mido` documentation [here](https://mido.readthedocs.io/en/latest/index.html).

### Opening a new midi port

*we will be going over the steps for mac. [Here](https://docs.microsoft.com/en-us/windows-hardware/drivers/audio/midi-port-driver) are the official docs for windows.*
