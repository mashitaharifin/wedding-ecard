'use client';

import { useState } from 'react';
import Envelope from '@/components/Envelope';
import Intro from '@/components/Intro';
import Details from '@/components/Details';
import RSVPForm from '@/components/RSVPForm';
import MusicPlayer from '@/components/MusicPlayer';
import Timeline from '@/components/Timeline';

export default function Home() {
  const [envelopeState, setEnvelopeState] = useState<'closed' | 'opening' | 'revealed'>('closed');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const handleOpenEnvelope = () => {
    setEnvelopeState('opening');
    
    // Smoothly transition from opening state to fully revealed page views
    setTimeout(() => {
      setEnvelopeState('revealed');
      setIsMusicPlaying(true); // Start the music perfectly as the envelope unfolds!
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] text-stone-800 relative">
      
      {/* 1. Envelope Display (Remains centered when closed, scrolls away when revealed) */}
      <div className={`transition-all duration-1000 ${envelopeState === 'revealed' ? 'pt-8 pb-4' : 'min-h-screen flex items-center justify-center'}`}>
        <Envelope state={envelopeState} onOpen={handleOpenEnvelope} />
      </div>

      {/* 2. Revealed Content (Introductions & Details flow beautifully down the page) */}
      {envelopeState === 'revealed' && (
        <div className="px-4 pb-24 space-y-12 max-w-4xl mx-auto animate-[fadeIn_1.5s_ease-out]">
          
          {/* New Introduction & Bismillah Card */}
          <Intro isVisible={true} />

          {/* Original Details & Invitation Countdown */}
          <Details />

          {/* New Visual Event Schedule */}
          <Timeline />

          {/* Original RSVP Section */}
          <RSVPForm />
          
        </div>
      )}

      {/* 3. Global Floating Sound Component */}
      {envelopeState === 'revealed' && (
        <MusicPlayer isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />
      )}
    </main>
  );
}