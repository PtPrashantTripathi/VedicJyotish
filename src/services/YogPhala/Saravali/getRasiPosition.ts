import type {
    Planet,
    PlanetEn,
    SaptagrahaEn,
} from "src/services/constants/Planet";
import type { RasiEn } from "src/services/constants/Rasi";
import type { Translation } from "src/services/types";
import type { Phala } from "src/services/YogPhala";

/**
 * Retrieves rasi effect descriptions for each planet based on its current rasi
 * position.
 *
 * @param planetaryPositions - All planetary data keyed by English planet name.
 * @returns An array of rules containing the description and effect for each.
 */
export function getSaravaliRasiPositionYogPhala(
    planetaryPositions: Record<PlanetEn, Planet>
): Phala[] {
    return Object.entries(PlanetRasiEffectTable).map(
        ([planetName, rasiEffectMap]) => {
            const planet = planetaryPositions[planetName];
            return {
                description: {
                    english: `${planet.name.english} in the ${planet.rasi.name.english} Rasi`,
                    hindi: `${planet.name.hindi} ${planet.rasi.name.hindi} राशि में`,
                },
                effect: rasiEffectMap[planet.rasi.name.english],
            };
        }
    );
}

/** Planet Rasi effects mapping */
export const PlanetRasiEffectTable: Record<
    SaptagrahaEn,
    Record<RasiEn, Translation<string, string>>
> = {
    Sun: {
        Aries: {
            english:
                "One, who has the Sun in Aries will comment on the meanings of Shastras, be famous in arts, fond of war, fierce, attached to his duty, fond of roaming, will have strong bones, be good in deeds, will do valorous acts, will be subjected to bilious and bloody disorders, be splendourous and strong. The native will also become a king.",
            hindi: "मेष राशि में सूर्य होने पर जातक शास्त्रों का भाष्य करने वाला, कलाओं में प्रसिद्ध, युद्धप्रिय, उग्र, कर्तव्यनिष्ठ, भ्रमणप्रिय, सुदृढ़ अस्थियों वाला, कर्मशील, पराक्रमी, रक्तपित्त विकार से ग्रस्त, तेजस्वी एवं बलवान होता है। जातक राजा भी बनता है।",
        },
        Taurus: {
            english:
                "The position of the Sun in the Sign Taurus indicates, that the native will have troubles from disease of face and eyes, will endure difficulties, will have an emaciated body, will not have many sons, will be beautiful (also means fortunate, nice, handsome etc.), will possess decorum, be wise, will hate barren (or confined) women, be endowed with eatables, garlands, robes and scents, will have knowledge of singing, playing musical instruments and dancing and will face risk from water.",
            hindi: "वृषभ राशि में सूर्य की स्थिति से पता चलता है कि जातक को चेहरे और आंखों के रोग से परेशानी होगी, कठिनाइयों को सहन करना होगा, शरीर क्षीण होगा, अधिक पुत्र नहीं होंगे, सुंदर (भाग्यशाली, अच्छा, सुन्दर आदि भी कहा जाता है), शालीनता से युक्त, बुद्धिमान, बांझ (या परित्यक्त) स्त्रियों से घृणा करने वाला, खाद्य पदार्थों, मालाओं, वस्त्रों और सुगंधियों से संपन्न होगा, गायन, संगीत वाद्ययंत्र बजाने और नृत्य का ज्ञान होगा और जल से खतरा रहेगा।",
        },
        Gemini: {
            english:
                "One who has the Sun in Gemini will be a scholar, be sweet in speech, affectionate (particularly to ones offspring), will have good conduct, be expert in profane knowledge and also in Sastras, be exceedingly affluent, liberal, skillful, be an astrologer, be mediocre in appearance, will have two mothers, be fortunate and modest.",
            hindi: "मिथुन राशि में सूर्य होने पर व्यक्ति विद्वान, मधुर वाणी वाला, स्नेही (विशेषकर संतान से) होता है, उसका आचरण अच्छा होता है, वह शास्त्रों में निपुण होता है, वह अत्यधिक धनवान, उदार, कुशल, ज्योतिषी, साधारण दिखने वाला, दो माताओं वाला, भाग्यशाली और विनम्र होता है।",
        },
        Cancer: {
            english:
                "The Sun in Cancer indicates, that the native will not be steady in mind in respect of his undertakings, will be famous by virtue of his royal qualities, will hate his own men, be unfortunate in respect of wife (have an ugly wife), will be good-looking himself, be troubled due to imbalances of phlegm and bile, be distressed on account of labour (hard work), will like intoxicants, follow virtuous principles, be honourable, will be eloquent, will be a geographer and a scientist in the matter of atmosphere/space, will be very steady and will hate people from paternal side.",
            hindi: "कर्क राशि में सूर्य होने से यह संकेत मिलता है कि जातक अपने कार्यों के प्रति मन से स्थिर नहीं होगा, अपने राजसी गुणों के कारण प्रसिद्ध होगा, अपने ही लोगों से घृणा करेगा, पत्नी के मामले में दुर्भाग्यशाली होगा (पत्नी कुरूप होगी), स्वयं सुंदर होगा, कफ और पित्त के असंतुलन से परेशान होगा, परिश्रम के कारण व्यथित होगा, मादक पदार्थों का शौकीन होगा, धार्मिक सिद्धांतों का पालन करेगा, सम्माननीय होगा, वाक्पटु होगा, भूगोलवेत्ता होगा और वातावरण/अंतरिक्ष के मामले में वैज्ञानिक होगा, बहुत स्थिर होगा और पैतृक पक्ष के लोगों से घृणा करेगा।",
        },
        Leo: {
            english:
                "If the Sun occupies Leo, the native will destroy his enemies, be given to anger, will perform notable acts, will wander in forests, hills and fortresses, be enthusiastic, valorous, bright in appearance, will eat meat, flesh etc. and will be formidable. He will be restive, strong in a lasting measure, talkative, be a king, be plentiful in wealth and famous.",
            hindi: "यदि सूर्य सिंह राशि में हो तो जातक शत्रुओं का नाश करने वाला, क्रोधी, उल्लेखनीय कार्य करने वाला, जंगलों, पहाड़ियों और किलों में विचरण करने वाला, उत्साही, वीर, तेजस्वी, मांसाहारी, दुर्जेय, चंचल, चिरंजीवी, बलवान, बातूनी, राजा, धनवान और यशस्वी होगा।",
        },
        Virgo: {
            english:
                "Should the Sun be in Virgo at birth, the person will possess a physique akin to that of a female, be a scholar, be weak, be an expert writer, be learned and will render service to Gods and elders. He will be expert in repairs of driven vehicles, will be skillful in Vedas, songs and playing instruments and will speak softly and kindly.",
            hindi: "यदि जन्म के समय सूर्य कन्या राशि में हो तो जातक स्त्री के समान शरीर वाला, विद्वान, दुर्बल, कुशल लेखक, विद्वान, देवताओं एवं वृद्धों की सेवा करने वाला, वाहनों की मरम्मत करने वाला, वेद, गान एवं वाद्य बजाने में निपुण, मधुर एवं मधुर वाणी बोलने वाला होता है।",
        },
        Libra: {
            english:
                "If the Sun is in Libra at birth, the native will face frustration, destruction and heavy expenditure, will be intent on living in foreign places (out of distress), be wicked, mean, be devoid of affection, will live by selling gold and other metals, be jealous, fond of doing others jobs, will co-habit with others wives, be dirty, will incur royal contempt and be shameless.",
            hindi: "यदि जन्म के समय सूर्य तुला राशि में हो तो जातक निराशा, विनाश और भारी व्यय का सामना करेगा, परदेश में रहने की इच्छा रखेगा, दुष्ट, नीच, स्नेह से रहित, सोना और अन्य धातुएं बेचकर जीवनयापन करने वाला, ईर्ष्यालु, दूसरों के काम करने का शौकीन, दूसरों की पत्नियों के साथ सहवास करने वाला, गंदा, राजसी तिरस्कार का भागी और निर्लज्ज होगा।",
        },
        Scorpio: {
            english:
                "The native with the Sun in Scorpio will have an incombatible lust for war, be away from Vedic (religious) path, be a liar, a dunce, will have a base, wicked wife (can also mean loss of wife), be cruel and be attached to mean women. He will be irascible, will follow bad course, be a miser, be fond of promoting quarrels, be troubled by weapons, fire and poison and be unfortunate in respect of parents.",
            hindi: "वृश्चिक राशि में सूर्य होने पर जातक में युद्ध के प्रति अदम्य लालसा, वैदिक (धार्मिक) मार्ग से विमुख, झूठा, मूर्ख, नीच, दुष्ट पत्नी (पत्नी का नाश भी हो सकता है), क्रूर और नीच स्त्रियों में आसक्त होगा। वह क्रोधी, बुरे मार्ग पर चलने वाला, कंजूस, झगड़ों को बढ़ावा देने वाला, शस्त्र, अग्नि और विष से परेशान रहने वाला और माता-पिता के प्रति दुर्भाग्यशाली होगा।",
        },
        Sagittarius: {
            english:
                "If the Sun at birth is in Sagittarius, one will be endowed with wealth, be dear to king, learned, will respect Gods and Brahmins, be skillful in rendering training in use of weapons and arrows and breeding of elephants, be fit to deal with, be honourable, be always peaceful, be rich, will possess a broad and beautiful physique, be helpful to relatives and be energetic.",
            hindi: "यदि जन्म के समय सूर्य धनु राशि में हो तो वह धनवान, राजा का प्रिय, विद्वान, देवताओं और ब्राह्मणों का आदर करने वाला, शस्त्र-बाण चलाने और हाथियों के प्रजनन में निपुण, व्यवहार में कुशल, सम्माननीय, सदैव शांत रहने वाला, धनवान, चौड़ा और सुंदर शरीर वाला, संबंधियों की सहायता करने वाला और ऊर्जावान होता है।",
        },
        Capricorn: {
            english:
                "One who has the Sun in Capricorn will be base, interested in bad women, be greedy, will advance with mean jobs, be endowed with various deeds, be timid, devoid of relatives, fickle-minded, fond of wandering, weak, will lose everything due to conflicts with his relatives and will be a voracious eater.",
            hindi: "मकर राशि में सूर्य होने पर व्यक्ति नीच, बुरी स्त्रियों में रुचि रखने वाला, लोभी, नीच कार्यों में उन्नति करने वाला, नाना प्रकार के कर्मों से संपन्न, डरपोक, कुटुम्बियों से रहित, चंचल, भ्रमणप्रिय, दुर्बल, कुटुम्बियों से विवाद के कारण सब कुछ खो देने वाला, अधिक खाने वाला होता है।",
        },
        Aquarius: {
            english:
                "If the Sun is in Aquarius at birth, one will suffer from heart diseases, will have enormous strength (courage), be very short-tempered, be fortunate through other rasiwives, be hated by the learned, be firm in his activities, be miserable, will have little wealth, be fraudulent, be not firm in friendship, will have dirty body and be a miser.",
            hindi: "यदि जन्म के समय सूर्य कुंभ राशि में हो तो व्यक्ति हृदय रोग से पीड़ित, अत्यधिक बलवान, क्रोधी, अन्य गृहणियों के कारण सौभाग्यशाली, विद्वानों से घृणा करने वाला, अपने कार्यों में दृढ़, दुखी, अल्प धनवान, कपटी, मित्रता में दृढ़ न रहने वाला, मलिन शरीर वाला और कंजूस होगा।",
        },
        Pisces: {
            english:
                "If the Sun is in Pisces at birth, one will be friendly, will have tendency to amass, be fond of women and happy, be learned, will destroy many enemies and be wealthy and rich. He will be endowed with wife, good sons and servants, will have wealth on account of transactions via sea/river, be an eloquent speaker, but a liar, will suffer from diseases of the private parts and will have many a co-born.",
            hindi: "यदि जन्म के समय सूर्य मीन राशि में हो, तो व्यक्ति मिलनसार, संग्रह करने वाला, स्त्रियों का प्रेमी और सुखी, विद्वान, अनेक शत्रुओं का नाश करने वाला, धनवान और ऐश्वर्यवान होगा। वह स्त्री, सुपुत्र और सेवकों से युक्त होगा, समुद्र/नदी के लेन-देन से धनवान होगा, वाक्पटु होगा, किन्तु झूठा होगा, गुप्त अंगों के रोग से ग्रस्त होगा और अनेक सह-संतान होगा।",
        },
    },
    Moon: {
        Aries: {
            english:
                "Should the Moon be in Aries, the native will have a golden coloured body, will be endowed with lasting wealth, be devoid of co-born, be valorous, self-respected, auspicious, prosperous, libidinous, will have weak legs, ugly nails and little hair, be fickle-minded, will consider honour, as wealth, will possess hands and legs, like the lotus, (i.e. these will be lotus-red), will have more sons, round eyes, be friendly, be afraid of getting into watery places, like river, well etc.), will have wounds on the head and be won over by females.",
            hindi: "यदि चन्द्रमा मेष राशि में हो तो जातक सुनहरे रंग का शरीर वाला, स्थायी धन से युक्त, सहजन्य से रहित, पराक्रमी, स्वाभिमानी, शुभ, ऐश्वर्यवान, कामी, दुर्बल पैर, कुरूप नाखून और कम बाल वाला, चंचल मन वाला, मान को ही धन समझने वाला, कमल के समान हाथ-पैर वाला (अर्थात कमल के समान लाल), अधिक पुत्र वाला, गोल नेत्र वाला, मिलनसार, नदी, कुआं आदि जल वाले स्थानों में जाने से डरने वाला, सिर पर घाव वाला और स्त्रियों द्वारा वशीभूत होने वाला होता है।",
        },
        Taurus: {
            english:
                "If the Moon be in Taurus at birth, the native will be large-hearted, highly charitable, short-haired, libidinous, famous, brilliant, will have (more) daughters, will possess eyes resembling that of a bull, be in a position to differentiate between good and bad, be happy during middle and concluding parts of his life, will have strong waist, feet, shoulders, face etc., will have (some) identity on the side and back of the body, will walk beautifully and be endowed with forbearance. Should the Moon be in the first half of Taurus, the mother of the native is not long-lived. Similarly the father is short-lived, if the Moon occupies the second half of Taurus.",
            hindi: "यदि जन्म के समय चंद्रमा वृषभ राशि में हो, तो जातक उदार हृदय वाला, अत्यधिक दानशील, छोटे बालों वाला, कामुक, प्रसिद्ध, प्रतिभाशाली, (अधिक) पुत्रियों वाला, बैल के समान आँखों वाला, अच्छे-बुरे में अंतर करने वाला, जीवन के मध्य और अंतिम भाग में सुखी, कमर, पैर, कंधे, चेहरा आदि सुदृढ़, शरीर के पार्श्व और पृष्ठ भाग में विशिष्ट, सुंदर चाल वाला और सहनशील होगा। यदि चंद्रमा वृषभ राशि के पूर्वार्ध में हो, तो जातक की माता दीर्घायु नहीं होती। इसी प्रकार, यदि चंद्रमा वृषभ राशि के उत्तरार्ध में हो, तो पिता अल्पायु होता है।",
        },
        Gemini: {
            english:
                "If the Moon is in Gemini at birth, one will have prominent nose and dark eyes, will be skillful in the art of love, poetry etc., will enjoy sexual pleasures, will have lines of fish in the palm, will be fond of worldly enjoyments, will be sinewy, be very intelligent, splendourous, be endowed with happiness, jocular disposition and eloquent speech, be won over by the females, will have a long body, will befriend neuters and will have two mothers.",
            hindi: "यदि जन्म के समय चन्द्रमा मिथुन राशि में हो तो जातक उभरी हुई नाक और गहरे रंग की आंखों वाला, प्रेम, काव्य आदि कलाओं में निपुण, कामसुख भोगने वाला, हथेली में मछली जैसी रेखाएं वाला, सांसारिक भोगों का शौकीन, बलवान, बहुत बुद्धिमान, तेजस्वी, प्रसन्नता से युक्त, विनोदी स्वभाव और वाकपटुता वाला, स्त्रियों द्वारा वशीभूत, लम्बा शरीर वाला, नपुंसक कन्याओं से मित्रता रखने वाला, दो माताओं वाला होगा।",
        },
        Cancer: {
            english:
                "If the Moon is in Cancer at birth, the native will be fortunate, valorous, be endowed with residence, friends, journeys and astrological knowledge, be sensuous, grateful, be a minister, be truthful, will live abroad, be passionate, hairy-bodied, fond of water and flowers, interested in construction of rasis, wells etc. and will have a prominent neck.",
            hindi: "यदि जन्म के समय चन्द्रमा कर्क राशि में हो तो जातक भाग्यशाली, पराक्रमी, निवास, मित्र, यात्रा और ज्योतिष ज्ञान से युक्त, कामुक, कृतज्ञ, मंत्री, सत्यवादी, विदेश में रहने वाला, भावुक, रोमयुक्त, जल और पुष्पों का शौकीन, मकान, कुआं आदि बनवाने में रुचि रखने वाला और उभरी हुई गर्दन वाला होता है।",
        },
        Leo: {
            english:
                "If the Moon is in Leo, one will have sturdy bones, sparse hair, wide face, small and yellowish eyes, will hate women, will suffer from hunger and thirst, will incur stomach disorders and tooth-decay, will eat flesh, be charitable, harsh, will have few sons, will seek sexual union in forests and hills, be respectfully disposed to his mother, will have broad chest, be valorous, dutiful and will have majestic looks.",
            hindi: "यदि चन्द्रमा सिंह राशि में हो तो व्यक्ति मजबूत हड्डियों वाला, विरल बाल वाला, चौड़ा चेहरा वाला, छोटी और पीली आंखें वाला, स्त्रियों से घृणा करने वाला, भूख और प्यास से पीड़ित, पेट के रोग और दांतों में सड़न वाला, मांस खाने वाला, दानशील, कठोर, कम पुत्र वाला, जंगलों और पहाड़ों में यौन संबंध बनाने वाला, अपनी मां के प्रति आदरभाव रखने वाला, चौड़ी छाती वाला, वीर, कर्तव्यपरायण और राजसी रूप वाला होगा।",
        },
        Virgo: {
            english:
                "If the Moon occupies Virgo at birth, one will be addicted to women, will have long hands, attractive body and face, beautiful teeth, eyes and ears, be learned, be a religious preceptor (teaching Vedas etc.), be an eloquent speaker, be truthful and pure, valorous, be kind to living beings, be interested in others affairs, be of forgiving disposition, be fortunate, will have more daughters, but not many sons.",
            hindi: "यदि जन्म के समय चन्द्रमा कन्या राशि में हो तो स्त्रियों में आसक्त, लम्बे हाथ, आकर्षक शरीर और मुख, सुन्दर दांत, आंखें और कान, विद्वान, धार्मिक उपदेशक (वेद आदि पढ़ाने वाला), वाक्पटु वक्ता, सत्यवादी और शुद्ध, पराक्रमी, जीवों पर दया करने वाला, दूसरों के मामलों में रुचि रखने वाला, क्षमाशील स्वभाव वाला, सौभाग्यशाली, अधिक पुत्रियां होंगी, किन्तु अधिक पुत्र नहीं होंगे।",
        },
        Libra: {
            english:
                "If the Moon is posited in Libra at birth, the native will have elevated nose, broad eyes, will have weak (not prominent) face and emaciated body, will have many wives, many bulls (cattle) and abundant landed property, be valorous, will have testicles resembling that of an ox, be skillful in work, will honour Gods and the wise, be endowed with various kinds of wealth, will be conquered by females, will have an emaciated body (this is a repetition), will donate corns, will not be firm in disposition and will be helpful to his relatives.",
            hindi: "यदि जन्म के समय चन्द्रमा तुला राशि में हो तो जातक ऊँची नाक वाला, चौड़ी आंखें वाला, कमजोर (उभरा हुआ नहीं) चेहरा और क्षीण शरीर वाला, अनेक पत्नियां वाला, अनेक बैल (गाय) और प्रचुर भूमि वाला, वीर, बैल के समान अंडकोष वाला, कार्य में निपुण, देवताओं और बुद्धिमानों का आदर करने वाला, अनेक प्रकार के धन से संपन्न, स्त्रियों द्वारा वशीभूत, क्षीण शरीर वाला (यह एक पुनरावृत्ति है), अनाज का दान करने वाला, स्वभाव से कठोर नहीं होगा और अपने संबंधियों की सहायता करने वाला होगा।",
        },
        Scorpio: {
            english:
                "Should the Moon be in Scorpio at birth, one will be a miser, will have round (well grown) thighs, coarse physique and nose, will be cruel in acts, be a thief, be sick in childhood, will have spoiled chin and nails, but beautiful eyes, will be plentiful, industrious, skillful, fond of others rasiwives, devoid of relatives, insane (or infatuated with passion), valorous, will lose wealth due to royal wrath and will have a big abdomen and a big head.",
            hindi: "यदि जन्म के समय चन्द्रमा वृश्चिक राशि में हो तो व्यक्ति कंजूस, गोल जांघों वाला, स्थूल शरीर और नाक वाला, क्रूर कर्म करने वाला, चोर, बचपन में बीमार, ठोड़ी और नाखून खराब, किन्तु सुन्दर नेत्र वाला, धनवान, परिश्रमी, कुशल, परस्त्रीगामी, कुटुम्बी, विक्षिप्त, पागल, पराक्रमी, राजकोप से धनहीन, बड़ा पेट और बड़ा सिर वाला होता है।",
        },
        Sagittarius: {
            english:
                "If the Moon is in Sagittarius at birth, the native will be dwarfish, will have round eyes, big heart, waist and hands, be a good speaker, will have prominent shoulders and neck, will live near watery zone, will have knowledge of arts and secret affairs, be courageous, will possess strong bones, be very strong, will have strong neck and lips, be attached to his relatives, be grateful and distinguished. His legs will not be wider, when in position.",
            hindi: "यदि जन्म के समय चन्द्रमा धनु राशि में हो, तो जातक बौना, गोल आँखें, बड़ा हृदय, कमर और हाथ वाला, अच्छा वक्ता, उभरे हुए कंधे और गर्दन वाला, जलक्षेत्र के निकट रहने वाला, कला और गुप्त मामलों का जानकार, साहसी, मजबूत हड्डियों वाला, बहुत बलवान, मजबूत गर्दन और होंठ वाला, अपने रिश्तेदारों से लगाव रखने वाला, कृतज्ञ और प्रतिष्ठित होगा। पद पर रहते हुए उसके पैर अधिक चौड़े नहीं होंगे।",
        },
        Capricorn: {
            english:
                "If the Moon at birth be in Capricorn, the native will be a singer, will be averse to cold articles (or season), will have stout body, will be fond of truth and charity, be distinguished, famous, less irascible, be libidinous, unkind and shameless; will possess beautiful eyes and emaciated body, will violate teachers bed, be a poet, will have round thighs, be not very enthusiastic, be very miserly and will have long neck and ears.",
            hindi: "यदि जन्म के समय चन्द्रमा मकर राशि में हो तो जातक गायक, ठण्डे पदार्थों से विमुख, गठीला शरीर, सत्य और दानप्रिय, प्रतिष्ठित, प्रसिद्ध, कम क्रोधी, कामी, निर्दयी और निर्लज्ज होगा; सुन्दर नेत्र और क्षीण शरीर वाला, गुरु के शयन में पाप करने वाला, कवि, गोल जांघ वाला, कम उत्साही, कंजूस, लम्बी गर्दन और कान वाला होगा।",
        },
        Aquarius: {
            english:
                "If the Moon is in Aquarius at birth, the person will have elevated nose, rough, or uneven body and stout hands and legs, will be addicted to intoxicants, will be averse to the virtuous, be not himself virtuous, will obtain illegal sons, will have stout head, ugly/diseased eyes, bright face and prominent waist, be an artisan, will have bad mentality, be miserable and will be very poor.",
            hindi: "यदि जन्म के समय चन्द्रमा कुंभ राशि में हो तो जातक ऊँची नाक वाला, रूखा या असमान शरीर वाला, हाथ-पैर मोटे, नशे का आदी, पुण्य से विमुख, स्वयं गुणी न होने वाला, अवैध पुत्र वाला, मोटा सिर, कुरूप/रोगी आंखें, चमकीला चेहरा और उभरी हुई कमर वाला, कारीगर, दुष्ट मानसिकता वाला, दुखी और बहुत गरीब होगा।",
        },
        Pisces: {
            english:
                "If the Moon is in Pisces, the native will be expert in fine arts, be capable of winning even unfavourable people, be learned in Shastras, beautiful bodied, proficient in music, very religious, will cohabit with many women, be a polite speaker, will serve the king, be somewhat irascible, will have a big head, be endowed with happiness and wealth, will be won over by the fair sex, be virtuous, be interested in sailing and be liberal.",
            hindi: "यदि चन्द्रमा मीन राशि में हो तो जातक ललित कलाओं में निपुण, प्रतिकूल व्यक्तियों को भी जीतने में सक्षम, शास्त्रों का ज्ञाता, सुन्दर शरीर वाला, संगीत में निपुण, बहुत धार्मिक, अनेक स्त्रियों के साथ सहवास करने वाला, विनम्र वक्ता, राजा की सेवा करने वाला, कुछ हद तक चिड़चिड़ा, बड़ा सिर वाला, सुख और धन से संपन्न, स्त्रियों द्वारा वशीभूत, गुणवान, नौकायन में रुचि रखने वाला और उदार होगा।",
        },
    },
    Mars: {
        Aries: {
            english:
                "If Mars at birth occupies Aries, the native will be splendourous, truthful, valorous, be a king, be fond of war, interested in adventurous acts, be an Army chief, or head of a village, or a band; be delighted, charitable be endowed with a number of cows, goats etc. and grains, be fierce and will join many women.",
            hindi: "यदि जन्म के समय मंगल मेष राशि में हो तो जातक तेजस्वी, सत्यवादी, पराक्रमी, राजा, युद्ध प्रिय, साहसिक कार्यों में रुचि रखने वाला, सेनापति, ग्राम या दल का मुखिया, प्रसन्नचित्त, दानशील, अनेक गाय, बकरी आदि तथा अन्न से संपन्न, उग्र स्वभाव वाला तथा अनेक स्त्रियों से युक्त होगा।",
        },
        Taurus: {
            english:
                "If Mars is in Taurus in a nativity, the person will break the vows of chaste women, will eat voraciously, will have little wealth and few sons, be jealous, will maintain many people, will not trust others, will play violently, will speak very harshly, be fond of music, be sinful, be inimical to relatives and will bring infamy to his family.",
            hindi: "यदि जन्म कुंडली में मंगल वृषभ राशि में हो तो जातक पतिव्रता स्त्रियों के व्रत को तोड़ने वाला, अत्यधिक भोजन करने वाला, अल्प धन और अल्प पुत्र वाला, ईर्ष्यालु, बहुत से लोगों का पालन करने वाला, दूसरों पर विश्वास न करने वाला, हिंसात्मक खेल खेलने वाला, बहुत कठोर बोलने वाला, संगीत का शौकीन, पापी, संबंधियों से द्वेष रखने वाला तथा अपने कुल को बदनाम करने वाला होता है।",
        },
        Gemini: {
            english:
                "Should Mars be in Gemini, the native will be splendourous, be capable of enduring miseries, be very learned, be well versed with poetical rules, skillful in various kinds of fine arts, fond of going to foreign countries, virtuously disposed, highly intelligent, favourably disposed to his sons and friends and will devote to various kinds of assignments.",
            hindi: "यदि मंगल मिथुन राशि में हो तो जातक वैभवशाली, कष्टों को सहन करने वाला, बहुत विद्वान, काव्यशास्त्र का ज्ञाता, विभिन्न प्रकार की ललित कलाओं में निपुण, विदेश जाने का शौकीन, सदाचारी, अत्यंत बुद्धिमान, अपने पुत्रों और मित्रों के प्रति अनुकूल स्वभाव वाला तथा विभिन्न प्रकार के कार्यों में तत्पर रहने वाला होता है।",
        },
        Cancer: {
            english:
                "If Mars is in Cancer at birth, the subject will like living in others rasis, be deformed, sick, will attain riches through agriculture, will enjoy royal food and robes during childhood, will eat food in others rasis, will become wealthy through the source of water, be repeatedly anguished and be always distressed.",
            hindi: "यदि जन्म के समय मंगल कर्क राशि में हो तो जातक दूसरों के घर में रहना पसंद करेगा, विकृत, रोगी, कृषि से धनवान, बाल्यकाल में राजसी भोजन व वस्त्र भोगने वाला, दूसरों के घर में भोजन करने वाला, जल के स्रोत से धनवान, बार-बार दुःखी व सदैव व्यथित रहने वाला होगा।",
        },
        Leo: {
            english:
                "If Mars is in Leo in a nativity, the native will be impatient, be valorous, intent upon grabbing others money and children, will like to live in forests, be fond of eating cows flesh (or beef etc.), will lose his first wife, will kill snakes and animals, will be bereft of children, be devoid of charitable acts and be always active in his jobs.",
            hindi: "यदि जन्म कुंडली में मंगल सिंह राशि में हो तो जातक अधीर, पराक्रमी, दूसरों का धन व संतान हड़पने का इच्छुक, जंगलों में रहना पसंद करने वाला, गाय का मांस (या गौमांस आदि) खाने का शौकीन, अपनी पहली पत्नी को खो देने वाला, सांपों व अन्य जानवरों को मारने वाला, संतानहीन, दान-पुण्य से विमुख तथा अपने कार्यों में सदैव सक्रिय रहने वाला होगा।",
        },
        Virgo: {
            english:
                "Should Mars occupy Virgo at birth, the subject will be worthy of honour, be never rich, be very fond of sexual union and music, be soft and sweet spoken, will have various kinds of expenses, be not much valorous, be learned, will have ribs in their advanced position, will fear enemies very much, be skillful in Shastras and fine arts, be fond of bathing, make-up etc. and be splendourous.",
            hindi: "यदि जन्म के समय कन्या राशि में मंगल हो तो जातक सम्मान का पात्र होगा, कभी धनी नहीं होगा, मैथुन और संगीत का शौकीन होगा, मृदुभाषी और मधुरभाषी होगा, अनेक प्रकार के व्यय करने वाला होगा, कम वीर होगा, विद्वान होगा, पसलियां उन्नत अवस्था में होंगी, शत्रुओं से बहुत डरेगा, शास्त्रों और ललित कलाओं में निपुण होगा, स्नान, श्रृंगार आदि का शौकीन होगा और वैभवशाली होगा।",
        },
        Libra: {
            english:
                "If Mars occupies Libra in a nativity, the person will be liable to wandering, will indulge in bad business, be an able speaker, be fortunate, deformed in respect of some limb, will have few relatives, be fond of wars, will lose his first wife, will deal in liquors and will earn through prostitutes to only lose.",
            hindi: "यदि जन्म कुंडली में मंगल तुला राशि में हो तो जातक भ्रमणशील, बुरे व्यापार में लिप्त, कुशल वक्ता, भाग्यवान, किसी अंग से विकृत, कम रिश्तेदार, युद्ध प्रिय, पहली पत्नी को खोने वाला, शराब का व्यापार करने वाला तथा वेश्याओं से धन कमाने वाला होता है।",
        },
        Scorpio: {
            english:
                "If Mars occupies Scorpio at birth, the native will be attached to trade, will be interested in Vedic knowledge, be leader of thieves, skillful in his duties, be interested in wars, be highly sinful, will do big crimes, will be perfidious towards his enemies, will betray, be disposed towards killing, be unhelpful, be a talebearer, will be endowed with lands, sons and wife and be troubled by poison, fire, weapons and wounds.",
            hindi: "यदि जन्म के समय मंगल वृश्चिक राशि में हो तो जातक व्यापार में रुचि रखने वाला, वैदिक ज्ञान में रुचि रखने वाला, चोरों का नेता, अपने कर्तव्यों में निपुण, युद्धों में रुचि रखने वाला, अत्यधिक पापी, बड़े अपराध करने वाला, शत्रुओं के प्रति विश्वासघाती, विश्वासघाती, हत्या करने वाला, सहायता न करने वाला, चुगलखोर, भूमि, पुत्र और पत्नी से संपन्न होगा तथा विष, अग्नि, शस्त्र और घावों से परेशान रहेगा।",
        },
        Sagittarius: {
            english:
                "Should Mars be in Sagittarius, the native will have many wounds, be emaciated, be harsh in speech, crafty, alienated, be a warrior endowed with chariots, elephants and Army men, will pass arrows on others Army from his chariot, be happy with hard work, will lose his happiness and money due to anger and will not honour elders.",
            hindi: "यदि मंगल धनु राशि में हो तो जातक अनेक घावों वाला, दुर्बल, वाणी में कठोर, धूर्त, विमुख, रथ, हाथी और सेना से युक्त योद्धा, अपने रथ से दूसरों की सेना पर बाण चलाने वाला, परिश्रम से प्रसन्न, क्रोध के कारण सुख और धन को खोने वाला, बड़ों का आदर न करने वाला होता है।",
        },
        Capricorn: {
            english:
                "If Mars is posited in Capricorn at birth, one will be wealthy (fortunate), be endowed with happiness and pleasures, be wealthy, will have an excellent disposition, be famous, be an Army chief, or a king, will possess a good wife, be successful in war, will live in his own country, be independent, be a protector, be virtuous and will be interested in various procedures.",
            hindi: "जन्म के समय यदि मंगल मकर राशि में स्थित हो तो जातक धनवान (भाग्यशाली), सुख-सुविधाओं से युक्त, धनवान, उत्तम स्वभाव वाला, प्रसिद्ध, सेनापति या राजा होगा, अच्छी पत्नी वाला, युद्ध में सफल, अपने देश में रहने वाला, स्वतंत्र, रक्षक, गुणवान और विविध क्रियाकलापों में रुचि रखने वाला होगा।",
        },
        Aquarius: {
            english:
                "If Mars is posited in Aquarius at the time of ones birth, he will be devoid of both affection and purity, will look like an old person, will die a bad death, will have spite, jealousy, untruthful disposition, afflicted speech and lost wealth, will be ugly, will have (abundant) hair on the body, will lose money in gambling, will be unsightly, will have miserable profession, be fond of liquor and be unfortunate.",
            hindi: "यदि जन्म के समय मंगल कुंभ राशि में स्थित हो तो वह स्नेह और पवित्रता से रहित, वृद्ध जैसा दिखने वाला, बुरी मृत्यु वाला, द्वेषी, ईर्ष्यालु, असत्य स्वभाव वाला, वाणी से पीड़ित और धन से वंचित, कुरूप, शरीर पर बहुत अधिक बाल वाला, जुए में धन हारने वाला, कुरूप, दयनीय व्यवसाय वाला, शराब का शौकीन और दुर्भाग्यशाली होगा।",
        },
        Pisces: {
            english:
                "Should Mars be in Pisces at the time of ones birth, the person will be troubled by diseases, will have indifferent children, will live in foreign countries, be insulted by his own relatives, will lose all his wealth by his cunning and cheating disposition, will be depressed in spirits, be very miserable, will disrespect elders and Brahmins, be unkind, will conceive (others) desires, be fond of praises and be famous.",
            hindi: "यदि जन्म के समय मंगल मीन राशि में हो तो जातक रोगग्रस्त, उदासीन संतान वाला, विदेश में रहने वाला, अपने ही सगे-संबंधियों से अपमानित, धूर्तता और कपट के कारण अपनी सारी संपत्ति गँवाने वाला, निराश, अत्यंत दुखी, वृद्धों और ब्राह्मणों का अनादर करने वाला, निर्दयी, दूसरों की इच्छाओं को पूरा करने वाला, प्रशंसा का शौकीन और प्रसिद्ध होगा।",
        },
    },
    Mercury: {
        Aries: {
            english:
                "If Mercury is in Aries at the time of ones birth, the native will be fond of battles (be uncompromising), be very learned, wicked, emaciated, interested in music and dance, be untruthful, be attached to sexual pleasures, be a writer, will produce fictitious things, will eat much, will lose hard-earned money, will incur debts and imprisonment frequently and will be sometimes fickle minded and yet sometimes firm in disposition.",
            hindi: "यदि जन्म के समय बुध मेष राशि में हो तो जातक युद्ध प्रिय (समझौता न करने वाला), बहुत विद्वान, दुष्ट, कृश, संगीत और नृत्य में रुचि रखने वाला, असत्य बोलने वाला, यौन सुखों में आसक्त, लेखक, काल्पनिक वस्तुएं बनाने वाला, अधिक खाने वाला, मेहनत से कमाया धन गँवाने वाला, बार-बार कर्ज लेने वाला और कारावास का भागी होगा, कभी चंचल मन वाला और कभी दृढ़ स्वभाव वाला होगा।",
        },
        Taurus: {
            english:
                "Should Mercury be in Taurus, the native will be skillful, eminently liberal, be famous, will have knowledge of Vedas and Sastras, be fond of exercises, robes, ornaments and garlands, be firm in disposition, will have sincerely earned wealth, will possess a chaste wife, will be a soft and sweet speaker and be after sexual satisfaction.",
            hindi: "यदि बुध वृषभ राशि में हो तो जातक कुशल, अत्यंत उदार, प्रसिद्ध, वेद-शास्त्रों का ज्ञाता, व्यायाम, वस्त्र, आभूषण और मालाओं का शौकीन, दृढ़ स्वभाव वाला, ईमानदारी से कमाया हुआ धन, पतिव्रता पत्नी, मधुर और मधुर वक्ता तथा यौन संतुष्टि चाहने वाला होता है।",
        },
        Gemini: {
            english:
                "If Mercury occupies Gemini at birth, the subject will have an auspicious appearance, will speak sweetly, be very affluent, be an able speaker, be honourable, will give up his happiness, will cohabit less, will have two wives, be fond of arguments, will be learned in Vedas, Sastras etc., be a poet, be independent, dear, very munificent, proficient in work and will have many sons and friends.",
            hindi: "जन्म के समय बुध मिथुन राशि में हो तो जातक शुभ स्वरूप वाला, मधुरभाषी, धनवान, कुशल वक्ता, सम्माननीय, सुख त्यागने वाला, कम सहवास करने वाला, दो पत्नियां वाला, तर्क-वितर्क में रुचि रखने वाला, वेद, शास्त्र आदि का ज्ञाता, कवि, स्वतंत्र, प्रिय, दानशील, कार्यकुशल, बहुत पुत्र और मित्रों वाला होता है।",
        },
        Cancer: {
            english:
                "One born with Mercury in Cancer will be learned, will be fond of living in other countries, be interested in cohabiting with women and also in music, be fickle-minded, prattling, inimical to his own relatives, will be fond of arguments, will lose wealth on account of enmity with women, be of bad disposition, be interested in many jobs, be a good poet and will be popular on account of the fame of his ancestors.",
            hindi: "कर्क राशि में बुध के साथ जन्म लेने वाला व्यक्ति विद्वान, दूसरे देशों में रहने का शौकीन, स्त्रियों के साथ सहवास करने तथा संगीत में रुचि रखने वाला, चंचल, बकवादी, अपने ही रिश्तेदारों से द्वेष रखने वाला, वाद-विवाद का शौकीन, स्त्रियों से द्वेष के कारण धन की हानि करने वाला, दुष्ट स्वभाव वाला, अनेक कार्यों में रुचि रखने वाला, अच्छा कवि तथा अपने पूर्वजों की प्रसिद्धि के कारण लोकप्रिय होगा।",
        },
        Leo: {
            english:
                "Should the planet Mercury occupy Leo at ones birth, the native will not possess even bit of wisdom (Kala \\\\u2013 bit, hence Gnanakala interpreted thus), be famous in the world, be not truthful, will possess a weak memory, be wealthy, be not strong, will indulge in fratricide, be unfortunate in respect of wife, be independent, mean in conduct, be a servant, be devoid of children, be against his own race, but be favourable to others.",
            hindi: "यदि जन्म के समय बुध ग्रह सिंह राशि में हो, तो जातक में बुद्धि की थोड़ी भी कमी होगी (कला = थोड़ा, इसलिए ज्ञानकला की व्याख्या इस प्रकार की गई है), दुनिया में प्रसिद्ध होगा, सत्यवादी नहीं होगा, कमजोर स्मृति वाला होगा, धनवान होगा, बलवान नहीं होगा, भ्रातृहत्या में लिप्त होगा, पत्नी के संबंध में दुर्भाग्यशाली होगा, स्वतंत्र होगा, आचरण में नीच होगा, नौकर होगा, संतानहीन होगा, अपनी जाति के विरुद्ध होगा, लेकिन दूसरों के लिए अनुकूल होगा।",
        },
        Virgo: {
            english:
                "If Mercury occupies his exaltation Sign at the time of ones birth, the native will be quite virtuous, eloquent, skillful, will have knowledge of writing (be an exponent) and poetry, be learned in fine/mechanical arts, be sweet in disposition, be liked by women, be not much virile, be the eldest son of family, be honoured by virtuous, be disposed to serve others, modest, argumentative, famous, charitable and strong.",
            hindi: "यदि जन्म के समय बुध अपनी उच्च राशि में हो तो जातक गुणवान, वाक्पटु, कुशल, लेखन (प्रतिपादक) और काव्य का ज्ञान रखने वाला, ललित/यांत्रिक कलाओं में पारंगत, स्वभाव से मधुर, स्त्रियों द्वारा प्रिय, कम पुरुषार्थी, कुल में सबसे बड़ा पुत्र, गुणवानों द्वारा सम्मानित, दूसरों की सेवा करने वाला, विनम्र, तर्कशील, प्रसिद्ध, दानशील और बलवान होगा।",
        },
        Libra: {
            english:
                "If Mercury falls in Libra at the time of ones birth, the native will possess knowledge of arts, be intent upon arguments, be an able speaker, will spend money lavishly, will have business in various directions, will honour wise men, guests, Gods and preceptors (elders), be skillful in pretending to serve others, be amiable, devoted to Gods, fraudulent, fickle-minded and sometimes short-tempered and yet sometimes (notably) peaceful.",
            hindi: "यदि जन्म के समय बुध तुला राशि में हो तो जातक कलाओं का ज्ञान रखने वाला, तर्क-वितर्क करने वाला, कुशल वक्ता, धन का अत्यधिक व्यय करने वाला, विभिन्न दिशाओं में व्यापार करने वाला, बुद्धिमान व्यक्तियों, अतिथियों, देवताओं और गुरुजनों का आदर करने वाला, दूसरों की सेवा करने का दिखावा करने में कुशल, मिलनसार, देवताओं के प्रति समर्पित, धोखेबाज, चंचल, कभी-कभी क्रोधी तथा कभी-कभी (विशेष रूप से) शांत स्वभाव का होगा।",
        },
        Scorpio: {
            english:
                "If Mercury is posited in Scorpio, one will experience troubles, grief and evils, will hate the virtuous, will be devoid of truth, religion and shame, be a dunce, be not virtuous, be a miser, will cohabit with wicked women, be fond of giving cruel punishments, be not out spoken, be interested in blameworthy jobs, will incur debts, will join base men and will steel others properties.",
            hindi: "वृश्चिक राशि में बुध होने पर जातक कष्ट, शोक और बुराइयों का अनुभव करेगा, सज्जनों से घृणा करेगा, सत्य, धर्म और लज्जा से रहित होगा, मूर्ख होगा, सदाचारी नहीं होगा, कंजूस होगा, दुष्ट स्त्रियों के साथ सहवास करेगा, क्रूर दंड देने का शौकीन होगा, कम बोलने वाला होगा, निन्दनीय कार्यों में रुचि रखने वाला होगा, कर्जदार होगा, नीच लोगों से संबंध रखेगा और दूसरों की संपत्ति हड़पने वाला होगा।",
        },
        Sagittarius: {
            english:
                "Should Mercury be in Sagittarius, the native will be famous, liberal, will have knowledge of Vedas and Sastras, be valorous, will practice abstract meditation, be a minister, or family priest, be chief among his race-men, will be very rich, be interested in performing Yajnas and teaching (Vedas etc.), be a skillful speaker, be charitable and be an expert in writing and fine arts.",
            hindi: "यदि बुध धनु राशि में हो तो जातक प्रसिद्ध, उदार, वेद-शास्त्रों का ज्ञाता, पराक्रमी, ध्यान करने वाला, मंत्री या कुल पुरोहित, अपने कुल के लोगों में प्रधान, बहुत धनवान, यज्ञ करने और वेद आदि पढ़ाने में रुचि रखने वाला, कुशल वक्ता, दानशील और लेखन व ललित कलाओं में निपुण होता है।",
        },
        Capricorn: {
            english:
                "If Mercury is in Capricorn at birth, the native will be mean, dull, impotent, will do others work, be devoid of virtues, be subjected to various kinds of miseries, will dream, wander etc., be a tale bearer, be untruthful, devoid of relatives, dirty and timid.",
            hindi: "यदि जन्म के समय बुध मकर राशि में हो तो जातक नीच, मंदबुद्धि, नपुंसक, दूसरों का काम करने वाला, गुणों से रहित, अनेक प्रकार के दुखों से ग्रस्त, स्वप्न देखने वाला, भटकने वाला, चुगलखोर, झूठ बोलने वाला, संबंधियों से रहित, गंदा एवं डरपोक होता है।",
        },
        Aquarius: {
            english:
                "Should Mercury be in Aquarius at birth, the subject will be bereft of good disposition and good deeds, be attached to many religious acts, will give up doing worthy things, be insulted by others, be impure, be not virtuous, be very wicked, be inimical to wife, be devoid of carnal pleasures, be very unfortunate, very timid, impotent, dirty and modest.",
            hindi: "यदि जन्म के समय बुध कुंभ राशि में हो तो जातक अच्छे स्वभाव और अच्छे कर्मों से रहित, अनेक धार्मिक कार्यों में संलग्न, योग्य कार्य करने से विमुख, दूसरों द्वारा अपमानित, अशुद्ध, गुणहीन, बहुत दुष्ट, पत्नी से द्वेष रखने वाला, शारीरिक सुखों से रहित, बहुत दुर्भाग्यशाली, बहुत डरपोक, नपुंसक, गंदा और लज्जाशील होगा।",
        },
        Pisces: {
            english:
                "Should Mercury be in Pisces, one will be fond of good conduct and purity, will live in foreign countries, be issueless, poor, will have a chaste wife, be virtuous, fortunate, be devoid of religion, be skillful in stitching etc. and be devoid of profane knowledge, acquaintance with Sastras and fine arts, will be proficient in bagging others wealth and will be devoid of wealth.",
            hindi: "मीन राशि में बुध हो तो जातक सदाचारी और पवित्रता का शौकीन, परदेश में रहने वाला, निःसंतान, दरिद्र, पतिव्रता स्त्री वाला, गुणवान, भाग्यवान, धर्म से विमुख, सिलाई आदि में निपुण, अधार्मिक विद्या से विहीन, शास्त्रों और ललित कलाओं से विहीन, दूसरों का धन हड़पने में कुशल और धन से विहीन होता है।",
        },
    },
    Jupiter: {
        Aries: {
            english:
                "If Jupiter is posited in Aries at birth, one will be argumentative in disposition, will acquire precious stones and ornaments out of his efforts, will be endowed with strength, sons and wealth, will have eminent and famous profession, be splendourous, will have many enemies, much expenses and an injured body and will confer fierce and cruel punishments.",
            hindi: "यदि जन्म के समय बृहस्पति मेष राशि में स्थित हो तो जातक तर्कशील स्वभाव का होगा, अपने प्रयासों से बहुमूल्य रत्न और आभूषण प्राप्त करेगा, बल, पुत्र और धन से संपन्न होगा, प्रतिष्ठित और प्रसिद्ध व्यवसाय वाला होगा, वैभवशाली होगा, अनेक शत्रु होंगे, अधिक व्यय होगा, शरीर घायल होगा तथा भयंकर और क्रूर दंड देने वाला होगा।",
        },
        Taurus: {
            english:
                "Should Jupiter be in Taurus, one will be endowed with a broad body, be corpulent, will honour Brahmins and Gods, be splendourous, fortunate, attached to his wife, be endowed with good appearance, profession, cows and abundant wealth; will possess good articles and ornaments, be distinguished in speech, intelligence and skill; will have political / judicial wisdom, be modest, be endowed with medical accomplishments and be skillful in experiments.",
            hindi: "यदि बृहस्पति वृषभ राशि में हो तो व्यक्ति चौड़ा शरीर वाला, स्थूल शरीर वाला, ब्राह्मणों और देवताओं का आदर करने वाला, तेजस्वी, भाग्यशाली, पत्नी से लगाव रखने वाला, सुन्दर रूप, व्यवसाय, गाय और प्रचुर धन वाला, सुन्दर वस्तुओं और आभूषणों से युक्त, वाणी, बुद्धि और कौशल में श्रेष्ठ, राजनीतिक/न्यायिक बुद्धि वाला, विनम्र, चिकित्सा संबंधी सिद्धि वाला और प्रयोगों में निपुण होता है।",
        },
        Gemini: {
            english:
                "Should Jupiter be in Gemini, the native will be affluent, scholarly, proficient, will possess attractive eyes, be eloquent, courteous, skillful, virtuous, will honour elders and relatives, will be able to utter \\\\u201cbejeweled\\\\u201d words (be literally rich in words), which are benevolent in nature, be devoted to his duties and be a good poet.",
            hindi: "यदि बृहस्पति मिथुन राशि में हो तो जातक धनवान, विद्वान, कुशल, आकर्षक नेत्रों वाला, वाक्पटु, विनम्र, कुशल, गुणवान, बड़ों और संबंधियों का सम्मान करने वाला, रत्नजटित वचन बोलने वाला, परोपकारी, अपने कर्तव्यों के प्रति समर्पित और अच्छा कवि होगा।",
        },
        Cancer: {
            english:
                "If Jupiter be in Cancer at birth, the native will be a scholar, be beautiful, be highly learned, charitable, good-natured, be very strong, be famous, will possess abundant grains and riches, be endowed with truth and penance, will have long-living sons, be honoured by all, will be a king, will have a distinguished profession and will be attached to his friends.",
            hindi: "यदि जन्म के समय बृहस्पति कर्क राशि में हो तो जातक विद्वान, सुन्दर, उच्च कोटि का विद्वान, दानशील, अच्छे स्वभाव वाला, बलवान, प्रसिद्ध, प्रचुर मात्रा में अन्न और धन से युक्त, सत्य और तप से युक्त, दीर्घायु पुत्र वाला, सभी से सम्मानित, राजा, प्रतिष्ठित व्यवसाय वाला और मित्रों से स्नेह रखने वाला होगा।",
        },
        Leo: {
            english:
                "Should Jupiter be in Leo at the time of birth, the native will be lastingly inimical, be strong, courageous, will show abundant friendship, be learned, rich, will have eminent relatives, be a king, will have heroism akin to that of a king, will be recognizable in an assembly, will destroy the entire band of his enemies, will possess a strong physique and will live in hills, fortresses, forests and temples.",
            hindi: "यदि जन्म के समय बृहस्पति सिंह राशि में हो तो जातक स्थायी शत्रु, बलवान, साहसी, प्रचुर मित्रता वाला, विद्वान, धनवान, प्रतिष्ठित संबंधियों वाला, राजा होगा, राजा के समान वीरता वाला, सभा में प्रतिष्ठित, अपने शत्रुओं के सम्पूर्ण समूह का नाश करने वाला, बलवान शरीर वाला, पहाड़ियों, किलों, जंगलों और मंदिरों में रहने वाला होगा।",
        },
        Virgo: {
            english:
                "If Jupiter occupies Virgo at birth, one will be a scholar, be virtuous, be skillful in his work, be fond of scents, robes and flowers, will firmly gain in undertakings, will have rich experience in Sastras and fine arts, be affluent, charitable, pure-hearted, skillful and wonderfully learned.",
            hindi: "यदि जन्म के समय बृहस्पति कन्या राशि में हो तो व्यक्ति विद्वान, गुणवान, अपने कार्य में निपुण, सुगंध, वस्त्र और पुष्प का शौकीन, कार्यों में दृढ़ता से सफल, शास्त्रों और ललित कलाओं का समृद्ध अनुभव, धनवान, दानशील, शुद्ध हृदय वाला, कुशल और अद्भुत विद्वान होता है।",
        },
        Libra: {
            english:
                "If Jupiter occupies Libra at birth, one will be a scholar, will have many sons, be endowed with foreign assignments, will be very affluent, interested in ornaments, modest, will earn money through dance and drama, be pleasing in appearance, be splendourous, learned in Sastras, be superior among his colleague-businessmen, will honour Gods and guests and be very learned.",
            hindi: "यदि जन्म के समय बृहस्पति तुला राशि में हो तो जातक विद्वान, अनेक पुत्रों वाला, विदेश में नौकरी करने वाला, बहुत धनवान, आभूषणों में रुचि रखने वाला, विनम्र, नृत्य और नाटक से धन कमाने वाला, देखने में सुंदर, तेजस्वी, शास्त्रों का ज्ञाता, अपने साथी व्यापारियों में श्रेष्ठ, देवताओं और अतिथियों का आदर करने वाला और बहुत विद्वान होता है।",
        },
        Scorpio: {
            english:
                "Should Jupiter at the time of ones birth be in Scorpio, he will be expert in Sastras, be a king, will be a commentator of many Bhasyas (a commentary, which explains Sutras word by word with comments of its own, for example, on Vedas), be skillful, will construct temples and towns, will have many wives, but few sons, be troubled by diseases, will undergo many difficulties, be very fierce, be ostentatious in his performance, be virtuous and will indulge in contemptuous acts.",
            hindi: "यदि जन्म के समय बृहस्पति वृश्चिक राशि में हो तो वह शास्त्रों का ज्ञाता, राजा, अनेक भाष्यों का भाष्यकार, कुशल, मंदिर और नगर बनवाने वाला, अनेक पत्नियां रखने वाला, किन्तु पुत्र कम होने वाला, रोगों से ग्रस्त, अनेक कष्टों से गुजरने वाला, अत्यन्त उग्र, दिखावटी, गुणवान, तथा घृणित कार्यों में लिप्त रहने वाला होगा।",
        },
        Sagittarius: {
            english:
                "If Jupiter occupies Sagittarius at birth, one will be a preceptor, will conduct religious vows, initiations, sacrifices etc., will have lasting wealth, be charitable, be friendly to his own men, be fond of helping others, interested in Shastras, be the head of a zone, or a minister, will live in many countries, will prefer loneliness and be interested in visiting shrines.",
            hindi: "यदि जन्म के समय बृहस्पति धनु राशि में हो तो व्यक्ति गुरु होगा, धार्मिक व्रत, दीक्षा, यज्ञ आदि का संचालन करेगा, स्थायी धनवान होगा, दानशील होगा, अपने लोगों से मित्रता रखेगा, दूसरों की सहायता करने का शौकीन होगा, शास्त्रों में रुचि रखेगा, किसी क्षेत्र का प्रमुख या मंत्री होगा, कई देशों में रहेगा, एकांत पसंद करेगा और तीर्थ स्थलों पर जाने में रुचि रखेगा।",
        },
        Capricorn: {
            english:
                "Jupiter in Capricorn denotes, that the native will be less virile, will experience much grief and difficulties, will be mean in conduct, be a dunce, will meet a bad end, will suffer from penury, will serve others, will be bereft of auspiciousness, mercy, purity, affection to his relatives and of religion, will have an emaciated body, be timid, interested in living in other countries and be depressed of spirits.",
            hindi: "मकर राशि में बृहस्पति का होना यह दर्शाता है कि जातक में पुरुषत्व की कमी होगी, वह बहुत दुःख और कठिनाइयों का अनुभव करेगा, आचरण में नीच होगा, मूर्ख होगा, बुरे अंत को प्राप्त होगा, दरिद्रता से ग्रस्त होगा, दूसरों की सेवा नहीं करेगा, शुभता, दया, पवित्रता, अपने रिश्तेदारों और धर्म के प्रति स्नेह से रहित होगा, शरीर दुर्बल होगा, डरपोक होगा, दूसरे देशों में रहने में रुचि रखेगा और मन से निराश होगा।",
        },
        Aquarius: {
            english:
                "If Jupiter falls in Aquarius at the time of birth, one will be a tale-bearer, be ill disposed, interested in evil jobs, be chief among his racemen, be always attached to base men, be malicious, miserly, will suffer from diseases, will lose wealth on account his own utterances, be devoid of intelligence and virtues and will violate elders beds.",
            hindi: "यदि जन्म के समय बृहस्पति कुंभ राशि में हो तो जातक चुगलखोर, दुष्ट स्वभाव वाला, बुरे कार्यों में रुचि रखने वाला, अपने कुल में प्रधान, नीच व्यक्तियों से सदैव जुड़ा रहने वाला, द्वेषी, कंजूस, रोगों से ग्रस्त, अपने ही कथनों के कारण धन की हानि करने वाला, बुद्धि और गुणों से रहित तथा बड़ों के शयन का अपमान करने वाला होता है।",
        },
        Pisces: {
            english:
                "If Jupiter is in Pisces at birth, one will be expert in knowing the meanings of Vedas and other Shastras, will be honoured by friends and virtuous people, will be a headsman in the kings employ, be praiseworthy, unconquerable, rich, devoid of fear, be proud, firm in undertakings, be a king, be skillful in policies, training, behavior and war tactics, be famous and will be calm in his doings.",
            hindi: "यदि जन्म के समय बृहस्पति मीन राशि में हो तो वह वेदों और शास्त्रों के अर्थों को जानने में निपुण, मित्रों और गुणवान लोगों द्वारा सम्मानित, राजाओं के सेवकों में मुखिया, प्रशंसनीय, अजेय, धनवान, भय से रहित, स्वाभिमानी, अपने कार्यों में दृढ़, राजा, नीति, प्रशिक्षण, व्यवहार और युद्धनीति में निपुण, प्रसिद्ध और अपने कार्यों में शांत होगा।",
        },
    },
    Venus: {
        Aries: {
            english:
                "Should Venus be in Aries at birth, one will be night-blind, will have many blemishes, be inimical, will join other rasiwives, will visit whores, will move in forests and hills, will be imprisoned on account of women, be base, hard in disposition, be an Army chief, or chief of men, be not reliable and be eminent.",
            hindi: "यदि जन्म के समय शुक्र मेष राशि में हो तो जातक रतौंधी, अनेक दोषों से युक्त, शत्रुवत, परस्त्रीगामी, वेश्याओं के पास जाने वाला, वनों और पर्वतों में विचरण करने वाला, स्त्रियों के कारण कारावास में जाने वाला, नीच, कठोर स्वभाव वाला, सेनापति या पुरुषों का प्रधान, अविश्वसनीय और प्रतिष्ठित होगा।",
        },
        Taurus: {
            english:
                "Should Venus at birth be in Taurus, one will be endowed with many wives and gems, be an agriculturist, will possess scents, garlands and robes, will live on account of cows, be charitable, will maintain his relatives, will have good appearance, will be learned in many branches, will give away many things, will help the living beings and be a principal person.",
            hindi: "यदि जन्म के समय शुक्र वृषभ राशि में हो तो वह अनेक स्त्रियों और रत्नों से युक्त, कृषक, गंध, माला और वस्त्रों से युक्त, गौओं के कारण जीवन निर्वाह करने वाला, दानशील, बंधु-बांधवों का पालन करने वाला, सुन्दर रूप वाला, अनेक विद्याओं का ज्ञाता, अनेक वस्तुओं का दान करने वाला, प्राणियों की सहायता करने वाला और प्रधान व्यक्ति होता है।",
        },
        Gemini: {
            english:
                "Should Venus occupy Gemini at birth, one will be famous in sciences and Sastras, be beautiful, libidinous, be skillful in writing and in poetry, be dear to good people, will derive wealth through music and dances, will have many friends, will honour Gods and Brahmins and be firm in friendship.",
            hindi: "यदि जन्म के समय शुक्र मिथुन राशि में हो तो व्यक्ति विज्ञान और शास्त्रों में प्रसिद्ध, सुंदर, कामुक, लेखन और काव्य में निपुण, अच्छे लोगों का प्रिय, संगीत और नृत्य से धन अर्जित करने वाला, अनेक मित्रों वाला, देवताओं और ब्राह्मणों का सम्मान करने वाला तथा मित्रता में दृढ़ होगा।",
        },
        Cancer: {
            english:
                "If Venus occupies Cancer at the time of ones birth, he will be wise, virtuous, learned, strong, soft, chief among men, will have desired happiness and wealth, be good-looking, just, very much troubled on account of women and wine and will be miserable with family troubles.",
            hindi: "यदि किसी के जन्म के समय शुक्र कर्क राशि में हो तो वह बुद्धिमान, गुणवान, विद्वान, बलवान, कोमल, पुरुषों में श्रेष्ठ, इच्छित सुख और धन से युक्त, सुन्दर, न्यायप्रिय, स्त्री और मद्य के कारण बहुत परेशान और पारिवारिक क्लेशों से दुखी होगा।",
        },
        Leo: {
            english:
                "If Venus occupies Leo at birth, the native will respect women, will enjoy wealth and happiness, will have less virility, be dear to relatives, be miserable in spite of his happiness, will help others, will respect Brahmins, elders and preceptors and will be devoid of much discrimination.",
            hindi: "यदि जन्म के समय शुक्र सिंह राशि में हो तो जातक स्त्रियों का आदर करने वाला, धन-संपत्ति और सुख भोगने वाला, कम पौरुष वाला, संबंधियों का प्रिय, सुखी होते हुए भी दुखी, दूसरों की सहायता करने वाला, ब्राह्मणों, बड़ों और गुरुओं का आदर करने वाला तथा विवेक से रहित होगा।",
        },
        Virgo: {
            english:
                "Should Venus be in Virgo, the native will not be quite discriminative, be soft in disposition, be skillful, will be helpful to others, will speak sweetly, will earn money through several sources, will cohabit with bad women, be mean, be devoid of happiness and pleasures, will beget more daughters and less sons, will visit shrines and be a scholar in an assembly.",
            hindi: "यदि शुक्र कन्या राशि में हो तो जातक विवेकशील नहीं होगा, स्वभाव से कोमल होगा, कार्यकुशल होगा, दूसरों की सहायता करने वाला होगा, मीठा बोलने वाला होगा, अनेक स्रोतों से धन अर्जित करने वाला होगा, बुरी स्त्रियों के साथ सहवास करने वाला होगा, नीच होगा, सुख और आनंद से रहित होगा, अधिक पुत्रियां और कम पुत्र उत्पन्न करने वाला होगा, तीर्थ स्थानों पर जाने वाला होगा और सभा में विद्वान होगा।",
        },
        Libra: {
            english:
                "If Venus occupies Libra, the native will acquire hard-earned money, be valorous, endowed with superior robes etc., interested in living in foreign countries, will protect his own people, be skillful in his duties, rich, meritorious, famous by honouring Gods and Brahmins, be a scholar and be fortunate.",
            hindi: "तुला राशि में शुक्र होने पर जातक परिश्रम से धन अर्जित करने वाला, पराक्रमी, श्रेष्ठ वस्त्राभूषणों से युक्त, विदेश में रहने का इच्छुक, स्वजनों की रक्षा करने वाला, अपने कर्तव्यों में निपुण, धनवान, गुणवान, देवताओं और ब्राह्मणों का आदर करने वाला, विद्वान और भाग्यवान होता है।",
        },
        Scorpio: {
            english:
                "If Venus occupies Scorpio, the subject will be jealous, be very malicious, be not religious, be argumentative, be crafty, be not attached to brothers, be not fortunate, will be troubled by enemies, be distressed, will be inimical to unchaste women, be skillful in killing, will incur heavy debts, will suffer penury, be proud and will contract venereal diseases.",
            hindi: "वृश्चिक राशि में शुक्र होने पर जातक ईर्ष्यालु, द्वेषी, अधार्मिक, तर्कशील, धूर्त, भाइयों से असंबद्ध, भाग्यहीन, शत्रुओं से परेशान, व्यथित, व्यभिचारी, हत्या में निपुण, भारी कर्जदार, दरिद्र, अभिमानी और यौन रोगों से ग्रस्त होगा।",
        },
        Sagittarius: {
            english:
                "One, who has Venus in Sagittarius will be endowed with good results accruing out of virtues, dutifulness and wealth, be dear to all people, be splendourous, be an excellent personage, will shine like the Sun before his family members, be a scholar, will be endowed with cows, be fond of decoration, will enjoy wealth, wife and fortunes, be a kings minister, be skillful, will have a stout and long physique and be respected by all.",
            hindi: "धनु राशि में शुक्र होने पर जातक सद्गुणों, कर्तव्यपरायणता और धन से संपन्न होता है, सभी लोगों का प्रिय होता है, तेजस्वी होता है, श्रेष्ठ व्यक्तित्व वाला होता है, अपने परिवार के सदस्यों के सामने सूर्य के समान चमकता है, विद्वान होता है, गायों से संपन्न होता है, सजावट का शौकीन होता है, धन, पत्नी और धन का आनंद लेता है, राजा का मंत्री होता है, कुशल होता है, गठीला और लंबा शरीर होता है और सभी उसका सम्मान करते हैं।",
        },
        Capricorn: {
            english:
                "If Venus occupies Capricorn at birth, one will be miserable due to heavy expenses, will have an emaciated body, will be fond of aged women, will suffer from heart diseases, be miserly in the matter of money, be a liar, be skillful in cheating, be a eunuch, be devoid of (good) acts, interested in others work, very distressed, be a dunce and will, however, endure misery.",
            hindi: "जन्म के समय शुक्र मकर राशि में हो तो अत्यधिक व्यय से दुखी, क्षीण शरीर वाला, वृद्ध स्त्रियों से प्रेम करने वाला, हृदय रोग से पीड़ित, धन के मामले में कंजूस, झूठ बोलने वाला, छल करने में निपुण, नपुंसक, (अच्छे) कर्मों से रहित, दूसरों के काम में रुचि रखने वाला, बहुत दुःखी, मूर्ख तथा दुःख सहने वाला होता है।",
        },
        Aquarius: {
            english:
                "Should Venus be in Aquarius, one will suffer from fear and excitement, be not successful in undertakings, will go to other women, be not virtuous, be inimical to elders and to his children, be bereft of ablutions, like bathing and will not be endowed with (good) robes, ornaments etc. and be dirty.",
            hindi: "यदि शुक्र कुंभ राशि में हो तो जातक भय और उत्तेजना से ग्रस्त होगा, कार्यों में सफल नहीं होगा, परस्त्री गमन करेगा, सदाचारी नहीं होगा, अपने से बड़ों और बच्चों से द्वेष रखेगा, स्नान आदि से रहित होगा, अच्छे वस्त्र, आभूषण आदि धारण नहीं करेगा तथा गंदा रहेगा।",
        },
        Pisces: {
            english:
                "If Venus is posited in Pisces at birth, one will be courteous, liberal, virtuous, very wealthy, will destroy enemies, be famous in the world, excellent, distinguished, dear to king, be endowed with good speech and wisdom, be liberal, will derive wealth and respect from the virtuous, will keep up his promise, will maintain his family members and be endowed with knowledge.",
            hindi: "यदि जन्म के समय शुक्र मीन राशि में स्थित हो तो जातक विनम्र, उदार, गुणवान, बहुत धनवान, शत्रुओं का नाश करने वाला, संसार में प्रसिद्ध, श्रेष्ठ, प्रतिष्ठित, राजा का प्रिय, अच्छी वाणी और बुद्धि से युक्त, उदार, पुण्यात्माओं से धन और सम्मान प्राप्त करने वाला, अपने वचन का पालन करने वाला, अपने परिवार का भरण-पोषण करने वाला और ज्ञान से युक्त होता है।",
        },
    },
    Saturn: {
        Aries: {
            english:
                "If Saturn occupies Aries at the time of ones birth one will be miserable due to his vices and hard labor, be deceitful will hate his relatives, be blameworthy, garrulous, reprobated, poor, bad in appearance, ill-tempered, inimical to his people, will do base acts, be jealous and sinful.",
            hindi: "यदि जन्म के समय शनि मेष राशि में हो तो व्यक्ति अपने दुर्गुणों और कठिन परिश्रम के कारण दुखी, धोखेबाज, अपने रिश्तेदारों से घृणा करने वाला, निंदनीय, बातूनी, निंदित, गरीब, दिखने में बुरा, क्रोधी, अपने लोगों से द्वेष रखने वाला, नीच कर्म करने वाला, ईर्ष्यालु और पापी होगा।",
        },
        Taurus: {
            english:
                "If Saturn occupies Taurus at the time of ones birth, he will be bereft of wealth, be a servant, will speak undesirable words, be untruthful, will win the hearts of old women, will have bad friends, will be addicted to women, will serve other women, be not outspoken, will have strong sight, be related to numerous assignments and be a fool.",
            hindi: "यदि जन्म के समय शनि वृषभ राशि में हो तो वह धनहीन, सेवक, अवांछनीय वचन बोलने वाला, असत्य बोलने वाला, वृद्ध स्त्रियों का दिल जीतने वाला, बुरे मित्र वाला, स्त्रियों में आसक्त, परस्त्री की सेवा करने वाला, कम बोलने वाला, तीव्र दृष्टि वाला, अनेक कार्यों से जुड़ा हुआ और मूर्ख होता है।",
        },
        Gemini: {
            english:
                "If Saturn occupies Gemini, one will contract debts and imprisonments, will toil, will have vanity in disposition will consecrate by hymns and prayers, be bereft of virtues, be always in hide-out, be libidinous, cunning, wicked and fond of wandering and of sports.",
            hindi: "यदि शनि मिथुन राशि में हो तो व्यक्ति कर्ज और कारावास का भागी होगा, परिश्रम करेगा, स्वभाव में घमंड होगा, भजन और प्रार्थनाओं से पवित्र होगा, गुणों से रहित होगा, हमेशा छिपकर रहने वाला होगा, कामी, चालाक, दुष्ट, भ्रमणशील और खेल-कूद का शौकीन होगा।",
        },
        Cancer: {
            english:
                "If Saturn is in Cancer, one will possess a beloved wife, be devoid of wealth in boyhood, will suffer many diseases, be learned, motherless, soft-spoken, distinguished in acts, will always contract diseases, will trouble others, be inimical to relatives, crooked, be kingly in his mid-life and will enjoy growing pleasures.",
            hindi: "यदि शनि कर्क राशि में हो तो जातक प्रिय पत्नी वाला, बाल्यकाल में धनहीन, अनेक रोगों से ग्रस्त, विद्वान, मातृहीन, मृदुभाषी, कर्मों में श्रेष्ठ, सदैव रोगों से ग्रस्त, दूसरों को कष्ट देने वाला, स्वजनों से शत्रुता रखने वाला, कुटिल, मध्य जीवन में राजसी तथा सुखों का भोग करने वाला होता है।",
        },
        Leo: {
            english:
                "If Saturn occupies Leo, one will be interested in writing and reading, be skillful, be disdained, devoid of virtues and wife, will live by servitude, be devoid of his own men and happiness, be interested in doing base acts, ill-tempered, be mad with (undue) desires, will carry loads, will toil hard and will have a wrinkled body.",
            hindi: "सिंह राशि में शनि होने पर जातक लिखने-पढ़ने में रुचि रखने वाला, निपुण, तिरस्कृत, गुणहीन, स्त्रीहीन, दासता में रहने वाला, अपने पुरुष और सुख से रहित, नीच कर्मों में रुचि रखने वाला, क्रोधी, (अनुचित) इच्छाओं से पागल, बोझ उठाने वाला, कठोर परिश्रम करने वाला और झुर्रियों वाला शरीर वाला होता है।",
        },
        Virgo: {
            english:
                "If Saturn occupies Virgo at birth the subject will resemble a eunuch, be very crafty, will depend on others for food, be addicted to prostitutes, will have a few friends, be unacquainted with arts, be desirous of indulging in ugly acts, will possess sons and wealth, be indolent, helpful to others, will intent upon spoiling virgins and be cautious in his actions.",
            hindi: "यदि जन्म के समय शनि कन्या राशि में हो तो जातक नपुंसक जैसा, बहुत चालाक, भोजन के लिए दूसरों पर निर्भर, वेश्याओं का आदी, कम मित्र वाला, कला से अनभिज्ञ, कुकृत्यों में लिप्त रहने का इच्छुक, पुत्र और धन वाला, आलसी, दूसरों की मदद करने वाला, कुंवारी लड़कियों को बिगाड़ने वाला तथा अपने कार्यों में सतर्क रहने वाला होता है।",
        },
        Libra: {
            english:
                "Saturn posited in Libra at birth indicates, that the subject will be rich, soft-spoken, will earn money and honours from foreign countries, be a king, or a scholar, will have his wealth protected by his relatives, be senior in the circle, will attain a high status owing to his gracious speech in an assemblage, be good and will join corrupt female dancers and prostitutes.",
            hindi: "जन्म के समय तुला राशि में स्थित शनि यह संकेत देता है कि जातक धनवान, मृदुभाषी, विदेश से धन और सम्मान अर्जित करने वाला, राजा या विद्वान होगा, उसके धन की रक्षा उसके संबंधियों द्वारा की जाएगी, वह अपने परिवार में वरिष्ठ होगा, सभा में अपनी मधुर वाणी के कारण उच्च पद प्राप्त करेगा, अच्छा होगा तथा भ्रष्ट नर्तकियों और वेश्याओं के साथ रहेगा।",
        },
        Scorpio: {
            english:
                "If Saturn occupies Scorpio at birth, the native will be hostile, be crooked, affected by poison and weapons, very ill-tempered, miserly, egoistic, rich, capable of stealing others money, averse to instruments played on festive occasions, malicious, very miserable and will face destruction, misery and diseases.",
            hindi: "यदि जन्म के समय शनि वृश्चिक राशि में हो तो जातक शत्रुतापूर्ण, कुटिल, विष और शस्त्र से प्रभावित, बहुत क्रोधी, कंजूस, अहंकारी, धनी, दूसरों का धन चुराने में सक्षम, उत्सव के अवसरों पर बजाए जाने वाले वाद्यों से विमुख, द्वेषी, बहुत दुखी होगा तथा विनाश, दुख और रोगों का सामना करेगा।",
        },
        Sagittarius: {
            english:
                "If Saturn occupies Sagittarius, one will be skillful in behavior, teaching, Vedic meanings, learning and denotation, (i.e. he will be best placed in these respects), be famous due to virtuous children, family profession and his own virtues, will enjoy excellent affluence in his old age, will speak less, will have many names and be soft in disposition.",
            hindi: "यदि शनि धनु राशि में हो तो व्यक्ति व्यवहार, शिक्षण, वैदिक अर्थ, विद्या और अर्थ-बोध में निपुण होगा (अर्थात वह इन मामलों में सर्वश्रेष्ठ होगा), गुणवान संतान, पारिवारिक व्यवसाय और स्वयं के गुणों के कारण प्रसिद्ध होगा, वृद्धावस्था में उत्कृष्ट समृद्धि का आनंद लेगा, कम बोलेगा, अनेक नाम वाला होगा और स्वभाव से कोमल होगा।",
        },
        Capricorn: {
            english:
                "If Saturn is posited at birth in Capricorn, the native will lord over the lands of others females, will be endowed with Vedic knowledge, virtues and knowledge of many branches of fine arts, be excellent among his caste-men, be honourable, will respect others, be famous, be interested in bathing and decoration, will be skillful in performance, will live in foreign places, be courageous and be polite in behavior.",
            hindi: "यदि जन्म के समय शनि मकर राशि में स्थित हो तो जातक अन्य स्त्रियों की भूमि का स्वामी, वैदिक ज्ञान, सद्गुणों तथा ललित कलाओं की अनेक शाखाओं का ज्ञाता, अपने जाति-पुरुषों में श्रेष्ठ, सम्माननीय, दूसरों का सम्मान करने वाला, प्रसिद्ध, स्नान और सजावट में रुचि रखने वाला, कार्य-कुशल, विदेश में रहने वाला, साहसी तथा व्यवहार में विनम्र होगा।",
        },
        Aquarius: {
            english:
                "If Saturn is in Aquarius, the native will be a great liar, be eminent, be addicted to women and wine, be wicked, crafty, will fall prey to evil friendship, be very ill-tempered, be averse to knowledge, conversation and traditional law, be addicted to other women, be harsh in speech and will attempt at many undertakings.",
            hindi: "यदि शनि कुंभ राशि में हो तो जातक बड़ा झूठा, प्रतिष्ठित, स्त्रियों और शराब का आदी, दुष्ट, धूर्त, बुरी मित्रता का शिकार, क्रोधी, ज्ञान, वार्तालाप और पारंपरिक कानून से विमुख, पराई स्त्रियों का आदी, कठोर वाणी वाला और अनेक कार्यों में हाथ डालने वाला होगा।",
        },
        Pisces: {
            english:
                "If Saturn occupies Pisces at birth, one will be fond of Sacrifices and arts, be chief among his relatives and friends, be calm, will have increasing wealth, be skillful in policy-making, be capable of diamond testing, be virtuous, modest and will later on acquire an authoritative position.",
            hindi: "यदि जन्म के समय शनि मीन राशि में हो तो जातक त्याग और कला का शौकीन, अपने रिश्तेदारों और मित्रों में अग्रणी, शांत स्वभाव वाला, धन में वृद्धि करने वाला, नीति-निर्माण में कुशल, हीरा परीक्षण में सक्षम, गुणवान, विनम्र और आगे चलकर उच्च पद प्राप्त करने वाला होता है।",
        },
    },
};
