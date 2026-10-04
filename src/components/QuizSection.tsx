import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, ExternalLink, Sparkles } from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { LocalizedText } from '../i18n/types';
import { useT } from '../i18n/LanguageContext';

interface QuizQuestion {
  id: number;
  category: LocalizedText;
  question: LocalizedText;
  options: LocalizedText[];
  correctIndex: number;
  explanation: LocalizedText;
  sourceTitle: string;
  sourceUrl: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: {
      ru: 'РЕКОРДЫ МАРСА // OPPORTUNITY',
      en: 'MARS RECORDS // OPPORTUNITY',
      uz: 'MARS REKORDLARI // OPPORTUNITY',
    },
    question: {
      ru: 'Какой рекорд преодоленной дистанции по поверхности другого небесного тела установил ровер Opportunity за 14.5 лет работы?',
      en: 'What off-Earth surface driving distance record did the Opportunity rover achieve during its 14.5-year mission?',
      uz: 'Opportunity roveri 14.5 yillik faoliyati davomida boshqa samoviy jism yuzasida qanday masofa rekordini o‘rnatdi?',
    },
    options: [
      { ru: '7.73 км (дистанция ровера Spirit)', en: '7.73 km (Spirit rover total)', uz: '7.73 km (Spirit roveri masofasi)' },
      { ru: '17.0 км (воздушный километраж вертолета Ingenuity)', en: '17.0 km (Ingenuity flight distance)', uz: '17.0 km (Ingenuity parvoz masofasi)' },
      { ru: '45.16 км (превысил марафонскую дистанцию в 42.195 км)', en: '45.16 km (surpassed marathon length of 42.195 km)', uz: '45.16 km (42.195 km marafon masofasidan oshib ketdi)' },
      { ru: '100 метров (дистанция микроровера Sojourner)', en: '100 meters (Sojourner micro-rover distance)', uz: '100 metr (Sojourner mikroroveri masofasi)' }
    ],
    correctIndex: 2,
    explanation: {
      ru: 'Opportunity преодолел рекордные 45.16 км (28.06 миль) по пескам кратеров Игл, Виктория и Индевор, став мировым рекордсменом среди всех внеземных колесных аппаратов.',
      en: 'Opportunity traversed an off-Earth record 45.16 km (28.06 miles) across craters Eagle, Victoria, and Endeavour, setting the all-time extraterrestrial wheeled roving record.',
      uz: 'Opportunity Igl, Viktoriya va Endeavour kraterlari bo‘ylab rekord darajadagi 45.16 km (28.06 milya) masofani bosib o‘tib, barcha g‘ildirakli kosmik apparatlar orasida jahon rekordchisi bo‘ldi.',
    },
    sourceTitle: 'NASA Science: MER Opportunity Overview',
    sourceUrl: 'https://science.nasa.gov/mission/mer-opportunity/'
  },
  {
    id: 2,
    category: {
      ru: 'НАУЧНЫЕ ОТКРЫТИЯ // SPIRIT',
      en: 'SCIENTIFIC DISCOVERY // SPIRIT',
      uz: 'ILMIY KASHFIYOTLAR // SPIRIT',
    },
    question: {
      ru: 'Какое эпохальное открытие случайно сделал марсоход Spirit благодаря заклинившему правому переднему колесу?',
      en: 'What landmark discovery did the Spirit rover stumble upon due to its jammed front-right wheel?',
      uz: 'Spirit marsyurari qotib qolgan old o‘ng g‘ildiragi tufayli tasodifan qanday ulkan kashfiyot qildi?',
    },
    options: [
      { ru: 'Залежи чистого водяного льда в полярной шапке', en: 'Pure water ice deposits in polar cap', uz: 'Qutb qoplamidagi sof muz qatlamlari' },
      { ru: 'Пласт 90% чистого кремнезема — след древних гидротермальных источников', en: 'Layer of 90% pure silica — evidence of ancient hydrothermal springs', uz: '90% sof kremnezyom qatlami — qadimiy gidrotermal buloqlar izi' },
      { ru: 'Микросферы гематита («марсианскую чернику»)', en: 'Hematite spherules (“Martian blueberries”)', uz: 'Gematit sharchalari («Mars qorag‘atlari»)' },
      { ru: 'Перхлораты и зимний снегопад из углекислого газа', en: 'Perchlorates and winter dry-ice snowfalls', uz: 'Perxloratlar va karbonat angidrid qor yog‘ishi' }
    ],
    correctIndex: 1,
    explanation: {
      ru: 'В 2006 году заклинившее колесо ровера при движении задом наперед вспахало грунт и обнажило белый порошок с 90% содержанием чистого диоксида кремния (кремнезема), неопровержимо доказавший наличие древних горячих термальных источников.',
      en: 'In 2006, dragging its frozen front wheel in reverse churned the soil and exposed a patch of 90% pure silica, providing irrefutable proof of past habitable hydrothermal springs or fumaroles.',
      uz: '2006-yilda roverning qotib qolgan g‘ildiragi orqaga harakatlanganda tuproqni ag‘darib, 90% sof kremniy dioksidi (kremnezyom) kukunini ochib berdi, bu esa qadimda qaynoq termal buloqlar bo‘lganini isbotladi.',
    },
    sourceTitle: 'NASA Science: MER Spirit Overview',
    sourceUrl: 'https://science.nasa.gov/mission/mer-spirit/'
  },
  {
    id: 3,
    category: {
      ru: 'ЛУННАЯ ПРОГРАММА // АРТЕФАКТЫ APOLLO',
      en: 'LUNAR PROGRAM // APOLLO RELICS',
      uz: 'OY DASTURI // APOLLO YODGORLIKLARI',
    },
    question: {
      ru: 'По какой реальной причине 30 сентября 1977 года NASA отключило всю лунную сеть сейсмических станций ALSEP?',
      en: 'What was the true reason NASA deactivated the entire ALSEP lunar seismic station network on September 30, 1977?',
      uz: '1977-yil 30-sentyabrda NASA nima sababdan Oydagi barcha ALSEP seysmik stansiyalar tarmog‘ini o‘chirib qo‘ydi?',
    },
    options: [
      { ru: 'Плутониевые РИТЭГ SNAP-27 полностью исчерпали заряд и перегорели', en: 'SNAP-27 plutonium RTGs exhausted all charge and burnt out', uz: 'SNAP-27 plutoniy generatorlari to‘liq tugab, yonib ketdi' },
      { ru: 'Сильный метеоритный дождь разбил антенны связи на всех пяти базах', en: 'Severe meteor shower destroyed antennas at all five sites', uz: 'Kuchli meteorit yomg‘iri barcha 5 bazadagi antennalarni sindirdi' },
      { ru: 'Бюджетные ограничения конгресса США на содержание наземных станций слежения ($5 млн/год)', en: 'US congressional budget cuts for operating ground tracking network ($5M/yr)', uz: 'AQSh Kongressining Yer kuzatuv tarmog‘ini saqlash byudjetini qisqartirishi (yiliga 5 mln dollar)' },
      { ru: 'Аппараты выработали гарантийный срок и были утилизированы взрывом', en: 'Stations reached warranty limit and were detonated', uz: 'Apparatlar kafolat muddatini o‘tab bo‘lgach, portlatilgan' }
    ],
    correctIndex: 2,
    explanation: {
      ru: 'Станции ALSEP были полностью исправны и давали качественные геофизические данные. Отключение носило исключительно финансовый характер из-за сокращения конгрессом бюджета поддержки наземной сети слежения MSFN.',
      en: 'ALSEP stations remained fully functional and generating prime science. Shutdown was purely budgetary due to congressional termination of MSFN ground tracking station funding.',
      uz: 'ALSEP stansiyalari butunlay soz holatda bo‘lib, sifatli geofizik ma’lumotlar berib turgan. O‘chirish sababi faqatgina Kongress tomonidan MSFN kuzatuv tarmog‘i byudjeti to‘xtatilgani bilan bog‘liq bo‘lgan.',
    },
    sourceTitle: 'NASA History Office: Apollo Expeditions to the Moon (SP-407)',
    sourceUrl: 'https://history.nasa.gov/SP-407/sp407.htm'
  },
  {
    id: 4,
    category: {
      ru: 'АРХЕОЛОГИЯ КОСМОСА // АЛАН ШЕПАРД',
      en: 'SPACE ARCHAEOLOGY // ALAN SHEPARD',
      uz: 'FAZO ARXEOLOGIYASI // ALAN SHEPARD',
    },
    question: {
      ru: 'Какое расстояние на самом деле преодолел второй мяч для гольфа, запущенный Аланом Шепардом на Луне (вопреки его шутке о «милях и милях»)?',
      en: 'What distance did Alan Shepard’s second lunar golf ball actually travel (contrary to his quip about “miles and miles”)?',
      uz: 'Alan Shepardning Oydagi ikkinchi golf to‘pi aslida qancha masofaga uchib borgan (uning «millar va millar» degan haziliga zid ravishda)?',
    },
    options: [
      { ru: 'Около 37 метров (40 ярдов) по расчетам снимков орбитального зонда LRO', en: 'About 37 meters (40 yards) based on LRO orbiter image analysis', uz: 'LRO sun’iy yo‘ldoshi suratlari tahliliga ko‘ra taxminan 37 metr (40 yard)' },
      { ru: 'Более 2.5 километров благодаря полному отсутствию воздуха', en: 'Over 2.5 kilometers due to total vacuum', uz: 'Havo yo‘qligi sababli 2.5 kilometrdan ortiq' },
      { ru: 'Около 400 метров до края ближайшего ударного кратера', en: 'Roughly 400 meters to nearby crater rim', uz: 'Yaqin krater chetigacha qariyb 400 metr' },
      { ru: 'Мяч не оторвался от грунта из-за неудобной одноручной стойки', en: 'Ball failed to lift off due to one-handed swing', uz: 'Bir qo‘llab zarba berish noqulayligi sabab to‘p yerdan ko‘tarilmadi' }
    ],
    correctIndex: 0,
    explanation: {
      ru: 'Шепард воскликнул: «Мяч летит мили и мили!». Однако детальный анализ британского исследователя Энди Сондерса по снимкам лунного зонда NASA LRO показал, что первый мяч пролетел 22 метра, а второй — около 37 метров.',
      en: 'Shepard exclaimed “miles and miles and miles!” But imaging analysis by British researcher Andy Saunders with NASA LRO orbiter frames proved the first ball flew 22 meters and the second roughly 37 meters.',
      uz: 'Shepard: «To‘p millar va millar nariga uchmoqda!» deb hayqirgan edi. Biroq britaniyalik tadqiqotchi Endi Sondersning NASA LRO suratlari bo‘yicha tahlili shuni ko‘rsatdiki, birinchi to‘p 22 metr, ikkinchisi esa 37 metr uchgan.',
    },
    sourceTitle: 'NASA Apollo Lunar Surface Journal (Apollo 14 EVA-2)',
    sourceUrl: 'https://history.nasa.gov/alsj/a14/a14.eva2.html'
  },
  {
    id: 5,
    category: {
      ru: 'СОВРЕМЕННЫЙ СТАТУС // INGENUITY',
      en: 'CURRENT STATUS // INGENUITY',
      uz: 'HOZIRGI HOLATI // INGENUITY',
    },
    question: {
      ru: 'В каком рабочем статусе пребывает марсианский вертолет Ingenuity после поломки лопасти в 72-м полете?',
      en: 'What operational status does the Ingenuity Mars Helicopter maintain following rotor damage on Flight 72?',
      uz: 'Ingenuity Mars vertolyoti 72-parvozdagi parrak sinishidan so‘ng qanday ish holatida turibdi?',
    },
    options: [
      { ru: 'Полностью обесточен и разобран марсоходом Perseverance на запчасти', en: 'Fully powered down and scavenged for parts by Perseverance', uz: 'To‘liq o‘chirilgan va Perseverance uning qismlarini yechib olgan' },
      { ru: 'Переведен в статус стационарной метеорологической станции с ежедневным сбором данных', en: 'Repurposed as a permanent weather station logging telemetry daily', uz: 'Kunlik ma’lumotlarni qayd etuvchi statsionar meteostansiya holatiga o‘tkazilgan' },
      { ru: 'Законсервирован в герметичном защитном контейнере под днищем ровера', en: 'Mothballed inside hermetic enclosure under rover chassis', uz: 'Rover ostidagi germetik konteynerda konservatsiya qilingan' },
      { ru: 'Переведен на малые планирующие прыжки на высоту не более 50 сантиметров', en: 'Restricted to shallow hops under 50 centimeters', uz: '50 santimetrdan oshmaydigan kichik sakrashlarga o‘tkazilgan' }
    ],
    correctIndex: 1,
    explanation: {
      ru: 'Вертолет не погиб: команда инженеров JPL обновила его бортовую прошивку. Ingenuity просыпается каждое марсианское утро, замеряет температуру и скорость ветра и записывает данные во флэш-память для будущих экспедиций.',
      en: 'Ingenuity survived: JPL engineers updated its firmware. The helicopter awakens every Martian morning to log sensor parameters and temperatures into flash memory for future expeditions.',
      uz: 'Vertolyot ishdan chiqmadi: JPL muhandislari uning dasturini yangiladi. Ingenuity har Mars tongida uyg‘onadi, harorat va shamol tezligini o‘lchaydi hamda ma’lumotlarni kelajak missiyalari uchun xotiraga yozadi.',
    },
    sourceTitle: 'NASA Headquarters Release 24-009',
    sourceUrl: 'https://www.nasa.gov/news-release/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/'
  }
];

export const QuizSection: React.FC = () => {
  const { t, localize } = useT();
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
        questionId: currentQ.id,
        selected: index,
        isCorrect
      }
    ]);
  };

  const handleNextQuestion = () => {
    spaceAudio.playTelemetryBeep(1100, 0.04);
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    spaceAudio.playTelemetryBeep(1200, 0.05);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsCompleted(false);
    setAnswersHistory([]);
  };

  const getRankData = () => {
    if (score === 5) {
      return {
        badge: t.quiz.rankBadgeMaster,
        title: t.quiz.rankTitleMaster,
        desc: t.quiz.rankDescMaster,
        color: 'text-amber-400',
        borderColor: 'border-amber-500/60',
        bgGradient: 'from-amber-950/40 via-slate-900/60 to-slate-950'
      };
    }
    if (score >= 3) {
      return {
        badge: t.quiz.rankBadgeOperator,
        title: t.quiz.rankTitleOperator,
        desc: t.quiz.rankDescOperator,
        color: 'text-cyan-400',
        borderColor: 'border-cyan-500/60',
        bgGradient: 'from-cyan-950/40 via-slate-900/60 to-slate-950'
      };
    }
    return {
      badge: t.quiz.rankBadgeTrainee,
      title: t.quiz.rankTitleTrainee,
      desc: t.quiz.rankDescTrainee,
      color: 'text-slate-300',
      borderColor: 'border-slate-700',
      bgGradient: 'from-slate-900/60 via-slate-900/40 to-slate-950'
    };
  };

  return (
    <section id="quiz" className="relative py-24 bg-[#04060a] border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.quiz.sectionTag}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {t.quiz.title}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            {t.quiz.subtitle}
          </p>
        </div>

        {!isCompleted ? (
          /* Single Question Card Viewport */
          <div className="bg-[#070b12] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
            {/* Top Meta Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {t.quiz.questionCount} {currentIndex + 1} / {quizQuestions.length}
                </span>
              </div>

              <div className="text-xs font-mono text-slate-400">
                {t.quiz.scoreCount} <span className="text-white font-bold">{score}</span>
              </div>
            </div>

            {/* Question Category Tag */}
            <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-2">
              {localize(currentQ.category)}
            </div>

            {/* Question Text */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-tight mb-8 leading-snug">
              {localize(currentQ.question)}
            </h3>

            {/* 4 Options Grid */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                const showSuccess = isAnswered && isCorrect;
                const showFailure = isAnswered && isSelected && !isCorrect;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-xl text-left text-sm font-sans transition-all flex items-center justify-between border ${
                      showSuccess
                        ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg shadow-emerald-950/40'
                        : showFailure
                        ? 'bg-rose-950/60 border-rose-500 text-white shadow-lg shadow-rose-950/40'
                        : isAnswered && !isSelected
                        ? 'bg-slate-950/50 border-slate-900 text-slate-500 cursor-not-allowed'
                        : 'bg-slate-950/90 border-slate-800 text-slate-200 hover:border-slate-600 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono shrink-0 border ${
                        showSuccess
                          ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300'
                          : showFailure
                          ? 'border-rose-400 bg-rose-500/20 text-rose-300'
                          : 'border-slate-700 bg-slate-900 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="font-medium">{localize(opt)}</span>
                    </div>

                    {showSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />}
                    {showFailure && <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback & Explanation Card */}
            {isAnswered && (
              <div className="p-5 rounded-xl border bg-slate-950/90 border-slate-800 space-y-3 mb-8 animate-fadeIn">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
                  {selectedOption === currentQ.correctIndex ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      {t.quiz.correctLabel}
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1 font-bold">
                      <XCircle className="w-4 h-4" />
                      {t.quiz.incorrectLabel}
                    </span>
                  )}
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400">{t.quiz.explanationTag}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {localize(currentQ.explanation)}
                </p>

                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">{t.quiz.sourceLabel}</span>
                  <a
                    href={currentQ.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>{currentQ.sourceTitle}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Next Question / View Results Button */}
            {isAnswered && (
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs uppercase tracking-wider font-bold rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-amber-950/30"
                >
                  <span>
                    {currentIndex < quizQuestions.length - 1 ? t.quiz.nextBtn : t.quiz.resultsBtn}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Final Results Scorecard View */
          <div className="bg-[#070b12] border border-slate-800 rounded-2xl p-6 sm:p-12 shadow-2xl text-center space-y-8">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">
                {t.quiz.finalScoreTitle}
              </div>
              <div className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight font-mono-tabular">
                {score} <span className="text-2xl sm:text-3xl text-slate-600 font-normal">/ {quizQuestions.length}</span>
              </div>
            </div>

            {/* Rank Evaluation Card */}
            {(() => {
              const rank = getRankData();
              return (
                <div className={`p-6 rounded-xl border ${rank.borderColor} bg-gradient-to-br ${rank.bgGradient} max-w-xl mx-auto space-y-2`}>
                  <div className={`text-xs font-mono font-bold tracking-widest uppercase ${rank.color}`}>
                    ★ {rank.badge} ★
                  </div>
                  <div className="text-lg font-display font-bold text-white uppercase">
                    {rank.title}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {rank.desc}
                  </p>
                </div>
              );
            })()}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={handleRestartQuiz}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs uppercase tracking-wider font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-950/30"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.quiz.retakeBtn}</span>
              </button>

              <a
                href="#worlds"
                onClick={() => spaceAudio.playTelemetryBeep(1000, 0.03)}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center"
              >
                {t.quiz.returnBtn}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
