import React from 'react';
import { motion } from 'motion/react';
import { SchematicView } from './SchematicView';
import { ShieldCheck } from 'lucide-react';
import { LocalizedText } from '../i18n/types';
import { useT } from '../i18n/LanguageContext';

interface RelicItem {
  id: string;
  name: LocalizedText;
  world: LocalizedText;
  place: LocalizedText;
  statusText: LocalizedText;
  significance: LocalizedText;
  schematic: 'lander' | 'rover-buggy' | 'rover' | 'helicopter';
}

const relicItems: RelicItem[] = [
  {
    id: 'apollo11',
    name: {
      ru: 'Посадочная ступень LM-5 «Eagle»',
      en: 'Apollo 11 LM-5 “Eagle” Descent Stage',
      uz: 'LM-5 «Eagle» qo‘nish bosqichi (Apollo 11)',
    },
    world: {
      ru: 'Луна',
      en: 'The Moon',
      uz: 'Oy',
    },
    place: {
      ru: 'База Спокойствия',
      en: 'Tranquility Base',
      uz: 'Orom bazasi (Tranquility Base)',
    },
    statusText: {
      ru: 'Находится в вакууме с 21 июля 1969 года',
      en: 'Resting in vacuum since July 21, 1969',
      uz: '1969-yil 21-iyuldan beri vakuumda turibdi',
    },
    significance: {
      ru: 'Первая посадочная площадка человека вне Земли. Золотая фольга, алюминиевые опоры и табличка «Мы пришли с миром» остаются невредимыми.',
      en: 'Humanity’s first landing site off Earth. Gold mylar foil, aluminum struts, and the plaque "We Came In Peace" remain pristine.',
      uz: 'Insoniyatning Yerdan tashqaridagi ilk qo‘nish maydoni. Oltin zarqog‘oz, alyuminiy tirgaklar va «Biz tinchlik bilan keldik» lavhasi butun saqlanmoqda.',
    },
    schematic: 'lander',
  },
  {
    id: 'lrv1',
    name: {
      ru: 'Луномобиль LRV-001 (Apollo 15)',
      en: 'Lunar Roving Vehicle LRV-001 (Apollo 15)',
      uz: 'LRV-001 Oy avtomobili (Apollo 15)',
    },
    world: {
      ru: 'Луна',
      en: 'The Moon',
      uz: 'Oy',
    },
    place: {
      ru: 'Борозда Хэдли',
      en: 'Hadley Rille',
      uz: 'Xedli darasi (Hadley Rille)',
    },
    statusText: {
      ru: 'Запаркован на VIP-стоянке со 2 августа 1971 года',
      en: 'Parked at final VIP overlook since August 2, 1971',
      uz: '1971-yil 2-avgustdan buyon VIP-turargohda turibdi',
    },
    significance: {
      ru: 'Первый четырехколесный автомобиль на чужом небесном теле. Телекамера навсегда направлена в сторону стартовой площадки взлетного модуля Falcon.',
      en: 'The first wheeled automobile driven across an extraterrestrial world. Color TV camera remains aimed at the Falcon ascent liftoff spot.',
      uz: 'Boshqa samoviy jismdagi ilk to‘rt g‘ildirakli avtomobil. Televizion kamerasi Falcon ko‘tarilish modulining uchish maydoniga qaragan holatda qolgan.',
    },
    schematic: 'rover-buggy',
  },
  {
    id: 'oppy',
    name: {
      ru: 'Ровер Opportunity (MER-B)',
      en: 'Opportunity Rover (MER-B)',
      uz: 'Opportunity roveri (MER-B)',
    },
    world: {
      ru: 'Марс',
      en: 'Mars',
      uz: 'Mars',
    },
    place: {
      ru: 'Кратер Индевор, Долина Настойчивости',
      en: 'Endeavour Crater, Perseverance Valley',
      uz: 'Endeavour krateri, Sabr vodiysi',
    },
    statusText: {
      ru: 'Покоится под тонким слоем пыли с 10 июня 2018 года',
      en: 'Resting under fine Martian dust since June 10, 2018',
      uz: '2018-yil 10-iyundan buyon yupqa chang qatlami ostida orom olmoqda',
    },
    significance: {
      ru: 'Прошел 45 километров по марсианским пескам. Доказал существование древних пресных озер и рек на Красной планете.',
      en: 'Drove 45 kilometers across Martian sands. Proved the past existence of liquid freshwater lakes on the Red Planet.',
      uz: 'Mars qumlari bo‘ylab 45 kilometr yo‘l bosdi. Qizil sayyorada qadimda chuchuk suvli ko‘llar mavjud bo‘lganini isbotladi.',
    },
    schematic: 'rover',
  },
  {
    id: 'ginny',
    name: {
      ru: 'Вертолет Ingenuity',
      en: 'Ingenuity Mars Helicopter',
      uz: 'Ingenuity vertolyoti',
    },
    world: {
      ru: 'Марс',
      en: 'Mars',
      uz: 'Mars',
    },
    place: {
      ru: 'Кратер Езеро, Холмы Валинор',
      en: 'Jezero Crater, Valinor Hills',
      uz: 'Jezero krateri, Valinor tepaliklari',
    },
    statusText: {
      ru: 'Стационарный метеопост с 18 января 2024 года',
      en: 'Stationary weather station since January 18, 2024',
      uz: '2024-yil 18-yanvardan buyon doimiy meteopost vazifasida',
    },
    significance: {
      ru: 'Первый винтокрылый полет в атмосфере другого мира. Совершил 72 полета и открыл дорогу будущим пилотируемым винтокрылым миссиям.',
      en: 'First powered aerodynamic flight in another world’s atmosphere. Completed 72 flights and blazed the trail for aerial exploration.',
      uz: 'Boshqa olam atmosferasidagi ilk parrakli parvoz. 72 parvozni amalga oshirdi va kelajakdagi aviatsiya missiyalariga yo‘l ochdi.',
    },
    schematic: 'helicopter',
  }
];

export const TheyRemainGallery: React.FC = () => {
  const { t, localize } = useT();

  return (
    <section id="memorial" className="relative py-24 bg-[#05070b] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.memorial.sectionTag}</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight">
            {t.memorial.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            {t.memorial.subtitle}
          </p>

          <p className="mt-2 text-xs font-mono text-slate-400 max-w-xl mx-auto">
            {t.memorial.disclaimer}
          </p>
        </div>

        {/* Relic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relicItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-slate-800 bg-slate-950/70 p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="text-xs font-mono text-slate-400 uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    <span>{localize(item.world)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{localize(item.place)}</span>
                  </div>

                  <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                    {t.memorial.monumentBadge}
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight mb-2">
                  {localize(item.name)}
                </h3>

                <p className="text-xs text-slate-400 font-mono mb-4">
                  {localize(item.statusText)}
                </p>

                <div className="my-4">
                  <SchematicView
                    type={item.schematic}
                    accentColor={item.id === 'oppy' || item.id === 'ginny' ? '#e11d48' : '#38bdf8'}
                    className="h-44"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {localize(item.significance)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
