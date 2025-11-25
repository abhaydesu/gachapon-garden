"use client";

import { useState } from "react";
import { JigsawPuzzle } from "react-jigsaw-puzzle";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css"; 
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { Download } from "lucide-react"; 

interface JigsawGameProps {
  imageSrc: string; 
  onReset: () => void; 
}

export default function JigsawGame({ imageSrc, onReset }: JigsawGameProps) {
  const [isSolved, setIsSolved] = useState(false);

  // Configure difficulty
  const rows = 3;
  const columns = 3;

  const handleSolved = () => {
    setIsSolved(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6 p-4">
        
      {/* 1. Confetti */}
      {isSolved && <div className="absolute top-0 h-full w-full ">
      <Confetti  recycle={false} numberOfPieces={500} gravity={0.2} />
      </div>}

      {/* 2. Header */}
      <div className="text-center space-y-2">
         <div className="relative border-10 border-red-300 py-4 px-8 bg-white">
                  <div className="absolute top-0 left-0 z-40 h-2 w-2 bg-red-300"></div>
                  <div className="absolute top-0 right-0 z-40 h-2 w-2 bg-red-300"></div>
                  <div className="absolute bottom-0 left-0 z-40 h-2 w-2 bg-red-300"></div>
                  <div className="absolute bottom-0 right-0 z-40 h-2 w-2 bg-red-300"></div>
        <h2 className="font-display text-3xl text-red-300">
          {isSolved ? "Memory Restored!" : "Piece it together"}
        </h2>
        {!isSolved && (
          <p className="text-red-300 font-sans text-sm">
            Drag the pieces to complete the photo.
          </p>
        )}
        </div>
      </div>

      {/* 3. The Puzzle Area */}
      <motion.div 
        className="relative p-4 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-4 border-milktea-300"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* The Game Board Wrapper */}
        {/* WE ADD THE CUSTOM CLASS HERE INSTEAD */}
        <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] relative jigsaw-puzzle-custom-css">
            <JigsawPuzzle
              imageSrc={imageSrc}
              rows={rows}
              columns={columns}
              onSolved={handleSolved}
            />
        </div>
        

        {/* Success Overlay */}
        {isSolved && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 backdrop-blur-[2px] rounded-lg z-10 flex flex-col items-center justify-center gap-4"
          >
            <div className="bg-red-300 p-2 relative">
                <div className="absolute h-2 w-2 bg-red-300 top-2 left-2"></div>
                <div className="absolute h-2 w-2 bg-red-300 top-2 right-2"></div>
                <div className="absolute h-2 w-2 bg-red-300 bottom-2 left-2"></div>
                <div className="absolute h-2 w-2 bg-red-300 bottom-2 right-2"></div>
            <div className="bg-white p-6 shadow-2xl flex flex-col items-center gap-4 text-center max-w-lg">
              <span className="text-4xl"></span>
              <h3 className="font-display text-xl text-ink">It&apos;s Beautiful!</h3>
              <p className="text-sm text-ink/70 font-sans">
                You&apos;ve unlocked a core memory.
              </p>
              <div className="flex gap-8">
              <a 
                href={imageSrc} 
                download="our-memory.jpg"
                className="flex items-center gap-2 text-sm bg-blush-500 text-white px-6 py-2 rounded-full font-display hover:bg-blush-300 transition-colors shadow-lg"
              >
                <Download size={18} />
                Download 
              </a>

              <button 
                onClick={onReset}
                className="hover:text-ink gap-2 text-sm bg-blush-500 text-white px-6 py-2 rounded-full font-display hover:bg-blush-300 transition-colors shadow-lg cursor-pointer"
              >
                Play Again
              </button>
              </div>
            </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}