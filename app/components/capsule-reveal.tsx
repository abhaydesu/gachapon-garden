// src/components/CapsuleReveal.tsx
"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface CapsuleRevealProps {
  onOpenComplete: () => void; // Called when the capsule has fully opened
}

export default function CapsuleReveal({ onOpenComplete }: CapsuleRevealProps) {
  const [phase, setPhase] = useState<"drop" | "open">("drop");

  useEffect(() => {
    // Phase 1: Wait for the drop animation to finish, then switch to "open"
    if (phase === "drop") {
      const timer = setTimeout(() => {
        setPhase("open");
      }, 1200); // Wait for bounce to finish
      return () => clearTimeout(timer);
    }

    // Phase 2: Wait for open animation to finish, then notify parent
    if (phase === "open") {
      const timer = setTimeout(() => {
        onOpenComplete();
      }, 800); // Wait for scale up to finish
      return () => clearTimeout(timer);
    }
  }, [phase, onOpenComplete]);

  useEffect(() => {
    if (phase === "open") {
      const audio = new Audio("/pop.mp3");
      audio.volume = 0.5;
      audio.play().catch(() => {}); // Catch error if user hasn't interacted yet
    }
  }, [phase]);

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
      
      {/* The Capsule */}
      <motion.div
        className="w-32 h-32 rounded-full bg-blush-400 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden relative"
        
        // Initial State (Hidden inside machine)
        initial={{ y: -200, opacity: 0, scale: 0.5 }}
        
        // Animation based on Phase
        animate={
          phase === "drop" 
            ? { y: 150, opacity: 1, scale: 1, rotate: 360 } // Falling down
            : { scale: 20, opacity: 0 } // Exploding/Opening up
        }
        
        // Physics for the bounce
        transition={
          phase === "drop"
            ? { type: "spring", stiffness: 120, damping: 12, delay: 0.2 }
            : { duration: 0.8, ease: "easeInOut" }
        }
      >
        {/* Decorative stripe on the ball */}
        <div className="absolute w-full h-4 bg-white/30 rotate-45" />
        <div className="absolute w-4 h-4 bg-white rounded-full top-6 right-8 opacity-50" />
      </motion.div>
    </div>
  );
}