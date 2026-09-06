"use client";

import React, { useState, useEffect, useRef } from "react";
import { Music, VolumeX, Disc } from "lucide-react";
import { weddingConfig } from "@/data/weddingConfig";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt playback on first user touch / scroll
    const startAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay policies might block initially until clicked
          });
      }
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
    };

    window.addEventListener("click", startAudio, { once: true });
    window.addEventListener("touchstart", startAudio, { once: true });

    return () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
    };
  }, [isPlaying]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Audio play error:", err));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingConfig.music.url}
        loop
        preload="auto"
      />
      <button
        onClick={togglePlay}
        className={`btn-circle-fab ${isPlaying ? "spin-music" : ""}`}
        title={isPlaying ? "Tạm dừng nhạc" : "Bật nhạc cưới"}
        aria-label="Điều khiển nhạc"
      >
        {isPlaying ? (
          <Disc size={22} className="text-white" />
        ) : (
          <VolumeX size={20} className="text-white" />
        )}
      </button>
    </>
  );
}
