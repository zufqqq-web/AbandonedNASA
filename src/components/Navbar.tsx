import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Compass, Menu, X } from 'lucide-react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile/tablet menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Close mobile/tablet menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
        scrolled || isMenuOpen
          ? 'bg-[#05070b]/95 backdrop-blur-md border-slate-800/80 py-2.5 shadow-2xl'
          : 'bg-transparent border-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="group flex items-center gap-1.5 sm:gap-2.5 shrink-0 select-none"
          onClick={() => {
            spaceAudio.playTelemetryBeep(980, 0.04);
            setIsMenuOpen(false);
          }}
        >
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-600 animate-pulse group-hover:scale-125 transition-transform shrink-0" />
          <span className="font-display text-xs sm:text-base md:text-lg font-bold tracking-wider text-slate-100 uppercase whitespace-nowrap">
            {t.nav.brand} <span className="text-red-500 font-light">{t.nav.brandSub}</span>
          </span>
        </a>

        {/* Zone 2: Navigation Links in one single row on desktop (>= 1280px) */}
        <nav className="hidden xl:flex items-center gap-4 2xl:gap-5 text-xs font-mono uppercase tracking-widest text-slate-400 whitespace-nowrap shrink-0">
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

        {/* Zone 3: Functional Interactive Affordances */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
          {/* Language Switcher RU | EN | UZ (compact) */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-md p-0.5 text-[10px] sm:text-xs font-mono shrink-0">
            <button
              onClick={() => handleLanguageChange('ru')}
              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded transition-colors ${
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
              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded transition-colors ${
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
              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded transition-colors ${
                language === 'uz'
                  ? 'bg-slate-700 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="O‘zbek tili"
            >
              UZ
            </button>
          </div>

          {/* Quick World Toggle (MARS / LUNA) */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-md p-0.5 text-[10px] sm:text-xs font-mono shrink-0">
            <button
              onClick={() => {
                onWorldChange?.('Mars');
                spaceAudio.playTelemetryBeep(1300, 0.04);
              }}
              className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded transition-colors whitespace-nowrap ${
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
              className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded transition-colors whitespace-nowrap ${
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
            className="p-1 sm:p-1.5 md:p-2 text-slate-400 hover:text-slate-200 border border-slate-800 bg-slate-900/80 rounded-md transition-colors shrink-0"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />}
          </button>

          {/* Explore Button: Visible only on >= 1024px (hidden on < 1024px) */}
          <a
            href="#explorer"
            onClick={() => spaceAudio.playTelemetryBeep(1500, 0.06)}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider uppercase text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t.hero.exploreBtn}</span>
          </a>

          {/* Burger Menu Button: Visible on < 1280px (< xl) */}
          <button
            onClick={() => {
              spaceAudio.playTelemetryBeep(1100, 0.03);
              setIsMenuOpen((prev) => !prev);
            }}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            className="flex xl:hidden p-1 sm:p-1.5 md:p-2 text-slate-400 hover:text-white border border-slate-800 bg-slate-900/80 rounded-md transition-colors shrink-0"
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Full-width Dropdown Navigation Panel for screens < 1280px */}
      {isMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="xl:hidden absolute top-full left-0 right-0 w-full bg-[#05070b]/98 backdrop-blur-xl border-b border-slate-800 shadow-2xl py-4 px-4 sm:px-6 transition-all duration-200"
        >
          <nav className="flex flex-col gap-2 text-xs font-mono uppercase tracking-widest text-slate-300">
            <a
              href="#worlds"
              onClick={() => {
                spaceAudio.playTelemetryBeep(1100, 0.03);
                setIsMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-lg hover:bg-slate-900 hover:text-white transition-colors"
            >
              {t.nav.worlds}
            </a>
            <a
              href="#map-section"
              onClick={() => {
                spaceAudio.playTelemetryBeep(1100, 0.03);
                setIsMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-lg hover:bg-slate-900 hover:text-white transition-colors"
            >
              {t.nav.map}
            </a>
            <a
              href="#explorer"
              onClick={() => {
                spaceAudio.playTelemetryBeep(1100, 0.03);
                setIsMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-lg hover:bg-slate-900 hover:text-white transition-colors"
            >
              {t.nav.catalog}
            </a>
            <a
              href="#last-signal"
              onClick={() => {
                spaceAudio.playTelemetryBeep(1100, 0.03);
                setIsMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-lg hover:bg-slate-900 hover:text-red-400 transition-colors"
            >
              {t.nav.lastSignal}
            </a>
            <a
              href="#signal-delay"
              onClick={() => {
                spaceAudio.playTelemetryBeep(1100, 0.03);
                setIsMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-lg hover:bg-slate-900 hover:text-cyan-400 transition-colors"
            >
              {t.nav.signalDelay}
            </a>
            <a
              href="#moon-artifacts"
              onClick={() => {
                spaceAudio.playTelemetryBeep(1100, 0.03);
                setIsMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-lg hover:bg-slate-900 hover:text-blue-400 transition-colors"
            >
              {t.nav.heritage}
            </a>
            <a
              href="#quiz"
              onClick={() => {
                spaceAudio.playTelemetryBeep(1100, 0.03);
                setIsMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-lg hover:bg-slate-900 hover:text-amber-400 transition-colors"
            >
              {t.nav.quiz}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
