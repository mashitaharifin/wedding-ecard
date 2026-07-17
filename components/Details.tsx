'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

export default function Details() {
  // SET YOUR WEDDING DATE HERE (YYYY-MM-DDTHH:mm:ss)
  // Let's assume a dummy date next year for calculation framework
  const weddingDate = new Date('2026-10-11T11:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <section className="w-full max-w-xl mx-auto px-4 py-12 flex flex-col items-center">
      
      {/* 1. HERO PHOTO FRAME */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full h-80 rounded-2xl overflow-hidden shadow-xl mb-10 relative border-4 border-white"
      >
        {/* Container frame for the couple's photo */}
      <div className="w-full h-64 md:h-80 bg-stone-100 rounded-lg overflow-hidden relative border border-stone-200/50 shadow-md">
        <Image 
          src="/background.jpeg" 
          alt="Wedding Couple Photo Portfolio" 
          fill
          priority
          sizes="(max-w-md) 100vw, (max-w-lg) 50vw, 800px"
          className="object-cover"
        />
      </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
      </motion.div>

      {/* 2. HEADER TYPOGRAPHY 
      <div className="text-center mb-12">
        <span className="text-amber-700 font-sans tracking-[0.2em] text-xs uppercase font-semibold block mb-2">
          Walimatul Urus
        </span>
        <h1 className="font-serif text-4xl text-stone-800 tracking-wide my-2">
          Mashitah <span className="text-xl block text-stone-400 font-sans my-1">&</span> Faruq
        </h1>
        <p className="text-stone-500 font-serif italic text-sm mt-4 max-w-sm mx-auto">
          &quot;And We created you in pairs.&quot; • (Quran 78:8)
        </p>
      </div>*/}

      {/* 3. COUNTDOWN TIMER */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-sm mb-16 bg-white p-4 rounded-xl shadow-sm border border-stone-200/60 text-center">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Mins', value: timeLeft.minutes },
          { label: 'Secs', value: timeLeft.seconds },
        ].map((item, index) => (
          <div key={index} className="flex flex-col p-2">
            <span className="font-mono text-2xl font-bold text-[#2d4a43]">{item.value}</span>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 mt-1">{item.label}</span>
          </div>
        ))}
      </div>

      {/* 4. EVENT DETAILS CONTAINER */}
      <div className="w-full space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-stone-200/60 mb-12">
        
        {/* Date Row */}
        <div className="flex items-start gap-4 p-2">
          <Calendar className="w-5 h-5 text-amber-700 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-sans font-semibold text-stone-800 text-sm">Date</h3>
            <p className="text-stone-600 text-sm mt-0.5">Sunday, 11 October 2026</p>
          </div>
        </div>

        {/* Time Row */}
        <div className="flex items-start gap-4 p-2">
          <Clock className="w-5 h-5 text-amber-700 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-sans font-semibold text-stone-800 text-sm">Time</h3>
            <p className="text-stone-600 text-sm mt-0.5">11:00 AM - 4:00 PM</p>
          </div>
        </div>

        {/* Venue Location Row */}
        <div className="flex items-start gap-4 p-2">
          <MapPin className="w-5 h-5 text-amber-700 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-sans font-semibold text-stone-800 text-sm">Venue</h3>
            <p className="text-stone-600 text-sm mt-0.5">Kayla Hall Empire, Eko Perniagaan Kota Masai,</p>
            <p className="text-stone-500 text-xs mt-1">Johor Bahru, Johor</p>
            
            {/* Quick Map Action Triggers */}
            <div className="flex gap-3 mt-3">
              <a 
                href="https://maps.app.goo.gl/svWNT26xkzGzaBtz8" 
                target="_blank" 
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-sans text-xs font-medium rounded-md transition-colors border border-stone-200"
              >
                Google Maps
              </a>
              <a 
                href="https://www.waze.com/en/live-map/directions/my/johor-darul-tazim/pasir-gudang/kayla-hall-empire?place=ChIJA8FTcV5B2jERalVaBEfCZkU" 
                target="_blank" 
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-sans text-xs font-medium rounded-md transition-colors border border-stone-200"
              >
                Waze Directions
              </a>
            </div>
          </div>
        </div>

        {/* Contact Person Details */}
        <div className="flex items-start gap-4 p-2 border-t border-stone-100 pt-4">
          <Phone className="w-5 h-5 text-amber-700 mt-1 flex-shrink-0" />
          <div className="w-full">
            <h3 className="font-sans font-semibold text-stone-800 text-sm mb-2">Contact Persons</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-stone-50 rounded border border-stone-100">
                <p className="font-semibold text-stone-700">Encik Arifin (Father)</p>
                <a href="https://wa.me/60137121612" className="text-emerald-700 mt-0.5 block hover:underline">WhatsApp</a>
              </div>
              <div className="p-2 bg-stone-50 rounded border border-stone-100">
                <p className="font-semibold text-stone-700">Puan Rafiah (Mother)</p>
                <a href="https://wa.me/60137962903" className="text-emerald-700 mt-0.5 block hover:underline">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}