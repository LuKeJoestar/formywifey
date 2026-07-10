import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import FloatingHearts from './components/FloatingHearts';
import LoveLetter from './components/LoveLetter';
import FlowerGarden from './components/FlowerGarden';
import AnniversaryTracker from './components/AnniversaryTracker';
import { 
  playRomanticChime, 
  playFlowerPop 
} from './utils/audio';

const SPANISH_PHRASES = [
  "No hay día en el que mi corazón no elija estar contigo.",
  "Tu amor es mi melodía preferida y mi hogar favorito.",
  "Te amo no solo por cómo eres, sino por cómo soy cuando estoy contigo.",
  "A tu lado, el mundo tiene colores mucho más hermosos.",
  "Carolina: eres la coincidencia más bonita de mi universo entero.",
  "Cada mirada tuya es un poema que no necesita palabras.",
  "Eres mi principio, mi medio y mi final absoluto.",
  "Te amo desde el primer suspiro hasta el infinito, mi amor.",
  "Mi felicidad tiene tu nombre escrito: Carolina.",
  "En tus ojos veo mi presente, mi futuro y mi paz.",
  "Eres el sueño del que nunca en mi vida quiero despertar.",
  "Contigo aprendí lo que significa amar de verdad.",
  "Eres la razón de mi sonrisa de todos los días.",
  "Mi rincón favorito del mundo es estar acurrucado a tu lado.",
  "Eres mi flor eterna, la más bella en este jardín de amor."
];

export default function App() {
  const [currentPhrase, setCurrentPhrase] = useState(SPANISH_PHRASES[0]);
  const [phraseKey, setPhraseKey] = useState(0);

  const getNewPhrase = () => {
    playFlowerPop();
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * SPANISH_PHRASES.length);
    } while (SPANISH_PHRASES[nextIndex] === currentPhrase);
    
    setCurrentPhrase(SPANISH_PHRASES[nextIndex]);
    setPhraseKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#FFF0F3] flex flex-col items-center py-10 px-4 relative overflow-hidden selection:bg-pink-200 select-none">
      
      {/* Background Hearts System */}
      <FloatingHearts />

      {/* Background ambient lighting blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#FFB3C1]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-10 w-60 h-60 bg-[#FF85A1]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Container */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl text-center mb-8 relative z-20"
      >
        <span className="text-pink-500 uppercase tracking-[0.3em] text-xs font-bold font-sans flex items-center justify-center gap-1.5">
          <Heart className="w-4 h-4 fill-pink-500 animate-pulse text-pink-500" /> Creado Especialmente Para Ti
        </span>
        
        <h1 className="font-display italic text-[#C9184A] text-5xl md:text-6xl font-normal mt-2 tracking-wide">
          Para Mi Querida Carolina
        </h1>
        
        <p className="font-serif italic text-[#590D22]/80 text-sm md:text-base mt-2 max-w-md mx-auto leading-relaxed">
          Un rinconcito de amor interactivo, diseñado para recordarte lo valiosa que eres y lo mucho que te amo.
        </p>
      </motion.header>

      {/* Main Container Content */}
      <main className="w-full max-w-2xl flex flex-col items-center gap-6 relative z-10">
        
        {/* Love Phrase / Daily Quote Generative Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-white border border-pink-100 p-6 rounded-3xl shadow-[0_10px_30px_rgba(255,133,161,0.15)] flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="absolute top-2 right-2 text-pink-200">
            <Sparkles className="w-8 h-8" />
          </div>

          <p className="text-xs text-pink-500 uppercase tracking-widest font-sans font-bold mb-3">Pensamiento de Amor</p>
          
          <div className="min-h-[50px] flex items-center justify-center px-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={phraseKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="font-script text-[#590D22] text-2xl md:text-3xl leading-relaxed"
              >
                "{currentPhrase}"
              </motion.p>
            </AnimatePresence>
          </div>

          <button
            onClick={getNewPhrase}
            className="mt-4 px-4 py-1.5 bg-[#FFE5EC] hover:bg-[#FFD1DC] text-[#C9184A] rounded-full text-xs font-serif font-semibold border border-pink-200 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            ❀ Recibir Otro Mensaje
          </button>
        </motion.div>

        {/* Anniversary Counter Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full"
        >
          <AnniversaryTracker />
        </motion.div>

        {/* Sealed Love Letter Envelope Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full"
        >
          <LoveLetter onPlayChime={playRomanticChime} />
        </motion.div>

        {/* Interactive Custom Vase Flower Garden */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full"
        >
          <FlowerGarden onPlayPop={playFlowerPop} />
        </motion.div>

      </main>

      {/* Footer Design */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-2xl text-center mt-12 pb-6 border-t border-pink-100 pt-6 relative z-10"
      >
        <p className="text-xs text-pink-400 font-serif italic flex items-center justify-center gap-1">
          Hecho con todo el amor de mi corazón para mi hermosa Carolina <Heart className="w-3 h-3 text-rose-500 fill-rose-400" />
        </p>
        <p className="text-[10px] text-pink-300 font-sans tracking-widest uppercase mt-1">
          Por siempre tuyo • 2026
        </p>
      </motion.footer>

    </div>
  );
}
