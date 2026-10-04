import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, ExternalLink, Sparkles, BookOpen } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface QuizQuestion {
  id: number;
  question: string;
  category: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceTitle: string;
  sourceUrl: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: 'РЕКОРДЫ МАРСА // OPPORTUNITY',
    question: 'Какой рекорд преодоленной дистанции по поверхности другого небесного тела установил ровер Opportunity за 14.5 лет работы?',
    options: [
      '7.73 км (дистанция ровера Spirit)',
      '17.0 км (воздушный километраж вертолета Ingenuity)',
      '45.16 км (превысил марафонскую дистанцию в 42.195 км)',
      '100 метров (дистанция микроровера Sojourner)'
    ],
    correctIndex: 2,
    explanation: 'Opportunity преодолел рекордные 45.16 км (28.06 миль) по пескам кратеров Игл, Виктория и Индевор, став мировым рекордсменом среди всех внеземных колесных аппаратов.',
    sourceTitle: 'NASA JPL MER Mission Status Archive',
    sourceUrl: 'https://mars.nasa.gov/mer/mission/status_opportunityAll.html'
  },
  {
    id: 2,
    category: 'НАУЧНЫЕ ОТКРЫТИЯ // SPIRIT',
    question: 'Какое эпохальное открытие случайно сделал марсоход Spirit благодаря заклинившему правому переднему колесу?',
    options: [
      'Залежи чистого водяного льда в полярной шапке',
      'Пласт 90% чистого кремнезема — след древних гидротермальных источников',
      'Микросферы гематита («марсианскую чернику»)',
      'Перхлораты и зимний снегопад из углекислого газа'
    ],
    correctIndex: 1,
    explanation: 'В 2006 году заклинившее колесо ровера при движении задом наперед вспахало грунт и обнажило белый порошок с 90% содержанием чистого диоксида кремния (кремнезема), неопровержимо доказавший наличие древних горячих термальных источников.',
    sourceTitle: 'NASA JPL Spirit Telemetry Log',
    sourceUrl: 'https://mars.nasa.gov/mer/mission/status_spiritAll.html'
  },
  {
    id: '3' as unknown as number,
    category: 'ЛУННАЯ ПРОГРАММА // АРТЕФАКТЫ APOLLO',
    question: 'По какой реальной причине 30 сентября 1977 года NASA отключило всю лунную сеть сейсмических станций ALSEP?',
    options: [
      'Плутониевые РИТЭГ SNAP-27 полностью исчерпали заряд и перегорели',
      'Сильный метеоритный дождь разбил антенны связи на всех пяти базах',
      'Бюджетные ограничения конгресса США на содержание наземных станций слежения ($5 млн/год)',
      'Аппараты выработали гарантийный срок и были утилизированы взрывом'
    ],
    correctIndex: 2,
    explanation: 'Станции ALSEP были полностью исправны и давали качественные геофизические данные. Отключение носило исключительно финансовый характер из-за сокращения конгрессом бюджета поддержки наземной сети слежения MSFN.',
    sourceTitle: 'NASA History Office: Apollo Expeditions to the Moon (SP-407)',
    sourceUrl: 'https://history.nasa.gov/SP-407/sp407.htm'
  },
  {
    id: 4,
    category: 'АРХЕОЛОГИЯ КОСМОСА // АЛАН ШЕПАРД',
    question: 'Какое расстояние на самом деле преодолел второй мяч для гольфа, запущенный Аланом Шепардом на Луне (вопреки его шутке о «милях и милях»)?',
    options: [
      'Около 37 метров (40 ярдов) по расчетам снимков орбитального зонда LRO',
      'Более 2.5 километров благодаря полному отсутствию воздуха',
      'Около 400 метров до края ближайшего ударного кратера',
      'Мяч не оторвался от грунта из-за неудобной одноручной стойки'
    ],
    correctIndex: 0,
    explanation: 'Шепард воскликнул: «Мяч летит мили и мили!». Однако детальный анализ британского исследователя Энди Сондерса по снимкам лунного зонда NASA LRO показал, что первый мяч пролетел 22 метра, а второй — около 37 метров.',
    sourceTitle: 'NASA Apollo Lunar Surface Journal (Apollo 14 EVA-2)',
    sourceUrl: 'https://history.nasa.gov/alsj/a14/a14.eva2.html'
  },
  {
    id: 5,
    category: 'СОВРЕМЕННЫЙ СТАТУС // INGENUITY',
    question: 'В каком рабочем статусе пребывает марсианский вертолет Ingenuity после поломки лопасти в 72-м полете?',
    options: [
      'Полностью обесточен и разобран марсоходом Perseverance на запчасти',
      'Переведен в статус стационарной метеорологической станции с ежедневным сбором данных',
      'Законсервирован в герметичном защитном контейнере под днищем ровера',
      'Переведен на малые планирующие прыжки на высоту не более 50 сантиметров'
    ],
    correctIndex: 1,
    explanation: 'Вертолет не погиб: команда инженеров JPL обновила его бортовую прошивку. Ingenuity просыпается каждое марсианское утро, замеряет температуру и скорость ветра и записывает данные во флэш-память для будущих экспедиций.',
    sourceTitle: 'NASA Headquarters Release 24-009',
    sourceUrl: 'https://www.nasa.gov/news-release/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/'
  }
];

export const QuizSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [answersHistory, setAnswersHistory] = useState<Array<{ questionId: number; selected: number; isCorrect: boolean }>>([]);

  const currentQ = quizQuestions[currentIndex];
  const isAnswered = selectedOption !== null;

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    const isCorrect = index === currentQ.correctIndex;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      spaceAudio.playTelemetryBeep(1400, 0.08);
    } else {
      spaceAudio.playTelemetryBeep(450, 0.12);
    }

    setAnswersHistory((prev) => [
      ...prev,
      {
        questionId: Number(currentQ.id),
        selected: index,
        isCorrect
      }
    ]);
  };

  const handleNextQuestion = () => {
    spaceAudio.playTelemetryBeep(1100, 0.03);
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    spaceAudio.playTelemetryBeep(1200, 0.04);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsCompleted(false);
    setAnswersHistory([]);
  };

  // Rank calculation based on final score
  const getRank = () => {
    if (score === 5) {
      return {
        title: 'ГЛАВНЫЙ ИССЛЕДОВАТЕЛЬ NASA // ЭКСПЕРТ ВНЕЗЕМНОГО НАСЛЕДИЯ',
        desc: 'Безупречный результат! Вы в совершенстве знаете судьбы и подлинную историю всех аппаратов, оставшихся на Луне и Марсе.',
        color: 'text-amber-400',
        badge: 'ЗВЕЗДНЫЙ РАНГ'
      };
    }
    if (score >= 3) {
      return {
        title: 'ОПЕРАТОР ЦУП В ХЬЮСТОНЕ // ОТЛИЧНОЕ ЗНАНИЕ АРХИВА',
        desc: 'Отличный уровень знаний. Вы уверенно отличаете подлинные научные факты от журналистских мифов.',
        color: 'text-cyan-400',
        badge: 'СЕРТИФИКАТ ЦУП'
      };
    }
    return {
      title: 'СТАЖЕР КОСМИЧЕСКОЙ ПРОГРАММЫ',
      desc: 'Хорошее начало! Рекомендуем повторно изучить хроники миссий и вернуться к тесту.',
      color: 'text-slate-300',
      badge: 'НАЧАЛЬНЫЙ КУРС'
    };
  };

  return (
    <section id="quiz" className="relative py-24 bg-[#04070d] border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>ПРОВЕРКА ЗНАНИЙ // ТЕСТ АРХИВАРИУСА</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            ВИКТОРИНА: БРОШЕННАЯ, НО НЕ ЗАБЫТАЯ
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Проверьте, насколько внимательно вы изучили судьбы космических аппаратов и артефактов на Луне и Марсе.
          </p>
        </div>

        {/* Quiz Container Card */}
        <div className="rounded-2xl border border-slate-800 bg-[#070c16] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {!isCompleted ? (
            <div>
              {/* Progress Bar & Counter Header */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">ВОПРОС {currentIndex + 1} ИЗ {quizQuestions.length}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-500 hidden sm:inline">{currentQ.category}</span>
                </div>
                <div className="text-slate-400 font-mono-tabular">
                  Счёт: <span className="text-emerald-400 font-bold">{score}</span> / {quizQuestions.length}
                </div>
              </div>

              {/* Progress Steps Indicators */}
              <div className="grid grid-cols-5 gap-1.5 mb-8">
                {quizQuestions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx < currentIndex
                        ? 'bg-emerald-500'
                        : idx === currentIndex
                        ? 'bg-amber-400'
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>

              {/* Question Text */}
              <div className="mb-8">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">
                  {currentQ.question}
                </h3>
              </div>

              {/* 4 Answer Options */}
              <div className="space-y-3 mb-8">
                {currentQ.options.map((optionText, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isCorrect = optIdx === currentQ.correctIndex;

                  let cardStyle = 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50 text-slate-200';

                  if (isAnswered) {
                    if (isCorrect) {
                      cardStyle = 'bg-emerald-950/40 border-emerald-500 text-white shadow-lg shadow-emerald-950/30';
                    } else if (isSelected) {
                      cardStyle = 'bg-rose-950/40 border-rose-500 text-slate-200';
                    } else {
                      cardStyle = 'bg-slate-950/30 border-slate-900 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-xl border text-left font-mono text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${cardStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border ${
                          isAnswered && isCorrect
                            ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300'
                            : isAnswered && isSelected
                            ? 'border-rose-400 bg-rose-500/20 text-rose-300'
                            : 'border-slate-700 bg-slate-900 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed">{optionText}</span>
                      </div>

                      {isAnswered && (
                        <div className="shrink-0">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : isSelected ? (
                            <XCircle className="w-5 h-5 text-rose-400" />
                          ) : null}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation Box */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 mb-6"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase">
                      {selectedOption === currentQ.correctIndex ? (
                        <span className="text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          ВЕРНО!
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1.5">
                          <XCircle className="w-4 h-4" />
                          НЕВЕРНО
                        </span>
                      )}
                      <span className="text-slate-500">· ОБЪЯСНЕНИЕ МАТЕРИАЛА</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {currentQ.explanation}
                    </p>

                    <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>Источник факта:</span>
                      <a
                        href={currentQ.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 transition-colors"
                      >
                        <span className="truncate max-w-[280px]">{currentQ.sourceTitle}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Question Control */}
              {isAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs uppercase font-bold tracking-wider rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-amber-950/40"
                  >
                    <span>{currentIndex < quizQuestions.length - 1 ? 'СЛЕДУЮЩИЙ ВОПРОС' : 'ПОСМОТРЕТЬ РЕЗУЛЬТАТЫ'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Final Score & Retake Screen */
            <div className="text-center py-6 sm:py-10 space-y-6">
              <div className="inline-flex p-4 rounded-full bg-slate-950 border border-slate-800 text-amber-400 mb-2">
                <Award className="w-12 h-12" />
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">
                  ИТОГОВЫЙ СЧЁТ
                </div>
                <div className="font-display text-5xl sm:text-6xl font-black text-white font-mono-tabular">
                  {score} <span className="text-slate-600 text-3xl sm:text-4xl">/ 5</span>
                </div>
              </div>

              {/* Rank Evaluation Card */}
              {(() => {
                const rank = getRank();
                return (
                  <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 max-w-lg mx-auto text-center space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-amber-400 bg-amber-950/50 border border-amber-800/40 px-2.5 py-0.5 rounded">
                      {rank.badge}
                    </span>
                    <h4 className={`font-display text-lg sm:text-xl font-bold uppercase pt-1 ${rank.color}`}>
                      {rank.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {rank.desc}
                    </p>
                  </div>
                );
              })()}

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleRestartQuiz}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs uppercase font-bold tracking-wider rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4 text-cyan-400" />
                  <span>ПРОЙТИ ЕЩЁ РАЗ</span>
                </button>

                <a
                  href="#last-signal"
                  className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs uppercase font-bold tracking-wider rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>ВЕРНУТЬСЯ К АРХИВУ</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
