import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ExternalLink, HelpCircle, Sparkles, Scale, BookOpen, AlertCircle } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface MoonArtifact {
  id: string;
  title: string;
  subtitle: string;
  mission: string;
  year: string;
  category: 'Биологический след' | 'Спорт & Эксперимент' | 'Искусство & Память' | 'Личный артефакт';
  description: string;
  scientificOrCulturalValue: string;
  sourceName: string;
  sourceUrl: string;
  iconTag: string;
}

const moonArtifacts: MoonArtifact[] = [
  {
    id: 'jettison-bags',
    title: 'Мешки с отходами жизнедеятельности',
    subtitle: '~96 герметичных пакетов (Jettison Bags)',
    mission: 'Миссии Apollo 11–17',
    year: '1969 — 1972',
    category: 'Биологический след',
    description: 'Чтобы взлетная ступень лунного модуля смогла оторваться от Луны и выйти на орбиту, астронавты сбрасывали на грунт всё лишнее оборудование: ранцы жизнеобеспечения PLSS, камеры и белые мешки с бытовым мусором и физиологическими отходами.',
    scientificOrCulturalValue: 'Сегодня для астробиологов NASA это уникальный естественный эксперимент: выжили ли споры земных бактерий после 50+ лет нахождения в абсолютном вакууме при жестком солнечном ультрафиолете и перепадах температур от -173°C до +120°C?',
    sourceName: 'NASA Astrobiology / Lunar Microbes Study',
    sourceUrl: 'https://astrobiology.nasa.gov/news/what-microbes-did-apollo-leave-behind/',
    iconTag: 'BIO-BAG'
  },
  {
    id: 'golf-balls',
    title: 'Мячи для гольфа Алана Шепарда',
    subtitle: 'Два мяча Wilson + самодельная клюшка 6-iron',
    mission: 'Apollo 14 (Фра Мауро)',
    year: 'Февраль 1971',
    category: 'Спорт & Эксперимент',
    description: 'Командир Алан Шепард тайно провез на Луну головку от клюшки для гольфа Wilson Staff 6-iron, насадил её на рукоятку лунного совка для проб грунта и одной рукой в жестком скафандре нанес удары по двум мячам.',
    scientificOrCulturalValue: 'Шепард воскликнул: «Мяч летит мили и мили и мили!». В 2021 году британский специалист Энди Сондерс по сверхчетким снимкам орбитального зонда LRO установил точные места падения: первый мяч пролетел 22 метра, второй — около 37 метров.',
    sourceName: 'USGA Museum / NASA Apollo 14 Journal',
    sourceUrl: 'https://www.usga.org/content/usga/home-page/articles/2021/02/shepard-moon-shot-apollo-14-50th-anniversary.html',
    iconTag: 'GOLF'
  },
  {
    id: 'fallen-astronaut',
    title: 'Статуэтка «Павший астронавт»',
    subtitle: 'Алюминиевая миниатюра (8.5 см) и памятная табличка',
    mission: 'Apollo 15 (Борозда Хэдли)',
    year: 'Август 1971',
    category: 'Искусство & Память',
    description: 'Единственный официальный художественный арт-объект на Луне. Бельгийский скульптор Пол Ван Хейдонк создал анонимную фигурку человека без расовых и половых признаков. Дэвид Скотт аккуратно уложил ее в лунную пыль рядом с памятной пластиной.',
    scientificOrCulturalValue: 'На табличке выбиты имена 14 погибших советских и американских исследователей космоса: Юрий Гагарин, Владимир Комаров, Павел Беляев, Георгий Добровольский, Виктор Пацаев, Владислав Волков, Вирджил Гриссом, Эдвард Уайт, Роджер Чаффи и другие.',
    sourceName: 'Smithsonian National Air and Space Museum',
    sourceUrl: 'https://airandspace.si.edu/collection-objects/statue-fallen-astronaut/nasm_A19860010000',
    iconTag: 'ART'
  },
  {
    id: 'duke-photo',
    title: 'Семейная фотография Чарльза Дюка',
    subtitle: 'Цветной снимок в пластиковом конверте',
    mission: 'Apollo 16 (Нагорье Декарт)',
    year: 'Апрель 1972',
    category: 'Личный артефакт',
    description: 'Пилот лунного модуля Чарли Дюк оставил на реголите цветное фото своей семьи: самого себя, супруги Дороти и двух сыновей, Чарльза и Томаса. На обороте снимка дети написали: «This is the family of Astronaut Charlie Duke from Planet Earth who landed on the Moon, April 20, 1972».',
    scientificOrCulturalValue: 'Дюк сфотографировал снимок на лунной поверхности камерой Hasselblad (кадр AS16-117-18841). Сегодня фотография почти наверняка выцвела от жесткого нефильтрованного солнечного ультрафиолета, но сам физический слой пленки покоится на Луне.',
    sourceName: 'NASA Apollo Lunar Surface Journal (AS16-117-18841)',
    sourceUrl: 'https://www.hq.nasa.gov/alsj/a16/a16.step.html',
    iconTag: 'PHOTO'
  }
];

export const MoonArtifactsSection: React.FC = () => {
  const [activeArtifact, setActiveArtifact] = useState<MoonArtifact>(moonArtifacts[0]);

  return (
    <section id="moon-artifacts" className="relative py-24 bg-[#040609] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>ЛУННЫЙ КУЛЬТУРНЫЙ СЛОЙ // АРХЕОЛОГИЯ КОСМОСА</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            ЧТО ОСТАЁТСЯ НА ЛУНЕ
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Помимо гигантских ракетных ступеней и луноходов, человек оставил на Луне десятки неожиданных предметов — от мешков с отходами до скульптур и семейных снимков.
          </p>
        </div>

        {/* 4 Interactive Artifact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {moonArtifacts.map((item) => {
            const isSelected = activeArtifact.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  spaceAudio.playTelemetryBeep(1200, 0.03);
                  setActiveArtifact(item);
                }}
                className={`p-5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900/90 border-blue-500 shadow-xl shadow-blue-950/20'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                    <span className="text-blue-400 font-bold">{item.iconTag}</span>
                    <span>{item.year}</span>
                  </div>

                  <h3 className="font-display text-base font-bold text-white uppercase mb-1">
                    {item.title}
                  </h3>

                  <div className="text-xs text-slate-400 font-mono mb-3">
                    {item.mission}
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">{item.category}</span>
                  <span className={`font-semibold ${isSelected ? 'text-blue-400' : 'text-slate-400'}`}>
                    {isSelected ? 'Выбрано ●' : 'Подробнее →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Artifact Deep Dive Box */}
        <div className="rounded-2xl border border-slate-800 bg-[#070b12] p-6 sm:p-8 lg:p-10 mb-16 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-blue-400 font-bold uppercase">{activeArtifact.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArtifact.mission}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-300">{activeArtifact.year}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                {activeArtifact.title}
              </h3>

              <div className="text-sm font-mono text-slate-400">
                {activeArtifact.subtitle}
              </div>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed pt-2">
                {activeArtifact.description}
              </p>

              <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-xl">
                <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Научная и историческая ценность
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {activeArtifact.scientificOrCulturalValue}
                </p>
              </div>
            </div>

            {/* Source Reference Block */}
            <div className="lg:w-72 bg-slate-950 border border-slate-800 p-5 rounded-xl flex flex-col justify-between space-y-4">
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">
                  ПРОВЕРЕННЫЙ ПЕРВОИСТОЧНИК
                </div>
                <div className="text-xs font-semibold text-slate-200">
                  {activeArtifact.sourceName}
                </div>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  Данные подтверждены историческими каталогами NASA и архивами Смитсоновского института.
                </p>
              </div>

              <a
                href={activeArtifact.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <span>Читать в источнике</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Philosophical / Legal Debate Block: «МУСОР ИЛИ НАСЛЕДИЕ?» */}
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900/60 to-slate-950 p-6 sm:p-10">
          <div className="flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest mb-3">
            <Scale className="w-4 h-4" />
            <span>ДИСКУССИОННЫЙ ВОПРОС</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
            МУСОР ИЛИ НАСЛЕДИЕ?
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-slate-300 leading-relaxed">
            <div className="space-y-3">
              <p>
                В обывательском представлении сброшенные мешки, брошенные ступени и сломанные роверы часто называют «космической свалкой». Однако с точки зрения археологии и международного космического права всё обстоит иначе.
              </p>
              <p className="text-slate-400">
                Каждый предмет, оставленный на Луне и Марсе, находится в условиях неизменного вакуума или низкой коррозии. Следы подошв Нила Армстронга, колеи луноходов и даже брошенные ранцы PLSS несут колоссальную научную информацию о первом соприкосновении биосферы Земли с космосом.
              </p>
            </div>

            <div className="space-y-3 bg-slate-950/70 p-5 rounded-xl border border-slate-800/80">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Закон «One Small Step Act» (США, 2020)</span>
              </div>
              <p className="text-xs text-slate-300">
                В 2020 году принят федеральный закон США (Public Law 116-275), обязывающий любые будущие космические миссии сохранять исторические артефакты Apollo на Луне. Некоммерческая организация <strong className="text-white">For All Moonkind</strong> при поддержке ООН (COPUOS) разрабатывает конвенцию о признании мест посадок первыми объектами всемирного наследия человечества вне Земли.
              </p>
              <div className="pt-2 text-[11px] font-mono text-slate-500">
                Источник: Congress.gov (S.1694 - One Small Step to Protect Human Heritage in Space Act)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
