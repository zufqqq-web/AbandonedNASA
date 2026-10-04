import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, Sparkles, Scale, BookOpen } from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { LocalizedText } from '../i18n/types';
import { useT } from '../i18n/LanguageContext';

interface MoonArtifact {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  mission: LocalizedText;
  year: string;
  category: LocalizedText;
  description: LocalizedText;
  scientificOrCulturalValue: LocalizedText;
  sourceName: string;
  sourceUrl: string;
  iconTag: string;
}

const moonArtifacts: MoonArtifact[] = [
  {
    id: 'jettison-bags',
    title: {
      ru: 'Мешки с отходами жизнедеятельности',
      en: 'Jettison Bags (Life Support Waste)',
      uz: 'Chiqindi va hayotiy faoliyat xaltalari (Jettison Bags)',
    },
    subtitle: {
      ru: '~96 герметичных пакетов (Jettison Bags)',
      en: '~96 Hermetic Jettison Bags',
      uz: '~96 ta germetik xalta (Jettison Bags)',
    },
    mission: {
      ru: 'Миссии Apollo 11–17',
      en: 'Apollo 11–17 Missions',
      uz: 'Apollo 11–17 missiyalari',
    },
    year: '1969 — 1972',
    category: {
      ru: 'Биологический след',
      en: 'Biological Trace',
      uz: 'Biologik iz',
    },
    description: {
      ru: 'Чтобы взлетная ступень лунного модуля смогла оторваться от Луны и выйти на орбиту, астронавты сбрасывали на грунт всё лишнее оборудование: ранцы жизнеобеспечения PLSS, камеры и белые мешки с бытовым мусором и физиологическими отходами.',
      en: 'To reduce lunar module ascent stage liftoff mass, astronauts jettisoned surplus gear onto the lunar regolith: PLSS backpacks, cameras, and white hermetic bags containing physiological waste and trash.',
      uz: 'Oy modulining ko‘tarilish bosqichi Oydan ajralib orbitaga chiqa olishi uchun astronavtlar ortiqcha barcha jihozlarni sirtga tashlashgan: PLSS ryukzaklari, kameralar va maishiy hamda fiziologik chiqindilar solingan oq xaltalar.',
    },
    scientificOrCulturalValue: {
      ru: 'Сегодня для астробиологов NASA это уникальный естественный эксперимент: выжили ли споры земных бактерий после 50+ лет нахождения в абсолютном вакууме при жестком солнечном ультрафиолете и перепадах температур от -173°C до +120°C?',
      en: 'Today NASA astrobiologists view this as an unprecedented natural experiment: did dormant terrestrial bacterial spores survive 50+ years exposed to hard vacuum, solar UV radiation, and thermal swings from -173°C to +120°C?',
      uz: 'Bugungi kunda NASA astrobiologlari uchun bu noyob tabiiy tajribadir: Yer bakteriyalarining sporalari mutlaq vakuum, kuchli quyosh ultrabinafsha nurlari va -173°C dan +120°C gacha bo‘lgan harorat tebranishlarida 50+ yil o‘tib tirik qoldimi?',
    },
    sourceName: 'NASA Apollo Lunar Surface Journal / Apollo 11 Jettison Log',
    sourceUrl: 'https://history.nasa.gov/alsj/a11/a11.jettison.html',
    iconTag: 'BIO-BAG'
  },
  {
    id: 'golf-balls',
    title: {
      ru: 'Мячи для гольфа Алана Шепарда',
      en: 'Alan Shepard’s Lunar Golf Balls',
      uz: 'Alan Shepardning golf to‘plari',
    },
    subtitle: {
      ru: 'Два мяча Wilson + самодельная клюшка 6-iron',
      en: 'Two Wilson Golf Balls + Custom 6-Iron Club',
      uz: 'Ikkita Wilson to‘pi + 6-iron qo‘lbola klyushkasi',
    },
    mission: {
      ru: 'Apollo 14 (Фра Мауро)',
      en: 'Apollo 14 (Fra Mauro)',
      uz: 'Apollo 14 (Fra Mauro)',
    },
    year: '1971',
    category: {
      ru: 'Спорт & Эксперимент',
      en: 'Sport & Science Experiment',
      uz: 'Sport va tajriba',
    },
    description: {
      ru: 'Командир Алан Шепард тайно провез на Луну головку от клюшки для гольфа Wilson Staff 6-iron, насадил её на рукоятку лунного совка для проб грунта и одной рукой в жестком скафандре нанес удары по двум мячам.',
      en: 'Commander Alan Shepard smuggled a Wilson Staff 6-iron club head to the Moon, mounted it onto a lunar sample scoop handle, and struck two golf balls one-handed in his stiff spacesuit.',
      uz: 'Komandir Alan Shepard Wilson Staff 6-iron golf klyushkasi uchini Oyga yashirincha olib chiqib, uni tuproq namunasi kurakchasi sopiga o‘rnatdi va qattiq skafandrda bir qo‘li bilan ikkita to‘pga zarba berdi.',
    },
    scientificOrCulturalValue: {
      ru: 'Шепард воскликнул: «Мяч летит мили и мили и мили!». Позднее, по расчетам независимого исследователя Энди Сондерса на основе снимков орбитального зонда NASA LRO, дальность оценена скромнее: первый мяч пролетел около 22 метров (24 ярда), второй — около 37 метров (40 ярдов).',
      en: 'Shepard exclaimed: "Miles and miles and miles!" Later, digital analysis by independent researcher Andy Saunders using NASA LRO imagery revealed realistic distances: the first ball traveled ~22 meters (24 yards), the second ~37 meters (40 yards).',
      uz: 'Shepard: «To‘p millar va millar nariga uchmoqda!» deb hayqirdi. Keyinchalik, mustaqil tadqiqotchi Endi Sondersning NASA LRO sun’iy yo‘ldoshi suratlari asosidagi hisob-kitoblariga ko‘ra, haqiqiy masofa kamroq bo‘lib chiqdi: birinchi to‘p 22 metr (24 yard), ikkinchisi 37 metr (40 yard) uchgan.',
    },
    sourceName: 'NASA Apollo Lunar Surface Journal (Apollo 14 EVA-2)',
    sourceUrl: 'https://history.nasa.gov/alsj/a14/a14.eva2.html',
    iconTag: 'GOLF'
  },
  {
    id: 'fallen-astronaut',
    title: {
      ru: 'Статуэтка «Павший астронавт»',
      en: '“Fallen Astronaut” Memorial Figurine',
      uz: '«Halok bo‘lgan fazogir» haykalchasi',
    },
    subtitle: {
      ru: 'Алюминиевая миниатюра (8.5 см) и памятная табличка',
      en: '8.5 cm Aluminum Figurine & Commemorative Plaque',
      uz: '8.5 sm alyuminiy haykalcha va xotira lavhasi',
    },
    mission: {
      ru: 'Apollo 15 (Борозда Хэдли)',
      en: 'Apollo 15 (Hadley Rille)',
      uz: 'Apollo 15 (Xedli darasi)',
    },
    year: '1971',
    category: {
      ru: 'Искусство & Память',
      en: 'Art & Memorial',
      uz: 'San’at va xotira',
    },
    description: {
      ru: 'Единственный официальный художественный арт-объект на Луне. Бельгийский скульптор Пол Ван Хейдонк создал анонимную фигурку человека без расовых и половых признаков. Дэвид Скотт аккуратно уложил ее в лунную пыль рядом с памятной пластиной.',
      en: 'The only formal work of art installed on the Moon. Belgian artist Paul Van Hoeydonck sculpted an anonymous humanoid figure without gender or ethnic markers. Commander David Scott placed it gently on the regolith beside a memorial plaque.',
      uz: 'Oyga o‘rnatilgan yagona rasmiy san’at asari. Belgiya haykaltaroshi Pol Van Xeydonk irqiy va jinsiy belgilardan xoli nomsiz inson qiyofasini yaratdi. Devid Skott uni xotira lavhasi yonidagi Oy changiga ehtirom bilan qo‘ydi.',
    },
    scientificOrCulturalValue: {
      ru: 'На табличке выбиты имена 14 погибших советских и американских исследователей космоса: Юрий Гагарин, Владимир Комаров, Павел Беляев, Георгий Добровольский, Виктор Пацаев, Владислав Волков, Вирджил Гриссом, Эдвард Уайт, Роджер Чаффи и другие.',
      en: 'The accompanying plaque honors 14 fallen Soviet and American space explorers, including Yuri Gagarin, Vladimir Komarov, Pavel Belyayev, Georgi Dobrovolski, Viktor Patsayev, Vladislav Volkov, Virgil Grissom, Edward White, Roger Chaffee, and others.',
      uz: 'Lavhaga halok bo‘lgan 14 nafar sovet va amerikalik fazogirlar ismi bitilgan: Yuriy Gagarin, Vladimir Komarov, Pavel Belyayev, Georgiy Dobrovolskiy, Viktor Patsayev, Vladislav Volkov, Virjil Grissom, Edvard Uayt, Rojer Chaffi va boshqalar.',
    },
    sourceName: 'NASA Apollo 15 Journal (ALSJ) & Smithsonian NASM',
    sourceUrl: 'https://history.nasa.gov/alsj/a15/a15.eva3.html',
    iconTag: 'ART'
  },
  {
    id: 'duke-photo',
    title: {
      ru: 'Семейная фотография Чарльза Дюка',
      en: 'Charles Duke’s Family Photograph',
      uz: 'Charlz Dyukning oilaviy fotosurati',
    },
    subtitle: {
      ru: 'Цветной снимок в пластиковом конверте',
      en: 'Color Print Encased in Protective Plastic',
      uz: 'Himoya plastikidagi rangli surat',
    },
    mission: {
      ru: 'Apollo 16 (Нагорье Декарт)',
      en: 'Apollo 16 (Descartes Highlands)',
      uz: 'Apollo 16 (Dekart tog‘ligi)',
    },
    year: '1972',
    category: {
      ru: 'Личный артефакт',
      en: 'Personal Keepsake',
      uz: 'Shaxsiy yodgorlik',
    },
    description: {
      ru: 'Пилот лунного модуля Чарли Дюк оставил на реголите цветное фото своей семьи: самого себя, супруги Дороти и двух сыновей, Чарльза и Томаса. На обороте снимка дети написали: «This is the family of Astronaut Charlie Duke from Planet Earth who landed on the Moon, April 20, 1972».',
      en: 'Lunar Module Pilot Charlie Duke placed a family photograph onto the regolith showing himself, his wife Dorothy, and sons Charles and Thomas. Handwritten on the reverse: "This is the family of Astronaut Charlie Duke from Planet Earth who landed on the Moon, April 20, 1972".',
      uz: 'Oy moduli uchuvchisi Charli Dyuk reolit ustiga o‘zining, rafiqasi Doroti va ikki o‘g‘li Charlz hamda Tomas aks etgan oilaviy suratini qoldirdi. Orqa tomoniga: «Bu 1972-yil 20-aprelda Oyga qo‘ngan Yer sayyorasi fazogiri Charli Dyukning oilasi» deb yozilgan.',
    },
    scientificOrCulturalValue: {
      ru: 'Дюк сфотографировал снимок на лунной поверхности камерой Hasselblad (кадр AS16-117-18841). По оценке специалистов, органические красители фотографии выцвели под жестким солнечным УФ-излучением, но сама физическая подложка сохраняется на Луне.',
      en: 'Duke documented the photograph with his Hasselblad camera (frame AS16-117-18841). Experts estimate the photo emulsions have bleached under unfiltered solar UV rays, though the substrate physically endures intact.',
      uz: 'Dyuk suratni Oy yuzasida Hasselblad kamerasi bilan suratga oldi (AS16-117-18841 kadri). Mutaxassislar fikricha, qattiq quyosh nuri ostida bo‘yoqlar o‘chib ketgan, biroq fotosurat asosi Oydagi sharoitda saqlanib turibdi.',
    },
    sourceName: 'NASA Apollo Lunar Surface Journal (Apollo 16 Plum Crater)',
    sourceUrl: 'https://history.nasa.gov/alsj/a16/a16.step.html',
    iconTag: 'PHOTO'
  }
];

export const MoonArtifactsSection: React.FC = () => {
  const { t, localize } = useT();
  const [activeArtifact, setActiveArtifact] = useState<MoonArtifact>(moonArtifacts[0]);

  return (
    <section id="moon-artifacts" className="relative py-24 bg-[#040609] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>{t.moonArtifacts.sectionTag}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {t.moonArtifacts.title}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            {t.moonArtifacts.subtitle}
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
                    {localize(item.title)}
                  </h3>

                  <div className="text-xs text-slate-400 font-mono mb-3">
                    {localize(item.mission)}
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {localize(item.description)}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">{localize(item.category)}</span>
                  <span className={`font-semibold ${isSelected ? 'text-blue-400' : 'text-slate-400'}`}>
                    {isSelected ? t.moonArtifacts.selectedBadge : t.moonArtifacts.detailsLink}
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
                <span className="text-blue-400 font-bold uppercase">{localize(activeArtifact.category)}</span>
                <span aria-hidden="true">·</span>
                <span>{localize(activeArtifact.mission)}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-300">{activeArtifact.year}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                {localize(activeArtifact.title)}
              </h3>

              <div className="text-sm font-mono text-slate-400">
                {localize(activeArtifact.subtitle)}
              </div>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed pt-2">
                {localize(activeArtifact.description)}
              </p>

              <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-xl">
                <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t.moonArtifacts.artifactSignificanceTitle}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {localize(activeArtifact.scientificOrCulturalValue)}
                </p>
              </div>
            </div>

            {/* Source Reference Block */}
            <div className="lg:w-72 bg-slate-950 border border-slate-800 p-5 rounded-xl flex flex-col justify-between space-y-4">
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">
                  {t.moonArtifacts.verifiedSource}
                </div>
                <div className="text-xs font-semibold text-slate-200">
                  {activeArtifact.sourceName}
                </div>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  {t.moonArtifacts.sourceNote}
                </p>
              </div>

              <a
                href={activeArtifact.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <span>{t.moonArtifacts.readSourceBtn}</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Philosophical / Legal Debate Block: «МУСОР ИЛИ НАСЛЕДИЕ?» */}
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900/60 to-slate-950 p-6 sm:p-10">
          <div className="flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest mb-3">
            <Scale className="w-4 h-4" />
            <span>{t.moonArtifacts.debateTag}</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
            {t.moonArtifacts.debateTitle}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-slate-300 leading-relaxed">
            <div className="space-y-3">
              <p>
                {t.moonArtifacts.debateP1}
              </p>
              <p className="text-slate-400">
                {t.moonArtifacts.debateP2}
              </p>
            </div>

            <div className="space-y-3 bg-slate-950/70 p-5 rounded-xl border border-slate-800/80">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>{t.moonArtifacts.lawTitle}</span>
              </div>
              <p className="text-xs text-slate-300">
                {t.moonArtifacts.lawDesc}
              </p>
              <div className="pt-2 text-[11px] font-mono text-slate-500">
                {t.moonArtifacts.lawSourceText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
