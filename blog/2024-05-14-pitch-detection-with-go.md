---
favorite: true
title: Pitch Detection with Go
description: A minimal application to print out the incoming pitch from the microphone
date: 2024-05-14
published: true
---
Over the weekend I got excited about the idea of building a singing practice app where folks can sing along to music they own and the app will allow them to sing along and score them on pitch accuracy. 

This feels ambitious, so I want to celebrate every small win. 

The first small win - pitch detection!


### The basic elements are as follow - 
[Here's the repository for reference](https://github.com/nspilman/pitch-tracking)

I used ChatGPT to outline and build what I needed. 
1. The audio streaming element that captures incoming data from the microphone . 
```go
package main

import (
	"github.com/gordonklaus/portaudio"
)

// initAudio initializes an audio stream to capture audio from the microphone.
func initAudio() (*portaudio.Stream, error) {
	err := portaudio.Initialize()
	if err != nil {
		return nil, err
	}

	// Open the default audio device with a buffer of size 2048
	stream, err := portaudio.OpenDefaultStream(1, 0, 44100, len(buffer), &buffer)
	if err != nil {
		return nil, err
	}
	return stream, nil
}
```

2. the element that processes the audio using `fft` to read in the stream from the microphone and determine its dominant frequency. 


```go
package main

import (
	"math/cmplx"
	"gonum.org/v1/gonum/dsp/fourier"
)

func processAudio(in []float32) float64 {
	// Convert float32 to float64 for FFT
	data := make([]float64, len(in))
	for i, v := range in {
		data[i] = float64(v)
	}

	// Create an FFT plan
	fft := fourier.NewFFT(len(data))
	// This performs the FFT and returns complex coefficients
	coeff := fft.Coefficients(nil, data)

	// Find dominant frequency
	return findDominantFrequency(coeff)
}

func findDominantFrequency(coeff []complex128) float64 {
	maxVal := 0.0
	var maxIdx int
	for i, v := range coeff {
		if abs := cmplx.Abs(v); abs > maxVal {
			maxVal = abs
			maxIdx = i
		}
	}
	sampleRate := 44100 // Define as per your setup
	// Calculate frequency
	return float64(maxIdx) * float64(sampleRate) / float64(len(coeff))
}

```

3. And then the `main()` function to [make'em kith](https://i.pinimg.com/originals/c9/ed/fa/c9edfad3644ccf246bd8c5d1d34d1760.png) -

```go
package main

import (
	"fmt"
	"log"
)

var buffer = make([]float32, 2048) // Buffer size must be appropriate for your use case

func main() {
	stream, err := initAudio()
	if err != nil {
		log.Fatalf("Error initializing audio: %v", err)
	}
	defer stream.Close()

	err = stream.Start()
	if err != nil {
		log.Fatalf("Error starting audio stream: %v", err)
	}
	defer stream.Stop()

	for {
		err = stream.Read()
		if err != nil {
			log.Printf("Error reading audio: %v", err)
			continue
		}

		pitch := processAudio(buffer) // Pass the buffer directly
		fmt.Printf("Detected pitch: %f Hz\n", pitch)
	}
}

```

And here's a screenshot of the output - 
![pitch detection console output](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-05-14%20pitch%20detection%20in%20go/pitch-detection-output.png?t=2024-05-14T14%3A33%3A41.692Z)
*688 is a little sharp of E5*
### Questions - 
- How do I mock the microphone input? 
	- How can I get Ableton Live to port-out to this application? And how can I ensure I can still hear the audio? 
- When I'm not actively singing into the mic, the background noise throws off wild pitch values. How can I gate the incoming audio? 
- How should I architect the repository for greatest developer experience and velocity? 
	- https://www.calhoun.io/moving-towards-domain-driven-design-in-go/
