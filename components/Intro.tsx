'use client';

import { motion } from 'framer-motion';

interface IntroProps {
  isVisible: boolean;
}

export default function Intro({ isVisible }: IntroProps) {
  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="max-w-xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-xl border border-stone-100 text-center space-y-8 my-8 relative overflow-hidden"
    >
      {/* Decorative Border Accent */}
      <div className="absolute inset-4 border border-emerald-800/10 rounded-xl pointer-events-none" />

      {/* Elegant Header Bismillah */}
      <div className="space-y-4">
        <div className="text-emerald-800 text-2xl md:text-3xl font-serif tracking-wide select-none">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </div>
        <p className="text-stone-400 font-sans text-xs tracking-widest uppercase">
          Dengan Nama Allah Yang Maha Pemurah Lagi Maha Penyayang
        </p>
      </div>

      {/* Welcoming Message */}
      <div className="space-y-2">
        <p className="text-stone-600 font-serif text-sm italic leading-relaxed px-4 md:px-8">
          &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.&rdquo;
        </p>
        <span className="block text-emerald-800 text-xs font-semibold tracking-wider font-sans">
          (Surah Ar-Rum: 21)
        </span>
      </div>

      <hr className="w-16 mx-auto border-t-2 border-amber-500/30" />

      {/* Parents Section */}
      <div className="space-y-3">
        <span className="text-amber-700 text-xs tracking-widest font-sans uppercase font-semibold">
          Walimatul Urus
        </span>
        <h3 className="text-stone-800 font-serif text-lg md:text-xl font-medium tracking-wide">
          Mohd Arifin bin Mat Jadi
          <span className="block text-stone-400 font-sans text-sm my-1">&amp;</span>
          Rafiah binti Saban
        </h3>
        <p className="text-stone-500 font-sans text-xs md:text-sm max-w-sm mx-auto leading-relaxed pt-2">
          Dengan penuh rasa kesyukuran ke hadrat Ilahi, kami mempersilakan Datuk / Datin / Tuan / Puan / Encik / Cik sekeluarga hadir ke majlis perkahwinan anakanda kesayangan kami:
        </p>
      </div>

      {/* Couple Names */}
      <div className="py-4 space-y-2">
        <h2 className="text-3xl md:text-4xl font-serif text-emerald-800 tracking-wide">
          Mashitah
        </h2>
        <span className="block text-stone-400 font-serif text-lg italic">&amp;</span>
        <h2 className="text-3xl md:text-4xl font-serif text-emerald-800 tracking-wide">
          Faruq
        </h2>
      </div>

      {/* Footer Text 
      <p className="text-stone-400 font-sans text-xs tracking-wider">
        Faruq bin Mansor
      </p>*/}
    </motion.div>
  );
}