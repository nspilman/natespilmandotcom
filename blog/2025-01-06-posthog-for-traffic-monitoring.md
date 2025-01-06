---
favorite: true
title: Integrating Posthog for traffic monitoring
description: My working document for setting up Posthog
date: 2025-01-06
published: true
---

I am looking for a web traffic analytics platform, and Claude AI recommended [Posthog](https://posthog.com/). I [asked bsky](https://bsky.app/profile/natespilman.com/post/3lf2ki66nns2q) and got a few positive responses. I'm going to use this post to walk myself through the setup. 

## Signup - 
I used [Github SSO](https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on/about-authentication-with-saml-single-sign-on) to create my account and created a new Org within Posthog for my use. 

## Setup 
The onboarding workflow is strong. I can select my specific framework - in my case Next.js - and there's even a pinging feature to confirm setup when done. It looks like Posthog is entirely client side - at least the setup instructions are for the client side config. And I think that means that end users with tracking blockers on will not send Posthog events. That's fine - these data will be more directional than accurate. 

## Deployment

Of course, [I forgot to add my new environment variables](https://bsky.app/profile/natespilman.com/post/3lf3qqulp722w) to my Netlify deploy config, and spent a bit of time wondering why my site wasnt sending Posthog network requests before realizing it was failing silently. The boilerplate code should probably include some alerting mechanism - maybe fail the build - but I digress. 

## Initial thoughts 
Onboard was smooth, but so far I'm confused by the service. I'm not seeing what I'd expect to see - specifically - pageview events. [The docs](https://posthog.com/docs/product-analytics/autocapture) suggest that Pageviews should be autocaptured (without me needing to explicitly call the event in my code), but so far I'm not seeing any events on the Posthog dashboard. I'm am seeing the events being sent to Posthog from my browser. I'll give it a break down now, as maybe there's a lag.    