'use client';

import { motion } from 'framer-motion';
import { Clock, Utensils, Heart, Camera, LogOut } from 'lucide-react';

export default function Timeline() {
  const schedule = [
    {
      time: '11:00 AM',
      title: 'Jamuan Makan Bermula',
      description: 'Ketibaan para tetamu jemputan dan hidangan disediakan.',
      icon: Utensils,
    },
    {
      time: '12:30 PM',
      title: 'Ketibaan Pengantin',
      description: 'Perarakan masuk pasangan pengantin ke pelaminan.',
      icon: Heart,
    },
    {
      time: '1:15 PM',
      title: 'Acara Memotong Kek & Sesi Fotografi',
      description: 'Acara memotong kek perkahwinan diikuti dengan sesi bergambar bersama keluarga dan tetamu.',
      icon: Camera,
    },
    {
      time: '4:00 PM',
      title: 'Majlis Bersurai',
      description: 'Ucapan penghargaan daripada pihak tuan rumah dan majlis tamat sepenuhnya.',
      icon: LogOut,
    },
  ];

  return (
    <section className="w-full max-w-xl mx-auto px-4 py-8 flex flex-col items-center">
      <div className="w-full bg-white rounded-2xl shadow-sm border border-stone-200/60 p-6 sm:p-8 relative">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-amber-700 font-sans tracking-[0.2em] text-xs uppercase font-semibold block mb-1">
            Agenda Day
          </span>
          <h2 className="font-serif text-2xl text-stone-800 tracking-wide">Aturcara Majlis</h2>
        </div>

        {/* Visual Dotted Timeline Container */}
        <div className="relative border-l border-stone-200 ml-4 md:ml-6 space-y-8">
          {schedule.map((item, index) => {
            const IconComponent = item.icon;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative pl-8 sm:pl-10 group"
              >
                {/* Node Icon Circle */}
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#2d4a43] text-amber-200 flex items-center justify-center border-4 border-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <IconComponent className="w-3.5 h-3.5" />
                </div>

                {/* Event Text block */}
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    {/* Time Badge */}
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/40 w-max">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </span>
                    {/* Title */}
                    <h3 className="font-sans font-semibold text-stone-800 text-sm md:text-base">
                      {item.title}
                    </h3>
                  </div>
                  {/* Description */}
                  <p className="text-stone-500 text-xs md:text-sm leading-relaxed pt-0.5">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}