import React, { useState, useEffect, useRef } from 'react';
import { Radio, Send, RotateCcw, Clock, Satellite, Zap, Info, CheckCircle2 } from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { useT } from '../i18n/LanguageContext';
import { LocalizedText } from '../i18n/types';

// Speed of light constant: c = 299,792 km/s
const SPEED_OF_LIGHT_KM_S = 299792;

// Fixed animation durations in milliseconds (4s outward + 0.8s Mars pause + 4s return)
const OUTBOUND_DURATION_MS = 4000;
const MARS_PAUSE_DURATION_MS = 800;
const INBOUND_DURATION_MS = 4000;
const TOTAL_SIM_DURATION_MS = OUTBOUND_DURATION_MS + MARS_PAUSE_DURATION_MS + INBOUND_DURATION_MS;

interface CommandPreset {
  id: string;
  label: LocalizedText;
  code: string;
  response: string;
}

const commandPresets: CommandPreset[] = [
  {
    id: 'ping',
    label: {
      ru: 'Запрос статуса систем (PING)',
      en: 'System Health Query (PING)',
      uz: 'Tizimlar holati so‘rovi (PING)',
    },
    code: 'DSN-CMD 0x1A: QUERY // PBIT STATUS & VOLTAGE BUS',
    response: 'ACK: ALL SYSTEMS NOMINAL // BATTERY 94% // THERMAL STABLE'
  },
  {
    id: 'drive',
    label: {
      ru: 'Движение вперед на 5 метров',
      en: 'Drive 5 meters forward',
      uz: '5 metr oldinga harakatlanish',
    },
    code: 'DSN-CMD 0x4F: NAVCAM AUTODRIVE // 5.0m AT HEADING 042°',
    response: 'ROVER TELEMETRY: 5.02m TRAVERSED // HAZCAM CLEAR // STOPPING'
  },
  {
    id: 'photo',
    label: {
      ru: 'Съемка панорамы высокого разрешения',
      en: 'High-resolution panorama capture',
      uz: 'Yuqori aniqlikdagi panorama suratga olish',
    },
    code: 'DSN-CMD 0x82: MASTCAM-Z 360° PANO // FILTER RGB 4K',
    response: 'DOWNLINK READY: 28 RAW FRAMES IN COMPRESSION BUFFER'
  }
];

export const SignalDelaySection: React.FC = () => {
  const { t, localize } = useT();
  // Distance in millions of kilometers (55 to 400 млн км)
  const [distanceMlnKm, setDistanceMlnKm] = useState<number>(225);
  const [selectedCommand, setSelectedCommand] = useState<CommandPreset>(commandPresets[0]);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [transmissionPhase, setTransmissionPhase] = useState<'idle' | 'earth_to_mars' | 'mars_processing' | 'mars_to_earth' | 'completed'>('idle');

  // Single source of truth for beam coordinate along the track: 0 (Earth) -> 1 (Mars)
  const [beamProgress, setBeamProgress] = useState<number>(0);
  // Overall simulation progress: 0..1 (0% to 100%)
  const [overallProgress, setOverallProgress] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const animFrameRef = useRef<number | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
  }, []);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Exact formulas based on physics:
  const distanceKm = distanceMlnKm * 1_000_000;
  const oneWaySeconds = distanceKm / SPEED_OF_LIGHT_KM_S;
  const roundTripSeconds = oneWaySeconds * 2;

  // Format seconds into minutes and seconds
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = (totalSec % 60).toFixed(1);
    return `${mins} ${t.signalDelay.minutes} ${secs} ${t.signalDelay.seconds}`;
  };

  // Remaining simulated real-time during fast-forward playback
  const remainingRealSeconds = Math.max(0, roundTripSeconds * (1 - overallProgress));

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistanceMlnKm(Number(e.target.value));
  };

  const handleSetPresetDistance = (val: number) => {
    spaceAudio.playTelemetryBeep(1100, 0.03);
    setDistanceMlnKm(val);
  };

  const handleSendCommand = () => {
    if (isTransmitting) return;

    spaceAudio.playTelemetryBeep(1400, 0.08);
    setIsTransmitting(true);
    setBeamProgress(0);
    setOverallProgress(0);

    if (prefersReducedMotion) {
      // Instant execution without animation loops
      setTransmissionPhase('completed');
      setIsTransmitting(false);
      setOverallProgress(1);
      setBeamProgress(0);
      spaceAudio.playTelemetryBeep(980, 0.06);
      return;
    }

    setTransmissionPhase('earth_to_mars');
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const totalProg = Math.min(1, elapsed / TOTAL_SIM_DURATION_MS);
      setOverallProgress(totalProg);

      if (elapsed < OUTBOUND_DURATION_MS) {
        // Phase 1: Earth -> Mars (0 -> 1)
        const p = elapsed / OUTBOUND_DURATION_MS;
        setBeamProgress(Math.max(0, Math.min(1, p)));
        setTransmissionPhase('earth_to_mars');
      } else if (elapsed < OUTBOUND_DURATION_MS + MARS_PAUSE_DURATION_MS) {
        // Phase 2: Mars processing pause & flash
        setBeamProgress(1);
        setTransmissionPhase('mars_processing');
      } else if (elapsed < TOTAL_SIM_DURATION_MS) {
        // Phase 3: Mars -> Earth (1 -> 0)
        const returnElapsed = elapsed - (OUTBOUND_DURATION_MS + MARS_PAUSE_DURATION_MS);
        const p = returnElapsed / INBOUND_DURATION_MS;
        setBeamProgress(Math.max(0, Math.min(1, 1 - p)));
        setTransmissionPhase('mars_to_earth');
      } else {
        // Phase 4: Completed
        setBeamProgress(0);
        setOverallProgress(1);
        setTransmissionPhase('completed');
        setIsTransmitting(false);
        spaceAudio.playTelemetryBeep(1200, 0.06);
        return;
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  const handleResetSimulation = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setIsTransmitting(false);
    setTransmissionPhase('idle');
    setBeamProgress(0);
    setOverallProgress(0);
    spaceAudio.playTelemetryBeep(900, 0.04);
  };

  // Clamped beam position strictly between 0 and 1
  const clampedProgress = Math.max(0, Math.min(1, beamProgress));

  return (
    <section id="signal-delay" className="relative py-24 bg-[#03060a] border-t border-slate-900 overflow-hidden">
      {/* Background Starry Glow */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>{t.signalDelay.sectionTag}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {t.signalDelay.title}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            {t.signalDelay.subtitle}
          </p>
        </div>

        {/* Interactive Control Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Interactive Slider and Calculation (7 cols) */}
          <div className="lg:col-span-7 bg-[#060b13] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Satellite className="w-4 h-4 text-cyan-400" />
                {t.signalDelay.distanceLabel}
              </span>
              <span className="font-mono text-lg font-bold text-cyan-300 font-mono-tabular">
                {distanceMlnKm} mln km
              </span>
            </div>

            {/* Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-500 mb-2">
                <span>{t.signalDelay.minDistance}</span>
                <span className="text-slate-400">{t.signalDelay.currentDistance} {distanceMlnKm} 000 000 km</span>
                <span>{t.signalDelay.maxDistance}</span>
              </div>
              <input
                type="range"
                min="55"
                max="400"
                step="1"
                value={distanceMlnKm}
                onChange={handleSliderChange}
                disabled={isTransmitting}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            {/* Orbital Preset Buttons */}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => handleSetPresetDistance(55)}
                disabled={isTransmitting}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors border ${
                  distanceMlnKm === 55
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {t.signalDelay.presetOpposition}
              </button>
              <button
                onClick={() => handleSetPresetDistance(225)}
                disabled={isTransmitting}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors border ${
                  distanceMlnKm === 225
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {t.signalDelay.presetAverage}
              </button>
              <button
                onClick={() => handleSetPresetDistance(400)}
                disabled={isTransmitting}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors border ${
                  distanceMlnKm === 400
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {t.signalDelay.presetConjunction}
              </button>
            </div>

            {/* Real-time Physics Calculation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90">
                <div className="text-[11px] font-mono uppercase text-slate-500 flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {t.signalDelay.oneWayLabel}
                </div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white font-mono-tabular">
                  {formatTime(oneWaySeconds)}
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-1">
                  {oneWaySeconds.toFixed(1)} {t.signalDelay.seconds} (c = 299 792 km/s)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90">
                <div className="text-[11px] font-mono uppercase text-slate-500 flex items-center gap-1.5 mb-1">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  {t.signalDelay.roundTripLabel}
                </div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300 font-mono-tabular">
                  {formatTime(roundTripSeconds)}
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-1">
                  {roundTripSeconds.toFixed(1)} {t.signalDelay.seconds} ({t.signalDelay.roundTripSub})
                </div>
              </div>
            </div>

            {/* Formula Reference Tag */}
            <div className="p-3 bg-slate-950/80 border border-slate-800/60 rounded-lg text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>{t.signalDelay.formulaTag}</span>
              <span className="text-slate-500">{distanceMlnKm} 000 000 km / 299 792 km/s = {oneWaySeconds.toFixed(1)} s</span>
            </div>
          </div>

          {/* Right Column: Command Sender & Telemetry Console (5 cols) */}
          <div className="lg:col-span-5 bg-[#060b13] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  {t.signalDelay.commandPacketLabel}
                </span>
                <span className="text-[10px] font-mono text-slate-500">X-BAND 8.4 GHz</span>
              </div>

              {/* Command Presets Selector */}
              <div className="space-y-2 mb-4">
                {commandPresets.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => {
                      setSelectedCommand(cmd);
                      spaceAudio.playTelemetryBeep(1200, 0.02);
                    }}
                    disabled={isTransmitting}
                    className={`w-full p-2.5 rounded-lg text-left text-xs font-mono transition-all border ${
                      selectedCommand.id === cmd.id
                        ? 'bg-slate-900 border-cyan-500/80 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-slate-200">{localize(cmd.label)}</div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">{cmd.code}</div>
                  </button>
                ))}
              </div>

              {/* Status Indicator */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{t.signalDelay.channelStatusLabel}</span>
                  <span className={`font-semibold uppercase ${
                    transmissionPhase === 'completed'
                      ? 'text-emerald-400'
                      : isTransmitting
                      ? 'text-cyan-400 animate-pulse'
                      : 'text-slate-400'
                  }`}>
                    {transmissionPhase === 'idle' && t.signalDelay.statusIdle}
                    {transmissionPhase === 'earth_to_mars' && t.signalDelay.statusEarthToMars}
                    {transmissionPhase === 'mars_processing' && t.signalDelay.statusMarsProcessing}
                    {transmissionPhase === 'mars_to_earth' && t.signalDelay.statusMarsToEarth}
                    {transmissionPhase === 'completed' && t.signalDelay.statusCompleted}
                  </span>
                </div>

                {transmissionPhase === 'completed' && (
                  <div className="pt-2 border-t border-slate-900 text-emerald-300/90 text-[11px] leading-relaxed">
                    <div className="font-bold text-emerald-400 mb-0.5">{t.signalDelay.responseLabel}</div>
                    {selectedCommand.response}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSendCommand}
                disabled={isTransmitting}
                className={`flex-1 py-3 px-4 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
                  isTransmitting
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-cyan-600 hover:bg-cyan-500 text-black shadow-cyan-950/40 active:scale-[0.98]'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>{t.signalDelay.sendBtn}</span>
              </button>

              {(transmissionPhase !== 'idle' || isTransmitting) && (
                <button
                  onClick={handleResetSimulation}
                  className="px-3 py-3 rounded-lg border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white transition-colors"
                  title={t.signalDelay.resetBtn}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Animated Planetary Beam Stage */}
        <div className="rounded-2xl border border-slate-800 bg-[#04060a] p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          {/* Stage Header with Single Source Progress & Rewind Countdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-500 border-b border-slate-900 pb-3 mb-6">
            <span className="uppercase tracking-wider">{t.signalDelay.vizTitle}</span>
            <div className="flex items-center gap-3">
              {isTransmitting && (
                <span className="text-amber-400/90 font-mono-tabular flex items-center gap-1 text-[11px]">
                  <span>⏩</span>
                  <span>{formatTime(remainingRealSeconds)}</span>
                </span>
              )}
              <span className="text-cyan-400 font-mono-tabular font-bold">
                {isTransmitting
                  ? `${t.signalDelay.modeSim}: ${Math.round(overallProgress * 100)}%`
                  : transmissionPhase === 'completed'
                  ? `${t.signalDelay.statusCompleted}`
                  : t.signalDelay.modeIdle}
              </span>
            </div>
          </div>

          {/* Visual Track: Horizontal on all screens including mobile 375px */}
          <div className="relative py-4 px-1 sm:px-4 flex items-center justify-between w-full">
            {/* Earth Station Node */}
            <div className="relative z-10 flex flex-col items-center shrink-0 w-16 sm:w-24 text-center">
              <div
                className={`w-11 h-11 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center transition-all ${
                  transmissionPhase === 'earth_to_mars'
                    ? 'border-cyan-400 bg-cyan-950/60 shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                    : transmissionPhase === 'completed'
                    ? 'border-emerald-400 bg-emerald-950/60 shadow-[0_0_25px_rgba(52,211,153,0.5)]'
                    : 'border-slate-700 bg-slate-900'
                }`}
              >
                <span className="text-lg sm:text-2xl select-none">🌍</span>
              </div>
              <span className="mt-2 text-[10px] sm:text-xs font-mono font-bold text-white uppercase tracking-wider truncate max-w-[85px] sm:max-w-none">
                {t.signalDelay.earthNode}
              </span>
              <span className="hidden sm:block text-[10px] font-mono text-slate-500">
                {t.signalDelay.earthSub}
              </span>
            </div>

            {/* Beam Track Container: flex-1 relative strictly between Earth and Mars centers */}
            <div className="flex-1 relative mx-2 sm:mx-6 flex flex-col items-center justify-center">
              {/* Distance Label: Above the line on solid dark background */}
              <div className="mb-3 sm:mb-5 px-2.5 py-1 bg-[#090d16] border border-slate-800 rounded-md text-[9px] sm:text-xs font-mono text-center shadow-lg z-10 whitespace-nowrap">
                <span className="text-cyan-400 font-bold">{distanceMlnKm} mln km</span>{' '}
                <span className="text-slate-400 hidden xs:inline">{t.signalDelay.spaceVacuum}</span>
              </div>

              {/* Physical Line Track: The photon and fill are clamped 0..1 inside this container */}
              <div className="relative w-full h-1.5 sm:h-2 bg-slate-800/90 rounded-full">
                {/* Active Beam Fill */}
                {isTransmitting && (
                  <div
                    className={`absolute top-0 bottom-0 rounded-full transition-none ${
                      transmissionPhase === 'earth_to_mars'
                        ? 'left-0 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_#06b6d4]'
                        : transmissionPhase === 'mars_processing'
                        ? 'left-0 right-0 bg-gradient-to-r from-cyan-500 via-amber-400 to-cyan-500 shadow-[0_0_12px_#f59e0b]'
                        : 'right-0 bg-gradient-to-l from-amber-500 to-red-500 shadow-[0_0_10px_#f59e0b]'
                    }`}
                    style={{
                      left: transmissionPhase === 'mars_to_earth' ? `${clampedProgress * 100}%` : '0%',
                      width:
                        transmissionPhase === 'earth_to_mars'
                          ? `${clampedProgress * 100}%`
                          : transmissionPhase === 'mars_processing'
                          ? '100%'
                          : `${(1 - clampedProgress) * 100}%`,
                    }}
                  />
                )}

                {/* Moving Photon Packet Circle: Strictly clamped 0..1 with translate(-50%, -50%) */}
                {!prefersReducedMotion && isTransmitting && (
                  <div
                    className={`absolute top-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full pointer-events-none z-20 ${
                      transmissionPhase === 'earth_to_mars'
                        ? 'bg-cyan-400 shadow-[0_0_14px_#22d3ee]'
                        : transmissionPhase === 'mars_processing'
                        ? 'bg-amber-400 shadow-[0_0_18px_#fbbf24]'
                        : 'bg-amber-400 shadow-[0_0_14px_#fbbf24]'
                    }`}
                    style={{
                      left: `${clampedProgress * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )}
              </div>

              {/* Speed of Light Label: Below the line on solid dark background */}
              <div className="mt-3 sm:mt-5 px-2.5 py-0.5 bg-[#090d16] border border-slate-900 rounded-md text-[8px] sm:text-[10px] font-mono text-slate-500 text-center shadow-lg z-10 whitespace-nowrap">
                {t.signalDelay.lightSpeedConstant}
              </div>
            </div>

            {/* Mars Station Node */}
            <div className="relative z-10 flex flex-col items-center shrink-0 w-16 sm:w-24 text-center">
              <div
                className={`w-11 h-11 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center transition-all ${
                  transmissionPhase === 'mars_processing'
                    ? 'border-amber-400 bg-amber-500/30 shadow-[0_0_25px_rgba(245,158,11,0.6)] animate-pulse'
                    : transmissionPhase === 'mars_to_earth'
                    ? 'border-amber-500 bg-amber-950/60 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                    : 'border-slate-700 bg-slate-900'
                }`}
              >
                <span className="text-lg sm:text-2xl select-none">🔴</span>
              </div>
              <span className="mt-2 text-[10px] sm:text-xs font-mono font-bold text-amber-400 uppercase tracking-wider truncate max-w-[85px] sm:max-w-none">
                {t.signalDelay.marsNode}
              </span>
              <span className="hidden sm:block text-[10px] font-mono text-slate-500">
                {t.signalDelay.marsSub}
              </span>
            </div>
          </div>

          {/* Autonomy Insight Note */}
          <div className="mt-6 pt-4 border-t border-slate-900/80 flex items-start gap-3 text-xs text-slate-400">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-200">{t.signalDelay.autonavTitle}:</strong> {t.signalDelay.autonavDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
