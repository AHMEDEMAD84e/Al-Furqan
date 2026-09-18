// Authentic Islamic Adhkar API Service with Sheikh Mishary Rashid Alafasy Real Audio Recitations

export const ADHKAR_CATEGORIES = [
  {
    id: 'morning',
    label: 'أذكار الصباح',
    icon: 'bx bx-sun',
    color: '#eab308',
    audioUrl: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3',
    audioTitle: 'أذكار الصباح كاملة بصوت الشيخ مشاري راشد العفاسي'
  },
  {
    id: 'evening',
    label: 'أذكار المساء',
    icon: 'bx bx-moon',
    color: '#8b5cf6',
    audioUrl: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Masaa.mp3',
    audioTitle: 'أذكار المساء كاملة بصوت الشيخ مشاري راشد العفاسي'
  },
  {
    id: 'after',
    label: 'أذكار بعد الصلاة',
    icon: 'bx bx-pray',
    color: '#10b981',
    audioUrl: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/AfterPrayer.mp3',
    audioTitle: 'أذكار بعد الصلاة بصوت الشيخ مشاري راشد العفاسي'
  },
  {
    id: 'duas',
    label: 'أدعية متنوعة',
    icon: 'bx bx-book-heart',
    color: '#ec4899',
    audioUrl: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3',
    audioTitle: 'أدعية مأثورة بصوت الشيخ مشاري راشد العفاسي'
  }
];

const COMPREHENSIVE_FALLBACK = {
  morning: {
    category: 'أذكار الصباح',
    audioUrl: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3',
    array: [
      {
        zekr: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ.',
        count: '1',
        reference: 'آية الكرسي - سورة البقرة: 255 (من قالها حين يصبح أُجير من الجن حتى يمسي)',
        audio: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/255.mp3'
      },
      {
        zekr: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۞ اللَّهُ الصَّمَدُ ۞ لَمْ يَلِدْ وَلَمْ يُولَدْ ۞ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ.',
        count: '3',
        reference: 'سورة الإخلاص (تكفيه من كل شيء)',
        audio: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3'
      },
      {
        zekr: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۞ مِنْ شَرِّ مَا خَلَقَ ۞ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۞ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۞ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ.',
        count: '3',
        reference: 'سورة الفلق (تكفيه من كل شيء)',
        audio: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6226.mp3'
      },
      {
        zekr: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۞ مَلِكِ النَّاسِ ۞ إِلَهِ النَّاسِ ۞ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۞ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۞ مِنَ الْجِنَّةِ وَالنَّاسِ.',
        count: '3',
        reference: 'سورة الناس (تكفيه من كل شيء)',
        audio: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6231.mp3'
      },
      {
        zekr: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.',
        count: '1',
        reference: 'رواه مسلم',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3'
      },
      {
        zekr: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ.',
        count: '1',
        reference: 'رواه الترمذي',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3'
      },
      {
        zekr: 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ.',
        count: '1',
        reference: 'سيد الاستغفار - رواه البخاري',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3'
      },
      {
        zekr: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لاَ إِلَهَ إِلاَّ أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لاَ إِلَهَ إِلاَّ أَنْتَ.',
        count: '3',
        reference: 'رواه أبو داود واحمد',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3'
      },
      {
        zekr: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي.',
        count: '1',
        reference: 'رواه أبو داود وابن ماجه',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3'
      },
      {
        zekr: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ.',
        count: '1',
        reference: 'رواه الحاكم وصححه الألباني',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3'
      },
      {
        zekr: 'بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.',
        count: '3',
        reference: 'رواه أصحاب السنن (لم يضره شيء)',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3'
      },
      {
        zekr: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلاَمِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا.',
        count: '3',
        reference: 'رواه أصحاب السنن (كان حقاً على الله أن يرضيه)',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3'
      },
      {
        zekr: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ: عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ.',
        count: '3',
        reference: 'رواه مسلم',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3'
      },
      {
        zekr: 'حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.',
        count: '7',
        reference: 'رواه ابن السني (كفاه الله ما أهمه)',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3'
      },
      {
        zekr: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ.',
        count: '10',
        reference: 'رواه الطبراني (أدركته شفاعتي يوم القيامة)',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3'
      },
      {
        zekr: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.',
        count: '100',
        reference: 'رواه مسلم (حطت خطاياه وإن كانت مثل زبد البحر)',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3'
      },
      {
        zekr: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ.',
        count: '100',
        reference: 'رواه البخاري ومسلم',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3'
      }
    ]
  },
  evening: {
    category: 'أذكار المساء',
    audioUrl: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Masaa.mp3',
    array: [
      {
        zekr: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ.',
        count: '1',
        reference: 'آية الكرسي - سورة البقرة: 255',
        audio: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/255.mp3'
      },
      {
        zekr: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۞ اللَّهُ الصَّمَدُ ۞ لَمْ يَلِدْ وَلَمْ يُولَدْ ۞ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ.',
        count: '3',
        reference: 'سورة الإخلاص',
        audio: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3'
      },
      {
        zekr: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۞ مِنْ شَرِّ مَا خَلَقَ ۞ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۞ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۞ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ.',
        count: '3',
        reference: 'سورة الفلق',
        audio: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6226.mp3'
      },
      {
        zekr: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۞ مَلِكِ النَّاسِ ۞ إِلَهِ النَّاسِ ۞ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۞ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۞ مِنَ الْجِنَّةِ وَالنَّاسِ.',
        count: '3',
        reference: 'سورة الناس',
        audio: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6231.mp3'
      },
      {
        zekr: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.',
        count: '1',
        reference: 'رواه مسلم',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Masaa.mp3'
      },
      {
        zekr: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ.',
        count: '1',
        reference: 'رواه الترمذي',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Masaa.mp3'
      },
      {
        zekr: 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ.',
        count: '1',
        reference: 'سيد الاستغفار - رواه البخاري',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Masaa.mp3'
      },
      {
        zekr: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.',
        count: '3',
        reference: 'رواه مسلم (لم تضره حمة تلك الليلة)',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Masaa.mp3'
      },
      {
        zekr: 'بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.',
        count: '3',
        reference: 'رواه الترمذي وابن ماجه',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Masaa.mp3'
      },
      {
        zekr: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لاَ إِلَهَ إِلاَّ أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لاَ إِلَهَ إِلاَّ أَنْتَ.',
        count: '3',
        reference: 'رواه أبو داود',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Masaa.mp3'
      },
      {
        zekr: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي...',
        count: '1',
        reference: 'رواه أبو داود',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Masaa.mp3'
      },
      {
        zekr: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلاَمِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا.',
        count: '3',
        reference: 'رواه أبو داود',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Masaa.mp3'
      },
      {
        zekr: 'حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.',
        count: '7',
        reference: 'رواه ابن السني',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Masaa.mp3'
      },
      {
        zekr: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ.',
        count: '10',
        reference: 'رواه الطبراني',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Masaa.mp3'
      },
      {
        zekr: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.',
        count: '100',
        reference: 'رواه مسلم',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Masaa.mp3'
      }
    ]
  },
  after: {
    category: 'أذكار بعد الصلاة',
    audioUrl: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/AfterPrayer.mp3',
    array: [
      {
        zekr: 'أَسْتَغْفِرُ اللَّهَ (ثَلاَثاً)... اللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ، تَبَارَكْتَ يَا ذَا الْجَلاَلِ وَالإِكْرَامِ.',
        count: '1',
        reference: 'رواه مسلم',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/AfterPrayer.mp3'
      },
      {
        zekr: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اللَّهُمَّ لاَ مَانِعَ لِمَا أَعْطَيْتَ، وَلاَ مُعْطِيَ لِمَا مَنَعْتَ، وَلاَ يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ.',
        count: '1',
        reference: 'رواه البخاري ومسلم',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/AfterPrayer.mp3'
      },
      {
        zekr: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَلاَ نَعْبُدُ إِلاَّ إِيَّاهُ، لَهُ النِّعْمَةُ وَلَهُ الْفَضْلُ وَلَهُ الثَّنَاءُ الْحَسَنُ، لاَ إِلَهَ إِلاَّ اللَّهُ مُخْلِصِينَ لَهُ الدِّينَ وَلَوْ كَرِهَ الْكَافِرُونَ.',
        count: '1',
        reference: 'رواه مسلم',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/AfterPrayer.mp3'
      },
      {
        zekr: 'سُبْحَانَ اللَّهِ (33)، وَالْحَمْدُ لِلَّهِ (33)، وَاللَّهُ أَكْبَرُ (33)، ثُمَّ تَمَامُ الْمِائَةِ: لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.',
        count: '1',
        reference: 'رواه مسلم (غفرت خطاياه وإن كانت مثل زبد البحر)',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/AfterPrayer.mp3'
      },
      {
        zekr: 'قراءة آية الكرسي: ﴿ اللَّهُ لا إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ... ﴾ (البقرة: 255).',
        count: '1',
        reference: 'رواه النسائي (لم يمنعه من دخول الجنة إلا أن يموت)',
        audio: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/255.mp3'
      },
      {
        zekr: 'قراءة سور: الإخلاص، والفلق، والناس عقب كل صلاة (وتكرر 3 مرات عقب صلاتي الفجر والمغرب).',
        count: '1',
        reference: 'رواه أبو داود والترمذي والنسائي',
        audio: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3'
      }
    ]
  },
  duas: {
    category: 'أدعية متنوعة',
    audioUrl: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3',
    array: [
      {
        zekr: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.',
        count: '1',
        reference: 'سورة البقرة: 201',
        audio: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/208.mp3'
      },
      {
        zekr: 'لاَ إِلَهَ إِلاَّ أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ.',
        count: '1',
        reference: 'دعاء ذي النون - رواه الترمذي والحاكم',
        audio: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2541.mp3'
      },
      {
        zekr: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي.',
        count: '1',
        reference: 'سورة طه: 25-28',
        audio: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2373.mp3'
      },
      {
        zekr: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى.',
        count: '1',
        reference: 'رواه مسلم',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3'
      },
      {
        zekr: 'لاَ إِلَهَ إِلاَّ اللَّهُ الْعَظِيمُ الْحَلِيمُ، لاَ إِلَهَ إِلاَّ اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لاَ إِلَهَ إِلاَّ اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ.',
        count: '1',
        reference: 'دعاء الكرب - متفق عليه',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3'
      },
      {
        zekr: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ.',
        count: '1',
        reference: 'رواه أبو داود والنسائي',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3'
      },
      {
        zekr: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ كَرِيمٌ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي.',
        count: '1',
        reference: 'رواه الترمذي',
        audio: 'https://ia800203.us.archive.org/11/items/azkar-sabah-wa-masaa-alafasy/Sabah.mp3'
      }
    ]
  }
};

export const getAllAdhkar = async () => {
  return Object.values(COMPREHENSIVE_FALLBACK);
};

export const getAdhkarByCategory = async (catId) => {
  const validCategories = ['morning', 'evening', 'after', 'duas'];
  const targetId = validCategories.includes(catId) ? catId : 'morning';
  return COMPREHENSIVE_FALLBACK[targetId] || COMPREHENSIVE_FALLBACK.morning;
};

export const getMorningAdhkar = () => getAdhkarByCategory('morning');
export const getEveningAdhkar = () => getAdhkarByCategory('evening');
export const getAfterPrayerAdhkar = () => getAdhkarByCategory('after');
export const getDuasAdhkar = () => getAdhkarByCategory('duas');
