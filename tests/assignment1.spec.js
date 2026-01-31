// tests/assignment1.spec.js
const { test, expect } = require('@playwright/test');

const TARGET_URL = 'https://www.swifttranslator.com/';

// ---------------------------------------------------------------------------
// 30 POSITIVE SCENARIOS
// ---------------------------------------------------------------------------
const positiveScenarios = [
  {
    id: 'Pos_Fun_0001',
    description: 'Religious pilgrimage phrase - Meaning is correctly preserved, spelling and word segmentation are accurate.',
    input: 'mama katharagama yanavaa dheviyoo vadhinna',
    expected: 'මම කතරගම යනවා දෙවියෝ වදින්න'
  },
  {
    id: 'Pos_Fun_0002',
    description: 'School homework inquiry - Correct transliteration of retroflex consonants like "N" to "ණ". Spacing and punctuation are preserved.',
    input: 'oyaa iiyee gaNithaya gedhara vaeda kalaadha ? matath ee gedhara vaeda kiyalaa dhenna',
    expected: 'ඔයා ඊයේ ගණිතය ගෙදර වැඩ කලාද ? මටත් ඒ ගෙදර වැඩ කියලා දෙන්න'
  },
  {
    id: 'Pos_Fun_0003',
    description: 'Complex Greeting + Request - Successfully handles a long paragraph while maintaining logical flow and accurate character mapping.',
    input: ' aayuboovan maamee oyaata kohomadha ? mama podi karadharayak nisaa kathaa kalee adha udhee mama vaedata yanna hadhissiyee eliyata enakota mata amathaka velaa magee kaamaree yathura amathaka velaa kaamareema dhaalaa aevillaa dhaen mata kaamaree aethulata yanna vidhihak naee anee maamee oyaa laga magee kaamaree amathaka yathurak thiyenavadha puluvannam tika velaavakata dhenna puluvandha mama ikmanin dhora aeralaa yathura ikmanin oyagee athata genalla dhennam mee velaavee eka mata loku udhavvak',
    expected: ' ආයුබෝවන් මාමේ ඔයාට කොහොමද ? මම පොඩි කරදරයක් නිසා කතා කලේ අද උදේ මම වැඩට යන්න හදිස්සියේ එලියට එනකොට මට අමතක වෙලා මගේ කාමරේ යතුර අමතක වෙලා කාමරේම දාලා ඇවිල්ලා දැන් මට කාමරේ ඇතුලට යන්න විදිහක් නෑ අනේ මාමේ ඔයා ලග මගේ කාමරේ අමතක යතුරක් තියෙනවද පුලුවන්නම් ටික වෙලාවකට දෙන්න පුලුවන්ද මම ඉක්මනින් දොර ඇරලා යතුර ඉක්මනින් ඔයගේ අතට ගෙනල්ල දෙන්නම් මේ වෙලාවේ එක මට ලොකු උදව්වක්'
  },
  {
    id: 'Pos_Fun_0004',
    description: 'Polite phrasing - "karunaakaralaa" is correctly converted with dental "n" (න) and long vowels.',
    input: 'karunaakaralaa mata oyaagee kamisaya dhenna',
    expected: 'කරුනාකරලා මට ඔයාගේ කමිසය දෙන්න'
  },
  {
    id: 'Pos_Fun_0005',
    description: 'Informal phrasing - Effectively handles colloquial Singlish words like "ban" and "uba" while maintaining the context of the sentence.',
    input: 'oyi menna meka kaapan. ubata kiyana de ahennavanee nikan boruvata ranganne nathuva hitapan. mata dhaen thiyena badaginnata oona dheyak kanavaa. poddak ivasala idhapan ban',
    expected: 'ඔයි මෙන්න මෙක කාපන්. උබට කියන ඩෙ අහෙන්නවනේ නිකන් බොරුවට රන්ගන්නෙ නතුව හිටපන්. මට දැන් තියෙන බඩගින්නට ඕන දෙයක් කනවා. පොඩ්ඩක් ඉවසල ඉදපන් බන්'
  },
  {
    id: 'Pos_Fun_0006',
    description: 'Medical/Day-to-day expressions - "koththamallii" is accurately transliterated showing robustness in handling specific cultural items.',
    input: 'anee samaavenna mata godaak asaniipayii mata monavaa hari bonna onna mama koththamallii tikak thabbagena biilaa ennam',
    expected: 'අනේ සමාවෙන්න මට ගොඩාක් අසනීපයී මට මොනවා හරි බොන්න ඔන්න මම කොත්තමල්ලී ටිකක් තබ්බගෙන බීලා එන්නම්'
  },
  {
    id: 'Pos_Fun_0007',
    description: 'Joined vs Segmented variations - System correctly identifies word boundaries despite inconsistent user spacing.',
    input: 'mama labana sathiyee poLonnaruvee thiyena aithihaasika pansal balanna yanna hithaagena innee oyaatath edhaata viveekayak thiyenavanavanam apith ekka yanna enna',
    expected: 'මම ලබන සතියේ පොළොන්නරුවේ තියෙන ඓතිහාසික පන්සල් බලන්න යන්න හිතාගෙන ඉන්නේ ඔයාටත් එදාට විවේකයක් තියෙනවනවනම් අපිත් එක්ක යන්න එන්න'
  },
  {
    id: 'Pos_Fun_0008',
    description: 'Repeated word expressions - Correctly handles repetition like "himin himin" without losing character mapping accuracy.',
    input: 'api himin himin kothmalee kiri karmaanthashaalavee gamanaanthaya vetha lan vena gamanuyi innee',
    expected: 'අපි හිමින් හිමින් කොත්මලේ කිරි කර්මාන්තශාලවේ ගමනාන්තය වෙත ලන් වෙන ගමනුයි ඉන්නේ'
  },
  {
    id: 'Pos_Fun_0009',
    description: 'Past tense + Negation - The suffix "baee" is correctly mapped to "බෑ", and the overall past tense context is preserved.',
    input: 'apita dhaen nam sellam karanna baee api iiyee sellam karalaa innee ee nisaa apita godak mahansii oyalaa sellam karannakoo anika iiyee raee vassa vaehaepu nisaa nisaa kohomath sellam karanna bahaee poLova godak mada velaa',
    expected: 'අපිට දැන් නම් සෙල්ලම් කරන්න බෑ අපි ඊයේ සෙල්ලම් කරලා ඉන්නේ ඒ නිසා අපිට ගොඩක් මහන්සී ඔයලා සෙල්ලම් කරන්නකෝ අනික ඊයේ රෑ වස්ස වැහැපු නිසා නිසා කොහොමත් සෙල්ලම් කරන්න බහෑ පොළොව ගොඩක් මඩ වෙලා'
  },
  {
    id: 'Pos_Fun_0010',
    description: 'Future tense + Negation - "epa" is correctly recognized as an imperative negation.',
    input: 'paasalen iilaga sathiyee vinoodha charikaavak yanavaa. Lamayii edhaata enakota sudhupaata aedhum adhagena enna epaa.',
    expected: 'පාසලෙන් ඊලග සතියේ විනෝද චරිකාවක් යනවා. ළමයී එදාට එනකොට සුදුපාට ඇදුම් අදගෙන එන්න එපා.'
  },
  {
    id: 'Pos_Fun_0011',
    description: 'Request Forms + Tech Terms - English words like "WhatsApp" and "WiFi" are correctly preserved within the Sinhala output.',
    input: 'ane karuNaakaralaa oyaalage Google meeting ekkee link eka mata dhaennama WhatsApp karanna puLuvandha?\nmokadha ape paeththhee WiFi hariyata vaeda karanne naethi nisaa mata meeting ekata log venna kisima vidhihayak aeththhema naehae.\nee nisaa puLuvan nam adhaaLa documents tikath attach karalaa mata ikmanata email ekak evanna.',
    expected: 'අනෙ කරුණාකරලා ඔයාලගෙ Google meeting එක්කේ link එක මට දැන්නම WhatsApp කරන්න පුළුවන්ද?\nමොකද ape පැත්ත්හේ WiFi හරියට වැඩ කරන්නේ නැති නිසා මට meeting එකට log වෙන්න කිසිම විදිහයක් ඇත්ත්හෙම නැහැ.\nඒ නිසා පුළුවන් නම් අදාළ documents ටිකත් attach කරලා මට ඉක්මනට email එකක් එවන්න.'
  },
  {
    id: 'Pos_Fun_0012',
    description: 'Tech Support context - Complex IT terms like "BIOS settings" and "Clean Install" remain unchanged as expected in professional Singlish.',
    input: 'oyaata puLuvannam magee PC ekata alutha Windows 11 OS eka dhaalaa dhenna. mata eka thaniyama karaganna bae kohomath anivaarayenma BIOS settings hadhana ekayii USB ekak paavichchi karalaa Clean Install ekak karana eka mata tikak karaganna amaruyii. magee HP Laptop ekee thiyena SSD ekata hariyatama Drivers tikath ekkama OS eka Setup karaganna oyaagee udhav oonee. oyaata pahasu velaavaka mee Technical Support eka dhenna puLuvandha?',
    expected: 'ඔයාට පුළුවන්නම් මගේ PC එකට අලුත Windows 11 OS එක දාලා දෙන්න. මට එක තනියම කරගන්න බැ කොහොමත් අනිවාරයෙන්ම BIOS settings හදන එකයී USB එකක් පාවිච්චි කරලා Clean Install එකක් කරන එක මට ටිකක් කරගන්න අමරුයී. මගේ HP Laptop එකේ තියෙන SSD එකට හරියටම Drivers ටිකත් එක්කම OS එක Setup කරගන්න ඔයාගේ උදව් ඕනේ. ඔයාට පහසු වෙලාවක මේ Technical Support එක දෙන්න පුළුවන්ද?'
  },
  {
    id: 'Pos_Fun_0013',
    description: 'Academic Request - Successfully handles university abbreviations like "ITPM" alongside Sinhala text.',
    input: 'anee karuNaakarala magee ITPM Assignment eka Submit karanna alutha Link eka mata WhatsApp karanna puLuvandha? magee PC ekee dhaenata OS eka vaeda karanne naethi nisaa mata Course web ekata Login venna vidhihak nae. loku udhavvak',
    expected: 'අනේ කරුණාකරල මගේ ITPM Assignment එක Submit කරන්න අලුත Link එක මට WhatsApp කරන්න පුළුවන්ද? මගේ PC එකේ දැනට OS එක වැඩ කරන්නේ නැති නිසා මට Course web එකට Login වෙන්න විදිහක් නැ. ලොකු උදව්වක්'
  },
  {
    id: 'Pos_Fun_0014',
    description: 'Mixed English/Singlish - Words like "Traffic", "On time", and "Late Attendance" are preserved without incorrect transliteration.',
    input: 'paaree loku Traffic ekak thiyena nisaa mata adha campus ekata On time enna baeriveyii . ee nisaa karuNaakaralaa lecture ta kiyanna මම එනවා කියලා Late Attendance එකක් විදිහට සලකන්න පුළුවනද? අහන්න මම පුළුවන් ඉක්මනෙන් Campus එකට එන්න try කරනවා',
    expected: 'පාරේ ලොකු Traffic එකක් තියෙන නිසා මට අද campus එකට On time එන්න බැරිවයී . ඒ නිසා කරුණාකරලා lecture ට කියන්න මම එනවා කියලා Late Attendance එකක් විදිහට සලකන්න පුළුවනද? අහන්න මම පුළුවන් ඉක්මනෙන් Campus එකට එන්න try කරනවා'
  },
  {
    id: 'Pos_Fun_0015',
    description: 'Negative sentence - "bonnee nae" is correctly converted, showing understanding of negative verb forms.',
    input: 'mama siinii vaedii biima jaathii bonnee nae',
    expected: 'මම සීනී වැඩී බීම ජාතී බොන්නේ නැ'
  },
  {
    id: 'Pos_Fun_0016',
    description: 'Colloquial slang - "appatasirii" is a common slang term that is accurately converted to Sinhala script.',
    input: 'appatasirii machan mama hithuvata vadaa godak amaruiyii mee paree yanna godak valaval thiyenavanee.',
    expected: 'අප්පටසිරී මචන් මම හිතුවට වඩා ගොඩක් අමරුඉයී මේ පරේ යන්න ගොඩක් වලවල් තියෙනවනේ.'
  },
  {
    id: 'Pos_Fun_0017',
    description: 'Date/Time preservation - Slashes in date (2026/1/20) and dots in time (3.00) are preserved correctly.',
    input: ' 2026/1/20 dhina savasa 3.00 ta aithihaasika aBhinavaarama pansalee varshika raesveema paevaethvee ee sadhahaa dhaayaka saBhavee siyaluma dhenaa sambandha vanna',
    expected: '2026/1/20 දින සවස 3.00 ට ඓතිහාසික අභිනවාරම පන්සලේ වර්ශික රැස්වේම පැවැත්වේ ඒ සදහා දායක සභවේ සියලුම දෙනා සම්බන්ද වන්න'
  },
  {
    id: 'Pos_Fun_0018',
    description: 'Place names - Proper nouns like "maathalee" are phonetically mapped accurately to "මාතලේ".',
    input: 'api flim balanna yamudha car ekee maathalee yamudha',
    expected: 'අපි ෆ්ලිම් බලන්න යමුද car එකේ මාතලේ යමුද'
  },
  {
    id: 'Pos_Fun_0019',
    description: 'Religious context - "sadhagiri saeeya" is accurately converted, maintaining spiritual terminology accuracy.',
    input: 'mama sadhagiri saeeya balanna yannee hadhannee',
    expected: 'මම සදගිරි සෑය බලන්න යන්නේ හදන්නේ'
  },
  {
    id: 'Pos_Fun_0020',
    description: 'Simple Plural - "api" and plural context of the sentence are correctly maintained.',
    input: 'api Phone ekak ganna maathara yanavaa',
    expected: 'අපි Phone එකක් ගන්න මාතර යනවා'
  },
  {
    id: 'Pos_Fun_0021',
    description: 'Informal slang + Short forms - Handling of "adoo", "patta", and the English "baQQ" (slang for ban) shows great robustness.',
    input: 'adoo machan mee ITPM Assignment eka patta amaruyineedha uba eeka kalaadha mama nam thaama ivara karalaa naehae baQQ',
    expected: 'අඩෝ මචන් මේ ITPM Assignment එක පට්ට අමරුයිනේද උබ ඒක කලාද මම නම් තාම ඉවර කරලා නැහැ බං'
  },
  {
    id: 'Pos_Fun_0022',
    description: 'News/Paragraph style - Successfully handles formal reporting style with complex retroflex consonants like "L" (ළ) and "sh" (ෂ).',
    input: 'padhiyathalava nagarayee karmantha shaalavaka athi vuu hadhisi ginnakin dhepala raesakata haani sidhuvii athi athara pudhgalayin siv dhenukuta barapathala thuvaala sidhuvii athi athara dhenenekuta sulu thuvaala siduvuu aetha. ginnata heethuva methek anaavaranaya vii nomaetha athara polisiya thava dhuratath parikshana pavathvayii',
    expected: 'පදියතලව නගරයේ කර්මන්ත ශාලවක අති වූ හදිසි ගින්නකින් දෙපල රැසකට හානි සිදුවී අති අතර පුද්ගලයින් සිව් දෙනුකුට බරපතල තුවාල සිදුවී අති අතර දෙනෙනෙකුට සුලු තුවාල සිඩුවූ ඇත. ගින්නට හේතුව මෙතෙක් අනාවරනය වී නොමැත අතර පොලිසිය තව දුරටත් පරික්ශන පවත්වයී'
  },
  {
    id: 'Pos_Fun_0023',
    description: 'Currency preservation - "RS" and the following numeric value remain correctly formatted.',
    input: 'api RS 50000 k hoyaa gamuu pansalee kathina puujaava suudhaanam kiriima sadhahaa',
    expected: 'අපි RS 50000 ක් හොයා ගමූ පන්සලේ කතින පූජාව සූදානම් කිරීම සදහා'
  },
  {
    id: 'Pos_Fun_0024',
    description: 'Units of measurement - "1kg" is preserved correctly in its English form within the Sinhala output.',
    input: 'oyaata puluvandha mata lakluNu 1kg ekak genna',
    expected: 'ඔයාට පුලුවන්ද මට ලක්ලුණු 1kg එකක් ගෙන්න'
  },
  {
    id: 'Pos_Fun_0025',
    description: 'Basic Sentence - Perfect mapping for the most common Singlish phrase.',
    input: 'mama gedhara yanavaa',
    expected: 'මම ගෙදර යනවා'
  },
  {
    id: 'Pos_Fun_0026',
    description: 'Emotion phrasing - The word "kammaeLi" (lazy) is correctly converted with the special "ළ" character.',
    input: 'mata godak kammaeLi',
    expected: 'මට ගොඩක් කම්මැළි'
  },
  {
    id: 'Pos_Fun_0027',
    description: 'Greeting inquiry - Standard interrogative form is maintained.',
    input: 'oyaa kohomadha',
    expected: 'ඔයා කොහොමද'
  },
  {
    id: 'Pos_Fun_0028',
    description: 'Commercial request - Correct segmentation of "mudhalaalii" and "paan pitii".',
    input: 'mudhalaalii karuNaakaralaa mata paan pitii 1kg ekak dhenna',
    expected: 'මුදලාලී කරුණාකරලා මට පාන් පිටී 1kg එකක් දෙන්න'
  },
  {
    id: 'Pos_Fun_0029',
    description: 'Compound question - Combines planning, excuse, and a question successfully.',
    input: 'mama Campus yanna plan karalaa thiyennee eth adha udhee yanna kammaeli nisaa havas velaama yanavaa oyaa udheema enavadha ?',
    expected: 'මම Campus යන්න plan කරලා තියෙන්නේ එත් අද උදේ යන්න කම්මැලි නිසා හවස් වෙලාම යනවා ඔයා උදේම එනවද ?'
  },
  {
    id: 'Pos_Fun_0030',
    description: 'Administrative Request - "NIC" remains in English script while the rest is converted, ensuring clarity.',
    input: 'mata karuNaakaralaa oyaagee NIC eka dhenna visthara balanna',
    expected: 'මට කරුණාකරලා ඔයාගේ NIC එක දෙන්න විස්තර බලන්න'
  }
];

// ---------------------------------------------------------------------------
// 10 NEGATIVE SCENARIOS
// ---------------------------------------------------------------------------
const negativeScenarios = [
  {
    id: 'Neg_Fun_0001',
    description: 'Robustness against Mixed Caps - System fails to maintain consistent case sensitivity, resulting in phonetically incorrect mapping like "Cඅර්ඩ්".',
    input: 'ada dhesaembar 25 vanidha. api Christmas party ekata yanava. ticket eka Rs. 2500 yi. oyaata 7.00 PM veddi enna puluvandha? amathaka karanna epaa ID eka genna. gate eken enter venna QR code eka oone. salLi genna epaa, CArd PAyment vitharayi baara ganne.',
    expected: 'අඩ දෙසැම්බර් 25 වනිද. අපි Christmas party එකට යනව. ticket එක Rs. 2500 යි. ඔයාට 7.00 PM වෙඩ්ඩි එන්න පුලුවන්ද? අමතක කරන්න එපා ID එක ගෙන්න. gate එකෙන් enter වෙන්න QR code එක ඕනෙ. සල්ළි ගෙන්න එපා, Cඅර්ඩ් ඵය්මෙන්ට් විතරයි බාර ගන්නෙ.'
  },
  {
    id: 'Neg_Fun_0002',
    description: 'Robustness against repeated vowels - Excessive use of "ee" in "keththaaraamee" leads to vowel mapping errors.',
    input: 'mama anidhdhaa keththaaraamee match eka balanna yanawa',
    expected: 'මම අනිද්දා කෙත්තාරාමේ match එක බලන්න යනවා'
  },
  {
    id: 'Neg_Fun_0003',
    description: 'Technical Accuracy - Common informal abbreviations like "Thnx" are not preserved or correctly ignored in a long academic context.',
    input: 'Mage research paper eke topic eka "Sinhala Language Processing". Eke citations thiyenne (Gunawardena, 2023) kiyala. Mama eka PDF format eken upload kalaa. Mata sure nae eka system ekata support karaida kiyala. Oyaage feedback eka labunaata passe mama thawa wenaskam karannam. Thnx for the support.',
    expected: 'මගේ research paper එකේ topic එක "Sinhala Language Processing". ඒකේ citations තියෙන්නේ (Gunawardena, 2023) කියලා. මම එක PDF format එකෙන් upload කළා. මට සුරේ නෑ එක system එකට support කරයිද කියලා. ඔයාගේ feedback එක ලැබුනට පස්සේ මම තව වෙනස්කම් කරන්නම්. Thnx for the support.'
  },
  {
    id: 'Neg_Fun_0004',
    description: 'Handling IT Data - File paths with slashes "C:/" and technical terms like "server.js" cause segmentation and transliteration errors.',
    input: 'Server eka crash wuna welawa: 10.45 AM.Error log code: [ERR_404_NOT_FOUND].<br>Possible cause: Database connection timeout Mama server.js file eka check kalaa. Eke path eka C:/Users/Admin/Deskto thiyenne. Eka venas karanna oonedha? Nathnam port eka check karannadha? Karunakara ikmanata help ekak dhenna.',
    expected: 'Server එක crash වුන වෙලාව: 10.45 AM.Error log code: [ERR_404_NOT_FOUND].<br>Possible cause: Database connection timeout මම server.js file එක check කළා. ඒකේ path එක C:/Users/Admin/Deskto තියෙන්නේ. එක වෙනස් කරන්න ඕනෙද? නැත්නම් port එක check කරන්නද? කරුණාකර ඉක්මනට help එකක් දෙන්න.'
  },
  {
    id: 'Neg_Fun_0005',
    description: 'Robustness against Hashtags - Hashtag symbols (#) in the input confuse the transliteration engine.',
    input: 'Ada api trip giya! #Fun #Travel #SriLanka photos tika balanna.',
    expected: 'අද අපි trip ගියා! #Fun #Travel #SriLanka photos ටික බලන්න.'
  },
  {
    id: 'Neg_Fun_0006',
    description: 'Abbreviation concatenation - System fails to separate "PDF" from "ekak" resulting in phonetically garbled output "ඵ්ඪ්ෆෙකක්".',
    input: 'mata eka PDFekak widihata evanna puluwanda?',
    expected: 'මට එක ඵ්ඪ්ෆෙකක් wඉඩිහට එවන්න පුලුwඅන්ඩ.?'
  },
  {
    id: 'Neg_Fun_0007',
    description: 'URL processing - Embedded web addresses (www) are partially transliterated, which is undesirable for technical data.',
    input: 'ape aluth site eka www. IR Mate.com wenna oone.',
    expected: 'ape අලුත් site එක www. IR Mate.com වෙන්න ඕනෙ.'
  },
  {
    id: 'Neg_Fun_0008',
    description: 'Robustness against No Spaces - Lack of proper spacing in timestamps (2.30 PM) leads to inconsistent conversion.',
    input: 'Api 3rd floor eke innawa. Meeting eka 2.30 PM patan gannawa',
    expected:'අපි 3rd floor එකේ ඉන්නවා. Meeting එක 2.30 PM පටන් ගන්නවා'
  },
  {
    id: 'Neg_Fun_0009',
    description: 'Special character robustness - Symbols like "@" in "Guest@123" are not always handled as literal characters.',
    input: 'Wifi password eka "Guest@123" neda? Mata connect wenna bae.',
    expected: 'Wifi password එක "Guest@123" නේද? මට connect වෙන්න බෑ.'
  },
  {
    id: 'Neg_Fun_0010',
    description: 'Phonetic Mapping Error - Retroflex "N" and "A" mapping fails when used in highly informal, caps-mixed sentences.',
    input: 'API heta aniddama campus eka paeththe gihiN viraamayatath podi Aathal ekak aran emu',
    expected: 'API හෙට අනිද්දම campus එක පැත්තෙ ගිහින් විරාමයටත් පොඬි ආතල් එකක් අරන් එමු.'
  }
];

// ---------------------------------------------------------------------------
// TEST SUITE
// ---------------------------------------------------------------------------
test.describe('SwiftTranslator Automation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(TARGET_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await page.waitForSelector('textarea[placeholder*="Input Your Singlish Text Here"]', { timeout: 10000 });
  });

  // 1. POSITIVE FUNCTIONAL TESTS
  for (const scenario of positiveScenarios) {
    test(`${scenario.id}: ${scenario.description}`, async ({ page }) => {
      const inputBox = page.locator('textarea[placeholder*="Input Your Singlish Text Here"]');
      const outputBox = page.locator('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap');

      await inputBox.waitFor({ state: 'visible' });
      await inputBox.click();
      await inputBox.fill('');
      await page.waitForTimeout(200);
      await inputBox.type(scenario.input, { delay: 50 });
      
      await page.waitForFunction(
        (expectedLength) => {
          const element = document.querySelector('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap');
          return element && element.textContent.trim().length >= expectedLength;
        },
        scenario.expected.trim().length / 2,
        { timeout: 10000 }
      );
      
      await page.waitForTimeout(500);
      const outputText = await outputBox.textContent();
      expect(outputText.trim()).toBe(scenario.expected.trim());
    });
  }

  // 2. NEGATIVE FUNCTIONAL TESTS
  for (const scenario of negativeScenarios) {
    test(`${scenario.id}: ${scenario.description}`, async ({ page }) => {
      const inputBox = page.locator('textarea[placeholder*="Input Your Singlish Text Here"]');
      const outputBox = page.locator('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap');

      await inputBox.waitFor({ state: 'visible' });
      await inputBox.click();
      await inputBox.fill('');
      await page.waitForTimeout(200);
      await inputBox.type(scenario.input, { delay: 50 });
      
      await page.waitForFunction(
        (expectedLength) => {
          const element = document.querySelector('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap');
          return element && element.textContent.trim().length > 0;
        },
        scenario.expected.trim().length / 2,
        { timeout: 10000 }
      );
      
      await page.waitForTimeout(500);
      const outputText = await outputBox.textContent();
      expect(outputText.trim()).toBe(scenario.expected.trim());
    });
  }

  // 3. UI TEST SCENARIO
  test('Pos_UI_0001: Real-time output update behavior - Verifies that the UI reacts instantly to keystrokes for a seamless user experience.', async ({ page }) => {
    const inputBox = page.locator('textarea[placeholder*="Input Your Singlish Text Here"]');
    const outputBox = page.locator('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap');

    await inputBox.waitFor({ state: 'visible' });
    await inputBox.click();
    await inputBox.fill('');
    await page.waitForTimeout(200);
    await inputBox.type('mama', { delay: 100 });
    
    await page.waitForFunction(
      () => {
        const element = document.querySelector('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap');
        return element && element.textContent.trim().length > 0;
      },
      { timeout: 5000 }
    );
    
    let outputText = await outputBox.textContent();
    expect(outputText).toContain('මම');

    await inputBox.type(' yanawa', { delay: 100 });
    await page.waitForTimeout(1000);
    
    outputText = await outputBox.textContent();
    expect(outputText.trim()).toBe('මම යනව');
  });
});