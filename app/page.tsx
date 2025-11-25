// src/app/page.tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GachaponMachine from "./components/gachupan-machine";
import CapsuleReveal from "./components/capsule-reveal";
import JigsawGame from "./components/jigsaw-game"; 
import { MEMORIES } from "@/lib/photos"; 

// We removed "DISPENSING" because the machine component handles that delay internally
type GameState = "IDLE" | "REVEALING" | "PUZZLE";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("IDLE");
  const [currentPhoto, setCurrentPhoto] = useState(MEMORIES[0].src);

  // This function runs AFTER the machine finishes its 2-second spin
  const handleMachineDone = () => {
    // 1. Pick a random photo NOW
    const randomIndex = Math.floor(Math.random() * MEMORIES.length);
    setCurrentPhoto(MEMORIES[randomIndex].src);

    // 2. Immediately transition to the capsule drop
    setGameState("REVEALING");
  };

  const handleRevealDone = () => setGameState("PUZZLE");
  const handleReset = () => setGameState("IDLE");

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center bg-matcha-100 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-matcha-300 rounded-full opacity-20 blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-blush-300 rounded-full opacity-20 blur-2xl animate-pulse" />

      {/* STAGE 1: The Machine */}
      <AnimatePresence mode="wait">
        {gameState === "IDLE" && (
          <motion.div 
            key="machine"
            className="z-10 flex flex-col items-center gap-8"
            exit={{ opacity: 0, y: 100, transition: { duration: 0.5 } }}
          >
            <div className="text-center space-y-2">
              <h1 className="font-display text-4xl md:text-6xl text-matcha-500 drop-shadow-sm ">
                Memory Machine
              </h1>
              <p className="font-sans text-lg text-ink/60">
                Insert a coin to collect a moment.
              </p>
            </div>
            
            {/* When the spin finishes, it triggers handleMachineDone */}
            <GachaponMachine onDispense={handleMachineDone} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 2: The Capsule Drop */}
      {gameState === "REVEALING" && (
        <CapsuleReveal onOpenComplete={handleRevealDone} />
      )}

      {/* STAGE 3: The Puzzle */}
      {gameState === "PUZZLE" && (
        <motion.div 
           key="puzzle"
           className="z-20 w-full"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
        >
          <JigsawGame 
            imageSrc={currentPhoto} 
            onReset={handleReset} 
          />
        </motion.div>
      )}

    </main>
  );
}