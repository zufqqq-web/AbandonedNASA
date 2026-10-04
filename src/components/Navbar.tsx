import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Compass } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface NavbarProps {
  onWorldChange?: (world: 'Moon' | 'Mars') => void;
  activeWorld?: 'Moon' | 'Mars';
}

export const Navbar: React.FC<NavbarProps> = ({ onWorldChange, activeWorld = 'Mars' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = spaceAudio.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      spaceAudio.playTelemetryBeep(1400, 0.08);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#05070b]/90 backdrop-blur-md border-slate-800/80 py-3 shadow-2xl'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="group flex items-center gap-3"
          onClick={() => spaceAudio.playTelemetryBeep(980, 0.04)}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse group-hover:scale-125 transition-transform" />
          <span className="font-display text-base sm:text-lg font-bold tracking-wider text-slate-100 uppercase">
            ABANDONED <span className="text-red-500 font-light">ARCHIVE</span>
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-slate-400">
          <a
            href="#worlds"
            onClick={() => spaceAudio.playTelemetryBeep(1100, 0.03)}
            className="hover:text-white transition-colors"
          >
            Миры
          </a>
          <a
            href="#map-section"
            onClick={() => spaceAudio.playTelemetryBeep(1100, 0.03)}
            className="hover:text-white transition-colors"
          >
            Карта посадок
          </a>
          <a
            href="#explorer"
            onClick={() => spaceAudio.playTelemetryBeep(1100, 0.03)}
            className="hover:text-white transition-colors"
          >
            Каталог машин
          </a>
          <a
            href="#last-signal"
            onClick={() => spaceAudio.playTelemetryBeep(1100, 0.03)}
            className="hover:text-red-400 transition-colors"
          >
            Последний сигнал
          </a>
          <a
            href="#moon-artifacts"
            onClick={() => spaceAudio.playTelemetryBeep(1100, 0.03)}
            className="hover:text-blue-400 transition-colors"
          >
            След на Луне
          </a>
          <a
            href="#memorial"
            onClick={() => spaceAudio.playTelemetryBeep(1100, 0.03)}
            className="hover:text-white transition-colors"
          >
            Они остались
          </a>
        </nav>

        {/* Zone 3: Functional interactive affordance */}
        <div className="flex items-center gap-3">
          {/* Quick World Toggle */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-md p-0.5 text-xs font-mono">
            <button
              onClick={() => {
                onWorldChange?.('Mars');
                spaceAudio.playTelemetryBeep(1300, 0.04);
              }}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                activeWorld === 'Mars'
                  ? 'bg-red-600/90 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              MARS
            </button>
            <button
              onClick={() => {
                onWorldChange?.('Moon');
                spaceAudio.playTelemetryBeep(1100, 0.04);
              }}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                activeWorld === 'Moon'
                  ? 'bg-slate-200 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              LUNA
            </button>
          </div>

          {/* Telemetry Audio Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Включить звук телеметрии' : 'Отключить звук телеметрии'}
            className="p-2 text-slate-400 hover:text-slate-200 border border-slate-800 bg-slate-900/80 rounded-md transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <a
            href="#explorer"
            onClick={() => spaceAudio.playTelemetryBeep(1500, 0.06)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider uppercase text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors whitespace-nowrap"
          >
            <Compass className="w-3.5 h-3.5" />
            Исследовать
          </a>
        </div>
      </div>
    </header>
  );
};
