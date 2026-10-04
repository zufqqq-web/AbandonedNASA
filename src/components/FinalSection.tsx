import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Sparkles, Rocket } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

export const FinalSection: React.FC = () => {
  const scrollToTop = () => {
    spaceAudio.playTelemetryBeep(1500, 0.05);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative py-28 bg-[#05070b] border-t border-slate-900 text-center overflow-hidden">
      {/* Background soft ambient radial light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-950/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-red-500" />
          <span>ЭПИЛОГ // NASA SPACE APPS CHALLENGE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-[1.08]"
          style={{ textWrap: 'balance' }}
        >
          МИССИЯ ЗАВЕРШЕНА.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-200">
            ИСТОРИЯ — НЕТ.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto"
          style={{ textWrap: 'balance' }}
        >
          Мы отправляем машины в другие миры, чтобы познать неизвестное. Иногда они остаются там навсегда. Но их открытия, мужество инженеров и научные сокровища навсегда принадлежат всему человечеству.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10"
        >
          <button
            onClick={scrollToTop}
            className="group px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-mono text-xs uppercase tracking-widest font-semibold rounded-md transition-all shadow-xl inline-flex items-center gap-2 hover:gap-3 hover:border-red-500"
          >
            <span>ИССЛЕДОВАТЬ ЕЩЁ РАЗ</span>
            <ArrowUp className="w-4 h-4 text-red-400 transition-transform group-hover:-translate-y-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
