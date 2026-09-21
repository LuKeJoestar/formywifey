import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Clock } from 'lucide-react';

export default function AnniversaryTracker() {
  const anniversaryDate = '2026-04-12';
  
  const [timePassed, setTimePassed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const anniversary = new Date(anniversaryDate);
      const now = new Date();
      const diffMs = now.getTime() - anniversary.getTime();

      if (diffMs <= 0) {
        setTimePassed({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimePassed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [anniversaryDate]);

  return (
    <div id="anniversary-tracker" className="w-full max-w-2xl px-4 py-6">
      <div className="bg-white border border-amber-100 p-6 rounded-3xl shadow-[0_10px_30px_rgba(255,133,161,0.15)] flex flex-col items-center relative overflow-hidden">
        
        {/* Heart Watermarks */}
        <div className="absolute top-2 left-2 text-[#F8D66D] opacity-40">
          <Heart className="w-8 h-8 fill-[#FFF0A8] text-amber-200" />
        </div>
        <div className="absolute bottom-2 right-2 text-[#F8D66D] opacity-40">
          <Heart className="w-10 h-10 fill-[#FFF0A8] text-amber-200" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-center w-full border-b border-amber-100 pb-3 mb-6">
          <span className="text-xs font-sans uppercase tracking-wider font-bold text-[#8A5A00] flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#8A5A00]" /> Nuestro Tiempo Juntos
          </span>
        </div>

        {/* Beating Heart Counter Core */}
        <div className="text-center mb-6">
          <p className="text-xs text-[#D99A00] uppercase tracking-widest font-sans font-bold mb-1">Días Amándote</p>
          
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="flex items-center justify-center gap-2 mb-2"
          >
            <Heart className="w-8 h-8 text-[#8A5A00] fill-[#E9B949]" />
            <h3 className="font-display text-[#4A3600] text-4xl md:text-5xl font-black tracking-tight">
              {timePassed.days.toLocaleString()}
            </h3>
            <Heart className="w-8 h-8 text-[#8A5A00] fill-[#E9B949]" />
          </motion.div>
          
          <p className="text-xs font-serif italic text-[#4A3600]/80">
            desde el {new Date(anniversaryDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Detailed Countdown Clock Blocks */}
        <div className="grid grid-cols-3 gap-3 w-full">
          <div className="bg-[#FFF9DB] border border-[#FFF0A8] rounded-2xl p-3 flex flex-col items-center shadow-xs">
            <span className="text-xl md:text-2xl font-black text-[#4A3600] font-sans tracking-tight">
              {String(timePassed.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-serif uppercase tracking-widest text-[#8A5A00] font-semibold mt-0.5">Horas</span>
          </div>
          <div className="bg-[#FFF9DB] border border-[#FFF0A8] rounded-2xl p-3 flex flex-col items-center shadow-xs">
            <span className="text-xl md:text-2xl font-black text-[#4A3600] font-sans tracking-tight">
              {String(timePassed.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-serif uppercase tracking-widest text-[#8A5A00] font-semibold mt-0.5">Minutos</span>
          </div>
          <div className="bg-[#FFF9DB] border border-[#FFF0A8] rounded-2xl p-3 flex flex-col items-center shadow-xs">
            <span className="text-xl md:text-2xl font-black text-[#8A5A00] font-sans tracking-tight animate-pulse">
              {String(timePassed.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-serif uppercase tracking-widest text-[#8A5A00] font-semibold mt-0.5">Segundos</span>
          </div>
        </div>

        {/* Sweet footer quote */}
        <div className="mt-5 text-center">
          <p className="text-xs font-serif italic text-[#4A3600] leading-relaxed max-w-md">
            "Cada hora, cada minuto y cada segundo a tu lado, Carolina, confirma que contigo encontré mi lugar favorito en el universo entero."
          </p>
        </div>

      </div>
    </div>
  );
}
