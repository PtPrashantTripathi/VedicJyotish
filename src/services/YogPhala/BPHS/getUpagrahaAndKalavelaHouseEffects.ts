import type { HouseNumber } from "src/services/constants/Houses";
import type {
    KalavelasEn,
    NavagrahaEn,
    Planet,
    PlanetEn,
    UpagrahaEn,
} from "src/services/constants/Planet";
import type { Translation } from "src/services/types";
import type { Phala } from "src/services/YogPhala";

/**
 * Retrieves house effect descriptions for each planet or upagraha based on its
 * current house position.
 *
 * @param planetaryPositions - All planetary data keyed by English planet name.
 * @returns An array of rules containing the description and effect for each.
 */
export function getBPHSUpagrahaAndKalavelaHouseEffectsYogPhala(
    planetaryPositions: Record<PlanetEn, Planet>
): Phala[] {
    return Object.entries(PlanetHouseEffectTable).map(
        ([grahaName, houseEffectMap]) => {
            const grahaData = planetaryPositions[grahaName as NavagrahaEn];
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

/**
 * Planet and shadow planet house effects mapping. This dataset is based on
 * BPHS.
 */
export const PlanetHouseEffectTable: Record<
    UpagrahaEn | Exclude<KalavelasEn, "Kaala" | "Mrityu" | "Ardhaprahara">,
    Record<HouseNumber, Translation<string, string>>
> = {
    Dhuma: {
        1: {
            english:
                "If Dhuma is in Ascendant, the native will be valiant, endowed with beautiful eyes, stupefied in disposition, unkind, wicked and highly short-tempered.",
            hindi: "यदि धूम लग्न में हो तो जातक वीर, सुन्दर नेत्रों वाला, स्तब्ध स्वभाव वाला, निर्दयी, दुष्ट एवं अत्यंत क्रोधी होता है।",
        },
        2: {
            english:
                "If Dhuma is in Dhana Bhava, the native will be sickly, wealthy, devoid of a limb, will incur humiliation at royal level, be dull witted and be a eunuch.",
            hindi: "यदि धूम धन भाव में हो तो जातक रोगी, धनवान, अंगहीन, राजसी स्तर पर अपमानित, मंदबुद्धि और नपुंसक होता है।",
        },
        3: {
            english:
                "Dhuma is in Sahaja Bhava, the native will be intelligent, very bold, delighted, eloquent and be endowed with men and wealth.",
            hindi: "धूम सहज भाव में हो तो जातक बुद्धिमान, बहुत साहसी, प्रसन्न, वाक्पटु तथा धन-संपत्ति से संपन्न होगा।",
        },
        4: {
            english:
                "If Dhuma is in Bandhu Bhava, the native will be grieved on account of being given up by his female, but will be learned in all Shastras.",
            hindi: "यदि धूम बंधु भाव में हो तो जातक अपनी स्त्री द्वारा त्याग दिए जाने के कारण दुःखी होगा, लेकिन सभी शास्त्रों का ज्ञाता होगा।",
        },
        5: {
            english:
                "If Dhuma is in Putra Bhava, the native will have limited progeny, be devoid of wealth, be great, will eat anything and be bereft of friends and Mantras.",
            hindi: "यदि धूमा पुत्र भाव में हो तो जातक अल्प संतान वाला, धनहीन, महान, कुछ भी खाने वाला, मित्रों और मंत्रों से रहित होता है।",
        },
        6: {
            english:
                "If Dhuma is in Ari Bhava, the native will be strong, will conquer his enemies, be very brilliant, famous and free from diseases.",
            hindi: "यदि धूम अरि भाव में हो तो जातक बलवान, शत्रुओं पर विजय पाने वाला, अत्यंत तेजस्वी, प्रसिद्ध एवं रोगों से मुक्त होगा।",
        },
        7: {
            english:
                "If Dhuma is in Yuvati Bhava, the native will be penniless, be ever sensuous, skilful in going to others females and be always devoid of brilliance.",
            hindi: "यदि धूमा युवती भाव में हो तो जातक दरिद्र, सदैव कामुक, पराई स्त्रियों के पास जाने में कुशल तथा सदैव तेजहीन होता है।",
        },
        8: {
            english:
                "If Dhuma is in Randhra Bhava, the native will be bereft of courage, but be enthusiastic, be truthful, disagreeable, hardhearted and selfish.",
            hindi: "यदि धूम्रा रंध्र भाव में हो तो जातक साहस से रहित, किन्तु उत्साही, सत्यवादी, अप्रिय, कठोर हृदय एवं स्वार्थी होगा।",
        },
        9: {
            english:
                "If Dhuma is in Dharma Bhava, the native will be endowed sons and fortunes, be rich, honourable, kind, religious and well disposed to his relatives.",
            hindi: "यदि धूम धर्म भाव में हो तो जातक पुत्र और सौभाग्य से संपन्न, धनवान, सम्माननीय, दयालु, धार्मिक और अपने रिश्तेदारों के प्रति अच्छा व्यवहार रखने वाला होता है।",
        },
        10: {
            english:
                "If Dhuma is in Karma Bhava, the native will be endowed with sons and fortunes, be delighted, intelligent, happy and truthful.",
            hindi: "यदि धूम कर्म भाव में हो तो जातक पुत्र और सौभाग्य से संपन्न, प्रसन्न, बुद्धिमान, सुखी और सत्यवादी होता है।",
        },
        11: {
            english:
                "If Dhuma is in Labha Bhava, the native will be endowed with wealth, grains and gold, be beautiful, will have knowledge of arts, be modest and be skilful in singing.",
            hindi: "यदि धूम लाभ भाव में हो तो जातक धन, धान्य और स्वर्ण से युक्त, सुन्दर, कलाओं का ज्ञाता, विनयशील और गायन में निपुण होता है।",
        },
        12: {
            english:
                "If Dhuma is in Vyaya Bhava, the native will be morally fallen, will indulge in sinful acts, be interested in others wives, addicted to vices, unkind and crafty.",
            hindi: "यदि धूम व्यय भाव में हो तो जातक नैतिक रूप से पतित, पाप कर्मों में लिप्त, दूसरों की पत्नियों में रुचि रखने वाला, दुर्व्यसनों में लिप्त, निर्दयी और धूर्त होगा।",
        },
    },
    Vyatipata: {
        1: {
            english:
                "If Vyatipata is in Tanu Bhava, the native will be troubled by miseries, be cruel, will indulge in destructive acts, be foolish and will be disposed to his relatives.",
            hindi: "यदि व्यतिपात तनु भाव में हो तो जातक दुखों से ग्रस्त, क्रूर, विनाशकारी कार्यों में लिप्त, मूर्ख और अपने रिश्तेदारों के प्रति आसक्त होगा।",
        },
        2: {
            english:
                "If Vyatipata is in Dhana Bhava, the native will be morally crooked, be bilious, will enjoy pleasures, be unkind, but grateful, be wicked and sinful.",
            hindi: "यदि व्यतिपात धन भाव में हो तो जातक नैतिक रूप से कुटिल, पित्तयुक्त, सुख भोगने वाला, निर्दयी, किन्तु कृतज्ञ, दुष्ट एवं पापी होगा।",
        },
        3: {
            english:
                "If Vyatipata is in Sahaja Bhava, the native will be firm in disposition, be a warrior, be liberal, very rich, dear to the king and be head of an Army.",
            hindi: "यदि व्यतिपात सहज भाव में हो तो जातक दृढ़ स्वभाव वाला, योद्धा, उदार, बहुत धनवान, राजा का प्रिय और सेना का मुखिया होता है।",
        },
        4: {
            english:
                "If Vyatipata is in Bandhu Bhava, the native will be endowed with relatives etc., but not sons and fortunes.",
            hindi: "यदि व्यतिपात बंधु भाव में हो तो जातक को रिश्तेदार आदि तो मिलेंगे, लेकिन पुत्र और भाग्य नहीं मिलेगा।",
        },
        5: {
            english:
                "If Vyatipata is in Putra Bhava, the native will be poor, be charming in appearance, will have imbalances of phlegm, bile and wind, be hard-hearted and shameless.",
            hindi: "यदि व्यतिपात पुत्र भाव में हो तो जातक दरिद्र, आकर्षक दिखने वाला, कफ, पित्त और वायु का असंतुलन, कठोर हृदय और निर्लज्ज होगा।",
        },
        6: {
            english:
                "If Vyatipata is in Ari Bhava, the native will destroy his enemies, be physically mighty, skilful in use of all kinds of weapons and in arts and be peaceful in disposition.",
            hindi: "यदि व्यतिपात अरी भाव में हो तो जातक अपने शत्रुओं का नाश करने वाला, शारीरिक रूप से शक्तिशाली, सभी प्रकार के शस्त्रों और कलाओं के प्रयोग में निपुण तथा शांत स्वभाव का होगा।",
        },
        7: {
            english:
                "If Vyatipata is in Yuvati Bhava, the native will be bereft of wealth, wife and sons, will subdue to females, be miserable, sensuous, shameless and friendly to others.",
            hindi: "यदि व्यतिपात युवती भाव में हो तो जातक धन, पत्नी और पुत्र से रहित, स्त्रियों पर आश्रित, दुखी, कामुक, निर्लज्ज और दूसरों से मित्रता रखने वाला होता है।",
        },
        8: {
            english:
                "If Vyatipata is in Randhra Bhava, the native will have deformity of eyes, be ugly, unfortunate, spiteful to Brahmins and be troubled by disorders of blood.",
            hindi: "यदि व्यतिपात रंध्र भाव में हो तो जातक नेत्र विकृत, कुरूप, दुर्भाग्यशाली, ब्राह्मणों से द्वेष रखने वाला तथा रक्त विकार से ग्रस्त होता है।",
        },
        9: {
            english:
                "If Vyatipata is in Dharma Bhava, the native will have many kinds of business and many friends; he will be very learned, well disposed to his wife and he will be eloquent.",
            hindi: "यदि व्यतिपात धर्म भाव में हो तो जातक अनेक प्रकार के व्यवसाय करेगा, उसके अनेक मित्र होंगे, वह बहुत विद्वान होगा, अपनी पत्नी के प्रति अच्छा व्यवहार रखेगा तथा वाक्पटु होगा।",
        },
        10: {
            english:
                "If Vyatipata is in Karma Bhava, the native will be religious, peaceful, skilful in religious acts, very learned and far-sighted.",
            hindi: "यदि व्यतिपात कर्म भाव में हो तो जातक धार्मिक, शान्त, धार्मिक कार्यों में कुशल, बहुत विद्वान और दूरदर्शी होगा।",
        },
        11: {
            english:
                "If Vyatipata is in Labha Bhava, the native will be extremely opulent, be honourable, truthful, firm in policy, endowed with many horses and be interested in singing.",
            hindi: "यदि व्यतिपात लाभ भाव में हो तो जातक अत्यंत ऐश्वर्यवान, सम्माननीय, सत्यवादी, नीति में दृढ़, अनेक घोड़ों से युक्त तथा गायन में रुचि रखने वाला होता है।",
        },
        12: {
            english:
                "If Vyatipata is in Vyaya Bhava, the native will be given to anger, associated with many activities, disabled, irreligious and hate his own relatives.",
            hindi: "यदि व्यतिपात व्यय भाव में हो तो जातक क्रोधी, अनेक कार्यों में संलग्न, विकलांग, अधार्मिक तथा अपने ही रिश्तेदारों से द्वेष रखने वाला होता है।",
        },
    },
    Parivesha: {
        1: {
            english:
                "If Parivesha is in Tanu Bhava, the native will be learned, truthful, peaceful, rich, endowed with sons, pure, charitable and dear to elders.",
            hindi: "यदि परिवेष तनु भाव में हो तो जातक विद्वान, सत्यवादी, शान्त, धनवान, पुत्रवान, शुद्ध, दानशील और बड़ों का प्रिय होता है।",
        },
        2: {
            english:
                "If Parivesha is in Dhana Bhava, the native will be wealthy, charming, will enjoy pleasures, be happy, very religious and be a Lord.",
            hindi: "यदि परिवेष धन भाव में हो तो जातक धनवान, आकर्षक, सुख भोगने वाला, सुखी, बहुत धार्मिक और प्रभु होगा।",
        },
        3: {
            english:
                "If Parivesha is in Sahaja Bhava, the native will be fond of his wife, be very charming, pious, well disposed to his men, be a servant and be respectful of his elders.",
            hindi: "यदि परिवेष सहज भाव में हो तो जातक अपनी पत्नी से प्रेम करने वाला, बहुत आकर्षक, धर्मपरायण, अपने लोगों के प्रति अच्छा व्यवहार रखने वाला, सेवक तथा अपने बड़ों का आदर करने वाला होगा।",
        },
        4: {
            english:
                "If Parivesha is in Bandhu Bhava, the native will be wonder-struck, helpful to enemies as well, kind, endowed with everything and be skilful in singing.",
            hindi: "यदि परिवेष बंधु भाव में हो तो जातक आश्चर्यचकित, शत्रुओं का भी सहायक, दयालु, सर्वगुण संपन्न तथा गायन में निपुण होता है।",
        },
        5: {
            english:
                "If Parivesha is in Putra Bhava, the native will be affluent, virtuous, splendourous, affectionate, religious and dear to his wife.",
            hindi: "यदि परिवेष पुत्र भाव में हो तो जातक धनवान, गुणवान, वैभवशाली, स्नेही, धार्मिक एवं अपनी पत्नी का प्रिय होगा।",
        },
        6: {
            english:
                "If Parivesha is in Ari Bhava, the native will be famous and wealthy, be endowed with sons and pleasures, be helpful to all and will conquer his enemies.",
            hindi: "यदि परिवेष अरी भाव में हो तो जातक प्रसिद्ध एवं धनवान, पुत्र एवं सुखों से युक्त, सभी का उपकार करने वाला तथा शत्रुओं पर विजय प्राप्त करने वाला होता है।",
        },
        7: {
            english:
                "If Parivesha is in Yuvati Bhava, the native will have limited number of children, be devoid of happiness, be of mediocre intelligence, very hard-headed and will have a sickly wife.",
            hindi: "यदि परिवेष युवती भाव में हो तो जातक की संतानें सीमित होंगी, सुख से रहित होगा, बुद्धि मध्यम होगी, बहुत कठोर स्वभाव वाला होगा और पत्नी बीमार होगी।",
        },
        8: {
            english:
                "If Parivesha is in Randhra Bhava, the native will be spiritually disposed, peaceful, strong-bodied, firm in decision, religious and gentle.",
            hindi: "यदि परिवेष रंध्र भाव में हो तो जातक आध्यात्मिक प्रवृत्ति का, शांत, बलवान, निर्णय में दृढ़, धार्मिक और सौम्य होगा।",
        },
        9: {
            english:
                "If Parivesha is in Dharma Bhava, the native will be endowed with sons, be happy, brilliant, very affluent, be devoid of excessive passion, be honourable and be happy with even a iota.",
            hindi: "यदि परिवेष धर्म भाव में हो तो जातक पुत्रवान, सुखी, तेजस्वी, धनवान, अति वासना रहित, सम्माननीय तथा रत्ती भर भी प्रसन्न रहने वाला होता है।",
        },
        10: {
            english:
                "If Parivesha is in Karma Bhava, the native will be versed in arts, will enjoy pleasures, be strong-bodied and be learned in all Shastras.",
            hindi: "यदि परिवेष कर्म भाव में हो तो जातक कलाओं में पारंगत, सुखों का आनंद लेने वाला, बलवान और सभी शास्त्रों का ज्ञाता होगा।",
        },
        11: {
            english:
                "If Parivesha is in Labha Bhava, the native will enjoy pleasures through women, be virtuous, intelligent, dear to his people and will suffer disorders of digestive fire.",
            hindi: "यदि परिवेष लाभ भाव में हो तो जातक स्त्रियों के माध्यम से सुख भोगने वाला, गुणवान, बुद्धिमान, प्रजा का प्रिय तथा जठराग्नि के विकार से ग्रस्त होगा।",
        },
        12: {
            english:
                "If Parivesha is in Vyaya Bhava, the native will always be a spendthrift, be miserable, firm and will dishonour elders.",
            hindi: "यदि परिवेष व्यय भाव में हो तो जातक सदैव फिजूलखर्च, दुखी, दृढ़ और बड़ों का अनादर करने वाला होगा।",
        },
    },
    Chapa: {
        1: {
            english:
                "If Chapa is in Tanu Bhava, the native will be endowed with wealth, grains and gold, be grateful, agreeable and devoid of all actions.",
            hindi: "यदि चपा तनु भाव में हो तो जातक धन, धान्य और स्वर्ण से युक्त, कृतज्ञ, प्रसन्नचित्त और सभी कर्मों से रहित होता है।",
        },
        2: {
            english:
                "If Chapa is in Dhana Bhava, the native will speak affably, be very rich, modest, learned, charming and religious.",
            hindi: "यदि चापा धन भाव में हो तो जातक मधुर वाणी बोलने वाला, बहुत धनी, विनम्र, विद्वान, आकर्षक और धार्मिक होगा।",
        },
        3: {
            english:
                "If Chapa is in Sahaja Bhava, the native will be a miser, be versed in many arts, will indulge in thieving, be devoid of some limb and be unfriendly.",
            hindi: "यदि चाप सहज भाव में हो तो जातक कंजूस, अनेक कलाओं में निपुण, चोरी में लिप्त, किसी अंग से रहित और अमित्र होगा।",
        },
        4: {
            english:
                "If Chapa is in Bandhu Bhava, the native will be happy, endowed with quadrupeds, wealth, grains etc., be honoured by the king and be devoid of sickness.",
            hindi: "यदि चपा बंधु भाव में हो तो जातक सुखी, चतुर्भुज, धन, धान्य आदि से युक्त, राजा द्वारा सम्मानित तथा रोग रहित होता है।",
        },
        5: {
            english:
                "If Chapa is in Putra Bhava, the native will be splendourous, far-sighted, pious, affable and will acquire prosperity in all his undertakings.",
            hindi: "यदि चपा पुत्र भाव में हो तो जातक तेजस्वी, दूरदर्शी, धर्मपरायण, मिलनसार होगा तथा अपने सभी कार्यों में समृद्धि प्राप्त करेगा।",
        },
        6: {
            english:
                "If Chapa is in Ari Bhava, the native will destroy his enemies, be happy, affectionate, pure and will achieve plentifulness in all his undertakings.",
            hindi: "यदि चप अरी भाव में हो तो जातक अपने शत्रुओं का नाश करने वाला, प्रसन्न, स्नेही, पवित्र होगा तथा अपने सभी कार्यों में प्रचुरता प्राप्त करेगा।",
        },
        7: {
            english:
                "If Chapa is in Yuvati Bhava, the native will be wealthy, endowed with all virtues, learned in Shastras, religious and agreeable.",
            hindi: "यदि चप युवती भाव में हो तो जातक धनवान, सर्वगुण संपन्न, शास्त्रों का ज्ञाता, धार्मिक और मिलनसार होता है।",
        },
        8: {
            english:
                "If Chapa is in Randhra Bhava, the native will be interested in others jobs, be cruel, interested in others wives and have a defective limb.",
            hindi: "यदि चपा रंध्र भाव में हो तो जातक दूसरों की नौकरी में रुचि रखने वाला, क्रूर, दूसरों की पत्नियों में रुचि रखने वाला तथा किसी अंग में दोष वाला होता है।",
        },
        9: {
            english:
                "If Chapa is in Dharma Bhava, the native will perform penance, will take to religious observations, be highly learned and be famous among men.",
            hindi: "यदि चप धर्म भाव में हो तो जातक तपस्या करेगा, धार्मिक अनुष्ठान करेगा, उच्च विद्वान होगा तथा लोगों में प्रसिद्ध होगा।",
        },
        10: {
            english:
                "If Chapa is in Karma Bhava, the native will be endowed with many sons, abundant wealth, cows, buffaloes etc. and will be famous among men.",
            hindi: "यदि चप कर्म भाव में हो तो जातक अनेक पुत्रों, प्रचुर धन, गाय, भैंस आदि से संपन्न होगा तथा पुरुषों में प्रसिद्ध होगा।",
        },
        11: {
            english:
                "If Chapa is in Labha Bhava, the native will gain many treasures, will be free from diseases, very fiery in disposition, affectionate to his wife and will have knowledge of Mantras and weapons.",
            hindi: "यदि चपा लाभ भाव में हो तो जातक अनेक निधियों से संपन्न होगा, रोगों से मुक्त होगा, स्वभाव से बहुत उग्र होगा, अपनी पत्नी से स्नेही होगा तथा मंत्रों और शस्त्रों का ज्ञान रखेगा।",
        },
        12: {
            english:
                "If Chapa is in Vyaya Bhava, the native will be wicked, very honourable, evil in disposition, shameless, will go to others females and be ever poor.",
            hindi: "यदि चप व्यय भाव में हो तो जातक दुष्ट, बहुत सम्माननीय, दुष्ट स्वभाव वाला, निर्लज्ज, पराई स्त्रियों के पास जाने वाला तथा सदैव दरिद्र होगा।",
        },
    },
    Upaketu: {
        1: {
            english:
                "If Upaketu is in Tanu Bhava, the native will be skilful in all branches of learning, be happy, efficient in speech, agreeable and be very affectionate.",
            hindi: "यदि उपकेतु तनु भाव में हो तो जातक सभी विद्याओं में निपुण, प्रसन्न, वाणी में कुशल, सहमत और बहुत स्नेही होगा।",
        },
        2: {
            english:
                "If Upaketu is in Dhana Bhava, the native will be a good and affable speaker, be splendourous, will write poetry, be scholarly, honourable, modest and endowed with conveyances.",
            hindi: "यदि उपकेतु धन भाव में हो तो जातक अच्छा एवं मधुर वक्ता, तेजस्वी, काव्य रचने वाला, विद्वान, सम्माननीय, विनम्र एवं वाहन-सम्पन्न होता है।",
        },
        3: {
            english:
                "If Upaketu is in Sahaja Bhava, the native will be miserly, cruel acts, thin-bodied, poor and will incur severe diseases.",
            hindi: "यदि उपकेतु सहज भाव में हो तो जातक कंजूस, क्रूर कर्म करने वाला, दुबला-पतला, दरिद्र और गंभीर रोगों से ग्रस्त होगा।",
        },
        4: {
            english:
                "If Upaketu is in Bandhu Bhava, the native will be charming, very virtuous, gentle, interested in Vedic Knowledge and be always happy.",
            hindi: "यदि उपकेतु बंधु भाव में हो तो जातक आकर्षक, बहुत गुणी, सौम्य, वैदिक ज्ञान में रुचि रखने वाला और सदैव प्रसन्न रहने वाला होगा।",
        },
        5: {
            english:
                "If Upaketu is in Putra Bhava, the native will be happy, will enjoy pleasures, be versed in arts, skilled in expedients, intelligent, eloquent and will respect elders.",
            hindi: "यदि उपकेतु पुत्र भाव में हो तो जातक सुखी, सुख भोगने वाला, कलाओं में निपुण, युक्ति-कुशल, बुद्धिमान, वाक्पटु और बड़ों का सम्मान करने वाला होता है।",
        },
        6: {
            english:
                "If Upaketu is in Ari Bhava, the native will be ominous for material relatives, will win over his enemies, be endowed with many relatives, valiant, splendourous and skilful.",
            hindi: "यदि उपकेतु अरि भाव में हो तो जातक भौतिक संबंधियों के लिए अशुभ, शत्रुओं पर विजय पाने वाला, अनेक संबंधियों से युक्त, वीर, तेजस्वी और कुशल होता है।",
        },
        7: {
            english:
                "If Upaketu is in Yuvati Bhava, the native will be interested in gambling, be sensuous, will enjoy pleasures and will befriend prostitutes.",
            hindi: "यदि उपकेतु युवती भाव में हो तो जातक जुआ खेलने में रुचि रखने वाला, कामुक, भोग विलास करने वाला तथा वेश्याओं से मित्रता रखने वाला होता है।",
        },
        8: {
            english:
                "If Upaketu is in Randhra Bhava, the native will be interested in base acts, be sinful, shameless, will blame others, will lack in marital happiness and will take others side.",
            hindi: "यदि उपकेतु रंध्र भाव में हो तो जातक नीच कार्यों में रुचि रखने वाला, पापी, निर्लज्ज, दूसरों को दोष देने वाला, वैवाहिक सुख में कमी वाला तथा दूसरों का पक्ष लेने वाला होगा।",
        },
        9: {
            english:
                "If Upaketu is in Dharma Bhava, the native will wear badges, be delighted, helpfully disposed to all and he will be skilled in religious deeds.",
            hindi: "यदि उपकेतु धर्म भाव में हो तो जातक बैज धारण करने वाला, प्रसन्नचित्त, सभी की सहायता करने वाला तथा धार्मिक कार्यों में कुशल होगा।",
        },
        10: {
            english:
                "If Upaketu is in Karma Bhava, the native will be endowed with happiness and fortunes, be fond of females, be charitable and will befriend Brahmins.",
            hindi: "यदि उपकेतु कर्म भाव में हो तो जातक सुख-सौभाग्य से संपन्न, स्त्रियों का प्रिय, दानशील और ब्राह्मणों से मित्रता रखने वाला होता है।",
        },
        11: {
            english:
                "If Upaketu is in Labha Bhava, the native will ever acquire gains, be very religious, honourable, affluent, fortunate, valiant and skilled in sacrificial rites.",
            hindi: "यदि उपकेतु लाभ भाव में हो तो जातक सदैव लाभ प्राप्त करने वाला, बहुत धार्मिक, सम्माननीय, धनवान, भाग्यशाली, पराक्रमी और यज्ञ-अनुष्ठानों में कुशल होता है।",
        },
        12: {
            english:
                "If Upaketu is in Vyaya Bhava, the native will be interested in sinful acts, be valiant, untrustworthy, unkind, interested in others females and be short-tempered.",
            hindi: "यदि उपकेतु व्यय भाव में हो तो जातक पाप कर्मों में रुचि रखने वाला, वीर, अविश्वसनीय, निर्दयी, पराई स्त्रियों में रुचि रखने वाला और क्रोधी होगा।",
        },
    },
    Gulika: {
        1: {
            english:
                "If Gulika is in Tanu Bhava, the native will be afflicted by diseases, be lustful, sinful, crafty, wicked and very miserable.",
            hindi: "यदि गुलिक तनु भाव में हो तो जातक रोगग्रस्त, कामी, पापी, धूर्त, दुष्ट और अत्यंत दुखी होगा।",
        },
        2: {
            english:
                "If Gulika is in Dhana Bhava, the native will be unsightly in appearance, miserable, mean, given to vices, shameless and penniless.",
            hindi: "यदि गुलिक धन भाव में हो तो जातक देखने में भद्दा, दुखी, नीच, दुराचारी, निर्लज्ज और दरिद्र होगा।",
        },
        3: {
            english:
                "If Gulika is in Sahaja Bhava, the native will be charming in appearance, will head a village, be fond of virtuous men and be honoured by the king.",
            hindi: "यदि गुलिक सहज भाव में हो तो जातक आकर्षक दिखने वाला, गांव का मुखिया, गुणवान पुरुषों का प्रिय तथा राजा द्वारा सम्मानित होगा।",
        },
        4: {
            english:
                "If Gulika is in Bandhu Bhava, the native will be sickly, devoid of happiness, sinful and afflicted due to windy and billious excesses.",
            hindi: "यदि गुलिक बंधु भाव में हो तो जातक रोगी, सुख से रहित, पापी, वायु और मद के कारण पीड़ित होगा।",
        },
        5: {
            english:
                "If Gulika is in Putra Bhava, the native will not be praise-worthy, be poor, short-lived, spiteful, mean, be a eunuch, be subdued by his wife and be a heterodox.",
            hindi: "यदि गुलिक पुत्र भाव में हो तो जातक प्रशंसनीय नहीं, दरिद्र, अल्पायु, द्वेषी, नीच, नपुंसक, पत्नी से वशीभूत एवं विधर्मी होता है।",
        },
        6: {
            english:
                "If Gulika is in Ari Bhava, the native will be devoid of enemies, be strong-bodied, splendourous, liked by his wife, enthusiastic, very friendly and helpful in disposition.",
            hindi: "यदि गुलिक अरी भाव में हो तो जातक शत्रु रहित, बलवान, तेजस्वी, पत्नी का प्रिय, उत्साही, मित्रवत एवं सहायता करने वाला होता है।",
        },
        7: {
            english:
                "If Gulika is in Yuvati Bhava, the native will subdue to his spouse, be sinful, will go to others females, be emaciated, devoid of friendship and will live on his wifes wealth.",
            hindi: "यदि गुलिक युवती भाव में हो तो जातक अपनी पत्नी के अधीन रहने वाला, पापी, पराई स्त्रियों के पास जाने वाला, क्षीण शरीर वाला, मित्रहीन तथा अपनी पत्नी के धन पर निर्भर रहने वाला होता है।",
        },
        8: {
            english:
                "If Gulika is in Randhra Bhava, the native will be troubled by hunger, be miserable, cruel, very much short-tempered, very unkind, poor and bereft of good qualities.",
            hindi: "यदि गुलिक रंध्र भाव में हो तो जातक भूख से परेशान, दुखी, क्रूर, बहुत क्रोधी, बहुत निर्दयी, गरीब और अच्छे गुणों से रहित होगा।",
        },
        9: {
            english:
                "If Gulika is in Dharma Bhava, the native will undergo many ordeals, be emaciated, will perform evil acts, be very unkind, sluggish and be a talebearer.",
            hindi: "यदि गुलिक धर्म भाव में हो तो जातक अनेक कष्टों से गुजरेगा, दुर्बल होगा, बुरे कार्य करेगा, बहुत निर्दयी, सुस्त और चुगलखोर होगा।",
        },
        10: {
            english:
                "If Gulika is in Karma Bhava, the native will be endowed with sons, be happy, will enjoy many things, be fond of worshipping gods and fire and will practice meditation and religion.",
            hindi: "यदि गुलिक कर्म भाव में हो तो जातक पुत्रवान, सुखी, अनेक वस्तुओं का भोग करने वाला, देवताओं और अग्नि की पूजा करने वाला, ध्यान और धर्म का अभ्यास करने वाला होता है।",
        },
        11: {
            english:
                "If Gulika is in Labha Bhava, the native will enjoy women of class, be a leader of men, be helpful to his relatives, be short stature and be an emperor.",
            hindi: "यदि गुलिक लाभ भाव में हो तो जातक उच्च कोटि की स्त्रियों का सुख भोगने वाला, पुरुषों का नेता, अपने संबंधियों का सहायक, छोटे कद का तथा सम्राट होता है।",
        },
        12: {
            english:
                "If Gulika is in Vyaya Bhava, the native will indulge in base deeds, be sinful, defective-limbed, unfortunate, indolent and will join mean people.",
            hindi: "यदि गुलिक व्यय भाव में हो तो जातक नीच कर्मों में लिप्त, पापी, दोषपूर्ण अंग वाला, दुर्भाग्यशाली, आलसी और नीच लोगों से युक्त होगा।",
        },
    },
    Yamaghantaka: {
        1: {
            english:
                "Religious, full of learning, honest, peaceful, wealthy, charitable, and blessed with progeny.",
            hindi: "धार्मिक, विद्वान, ईमानदार, शांत स्वभाव का, धनवान, दानशील और संतान से संपन्न।",
        },
        2: {
            english:
                "Wealthy, pleasant disposition, happy, spiritually inclined, dear to one's traditions.",
            hindi: "धनवान, सुखद स्वभाव का, प्रसन्न, आध्यात्मिक झुकाव वाला, परंपराओं से प्रेम करने वाला।",
        },
        3: {
            english:
                "Travels often, respectful to peers, pious, charming, fond of one's spouses.",
            hindi: "अक्सर यात्रा करने वाला, साथियों का सम्मान करने वाला, धार्मिक, आकर्षक, जीवनसाथी से प्रेम करने वाला।",
        },
        4: {
            english:
                "Quiet, peaceful heart, helpful to all in need, owner of beautiful lands.",
            hindi: "शांत और स्थिर हृदय वाला, जरूरतमंदों की मदद करने वाला, सुंदर भूमि का स्वामी।",
        },
        5: {
            english:
                "Full of wonder, intelligent, affectionate, devoted to religion, virtuous, resourceful, master of mantras.",
            hindi: "आश्चर्यजनक गुणों वाला, बुद्धिमान, स्नेही, धर्मनिष्ठ, गुणी, संसाधन सम्पन्न, मंत्रों का ज्ञाता।",
        },
        6: {
            english:
                "Prone to diseases of excess, too trusting, faces financial difficulties, lends money to others.",
            hindi: "अत्यधिकता से उत्पन्न रोगों का शिकार, अत्यधिक विश्वास करने वाला, आर्थिक कठिनाइयों से ग्रस्त, दूसरों को ऋण देने वाला।",
        },
        7: {
            english:
                "Unhappy, wasteful with resources, loss to spouse, problems with progeny and legacy.",
            hindi: "अप्रसन्न, संसाधनों का अपव्ययी, जीवनसाथी को हानि, संतान और विरासत में समस्याएं।",
        },
        8: {
            english:
                "Deep intuition, astrologer, peaceful, strong-bodied, long-lived, gentle, inherits property.",
            hindi: "गहन अंतर्ज्ञान वाला, ज्योतिषी, शांत, मजबूत शरीर वाला, दीर्घायु, कोमल स्वभाव का, संपत्ति का उत्तराधिकारी।",
        },
        9: {
            english:
                "Blessed with progeny, happy, valuable to society, law-giver, honorable, wealthy, generous to the needy.",
            hindi: "संतान सम्पन्न, प्रसन्न, समाज के लिए मूल्यवान, विधि-निर्माता, सम्मानित, धनवान, जरूरतमंदों को उदारतापूर्वक देने वाला।",
        },
        10: {
            english:
                "Learned in religion and law, master of shastras, intelligent, artistic, and happy.",
            hindi: "धर्म और विधि में निपुण, शास्त्रों का ज्ञाता, बुद्धिमान, कलात्मक और प्रसन्न।",
        },
        11: {
            english:
                "Enjoys relationships, loved by people, prone to phlegmatic diseases, well-known and respected.",
            hindi: "संबंधों का आनंद लेने वाला, लोगों का प्रिय, कफ जनित रोगों से पीड़ित, प्रसिद्ध और सम्मानित।",
        },
        12: {
            english:
                "Many expenses, miserable, dishonorable to relatives, suited for monastic life.",
            hindi: "अत्यधिक खर्च करने वाला, दुखी, रिश्तेदारों के लिए अपमानजनक, संन्यास जीवन के लिए उपयुक्त।",
        },
    },
};
