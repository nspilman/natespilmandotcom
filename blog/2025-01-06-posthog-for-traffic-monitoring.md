
I am looking for a web traffic analytics platform, and Claude AI recommended [Posthog](https://posthog.com/). I [asked bsky](https://bsky.app/profile/natespilman.com/post/3lf2ki66nns2q) and got a few positive responses. I'm going to use this post to walk myself through the setup. 

## Signup - 
I used [Github SSO](https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on/about-authentication-with-saml-single-sign-on) to create my account and created a new Org within Posthog for my use. 

The onboarding workflow is strong. I can select my specific framework - in my case Next.js - and there's even a pinging feature to confirm setup when done. It looks like Posthog is entirely client side - at least the setup instructions are for the client side config. And I think that means that end users with tracking blockers on will not send Posthog events. That's fine - these data will be more directional than accurate. 

