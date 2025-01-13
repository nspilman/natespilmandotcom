import React, { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  autoPlay?: boolean;
  showDuration?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export const MP3AudioPlayer = ({ 
  src, 
  autoPlay = false,
  showDuration = true,
  onPlay,
  onPause,
  onEnded 
}: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState<string>("0:00");
  const [currentTime, setCurrentTime] = useState<string>("0:00");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = src;
      if (autoPlay) {
        audioRef.current.play();
      }
    }
  }, [src, autoPlay]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(formatTime(audioRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(formatTime(audioRef.current.duration));
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    onPlay?.();
  };

  const handlePause = () => {
    setIsPlaying(false);
    onPause?.();
  };

  return (
    <div className="flex flex-col gap-2">
      <audio 
        ref={audioRef}
        controls
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={onEnded}
      />
      {showDuration && (
        <div className="text-sm text-gray-600">
          {currentTime} / {duration}
        </div>
      )}
    </div>
  );
};
