---
favorite: true
title: Speeding up processing with Goroutines
description: How I increased the speed of my image processing application by 8x
date: 2024-01-15
published: true
tags:
  - "#softwareEngineering"
  - "#goLang"
---

I realize I still need to do a deeper dive on my Go program that I used to make the images [displayed here](https://www.amazon.com/dp/B08B3FWYBX?ref_=cm_sw_r_mwn_dp_H0MB0N9HSWTFFVNZFS1X&language=en-US), but until then, let's chat concurrency!

All you need to know is, I have a program that performs actions on every pixel in an image. I'd heard that [goroutines](https://go.dev/tour/concurrency/1) could be used to do some of this work in parallel. What if I could process ever pixel at once? While wasn't able to get to that level of speed, I cut total performance speed by about 4 times.

### My original function

```go
func blendImages(image1 image.Image, image2 image.Image, modFunction func(pixel1 color.RGBA, pixel2 color.RGBA) color.RGBA) image.Image {
	img1, img2 := resizeImages(image1, image2)
	bounds := img1.Bounds()
	width, height := bounds.Max.X, bounds.Max.Y
	newImage := image.NewRGBA(image.Rect(0, 0, width, height))
	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			pixel1 := img1.At(x, y)
			pixel2 := img2.At(x, y)
			rgba := modFunction(color.RGBAModel.Convert(pixel1).(color.RGBA), color.RGBAModel.Convert(pixel2).(color.RGBA))

			newImage.Set(x, y, rgba)
	}
}
```

It takes in two images, resizes them to the same size, loops through the length and height ranges and passes the pixel at that coordinate of each image to `modFunction`, which returns a new pixel as result. This pixel processing happens one at a time, which is where I saw the opportunity for using Goroutines.

### The Goroutine Refactor

After much back and forth with [ChatGPT](https://chat.openai.com/share/8e744200-95a1-46c5-bc23-a668da86244e), I landed on the following -

```go
func blendImagesConcurrently(image1, image2 image.Image, modFunction func(pixel1, pixel2 color.RGBA) color.RGBA) image.Image {
	img1, img2 := resizeImages(image1, image2)
	bounds := img1.Bounds()
	width, height := bounds.Max.X, bounds.Max.Y
	newImage := image.NewRGBA(image.Rect(0, 0, width, height))
	var wg sync.WaitGroup
	numGoroutines := 500
	rowsPerGoroutine := height / numGoroutines
	for i := 0; i < numGoroutines; i++ {
		wg.Add(1)

	go func(startRow, endRow int) {
		defer wg.Done()
		for y := startRow; y < endRow; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
		pixel1 := img1.At(x, y)
		pixel2 := img2.At(x, y)

		rgba := modFunction(color.RGBAModel.Convert(pixel1).(color.RGBA), color.RGBAModel.Convert(pixel2).(color.RGBA))
		newImage.Set(x, y, rgba)
			}
		}
	}(i*rowsPerGoroutine, min((i+1)*rowsPerGoroutine, height))
}
	wg.Wait()
	return newImage
}

// min returns the smaller of x or y.

func min(x, y int) int {
if x < y {
  return x
}
  return y
}
```

Basically it divides the pixels into 500 different chunks and passes them into the goroutine to process those pixels. I don't know what's happening under the hood, perse, but I can confirm that it dramatically sped up performance. But how can I know for sure?

### Performance benchmarking with b \*testing.B

I've never seen anything like this before Go, but Go makes it incredibly straightforward to test how fast a function executes.

I set up the following tests -

```go
package main

import (
	"image"
	"image/color"
	"testing"
)

func getTwoTestImages(dimension int) (image.Image, image.Image) {
	img1 := CreateNewImage(dimension, dimension, func(height, width int) color.RGBA {
	return color.RGBA{
			R: 200,G: 200,B: 200,A: 255,
		}
	})

	img2 := CreateNewImage(dimension, dimension, func(height, width int) color.RGBA {
		return color.RGBA{
		R: 100,G: 100,B: 100,A: 255
		}
	})
	return img1, img2
}

func getTestDimension() int {
	return 1000
}

func BenchmarkModifyImageConcurrent(b *testing.B) {
	img, img2 := getTwoTestImages(getTestDimension())
	b.ResetTimer() // Reset the timer to exclude the setup time
	for i := 0; i < b.N; i++ {
		_ = blendImagesConcurrently(img, img2, replaceHue)
	}
}

func BenchmarkModifyImage(b *testing.B) {
	img, img2 := getTwoTestImages(getTestDimension())
	b.ResetTimer() // Reset the timer to exclude the setup time
	for i := 0; i < b.N; i++ {
		_ = blendImages(img, img2, replaceHue)
	}
}
```

the value that returns from `getTestDimension` dictates the size of the test squares - so a value of `1000` would mean a `1000px x 1000px` square.

### Performance results

When I run with with `getTestDimension` set to `1000`, I get the following results. In the test time period, the Concurrent function ran 63 times, while the linear function ran 8 - just shy of 8 times faster. Though when I do the division of `128556984` nano seconds / `23612317` nano seconds I get 5.44 - so... either way it's faster?

```
goos: darwin
goarch: amd64
pkg: pioneer
cpu: VirtualApple @ 2.50GHz
BenchmarkModifyImageConcurrent-8              63          23612317 ns/op
BenchmarkModifyImage-8                         8         128556984 ns/op
PASS
```

Though when I drop drop the test image size to `300x300`, results become

```
goos: darwin
goarch: amd64
pkg: pioneer
cpu: VirtualApple @ 2.50GHz
BenchmarkModifyImageConcurrent-8            6544            177636 ns/op
BenchmarkModifyImage-8                       150           7855518 ns/op
```

Suddenly the concurrent implementation runs 43x faster? And this time, both the cycle count and the nano seconds per operation are much closer to the same ratio.

### How many coroutines should I run?

I don't know! I landed on 500 because that's when the code ran the fastest at `300x300`. I look forward to developing a deeper understanding of what's going on. Above 500 the performance started to dip - presumably due to the overhead of orchestrating the goroutines themselves.

### In conclusion

This exercise has inspired more questions than answers - namely -

- why is the goroutine function so much faster at smaller image sizes, but not as much faster at larger file sizes?
- Can I graph out speed performer by goroutine count for a bunch of image sizes to determine if there is an optimal goroutine count for different size bands?
- Does the optimal goroutine count vary by what computer is running the program?

Questions aside, I'm thrilled my application runs so much faster!!

![a blurry and colorful image made with the image processing tool](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2024-01-16%20goroutines/IMG_6345.jpg?t=2024-01-17T04%3A32%3A11.907Z)
_made with the Go program - now at least 8ish to 44ish times faster_
