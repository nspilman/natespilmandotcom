---
title: The tech behind this website
description: What it's built on and how it works
date: 2020-03-26T20:06:52.165Z
tags:
  - tech
  - javascript
  - meta
published: false
---
## Front End - Frameworks and styles - 
### Gridsome - Static site generation
[https://gridsome.org/](https://gridsome.org/)

Gridsome is a static site generator that generates static html based on the presence of blog content - in my case markdown files. I have a folder called `blog/` to which I point my `gridsome.config` file, and basically say "Generate a page per file in this per markdown file in this folder". This is valuable because every time I want to write a new post, I just write it and put it in the right place, and gridsome generates the file on next build. 

I've used Gatsby in the past, which does the same thing that Gridsome does with React instead of Vue. I've found Gridsome to be considerably more straight forward. 

### Vue JS
[https://vuejs.org/](https://vuejs.org/)

Vue.js is a javascript framework, used mostly for building single page applications. Gridsome sits on top of Vue.js, and instead of building into a single page application, it generates the html for each page. 

### HTML5up.net / Pixelarity
[https://html5up.net/](https://html5up.net/) / [https://pixelarity.com/](pixelarity.com)

HTML5up and Pixelarity provide the same beautiful html/css layouts - one on a free license and one on a subscription basis without the free license requirements attached. 

What I love about these templates, aside from how great they look, is that there's very little javascript in the templates. This makes them very easy to pop into a `vue/react` etc project. 

### SVG Background from https://www.svgbackgrounds.com/
[https://www.svgbackgrounds.com/](https://www.svgbackgrounds.com/)

My background is generated on svgbackgrounds.com, which has a fun and easy to use interface to generate fun custom backgrounds. The format is in SVG, which the browser natively compiles, so you end up with a code string to plug in as your background image, instead of an image file. 

Their backgrounds are free, as long as you mention them on the site you on which you use it. There is also a premium plan, for premium backgrounds. 

## Hosting and Deployment -
### Github

* Netlify
* Namecheap

## Content Management
* Netlify CMS


