---
favorite: true
title: I set up streaming audio with ffmpeg and aws
description: I'm hype about this. First step to becoming Spotify.
date: 2024-01-18
published: true
tags:
  - softwareEngineering
  - audio
  - "#blog"
---

I'm excited about this. I've been thinking of way to promote music for launches, and I thought - what if we could allow fans to give us their emails, and in exchange we link them a private stream of the song, as well as a heartfelt note of thanks for being a fan.

### Configuring Amazon Web Services & Chunking the Audio

To get this to work, I followed [this wonderfully instructional YouTube video](https://www.youtube.com/watch?v=iCZ7KULNQys) to get my Amazon S3 and Cloudfront services set up. The purpose of [S3](https://aws.amazon.com/s3/?nc2=h_ql_prod_st_s3) is to serve as web storage - as a place to put the files, with [Cloudfront](https://aws.amazon.com/cloudfront/?nc2=type_a) used to expose the files to the internet. 

At this point, I can put an audio file in an S3 bucket, but it's just the file. Nothing has been chunked for streaming. It looks like I could use [AWS Media Convert](https://aws.amazon.com/mediaconvert/?nc2=type_a) but couldn't get it to work, so I reached for the command line tool `ffmpeg.`

I then used `ffmpeg` to convert my `.wav` file into a bunch of chunked `.acc` files and a single instructional `.m3u8` file. This is so that we don't share an entire audio file, but instead stream audio at 10 second interval chunks to the client. 

```sh
`ffmpeg -i input.wav -c:a aac -b:a 192k -vn -hls_time 10 -hls_playlist_type vod -hls_segment_filename "segment_%03d.aac" output.m3u8`
```

Once those are in the S3 bucket, and I updated all the CORs permissions to allow other websites to query the endpoint, I was almost done! 

I don't know the specifics, but basically we can now point and `<audio/>` element at our `.m3u8` on Cloudfront. The page will make the request and then somehow understand to start streaming in the rest of the files. 

### Updating my website 
Rendering the audio player in the blog is a little tricky for two reasons. The first is that there's no native markdown that I'm aware of that is natively rendered to the audio player, and that I need to polyfill support for `hls`, which I understand as `the thing that allows us to stream in this audio.` 

so I installed `hls.js` and ChatGPT wrote this Audio component for me 
```tsx
import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface Props {
  src: string;
}

const HLSAudioPlayer = ({ src }: Props) => {
  const audioRef = useRef<HTMLMediaElement>(null);

  useEffect(() => {
    if (Hls.isSupported() && audioRef.current) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(audioRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        audioRef.current?.play();
      });
    } else if (audioRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      audioRef.current.src = src;
      audioRef.current.addEventListener("loadedmetadata", function () {
        audioRef.current?.play();
      });
    }
  }, [src]);

  return <audio ref={audioRef} controls></audio>;
};

export default HLSAudioPlayer;

```

Extending the pattern introduced [here](https://natespilman.com/blog/2024-01-14-markdown-transformation-layer), I updated the `link` value to render the new `HLSAudioPlayer` when the file `href` ends with `.m3u8`
```
const renderers: { [nodeType: string]: RendererFunction } = {
  a: ({ href = "", children }): React.ReactElement => {
    if (href.endsWith(".m3u8")) {
      return <HLSAudioPlayer src={href} />;
    }
    return renderLink({ href, children });
  },
  ...
}
```


I share this in honor of the late Nicholas Hazel, who commissioned this song from me for the intro to [his podcast series](https://www.youtube.com/watch?v=BpRVdXdUq98). There was one episode, but I'm still forever honored. He was a fellow Software engineer, a kind and creative thinker. I think he'd be honored to know it was my "hello world" here.   

[Tech Debt theme](https://d3qxyro07qwbpl.cloudfront.net/stream/output.m3u8)



