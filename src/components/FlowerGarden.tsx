import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';

interface FlowerItem {
  id: string;
  type: 'rose' | 'tulip' | 'daisy' | 'lavender' | 'orchid';
  color: string;
  xOffset: number; // percentage horizontal offset
  height: number;  // height in px
  rotation: number;
  scale: number;
  quote: string;
}

const FLOWER_TYPES = [
  {
    type: 'rose' as const,
    name: 'Rosa Rosa',
    color: '#fb7185',
    emoji: '🌹',
    quote: '🌹 "La rosa es reina de las flores, pero tú eres la reina de mi corazón."',
    svg: (color: string) => (
      <svg viewBox="0 0 100 200" className="w-full h-full">
        {/* Stem */}
        <path d="M 50,190 C 50,150 45,90 50,60" fill="none" stroke="#65a30d" strokeWidth="4" strokeLinecap="round" />
        <path d="M 50,130 Q 30,120 25,125" fill="none" stroke="#65a30d" strokeWidth="3" strokeLinecap="round" />
        <path d="M 50,100 Q 70,90 75,95" fill="none" stroke="#65a30d" strokeWidth="3" strokeLinecap="round" />
        {/* Leaves */}
        <path d="M 25,125 Q 35,115 50,130 Z" fill="#4d7c0f" />
        <path d="M 75,95 Q 65,85 50,100 Z" fill="#4d7c0f" />
        {/* Bud layers */}
        <ellipse cx="50" cy="55" rx="20" ry="15" fill={color} />
        <path d="M 33,52 C 35,32 65,32 67,52 C 60,65 40,65 33,52 Z" fill="#f43f5e" />
        <path d="M 40,48 C 42,38 58,38 60,48 C 55,55 45,55 40,48 Z" fill="#e11d48" />
        <circle cx="50" cy="46" r="6" fill="#be123c" />
        {/* Outer petal flaps */}
        <path d="M 30,55 C 20,40 35,30 45,45 Z" fill={color} opacity="0.9" />
        <path d="M 70,55 C 80,40 65,30 55,45 Z" fill={color} opacity="0.9" />
      </svg>
    ),
  },
  {
    type: 'tulip' as const,
    name: 'Tulipán Rojo',
    color: '#ef4444',
    emoji: '🌷',
    quote: '🌷 "Como los tulipanes que buscan el sol, mi vida entera busca tu calor."',
    svg: (color: string) => (
      <svg viewBox="0 0 100 200" className="w-full h-full">
        {/* Stem */}
        <path d="M 50,190 Q 55,130 50,70" fill="none" stroke="#4d7c0f" strokeWidth="3.5" />
        {/* Long blade leaf */}
        <path d="M 52,140 Q 75,100 70,80 Q 60,110 51,125" fill="#65a30d" />
        {/* Tulip cup petals */}
        <path d="M 32,70 C 25,40 42,30 50,55 C 58,30 75,40 68,70 C 60,82 40,82 32,70 Z" fill={color} />
        <path d="M 40,70 C 35,45 45,35 50,60 C 55,35 65,45 60,70 Z" fill="#dc2626" />
        <path d="M 46,72 C 43,55 57,55 54,72 Z" fill="#991b1b" />
      </svg>
    ),
  },
  {
    type: 'daisy' as const,
    name: 'Margarita Blanca',
    color: '#ffffff',
    emoji: '🌼',
    quote: '🌼 "Un millón de margaritas no bastan para contarte todo lo que te adoro."',
    svg: (color: string) => (
      <svg viewBox="0 0 100 200" className="w-full h-full">
        {/* Stem */}
        <path d="M 50,190 C 48,150 52,100 50,65" fill="none" stroke="#65a30d" strokeWidth="3" />
        {/* Side leaf */}
        <path d="M 49,120 Q 32,105 35,100 Q 42,108 49,112" fill="#4d7c0f" />
        {/* Petals */}
        <g transform="translate(50, 65)">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
            <ellipse
              key={angle}
              cx="0"
              cy="-16"
              rx="5"
              ry="16"
              fill={color}
              stroke="#fbcfe8"
              strokeWidth="0.5"
              transform={`rotate(${angle})`}
            />
          ))}
          {/* Yellow Center */}
          <circle cx="0" cy="0" r="9" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
        </g>
      </svg>
    ),
  },
  {
    type: 'lavender' as const,
    name: 'Lavanda Dulce',
    color: '#a855f7',
    emoji: '🪻',
    quote: '🪻 "Como la lavanda, tu presencia perfuma mi alma con paz y alegría profunda."',
    svg: (color: string) => (
      <svg viewBox="0 0 100 200" className="w-full h-full">
        {/* Stem */}
        <path d="M 50,190 L 50,60" fill="none" stroke="#4d7c0f" strokeWidth="2.5" />
        {/* Lavender beads on stem */}
        <g fill={color} stroke="#7e22ce" strokeWidth="0.5">
          <ellipse cx="50" cy="50" rx="6" ry="4" />
          <ellipse cx="44" cy="60" rx="5" ry="3.5" />
          <ellipse cx="56" cy="60" rx="5" ry="3.5" />
          <ellipse cx="50" cy="70" rx="6.5" ry="4" />
          <ellipse cx="43" cy="80" rx="5" ry="3.5" />
          <ellipse cx="57" cy="80" rx="5" ry="3.5" />
          <ellipse cx="50" cy="90" rx="6.5" ry="4" />
          <ellipse cx="45" cy="100" rx="5" ry="3.5" />
          <ellipse cx="55" cy="100" rx="5" ry="3.5" />
          <ellipse cx="50" cy="110" rx="6" ry="4" />
          <circle cx="50" cy="40" r="3.5" fill="#c084fc" />
        </g>
      </svg>
    ),
  },
  {
    type: 'orchid' as const,
    name: 'Orquídea Exótica',
    color: '#ec4899',
    emoji: '🌸',
    quote: '🌸 "Eres única, delicada y deslumbrante como la más preciosa de las orquídeas."',
    svg: (color: string) => (
      <svg viewBox="0 0 100 200" className="w-full h-full">
        {/* Curved elegant stem */}
        <path d="M 50,190 C 45,150 40,110 52,65" fill="none" stroke="#65a30d" strokeWidth="3" />
        {/* Orchid petals */}
        <g transform="translate(52, 65)">
          {/* Back sepals */}
          <ellipse cx="0" cy="-14" rx="10" ry="14" fill="#f472b6" />
          <ellipse cx="-12" cy="8" rx="10" ry="14" fill="#f472b6" transform="rotate(-45)" />
          <ellipse cx="12" cy="8" rx="10" ry="14" fill="#f472b6" transform="rotate(45)" />
          {/* Front wing petals */}
          <ellipse cx="-16" cy="-4" rx="15" ry="11" fill={color} />
          <ellipse cx="16" cy="-4" rx="15" ry="11" fill={color} />
          {/* Center Orchid Lip */}
          <path d="M -8,4 Q 0,18 8,4 Q 4,-4 0,0 Q -4,-4 -8,4 Z" fill="#9d174d" stroke="#f43f5e" strokeWidth="1" />
          <circle cx="0" cy="0" r="3" fill="#fde047" />
        </g>
      </svg>
    ),
  }
];

interface FlowerGardenProps {
  onPlayPop: () => void;
}

export default function FlowerGarden({ onPlayPop }: FlowerGardenProps) {
  const [flowers, setFlowers] = useState<FlowerItem[]>([]);
  const [activeQuote, setActiveQuote] = useState<string>('🌸 Haz clic en una flor para agregarla a tu jarrón de amor.');

  const addFlower = (type: typeof FLOWER_TYPES[number]) => {
    onPlayPop();
    
    // Create random traits for variety in the vase bouquet
    const xOffset = Math.floor(Math.random() * 46) + 27; // center nicely within vase mouth
    const height = Math.floor(Math.random() * 45) + 145; // height variations
    const rotation = Math.floor(Math.random() * 34) - 17; // rotation lean left or right
    const scale = 0.8 + Math.random() * 0.3; // scale size

    const newFlower: FlowerItem = {
      id: `flower-${Date.now()}-${Math.random()}`,
      type: type.type,
      color: type.color,
      xOffset,
      height,
      rotation,
      scale,
      quote: type.quote,
    };

    setFlowers((prev) => [...prev, newFlower].slice(-16)); // max 16 flowers in vase
    setActiveQuote(type.quote);
  };

  const clearBouquet = () => {
    if (flowers.length === 0) return;
    setFlowers([]);
    setActiveQuote('❀ El jarrón está listo para una nueva combinación de flores.');
    onPlayPop();
  };

  return (
    <div id="flower-garden-container" className="w-full max-w-2xl px-4 py-8 flex flex-col items-center">
      <div className="bg-white border border-pink-100 p-6 rounded-3xl shadow-[0_10px_30px_rgba(255,133,161,0.15)] w-full flex flex-col items-center relative overflow-hidden">
        
        {/* Heading */}
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#C9184A] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C9184A] animate-pulse" /> Flores Especiales
          </span>
          <h2 className="font-display text-[#590D22] text-2xl font-bold mt-1">Un Jarrón de Flores para Carolina</h2>
          <p className="text-xs text-[#590D22]/80 mt-1 italic">
            Elige hermosas flores para diseñar un ramo personalizado. Cada flor lleva consigo un sentimiento sincero.
          </p>
        </div>

        {/* Live quote board */}
        <div className="w-full min-h-[52px] bg-[#FFF0F3]/40 border border-[#FFE5EC] rounded-2xl p-3 flex items-center justify-center text-center shadow-inner mb-6">
          <p className="font-script text-xl md:text-2xl text-[#590D22] leading-relaxed">
            {activeQuote}
          </p>
        </div>

        {/* Bouquet Action Board / Flower selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full mb-6">
          {FLOWER_TYPES.map((flower) => (
            <button
              key={flower.type}
              onClick={() => addFlower(flower)}
              className="bg-white hover:bg-[#FFE5EC]/50 border border-pink-100 rounded-2xl p-2 flex flex-col items-center gap-1 justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-95 group cursor-pointer"
            >
              <span className="text-2xl group-hover:animate-bounce">{flower.emoji}</span>
              <span className="text-xs font-serif font-semibold text-[#C9184A]">{flower.name}</span>
            </button>
          ))}
        </div>

        {/* The Vase Scene Stage */}
        <div className="relative w-full h-[320px] bg-gradient-to-b from-[#FFF0F3]/20 to-[#FFE5EC]/40 rounded-2xl border border-pink-100 overflow-hidden flex flex-col items-center justify-end shadow-inner p-4">
          
          {/* Floral sway wind simulation background elements */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-300 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-rose-200 rounded-full blur-2xl"></div>
          </div>

          {/* Rendered Custom Flowers in Vase */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <AnimatePresence>
              {flowers.map((fl) => {
                const flowerConfig = FLOWER_TYPES.find((f) => f.type === fl.type);
                if (!flowerConfig) return null;

                return (
                  <motion.div
                    key={fl.id}
                    initial={{ y: 80, opacity: 0, scale: 0 }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      scale: fl.scale,
                      rotate: [fl.rotation - 3, fl.rotation + 3, fl.rotation - 3],
                    }}
                    exit={{ y: 50, opacity: 0, scale: 0 }}
                    transition={{
                      default: { type: 'spring', stiffness: 120, damping: 15 },
                      rotate: {
                        repeat: Infinity,
                        duration: 4 + Math.random() * 2,
                        ease: "easeInOut"
                      }
                    }}
                    style={{
                      position: 'absolute',
                      left: `${fl.xOffset}%`,
                      bottom: '90px', // sit inside the vase throat
                      width: '60px',
                      height: `${fl.height}px`,
                      transformOrigin: 'bottom center',
                    }}
                    className="origin-bottom"
                  >
                    {flowerConfig.svg(fl.color)}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Glass Vase Design */}
          <div className="relative w-28 h-28 z-20 flex flex-col items-center justify-end">
            
            {/* Liquid inside the vase */}
            <div className="absolute bottom-2 inset-x-3 h-16 bg-[#FFB3C1]/30 rounded-b-xl border-t border-pink-300/40 backdrop-blur-xs flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#FF758F]/50 fill-[#FF758F]/20 animate-pulse" />
            </div>

            {/* Glass body */}
            <div className="absolute inset-0 bg-white/30 border-2 border-white/60 rounded-3xl shadow-lg backdrop-blur-md flex items-center justify-center">
              {/* Glass shimmer glare */}
              <div className="absolute top-4 left-3 w-2 h-16 bg-white/40 rounded-full rotate-6"></div>
              
              {/* Custom Golden Love Crest on Vase */}
              <div className="bg-[#FFE5EC] border border-[#FF85A1] rounded-full p-1.5 flex items-center justify-center shadow-xs">
                <Heart className="w-4 h-4 text-[#C9184A] fill-[#FF85A1]" />
              </div>
            </div>

            {/* Vase neck / mouth */}
            <div className="absolute -top-3 w-16 h-4 bg-white/40 border-2 border-white/60 rounded-full shadow-sm z-30"></div>
          </div>

          {/* Table surface */}
          <div className="w-48 h-2 bg-gradient-to-r from-pink-200/40 via-pink-300/50 to-pink-200/40 rounded-full shadow z-0"></div>

        </div>

        {/* Clear bouquet button */}
        {flowers.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={clearBouquet}
            className="mt-4 flex items-center gap-1 px-4 py-1.5 bg-[#FFE5EC] hover:bg-[#FFD1DC] text-[#C9184A] rounded-full text-xs font-serif font-semibold border border-pink-200 transition-all shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reiniciar Jarrón
          </motion.button>
        )}

      </div>
    </div>
  );
}
