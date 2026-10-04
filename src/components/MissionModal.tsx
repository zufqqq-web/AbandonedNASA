import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Mission } from '../types/mission';
import { SchematicView } from './SchematicView';
import { fetchNasaImageForMission, fetchOrbitalImagesForMission, NasaImageResult } from '../utils/nasaImages';
import {
  X,
  MapPin,
  Calendar,
  Radio,
  Rocket,
  Compass,
  FileText,
  Activity,
  Award,
  Clock,
  Sparkles,
  ExternalLink,
  Image as ImageIcon,
  Cpu,
  Loader2,
  AlertCircle,
  Layers
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { useT } from '../i18n/LanguageContext';
import { Language } from '../i18n/types';

interface MissionModalProps {
  mission: Mission | null;
  onClose: () => void;
}

/**
 * Format long mission duration strings into a concise format without ellipsis.
 * e.g., "6 лет 2 месяца 19 дней (2 210 солов...)" -> "6 лет 2 мес."
 */
function formatShortDuration(raw: string, lang: Language): string {
  if (!raw) return '';
  const mainPart = raw.split('(')[0].trim();

  if (lang === 'ru') {
    // Match "X лет/года Y месяца/месяцев"
    const matchYM = mainPart.match(/(\d+\+?\s+(?:лет|года|год))\s+(\d+\s+месяц\w*)/i);
    if (matchYM) {
      return `${matchYM[1]} ${matchYM[2].replace(/месяц\w*/i, 'мес.')}`;
    }
    // Match "X года Y дней"
    const matchYD = mainPart.match(/(\d+\+?\s+(?:лет|года|год))\s+(\d+\s+дн\w*)/i);
    if (matchYD) {
      return `${matchYD[1]} ${matchYD[2].replace(/дн\w*/i, 'дн.')}`;
    }
    // Match "21 час 36 минут..."
    const matchHM = mainPart.match(/(\d+)\s+час\w*\s+(\d+)\s+минут\w*/i);
    if (matchHM) {
      return `${matchHM[1]} ч ${matchHM[2]} мин`;
    }
    // Match "3 дня экспедиции"
    const matchD = mainPart.match(/^(\d+\s+дн\w*)/i);
    if (matchD) {
      return matchD[1];
    }
    // Match "13+ лет работы"
    const matchY = mainPart.match(/^(\d+\+?\s+(?:лет|года|год))/i);
    if (matchY) {
      return matchY[1];
    }
  } else if (lang === 'en') {
    // "X years Y months" -> "6 yrs 2 mos."
    const matchYM = mainPart.match(/(\d+\+?\s+years?)\s+(\d+\s+months?)/i);
    if (matchYM) {
      const yrs = matchYM[1].replace(/years?/i, 'yrs');
      const mos = matchYM[2].replace(/months?/i, 'mos.');
      return `${yrs} ${mos}`;
    }
    // "X years Y days"
    const matchYD = mainPart.match(/(\d+\+?\s+years?)\s+(\d+\s+days?)/i);
    if (matchYD) {
      return `${matchYD[1].replace(/years?/i, 'yrs')} ${matchYD[2]}`;
    }
    // "21 hours 36 minutes"
    const matchHM = mainPart.match(/(\d+)\s+hours?\s+(\d+)\s+minutes?/i);
    if (matchHM) {
      return `${matchHM[1]}h ${matchHM[2]}m`;
    }
    // "3 days"
    const matchD = mainPart.match(/^(\d+\s+days?)/i);
    if (matchD) {
      return matchD[1];
    }
    // "13+ years"
    const matchY = mainPart.match(/^(\d+\+?\s+years?)/i);
    if (matchY) {
      return matchY[1];
    }
  } else if (lang === 'uz') {
    // "6 yil 2 oy 19 kun" -> "6 yil 2 oy"
    const matchYM = mainPart.match(/(\d+\+?\s+yil)\s+(\d+\s+oy)/i);
    if (matchYM) {
      return `${matchYM[1]} ${matchYM[2]}`;
    }
    // "4 yil 19 kun"
    const matchYD = mainPart.match(/(\d+\+?\s+yil)\s+(\d+\s+kun)/i);
    if (matchYD) {
      return `${matchYD[1]} ${matchYD[2]}`;
    }
    // "21 soat 36 daqiqa"
    const matchHM = mainPart.match(/(\d+)\s+soat\s+(\d+)\s+daqiqa/i);
    if (matchHM) {
      return `${matchHM[1]} soat ${matchHM[2]} daq`;
    }
    // "3 kunlik ekspeditsiya"
    const matchD = mainPart.match(/(\d+)\s+kun/i);
    if (matchD) {
      return `${matchD[1]} kun`;
    }
    // "13+ yildan beri"
    const matchY = mainPart.match(/(\d+\+?)\s+yildan/i);
    if (matchY) {
      return `${matchY[1]} yil`;
    }
  }

  return mainPart;
}

export const MissionModal: React.FC<MissionModalProps> = ({ mission, onClose }) => {
  const { t, localize, language } = useT();
  const [activeTab, setActiveTab] = useState<'overview' | 'edl' | 'science' | 'contact' | 'location' | 'specs'>('overview');
  const [nasaImage, setNasaImage] = useState<NasaImageResult | null>(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'photo' | 'schematic'>('photo');
  const [orbitalImages, setOrbitalImages] = useState<NasaImageResult[]>([]);
  const [loadingOrbital, setLoadingOrbital] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const tabsNavRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // Store previously focused element when modal is triggered
  useEffect(() => {
    if (mission) {
      previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    }
  }, [mission]);

  // Lock body scroll while modal is open, restore on close
  useEffect(() => {
    if (!mission) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mission]);

  // Escape key handling & focus trap inside modal dialog
  useEffect(() => {
    if (!mission) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Initial focus on close button for accessibility
    const focusTimer = setTimeout(() => {
      if (modalRef.current) {
        const closeBtn = modalRef.current.querySelector<HTMLElement>('[data-modal-close]');
        closeBtn?.focus();
      }
    }, 60);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimer);
      // Return focus to previously active element (card button)
      if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
        previousActiveElementRef.current.focus();
      }
    };
  }, [mission, onClose]);

  // Scroll active tab into view when changed or rendered
  useEffect(() => {
    if (!tabsNavRef.current) return;
    const activeBtn = tabsNavRef.current.querySelector<HTMLElement>('[data-active="true"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);

  useEffect(() => {
    // Reset tab and image state when mission changes
    setActiveTab('overview');
    setViewMode('photo');
    setNasaImage(null);
    setImageError(false);
    setOrbitalImages([]);

    if (mission) {
      setLoadingImage(true);
      const query = mission.nasaSearchQuery || `${mission.englishName} ${mission.destination}`;
      fetchNasaImageForMission(query)
        .then((result) => {
          setNasaImage(result);
          setImageError(!result);
          if (!result) {
            setViewMode('schematic');
          }
        })
        .catch(() => {
          setImageError(true);
          setViewMode('schematic');
        })
        .finally(() => {
          setLoadingImage(false);
        });

      // Fetch orbital imagery (LROC / HiRISE)
      setLoadingOrbital(true);
      const orbitalQuery = mission.orbitalSearchQuery || (
        mission.destination === 'Moon'
          ? `LROC ${mission.englishName} landing site`
          : `HiRISE ${mission.englishName}`
      );
      // Keywords for relevance filtering
      const baseKeywords = (mission.orbitalSearchQuery || mission.englishName)
        .toLowerCase()
        .replace(/[(),]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 2 && !['landing', 'site', 'mars', 'moon', 'crater'].includes(w));

      fetchOrbitalImagesForMission(orbitalQuery, baseKeywords)
        .then((results) => {
          setOrbitalImages(results);
        })
        .catch(() => {
          setOrbitalImages([]);
        })
        .finally(() => {
          setLoadingOrbital(false);
        });
    }
  }, [mission]);

  if (!mission) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      spaceAudio.playTelemetryBeep(900, 0.04);
      onClose();
    }
  };

  const modalNode = (
    <AnimatePresence>
      <div
        onClick={handleBackdropClick}
        className="fixed inset-0 z-[200] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8"
      >
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-mission-title"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-5xl bg-[#090d16] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto"
          style={{ maxHeight: 'calc(100dvh - 2rem)' }}
        >
          {/* Top Bar Header with Fixed Sticky Position and Opaque Background */}
          <div className="sticky top-0 z-30 bg-[#090d16] border-b border-slate-800 px-4 sm:px-6 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <span
                className={`w-3 h-3 rounded-full shrink-0 ${
                  mission.destination === 'Mars' ? 'bg-red-500' : 'bg-slate-200'
                }`}
              />
              <div className="min-w-0">
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-slate-400 truncate">
                  {t.modal.dossierPrefix} {mission.designation}
                </div>
                <h2
                  id="modal-mission-title"
                  className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase tracking-tight truncate"
                >
                  {localize(mission.name)} ({mission.englishName})
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden sm:block text-right">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{t.modal.missionStatusLabel}</div>
                <div className="text-xs font-mono font-semibold text-amber-400 max-w-[200px] truncate">
                  {localize(mission.status)}
                </div>
              </div>

              <button
                data-modal-close="true"
                onClick={() => {
                  spaceAudio.playTelemetryBeep(900, 0.04);
                  onClose();
                }}
                className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                title={t.modal.closeEsc}
                aria-label={t.modal.closeEsc}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs: Single line with smooth scroll-snap on narrow screens */}
          <div
            ref={tabsNavRef}
            className="flex flex-nowrap items-center gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 sm:px-6 py-2.5 bg-[#070b12] border-b border-slate-800 shrink-0 select-none scrollbar-none"
          >
            <button
              data-active={activeTab === 'overview'}
              onClick={() => {
                setActiveTab('overview');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`snap-start whitespace-nowrap shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === 'overview'
                  ? 'bg-red-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {t.modal.tabOverview}
            </button>
            <button
              data-active={activeTab === 'edl'}
              onClick={() => {
                setActiveTab('edl');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`snap-start whitespace-nowrap shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === 'edl'
                  ? 'bg-red-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {t.modal.tabEdl}
            </button>
            <button
              data-active={activeTab === 'science'}
              onClick={() => {
                setActiveTab('science');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`snap-start whitespace-nowrap shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === 'science'
                  ? 'bg-red-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {t.modal.tabScience}
            </button>
            <button
              data-active={activeTab === 'contact'}
              onClick={() => {
                setActiveTab('contact');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`snap-start whitespace-nowrap shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === 'contact'
                  ? 'bg-red-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {t.modal.tabContact}
            </button>
            <button
              data-active={activeTab === 'location'}
              onClick={() => {
                setActiveTab('location');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`snap-start whitespace-nowrap shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === 'location'
                  ? 'bg-red-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {t.modal.tabLocation}
            </button>
            <button
              data-active={activeTab === 'specs'}
              onClick={() => {
                setActiveTab('specs');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`snap-start whitespace-nowrap shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-lg transition-colors ${
                activeTab === 'specs'
                  ? 'bg-red-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {t.modal.tabSpecs}
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 min-h-0">
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Large Schematic Stage */}
                <div className="relative">
                  <SchematicView
                    type={mission.schematicType}
                    accentColor={mission.destination === 'Mars' ? '#e11d48' : '#38bdf8'}
                    className="h-60 sm:h-72 w-full"
                  />
                  <div className="absolute bottom-3 right-3 text-right bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{t.modal.locationRef}</div>
                    <div className="text-xs font-mono text-slate-200">{localize(mission.locationName)}</div>
                  </div>
                </div>

                {/* Lead Summary */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-red-400" />
                    {t.modal.shortDescTitle}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {localize(mission.shortDescription)}
                  </p>
                </div>

                {/* Quote if present */}
                {mission.quote && (
                  <div className="border-l-2 border-red-500 bg-red-950/20 pl-4 py-3 pr-4 rounded-r-lg">
                    <div className="text-sm sm:text-base italic text-slate-100 font-serif">
                      «{localize(mission.quote.text)}»
                    </div>
                    <div className="text-xs font-mono text-red-400 mt-1">
                      — {localize(mission.quote.speaker)} ({localize(mission.quote.context)})
                    </div>
                  </div>
                )}

                {/* Fast Facts Grid with auto-fit minmax(180px, 1fr) & no truncation */}
                <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
                  <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col justify-between">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{t.modal.launchDateLabel}</div>
                    <div className="text-xs sm:text-sm font-mono font-semibold text-white mt-1 break-words leading-snug">
                      {mission.launchDate}
                    </div>
                  </div>
                  <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col justify-between">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{t.modal.landingDateLabel}</div>
                    <div className="text-xs sm:text-sm font-mono font-semibold text-white mt-1 break-words leading-snug">
                      {mission.landingDate}
                    </div>
                  </div>
                  <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col justify-between">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{t.modal.lifespanLabel}</div>
                    <div className="text-xs sm:text-sm font-mono font-semibold text-white mt-1 break-words leading-snug">
                      {formatShortDuration(localize(mission.missionDuration), language)}
                    </div>
                  </div>
                  <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col justify-between">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{t.modal.distance}</div>
                    <div className="text-xs sm:text-sm font-mono font-semibold text-red-400 mt-1 break-words leading-snug">
                      {mission.distanceTraveled ? localize(mission.distanceTraveled) : t.modal.stationaryValue}
                    </div>
                  </div>
                </div>

                {/* Milestones list */}
                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    {t.modal.milestonesTitle}
                  </h4>
                  <div className="space-y-3">
                    {mission.milestones.map((m, idx) => (
                      <div key={idx} className="flex gap-4 p-3.5 bg-slate-900/40 border border-slate-800/80 rounded-lg">
                        <div className="text-xs font-mono font-bold text-red-400 whitespace-nowrap min-w-[80px]">
                          {m.date}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-white">{localize(m.title)}</div>
                          <div className="text-xs text-slate-300 mt-0.5 leading-relaxed">{localize(m.description)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: HOW DID IT GET THERE */}
            {activeTab === 'edl' && (
              <div className="space-y-6">
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
                  <div className="text-xs font-mono text-red-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Rocket className="w-3.5 h-3.5" />
                    {t.modal.tabEdl}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight mb-4">
                    {t.modal.howGotThereHeading}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {localize(mission.howGotThere)}
                  </p>
                </div>

                {/* EDL technical notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                    <div className="text-xs font-mono text-slate-400 uppercase mb-1">{t.modal.landingPointLabel}</div>
                    <div className="text-sm font-semibold text-white">{localize(mission.locationName)}</div>
                    <div className="text-xs font-mono text-slate-400 mt-1">{mission.coordinates.formatted}</div>
                  </div>
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                    <div className="text-xs font-mono text-slate-400 uppercase mb-1">{t.modal.landingDateTimeLabel}</div>
                    <div className="text-sm font-semibold text-white">{mission.landingDate}</div>
                    <div className="text-xs font-mono text-slate-400 mt-1">{t.modal.officialTelemetryLabel}</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: WHAT DID IT DO */}
            {activeTab === 'science' && (
              <div className="space-y-6">
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
                  <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    {t.modal.tabScience}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight mb-4">
                    {t.modal.whatDidItDoHeading}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {localize(mission.whatDidItDo)}
                  </p>
                </div>
              </div>
            )}

            {/* TAB: LAST CONTACT */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
                  <div className="text-xs font-mono text-red-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5" />
                    {t.modal.tabContact}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight mb-4">
                    {t.modal.lastContactStoryHeading}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {localize(mission.lastContactStory)}
                  </p>

                  {mission.signalData && (
                    <div className="mt-6 p-4 bg-slate-950 border border-red-900/40 rounded-lg font-mono text-xs text-slate-300 space-y-2">
                      <div className="text-[11px] text-red-400 font-bold uppercase tracking-wider">
                        {t.modal.finalPacketHeading}
                      </div>
                      <div className="text-slate-400 break-words leading-relaxed">
                        {mission.signalData.lastTelemetry}
                      </div>
                      <div className="text-slate-400 pt-2 border-t border-slate-800 leading-relaxed">
                        {t.modal.fadeReasonPrefix} <span className="text-slate-200">{localize(mission.signalData.fadeReason)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: WHERE IS IT NOW */}
            {activeTab === 'location' && (
              <div className="space-y-6">
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
                  <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    {t.modal.tabLocation}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight mb-4">
                    {t.modal.whereIsItNowHeading}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {localize(mission.whereIsItNow)}
                  </p>
                </div>

                {/* Real NASA Photo / Schematic Toggle Container */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-slate-900 pb-3">
                    <div className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <span>{t.modal.nasaPhotoTitle}</span>
                    </div>

                    {/* View Switcher: Real Photo vs Schematic */}
                    <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono">
                      <button
                        onClick={() => {
                          setViewMode('photo');
                          spaceAudio.playTelemetryBeep(1200, 0.03);
                        }}
                        disabled={loadingImage || (!nasaImage && imageError)}
                        className={`px-3 py-1 rounded flex items-center gap-1.5 transition-colors ${
                          viewMode === 'photo'
                            ? 'bg-red-600 text-white font-medium shadow-sm'
                            : 'text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed'
                        }`}
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>{t.modal.viewPhotoBtn}</span>
                      </button>

                      <button
                        onClick={() => {
                          setViewMode('schematic');
                          spaceAudio.playTelemetryBeep(1100, 0.03);
                        }}
                        className={`px-3 py-1 rounded flex items-center gap-1.5 transition-colors ${
                          viewMode === 'schematic'
                            ? 'bg-slate-800 text-white font-medium shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Cpu className="w-3.5 h-3.5" />
                        <span>{t.modal.viewSchematicBtn}</span>
                      </button>
                    </div>
                  </div>

                  {/* Photo Display View */}
                  {viewMode === 'photo' && (
                    <div>
                      {loadingImage ? (
                        <div className="h-64 sm:h-80 flex flex-col items-center justify-center gap-3 text-slate-400 text-xs font-mono bg-slate-950/70 border border-dashed border-slate-800 rounded-lg">
                          <Loader2 className="w-6 h-6 animate-spin text-red-500" />
                          <span>{t.modal.photoLoading}</span>
                        </div>
                      ) : nasaImage ? (
                        <div className="space-y-3">
                          <div className="relative group overflow-hidden rounded-lg border border-slate-800 bg-black">
                            <img
                              src={nasaImage.imageUrl}
                              alt={nasaImage.title}
                              referrerPolicy="no-referrer"
                              className="w-full max-h-96 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                              onError={() => {
                                setImageError(true);
                                setViewMode('schematic');
                              }}
                            />
                            <div className="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-slate-300 border border-slate-700 backdrop-blur-sm">
                              NASA ARCHIVE ID: {nasaImage.nasaId}
                            </div>
                            <div className="absolute bottom-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-slate-300 border border-slate-700 backdrop-blur-sm">
                              {nasaImage.dateCreated} · {nasaImage.center}
                            </div>
                          </div>

                          {/* Caption and NASA Link */}
                          <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-lg text-xs space-y-1.5">
                            <div className="font-semibold text-slate-200">
                              {nasaImage.title}
                            </div>
                            <p className="text-slate-400 line-clamp-2 leading-relaxed">
                              {nasaImage.description}
                            </p>
                            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
                              <span className="text-slate-500">{t.modal.photoCredit}</span>
                              <a
                                href={nasaImage.detailUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-400 hover:text-red-300 inline-flex items-center gap-1 font-medium transition-colors"
                              >
                                <span>{t.modal.openNasaJplLink}</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Fallback when image is not found */
                        <div className="space-y-3">
                          <div className="p-3 bg-amber-950/30 border border-amber-800/50 rounded-lg text-xs font-mono text-amber-200 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                            <span>{t.modal.photoNotFound}</span>
                          </div>
                          <SchematicView
                            type={mission.schematicType}
                            accentColor={mission.destination === 'Mars' ? '#e11d48' : '#38bdf8'}
                            className="h-64 sm:h-72 w-full"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Schematic Display View */}
                  {viewMode === 'schematic' && (
                    <div className="space-y-3">
                      <SchematicView
                        type={mission.schematicType}
                        accentColor={mission.destination === 'Mars' ? '#e11d48' : '#38bdf8'}
                        className="h-64 sm:h-72 w-full"
                      />
                    </div>
                  )}
                </div>

                {/* Coordinates Info Box */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs space-y-2">
                  <div className="text-slate-400 uppercase tracking-wider">{t.modal.locationRef}:</div>
                  <div className="text-base text-white font-bold">{mission.coordinates.formatted}</div>
                  <div className="text-slate-400">{mission.coordinates.lat}, {mission.coordinates.lon}</div>
                </div>

                {/* Orbital Imagery Gallery ("Вид с орбиты") */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-3">
                    <div>
                      <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5" />
                        <span>{t.modal.orbitalGalleryTitle}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {t.modal.orbitalGallerySubtitle}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-500/80 bg-cyan-950/30 px-2 py-1 rounded border border-cyan-900/40 self-start sm:self-auto">
                      NASA IMAGE API // ORBITAL
                    </span>
                  </div>

                  {loadingOrbital ? (
                    <div className="h-44 flex flex-col items-center justify-center gap-3 text-slate-400 text-xs font-mono bg-slate-950/70 border border-dashed border-slate-800 rounded-lg">
                      <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                      <span>{t.modal.photoLoading}</span>
                    </div>
                  ) : orbitalImages.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {orbitalImages.map((img) => (
                        <div
                          key={img.nasaId}
                          className="group rounded-lg border border-slate-800/90 bg-slate-900/60 overflow-hidden flex flex-col hover:border-slate-700 transition-colors"
                        >
                          <div className="relative aspect-video bg-black overflow-hidden shrink-0">
                            <img
                              src={img.imageUrl}
                              alt={img.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-cyan-300 border border-slate-800 backdrop-blur-sm truncate max-w-[200px]">
                              {t.modal.orbitalNasaId} {img.nasaId}
                            </div>
                            <div className="absolute bottom-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-slate-300 border border-slate-800 backdrop-blur-sm">
                              {img.dateCreated}
                            </div>
                          </div>
                          <div className="p-3.5 flex-1 flex flex-col justify-between gap-2.5">
                            <div>
                              <h4 className="text-xs font-bold text-slate-200 line-clamp-1 group-hover:text-cyan-300 transition-colors">
                                {img.title}
                              </h4>
                              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                                {img.description}
                              </p>
                            </div>
                            <div className="pt-2 border-t border-slate-800/70 flex items-center justify-between text-[11px] font-mono">
                              <span className="text-slate-500 truncate">{img.center || 'NASA'}</span>
                              <a
                                href={img.detailUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-medium transition-colors shrink-0"
                              >
                                <span>{t.modal.orbitalOriginalLink}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Fallback when no orbital imagery found */
                    <div className="p-4 bg-slate-900/40 border border-dashed border-slate-800 rounded-lg text-xs font-mono space-y-3">
                      <div className="flex items-start gap-2.5 text-slate-300">
                        <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                          {t.modal.orbitalEmptyFallback}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-end">
                        <a
                          href="https://pds.nasa.gov/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 transition-colors font-medium text-[11px]"
                        >
                          <span>{t.modal.orbitalPdsLink}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Official Mission Source Link */}
                {mission.source && (
                  <div className="p-3 bg-slate-950/70 border border-slate-900 rounded-lg text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span>{t.modal.officialSource}:</span>
                    <a
                      href={mission.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-white underline decoration-slate-600 hover:decoration-white inline-flex items-center gap-1.5"
                    >
                      <span>{t.modal.openNasaJplLink}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* TAB: SPECS */}
            {activeTab === 'specs' && (
              <div className="space-y-6">
                <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight mb-4">
                  {t.modal.specsTitle}
                </h3>
                <div className="border border-slate-800 rounded-lg overflow-hidden divide-y divide-slate-800">
                  {mission.specs.map((s, idx) => (
                    <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-950/60">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400">{localize(s.label)}</span>
                      <span className="text-xs sm:text-sm font-mono text-slate-100 font-semibold sm:text-right break-words">{localize(s.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="bg-[#090d16] border-t border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between text-xs font-mono text-slate-500 shrink-0">
            <div className="truncate pr-2">
              {t.modal.missionPrefix} {mission.designation}
            </div>
            <button
              onClick={() => {
                spaceAudio.playTelemetryBeep(900, 0.04);
                onClose();
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors shrink-0 font-medium"
            >
              {t.modal.closeDossierBtn}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalNode, document.body);
};
