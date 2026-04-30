export const FALLBACKS = {
  eligibility: {
    English: `**Voter Eligibility in India**

To be eligible to vote in India, you must meet these criteria:
1. **Age**: You must be 18 years or older on the qualifying date.
2. **Citizenship**: You must be a citizen of India.
3. **Residency**: You must be an ordinary resident of the part/polling area of the constituency where you want to be enrolled.
4. **Disqualification**: You should not be disqualified due to unsound mind, crime, or corrupt practices.`,
    Hindi: `**भारत में मतदाता पात्रता**

भारत में वोट डालने के लिए, आपको इन मानदंडों को पूरा करना होगा:
1. **आयु**: आपकी आयु पात्रता तिथि पर 18 वर्ष या उससे अधिक होनी चाहिए।
2. **नागरिकता**: आपको भारत का नागरिक होना चाहिए।
3. **निवास**: आपको उस निर्वाचन क्षेत्र के हिस्से/मतदान क्षेत्र का सामान्य निवासी होना चाहिए जहाँ आप नामांकित होना चाहते हैं।
4. **अयोग्यता**: आपको मानसिक अस्वस्थता, अपराध या भ्रष्ट आचरण के कारण अयोग्य नहीं ठहराया जाना चाहिए।`
  },
  documents: {
    English: `**Required Documents for Voter Registration**

You will need the following to register (Form 6):
1. **Identity Proof**: Aadhaar Card, PAN Card, or Passport.
2. **Age Proof**: Birth Certificate, Marksheet (10th/12th), or Aadhaar.
3. **Address Proof**: Utility Bill (Electricity/Water), Bank Passbook, or Rent Agreement.
4. **Photo**: Two recent passport-sized color photographs.`,
    Hindi: `**मतदाता पंजीकरण के लिए आवश्यक दस्तावेज**

पंजीकरण (फॉर्म 6) के लिए आपको निम्नलिखित की आवश्यकता होगी:
1. **पहचान प्रमाण**: आधार कार्ड, पैन कार्ड, या पासपोर्ट।
2. **आयु प्रमाण**: जन्म प्रमाण पत्र, मार्कशीट (10वीं/12वीं), या आधार।
3. **पता प्रमाण**: उपयोगिता बिल (बिजली/पानी), बैंक पासबुक, या किराया समझौता।
4. **फोटो**: दो हालिया पासपोर्ट आकार के रंगीन फोटो।`
  },
  registration: {
    English: `**How to Register to Vote (Step-by-Step)**

1. **Visit Portal**: Go to the official Voter Service Portal (voters.eci.gov.in).
2. **Form 6**: Select 'Form 6' for new registration.
3. **Details**: Fill in your personal details, address, and constituency.
4. **Upload**: Upload required documents (Age & Address proof).
5. **Submit**: Review and submit. You will get a reference ID to track your status.`,
    Hindi: `**वोट देने के लिए पंजीकरण कैसे करें (चरण-दर-चरण)**

1. **पोर्टल पर जाएं**: आधिकारिक मतदाता सेवा पोर्टल (voters.eci.gov.in) पर जाएं।
2. **फॉर्म 6**: नए पंजीकरण के लिए 'फॉर्म 6' चुनें।
3. **विवरण**: अपना व्यक्तिगत विवरण, पता और निर्वाचन क्षेत्र भरें।
4. **अपलोड**: आवश्यक दस्तावेज (आयु और पता प्रमाण) अपलोड करें।
5. **सबमिट करें**: समीक्षा करें और सबमिट करें। आपको अपना स्टेटस ट्रैक करने के लिए एक रेफरेंस आईडी मिलेगी।`
  },
  timeline: {
    English: `**Election Timeline & Key Dates**

1. **Announcement**: ECI announces election schedule.
2. **Notification**: Filing of nominations begins.
3. **Scrutiny**: Election officers check nomination papers.
4. **Withdrawal**: Last date for candidates to withdraw.
5. **Polling**: The actual day of voting at your booth.
6. **Counting**: Votes are counted and results are declared.`,
    Hindi: `**चुनाव समयरेखा और महत्वपूर्ण तिथियां**

1. **घोषणा**: चुनाव आयोग चुनाव कार्यक्रम की घोषणा करता है।
2. **अधिसूचना**: नामांकन पत्र दाखिल करना शुरू होता है।
3. **जांच**: चुनाव अधिकारी नामांकन पत्रों की जांच करते हैं।
4. **वापसी**: उम्मीदवारों के नाम वापस लेने की अंतिम तिथि।
5. **मतदान**: आपके बूथ पर मतदान का वास्तविक दिन।
6. **मतगणना**: वोटों की गिनती की जाती है और परिणाम घोषित किए जाते हैं।`
  },
  booth: {
    English: `**How to Find Your Polling Booth**

1. **Check EPIC**: Look at your Voter ID (EPIC) card.
2. **Online Search**: Visit voters.eci.gov.in and search by EPIC number.
3. **SMS**: Send 'EPIC <Space> Voter ID Number' to 1950.
4. **Voter Helpline App**: Download the official app to locate your booth on a map.`,
    Hindi: `**अपना मतदान केंद्र कैसे खोजें**

1. **EPIC जांचें**: अपना वोटर आईडी (EPIC) कार्ड देखें।
2. **ऑनलाइन खोज**: voters.eci.gov.in पर जाएं और EPIC नंबर से खोजें।
3. **SMS**: 1950 पर 'EPIC <स्पेस> वोटर आईडी नंबर' भेजें।
4. **वोटर हेल्पलाइन ऐप**: मैप पर अपने बूथ का पता लगाने के लिए आधिकारिक ऐप डाउनलोड करें।`
  }
};

/**
 * Routes queries to predefined fallback responses if the AI is unavailable.
 * @param {string} query - The user's input message.
 * @param {string} language - The current language ('English' or 'Hindi').
 * @returns {string|null} - The matched fallback content or null.
 */
export const getFallback = (query, language) => {
  const lang = language === 'Hindi' ? 'Hindi' : 'English';
  const q = query.toLowerCase();

  if (q.includes('eligibility') || q.includes('eligible') || q.includes('पात्रता') || q.includes('पात्र')) return FALLBACKS.eligibility[lang];
  if (q.includes('document') || q.includes('id proof') || q.includes('दस्तावेज') || q.includes('आईडी')) return FALLBACKS.documents[lang];
  if (q.includes('register') || q.includes('apply') || q.includes('पंजीकरण') || q.includes('रजिस्टर')) return FALLBACKS.registration[lang];
  if (q.includes('timeline') || q.includes('date') || q.includes('समयरेखा') || q.includes('तारीख')) return FALLBACKS.timeline[lang];
  if (q.includes('booth') || q.includes('where to vote') || q.includes('बूथ') || q.includes('केंद्र')) return FALLBACKS.booth[lang];

  return null;
};
