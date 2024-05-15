---
favorite: true
title: I can output audio from Ableton Live and into my Go Pitch Tracking application
description: more technical title - Reading audio input from BlackHole port device
date: 2024-05-15
published: true
---
In this post, I use [BlackHole](https://existential.audio/blackhole/) to add a new Audio Device to my laptop. This allows me to send audio to it from third party applications like Ableton Live, and then read from it in my `Go` code. 

First, I donated $10 to BlackHole and installed the 2 channel device. There are also 16 channel and 64 channel devices that I aspire to having use for one day. But for now, the 2 channel device is my speed. 

Once installed, `BlackHole 2ch` shows up as an available `Audio Input` and `Audio Output` device. I set my output to the new driver and looped a midi sine wave instrument at middle C. 

Within the code, using the `portaudio` package in `Go`, I can connect to the `BlackHole 2ch` device by finding the device by name and then specifying it in my `portaudio` stream creation.  If I don't specify a device in my code, it will choose the `DefaultInputDevice`, which is default microphone. 

### What this unlocks 
This unlocks the ability to work on post-audio-received workflows without needing to actively be making noise in the microphone. 
If there are any specific scenarios to test, I can set them up in Ableton, or another application. 

### Curious Things 
My only curiosity is that I think my pitch output is eversoslightly sharp. Google says middle C is at `256hz`, but my application is reading it at `258.146341hz`. Very curious indeed. 

### Next steps - 
Currently I can't hear any of the audio going to `BlackHole`, and I'd like to change that. Next step is to figure out how to route the audio back to the default device. 

### Code sample below - 

```go
func findDeviceByName(name string) (*portaudio.DeviceInfo, error) {
	devices, err := portaudio.Devices()
	if err != nil {
		return nil, err
	}
	for _, device := range devices {
		if device.Name == name {
			return device, nil
		}
	}
	return nil, fmt.Errorf("device %s not found", name)
}
```

```go
func initAudio(buffer []float32, deviceName Device) (*portaudio.Stream, error) {
	err := portaudio.Initialize()
	if err != nil {
		return nil, err
	}
	var device *portaudio.DeviceInfo
	if deviceName != "" {
		device, err = findDeviceByName(string(deviceName))
	} else {
		device, err = portaudio.DefaultInputDevice()
	}
	if err != nil {
		return nil, err
	}
	streamParameters := portaudio.StreamParameters{
		Input: portaudio.StreamDeviceParameters{
			Device:   device,
			Channels: 1,
			Latency:  device.DefaultLowInputLatency,
		},
		SampleRate:      44100,
		FramesPerBuffer: len(buffer),
	}

	stream, err := portaudio.OpenStream(streamParameters, buffer)
	if err != nil {
		return nil, err
	}
	return stream, nil
}
```

