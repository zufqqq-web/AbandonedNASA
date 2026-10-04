import { WorldInfo } from '../types/mission';

export const worldsData: Record<'Moon' | 'Mars', WorldInfo> = {
  Moon: {
    id: 'Moon',
    name: {
      ru: 'Луна',
      en: 'The Moon',
      uz: 'Oy',
    },
    englishName: 'LUNA',
    tagline: {
      ru: 'Естественный спутник Земли. Первый шаг человечества за пределы колыбели.',
      en: 'Earth’s natural satellite. Humanity’s first step beyond the home cradle.',
      uz: 'Yerning tabiiy yo‘ldoshi. Insoniyatning ona beshigidan tashqaridagi ilk qadami.',
    },
    description: {
      ru: 'На поверхности Луны навсегда остались 6 посадочных ступеней лунных модулей Apollo, 3 лунных вездехода LRV, автоматические станции Surveyor, а также научные приборы ALSEP. В безвоздушном пространстве они остаются неизменными десятилетиями.',
      en: 'Permanently resting on the Moon are 6 Apollo lunar module descent stages, 3 LRV buggies, Surveyor probes, and ALSEP scientific stations. In airless vacuum, they remain pristine for decades.',
      uz: 'Oy yuzasida 6 ta Apollo qo‘nish bosqichi, 3 ta LRV avtomobili, Surveyor avtomatik stansiyalari va ALSEP asboblari mangu qoldi. Havosiz fazoda ular o‘n yillar davomida o‘zgarmay saqlanadi.',
    },
    stats: {
      objectsCount: 9,
      missionsCount: {
        ru: '24+ миссии NASA',
        en: '24+ NASA missions',
        uz: '24+ NASA missiyalari',
      },
      timeSpan: '1966 – 2024+',
      distanceFromEarth: {
        ru: '384 400 км',
        en: '384,400 km',
        uz: '384 400 km',
      },
      environment: {
        ru: 'Абсолютный вакуум, микрометеориты',
        en: 'Absolute vacuum, micrometeorites',
        uz: 'Mutlaq vakuum, mikrometeoritlar',
      },
      surfaceTemp: {
        ru: 'от -173°C до +120°C',
        en: 'from -173°C to +120°C',
        uz: '-173°C dan +120°C gacha',
      },
    },
  },
  Mars: {
    id: 'Mars',
    name: {
      ru: 'Марс',
      en: 'Mars',
      uz: 'Mars',
    },
    englishName: 'MARS',
    tagline: {
      ru: 'Красная планета. Кладбище и архив величайших роботизированных первопроходцев.',
      en: 'The Red Planet. The resting place and archive of humanity’s greatest robotic pioneers.',
      uz: 'Qizil sayyora. Insoniyatning eng buyuk robot kashfiyotchilarining mangu maskani va arxivi.',
    },
    description: {
      ru: 'Марсианские ветры и песчаные бури медленно покрывают тонким слоем оксида железа легендарные роверы Opportunity, Spirit, Sojourner, посадочные платформы Viking, Phoenix и InSight, а также первый внеземной вертолёт Ingenuity.',
      en: 'Martian winds and global dust storms slowly mantle with iron oxide the legendary rovers Opportunity, Spirit, Sojourner, landers Viking, Phoenix, and InSight, as well as the pioneering aerial helicopter Ingenuity.',
      uz: 'Mars shamollari va chang bo‘ronlari afsonaviy Opportunity, Spirit, Sojourner roverlarini, Viking, Phoenix va InSight platformalarini hamda ilk Ingenuity vertolyotini temir oksidi qatlami bilan asta-sekin qoplamoqda.',
    },
    stats: {
      objectsCount: 8,
      missionsCount: {
        ru: '16+ успешных аппаратов',
        en: '16+ successful craft',
        uz: '16+ muvaffaqiyatli apparat',
      },
      timeSpan: '1976 – 2026+',
      distanceFromEarth: {
        ru: '225 000 000 км (в среднем)',
        en: '225,000,000 km (average)',
        uz: '225 000 000 km (o‘rtacha)',
      },
      environment: {
        ru: 'Разреженная CO₂ атмосфера (0.6% Земли)',
        en: 'Rarefied CO₂ atmosphere (0.6% of Earth)',
        uz: 'Siyrak CO₂ atmosferasi (Yerning 0.6% qismi)',
      },
      surfaceTemp: {
        ru: 'от -125°C до +20°C',
        en: 'from -125°C to +20°C',
        uz: '-125°C dan +20°C gacha',
      },
    },
  },
};
