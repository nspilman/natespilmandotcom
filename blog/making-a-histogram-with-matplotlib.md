---
title: 'JPG Light Value Analysis with Python, PIL and MatPlotLib'
description: Building a Histogram to analyze the light values of an image
date: 2020-04-01T04:37:20.180Z
tags:
  - python
  - matplotlib
  - histogram
  - data science
  - pillow
published: false
---
## Introduction

We'll be making a histogram using `matplotlib` to display light distribution of pixel count in JPG images. Each pixel has an RGB value(red, green, blue) ranging 0 to 255, with the light value representing the sum of those values. `(0,0,0)` is black - zero light, and `(255,255,255)` is white - full light. Our `x` axis range will be 0 to 765. 

For example -  The light distribution of the this image ...![alt text](https://images.unsplash.com/photo-1583364481915-dacea3e06d18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80 "Example Image for Light Distribution")

<br>
*image from [unsplash.com](unsplash.com)*
[](unsplash.com)... is this - 


![](/uploads/3lightdistroimages_introexample.png)

We can see a large distribution of dark pixels than light ones. 



Why are we doing this? Because we can! While I don't have a ton of specific use cases for this, being able to use data to answer questions is important. Our initial question is "What is the light distribution of this image?" 



## What we'll be doing? 

All of the following steps are in Python.  

1.  Use `PIL` to load an image into memory. 

2. Shrink the image down to a pixel size we can more easily view. 

3. Use `numpy` to convert our image into an array. Flatten the 3d array into a 2d array of the RGB values. 

4. Convert the pixel array into an array of the pixel light values - the sun of the rgb values.  

5. Use `matplotlib` to generate the histogram. 

Let's get started! 

---
## Use PIL to load an image into memory.
```python 
from PIL import Image

def getImageFromUrl(url):
    response = requests.get(url)
    return Image.open(BytesIO(response.content))

image = getImageFromUrl("https://images.unsplash.com/photo-1583364481915-dacea3e06d18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80")
```

---
## Shrink the image down to a pixel size we can more easily view. 
``` python

def resize_setLargestSide(image,maxSide):
    width,height = image.size
    widthRatio = width / (width + height)
    heightRatio = height / (width + height)
    if width > height:
        newWidth = maxSide
        widthPlusHeight = newWidth / widthRatio
        newHeight = widthPlusHeight - newWidth
    else:
        newHeight = maxSide
        widthPlusHeight = newHeight / heightRatio
        newWidth = widthPlusHeight - newHeight
    return image.resize((int(newWidth),int(newHeight)))

newImage = resize_setLargestSide(image,150)
```
---
## Use `numpy` to convert our image into an array. Flatten the 3d array into a 2d array of the RGB values. 

```python
imageArray = np.array(newImage)
shape = imageArray.shape
reshapedImage = imageArray.reshape(shape[0] * shape[1],shape[2])
```

---
## Convert the pixel array into an array of the pixel light values - the sun of the rgb values.  

```python
colorValues = [sum(pixel) for pixel in reshapedImage]
```

---
5. Use `matplotlib` to generate the histogram. 

```python
import matplotlib.pyplot as plt

def generateHistogram(x,bins,labels,axis,facecolor = 'blue'):
    plt.hist(x, bins=bins, facecolor = 'blue')
    plt.ylabel(labels.get('ylabel'))
    plt.xlabel(labels['xlabel'])
    plt.title(labels['title'])
    plt.axis(axis)
    return plt

histogram = generateHistogram(colorValues,20,{"title":'Light Values',"xlabel":"Pixel Concentration","ylabel":"Amount of Light"},[0,775,0,4000])
histogram.show()

```
