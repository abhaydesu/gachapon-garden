"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface GachaponProps {
  onDispense: () => void;
}

export default function GachaponMachine({ onDispense }: GachaponProps) {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleInteract = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
      onDispense();
    }, 2000);
  };

  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={isSpinning ? { x: [-2, 2, -2, 2, 0], rotate: [-0.5, 0.5, -0.5, 0.5, 0] } : {}}
        transition={{ duration: 0.4, repeat: isSpinning ? 4 : 0 }}
      >
        <div className="w-[300px] bg-rose-400 rounded-3xl p-3 pb-6 shadow-xl relative border-b-8 border-rose-500">
          
          
          <div className="absolute top-4 left-4 w-3 h-3 bg-gray-800 rounded-full opacity-60" />
          <div className="absolute top-4 right-4 w-3 h-3 bg-gray-800 rounded-full opacity-60" />

          
          <div className="h-16 flex items-center justify-center mb-2">
            <div className="bg-red-500 px-4 py-1 border-4 border-red-600 shadow-sm transform -rotate-1">
              <span className="text-white font-display font-black tracking-widest text-sm uppercase">
                Play Here
              </span>
            </div>
          </div>

          
          <div className="bg-yellow-400 p-2 rounded-t-lg">
          
             <div className="h-4 bg-teal-600 rounded-t-md opacity-20 mb-1 mx-2" />
          
             <div className="h-64 bg-teal-100/50 relative border-4 border-black/5 rounded-lg overflow-hidden backdrop-blur-[2px]">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-1 h-8 bg-gray-400" /> {/* Rod */}
                    <div className="w-3 h-4 bg-gray-500 rounded-sm" /> {/* Joint */}
                    {/* Pincers */}
                    <div className="flex -mt-1">
                        <div className="w-8 h-8 border-4 border-gray-600 rounded-full border-t-0 border-r-0 rotate-45" />
                        <div className="w-8 h-8 border-4 border-gray-600 rounded-full border-t-0 border-l-0 -rotate-45" />
                    </div>
                </div>

                <div className="absolute bottom-9 w-full flex justify-center flex-wrap gap-1 px-4 mb-2">
                    <Capsule color="bg-rose-400" icon="❤️" rotate="-rotate-12" />
                    <Capsule color="bg-blue-400" icon="😴" rotate="rotate-6" />
                    <Capsule color="bg-neutral-400" icon="😈" rotate="rotate-6" />
                </div>
                <div className="absolute bottom-0 w-full flex justify-center flex-wrap gap-1 px-4 mb-2">
                    <Capsule color="bg-yellow-400" icon="😎" rotate="-rotate-45" />
                    <Capsule color="bg-teal-400" icon="🥺" rotate="rotate-12" />
                    <Capsule color="bg-purple-400" icon="🥰" rotate="-rotate-6" />
                    <Capsule color="bg-orange-400" icon="😺" rotate="rotate-45" />
                    <Capsule color="bg-rose-300" icon="✨" rotate="rotate-0" />
                </div>

                <div className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-white/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 right-6 w-2 h-16 bg-white/40 rounded-full rotate-20" />
             </div>
          </div>

          <div className="bg-teal-600 h-20 flex items-center justify-between px-6 border-y-4 border-black/10 relative z-20">
             <div className="w-10 h-14 bg-yellow-600/30 rounded flex items-center justify-center border-2 border-yellow-600/50">
                <div className="w-2 h-8 bg-black/60 rounded-full" />
             </div>

             <div className="relative top-2 group">
                
                <AnimatePresence>
                  {!isSpinning && (
                    <motion.div 
                      className="absolute -top-14 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none w-20 z-50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                        <motion.div 
                          className="bg-white text-rose-500 text-[10px] font-black px-2 py-1 rounded shadow-sm mb-1 uppercase tracking-wide whitespace-nowrap"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        >
                            Click Me!
                        </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="w-12 h-12 bg-red-600 rounded transform rotate-45 border-4 border-red-800 shadow-lg" />
                <motion.button
                    onClick={handleInteract}
                    className="absolute -top-6 left-3 w-6 h-12 bg-black rounded-full flex items-center justify-center cursor-pointer origin-bottom"
                    animate={isSpinning ? { rotate: [-15, 15, -15, 15, 0] } : {}}
                    transition={{ duration: 0.5, repeat: isSpinning ? 3 : 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="w-10 h-10 bg-black rounded-full -mt-12 shadow-md border-b-4 border-gray-800" />
                </motion.button>
             </div>

             <div className="flex gap-2">
                <div className="w-8 h-8 bg-yellow-400 rounded-full border-b-4 border-yellow-600 shadow-sm" />
                <div className="w-8 h-8 bg-red-500 rounded-full border-b-4 border-red-700 shadow-sm" />
             </div>
          </div>

          <div className="bg-yellow-400 h-32 rounded-b-xl flex flex-col items-center justify-center pt-2">
             <div className="w-16 h-20 bg-white rounded-xl border-4 border-gray-200 flex flex-col items-center justify-center shadow-inner">
                <div className="w-2 h-6 bg-black/10 rounded-full mb-1" />
                <div className="w-2 h-6 bg-black/10 rounded-full" />
             </div>
             
             <div className="mt-4 w-48 h-12 bg-gray-700 rounded-lg border-b-4 border-gray-900 flex items-center justify-center overflow-hidden relative">
                 <div className="w-40 h-2 bg-black/50 rounded-full" />
             </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

function Capsule({ color, icon, rotate }: { color: string; icon: string; rotate: string }) {
  return (
    <div className={`w-12 h-12 rounded-full border-2 border-black/10 ${color} flex items-center justify-center shadow-md relative -ml-2 hover:z-10 ${rotate}`}>
        <span className="text-xl opacity-80">{icon}</span>
        <div className="absolute top-2 right-2 w-3 h-3 bg-white/40 rounded-full" />
    </div>
  );
}