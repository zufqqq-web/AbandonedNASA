import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Square, Radio, ExternalLink, ShieldCheck, Volume2, VolumeX, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { SignalAudioScenario, SignalFadeType } from '../types/mission';

interface SignalQuoteItem {
  type: 'telemetry' | 'interpretation' | 'team_message';
  typeLabel: 'Данные аппарата' | 'Интерпретация' | 'Сообщение команды';
  text: string;
  attribution: string;
  context: string;
  sourceUrl: string;
  sourceName: string;
  clarificationNote?: string;
}

interface SignalCase {
  id: string;
  vehicle: string;
  designation: string;
  world: string;
  date: string;
  coordinates: string;
  sol: string;
  natureOfEnd: string;
  telemetryFact: {
    raw: string;
    explanation: string;
    sourceUrl: string;
    sourceName: string;
  };
  quotes: SignalQuoteItem[];
  audioScenario: SignalAudioScenario;
  visualizer: {
    themeColor: string;
    accentBg: string;
    glowHex: string;
    activeTitle: string;
    endStateTitle: string;
    behavior: 'erratic_dropout' | 'drooping_curve' | 'calm_relay' | 'sharp_square_cutoff' | 'steady_plateau';
  };
  sources: Array<{ title: string; url: string }>;
}

const signalCases: SignalCase[] = [
  {
    id: 'opportunity',
    vehicle: 'Opportunity',
    designation: 'MER-B (Mars Exploration Rover)',
    world: 'МАРС // Кратер Индевор, Долина Настойчивости',
    date: '10 июня 2018',
    coordinates: '2.28° S, 354.6° E',
    sol: 'Сол 5111',
    natureOfEnd: 'Потеря выработки энергии в глобальной пылевой буре планетарного масштаба',
    telemetryFact: {
      raw: 'TAUP > 10.8 // SOLAR ARRAY: ~22 Wh/sol // PBIT: NOMINAL // X-BAND CARRIER DROPPED',
      explanation: 'В полдень на Марсе оптическая толщина атмосферы tau превысила 10.8 (непрозрачность более 99%). Суточная генерация солнечных батарей упала с 600 до 22 ватт-часов. По оценке команды инженеров NASA JPL, это привело к необратимому переохлаждению и разряду аккумуляторов.',
      sourceUrl: 'https://science.nasa.gov/mission/mer-opportunity/',
      sourceName: 'NASA Science: MER Opportunity Mission'
    },
    quotes: [
      {
        type: 'interpretation',
        typeLabel: 'Интерпретация',
        text: '«Моя батарея разряжена, и вокруг темнеет (My battery is low and it\'s getting dark)».',
        attribution: 'Джейкоб Марголис (Jacob Margolis), научный журналист радио KPCC / NPR',
        context: 'Февраль 2019, публикация в медиа',
        sourceUrl: 'https://www.npr.org/2019/02/13/694354249/opportunity-rover-falls-silent-on-mars',
        sourceName: 'NPR / KPCC News',
        clarificationNote: 'ВАЖНО: Ровер НИКОГДА не передавал эти слова. Это эмоциональный перевод журналиста, обобщившего сухие данные JPL о падении заряда АКБ и непрозрачности марсианского неба tau > 10.8.'
      },
      {
        type: 'team_message',
        typeLabel: 'Сообщение команды',
        text: '«Мы предприняли все мыслимые инженерные попытки восстановить контакт с Opportunity... Вероятность ответа ничтожно мала. Мы объявляем завершение миссии с чувством глубокой благодарности».',
        attribution: 'Джон Каллас (John Callas), руководитель проекта Opportunity в NASA JPL',
        context: '13 февраля 2019, пресс-конференция в Пасадене',
        sourceUrl: 'https://www.jpl.nasa.gov/news/nasas-record-setting-opportunity-rover-mission-on-mars-comes-to-end',
        sourceName: 'NASA JPL Release 2019-02-13'
      }
    ],
    audioScenario: {
      id: 'oppy_audio',
      carrierFreq: 840,
      duration: 6.8,
      fadeType: 'jerky_noise_burst',
      noiseBaseLevel: 0.003,
      noiseGrowth: 0.045,
      packetInterval: 0.8
    },
    visualizer: {
      themeColor: 'text-amber-500',
      accentBg: 'bg-amber-500',
      glowHex: '#f97316',
      activeTitle: 'ЗАТУХАНИЕ РЫВКАМИ // НАРАСТАНИЕ ШУМА БУРИ',
      endStateTitle: 'СИГНАЛ ПОТЕРЯН // ПОЛНАЯ ТИШИНА',
      behavior: 'erratic_dropout'
    },
    sources: [
      { title: 'NASA Science: MER Opportunity Overview', url: 'https://science.nasa.gov/mission/mer-opportunity/' },
      { title: 'NASA JPL: Opportunity Mission End Release', url: 'https://www.jpl.nasa.gov/news/nasas-record-setting-opportunity-rover-mission-on-mars-comes-to-end' }
    ]
  },
  {
    id: 'spirit',
    vehicle: 'Spirit',
    designation: 'MER-A (Mars Exploration Rover)',
    world: 'МАРС // Кратер Гусев, Песчаная ловушка «Троя»',
    date: '22 марта 2010',
    coordinates: '14.57° S, 175.47° E',
    sol: 'Сол 2210',
    natureOfEnd: 'Отказ обогрева и переохлаждение передатчика в ловушке сульфатных песков',
    telemetryFact: {
      raw: 'SOLAR POWER: ~134 Wh/sol // LOW-POWER SLEEP MODE // CARRIER UNLOCKED (SOL 2210)',
      explanation: 'Застрявший ровер не смог накрениться к северу для встречи низкого зимнего марсианского солнца. По предположению команды миссии JPL, недостаток энергии не позволил питать внутренние нагреватели, что привело к замерзанию аппарата и сбою тактового генератора.',
      sourceUrl: 'https://science.nasa.gov/mission/mer-spirit/',
      sourceName: 'NASA Science: MER Spirit Mission'
    },
    quotes: [
      {
        type: 'telemetry',
        typeLabel: 'Данные аппарата',
        text: '«Сол 2210: статус шины электропитания — переход в режим сна для консервации тепла; прямая связь X-band с Землей прервана (по реконструкции JPL)».',
        attribution: 'Телеметрический отчет миссии Spirit (NASA JPL)',
        context: '22 марта 2010 года, последний контакт с Землей',
        sourceUrl: 'https://science.nasa.gov/mission/mer-spirit/',
        sourceName: 'NASA Planetary Data / Science Mission'
      },
      {
        type: 'interpretation',
        typeLabel: 'Интерпретация',
        text: '«Ровер замерз в ледяной ночи на краю холмов Колумбия».',
        attribution: 'Публицистический пересказ в научно-популярных изданиях',
        context: '2010-2011 годы',
        sourceUrl: 'https://www.jpl.nasa.gov/news/nasa-ends-efforts-to-contact-spirit',
        sourceName: 'NASA JPL News Release',
        clarificationNote: 'По расчетам команды миссии, температура шасси опустилась ниже -55°C, из-за чего батареи потеряли ёмкость, а тактовый генератор сбился.'
      },
      {
        type: 'team_message',
        typeLabel: 'Сообщение команды',
        text: '«Спирит проработал более 6 лет вместо проектных 90 дней. Даже обездвиженный в песках Трои, он продолжал делать открытия до последнего ватта энергии».',
        attribution: 'Джон Каллас, руководитель проекта MER в JPL',
        context: 'Май 2011, официальное завершение попыток вызова',
        sourceUrl: 'https://www.jpl.nasa.gov/news/nasa-ends-efforts-to-contact-spirit',
        sourceName: 'NASA JPL Release 2011-156'
      }
    ],
    audioScenario: {
      id: 'spirit_audio',
      carrierFreq: 760,
      duration: 7.0,
      fadeType: 'smooth_drift_freeze',
      noiseBaseLevel: 0.004,
      noiseGrowth: 0.005,
      packetInterval: 1.8
    },
    visualizer: {
      themeColor: 'text-cyan-400',
      accentBg: 'bg-cyan-500',
      glowHex: '#06b6d4',
      activeTitle: 'ДРЕЙФ ЧАСТОТЫ ВНИЗ // ЗАМЕРЗАНИЕ ГЕНЕРАТОРА',
      endStateTitle: 'ОСТАНОВКА ТАКТОВОГО ГЕНЕРАТОРА // ГИБЕРНАЦИЯ',
      behavior: 'drooping_curve'
    },
    sources: [
      { title: 'NASA Science: MER Spirit Overview', url: 'https://science.nasa.gov/mission/mer-spirit/' },
      { title: 'NASA JPL: Concluding Efforts to Contact Spirit', url: 'https://www.jpl.nasa.gov/news/nasa-ends-efforts-to-contact-spirit' }
    ]
  },
  {
    id: 'insight',
    vehicle: 'InSight',
    designation: 'Interior Exploration using Seismic Investigations',
    world: 'МАРС // Равнина Элизий (Elysium Planitia)',
    date: '15 декабря 2022 (завершение объявлено 21 декабря 2022)',
    coordinates: '4.50° N, 135.62° E',
    sol: 'Сол 1440',
    natureOfEnd: 'Необратимое накопление слоя пыли на солнечных батареях UltraFlex',
    telemetryFact: {
      raw: 'SOLAR BUS: ~285 Wh/sol // IDC CAMERA: SEIS IN DUST // DSN CARRIER SILENT',
      explanation: 'Ветровые вихри не очистили панели станции. Суточная выработка упала с 5000 до ~285 ватт-часов. После передачи финального снимка сейсмометра 15 декабря 2022 года связь прекратилась (по предположению команды миссии, буферная батарея окончательно разрядилась).',
      sourceUrl: 'https://mars.nasa.gov/insight/mission/status/',
      sourceName: 'NASA InSight Mission Updates'
    },
    quotes: [
      {
        type: 'team_message',
        typeLabel: 'Сообщение команды',
        text: '«Мой заряд совсем мал, так что это, возможно, последний снимок, который я могу отправить. Не переживайте за меня: мое время здесь было продуктивным и безмятежным. Если смогу продолжить говорить с моей командой, я сделаю это — но скоро я отключусь. Спасибо, что оставались со мной».',
        attribution: 'Официальный аккаунт миссии @NASAInSight в соцсети Twitter/X',
        context: '19 декабря 2022, публикация команды связей с общественностью NASA',
        sourceUrl: 'https://twitter.com/NASAInSight/status/1604955577651044352',
        sourceName: 'Official NASA InSight Twitter/X Feed'
      },
      {
        type: 'telemetry',
        typeLabel: 'Данные аппарата',
        text: '«По данным телеметрии миссии на Сол 1440, суточная генерация энергии упала примерно до 285 Вт·ч, после чего аппарат не ответил на вызовы сети DSN (по предположению команды миссии, сработала автоматическая защита от глубокого разряда АКБ)».',
        attribution: 'Пресс-релиз NASA HQ 22-132 о завершении миссии InSight',
        context: '21 декабря 2022 года, официальный отчет NASA',
        sourceUrl: 'https://www.nasa.gov/news-release/nasas-insight-mission-ends-after-four-years-of-groundbreaking-science/',
        sourceName: 'NASA Headquarters Release 22-132'
      }
    ],
    audioScenario: {
      id: 'insight_audio',
      carrierFreq: 920,
      duration: 6.2,
      fadeType: 'stable_then_click',
      noiseBaseLevel: 0.002,
      noiseGrowth: 0.002,
      packetInterval: 0.85
    },
    visualizer: {
      themeColor: 'text-amber-400',
      accentBg: 'bg-amber-400',
      glowHex: '#eab308',
      activeTitle: 'СТАБИЛЬНЫЙ СИГНАЛ // РАЗРЯД ПИТАНИЯ // ЩЕЛЧОК РЕЛЕ',
      endStateTitle: 'ОТКЛЮЧЕНИЕ ШИНЫ ПИТАНИЯ // РЕЛЕ РАЗОМКНУТО',
      behavior: 'calm_relay'
    },
    sources: [
      { title: 'NASA: InSight Mission Status', url: 'https://mars.nasa.gov/insight/mission/status/' },
      { title: 'NASA HQ: InSight Mission Ends After 4 Years of Science', url: 'https://www.nasa.gov/news-release/nasas-insight-mission-ends-after-four-years-of-groundbreaking-science/' }
    ]
  },
  {
    id: 'apollo17-alsep',
    vehicle: 'Apollo 17 ALSEP',
    designation: 'Apollo Lunar Surface Experiments Package',
    world: 'ЛУНА // Долина Тавр-Литтров (Taurus-Littrow)',
    date: '30 сентября 1977 года',
    coordinates: '20.19° N, 30.77° E',
    sol: 'Завершение программы: 30 сентября 1977',
    natureOfEnd: 'Принудительное отключение научной программы командой с Земли по бюджетным причинам',
    telemetryFact: {
      raw: 'SNAP-27 RTG: ~68 W // S-BAND 2278.0 MHz: ACTIVE // GROUND COMMAND: SCIENCE OPERATIONS TERMINATED',
      explanation: 'Станция НЕ имела поломок. Плутониевый РИТЭГ вырабатывал устойчивое питание, а сейсмометр фиксировал удары метеоритов. NASA прекратило финансирование наземной сети слежения ALSEP по решению руководства агентства и конгресса ($5 млн/год). Несущий радиосигнал станций фиксировался астрономами до конца 1977 года.',
      sourceUrl: 'https://curator.jsc.nasa.gov/lunar/alsep.cfm',
      sourceName: 'NASA Johnson Space Center ALSEP Termination Report'
    },
    quotes: [
      {
        type: 'team_message',
        typeLabel: 'Сообщение команды',
        text: '«Отключение научных станций ALSEP было продиктовано исключительно бюджетными ограничениями NASA, а не техническими неисправностями оборудования. Они могли надежно передавать геофизические данные еще много лет».',
        attribution: 'Джеймс Бейтс (James Bates), менеджер научной программы ALSEP в NASA JSC',
        context: 'Сентябрь 1977 года, официальное коммюнике NASA',
        sourceUrl: 'https://history.nasa.gov/SP-407/sp407.htm',
        sourceName: 'NASA History Office: Apollo Expeditions to the Moon (SP-407)'
      },
      {
        type: 'telemetry',
        typeLabel: 'Данные аппарата',
        text: '«30 сентября 1977 года: По командам наземных станций сети MSFN научные эксперименты станций ALSEP были переведены в пассивный режим после 8 лет работы».',
        attribution: 'Отчет NASA Johnson Space Center (ALSEP Termination, 1979)',
        context: '30 сентября 1977 года, завершение поддержки сети станций Apollo 12, 14, 15, 16, 17',
        sourceUrl: 'https://curator.jsc.nasa.gov/lunar/alsep.cfm',
        sourceName: 'NASA JSC Lunar Science Information'
      }
    ],
    audioScenario: {
      id: 'apollo_audio',
      carrierFreq: 1040,
      duration: 6.0,
      fadeType: 'instant_cutoff',
      noiseBaseLevel: 0.004,
      noiseGrowth: 0,
      packetInterval: 0.5,
      cutoffTimeRatio: 0.70
    },
    visualizer: {
      themeColor: 'text-emerald-400',
      accentBg: 'bg-emerald-500',
      glowHex: '#22c55e',
      activeTitle: 'ШТАТНЫЙ СИГНАЛ 1970-Х // МГНОВЕННЫЙ ОБРЫВ ПО КОМАНДЕ',
      endStateTitle: 'ОБРЫВ НЕСУЩЕЙ // КОМАНДА ОТКЛЮЧЕНИЯ ИЗ ХЬЮСТОНА',
      behavior: 'sharp_square_cutoff'
    },
    sources: [
      { title: 'NASA JSC: ALSEP Program Final Report', url: 'https://curator.jsc.nasa.gov/lunar/alsep.cfm' },
      { title: 'NASA SP-407: Apollo Expeditions to the Moon', url: 'https://history.nasa.gov/SP-407/sp407.htm' }
    ]
  },
  {
    id: 'ingenuity',
    vehicle: 'Ingenuity',
    designation: 'Mars Helicopter Scout (Ginny)',
    world: 'МАРС // Кратер Езеро, Холмы Валинор',
    date: '18 января 2024 (окончание полетов)',
    coordinates: '18.4446° N, 77.4509° E',
    sol: 'Сол 1038 (Полет 72)',
    natureOfEnd: 'Повреждение конца лопасти винта при жесткой посадке. Аппарат жив и переведен в стационарный метеопост',
    telemetryFact: {
      raw: 'ROTOR ROTATION: HALTED // BLADE TIP SEPARATION DETECTED // AVIONICS & POWER: 100% HEALTHY // ZIGBEE 914 MHz: ACTIVE',
      explanation: 'Винтокрылая машина совершила 72 полета вместо 5 запланированных. Хотя повреждение лопасти больше не позволяет летать, электроника, солнечная батарея и радиоканал полностью исправны. По решению команды миссии JPL вертолет переведен в режим стационарной базы наблюдений.',
      sourceUrl: 'https://www.jpl.nasa.gov/news/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends',
      sourceName: 'NASA JPL News Release 2024'
    },
    quotes: [
      {
        type: 'team_message',
        typeLabel: 'Сообщение команды',
        text: '«Историческое путешествие Ingenuity подошло к концу. Этот выдающийся вертолет взлетел выше и дальше, чем мы могли представить, доказав, что управляемый полет на Марсе возможен. Он больше не может подняться в небо, но его приборы продолжают служить науке».',
        attribution: 'Билл Нельсон (Bill Nelson), администратор NASA',
        context: '25 января 2024, официальный брифинг NASA HQ',
        sourceUrl: 'https://www.nasa.gov/news-release/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/',
        sourceName: 'NASA Headquarters Release 24-009'
      },
      {
        type: 'interpretation',
        typeLabel: 'Интерпретация',
        text: '«Сложил крылья, но остался жив: вертолет превратился в постоянную погодную станцию».',
        attribution: 'Обозреватели космической отрасли и пресс-служба NASA JPL',
        context: 'Январь 2024 года',
        sourceUrl: 'https://www.jpl.nasa.gov/news/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends',
        sourceName: 'NASA JPL Technical Briefing',
        clarificationNote: 'Команда JPL обновила бортовое ПО: аппарат просыпается каждое утро, замеряет температуру грунта и параметры датчиков и сохраняет их в бортовую память.'
      }
    ],
    audioScenario: {
      id: 'ingenuity_audio',
      carrierFreq: 1160,
      duration: 6.5,
      fadeType: 'active_pause_note',
      noiseBaseLevel: 0.001,
      noiseGrowth: 0,
      packetInterval: 0.28,
      pauseNoteFreq: 880
    },
    visualizer: {
      themeColor: 'text-teal-400',
      accentBg: 'bg-teal-400',
      glowHex: '#14b8a6',
      activeTitle: 'БОДРЫЙ СИГНАЛ АВИАЦИИ // НЕТ ЗАТУХАНИЯ',
      endStateTitle: 'КОНТРОЛЬНАЯ ПАУЗА // АППАРАТ ЖИВ (СТАЦИОНАРНЫЙ ПОСТ)',
      behavior: 'steady_plateau'
    },
    sources: [
      { title: 'NASA HQ Release: After Three Years on Mars, Ingenuity Mission Ends', url: 'https://www.nasa.gov/news-release/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/' },
      { title: 'NASA JPL Ingenuity Mars Helicopter Overview', url: 'https://www.jpl.nasa.gov/missions/ingenuity-mars-helicopter' }
    ]
  }
];

export const LastSignalSection: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<SignalCase>(signalCases[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(spaceAudio.getMuted());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const stopRef = useRef<(() => void) | null>(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      spaceAudio.stopCurrentSignal();
    };
  }, []);

  const handleSelectCase = (c: SignalCase) => {
    if (isPlaying) {
      stopPlayback();
    }
    setSelectedCase(c);
    setProgress(0);
    spaceAudio.playTelemetryBeep(1100, 0.03);
  };

  const startPlayback = () => {
    if (isPlaying) {
      stopPlayback();
      return;
    }
    setIsPlaying(true);
    setProgress(0);

    const stopFn = spaceAudio.playSignalScenario(selectedCase.audioScenario, (p) => {
      setProgress(p);
      if (p >= 1) {
        setIsPlaying(false);
        stopRef.current = null;
      }
    });

    stopRef.current = stopFn;
  };

  const stopPlayback = () => {
    if (stopRef.current) {
      stopRef.current();
      stopRef.current = null;
    }
    spaceAudio.stopCurrentSignal();
    setIsPlaying(false);
    setProgress(0);
  };

  const toggleMute = () => {
    const muted = spaceAudio.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      spaceAudio.playTelemetryBeep(1300, 0.04);
    }
  };

  // Spectrum bar calculation function based on scenario behavior
  const computeBarHeight = (barIndex: number, totalBars: number): number => {
    const normIndex = barIndex / (totalBars - 1); // 0 to 1

    if (prefersReducedMotion) {
      // Accessible static representation during reduced motion
      if (!isPlaying) return 14;
      if (selectedCase.audioScenario.fadeType === 'instant_cutoff') {
        const cutoff = selectedCase.audioScenario.cutoffTimeRatio ?? 0.7;
        return progress >= cutoff ? 2 : 24;
      }
      if (selectedCase.audioScenario.fadeType === 'active_pause_note') {
        return 22;
      }
      return Math.max(2, Math.round(26 * (1 - progress)));
    }

    if (!isPlaying) {
      // Standby subtle idle wave
      return Math.max(4, Math.sin(barIndex * 0.35) * 14 + 14);
    }

    switch (selectedCase.visualizer.behavior) {
      case 'erratic_dropout': {
        // Opportunity: jerky drops, erratic stutter, rising noise
        if (progress > 0.85) return 2; // Dead silence in final phase
        const dropoutDip = (progress > 0.22 && progress < 0.3) || (progress > 0.42 && progress < 0.5) || (progress > 0.65 && progress < 0.74);
        const amplitudeMod = dropoutDip ? 0.15 : (1 - progress * 0.75);
        const noiseScatter = (Math.sin(barIndex * 9.3 + progress * 24) * 0.5 + 0.5) * (progress * 18);
        const wave = Math.sin(barIndex * 0.45 + progress * 16) * 22;
        return Math.max(3, Math.min(48, Math.round(wave * amplitudeMod + noiseScatter + 6)));
      }

      case 'drooping_curve': {
        // Spirit: smooth downward frequency curve (drooping slope from left to right)
        if (progress >= 0.98) return 2;
        const droopFactor = 1 - (progress * 0.85);
        const frequencySag = Math.exp(-normIndex * (1 + progress * 3));
        const wave = Math.sin(barIndex * 0.4 + progress * 8) * 18 * droopFactor;
        return Math.max(3, Math.round((wave * frequencySag + 12 * droopFactor)));
      }

      case 'calm_relay': {
        // InSight: stable symmetrical bell curve until sharp short fade, followed by single relay click spike
        const fadeStart = 0.75;
        const clickPoint = 0.90;
        if (progress >= clickPoint + 0.04) return 2; // Silence after click
        if (progress >= clickPoint && progress < clickPoint + 0.04) {
          // Relay transient mechanical spike!
          return barIndex % 3 === 0 ? 46 : 8;
        }
        const amp = progress < fadeStart ? 1 : Math.max(0.1, 1 - (progress - fadeStart) / 0.15);
        const bell = Math.sin(normIndex * Math.PI);
        const wave = Math.sin(barIndex * 0.5 + progress * 10) * 12 + 18;
        return Math.max(3, Math.round(wave * bell * amp + 4));
      }

      case 'sharp_square_cutoff': {
        // Apollo 17 ALSEP: completely flat steady transmission, then instantaneous zero drop
        const cutoff = selectedCase.audioScenario.cutoffTimeRatio ?? 0.7;
        if (progress >= cutoff) return 2; // Flat line!
        // Precise analog rectangular telemetry comb
        const analogComb = (barIndex % 4 === 0) ? 38 : (barIndex % 2 === 0 ? 28 : 18);
        const analogJitter = Math.sin(barIndex * 0.8 + progress * 14) * 3;
        return Math.max(4, Math.round(analogComb + analogJitter));
      }

      case 'steady_plateau': {
        // Ingenuity: active energetic chirps that lock into a solid dual-peak harmonic pause plateau (alive)
        const transition = 0.65;
        if (progress < transition) {
          // Fast lively aviation chirps
          const chirp = Math.sin(barIndex * 0.8 + progress * 28) * 20 + 20;
          return Math.max(4, Math.round(chirp));
        } else {
          // Harmonious dual harmonic standing peaks (representing 880Hz + 1320Hz active tone)
          const peak1 = Math.exp(-Math.pow((normIndex - 0.35) * 6, 2)) * 34;
          const peak2 = Math.exp(-Math.pow((normIndex - 0.70) * 6, 2)) * 32;
          const baseline = 10;
          return Math.max(4, Math.round(peak1 + peak2 + baseline));
        }
      }

      default:
        return 12;
    }
  };

  return (
    <section id="last-signal" className="relative py-24 bg-black border-t border-red-950/40 overflow-hidden">
      {/* Background Subtle Radar Grid */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse text-red-500" />
            <span>АРХИВ ТЕЛЕМЕТРИИ // ПОСЛЕДНИЙ КОНТАКТ</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight">
            ПОСЛЕДНИЙ СИГНАЛ
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Конец миссии у каждого аппарата был уникальным. Слушайте точные акустические сценарии затухания и изучайте подлинные факты без журналистских мифов.
          </p>
        </div>

        {/* Global Sound and Accessibility Ribbon */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-xs font-mono border-b border-slate-900 pb-4">
          <div className="text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>ВЫБЕРИТЕ АППАРАТ ДЛЯ ВОСПРОИЗВЕДЕНИЯ СЦЕНАРИЯ</span>
          </div>

          <div className="flex items-center gap-3">
            {prefersReducedMotion && (
              <span className="text-[11px] text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded">
                Уменьшенное движение включено
              </span>
            )}

            <button
              onClick={toggleMute}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 transition-colors"
              title={isMuted ? 'Включить звук' : 'Отключить звук'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isMuted ? 'Звук выключен' : 'Звук включен'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Apparatus Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
          {signalCases.map((item) => {
            const isSelected = selectedCase.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectCase(item)}
                className={`p-3 rounded-lg border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900/90 border-slate-600 shadow-xl'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                {isSelected && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: item.visualizer.glowHex }}
                  />
                )}
                <div className="text-[10px] font-mono uppercase text-slate-400 truncate">
                  {item.world.split('//')[0]}
                </div>
                <div className="text-sm font-display font-bold text-white uppercase truncate mt-0.5">
                  {item.vehicle}
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-1 truncate">
                  {item.date}
                </div>
              </button>
            );
          })}
        </div>

        {/* The Audio Visualizer Stage */}
        <div className="rounded-2xl border border-slate-800 bg-[#04060a] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Top Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900 pb-4 mb-6">
            <div className="flex items-center gap-3 text-xs font-mono">
              <div
                className={`w-3 h-3 rounded-full transition-colors ${
                  isPlaying
                    ? 'animate-ping'
                    : 'animate-pulse'
                }`}
                style={{ backgroundColor: selectedCase.visualizer.glowHex }}
              />
              <span className="text-slate-300 font-semibold uppercase tracking-wider">
                {selectedCase.vehicle} // {selectedCase.designation}
              </span>
            </div>

            <div className="text-xs font-mono text-slate-400">
              {selectedCase.world} · <span className="text-slate-300 font-mono-tabular">{selectedCase.sol}</span>
            </div>
          </div>

          {/* Dynamic Spectrum Waveform */}
          <div className="my-8">
            <div className="text-center mb-2">
              <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400">
                {isPlaying && progress > 0.85
                  ? selectedCase.visualizer.endStateTitle
                  : isPlaying
                  ? `${selectedCase.visualizer.activeTitle} (${Math.round((1 - progress) * 100)}%)`
                  : 'СПЕКТР НЕСУЩЕЙ ЧАСТОТЫ // НАЖМИТЕ «ВОСПРОИЗВЕСТИ СИГНАЛ»'}
              </span>
            </div>

            {/* Visualizer Bars Container */}
            <div className="h-24 flex items-center justify-center gap-1.5 max-w-xl mx-auto px-4 py-2 bg-slate-950/60 rounded-xl border border-slate-900">
              {Array.from({ length: 36 }).map((_, idx) => {
                const height = computeBarHeight(idx, 36);
                return (
                  <div
                    key={idx}
                    className="w-2 rounded-full transition-all duration-75"
                    style={{
                      height: `${height}px`,
                      backgroundColor: isPlaying
                        ? selectedCase.visualizer.glowHex
                        : '#334155',
                      opacity: isPlaying ? 0.95 : 0.4
                    }}
                  />
                );
              })}
            </div>

            {/* Telemetry coordinate line */}
            <div className="text-center mt-3 text-xs font-mono text-slate-400">
              КООРДИНАТЫ СТОЯНКИ: <span className="text-slate-300 font-mono-tabular">{selectedCase.coordinates}</span>
            </div>
          </div>

          {/* Play / Stop Control Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2 border-y border-slate-900 my-6">
            <button
              onClick={startPlayback}
              className={`px-7 py-3 rounded-md font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2.5 shadow-lg ${
                isPlaying
                  ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-950/50'
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-red-950/50'
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-4 h-4 fill-white" />
                  <span>ОСТАНОВИТЬ СИМУЛЯЦИЮ</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>ВОСПРОИЗВЕСТИ СИГНАЛ ({selectedCase.audioScenario.duration}s)</span>
                </>
              )}
            </button>

            <div className="text-xs font-mono text-slate-400 text-center sm:text-left">
              Профиль затухания: <span className="text-slate-300">{selectedCase.natureOfEnd}</span>
            </div>
          </div>

          {/* Fact vs Interpretation Cards (TASK 2: Honest Quotes & Verification) */}
          <div className="mt-8 space-y-6">
            {/* Raw Telemetry Fact */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 rounded flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Данные аппарата (Реальная телеметрия)
                </span>
                <a
                  href={selectedCase.telemetryFact.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-slate-400 hover:text-slate-200 inline-flex items-center gap-1 transition-colors"
                >
                  <span>{selectedCase.telemetryFact.sourceName}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="font-mono text-xs sm:text-sm text-slate-200 bg-black/50 p-2.5 rounded border border-slate-900 mb-2">
                {selectedCase.telemetryFact.raw}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {selectedCase.telemetryFact.explanation}
              </p>
            </div>

            {/* Categorized Quotes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCase.quotes.map((q, qIdx) => {
                const isInterpretation = q.type === 'interpretation';
                return (
                  <div
                    key={qIdx}
                    className={`p-4 rounded-xl border flex flex-col justify-between ${
                      isInterpretation
                        ? 'bg-amber-950/20 border-amber-900/40'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${
                            isInterpretation
                              ? 'text-amber-400 bg-amber-950/60 border-amber-700/50'
                              : 'text-blue-400 bg-blue-950/60 border-blue-700/50'
                          }`}
                        >
                          {q.typeLabel}
                        </span>

                        <span className="text-[10px] font-mono text-slate-400">
                          {q.context}
                        </span>
                      </div>

                      <blockquote className="text-sm font-serif italic text-slate-100 leading-snug my-2">
                        {q.text}
                      </blockquote>

                      <div className="text-xs font-mono text-slate-300 mt-2">
                        — {q.attribution}
                      </div>

                      {q.clarificationNote && (
                        <div className="mt-3 p-2 bg-amber-950/40 border border-amber-800/40 rounded text-[11px] font-mono text-amber-200/90 leading-relaxed">
                          {q.clarificationNote}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Источник:</span>
                      <a
                        href={q.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white inline-flex items-center gap-1 transition-colors"
                      >
                        <span className="truncate max-w-[200px]">{q.sourceName}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Official Source Reference Links (TASK 3) */}
            <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl text-xs font-mono text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                ОФИЦИАЛЬНЫЕ ПЕРВОИСТОЧНИКИ NASA / JPL:
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {selectedCase.sources.map((src, sIdx) => (
                  <a
                    key={sIdx}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white underline decoration-slate-600 hover:decoration-white inline-flex items-center gap-1"
                  >
                    <span>{src.title}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
