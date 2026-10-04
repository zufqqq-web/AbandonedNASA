import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Radio, Database, ShieldCheck } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface HeroProps {
  activeWorld: 'Moon' | 'Mars';
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ activeWorld, onExploreClick }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Graphic Field with Radial Gradient & Atmospheric Planetary Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dynamic planetary atmosphere color */}
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-25 transition-colors duration-1000 ${
            activeWorld === 'Mars' ? 'bg-red-700/60' : 'bg-slate-400/40'
          }`}
        />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />

        {/* Technical Coordinate Axes & Markers */}
        <div className="absolute top-28 left-6 sm:left-12 text-[10px] font-mono text-slate-500 tracking-wider">
          <div>REC // 28.5721° N, 80.6480° W</div>
          <div className="text-slate-600">MISSION CATALOG ARCHIVE // NASA SPACE APPS</div>
        </div>

        <div className="absolute bottom-12 right-6 sm:right-12 text-right text-[10px] font-mono text-slate-500 tracking-wider hidden sm:block">
          <div>ORBITAL TELEMETRY: MONITORED</div>
          <div className="text-slate-600">DEEP SPACE NETWORK // GOLDSTONE / MADRID / CANBERRA</div>
        </div>

        {/* Orbit arc line SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 1440 900" fill="none">
          <circle cx="720" cy="950" r="650" stroke="#94a3b8" strokeWidth="1" strokeDasharray="6 8" />
          <circle cx="720" cy="950" r="450" stroke="#f43f5e" strokeWidth="0.8" />
          <line x1="0" y1="450" x2="1440" y2="450" stroke="#334155" strokeWidth="0.5" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Archival Classification Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6 text-xs font-mono text-slate-400 tracking-widest uppercase"
        >
          <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>NASA Planetary Science Archive</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Проект «Брошенная, но не забытая»</span>
        </motion.div>

        {/* Main Dramatic Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[1.05]"
          style={{ textWrap: 'balance' }}
        >
          ОСТАВЛЕНЫ.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">
            НО НЕ ЗАБЫТЫ.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl font-medium text-slate-200 tracking-tight max-w-3xl mx-auto"
          style={{ textWrap: 'balance' }}
        >
          Истории машин NASA, которые навсегда остались на других мирах.
        </motion.p>

        {/* Descriptive Manifesto Quote */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
          style={{ textWrap: 'balance' }}
        >
          Они больше никогда не вернутся домой. Но данные, открытия и истории стойкости, которые они оставили после себя в безмолвии кратеров, продолжают двигать цивилизацию вперед.
        </motion.p>

        {/* Key Quick Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 grid grid-cols-3 max-w-xl mx-auto border-y border-slate-800/80 py-3 text-left divide-x divide-slate-800"
        >
          <div className="px-4">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Осталось на Луне</div>
            <div className="text-xl sm:text-2xl font-bold font-mono-tabular text-slate-100">6+ ступеней</div>
            <div className="text-[10px] text-slate-400">Apollo & Surveyor</div>
          </div>
          <div className="px-4">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Осталось на Марсе</div>
            <div className="text-xl sm:text-2xl font-bold font-mono-tabular text-red-400">8+ аппаратов</div>
            <div className="text-[10px] text-slate-400">Роверы & Станции</div>
          </div>
          <div className="px-4">
            <div className="text-[11px] font-mono text-slate-400 uppercase">Статус защиты</div>
            <div className="text-xl sm:text-2xl font-bold font-mono-tabular text-emerald-400">Памятники</div>
            <div className="text-[10px] text-slate-400">Космическая археология</div>
          </div>
        </motion.div>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => {
              spaceAudio.playTelemetryBeep(1200, 0.05);
              onExploreClick();
            }}
            className="group px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest font-semibold rounded-md transition-all shadow-lg shadow-red-950/40 flex items-center gap-2 hover:gap-3"
          >
            <span>ИССЛЕДОВАТЬ МИССИИ</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </button>

          <a
            href="#last-signal"
            onClick={() => spaceAudio.playTelemetryBeep(900, 0.04)}
            className="px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs uppercase tracking-widest rounded-md transition-colors flex items-center gap-2"
          >
            <Radio className="w-4 h-4 text-rose-500" />
            <span>Последний сигнал</span>
          </a>
        </motion.div>
      </div>

      {/* Subtle Bottom Scroll Cue */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[10px] font-mono text-slate-600">
        <span className="uppercase tracking-widest">SCROLL TO TRANSMISSION</span>
        <div className="w-0.5 h-6 bg-gradient-to-b from-slate-600 to-transparent animate-pulse" />
      </div>
    </section>
  );
};
