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
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked - will play on user interaction
        });
    }
  }, [isPlaying]);

  useEffect(() => {
    // Try autoplay immediately on mount
    if (!hasTriedAutoplay.current) {
      hasTriedAutoplay.current = true;
      // Small delay to ensure audio element is ready
      setTimeout(() => tryPlay(), 300);
    }

    // Also try on any user interaction
    const startOnInteraction = () => {
      tryPlay();
    };

    window.addEventListener("click", startOnInteraction);
    window.addEventListener("touchstart", startOnInteraction);
    window.addEventListener("scroll", startOnInteraction, { passive: true });
    window.addEventListener("keydown", startOnInteraction);

    return () => {
      window.removeEventListener("click", startOnInteraction);
      window.removeEventListener("touchstart", startOnInteraction);
      window.removeEventListener("scroll", startOnInteraction);
      window.removeEventListener("keydown", startOnInteraction);
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
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src={weddingConfig.music.url} type="audio/mpeg" />
      </audio>
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
