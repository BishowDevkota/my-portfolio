"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const tryPlay = async () => {
      try {
        await videoElement.play();
      } catch {
      }
    };

    void tryPlay();
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover opacity-60 brightness-110 contrast-115 saturate-110 light:opacity-35 light:brightness-100 light:contrast-110"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
    >
      <source src="/videos/hero.mp4" type="video/mp4" />
    </video>
  );
}
