"use client";

import React, { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

export default function FallingPetals() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const petalCount = Math.min(20, Math.floor(window.innerWidth / 35));
    const petals: Petal[] = [];

    // Cherry blossom pink colors
    const colors = [
      "rgba(232, 180, 184, OPACITY)", // pink
      "rgba(245, 213, 216, OPACITY)", // soft pink
      "rgba(255, 230, 235, OPACITY)", // light pink
      "rgba(255, 255, 255, OPACITY)", // white
    ];

    for (let i = 0; i < petalCount; i++) {
      const opacity = 0.4 + Math.random() * 0.5;
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 6 + Math.random() * 7,
        speedY: 0.5 + Math.random() * 0.7,
        speedX: -0.3 + Math.random() * 0.6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity,
        color: colors[Math.floor(Math.random() * colors.length)].replace("OPACITY", String(opacity))
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;

      ctx.beginPath();
      // Cherry blossom petal shape
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.8, p.size, 0, 0, p.size * 0.6);
      ctx.bezierCurveTo(-p.size, 0, -p.size * 0.8, -p.size * 0.8, 0, -p.size);
      ctx.fill();

      ctx.restore();
    };

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.3;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      }

      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 50
      }}
    />
  );
}
