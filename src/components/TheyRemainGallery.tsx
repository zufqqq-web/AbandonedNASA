import React from 'react';
import { motion } from 'motion/react';
import { SchematicView } from './SchematicView';
import { ShieldCheck, Compass, Sparkles, MapPin } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface RelicItem {
  id: string;
  name: string;
  world: string;
  place: string;
  statusText: string;
  significance: string;
  schematic: 'lander' | 'rover-buggy' | 'rover' | 'helicopter';
}

const relicItems: RelicItem[] = [
  {
    id: 'apollo11',
    name: 'Посадочная ступень LM-5 «Eagle»',
    world: 'Луна',
    place: 'База Спокойствия',
    statusText: 'Находится в вакууме с 21 июля 1969 года',
    significance: 'Первая посадочная площадка человека вне Земли. Золотая фольга, алюминиевые опоры и табличка «Мы пришли с миром» остаются невредимыми.',
    schematic: 'lander',
  },
  {
    id: 'lrv1',
    name: 'Луномобиль LRV-001 (Apollo 15)',
    world: 'Луна',
    place: 'Борозда Хэдли',
    statusText: 'Запаркован на VIP-стоянке со 2 августа 1971 года',
    significance: 'Первый четырехколесный автомобиль на чужом небесном теле. Телекамера навсегда направлена в сторону стартовой площадки взлетного модуля Falcon.',
    schematic: 'rover-buggy',
  },
  {
    id: 'oppy',
    name: 'Ровер Opportunity (MER-B)',
    world: 'Марс',
    place: 'Кратер Индевор, Долина Настойчивости',
    statusText: 'Покоится под тонким слоем пыли с 10 июня 2018 года',
    significance: 'Прошел 45 километров по марсианским пескам. Доказал существование древних пресных озер и рек на Красной планете.',
    schematic: 'rover',
  },
  {
    id: 'ginny',
    name: 'Вертолет Ingenuity',
    world: 'Марс',
    place: 'Кратер Езеро, Холмы Валинор',
    statusText: 'Стационарный метеопост с 18 января 2024 года',
    significance: 'Первый винтокрылый полет в атмосфере другого мира. Совершил 72 полета и открыл дорогу будущим пилотируемым винтокрылым миссиям.',
    schematic: 'helicopter',
  }
];

export const TheyRemainGallery: React.FC = () => {
  return (
    <section id="memorial" className="relative py-24 bg-[#05070b] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>05 // ВНЕЗЕМНОЕ НАСЛЕДИЕ ЧЕЛОВЕЧЕСТВА</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight">
            ОНИ НЕ ВЕРНУЛИСЬ.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Но каждый из них оставил после себя данные, открытия и бессмертную историю земной цивилизации.
          </p>

          <p className="mt-2 text-xs font-mono text-slate-400 max-w-xl mx-auto">
            Они не являются космическим мусором. Согласно международным конвенциям о защите космического наследия, это первые исторические памятники человека на других мирах.
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
                    <span>{item.world}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.place}</span>
                  </div>

                  <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                    ПАМЯТНИК КАТАЛОГА
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight mb-2">
                  {item.name}
                </h3>

                <p className="text-xs text-slate-400 font-mono mb-4">
                  {item.statusText}
                </p>

                <div className="my-4">
                  <SchematicView
                    type={item.schematic}
                    accentColor={item.world === 'Марс' ? '#e11d48' : '#38bdf8'}
                    className="h-44"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.significance}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
