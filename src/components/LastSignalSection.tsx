import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, ExternalLink, Volume2, VolumeX, CheckCircle2 } from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { SignalAudioScenario } from '../types/mission';
import { LocalizedText } from '../i18n/types';
import { useT } from '../i18n/LanguageContext';

interface SignalQuoteItem {
  type: 'telemetry' | 'interpretation' | 'team_message';
  typeLabel: LocalizedText;
  text: LocalizedText;
  attribution: LocalizedText;
  context: LocalizedText;
  sourceUrl: string;
  sourceName: string;
  clarificationNote?: LocalizedText;
}

interface SignalCase {
  id: string;
  vehicle: string;
  designation: string;
  world: LocalizedText;
  date: string;
  coordinates: string;
  sol: string;
  natureOfEnd: LocalizedText;
  telemetryFact: {
    raw: string;
    explanation: LocalizedText;
    sourceUrl: string;
    sourceName: string;
  };
  quotes: SignalQuoteItem[];
  audioScenario: SignalAudioScenario;
  visualizer: {
    themeColor: string;
    accentBg: string;
    glowHex: string;
    activeTitle: LocalizedText;
    endStateTitle: LocalizedText;
    behavior: 'erratic_dropout' | 'drooping_curve' | 'calm_relay' | 'sharp_square_cutoff' | 'steady_plateau';
  };
  sources: Array<{ title: string; url: string }>;
}

const signalCases: SignalCase[] = [
  {
    id: 'opportunity',
    vehicle: 'Opportunity',
    designation: 'MER-B (Mars Exploration Rover)',
    world: {
      ru: 'МАРС // Кратер Индевор, Долина Настойчивости',
      en: 'MARS // Endeavour Crater, Perseverance Valley',
      uz: 'MARS // Endeavour krateri, Sabr vodiysi',
    },
    date: '10 июня 2018',
    coordinates: '2.28° S, 354.6° E',
    sol: 'Сол 5111',
    natureOfEnd: {
      ru: 'Потеря выработки энергии в глобальной пылевой буре планетарного масштаба',
      en: 'Loss of solar generation in a planetary-scale dust storm',
      uz: 'Global sayyoraviy chang bo‘ronida quyosh quvvatining to‘liq yo‘qotilishi',
    },
    telemetryFact: {
      raw: 'TAUP > 10.8 // SOLAR ARRAY: ~22 Wh/sol // PBIT: NOMINAL // X-BAND CARRIER DROPPED',
      explanation: {
        ru: 'В полдень на Марсе оптическая толщина атмосферы tau превысила 10.8 (непрозрачность более 99%). Суточная генерация солнечных батарей упала с 600 до 22 ватт-часов. По оценке команды инженеров NASA JPL, это привело к необратимому переохлаждению и разряду аккумуляторов.',
        en: 'At local Martian noon, atmospheric optical depth tau exceeded 10.8 (>99% opacity). Daily solar generation plunged from 600 to 22 Wh. According to NASA JPL engineers, this caused irrecoverable freezing and battery discharge.',
        uz: 'Mars peshinida atmosferaning optik qalinligi tau 10.8 dan oshdi (xiralik 99% dan ortiq). Quyosh batareyalarining kunlik quvvati 600 dan 22 Vt·soatgacha tushib ketdi. NASA JPL muhandislari xulosasiga ko‘ra, bu akkumulyatorlarning sovuqdan muzlashi va tugashiga olib keldi.',
      },
      sourceUrl: 'https://science.nasa.gov/mission/mer-opportunity/',
      sourceName: 'NASA Science: MER Opportunity Mission'
    },
    quotes: [
      {
        type: 'interpretation',
        typeLabel: {
          ru: 'Интерпретация',
          en: 'Interpretation',
          uz: 'Talqin',
        },
        text: {
          ru: '«Моя батарея разряжена, и вокруг темнеет (My battery is low and it\'s getting dark)».',
          en: '“My battery is low and it’s getting dark.”',
          uz: '«Batareyam quvvatsizlandi va atrof qorong‘ilashmoqda (My battery is low and it’s getting dark)».',
        },
        attribution: {
          ru: 'Джейкоб Марголис (Jacob Margolis), научный журналист радио KPCC / NPR',
          en: 'Jacob Margolis, KPCC / NPR science reporter',
          uz: 'Jeykob Margolis, KPCC / NPR ilmiy jurnalisti',
        },
        context: {
          ru: 'Февраль 2019, публикация в медиа',
          en: 'February 2019 media report',
          uz: '2019-yil fevral, ommaviy axborot vositalaridagi maqola',
        },
        sourceUrl: 'https://www.npr.org/2019/02/13/694354249/opportunity-rover-falls-silent-on-mars',
        sourceName: 'NPR / KPCC News',
        clarificationNote: {
          ru: 'ВАЖНО: Ровер НИКОГДА не передавал эти слова. Это эмоциональный перевод журналиста, обобщившего сухие данные JPL о падении заряда АКБ и непрозрачности марсианского неба tau > 10.8.',
          en: 'NOTE: The rover NEVER transmitted these words. It was an evocative interpretation by a journalist summarizing raw JPL telemetry on dying batteries and sky opacity tau > 10.8.',
          uz: 'MUHIM: Rover HECH QACHON bu so‘zlarni uzatmagan. Bu JPL telemetriyasidagi akkumulyator zaryadi va tau > 10.8 qorong‘iligini xulosa qilgan jurnalistning his-tuyg‘uli talqinidir.',
        }
      },
      {
        type: 'team_message',
        typeLabel: {
          ru: 'Сообщение команды',
          en: 'Team Message',
          uz: 'Jamoa xabari',
        },
        text: {
          ru: '«Мы предприняли все мыслимые инженерные попытки восстановить контакт с Opportunity... Вероятность ответа ничтожно мала. Мы объявляем завершение миссии с чувством глубокой благодарности».',
          en: '“We have made every reasonable engineering effort to try to restore contact with Opportunity... The likelihood of receiving a signal is far too low. We declare mission completion with deep gratitude.”',
          uz: '«Biz Opportunity bilan aloqani tiklash uchun barcha muhandislik choralarini ko‘rdik... Javob signali olish ehtimoli nihoyatda past. Biz cheksiz minnatdorlik tuyg‘usi bilan missiya yakunlanganini e’lon qilamiz».',
        },
        attribution: {
          ru: 'Джон Каллас (John Callas), руководитель проекта Opportunity в NASA JPL',
          en: 'John Callas, Opportunity Project Manager at NASA JPL',
          uz: 'Jon Kallas, NASA JPL’dagi Opportunity loyihasi rahbari',
        },
        context: {
          ru: '13 февраля 2019, пресс-конференция в Пасадене',
          en: 'February 13, 2019 Pasadena press briefing',
          uz: '2019-yil 13-fevral, Pasadenadagi matbuot anjumani',
        },
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
      activeTitle: {
        ru: 'ЗАТУХАНИЕ РЫВКАМИ // НАРАСТАНИЕ ШУМА БУРИ',
        en: 'INTERMITTENT FADE // RISING STORM NOISE',
        uz: 'UZUQ-YULIQ SO‘NISH // BO‘RON SHOVQINI OSHISHI',
      },
      endStateTitle: {
        ru: 'СИГНАЛ ПОТЕРЯН // ПОЛНАЯ ТИШИНА',
        en: 'CARRIER LOST // DEAD SILENCE',
        uz: 'SIGNAL YO‘QOTILDI // TO‘LIQ SUKUNAT',
      },
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
    world: {
      ru: 'МАРС // Кратер Гусев, Песчаная ловушка «Троя»',
      en: 'MARS // Gusev Crater, "Troy" Sulfate Sand Trap',
      uz: 'MARS // Gusev krateri, «Troya» sulfat qum tuzog‘i',
    },
    date: '22 марта 2010',
    coordinates: '14.57° S, 175.47° E',
    sol: 'Сол 2210',
    natureOfEnd: {
      ru: 'Отказ обогрева и переохлаждение передатчика в ловушке сульфатных песков',
      en: 'Loss of survival heating and freezing of transmitter in sulfate sand trap',
      uz: 'Sulfat qum tuzog‘ida isitish tizimining to‘xtashi va uzatgichning muzlashi',
    },
    telemetryFact: {
      raw: 'SOLAR POWER: ~134 Wh/sol // LOW-POWER SLEEP MODE // CARRIER UNLOCKED (SOL 2210)',
      explanation: {
        ru: 'Застрявший ровер не смог накрениться к северу для встречи низкого зимнего марсианского солнца. По предположению команды миссии JPL, недостаток энергии не позволил питать внутренние нагреватели, что привело к замерзанию аппарата и сбою тактового генератора.',
        en: 'Immobilized rover was unable to tilt northward to catch the low Martian winter sun. JPL engineers determined that insufficient power shut down survival heaters, freezing internal electronics.',
        uz: 'Qumga botgan rover past qishki Mars quyoshiga qarab shimolga og‘a olmadi. JPL jamoasi xulosasiga ko‘ra, quvvat yetishmasligi sabab isitkichlar o‘chib, bort elektronikasining muzlashiga olib keldi.',
      },
      sourceUrl: 'https://science.nasa.gov/mission/mer-spirit/',
      sourceName: 'NASA Science: MER Spirit Mission'
    },
    quotes: [
      {
        type: 'telemetry',
        typeLabel: {
          ru: 'Данные аппарата',
          en: 'Flight Telemetry',
          uz: 'Apparat telemetriyasi',
        },
        text: {
          ru: '«Сол 2210: статус шины электропитания — переход в режим сна для консервации тепла; прямая связь X-band с Землей прервана (по реконструкции JPL)».',
          en: '“Sol 2210: power bus status — transitioning to deep sleep for thermal conservation; direct X-band link with Earth severed (JPL reconstruction).”',
          uz: '«Sol 2210: elektr ta’minoti shinasining holati — issiqlikni saqlash uchun chuqur uyqu rejimiga o‘tish; Yer bilan to‘g‘ridan-to‘g‘ri X-band aloqasi uzildi (JPL tahlili)».',
        },
        attribution: {
          ru: 'Телеметрический отчет миссии Spirit (NASA JPL)',
          en: 'NASA JPL Spirit Flight Telemetry Report',
          uz: 'Spirit missiyasining NASA JPL telemetriya hisoboti',
        },
        context: {
          ru: '22 марта 2010 года, последний контакт с Землей',
          en: 'March 22, 2010 final transmission',
          uz: '2010-yil 22-mart, Yer bilan so‘nggi aloqa',
        },
        sourceUrl: 'https://science.nasa.gov/mission/mer-spirit/',
        sourceName: 'NASA Planetary Data / Science Mission'
      },
      {
        type: 'interpretation',
        typeLabel: {
          ru: 'Интерпретация',
          en: 'Interpretation',
          uz: 'Talqin',
        },
        text: {
          ru: '«Ровер замерз в ледяной ночи на краю холмов Колумбия».',
          en: '“The rover froze in the glacial night on the slopes of Columbia Hills.”',
          uz: '«Rover Kolumbiya tepaliklari yonbag‘rida qahraton tunida muzlab qoldi».',
        },
        attribution: {
          ru: 'Публицистический пересказ в научно-популярных изданиях',
          en: 'Popular science press retellings',
          uz: 'Ilmiy-ommabop nashrlardagi talqin',
        },
        context: {
          ru: '2010-2011 годы',
          en: '2010–2011 media',
          uz: '2010–2011 yillar',
        },
        sourceUrl: 'https://www.jpl.nasa.gov/news/nasa-ends-efforts-to-contact-spirit',
        sourceName: 'NASA JPL News Release',
        clarificationNote: {
          ru: 'По расчетам команды миссии, температура шасси опустилась ниже -55°C, из-за чего батареи потеряли ёмкость, а тактовый генератор сбился.',
          en: 'Per mission calculations, chassis temperature fell below -55°C, causing battery failure and clock oscillator drift.',
          uz: 'Missiya jamoasi hisobiga ko‘ra, shassi harorati -55°C dan pastga tushib, batareyalar quvvati tugagan va takt generatori ishdan chiqqan.',
        }
      },
      {
        type: 'team_message',
        typeLabel: {
          ru: 'Сообщение команды',
          en: 'Team Message',
          uz: 'Jamoa xabari',
        },
        text: {
          ru: '«Спирит проработал более 6 лет вместо проектных 90 дней. Даже обездвиженный в песках Трои, он продолжал делать открытия до последнего ватта энергии».',
          en: '“Spirit worked for over six years instead of the planned 90 days. Even trapped in Troy sands, it continued making discoveries down to its last watt.”',
          uz: '«Spirit rejalashtirilgan 90 kun o‘rniga 6 yildan ortiq ishladi. Hatto Troya qumlarida harakatsiz qolganida ham, u so‘nggi vatt quvvatigacha yangi kashfiyotlar qilishni davom ettirdi».',
        },
        attribution: {
          ru: 'Джон Каллас, руководитель проекта MER в JPL',
          en: 'John Callas, MER Project Manager at JPL',
          uz: 'Jon Kallas, JPL MER loyihasi rahbari',
        },
        context: {
          ru: 'Май 2011, официальное завершение попыток вызова',
          en: 'May 2011 formal conclusion of recovery attempts',
          uz: '2011-yil may, chaqiruv urinishlarining rasmiy yakunlanishi',
        },
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
      activeTitle: {
        ru: 'ДРЕЙФ ЧАСТОТЫ ВНИЗ // ЗАМЕРЗАНИЕ ГЕНЕРАТОРА',
        en: 'FREQUENCY DOWNWARD DRIFT // GENERATOR FREEZE',
        uz: 'CHASTOTANING PASTGA SILJISHI // GENERATOR MUZLASHI',
      },
      endStateTitle: {
        ru: 'ОСТАНОВКА ТАКТОВОГО ГЕНЕРАТОРА // ГИБЕРНАЦИЯ',
        en: 'CLOCK OSCILLATOR HALT // HIBERNATION',
        uz: 'TAKT GENERATORI TO‘XTASHI // GIBERNATSIYA',
      },
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
    world: {
      ru: 'МАРС // Равнина Элизий (Elysium Planitia)',
      en: 'MARS // Elysium Planitia',
      uz: 'MARS // Eliziy tekisligi (Elysium Planitia)',
    },
    date: '15 декабря 2022',
    coordinates: '4.50° N, 135.62° E',
    sol: 'Сол 1440',
    natureOfEnd: {
      ru: 'Необратимое накопление слоя пыли на солнечных батареях UltraFlex',
      en: 'Irreversible dust accumulation on UltraFlex solar arrays',
      uz: 'UltraFlex quyosh panellarida chang qatlamining qaytarib bo‘lmas to‘planishi',
    },
    telemetryFact: {
      raw: 'SOLAR BUS: ~285 Wh/sol // IDC CAMERA: SEIS IN DUST // DSN CARRIER SILENT',
      explanation: {
        ru: 'Ветровые вихри не очистили панели станции. Суточная выработка упала с 5000 до ~285 ватт-часов. После передачи финального снимка сейсмометра 15 декабря 2022 года связь прекратилась (по предположению команды миссии, буферная батарея окончательно разрядилась).',
        en: 'Dust devils failed to clean the arrays. Daily solar generation plummeted from 5,000 to ~285 Wh. Following transmission of its final seismometer image on Dec 15, 2022, contact ceased due to battery depletion.',
        uz: 'Mars quyunlari panellarni tozalamadi. Kunlik quvvat 5000 dan ~285 Vt·soatgacha tushib ketdi. 2022-yil 15-dekabrda so‘nggi seysmometr surati uzatilgach, akkumulyator tugab aloqa butkul to‘xtadi.',
      },
      sourceUrl: 'https://mars.nasa.gov/insight/mission/status/',
      sourceName: 'NASA InSight Mission Updates'
    },
    quotes: [
      {
        type: 'team_message',
        typeLabel: {
          ru: 'Сообщение команды',
          en: 'Team Message',
          uz: 'Jamoa xabari',
        },
        text: {
          ru: '«Мой заряд совсем мал, так что это, возможно, последний снимок, который я могу отправить. Не переживайте за меня: мое время здесь было продуктивным и безмятежным. Если смогу продолжить говорить с моей командой, я сделаю это — но скоро я отключусь. Спасибо, что оставались со мной».',
          en: '“My power’s really low, so this may be the last image I can send. Don’t worry about me: my time here has been productive and serene. If I can keep talking to my team, I will — but I’ll be signing off here soon. Thanks for staying with me.”',
          uz: '«Quyosh quvvatim deyarli tugadi, bu men yubora oladigan oxirgi surat bo‘lishi mumkin. Men haqimda qayg‘urmang: bu yerdagi vaqtim sermahsul va sokin o‘tdi. Agar jamoam bilan gaplashishda davom eta olsam, shunday qilaman — lekin tez orada o‘chaman. Men bilan bo‘lganingiz uchun rahmat».',
        },
        attribution: {
          ru: 'Официальный аккаунт миссии @NASAInSight в соцсети Twitter/X',
          en: 'Official @NASAInSight Mission Account on Twitter/X',
          uz: '@NASAInSight missiyasining Twitter/X rasmiy sahifasi',
        },
        context: {
          ru: '19 декабря 2022, публикация команды связей с общественностью NASA',
          en: 'Dec 19, 2022 NASA outreach release',
          uz: '2022-yil 19-dekabr, NASA jamoatchilik xizmati posti',
        },
        sourceUrl: 'https://twitter.com/NASAInSight/status/1604955577651044352',
        sourceName: 'Official NASA InSight Twitter/X Feed'
      },
      {
        type: 'telemetry',
        typeLabel: {
          ru: 'Данные аппарата',
          en: 'Flight Telemetry',
          uz: 'Apparat telemetriyasi',
        },
        text: {
          ru: '«По данным телеметрии миссии на Сол 1440, суточная генерация энергии упала примерно до 285 Вт·ч, после чего аппарат не ответил на вызовы сети DSN (по предположению команды миссии, сработала автоматическая защита от глубокого разряда АКБ)».',
          en: '“Per Sol 1440 telemetry, daily energy output dropped to ~285 Wh, following which the lander did not respond to DSN link passes (likely triggering battery deep-discharge protection).”',
          uz: '«Sol 1440 telemetriyasiga ko‘ra, kunlik energiya ~285 Vt·soatgacha tushib ketdi, shundan so‘ng apparat DSN tarmoq chaqiruvlariga javob bermadi (avtomatik chuqur zaryadsizlanish himoyasi ishga tushgan deb taxmin qilinadi)».',
        },
        attribution: {
          ru: 'Пресс-релиз NASA HQ 22-132 о завершении миссии InSight',
          en: 'NASA Headquarters Release 22-132 on InSight Conclusion',
          uz: 'InSight missiyasi yakuniga bag‘ishlangan NASA HQ 22-132 press-relizi',
        },
        context: {
          ru: '21 декабря 2022 года, официальный отчет NASA',
          en: 'Dec 21, 2022 official report',
          uz: '2022-yil 21-dekabr, NASA rasmiy hisoboti',
        },
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
      activeTitle: {
        ru: 'СТАБИЛЬНЫЙ СИГНАЛ // РАЗРЯД ПИТАНИЯ // ЩЕЛЧОК РЕЛЕ',
        en: 'STABLE CARRIER // POWER DRAIN // RELAY CLICK',
        uz: 'BARQAROR SIGNAL // QUVVAT TUGASHI // RELE CHIQILLASHI',
      },
      endStateTitle: {
        ru: 'ОТКЛЮЧЕНИЕ ШИНЫ ПИТАНИЯ // РЕЛЕ РАЗОМКНУТО',
        en: 'POWER BUS CUTOFF // RELAY OPEN',
        uz: 'QUVVAT SHINASI O‘CHISHI // RELE AJRALISHI',
      },
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
    world: {
      ru: 'ЛУНА // Долина Тавр-Литтров (Taurus-Littrow)',
      en: 'MOON // Taurus-Littrow Valley',
      uz: 'OY // Tavr-Littrov vodiysi (Taurus-Littrow)',
    },
    date: '30 сентября 1977 года',
    coordinates: '20.19° N, 30.77° E',
    sol: '30.09.1977',
    natureOfEnd: {
      ru: 'Принудительное отключение научной программы командой с Земли по бюджетным причинам',
      en: 'Deliberate command shutdown by Earth ground control due to budget constraints',
      uz: 'Byudjet qisqarishi sababli Yerdan berilgan buyruq bilan majburiy o‘chirilishi',
    },
    telemetryFact: {
      raw: 'SNAP-27 RTG: ~68 W // S-BAND 2278.0 MHz: ACTIVE // GROUND COMMAND: SCIENCE OPERATIONS TERMINATED',
      explanation: {
        ru: 'Станция НЕ имела поломок. Плутониевый РИТЭГ вырабатывал устойчивое питание, а сейсмометр фиксировал удары метеоритов. NASA прекратило финансирование наземной сети слежения ALSEP по решению руководства агентства и конгресса ($5 млн/год). Несущий радиосигнал станций фиксировался астрономами до конца 1977 года.',
        en: 'The station suffered NO technical faults. The SNAP-27 plutonium RTG supplied steady power, and seismometers recorded lunar quakes. NASA terminated funding for the ALSEP ground tracking network under congressional budget constraints ($5M/yr).',
        uz: 'Stansiyada HECH QANDAY nosozlik bo‘lmagan. Plutoniy RTG generatori barqaror quvvat bergan, seysmometr esa Oydagi zarbalarni qayd etgan. NASA Kongress byudjeti qisqarishi tufayli ALSEP kuzatuv tarmog‘ini moliyalashtirishni to‘xtatdi (yiliga 5 mln dollar).',
      },
      sourceUrl: 'https://curator.jsc.nasa.gov/lunar/alsep.cfm',
      sourceName: 'NASA Johnson Space Center ALSEP Termination Report'
    },
    quotes: [
      {
        type: 'team_message',
        typeLabel: {
          ru: 'Сообщение команды',
          en: 'Team Message',
          uz: 'Jamoa xabari',
        },
        text: {
          ru: '«Отключение научных станций ALSEP было продиктовано исключительно бюджетными ограничениями NASA, а не техническими неисправностями оборудования. Они могли надежно передавать геофизические данные еще много лет».',
          en: '“The shutdown of ALSEP scientific stations was dictated solely by NASA budgetary limits, not equipment failures. They could have transmitted geophysical data for many more years.”',
          uz: '«ALSEP ilmiy stansiyalarining o‘chirilishi uskunaning texnik nosozligi emas, balki faqat NASA byudjet cheklovlari bilan bog‘liq edi. Ular yana ko‘p yillar davomida ishonchli geofizik ma’lumotlarni uzata olar edi».',
        },
        attribution: {
          ru: 'Джеймс Бейтс (James Bates), менеджер научной программы ALSEP в NASA JSC',
          en: 'James Bates, ALSEP Program Manager at NASA JSC',
          uz: 'Jeyms Beyts, NASA JSC ALSEP ilmiy dasturi menejeri',
        },
        context: {
          ru: 'Сентябрь 1977 года, официальное коммюнике NASA',
          en: 'September 1977 official NASA communiqué',
          uz: '1977-yil sentyabr, NASA rasmiy kommyunikesi',
        },
        sourceUrl: 'https://history.nasa.gov/SP-407/sp407.htm',
        sourceName: 'NASA History Office: Apollo Expeditions to the Moon (SP-407)'
      },
      {
        type: 'telemetry',
        typeLabel: {
          ru: 'Данные аппарата',
          en: 'Flight Telemetry',
          uz: 'Apparat telemetriyasi',
        },
        text: {
          ru: '«30 сентября 1977 года: По командам наземных станций сети MSFN научные эксперименты станций ALSEP были переведены в пассивный режим после 8 лет работы».',
          en: '“September 30, 1977: Pursuant to commands from MSFN tracking stations, ALSEP scientific experiments were placed into passive mode after 8 years of operations.”',
          uz: '«1977-yil 30-sentyabr: MSFN yer stansiyalari buyrug‘i bilan ALSEP ilmiy tajribalari 8 yillik faoliyatdan so‘ng passiv rejimga o‘tkazildi».',
        },
        attribution: {
          ru: 'Отчет NASA Johnson Space Center (ALSEP Termination, 1979)',
          en: 'NASA Johnson Space Center ALSEP Termination Report (1979)',
          uz: 'NASA Jonson kosmik markazi ALSEP hisoboti (1979)',
        },
        context: {
          ru: '30 сентября 1977 года, завершение поддержки сети станций Apollo 12, 14, 15, 16, 17',
          en: 'Sept 30, 1977 conclusion of Apollo 12, 14, 15, 16, 17 network support',
          uz: '1977-yil 30-sentyabr, Apollo stansiyalari tarmog‘ini qo‘llab-quvvatlashning yakunlanishi',
        },
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
      activeTitle: {
        ru: 'ШТАТНЫЙ СИГНАЛ 1970-Х // МГНОВЕННЫЙ ОБРЫВ ПО КОМАНДЕ',
        en: 'NOMINAL 1970s CARRIER // INSTANT COMMAND CUTOFF',
        uz: '1970-YILLARNING ME’YORIY SIGNALI // BUYRUQ BILAN BIR LAHZADA UZILISH',
      },
      endStateTitle: {
        ru: 'ОБРЫВ НЕСУЩЕЙ // КОМАНДА ОТКЛЮЧЕНИЯ ИЗ ХЬЮСТОНА',
        en: 'CARRIER CUTOFF // SHUTDOWN COMMAND DISPATCHED',
        uz: 'TASHUVCHI TO‘LQIN UZILISHI // XUSTONDAN O‘CHIRISH BUYRUG‘I',
      },
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
    world: {
      ru: 'МАРС // Кратер Езеро, Холмы Валинор',
      en: 'MARS // Jezero Crater, Valinor Hills',
      uz: 'MARS // Jezero krateri, Valinor tepaliklari',
    },
    date: '18 января 2024',
    coordinates: '18.4446° N, 77.4509° E',
    sol: 'Сол 1038',
    natureOfEnd: {
      ru: 'Повреждение конца лопасти винта при жесткой посадке. Аппарат жив и переведен в стационарный метеопост',
      en: 'Rotor blade tip damage during hard touchdown. Aircraft intact and transitioned to stationary weather outpost',
      uz: 'Qattiq qo‘nishda parrak uchining shikastlanishi. Apparat ishlamoqda va doimiy meteopostga aylantirilgan',
    },
    telemetryFact: {
      raw: 'ROTOR ROTATION: HALTED // BLADE TIP SEPARATION DETECTED // AVIONICS & POWER: 100% HEALTHY // ZIGBEE 914 MHz: ACTIVE',
      explanation: {
        ru: 'Винтокрылая машина совершила 72 полета вместо 5 запланированных. Хотя повреждение лопасти больше не позволяет летать, электроника, солнечная батарея и радиоканал полностью исправны. По решению команды миссии JPL вертолет переведен в режим стационарной базы наблюдений.',
        en: 'The helicopter flew 72 times instead of the planned 5. Although blade damage prevents flight, avionics, solar panel, and radio remain functional, serving as a permanent stationary station.',
        uz: 'Vertolyot rejalashtirilgan 5 parvoz o‘rniga 72 bor havoga ko‘tarildi. Parrak shikastlanishi parvozlarni to‘xtatgan bo‘lsa-da, elektronika, quyosh batareyasi va radioaloqa butkul soz bo‘lib, doimiy kuzatuv bazasiga aylandi.',
      },
      sourceUrl: 'https://www.jpl.nasa.gov/news/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends',
      sourceName: 'NASA JPL News Release 2024'
    },
    quotes: [
      {
        type: 'team_message',
        typeLabel: {
          ru: 'Сообщение команды',
          en: 'Team Message',
          uz: 'Jamoa xabari',
        },
        text: {
          ru: '«Историческое путешествие Ingenuity подошло к концу. Этот выдающийся вертолет взлетел выше и дальше, чем мы могли представить, доказав, что управляемый полет на Марсе возможен. Он больше не может подняться в небо, но его приборы продолжают служить науке».',
          en: '“The historic journey of Ingenuity has come to an end. That remarkable helicopter flew higher and farther than we ever imagined, proving powered flight on Mars is possible. It can no longer fly, but its instruments continue serving science.”',
          uz: '«Ingenuity’ning tarixiy sayohati nihoyasiga yetdi. Bu ajoyib vertolyot biz tasavvur qilganimizdan ham balandroq va uzoqroq parvoz qilib, Marsda boshqariladigan parvoz mumkinligini isbotladi. U endi osmonga ko‘tarilolmaydi, ammo asboblari ilm-fanga xizmat qilishda davom etadi».',
        },
        attribution: {
          ru: 'Билл Нельсон (Bill Nelson), администратор NASA',
          en: 'Bill Nelson, NASA Administrator',
          uz: 'Bill Nelson, NASA ma’muri',
        },
        context: {
          ru: '25 января 2024, официальный брифинг NASA HQ',
          en: 'Jan 25, 2024 NASA HQ briefing',
          uz: '2024-yil 25-yanvar, NASA HQ rasmiy brifingi',
        },
        sourceUrl: 'https://www.nasa.gov/news-release/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/',
        sourceName: 'NASA Headquarters Release 24-009'
      },
      {
        type: 'interpretation',
        typeLabel: {
          ru: 'Интерпретация',
          en: 'Interpretation',
          uz: 'Talqin',
        },
        text: {
          ru: '«Сложил крылья, но остался жив: вертолет превратился в постоянную погодную станцию».',
          en: '“Folded its wings yet remains alive: the helicopter transformed into an enduring Martian weather station.”',
          uz: '«Qanotlarini yig‘ishtirdi, ammo tirik qoldi: vertolyot doimiy ob-havo stansiyasiga aylandi».',
        },
        attribution: {
          ru: 'Обозреватели космической отрасли и пресс-служба NASA JPL',
          en: 'Aerospace observers & NASA JPL press team',
          uz: 'Koinot sohasi sharhlovchilari va NASA JPL matbuot xizmati',
        },
        context: {
          ru: 'Январь 2024 года',
          en: 'January 2024',
          uz: '2024-yil yanvar',
        },
        sourceUrl: 'https://www.jpl.nasa.gov/news/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends',
        sourceName: 'NASA JPL Technical Briefing',
        clarificationNote: {
          ru: 'Команда JPL обновила бортовое ПО: аппарат просыпается каждое утро, замеряет температуру грунта и параметры датчиков и сохраняет их в бортовую память.',
          en: 'JPL engineers updated flight software: Ingenuity wakes up every Martian morning, logs sensor data and temperatures into flash memory for future missions.',
          uz: 'JPL jamoasi dasturiy ta’minotni yangiladi: apparat har kuni ertalab uyg‘onib, tuproq harorati va datchiklar ko‘rsatkichini kelajakdagi missiyalar uchun xotirasiga yozib oladi.',
        }
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
      activeTitle: {
        ru: 'БОДРЫЙ СИГНАЛ АВИАЦИИ // НЕТ ЗАТУХАНИЯ',
        en: 'HEALTHY AERIAL CARRIER // ZERO FADE',
        uz: 'BARQAROR AVIATSIYA SIGNALI // SO‘NISH YO‘Q',
      },
      endStateTitle: {
        ru: 'КОНТРОЛЬНАЯ ПАУЗА // АППАРАТ ЖИВ (СТАЦИОНАРНЫЙ ПОСТ)',
        en: 'CONTROL PAUSE // CRAFT ALIVE (STATIONARY POST)',
        uz: 'NAZORAT TANAFFUSI // APPARAT ISHLAMOQDA (STATSIYONAR POST)',
      },
      behavior: 'steady_plateau'
    },
    sources: [
      { title: 'NASA HQ Release: After Three Years on Mars, Ingenuity Mission Ends', url: 'https://www.nasa.gov/news-release/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/' },
      { title: 'NASA JPL Ingenuity Mars Helicopter Overview', url: 'https://www.jpl.nasa.gov/missions/ingenuity-mars-helicopter' }
    ]
  }
];

export const LastSignalSection: React.FC = () => {
  const { t, localize } = useT();
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
    if (prefersReducedMotion) {
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
      return Math.max(4, Math.sin(barIndex * 0.35) * 14 + 14);
    }

    switch (selectedCase.visualizer.behavior) {
      case 'erratic_dropout': {
        if (progress > 0.85) return 2;
        const dropoutDip = (progress > 0.22 && progress < 0.3) || (progress > 0.42 && progress < 0.5) || (progress > 0.65 && progress < 0.74);
        const amplitudeMod = dropoutDip ? 0.15 : (1 - progress * 0.75);
        const noiseScatter = (Math.sin(barIndex * 9.3 + progress * 24) * 0.5 + 0.5) * (progress * 18);
        const wave = Math.sin(barIndex * 0.45 + progress * 16) * 22;
        return Math.max(2, Math.min(38, Math.round(wave * amplitudeMod + noiseScatter)));
      }
      case 'drooping_curve': {
        if (progress > 0.9) return 2;
        const fadeMod = Math.max(0.05, Math.pow(1 - progress, 1.8));
        const slowDriftWave = Math.sin(barIndex * 0.3 + progress * 6) * 20;
        return Math.max(2, Math.min(38, Math.round(slowDriftWave * fadeMod + 4)));
      }
      case 'calm_relay': {
        if (progress > 0.88) return 2;
        const smoothDecay = 1 - progress * 0.65;
        const stableToneWave = Math.sin(barIndex * 0.55 + progress * 10) * 18;
        return Math.max(2, Math.min(38, Math.round(stableToneWave * smoothDecay + 8)));
      }
      case 'sharp_square_cutoff': {
        const cutoff = selectedCase.audioScenario.cutoffTimeRatio ?? 0.7;
        if (progress >= cutoff) return 2;
        const squareLikeWave = Math.sin(barIndex * 0.6 + progress * 12) > 0 ? 30 : 16;
        return squareLikeWave;
      }
      case 'steady_plateau':
      default: {
        const plateauWave = Math.sin(barIndex * 0.4 + progress * 14) * 18 + 16;
        return Math.max(8, Math.min(38, Math.round(plateauWave)));
      }
    }
  };

  const totalBars = 36;
  const bars = Array.from({ length: totalBars }, (_, i) => computeBarHeight(i, totalBars));

  return (
    <section id="last-signal" className="relative py-24 bg-[#030508] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>{t.lastSignal.sectionTag}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight">
            {t.lastSignal.title}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            {t.lastSignal.subtitle}
          </p>
        </div>

        {/* Global Sound and Accessibility Ribbon */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-xs font-mono border-b border-slate-900 pb-4">
          <div className="text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>{t.lastSignal.vesselSelector}</span>
          </div>

          <div className="flex items-center gap-3">
            {prefersReducedMotion && (
              <span className="text-[11px] text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded">
                {t.lastSignal.reducedMotionActive}
              </span>
            )}

            <button
              onClick={toggleMute}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 transition-colors"
              title={isMuted ? t.nav.soundOn : t.nav.soundOff}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isMuted ? t.nav.soundOff : t.nav.soundOn}</span>
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
                  {localize(item.world).split('//')[0]}
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
              <span className="font-bold text-white tracking-wider uppercase">
                {selectedCase.vehicle} // {selectedCase.designation}
              </span>
            </div>

            <div className="text-[11px] font-mono text-slate-400">
              {localize(selectedCase.world)} · {selectedCase.coordinates} · {selectedCase.sol}
            </div>
          </div>

          {/* Visualizer Frequency Bars Display */}
          <div className="py-8 sm:py-12 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl h-36 flex items-end justify-between gap-1 sm:gap-2 px-4 bg-slate-950/60 rounded-xl border border-slate-900/90 p-4">
              {bars.map((h, i) => (
                <div
                  key={i}
                  style={{
                    height: `${h * 2.5}px`,
                    backgroundColor: isPlaying ? selectedCase.visualizer.glowHex : '#334155',
                    boxShadow: isPlaying ? `0 0 10px ${selectedCase.visualizer.glowHex}66` : 'none',
                    transition: prefersReducedMotion ? 'none' : 'height 0.08s ease, background-color 0.2s',
                  }}
                  className="flex-1 rounded-t-sm"
                />
              ))}
            </div>

            {/* Dynamic Status Text */}
            <div className="mt-4 text-center font-mono text-xs text-slate-400 tracking-wider uppercase">
              {isPlaying ? (
                <span className="text-white">
                  {localize(selectedCase.visualizer.activeTitle)} ({(progress * 100).toFixed(0)}%)
                </span>
              ) : (
                <span>{localize(selectedCase.visualizer.endStateTitle)}</span>
              )}
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
                  <span>{t.lastSignal.stopSimulation}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>{t.lastSignal.playSignalWithDuration} ({selectedCase.audioScenario.duration}s)</span>
                </>
              )}
            </button>

            <div className="text-xs font-mono text-slate-400 text-center sm:text-left">
              {t.lastSignal.fadeProfile} <span className="text-slate-300">{localize(selectedCase.natureOfEnd)}</span>
            </div>
          </div>

          {/* Fact vs Interpretation Cards */}
          <div className="mt-8 space-y-6">
            {/* Raw Telemetry Fact */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 rounded flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t.lastSignal.telemetryBadge}
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
                {localize(selectedCase.telemetryFact.explanation)}
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
                          {localize(q.typeLabel)}
                        </span>

                        <span className="text-[10px] font-mono text-slate-400">
                          {localize(q.context)}
                        </span>
                      </div>

                      <blockquote className="text-sm font-serif italic text-slate-100 leading-snug my-2">
                        {localize(q.text)}
                      </blockquote>

                      <div className="text-xs font-mono text-slate-300 mt-2">
                        — {localize(q.attribution)}
                      </div>

                      {q.clarificationNote && (
                        <div className="mt-3 p-2 bg-amber-950/40 border border-amber-800/40 rounded text-[11px] font-mono text-amber-200/90 leading-relaxed">
                          {localize(q.clarificationNote)}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>{t.lastSignal.sourceLabel}</span>
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

            {/* Official Source Reference Links */}
            <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl text-xs font-mono text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                {t.lastSignal.officialSourcesTitle}
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
