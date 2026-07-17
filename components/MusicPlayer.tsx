'use client';

import { useEffect, useRef } from 'react';

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function MusicPlayer({ isPlaying, setIsPlaying }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Fallback if browser blocks instant action
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src="/music.mp3" loop />
      
      <button
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isPlaying 
            ? 'bg-emerald-800 text-amber-200 border-2 border-amber-300/40 rotate-infinite animate-[spin_8s_linear_infinite]' 
            : 'bg-stone-100 text-stone-500 hover:bg-stone-200 border border-stone-300'
        }`}
        aria-label="Toggle Background Music"
      >
        {isPlaying ? (
          // Disc / Music Note Icon when playing
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 0v15m0-15l-10.5 3m10.5-3V16.5m-10.5 3L21 16.5M9 5.25v13.5m0-13.5L3 8.25m6-3L3 8.25m0 0v13.5" />
          </svg>
        ) : (
          // Play Icon when paused
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 translate-x-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
          </svg>
        )}
      </button>
    </div>
  );
}