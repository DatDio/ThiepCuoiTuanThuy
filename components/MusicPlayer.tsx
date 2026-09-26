"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Music, VolumeX, Disc } from "lucide-react";
import { weddingConfig } from "@/data/weddingConfig";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Cố gắng tự động phát
    const attemptPlay = () => {
      if (isPlaying) return;
      audio.volume = 0.5;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            hasInteracted.current = true;
          })
          .catch(() => {
            // Autoplay bị chặn, đợi người dùng tương tác
            setIsPlaying(false);
          });
      }
    };

    // Tự động thử phát sau khi tải trang
    const timer = setTimeout(attemptPlay, 500);

    // Khi người dùng bấm/chạm màn hình lần đầu
    const handleInteraction = () => {
      if (hasInteracted.current) return;
      hasInteracted.current = true;
      attemptPlay();
      
      // Gỡ bỏ event sau khi đã tương tác để tránh lỗi spam play()
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("scroll", handleInteraction, { once: true, passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };
  }, [isPlaying]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.5;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          hasInteracted.current = true;
        })
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
