import type { HouseNumber } from "src/services/constants/Houses";
import type {
    NavagrahaEn,
    Planet,
    PlanetEn,
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
export function getPhalaDeepikaPlanetHouseEffectsYogPhala(
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

/** Planet house effects mapping. This dataset is based on PhalaDeepika. */
export const PlanetHouseEffectTable: Record<
    NavagrahaEn,
    Record<HouseNumber, Translation<string, string>>
> = {
    Sun: {
        1: {
            english:
                "If the Sun be In the 1st house at birth, the native will have scanty hair. He will be lazy, of hot disposition, impetuous and tall In stature. He will have soiled eyes and a lean and thin body. He will be cruel, impatient and valourous.",
            hindi: "यदि जन्म के समय सूर्य प्रथम भाव में हो, तो जातक के बाल कम होंगे। वह आलसी, क्रोधी स्वभाव का, उतावला और लंबा कद का होगा। उसकी आँखें मलिन और शरीर दुबला-पतला होगा। वह क्रूर, अधीर और वीर होगा।",
        },
        2: {
            english:
                "When the Sun is in the 2nd house at birth, the person concerned will be without any learning; he will be shameless and will be stammering.",
            hindi: "जन्म के समय सूर्य दूसरे भाव में हो तो संबंधित व्यक्ति विद्याहीन होगा, वह निर्लज्ज होगा तथा हकलाने वाला होगा।",
        },
        3: {
            english:
                "Should the Sun occupy the 3rd house, the native will be powerful, valiant, wealthy and generous. He will have inimical relations with his kinsmen.",
            hindi: "यदि सूर्य तीसरे भाव में हो तो जातक शक्तिशाली, वीर, धनवान और उदार होगा।उसके अपने सगे-संबंधियों से शत्रुतापूर्ण संबंध होंगे।",
        },
        4: {
            english:
                "If the Sun be in 4th house, the native will be bereft of happiness and comfort, relations, lands, friends and house. He will be in Government service and will squander away his ancestral property.",
            hindi: "यदि सूर्य चतुर्थ भाव में हो तो जातक सुख-सुविधाओं, सम्बन्धियों, भूमि, मित्रों और मकान से वंचित रहेगा। वह सरकारी नौकरी में रहेगा और अपनी पैतृक संपत्ति को नष्ट कर देगा।",
        },
        5: {
            english:
                "When the Sun is in the 5th house from the Ascendant, the person concerned will be short tempered and will be deprived of happiness, wealth and children. He will be intelligent and wander in forest regions.",
            hindi: "लग्न से पंचम भाव में सूर्य होने पर जातक क्रोधी, सुख, धन एवं संतान से वंचित, बुद्धिमान एवं वन प्रदेशों में विचरण करने वाला होता है।",
        },
        6: {
            english:
                "If the Sun be in the 6th house, the native will become a king. He will earn renown and will be equipped with praiseworthy qualities. He will be wealthy and capable of overcoming his enemies.",
            hindi: "यदि सूर्य छठे भाव में हो तो जातक राजा बनेगा। वह यश अर्जित करेगा और प्रशंसनीय गुणों से युक्त होगा। वह धनवान होगा और अपने शत्रुओं पर विजय पाने में सक्षम होगा।",
        },
        7: {
            english:
                "When the Sun is in the 7th at birth, the person concerned will suffer from the wrath of the king. He will have deformed body and will have no wife. He will suffer humiliation from others.",
            hindi: "जन्म के समय सूर्य सप्तम भाव में हो तो जातक राजा के प्रकोप से ग्रस्त होगा। उसका शरीर विकृत होगा, उसकी पत्नी नहीं होगी। उसे दूसरों से अपमान सहना पड़ेगा।",
        },
        8: {
            english:
                "With the Sun in the 8th house, the person born will be deprived of his wealth and friends. He will be short-lived and suffer from defective eyesight. He can be blind also.",
            hindi: "अष्टम भाव में सूर्य होने पर जातक धन और मित्रों से वंचित रहेगा। वह अल्पायु होगा और उसकी दृष्टि कमजोर होगी। वह अंधा भी हो सकता है।",
        },
        9: {
            english:
                "Should the Sun be In 9th house at birth, the person concerned is likely to suffer from the loss of his father, but he will not be deprived of children and relations. He will have due respect foi gods and Brahmins.",
            hindi: "यदि जन्म के समय सूर्य नवम भाव में हो तो जातक को पिता की मृत्यु का कष्ट अवश्य होगा, किन्तु संतान और सम्बन्धियों से वंचित नहीं रहेगा। देवताओं और ब्राह्मणों के प्रति उसका आदर होगा।",
        },
        10: {
            english:
                "With the Sun in the 10th house, the native will be blessed with sons and will enjoy the comfort of conveyances. He will receive praise for his good conduct and will have Intelligence, wealth, strength and fame. He will be a king.",
            hindi: "दसवें भाव में सूर्य होने पर जातक पुत्रों से संपन्न होगा और वाहन सुख का आनंद उठाएगा। उसे अपने अच्छे आचरण के लिए प्रशंसा मिलेगी और उसे बुद्धि, धन, बल और प्रसिद्धि प्राप्त होगी। वह राजा होगा।",
        },
        11: {
            english:
                "The Sun in the 11th house makes the native very wealthy and long lived. He will be a king with ever lasting happiness.",
            hindi: "ग्यारहवें भाव में सूर्य जातक को बहुत धनवान और दीर्घायु बनाता है। वह एक राजा होगा और उसे हमेशा सुख की प्राप्ति होगी।",
        },
        12: {
            english:
                "Should the Sun be in the 12th house at birth the native will have inimical relations with his father. His eyesight will be defective and he will be devoid of wealth and children.",
            hindi: "यदि जन्म के समय सूर्य बारहवें भाव में हो तो जातक के पिता से शत्रुतापूर्ण संबंध होंगे। उसकी दृष्टि कमजोर होगी और वह धन और संतान से रहित होगा।",
        },
    },
    Moon: {
        1: {
            english:
                "If at birth the Moon be waxing and be posited in the first house (the lagna), the native will possess a strong constitution and will be longlived. He will be powerful, fearless and wealthy. The effects will be quite reverse if the Moon be waning.",
            hindi: "यदि जन्म के समय चंद्रमा उदय होकर प्रथम भाव (लग्न) में स्थित हो, तो जातक का शरीर मजबूत और दीर्घायु होगा। वह शक्तिशाली, निडर और धनवान होगा। यदि चंद्रमा क्षीण हो, तो प्रभाव बिल्कुल विपरीत होगा।",
        },
        2: {
            english:
                "If the Moon be posited in the 2nd house, the person born will be a man of learning, sweet in speech and wealthy. He will have a defective limb and be sensuous.",
            hindi: "यदि चन्द्रमा द्वितीय भाव में हो तो जातक विद्वान, मधुर वाणी वाला, धनवान, अंग-दोष युक्त तथा कामुक होता है।",
        },
        3: {
            english:
                "If the Moon be in the 3rd house at birth the person born will have brothers. He will be lascivious, powerful and strong but very miserfy.",
            hindi: "यदि जन्म के समय चंद्रमा तीसरे भाव में हो तो जातक के भाई होंगे। वह कामुक, शक्तिशाली और बलवान होगा, लेकिन बहुत कंजूस होगा।",
        },
        4: {
            english:
                "Should the Moon be placed in the 4th house, the person concerned will be happy, will be indulging in sensual pleasures He will be generous in gifts, will have good friends, will have comforts of conveyances and will enjoy a high reputation (Moon gets Digbala in the 4th).",
            hindi: "यदि चन्द्रमा चतुर्थ भाव में स्थित हो तो व्यक्ति सुखी, विषय-भोगों में लिप्त, दान-पुण्य करने वाला, अच्छे मित्र, वाहन सुख तथा उच्च प्रतिष्ठा वाला होगा। (चन्द्रमा चतुर्थ भाव में दिग्बल युक्त होता है।)",
        },
        5: {
            english:
                "If the Moon be in the 5th house at birth the person will walk gently, will be brilliant and will have good sons. Such a person becomes Minister of a king.",
            hindi: "यदि जन्म के समय चंद्रमा पंचम भाव में हो तो जातक धीरे-धीरे चलता है, प्रतिभाशाली होता है और उसके पुत्र अच्छे होते हैं। ऐसा जातक राजा का मंत्री बनता है।",
        },
        6: {
            english:
                "If the Moon be in the sixth house the person born will be short lived, will be stupid and sufferer of stomach ailments. He will aslo face humiliation.",
            hindi: "यदि चन्द्रमा छठे भाव में हो तो जातक अल्पायु, मूर्ख, उदर रोग से ग्रस्त होता है। उसे अपमान का भी सामना करना पड़ता है।",
        },
        7: {
            english:
                "Should the Moon be housed in the 7th at birth, the person concerned will be beautiful in his looks, and will be loved by a faithful and illustrious wife.",
            hindi: "यदि जन्म के समय चन्द्रमा सप्तम भाव में हो तो संबंधित व्यक्ति सुंदर होगा तथा उसे एक वफादार और प्रतिष्ठित पत्नी का प्यार मिलेगा।",
        },
        8: {
            english:
                "When the Moon occupies the 8th house at birth, the person concerned will be sickly and shortlived.",
            hindi: "जन्म के समय जब चंद्रमा अष्टम भाव में हो तो संबंधित व्यक्ति बीमार और अल्पायु होता है।",
        },
        9: {
            english:
                "Should the Moon happen to be in the 9th house, the person born will be wealthy, virtuous and will be blessed with children.",
            hindi: "यदि चन्द्रमा नवम भाव में हो तो जन्म लेने वाला व्यक्ति धनवान, गुणवान और संतान से संपन्न होगा।",
        },
        10: {
            english:
                "The Moon in 10th house at birth makes the native victorious over his enemies, and achieve success in all his ventures. He will be engaged in pious deeds and will be a supporter of good people.",
            hindi: "जन्म के समय दशम भाव में स्थित चंद्रमा जातक को शत्रुओं पर विजय दिलाता है और सभी कार्यों में सफलता दिलाता है। वह पुण्य कार्यों में संलग्न रहेगा और अच्छे लोगों का समर्थक होगा।",
        },
        11: {
            english:
                "Should the Moon occupy the 11th house at birth, the person concerned will be high minded, longlived and wealthy and will be blessed with children. He will also have comforts of servants.",
            hindi: "यदि जन्म के समय चंद्रमा ग्यारहवें भाव में हो तो जातक उच्च विचार वाला, दीर्घायु, धनवान, संतान सुख से युक्त होगा। साथ ही उसे नौकर-चाकरों का सुख भी प्राप्त होगा।",
        },
        12: {
            english:
                "When the Moon is placed in the 12th house, the native is indolent, humiliated and unhappy. Others have animosity against him.",
            hindi: "जब चन्द्रमा बारहवें भाव में हो तो जातक आलसी, अपमानित और दुखी होता है। दूसरे लोग उससे द्वेष रखते हैं।",
        },
    },
    Mars: {
        1: {
            english:
                "If Mars occupies the 1st house or the Ascendant, the native will be very cruel but valourous. He will be short lived and his body will get bruised.",
            hindi: "यदि मंगल प्रथम भाव या लग्न में हो तो जातक बहुत क्रूर परन्तु पराक्रमी होगा। वह अल्पायु होगा और उसके शरीर पर चोट के निशान होंगे।",
        },
        2: {
            english:
                "When Mars is posited in the 2nd house at birth, the native will not be good looking and will not be clever in speaking. He will have tearing and will be devoid of wealth. He will be serving low people.",
            hindi: "जन्म के समय मंगल दूसरे भाव में स्थित हो तो जातक सुन्दर नहीं होता, बोलने में चतुर नहीं होता, आंसू होते हैं, धनहीन होता है, नीच लोगों की सेवा करता है।",
        },
        3: {
            english:
                "Should Mars be in the 3rd house at birth, the person concerned will be equipped with qualities, will be powerful, happy and brave. He will be not subdued by others. But he will be deprived of the happiness of brothers.",
            hindi: "यदि जन्म कुंडली में मंगल तृतीय भाव में हो तो जातक गुणों से युक्त, पराक्रमी, सुखी एवं वीर होगा। वह दूसरों के अधीन नहीं होगा। किन्तु भाई-बहनों के सुख से वंचित रहेगा।",
        },
        4: {
            english:
                "When Mars is placed in the 4th house, the native will be bereft of mother, friends, happiness, conveyances and lands.",
            hindi: "जब मंगल चौथे भाव में स्थित हो तो जातक माता, मित्रों, सुख, वाहन और भूमि से वंचित रहेगा।",
        },
        5: {
            english:
                "The person concerned will have no children and will face many disasters, should the Mars happen to occupy the 5th house at birth. The native will be a talebearer and without enough intelligence.",
            hindi: "यदि जन्म के समय मंगल पंचम भाव में स्थित हो, तो संबंधित व्यक्ति की कोई संतान नहीं होगी और उसे अनेक विपत्तियों का सामना करना पड़ेगा। जातक चुगलखोर और पर्याप्त बुद्धिहीन होगा।",
        },
        6: {
            english:
                "Should Mars happen to occupy the 6th house at birth, the person concerned will be wealthy, generous, capable of vanquishing his enemies and will have splendour like that of a king. Mars in the 6th makes the native very sensuous.",
            hindi: "यदि जन्म के समय मंगल छठे भाव में स्थित हो, तो जातक धनवान, उदार, शत्रुओं पर विजय पाने में सक्षम और राजा के समान वैभवशाली होता है। छठे भाव में स्थित मंगल जातक को अत्यंत कामुक बनाता है।",
        },
        7: {
            english:
                "When Mars is in the 7th, the person born will indulge in undesirable actions, will be afflicted by diseases and will have a wife who will die prematurely.",
            hindi: "जब मंगल सातवें भाव में हो तो जातक अवांछनीय कार्यों में लिप्त रहेगा, रोगों से ग्रस्त रहेगा तथा उसकी पत्नी की अकाल मृत्यु होगी।",
        },
        8: {
            english:
                "Mars in the 8th house gives the native a diseased body, deprive him of wealth and makes him shortlived and reviled by others.",
            hindi: "अष्टम भाव में स्थित मंगल जातक को रोगी शरीर देता है, धन से वंचित करता है, अल्पायु बनाता है तथा दूसरों द्वारा तिरस्कृत करता है।",
        },
        9: {
            english:
                "Should Mars occupy the 9th house, the native will face animosity from others even if he be a favourite of the king. He will not enjoy the happiness of his father (i.e. he will lose his father prematurely), and will oppress other people.",
            hindi: "यदि मंगल नवम भाव में हो, तो जातक को दूसरों से शत्रुता का सामना करना पड़ेगा, भले ही वह राजा का प्रिय क्यों न हो। उसे अपने पिता का सुख नहीं मिलेगा (अर्थात वह अपने पिता को असमय खो देगा), और वह दूसरों पर अत्याचार करेगा।",
        },
        10: {
            english:
                "If Mars be in the 10th house the person though cruel by nature will be charitable and will be like a king. He will be valiant and will be extolled even by great personalities.",
            hindi: "यदि मंगल दसवें भाव में हो तो जातक स्वभाव से क्रूर होते हुए भी दानशील और राजा के समान होगा। वह वीर होगा और महान व्यक्तियों द्वारा भी उसकी प्रशंसा की जाएगी।",
        },
        11: {
            english:
                "When Mars occupies the 11th house the native will be powerful, wealthy, valourous, of good conduct, and happy.",
            hindi: "जब मंगल ग्यारहवें भाव में हो तो जातक शक्तिशाली, धनवान, पराक्रमी, अच्छे आचरण वाला और सुखी होगा।",
        },
        12: {
            english:
                "Mars in the 12th house makes the native a talebearer and cruel. He will be devoid of wife, and mean by nature. He will suffer from eye diseases.",
            hindi: "बारहवें भाव में स्थित मंगल जातक को चुगलखोर और क्रूर बनाता है। वह पत्नीविहीन और स्वभाव से नीच होगा। उसे नेत्र रोग होंगे।",
        },
    },
    Mercury: {
        1: {
            english:
                "Should Mercury be posited in the 1st house or the lagna, the native will be learned in all Shastras, will be soft spoken and longlived.",
            hindi: "यदि बुध प्रथम भाव या लग्न में स्थित हो तो जातक सभी शास्त्रों का ज्ञाता, मृदुभाषी और दीर्घायु होता है।",
        },
        2: {
            english:
                "If Mercury happens to occupy the 2nd house at birth the person earns his livelihood by his intelligence. He will compose poems and will be cultured in his speech. He will get sweetish preparations to eat.",
            hindi: "यदि जन्म के समय बुध दूसरे भाव में स्थित हो तो जातक अपनी बुद्धि से आजीविका कमाता है। वह कविताएँ लिखता है और वाणी में सुसंस्कृत होता है। उसे खाने में मीठे व्यंजन मिलते हैं।",
        },
        3: {
            english:
                "If Mercury be in the 3rd house, the person born will be brave but will have a medium span of life. He will have good brothers and sisters, but he will suffer from fatigue and be dejected.",
            hindi: "यदि बुध तीसरे भाव में हो तो जातक साहसी होगा, लेकिन उसका जीवनकाल मध्यम होगा। उसके भाई-बहन अच्छे होंगे, लेकिन वह थका हुआ और उदास रहेगा।",
        },
        4: {
            english:
                "When Mercury occupies the 4th house, the person born will be learned and witty. He will be possessed of friends, wealth and happiness.",
            hindi: "जब बुध चतुर्थ भाव में हो, तो जन्म लेने वाला व्यक्ति विद्वान और बुद्धिमान होता है। वह मित्रों, धन और सुख से युक्त होता है।",
        },
        5: {
            english:
                "With Mercury in the 5th, the native will be learned, happy and courageous. He will be blessed with children and will be well versed in Mantras.",
            hindi: "पंचम भाव में बुध होने पर जातक विद्वान, सुखी और साहसी होगा। उसे संतान सुख प्राप्त होगा और वह मंत्र विद्या में पारंगत होगा।",
        },
        6: {
            english:
                "Should Mercury happen to occupy 6th house, the native will be indolent, harsh in speech and will be capable of overcoming his enemies. He will become adament when people enter into arguments with him.",
            hindi: "यदि बुध छठे भाव में हो तो जातक आलसी, वाणी में कठोर और शत्रुओं पर विजय पाने में सक्षम होगा। जब लोग उससे बहस करेंगे तो वह अड़ जाएगा।",
        },
        7: {
            english:
                "Mercury occupying the 7th house makes the native learned, decently dressed. He will have all greatness and a wealthy woman as his wife.",
            hindi: "सप्तम भाव में बुध होने से जातक विद्वान और शालीन वेशभूषा वाला होता है। वह महान होगा और उसकी पत्नी एक धनी स्त्री होगी।",
        },
        8: {
            english:
                "When Mercury is in the 8th house at birth the person concerned will be widely renowned and longlived. He will be the supporter of his family, a lord and a commander of army.",
            hindi: "जन्म के समय बुध अष्टम भाव में हो तो जातक यशस्वी एवं दीर्घायु होता है। वह अपने परिवार का हितैषी, सेनापति एवं सेनापति होता है।",
        },
        9: {
            english:
                "With the Mercury occupying the 9th house, the native will be learned, wealthy, religious minded and observer of virtuous conduct. He will be well versed in everything and will not be reserved in speaking.",
            hindi: "नवम भाव में बुध के होने से जातक विद्वान, धनवान, धार्मिक प्रवृत्ति का और सदाचारी होगा। वह हर विषय में पारंगत होगा और बोलने में संकोच नहीं करेगा।",
        },
        10: {
            english:
                "If Mercury be posited in the 10th house at birth, the native will be learned, powerful, wise, happy, virtuous and will stick to his word. He will be successful from the very beginning in all his ventures.",
            hindi: "यदि जन्म के समय बुध दसवें भाव में स्थित हो, तो जातक विद्वान, पराक्रमी, बुद्धिमान, सुखी, गुणी और अपनी बात का पक्का होगा। वह अपने सभी कार्यों में शुरू से ही सफल होगा।",
        },
        11: {
            english:
                "Should Mercury occupy the 11th house, the person will be longlived. He will keep his word, and will be very wealthy and nappy. He will enjoy the comforts of servants.",
            hindi: "यदि बुध ग्यारहवें भाव में हो तो जातक दीर्घायु होता है। वह अपनी बात का पक्का होता है, बहुत धनवान और लंगोट वाला होता है। उसे नौकरों का सुख मिलता है।",
        },
        12: {
            english:
                "Mercury in the 12th makes the native poor and helpless, indolent and cruel and without any education. He will also suffer from humiliation.",
            hindi: "बारहवें भाव में बुध होने पर जातक दरिद्र, असहाय, आलसी, क्रूर और अशिक्षित होता है। उसे अपमान भी सहना पड़ता है।",
        },
    },
    Jupiter: {
        1: {
            english:
                "If Jupiter be in Ascendant at birth, the person concerned will be handsome and attractive, virtuous, longlived and fearless. He will be blessed with the grace of God.",
            hindi: "यदि जन्म के समय बृहस्पति लग्न में हो तो जातक सुन्दर, आकर्षक, गुणवान, दीर्घायु एवं निर्भीक होता है। उस पर ईश्वर की कृपा बनी रहती है।",
        },
        2: {
            english:
                "Should Jupiter occupy the 2nd house at birth, the person concerned will be learned and wealthy, will possess a beautiful face and will be eloquent in speech. He will enjoy food of high standard.",
            hindi: "यदि जन्म के समय बृहस्पति दूसरे भाव में हो तो व्यक्ति विद्वान और धनवान होगा, उसका चेहरा सुंदर होगा, वाणी में निपुणता होगी तथा वह उच्च स्तर के भोजन का आनंद लेगा।",
        },
        3: {
            english:
                "If Jupiter be placed in the 3rd house, the person born will be sinful, wicked and miserly He will suffer humiliation but one of his brothers will attain a position of honour and will be renowned.",
            hindi: "यदि बृहस्पति तीसरे भाव में स्थित हो तो जन्म लेने वाला व्यक्ति पापी, दुष्ट और कंजूस होगा। उसे अपमान सहना पड़ेगा लेकिन उसके भाइयों में से एक को सम्मान का पद मिलेगा और वह प्रसिद्ध होगा।",
        },
        4: {
            english:
                "With Jupiter posited in the 4th, person will be happy and will live with mother, friends, sons and servants. He will have plenty of grains.",
            hindi: "चतुर्थ भाव में बृहस्पति होने पर जातक सुखी, माता, मित्रों, पुत्रों एवं नौकरों के साथ रहने वाला होता है। उसके पास प्रचुर मात्रा में अन्न होता है।",
        },
        5: {
            english:
                "Should Jupiter be in the 5th house, the native will suffer from distress from sons (children). He will be learned and a minister of the king.",
            hindi: "यदि बृहस्पति पंचम भाव में हो तो जातक पुत्रों से कष्ट पाता है। वह विद्वान और राजा का मंत्री होता है।",
        },
        6: {
            english:
                "If Jupiter occupies the 6th house at birth, the native will destroy his enemies but he will be lazy and will be humiliated. He will be clever and well versed in the recitation and utility of Mantras.",
            hindi: "यदि जन्म के समय बृहस्पति छठे भाव में हो तो जातक अपने शत्रुओं का नाश करने वाला, आलसी और अपमानित होगा। वह चतुर और मंत्रों के जाप और प्रयोग में पारंगत होगा।",
        },
        7: {
            english:
                "When Jupiter is posited in 7th house at birth, the native will be blessed with a decent wife and children. He will be handsome and more liberal than his father.",
            hindi: "जन्म के समय बृहस्पति सप्तम भाव में स्थित हो तो जातक को उत्तम पत्नी और संतान की प्राप्ति होती है। वह सुंदर और अपने पिता से अधिक उदार होता है।",
        },
        8: {
            english:
                "With Jupiter in the 8th house at birth, the native will be poor and helpless and earns his livelihood through servants or menials. He will indulge in mean action, but will be longlived.",
            hindi: "जन्म के समय बृहस्पति अष्टम भाव में हो तो जातक निर्धन और असहाय होगा तथा नौकरों या छोटे-मोटे कामों से अपनी आजीविका चलाएगा। वह नीच कर्मों में लिप्त रहेगा, लेकिन दीर्घायु होगा।",
        },
        9: {
            english:
                "If Jupiter be in 9th house at birth, the native, will be wealthy and will be blessed with sons (children). He will be famous and will be eager to perform virtuous deeds and religious rites. He will become a minister of the king.",
            hindi: "यदि जन्म के समय बृहस्पति नवम भाव में हो, तो जातक धनवान और पुत्रवान होगा। वह प्रसिद्ध होगा और पुण्य कर्म और धार्मिक अनुष्ठान करने में तत्पर रहेगा। वह राजा का मंत्री बनेगा।",
        },
        10: {
            english:
                "Should Jupiter be occupying the 10th house at birth, the native will be very wealthy and a favourite of the king. Be earns a high reputation and is virtuous.",
            hindi: "यदि जन्म के समय बृहस्पति दसवें भाव में स्थित हो, तो जातक बहुत धनवान और राजा का प्रिय होता है। वह उच्च प्रतिष्ठा प्राप्त करता है और गुणवान होता है।",
        },
        11: {
            english:
                "Jupiter in 11th house at birth makes the native wealthy, longlived and fearless. He gets few children; but enjoys the comforts of conveyances.",
            hindi: "जन्म के समय ग्यारहवें भाव में स्थित बृहस्पति जातक को धनवान, दीर्घायु और निडर बनाता है। उसे संतान कम होती है; लेकिन वाहन सुख का आनंद मिलता है।",
        },
        12: {
            english:
                "When Jupiter occupies the 12th house, the native will earn animosity ol others, and will himself use abusive language. He will be childless , sinful, indolent and a person who serves others.",
            hindi: "जब बृहस्पति बारहवें भाव में हो, तो जातक दूसरों से द्वेष रखेगा और स्वयं भी अपशब्दों का प्रयोग करेगा। वह निःसंतान, पापी, आलसी और दूसरों की सेवा करने वाला होगा।",
        },
    },
    Venus: {
        1: {
            english:
                "If Venus be posited in the lagna at birth, the native will have a beautiful and attractive body, and will be happy and longlived.",
            hindi: "यदि जन्म के समय शुक्र लग्न में स्थित हो तो जातक सुंदर और आकर्षक शरीर वाला होगा, तथा सुखी और दीर्घायु होगा।",
        },
        2: {
            english:
                "Should Venus occupy the 2nd house at birth, the native will be a poet and will enjoy riches of various kinds.",
            hindi: "यदि जन्म के समय शुक्र दूसरे भाव में स्थित हो तो जातक कवि होगा तथा विभिन्न प्रकार की सम्पत्तियों का आनंद उठाएगा।",
        },
        3: {
            english:
                "If Venus be In the 3rd house at birth, the native will be miserly, unpopular, devoid of wealth, happiness and wife.",
            hindi: "यदि जन्म के समय शुक्र तीसरे भाव में हो तो जातक कंजूस, अलोकप्रिय, धन, सुख और पत्नी से रहित होगा।",
        },
        4: {
            english:
                "With Venus occupying the 4th house, the person born, the native will be endowed with good conveyances, a decent house, ornaments, clothes and scents.",
            hindi: "चतुर्थ भाव में शुक्र के होने से जातक को अच्छे वाहन, अच्छा मकान, आभूषण, वस्त्र और सुगंध की प्राप्ति होती है।",
        },
        5: {
            english:
                "When Venus be in the 5th house at birth, the native will be endowed with wealth and will be as influential and renowned as a king. He will be learned and will be blessed with the happiness of children.",
            hindi: "जन्म के समय शुक्र पंचम भाव में हो तो जातक धनवान, राजा के समान प्रभावशाली और यशस्वी होगा। वह विद्वान होगा और उसे संतान सुख की प्राप्ति होगी।",
        },
        6: {
            english:
                "With Venus posited in the 6th house at birth, the native will have no enemies, but he will be devoid of wealth. He will develop ilicit relations with several young girls, but will not enjoy happiness.",
            hindi: "जन्म के समय शुक्र छठे भाव में स्थित हो तो जातक का कोई शत्रु नहीं होगा, परन्तु वह धन से रहित होगा। वह कई युवतियों से अवैध संबंध बनाएगा, परन्तु सुख का आनंद नहीं ले पाएगा।",
        },
        7: {
            english:
                "Should Venus be placed in 7th house at birth, the native will enjoy the company of a faithful and beautiful wife and he may lose his wife. He will be wealthy and will have intrigues with bad women.",
            hindi: "यदि जन्म के समय शुक्र सप्तम भाव में स्थित हो, तो जातक को एक वफादार और सुंदर पत्नी का साथ मिलेगा और वह अपनी पत्नी को खो भी सकता है। वह धनवान होगा और बुरी स्त्रियों से उसके संबंध होंगे।",
        },
        8: {
            english:
                "Venus posited in the 8th house at birth, will make the native wealthy, longlived and a landlord.",
            hindi: "जन्म के समय अष्टम भाव में स्थित शुक्र जातक को धनवान, दीर्घायु और जमींदार बनाता है।",
        },
        9: {
            english:
                "If Venus occupies the 9th house at birth, the native will draw his fortune through the beneficience of the king. He will be blessed with wife, sons and friends.",
            hindi: "यदि जन्म के समय शुक्र नवम भाव में हो, तो जातक राजा की कृपा से भाग्योदय करेगा। उसे पत्नी, पुत्र और मित्रों का आशीर्वाद प्राप्त होगा।",
        },
        10: {
            english:
                "With Venus occupying the 10th house at birth, the native will perform virtuous deeds. He will enjoy happiness from friends, will be greatly honoured, will enjoy high reputation and will attain a high status.",
            hindi: "जन्म के समय शुक्र के दसवें भाव में स्थित होने पर जातक पुण्य कर्म करने वाला होगा। उसे मित्रों से सुख मिलेगा, बहुत सम्मान मिलेगा, उच्च प्रतिष्ठा प्राप्त होगी और उच्च पद की प्राप्ति होगी।",
        },
        11: {
            english:
                "Should Venus occupy the 11th house at birth, the native will be wealthy, but will have connections with other peoples wives. He will enjoy all kinds of happiness.",
            hindi: "यदि जन्म के समय शुक्र ग्यारहवें भाव में हो, तो जातक धनवान होगा, लेकिन अन्य लोगों की पत्नियों से उसके संबंध होंगे। वह सभी प्रकार के सुखों का आनंद लेगा।",
        },
        12: {
            english:
                "If Venus occupies the 12th house at birth, the native will enjoy sexual relationships with many women (bed comforts). He will be rich and prosperous.",
            hindi: "यदि जन्म के समय शुक्र बारहवें भाव में हो, तो जातक अनेक स्त्रियों से यौन संबंध (शयन सुख) का आनंद उठाएगा। वह धनवान और समृद्ध होगा।",
        },
    },
    Saturn: {
        1: {
            english:
                "If at birth Saturn is in the Ascendant in his sign of exaltation (Libra) or in his own sign (Capricorn and Aquarius), the person concerned will be equal to the king, a chief or mayor of a city. If Saturn be in the Ascendant in any other sign, the native will suffer from sorrow and misery from his very childhood and will be poverty stricken. He will be living shabbily and will be inactive.",
            hindi: "यदि जन्म के समय शनि लग्न में अपनी उच्च राशि (तुला) या स्वराशि (मकर या कुंभ) में हो, तो जातक राजा, सरदार या नगर के महापौर के समान होता है। यदि शनि लग्न में किसी अन्य राशि में हो, तो जातक बचपन से ही दुःख और कष्टों से ग्रस्त रहेगा और दरिद्र रहेगा। उसका जीवन दरिद्र और निष्क्रिय रहेगा।",
        },
        2: {
            english:
                "Should Saturn be in the 2nd house at birth, the face of the native will be unattractive. He will not take the righteous path and will be devoid of wealth but in the latter part of his life he will quit his native place and will then possess wealth, conveyance and all enjoyments of life.",
            hindi: "यदि जन्म के समय शनि दूसरे भाव में हो तो जातक का चेहरा बदसूरत होगा। वह धर्म का मार्ग नहीं अपनाएगा और धन से वंचित रहेगा, लेकिन जीवन के उत्तरार्ध में वह अपना मूल स्थान छोड़ देगा और फिर धन, वाहन और जीवन के सभी सुखों से संपन्न होगा।",
        },
        3: {
            english:
                "If Saturn should happen to occupy the 3rd house at birth, the native will be very intelligent, wise and liberal and will live with his wife. However, he will be indolent and unhappy.",
            hindi: "यदि जन्म के समय शनि तीसरे भाव में स्थित हो, तो जातक बहुत बुद्धिमान, ज्ञानी और उदार होगा तथा अपनी पत्नी के साथ रहेगा। हालाँकि, वह आलसी और दुखी रहेगा।",
        },
        4: {
            english:
                "If Saturn be in the 4th house at birth, the native will be bereft of house, respect and mother. He will be sickly in his childhood. He will also be unhappy.",
            hindi: "यदि जन्म के समय शनि चतुर्थ भाव में हो तो जातक घर, मान-सम्मान और माता से वंचित रहेगा। वह बचपन में बीमार रहेगा। वह दुखी भी रहेगा।",
        },
        5: {
            english:
                "If Saturn occupied the 5th house the person concerned will be evil minded and wicked. He will be bereft of learning, children, wealth and happiness. He roams about aimlessly.",
            hindi: "यदि शनि पंचम भाव में हो तो जातक दुष्ट बुद्धि वाला और दुष्ट होगा। वह विद्या, संतान, धन और सुख से वंचित रहेगा। वह निरर्थक भटकता रहेगा।",
        },
        6: {
            english:
                "Should Saturn occupy the 6th house at birth, the person concerned will be glutton, wealthy and will vanquish his enemies. He will also be arrogant.",
            hindi: "यदि जन्म के समय शनि छठे भाव में हो तो जातक पेटू, धनवान, शत्रुओं पर विजय पाने वाला तथा अहंकारी होगा।",
        },
        7: {
            english:
                "When at birth Saturn is posited in the 7th house, the native develops relations with women of questionable character. He will be poverty stricken, a wanderer and unhappy.",
            hindi: "जन्म के समय शनि सप्तम भाव में स्थित हो तो जातक संदिग्ध चरित्र वाली स्त्रियों से संबंध बनाता है। वह दरिद्र, भ्रमणशील और दुखी होता है।",
        },
        8: {
            english:
                "Saturn occupying the 8th house at birth will make the native unclean afflicted with piles, devoid of wealth, of cruel disposition, hungry and will be avoided by his friends.",
            hindi: "जन्म के समय शनि का अष्टम भाव में स्थित होना जातक को अशुद्ध, बवासीर से पीड़ित, धनहीन, क्रूर स्वभाव वाला, भूखा बनाता है तथा उसके मित्र उससे दूर रहते हैं।",
        },
        9: {
            english:
                "Should Saturn occupy the 9th house, the native will be devoid of good fortune, wealth, children father and will be irreligious. He will also be wicked.",
            hindi: "यदि शनि नवम भाव में हो तो जातक सौभाग्य, धन, संतान, पिता से रहित होगा, अधार्मिक होगा तथा दुष्ट भी होगा।",
        },
        10: {
            english:
                "Saturn in 10th house enables the native to be king or equal to the king. He will be valiant, renowned and will be engaged in agricultural pursuits.",
            hindi: "दसवें भाव में शनि जातक को राजा या राजा के समान पद प्रदान करता है। वह वीर, यशस्वी और कृषि कार्यों में संलग्न होगा।",
        },
        11: {
            english:
                "Saturn in the 11th makes the native devoid of ill health and enables him lasting income and wealth.",
            hindi: "ग्यारहवें भाव में शनि होने से जातक को स्वास्थ्य संबंधी परेशानियों से मुक्ति मिलती है तथा उसे स्थायी आय और धन प्राप्त होता है।",
        },
        12: {
            english:
                "Should Saturn occupy the 12th house at birth, the native will be impudent, poor, childless, defective of some limb, stupid and defeated by his enemies.",
            hindi: "यदि जन्म के समय शनि बारहवें भाव में हो तो जातक निर्लज्ज, दरिद्र, संतानहीन, किसी अंग से दोषयुक्त, मूर्ख और शत्रुओं से पराजित होगा।",
        },
    },
    Rahu: {
        1: {
            english:
                "When Rahu is in the occupaton of the 1st house at birth, the native will be shortlived, wealthy and strong and suffer from diseases in the higher limbs (Face, head etc.).",
            hindi: "जब जन्म के समय राहु प्रथम भाव में स्थित हो तो जातक अल्पायु, धनवान, बलवान होता है तथा ऊपरी अंगों (चेहरे, सिर आदि) में रोगों से पीड़ित होता है।",
        },
        2: {
            english:
                "The person who has Rahu in the 2nd house at birth, will be insincere in speech and his words will carry double meaning. He will suffer from disease of the mouth or the face. He will be tender hearted and will receive wealth through the beneficence of the king. He will be of an angry disposition and happy.",
            hindi: "जिस व्यक्ति की जन्म कुंडली के दूसरे भाव में राहु हो, वह वाणी में असत्य और दोहरे अर्थ वाली बातें करने वाला होगा। उसे मुख या चेहरे का रोग होगा। वह कोमल हृदय वाला होगा और राजा की कृपा से धन प्राप्त करेगा। वह क्रोधी स्वभाव का और प्रसन्नचित्त होगा।",
        },
        3: {
            english:
                "When Rahu is in the 3rd house at birth, the native will be proud, inimical towards his co-born, wealthy, longlived and strongwilled.",
            hindi: "जन्म के समय जब राहु तीसरे भाव में हो तो जातक अभिमानी, सहजन्म से शत्रुता रखने वाला, धनवान, दीर्घायु और दृढ़ इच्छाशक्ति वाला होता है।",
        },
        4: {
            english:
                "With Rahu in the 4th house at birth, the native will have a short span of life and will be seldom happy.",
            hindi: "जन्म के समय राहु यदि चौथे भाव में हो तो जातक का जीवन छोटा होगा तथा वह कभी भी खुश नहीं रहेगा।",
        },
        5: {
            english:
                "When Rahu occupies the 5th house at birth, the native will have nasal touch in his speech. He will be childless, hard hearted and will suffer from pain in the stomach.",
            hindi: "जन्म के समय राहु पंचम भाव में हो तो जातक की वाणी में नासिका स्पर्श होगा, वह निःसंतान, कठोर हृदय वाला तथा पेट दर्द से पीड़ित होगा।",
        },
        6: {
            english:
                "Should Rahu occupy the 6th house at birth, the native will be troubled by the enemies and will be oppressed by malefic planets. He will be wealthy and longlived and will suffer from ulcer in the anus.",
            hindi: "यदि जन्म के समय राहु छठे भाव में हो, तो जातक शत्रुओं से परेशान और पाप ग्रहों से पीड़ित होगा। वह धनवान और दीर्घायु होगा तथा गुदा में अल्सर से पीड़ित होगा।",
        },
        7: {
            english:
                "Rahu in the 7th house at birth makes the person concerned independent, but without intelligence. He squanders away his money by associating with women. He will become a widower and also impotent.",
            hindi: "जन्म के समय सप्तम भाव में राहु होने पर जातक स्वतंत्र, किन्तु बुद्धिहीन होता है। वह स्त्रियों के साथ संबंध बनाकर अपना धन नष्ट करता है। वह विधुर और नपुंसक भी हो सकता है।",
        },
        8: {
            english:
                "If Rahu be posited in the 8th house the native will become miserable, will suffer from rheumatism, will have few children and will indulge in impure actions.",
            hindi: "यदि राहु आठवें भाव में स्थित हो तो जातक दुखी होगा, गठिया रोग से पीड़ित होगा, उसकी संतान कम होगी और वह अशुद्ध कार्यों में लिप्त रहेगा।",
        },
        9: {
            english:
                "If Rahu occupies the 9th house at birth, the native will be harsh in speech and will indulge in unrighteous actions but he will become head of a clan, city or a village.",
            hindi: "यदि जन्म के समय राहु नवम भाव में हो तो जातक कठोर वाणी वाला होगा तथा अधर्म कार्यों में लिप्त रहेगा, लेकिन वह किसी कुल, नगर या गांव का मुखिया बनेगा।",
        },
        10: {
            english:
                "If Rahu be in the 10th house, the person born will have a limited number of issues, engaged in working for others, will not perform any rightful deeds, will be fearless and famous.",
            hindi: "यदि राहु दसवें भाव में हो तो जन्म लेने वाला व्यक्ति सीमित संख्या में संतान उत्पन्न करने वाला, दूसरों के लिए काम करने वाला, कोई भी उचित कार्य न करने वाला, निडर और प्रसिद्ध होगा।",
        },
        11: {
            english:
                "With Rahu occupying the 11th house at birth, the native will be wealthy and longlived, will have a limited number of issues, and will suffer from some disease of the ear.",
            hindi: "जन्म के समय राहु के ग्यारहवें भाव में स्थित होने पर जातक धनवान और दीर्घायु होगा, उसे सीमित संख्या में समस्याएं होंगी तथा कान के किसी रोग से पीड़ित होगा।",
        },
        12: {
            english:
                "Rahu in the 12th house at birth makes a man squanderer of money, will indulge in sinful deeds and suffer from diseases like dropsy etc.",
            hindi: "जन्म के समय 12वें भाव में राहु होने पर व्यक्ति धन का अपव्यय करने वाला, पाप कर्मों में लिप्त रहने वाला तथा जलोदर आदि रोगों से ग्रस्त होता है।",
        },
    },
    Ketu: {
        1: {
            english:
                "When Ketu occupies the 1st house or the Ascendant, the person born will be ungrateful, unhappy and tale bearer, will associate with unsociable elements, deformed in his body, fallen from position and outcaste.",
            hindi: "जब केतु प्रथम भाव या लग्न में हो तो जन्म लेने वाला व्यक्ति कृतघ्न, दुखी और चुगलखोर होगा, असामाजिक तत्वों से संबंध रखेगा, शरीर में विकृति होगी, पद से गिरा हुआ होगा और जाति से बहिष्कृत होगा।",
        },
        2: {
            english:
                "With Ketu in the 2nd house at birth, the native will be bereft of learning and will have a harsh manner of speaking. He will have a sinister look and be dependent for food on others.",
            hindi: "जन्म के समय केतु दूसरे भाव में होने पर जातक विद्याहीन और कठोर वाणी वाला होगा। उसका रूप भयावह होगा और वह भोजन के लिए दूसरों पर निर्भर रहेगा।",
        },
        3: {
            english:
                "Should Ketu occupy the 3rd house at birth, the native will be longlived, powerful and renowned. He will live happily with his wife and will eat good food; but he will be deprived of a brother.",
            hindi: "यदि जन्म के समय केतु तीसरे भाव में हो तो जातक दीर्घायु, शक्तिशाली और यशस्वी होगा। वह अपनी पत्नी के साथ सुखपूर्वक रहेगा और उत्तम भोजन करेगा; किन्तु उसे भाई नहीं मिलेगा।",
        },
        4: {
            english:
                "With Ketu occupying the 4th house at birth, the native will live in another mans house and will lose his lands, mother and happiness. He will be forced to leave his native land.",
            hindi: "जन्म के समय केतु चतुर्थ भाव में स्थित होने पर जातक दूसरे के घर में रहेगा और अपनी भूमि, माता और सुख से वंचित रहेगा। उसे अपनी जन्मभूमि छोड़ने के लिए मजबूर होना पड़ेगा।",
        },
        5: {
            english:
                "Ketu in the 5th house at a persons birth deprives the native of his children. He will be evil minded and will be oppressed by goblins (evil spirits).",
            hindi: "किसी व्यक्ति के जन्म के समय पंचम भाव में स्थित केतु जातक को संतान से वंचित रखता है। वह दुष्ट स्वभाव का होगा और भूत-प्रेतों से पीड़ित होगा।",
        },
        6: {
            english:
                "If Ketu occupies the 6th house at birth, the native will be magnanimous, full of best qualities, firm, renowned and will be vested with high authority. He will vanquish his enemies and will be successful in obtaining Ishta Siddhi.",
            hindi: "यदि जन्म के समय केतु छठे भाव में हो तो जातक उदार, उत्तम गुणों से युक्त, दृढ़निश्चयी, यशस्वी और उच्च पदस्थ होगा। वह अपने शत्रुओं पर विजय प्राप्त करेगा और इष्ट सिद्धि प्राप्त करने में सफल होगा।",
        },
        7: {
            english:
                "Ketus occupation of the 7th house at birth will make the native suffer humiliation. He will associate with fallen women and will be separated from his own wife. He will suffer from diseases of the bowels and may lose his potency.",
            hindi: "जन्म के समय सप्तम भाव में केतु का अधिपत्य जातक को अपमान का सामना कराएगा। वह पतित स्त्रियों के साथ संगति करेगा और अपनी पत्नी से अलग हो जाएगा। उसे आंतों के रोग होंगे और उसकी शक्ति क्षीण हो सकती है।",
        },
        8: {
            english:
                "With Ketu occupying the 8th house at birth, the native will suffer from separation from his nears and dears. He will be quarrelsome and shortlived. He will get injury from some weapon and will be unsuccessful in all his ventures.",
            hindi: "जन्म के समय केतु के अष्टम भाव में स्थित होने पर जातक को अपने प्रियजनों से वियोग का कष्ट होगा। वह झगड़ालू और अल्पायु होगा। उसे किसी हथियार से चोट लगेगी और वह अपने सभी कार्यों में असफल रहेगा।",
        },
        9: {
            english:
                "Ketu In the 9th house at birth, makes the native indulge in sinful and unrighteous actions. He will be deprived of his father, will be unfortunate, poverty stricken and will defame others.",
            hindi: "जन्म के समय नवम भाव में स्थित केतु जातक को पाप और अधर्म के कार्यों में लिप्त बनाता है। वह पिता से वंचित, दुर्भाग्यशाली, दरिद्र और दूसरों की निंदा करने वाला होता है।",
        },
        10: {
            english:
                "If Ketu occupies the 10th house at a persons birth, he will face obstacles in performing good acts. He will be impure and indulge in wicked actions. He will be very bold and famous for his valor.",
            hindi: "यदि किसी व्यक्ति के जन्म के समय केतु दसवें भाव में हो, तो उसे अच्छे कार्यों में बाधाओं का सामना करना पड़ेगा। वह अशुद्ध होगा और बुरे कार्यों में लिप्त रहेगा। वह बहुत साहसी और अपनी वीरता के लिए प्रसिद्ध होगा।",
        },
        11: {
            english:
                "If Ketu should occupy the 11th house, the person born will accumulate wealth and will be equipped with good qualities. He will enjoy himself and all items of luxuries and comforts will be available to him. He will achieve success in all his undertakings.",
            hindi: "यदि केतु ग्यारहवें भाव में हो, तो जातक धन-संपत्ति अर्जित करेगा और अच्छे गुणों से युक्त होगा। वह सुख-सुविधाओं से भरपूर होगा और उसे सभी सुख-सुविधाएँ उपलब्ध होंगी। वह अपने सभी कार्यों में सफलता प्राप्त करेगा।",
        },
        12: {
            english:
                "When Ketu occupies the 12th house at birth, the native will commit sinful acts secretly. He will squander away all his money for undesirable purposes. He will destroy his wealth and take to forbidden conduct. He will suffer from diseases of the eyes.",
            hindi: "जन्म के समय केतु के बारहवें भाव में होने पर जातक गुप्त रूप से पाप कर्म करेगा। वह अपना सारा धन अनुचित कार्यों में बर्बाद कर देगा। वह अपनी संपत्ति नष्ट कर देगा और निषिद्ध आचरण करेगा। उसे नेत्र रोग होंगे।",
        },
    },
};
