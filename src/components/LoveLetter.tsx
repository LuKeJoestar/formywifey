import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Send, RotateCcw, PenTool, Check, Flower } from 'lucide-react';

const PRESETS = {
  mainLetter: {
    title: "Mi Querida Carolina",
    content: `Cada día que pasa me doy cuenta de la suerte inmensa que tengo de tenerte en mi vida. Eres la luz que ilumina mis mañanas y la paz que me abraza por las noches.\n\nMe enamoro de tu sonrisa, de la dulzura de tu voz, y de la forma tan hermosa en la que haces que el mundo sea un lugar mejor. Tu risa es mi melodía favorita, y estar a tu lado es el regalo más grande que la vida me ha dado.\n\nEsta página es solo un pequeño reflejo de todo el amor que siento por ti. No importa la distancia o el tiempo, mi corazón siempre late por ti, latiendo al compás de nuestra historia.\n\nTe amo con toda mi alma, hoy, mañana y para siempre. ♥`,
    sign: "Con todo mi amor"
  },
  reasons: [
    { title: "Tu hermosa sonrisa", text: "Tiene el poder mágico de alegrar incluso mis días más grises y difíciles. Ver tu sonrisa es ver la felicidad en estado puro." },
    { title: "Tu inmenso corazón", text: "Tu bondad, empatía y la forma tan dulce en la que cuidas a los que amas me inspira a ser una mejor persona cada día." },
    { title: "Tu apoyo incondicional", text: "Saber que estás a mi lado me da toda la fuerza del mundo. Eres mi refugio seguro y mi mayor motivación." },
    { title: "Tus pequeños detalles", text: "Tus miradas, tus mensajes inesperados y tu forma única de demostrar amor hacen de la vida cotidiana algo extraordinario." },
    { title: "Cómo me haces sentir", text: "A tu lado me siento la persona más afortunada del planeta. Me llenas de paz, alegría y un amor infinito." }
  ],
  promises: [
    { title: "Estar siempre a tu lado", desc: "En los días soleados para celebrar y en los días lluviosos para sostener tu mano fuerte." },
    { title: "Escucharte y apoyarte", desc: "En cada sueño, en cada reto y en cada pequeña anécdota de tu día a día." },
    { title: "Crear recuerdos juntos", desc: "Viajar, reír a carcajadas, cocinar juntos y llenar nuestro álbum de momentos inolvidables." },
    { title: "Amarte cada día más", desc: "Descubrir nuevas formas de hacerte feliz y recordarte siempre lo valiosa que eres." }
  ]
};

interface LoveLetterProps {
  onPlayChime: () => void;
}

export default function LoveLetter({ onPlayChime }: LoveLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'letter' | 'reasons' | 'promises'>('letter');
  
  // Custom message states
  const [customTitle, setCustomTitle] = useState(() => {
    return localStorage.getItem('carolina_letter_title') || PRESETS.mainLetter.title;
  });
  const [customContent, setCustomContent] = useState(() => {
    return localStorage.getItem('carolina_letter_content') || PRESETS.mainLetter.content;
  });
  const [customSign, setCustomSign] = useState(() => {
    return localStorage.getItem('carolina_letter_sign') || PRESETS.mainLetter.sign;
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [reasonIndex, setReasonIndex] = useState<number | null>(null);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    onPlayChime();
  };

  const saveCustomChanges = () => {
    localStorage.setItem('carolina_letter_title', customTitle);
    localStorage.setItem('carolina_letter_content', customContent);
    localStorage.setItem('carolina_letter_sign', customSign);
    setIsEditing(false);
  };

  const resetToDefault = () => {
    if (window.confirm("¿Seguro que quieres restaurar la carta original?")) {
      setCustomTitle(PRESETS.mainLetter.title);
      setCustomContent(PRESETS.mainLetter.content);
      setCustomSign(PRESETS.mainLetter.sign);
      localStorage.removeItem('carolina_letter_title');
      localStorage.removeItem('carolina_letter_content');
      localStorage.removeItem('carolina_letter_sign');
      setIsEditing(false);
    }
  };

  return (
    <div id="love-letter-container" className="flex flex-col items-center w-full max-w-2xl px-4 py-8">
      {/* Outer wrapper with card-like styling constraints */}
      <div className="w-full relative flex flex-col items-center">
        
        {/* Envelope & Letter Interactive Scene */}
        <div className="relative w-full h-[540px] flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* CLOSED ENVELOPE state */
              <motion.div
                key="closed-envelope"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                onClick={handleOpenEnvelope}
                className="cursor-pointer relative w-full max-w-md aspect-[1.618] bg-white rounded-2xl shadow-[0_15px_40px_rgba(255,133,161,0.25)] border-2 border-[#F8D66D] flex flex-col items-center justify-center p-6 overflow-hidden interactive-card"
              >
                {/* Vintage stamp / floral corners */}
                <div className="absolute top-4 right-4 w-12 h-14 border border-dashed border-[#D99A00] bg-[#FFF0A8]/50 flex flex-col items-center justify-center p-1 rounded">
                  <span className="text-[10px] font-serif text-[#8A5A00] uppercase tracking-widest font-bold">Amor</span>
                  <Heart className="w-4 h-4 text-[#8A5A00] fill-[#E9B949] animate-pulse mt-0.5" />
                </div>

                <div className="absolute top-4 left-4 text-[#F8D66D]">
                  <Flower className="w-6 h-6 rotate-12" />
                </div>
                <div className="absolute bottom-4 right-4 text-[#F8D66D]">
                  <Flower className="w-6 h-6 -rotate-12" />
                </div>

                {/* Simulated Envelope Flaps via SVG-like aesthetics */}
                <div className="text-center z-10">
                  <p className="font-serif italic text-[#8A5A00] text-lg mb-1">Para el amor de mi vida</p>
                  <h2 className="font-display font-medium text-[#4A3600] tracking-wider text-3xl mb-4">Carolina ♥</h2>
                  
                  {/* Wax Seal */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    className="mx-auto w-16 h-16 bg-[#8A5A00] hover:bg-[#6E4800] rounded-full flex items-center justify-center shadow-lg border-2 border-[#F8D66D] relative"
                  >
                    <Heart className="w-8 h-8 text-white fill-white" />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-serif italic text-[#8A5A00] font-medium whitespace-nowrap bg-white px-2.5 py-0.5 rounded-full shadow-md border border-[#FFF0A8]">
                      Haz clic para abrir
                    </span>
                  </motion.div>
                </div>

                {/* Subtle visual details in the background of envelope */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#E8BE4F] via-[#C9971A] to-[#E8BE4F]"></div>
              </motion.div>
            ) : (
              /* OPENED STATE: Displaying the handwritten letter */
              <motion.div
                key="open-letter"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="w-full bg-white rounded-3xl shadow-[0_15px_45px_rgba(255,133,161,0.25)] border border-[#F8D66D] overflow-hidden flex flex-col h-full relative"
              >
                {/* Aesthetic Top Ribbon matching design's border-t-[#FFF0A8] */}
                <div className="bg-[#FFF0A8] h-[16px] w-full border-b border-amber-100"></div>

                {/* Letter Header/Tabs */}
                <div className="flex border-b border-amber-100 bg-[#FFF9DB]/40 p-2 justify-between items-center px-4 md:px-6">
                  <div className="flex gap-1 md:gap-2">
                    <button
                      onClick={() => setActiveTab('letter')}
                      className={`px-3 py-1.5 rounded-full text-xs font-serif transition-all ${
                        activeTab === 'letter'
                          ? 'bg-[#8A5A00] text-white font-bold shadow-sm'
                          : 'text-[#8A5A00] hover:bg-[#FFF0A8]'
                      }`}
                    >
                      ✉ Carta
                    </button>
                    <button
                      onClick={() => setActiveTab('reasons')}
                      className={`px-3 py-1.5 rounded-full text-xs font-serif transition-all ${
                        activeTab === 'reasons'
                          ? 'bg-[#8A5A00] text-white font-bold shadow-sm'
                          : 'text-[#8A5A00] hover:bg-[#FFF0A8]'
                      }`}
                    >
                      ✨ Razones
                    </button>
                    <button
                      onClick={() => setActiveTab('promises')}
                      className={`px-3 py-1.5 rounded-full text-xs font-serif transition-all ${
                        activeTab === 'promises'
                          ? 'bg-[#8A5A00] text-white font-bold shadow-sm'
                          : 'text-[#8A5A00] hover:bg-[#FFF0A8]'
                      }`}
                    >
                      🌸 Promesas
                    </button>
                  </div>

                  <div className="flex gap-1">
                    {!isEditing && activeTab === 'letter' && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-1.5 hover:bg-[#FFF0A8] rounded-full text-[#8A5A00] transition-colors"
                        title="Personalizar carta"
                      >
                        <PenTool className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1.5 hover:bg-[#FFF0A8] rounded-full text-[#8A5A00] transition-colors text-xs font-serif"
                      title="Cerrar sobre"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Active Content Window */}
                <div className={`flex-1 overflow-y-auto p-6 md:p-8 relative ${activeTab === 'letter' && !isEditing ? 'letter-paper' : 'bg-white'}`}>
                  {/* Subtle watermarked background heart */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none">
                    <Heart className="w-64 h-64 fill-[#8A5A00] text-[#8A5A00]" />
                  </div>

                  {activeTab === 'letter' && (
                    <div className="relative h-full flex flex-col justify-between z-10">
                      {isEditing ? (
                        /* Letter Editor Mode */
                        <div className="flex flex-col gap-3 h-full">
                          <label className="text-xs font-sans uppercase tracking-widest text-[#8A5A00] font-bold">Encabezado de la carta</label>
                          <input
                            type="text"
                            value={customTitle}
                            onChange={(e) => setCustomTitle(e.target.value)}
                            className="w-full bg-white border border-amber-200 rounded-lg p-2 font-serif text-lg text-amber-900 focus:outline-none focus:ring-2 focus:ring-[#E9B949]"
                          />

                          <label className="text-xs font-sans uppercase tracking-widest text-[#8A5A00] font-bold mt-2">Cuerpo del mensaje</label>
                          <textarea
                            value={customContent}
                            onChange={(e) => setCustomContent(e.target.value)}
                            rows={8}
                            className="w-full bg-white border border-amber-200 rounded-lg p-2 font-serif text-sm focus:outline-none focus:ring-2 focus:ring-[#E9B949] leading-relaxed resize-none flex-1"
                          />

                          <label className="text-xs font-sans uppercase tracking-widest text-[#8A5A00] font-bold mt-2">Firma o despedida</label>
                          <input
                            type="text"
                            value={customSign}
                            onChange={(e) => setCustomSign(e.target.value)}
                            className="w-full bg-white border border-amber-200 rounded-lg p-2 font-serif italic text-amber-800 focus:outline-none focus:ring-2 focus:ring-[#E9B949]"
                          />

                          <div className="flex gap-2 justify-end mt-4">
                            <button
                              onClick={resetToDefault}
                              className="px-3 py-1.5 rounded-lg border border-amber-200 text-xs font-sans hover:bg-amber-50 transition-colors text-amber-700"
                            >
                              Por Defecto
                            </button>
                            <button
                              onClick={saveCustomChanges}
                              className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-sans flex items-center gap-1 shadow transition-colors"
                            >
                              <Check className="w-3.5 h-3.5" /> Guardar
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Beautiful Letter Display Mode on real Letter Notebook paper */
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col h-full justify-between"
                        >
                          <div>
                            <h3 className="font-display font-bold italic text-[#8A5A00] text-2xl md:text-3xl mb-6 tracking-wide border-b border-[#FFF0A8] pb-2">
                              {customTitle}
                            </h3>
                            <p 
                              className="whitespace-pre-line text-xl md:text-2xl leading-[2.5rem] text-[#4A3600] font-script"
                              style={{ paddingTop: '0.2rem' }}
                            >
                              {customContent}
                            </p>
                          </div>
                          
                          <div className="mt-12 text-right border-t border-[#FFF0A8] pt-4">
                            <p className="text-xs text-amber-400 uppercase tracking-widest font-sans font-semibold mb-1">Para siempre con amor</p>
                            <span className="font-script text-[#8A5A00] text-3xl md:text-4xl block">
                              {customSign}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {activeTab === 'reasons' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col gap-3"
                    >
                      <h3 className="font-display font-medium text-[#8A5A00] text-xl mb-3 border-b border-amber-100 pb-2 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" /> Por qué te amo, Carolina...
                      </h3>
                      <p className="text-xs text-amber-700/80 italic mb-2">Haz clic en cada razón para revelar los latidos de mi corazón.</p>

                      <div className="flex flex-col gap-2">
                        {PRESETS.reasons.map((reason, index) => (
                          <div key={index} className="border border-amber-100 rounded-xl overflow-hidden bg-white shadow-xs">
                            <button
                              onClick={() => setReasonIndex(reasonIndex === index ? null : index)}
                              className="w-full text-left p-3 flex justify-between items-center hover:bg-[#FFF9DB]/50 transition-colors"
                            >
                              <span className="font-semibold text-sm text-[#4A3600] flex items-center gap-2">
                                <span className="bg-[#FFF0A8] text-[#8A5A00] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold font-sans">
                                  {index + 1}
                                </span>
                                {reason.title}
                              </span>
                              <Heart
                                className={`w-4 h-4 transition-transform ${
                                  reasonIndex === index ? 'text-[#8A5A00] fill-[#8A5A00] scale-125' : 'text-amber-300'
                                }`}
                              />
                            </button>
                            
                            <AnimatePresence>
                              {reasonIndex === index && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden bg-[#FFF9DB]/20"
                                >
                                  <p className="p-4 text-sm text-[#4A3600] border-t border-amber-50 font-script text-xl leading-relaxed">
                                    {reason.text}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'promises' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col gap-4"
                    >
                      <h3 className="font-display font-medium text-[#8A5A00] text-xl mb-1 border-b border-amber-100 pb-2">
                        🌱 Mis Promesas para ti
                      </h3>
                      <p className="text-xs text-amber-700/80 italic mb-1">
                        Promesas sencillas pero sinceras, cultivadas para crecer fuertes día a día a tu lado.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {PRESETS.promises.map((promise, index) => (
                          <div key={index} className="p-4 rounded-2xl bg-white border border-[#FFF0A8] hover:shadow-[0_8px_20px_rgba(255,133,161,0.15)] transition-all">
                            <h4 className="font-semibold text-sm text-[#8A5A00] mb-1 flex items-center gap-1.5">
                              <span className="text-[#D99A00]">❀</span> {promise.title}
                            </h4>
                            <p className="text-xs text-[#4A3600] leading-relaxed italic font-serif">
                              {promise.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
