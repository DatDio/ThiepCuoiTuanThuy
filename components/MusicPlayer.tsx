"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Music, VolumeX, Disc } from "lucide-react";
import { weddingConfig } from "@/data/weddingConfig";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasTriedAutoplay = useRef(false);

  const tryPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || isPlaying) return;

    audio.volume = 0.5;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay blocked
        });
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!hasTriedAutoplay.current) {
      hasTriedAutoplay.current = true;
      setTimeout(() => tryPlay(), 300);
    }

    const startOnInteraction = () => tryPlay();

    window.addEventListener("click", startOnInteraction);
    window.addEventListener("touchstart", startOnInteraction);
    window.addEventListener("scroll", startOnInteraction, { passive: true });

    return () => {
      window.removeEventListener("click", startOnInteraction);
      window.removeEventListener("touchstart", startOnInteraction);
      window.removeEventListener("scroll", startOnInteraction);
    };
  }, [tryPlay]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.5;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Audio play error:", err));
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src={weddingConfig.music.url} type="audio/mpeg" />
      </audio>
      <button
        onClick={togglePlay}
        className={`music-btn-fixed ${isPlaying ? "playing" : ""}`}
        title={isPlaying ? "Tạm dừng nhạc" : "Bật nhạc cưới"}
        aria-label="Điều khiển nhạc"
      >
        {isPlaying ? (
          <Disc size={18} />
        ) : (
          <VolumeX size={16} />
        )}
      </button>
    </>
  );
}
