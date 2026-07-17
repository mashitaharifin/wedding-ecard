'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

interface EnvelopeProps {
  state: 'closed' | 'opening' | 'revealed';
  onOpen: () => void;
}

export default function Envelope({ state, onOpen }: EnvelopeProps) {
  
  // Animation variants for the 3D Top Flap
  const topFlapVariants: Variants = {
    closed: { rotateX: 0, zIndex: 30 },
    opening: { 
      rotateX: 180, 
      zIndex: 10, 
      transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] } // Explicit cubic-bezier for easeInOut
    }
  };

  // Animation variants for the Invitation Card sliding out
  const cardVariants: Variants = {
    closed: { y: 0, scale: 0.95, zIndex: 20 },
    opening: { 
      y: -280, 
      scale: 1.02,
      zIndex: 25,
      transition: { delay: 0.6, duration: 0.7, ease: [0, 0, 0.2, 1] } // Explicit cubic-bezier for easeOut
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Visual Instruction */}
      {state === 'closed' && (
        <motion.p 
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-stone-500 font-serif mb-6 text-sm tracking-widest uppercase"
        >
          You have received an invitation
        </motion.p>
      )}

      {/* 3D PERSPECTIVE WRAPPER */}
      <div 
        className="relative w-[340px] h-[460px] sm:w-[380px] sm:h-[500px] shadow-2xl rounded-b-xl"
        style={{ perspective: '1200px' }}
      >
        
        {/* LAYER 1: BACK POCKET & INNER LINING */}
        <div className="absolute inset-0 bg-stone-200 rounded-b-xl overflow-hidden border border-stone-300">
          <div className="absolute inset-x-2 top-2 bottom-0 bg-[#2d4a43] rounded-t-lg opacity-90 shadow-inner flex items-center justify-center">
            <span className="font-serif text-amber-200/20 text-4xl tracking-widest uppercase pointer-events-none select-none">
              Wedding
            </span>
          </div>
        </div>

        {/* LAYER 2: TOP FLAP */}
        <motion.div 
          variants={topFlapVariants}
          initial="closed"
          animate={state !== 'closed' ? 'opening' : 'closed'}
          className="absolute top-0 left-0 w-full h-1/2 bg-[#233a34] origin-top border-t border-emerald-950/20 shadow-lg"
          style={{ 
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transformStyle: 'preserve-3d'
          }}
        />

        {/* LAYER 3: THE ACTUAL INVITATION CARD */}
        <motion.div 
          variants={cardVariants}
          initial="closed"
          animate={state !== 'closed' ? 'opening' : 'closed'}
          className="absolute inset-x-4 top-4 bottom-4 bg-white rounded-lg p-6 shadow-xl flex flex-col items-center justify-between border border-stone-100"
        >
          {/* Main Visual Frame using Next.js Image Component */}
          <div className="w-full h-48 bg-stone-100 rounded-md overflow-hidden relative border border-stone-200/50">
            <Image 
              src="/background.jpeg" 
              alt="Wedding Couple Photo Portfolio" 
              fill
              priority
              sizes="(max-w-md) 100vw, 400px"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-stone-900/10 pointer-events-none" />
          </div>

          {/* Card Invitation Preview Typography */}
          <div className="text-center my-auto flex flex-col items-center">
            <span className="text-amber-700 text-xs tracking-widest font-sans uppercase font-semibold mb-1">
              The Wedding Of
            </span>
            <h2 className="font-serif text-2xl text-stone-800 tracking-wide my-1">
              Mashitah & Faruq
            </h2>
            <p className="text-stone-400 font-sans text-xs tracking-wider mt-2">
              Save The Date 
            </p>
          </div>
        </motion.div>

        {/* LAYER 4: FRONT LOWER POCKET */}
        <div 
          className="absolute bottom-0 left-0 w-full h-2/3 bg-[#2d4a43] rounded-b-xl z-28 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] border-t border-emerald-800/10"
          style={{ clipPath: 'polygon(0 35%, 100% 35%, 100% 100%, 0 100%)' }}
        />
        <div 
          className="absolute bottom-0 left-0 w-full h-2/3 bg-[#253f38] rounded-b-xl z-29"
          style={{ clipPath: 'polygon(0 35%, 50% 70%, 100% 35%, 100% 100%, 0 100%)' }}
        />

        {/* LAYER 5: WAX SEAL BUTTON */}
        {state === 'closed' && (
          <motion.button 
            onClick={onOpen}
            whileHover={{ scale: 1.08, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#8c2525] rounded-full border-4 border-[#d4af37] text-[#f3e5ab] flex items-center justify-center font-serif text-xs font-bold tracking-wider shadow-[0_4px_15px_rgba(0,0,0,0.3)] z-40 cursor-pointer select-none"
          >
            <span className="drop-shadow-md">OPEN</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}