// src/app/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image"; // Import Image component
import { AnimatePresence, motion } from "framer-motion";
import GachaponMachine from "./components/gachupan-machine";
import CapsuleReveal from "./components/capsule-reveal";
import JigsawGame from "./components/jigsaw-game"; 
import { MEMORIES } from "@/lib/photos"; 

type GameState = "IDLE" | "REVEALING" | "PUZZLE";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("IDLE");
  const [currentPhoto, setCurrentPhoto] = useState(MEMORIES[0].src);

  const handleMachineDone = () => {
    const randomIndex = Math.floor(Math.random() * MEMORIES.length);
    setCurrentPhoto(MEMORIES[randomIndex].src);
    setGameState("REVEALING");
  };

  const handleRevealDone = () => setGameState("PUZZLE");
  const handleReset = () => setGameState("IDLE");

  return (
    <main className="h-screen w-full relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* --- BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background3.png"
          alt="Cozy Background"
          fill
          priority
          className="object-cover"
        />
        {/* Optional Overlay: Adds a soft white tint so text remains readable */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      </div>

      {/* --- MAIN CONTENT (z-10 to sit above background) --- */}
      <div className="z-10 relative w-full h-full flex flex-col items-center justify-center">

        {/* STAGE 1: The Machine */}
        <AnimatePresence mode="wait">
          {gameState === "IDLE" && (
            <motion.div 
              key="machine"
              className="flex flex-col items-center gap-8"
              exit={{ opacity: 0, y: 100, transition: { duration: 0.5 } }}
            >
              <div className="text-center space-y-2">
                <div className="relative border-10 border-red-300 ">
                  <div className="absolute top-0 left-0 z-40 h-2 w-2 bg-red-300"></div>
                  <div className="absolute top-0 right-0 z-40 h-2 w-2 bg-red-300"></div>
                  <div className="absolute bottom-0 left-0 z-40 h-2 w-2 bg-red-300"></div>
                  <div className="absolute bottom-0 right-0 z-40 h-2 w-2 bg-red-300"></div>
                <h1 className="font-display text-4xl md:text-6xl text-red-300 drop-shadow-sm bg-white px-8 py-4   backdrop-blur-md">
                  Memory Machine
                </h1>
                </div>
                  
                <p className="relative  border-4 border-red-300 font-sans text-lg text-red-400 font-bold bg-white px-4 py-2  inline-block">
                  Insert a coin to collect a moment.
                </p>

              </div>
              
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
             className="w-full flex justify-center"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
          >
            <JigsawGame 
              imageSrc={currentPhoto} 
              onReset={handleReset} 
            />
          </motion.div>
        )}
      </div>

    </main>
  );
}