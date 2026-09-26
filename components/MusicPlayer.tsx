"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { VolumeX, Disc } from "lucide-react";
import { weddingConfig } from "@/data/weddingConfig";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  const playAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || isPlayingRef.current) return false;

    try {
      audio.volume = 0.5;
      await audio.play();
      isPlayingRef.current = true;
      setIsPlaying(true);
      return true;
    } catch {
      // iOS/Safari chỉ cho phát âm thanh trong một thao tác chạm hợp lệ.
      // Giữ listener để lần chạm tiếp theo vẫn có thể thử lại.
      return false;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleInteraction = async () => {
      if (await playAudio()) {
        document.removeEventListener("click", handleInteraction);
        document.removeEventListener("touchend", handleInteraction);
      }
    };

    // Desktop có thể autoplay; iPhone sẽ phát ngay ở lần chạm đầu tiên.
    void playAudio();
    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchend", handleInteraction, { passive: true });

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchend", handleInteraction);
    };
  }, [playAudio]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      isPlayingRef.current = false;
      setIsPlaying(false);
    } else {
      void playAudio();
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="metadata" playsInline>
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
