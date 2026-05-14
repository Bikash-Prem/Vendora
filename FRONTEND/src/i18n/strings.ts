export type SupportedLanguage = "English" | "Hindi" | "Kannada" | "Tamil";

type Strings = Record<string, string>;

const en: Strings = {
  appName: "VoiceOps AI",
  tagline: "Voice-first business OS for daily operations.",
  language: "Language",
  changeLanguage: "Change language",

  speakYourEntry: "Speak your entry",
  exampleSpeech: "Example: “Aaj 40 kilo aloo beche, 30 rupaye kilo”.",
  tapToSpeak: "Tap to speak",
  listeningTapToStop: "Listening… tap to stop",
  keepItSimple: "Keep it simple — item, quantity, price.",

  typeInstead: "Or type instead",
  typeYourEntry: "Type your entry",
  typePlaceholder: "Type a short entry (e.g., 25 apple 10 rs)",
  saveTypedEntry: "Save typed entry",

  aiUnderstood: "AI understood",
  reviewBeforeSaving: "Review before saving.",
  editEntry: "Edit entry",
  editPlaceholder: "Edit the text before saving",
  transcriptEmpty: "Start speaking to see the transcript here.",

  saveEntry: "Save entry",
  clear: "Clear",

  dashboard: "Dashboard",
  history: "History",
  analyticsInsights: "Analytics + insights",
  allVoiceEntries: "All voice entries",

  savingEntry: "Saving entry…",
  savedSuccess: "Saved. You can view it in Dashboard/History.",
  reviewAndSave: "Review and save your entry",
  stopping: "Stopping…",
  speechNotSupported: "Speech recognition is not supported in this browser.",
  noSpeechDetected: "No speech detected",
  voiceFailed: "Voice recognition failed: {error}",
  failedToSave: "Failed to save transaction",

  aiInsights: "AI insights",
  normalized: "Normalized",
  intent: "Intent",
  fraudCheck: "Fraud check",
  demand: "Demand",

  // Dashboard/History
  summarySubtitle: "Summary and recent voice entries.",
  quickAdd: "Quick add",
  quickAddHint: "Example: “25 apple 10 rs”.",
  typeShortEntry: "Type a short entry",
  add: "Add",
  totalSales: "Total sales",
  transactions: "Transactions",
  topSellingItem: "Top selling item",
  qtySold: "Qty sold",
  recentTransactions: "Recent transactions",
  latestEntriesHint: "Latest entries captured by voice or quick add.",

  backToHome: "Back to Home",
  entries: "Entries",
  totalSalesHistory: "Total sales (history)",
  refresh: "Refresh",
  loading: "Loading…",
  noTransactionsYet: "No transactions yet. Record one from the Home screen.",
  delete: "Delete",
  deleting: "Deleting…",
  failedToLoadHistory: "Failed to load history (backend error)",
  failedToDelete: "Failed to delete transaction",
};

const hi: Strings = {
  appName: "VoiceOps AI",
  tagline: "रोज़मर्रा के कामों के लिए वॉइस-फर्स्ट बिज़नेस OS।",
  language: "भाषा",
  changeLanguage: "भाषा बदलें",

  speakYourEntry: "अपनी एंट्री बोलें",
  exampleSpeech: "उदाहरण: “आज 40 किलो आलू बेचे, 30 रुपये किलो”.",
  tapToSpeak: "बोलने के लिए टैप करें",
  listeningTapToStop: "सुन रहा है… रोकने के लिए टैप करें",
  keepItSimple: "सरल रखें — सामान, मात्रा, दाम।",

  typeInstead: "या टाइप करें",
  typeYourEntry: "अपनी एंट्री टाइप करें",
  typePlaceholder: "छोटी एंट्री लिखें (जैसे, 25 apple 10 rs)",
  saveTypedEntry: "टाइप की हुई एंट्री सेव करें",

  aiUnderstood: "AI ने समझा",
  reviewBeforeSaving: "सेव करने से पहले जांचें।",
  editEntry: "एंट्री एडिट करें",
  editPlaceholder: "सेव करने से पहले टेक्स्ट सही करें",
  transcriptEmpty: "ट्रांसक्रिप्ट देखने के लिए बोलना शुरू करें।",

  saveEntry: "एंट्री सेव करें",
  clear: "साफ़ करें",

  dashboard: "डैशबोर्ड",
  history: "इतिहास",
  analyticsInsights: "एनालिटिक्स + इनसाइट्स",
  allVoiceEntries: "सभी वॉइस एंट्री",

  savingEntry: "सेव हो रहा है…",
  savedSuccess: "सेव हो गया। डैशबोर्ड/इतिहास में देखें।",
  reviewAndSave: "अपनी एंट्री देखकर सेव करें",
  stopping: "रोक रहे हैं…",
  speechNotSupported: "इस ब्राउज़र में वॉइस सपोर्ट नहीं है।",
  noSpeechDetected: "कोई आवाज़ नहीं मिली",
  voiceFailed: "वॉइस रिकग्निशन फेल: {error}",
  failedToSave: "ट्रांज़ैक्शन सेव नहीं हो पाया",

  aiInsights: "AI इनसाइट्स",
  normalized: "नॉर्मलाइज़्ड",
  intent: "इरादा",
  fraudCheck: "फ्रॉड चेक",
  demand: "डिमांड",

  summarySubtitle: "सारांश और हाल की एंट्री।",
  quickAdd: "त्वरित जोड़ें",
  quickAddHint: "उदाहरण: “25 apple 10 rs”.",
  typeShortEntry: "छोटी एंट्री लिखें",
  add: "जोड़ें",
  totalSales: "कुल बिक्री",
  transactions: "लेन-देन",
  topSellingItem: "सबसे अधिक बिकने वाला सामान",
  qtySold: "बिकी मात्रा",
  recentTransactions: "हाल की लेन-देन",
  latestEntriesHint: "वॉइस या क्विक ऐड से आई लेटेस्ट एंट्री।",

  backToHome: "होम पर वापस",
  entries: "एंट्री",
  totalSalesHistory: "कुल बिक्री (इतिहास)",
  refresh: "रीफ्रेश",
  loading: "लोड हो रहा है…",
  noTransactionsYet: "अभी कोई एंट्री नहीं। होम स्क्रीन से रिकॉर्ड करें।",
  delete: "डिलीट",
  deleting: "डिलीट हो रहा है…",
  failedToLoadHistory: "इतिहास लोड नहीं हो पाया (backend error)",
  failedToDelete: "ट्रांज़ैक्शन डिलीट नहीं हो पाया",
};

const kn: Strings = {
  appName: "VoiceOps AI",
  tagline: "ದೈನಂದಿನ ಕಾರ್ಯಗಳಿಗೆ ವಾಯ್ಸ್-ಫಸ್ಟ್ ಬಿಸಿನೆಸ್ OS.",
  language: "ಭಾಷೆ",
  changeLanguage: "ಭಾಷೆ ಬದಲಿಸಿ",

  speakYourEntry: "ನಿಮ್ಮ ದಾಖಲೆಯನ್ನು ಮಾತನಾಡಿ",
  exampleSpeech: "ಉದಾಹರಣೆ: “ಇಂದು 40 ಕಿಲೋ ಆಲೂ ಮಾರಾಟ, 30 ರೂ ಕಿಲೋ”.",
  tapToSpeak: "ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
  listeningTapToStop: "ಕೇಳುತ್ತಿದೆ… ನಿಲ್ಲಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
  keepItSimple: "ಸರಳವಾಗಿ ಹೇಳಿ — ವಸ್ತು, ಪ್ರಮಾಣ, ಬೆಲೆ.",

  typeInstead: "ಅಥವಾ ಟೈಪ್ ಮಾಡಿ",
  typeYourEntry: "ನಿಮ್ಮ ದಾಖಲೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ",
  typePlaceholder: "ಚಿಕ್ಕ ದಾಖಲೆ ಬರೆಯಿರಿ (ಉದಾ., 25 apple 10 rs)",
  saveTypedEntry: "ಟೈಪ್ ಮಾಡಿದ ದಾಖಲೆಯನ್ನು ಉಳಿಸಿ",

  aiUnderstood: "AI ಅರ್ಥಮಾಡಿಕೊಂಡದು",
  reviewBeforeSaving: "ಉಳಿಸುವ ಮೊದಲು ಪರಿಶೀಲಿಸಿ.",
  editEntry: "ದಾಖಲೆ ಸಂಪಾದಿಸಿ",
  editPlaceholder: "ಉಳಿಸುವ ಮೊದಲು ಪಠ್ಯವನ್ನು ಸರಿಪಡಿಸಿ",
  transcriptEmpty: "ಟ್ರಾನ್ಸ್ಕ್ರಿಪ್ಟ್ ನೋಡಲು ಮಾತನಾಡಲು ಆರಂಭಿಸಿ.",

  saveEntry: "ದಾಖಲೆಯನ್ನು ಉಳಿಸಿ",
  clear: "ತೆರವು ಮಾಡಿ",

  dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
  history: "ಇತಿಹಾಸ",
  analyticsInsights: "ವಿಶ್ಲೇಷಣೆ + ಒಳನೋಟಗಳು",
  allVoiceEntries: "ಎಲ್ಲಾ ವಾಯ್ಸ್ ದಾಖಲೆಗಳು",

  savingEntry: "ಉಳಿಸಲಾಗುತ್ತಿದೆ…",
  savedSuccess: "ಉಳಿಸಲಾಗಿದೆ. ಡ್ಯಾಶ್‌ಬೋರ್ಡ್/ಇತಿಹಾಸದಲ್ಲಿ ನೋಡಿ.",
  reviewAndSave: "ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಉಳಿಸಿ",
  stopping: "ನಿಲ್ಲಿಸಲಾಗುತ್ತಿದೆ…",
  speechNotSupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ವಾಯ್ಸ್ ಸಪೋರ್ಟ್ ಇಲ್ಲ.",
  noSpeechDetected: "ಧ್ವನಿ ಸಿಕ್ಕಿಲ್ಲ",
  voiceFailed: "ವಾಯ್ಸ್ ಗುರುತಿಸುವಿಕೆ ವಿಫಲ: {error}",
  failedToSave: "ವ್ಯವಹಾರವನ್ನು ಉಳಿಸಲು ವಿಫಲವಾಗಿದೆ",

  aiInsights: "AI ಒಳನೋಟಗಳು",
  normalized: "ಸಾಧಾರಣಗೊಳಿಸಲಾಗಿದೆ",
  intent: "ಉದ್ದೇಶ",
  fraudCheck: "ಫ್ರಾಡ್ ಚೆಕ್",
  demand: "ಬೇಡಿಕೆ",

  summarySubtitle: "ಸಾರಾಂಶ ಮತ್ತು ಇತ್ತೀಚಿನ ದಾಖಲೆಗಳು.",
  quickAdd: "ತ್ವರಿತ ಸೇರಿಸಿ",
  quickAddHint: "ಉದಾಹರಣೆ: “25 apple 10 rs”.",
  typeShortEntry: "ಚಿಕ್ಕ ದಾಖಲೆ ಬರೆಯಿರಿ",
  add: "ಸೇರಿಸಿ",
  totalSales: "ಒಟ್ಟು ಮಾರಾಟ",
  transactions: "ವ್ಯವಹಾರಗಳು",
  topSellingItem: "ಹೆಚ್ಚು ಮಾರಾಟವಾದ ವಸ್ತು",
  qtySold: "ಮಾರಾಟ ಪ್ರಮಾಣ",
  recentTransactions: "ಇತ್ತೀಚಿನ ವ್ಯವಹಾರಗಳು",
  latestEntriesHint: "ವಾಯ್ಸ್ ಅಥವಾ ಕ್ವಿಕ್ ಆಡ್ ಮೂಲಕ ಬಂದ ಇತ್ತೀಚಿನ ದಾಖಲைகள்.",

  backToHome: "ಹೋಮ್‌ಗೆ ಹಿಂದಿರುಗಿ",
  entries: "ದಾಖಲೆಗಳು",
  totalSalesHistory: "ಒಟ್ಟು ಮಾರಾಟ (ಇತಿಹಾಸ)",
  refresh: "ರಿಫ್ರೆಶ್",
  loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ…",
  noTransactionsYet: "ಇನ್ನೂ ಯಾವುದೇ ದಾಖಲೆಗಳು ಇಲ್ಲ. ಹೋಮ್ ಸ್ಕ್ರೀನ್‌ನಿಂದ ಸೇರಿಸಿ.",
  delete: "ಅಳಿಸಿ",
  deleting: "ಅಳಿಸಲಾಗುತ್ತಿದೆ…",
  failedToLoadHistory: "ಇತಿಹಾಸ ಲೋಡ್ ಆಗಲಿಲ್ಲ (backend error)",
  failedToDelete: "ವ್ಯವಹಾರವನ್ನು ಅಳಿಸಲು ವಿಫಲವಾಗಿದೆ",
};

const ta: Strings = {
  appName: "VoiceOps AI",
  tagline: "தினசரி பணிகளுக்கான குரல்-முதன்மை வணிக OS.",
  language: "மொழி",
  changeLanguage: "மொழியை மாற்றவும்",

  speakYourEntry: "உங்கள் பதிவை பேசுங்கள்",
  exampleSpeech: "உதாரணம்: “இன்று 40 கிலோ உருளைக்கிழங்கு விற்றேன், கிலோ 30 ரூ”.",
  tapToSpeak: "பேச டேப் செய்யவும்",
  listeningTapToStop: "கேட்கிறது… நிறுத்த டேப் செய்யவும்",
  keepItSimple: "எளிமையாக சொல் — பொருள், அளவு, விலை.",

  typeInstead: "அல்லது டைப் செய்யவும்",
  typeYourEntry: "உங்கள் பதிவை டைப் செய்யவும்",
  typePlaceholder: "ஒரு குறுகிய பதிவை எழுதவும் (எ.கா., 25 apple 10 rs)",
  saveTypedEntry: "டைப் செய்த பதிவை சேமிக்கவும்",

  aiUnderstood: "AI புரிந்தது",
  reviewBeforeSaving: "சேமிக்கும் முன் சரிபார்க்கவும்.",
  editEntry: "பதிவை திருத்தவும்",
  editPlaceholder: "சேமிக்கும் முன் உரையை சரிசெய்யவும்",
  transcriptEmpty: "டிரான்ஸ்கிரிப்ட் பார்க்க பேச ஆரம்பிக்கவும்.",

  saveEntry: "பதிவை சேமிக்கவும்",
  clear: "அழிக்கவும்",

  dashboard: "டாஷ்போர்டு",
  history: "வரலாறு",
  analyticsInsights: "பகுப்பாய்வு + உள்ளுணர்வுகள்",
  allVoiceEntries: "எல்லா குரல் பதிவுகள்",

  savingEntry: "சேமிக்கிறது…",
  savedSuccess: "சேமிக்கப்பட்டது. டாஷ்போர்டு/வரலாற்றில் பார்க்கவும்.",
  reviewAndSave: "சரிபார்த்து சேமிக்கவும்",
  stopping: "நிறுத்துகிறது…",
  speechNotSupported: "இந்த உலாவியில் குரல் ஆதரவு இல்லை.",
  noSpeechDetected: "பேச்சு இல்லை",
  voiceFailed: "குரல் அடையாளம் காண முடியவில்லை: {error}",
  failedToSave: "பரிவர்த்தனையை சேமிக்க முடியவில்லை",

  aiInsights: "AI உள்ளுணர்வுகள்",
  normalized: "இயல்பாக்கப்பட்டது",
  intent: "நோக்கம்",
  fraudCheck: "மோசடி சோதனை",
  demand: "தேவை",

  summarySubtitle: "சுருக்கம் மற்றும் சமீபத்திய பதிவுகள்.",
  quickAdd: "விரைவு சேர்க்க",
  quickAddHint: "உதாரணம்: “25 apple 10 rs”.",
  typeShortEntry: "ஒரு குறுகிய பதிவை எழுதவும்",
  add: "சேர்க்க",
  totalSales: "மொத்த விற்பனை",
  transactions: "பரிவர்த்தனைகள்",
  topSellingItem: "அதிகம் விற்பனையான பொருள்",
  qtySold: "விற்ற அளவு",
  recentTransactions: "சமீபத்திய பரிவர்த்தனைகள்",
  latestEntriesHint: "குரல் அல்லது விரைவு சேர்க்க மூலம் வந்த சமீபத்திய பதிவுகள்.",

  backToHome: "ஹோமிற்கு திரும்ப",
  entries: "பதிவுகள்",
  totalSalesHistory: "மொத்த விற்பனை (வரலாறு)",
  refresh: "புதுப்பிக்க",
  loading: "ஏற்றுகிறது…",
  noTransactionsYet: "இன்னும் பதிவுகள் இல்லை. ஹோம் திரையிலிருந்து சேர்க்கவும்.",
  delete: "நீக்கு",
  deleting: "நீக்குகிறது…",
  failedToLoadHistory: "வரலாறு ஏற்ற முடியவில்லை (backend error)",
  failedToDelete: "பரிவர்த்தனையை நீக்க முடியவில்லை",
};

export function normalizeLanguage(value: string): SupportedLanguage {
  if (value === "Hindi" || value === "Kannada" || value === "Tamil") return value;
  return "English";
}

export function createTranslator(languageName: string) {
  const language = normalizeLanguage(languageName);
  const dict = language === "Hindi" ? hi : language === "Kannada" ? kn : language === "Tamil" ? ta : en;

  return function t(key: keyof typeof en, params?: Record<string, string | number | undefined | null>) {
    const template = (dict[key as string] ?? en[key as string] ?? key) as string;
    if (!params) return template;

    return template.replace(/\{(\w+)\}/g, (_, name: string) => {
      const value = params[name];
      return value === undefined || value === null ? "" : String(value);
    });
  };
}
