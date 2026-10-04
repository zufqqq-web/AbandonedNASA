import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Compass, Globe } from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { useT } from '../i18n/LanguageContext';
import { Language } from '../i18n/types';

interface NavbarProps {
  onWorldChange?: (world: 'Moon' | 'Mars') => void;
  activeWorld?: 'Moon' | 'Mars';
}

export const Navbar: React.FC<NavbarProps> = ({ onWorldChange, activeWorld = 'Mars' }) => {
  const { t, language, setLanguage } = useT();
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

  const handleLanguageChange = (lang: Language) => {
    spaceAudio.playTelemetryBeep(1200, 0.03);
    setLanguage(lang);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#05070b]/95 backdrop-blur-md border-slate-800/80 py-2.5 shadow-2xl'
          : 'bg-transparent border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="group flex items-center gap-2.5 shrink-0"
          onClick={() => spaceAudio.playTelemetryBeep(980, 0.04)}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse group-hover:scale-125 transition-transform" />
          <span className="font-display text-sm sm:text-base md:text-lg font-bold tracking-wider text-slate-100 uppercase">
            {t.nav.brand} <span className="text-red-500 font-light">{t.nav.brandSub}</span>
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-mono uppercase tracking-widest text-slate-400">
          <a
            href="#worlds"
            onClick={() => spaceAudio.playTelemetryBeep(1100, 0.03)}
            className="hover:text-white transition-colors whitespace-nowrap"
          >
            {t.nav.worlds}
          </a>
          <a
            href="#map-section"
            onClick={() => spaceAudio.playTelemetryBeep(1100, 0.03)}
            className="hover:text-white transition-colors whitespace-nowrap"
          >
            {t.nav.map}
          </a>
          <a
            href="#explorer"
            onClick={() => spaceAudio.playTelemetryBeep(1100, 0.03)}
            className="hover:text-white transition-colors whitespace-nowrap"
          >
            {t.nav.catalog}
          </a>
          <a
            href="#last-signal"
            onClick={() => spaceAudio.playTelemetryBeep(1100, 0.03)}
            className="hover:text-red-400 transition-colors whitespace-nowrap"
          >
            {t.nav.lastSignal}
          </a>
          <a
            href="#signal-delay"
            onClick={() => spaceAudio.playTelemetryBeep(1100, 0.03)}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap"
          >
            {t.nav.signalDelay}
          </a>
          <a
            href="#moon-artifacts"
            onClick={() => spaceAudio.playTelemetryBeep(1100, 0.03)}
            className="hover:text-blue-400 transition-colors whitespace-nowrap"
          >
            {t.nav.heritage}
          </a>
          <a
            href="#quiz"
            onClick={() => spaceAudio.playTelemetryBeep(1100, 0.03)}
            className="hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            {t.nav.quiz}
          </a>
        </nav>

        {/* Zone 3: Functional Interactive Affordance & Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher RU | EN | UZ */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-md p-0.5 text-xs font-mono">
            <button
              onClick={() => handleLanguageChange('ru')}
              className={`px-2 py-1 rounded transition-colors ${
                language === 'ru'
                  ? 'bg-slate-700 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Русский язык"
            >
              RU
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-2 py-1 rounded transition-colors ${
                language === 'en'
                  ? 'bg-slate-700 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="English language"
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange('uz')}
              className={`px-2 py-1 rounded transition-colors ${
                language === 'uz'
                  ? 'bg-slate-700 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="O‘zbek tili"
            >
              UZ
            </button>
          </div>

          {/* Quick World Toggle */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-md p-0.5 text-xs font-mono">
            <button
              onClick={() => {
                onWorldChange?.('Mars');
                spaceAudio.playTelemetryBeep(1300, 0.04);
              }}
              className={`px-2 sm:px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
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
              className={`px-2 sm:px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
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
            title={isMuted ? t.nav.soundOn : t.nav.soundOff}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-200 border border-slate-800 bg-slate-900/80 rounded-md transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <a
            href="#explorer"
            onClick={() => spaceAudio.playTelemetryBeep(1500, 0.06)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider uppercase text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors whitespace-nowrap"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{t.hero.exploreBtn}</span>
          </a>
        </div>
      </div>
    </header>
  );
};
