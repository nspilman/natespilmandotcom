---
title: All Junior Web Developers should have personal websites
description: Because it's just so easy these days
date: 2020-11-10T04:14:50.378Z
tags:
  - Career
  - development
published: true
favorite: false
---
This is mostly targeted at Junior folks, but I recommend the following to any professional moderately savvy in html/css/js. If you're building a portfolio site to show off your projects, this is the high level guide for you. Otherwise, it's just nice to have a place on the internet to put stuff and call your own that's not an internet profile owned by Facebook or Medium. 

Perfecting your portfolio site or personal and professional blog isn't easy, but setting one up actually is. Here are the steps - 

1. Buy a domain. 
2. Set up a good looking site. 
3. Deploy the site. 
4. Bonus stuff - convert your site into a Single Page Application or a Staticly Generated Site. 

## Buy a Domain

Buy a domain. For example, you may be reading this on Natespilman.com. I use <https://www.namecheap.com/>, but there are a ton of domain vendors to choose from. 

## Set Up a Good Looking Site

This is the difficult step if you let it be. If you're trying to get a job as a designer, design away. If you're not, use other people's web designs. <https://html5up.net/> has a bunch of business website templates that you can download for free. Find the one that suits your needs and make modifications you need. 

## Deploy your site

If your site is just html/css and a bit of javascript, you can use <https://pages.github.com/> to deploy your site directly from Github. Namecheap has a bunch of great documentation on [transferring domains](https://www.namecheap.com/support/knowledgebase/article.aspx/9645/2208/how-do-i-link-my-domain-to-github-pages). If you're deploying a single page application or something with a build command, Netlify.com if your ticket. 

## Converting your site into an SPA or SSG -

*SPA - Single Page Application, SSG - Static Site Generated*

My favorite aspect of the html templates from[ https://html5up.net/](https://html5up.net/) is that they don't use much javascript at all in their styling. Therefore, it's a fairly straightforward process to migrate templates into React, Vue, etc components. I may go more into detail on this in a later post, but let me know if you have any questions around this process. 

Once you have your website running as an SPA, you can go one step further and convert it to a statically generated site. This is beneficial if you're interested in blogging, as each new markdown file can be rendered into a page on your site. The website also loads faster, as static sites build and deploy all individual pages, instead of shipping a single JS bundle. Popular static site generators include Gatsby and Next (React based) and Gridsome and Nuxt (Vue based), among many others.