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
    } else if (audioRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      audioRef.current.src = src;
    }
  }, [src]);

  return <audio ref={audioRef} controls></audio>;
};

export default HLSAudioPlayer;
