import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mission } from '../types/mission';
import { SchematicView } from './SchematicView';
import { fetchNasaImageForMission, NasaImageResult } from '../utils/nasaImages';
import {
  X,
  MapPin,
  Calendar,
  Radio,
  Rocket,
  Compass,
  FileText,
  Activity,
  Layers,
  Award,
  Clock,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Image as ImageIcon,
  Cpu,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface MissionModalProps {
  mission: Mission | null;
  onClose: () => void;
}

export const MissionModal: React.FC<MissionModalProps> = ({ mission, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'edl' | 'science' | 'contact' | 'location' | 'specs'>('overview');
  const [nasaImage, setNasaImage] = useState<NasaImageResult | null>(null);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'photo' | 'schematic'>('photo');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    // Reset tab and image state when mission changes
    setActiveTab('overview');
    setViewMode('photo');
    setNasaImage(null);
    setImageError(false);

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
    }
  }, [mission]);

  if (!mission) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-5xl bg-[#090d16] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Top Bar Header with Mission Status */}
          <div className="sticky top-0 z-20 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`w-3 h-3 rounded-full ${
                  mission.destination === 'Mars' ? 'bg-red-500' : 'bg-slate-200'
                }`}
              />
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                  ДОСЬЕ ОБЪЕКТА // {mission.designation}
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                  {mission.name} ({mission.englishName})
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Статус миссии</div>
                <div className="text-xs font-mono font-semibold text-amber-400">
                  {mission.status}
                </div>
              </div>

              <button
                onClick={() => {
                  spaceAudio.playTelemetryBeep(900, 0.04);
                  onClose();
                }}
                className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
                title="Закрыть (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="bg-slate-950/70 border-b border-slate-800/80 px-6 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <button
              onClick={() => {
                setActiveTab('overview');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'overview'
                  ? 'bg-red-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Обзор & Схема
            </button>
            <button
              onClick={() => {
                setActiveTab('edl');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'edl'
                  ? 'bg-red-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Как он туда попал?
            </button>
            <button
              onClick={() => {
                setActiveTab('science');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'science'
                  ? 'bg-red-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Что он сделал?
            </button>
            <button
              onClick={() => {
                setActiveTab('contact');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'contact'
                  ? 'bg-red-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Последний контакт
            </button>
            <button
              onClick={() => {
                setActiveTab('location');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'location'
                  ? 'bg-red-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Где он сейчас?
            </button>
            <button
              onClick={() => {
                setActiveTab('specs');
                spaceAudio.playTelemetryBeep(1100, 0.03);
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'specs'
                  ? 'bg-red-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Технические характеристики
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Large Schematic Stage */}
                <div className="relative">
                  <SchematicView
                    type={mission.schematicType}
                    accentColor={mission.destination === 'Mars' ? '#e11d48' : '#38bdf8'}
                    className="h-64 sm:h-72 w-full"
                  />
                  <div className="absolute bottom-3 right-3 text-right">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Ориентир дислокации</div>
                    <div className="text-xs font-mono text-slate-200">{mission.locationName}</div>
                  </div>
                </div>

                {/* Lead Summary */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-red-400" />
                    Краткое описание миссии
                  </h4>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {mission.shortDescription}
                  </p>
                </div>

                {/* Quote if present */}
                {mission.quote && (
                  <div className="border-l-2 border-red-500 bg-red-950/20 pl-4 py-3 pr-4 rounded-r-lg">
                    <div className="text-sm sm:text-base italic text-slate-100 font-serif">
                      «{mission.quote.text}»
                    </div>
                    <div className="text-xs font-mono text-red-400 mt-1">
                      — {mission.quote.speaker} ({mission.quote.context})
                    </div>
                  </div>
                )}

                {/* Fast Facts Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Дата старта</div>
                    <div className="text-xs sm:text-sm font-mono font-semibold text-white mt-0.5">
                      {mission.launchDate}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Посадка</div>
                    <div className="text-xs sm:text-sm font-mono font-semibold text-white mt-0.5">
                      {mission.landingDate}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Срок работы</div>
                    <div className="text-xs sm:text-sm font-mono font-semibold text-white mt-0.5 truncate">
                      {mission.missionDuration}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Дистанция</div>
                    <div className="text-xs sm:text-sm font-mono font-semibold text-red-400 mt-0.5">
                      {mission.distanceTraveled || 'Стационарный'}
                    </div>
                  </div>
                </div>

                {/* Milestones list */}
                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Ключевые вехи экспедиции
                  </h4>
                  <div className="space-y-3">
                    {mission.milestones.map((m, idx) => (
                      <div key={idx} className="flex gap-4 p-3 bg-slate-900/40 border border-slate-800/80 rounded-lg">
                        <div className="text-xs font-mono font-bold text-red-400 whitespace-nowrap min-w-[80px]">
                          {m.date}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-white">{m.title}</div>
                          <div className="text-xs text-slate-300 mt-0.5">{m.description}</div>
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
                    ПОСАДОЧНЫЙ ПРОФИЛЬ // EDL SEQUENCE
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight mb-4">
                    Как аппарат туда попал?
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {mission.howGotThere}
                  </p>
                </div>

                {/* EDL technical notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                    <div className="text-xs font-mono text-slate-400 uppercase mb-1">Точка посадки</div>
                    <div className="text-sm font-semibold text-white">{mission.locationName}</div>
                    <div className="text-xs font-mono text-slate-400 mt-1">{mission.coordinates.formatted}</div>
                  </div>
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                    <div className="text-xs font-mono text-slate-400 uppercase mb-1">Дата и время касания</div>
                    <div className="text-sm font-semibold text-white">{mission.landingDate}</div>
                    <div className="text-xs font-mono text-slate-400 mt-1">Официальная телеметрия NASA JPL</div>
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
                    НАУЧНЫЙ ВКЛАД И ОТКРЫТИЯ
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight mb-4">
                    Что аппарат сделал на чужой планете?
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {mission.whatDidItDo}
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
                    ПОСЛЕДНИЙ СИГНАЛ ТЕЛЕМЕТРИИ
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight mb-4">
                    История последнего контакта
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {mission.lastContactStory}
                  </p>

                  {mission.signalData && (
                    <div className="mt-6 p-4 bg-slate-950 border border-red-900/40 rounded-lg font-mono text-xs text-slate-300 space-y-2">
                      <div className="text-[11px] text-red-400 font-bold uppercase">
                        // ФИНАЛЬНЫЙ ТЕЛЕМЕТРИЧЕСКИЙ ПАКЕТ
                      </div>
                      <div className="text-slate-400">
                        {mission.signalData.lastTelemetry}
                      </div>
                      <div className="text-slate-400 pt-1 border-t border-slate-800">
                        Причина затухания связи: <span className="text-slate-200">{mission.signalData.fadeReason}</span>
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
                    ТЕКУЩЕЕ СОСТОЯНИЕ ВНЕЗЕМНОГО ОБЪЕКТА
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight mb-4">
                    Где он находится прямо сейчас?
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {mission.whereIsItNow}
                  </p>
                </div>

                {/* Real NASA Photo / Schematic Toggle Container */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-slate-900 pb-3">
                    <div className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <span>ВИЗУАЛЬНОЕ СВИДЕТЕЛЬСТВО NASA</span>
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
                        <span>Реальное фото NASA</span>
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
                        <span>Инженерный чертёж</span>
                      </button>
                    </div>
                  </div>

                  {/* Photo Display View */}
                  {viewMode === 'photo' && (
                    <div>
                      {loadingImage ? (
                        <div className="h-64 sm:h-80 flex flex-col items-center justify-center gap-3 text-slate-400 text-xs font-mono bg-slate-950/70 border border-dashed border-slate-800 rounded-lg">
                          <Loader2 className="w-6 h-6 animate-spin text-red-500" />
                          <span>Запрос снимка к открытой библиотеке NASA Image & Video Library...</span>
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
                              ДАТА: {nasaImage.dateCreated} · {nasaImage.center}
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
                              <span className="text-slate-500">Источник: NASA Image and Video Library</span>
                              <a
                                href={nasaImage.detailUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-400 hover:text-red-300 inline-flex items-center gap-1 font-medium transition-colors"
                              >
                                <span>Открыть оригинал на images.nasa.gov</span>
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
                            <span>Прямое архивное фото не найдено в открытой библиотеке NASA. Отображается ортографический чертеж.</span>
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
                      <div className="text-[11px] font-mono text-slate-500 text-center">
                        Инженерная ортографическая схема аппарата (запасной визуальный вариант архива)
                      </div>
                    </div>
                  )}
                </div>

                {/* Coordinates Info Box */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs space-y-2">
                  <div className="text-slate-400 uppercase">Планетарные координаты стоянки:</div>
                  <div className="text-base text-white font-bold">{mission.coordinates.formatted}</div>
                  <div className="text-slate-400">Широта/Долгота: {mission.coordinates.lat}, {mission.coordinates.lon}</div>
                </div>

                {/* Official Mission Source Link */}
                {mission.source && (
                  <div className="p-3 bg-slate-950/70 border border-slate-900 rounded-lg text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span>Официальное досье миссии:</span>
                    <a
                      href={mission.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-white underline decoration-slate-600 hover:decoration-white inline-flex items-center gap-1.5"
                    >
                      <span>Открыть страницу NASA / JPL</span>
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
                  Технические характеристики аппарата
                </h3>
                <div className="border border-slate-800 rounded-lg overflow-hidden divide-y divide-slate-800">
                  {mission.specs.map((s, idx) => (
                    <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-950/60">
                      <span className="text-xs font-mono uppercase text-slate-400">{s.label}</span>
                      <span className="text-xs sm:text-sm font-mono text-slate-100 font-semibold sm:text-right">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="bg-[#090d16] border-t border-slate-800 px-6 py-4 flex items-center justify-between text-xs font-mono text-slate-500">
            <div>
              МИССИЯ // {mission.designation}
            </div>
            <button
              onClick={() => {
                spaceAudio.playTelemetryBeep(900, 0.04);
                onClose();
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
            >
              Закрыть досье (ESC)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
