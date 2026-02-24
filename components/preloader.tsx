"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem("portfolio_loader_seen") === "1";
    if (hasSeenLoader) {
      setShouldRender(false);
      return;
    }

    document.body.classList.add("overflow-hidden");

    const animation = animate(count, 100, {
      duration: 2.5,
      ease: "easeInOut",
      onComplete: () => {
        setTimeout(() => {
          setIsComplete(true);
          sessionStorage.setItem("portfolio_loader_seen", "1");
          setTimeout(() => {
            setShouldRender(false);
            document.body.classList.remove("overflow-hidden");
          }, 800);
        }, 300);
      },
    });

    return () => {
      animation.stop();
      document.body.classList.remove("overflow-hidden");
    };
  }, [count]);

  if (!shouldRender) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black"
      initial={{ clipPath: "inset(0 0 0 0)" }}
      animate={
        isComplete
          ? { clipPath: "inset(0 0 100% 0)", transition: { duration: 1, ease: [0.77, 0, 0.175, 1] } }
          : { clipPath: "inset(0 0 0 0)" }
      }
      style={{ pointerEvents: isComplete ? "none" : "auto" }}
    >
      <div className="text-center">
        <motion.div className="text-8xl font-extrabold tracking-tight text-zinc-100">
          {rounded}
        </motion.div>
        <p className="mt-3 text-xs uppercase tracking-[0.5em] text-zinc-500">Initializing Portfolio</p>
      </div>
    </motion.div>
  );
}
