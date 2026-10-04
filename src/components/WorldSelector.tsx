import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { worldsData } from '../data/worldsData';
import { Destination } from '../types/mission';
import { spaceAudio } from '../utils/audio';
import { Globe, Thermometer, Orbit, Rocket, Radio, Compass } from 'lucide-react';

interface WorldSelectorProps {
  selectedWorld: Destination;
  onSelectWorld: (world: Destination) => void;
}

export const WorldSelector: React.FC<WorldSelectorProps> = ({
  selectedWorld,
  onSelectWorld,
}) => {
  const current = worldsData[selectedWorld];

  return (
    <section id="worlds" className="relative py-20 border-t border-slate-900 bg-[#05070b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-800/80 gap-4">
          <div>
            <div className="text-xs font-mono text-red-500 uppercase tracking-widest flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              01 // ВЫБОР НЕБЕСНОГО ТЕЛА
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
              Миры постоянной дислокации
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              Переключайтесь между Луной и Марсом, чтобы изучить параметры среды, координаты посадочных зон и оставленную технику.
            </p>
          </div>

          {/* Segmented Interactive Switcher */}
          <div className="inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-lg self-start md:self-auto">
            <button
              onClick={() => {
                onSelectWorld('Mars');
                spaceAudio.playTelemetryBeep(1400, 0.04);
              }}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-md font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedWorld === 'Mars'
                  ? 'bg-red-600 text-white font-bold shadow-md shadow-red-950/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span>MARS // МАРС</span>
            </button>

            <button
              onClick={() => {
                onSelectWorld('Moon');
                spaceAudio.playTelemetryBeep(1100, 0.04);
              }}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-md font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedWorld === 'Moon'
                  ? 'bg-slate-200 text-slate-950 font-bold shadow-md shadow-white/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-slate-400" />
              <span>LUNA // ЛУНА</span>
            </button>
          </div>
        </div>

        {/* Dynamic World Viewport Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className={`relative rounded-xl border p-6 sm:p-8 lg:p-10 overflow-hidden transition-colors ${
              current.id === 'Mars'
                ? 'bg-gradient-to-br from-red-950/30 via-slate-950/80 to-slate-950 border-red-900/40'
                : 'bg-gradient-to-br from-slate-900/60 via-slate-950/80 to-slate-950 border-slate-700/50'
            }`}
          >
            {/* World Graphic Overlay Background */}
            <div className="absolute top-0 right-0 w-96 h-96 -mr-20 -mt-20 pointer-events-none opacity-20">
              <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
                <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className={current.id === 'Mars' ? 'text-red-500' : 'text-slate-400'} />
                <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="1.5" className={current.id === 'Mars' ? 'text-red-400' : 'text-slate-300'} />
                <circle cx="200" cy="200" r="80" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" className="text-slate-600" />
                <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" strokeWidth="0.5" className="text-slate-600" />
                <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" strokeWidth="0.5" className="text-slate-600" />
              </svg>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: World Overview */}
              <div className="lg:col-span-6">
                <div className="text-xs font-mono tracking-widest uppercase text-slate-400 flex items-center gap-2 mb-2">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span>Планетарный сектор // {current.englishName}</span>
                </div>

                <h3 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
                  {current.name}
                </h3>

                <p className="mt-2 text-sm sm:text-base font-medium text-slate-300">
                  {current.tagline}
                </p>

                <p className="mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
                  {current.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#explorer"
                    onClick={() => spaceAudio.playTelemetryBeep(1200, 0.04)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-mono uppercase tracking-wider text-slate-200 rounded border border-slate-700 transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5 text-red-400" />
                    <span>Смотреть объекты ({current.stats.objectsCount})</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Telemetry Specs Grid */}
              <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-4">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono uppercase mb-1">
                    <Rocket className="w-3.5 h-3.5 text-red-400" />
                    <span>Оставлено машин</span>
                  </div>
                  <div className="text-2xl font-bold font-mono-tabular text-white">
                    {current.stats.objectsCount}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">В каталоге архива</div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-4">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono uppercase mb-1">
                    <Radio className="w-3.5 h-3.5 text-blue-400" />
                    <span>Всего миссий</span>
                  </div>
                  <div className="text-lg sm:text-xl font-bold font-mono-tabular text-white truncate">
                    {current.stats.missionsCount}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{current.stats.timeSpan}</div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-4">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono uppercase mb-1">
                    <Orbit className="w-3.5 h-3.5 text-amber-400" />
                    <span>Дистанция</span>
                  </div>
                  <div className="text-sm sm:text-base font-bold font-mono-tabular text-white truncate">
                    {current.stats.distanceFromEarth}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">От Земли</div>
                </div>

                <div className="col-span-2 bg-slate-950/70 border border-slate-800/80 rounded-lg p-4">
                  <div className="text-slate-400 text-[11px] font-mono uppercase mb-1">
                    Условия окружающей среды
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-slate-200">
                    {current.stats.environment}
                  </div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-4">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono uppercase mb-1">
                    <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                    <span>Температура</span>
                  </div>
                  <div className="text-xs font-mono font-semibold text-slate-200">
                    {current.stats.surfaceTemp}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
