import { Mission } from '../types/mission';

export const missionsData: Mission[] = [
  {
    id: 'opportunity',
    name: {
      ru: 'Оппортьюнити',
      en: 'Opportunity',
      uz: 'Opportunity',
    },
    englishName: 'Opportunity (MER-B)',
    designation: 'MER-B (Mars Exploration Rover — B)',
    destination: 'Mars',
    type: {
      ru: 'Ровер',
      en: 'Rover',
      uz: 'Rover (Marsyurar)',
    },
    launchDate: '7 июля 2003',
    landingDate: '25 января 2004',
    lastContactDate: '10 июня 2018 (офиц. 13 февраля 2019)',
    activeSpan: '2004 — 2018',
    status: {
      ru: 'Миссия завершена (пылевая буря)',
      en: 'Mission complete (global dust storm)',
      uz: 'Missiya yakunlandi (global chang bo‘roni)',
    },
    statusType: 'silent',
    coordinates: {
      lat: '2.28° S',
      lon: '354.6° E',
      latNum: -2.28,
      lonNum: -5.4,
      formatted: '2°16′48″ ю. ш. 5°24′00″ з. д.',
    },
    nasaSearchQuery: 'Opportunity rover Mars Endeavour crater',
    locationName: {
      ru: 'Кратер Индевор, Долина Настойчивости (Perseverance Valley)',
      en: 'Endeavour Crater, Perseverance Valley',
      uz: 'Endeavour krateri, Sabr vodiysi (Perseverance Valley)',
    },
    missionDuration: {
      ru: '14 лет 4 месяца 16 дней (5 111 солов; план: 90 солов)',
      en: '14 years 4 months 16 days (5,111 sols; planned: 90 sols)',
      uz: '14 yil 4 oy 16 kun (5 111 sol; reja: 90 sol)',
    },
    distanceTraveled: {
      ru: '45.16 км (рекорд для внеземных колесных аппаратов)',
      en: '45.16 km (off-Earth roving distance record)',
      uz: '45.16 km (Yer tashqarisidagi g‘ildirakli apparatlar rekordi)',
    },
    image: '',
    schematicType: 'rover',
    shortDescription: {
      ru: 'Легендарный марсоход, рассчитанный на 90 дней, проработавший почти 15 лет и преодолевший марафонскую дистанцию по пескам Марса.',
      en: 'Legendary Mars rover designed for 90 days that operated for nearly 15 years, covering an extraterrestrial marathon distance.',
      uz: '90 kunga mo‘ljallangan, deyarli 15 yil ishlab, Mars qumlari bo‘ylab marafon masofasini bosib o‘tgan afsonaviy marsyurar.',
    },
    howGotThere: {
      ru: 'Запущен ракетой-носителем Delta II 7925H с космодрома на мысе Канаверал. После 6 месяцев перелета совершил посадку с помощью теплозащитного экрана, парашюта и тормозных двигателей, а на финальном этапе опустился в коконе из надувных амортизационных подушек безопасности (airbags), отскочив от марсианского грунта десятки раз и закатившись прямо на дно небольшого кратера Игл (Eagle).',
      en: 'Launched aboard a Delta II 7925H rocket from Cape Canaveral. After a 6-month cruise, it entered the Martian atmosphere using a heat shield, parachute, and retrorockets, landing inside an airbag cocoon that bounced dozens of times before rolling right into Eagle Crater.',
      uz: 'Kanaveral burnidan Delta II 7925H raketasida uchirilgan. 6 oylik parvozdan so‘ng issiqlik qalqoni, parashyut va tormoz dvigatellari yordamida kirdi hamda havo yostiqchalari (airbag) ichida o‘nlab bor sakrab, to‘g‘ri Igl (Eagle) krateri tubiga to‘xtadi.',
    },
    whatDidItDo: {
      ru: 'Главное открытие века: обнаружил минералы «черника» (гематитовые микросферы) и слоистые осадочные породы, доказавшие, что в древности на Марсе долгое время находились водоемы с жидкой водой, пригодной для микробной жизни. Исследовал гигантские кратеры Виктория и Индевор, проведя спектроскопию сотен образцов пород.',
      en: 'Discovery of the century: uncovered hematite spherules ("blueberries") and layered sedimentary rocks proving ancient Mars sustained liquid, neutral-to-acidic water bodies. Investigated Victoria and Endeavour craters, performing in-situ spectroscopy on hundreds of geological targets.',
      uz: 'Asr kashfiyoti: qadimgi Marsda mikroorganizmlar yashashi mumkin bo‘lgan suyuq suv havzalari bo‘lganini isbotlovchi «qorag‘at» (gematit sharchalari) va qatlamli cho‘kindi jinslarni topdi. Viktoriya va Endeavour kraterlarini o‘rganib, yuzlab jins namunalarini tahlil qildi.',
    },
    lastContactStory: {
      ru: 'В конце мая 2018 года над долиной Настойчивости разразилась беспрецедентная глобальная пылевая буря, заслонившая 99% солнечного света. 10 июня 2018 года (Сол 5111) марсоход передал последнюю телеметрию: уровень выработки энергии солнечными батареями упал до критических 22 ватт-часов. По оценке команды миссии JPL, ровер замерз в условиях марсианской ночи из-за необратимого истощения аккумуляторов. Инженеры NASA отправили более тысячи команд на пробуждение в течение 8 месяцев, но аппарат так и не ответил.',
      en: 'In late May 2018, an unprecedented planetary dust storm engulfed Perseverance Valley, blotting out 99% of sunlight. On June 10, 2018 (Sol 5111), the rover transmitted its final telemetry: solar generation plummeted to a critical 22 Wh. JPL engineers estimated the rover froze in Martian night following battery depletion. Over 1,000 recovery commands went unanswered.',
      uz: '2018-yil may oyi oxirida Sabr vodiysida Quyosh nurining 99% qismini to‘sib qo‘ygan misli ko‘rilmagan global chang bo‘roni ko‘tarildi. 2018-yil 10-iyunda (Sol 5111) rover so‘nggi telemetriyani uzatdi: quvvat ishlab chiqarish 22 Vt·soatgacha tushib ketdi. JPL jamoasi hisobiga ko‘ra, akkumulyatorlar to‘liq tugab, apparat Mars tunida muzlab qoldi.',
    },
    whereIsItNow: {
      ru: 'Оппортьюнити неподвижно стоит на западном склоне кратера Индевор в Долине Настойчивости под слабым марсианским ветром, покрытый тончайшим налетом охристой марсианской пыли. Он сохраняется как памятник триумфу инженерии.',
      en: 'Opportunity rests motionless on the western rim of Endeavour Crater in Perseverance Valley under gentle Martian breezes, coated in fine ochre dust — preserved as a monument to human engineering.',
      uz: 'Opportunity Endeavour kraterining g‘arbiy yonbag‘rida, Sabr vodiysida sokin Mars shamollari ostida, mayin sarg‘ish chang bilan qoplangan holda muhandislik zafari yodgorligi sifatida turibdi.',
    },
    source: 'https://science.nasa.gov/mission/mer-opportunity/',
    quote: {
      text: {
        ru: 'Моя батарея разряжена, и вокруг темнеет (My battery is low and it\'s getting dark)',
        en: 'My battery is low and it\'s getting dark',
        uz: 'Batareyam quvvatsizlandi va atrof qorong‘ilashmoqda (My battery is low and it\'s getting dark)',
      },
      speaker: {
        ru: 'Джейкоб Марголис (журналист KPCC / NPR, интерпретация телеметрии JPL)',
        en: 'Jacob Margolis (KPCC / NPR science journalist, poetic interpretation of JPL telemetry)',
        uz: 'Jeykob Margolis (KPCC / NPR jurnalisti, JPL telemetriyasining ommabop talqini)',
      },
      context: {
        ru: '10 июня 2018 (Сол 5111)',
        en: 'June 10, 2018 (Sol 5111)',
        uz: '2018-yil 10-iyun (Sol 5111)',
      },
      type: 'interpretation',
      typeLabel: {
        ru: 'Интерпретация',
        en: 'Interpretation',
        uz: 'Talqin',
      },
      sourceUrl: 'https://www.npr.org/2019/02/13/694354249/opportunity-rover-falls-silent-on-mars'
    },
    specs: [
      {
        label: { ru: 'Стартовая масса', en: 'Launch Mass', uz: 'Uchish massasi' },
        value: { ru: '185 кг', en: '185 kg', uz: '185 kg' }
      },
      {
        label: { ru: 'Источник питания', en: 'Power Source', uz: 'Quvvat manbai' },
        value: { ru: 'Солнечные батареи (до 140 Вт) + литий-ионные АКБ', en: 'Solar array (up to 140 W) + Li-ion batteries', uz: 'Quyosh panellari (140 Vt gacha) + Li-ion batareyalar' }
      },
      {
        label: { ru: 'Приборный комплекс', en: 'Scientific Instruments', uz: 'Ilmiy asboblar' },
        value: { ru: 'Pancam, Navcam, Hazcam, Моссбауэровский спектрометр, альфа-рентгеновский спектрометр APXS, бур RAT', en: 'Pancam, Navcam, Hazcam, Mössbauer spectrometer, APXS, RAT rock abrasion tool', uz: 'Pancam, Navcam, Hazcam, Myossbauer spektrometri, APXS rentgen spektrometri, RAT burg‘isi' }
      },
      {
        label: { ru: 'Максимальная скорость', en: 'Max Speed', uz: 'Maksimal tezlik' },
        value: { ru: '5 см/сек (в среднем 1 см/сек)', en: '5 cm/sec (avg 1 cm/sec)', uz: '5 sm/son (o‘rtacha 1 sm/son)' }
      },
      {
        label: { ru: 'Проектная организация', en: 'Lead Organization', uz: 'Bosh tashkilot' },
        value: { ru: 'NASA / Jet Propulsion Laboratory (JPL)', en: 'NASA / Jet Propulsion Laboratory (JPL)', uz: 'NASA / Jet Propulsion Laboratory (JPL)' }
      },
    ],
    milestones: [
      {
        date: '25.01.2004',
        title: { ru: 'Посадка в кратер Игл', en: 'Touchdown in Eagle Crater', uz: 'Igl krateriga qo‘nish' },
        description: { ru: '«Удар в лунку»: аппарат случайно остановился в небольшом 22-метровом кратере.', en: 'Hole-in-one landing inside a 22-meter impact crater.', uz: 'Apparat tasodifan 22 metrli kichik krater ichiga to‘xtadi.' }
      },
      {
        date: '2004',
        title: { ru: 'Открытие «черники»', en: 'Discovery of "Blueberries"', uz: '«Qorag‘at» sharchalari kashfiyoti' },
        description: { ru: 'Обнаружение оксидов железа, сформировавшихся в жидкой водной среде.', en: 'Hematite spherules confirming ancient liquid water.', uz: 'Suyuq suv muhitida hosil bo‘lgan temir oksidi sharchalari topildi.' }
      },
      {
        date: '2011',
        title: { ru: 'Прибытие к кратеру Индевор', en: 'Arrival at Endeavour Crater', uz: 'Endeavour krateriga yetib borish' },
        description: { ru: 'Начало исследования древнейших обнаженных пород диаметром 22 км.', en: 'Exploration of ancient rim rocks across a 22-km basin.', uz: 'Diametri 22 km bo‘lgan qadimiy jinslarni o‘rganish boshlandi.' }
      },
      {
        date: '24.03.2015',
        title: { ru: 'Марафонская дистанция', en: 'Marathon Distance', uz: 'Marafon masofasi' },
        description: { ru: 'Пройдено 42.195 км — первая полная марафонская дистанция вне Земли.', en: 'Crossed 42.195 km — first marathon completed on another world.', uz: '42.195 km bosib o‘tildi — Yerdan tashqaridagi ilk to‘liq marafon.' }
      },
      {
        date: '10.06.2018',
        title: { ru: 'Последний сигнал', en: 'Final Signal', uz: 'So‘nggi signal' },
        description: { ru: 'Глобальная пылевая буря навсегда отключила солнечные батареи.', en: 'Global dust storm permanently cut solar power.', uz: 'Global chang bo‘roni quyosh batareyalarini butunlay o‘chirdi.' }
      },
    ],
    signalData: {
      sol: 5111,
      frequency: 'X-band 8.4 GHz',
      lastTelemetry: 'TAUP = 10.8 (атмосферная непрозрачность) // Solar Array Output: 22 Wh // PBIT: NOMINAL // Carrier signal dropped',
      fadeReason: {
        ru: 'По оценке команды миссии JPL, потеря инсоляции из-за глобальной пылевой бури привела к разряду АКБ и переохлаждению систем.',
        en: 'Per JPL mission assessment, catastrophic loss of insolation in planetary dust storm caused battery drain and system freeze.',
        uz: 'JPL missiya jamoasi hisobiga ko‘ra, global chang bo‘ronida quyosh nuri yo‘qolishi batareya tugashiga va tizimlarning muzlashiga olib kelgan.',
      },
      quoteRu: 'Уровень заряда батареи критически низок. Пылевой коэффициент выше 10. Вокруг наступает тьма.',
      quoteEn: 'My battery is low and it is getting dark.',
      quoteUz: 'Batareya quvvati o‘ta past. Chang koeffitsiyenti 10 dan yuqori. Atrofni qorong‘ulik qoplamoqda.',
    }
  },
  {
    id: 'apollo-11-lm',
    name: {
      ru: 'Аполлон-11 (Посадочная ступень LM-5 «Eagle»)',
      en: 'Apollo 11 (LM-5 "Eagle" Descent Stage)',
      uz: 'Apollon-11 (LM-5 «Eagle» qo‘nish bosqichi)',
    },
    englishName: 'Apollo 11 LM Descent Stage',
    designation: 'Apollo 11 Lunar Module (LM-5 Descent Stage)',
    destination: 'Moon',
    type: {
      ru: 'Посадочный модуль',
      en: 'Lander',
      uz: 'Qo‘nuvchi platforma',
    },
    launchDate: '16 июля 1969',
    landingDate: '20 июля 1969',
    lastContactDate: '21 июля 1969 (старт взлетной ступени)',
    activeSpan: 'июль 1969',
    status: {
      ru: 'Миссия выполнена (первая высадка человека)',
      en: 'Mission complete (first human lunar landing)',
      uz: 'Missiya bajarildi (insonning ilk qo‘nishi)',
    },
    statusType: 'complete',
    coordinates: {
      lat: '0.67408° N',
      lon: '23.47297° E',
      latNum: 0.67408,
      lonNum: 23.47297,
      formatted: '0°40′27″ с. ш. 23°28′23″ в. д.',
    },
    nasaSearchQuery: 'Apollo 11 Eagle descent stage Tranquility Base',
    locationName: {
      ru: 'Море Спокойствия, База Спокойствия (Tranquility Base)',
      en: 'Sea of Tranquility, Tranquility Base',
      uz: 'Orom dengizi, Orom bazasi (Tranquility Base)',
    },
    missionDuration: {
      ru: '21 час 36 минут на поверхности (выход EVA: 2 ч 31 мин)',
      en: '21 hours 36 minutes on lunar surface (EVA: 2h 31m)',
      uz: 'Oy sirtida 21 soat 36 daqiqa (ochiq sirtda: 2 soat 31 daq)',
    },
    distanceTraveled: {
      ru: '0 км (посадочная платформа; астронавты прошли ~1 км)',
      en: '0 km (descent base; astronauts traversed ~1 km)',
      uz: '0 km (qo‘nish platformasi; fazogirlar ~1 km piyoda yurgan)',
    },
    image: '',
    schematicType: 'lander',
    shortDescription: {
      ru: 'Нижняя часть лунного корабля, с которой Нил Армстронг и Базз Олдрин шагнули на поверхность Луны. Первое рукотворное жилище людей в другом мире.',
      en: 'The descent stage from which Neil Armstrong and Buzz Aldrin stepped onto the Moon. Humanity’s first habitat on an alien world.',
      uz: 'Nil Armstrong va Bazz Oldrin Oy sirtiga qadam qo‘ygan kemaning pastki qismi. Insoniyatning boshqa olamdagi ilk maskani.',
    },
    howGotThere: {
      ru: 'Доставлена трехступенчатой ракетой Saturn V на окололунную орбиту в составе комплекса Аполлон. Отделилась от командного модуля Columbia и под управлением бортового компьютера LGC и ручным пилотированием Нила Армстронга совершила посадку на посадочном ракетном двигателе DPS с дросселируемой тягой.',
      en: 'Propelled to translunar injection by Saturn V. Separated from CSM Columbia, descended under LGC guidance and Neil Armstrong’s manual stick control using the throttleable DPS engine.',
      uz: 'Saturn V raketasida Oy orbitasiga olib chiqilgan. Columbia modulidan ajralib, LGC kompyuteri va Nil Armstrongning qo‘lda boshqaruvi ostida DPS dvigatelida Orom dengiziga qo‘ndi.',
    },
    whatDidItDo: {
      ru: 'Обеспечила посадку экипажа и послужила пусковым столом для взлета корабля Eagle. Доставила ранцы жизнеобеспечения, флаг США, научный прибор EASEP (лазерный ретрорефлектор и сейсмометр) и памятную стальную табличку с картой Земли и подписями астронавтов и президента.',
      en: 'Provided descent thrust and served as launch pad for Eagle’s ascent. Delivered flag, EASEP science package (LRRR retroreflector and passive seismometer), and the historic steel plaque.',
      uz: 'Ekipaj qo‘nishini ta’minladi va uchish bosqichi uchun start maydonchasi vazifasini o‘tadi. Ilk bayroq, EASEP ilmiy asboblari va po‘lat esdalik lavhasini yetkazdi.',
    },
    lastContactStory: {
      ru: '21 июля 1969 года в 17:54 UTC взлетная ступень запустила двигатель APS, оставив нижнюю ступень на Луне в качестве пускового стола. Посадочная ступень не имела радиопередатчика после старта взлетной части, но на ней осталась прикреплена памятная табличка с картой Земли.',
      en: 'On July 21, 1969 at 17:54 UTC, the ascent stage ignited its APS engine, leaving the descent stage on the Moon as a launch pad with the commemorative plaque attached.',
      uz: '1969-yil 21-iyul 17:54 UTC da uchish bosqichi havoga ko‘tarilib, pastki bosqichni Oyda start maydonchasi sifatida qoldirdi. Unda «Biz butun insoniyat nomidan tinchlik bilan keldik» yozuvi qolgan.',
    },
    whereIsItNow: {
      ru: 'Посадочная ступень покоится на Базе Спокойствия в первозданном виде. Ее золотистая фольга Kapton, ступени трапа и табличка на передней опоре сохраняются в неизменности в глубоком лунном вакууме.',
      en: 'The descent stage rests pristine at Tranquility Base. Its gold Kapton foil, ladder rungs, and strut plaque remain untouched in lunar vacuum.',
      uz: 'Qo‘nish bosqichi Orom bazasida daxlsiz saqlanmoqda. Uning tillarang Kapton plyonkasi, zinalari va tirgakdagi lavhasi Oy vakuumida o‘zgarmay turibdi.',
    },
    source: 'https://history.nasa.gov/alsj/a11/a11.html',
    quote: {
      text: {
        ru: 'Здесь люди с планеты Земля впервые ступили на Луну. Июль 1969 года новой эры. Мы пришли с миром от всего человечества.',
        en: 'Here men from the planet Earth first set foot upon the Moon. July 1969, A.D. We came in peace for all mankind.',
        uz: 'Bu yerda Yer sayyorasidan kelgan insonlar ilk bor Oyga qadam qo‘ydi. Milodiy 1969-yil iyul. Biz butun insoniyat nomidan tinchlik bilan keldik.',
      },
      speaker: {
        ru: 'Надпись на памятной табличке стойки лунного модуля Eagle',
        en: 'Inscription on LM-5 Eagle descent strut plaque',
        uz: 'Eagle oy moduli tirgagidagi esdalik lavhasi yozuvi',
      },
      context: {
        ru: 'База Спокойствия, Луна',
        en: 'Tranquility Base, The Moon',
        uz: 'Orom bazasi, Oy',
      },
      type: 'team_message',
      typeLabel: {
        ru: 'Сообщение команды',
        en: 'Mission Plaque',
        uz: 'Esdalik yozuvi',
      },
      sourceUrl: 'https://history.nasa.gov/alsj/a11/a11.html'
    },
    specs: [
      {
        label: { ru: 'Посадочная масса', en: 'Landing Mass', uz: 'Qo‘nish massasi' },
        value: { ru: '2 034 кг (сухая масса ступени)', en: '2,034 kg (dry descent stage)', uz: '2 034 kg (quruq bosqich)' }
      },
      {
        label: { ru: 'Диаметр по опорам', en: 'Footprint Diameter', uz: 'Tirgaklar diametri' },
        value: { ru: '9.4 метра с выпущенными щупами', en: '9.4 meters across footpads', uz: '9.4 metr tirgaklar bilan' }
      },
      {
        label: { ru: 'Материал корпуса', en: 'Construction', uz: 'Korpus materiali' },
        value: { ru: 'Алюминиевый сплав 2014, титан, майлар и каптон', en: 'Al-2014 alloy, titanium, Mylar and Kapton foils', uz: 'Alyuminiy 2014, titan, maylar va kapton' }
      },
      {
        label: { ru: 'Приборная база', en: 'Science Deployed', uz: 'Ilmiy uskunalar' },
        value: { ru: 'Лазерный рефлектор LRRR (работает до сих пор!), пассивный сейсмометр PSEP', en: 'LRRR laser reflector (still operating!), PSEP seismometer', uz: 'LRRR lazer reflektori (hanuz ishlamoqda!), PSEP seysmometri' }
      },
    ],
    milestones: [
      {
        date: '20.07.1969',
        title: { ru: '«Хьюстон, База Спокойствия...»', en: 'Tranquility Base Here', uz: '«Xyuston, bu yerda Orom bazasi...»' },
        description: { ru: '«Орёл» сел на лунный грунт с запасом топлива менее чем на 30 секунд.', en: 'Eagle touched down with under 30 seconds of fuel reserve.', uz: 'Eagle 30 soniyadan kam yonilg‘i qolganida Oyga qo‘ndi.' }
      },
      {
        date: '21.07.1969',
        title: { ru: '«Один маленький шаг...»', en: 'One Small Step', uz: '«Bir kichik qadam...»' },
        description: { ru: 'Первый выход человека на поверхность другого небесного тела.', en: 'First human EVA onto an extraterrestrial body.', uz: 'Insonning boshqa samoviy jism sirtiga ilk qadami.' }
      },
      {
        date: '21.07.1969',
        title: { ru: 'Старт взлетной ступени', en: 'Ascent Stage Liftoff', uz: 'Uchish bosqichining parvozi' },
        description: { ru: 'Нижняя ступень осталась на Луне навечно.', en: 'Descent stage left behind permanently as a monument.', uz: 'Pastki bosqich Oyda mangu qoldi.' }
      },
    ],
    signalData: {
      sol: 1,
      frequency: 'VHF & S-Band 2282.5 MHz',
      lastTelemetry: 'DESCENT STAGE SAFING COMPLETE // APS SEPARATION NOMINAL // DESCENT TELEMETRY TERMINATED',
      fadeReason: {
        ru: 'Штатное завершение миссии. Взлетная ступень стартовала к командному модулю, оставив платформу на грунте.',
        en: 'Nominal mission profile. Ascent stage departed to CSM Columbia, leaving descent platform behind.',
        uz: 'Rejali yakun. Uchish bosqichi Columbia moduliga qaytib, platformani sirtda qoldirdi.',
      },
      quoteRu: 'Хьюстон, говорит База Спокойствия. «Орёл» сел.',
      quoteEn: 'Houston, Tranquility Base here. The Eagle has landed.',
      quoteUz: 'Xyuston, bu yerda Orom bazasi. «Burgut» (Eagle) qo‘ndi.',
    }
  },
  {
    id: 'lrv-apollo15',
    name: {
      ru: 'Луномобиль LRV-001 (Аполлон-15)',
      en: 'Lunar Roving Vehicle LRV-001 (Apollo 15)',
      uz: 'Oy avtomobili LRV-001 (Apollon-15)',
    },
    englishName: 'Apollo 15 Lunar Roving Vehicle (LRV-001)',
    designation: 'Boeing / Delco Lunar Roving Vehicle 001',
    destination: 'Moon',
    type: {
      ru: 'Лунный автомобиль',
      en: 'Lunar Buggy',
      uz: 'Oy avtomobili',
    },
    launchDate: '26 июля 1971',
    landingDate: '30 июля 1971',
    lastContactDate: '2 августа 1971',
    activeSpan: 'июль — август 1971',
    status: {
      ru: 'Миссия выполнена (запаркована на VIP-позиции)',
      en: 'Mission complete (parked at VIP observation site)',
      uz: 'Missiya bajarildi (VIP kuzatuv joyida to‘xtatilgan)',
    },
    statusType: 'complete',
    coordinates: {
      lat: '26.1322° N',
      lon: '3.63386° E',
      latNum: 26.1322,
      lonNum: 3.63386,
      formatted: '26°07′56″ с. ш. 3°38′02″ в. д.',
    },
    nasaSearchQuery: 'Apollo 15 Lunar Roving Vehicle Hadley Rille',
    locationName: {
      ru: 'Борозда Хэдли / Лунные Апеннины (Hadley Rille)',
      en: 'Hadley Rille / Apennine Mountains',
      uz: 'Xedli darasi / Oy Apennin tog‘lari (Hadley Rille)',
    },
    missionDuration: {
      ru: '3 дня экспедиции (активное время вождения: 3 ч 02 мин)',
      en: '3 days of expedition (active drive time: 3h 02m)',
      uz: '3 kunlik ekspeditsiya (haydash vaqti: 3 soat 02 daq)',
    },
    distanceTraveled: {
      ru: '27.76 км',
      en: '27.76 km',
      uz: '27.76 km',
    },
    image: '',
    schematicType: 'rover-buggy',
    shortDescription: {
      ru: 'Первый четырехколесный электромобиль на другом небесном теле. Позволил астронавтам отдалиться на километры от посадочного модуля и собрать уникальные образцы древней коры.',
      en: 'First four-wheeled electric vehicle on another celestial body. Allowed astronauts to venture kilometers away and retrieve the Genesis Rock.',
      uz: 'Boshqa samoviy jismdagi ilk to‘rt g‘ildirakli elektromobil. Fazogirlarga kilometrlar nariga borib, noyob qadimiy tosh namunalarini to‘plash imkonini berdi.',
    },
    howGotThere: {
      ru: 'Сложенный вчетверо под днищем посадочной ступени лунного модуля Falcon. После посадки астронавты Дэвид Скотт и Джеймс Ирвин с помощью системы тросов и шкивов раскрутили автомобиль, и он автоматически разложился на опоры за несколько минут.',
      en: 'Folded into the quadrant of the LM Falcon descent stage. Deployed in minutes by David Scott and James Irwin using a cable-and-pulley latch mechanism.',
      uz: 'Falcon oy modulining pastki bo‘lmasida yig‘ilgan holda yetkazilgan. Qo‘nishdan so‘ng David Skott va Jeyms Irvin trosslar yordamida bir necha daqiqada uni ochib yubordi.',
    },
    whatDidItDo: {
      ru: 'Радикально изменил масштаб лунных исследований. Астронавты развивали скорость до 13 км/ч по крутым склонам каньона Хэдли Рилл, поднялись на гору Хэдли Дельта и нашли знаменитый «Камень Бытия» (Genesis Rock) возрастом более 4 миллиардов лет.',
      en: 'Revolutionized surface exploration: traveled up to 13 km/h along Hadley Rille canyon walls, ascended Hadley Delta, and retrieved the 4-billion-year-old Genesis Rock.',
      uz: 'Oy tadqiqotlari ko‘lamini tubdan o‘zgartirdi. Xedli kanyoni yonbag‘irlarida 13 km/soat tezlikda harakatlanib, 4 milliard yillik mashhur «Ibtido toshi»ni (Genesis Rock) topdi.',
    },
    lastContactStory: {
      ru: 'В конце экспедиции Дэвид Скотт отогнал луноход на расстояние около 90 метров от модуля Falcon на так называемую «VIP-стоянку» и направил цветную телекамеру на взлетную ступень. Оператор Ed Fendell из ЦУПа в Хьюстоне управлял камерой с Земли, транслируя старт астронавтов на весь мир. После исчерпания батарей камера замолчала.',
      en: 'At expedition end, David Scott parked the rover ~90 meters away at the VIP site, aiming the color TV camera at the ascent stage. Flight controller Ed Fendell tracked liftoff remotely from Houston until battery depletion.',
      uz: 'Ekspeditsiya oxirida David Skott mashinani 90 metr naridagi «VIP-turargoh»ga olib borib, kamerasini uchish moduliga to‘g‘riladi. Xyuston boshqaruvchisi Ed Fendell Yer orqali kamerani boshqarib, uchish jarayonini butun dunyoga ko‘rsatdi.',
    },
    whereIsItNow: {
      ru: 'Лунный ровер стоит у подножия лунных Апеннин. Его колеса из плетеной стальной проволоки с титановыми шевронами, кресла астронавтов и руль-джойстик в форме буквы «T» сохраняются в условиях лунного вакуума нетронутыми.',
      en: 'The rover rests at the base of the lunar Apennines. Its woven steel wire wheels with titanium chevrons, seats, and T-handle joystick remain intact in lunar vacuum.',
      uz: 'Oy roveri Apennin tog‘lari etagida turibdi. Uning po‘lat simli to‘r g‘ildiraklari, o‘rindiqlari va T-simon boshqaruv dastagi Oy vakuumida bus-butun saqlanmoqda.',
    },
    source: 'https://history.nasa.gov/alsj/a15/a15.html',
    quote: {
      text: {
        ru: 'Человек должен исследовать. И это — вершина исследований.',
        en: 'Man must explore. And this is exploration at its greatest.',
        uz: 'Inson kashf etishi shart. Va bu — kashfiyotlarning eng yuksak cho‘qqisidir.',
      },
      speaker: {
        ru: 'Дэвид Скотт',
        en: 'David Scott',
        uz: 'David Skott',
      },
      context: {
        ru: 'Хэдли Рилл, Луна',
        en: 'Hadley Rille, The Moon',
        uz: 'Xedli darasi, Oy',
      },
      type: 'team_message',
      typeLabel: {
        ru: 'Сообщение команды',
        en: 'Crew Statement',
        uz: 'Ekipaj so‘zi',
      },
      sourceUrl: 'https://history.nasa.gov/alsj/a15/a15.html'
    },
    specs: [
      {
        label: { ru: 'Сухая масса', en: 'Dry Mass', uz: 'Quruq massasi' },
        value: { ru: '210 кг (на Луне вес эквивалентен 35 кг)', en: '210 kg (weighs 35 kg on Moon)', uz: '210 kg (Oyda 35 kg ga teng)' }
      },
      {
        label: { ru: 'Грузоподъемность', en: 'Payload Capacity', uz: 'Yuk ko‘tarish' },
        value: { ru: '490 кг (двое астронавтов + 120 кг камней)', en: '490 kg (two crew + 120 kg samples)', uz: '490 kg (2 fazogir + 120 kg toshlar)' }
      },
      {
        label: { ru: 'Привод', en: 'Powertrain', uz: 'Harakat tizimi' },
        value: { ru: '4 мотор-колеса постоянного тока Delco по 0.25 л.с.', en: '4 x 0.25 hp Delco DC wheel drive motors', uz: '4 ta Delco elektr motor-g‘ildiragi (0.25 ot kuchi)' }
      },
      {
        label: { ru: 'Питание', en: 'Batteries', uz: 'Akkumulyatorlar' },
        value: { ru: 'Две 36-вольтовые серебряно-цинковые батареи', en: 'Two 36-volt silver-zinc non-rechargeable batteries', uz: 'Ikkita 36 voltli kumush-rux batareyasi' }
      },
      {
        label: { ru: 'Макс. скорость', en: 'Top Speed', uz: 'Maks. tezlik' },
        value: { ru: '13 км/ч', en: '13 km/h', uz: '13 km/soat' }
      },
    ],
    milestones: [
      {
        date: '31.07.1971',
        title: { ru: 'Первый выезд в истории', en: 'First Drive in History', uz: 'Tarixdagi ilk haydash' },
        description: { ru: 'Дэвид Скотт сел за руль первого внеземного колесного транспорта.', en: 'David Scott drove the first off-world wheeled vehicle.', uz: 'David Skott birinchi marta g‘ildirakli transportni Oyda boshqardi.' }
      },
      {
        date: '01.08.1971',
        title: { ru: 'Находка «Камня Бытия»', en: 'Genesis Rock Found', uz: '«Ibtido toshi» topildi' },
        description: { ru: 'Обнаружен анортозит возрастом 4.1 млрд лет — свидетель рождения лунной коры.', en: 'Anorthosite sample 15415 retrieved, dating to Moon formation.', uz: 'Oy po‘stlog‘i paydo bo‘lish davriga oid 4.1 mlrd yillik tosh topildi.' }
      },
      {
        date: '02.08.1971',
        title: { ru: 'Парковка на VIP-позиции', en: 'VIP Site Parking', uz: 'VIP o‘rnida to‘xtash' },
        description: { ru: 'Камера ровера передала исторические кадры взлета модуля Falcon.', en: 'Rover camera broadcast live liftoff of Falcon ascent stage.', uz: 'Rover kamerasi Falcon modulining uchish jarayonini uzatdi.' }
      },
    ],
    signalData: {
      sol: 3,
      frequency: 'VHF RCA Color TV Downlink',
      lastTelemetry: 'LRV HIGH GAIN ANTENNA: LOCKED // BATTERY VOLTAGE 32.1V // CAMERA TRACKING LIFTOFF',
      fadeReason: {
        ru: 'Полный естественный разряд неперезаряжаемых серебряно-цинковых батарей через несколько суток после отлета экипажа.',
        en: 'Depletion of primary non-rechargeable silver-zinc batteries days after crew departure.',
        uz: 'Ekipaj uchib ketganidan so‘ng qayta quvvatlanmaydigan kumush-rux batareyalarining tabiiy tugashi.',
      },
      quoteRu: 'Камера лунохода зафиксировала старт взлетного модуля и навсегда замолчала.',
      quoteEn: 'The rover camera tracked the ascent stage liftoff and fell forever silent.',
      quoteUz: 'Rover kamerasi uchish modulining ko‘tarilishini suratga oldi va mangu sukutga cho‘mdi.',
    }
  },
  {
    id: 'spirit',
    name: {
      ru: 'Спирит',
      en: 'Spirit',
      uz: 'Spirit',
    },
    englishName: 'Spirit (MER-A)',
    designation: 'MER-A (Mars Exploration Rover — A)',
    destination: 'Mars',
    type: {
      ru: 'Ровер',
      en: 'Rover',
      uz: 'Rover (Marsyurar)',
    },
    launchDate: '10 июня 2003',
    landingDate: '4 января 2004',
    lastContactDate: '22 марта 2010 (офиц. 25 мая 2011)',
    activeSpan: '2004 — 2010',
    status: {
      ru: 'Миссия завершена (по предположению команды миссии, замерз в грунтовой ловушке)',
      en: 'Mission complete (presumed by mission team to have frozen in soil trap)',
      uz: 'Missiya yakunlandi (missiya jamoasi taxminiga ko‘ra, tuproq qopqonida muzlagan)',
    },
    statusType: 'silent',
    coordinates: {
      lat: '14.5684° S',
      lon: '175.47263° E',
      latNum: -14.5684,
      lonNum: 175.47263,
      formatted: '14°34′06″ ю. ш. 175°28′21″ в. д.',
    },
    nasaSearchQuery: 'Spirit rover Mars Gusev crater',
    locationName: {
      ru: 'Кратер Гусев, плато Домашнее (Home Plate / Troy)',
      en: 'Gusev Crater, Home Plate (Troy)',
      uz: 'Gusev krateri, «Uy maydonchasi» (Home Plate / Troya)',
    },
    missionDuration: {
      ru: '6 лет 2 месяца 19 дней (2 210 солов; план: 90 солов)',
      en: '6 years 2 months 19 days (2,210 sols; planned: 90 sols)',
      uz: '6 yil 2 oy 19 kun (2 210 sol; reja: 90 sol)',
    },
    distanceTraveled: {
      ru: '7.73 км',
      en: '7.73 km',
      uz: '7.73 km',
    },
    image: '',
    schematicType: 'rover',
    shortDescription: {
      ru: 'Близнец Opportunity, проявивший несгибаемый характер. Преодолел отказ переднего колеса и случайно открыл чистое свидетельство гидротермальной активности Марса.',
      en: 'Twin of Opportunity that displayed incredible grit. Overcame a locked front wheel and stumbled upon pure proof of ancient Martian hydrothermal vents.',
      uz: 'Opportunity ning qat’iyatli egizagi. Old g‘ildiragi qotib qolganiga qaramay harakatlanib, Marsda qadimgi gidrotermal buloqlar bo‘lganini kashf etdi.',
    },
    howGotThere: {
      ru: 'Стартовал на ракете Delta II 7925. Сел в кратере Гусев внутри амортизирующего кокона из надувных подушек. После серии отскоков раскрыл солнечные лепестки и успешно съехал на поверхность.',
      en: 'Launched on Delta II 7925. Landed inside an airbag cluster in Gusev Crater, rolled to a stop, deployed petal panels, and drove onto the soil.',
      uz: 'Delta II 7925 raketasida uchirilgan. Gusev kraterida havo yostiqchalari ichida sakrab to‘xtadi va quyosh barglarini ochib sirtga tushdi.',
    },
    whatDidItDo: {
      ru: 'В 2006 году переднее правое колесо ровера заклинило. Spirit продолжил движение задом наперед, волоча сломанное колесо по грунту. Эта борозда вскрыла грунт с содержанием кремнезема 90% — неопровержимое свидетельство древних горячих геотермальных источников и фумарол, где могла зародиться микробная жизнь.',
      en: 'When its right-front wheel seized in 2006, Spirit drove in reverse, dragging the dead wheel. The resulting furrow exposed 90% pure silica — smoking-gun evidence of past volcanic steam vents or hot springs.',
      uz: '2006-yilda o‘ng old g‘ildiragi qotib qoldi. Spirit uni orqaga qarab sudray boshladi. Bu chiziq 90% sof kremnezem qatlamini ochib, qadimgi issiq buloqlar mavjudligini isbotladi.',
    },
    lastContactStory: {
      ru: 'В мае 2009 года ровер провалился в скрытую песчаную ловушку из сульфатных песков под названием «Троя». Попытки выбраться истощили аппарат. С наступлением суровой марсианской зимы инженеры не смогли ориентировать панели к Солнцу. 22 марта 2010 года аппарат передал последний сигнал телеметрии и погрузился в глубокую гибернацию. По предположению команды миссии JPL, низкие температуры повредили внутреннюю электронику и тактовый генератор.',
      en: 'In May 2009, Spirit broke through a crust into soft sulphate sands named Troy. Unable to extricate itself or tilt toward the low winter sun, power dropped critically. Final transmission was received March 22, 2010. JPL engineers determined internal freezing disabled system clocks.',
      uz: '2009-yil mayida rover «Troya» deb nomlangan sulfat qumlari qopqoniga tushib qoldi. Qish yaqinlashganda panellarni Quyoshga burish imkoni bo‘lmadi. 2010-yil 22-martda so‘nggi signalni uzatib, mangu uyquga ketdi.',
    },
    whereIsItNow: {
      ru: 'Спирит навсегда остался в плену песков Трои на краю холмов Колумбия. Он стоит накренившись к югу, сохраняя безмолвную вахту под ледяным марсианским небом.',
      en: 'Spirit remains trapped at Troy beside Home Plate in the Columbia Hills, tilted southward under the freezing Martian sky.',
      uz: 'Spirit Kolumbiya tepaliklari yonida, Troya qumlari orasida janubga qarata qiyshaygan holda sovuq osmon ostida qoldi.',
    },
    source: 'https://science.nasa.gov/mission/mer-spirit/',
    quote: {
      text: {
        ru: 'Spirit преодолел механический отказ колеса и превратил поломку в научный триумф: прочерченная борозда обнажила чистый кремнезем и доказала существование гидротермальных источников на древнем Марсе.',
        en: 'Spirit overcame a jammed wheel and turned adversity into triumph: its dragged furrow uncovered pure silica, proving ancient hydrothermal vents on Mars.',
        uz: 'Spirit qotib qolgan g‘ildirak nosozligini yengib, uni ilmiy zafarga aylantirdi: chuqur iz sof kremnezemni ochib, qadimgi Marsda issiq buloqlar bo‘lganini isbotladi.',
      },
      speaker: {
        ru: 'Научный обзор миссии MER',
        en: 'MER Mission Science Review',
        uz: 'MER missiyasi ilmiy sharhi',
      },
      context: {
        ru: 'Холмы Колумбия, Марс',
        en: 'Columbia Hills, Mars',
        uz: 'Kolumbiya tepaliklari, Mars',
      },
      type: 'interpretation',
      typeLabel: {
        ru: 'Обзор миссии',
        en: 'Mission Summary',
        uz: 'Missiya sharhi',
      },
      sourceUrl: 'https://science.nasa.gov/mission/mer-spirit/'
    },
    specs: [
      {
        label: { ru: 'Стартовая масса', en: 'Launch Mass', uz: 'Uchish massasi' },
        value: { ru: '185 кг', en: '185 kg', uz: '185 kg' }
      },
      {
        label: { ru: 'Источник энергии', en: 'Power Source', uz: 'Quvvat manbai' },
        value: { ru: 'Солнечные батареи (до 140 Вт) + радиоизотопные нагреватели RHU', en: 'Solar arrays (up to 140 W) + radioisotope heaters (RHU)', uz: 'Quyosh panellari (140 Vt) + radioizotop qizdirgichlar (RHU)' }
      },
      {
        label: { ru: 'Научные приборы', en: 'Instruments', uz: 'Ilmiy asboblar' },
        value: { ru: 'Pancam, Microscopic Imager, APXS, Mini-TES, бур RAT', en: 'Pancam, Microscopic Imager, APXS, Mini-TES, RAT tool', uz: 'Pancam, mikroskop, APXS, Mini-TES, RAT burg‘isi' }
      },
      {
        label: { ru: 'Предельный уклон', en: 'Max Slope', uz: 'Maks. qiyalik' },
        value: { ru: 'Преодолевал склоны крутизной до 30 градусов', en: 'Climbed slopes up to 30 degrees', uz: '30 gradusgacha bo‘lgan qiyaliklarni bosib o‘tgan' }
      },
      {
        label: { ru: 'Выживание', en: 'Winter Endurance', uz: 'Chidamlilik' },
        value: { ru: 'Пережил 3 суровые марсианские зимы', en: 'Survived 3 harsh Martian winters', uz: 'Marsning 3 ta qattiq qishini yengib o‘tgan' }
      },
    ],
    milestones: [
      {
        date: '04.01.2004',
        title: { ru: 'Посадка в кратер Гусев', en: 'Touchdown in Gusev', uz: 'Gusev krateriga qo‘nish' },
        description: { ru: 'Успешное приземление в предполагаемом древнем озере.', en: 'Successful landing in a presumed ancient lakebed.', uz: 'Qadimiy ko‘l bo‘lgan deb taxmin qilingan kraterga qo‘ndi.' }
      },
      {
        date: '2005',
        title: { ru: 'Восхождение на холм Хасбанда', en: 'Husband Hill Summit', uz: 'Xasband tepaligiga chiqish' },
        description: { ru: 'Первый подъем робота на вершину внеземной горы высотой 107 м.', en: 'First robot to summit an extraterrestrial peak (107m).', uz: 'Robotning 107 metr balandlikdagi samoviy tog‘ cho‘qqisiga ilk ko‘tarilishi.' }
      },
      {
        date: '2007',
        title: { ru: 'Открытие чистого кремнезема', en: 'Silica Discovery', uz: 'Sof kremnezem kashfiyoti' },
        description: { ru: 'Заклинившее колесо обнажило древние гидротермальные отложения.', en: 'Dragged stuck wheel uncovered ancient geothermal vents.', uz: 'Qotib qolgan g‘ildirak qadimiy gidrotermal qatlamni ochib berdi.' }
      },
      {
        date: '22.03.2010',
        title: { ru: 'Последний сигнал из Трои', en: 'Last Transmission from Troy', uz: 'Troyadan so‘nggi signal' },
        description: {
          ru: 'По предположению команды миссии, произошло падение напряжения питания ниже предела автономного пробуждения (источник: NASA/JPL Spirit Mission Conclusion).',
          en: 'Presumed by the mission team to be a bus voltage drop below autonomous wake-up threshold (source: NASA/JPL Spirit Mission Conclusion).',
          uz: 'Missiya jamoasi taxminiga ko‘ra, kuchlanish avtonom uyg‘onish chegarasidan pastga tushib ketgan (manba: NASA/JPL Spirit Mission Conclusion).'
        }
      },
    ],
    signalData: {
      sol: 2210,
      frequency: 'Direct-to-Earth X-Band',
      lastTelemetry: 'VOLTAGE BUS: 24.1V // SLEEP MODE ENGAGED // SOLAR POWER: 133 Wh/sol // CARRIER UNLOCKED',
      fadeReason: {
        ru: 'По предположению команды миссии, истощение аккумуляторов в зимний период произошло из-за неблагоприятного угла наклона к Солнцу в песчаной ловушке (источник: NASA JPL).',
        en: 'Per mission team analysis, battery depletion resulted from unfavourable sun orientation in sand trap during winter (source: NASA JPL).',
        uz: 'Missiya jamoasi taxminiga ko‘ra, qum qopqonida qish mavsumida panellarning noqulay burchagi tufayli batareya to‘liq tugagan (manba: NASA JPL).',
      },
      quoteRu: 'Низкий заряд батарей. Переход в режим глубокого сна для сохранения тепла.',
      quoteEn: 'Low battery voltage. Entering deep sleep preservation mode.',
      quoteUz: 'Batareya kuchlanishi past. Issiqlikni saqlash uchun chuqur uyqu rejimiga o‘tilmoqda.',
    }
  },
  {
    id: 'ingenuity',
    name: {
      ru: 'Индженьюити',
      en: 'Ingenuity',
      uz: 'Ingenuity',
    },
    englishName: 'Ingenuity Mars Helicopter',
    designation: 'Mars Helicopter Scout (Ginny)',
    destination: 'Mars',
    type: {
      ru: 'Атмосферный вертолет',
      en: 'Helicopter',
      uz: 'Atmosfera vertolyoti',
    },
    launchDate: '30 июля 2020',
    landingDate: '18 февраля 2021',
    lastContactDate: '18 января 2024 (полеты завершены; работает метеопостом)',
    activeSpan: '2021 — 2024+',
    status: {
      ru: 'Полеты завершены (повреждение винта; аппарат жив)',
      en: 'Flights concluded (blade damage; active weather outpost)',
      uz: 'Parvozlar yakunlandi (parrak shikastlangan; apparat faol)',
    },
    statusType: 'active',
    coordinates: {
      lat: '18.4446° N',
      lon: '77.4509° E',
      latNum: 18.4446,
      lonNum: 77.4509,
      formatted: '18°26′41″ с. ш. 77°27′03″ в. д.',
    },
    nasaSearchQuery: 'Ingenuity Mars Helicopter flight 72 Jezero',
    locationName: {
      ru: 'Кратер Езеро, Холмы Валинор (Valinor Hills)',
      en: 'Jezero Crater, Valinor Hills',
      uz: 'Jezero krateri, Valinor tepaliklari (Valinor Hills)',
    },
    missionDuration: {
      ru: 'почти 3 года (72 успешных полета; план: 5 полетов за 30 дней)',
      en: 'nearly 3 years (72 flights; planned: 5 flights in 30 days)',
      uz: 'deyarli 3 yil (72 ta parvoz; reja: 30 kunda 5 ta parvoz)',
    },
    distanceTraveled: {
      ru: '17.0 км суммарно по воздуху (время в полете: 128.8 минут)',
      en: '17.0 km total flight distance (128.8 minutes aloft)',
      uz: 'Havoda jami 17.0 km (parvoz vaqti: 128.8 daqiqa)',
    },
    image: '',
    schematicType: 'helicopter',
    shortDescription: {
      ru: 'Первый рукотворный летательный аппарат с винтовым двигателем в атмосфере другого мира. Совершил 72 полета вместо 5 запланированных.',
      en: 'First rotorcraft to achieve powered, controlled aerodynamic flight on another planet. Flew 72 times instead of the planned 5.',
      uz: 'Boshqa olam atmosferasida boshqariladigan aerodinamik parvozni amalga oshirgan ilk vertolyot. Rejadagi 5 ta o‘rniga 72 marta uchdi.',
    },
    howGotThere: {
      ru: 'Прибыл закрепленным на днище марсохода Perseverance под защитным углепластиковым щитом. После сброса щита и проверки систем был сброшен на грунт кратера Езеро с высоты 10 см, выдержав ледяную марсианскую ночь на собственных батареях.',
      en: 'Carried on the belly of Perseverance beneath a carbon-composite debris shield. Dropped 10 cm onto Jezero soil, surviving freezing nights on its own batteries.',
      uz: 'Perseverance marsyurarining ostida himoya qalqoni ostida yetkazilgan. 10 sm balandlikdan Jezero tuprog‘iga tushirilib, sovuq tunni o‘z batareyalarida o‘tkazgan.',
    },
    whatDidItDo: {
      ru: 'Доказал возможность управляемого аэродинамического полета в сверхразреженной атмосфере (плотность марсианского воздуха составляет менее 1% земного). Его соосные углепластиковые винты вращались со скоростью 2400-2900 об/мин. Служил воздушным разведчиком для Perseverance, прокладывая безопасные маршруты среди валунов и песчаных дюн.',
      en: 'Proved rotorcraft flight in air less than 1% of Earth’s density with twin 2,400–2,900 rpm carbon-fiber blades. Scouted safe travel paths and geology targets for Perseverance.',
      uz: 'Zichligi Yer atmosferasining 1% dan kam bo‘lgan havoda uchish mumkinligini isbotladi. Uning uglerod tolali parraklari daqiqasiga 2900 marta aylanib, Perseverance uchun havoviy razvedkachi bo‘lib xizmat qildi.',
    },
    lastContactStory: {
      ru: '18 января 2024 года во время своего 72-го полета над однообразной песчаной местностью без четких ориентиров вертолет совершил вынужденную жесткую посадку. Снимки с его собственной бортовой камеры показали, что законцовка как минимум одной из углепластиковых лопастей оторвалась при ударе о грунт. Аппарат сохранил связь с базой, но больше не может подняться в воздух. По решению команды миссии JPL, вертолет переведен в режим постоянной стационарной станции метеонаблюдений.',
      en: 'On January 18, 2024, during Flight 72 over featureless sand dunes, Ingenuity executed an emergency hard landing. Navcam images confirmed blade-tip separation. The craft cannot fly again but remains fully operational as a permanent stationary weather observatory.',
      uz: '2024-yil 18-yanvarda 72-parvoz vaqtida bir xil qum tepaliklari ustida qattiq qo‘ndi. O‘z kamerasi olingan suratlarda parrak uchi uzilgani ko‘rindi. U ucha olmaydi, ammo doimiy meteorologik stansiya sifatida faoliyatini davom ettirmoqda.',
    },
    whereIsItNow: {
      ru: 'Индженьюити стоит на своих четырех титаново-композитных ножках среди песчаных рябей холмов Валинор в кратере Езеро. Каждый марсианский день он просыпается от солнца, собирает данные о температуре и ветре и записывает их в память для будущих покорителей Марса.',
      en: 'Ingenuity rests on its four composite legs among the ripple sands of Valinor Hills. Every Martian sunrise it powers on, logging temperatures and winds in non-volatile flash memory for future astronauts.',
      uz: 'Ingenuity Jezero krateridagi Valinor tepaliklari qumlari orasida to‘rtta oyog‘ida tik turibdi. Har tong quyosh nurlaridan uyg‘onib, kelajak avlodlar uchun harorat va shamol ma’lumotlarini xotirasiga yozib bormoqda.',
    },
    source: 'https://www.jpl.nasa.gov/news/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends',
    quote: {
      text: {
        ru: 'Историческое путешествие Ingenuity подошло к концу. Этот выдающийся вертолет взлетел выше и дальше, чем мы могли представить.',
        en: 'The historic journey of Ingenuity has come to end. That remarkable helicopter has flown higher and farther than we ever imagined.',
        uz: 'Ingenuity ning tarixiy sayohati yakunlandi. Bu ajoyib vertolyot biz tasavvur qilganimizdan ham balandroq va uzoqroqqa uchdi.',
      },
      speaker: {
        ru: 'Билл Нельсон, администратор NASA',
        en: 'Bill Nelson, NASA Administrator',
        uz: 'Bill Nelson, NASA rahbari',
      },
      context: {
        ru: 'Пресс-релиз NASA HQ 24-009, 25 января 2024',
        en: 'NASA HQ Briefing Release 24-009, Jan 25, 2024',
        uz: 'NASA HQ brifingi, 2024-yil 25-yanvar',
      },
      type: 'team_message',
      typeLabel: {
        ru: 'Сообщение команды',
        en: 'Official Statement',
        uz: 'Rasmiy bayonot',
      },
      sourceUrl: 'https://www.nasa.gov/news-release/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/'
    },
    specs: [
      {
        label: { ru: 'Масса', en: 'Mass', uz: 'Massasi' },
        value: { ru: 'Всего 1.8 кг', en: 'Just 1.8 kg', uz: 'Bor-yo‘g‘i 1.8 kg' }
      },
      {
        label: { ru: 'Размах винтов', en: 'Rotor Diameter', uz: 'Parrak diametri' },
        value: { ru: '1.2 метра (два соосных несущих винта)', en: '1.2 m (coaxial counter-rotating blades)', uz: '1.2 metr (ikkita qarama-qarshi aylanuvchi parrak)' }
      },
      {
        label: { ru: 'Скорость вращения', en: 'Rotor Speed', uz: 'Aylanish tezligi' },
        value: { ru: 'до 2 900 оборотов в минуту', en: 'up to 2,900 rpm', uz: 'daqiqasiga 2 900 martagacha' }
      },
      {
        label: { ru: 'Источник питания', en: 'Power System', uz: 'Quvvat tizimi' },
        value: { ru: 'Солнечная панель над винтами + 6 литий-ионных элементов Sony', en: 'Top-mounted solar array + 6 Sony Li-ion cells', uz: 'Quyosh paneli + 6 ta Sony litiy-ionli elementi' }
      },
      {
        label: { ru: 'Максимальная высота', en: 'Max Altitude', uz: 'Maks. balandlik' },
        value: { ru: '24.0 метра над поверхностью', en: '24.0 meters above surface', uz: 'Sirt ustida 24.0 metr' }
      },
    ],
    milestones: [
      {
        date: '19.04.2021',
        title: { ru: 'Исторический полет №1', en: 'Historic Flight 1', uz: 'Tarixiy 1-parvoz' },
        description: { ru: 'Первый управляемый полет винтокрылой машины на другой планете (39.1 сек).', en: 'First powered controlled flight on another world (39.1 sec).', uz: 'Boshqa sayyorada ilk boshqariladigan parvoz (39.1 soniya).' }
      },
      {
        date: '05.07.2021',
        title: { ru: 'Полет №9 через дюны', en: 'Flight 9 Across Dunes', uz: '9-parvoz qum tepalari ustidan' },
        description: { ru: 'Смелый перелет через опасную местность Séítah, недоступную роверу.', en: 'Daring shortcut across the treacherous Séítah sand dunes.', uz: 'Rover o‘ta olmaydigan xavfli Séítah hududidan dadil parvoz.' }
      },
      {
        date: '19.04.2023',
        title: { ru: 'Два года в небе', en: 'Two Years Flying', uz: 'Ikki yil osmonda' },
        description: { ru: '50-й юбилейный полет; покорена высота 18 метров.', en: '50th milestone flight, scaling 18 meters altitude.', uz: '50-yubiley parvozi; 18 metr balandlik zabt etildi.' }
      },
      {
        date: '18.01.2024',
        title: { ru: 'Полет №72: Финал', en: 'Flight 72: Finale', uz: '72-parvoz: Xotima' },
        description: { ru: 'Повреждение конца лопасти при посадке в дюнах холмов Валинор.', en: 'Rotor tip separation upon landing at Valinor Hills.', uz: 'Valinor tepaliklarida qo‘nish vaqtida parrak uchi shikastlandi.' }
      },
    ],
    signalData: {
      sol: 1040,
      frequency: 'ZigBee 900 MHz (через Perseverance)',
      lastTelemetry: 'FLIGHT 72 TERMINATION // NAV FILTER DISVERGENCE // ROTOR BLADE DEFORMATION CONFIRMED // STATIONARY LOGGING ACTIVE',
      fadeReason: {
        ru: 'Повреждение композитной лопасти несущего винта при посадке на дюны в ходе 72-го полета (подтверждено анализом снимков JPL).',
        en: 'Rotor blade tip separation during Flight 72 touchdown on featureless dunes (confirmed by JPL analysis).',
        uz: '72-parvozda qum tepaligiga qo‘nishda parrak uchining sinishi (JPL tahlili bilan tasdiqlangan).',
      },
      quoteRu: 'Полетная программа завершена. Лопасть повреждена. Переход в режим стационарного регистратора данных.',
      quoteEn: 'Flight operations concluded. Rotor tip separation. Transitioning to long-term test station.',
      quoteUz: 'Parvoz dasturi tugadi. Parrak shikastlangan. Doimiy ma’lumotlar registratori rejimiga o‘tildi.',
    }
  },
  {
    id: 'insight',
    name: {
      ru: 'Инсайт',
      en: 'InSight',
      uz: 'InSight',
    },
    englishName: 'InSight Lander',
    designation: 'Interior Exploration using Seismic Investigations (InSight)',
    destination: 'Mars',
    type: {
      ru: 'Сейсмическая станция',
      en: 'Seismic Station',
      uz: 'Seysmik stansiya',
    },
    launchDate: '5 мая 2018',
    landingDate: '26 ноября 2018',
    lastContactDate: '15 декабря 2022 (офиц. 21 декабря 2022)',
    activeSpan: '2018 — 2022',
    status: {
      ru: 'Миссия завершена (пылевое истощение питания)',
      en: 'Mission complete (dust depletion of solar power)',
      uz: 'Missiya yakunlandi (quyosh panellari chang bilan qoplandi)',
    },
    statusType: 'silent',
    coordinates: {
      lat: '4.5024° N',
      lon: '135.6234° E',
      latNum: 4.5024,
      lonNum: 135.6234,
      formatted: '4°30′09″ с. ш. 135°37′24″ в. д.',
    },
    nasaSearchQuery: 'InSight lander Mars Elysium Planitia SEIS',
    locationName: {
      ru: 'Равнина Элизий (Elysium Planitia)',
      en: 'Elysium Planitia',
      uz: 'Eliziy tekisligi (Elysium Planitia)',
    },
    missionDuration: {
      ru: '4 года 19 дней (1 440 солов; план: 1 марсианский год / 709 солов)',
      en: '4 years 19 days (1,440 sols; planned: 1 Mars year / 709 sols)',
      uz: '4 yil 19 kun (1 440 sol; reja: 1 Mars yili / 709 sol)',
    },
    distanceTraveled: {
      ru: '0 км (стационарная станция)',
      en: '0 km (stationary geophysical station)',
      uz: '0 km (statsionar seysmik stansiya)',
    },
    image: '',
    schematicType: 'station',
    shortDescription: {
      ru: 'Первый роботизированный геофизик Марса. Зафиксировал более 1300 марсотрясений и впервые составил карту внутреннего строения коры, мантии и жидкого ядра планеты.',
      en: 'First robotic geophysicist on Mars. Logged over 1,300 marsquakes and mapped the core, mantle, and crust structure.',
      uz: 'Marsning ilk robot geofizigi. 1300 dan ortiq marssilkinishlarni qayd etib, sayyora po‘stlog‘i, mantiyasi va suyuq yadrosi xaritasini tuzdi.',
    },
    howGotThere: {
      ru: 'Совершил высокоточный баллистический вход в плотные слои атмосферы Марса, использовал сверхзвуковой парашют и мягко приземлился с помощью 12 импульсных гидразиновых двигателей на ровной песчаной равнине Элизий.',
      en: 'Ballistic atmospheric entry, supersonic parachute decelerator, and pulsed descent hydrazine thrusters onto flat Elysium Planitia sands.',
      uz: 'Mars atmosferasiga kirib, tovushdan tez parashyut va 12 ta gidrazinli dvigatel yordamida tekis Eliziy maydoniga yumshoq qo‘ndi.',
    },
    whatDidItDo: {
      ru: 'С помощью роботизированной руки выгрузил на грунт сверхчувствительный французский сейсмометр SEIS, накрыв его ветрозащитным куполом. Зафиксировал падения метеоритов и мощнейшее марсотрясение магнитудой 4.7 балла. Установил, что марсианское ядро расплавлено и имеет неожиданно низкую плотность.',
      en: 'Deployed the ultra-sensitive French SEIS seismometer under a wind and thermal shield. Detected meteorite impacts and a record magnitude 4.7 marsquake, confirming a molten metallic core.',
      uz: 'Robotik qo‘l yordamida o‘ta sezgir fransuz SEIS seysmometrini o‘rnatdi. Meteoritlar urilishi va 4.7 balli kuchli silkinishni qayd etib, yadro erigan holatda ekanini isbotladi.',
    },
    lastContactStory: {
      ru: 'В отличие от роверов, стационарная станция не могла менять ориентацию относительно ветра. С каждым годом толстый слой марсианской пыли сокращал выработку его двухметровых круглых солнечных батарей UltraFlex с 5000 Вт·ч до менее 300 Вт·ч в день. 15 декабря 2022 года InSight отправил свою последнюю фотографию пыльного сейсмометра. По предположению команды миссии, буферная аккумуляторная батарея окончательно истощилась.',
      en: 'Stationary solar panels could not shed dust. Output dropped from 5,000 Wh/day to under 300 Wh. Sent its final dust-shrouded SEIS photo on Dec 15, 2022 before battery depleted.',
      uz: 'Roverlardan farqli ravishda stansiya joyini o‘zgartira olmasdi. Qalin chang qatlami UltraFlex batareyalari quvvatini kuniga 5000 dan 300 Vt·soatgacha tushirib yubordi. 2022-yil 15-dekabrda so‘nggi suratini yuborib, o‘chdi.',
    },
    whereIsItNow: {
      ru: 'InSight покоится на равнине Элизий, почти полностью сливаясь с окружающим ржавым марсианским ландшафтом из-за плотного слоя осевшей пыли.',
      en: 'InSight sits on Elysium Planitia, nearly camouflaged by ochre dust that blankets its dome and deck.',
      uz: 'InSight Eliziy tekisligida turibdi, quyuq chang qatlami sababli atrofdagi qizg‘ish landshaft bilan deyarli birikib ketgan.',
    },
    source: 'https://science.nasa.gov/mission/insight/',
    quote: {
      text: {
        ru: 'Мой заряд совсем мал, так что это, возможно, последний снимок, который я могу отправить. Не переживайте за меня: мое время здесь было продуктивным и безмятежным.',
        en: 'My power is really low, so this may be the last image I can send... Don’t worry about me: my time here has been both productive and serene.',
        uz: 'Quvvatim juda kam qoldi, shuning uchun bu men yubora oladigan so‘nggi surat bo‘lishi mumkin. Men uchun xavotir olmang: bu yerdagi vaqtim sermahsul va sokin o‘tdi.',
      },
      speaker: {
        ru: 'Официальный аккаунт миссии @NASAInSight',
        en: 'Official Mission Account @NASAInSight',
        uz: 'Rasmiy missiya hisobi @NASAInSight',
      },
      context: {
        ru: '19 декабря 2022, Twitter/X',
        en: 'Dec 19, 2022, Twitter/X',
        uz: '2022-yil 19-dekabr, Twitter/X',
      },
      type: 'team_message',
      typeLabel: {
        ru: 'Сообщение команды',
        en: 'Mission Team Farewell',
        uz: 'Vidolashuv xabari',
      },
      sourceUrl: 'https://www.nasa.gov/news-release/nasas-insight-mission-ends-after-four-years-of-groundbreaking-science/'
    },
    specs: [
      {
        label: { ru: 'Посадочная масса', en: 'Landed Mass', uz: 'Qo‘nish massasi' },
        value: { ru: '358 кг', en: '358 kg', uz: '358 kg' }
      },
      {
        label: { ru: 'Размах солнечных крыльев', en: 'Solar Wingspan', uz: 'Quyosh qanotlari kengligi' },
        value: { ru: '6.0 метров (круглые батареи UltraFlex)', en: '6.0 meters (dual UltraFlex circles)', uz: '6.0 metr (UltraFlex aylanma panellari)' }
      },
      {
        label: { ru: 'Главный прибор', en: 'Primary Instrument', uz: 'Asosiy asbob' },
        value: { ru: 'SEIS (сверхчувствительный широкополосный сейсмометр)', en: 'SEIS ultra-sensitive broad-band seismometer', uz: 'SEIS o‘ta sezgir seysmometri' }
      },
      {
        label: { ru: 'Буровой зонд', en: 'Heat Flow Probe', uz: 'Burg‘ulash zondi' },
        value: { ru: 'HP³ («Крот» для измерения теплового потока)', en: 'HP³ Heat Flow and Physical Properties Package', uz: 'HP³ issiqlik oqimini o‘lchash zondi' }
      },
      {
        label: { ru: 'Зафиксировано событий', en: 'Events Logged', uz: 'Qayd etilgan hodisalar' },
        value: { ru: '1 319 марсотрясений', en: '1,319 marsquakes', uz: '1 319 ta marssilkinish' }
      },
    ],
    milestones: [
      {
        date: '26.11.2018',
        title: { ru: 'Мягкая посадка', en: 'Soft Landing', uz: 'Yumshoq qo‘nish' },
        description: { ru: 'Успешное развертывание на равнине Элизий.', en: 'Flawless touchdown on Elysium Planitia.', uz: 'Eliziy tekisligiga muvaffaqiyatli qo‘ndi.' }
      },
      {
        date: '06.04.2019',
        title: { ru: 'Первый звук марсотрясения', en: 'First Marsquake Sound', uz: 'Ilk marssilkinish ovozi' },
        description: { ru: 'Сейсмометр SEIS зафиксировал первое сейсмическое колебание недр Марса.', en: 'SEIS captured first subterranean seismic rumble.', uz: 'SEIS seysmometri Mars qa’ridagi ilk silkinishni yozib oldi.' }
      },
      {
        date: '04.05.2022',
        title: { ru: 'Марсотрясение 4.7M', en: 'Magnitude 4.7 Monster Quake', uz: '4.7 balli kuchli silkinish' },
        description: { ru: 'Рекордный подземный толчок, сотрясавший планету более 10 часов.', en: 'Record subterranean tremor that reverberated for 10 hours.', uz: 'Sayyorani 10 soat davomida tebratgan rekord zarba.' }
      },
      {
        date: '15.12.2022',
        title: { ru: 'Последний кадр', en: 'The Final Frame', uz: 'So‘nggi kadr' },
        description: { ru: 'Прощальный снимок прибора SEIS под толстым слоем пыли.', en: 'Final image of dust-draped SEIS dome.', uz: 'Qalin chang ostida qolgan SEIS asbobining so‘nggi surati.' }
      },
    ],
    signalData: {
      sol: 1440,
      frequency: 'X-band DTE 8.4 GHz',
      lastTelemetry: 'SOLAR BUS OUTPUT: 285 Wh/sol // BATTERY DEPLETION IMMINENT // CRITICAL VOLTAGE SHUTDOWN',
      fadeReason: {
        ru: 'По оценке команды инженеров, накопление слоя марсианской пыли на батареях UltraFlex привело к разряду аккумуляторов ниже рабочего предела.',
        en: 'Engineering consensus: multi-year accumulation of dust on UltraFlex arrays drained reserves below computer boot voltage.',
        uz: 'Muhandislar xulosasiga ko‘ra, UltraFlex panellaridagi chang qatlami akkumulyatorlarni kritik darajagacha tushirib yuborgan.',
      },
      quoteRu: 'Мой заряд совсем мал... Не переживайте за меня: мое время здесь было продуктивным и безмятежным.',
      quoteEn: 'My power is really low, so this may be the last image I can send... Don’t worry about me.',
      quoteUz: 'Quvvatim juda kam... Men uchun xavotir olmang: bu yerdagi vaqtim sermahsul va sokin o‘tdi.',
    }
  },
  {
    id: 'sojourner',
    name: {
      ru: 'Соджорнер',
      en: 'Sojourner',
      uz: 'Sojourner',
    },
    englishName: 'Sojourner (Mars Pathfinder)',
    designation: 'Mars Pathfinder Microrover',
    destination: 'Mars',
    type: {
      ru: 'Ровер',
      en: 'Rover',
      uz: 'Rover (Marsyurar)',
    },
    launchDate: '4 декабря 1996',
    landingDate: '4 июля 1997',
    lastContactDate: '27 сентября 1997',
    activeSpan: 'июль — сентябрь 1997',
    status: {
      ru: 'Миссия завершена (отказ базовой станции)',
      en: 'Mission complete (lander relay failure)',
      uz: 'Missiya yakunlandi (tayanch stansiya akkumulyatori tugagan)',
    },
    statusType: 'silent',
    coordinates: {
      lat: '19.33° N',
      lon: '326.45° E',
      latNum: 19.33,
      lonNum: -33.55,
      formatted: '19°20′ с. ш. 33°33′ з. д.',
    },
    nasaSearchQuery: 'Sojourner rover Mars Pathfinder Ares Vallis',
    locationName: {
      ru: 'Долина Арес (Ares Vallis)',
      en: 'Ares Vallis',
      uz: 'Ares vodiysi (Ares Vallis)',
    },
    missionDuration: {
      ru: '83 дня (план: всего 7 дней)',
      en: '83 days (planned: 7 days)',
      uz: '83 kun (reja: bor-yo‘g‘i 7 kun)',
    },
    distanceTraveled: {
      ru: '100 метров',
      en: '100 meters',
      uz: '100 metr',
    },
    image: '',
    schematicType: 'rover',
    shortDescription: {
      ru: 'Первый в истории человечества самоходный колесный аппарат на Марсе. Крошечный шестиколесный пионер размером с микроволновку, открывший эру планетарных роверов.',
      en: 'Humanity’s first wheeled vehicle on Mars. A microwave-sized, 6-wheeled pioneer that launched the planetary rover era.',
      uz: 'Insoniyat tarixida Marsdagi ilk g‘ildirakli apparat. Sayyorayurarlar davrini ochib bergan mikrotolqinli pechdek kichik kashfiyotchi.',
    },
    howGotThere: {
      ru: 'Использовал революционную недорогую технологию посадки Discovery: теплозащитный экран, парашют, твердотопливные тормозные ракеты RAD и гроздь надувных подушек безопасности, отскочивших от марсианских камней более 15 раз.',
      en: 'Pioneered low-cost Discovery entry: aeroshell, parachute, solid RAD rockets, and bouncing airbag cluster cushioning 15+ impacts.',
      uz: 'Discovery texnologiyasidan foydalangan: issiqlik qalqoni, parashyut, qattiq yoqilg‘ili tormoz raketalari va toshlar ustida 15 martadan ko‘p sakragan havo yostiqlari.',
    },
    whatDidItDo: {
      ru: 'Доказал эффективность подвески rocker-bogie (которая затем легла в основу Spirit, Opportunity, Curiosity и Perseverance). Исследовал марсианские булыжники «Барнакл Билл» и «Йоги», подтвердив, что долина Арес образовалась в результате катастрофического древнего наводнения жидкой воды.',
      en: 'Validated the rocker-bogie suspension system used by all subsequent Mars rovers. Analyzed rocks "Barnacle Bill" and "Yogi", proving ancient mega-floods shaped Ares Vallis.',
      uz: 'Keyingi barcha roverlar asosi bo‘lgan «rocker-bogie» osma tizimi samaradorligini isbotladi. «Barnakl Bill» va «Yogi» toshlarini tekshirib, Ares vodiysining qadimgi ulkan suv toshqinlari natijasida paydo bo‘lganini aniqladi.',
    },
    lastContactStory: {
      ru: 'Сам ровер был полностью исправен, но поддерживал связь с Землей исключительно через базовую посадочную станцию им. Карла Сагана. 27 сентября 1997 года связь прервалась. По заключению инженеров JPL, это произошло из-за деградации и разряда буферной батареи посадочной станции после многочисленных циклов заморозки. Запрограммированный протокол предписывал Соджорнеру перейти в режим ожидания базы.',
      en: 'Sojourner was healthy, but relied entirely on the Carl Sagan Memorial Station lander for relay. On Sept 27, 1997, the lander battery died from repeated freeze-thaw cycles. Autonomous programming instructed Sojourner to circle the silent station indefinitely.',
      uz: 'Roverning o‘zi soz edi, ammo Yer bilan faqat Karl Sagan nomidagi qo‘nuvchi stansiya orqali aloqa qilardi. 1997-yil 27-sentabrda stansiya akkumulyatori muzlash tufayli ishdan chiqdi. Dastur bo‘yicha Sojourner stansiya atrofida kutish rejimiga o‘tdi.',
    },
    whereIsItNow: {
      ru: 'Маленький Соджорнер навсегда замер на каменистой равнине долины Арес возле потемневших солнечных панелей станции Карла Сагана.',
      en: 'Sojourner rests on the rocky plain of Ares Vallis near the darkened solar panels of the Sagan Station.',
      uz: 'Mittivoy Sojourner Ares vodiysining toshloq tekisligida, Karl Sagan stansiyasining qoraygan panellari yonida mangu to‘xtab qolgan.',
    },
    source: 'https://science.nasa.gov/mission/mars-pathfinder-sojourner/',
    quote: {
      text: {
        ru: 'Этот маленький шаг крошечного ровера стал гигантским скачком для марсианской науки.',
        en: 'This small step by a tiny rover proved to be a giant leap for Martian exploration.',
        uz: 'Kichkina roverning bu kichik qadami Mars ilmi uchun ulkan sakrash bo‘ldi.',
      },
      speaker: {
        ru: 'Команда NASA Mars Pathfinder',
        en: 'NASA Mars Pathfinder Mission Team',
        uz: 'NASA Mars Pathfinder jamoasi',
      },
      context: {
        ru: 'Долина Арес, Марс',
        en: 'Ares Vallis, Mars',
        uz: 'Ares vodiysi, Mars',
      },
      type: 'team_message',
      typeLabel: {
        ru: 'Сообщение команды',
        en: 'Team Message',
        uz: 'Jamoa so‘zi',
      },
      sourceUrl: 'https://science.nasa.gov/mission/mars-pathfinder-sojourner/'
    },
    specs: [
      {
        label: { ru: 'Масса аппарата', en: 'Mass', uz: 'Massasi' },
        value: { ru: '11.5 кг (размером с микроволновую печь)', en: '11.5 kg (microwave-sized)', uz: '11.5 kg (mikrotolqinli pech hajmida)' }
      },
      {
        label: { ru: 'Питание', en: 'Power', uz: 'Quvvati' },
        value: { ru: 'Солнечная панель GaAs (16 Вт) + литиевая батарея', en: 'GaAs solar panel (16 W) + lithium battery', uz: 'GaAs quyosh paneli (16 Vt) + litiyli batareya' }
      },
      {
        label: { ru: 'Колесная база', en: 'Wheelbase', uz: 'G‘ildiraklar' },
        value: { ru: '6 колес диаметром 13 см, подвеска Rocker-Bogie', en: '6 x 13 cm wheels, Rocker-Bogie suspension', uz: 'Diametri 13 sm bo‘lgan 6 ta g‘ildirak' }
      },
      {
        label: { ru: 'Приборы', en: 'Instruments', uz: 'Asboblar' },
        value: { ru: 'Альфа-протон-рентгеновский спектрометр (APXS), 3 камеры', en: 'APXS spectrometer, 3 monochrome/color cameras', uz: 'APXS spektrometri, 3 ta kamera' }
      },
      {
        label: { ru: 'Процессор', en: 'CPU', uz: 'Protsessor' },
        value: { ru: '8-битный Intel 80C85 с частотой 2 МГц', en: '8-bit Intel 80C85 at 2 MHz', uz: '8-bitli Intel 80C85 (2 MGts)' }
      },
    ],
    milestones: [
      {
        date: '04.07.1997',
        title: { ru: 'Посадка в день независимости', en: 'Independence Day Landing', uz: 'Mustaqillik kunida qo‘nish' },
        description: { ru: 'Историческое касание грунтовых подушек в долине Арес.', en: 'Historic airbag touchdown in Ares Vallis.', uz: 'Ares vodiysiga havo yostiqchalari bilan tarixiy qo‘nish.' }
      },
      {
        date: '05.07.1997',
        title: { ru: 'Съезд на марсианский грунт', en: 'Ramping onto Martian Soil', uz: 'Mars tuprog‘iga tushish' },
        description: { ru: 'Первый след колеса земного робота на Марсе.', en: 'First tire tracks imprinted on Martian soil.', uz: 'Marsda Yer roboti g‘ildiragining ilk izi.' }
      },
      {
        date: '27.09.1997',
        title: { ru: 'Прекращение связи', en: 'Signal Loss', uz: 'Aloqa to‘xtashi' },
        description: { ru: 'Отказ базовой станции прервал связь с маленьким ровером.', en: 'Lander base battery failure ended communication.', uz: 'Tayanch stansiya akkumulyatori o‘chib, aloqa uzildi.' }
      },
    ],
    signalData: {
      sol: 83,
      frequency: 'UHF Radio to Sagan Memorial Station',
      lastTelemetry: 'LINK INTERRUPTED // BASE STATION POWER TERMINATED // CONTINGENCY HOLD EXECUTED',
      fadeReason: {
        ru: 'По заключению специалистов миссии, отказ базовой станции-ретранслятора произошел из-за необратимого разряда буферной батареи.',
        en: 'Mission engineers concluded lander relay failed due to irreversible primary battery degradation.',
        uz: 'Missiya muhandislari xulosasiga ko‘ra, tayanch stansiyaning batareyasi to‘liq tugashi oqibatida aloqa to‘xtagan.',
      },
      quoteRu: 'Потеря несущей частоты ретранслятора. Ровер переведен в режим ожидания базы.',
      quoteEn: 'Lander relay link lost. Rover waiting in standby cycle.',
      quoteUz: 'Retranslyator chastotasi yo‘qoldi. Rover stansiyani kutish rejimiga o‘tdi.',
    }
  },
  {
    id: 'phoenix',
    name: {
      ru: 'Феникс',
      en: 'Phoenix',
      uz: 'Phoenix',
    },
    englishName: 'Phoenix Mars Lander',
    destination: 'Mars',
    designation: 'Phoenix Mars Scout',
    type: {
      ru: 'Посадочный модуль',
      en: 'Lander',
      uz: 'Qo‘nuvchi modul',
    },
    launchDate: '4 августа 2007',
    landingDate: '25 мая 2008',
    lastContactDate: '2 ноября 2008',
    activeSpan: 'май — ноябрь 2008',
    status: {
      ru: 'Миссия завершена (задавлен полярными льдами)',
      en: 'Mission complete (crushed by polar ice)',
      uz: 'Missiya yakunlandi (qutb muzlari ostida ezilgan)',
    },
    statusType: 'silent',
    coordinates: {
      lat: '68.2188° N',
      lon: '234.2508° E',
      latNum: 68.2188,
      lonNum: -125.75,
      formatted: '68°13′08″ с. ш. 125°44′57″ з. д.',
    },
    nasaSearchQuery: 'Phoenix Mars Lander Vastitas Borealis ice',
    locationName: {
      ru: 'Великая Северная равнина (Vastitas Borealis), полярный круг',
      en: 'Vastitas Borealis, Northern Arctic Plains',
      uz: 'Ulug‘ Shimoliy tekislik (Vastitas Borealis), qutb doirasi',
    },
    missionDuration: {
      ru: '161 день (план: 90 дней)',
      en: '161 days (planned: 90 days)',
      uz: '161 kun (reja: 90 kun)',
    },
    distanceTraveled: {
      ru: '0 км (стационарный аппарат)',
      en: '0 km (stationary arctic lander)',
      uz: '0 km (statsionar qutb apparati)',
    },
    image: '',
    schematicType: 'lander',
    shortDescription: {
      ru: 'Первый аппарат, совершивший посадку в приполярной арктической тундре Марса и физически коснувшийся марсианского водяного льда своей механической рукой.',
      en: 'First lander to touch down in the Martian arctic plains and physically scrape water ice with its robotic arm.',
      uz: 'Marsning arktika hududiga qo‘nib, robot qo‘li bilan Marsdagi suv muziga bevosita tegingan ilk apparat.',
    },
    howGotThere: {
      ru: 'Использовал классическую схему с импульсными двигателями мягкой посадки Aerojet. Стал первым успешным посадочным модулем программы Mars Scout.',
      en: 'Descended using pulsed Aerojet descent thrusters. First successful Mars Scout surface mission.',
      uz: 'Aerojet yumshoq qo‘nish dvigatellaridan foydalangan. Mars Scout dasturining ilk muvaffaqiyatli moduli bo‘ldi.',
    },
    whatDidItDo: {
      ru: 'Выкопал траншеи в мерзлом грунте и зафиксировал, как обнаженные белые комки чистого водяного льда сублимируют под солнцем в течение 4 суток. Провел химический анализ и впервые обнаружил перхлораты в марсианской почве, а также зафиксировал снегопад в полярной атмосфере.',
      en: 'Trench digging revealed white subsurface water-ice chunks that sublimated over 4 days. Discovered perchlorates and detected snowfall from cirrus clouds using LIDAR.',
      uz: 'Muzlagan tuproqni kovlab, sof suv muzi Quyosh ostida 4 kun davomida erib yo‘qolganini tasvirladi. Tuproqda ilk bor perxloratlarni topdi va qor yog‘ishini qayd etdi.',
    },
    lastContactStory: {
      ru: 'С наступлением полярной марсианской зимы солнце опустилось за горизонт, температура упала ниже -120°C, а толстый слой замерзшего углекислого газа (сухого льда) начал покрывать поверхность. 2 ноября 2008 года аппарат передал свой последний радиосигнал. Орбитальный аппарат MRO позже сфотографировал повреждения его солнечных крыльев под весом сотен килограммов углекислотного льда.',
      en: 'As arctic winter closed in, sunlight vanished, temperatures plummeted below -120°C, and dry ice entombed the lander. Final signal was received Nov 2, 2008. MRO HiRISE later photographed solar panels crushed by hundreds of kilograms of solid CO₂ ice.',
      uz: 'Qutb qishi boshlanishi bilan Quyosh ufqqa botdi, harorat -120°C dan tushib ketdi va qalin quruq muz qatlami paydo bo‘ldi. 2008-yil 2-noyabrda so‘nggi signalini berdi. MRO zondi uning quyosh qanotlari muz og‘irligidan singanini suratga oldi.',
    },
    whereIsItNow: {
      ru: 'Феникс вмерз в вечную мерзлоту северной полярной равнины Марса. Каждую полярную зиму он полностью скрывается под метровым панцирем из сухого льда.',
      en: 'Phoenix is encased in the permafrost of Vastitas Borealis, buried beneath a meter-thick slab of dry ice each Martian winter.',
      uz: 'Phoenix Mars shimoliy tekisligining mangu muzligida qoldi. Har qutb qishida u bir metrli quruq muz qatlami ostida qoladi.',
    },
    source: 'https://www.jpl.nasa.gov/missions/phoenix-mars-lander',
    quote: {
      text: {
        ru: 'Мы буквально коснулись и попробовали на вкус воду Марса.',
        en: 'We have touched and tasted the water of Mars.',
        uz: 'Biz Mars suviga bevosita tegdik va uning ta’mini his qildik.',
      },
      speaker: {
        ru: 'Питер Смит, научный руководитель Phoenix',
        en: 'Peter Smith, Phoenix Principal Investigator',
        uz: 'Piter Smit, Phoenix ilmiy rahbari',
      },
      context: {
        ru: 'Северный полюс Марса',
        en: 'Mars North Pole',
        uz: 'Mars Shimoliy qutbi',
      },
      type: 'team_message',
      typeLabel: {
        ru: 'Сообщение команды',
        en: 'Mission Team',
        uz: 'Jamoa so‘zi',
      },
      sourceUrl: 'https://www.jpl.nasa.gov/missions/phoenix-mars-lander'
    },
    specs: [
      {
        label: { ru: 'Посадочная масса', en: 'Mass', uz: 'Massasi' },
        value: { ru: '350 кг', en: '350 kg', uz: '350 kg' }
      },
      {
        label: { ru: 'Длина руки-манипулятора', en: 'Robotic Arm Length', uz: 'Robot qo‘li uzunligi' },
        value: { ru: '2.35 метра с буровым скребком', en: '2.35 meters with scraper', uz: '2.35 metr burg‘ilash qirg‘ichi bilan' }
      },
      {
        label: { ru: 'Печи-анализаторы', en: 'Ovens / Chemistry', uz: 'Tahlil pechlari' },
        value: { ru: 'TEGA (термический и газовый анализатор)', en: 'TEGA thermal & evolved gas analyzer', uz: 'TEGA termik va gaz analizatori' }
      },
      {
        label: { ru: 'Микроскоп', en: 'Microscopy', uz: 'Mikroskop' },
        value: { ru: 'Оптический и атомно-силовой микроскопы', en: 'Optical & atomic-force microscopes', uz: 'Optik va atom-kuch mikroskoplari' }
      },
      {
        label: { ru: 'Температурный предел', en: 'Cold Limit', uz: 'Sovuqqa chidamliligi' },
        value: { ru: 'Выдерживал морозы до -125°C', en: 'Engineered down to -125°C', uz: '-125°C gacha sovuqqa chidagan' }
      },
    ],
    milestones: [
      {
        date: '25.05.2008',
        title: { ru: 'Арктическая посадка', en: 'Arctic Touchdown', uz: 'Arktikaga qo‘nish' },
        description: { ru: 'Первая мягкая посадка в полярном регионе Марса.', en: 'First soft landing in the Martian polar circle.', uz: 'Marsning qutb doirasiga ilk yumshoq qo‘nish.' }
      },
      {
        date: '19.06.2008',
        title: { ru: 'Сублимация льда', en: 'Ice Sublimation', uz: 'Muz sublimatsiyasi' },
        description: { ru: 'Белые гранулы в выкопанной канавке растаяли — доказан водяной лед.', en: 'White trench crumbs vaporized under sunlight — water ice confirmed.', uz: 'Kovlangan xandaqdagi oq parchalar erib ketdi — suv muzi isbotlandi.' }
      },
      {
        date: '02.11.2008',
        title: { ru: 'Наступление полярной ночи', en: 'Polar Night Falls', uz: 'Qutb tunining tushishi' },
        description: { ru: 'Последняя радиопередача перед полным замерзанием батарей.', en: 'Final transmission before batteries froze solid.', uz: 'Batareyalar to‘liq muzlashidan oldingi so‘nggi uzatma.' }
      },
    ],
    signalData: {
      sol: 161,
      frequency: 'UHF Relay via Mars Odyssey',
      lastTelemetry: 'BATTERY CHARGE: 0.1% // SOLAR FLUX: 0 W // HEATER POWER DEGRADED // LINK TERMINATED',
      fadeReason: {
        ru: 'Полярная марсианская ночь и, по подтвержденным снимкам MRO HiRISE, механическое разрушение солнечных панелей под слоем сухого льда.',
        en: 'Polar night and mechanical collapse of solar panels under heavy dry-ice snow (confirmed by MRO HiRISE).',
        uz: 'Qutb tuni va MRO HiRISE suratlari bilan tasdiqlanganidek, quruq muz og‘irligi ostida panellarning mexanik sinishi.',
      },
      quoteRu: 'Солнце ушло за горизонт. Температура падает ниже предела работы систем.',
      quoteEn: 'Sun dipping below horizon. Critical freezing threshold reached.',
      quoteUz: 'Quyosh ufqqa botdi. Harorat tizimlar ishlash chegarasidan pastga tushmoqda.',
    }
  },
  {
    id: 'curiosity',
    name: {
      ru: 'Кьюриосити',
      en: 'Curiosity',
      uz: 'Curiosity',
    },
    englishName: 'Curiosity (MSL)',
    designation: 'Mars Science Laboratory (MSL)',
    destination: 'Mars',
    type: {
      ru: 'Ровер',
      en: 'Rover',
      uz: 'Rover (Marsyurar)',
    },
    launchDate: '26 ноября 2011',
    landingDate: '6 августа 2012',
    activeSpan: '2012 — н. в.',
    status: {
      ru: 'Активен (исследует гору Шарп)',
      en: 'Active (exploring Mount Sharp)',
      uz: 'Faol (Sharp tog‘ini tadqiq qilmoqda)',
    },
    statusType: 'active',
    coordinates: {
      lat: '4.5895° S',
      lon: '137.4417° E',
      latNum: -4.5895,
      lonNum: 137.4417,
      formatted: '4°35′22″ ю. ш. 137°26′30″ в. д.',
    },
    nasaSearchQuery: 'Curiosity rover Mars Gale crater Mount Sharp',
    locationName: {
      ru: 'Кратер Гейл, склон горы Шарп (Aeolis Mons)',
      en: 'Gale Crater, Mount Sharp slope',
      uz: 'Geyl krateri, Sharp tog‘i yonbag‘ri (Aeolis Mons)',
    },
    missionDuration: {
      ru: '13+ лет работы (более 4 400 солов; активен)',
      en: '13+ years of operations (4,400+ sols; ongoing)',
      uz: '13+ yildan beri (4 400 dan ortiq sol; davom etmoqda)',
    },
    distanceTraveled: {
      ru: '32+ км по склонам горы Шарп',
      en: '32+ km across Mount Sharp',
      uz: 'Sharp tog‘i bo‘ylab 32+ km',
    },
    image: '',
    schematicType: 'rover',
    shortDescription: {
      ru: 'Тяжелая ядерная передвижная научная лаборатория размером с легковой внедорожник. Нашла древние органические молекулы и доказала существование древних пресных озер.',
      en: 'Nuclear-powered SUV-sized robotic lab that discovered ancient organic molecules and confirmed past habitable lake systems.',
      uz: 'Yengil avtomobil kattaligidagi yadroviy harakatlanuvchi laboratoriya. Qadimgi organik molekulalarni topib, chuchuk suvli ko‘llar bo‘lganini isbotladi.',
    },
    howGotThere: {
      ru: 'Использовал революционную систему Sky Crane («Небесный кран»): после гиперзвукового торможения и парашюта платформа с ракетными двигателями зависла в 20 метрах над грунтом и мягко опустила ровер на нейлоновых тросах.',
      en: 'Pioneered the Sky Crane descent system: a rocket platform hovered 20m above the Martian surface and lowered the rover on nylon bridles.',
      uz: 'Sky Crane («Samoviy kran») tizimidan foydalandi: 20 metr balandlikda raketa platformasi muallaq turib, roverni neylon arqonlarda yumshoq tushirdi.',
    },
    whatDidItDo: {
      ru: 'Пробурил десятки образцов аргиллитов в кратере Гейл. Обнаружил углеродные цепочки (органику), серу, азот, кислород и фосфор — все ключевые кирпичики земной жизни. Зафиксировал сезонные колебания метана в атмосфере Марса.',
      en: 'Drilled mudstones in Yellowknife Bay, discovering carbon rings, sulfur, nitrogen, oxygen, phosphorus — prime ingredients for life, plus seasonal methane cycles.',
      uz: 'Geyl kraterida o‘nlab jinslarni burg‘iladi. Organik molekulalar, oltingugurt, azot, kislorod va fosforni — hayotning asosiy g‘ishtchalarini topdi.',
    },
    lastContactStory: {
      ru: 'Аппарат активен! В отличие от аппаратов на солнечных батареях, Curiosity не зависит от пылевых бурь благодаря радиоизотопному источнику питания MMRTG, хотя его алюминиевые колеса получили пробоины от острых марсианских камней.',
      en: 'Active and communicating! Powered by an MMRTG plutonium generator, it defies dust storms while steadily climbing Mount Sharp despite wheel punctures.',
      uz: 'Apparat faol! Quyosh panellariga bog‘liq bo‘lmagan MMRTG plutoniy generatori sababli chang bo‘ronlaridan qo‘rqmaydi va Sharp tog‘iga ko‘tarilmoqda.',
    },
    whereIsItNow: {
      ru: 'Ровер продолжает подъем по сульфатному горизонту горы Шарп, передавая сотни снимков и спектров грунта каждый марсианский день.',
      en: 'Ascending the sulfate-bearing unit of Mount Sharp, downlinking hundreds of images and ChemCam spectra every sol.',
      uz: 'Rover Sharp tog‘ining sulfatli qatlamlariga ko‘tarilishni davom ettirmoqda va har kuni yuzlab suratlar uzatmoqda.',
    },
    source: 'https://science.nasa.gov/mission/msl-curiosity/',
    specs: [
      {
        label: { ru: 'Масса', en: 'Mass', uz: 'Massasi' },
        value: { ru: '899 кг', en: '899 kg', uz: '899 kg' }
      },
      {
        label: { ru: 'Источник энергии', en: 'Power Source', uz: 'Quvvat manbai' },
        value: { ru: 'РИТЭГ MMRTG на плутонии-238 (110 Вт электричества)', en: 'MMRTG plutonium-238 generator (110 W electric)', uz: 'Plutoniy-238 MMRTG generatori (110 Vt elektr)' }
      },
      {
        label: { ru: 'Главное оружие науки', en: 'Key Science Tool', uz: 'Asosiy ilmiy qurol' },
        value: { ru: 'Лазер ChemCam / SuperCam (испаряет камень на 7 м)', en: 'ChemCam laser (vaporizes rock at 7m range)', uz: 'ChemCam lazeri (7 m masofadagi toshni bug‘latadi)' }
      },
      {
        label: { ru: 'Лаборатория внутри', en: 'Internal Lab', uz: 'Ichki laboratoriya' },
        value: { ru: 'SAM (анализ газов и органики) и CheMin (дифракция рентгеновских лучей)', en: 'SAM sample analyzer + CheMin X-ray diffraction', uz: 'SAM analizatori va CheMin rentgen difraksiyasi' }
      },
    ],
    milestones: [
      {
        date: '06.08.2012',
        title: { ru: 'Посадка Sky Crane', en: 'Sky Crane Touchdown', uz: 'Sky Crane qo‘nishi' },
        description: { ru: 'Безупречное касание колесами дна кратера Гейл.', en: 'Flawless lowering onto Gale Crater floor.', uz: 'Geyl krateri tubiga g‘ildiraklar bilan bexato tushish.' }
      },
      {
        date: '2013',
        title: { ru: 'Доказательство пресного озера', en: 'Ancient Freshwater Lake', uz: 'Qadimgi chuchuk ko‘l isboti' },
        description: { ru: 'В Йеллоунайф-Бей доказано существование пригодного для жизни водоема.', en: 'Yellowknife Bay confirmed as habitable ancient lakebed.', uz: 'Yellowknife-Bay hududida qadimiy chuchuk ko‘l bo‘lgani isbotlandi.' }
      },
      {
        date: '2018',
        title: { ru: 'Сложные органические молекулы', en: 'Complex Organics Found', uz: 'Murakkab organik molekulalar' },
        description: { ru: 'В древних озерных аргиллитах обнаружены молекулы углерода.', en: 'Preserved organic sulfur-carbon molecules identified.', uz: 'Ko‘l cho‘kindilarida uglerodli organik molekulalar aniqlandi.' }
      },
    ],
  },
  {
    id: 'perseverance',
    name: {
      ru: 'Персеверанс',
      en: 'Perseverance',
      uz: 'Perseverance',
    },
    englishName: 'Perseverance (Mars 2020)',
    designation: 'Mars 2020 Rover (Percy)',
    destination: 'Mars',
    type: {
      ru: 'Ровер',
      en: 'Rover',
      uz: 'Rover (Marsyurar)',
    },
    launchDate: '30 июля 2020',
    landingDate: '18 февраля 2021',
    activeSpan: '2021 — н. в.',
    status: {
      ru: 'Активен (бурит образцы древней дельты)',
      en: 'Active (caching delta cores)',
      uz: 'Faol (qadimiy delta namunalarini yig‘moqda)',
    },
    statusType: 'active',
    coordinates: {
      lat: '18.4447° N',
      lon: '77.4508° E',
      latNum: 18.4447,
      lonNum: 77.4508,
      formatted: '18°26′41″ с. ш. 77°27′03″ в. д.',
    },
    nasaSearchQuery: 'Perseverance rover Mars Jezero crater samples',
    locationName: {
      ru: 'Кратер Езеро, веерная речная дельта (Jezero Delta)',
      en: 'Jezero Crater, river delta deposit',
      uz: 'Jezero krateri, daryo deltasi (Jezero Delta)',
    },
    missionDuration: {
      ru: '5+ лет экспедиции (активен)',
      en: '5+ years of operations (ongoing)',
      uz: '5+ yildan beri (davom etmoqda)',
    },
    distanceTraveled: {
      ru: '29+ км по дну кратера Езеро',
      en: '29+ km across Jezero floor',
      uz: 'Jezero tubi bo‘ylab 29+ km',
    },
    image: '',
    schematicType: 'rover',
    shortDescription: {
      ru: 'Флагманский ровер NASA, ищущий следы древней микробной жизни. Впервые в истории запечатывает керны марсианских пород в титановые трубки для доставки на Землю.',
      en: 'NASA’s flagship astrobiology rover caching drill cores in sealed titanium tubes for future Mars Sample Return.',
      uz: 'Qadimgi mikrob hayoti izlarini qidirayotgan NASA bosh roveri. Yerga olib kelish uchun Mars toshlarini titan naychalarga muhrlamoqda.',
    },
    howGotThere: {
      ru: 'Совершил посадку с помощью усовершенствованной системы Sky Crane с технологией Terrain Relative Navigation (TRN), которая в реальном времени сканировала опасности грунта на скорости 300 км/ч и выбрала идеальную точку посадки.',
      en: 'Landed via Terrain Relative Navigation (TRN) Sky Crane, scanning surface hazards in real-time to touch down safely.',
      uz: 'Terrain Relative Navigation (TRN) texnologiyali Sky Crane tizimi orqali 300 km/soat tezlikda xavflarni skanerlab, xavfsiz qo‘ndi.',
    },
    whatDidItDo: {
      ru: 'Успешно запечатал более 20 кернов пород в титановые пробирки и выложил первый в истории склад образцов Three Forks на Марсе. Доказал выработку кислорода из марсианского CO₂ прибором MOXIE (122 г кислорода — хватит собаке на 10 часов).',
      en: 'Cached 20+ titanium sample tubes and dropped the Three Forks depot. Extracted 122g of breathable oxygen from CO₂ atmosphere using MOXIE.',
      uz: '20 dan ortiq tosh namunasini titan naychalarga muhrladi. MOXIE asbobi bilan CO₂ atmosferasidan 122 gramm nafas oladigan kislorod ishlab chiqardi.',
    },
    lastContactStory: {
      ru: 'Ровер активен и функционирует в штатном режиме, исследуя древнюю озерную дельту кратера Езеро.',
      en: 'Active and flourishing, exploring the rim crests and river delta deposits of Jezero.',
      uz: 'Rover faol holatda Jezero kraterining qadimiy daryo deltasini o‘rganishni davom ettirmoqda.',
    },
    whereIsItNow: {
      ru: 'Персеверанс поднимается на внешний вал кратера Езеро, передавая уникальные цветные панорамы и звуки ветра со своих двух микрофонов.',
      en: 'Climbing toward the outer rim of Jezero Crater, returning ultra-high-resolution soundscapes and color panoramas.',
      uz: 'Perseverance Jezero kraterining tashqi qirrasiga ko‘tarilib, ikki mikrofoni orqali Mars shamoli ovozlarini uzatmoqda.',
    },
    source: 'https://science.nasa.gov/mission/mars-2020-perseverance/',
    specs: [
      {
        label: { ru: 'Масса', en: 'Mass', uz: 'Massasi' },
        value: { ru: '1 025 кг (самый тяжелый ровер в истории)', en: '1,025 kg (heaviest rover ever flown)', uz: '1 025 kg (tarixdagi eng og‘ir rover)' }
      },
      {
        label: { ru: 'Бортовой вертолет', en: 'Helicopter Scout', uz: 'Yo‘ldosh vertolyot' },
        value: { ru: 'Доставил на Марс дрон Ingenuity', en: 'Carried Ingenuity scout drone', uz: 'Marsga Ingenuity dronini yetkazdi' }
      },
      {
        label: { ru: 'Генератор кислорода', en: 'Oxygen Generator', uz: 'Kislorod generatori' },
        value: { ru: 'MOXIE (выделяет O₂ из CO₂)', en: 'MOXIE in-situ oxygen electrolysis', uz: 'MOXIE (CO₂ dan O₂ ajratib oladi)' }
      },
      {
        label: { ru: 'Звуки Марса', en: 'Audio Sensors', uz: 'Ovoz sensorlari' },
        value: { ru: '2 микрофона (впервые записали истинный звук Марса)', en: 'Dual microphones (recorded first true Mars sounds)', uz: '2 ta mikrofon (Marsning haqiqiy ovozini yozib oldi)' }
      },
    ],
    milestones: [
      {
        date: '18.02.2021',
        title: { ru: 'Посадка в Езеро', en: 'Jezero Touchdown', uz: 'Jezeroga qo‘nish' },
        description: { ru: 'Высадка в опасной древней озерной дельте.', en: 'High-precision landing at Jezero Crater.', uz: 'Qadimiy ko‘l deltasiga yuqori aniqlikda qo‘nish.' }
      },
      {
        date: '20.04.2021',
        title: { ru: 'Первый кислород', en: 'First Oxygen Produced', uz: 'Ilk kislorod ishlab chiqarilishi' },
        description: { ru: 'Прибор MOXIE впервые выделил чистый кислород из марсианского воздуха.', en: 'MOXIE generated 5.4 grams of breathable O₂.', uz: 'MOXIE apparati Mars havosidan sof kislorod ajratib oldi.' }
      },
      {
        date: '2023',
        title: { ru: 'Склад Three Forks', en: 'Three Forks Sample Depot', uz: 'Three Forks ombori' },
        description: { ru: 'На грунте выложены резервные титановые трубки для доставки на Землю.', en: '10 duplicate sample tubes deposited for Mars Sample Return.', uz: 'Yerga olib kelish uchun zaxira titan naychalari sirtga joylashtirildi.' }
      },
    ],
  },
  {
    id: 'viking-1',
    name: {
      ru: 'Викинг-1 (посадочный модуль)',
      en: 'Viking 1 Lander',
      uz: 'Viking 1 qo‘nish moduli',
    },
    englishName: 'Viking 1 Lander',
    designation: 'Viking 1 Lander (Thomas Mutch Memorial Station)',
    destination: 'Mars',
    type: {
      ru: 'Посадочный модуль',
      en: 'Stationary Lander',
      uz: 'Statsionar qo‘nish moduli',
    },
    launchDate: '20 августа 1975',
    landingDate: '20 июля 1976',
    lastContactDate: '11 ноября 1982',
    activeSpan: '1976 — 1982',
    status: {
      ru: 'Миссия завершена (ошибка команды Uplink)',
      en: 'Mission complete (uplink antenna table overwrite)',
      uz: 'Missiya yakunlandi (Yerdan uzatilgan buyruq xatosi)',
    },
    statusType: 'complete',
    coordinates: {
      lat: '22.48° N',
      lon: '47.95° W',
      latNum: 22.48,
      lonNum: -47.95,
      formatted: '22°28′48″ с. ш. 47°58′12″ з. д.',
    },
    nasaSearchQuery: 'Viking 1 lander Chryse Planitia Mars',
    orbitalSearchQuery: 'Viking 1 Chryse Planitia lander HiRISE MRO',
    locationName: {
      ru: 'Золотая равнина (Chryse Planitia), Мемориальная станция Томаса Матча',
      en: 'Chryse Planitia (Plains of Gold), Thomas Mutch Memorial Station',
      uz: 'Oltin tekislik (Chryse Planitia), Tomas Match yodgorlik stansiyasi',
    },
    missionDuration: {
      ru: '6 лет 3 месяца 22 дня (2 245 солов; расчетный: 90 солов)',
      en: '6 years 3 months 22 days (2,245 sols; planned: 90 sols)',
      uz: '6 yil 3 oy 22 kun (2 245 sol; reja: 90 sol)',
    },
    distanceTraveled: {
      ru: '0 км (стационарная посадочная станция)',
      en: '0 km (stationary surface lander)',
      uz: '0 km (statsionar qo‘nish stansiyasi)',
    },
    image: '',
    schematicType: 'lander',
    shortDescription: {
      ru: 'Первый в истории космический аппарат, успешно выполнивший долговременную программу на поверхности Марса. Передал первые цветные панорамы марсианской пустыни в высоком разрешении и провел первые химико-биологические пробы грунта.',
      en: 'First spacecraft to successfully operate long-term on the surface of Mars, transmitting the first high-resolution color panoramas and conducting the first in-situ search for organic biosignatures.',
      uz: 'Mars yuzasida uzoq muddatli dasturni muvaffaqiyatli bajargan tarixdagi ilk kosmik apparat. Ilk rangli yuqori aniqlikdagi panoramalarni uzatdi va ilk tuproq tahlillarini o‘tkazdi.',
    },
    howGotThere: {
      ru: 'Запущен ракетой-носителем Titan IIIE / Centaur с мыса Канаверал. Орбитальный аппарат Viking 1 провел месяц на орбите Марса, картографируя рельеф для выбора безопасного места посадки. 20 июля 1976 года посадочный модуль отделился, вошел в атмосферу с аэродинамическим экраном, раскрыл парашют на высоте 6 км и совершил мягкую посадку с помощью трех регулируемых двигателей терминального торможения.',
      en: 'Launched via a Titan IIIE / Centaur rocket. After entering Mars orbit in June 1976, the orbiter mapped the surface to certify a safe touchdown site. On July 20, 1976, the lander separated, utilized an aeroshell and parachute, and completed terminal descent using three throttleable monopropellant hydrazine engines.',
      uz: 'Titan IIIE / Centaur raketasida uchirilgan. 1976-yil iyunda Mars orbitasiga kirgach, xavfsiz qo‘nish joyini tanlash uchun bir oy xaritalash o‘tkazildi. 20-iyulda modul ajralib, parashyut va uchta gidrazin dvigateli yordamida Chryse Planitiaga mayin qo‘ndi.',
    },
    whatDidItDo: {
      ru: 'Передал первую историческую панораму поверхности Марса через несколько минут после посадки. Роботизированная рука взяла образцы реголита для биологических экспериментов (Gas Exchange, Pyrolytic Release, Labeled Release) и газового хромато-масс-спектрометра (GCMS). Станция непрерывно измеряла атмосферное давление, скорость ветра и температуру в течение более 6 лет, составив первую марсианскую климатическую летопись.',
      en: 'Transmitted the very first panoramic image from the surface of Mars within minutes of landing. Its robotic arm scooped surface samples into three biological laboratories and a GCMS spectrometer. The station monitored temperature, wind, and atmospheric pressure for over six years, providing humanity’s first multi-year Martian weather record.',
      uz: 'Qo‘ngandan so‘ng bir necha daqiqa ichida Mars sirtining ilk tarixiy panoramasini uzatdi. Mexanik qo‘l yordamida tuproq namunalari olinib, uchta biologik laboratoriya va GCMS spektrometrida tekshirildi. 6 yildan ortiq vaqt davomida Mars ob-havosi, bosimi va shamol tezligini uzluksiz o‘lchab turdi.',
    },
    lastContactStory: {
      ru: '11 ноября 1982 года инженеры Лаборатории реактивного движения (JPL) передали команду по обновлению программного обеспечения батарей. Из-за опечатки в адресе памяти новая подпрограмма непреднамеренно перезаписала сектор управления антенной высокого усиления (HGA). Антенна отвернулась от Земли, и аппарат потерял способность принимать радиокоманды и передавать данные. Попытки восстановить связь продолжались до мая 1983 года.',
      en: 'On November 11, 1982, ground controllers transmitted an uplink software patch intended to upgrade battery management. An inadvertent memory address overlap overwrote the high-gain antenna pointing tables. The antenna drifted away from Earth alignment, permanently breaking the communications link despite recovery campaigns lasting until May 1983.',
      uz: '1982-yil 11-noyabrda JPL muhandislari batareya boshqaruvini yangilash uchun Yerdan dastur yuborishdi. Xotira manzilidagi xatolik sababli yuqori kuchaytirgichli antenna yo‘nalishi parametrlari o‘chib ketdi. Antenna Yerdan burilib qoldi va aloqa butunlay uzildi.',
    },
    whereIsItNow: {
      ru: 'Посадочный модуль «Викинг-1» покоится на равнине Хриса среди камней и мелких дюн. В 1984 году NASA официально переименовало станцию в «Мемориальную станцию Томаса Матча» в честь лидера группы съемки Viking. Орбитальный аппарат MRO с помощью камеры HiRISE сфотографировал аппарат в декабре 2006 года.',
      en: 'Viking 1 Lander rests among wind-carved drifts in Chryse Planitia. In 1984, NASA designated the site the Thomas A. Mutch Memorial Station in tribute to the Viking imaging team leader. Mars Reconnaissance Orbiter’s HiRISE camera captured clear orbital imagery of the lander and its backshell in 2006.',
      uz: 'Viking 1 moduli Chryse Planitia tekisligidagi qumtoshlar orasida saqlanib turibdi. 1984-yilda NASA unga Tomas Match xotira stansiyasi nomini berdi. MRO kosmik apparatining HiRISE kamerasi 2006-yilda uning orbitadan suratini muvaffaqiyatli oldi.',
    },
    source: 'https://science.nasa.gov/mission/viking-1/',
    quote: {
      text: {
        ru: 'Это не просто посадка на другую планету — это наш первый постоянный плацдарм в глубоком космосе.',
        en: 'This is not just a landing on another world — it is our first permanent foothold in the deep cosmos.',
        uz: 'Bu shunchaki boshqa sayyoraga qo‘nish emas — bu bizning koinot qa’ridagi ilk doimiy manzilimizdir.',
      },
      speaker: {
        ru: 'Джеймс Мартин (руководитель проекта Viking, NASA Langley)',
        en: 'James S. Martin Jr. (Viking Project Manager, NASA Langley)',
        uz: 'Jeyms Martin (Viking loyihasi rahbari, NASA Langley)',
      },
      context: {
        ru: '20 июля 1976 года, пресс-конференция NASA JPL',
        en: 'July 20, 1976, NASA JPL landing press conference',
        uz: '1976-yil 20-iyul, NASA JPL matbuot anjumani',
      },
      type: 'team_message',
      typeLabel: {
        ru: 'Заявление миссии',
        en: 'Mission statement',
        uz: 'Missiya bayonoti',
      },
      sourceUrl: 'https://history.nasa.gov/SP-4212/ch11-5.htm',
    },
    specs: [
      {
        label: { ru: 'Посадочная масса', en: 'Landed Mass', uz: 'Qo‘nish massasi' },
        value: { ru: '657 кг (с неизрасходованным топливом: 572 кг сухого)', en: '657 kg (572 kg dry mass on surface)', uz: '657 kg (quruq massasi 572 kg)' },
      },
      {
        label: { ru: 'Источник энергии', en: 'Power Source', uz: 'Quvvat manbai' },
        value: { ru: '2 РИТЭГа SNAP-19 (плутоний-238, 70 Вт электрических)', en: 'Two SNAP-19 RTGs (Plutonium-238, ~70 W electrical)', uz: '2 ta SNAP-19 RITEG (plutoniy-238, 70 Vt elektr quvvati)' },
      },
      {
        label: { ru: 'Научные инструменты', en: 'Payload', uz: 'Ilmiy apparatura' },
        value: { ru: '2 фасетные камеры, газовый хромато-масс-спектрометр (GCMS), блок биологии (GEX, PR, LR), метеодатчики, рентгенофлуоресцентный спектрометр', en: 'Dual facsimile cameras, GCMS, biology experiments (GEX, PR, LR), meteorology boom, X-ray fluorescence', uz: '2 ta kamera, GCMS xromato-mass-spektrometri, 3 ta biologiya laboratoriyasi, meteosensorlar, rentgen spektrometri' },
      },
      {
        label: { ru: 'Длина руки-манипулятора', en: 'Robotic Arm Reach', uz: 'Manipulyator uzunligi' },
        value: { ru: '3 метра с грунтозаборным совком и ситом', en: '3.0 meters with trenching scoop and backhoe sieve', uz: '3 metrli cho‘mich va elakli mexanik qo‘l' },
      },
      {
        label: { ru: 'Связь', en: 'Communications', uz: 'Aloqa' },
        value: { ru: 'S-band антенна высокого усиления (HGA) на Землю + UHF радиолиния на орбитер Viking', en: 'Direct-to-Earth S-band HGA + UHF relay to Viking Orbiter', uz: 'Yerga to‘g‘ridan-to‘g‘ri S-band HGA + Viking orbiteri orqali UHF' },
      },
    ],
    milestones: [
      {
        date: '20.08.1975',
        title: { ru: 'Старт с мыса Канаверал', en: 'Launch from Cape Canaveral', uz: 'Kanaveral burnidan start' },
        description: { ru: 'Запуск тяжелой ракетой Titan IIIE / Centaur к Марсу.', en: 'Launched on Titan IIIE / Centaur towards Mars.', uz: 'Titan IIIE raketasida Mars tomon yo‘l oldi.' },
      },
      {
        date: '20.07.1976',
        title: { ru: 'Мягкая посадка на Марс', en: 'Chryse Planitia Touchdown', uz: 'Marsga mayin qo‘nish' },
        description: { ru: 'Первое успешное мягкое приземление американского аппарата на Красную планету.', en: 'First successful soft landing by an American spacecraft on Mars.', uz: 'Amerika apparatining Marsga ilk muvaffaqiyatli mayin qo‘nishi.' },
      },
      {
        date: '28.07.1976',
        title: { ru: 'Первый забор марсианского грунта', en: 'First Soil Sampling', uz: 'Mars tuprog‘ining ilk olinishi' },
        description: { ru: 'Манипулятор вырыл первую траншею в реголите и загрузил почву в биологические камеры.', en: 'Surface sampler dug the first trench, delivering regolith into internal biology incubators.', uz: 'Manipulyator ilk chuqurchani qazib, tuproqni tahlil kamerasiga yetkazdi.' },
      },
      {
        date: '11.11.1982',
        title: { ru: 'Потеря связи', en: 'Loss of Signal', uz: 'Aloqaning yo‘qotilishi' },
        description: { ru: 'Сбой в передаче команд переориентировал антенну в открытый космос.', en: 'An antenna pointing command error severed communications forever.', uz: 'Buyruq uzatishdagi xatolik antennani ochiq koinotga burib yubordi.' },
      },
    ],
    signalData: {
      sol: 2245,
      frequency: '2295.0 MHz (S-band)',
      lastTelemetry: 'CARRIER DETECTED // HGA STEERING REGISTERS OVERWRITTEN // AZIMUTH ANGLE DRIFT // SIGNAL DROP TO NOISE FLOOR',
      fadeReason: {
        ru: 'Непреднамеренная перезапись командной таблицы ориентации антенны высокого усиления (HGA) при загрузке патча батарей, приведшая к уходу луча от Земли.',
        en: 'Accidental software overwrite of High Gain Antenna pointing memory coordinates during a battery patch upload, causing beam misalignment with Earth.',
        uz: 'Batareya dasturini yangilash vaqtida yuqori kuchaytirgichli antenna yo‘naltiruvchi koordinatalari xotiradan o‘chib ketishi oqibatida aloqa nuri Yerdan og‘ib ketdi.',
      },
      quoteRu: '«Мы пытались поймать сигнал Viking 1 долгие месяцы на всех станциях DSN, но антенна застыла не в ту сторону».',
      quoteEn: '“We tried to re-acquire Viking 1 for months across the DSN network, but the antenna remained pointed away from home.”',
      quoteUz: '«Biz oylarcha barcha DSN stansiyalarida Viking 1 signalini tutishga urindik, ammo antenna Yerdan butunlay boshqa tomonga qarab qolgandi».',
      sourceUrl: 'https://science.nasa.gov/mission/viking-1/',
    },
  },
  {
    id: 'viking-2',
    name: {
      ru: 'Викинг-2 (посадочный модуль)',
      en: 'Viking 2 Lander',
      uz: 'Viking 2 qo‘nish moduli',
    },
    englishName: 'Viking 2 Lander',
    designation: 'Viking 2 Lander (Viking-B)',
    destination: 'Mars',
    type: {
      ru: 'Посадочный модуль',
      en: 'Stationary Lander',
      uz: 'Statsionar qo‘nish moduli',
    },
    launchDate: '9 сентября 1975',
    landingDate: '3 сентября 1976',
    lastContactDate: '11 апреля 1980',
    activeSpan: '1976 — 1980',
    status: {
      ru: 'Миссия завершена (отказ аккумуляторов)',
      en: 'Mission complete (battery failure)',
      uz: 'Missiya yakunlandi (akkumulyator ishdan chiqishi)',
    },
    statusType: 'complete',
    coordinates: {
      lat: '47.97° N',
      lon: '134.28° E',
      latNum: 47.97,
      lonNum: 134.28,
      formatted: '47°58′12″ с. ш. 134°16′48″ в. д.',
    },
    nasaSearchQuery: 'Viking 2 lander Utopia Planitia Mars',
    orbitalSearchQuery: 'Viking 2 Utopia Planitia lander HiRISE',
    locationName: {
      ru: 'Равнина Утопия (Utopia Planitia)',
      en: 'Utopia Planitia',
      uz: 'Utopiya tekisligi (Utopia Planitia)',
    },
    missionDuration: {
      ru: '3 года 7 месяцев 8 дней (1 281 сол; расчетный: 90 солов)',
      en: '3 years 7 months 8 days (1,281 sols; planned: 90 sols)',
      uz: '3 yil 7 oy 8 kun (1 281 sol; reja: 90 sol)',
    },
    distanceTraveled: {
      ru: '0 км (стационарная посадочная станция)',
      en: '0 km (stationary surface lander)',
      uz: '0 km (statsionar qo‘nish stansiyasi)',
    },
    image: '',
    schematicType: 'lander',
    shortDescription: {
      ru: 'Второй аппарат программы «Викинг», совершивший посадку в северных полярных широтах на равнине Утопия. Впервые зафиксировал марсианское землетрясение бортовым сейсмометром и запечатлел зимний иней из водяного льда на марсианских камнях.',
      en: 'The twin Viking probe landing at high northern latitudes in Utopia Planitia. Its surface seismometer recorded the only confirmed Martian quake of the 20th century and captured seasonal water-ice frost mantling boulders.',
      uz: '«Viking» dasturining ikkinchi apparati, Utopia tekisligining shimoliy kengliklariga qo‘ndi. 20-asrda ilk bor Marsdagi zilzilani seysmometr bilan qayd etdi va qishki suv muzi qirovini suratga oldi.',
    },
    howGotThere: {
      ru: 'Запущен ракетой Titan IIIE / Centaur вслед за Viking 1. После выхода на марсианскую орбиту в августе 1976 года провел рекогносцировку посадочной площадки. Спускаемый аппарат отделился 3 сентября 1976 года и совершил высокоточную посадку на равнине Утопия, смягчив удар наклонными амортизационными стойками, причем одна из опор оперлась прямо на крупный камень, придав платформе наклон в 8.2 градуса.',
      en: 'Launched atop a Titan IIIE / Centaur rocket. After orbital insertion in August 1976, it separated on September 3, 1976. The lander touched down safely in Utopia Planitia; one of its footpads rested on a rock, tilting the science deck by 8.2 degrees.',
      uz: 'Titan IIIE raketasida uchirilgan. 1976-yil 3-sentabrda Utopia tekisligiga qo‘ndi; uning bitta oyog‘i tosh ustiga tushib, apparat 8.2 darajaga qiyaroq holatda muvaffaqiyatli o‘rnashdi.',
    },
    whatDidItDo: {
      ru: 'В отличие от Viking 1, где сейсмометр заклинило при транспортировке, сейсмометр Viking 2 успешно раскрылся и зарегистрировал сейсмическое событие 80-го сола силой около 2.8 баллов. Передал 16 000 изображений, зафиксировал сезонное образование тонкого слоя водяного инея и доказал высокое содержание связанной воды в северных широтах Марса.',
      en: 'While Viking 1’s seismometer failed to uncage, Viking 2’s seismometer deployed successfully and registered a genuine Martian seismic event on Sol 80. Transmitted 16,000 images, documented seasonal thin sheets of water frost, and proved abundant permafrost in the northern lowlands.',
      uz: 'Viking 1 dagi seysmometr tiqilib qolgan bo‘lsa, Viking 2 dagi seysmometr ochildi va 80-kuni 2.8 balli Mars zilzilasini qayd etdi. 16 000 dan ortiq surat uzatdi, qishki qirov qatlamini aniqladi va shimoliy tekisliklarda suvli qatlamlar borligini isbotladi.',
    },
    lastContactStory: {
      ru: 'К весне 1980 года никель-кадмиевые аккумуляторы станции полностью деградировали из-за сотен циклов глубокого промерзания марсианскими ночами. 11 апреля 1980 года станция передала последний телеметрический пакет и замолчала навсегда.',
      en: 'By the spring of 1980, the lander’s nickel-cadmium batteries degraded following years of extreme diurnal thermal cycling. On April 11, 1980, the station transmitted its final telemetry packet and permanently exhausted its power storage.',
      uz: '1980-yil bahoriga kelib stansiyaning nikel-kadmiy batareyalari yuzlab qattiq sovuq Mars tunlaridan so‘ng butunlay yaroqsiz bo‘lib qoldi. 1980-yil 11-aprelda apparat so‘nggi ma’lumotlarni uzatib, mangu o‘chdi.',
    },
    whereIsItNow: {
      ru: 'Посадочный модуль «Викинг-2» стоит на равнине Утопия, окруженный усыпанным валунами ландшафтом. В 2007 году камера HiRISE зонда MRO идентифицировала посадочный модуль, его парашют и теплозащитный экран на расстоянии всего нескольких сотен метров друг от друга.',
      en: 'Viking 2 rests in Utopia Planitia amidst a field of pitted boulders. In 2007, NASA’s Mars Reconnaissance Orbiter HiRISE camera resolved the lander, its parachute, and heat shield on the Martian surface.',
      uz: 'Viking 2 Utopia tekisligidagi toshlar orasida turibdi. 2007-yilda NASA ning MRO zondidagi HiRISE kamerasi qo‘nish moduli, parashyuti va issiqlik qalqonini koinotdan aniq suratga oldi.',
    },
    source: 'https://science.nasa.gov/mission/viking-2/',
    specs: [
      {
        label: { ru: 'Посадочная масса', en: 'Landed Mass', uz: 'Qo‘nish massasi' },
        value: { ru: '657 кг (сухая масса: 572 кг)', en: '657 kg (572 kg dry mass)', uz: '657 kg (quruq massasi 572 kg)' },
      },
      {
        label: { ru: 'Источник энергии', en: 'Power Source', uz: 'Quvvat manbai' },
        value: { ru: '2 РИТЭГа SNAP-19 (плутоний-238)', en: 'Two SNAP-19 RTGs (Plutonium-238)', uz: '2 ta SNAP-19 RITEG (plutoniy-238)' },
      },
      {
        label: { ru: 'Сейсмометр', en: 'Seismometer', uz: 'Seysmometr' },
        value: { ru: '3-осевой короткопериодный сейсмометр (успешно работал)', en: '3-axis short-period seismometer (operational)', uz: '3 o‘qli qisqa davrli seysmometr (muvaffaqiyatli ishladi)' },
      },
      {
        label: { ru: 'Наклон платформы', en: 'Surface Tilt', uz: 'Qo‘nish qiyaligi' },
        value: { ru: '8.2° (одна опора встала на камень)', en: '8.2° (one footpad rested on a rock)', uz: '8.2° (bir tayanchi tosh ustiga qo‘ndi)' },
      },
    ],
    milestones: [
      {
        date: '09.09.1975',
        title: { ru: 'Старт экспедиции', en: 'Launch', uz: 'Start' },
        description: { ru: 'Запуск к Марсу с мыса Канаверал ракетой Titan IIIE.', en: 'Launched to Mars on a Titan IIIE / Centaur.', uz: 'Titan IIIE raketasida Kanaveral burnidan uchirildi.' },
      },
      {
        date: '03.09.1976',
        title: { ru: 'Посадка в равнине Утопия', en: 'Touchdown in Utopia', uz: 'Utopiya tekisligiga qo‘nish' },
        description: { ru: 'Мягкая посадка в 48-й северной параллели Марса.', en: 'Soft landing in the Martian northern lowlands.', uz: 'Marsning 48-shimoliy parallel tekisligiga mayin qo‘nish.' },
      },
      {
        date: '23.11.1976',
        title: { ru: 'Марсотрясение 80-го сола', en: 'Sol 80 Marsquake', uz: '80-sol zilzilasi' },
        description: { ru: 'Сейсмометр зафиксировал истинные сейсмические колебания недр Марса.', en: 'First detection of seismic vibrations originating inside Mars.', uz: 'Seysmometr Mars qa’ridagi ilk haqiqiy seysmik to‘lqinlarni qayd etdi.' },
      },
      {
        date: '11.04.1980',
        title: { ru: 'Окончание питания', en: 'End of Mission', uz: 'Quvvat tugashi' },
        description: { ru: 'Отказ бортовых аккумуляторов прекратил передачу телеметрии.', en: 'Degraded storage batteries permanently ended transmissions.', uz: 'Bort akkumulyatorlari quvvatsizlanib, telemetriya to‘xtadi.' },
      },
    ],
    signalData: {
      sol: 1281,
      frequency: '2295.0 MHz (S-band)',
      lastTelemetry: 'VOLTAGE BUS FAULT // CELL REVERSAL IN BATTERY SET // TX CARRIER UNSTABLE // SHUTDOWN',
      fadeReason: {
        ru: 'Полный износ и переполюсовка ячеек никель-кадмиевых аккумуляторов после 1281 сола в условиях суточных перепадов температур от -120°C до -20°C.',
        en: 'Degradation and cell reversal of Ni-Cd secondary batteries after 1,281 sols enduring deep thermal cycles from -120°C to -20°C.',
        uz: 'Nikel-kadmiy batareyalarining 1281 sol davomida -120°C gacha bo‘lgan sovuq Mars tunlarida to‘liq eskirishi va kuchlanish yo‘qolishi.',
      },
      quoteRu: '«Викинг-2 замолчал, оставив нам первый в истории сейсмический пульс марсианских недр».',
      quoteEn: '“Viking 2 fell silent, leaving humanity with our very first seismic pulse of the Martian interior.”',
      quoteUz: '«Viking 2 o‘z faoliyatini yakunladi va insoniyatga Mars qa’rining ilk seysmik nafasini qoldirdi».',
      sourceUrl: 'https://science.nasa.gov/mission/viking-2/',
    },
  },
  {
    id: 'surveyor-3',
    name: {
      ru: 'Сервейер-3 (Surveyor 3)',
      en: 'Surveyor 3',
      uz: 'Surveyor 3',
    },
    englishName: 'Surveyor 3',
    designation: 'Surveyor 3 (Surveyor-C)',
    destination: 'Moon',
    type: {
      ru: 'Посадочный модуль',
      en: 'Lunar Lander',
      uz: 'Oy qo‘nish moduli',
    },
    launchDate: '17 апреля 1967',
    landingDate: '20 апреля 1967',
    lastContactDate: '4 мая 1967 (визит Apollo 12: 19–20 ноября 1969)',
    activeSpan: '1967 (визит: 1969)',
    status: {
      ru: 'Миссия завершена (обследован астронавтами Apollo 12)',
      en: 'Mission complete (visited by Apollo 12 crew)',
      uz: 'Missiya yakunlandi (Apollo 12 astronavtlari tashrif buyurgan)',
    },
    statusType: 'complete',
    coordinates: {
      lat: '3.015° S',
      lon: '23.418° W',
      latNum: -3.015,
      lonNum: -23.418,
      formatted: '3°00′54″ ю. ш. 23°25′05″ з. д.',
    },
    nasaSearchQuery: 'Surveyor 3 Apollo 12 Moon crater',
    orbitalSearchQuery: 'Surveyor 3 Apollo 12 LROC landing site',
    locationName: {
      ru: 'Океан Бурь (Oceanus Procellarum), кратер Сервейер',
      en: 'Oceanus Procellarum, Surveyor Crater',
      uz: 'Bo‘ronlar ummoni (Oceanus Procellarum), Surveyor krateri',
    },
    missionDuration: {
      ru: '14 дней работы (детали возвращены на Землю через 2.5 года экипажем Apollo 12)',
      en: '14 days active telemetry (components retrieved after 2.5 years by Apollo 12)',
      uz: '14 kun faol ishladi (qismlari 2.5 yildan so‘ng Apollo 12 tomonidan Yerga qaytarildi)',
    },
    distanceTraveled: {
      ru: '0 км (стационарный лунный аппарат)',
      en: '0 km (stationary lunar lander)',
      uz: '0 km (statsionar Oy apparati)',
    },
    image: '',
    schematicType: 'lander',
    shortDescription: {
      ru: 'Легендарный лунный аппарат NASA, исследовавший грунт механическим совком перед полетами людей. Спустя 2.5 года лунный модуль Apollo 12 сел в 160 метрах от него: астронавты подошли к аппарату и привезли его телекамеру обратно на Землю.',
      en: 'Pioneering lunar lander that dug the first trenches in lunar soil. Two and a half years later, Apollo 12 landed 160 meters away; astronauts walked to it and brought its TV camera back to Earth for laboratory study.',
      uz: 'Odamlar parvozidan avval Oy tuprog‘ini mexanik cho‘mich bilan o‘rgangan afsonaviy apparat. 2.5 yildan so‘ng Apollo 12 undan 160 metr masofaga qo‘nib, astronavtlar uning videokamerasini Yerga olib kelishgan.',
    },
    howGotThere: {
      ru: 'Запущен ракетой Atlas-Centaur с мыса Канаверал. При подлете к Луне твердотопливный тормозной двигатель погасил основную скорость, а три жидкостных верньерных двигателя управляли спуском. Из-за высокой отражательной способности грунта радар посадки задержал отключение двигателей: аппарат коснулся грунта, отскочил на 10 метров, отскочил второй раз на 3 метра и окончательно замер на 14-градусном склоне кратера Сервейер.',
      en: 'Launched on an Atlas-Centaur rocket directly into a lunar transfer orbit. During final descent, surface radar reflections delayed engine cutoff, causing the lander to bounce twice — first leaping 10 meters, then 3 meters — before coming to rest on the 14-degree inner slope of Surveyor Crater.',
      uz: 'Atlas-Centaur raketasida Kanaveral burnidan to‘g‘ridan-to‘g‘ri Oyga uchirildi. Qo‘nish vaqtida radar nurlarining kutilmagan aks etishi tufayli dvigatellar kechroq o‘chdi: apparat sirtga urilib, 10 metrga sakradi, so‘ng yana 3 metrga sakrab krater yonbag‘riga to‘xtadi.',
    },
    whatDidItDo: {
      ru: 'Передал 6 315 высококачественных телевизионных кадров лунной поверхности. Роботизированный совок впервые вырыл четыре траншеи глубиной до 17.5 см, доказав, что лунный грунт имеет консистенцию влажного песка и способен выдержать вес лунного модуля «Аполлон». 19–20 ноября 1969 года астронавты Apollo 12 Пит Конрад и Алан Бин подошли к аппарату пешком, срезали телекамеру, совок и фрагменты кабелей и привезли их в лаборатории NASA для анализа воздействия космоса.',
      en: 'Returned 6,315 television pictures of the lunar terrain. Its robotic scoop dug four trenches up to 17.5 cm deep, confirming lunar regolith had the bearing strength to support Apollo astronaut landings. On November 19-20, 1969, Apollo 12 astronauts Pete Conrad and Alan Bean walked to the lander, removed its TV camera, scoop, and cables, and returned them to Earth to evaluate prolonged cosmic exposure.',
      uz: 'Oy sirtining 6 315 ta sifatli tasvirini uzatdi. Robot qo‘li 17.5 sm chuqurlikda 4 ta chuqur qazib, tuproq insonlar va «Apollon» moduli og‘irligini bemalol ko‘tara olishini isbotladi. 1969-yil noyabrda Apollo 12 astronavtlari uning kamerasini va cho‘michini kesib olib, Yer laboratoriyalariga keltirishdi.',
    },
    lastContactStory: {
      ru: 'Сервейер-3 работал на протяжении двухнедельного лунного дня до 4 мая 1967 года, когда над Океаном Бурь опустилась ледяная двухнедельная ночь (-170°C). После восхода Солнца аппарат не смог возобновить радиовещание из-за замерзания батарей. Исторический эпилог наступил 19 ноября 1969 года, когда астронавты Apollo 12 подтвердили, что за 942 дня под палящим солнечным ветром и микрометеоритами его белый корпус окрасился в коричневатый оттенок.',
      en: 'Surveyor 3 operated until sunset on May 4, 1967, when the bitter two-week lunar night (-170°C) set in. Following sunrise, freezing cold prevented battery resuscitation. Its epic conclusion unfolded on November 19, 1969, when Apollo 12 crew inspected the silent craft, noting that 942 days of solar radiation turned its polished white painted surface tan-brown.',
      uz: 'Surveyor 3 1967-yil 4-mayda Oy quyoshi botguniga qadar ishladi. 14 kunlik -170°C lik qahraton tundan so‘ng batareyalari muzlab, qayta ishga tushmadi. 1969-yil 19-noyabrda Apollo 12 astronavtlari uni borib ko‘rishganda, ochiq fazodagi 942 kundan so‘ng oq bo‘yog‘i sarg‘ish-jigarrangga aylangani aniqlandi.',
    },
    whereIsItNow: {
      ru: 'Остов «Сервейера-3» (без демонтированной камеры и совка) по-прежнему стоит на склоне кратера Сервейер в Океане Бурь в 160 метрах от посадочной ступени Apollo 12 «Intrepid». Снятая камера выставлена в Национальном музее воздухоплавания и астронавтики Смитсоновского института в Вашингтоне.',
      en: 'The Surveyor 3 frame (minus its retrieved camera and scoop) still rests on the gentle slope of Surveyor Crater in Oceanus Procellarum, 160 meters from Apollo 12 Intrepid descent stage. Its TV camera is exhibited at the Smithsonian National Air and Space Museum in Washington, D.C.',
      uz: 'Surveyor 3 korpusi (kamerasi va cho‘michisiz) hanuzgacha Bo‘ronlar ummonidagi kraterda, Apollo 12 ning qo‘nish bosqichidan 160 metr masofada turibdi. Yechib olingan kamerasi esa Vashingtondagi Smitson Milliy aviatsiya va fazo muzeyida saqlanmoqda.',
    },
    source: 'https://science.nasa.gov/mission/surveyor-3/',
    quote: {
      text: {
        ru: 'Эй, посмотри на это! Вот он, прямо перед нами на краю кратера — Сервейер цел и невредим!',
        en: 'Hey, look at that! There it is, right on the edge of the crater — Surveyor is sitting right there!',
        uz: 'Qara, ana u! Kraterning chetida, to‘g‘ri ro‘paramizda — Surveyor butun turibdi!',
      },
      speaker: {
        ru: 'Пит Конрад (командир экипажа Apollo 12 на поверхности Луны)',
        en: 'Pete Conrad (Apollo 12 Commander on lunar surface)',
        uz: 'Pit Konrad (Apollo 12 komandiri, Oy yuzasida)',
      },
      context: {
        ru: '19 ноября 1969 года, второй выход в открытый лунный грунт EVA-2',
        en: 'November 19, 1969, Apollo 12 lunar surface EVA-2',
        uz: '1969-yil 19-noyabr, Oy yuzasiga ikkinchi chiqish (EVA-2)',
      },
      type: 'team_message',
      typeLabel: {
        ru: 'Радиопереговоры экипажа',
        en: 'Crew voice loop',
        uz: 'Ekipaj radioaloqasi',
      },
      sourceUrl: 'https://www.history.nasa.gov/alsj/a12/a12.surveyor.html',
    },
    specs: [
      {
        label: { ru: 'Посадочная масса', en: 'Landed Mass', uz: 'Qo‘nish massasi' },
        value: { ru: '296 кг (на поверхности Луны)', en: '296 kg (on lunar surface)', uz: '296 kg (Oy yuzasida)' },
      },
      {
        label: { ru: 'Питание', en: 'Power Source', uz: 'Quvvat manbai' },
        value: { ru: 'Солнечная панель (до 85 Вт) + серебряно-цинковые батареи', en: 'Solar panel (up to 85 W) + Ag-Zn batteries', uz: 'Quyosh paneli (85 Vt gacha) + kumush-rux batareyalar' },
      },
      {
        label: { ru: 'Научные приборы', en: 'Payload', uz: 'Ilmiy apparatura' },
        value: { ru: 'Телекамера с цветными светофильтрами, механический экскаватор-совок, датчики температуры и ускорения', en: 'Surveyor TV camera, surface sampler scoop, thermal & acceleration strain gauges', uz: 'Rangli filtrli videokamera, mexanik ekskavator-cho‘mich, harorat va akseleratsiya datchiklari' },
      },
      {
        label: { ru: 'Уникальный статус', en: 'Historic Status', uz: 'Noyob maqomi' },
        value: { ru: 'Единственный внеземной зонд, частично возвращенный людьми на Землю', en: 'Only extraterrestrial probe partially sampled and returned to Earth by astronauts', uz: 'Tarixda insonlar tomonidan qismlari Yerga qaytarilgan yagona o‘zga olam zondi' },
      },
    ],
    milestones: [
      {
        date: '17.04.1967',
        title: { ru: 'Старт с мыса Канаверал', en: 'Launch', uz: 'Start' },
        description: { ru: 'Запуск ракетой Atlas-Centaur в прямое попадание на Луну.', en: 'Launched on Atlas-Centaur on direct lunar ascent.', uz: 'Atlas-Centaur raketasida to‘g‘ri Oyga uchirildi.' },
      },
      {
        date: '20.04.1967',
        title: { ru: 'Посадка с отскоками', en: 'Bouncing Touchdown', uz: 'Sakrab qo‘nish' },
        description: { ru: 'Совершил два прыжка и опустился на склон кратера в Океане Бурь.', en: 'Bounced twice before settling on the inner wall of Surveyor Crater.', uz: 'Ikki marta sakrab, Bo‘ronlar ummonidagi krater bag‘riga o‘rnashdi.' },
      },
      {
        date: '22.04.1967',
        title: { ru: 'Первый лунный ковш', en: 'First Trenching Scoop', uz: 'Ilk qazish cho‘michi' },
        description: { ru: 'Впервые в истории выкопаны траншеи в лунном грунте.', en: 'Mechanically excavated the first trenches in lunar soil.', uz: 'Oy tuprog‘ida mexanik cho‘mich orqali ilk chuqurchalar qazildi.' },
      },
      {
        date: '19.11.1969',
        title: { ru: 'Визит экипажа Apollo 12', en: 'Apollo 12 Astronaut Visit', uz: 'Apollo 12 astronavtlari tashrifi' },
        description: { ru: 'Пит Конрад и Алан Бин подошли к аппарату и сняли детали для доставки на Землю.', en: 'Conrad and Bean walked to the probe, removing parts for terrestrial science.', uz: 'Konrad va Bin apparat oldiga piyoda kelib, uning qismlarini Yerga olib ketishdi.' },
      },
    ],
  },
  {
    id: 'mars-polar-lander',
    name: {
      ru: 'Марс Полар Лэндер (Mars Polar Lander)',
      en: 'Mars Polar Lander',
      uz: 'Mars Polar Lander',
    },
    englishName: 'Mars Polar Lander',
    designation: 'Mars Polar Lander (Mars Surveyor 1998 Lander)',
    destination: 'Mars',
    type: {
      ru: 'Посадочный модуль',
      en: 'Polar Lander',
      uz: 'Qutb qo‘nish moduli',
    },
    launchDate: '3 января 1999',
    landingDate: '3 декабря 1999 (расчетное время посадки)',
    lastContactDate: '3 декабря 1999 (перед входом в атмосферу)',
    activeSpan: '1999',
    status: {
      ru: 'Потерян при посадке (авария фазы EDL)',
      en: 'Lost during landing (EDL sensor anomaly)',
      uz: 'Qo‘nish vaqtida halokatga uchragan (EDL datchik nosozligi)',
    },
    statusType: 'silent',
    coordinates: {
      lat: '76.13° S',
      lon: '164.7° W',
      latNum: -76.13,
      lonNum: -164.7,
      formatted: '76°07′48″ ю. ш. 164°42′00″ з. д.',
    },
    nasaSearchQuery: 'Mars Polar Lander Deep Space 2 Mars',
    orbitalSearchQuery: 'Mars Polar Lander HiRISE south pole',
    locationName: {
      ru: 'Южная полярная равнина Марса (Planum Australe)',
      en: 'Planum Australe, South Polar Layered Deposits',
      uz: 'Mars Janubiy qutb tekisligi (Planum Australe)',
    },
    missionDuration: {
      ru: '11 месяцев перелета (связь оборвалась перед посадкой 3 декабря 1999)',
      en: '11 months cruise (signal lost prior to touchdown on Dec 3, 1999)',
      uz: '11 oylik parvoz (1999-yil 3-dekabrda qo‘nish paytida aloqa uzilgan)',
    },
    distanceTraveled: {
      ru: '0 км (потерян при посадке)',
      en: '0 km (lost during descent)',
      uz: '0 km (qo‘nish vaqtida yo‘qotilgan)',
    },
    image: '',
    schematicType: 'lander',
    shortDescription: {
      ru: 'Амбициозная миссия NASA по исследованию вечной мерзлоты и слоистых отложений южного полюса Марса. Потеряна в момент касания из-за программного сбоя датчиков посадочных опор, что привело к полному пересмотру архитектуры посадок марсианских аппаратов.',
      en: 'NASA’s pioneering mission to touch down near the Martian South Pole. Lost during descent when landing leg deployment vibrations triggered premature engine shutdown, completely reshaping future Mars EDL engineering.',
      uz: 'Marsning Janubiy qutbidagi abadiy muzliklarni o‘rganishga yo‘naltirilgan missiya. Qo‘nish oyoqlari ochilishi paytidagi tebranish dvigatellarni barvaqt o‘chirib yuborgani sababli halokatga uchragan.',
    },
    howGotThere: {
      ru: 'Запущен ракетой Delta II 7425 с мыса Канаверал 3 января 1999 года. Нес на себе два экспериментальных пенетратора Deep Space 2 (Scott и Amundsen). 3 декабря 1999 года аппарат вошел в атмосферу Марса по баллистической траектории без телеметрии в реальном времени. Согласно выводам независимой комиссии расследования Томаса Янга, при раскрытии трех опор на высоте 40 метров датчики сгенерировали ложный электрический импульс, компьютер принял его за касание грунта и мгновенно заглушил тормозные двигатели — станция разбилась на скорости около 80 км/ч.',
      en: 'Launched via a Delta II 7425 rocket carrying two Deep Space 2 microprobes. On December 3, 1999, it entered the Martian atmosphere without real-time telemetry. The Thomas Young Investigation Board concluded that microswitch bounce during landing leg deployment at 40 meters altitude falsely signaled touchdown, causing the flight software to shut down thrusters prematurely and crash into the ice.',
      uz: '1999-yil 3-yanvarda Delta II raketasida uchirilgan. 3-dekabrda real vaqt telemetriyasisiz atmosferaga kirdi. Tergov komissiyasi xulosasiga ko‘ra, 40 metr balandlikda qo‘nish oyoqlari ochilganda datchiklar soxta signal bergan va kompyuter dvigatellarni darhol o‘chirib qo‘ygan.',
    },
    whatDidItDo: {
      ru: 'Хотя станция разбилась, научная программа и инструменты Mars Polar Lander (включая лидар для исследования пыли и атмосферных аэрозолей, метеостанцию и манипулятор с печью для выпаривания летучих веществ) были заново собраны и успешно реализованы спустя 9 лет в триумфальной миссии Phoenix в 2008 году в северной полярной зоне Марса.',
      en: 'While the spacecraft was lost, its flight spare hardware and scientific instruments (lidar, meteorological boom, and thermal evolved gas analyzer TEGA) were re-engineered and successfully deployed nine years later on Mars by the Phoenix Lander in 2008.',
      uz: 'Apparat halokatga uchragan bo‘lsa-da, uning ilmiy asboblari va ehtiyot qismlari (lidar, meteostansiya, TEGA pechi) qayta yig‘ilib, 9 yildan so‘ng 2008-yilgi Phoenix missiyasida Marsning shimolida to‘liq amalga oshirildi.',
    },
    lastContactStory: {
      ru: 'Последний штатный сеанс радиосвязи завершился за 12 минут до входа в атмосферу 3 декабря 1999 года. После расчетного времени посадки ни антенна DSN в Голдстоуне, ни станция в Канберре не зафиксировали сигнал несущей частоты. Поиски радиосигналов продолжались до января 2000 года, а орбитальные камеры Mars Global Surveyor и MRO HiRISE обследовали зону посадки площадью сотни квадратных километров.',
      en: 'Final standard telemetry ended 12 minutes prior to atmospheric entry on December 3, 1999. Following the scheduled touchdown window, antennas at Goldstone and Canberra detected no carrier signal. Radio listening campaigns continued until January 2000, and orbital cameras systematically surveyed the target footprint.',
      uz: 'Oxirgi muntazam aloqa seansi 1999-yil 3-dekabrda atmosferaga kirishdan 12 daqiqa oldin yakunlandi. Qo‘nish vaqtidan so‘ng DSN stansiyalarida hech qanday signal qayd etilmadi. 2000-yil yanvargacha qidiruv davom etdi.',
    },
    whereIsItNow: {
      ru: 'Останки станции Марс Полар Лэндер и двух микрозондов Deep Space 2 находятся среди слоистых ледяных отложений Planum Australe в южном приполярье Марса под сезонным покровом замерзшей углекислоты (сухого льда).',
      en: 'The wreckage of Mars Polar Lander and its twin Deep Space 2 microprobes rests among the south polar layered deposits of Planum Australe, covered each winter by seasonal dry-ice frost.',
      uz: 'Mars Polar Lander va Deep Space 2 mikrozondlarining qoldiqlari Marsning janubiy qutbidagi Planum Australe qatlamli muzliklari orasida quruq muz qatlami ostida yotibdi.',
    },
    source: 'https://science.nasa.gov/mission/mars-polar-lander/',
    specs: [
      {
        label: { ru: 'Посадочная масса', en: 'Landed Mass', uz: 'Qo‘nish massasi' },
        value: { ru: '290 кг (сухая масса)', en: '290 kg (dry mass)', uz: '290 kg (quruq massasi)' },
      },
      {
        label: { ru: 'Источник энергии', en: 'Power Source', uz: 'Quvvat manbai' },
        value: { ru: 'Солнечные батареи из арсенида галлия (до 200 Вт)', en: 'GaAs solar arrays (up to 200 W)', uz: 'Galliy arsenidli quyosh panellari (200 Vt gacha)' },
      },
      {
        label: { ru: 'Попутная нагрузка', en: 'Piggyback Probes', uz: 'Qo‘shimcha zondlar' },
        value: { ru: '2 микрозонда-пенетратора Deep Space 2 («Скотт» и «Амундсен»)', en: 'Two Deep Space 2 microprobe penetrators ("Scott" & "Amundsen")', uz: '2 ta Deep Space 2 mikrozondi («Skott» va «Amundsen»)' },
      },
      {
        label: { ru: 'Причина аварии', en: 'Failure Cause', uz: 'Halokat sababi' },
        value: { ru: 'Ложное срабатывание концевиков опор на высоте 40 м (отключение ЖРД)', en: 'Leg deployment microswitch transient at 40m altitude (thruster cutoff)', uz: '40 m balandlikda oyoq datchiklarining soxta ishlashi (dvigatellar o‘chishi)' },
      },
    ],
    milestones: [
      {
        date: '03.01.1999',
        title: { ru: 'Старт с мыса Канаверал', en: 'Launch', uz: 'Start' },
        description: { ru: 'Запуск к южному полюсу Марса ракетой Delta II.', en: 'Launched towards Mars south pole on Delta II.', uz: 'Delta II raketasida Marsning janubiy qutbi tomon uchirildi.' },
      },
      {
        date: '03.12.1999',
        title: { ru: 'Вход в атмосферу Марса', en: 'Atmospheric Entry', uz: 'Mars atmosferasiga kirish' },
        description: { ru: 'Вход в атмосферу на скорости 6.9 км/с.', en: 'Atmospheric entry at 6.9 km/s.', uz: '6.9 km/s tezlikda atmosferaga kirish.' },
      },
      {
        date: '03.12.1999',
        title: { ru: 'Потеря аппарата', en: 'Loss of Spacecraft', uz: 'Apparatning yo‘qotilishi' },
        description: { ru: 'Преждевременное выключение двигателей привело к падению на ледяной грунт.', en: 'Premature thruster shutdown resulted in impact on polar terrain.', uz: 'Dvigatellarning vaqtidan oldin o‘chishi qutb muzligiga qulashga olib keldi.' },
      },
      {
        date: '28.03.2000',
        title: { ru: 'Отчет комиссии Томаса Янга', en: 'Thomas Young Report', uz: 'Tomas Yang hisoboti' },
        description: { ru: 'Опубликованы выводы расследования, кардинально изменившие марсианскую программу NASA.', en: 'Independent board report completely reorganized NASA Mars exploration.', uz: 'NASA ning Mars dasturini butunlay o‘zgartirgan tergov hisoboti e’lon qilindi.' },
      },
    ],
    signalData: {
      frequency: '401.5 MHz (UHF) / 2295 MHz (S-band)',
      lastTelemetry: 'EDL INITIALIZED // ENTRY INTERFACE // SENSOR CHATTER DETECTED // CARRIER LOST // CARRIER NOT ACQUIRED POST-TOUCHDOWN',
      fadeReason: {
        ru: 'Катастрофическая потеря аппарата при падении с высоты 40 метров из-за ложного отключения тормозных двигателей бортовым программным обеспечением.',
        en: 'Catastrophic loss of vehicle due to impact from 40m altitude caused by premature descent engine shutdown triggered by spurious sensor transient.',
        uz: '40 metr balandlikda soxta datchik signali tufayli dvigatellarning o‘chirilishi va apparatning qulab halokatga uchrashi.',
      },
      quoteRu: '«Уроки потери Марс Полар Лэндер были горькими, но именно они спасли Феникс и позволили посадить Кьюриосити».',
      quoteEn: '“The lessons learned from Mars Polar Lander were painful, but they directly saved Phoenix and enabled Curiosity’s landing.”',
      quoteUz: '«Mars Polar Lander halokatidan olingan saboqlar achchiq bo‘ldi, ammo aynan ular keyinchalik Phoenix va Curiosity missiyalarini muvaffaqiyatli qildi».',
      sourceUrl: 'https://science.nasa.gov/mission/mars-polar-lander/',
    },
  },
];
