import { LocalizedText } from '../i18n/types';

export type Destination = 'Moon' | 'Mars';

export type VehicleType = 
  | 'Ровер' 
  | 'Посадочный модуль' 
  | 'Лунный автомобиль' 
  | 'Атмосферный вертолет' 
  | 'Сейсмическая станция'
  | LocalizedText;

export type MissionStatusType = 'silent' | 'complete' | 'active';

export interface Milestone {
  date: string;
  title: string | LocalizedText;
  description: string | LocalizedText;
}

export interface Specification {
  label: string | LocalizedText;
  value: string | LocalizedText;
}

export type QuoteType = 'telemetry' | 'interpretation' | 'team_message';

export interface MissionQuote {
  text: string | LocalizedText;
  speaker: string | LocalizedText;
  context: string | LocalizedText;
  type?: QuoteType;
  typeLabel?: string | LocalizedText;
  sourceUrl?: string;
}

export type SignalFadeType =
  | 'jerky_noise_burst'   // Opportunity: прерывистый сигнал, растущий шум бури, падение мощности рывками
  | 'smooth_drift_freeze' // Spirit: медленный дрейф частоты вниз от замерзания, редкие слабые пакеты
  | 'stable_then_click'   // InSight: чистый ровный тон, разреженные пакеты, плавное затухание и щелчок реле
  | 'instant_cutoff'      // Apollo 17 ALSEP: стабильный ровный сигнал без затухания, мгновенный обрыв по команде
  | 'active_pause_note';  // Ingenuity: бодрый устойчивый сигнал, в конце контрольная нота-пауза (аппарат жив)

export interface SignalAudioScenario {
  id: string;
  carrierFreq: number;
  duration: number;
  fadeType: SignalFadeType;
  noiseBaseLevel: number;
  noiseGrowth: number;
  packetInterval: number;
  cutoffTimeRatio?: number;
  pauseNoteFreq?: number;
}

export interface Mission {
  id: string;
  name: string | LocalizedText;
  englishName: string;
  designation: string;
  destination: Destination;
  type: VehicleType;
  launchDate: string;
  landingDate: string;
  lastContactDate?: string;
  activeSpan: string;
  status: string | LocalizedText;
  statusType: MissionStatusType;
  coordinates: {
    lat: string;
    lon: string;
    latNum?: number;
    lonNum?: number;
    formatted: string;
  };
  nasaSearchQuery?: string;
  orbitalSearchQuery?: string;
  locationName: string | LocalizedText;
  missionDuration: string | LocalizedText;
  distanceTraveled?: string | LocalizedText;
  image: string;
  schematicType: 'rover' | 'lander' | 'rover-buggy' | 'helicopter' | 'station';
  shortDescription: string | LocalizedText;
  howGotThere: string | LocalizedText;
  whatDidItDo: string | LocalizedText;
  lastContactStory: string | LocalizedText;
  whereIsItNow: string | LocalizedText;
  source?: string;
  quote?: MissionQuote;
  specs: Specification[];
  milestones: Milestone[];
  signalData?: {
    sol?: number;
    frequency?: string;
    lastTelemetry?: string;
    fadeReason: string | LocalizedText;
    quoteRu: string;
    quoteEn?: string;
    quoteUz?: string;
    sourceUrl?: string;
  };
}

export interface WorldInfo {
  id: Destination;
  name: string | LocalizedText;
  englishName: string;
  tagline: string | LocalizedText;
  description: string | LocalizedText;
  stats: {
    objectsCount: number;
    missionsCount: string | LocalizedText;
    timeSpan: string;
    distanceFromEarth: string | LocalizedText;
    environment: string | LocalizedText;
    surfaceTemp: string | LocalizedText;
  };
}
