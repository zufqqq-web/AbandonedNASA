export type Destination = 'Moon' | 'Mars';

export type VehicleType = 
  | 'Ровер' 
  | 'Посадочный модуль' 
  | 'Лунный автомобиль' 
  | 'Атмосферный вертолет' 
  | 'Сейсмическая станция';

export type MissionStatusType = 'silent' | 'complete' | 'active';

export interface Milestone {
  date: string;
  title: string;
  description: string;
}

export interface Specification {
  label: string;
  value: string;
}

export type QuoteType = 'telemetry' | 'interpretation' | 'team_message';

export interface MissionQuote {
  text: string;
  speaker: string;
  context: string;
  type?: QuoteType;
  typeLabel?: 'Данные аппарата' | 'Интерпретация' | 'Сообщение команды';
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
  name: string;
  englishName: string;
  designation: string;
  destination: Destination;
  type: VehicleType;
  launchDate: string;
  landingDate: string;
  lastContactDate?: string;
  activeSpan: string;
  status: string;
  statusType: MissionStatusType;
  coordinates: {
    lat: string;
    lon: string;
    latNum?: number;
    lonNum?: number;
    formatted: string;
  };
  nasaSearchQuery?: string;
  locationName: string;
  missionDuration: string;
  distanceTraveled?: string;
  image: string;
  schematicType: 'rover' | 'lander' | 'rover-buggy' | 'helicopter' | 'station';
  shortDescription: string;
  howGotThere: string;
  whatDidItDo: string;
  lastContactStory: string;
  whereIsItNow: string;
  source?: string;
  quote?: MissionQuote;
  specs: Specification[];
  milestones: Milestone[];
  signalData?: {
    sol?: number;
    frequency?: string;
    lastTelemetry?: string;
    fadeReason: string;
    quoteRu: string;
    quoteEn?: string;
    sourceUrl?: string;
  };
}

export interface WorldInfo {
  id: Destination;
  name: string;
  englishName: string;
  tagline: string;
  description: string;
  stats: {
    objectsCount: number;
    missionsCount: string;
    timeSpan: string;
    distanceFromEarth: string;
    environment: string;
    surfaceTemp: string;
  };
}
