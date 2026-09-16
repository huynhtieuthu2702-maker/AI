import React from 'react';
import { motion } from 'motion/react';

export const CosmicBackground: React.FC = () => {
  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none select-none overflow-hidden -z-10"
    >
      {/* 1. Deep Space Base Background Color & Distant Nebula Glows */}
      <div className="absolute inset-0 bg-[#070b14]" />
      
      {/* Top Center Nebula Aura */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] md:w-[1000px] h-[550px] bg-gradient-to-b from-indigo-700/25 via-purple-700/15 to-transparent rounded-full blur-3xl opacity-80" />
      
      {/* Left Cyan Nebula */}
      <div className="absolute top-1/4 -left-40 w-[450px] h-[450px] bg-cyan-600/15 rounded-full blur-3xl opacity-70" />
      
      {/* Right Violet Nebula */}
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-3xl opacity-70" />
      
      {/* Bottom Emerald Aurora */}
      <div className="absolute -bottom-32 left-1/3 w-[600px] h-[400px] bg-emerald-600/10 rounded-full blur-3xl opacity-60" />

      {/* 2. Floating Planet 1: Ringed Violet Giant (Top-Left) */}
      <motion.div
        className="absolute top-12 left-4 sm:left-12 md:left-24"
        animate={{
          y: [0, -16, 0],
          rotate: [-15, -12, -15],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative flex items-center justify-center">
          {/* Planet Sphere */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-indigo-950 via-purple-800 to-indigo-500 shadow-2xl shadow-indigo-600/30 border border-indigo-400/25 relative overflow-hidden">
            {/* Planet shadow/shading */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/40 to-black/80" />
            <div className="absolute top-2 left-3 w-8 h-4 rounded-full bg-indigo-300/30 blur-xs" />
          </div>

          {/* Planetary Ring */}
          <div className="absolute w-40 sm:w-52 md:w-60 h-10 sm:h-12 md:h-14 rounded-[100%] border-2 border-cyan-400/50 shadow-md shadow-cyan-400/30 transform -rotate-25 pointer-events-none">
            <div className="w-full h-full rounded-[100%] border border-purple-400/30" />
          </div>
        </div>
      </motion.div>

      {/* 3. Floating Planet 2: Glowing Cyan Ice World (Bottom-Right) */}
      <motion.div
        className="absolute bottom-16 right-6 sm:right-16 md:right-24"
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          {/* Atmosphere Glow */}
          <div className="absolute -inset-2 rounded-full bg-cyan-500/20 blur-md" />
          {/* Planet Sphere */}
          <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-cyan-300 via-teal-600 to-slate-950 shadow-2xl shadow-cyan-500/40 border border-cyan-300/40 relative overflow-hidden">
            {/* Swirling bands */}
            <div className="absolute top-3 left-0 right-0 h-2 bg-white/20 blur-[1px] rotate-6" />
            <div className="absolute top-8 left-0 right-0 h-3 bg-cyan-200/20 blur-[1px] -rotate-3" />
            <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-slate-950/90 to-transparent" />
          </div>
        </div>
      </motion.div>

      {/* 4. Floating Planet 3: Golden Amber Crater Moon (Top-Right) */}
      <motion.div
        className="absolute top-24 right-8 sm:right-20 md:right-32"
        animate={{
          y: [0, -12, 0],
          x: [0, 8, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-amber-950 via-amber-600 to-amber-300 shadow-xl shadow-amber-500/30 border border-amber-300/40 relative overflow-hidden">
            {/* Craters */}
            <div className="absolute top-2 left-3 w-2.5 h-2.5 rounded-full bg-amber-900/60 shadow-inner" />
            <div className="absolute top-5 left-7 w-3.5 h-3.5 rounded-full bg-amber-900/50 shadow-inner" />
            <div className="absolute bottom-3 left-4 w-2 h-2 rounded-full bg-amber-950/70" />
            <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>
      </motion.div>

      {/* 5. Floating Planet 4: Deep Sapphire Dwarf Planet with Orbiting Tiny Moon (Bottom-Left) */}
      <motion.div
        className="absolute bottom-28 left-6 sm:left-20 md:left-32 hidden sm:block"
        animate={{
          y: [0, -14, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative w-14 h-14 md:w-18 md:h-18">
          {/* Main small planet */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-400 via-indigo-800 to-slate-950 shadow-lg shadow-indigo-500/20 border border-indigo-400/30" />
          
          {/* Tiny orbiting satellite moon */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-200 shadow-xs shadow-cyan-300"
            animate={{
              x: [0, 8, 0, -8, 0],
              y: [0, 4, 0, -4, 0],
              scale: [1, 1.2, 1, 0.8, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </motion.div>

      {/* 6. Twinkling Starlight Points */}
      <div className="absolute inset-0">
        {[
          { top: '15%', left: '20%', size: 'w-1 h-1', delay: 0 },
          { top: '25%', left: '75%', size: 'w-1.5 h-1.5', delay: 1.2 },
          { top: '40%', left: '10%', size: 'w-1 h-1', delay: 2.4 },
          { top: '65%', left: '85%', size: 'w-1 h-1', delay: 0.8 },
          { top: '80%', left: '30%', size: 'w-1.5 h-1.5', delay: 1.8 },
          { top: '10%', left: '55%', size: 'w-1 h-1', delay: 3.1 },
          { top: '50%', left: '60%', size: 'w-1 h-1', delay: 2.0 },
          { top: '75%', left: '15%', size: 'w-1 h-1', delay: 1.5 },
          { top: '35%', left: '90%', size: 'w-1 h-1', delay: 0.5 },
        ].map((star, idx) => (
          <motion.div
            key={idx}
            className={`absolute ${star.size} rounded-full bg-white shadow-sm shadow-cyan-300`}
            style={{ top: star.top, left: star.left }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 3 + (idx % 3),
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 7. Subtle Shooting Star Spark */}
      <motion.div
        className="absolute w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-300 to-white -rotate-35"
        style={{ top: '18%', right: '22%' }}
        animate={{
          x: [-60, 200],
          y: [-30, 100],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 9,
          ease: "easeOut",
        }}
      />
    </div>
  );
};
