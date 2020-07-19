---
templateKey: blog-post
title: Generating a midi music stream with Python
description: >-
  using python package Mido to send midi information to midi player - an
  introduction
date: 2020-03-21T06:37:03.014Z
tags:
  - python
  - music
  - midi
  - mido
  - software
published: true
favorite: false
---
*instructions originally sourced from [this fine reddit post](https://www.reddit.com/r/ableton/comments/5tuihk/any_good_resources_on_python_to_ableton/)*

### Getting Started

Today, we will be installing `Mido`, a python midi package. We'll then open a new audio port (will show the ios instructions), and output our midi stream to that port. I'm using Ableton Live 10 Intro as my program to consume the midi stream, but any application that takes in external midi will do.

first off, if you don't have python install on your machine, you can get it [here](https://www.python.org/downloads/).\
Then, install `mido` via `pip install mido`. Full `mido` documentation [here](https://mido.readthedocs.io/en/latest/index.html).

- - -

### Design

The final workflow will be as follows - 

1. Our midi player will be listening to our newly created midi port. 
2. Our python script will attach itself to our newly created midi port and send midi information to it. 
3. Our midi player will play the midi sent from our file. 

The first thing we must do is create our midi port. 

- - -

### Creating a new midi port

*we will be going over the steps for mac. [Here](https://docs.microsoft.com/en-us/windows-hardware/drivers/audio/midi-port-driver) are the official docs for windows.*

1. On Mac OS, navigate to `Midi Audio Setup`. 
2. double click on IAC Driver
3. On the window that pops up, click "ports". 
4. There will probably already be a port named "Bus 1". Create a new port, or rename the current one. I named mine "pioneer."

![IAC Driver ports](/uploads/1pythonmidi_iacdriverports.png "IAC Driver ports")

- - -

### Point your midi player to your new port

This next step is different based on which midi player you use. The following screenshot is from Ableton Live 10 Intro.    



![Ableton - point your midi track at your IAC driver port](/uploads/1pythonmidi_abletonmidiport.png "Ableton - point your midi track at your IAC driver port")



- - -

### Write your python code

Below is some sample code that will play send your midi player a middle C, which is represented with the integer 60. Musical notes are represented with the values 1 through 127. When you run the following code, it will play once. 

```python
import mido

middleC = 60
msg = mido.Message('note_on', note=middleC, velocity=64)
outport = mido.open_output('IAC Driver pioneer')
outport.send(msg)
```

<iframe width="80%" height="`00" src="https://clyp.it/wpdhjpc4/widget" frameborder="0"></iframe>

To demonstrate what I mean, I modified the above code to play continuously, pausing for .5 seconds every after every play. 

```
import mido
from time import sleep

middleC = 60
while True:
    msg = mido.Message('note_on', note=middleC, velocity=64)
    outport = mido.open_output('IAC Driver pioneer')
    outport.send(msg)
    sleep(.5)
```



![midi note looping](/uploads/1pythonmidi_repeatingnote.gif "midi note looping")



- - -

### In conclusion

You can now send midi messages to your midi player from Python as it if were a midi controller! 

We'll build cooler stuff with this in blogposts to come. 

See you next time!