import type { HouseNumber } from "src/services/constants/Houses";
import type {
    Planet,
    PlanetEn,
    SaptagrahaEn,
} from "src/services/constants/Planet";
import type { Translation } from "src/services/types";
import type { Phala } from "src/services/YogPhala";
/**
 * Retrieves house effect descriptions for each planet based on its current
 * house position.
 *
 * @param planetaryPositions - All planetary data keyed by English planet name.
 * @returns An array of rules containing the description and effect for each.
 */
export function getSaravaliPlanetHouseYogPhala(
    planetaryPositions: Record<PlanetEn, Planet>
): Phala[] {
    return Object.entries(PlanetHouseEffectTable).map(
        ([grahaName, houseEffectMap]) => {
            const grahaData = planetaryPositions[grahaName];
            const { english: houseEnglish, hindi: houseHindi } =
                grahaData.house.name;

            return {
                description: {
                    english: `${grahaName} in the ${houseEnglish} House`,
                    hindi: `${grahaName} ${houseHindi} भाव में`,
                },
                effect: houseEffectMap[grahaData.house.num],
            };
        }
    );
}

/** Planet house effects mapping. This dataset is based on Saravali. */
export const PlanetHouseEffectTable: Record<
    SaptagrahaEn,
    Record<HouseNumber, Translation<string, string>>
> = {
    Sun: {
        1: {
            english:
                "The Sun in the Ascendant denotes, that the native will have less hair (on the head), be lazy in function, given to anger, will have prominent personality, be honourable, will have weak sight and coarse physique, be courageous, impatient and unkind. If the Ascendant is Cancer and is occupied by the Sun, the native will have swollen eyes, if it be Aries with Sun therein, his sight will be weak and in Leo the Sun makes him night-blind. One suffers poverty and loss of children, if the Sun occupies Libra.",
            hindi: "लग्न में सूर्य होने से जातक के सिर पर कम बाल होंगे, वह काम में आलसी, क्रोधी, प्रतिष्ठित व्यक्तित्व वाला, सम्माननीय, कमजोर दृष्टि और स्थूल शरीर वाला, साहसी, अधीर और निर्दयी होगा। यदि कर्क लग्न हो और उसमें सूर्य हो, तो जातक की आँखें सूजी हुई होंगी, यदि मेष राशि हो और उसमें सूर्य हो, तो उसकी दृष्टि कमजोर होगी और सिंह राशि में सूर्य होने से उसे रतौंधी हो सकती है। तुला राशि में सूर्य होने पर जातक दरिद्रता और संतान की हानि का शिकार होता है।",
        },
        2: {
            english:
                "If the Sun is in the 2nd Bhava, the native will be endowed with servants and quadrupeds, will suffer facial diseases, will be deprived of happiness and wealth and will lose money through royal displeasure, or through thieves.",
            hindi: "यदि सूर्य द्वितीय भाव में हो तो जातक नौकरों और चौपायों से युक्त होगा, चेहरे के रोग से पीड़ित होगा, सुख और धन से वंचित होगा तथा राज-अप्रसन्नता या चोरों के कारण धन की हानि होगी।",
        },
        3: {
            english:
                "Should the Sun be in 3rd, the native will be valorous, strong, will lose co-born, be dear to people, good-looking, very learned and will conquer his enemies.",
            hindi: "यदि सूर्य तीसरे भाव में हो तो जातक वीर, बलवान, सहजनों से दूर रहने वाला, लोगों का प्रिय, सुन्दर, विद्वान् तथा शत्रुओं पर विजय पाने वाला होता है।",
        },
        4: {
            english:
                "Should the Sun be in 4th, the native will be devoid of conveyances and relatives, will suffer heart diseases, will destroy paternal house and wealth and will serve a bad king.",
            hindi: "यदि सूर्य चतुर्थ भाव में हो तो जातक वाहन और संबंधियों से रहित होगा, हृदय रोग से पीड़ित होगा, पैतृक घर और धन का नाश करेगा तथा बुरे राजा की सेवा करेगा।",
        },
        5: {
            english:
                "If the Sun occupies the 5th, the native will be bereft of happiness, sons and wealth, will live by husbandry, will move in hills and fortresses, be fickle-minded, scholarly, devoid of strength and be short-lived.",
            hindi: "यदि सूर्य पंचम भाव में हो तो जातक सुख, पुत्र और धन से रहित, पशुपालन द्वारा जीवन निर्वाह करने वाला, पहाड़ों और किलों में रहने वाला, चंचल बुद्धि वाला, विद्वान, बलहीन और अल्पायु होता है।",
        },
        6: {
            english:
                "If the Sun is in 6th, the native will be very libidinous, will have powerful digestive fire (capable of digesting fast), be strong, affluent, famous for virtues and be either a king, or an Army chief.",
            hindi: "यदि सूर्य छठे भाव में हो तो जातक बहुत कामुक, शक्तिशाली पाचक अग्नि वाला (तेजी से पचाने वाला), बलवान, धनवान, गुणों के लिए प्रसिद्ध तथा राजा या सेना प्रमुख होगा।",
        },
        7: {
            english:
                "If the Sun is posited in 7th, the native will be poor, insulted, will suffer bodily diseases, royal displeasures and imprisonment, will take to bad ways and will not be well-disposed to his wife.",
            hindi: "यदि सूर्य सातवें भाव में हो तो जातक दरिद्र, अपमानित, शारीरिक रोग, राजसी अप्रसन्नता और कारावास से ग्रस्त, बुरे मार्ग अपनाने वाला तथा अपनी पत्नी के प्रति अच्छा व्यवहार न रखने वाला होगा।",
        },
        8: {
            english:
                "If the Sun occupies the 8th, the native will have deformed eyes, be devoid of wealth and happiness, be short-lived and will suffer separation from his relatives.",
            hindi: "यदि सूर्य अष्टम भाव में हो तो जातक विकृत नेत्रों वाला, धन-संपत्ति से रहित, अल्पायु तथा अपने सगे-संबंधियों से वियोग भोगने वाला होता है।",
        },
        9: {
            english:
                "If the Sun occupies the 9th, the native will be endowed with wealth, children and friends, will be very interested in worshipping Gods and Brahmins, will not be well-disposed towards his father and wife and be not calm.",
            hindi: "यदि सूर्य नवम भाव में हो तो जातक धन, संतान और मित्रों से संपन्न होगा, देवताओं और ब्राह्मणों की पूजा में बहुत रुचि रखेगा, अपने पिता और पत्नी के प्रति अच्छा व्यवहार नहीं रखेगा और शांत नहीं रहेगा।",
        },
        10: {
            english:
                "Should the Sun be in 10th, the native will be extremely intelligent, rich, strong and will be endowed with conveyances, relatives and sons, will succeed in his undertakings, be valorous, unconquerable and great.",
            hindi: "यदि सूर्य दसवें भाव में हो तो जातक अत्यंत बुद्धिमान, धनवान, बलवान, वाहन, बंधु-बांधव और पुत्रों से संपन्न, अपने कार्यों में सफल, पराक्रमी, अजेय और महान होता है।",
        },
        11: {
            english:
                "Should the Sun be in 11th, one will be interested in gathering money, be strong, will hate others, be devoid of servants, be himself a servant, be devoid of affection, be modest and will be successful in undertakings.",
            hindi: "यदि सूर्य एकादश भाव में हो तो व्यक्ति धन संग्रह में रुचि रखने वाला, बलवान, दूसरों से द्वेष रखने वाला, नौकरों से रहित, स्वयं नौकर, स्नेह से रहित, विनम्र तथा कार्यों में सफल होता है।",
        },
        12: {
            english:
                "If the Sun is in 12th at birth, he will have a deformed physique, be one-eyed, fallen (morally), will marry a barren lady, be inimical to his father, weak and mean.",
            hindi: "यदि जन्म के समय सूर्य 12वें भाव में हो तो वह विकृत शरीर वाला, एक आंख वाला, पतित (नैतिक रूप से) होगा, बांझ स्त्री से विवाह करेगा, पिता से शत्रुता रखने वाला, कमजोर और नीच होगा।",
        },
    },
    Moon: {
        1: {
            english:
                "The Moon in the Ascendant identical with Cancer, Taurus, or Aries indicates, that the native will be liberal, beautiful, rich and enjoying pleasures greatly. The Moon in the Ascendant identical with other Signs indicates, that the native will be intensely passionate, base, deaf, distressed, dumb and will decline (in prosperity).",
            hindi: "कर्क, वृषभ या मेष लग्न में स्थित चंद्रमा यह दर्शाता है कि जातक उदार, सुंदर, धनी और सुखों का भरपूर आनंद लेने वाला होगा। अन्य राशियों में स्थित चंद्रमा यह दर्शाता है कि जातक अत्यधिक भावुक, नीच, बहरा, व्यथित, गूंगा होगा और उसकी (समृद्धि में) गिरावट होगी।",
        },
        2: {
            english:
                "Should the Moon be in 2nd, the native will enjoy incomparable happiness and friends and be wealthy. If the said Moon be Full, the native will be very affluent and will speak less.",
            hindi: "यदि चन्द्रमा दूसरे भाव में हो तो जातक अतुलनीय सुख और मित्रों का आनंद लेता है और धनवान होता है। यदि चन्द्रमा पूर्ण भाव में हो तो जातक बहुत धनवान होता है और कम बोलता है।",
        },
        3: {
            english:
                "Should the Moon be in 3rd, the native will protect his co-born, be always delighted, valorous and will be endowed with learning, robes and food.",
            hindi: "यदि चन्द्रमा तीसरे भाव में हो तो जातक अपने सहजनों की रक्षा करने वाला, सदैव प्रसन्न रहने वाला, पराक्रमी, विद्या, वस्त्र और भोजन से संपन्न होगा।",
        },
        4: {
            english:
                "If the Moon be in 4th, the native will be endowed with relatives, paraphernalia and conveyances, be charitable, fond of travelling by water and will neither be very happy nor be miserable.",
            hindi: "यदि चन्द्रमा चतुर्थ भाव में हो तो जातक सगे-संबंधियों, सामान और वाहनों से संपन्न, दानशील, जलमार्ग से यात्रा करने का शौकीन होता है तथा न तो बहुत खुश होता है और न ही दुखी।",
        },
        5: {
            english:
                "Should the Moon be in 5th, the native will be timid in disposition, will earn learning, clothes and food, will have many sons and friends, be a scholar and be passionate.",
            hindi: "यदि चन्द्रमा पंचम भाव में हो तो जातक स्वभाव से डरपोक, विद्या, वस्त्र और भोजन अर्जित करने वाला, अनेक पुत्र और मित्र वाला, विद्वान और भावुक होगा।",
        },
        6: {
            english:
                "If the Moon be in 6th, the native will suffer stomachial diseases. If it be the weak Moon, he will be short-lived.",
            hindi: "यदि चंद्रमा छठे भाव में हो तो जातक को पेट संबंधी रोग होंगे। यदि चंद्रमा कमजोर हो तो जातक अल्पायु होगा।",
        },
        7: {
            english:
                "If the Moon is in 7th, the native will be amiable, happy, will possess a good physique and be sensuously disposed. If the weak Moon is in 7th, the native will be pitiable and weak.",
            hindi: "यदि चंद्रमा सप्तम भाव में हो तो जातक मिलनसार, प्रसन्नचित्त, सुडौल शरीर वाला और कामुक प्रवृत्ति का होगा। यदि कमजोर चंद्रमा सप्तम भाव में हो तो जातक दयनीय और कमजोर होगा।",
        },
        8: {
            english:
                "If the Moon is in 8th, the native will be very intelligent, very splendourous and will suffer from diseases. If the Moon be weak, he will be short-lived.",
            hindi: "यदि चन्द्रमा अष्टम भाव में हो तो जातक बहुत बुद्धिमान, वैभवशाली और रोगों से ग्रस्त होगा। यदि चन्द्रमा निर्बल हो तो जातक अल्पायु होगा।",
        },
        9: {
            english:
                "If the Moon is in 9th, the native will be devoted to divine and paternal assignments, will be endowed with happiness, wealth, intelligence and sons and will attract the fair sex.",
            hindi: "यदि चन्द्रमा नवम भाव में हो तो जातक दैवीय एवं पितृ कार्यों में समर्पित होगा, सुख, धन, बुद्धि एवं पुत्रों से संपन्न होगा तथा स्त्री वर्ग को आकर्षित करेगा।",
        },
        10: {
            english:
                "If the Moon occupies the 10th, the native will not suffer grief, be dutiful, successful in his undertakings, affluent, pure, very strong, valorous and charitable.",
            hindi: "यदि चन्द्रमा दसवें भाव में हो तो जातक दुःखी नहीं होगा, कर्तव्यनिष्ठ होगा, अपने कार्यों में सफल होगा, धनवान, पवित्र, बहुत बलवान, पराक्रमी और दानशील होगा।",
        },
        11: {
            english:
                "Should the Moon occupy the 11th, the native will be wealthy, will have many sons, be long-lived, will have attendants to serve, be intelligent, sharp, valorous and splendourous.",
            hindi: "यदि चन्द्रमा ग्यारहवें भाव में हो तो जातक धनवान, अनेक पुत्रों वाला, दीर्घायु, सेवा करने वाले सेवक, बुद्धिमान, तेजवान, पराक्रमी और तेजस्वी होता है।",
        },
        12: {
            english:
                "If the Moon occupies the 12th, the native will be odious, fallen in moral sense, mean, will suffer eye diseases, be indolent, distressed (deformed), is born of others loins and will be insulted at all times.",
            hindi: "यदि चन्द्रमा बारहवें भाव में हो तो जातक घृणित, नैतिक दृष्टि से पतित, नीच, नेत्र रोग से ग्रस्त, आलसी, व्यथित (विकृत), दूसरों की संतान से उत्पन्न तथा सदैव अपमानित होने वाला होता है।",
        },
    },
    Mars: {
        1: {
            english:
                "If Mars occupies the Ascendant, the native will be cruel, adventurous, dull-witted, short-lived, honourable, courageous, will have an injured physique, be attractive in appearance and fickle-minded.",
            hindi: "यदि मंगल लग्न में हो तो जातक क्रूर, साहसी, मंदबुद्धि, अल्पायु, सम्माननीय, साहसी, घायल शरीर वाला, आकर्षक दिखने वाला और चंचल स्वभाव का होता है।",
        },
        2: {
            english:
                "If Mars occupies the 2nd, the native will be poor, will eat bad food, will possess an ugly face, will join bad men and be bereft of learning.",
            hindi: "यदि मंगल दूसरे भाव में हो तो जातक गरीब होगा, खराब भोजन करेगा, बदसूरत चेहरा होगा, बुरे लोगों की संगति करेगा और विद्या से वंचित रहेगा।",
        },
        3: {
            english:
                "If Mars be in 3rd, the native will be courageous, unconquerable, bereft of co-born, be delighted, will have all virtues and be famous.",
            hindi: "यदि मंगल तीसरे भाव में हो तो जातक साहसी, अजेय, सहजन्य से रहित, प्रसन्नचित्त, सर्वगुण संपन्न एवं प्रसिद्ध होगा।",
        },
        4: {
            english:
                "If Mars is posited in 4th, the native will be devoid of relatives, paraphernalia and conveyances, be very miserable, will live in others houses and be distressed.",
            hindi: "यदि मंगल चतुर्थ भाव में हो तो जातक सगे-संबंधियों, सामान और वाहन से रहित, बहुत दुखी, दूसरों के घर में रहने वाला और कष्टग्रस्त होगा।",
        },
        5: {
            english:
                "If Mars occupies the 5th, the native will be devoid of happiness, wealth and sons, be fickle-minded, be a talebearer, will incur evils, be wicked, distressed and mean.",
            hindi: "यदि मंगल पंचम भाव में हो तो जातक सुख, धन और पुत्र से रहित, चंचल, चुगलखोर, बुराइयों को प्राप्त करने वाला, दुष्ट, दुःखी और नीच होगा।",
        },
        6: {
            english:
                "If Mars occupies the 6th, the native will be highly libidinous, will have powerful digestive fire, be beautiful, tall, strong and great among his relatives.",
            hindi: "यदि मंगल छठे भाव में हो तो जातक अत्यधिक कामुक, शक्तिशाली पाचन अग्नि वाला, सुंदर, लंबा, बलवान तथा अपने रिश्तेदारों में श्रेष्ठ होगा।",
        },
        7: {
            english:
                "If Mars is posited in 7th, the native will lose his wife, will suffer from diseases, will take to bad ways, be miserable, sinful, devoid of wealth, distressed and emaciated.",
            hindi: "यदि मंगल सातवें भाव में हो तो जातक अपनी पत्नी को खो देगा, रोगों से ग्रस्त होगा, बुरे मार्ग अपनाएगा, दुखी, पापी, धनहीन, व्यथित और दुर्बल होगा।",
        },
        8: {
            english:
                "If Mars occupies the 8th, the native will suffer from diseases, be short-lived, will possess an ugly, or deformed body, will do base acts and will suffer grief.",
            hindi: "यदि मंगल अष्टम भाव में हो तो जातक रोगग्रस्त, अल्पायु, कुरूप या विकृत शरीर वाला, नीच कर्म करने वाला तथा दुःख भोगने वाला होता है।",
        },
        9: {
            english:
                "If Mars occupies the 9th, the native will not be skillful in acts, be odious, will kill living beings, be not virtuous, be very sinful and honoured by the king.",
            hindi: "यदि मंगल नवम भाव में हो तो जातक कर्म कुशल नहीं होगा, घृणित होगा, जीवों की हत्या करेगा, पुण्यवान नहीं होगा, बहुत पापी होगा तथा राजा द्वारा सम्मानित होगा।",
        },
        10: {
            english:
                "If Mars occupies the 10th, the native will be proficient in his acts, be valorous, unconquerable, will serve important people, be endowed with sons and happiness and be very courageous.",
            hindi: "यदि मंगल दसवें भाव में हो तो जातक अपने कार्यों में निपुण, पराक्रमी, अजेय, महत्वपूर्ण लोगों की सेवा करने वाला, पुत्र और सुख से संपन्न तथा बहुत साहसी होगा।",
        },
        11: {
            english:
                "If Mars occupies the 11th, the native will be virtuous, happy, courageous, endowed with wealth, grains and sons and be devoid of sorrow.",
            hindi: "यदि मंगल ग्यारहवें भाव में हो तो जातक गुणवान, सुखी, साहसी, धन-धान्य और पुत्र से युक्त तथा शोक रहित होता है।",
        },
        12: {
            english:
                "Should Mars be in 12th, the native will have diseased eyes, will fall in moral sense, will kill his wife, be a talebearer, be fierce and will contract humility and imprisonment.",
            hindi: "यदि मंगल बारहवें भाव में हो तो जातक की आंखें बीमार होंगी, नैतिक मूल्यों में गिरावट होगी, वह अपनी पत्नी की हत्या करेगा, चुगलखोर होगा, उग्र होगा तथा उसे दीनता और कारावास की सजा होगी।",
        },
    },
    Mercury: {
        1: {
            english:
                "Should Mercury occupy the Ascendant, the native will have a flawless physique, be intelligent, will know proper (beneficial) place and time, be well-versed in poetry and mathematics, be a skillful and sweet speaker and be long-lived.",
            hindi: "यदि बुध लग्न में हो तो जातक दोषरहित शरीर वाला, बुद्धिमान, उचित स्थान और समय का ज्ञाता, काव्य और गणित में निपुण, कुशल और मधुर वक्ता तथा दीर्घायु होता है।",
        },
        2: {
            english:
                "If Mercury is in the 2nd, the native will earn wealth through his own wisdom, will enjoy food and drinks, be auspicious in speech and will have good course of conduct.",
            hindi: "यदि बुध दूसरे भाव में हो तो जातक अपनी बुद्धि से धन अर्जित करेगा, खाने-पीने का आनंद लेगा, शुभ वाणी वाला होगा तथा अच्छे आचरण वाला होगा।",
        },
        3: {
            english:
                "If Mercury occupies the 3rd, the native will always toil hard, be devoid of near and dear, skillful, endowed with co-born, very cunning and fickle-minded.",
            hindi: "यदि बुध तीसरे भाव में हो तो जातक सदैव कठोर परिश्रम करने वाला, स्वजनों से रहित, निपुण, सहजनों से युक्त, बहुत चालाक एवं चंचल स्वभाव का होता है।",
        },
        4: {
            english:
                "If Mercury is in 4th, the native will be endowed with money and relatives, be fortunate, will have conveyances, all paraphernalia and relatives and be very learned.",
            hindi: "यदि बुध चतुर्थ भाव में हो तो जातक धनवान, बंधु-बांधवों से संपन्न, भाग्यशाली, वाहन, समस्त सामग्री, बंधु-बांधवों से युक्त तथा बहुत विद्वान होता है।",
        },
        5: {
            english:
                "If Mercury occupies the 5th, the native will be an expert in Mantras (sacred spells) and Abhicara (malevolent spells), will have many sons, be endowed with learning, happiness and efficacy and be delighted.",
            hindi: "यदि बुध पंचम भाव में हो तो जातक मंत्रों और अभिचार में निपुण होगा, अनेक पुत्रों वाला होगा, विद्या, सुख और प्रभाव से संपन्न होगा तथा प्रसन्न रहेगा।",
        },
        6: {
            english:
                "If Mercury occupies the 6th, the native will always be successful in litigations and disputes, will contract diseases, be indolent, not given to anger, be harsh in speech and much insulted.",
            hindi: "यदि बुध छठे भाव में हो तो जातक मुकदमेबाजी और विवादों में सदैव सफल रहेगा, बीमार रहेगा, आलसी होगा, क्रोध नहीं करेगा, वाणी में कठोर होगा और बहुत अपमानित होगा।",
        },
        7: {
            english:
                "If Mercury is in 7th, the natives wife will be very learned, beautiful in appearance, will not be of good descent, will promote quarrels and be very affluent. The native himself will be very great.",
            hindi: "यदि बुध सप्तम भाव में हो तो जातक की पत्नी बहुत विद्वान, सुंदर, कुलीन, झगड़ों को बढ़ावा देने वाली और बहुत धनी होगी। जातक स्वयं भी बहुत महान होगा।",
        },
        8: {
            english:
                "If Mercury occupies the 8th, the native will win famous names (titles), be strong, long-lived, will support his family and be equal to a king, or will become a justice.",
            hindi: "यदि बुध अष्टम भाव में हो तो जातक प्रसिद्ध नाम (उपाधियां) प्राप्त करने वाला, बलवान, दीर्घायु, अपने परिवार का भरण-पोषण करने वाला, राजा के समान या न्यायधीश बनने वाला होता है।",
        },
        9: {
            english:
                "If Mercury occupies the 9th, the native will be very affluent, scholarly, of good conduct/habits, be eloquent in speech, skillful of a great order and be virtuous.",
            hindi: "यदि बुध नवम भाव में हो तो जातक बहुत धनवान, विद्वान, अच्छे आचरण वाला, वाकपटु, उच्च कोटि के कार्य करने में निपुण और गुणवान होगा।",
        },
        10: {
            english:
                "If Mercury occupies the 10th, the native will possess distinguished intelligence, will perform distinguished acts, will attain fruition in undertakings, be very learned, courageous, strong and will be endowed with various kinds of ornaments.",
            hindi: "यदि बुध दसवें भाव में हो तो जातक विशिष्ट बुद्धि वाला, विशिष्ट कार्य करने वाला, कार्यों में सफलता पाने वाला, बहुत विद्वान, साहसी, बलवान तथा विभिन्न प्रकार के आभूषणों से युक्त होगा।",
        },
        11: {
            english:
                "If Mercury occupies the 11th, the native will be rich, be an amicable worker, be learned, happy and endowed with wide enjoyments, be long-lived and famous.",
            hindi: "यदि बुध ग्यारहवें भाव में हो तो जातक धनवान, मिलनसार, विद्वान, सुखी, भोग विलास से संपन्न, दीर्घायु एवं प्रसिद्ध होता है।",
        },
        12: {
            english:
                "Should Mercury be in the 12th, the native will be able to keep up his promise, be indolent, be humiliated, be a good speaker, be learned, pitiable and cruel.",
            hindi: "यदि बुध 12वें भाव में हो तो जातक वचन का पालन करने में असमर्थ, आलसी, अपमानित, अच्छा वक्ता, विद्वान, दयनीय एवं क्रूर होता है।",
        },
    },
    Jupiter: {
        1: {
            english:
                "If Jupiter occupies the 1st, the native will be attractive in appearance, energetic, long-lived, will act after assessing consequences, be learned, courageous and great.",
            hindi: "यदि बृहस्पति प्रथम भाव में हो तो जातक आकर्षक, ऊर्जावान, दीर्घायु, परिणामों का आकलन करने के बाद कार्य करने वाला, विद्वान, साहसी और महान होगा।",
        },
        2: {
            english:
                "Jupiter in the 2nd. If Jupiter occupies the 2nd, the native will be rich, will enjoy good food, be an eloquent speaker, be fortunate, be charitable and will have a beautiful body and face.",
            hindi: "बृहस्पति दूसरे भाव में। यदि बृहस्पति दूसरे भाव में हो तो जातक धनवान, अच्छे भोजन का आनंद लेने वाला, वाक्पटु, भाग्यशाली, दानशील और सुंदर शरीर व चेहरे वाला होगा।",
        },
        3: {
            english:
                "If Jupiter occupies the 3rd, the native will be greatly humiliated, be vile, ever successful, will have digestive deficiencies, be defeated by women and be sinful in acts.",
            hindi: "यदि बृहस्पति तीसरे भाव में हो तो जातक बहुत अपमानित, नीच, सदैव सफल, पाचन संबंधी कमियां, स्त्रियों से पराजित और पाप कर्म करने वाला होगा।",
        },
        4: {
            english:
                "If Jupiter occupies the 4th, the native will be endowed with relatives, paraphernalia, conveyance, happiness, intelligence, pleasures and wealth, be great and be a source of misery to his enemies.",
            hindi: "यदि बृहस्पति चौथे भाव में हो तो जातक सगे-संबंधियों, भौतिक वस्तुओं, वाहन, सुख, बुद्धि, सुख और धन से संपन्न होगा, महान होगा तथा अपने शत्रुओं के लिए दुख का कारण होगा।",
        },
        5: {
            english:
                "If Jupiter occupies the 5th, the native will have abundant happiness, many sons and friends, be learned, courageous, wealthy and will always be happy.",
            hindi: "यदि बृहस्पति पंचम भाव में हो तो जातक को प्रचुर सुख, अनेक पुत्र व मित्र, विद्वान, साहसी, धनवान तथा सदैव प्रसन्न रहने वाला होता है।",
        },
        6: {
            english:
                "If Jupiter is in the 6th, the native will lack digestive fire and masculine virile, be humiliated, weak, indolent, will become famous on account of females, will destroy his enemies and be widely famous.",
            hindi: "यदि बृहस्पति छठे भाव में हो तो जातक में पाचन अग्नि की कमी होगी, पुरुषत्व की कमी होगी, अपमानित, कमजोर, आलसी, स्त्रियों के कारण प्रसिद्ध होगा, शत्रुओं का नाश करेगा तथा व्यापक प्रसिद्धि प्राप्त करेगा।",
        },
        7: {
            english:
                "If Jupiter occupies the 7th, the native will be charming, will acquire a beautiful wife, be greater than his father, be an eloquent speaker, a poet, a superior person and be learned and famous.",
            hindi: "यदि बृहस्पति सातवें भाव में हो तो जातक आकर्षक होगा, सुंदर पत्नी प्राप्त करेगा, अपने पिता से बड़ा होगा, वाकपटु होगा, कवि होगा, श्रेष्ठ व्यक्ति होगा, विद्वान और प्रसिद्ध होगा।",
        },
        8: {
            english:
                "If Jupiter occupies the 8th, the native will be insulted, long-lived, be a servant, will serve his own people, be pitiable and will have union with dirty women.",
            hindi: "यदि बृहस्पति अष्टम भाव में हो तो जातक अपमानित, दीर्घायु, सेवक, स्वजनों की सेवा करने वाला, दयनीय तथा गंदी स्त्रियों से संबंध रखने वाला होता है।",
        },
        9: {
            english:
                "If Jupiter is in 9th, the native will be attached to divine and paternal duties, be learned, fortunate, be a kings minister, or a leader and be chief.",
            hindi: "यदि बृहस्पति नवम भाव में हो तो जातक दैवीय एवं पितृ कर्तव्यों से जुड़ा हुआ, विद्वान, भाग्यशाली, राजा का मंत्री या नेता एवं प्रमुख होगा।",
        },
        10: {
            english:
                "If Jupiter occupies the 10th, the native will attain successful beginning in his undertaking, be honourable, effortful and will be endowed with abundant welfare, happiness, wealth, relatives, conveyances and fame.",
            hindi: "यदि बृहस्पति दसवें भाव में हो तो जातक अपने कार्य में सफलता प्राप्त करेगा, सम्माननीय, पुरुषार्थी होगा तथा उसे प्रचुर कल्याण, सुख, धन, रिश्तेदार, वाहन और प्रसिद्धि प्राप्त होगी।",
        },
        11: {
            english:
                "If Jupiter occupies the 11th, the native will enjoy many gains, many conveyances and many servants, be virtuous, but will have limited education and few sons.",
            hindi: "यदि बृहस्पति ग्यारहवें भाव में हो तो जातक अनेक लाभ, अनेक वाहन और अनेक नौकरों का आनंद लेगा, गुणवान होगा, किन्तु उसकी शिक्षा सीमित होगी और पुत्र कम होंगे।",
        },
        12: {
            english:
                "If Jupiter occupies the 12th, the native will be indolent, odious, be devoid of speech and luck and will be in all probability in servitude.",
            hindi: "यदि बृहस्पति 12वें भाव में हो तो जातक आलसी, घृणित, वाणी और भाग्य से रहित होगा तथा संभवतः दासता में रहेगा।",
        },
    },
    Venus: {
        1: {
            english:
                "If Venus is in Ascendant, the native will possess beautiful eyes, face and physique, be happy, long-lived, timid and attractive to females.",
            hindi: "यदि शुक्र लग्न में हो तो जातक सुन्दर नेत्रों, चेहरे और शरीर वाला, प्रसन्न, दीर्घायु, डरपोक और स्त्रियों के लिए आकर्षक होगा।",
        },
        2: {
            english:
                "If Venus is in the 2nd, the native will enjoy abundant food, drinks and wealth, will derive excellent pleasures, be endowed with good speech and will amass great wealth.",
            hindi: "यदि शुक्र दूसरे भाव में हो तो जातक प्रचुर मात्रा में भोजन, पेय और धन का आनंद लेगा, उत्कृष्ट सुख प्राप्त करेगा, अच्छी वाणी से संपन्न होगा और बहुत धन अर्जित करेगा।",
        },
        3: {
            english:
                "If Venus occupies the 3rd, the native will be happy, rich, conquered by women, be vile, little enthusiastic and will be bereft of luck and paraphernalia.",
            hindi: "यदि शुक्र तीसरे भाव में हो तो जातक सुखी, धनवान, स्त्रियों द्वारा वशीभूत, नीच, कम उत्साही तथा भाग्य एवं सुख-साधन से रहित होगा।",
        },
        4: {
            english:
                "If Venus occupies the 4th, the native will be endowed with relatives, friends and happiness, be splendourous, will have conveyances and paraphernalia, be beautiful, rich and fortunate.",
            hindi: "यदि शुक्र चतुर्थ भाव में हो तो जातक सगे-संबंधियों, मित्रों और सुखों से संपन्न, वैभवशाली, वाहन और सुख-सामग्री से युक्त, सुंदर, धनी और भाग्यशाली होता है।",
        },
        5: {
            english:
                "If Venus is posited in the 5th, the native will be endowed with happiness, sons and friends, be fond of sexual union, be very affluent, full of everything and be a minister, or a justice.",
            hindi: "यदि शुक्र पंचम भाव में हो तो जातक सुखी, पुत्र और मित्रों से युक्त, यौन संबंध का शौकीन, बहुत धनवान, सर्व सुविधा संपन्न, मंत्री या न्यायाधीश होता है।",
        },
        6: {
            english:
                "If Venus occupies the 6th, the native will greatly dislike his wife, will have many foes, be devoid of wealth, be very much startled and be mean.",
            hindi: "यदि शुक्र छठे भाव में हो तो जातक अपनी पत्नी से बहुत घृणा करेगा, उसके अनेक शत्रु होंगे, वह धन से रहित होगा, बहुत अधिक भयभीत होगा तथा नीच होगा।",
        },
        7: {
            english:
                "If Venus occupies the 7th, the native will be very beautiful, be happy with his wife, will enjoy great riches, be devoid of quarrels and be fortunate.",
            hindi: "यदि शुक्र सातवें भाव में हो तो जातक बहुत सुंदर होगा, अपनी पत्नी से खुश रहेगा, बहुत धन-संपत्ति का आनंद उठाएगा, झगड़ों से दूर रहेगा और भाग्यशाली होगा।",
        },
        8: {
            english:
                "If Venus is in the 8th, the native will be long-lived, will enjoy incomparable happiness, be very rich, be equal to a king and moment after moment will feel delighted.",
            hindi: "यदि शुक्र अष्टम भाव में हो तो जातक दीर्घायु, अतुलनीय सुख भोगने वाला, बहुत धनवान, राजा तुल्य तथा क्षण-क्षण प्रसन्न रहने वाला होता है।",
        },
        9: {
            english:
                "If Venus occupies the 9th, the native will possess a spotless and broad physique, be endowed with wealth, charitable, wife, sexual pleasures and friendship and will honour Gods, guests and preceptors/elders.",
            hindi: "यदि शुक्र नवम भाव में हो तो जातक बेदाग और चौड़ा शरीर वाला, धनवान, दानशील, पत्नी, यौन सुख और मित्रता से संपन्न होगा तथा देवताओं, अतिथियों और गुरुओं/बुजुर्गों का सम्मान करने वाला होगा।",
        },
        10: {
            english:
                "Should Venus occupy the 10th, the native will earn success in litigations and will be endowed with happiness, sexual unions, honour, wealth, fame and great wisdom.",
            hindi: "यदि शुक्र दसवें भाव में हो तो जातक को मुकदमेबाजी में सफलता मिलेगी तथा उसे सुख, यौन संबंध, सम्मान, धन, प्रसिद्धि और महान ज्ञान की प्राप्ति होगी।",
        },
        11: {
            english:
                "If Venus is positioned in 11th, the native will have obedient servants, be bereft of all kinds of misery and will gain abundantly.",
            hindi: "यदि शुक्र ग्यारहवें भाव में स्थित हो तो जातक के पास आज्ञाकारी नौकर होंगे, वह सभी प्रकार के दुखों से दूर रहेगा और प्रचुर मात्रा में लाभ प्राप्त करेगा।",
        },
        12: {
            english:
                "Should Venus be in 12th, the native will be indolent, happy, corpulent, fallen in moral sense, will eat cleansed food, will be skillful in providing sleeping comforts and attendants and will be won over by women.",
            hindi: "यदि शुक्र बारहवें भाव में हो तो जातक आलसी, सुखी, स्थूलकाय, नैतिक दृष्टि से पतित, शुद्ध भोजन करने वाला, शयन सुख-सुविधाएं तथा सेवक प्रदान करने में कुशल तथा स्त्रियों द्वारा वशीभूत होगा।",
        },
    },
    Saturn: {
        1: {
            english:
                "If Saturn happens to be in the Ascendant identical with exaltation, or own House, the native will equal a king in status, or will head a country, or city. If Saturn is in the Ascendant in other Rasis, then his own, or exaltation Rasi, the planet will give misery in boyhood, dirty disposition and indolence.",
            hindi: "यदि शनि उच्च राशि या अपने ही भाव के सम लग्न में हो, तो जातक राजा के समान पद का स्वामी होगा, या किसी देश या नगर का शासक होगा। यदि शनि अपनी राशि या उच्च राशि के सम लग्न में हो, तो यह ग्रह बचपन में दुःख, कलुषित स्वभाव और आलस्य प्रदान करेगा।",
        },
        2: {
            english:
                "If Saturn occupies the 2nd, the native will have an ugly face, will enjoy worldly prosperity, be devoid of his own men, will render justice, will later on (in the course of his life) go to other countries and will earn money and conveyances.",
            hindi: "यदि शनि दूसरे भाव में हो तो जातक कुरूप चेहरा वाला, सांसारिक सुख भोगने वाला, अपने लोगों से रहित, न्याय करने वाला, जीवन में आगे चलकर दूसरे देशों में जाकर धन और वाहन अर्जित करने वाला होता है।",
        },
        3: {
            english:
                "If Saturn occupies the 3rd, the native will be dark in complexion, will maintain physical cleanliness, be base, will have indolent attendants, be courageous, charitable and will have great intelligence.",
            hindi: "यदि शनि तीसरे भाव में हो तो जातक श्याम वर्ण, शारीरिक स्वच्छता बनाए रखने वाला, नीच, आलसी सेवक, साहसी, दानशील और महान बुद्धि वाला होगा।",
        },
        4: {
            english:
                "If Saturn occupies the 4th Bhava, the native will suffer heart disease, or be broken-hearted, be devoid of relatives, conveyances, wealth, intelligence and happiness, will suffer sickness in boyhood and will have (prominent) nails and hair.",
            hindi: "यदि शनि चतुर्थ भाव में हो तो जातक हृदय रोग से पीड़ित होगा, या टूटा हुआ हृदय वाला होगा, रिश्तेदारों, वाहन, धन, बुद्धि और सुख से रहित होगा, बचपन में बीमार होगा और उसके नाखून और बाल (प्रमुख) होंगे।",
        },
        5: {
            english:
                "Should Saturn occupy the 5th Bhava, the native will be bereft of happiness, sons, friends, intelligence and kindness, be agitated and be poor.",
            hindi: "यदि शनि पंचम भाव में हो तो जातक सुख, पुत्र, मित्र, बुद्धि और दया से रहित, चिन्तित और दरिद्र होगा।",
        },
        6: {
            english:
                "If Saturn occupies the 6th, the native will be very licentious, be beautiful, courageous, will eat abundantly, be crooked and will conquer many of his enemies.",
            hindi: "यदि शनि छठे भाव में हो तो जातक बहुत विलासी, सुन्दर, साहसी, अधिक भोजन करने वाला, कुटिल स्वभाव का तथा अपने शत्रुओं पर विजय पाने वाला होगा।",
        },
        7: {
            english:
                "If Saturn is posited in the 7th, the native will always be subjected to ill health, will lose his wife, be bereft of wealth, will present himself ugly, be sinful and will do very mean acts.",
            hindi: "यदि शनि सातवें भाव में स्थित हो तो जातक सदैव बीमार रहेगा, अपनी पत्नी को खो देगा, धन से वंचित रहेगा, स्वयं को कुरूप दिखाएगा, पापी होगा तथा बहुत नीच कार्य करेगा।",
        },
        8: {
            english:
                "If Saturn occupies the 8th, the native will suffer from leprosy and fistula in the anus, or pudendum, will have short life and will fail in his undertakings.",
            hindi: "यदि शनि अष्टम भाव में हो तो जातक कुष्ठ रोग से पीड़ित होगा, गुदा में भगन्दर होगा, अल्पायु होगा तथा अपने कार्यों में असफल होगा।",
        },
        9: {
            english:
                "If Saturn occupies the 9th, the native will be devoid of religious merits, will not have much wealth, be bereft of co-born, sons and happiness and will cause sorrow to others.",
            hindi: "यदि शनि नवम भाव में हो तो जातक धार्मिक गुणों से रहित, अधिक धनी नहीं, संतान, पुत्र और सुख से रहित होगा तथा दूसरों को दुःख देने वाला होगा।",
        },
        10: {
            english:
                "If Saturn occupies the 10th, the native will be wealthy, learned, valorous and be a minister, or a justice, or be the leader of a group, city, or village.",
            hindi: "यदि शनि दसवें भाव में हो तो जातक धनवान, विद्वान, पराक्रमी, मंत्री, न्यायाधीश या किसी समूह, शहर या गांव का नेता होगा।",
        },
        11: {
            english:
                "If Saturn occupies the 11th, the native will be long-lived, endowed with lasting riches, be courageous, will have knowledge of arts, be devoid of sickness and be endowed with money, people and wealth.",
            hindi: "यदि शनि ग्यारहवें भाव में हो तो जातक दीर्घायु, स्थायी धन से संपन्न, साहसी, कलाओं का ज्ञाता, रोग रहित तथा धन, जन और संपत्ति से संपन्न होता है।",
        },
        12: {
            english:
                "If Saturn occupies the 12th, the native will be distressed, fallen in moral sense, talkative, will have defective eyesight, be unkind, shameless, will spend much and be insulted.",
            hindi: "यदि शनि बारहवें भाव में हो तो जातक दुःखी, नैतिक दृष्टि से पतित, बातूनी, दृष्टिदोषी, निर्दयी, निर्लज्ज, अधिक व्यय करने वाला एवं अपमानित होगा।",
        },
    },
};
