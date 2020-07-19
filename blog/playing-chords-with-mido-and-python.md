---
title: Playing chords with Mido and Python
description: Playing something that actually sounds musical
date: 2020-03-24T04:34:19.922Z
tags:
  - python
  - music
  - midi
  - mido
  - software
  
published: true
favorite: false

---
Welcome back. This is part II of my python midi series. Part I can be found [here.](https://natespilman.com/blog/2020-03-23-generating-midi-music-stream-with-python/)

Last time we set up our python program to successfully send a midi stream to our midi player. 

Today we're going to loop a basic chord progression, and add some texture. Again, my midi player is Ableton Live, but this will work for anything that takes midi input. 

- - -

### Writing Chords -

We're going to start with some basic minor and major triads - the root, the third and the fifth. The major third is 2 whole steps up from the root - 4 steps - and the minor third is a whole and a half step up from the root - 3 steps. 

First, our function setup - 

```python

import mido
from time import sleep
 
def note(note,velocity = 64, time = 2):
    return mido.Message('note_on',note=note,velocity = velocity, time=time)

def note_off(note,velocity = 64, time=2):
    return mido.Message('note_off',note=note,velocity = velocity, time=time)

outport = mido.open_output('IAC Driver pioneer')

def majorChord(root, duration):
    outport.send(note(root))
    outport.send(note(root+4))
    outport.send(note(root+7))
    sleep(duration)
    outport.send(note_off(root))
    outport.send(note_off(root+4))
    outport.send(note_off(root+7))

def minorChord(root ,duration):
    outport.send(note(root))
    outport.send(note(root+3))
    outport.send(note(root+7))
    sleep(duration)
    outport.send(note_off(root))
    outport.send(note_off(root+3))
    outport.send(note_off(root+7))
```

The `note` method returns a mido.Message object that is sent to the port. 

The `majorChord` and `minorChord` functions take in their root note, but also a duration argument. These functions play the chord, sleep for the duration, and then turn off the notes by triggering 'note_off' messages. 

With this, we can loop a nice chord progression like so - 

```python 
C = 60 
G = 55 
A = 57 
F = 53 

while True:
    majorChord(C,1)
    majorChord(G,1)
    minorChord(A,1)
    majorChord(F,1)
    majorChord(F,1)
    majorChord(G,1)
    majorChord(C,2)
```

Tada! we have a chord progression! It sounds a bit dull, though, so let's add some texture. 

<iframe width="75%" height="265" src="https://clyp.it/2dtqyn41/widget" frameborder="0"></iframe>

---
### Adding Texture - 

We're going to make two changes to make this progression sound less robotic. First, in our note generation, we've added a velocity modification variable. With every note generated, the velocity is now anywhere, randomly, between 44 and 84. This changes the intensity of the note. 

In addition, we've added a `pause` function, which inserts of `sleep` of anywhere between 0 and .05 seconds. We've added this pause between the  individual notes on the chord, everyso slightly staggering the notes. 

```python 

def note(note,velocity = 64, time = 2):
    velocity_modification = randint(-20,20)
    return mido.Message('note_on',note=note,velocity = velocity + velocity_modification, time=time)

def note_off(note,velocity = 64, time=2):
    return mido.Message('note_off',note=note,velocity = velocity, time=time)

def pause():
    sleep(randint(0,100) * .0005)

def majorChord(root ,duration):
    outport.send(note(root))
    pause()
    outport.send(note(root+4))
    pause()
    outport.send(note(root+7))
    pause()
    sleep(duration)
    outport.send(note_off(root))
    outport.send(note_off(root+4))
    outport.send(note_off(root+7))

def minorChord(root ,duration):
    outport.send(note(root))
    pause()
    outport.send(note(root+3))
    pause()
    outport.send(note(root+7))
    sleep(duration) 
    outport.send(note_off(root))
    outport.send(note_off(root+4))
    outport.send(note_off(root+7))
```

And here is the output. 
<iframe width="75%" height="265" src="https://clyp.it/g54lv0zg/widget" frameborder="0"></iframe>

You can hear how much more organic it sounds. Each loop is unique in its velocity and stagger values. 

Thanks for reading. Stay tuned for more python midi projects!