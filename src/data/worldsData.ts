import { WorldInfo } from '../types/mission';

export const worldsData: Record<'Moon' | 'Mars', WorldInfo> = {
  Moon: {
    id: 'Moon',
    name: 'Луна',
    englishName: 'LUNA',
    tagline: 'Естественный спутник Земли. Первый шаг человечества за пределы колыбели.',
    description: 'На поверхности Луны навсегда остались 6 посадочных ступеней лунных модулей Apollo, 3 лунных вездехода LRV, автоматические станции Surveyor, а также научные приборы ALSEP. В безвоздушном пространстве они остаются неизменными десятилетиями.',
    stats: {
      objectsCount: 9,
      missionsCount: '24+ миссии NASA',
      timeSpan: '1966 – 2024+',
      distanceFromEarth: '384 400 км',
      environment: 'Абсолютный вакуум, микрометеориты',
      surfaceTemp: 'от -173°C до +120°C',
    },
  },
  Mars: {
    id: 'Mars',
    name: 'Марс',
    englishName: 'MARS',
    tagline: 'Красная планета. Кладбище и архив величайших роботизированных первопроходцев.',
    description: 'Марсианские ветры и песчаные бури медленно покрывают тонким слоем оксида железа легендарные роверы Opportunity, Spirit, Sojourner, посадочные платформы Viking, Phoenix и InSight, а также первый внеземной вертолёт Ingenuity.',
    stats: {
      objectsCount: 8,
      missionsCount: '16+ успешных аппаратов',
      timeSpan: '1976 – 2026+',
      distanceFromEarth: '225 000 000 км (в среднем)',
      environment: 'Разреженная CO₂ атмосфера (0.6% Земли)',
      surfaceTemp: 'от -125°C до +20°C',
    },
  },
};
