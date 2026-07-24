// Single source of truth for supported languages.
// `code`      -> ISO code used by the MyMemory translation API
// `script`    -> a short label describing the writing system
// `sample`    -> characters used to build the animated background for that language
// `font`      -> a Google Font family suited to rendering the script correctly

module.exports = [
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin', font: "'Inter', sans-serif", sample: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil', font: "'Noto Sans Tamil', sans-serif", sample: 'அஆஇஈஉஊஎஏஐஒஓஔகஙசஞடணதநபமயரலவழளறன' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari', font: "'Noto Sans Devanagari', sans-serif", sample: 'अआइईउऊएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu', font: "'Noto Sans Telugu', sans-serif", sample: 'అఆఇఈఉఊఎఏఐఒఓఔకఖగఘచఛజఝటఠడఢణతథదధనపఫబభమయరలవశషసహ' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada', font: "'Noto Sans Kannada', sans-serif", sample: 'ಅಆಇಈಉಊಎಏಐಒಓಔಕಖಗಘಚಛಜಝಟಠಡಢಣತಥದಧನಪಫಬಭಮಯರಲವಶಷಸಹ' },
  { code: 'fr', name: 'French', nativeName: 'Français', script: 'Latin', font: "'Inter', sans-serif", sample: 'AÀÂÇÉÈÊËÎÏÔŒÙÛÜŸBCDFGHJKLMNPQRSTVWXZ' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', script: 'Latin', font: "'Inter', sans-serif", sample: 'AÁÉÍÑÓÚÜBCDFGHJKLMNPQRSTVWXYZ' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', script: 'Latin', font: "'Inter', sans-serif", sample: 'AÄÖÜßBCDFGHJKLMNPQRSTVWXYZ' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '中文', script: 'Han', font: "'Noto Sans SC', sans-serif", sample: '一二三四五六七八九十你好世界中文言语学习翻译天地风水火山' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', script: 'Kana/Kanji', font: "'Noto Sans JP', sans-serif", sample: 'あいうえおかきくけこさしすせそアイウエオカキクケコ言葉' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', script: 'Hangul', font: "'Noto Sans KR', sans-serif", sample: '가나다라마바사아자차카타파하언어번역' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', script: 'Arabic', font: "'Noto Naskh Arabic', serif", sample: 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', script: 'Cyrillic', font: "'Inter', sans-serif", sample: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali', font: "'Noto Sans Bengali', sans-serif", sample: 'অআইঈউঊএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam', font: "'Noto Sans Malayalam', sans-serif", sample: 'അആഇഈഉഊഎഏഐഒഓഔകഖഗഘങചഛജഝഞടഠഡഢണതഥദധനപഫബഭമയരലവശഷസഹ' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', script: 'Latin', font: "'Inter', sans-serif", sample: 'AÁÂÃÀÇÉÊÍÓÔÕÚBCDFGHJKLMNPQRSTVWXZ' }
];
