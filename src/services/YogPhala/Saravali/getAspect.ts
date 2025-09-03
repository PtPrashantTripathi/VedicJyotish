import type {
    Planet,
    PlanetEn,
    SaptagrahaEn,
} from "src/services/constants/Planet";
import type { RasiEn } from "src/services/constants/Rasi";
import type { Translation } from "src/services/types";
import type { Phala } from "src/services/YogPhala";

/**
 * Retrieves applicable planetary aspect results based on the given planetary
 * positions.
 *
 * The function iterates over a predefined data map describing aspecting
 * planets, the planets they aspect, and the phala (effects) associated with
 * those aspects.
 *
 * @param planets - All planetary data keyed by English planet name.
 * @returns An array of matching rules, each containing an English description,
 *   a Hindi translation, and the rule's original expression text.
 */
export function getSaravaliAspectYogPhala(
    planets: Record<PlanetEn, Planet>
): Phala[] {
    const results: Phala[] = [];

    for (const [aspectingPlanet, aspectedMap] of Object.entries(
        AspectPhalaData
    )) {
        for (const [aspectedPlanet, rasiOrLordMap] of Object.entries(
            aspectedMap
        )) {
            const aspecting = planets[aspectingPlanet as SaptagrahaEn];
            const aspected = planets[aspectedPlanet as SaptagrahaEn];

            if (!aspecting.isAspecting(aspected)) continue;

            // Moon uses Rasi name, others use Rasi lord
            const key =
                aspectedPlanet === "Moon"
                    ? aspected.rasi.name.english
                    : aspected.rasi.lord;

            const effect = rasiOrLordMap[key as keyof typeof rasiOrLordMap];
            if (effect) {
                results.push({
                    description: {
                        english: `${aspected.name.english} in ${aspected.rasi.name.english} aspected by the ${aspecting.name.english}`,
                        hindi: `${aspected.rasi.name.hindi} राशि में ${aspected.name.hindi} पर ${aspecting.name.hindi} की दृष्टि`,
                    },
                    effect,
                });
            }
        }
    }

    return results;
}

/**
 * Data map defining aspecting planets, aspected planets, and the associated
 * phala (effects) for specific conditions.
 */
export const AspectPhalaData: {
    [AspectingPlanet in SaptagrahaEn]: {
        [AspectedPlanet in Exclude<SaptagrahaEn, AspectingPlanet>]: Record<
            AspectedPlanet extends "Moon" ? RasiEn : SaptagrahaEn,
            Translation<string, string>
        >;
    };
} = {
    Sun: {
        Moon: {
            Aries: {
                english:
                    "If the Moon is in Aries at birth and be in aspect to the Sun, the native will be quite irascible, be honoured by the king, be soft, be valorous and fond of war.",
                hindi: "यदि जन्म के समय चन्द्रमा मेष राशि में हो और सूर्य से दृष्ट हो तो जातक बहुत चिड़चिड़ा, राजा द्वारा सम्मानित, मृदुभाषी, वीर और युद्धप्रिय होगा।",
            },
            Taurus: {
                english:
                    "Should the Moon be in Taurus and be in aspect to the Sun, the native will be a farmer, be very industrious, be very rich with servants and quadrupeds and will lend money on usury.",
                hindi: "यदि चन्द्रमा वृषभ राशि में हो और सूर्य से दृष्ट हो तो जातक किसान, बहुत मेहनती, नौकरों और चौपायों से युक्त बहुत धनी होगा तथा ब्याज पर धन उधार देने वाला होगा।",
            },
            Gemini: {
                english:
                    "If the Moon is in Gemini at birth and is aspected by the Sun, the native will be quite learned, be splendourous, very beautiful, be charitable, be very miserable and be not rich.",
                hindi: "यदि जन्म के समय चन्द्रमा मिथुन राशि में हो और सूर्य से दृष्ट हो तो जातक विद्वान, वैभवशाली, अत्यंत सुंदर, दानशील, अत्यंत दुखी तथा धनहीन होगा।",
            },
            Cancer: {
                english:
                    "Should the Moon be in her House at birth and be aspected by the Sun, the native will be in the employ of king, be not rich, be a letter-bearer and will protect forts (i.e. will be a security officer in royal service).",
                hindi: "यदि जन्म के समय चन्द्रमा अपने घर में हो और सूर्य से दृष्ट हो तो जातक राजा के अधीन काम करने वाला, धनी नहीं, पत्रवाहक और किलों की रक्षा करने वाला होगा (अर्थात शाही सेवा में सुरक्षा अधिकारी होगा)।",
            },
            Leo: {
                english:
                    "Should the Moon be in Leo in aspect to the Sun, the native will be equal to a king, will have excellent qualities and majestic voice, will be valorous, be fond of intoxicants and be widely famous.",
                hindi: "यदि चंद्रमा सिंह राशि में सूर्य से दृष्ट हो तो जातक राजा के समान, उत्तम गुणों वाला, राजसी वाणी वाला, पराक्रमी, मादक पदार्थों का शौकीन तथा व्यापक प्रसिद्धि वाला होता है।",
            },
            Virgo: {
                english:
                    "If the Moon occupies Virgo at birth and is aspected by the Sun, the native will be in charge of royal wealth, be famous, will keep up his word and perform distinguished acts.",
                hindi: "यदि जन्म के समय चन्द्रमा कन्या राशि में हो और सूर्य से दृष्ट हो तो जातक राजसी संपत्ति का स्वामी होगा, प्रसिद्ध होगा, अपने वचन का पालन करेगा और विशिष्ट कार्य करेगा।",
            },
            Libra: {
                english:
                    "If the Moon is in Libra and is aspected by the Sun, the person will be bereft of wealth, be diseased, will wander here and there, be insulted, be bereft of enjoyment, sons and strength.",
                hindi: "यदि चन्द्रमा तुला राशि में हो और सूर्य से दृष्ट हो तो जातक धनहीन, रोगी, इधर-उधर भटकने वाला, अपमानित, भोग-विलास, पुत्र और बल से रहित होता है।",
            },
            Scorpio: {
                english:
                    "If the Moon at birth is in Scorpio and aspected by the Sun, the native will hate people (i.e. will not be friendly with others), be learned, wandering nature and rich, but be not happy.",
                hindi: "यदि जन्म के समय चन्द्रमा वृश्चिक राशि में हो और सूर्य से दृष्ट हो तो जातक लोगों से घृणा करने वाला (अर्थात दूसरों से मित्रता नहीं रखने वाला), विद्वान, भ्रमणशील स्वभाव वाला और धनवान होगा, लेकिन सुखी नहीं होगा।",
            },
            Sagittarius: {
                english:
                    "If the Moon in Sagittarius is aspected by the Sun, the person will be a king, be affluent, valorous, famous and will have incomparable happiness and conveyances.",
                hindi: "यदि धनु राशि में स्थित चन्द्रमा पर सूर्य की दृष्टि हो तो जातक राजा, धनवान, पराक्रमी, प्रसिद्ध तथा अतुलनीय सुख एवं वाहन प्राप्त करने वाला होता है।",
            },
            Capricorn: {
                english:
                    "Should the Moon in Capricorn be aspected by the Sun at birth, one will be penniless, miserable, wandering-nature, interested in others work, dirty and clever.",
                hindi: "यदि जन्म के समय मकर राशि में स्थित चंद्रमा पर सूर्य की दृष्टि हो तो व्यक्ति दरिद्र, दुखी, भ्रमणशील स्वभाव वाला, दूसरों के काम में रुचि रखने वाला, गंदा और चालाक होता है।",
            },
            Aquarius: {
                english:
                    "Should the Moon at birth be in Aquarius and be aspected by the Sun, one will be very dirty in disposition, be valorous, will be like a king in guise, be virtuous and be an agriculturist.",
                hindi: "यदि जन्म के समय चन्द्रमा कुंभ राशि में हो और सूर्य से दृष्ट हो तो जातक बहुत गंदा स्वभाव वाला, वीर, राजा के समान वेश वाला, गुणवान और कृषक होगा।",
            },
            Pisces: {
                english:
                    "If the Moon posited in Pisces is aspected by the Sun, the native will be highly libidinous, be happy, be an Army chief, be very affluent and will have delighted wife. ",
                hindi: "यदि मीन राशि में स्थित चंद्रमा पर सूर्य की दृष्टि हो तो जातक अत्यधिक कामुक, सुखी, सेना प्रमुख, बहुत धनवान और प्रसन्न पत्नी वाला होता है।",
            },
        },
        Mars: {
            Moon: {
                english:
                    "If Mars be in Cancer at birth and is aspected by the Sun, the native will be subjected to bilious diseases, be splendourous, be a justice in position and be valorous.",
                hindi: "यदि जन्म के समय मंगल कर्क राशि में हो और सूर्य से दृष्ट हो तो जातक पित्त रोग से ग्रस्त, वैभवशाली, न्यायप्रिय और पराक्रमी होगा।",
            },
            Mars: {
                english:
                    "Should Mars at birth be in Aries/Scorpio and be aspected by the Sun, the person will possess wealth, wife and children, be a kings minister, be a justice, be famous and be a charitable king.",
                hindi: "यदि जन्म के समय मंगल मेष/वृश्चिक राशि में हो और सूर्य से दृष्ट हो तो जातक धनवान, स्त्री-पुत्रादि से युक्त, राजा का मंत्री, न्यायकर्ता, प्रसिद्ध और दानशील राजा होता है।",
            },
            Sun: {
                english:
                    "If Mars is in Leo and is aspected by the Sun, the native will be humble, helpful to friends, be endowed with own men and be fond of wandering in cow-houses, forests and hills.",
                hindi: "यदि मंगल सिंह राशि में हो और सूर्य से दृष्ट हो तो जातक विनम्र, मित्रों का सहायक, धनवान, गौशाला, वन और पर्वतों में विचरण करने का शौकीन होता है।",
            },
            Mercury: {
                english:
                    "If at birth Mars be in Gemini/Virgo and in aspect to the Sun, the native will be blessed with learning, wealth and courage, be fond of hills, forests and fortresses and be highly strong.",
                hindi: "यदि जन्म के समय मंगल मिथुन/कन्या राशि में हो और सूर्य पर दृष्टि हो, तो जातक विद्या, धन और साहस से संपन्न होगा, पहाड़ों, जंगलों और किलों का शौकीन होगा और अत्यधिक शक्तिशाली होगा।",
            },
            Jupiter: {
                english:
                    "If Mars occupies Sagittarius, or Pisces at birth and is aspected by the Sun, the subject will be world honoured, be fortunate, will live in forests, hills and fortresses and be cruel.",
                hindi: "यदि जन्म के समय मंगल धनु या मीन राशि में हो और सूर्य से दृष्ट हो तो जातक विश्व प्रतिष्ठित, भाग्यशाली, वनों, पहाड़ियों और किलों में रहने वाला तथा क्रूर होगा।",
            },
            Venus: {
                english:
                    "If Mars is in Taurus/Libra, with the aspect of the Sun, the person will seek to move in forests and hills, will hate women, will have many enemies, will have fierce appearance and be courageous.",
                hindi: "यदि मंगल वृषभ/तुला राशि में हो और सूर्य की दृष्टि उस पर हो तो जातक जंगलों और पहाड़ियों में विचरण करने वाला, स्त्रियों से घृणा करने वाला, अनेक शत्रुओं वाला, भयंकर रूप वाला और साहसी होगा।",
            },
            Saturn: {
                english:
                    "Should Mars be in Capricorn, or Aquarius and be aspected by the Sun, the subject will have very dark body, be courageous, will have many wives, sons and abundant wealth and be very sharp.",
                hindi: "यदि मंगल मकर या कुंभ राशि में हो और सूर्य से दृष्ट हो तो जातक का शरीर श्याम वर्ण का, साहसी, अनेक पत्नियां, पुत्र और प्रचुर धन वाला होगा तथा वह बहुत कुशाग्र बुद्धि का होगा।",
            },
        },
        Mercury: {
            Moon: {
                english:
                    "Should Mercury be in Cancer, in aspect to the Sun, one will be a dhoby, or a gardener, or a house-builder, or gem smith.",
                hindi: "यदि बुध कर्क राशि में सूर्य से दृष्ट हो तो व्यक्ति धोबी, माली, गृह निर्माता या रत्न कारीगर होगा।",
            },
            Mars: {
                english:
                    "Should Mercury occupy a Sign of Mars at birth and be aspected by the Sun, the person will be truthful, be very happy, be honoured by the king and be patiently disposed.",
                hindi: "यदि जन्म के समय बुध मंगल की राशि में हो और सूर्य से दृष्ट हो तो जातक सत्यवादी, अत्यंत सुखी, राजा द्वारा सम्मानित तथा धैर्यवान होता है।",
            },
            Mercury: {
                english:
                    "Should Mercury be in Gemini/Virgo and be aspected by the Sun, the native will speak truth, be fortunate, dear to king, be a Lord himself, be polite in his activities and be liked by all.",
                hindi: "यदि बुध मिथुन/कन्या राशि में हो और सूर्य से दृष्ट हो तो जातक सत्य बोलने वाला, भाग्यशाली, राजा का प्रिय, स्वयं स्वामी, अपने कार्यों में विनम्र और सभी का प्रिय होगा।",
            },
            Sun: {
                english:
                    "If Mercury occupies Leo at birth and is aspected by the Sun, the native will be jealous, rich, virtuous, cruel, mean, fickle-minded and shameless.",
                hindi: "यदि जन्म के समय बुध सिंह राशि में हो और सूर्य से दृष्ट हो तो जातक ईर्ष्यालु, धनवान, गुणी, क्रूर, नीच, चंचल स्वभाव वाला और बेशर्म होगा।",
            },
            Jupiter: {
                english:
                    "Should Mercury be in Sagittarius/Pisces and aspected by the Sun, one will suffer from urinary diseases and epilepsy and be peaceful in disposition.",
                hindi: "यदि बुध धनु/मीन राशि में हो और सूर्य से दृष्ट हो तो व्यक्ति मूत्र रोग और मिर्गी से पीड़ित होगा तथा स्वभाव से शांत होगा।",
            },
            Venus: {
                english:
                    "Should Mercury be in a House of Venus and be aspected by the Sun, the subject will suffer from penury and acute grief, will have a sick physique, be interested in serving others and will be censured.",
                hindi: "यदि बुध शुक्र के घर में हो और सूर्य से दृष्ट हो तो जातक दरिद्रता और तीव्र दुःख से ग्रस्त होगा, शरीर रोगी होगा, दूसरों की सेवा में रुचि रखेगा और निंदा का पात्र बनेगा।",
            },
            Saturn: {
                english:
                    "If Mercury be in a House of Saturn and is aspected by the Sun, one will be a boxer, be very strong, one will eat abundantly, be censured, will speak sweetly and be famous.",
                hindi: "यदि बुध शनि के घर में हो और सूर्य से दृष्ट हो तो व्यक्ति मुक्केबाज, बहुत बलवान, अधिक खाने वाला, निंदा का पात्र, मीठा बोलने वाला और प्रसिद्ध होगा।",
            },
        },
        Jupiter: {
            Moon: {
                english:
                    "If Jupiter occupies Cancer at birth and is aspected by the Sun, native will be famous, be ahead of others and will (in the beginning) be devoid of happiness, wealth and wife, all of which will be acquired by him later.",
                hindi: "यदि जन्म के समय बृहस्पति कर्क राशि में हो और सूर्य से दृष्ट हो तो जातक प्रसिद्ध होगा, दूसरों से आगे होगा और (शुरुआत में) सुख, धन और पत्नी से वंचित रहेगा, जो बाद में उसे प्राप्त होंगे।",
            },
            Mars: {
                english:
                    "If Jupiter occupies Aries/Scorpio at birth and is aspected by the Sun, the native will be charitable, will be truthful, will have famous sons, be very fortunate and will have abundant hair on the body.",
                hindi: "यदि जन्म के समय बृहस्पति मेष/वृश्चिक राशि में हो और सूर्य से दृष्ट हो तो जातक दानशील, सत्यवादी, यशस्वी पुत्र वाला, बहुत भाग्यशाली तथा शरीर पर प्रचुर मात्रा में बाल वाला होगा।",
            },
            Mercury: {
                english:
                    "If Jupiter occupies Gemini/Virgo and is aspected by the Sun at birth, one will be great, important in his village be a householder and will be endowed with wife, sons and money.",
                hindi: "यदि बृहस्पति मिथुन/कन्या राशि में हो और जन्म के समय सूर्य से दृष्ट हो तो व्यक्ति महान होगा, अपने गांव में महत्वपूर्ण होगा, गृहस्थ होगा और पत्नी, पुत्र और धन से संपन्न होगा।",
            },
            Sun: {
                english:
                    "If at birth Jupiter is in Leo and is aspected by the Sun, one will be dear to good men, be famous, be a king, be extremely affluent and virtuous.",
                hindi: "यदि जन्म के समय बृहस्पति सिंह राशि में हो और सूर्य से दृष्ट हो तो वह सज्जनों का प्रिय, प्रसिद्ध, राजा, अत्यंत धनवान और गुणवान होता है।",
            },
            Jupiter: {
                english:
                    "Jupiter is posited in Sagittarius/Pisces at birth and is aspected by the Sun, the native will be inimical to the king and will be miserable being bereft of wealth and relatives.",
                hindi: "जन्म के समय बृहस्पति धनु/मीन राशि में स्थित हो और सूर्य से दृष्ट हो, तो जातक राजा का विरोधी होगा तथा धन और संबंधियों से रहित होकर दुखी रहेगा।",
            },
            Venus: {
                english:
                    "If Jupiter occupies a House of Venus at birth and is aspected by the Sun, one will be endowed with attendants and quadrupeds. will wander verily, will have a long body, be learned and be a kings minister.",
                hindi: "यदि जन्म के समय बृहस्पति शुक्र के भाव में हो और सूर्य से दृष्ट हो तो वह सेवकों और चतुर्भुजों से युक्त होगा, सत्य का पालन करने वाला, दीर्घ शरीर वाला, विद्वान और राजा का मंत्री होगा।",
            },
            Saturn: {
                english:
                    "If Jupiter is in a House of Saturn at birth and is aspected by the Sun, one will be learned, be a king, be rich by birth, will enjoy various kinds of pleasures and be very courageous.",
                hindi: "यदि जन्म के समय बृहस्पति शनि के घर में हो और सूर्य से दृष्ट हो तो व्यक्ति विद्वान, राजा, जन्म से धनवान, विभिन्न प्रकार के सुखों का भोग करने वाला और बहुत साहसी होगा।",
            },
        },
        Venus: {
            Moon: {
                english:
                    "If Venus is in Cancer and aspected by the Sun, the natives wife will be attached to her duties, will possess a spotless body, will be a kings daughter, (i.e. she will be of a rich heritage), one short-tempered and will be endowed with wealth.",
                hindi: "यदि शुक्र कर्क राशि में हो और सूर्य से दृष्ट हो तो जातक की पत्नी अपने कर्तव्यों के प्रति समर्पित, बेदाग शरीर वाली, राजा की पुत्री (अर्थात् वह धनी वंश की होगी), क्रोधी और धनवान होगी।",
            },
            Mars: {
                english:
                    "Should Venus occupy Aries/Scorpio at birth and is in aspect to the Sun, one will be miserable on account of women and will lose wealth and happiness on account of them, will be a king and be learned.",
                hindi: "यदि जन्म के समय शुक्र मेष/वृश्चिक राशि में हो तथा सूर्य से दृष्ट हो तो व्यक्ति स्त्रियों के कारण दुखी होगा, उनके कारण धन और सुख खो देगा, राजा और विद्वान होगा।",
            },
            Mercury: {
                english:
                    "If Venus is in Gemini/Virgo and aspected by the Sun, one will be well disposed towards the king, his own mother and wife, be learned and rich.",
                hindi: "यदि शुक्र मिथुन/कन्या राशि में हो और सूर्य से दृष्ट हो तो व्यक्ति राजा, अपनी माता और पत्नी के प्रति अच्छा व्यवहार रखने वाला, विद्वान और धनी होगा।",
            },
            Jupiter: {
                english:
                    "If Venus occupies Sagittarius/Pisces at birth and aspected by the Sun, one will be very short tempered, learned, wealthy, be liked by all and will go to foreign countries.",
                hindi: "यदि जन्म के समय शुक्र धनु/मीन राशि में हो और सूर्य से दृष्ट हो तो व्यक्ति बहुत क्रोधी, विद्वान, धनवान, सभी का प्रिय और विदेश जाने वाला होगा।",
            },
            Venus: {
                english:
                    "Should Venus at birth occupy Taurus/Libra and is aspected by the Sun, the person will acquire an excellent wife and abundant wealth, will become a great man and will be subdued by women.",
                hindi: "यदि जन्म के समय शुक्र वृषभ/तुला राशि में हो तथा सूर्य से दृष्ट हो तो व्यक्ति उत्तम पत्नी और प्रचुर धन प्राप्त करेगा, महान पुरुष बनेगा तथा स्त्रियों के वशीभूत होगा।",
            },
            Sun: {
                english:
                    "If Venus occupies Leo at the time of birth and is aspected by the Sun, one will be jealous, be dear to the fair sex, libidinous will acquire money through women and will possess elephants.",
                hindi: "यदि जन्म के समय शुक्र सिंह राशि में हो और सूर्य से दृष्ट हो तो व्यक्ति ईर्ष्यालु, स्त्रियों का प्रिय, कामुक, स्त्रियों से धन प्राप्त करने वाला तथा हाथी का स्वामी होगा।",
            },
            Saturn: {
                english:
                    "Should Venus be in Capricorn/Aquarius and be in aspect to the Sun, the native will be firm, very dear to females, very wealthy, very happy and truthful and be courageous.",
                hindi: "यदि शुक्र मकर/कुंभ राशि में हो और सूर्य से दृष्ट हो तो जातक दृढ़ निश्चयी, स्त्रियों का प्रिय, बहुत धनवान, बहुत सुखी, सत्यवादी और साहसी होगा।",
            },
        },
        Saturn: {
            Moon: {
                english:
                    "If Saturn occupies Cancer at birth and is aspected by the Sun, the native will lose his father in his very boyhood be bereft of wealth, wife and happiness, will eat bad food and be sinful.",
                hindi: "यदि जन्म के समय शनि कर्क राशि में हो और सूर्य से दृष्ट हो तो जातक बचपन में ही अपने पिता को खो देगा, धन, पत्नी और सुख से वंचित रहेगा, खराब भोजन करेगा और पापी होगा।",
            },
            Mars: {
                english:
                    "If Saturn occupies a Rasi of Mars and is aspected by the Sun, one will be interested in agriculture, be very affluent, be endowed with cows, buffaloes and horses, be fortunate and industrious.",
                hindi: "यदि शनि मंगल की राशि में हो और सूर्य से दृष्ट हो तो व्यक्ति कृषि में रुचि रखने वाला, बहुत धनवान, गाय, भैंस और घोड़ों से संपन्न, भाग्यशाली और मेहनती होता है।",
            },
            Mercury: {
                english:
                    "If Saturn occupies a Rasi of Mercury at birth and is aspected by the Sun, the native will be devoid of happiness and wealth, be virtuous, bereft of anger, will endure difficulties and be valorous.",
                hindi: "यदि जन्म के समय शनि बुध की राशि में हो और सूर्य से दृष्ट हो तो जातक सुख और धन से रहित, गुणवान, क्रोध से रहित, कष्ट सहने वाला और पराक्रमी होता है।",
            },
            Jupiter: {
                english:
                    "If Saturn occupies Sagittarius, or Pisces at birth, in aspect to the Sun the native will be the father of others children and through these children he will attain wealth, name, fame and honour.",
                hindi: "यदि जन्म के समय शनि धनु या मीन राशि में हो और सूर्य पर दृष्टि हो तो जातक अन्य संतानों का पिता होगा और इन संतानों के माध्यम से वह धन, नाम, प्रसिद्धि और सम्मान प्राप्त करेगा।",
            },
            Venus: {
                english:
                    "Should Saturn be in a Sign of Venus and is aspected by the Sun, the native will be clear in speech, will lose wealth, be a scholar, will eat in others houses and be weak in constitution.",
                hindi: "यदि शनि शुक्र की राशि में हो और सूर्य से दृष्ट हो तो जातक स्पष्ट वाणी बोलने वाला, धन हानि करने वाला, विद्वान, दूसरों के घर में भोजन करने वाला तथा दुर्बल शरीर वाला होता है।",
            },
            Sun: {
                english:
                    "If Saturn occupies the Sun-owned Rasi and is aspected by the Sun himself, the native will be devoid of wealth, happiness and nobility, will be a liar and a drunkard, will possess a bad physique, be a servant and be very miserable.",
                hindi: "यदि शनि सूर्य की राशि में हो और स्वयं सूर्य द्वारा दृष्ट हो तो जातक धन, सुख और कुलीनता से रहित, झूठा और शराबी, दुर्बल शरीर वाला, नौकर और बहुत दुखी होगा।",
            },
            Saturn: {
                english:
                    "If Saturn is in Capricorn/Aquarius and is aspected by the Sun, he will be sick, will have an ugly wife, will eat others food, be miserable, wandering in nature and will carry loads.",
                hindi: "यदि शनि मकर/कुंभ राशि में हो और सूर्य से दृष्ट हो तो वह रोगी होगा, उसकी पत्नी कुरूप होगी, वह दूसरों का अन्न खाएगा, दुखी होगा, प्रकृति में भटकेगा और बोझ ढोएगा।",
            },
        },
    },
    Mars: {
        Moon: {
            Aries: {
                english:
                    "If the Moon in Aries is aspected by Mars, the person will suffer from diseases of eyes and teeth, will have wounds caused by arrows (or horse/cow etc.) and will suffer windy diseases and urinary disorders.",
                hindi: "यदि मेष राशि में स्थित चन्द्रमा पर मंगल की दृष्टि हो तो जातक को नेत्रों व दांतों के रोग, बाण (या घोड़ा/गाय आदि) से घाव, वायु रोग व मूत्र विकार आदि से कष्ट होता है।",
            },
            Taurus: {
                english:
                    "If Mars aspects the Moon in Taurus, the subject will be highly libidinous, will lose his wife and friends on account of another lady, will steal the heart of the fair sex and will prove adverse for the mother.",
                hindi: "यदि वृषभ राशि में मंगल की दृष्टि चन्द्रमा पर हो तो जातक अत्यधिक कामुक होगा, किसी अन्य स्त्री के कारण अपनी पत्नी और मित्रों को खो देगा, स्त्री का दिल चुरा लेगा तथा माता के लिए प्रतिकूल सिद्ध होगा।",
            },
            Gemini: {
                english:
                    "If Mars lends aspect to the Moon in Gemini, the person will be very valorous, very learned, be endowed with happiness, conveyances, wealth and beauty. This is certain.",
                hindi: "मिथुन राशि में मंगल की दृष्टि चन्द्रमा पर पड़े तो जातक बहुत पराक्रमी, विद्वान, सुख-संपत्ति, धन-संपत्ति और सौंदर्य से संपन्न होगा। यह निश्चित है।",
            },
            Cancer: {
                english:
                    "If the Moon in Cancer is aspected by Mars, the subject will be valorous, be deformed, will prove ominous to his mother and be skillful in his jobs.",
                hindi: "यदि कर्क राशि में स्थित चन्द्रमा पर मंगल की दृष्टि हो तो जातक वीर, विकृत, माता के लिए अशुभ तथा अपने कार्यों में निपुण होगा।",
            },
            Leo: {
                english:
                    "If Mars aspects the Moon in Leo he will be an Army chief, will have excellent wife, sons, wealth and conveyances and be superior among people.",
                hindi: "यदि सिंह राशि में मंगल की दृष्टि चंद्रमा पर हो तो वह सेना प्रमुख होगा, उत्तम पत्नी, पुत्र, धन और वाहन वाला होगा तथा लोगों में श्रेष्ठ होगा।",
            },
            Virgo: {
                english:
                    "If Mars aspects the Moon posited in Virgo, the subject will be skillful in mechanical, or fine arts (of 64 kinds), be famous, affluent, disciplined, courageous and will be inauspicious for mother.",
                hindi: "यदि कन्या राशि में स्थित चन्द्रमा पर मंगल की दृष्टि हो तो जातक यांत्रिक कला या ललित कलाओं (64 प्रकार की) में निपुण, प्रसिद्ध, धनवान, अनुशासित, साहसी होगा तथा माता के लिए अशुभ होगा।",
            },
            Libra: {
                english:
                    "If Mars aspects the Moon in Libra, the person will be sharp, be a thief, be mean, adulterous, will enjoy scents and garlands, be wise and will suffer from eye diseases.",
                hindi: "तुला राशि में यदि मंगल की दृष्टि चन्द्रमा पर हो तो जातक कुशाग्र बुद्धि, चोर, नीच, व्यभिचारी, सुगंध और मालाओं का आनंद लेने वाला, बुद्धिमान और नेत्र रोगों से ग्रस्त होगा।",
            },
            Scorpio: {
                english:
                    "Should Mars aspect the Moon in Scorpio, the native will have incomparable courage, be equal to a king, be endowed with wealth, be valorous, unconquerable in battle and be a voracious eater.",
                hindi: "वृश्चिक राशि में स्थित चन्द्रमा पर मंगल की दृष्टि हो तो जातक अतुलनीय साहस वाला, राजा के समान, धनवान, पराक्रमी, युद्ध में अजेय तथा अत्यधिक भोजन करने वाला होता है।",
            },
            Sagittarius: {
                english:
                    "Should Mars aspect the Moon in Sagittarius, the person will be an Army chief, will be very rich, fortunate, famous for his valor and will have a large working force.",
                hindi: "यदि धनु राशि में स्थित चन्द्रमा पर मंगल की दृष्टि हो तो वह व्यक्ति सेना प्रमुख, बहुत धनवान, भाग्यशाली, अपनी वीरता के लिए प्रसिद्ध तथा बड़ी कार्य शक्ति वाला होगा।",
            },
            Capricorn: {
                english:
                    "If Mars aspects the Moon in Capricorn, one will enjoy abundant riches, be highly liberal, be fortunate, wealthy, will have conveyances and be brave.",
                hindi: "यदि मकर राशि में मंगल की दृष्टि चंद्रमा पर हो तो व्यक्ति प्रचुर धन-संपत्ति का आनंद लेता है, अत्यधिक उदार, भाग्यशाली, धनवान, वाहन-सम्पन्न और साहसी होता है।",
            },
            Aquarius: {
                english:
                    "If Mars aspects the Moon in Aquarius, one will be quite truthful, will not inherit money from mother and elders, be indolent and mysterious and interested in others work.",
                hindi: "यदि कुंभ राशि में मंगल की दृष्टि चंद्रमा पर हो तो व्यक्ति सत्यवादी होगा, माता और बड़ों से धन नहीं मिलेगा, आलसी और रहस्यमय होगा तथा दूसरों के काम में रुचि रखेगा।",
            },
            Pisces: {
                english:
                    "If Mars aspects the Moon in Pisces, the person will be insulted, be devoid of happiness, is an unchaste womans son, will be interested in sins and will be valorous.",
                hindi: "यदि मीन राशि में स्थित चन्द्रमा पर मंगल की दृष्टि हो तो जातक अपमानित, सुख से रहित, पतित स्त्री का पुत्र, पाप में रुचि रखने वाला, पराक्रमी होता है।",
            },
        },
        Sun: {
            Moon: {
                english:
                    "Should Mars throw his aspect on the Sun in Cancer, one will contract pulmonary consumption and fistula in the anus, or pudendum, be dejected on account of his relatives and be a slanderer.",
                hindi: "यदि मंगल कर्क राशि में सूर्य पर अपनी दृष्टि डाले, तो व्यक्ति फुफ्फुसीय क्षय रोग और गुदा में भगन्दर (फिस्टुला) से पीड़ित होगा, अपने रिश्तेदारों के कारण निराश होगा और निंदक होगा।",
            },
            Mars: {
                english:
                    "Should the Sun be in a Sign of Mars and be aspected by Mars, the native will display his courage in battle, be cruel, will possess eyes, hands and legs of blood-red colour, be splendourous and strong.",
                hindi: "यदि सूर्य मंगल की राशि में हो और मंगल से दृष्ट हो तो जातक युद्ध में साहस दिखाएगा, क्रूर होगा, उसकी आंखें, हाथ और पैर रक्त-लाल रंग के होंगे, वह तेजस्वी और बलवान होगा।",
            },
            Sun: {
                english:
                    "If Mars aspects the Sun in Leo, the native will be interested in others wives, be courageous, valorous, revolutionary, formidable and chief.",
                hindi: "यदि सिंह राशि में मंगल सूर्य को देखता है तो जातक दूसरों की पत्नियों में रुचि रखने वाला, साहसी, वीर, क्रांतिकारी, दुर्जेय और प्रमुख होगा।",
            },
            Mercury: {
                english:
                    "The Sun in a House of Mercury and in aspect to Mars denotes, that the subject will have fear from enemies, will be encountered by quarrels, will be grieved on account of loss in a war, be poor and bashful.",
                hindi: "बुध के घर में सूर्य का होना तथा मंगल पर दृष्टि होना यह दर्शाता है कि जातक को शत्रुओं से भय रहेगा, झगड़ों का सामना करना पड़ेगा, युद्ध में हानि के कारण दुःखी होगा, निर्धन तथा संकोची होगा।",
            },
            Jupiter: {
                english:
                    "Should Mars lend aspect to the Sun in a sign of Jupiter, the subject will earn fame through battle, be endowed with clarity of speech, money and happiness and be short-tempered.",
                hindi: "यदि बृहस्पति की राशि में मंगल सूर्य पर दृष्टि डाले तो जातक युद्ध के माध्यम से प्रसिद्धि अर्जित करेगा, वाणी में स्पष्टता, धन और सुख से संपन्न होगा तथा क्रोधी होगा।",
            },
            Venus: {
                english:
                    "If Mars is aspecting the Sun in a Sign of Venus, the subject will be brave, fond of battle, bright in appearance, will earn wealth and fame out of his valor and will be deformed.",
                hindi: "यदि शुक्र की राशि में मंगल सूर्य को देख रहा हो तो जातक साहसी, युद्ध प्रिय, तेजस्वी, पराक्रम से धन और यश अर्जित करने वाला तथा विकृत शरीर वाला होगा।",
            },
            Saturn: {
                english:
                    "Mars aspecting the Sun in Capricorn, or Aquarius denotes, that the native will be troubled by diseases and enemies, will be wounded by weapons on account of quarreling with others and be deformed.",
                hindi: "मकर या कुंभ राशि में सूर्य पर मंगल की दृष्टि होने से यह संकेत मिलता है कि जातक रोगों और शत्रुओं से परेशान रहेगा, दूसरों से झगड़े के कारण हथियारों से घायल होगा और विकृत होगा।",
            },
        },
        Mercury: {
            Sun: {
                english:
                    "If Mars lends his aspect to Mercury in Leo, one will be base, miserable, physically injured, unskillful and impotent.",
                hindi: "यदि सिंह राशि में मंगल बुध पर दृष्टि डालता है तो व्यक्ति नीच, दुखी, शारीरिक रूप से घायल, अकुशल और नपुंसक होगा।",
            },
            Moon: {
                english:
                    "If Mars lends his aspect to Mercury in Cancer, he will not have much learning, be garrulous, be a great liar, will produce fictitious things, be a thief and will be affectionate in speech.",
                hindi: "यदि मंगल कर्क राशि में बुध पर दृष्टि डालता है तो वह अधिक ज्ञानी नहीं होगा, बातूनी होगा, बहुत बड़ा झूठा होगा, काल्पनिक चीजें बनाएगा, चोर होगा तथा बोलने में स्नेही होगा।",
            },
            Mars: {
                english:
                    "If Mercury is in a Sign of Mars and is aspected by Mars, one will be a liar, a sweet speaker, will promote quarrels, be learned, affluent, dear to king and valorous.",
                hindi: "यदि बुध मंगल की राशि में हो और मंगल से दृष्ट हो तो जातक झूठ बोलने वाला, मीठा बोलने वाला, झगड़ों को बढ़ावा देने वाला, विद्वान, धनवान, राजा का प्रिय और पराक्रमी होता है।",
            },
            Mercury: {
                english:
                    "Should Mercury be in his own House and receive the aspect of Mars, the person will have an injured body, be dirty, be a genius, will serve the king and be dear to him.",
                hindi: "यदि बुध अपने ही भाव में हो और मंगल की दृष्टि उस पर हो तो जातक घायल शरीर वाला, गंदा, प्रतिभाशाली, राजा की सेवा करने वाला तथा उसका प्रिय होता है।",
            },
            Jupiter: {
                english:
                    "If Mars aspects Mercury in Sagittarius/Pisces, the native will be a leader of townsmen, or thieves, will reside in forests and will be a famous writer.",
                hindi: "यदि धनु/मीन राशि में मंगल बुध को देखता है, तो जातक नगरवासियों या चोरों का नेता होगा, जंगलों में निवास करेगा और प्रसिद्ध लेखक होगा।",
            },
            Venus: {
                english:
                    "Should Mercury be in a House of Venus and be aspected by Mars, the native will be troubled by diseases and enemies, be distressed, will incur royal insult and will be deprived of all worldly objects.",
                hindi: "यदि बुध शुक्र के घर में हो और मंगल से दृष्ट हो तो जातक रोग और शत्रुओं से परेशान रहेगा, व्यथित रहेगा, राज-अपमान का भागी होगा और सभी सांसारिक वस्तुओं से वंचित रहेगा।",
            },
            Saturn: {
                english:
                    "If Mercury be in a House of Saturn and is aspected by Mars, one will be infirm in speech, be calm in disposition, bashful and happy.",
                hindi: "यदि बुध शनि के घर में हो और मंगल से दृष्ट हो तो व्यक्ति वाणी में कमजोर, स्वभाव से शांत, संकोची और प्रसन्न होगा।",
            },
        },
        Jupiter: {
            Sun: {
                english:
                    "If Jupiter is in Leo and is aspected by Mars, the native will honour elders at all times, will perform distinguished acts, be very skillful, pure, adventurous and cruel.",
                hindi: "यदि बृहस्पति सिंह राशि में हो और मंगल से दृष्ट हो तो जातक सदैव बड़ों का सम्मान करेगा, उत्कृष्ट कार्य करेगा, अत्यंत कुशल, शुद्ध, साहसी और क्रूर होगा।",
            },
            Moon: {
                english:
                    "If Jupiter occupies Gemini/Virgo and is aspected by Mars, one will marry in the boyhood itself, will be endowed with gold and ornaments, be learned, valorous and will have a wounded physique.",
                hindi: "यदि बृहस्पति मिथुन/कन्या राशि में हो और मंगल से दृष्ट हो तो जातक का विवाह बाल्यावस्था में ही हो जाएगा, वह स्वर्ण और आभूषणों से युक्त, विद्वान, पराक्रमी और घायल शरीर वाला होगा।",
            },
            Mercury: {
                english:
                    "If Jupiter occupies Gemini/Virgo and is aspected by Mars, one will be easily successful at all times, be ugly, rich and be amiable to all.",
                hindi: "यदि बृहस्पति मिथुन/कन्या राशि में हो और मंगल से दृष्ट हो, तो व्यक्ति हर समय आसानी से सफल होगा, कुरूप होगा, धनवान होगा और सभी के प्रति मिलनसार होगा।",
            },
            Mars: {
                english:
                    "If Jupiter occupies Aries/Scorpio and is aspected by Mars, one is of royal scion, will be valorous, fierce, endowed with knowledge of politics, be modest, affluent and will have a disobedient wife and disobedient servants.",
                hindi: "यदि बृहस्पति मेष/वृश्चिक राशि में हो और मंगल से दृष्ट हो तो जातक राजसी वंश का, वीर, उग्र, राजनीति का जानकार, विनम्र, धनवान, अवज्ञाकारी पत्नी और अवज्ञाकारी सेवकों वाला होता है।",
            },
            Jupiter: {
                english:
                    "If Jupiter is posited in Sagittarius/Pisces and is aspected by Mars, one will be injured in war, be cruel, will cause torture, will harm others and will lose children.",
                hindi: "यदि बृहस्पति धनु/मीन राशि में स्थित हो और मंगल से दृष्ट हो तो व्यक्ति युद्ध में घायल होगा, क्रूर होगा, अत्याचार करेगा, दूसरों को नुकसान पहुंचाएगा और बच्चों को खो देगा।",
            },
            Venus: {
                english:
                    "If Jupiter occupies a House of Venus and is aspected by Mars, the native will be dear to the fair sex, be learned, courageous, affluent, happy and be of royal Scion.",
                hindi: "यदि बृहस्पति शुक्र के घर में हो और मंगल से दृष्ट हो तो जातक स्त्री का प्रिय, विद्वान, साहसी, धनी, सुखी और राजसी वंश का होगा।",
            },
            Saturn: {
                english:
                    "If Jupiter is in a House of Saturn and is aspected by Mars, one will be valorous, be an Army chief with the king, splendourous, well-dressed, famous and honoured.",
                hindi: "यदि बृहस्पति शनि के घर में हो और मंगल से दृष्ट हो तो जातक वीर, राजा के साथ सेनापति, वैभवशाली, अच्छे वस्त्रों वाला, प्रसिद्ध और सम्मानित होगा।",
            },
        },
        Venus: {
            Sun: {
                english:
                    "If Venus is in Leo and is aspected by Mars, one will be a royal person, be famous, dear to women, be affluent, fortunate and be attached to others wives.",
                hindi: "यदि शुक्र सिंह राशि में हो और मंगल से दृष्ट हो तो व्यक्ति राजसी, प्रसिद्ध, स्त्रियों का प्रिय, धनवान, भाग्यशाली और दूसरों की पत्नियों में आसक्त होगा।",
            },
            Moon: {
                english:
                    "If Venus is in Cancer and is aspected by Mars, one will be skillful in arts, be very rich, will suffer on account of women, be fortunate and will promote the cause of his relatives.",
                hindi: "यदि शुक्र कर्क राशि में हो और मंगल से दृष्ट हो तो व्यक्ति कला में निपुण, बहुत धनवान, स्त्रियों के कारण कष्ट भोगने वाला, भाग्यशाली तथा अपने संबंधियों के हित में कार्य करने वाला होता है।",
            },
            Mercury: {
                english:
                    "If Venus is in Gemini, or Virgo and is aspected by Mars, one will be highly sensuous, be fortunate and will destroy his wealth through women.",
                hindi: "यदि शुक्र मिथुन या कन्या राशि में हो और मंगल से दृष्ट हो तो व्यक्ति अत्यधिक कामुक, भाग्यशाली और स्त्रियों के माध्यम से अपने धन को नष्ट करने वाला होगा।",
            },
            Jupiter: {
                english:
                    "If Venus is in Sagittarius, or Pisces and is aspected by Mars, one will be very much ill-disposed towards women, will be both happy and miserable, be rich and will possess cows.",
                hindi: "यदि शुक्र धनु या मीन राशि में हो और मंगल से दृष्ट हो तो व्यक्ति स्त्रियों के प्रति बहुत अधिक द्वेषपूर्ण होगा, सुखी और दुखी दोनों होगा, धनवान होगा और गायों का स्वामी होगा।",
            },
            Mars: {
                english:
                    "If Venus is in Aries, or Scorpio and is aspected by Mars, one will be devoid of wealth, honour and happiness, will do others jobs and will perform dirty jobs.",
                hindi: "यदि शुक्र मेष या वृश्चिक राशि में हो और मंगल से दृष्ट हो तो व्यक्ति धन, मान और सुख से रहित होगा, दूसरों के काम करेगा और गंदे काम करेगा।",
            },
            Venus: {
                english:
                    "If Venus is in Taurus, or Libra and is aspected by Mars, one will marry a bad female, will lose home and wealth on account of females and be sensuous.",
                hindi: "यदि शुक्र वृषभ या तुला राशि में हो और मंगल से दृष्ट हो तो व्यक्ति बुरी स्त्री से विवाह करेगा, स्त्रियों के कारण घर और धन खो देगा तथा कामुक होगा।",
            },
            Saturn: {
                english:
                    "If Venus is in Capricorn, or Aquarius and is aspected by Mars, one will lose his spouse, will suffer many evils and diseases, will undergo difficulties and later on be happy.",
                hindi: "यदि शुक्र मकर या कुंभ राशि में हो और मंगल से दृष्ट हो तो व्यक्ति अपने जीवनसाथी को खो देगा, अनेक बुराइयों और बीमारियों से ग्रस्त होगा, कठिनाइयों से गुजरेगा और बाद में सुखी रहेगा।",
            },
        },
        Saturn: {
            Sun: {
                english:
                    "If Saturn is in Leo and is aspected by Mars, one will everyday move from place to place, be unfortunate, will live in fortresses and hills, be base and be bereft of wife and sons.",
                hindi: "यदि शनि सिंह राशि में हो और मंगल से दृष्ट हो तो व्यक्ति प्रतिदिन एक स्थान से दूसरे स्थान पर घूमता रहेगा, दुर्भाग्यशाली होगा, दुर्गों और पहाड़ियों में निवास करेगा, नीच होगा तथा स्त्री और पुत्र से रहित होगा।",
            },
            Moon: {
                english:
                    "If Saturn is in Cancer and is aspected by Mars, one will enjoy kings wealth, be defective bodied, will possess gold and gems, be endowed with a family and will have a bad group of relatives and wife.",
                hindi: "यदि शनि कर्क राशि में हो और मंगल से दृष्ट हो तो जातक राजा के समान धनवान, विकृत शरीर वाला, स्वर्ण और रत्नों से युक्त, धनवान, कुटुम्बी, दुष्ट सम्बन्धी और पत्नी वाला होता है।",
            },
            Mercury: {
                english:
                    "If Saturn is in Gemini, or Virgo and is aspected by Mars, one will be a famous boxer, be stupefied, will carry heavy loads and will possess an ugly body.",
                hindi: "यदि शनि मिथुन या कन्या राशि में हो और मंगल से दृष्ट हो तो व्यक्ति प्रसिद्ध मुक्केबाज होगा, मूर्च्छित होगा, भारी बोझ उठाएगा और कुरूप शरीर वाला होगा।",
            },
            Jupiter: {
                english:
                    "If Saturn is in Sagittarius, or Pisces and is aspected by Mars, one will be troubled by windy diseases, will dislike people, be sinful, mean, blameworthy etc.",
                hindi: "यदि शनि धनु या मीन राशि में हो और मंगल से दृष्ट हो तो व्यक्ति वायुजनित रोगों से परेशान होगा, लोगों से घृणा करेगा, पापी, नीच, निंदनीय आदि होगा।",
            },
            Venus: {
                english:
                    "If Saturn is in Taurus, or Libra and is aspected by Mars, one will be skillful in war preparations, but will be away from war, will speak much and be endowed with wealth and family.",
                hindi: "यदि शनि वृषभ या तुला राशि में हो और मंगल से दृष्ट हो तो व्यक्ति युद्ध की तैयारी में कुशल होगा, लेकिन युद्ध से दूर रहेगा, अधिक बोलेगा और धन एवं परिवार से संपन्न होगा।",
            },
            Mars: {
                english:
                    "If Saturn is in Aries, or Scorpio and is aspected by Mars, one will kill animals, be base, be a leader of robbers, be famous and be fond of (joining other) women, meat and wine.",
                hindi: "यदि शनि मेष या वृश्चिक राशि में हो और मंगल से दृष्ट हो तो व्यक्ति पशु हत्या करने वाला, नीच, लुटेरों का नेता, प्रसिद्ध, परस्त्री गमन, मांस और मदिरा का शौकीन होगा।",
            },
            Saturn: {
                english:
                    "If Saturn is in Capricorn, or Aquarius and is aspected by Mars, one will be very valorous, famous, be superior among great men and sharp.",
                hindi: "यदि शनि मकर या कुंभ राशि में हो और मंगल से दृष्ट हो तो व्यक्ति बहुत पराक्रमी, प्रसिद्ध, महापुरुषों में श्रेष्ठ और तेजवान होता है।",
            },
        },
    },
    Mercury: {
        Moon: {
            Aries: {
                english:
                    "Should Mercury aspect the Moon in Aries, the native will teach various disciplines, will possess good speech, will achieve his desires, be a great poet and be widely famous.",
                hindi: "यदि मेष राशि में बुध की दृष्टि चन्द्रमा पर हो तो जातक विभिन्न विद्याओं को पढ़ाएगा, अच्छी वाणी वाला होगा, अपनी इच्छाओं को प्राप्त करेगा, महान कवि होगा और व्यापक रूप से प्रसिद्ध होगा।",
            },
            Taurus: {
                english:
                    "Should the said Moon be in aspect to Mercury, the native will be highly learned, will know the code of speech, be of pleasing disposition, be dear to everyone and will uncomparably be of good qualities.",
                hindi: "यदि उक्त चन्द्रमा बुध से दृष्ट हो तो जातक अत्यधिक विद्वान होगा, वाणी का ज्ञाता होगा, प्रसन्न स्वभाव का होगा, सभी का प्रिय होगा तथा अतुलनीय रूप से अच्छे गुणों वाला होगा।",
            },
            Gemini: {
                english:
                    "The Moon in Gemini aspected by Mercury makes one skillful in producing money, always successful and inviolable king.",
                hindi: "मिथुन राशि में स्थित चन्द्रमा पर बुध की दृष्टि होने से व्यक्ति धन कमाने में कुशल, सदैव सफल और अविनाशी राजा बनता है।",
            },
            Cancer: {
                english:
                    "Should Mercury lend his aspect to the Moon in Cancer, he will be spirited in disposition, be endowed with political wisdom, wealth, wife and sons, will be a kings minister and be happy.",
                hindi: "यदि बुध कर्क राशि में चन्द्रमा पर दृष्टि डाले तो वह स्वभाव से उत्साही, राजनीतिक बुद्धि, धन, पत्नी और पुत्रों से संपन्न, राजा का मंत्री और सुखी होगा।",
            },
            Leo: {
                english:
                    "Should Mercury aspect the Moon in Leo one will be endowed with the characteristics of a female and also the grace akin to that of a female, will be in the custody of females, will serve females and will enjoy money, happiness and pleasures.",
                hindi: "यदि सिंह राशि में बुध की दृष्टि चन्द्रमा पर हो तो व्यक्ति स्त्री के गुणों से युक्त होगा तथा स्त्री के समान ही कृपालु होगा, स्त्रियों के अधीन रहेगा, स्त्रियों की सेवा करेगा तथा धन, सुख और आनंद का आनंद लेगा।",
            },
            Virgo: {
                english:
                    "Should it be Mercury, that lends aspect to the Moon in Virgo, the native will be expert in astrology and literature, be successful in disputes/quarrels and be highly skillful to a surprising extent.",
                hindi: "यदि कन्या राशि में बुध की दृष्टि चन्द्रमा पर हो तो जातक ज्योतिष और साहित्य में निपुण होगा, विवादों/झगड़ों में सफल होगा तथा आश्चर्यजनक सीमा तक अत्यधिक कुशल होगा।",
            },
            Libra: {
                english:
                    "If Mercury aspects the Moon in Libra, the subject will be skillful in arts, will have abundant riches and grains, will be an auspicious speaker, be highly learned and be famous in his country.",
                hindi: "तुला राशि में बुध की दृष्टि चन्द्रमा पर हो तो जातक कला में निपुण, प्रचुर धन-धान्य वाला, शुभ वक्ता, उच्च कोटि का विद्वान तथा अपने देश में प्रसिद्ध होगा।",
            },
            Scorpio: {
                english:
                    "If Mercury aspects the Moon in Scorpio, the person will not be skillful, be hard in speech, will obtain twins, be tricky, will produce fictitious things and be an expert singer.",
                hindi: "वृश्चिक राशि में बुध की दृष्टि चन्द्रमा पर हो तो जातक निपुण नहीं होगा, बोलने में कठोर होगा, जुड़वां बच्चे होंगे, चालाक होगा, काल्पनिक चीजें बनाएगा और कुशल गायक होगा।",
            },
            Sagittarius: {
                english:
                    "If the Moon in Sagittarius is aspected by Mercury, one will have many servants, will be an expert astrologer and artist and be a skillful dancer.",
                hindi: "यदि धनु राशि में स्थित चंद्रमा पर बुध की दृष्टि हो तो जातक के पास बहुत से नौकर होंगे, वह एक कुशल ज्योतिषी और कलाकार होगा तथा एक कुशल नर्तक होगा।",
            },
            Capricorn: {
                english:
                    "If Mercury aspects the Moon in Capricorn, one will be dunce, be interested in living in other places, be bereft of wife, be fickle minded and be devoid of happiness and money.",
                hindi: "मकर राशि में बुध की दृष्टि चन्द्रमा पर हो तो व्यक्ति मूर्ख, अन्य स्थानों पर रहने का इच्छुक, स्त्री से विहीन, चंचल मन वाला, सुख व धन से रहित होता है।",
            },
            Aquarius: {
                english:
                    "If Mercury aspects the Moon in Aquarius, the native will be skillful in treating others well, while hosting them, will be proficient in music, will be liked by the fair sex and will possess less money and less happiness.",
                hindi: "यदि कुंभ राशि में बुध की दृष्टि चंद्रमा पर हो तो जातक दूसरों के साथ अच्छा व्यवहार करने में कुशल होगा, उनका आतिथ्य करेगा, संगीत में निपुण होगा, स्त्री वर्ग द्वारा पसंद किया जाएगा तथा उसके पास कम धन और कम सुख होगा।",
            },
            Pisces: {
                english:
                    "He will be a king, if the Moon in Pisces is aspected by Mercury; will be highly intelligent, be happy and will be surrounded by supreme females and be controlled by them.",
                hindi: "यदि मीन राशि में स्थित चंद्रमा पर बुध की दृष्टि हो तो वह राजा होगा; वह अत्यधिक बुद्धिमान, प्रसन्न होगा, श्रेष्ठ स्त्रियों से घिरा होगा तथा उनके द्वारा नियंत्रित होगा।",
            },
        },
        Sun: {
            Moon: {
                english:
                    "If Mercury aspects the Sun in Cancer, the native will be famous for his learning and honour, be dear to the king, skillful and will destroy enemies.",
                hindi: "यदि कर्क राशि में बुध सूर्य को देखता है तो जातक अपनी विद्या और सम्मान के लिए प्रसिद्ध, राजा का प्रिय, कुशल और शत्रुओं का नाश करने वाला होता है।",
            },
            Mars: {
                english:
                    "Should the Sun be in a Sign of Mars and be aspected by Mercury, the subject will be a servant, will do others jobs, will not have much wealth, be devoid of strength, be subjected to much grief and will possess a dirty body.",
                hindi: "यदि सूर्य मंगल की राशि में हो और बुध से दृष्ट हो तो जातक नौकर होगा, दूसरों के काम करेगा, अधिक धन नहीं रखेगा, बलहीन होगा, अधिक दुःख भोगेगा और मलिन शरीर वाला होगा।",
            },
            Mercury: {
                english:
                    "Should Mercury aspect the Sun posited in Gemini, or Virgo, the subject will have a history akin to that of a king, will be famous, be endowed with relatives, free from enemies, but will encounter eye diseases.",
                hindi: "यदि बुध मिथुन या कन्या राशि में स्थित सूर्य पर दृष्टि डाले तो जातक का इतिहास राजा के समान होगा, वह प्रसिद्ध होगा, उसके पास बहुत से सम्बन्धी होंगे, वह शत्रुओं से मुक्त होगा, किन्तु उसे नेत्र रोग होंगे।",
            },
            Sun: {
                english:
                    "If Mercury aspects the Sun in Leo, the person will be a scholar, a writer (or an exponent), a gambler, be wandering-natured, mean and be endowed with great strength.",
                hindi: "यदि सिंह राशि में बुध की दृष्टि सूर्य पर हो तो जातक विद्वान, लेखक (या व्याख्याता), जुआरी, भ्रमणशील स्वभाव वाला, क्षुद्र एवं महान बलवान होता है।",
            },
            Jupiter: {
                english:
                    "Mercury aspecting the said Sun denotes, that the native will possess sweet speech and will have knowledge of writing, literature, arts, assembly, Journey and minerals.",
                hindi: "बुध की सूर्य पर दृष्टि होने से यह संकेत मिलता है कि जातक मधुर वाणी वाला होगा तथा लेखन, साहित्य, कला, सभा, यात्रा और खनिजों का ज्ञान रखेगा।",
            },
            Venus: {
                english:
                    "Should it be Mercury, that aspects the Sun in a Sign of Venus, one will be skillful in drawing, writing, poetry, authorship, singing etc. and will possess a good physique.",
                hindi: "यदि बुध शुक्र की राशि में सूर्य को देख रहा हो तो व्यक्ति चित्रकारी, लेखन, कविता, लेखन, गायन आदि में निपुण होगा तथा उसका शरीर भी अच्छा होगा।",
            },
            Saturn: {
                english:
                    "If Mercury aspects the Sun in Capricorn, or Aquarius, the person will be brave, will have a eunuchs nature, will steal others wealth and will have all limbs devoid of strength.",
                hindi: "यदि मकर या कुंभ राशि में बुध की दृष्टि सूर्य पर हो तो जातक साहसी, नपुंसक स्वभाव वाला, दूसरों का धन चुराने वाला तथा सभी अंगों में शक्तिहीनता होगी।",
            },
        },
        Mars: {
            Sun: {
                english:
                    "If Mercury aspects Mars in Leo, the native will be clever in many arts, be a miser, be skillful in poetry and fine arts and be wicked.",
                hindi: "यदि सिंह राशि में बुध की दृष्टि मंगल पर हो तो जातक अनेक कलाओं में निपुण, कंजूस, काव्य एवं ललित कलाओं में निपुण तथा दुष्ट होगा।",
            },
            Moon: {
                english:
                    "If Mercury aspects Mars in Cancer, the person will be dirty, sinful, will possess a mean family, will be rejected by his own men and be shameless.",
                hindi: "यदि कर्क राशि में बुध की दृष्टि मंगल पर हो तो जातक गंदा, पापी, नीच परिवार वाला, अपने ही लोगों द्वारा तिरस्कृत और बेशर्म होगा।",
            },
            Mars: {
                english:
                    "Should Mars at birth be in Aries/Scorpio and be aspected by Mercury, the subject will be an expert in stealing others money, be a liar, be devoted to Manmatha (i.e. highly libidinous), be hostile and will frequently visit prostitutes.",
                hindi: "यदि जन्म के समय मंगल मेष/वृश्चिक राशि में हो और बुध से दृष्ट हो, तो वह व्यक्ति दूसरों का धन चुराने में माहिर, झूठा, मनमौजी (अर्थात अत्यधिक कामुक), शत्रुतापूर्ण और वेश्याओं के पास बार-बार जाने वाला होगा।",
            },
            Mercury: {
                english:
                    "If Mars is in Gemini/Virgo and is aspected by Mercury, one will be skillful in the art of writing, in mathematics and in poetry, be garrulous, be liar, be a sweet speaker, be a messenger (or an ambassador) and will endure lot of misery.",
                hindi: "यदि मंगल मिथुन/कन्या राशि में हो और बुध से दृष्ट हो तो व्यक्ति लेखन कला, गणित और काव्य में निपुण, बातूनी, झूठ बोलने वाला, मधुर वक्ता, संदेशवाहक (या राजदूत) होगा और बहुत दुख सहेगा।",
            },
            Jupiter: {
                english:
                    "If Mars is in Sagittarius, or Pisces and is aspected by Mercury, the person will be a scholar, be skillful, learned in fine arts and be highly learned in general.",
                hindi: "यदि मंगल धनु या मीन राशि में हो और बुध से दृष्ट हो तो व्यक्ति विद्वान, निपुण, ललित कलाओं में पारंगत तथा सामान्य रूप से उच्च विद्वान होगा।",
            },
            Venus: {
                english:
                    "If Mars is in Taurus/Libra with the aspect of Mercury, the native will promote quarrels, will speak much, will have a soft body, will possess (indifferent or) few sons and little wealth and will be learned in Shastras.",
                hindi: "यदि मंगल वृषभ/तुला राशि में बुध की दृष्टि से स्थित हो तो जातक झगड़े को बढ़ावा देगा, अधिक बोलेगा, कोमल शरीर वाला होगा, (उदासीन या) कम पुत्र और अल्प धन वाला होगा तथा शास्त्रों का ज्ञाता होगा।",
            },
            Saturn: {
                english:
                    "Should Mars be in Capricorn, or Aquarius and be aspected by Mercury, the subject will walk very slowly, be not rich, will not have any profession, be not strong, be not outspoken and be not virtuous.",
                hindi: "यदि मंगल मकर या कुंभ राशि में हो और बुध से दृष्ट हो तो जातक बहुत धीरे चलेगा, धनी नहीं होगा, कोई व्यवसाय नहीं करेगा, बलवान नहीं होगा, मुखर नहीं होगा और गुणवान नहीं होगा।",
            },
        },
        Jupiter: {
            Sun: {
                english:
                    "If Jupiter is in Leo and is aspected by Mercury, the native will have knowledge of civil works of building construction, will be endowed with profane knowledge, be virtuous, be a sweet speaker, be a minister and be highly learned.",
                hindi: "यदि बृहस्पति सिंह राशि में हो और बुध से दृष्ट हो तो जातक भवन निर्माण के कार्यों का ज्ञान रखता है, अध्यात्म विद्या से संपन्न, गुणवान, मधुर वक्ता, मंत्री और उच्च विद्वान होता है।",
            },
            Moon: {
                english:
                    "If Jupiter occupies Gemini/Virgo and is aspected by Mercury, one will be endowed with relatives and friends, be rich, will promote quarrels, be bereft of sins, be a minister and be trustworthy.",
                hindi: "यदि बृहस्पति मिथुन/कन्या राशि में हो और बुध से दृष्ट हो तो जातक बंधु-बांधवों से संपन्न, धनवान, झगड़ों को बढ़ावा देने वाला, पापों से रहित, मंत्री और विश्वसनीय होता है।",
            },
            Mars: {
                english:
                    "If Jupiter occupies Aries/Scorpio and is aspected by Mercury, the native will be a liar, be crafty, sinful, will be skillful in detecting others defects, will serve others, be grateful, be modest and be not outspoken.",
                hindi: "यदि बृहस्पति मेष/वृश्चिक राशि में हो और बुध से दृष्ट हो तो जातक झूठा, धूर्त, पापी, दूसरों के दोष पहचानने में कुशल, दूसरों की सेवा करने वाला, कृतज्ञ, विनम्र तथा मुखर न होने वाला होगा।",
            },
            Mercury: {
                english:
                    "If Jupiter occupies Gemini/Virgo and is aspected by Mercury, one will be a skillful astrologer, will have many children and wives and will be exponent of many aphorisms and precepts and speak with great excellence.",
                hindi: "यदि बृहस्पति मिथुन/कन्या राशि में हो और बुध से दृष्ट हो, तो व्यक्ति कुशल ज्योतिषी होगा, उसके अनेक बच्चे और पत्नियां होंगी, वह अनेक सूक्तियों और उपदेशों का वक्ता होगा तथा बहुत उत्कृष्टता से बोलेगा।",
            },
            Jupiter: {
                english:
                    "If Jupiter is posited in Sagittarius/Pisces and is aspected by Mercury, the native will be a minister, or a king, will be happy with wealth, fortunes and progeny and will enjoy all kinds of delights.",
                hindi: "यदि बृहस्पति धनु/मीन राशि में स्थित हो और बुध से दृष्ट हो तो जातक मंत्री या राजा होगा, धन, सौभाग्य और संतान से प्रसन्न होगा तथा सभी प्रकार के सुखों का आनंद लेगा।",
            },
            Venus: {
                english:
                    "If Jupiter occupies a House of Venus and is aspected by Mercury, the native will be learned, Skillful, sweet, fortunate, endowed with riches, be highly virtuous and be splendourous.",
                hindi: "यदि बृहस्पति शुक्र के घर में हो और बुध से दृष्ट हो तो जातक विद्वान, कुशल, मधुरभाषी, भाग्यशाली, धनवान, अत्यंत गुणवान और वैभवशाली होगा।",
            },
            Saturn: {
                english:
                    "If Jupiter is in a House of Saturn and is aspected by Mercury, one will be highly libidinous, important among his folk, rich by conveyances and wealth, famous and will have many friends.",
                hindi: "यदि बृहस्पति शनि के घर में हो और बुध से दृष्ट हो तो व्यक्ति अत्यधिक कामुक, अपने लोगों के बीच महत्वपूर्ण, वाहन और धन से समृद्ध, प्रसिद्ध और अनेक मित्रों वाला होगा।",
            },
        },
        Venus: {
            Sun: {
                english:
                    "If Venus is in Leo and is aspected by Mercury, one will be ever engaged in earning, be miserly in disposition, be addicted to women, will join others wives, be courageous, crafty, false and wealthy.",
                hindi: "यदि शुक्र सिंह राशि में हो और बुध से दृष्ट हो तो जातक सदैव कमाने में लगा रहता है, स्वभाव से कंजूस, स्त्रियों में आसक्त, दूसरों की पत्नियों से युक्त, साहसी, धूर्त, मिथ्याचारी और धनवान होता है।",
            },
            Moon: {
                english:
                    "If Venus is in Cancer and is aspected by Mercury, one will marry a learned woman, will suffer miseries on account of his relatives, will wander, be wealthy and learned.",
                hindi: "यदि शुक्र कर्क राशि में हो और बुध से दृष्ट हो तो व्यक्ति विद्वान स्त्री से विवाह करेगा, अपने संबंधियों के कारण कष्ट भोगेगा, भ्रमणशील रहेगा, धनवान और विद्वान होगा।",
            },
            Mars: {
                english:
                    "If Venus is in Aries, or Scorpio and is aspected by Mercury, one will be foolish, profligate, unworthy, be not in good terms with his own relatives, be immodest, thievish, mean and cruel.",
                hindi: "यदि शुक्र मेष या वृश्चिक राशि में हो और बुध से दृष्ट हो तो व्यक्ति मूर्ख, अपव्ययी, अयोग्य, अपने ही रिश्तेदारों से अच्छे संबंध न रखने वाला, अविनम्र, चोर, नीच और क्रूर होगा।",
            },
            Jupiter: {
                english:
                    "If Venus is in Sagittarius, or Pisces and is aspected by Mercury, one will be endowed with all kinds of robes, ornaments, foods and drinks and will possess plenty of money and horses and cows, will possess many wives and many sons, be happy and be very wealthy.",
                hindi: "यदि शुक्र धनु या मीन राशि में हो और बुध से दृष्ट हो तो वह सभी प्रकार के वस्त्र, आभूषण, भोजन और पेय से संपन्न होगा, उसके पास बहुत सारा धन, घोड़े और गायें होंगी, कई पत्नियां और कई पुत्र होंगे, वह सुखी और बहुत धनवान होगा।",
            },
            Venus: {
                english:
                    "If Venus is in Taurus, or Libra and is aspected by Mercury, one will be splendourous, sweet, fortunate, happy, bold, wise and virtuous and will possess distinguished strength.",
                hindi: "यदि शुक्र वृषभ या तुला राशि में हो और बुध से दृष्ट हो तो व्यक्ति तेजस्वी, मधुरभाषी, भाग्यशाली, सुखी, साहसी, बुद्धिमान, गुणी होगा तथा उसमें विशिष्ट शक्ति होगी।",
            },
            Mercury: {
                english:
                    "If Venus is in Gemini, or Virgo and is aspected by Mercury, one will be learned, sweet in disposition, wealthy and endowed with conveyances and children, be fortunate and be leader of men, or be a king.",
                hindi: "यदि शुक्र मिथुन या कन्या राशि में हो और बुध से दृष्ट हो तो व्यक्ति विद्वान, मधुर स्वभाव वाला, धनवान, वाहन और संतान से संपन्न, भाग्यशाली और पुरुषों का नेता या राजा होता है।",
            },
            Saturn: {
                english:
                    "If Venus is in Capricorn, or Aquarius and is aspected by Mercury, one will be learned, rich, skillful in sacred precepts, highly scholastic, truthful and happy.",
                hindi: "यदि शुक्र मकर या कुंभ राशि में हो और बुध से दृष्ट हो तो व्यक्ति विद्वान, धनवान, धार्मिक उपदेशों में निपुण, उच्च विद्वान, सत्यनिष्ठ और सुखी होगा।",
            },
        },
        Saturn: {
            Sun: {
                english:
                    "If Saturn is in Leo and is aspected by Mercury, one will not be outspoken, be lazy, poor, will do females jobs, be dirty and miserable.",
                hindi: "यदि शनि सिंह राशि में हो और बुध से दृष्ट हो तो व्यक्ति मुखर नहीं होगा, आलसी, गरीब, स्त्रियों के काम करने वाला, गंदा और दुखी होगा।",
            },
            Moon: {
                english:
                    "If Saturn is in Cancer and is aspected by Mercury, one will be hard-hearted, garrulous, will conquer his enemies, will show vanity and will do noble acts.",
                hindi: "यदि शनि कर्क राशि में हो और बुध से दृष्ट हो तो व्यक्ति कठोर हृदय वाला, बातूनी, शत्रुओं पर विजय पाने वाला, घमंडी और नेक कार्य करने वाला होगा।",
            },
            Mars: {
                english:
                    "If Saturn is in Aries, or Scorpio and is aspected by Mercury, one will be untruthful, not virtuous, will eat much, be a famous thief and be devoid of happiness and riches.",
                hindi: "यदि शनि मेष या वृश्चिक राशि में हो और बुध से दृष्ट हो तो जातक असत्य बोलने वाला, सदाचारी न होने वाला, अधिक खाने वाला, प्रसिद्ध चोर तथा सुख व धन से रहित होता है।",
            },
            Jupiter: {
                english:
                    "If Saturn is in Sagittarius, or Pisces and is aspected by Mercury, one will be equal to a king, be happy, be a preceptor, be honourable, rich and fortunate.",
                hindi: "यदि शनि धनु या मीन राशि में हो और बुध से दृष्ट हो तो जातक राजा के समान, सुखी, गुरु, सम्माननीय, धनवान और भाग्यशाली होता है।",
            },
            Venus: {
                english:
                    "If Saturn is in Taurus, or Libra and is aspected by Mercury one will always be jocularly disposed, be equal to a neuter, will serve females and be base.",
                hindi: "यदि शनि वृषभ या तुला राशि में हो और बुध से दृष्ट हो तो व्यक्ति सदैव विनोदी स्वभाव का, नपुंसक के समान, स्त्रियों की सेवा करने वाला तथा नीच स्वभाव का होगा।",
            },
            Mercury: {
                english:
                    "If Saturn is in Gemini, or Virgo and is aspected by Mercury, one will be rich, skillful in war, be a dance master, a skillful singer and an expert in arts.",
                hindi: "यदि शनि मिथुन या कन्या राशि में हो और बुध से दृष्ट हो तो व्यक्ति धनवान, युद्ध में निपुण, नृत्य गुरु, कुशल गायक और कला में निपुण होता है।",
            },
            Saturn: {
                english:
                    "If Saturn is in Capricorn, or Aquarius and is aspected by Mercury, he will carry loads, be clouded in mentality (or Tamasik in disposition), be good-looking, wandering-natured, learned, be not quite wealthy and be fortunate.",
                hindi: "यदि शनि मकर या कुंभ राशि में हो और बुध से दृष्ट हो तो वह बोझ ढोने वाला, धुँधली मानसिकता वाला (या तामसिक स्वभाव वाला), सुन्दर, भ्रमणशील स्वभाव वाला, विद्वान, कम धनवान और भाग्यशाली होगा।",
            },
        },
    },
    Jupiter: {
        Moon: {
            Aries: {
                english:
                    "If Jupiter aspects the Moon in Aries, the person will be endowed with servants and abundant riches and be a king, or a kings minister.",
                hindi: "यदि बृहस्पति मेष राशि में चंद्रमा को देखता है, तो व्यक्ति नौकरों और प्रचुर धन से संपन्न होगा और राजा या राजा का मंत्री होगा।",
            },
            Taurus: {
                english:
                    "If Jupiter aspects the Moon in Taurus, the native will have long living wife and children and lasting wealth, be respectfully disposed to his parents, be virtuous and very famous.",
                hindi: "यदि बृहस्पति वृषभ राशि में चंद्रमा को देखता है, तो जातक दीर्घायु पत्नी और बच्चों वाला, स्थायी धनवान, माता-पिता के प्रति आदरपूर्ण, गुणवान और बहुत प्रसिद्ध होगा।",
            },
            Gemini: {
                english:
                    "If Jupiter aspects the Moon in Gemini, one will be a teacher of Shastras, be famous, truthful, very beautiful, honourable and be an eloquent speaker.",
                hindi: "यदि मिथुन राशि में बृहस्पति की दृष्टि चन्द्रमा पर हो तो व्यक्ति शास्त्रों का शिक्षक, प्रसिद्ध, सत्यवादी, अत्यंत सुंदर, सम्माननीय और वाक्पटु वक्ता होगा।",
            },
            Cancer: {
                english:
                    "Jupiter aspecting the Moon in her own House indicates, that the person will be a king, be endowed with royal qualities, be happy, will have a good wife, will behave well, be modest and valorous.",
                hindi: "बृहस्पति का अपने ही भाव में चन्द्रमा पर दृष्टि डालना यह दर्शाता है कि जातक राजा होगा, राजसी गुणों से युक्त होगा, सुखी होगा, अच्छी पत्नी होगी, अच्छा आचरण करेगा, विनम्र और वीर होगा।",
            },
            Leo: {
                english:
                    "If Jupiter aspects the Moon in Leo, one will be excellent among his caste-men, be wide-famed, highly virtuous and will equal a king.",
                hindi: "यदि सिंह राशि में बृहस्पति की दृष्टि चन्द्रमा पर हो तो जातक अपने जाति के लोगों में श्रेष्ठ, प्रसिद्ध, अत्यंत गुणवान तथा राजा के समान होगा।",
            },
            Virgo: {
                english:
                    "Jupiter aspecting the Moon in Virgo indicates, that the native will be supreme among his relatives, be happy, will carry out royal duties, will keep up his word and will be endowed with wealth.",
                hindi: "कन्या राशि में चन्द्रमा पर बृहस्पति की दृष्टि यह दर्शाती है कि जातक अपने रिश्तेदारों में श्रेष्ठ होगा, सुखी होगा, राजसी कर्तव्यों का पालन करेगा, अपने वचन का पालन करेगा तथा धन-संपत्ति से संपन्न होगा।",
            },
            Libra: {
                english:
                    "Should Jupiter aspect the Moon in Libra, the person will be always worshipped and be skillful in sales and purchases of gems etc.",
                hindi: "यदि तुला राशि में बृहस्पति की दृष्टि चन्द्रमा पर हो तो जातक सदैव पूजित रहेगा तथा रत्न आदि के क्रय-विक्रय में कुशल होगा।",
            },
            Scorpio: {
                english:
                    "If Jupiter lends aspect to the Moon in Scorpio, the native will be interested in performing his duties, will be biased towards people, be wealthy and be beautiful.",
                hindi: "यदि बृहस्पति वृश्चिक राशि में चंद्रमा पर दृष्टि डालता है, तो जातक अपने कर्तव्यों को निभाने में रुचि रखेगा, लोगों के प्रति पक्षपाती होगा, धनवान और सुंदर होगा।",
            },
            Sagittarius: {
                english:
                    "If Jupiter aspects the Moon in Sagittarius, one will possess very attractive physique, be a kings minister and will be endowed with wealth, virtues and happiness.",
                hindi: "यदि धनु राशि में बृहस्पति की दृष्टि चंद्रमा पर हो तो जातक अत्यंत आकर्षक शरीर वाला, राजा का मंत्री, धन, गुण और सुख से संपन्न होता है।",
            },
            Capricorn: {
                english:
                    "Should Jupiter aspect the Moon in Capricorn at birth, the native will be a king, be incomparably brave, will have royal qualities and will possess many wives, children and friends.",
                hindi: "यदि जन्म के समय गुरु मकर राशि में चंद्रमा पर दृष्टि डालता है, तो जातक राजा होगा, अतुलनीय साहसी होगा, राजसी गुणों से युक्त होगा तथा उसकी कई पत्नियाँ, संतान और मित्र होंगे।",
            },
            Aquarius: {
                english:
                    "Should Jupiter aspect the Moon in Aquarius, the native will own villages, agriculture lands and trees, be endowed with superior castles and superior ladies and will be devoted to (sensual) enjoyment (Bhogi also means rich person, or a king)",
                hindi: "यदि बृहस्पति कुंभ राशि में चंद्रमा को देखता है, तो जातक गांवों, कृषि भूमि और पेड़ों का मालिक होगा, उत्कृष्ट महलों और श्रेष्ठ महिलाओं से संपन्न होगा और (इंद्रिय) भोग में समर्पित होगा (भोगी का अर्थ अमीर व्यक्ति या राजा भी होता है)",
            },
            Pisces: {
                english:
                    "If Jupiter aspects the Moon in Pisces, he will be beautiful, fierce, head of a district, be very affluent, beautiful and will be surrounded by many women.",
                hindi: "यदि बृहस्पति मीन राशि में चंद्रमा को देखता है, तो वह सुंदर, उग्र, जिले का मुखिया, बहुत समृद्ध, सुंदर और कई महिलाओं से घिरा होगा।",
            },
        },
        Sun: {
            Moon: {
                english:
                    "Should Jupiter throw his aspect in Cancer occupied by the Sun, the native will be pre-eminent, a king, a minister, or an Army chief, be very famous and learned in arts.",
                hindi: "यदि बृहस्पति सूर्य से प्रभावित कर्क राशि पर दृष्टि डाले तो जातक श्रेष्ठ, राजा, मंत्री या सेना प्रमुख होगा, बहुत प्रसिद्ध होगा और कला में पारंगत होगा।",
            },
            Mars: {
                english:
                    "Should the Sun be in a Sign of Mars and Jupiter aspects the said Sun, the native will have plenty of money, will donate, be a kings minister, a judge and a supreme person.",
                hindi: "यदि सूर्य मंगल की राशि में हो और बृहस्पति की दृष्टि सूर्य पर हो तो जातक के पास बहुत धन होगा, वह दान देने वाला होगा, राजा का मंत्री, न्यायाधीश और सर्वोच्च व्यक्ति होगा।",
            },
            Mercury: {
                english:
                    "Jupiter aspecting the Sun in a Sign of Mercury foretells, that the native will have knowledge of many Shastras, be a kings messenger (or representative), will go to foreign countries, be fierce and be always bewildered.",
                hindi: "बुध की राशि में स्थित सूर्य पर बृहस्पति की दृष्टि से यह भविष्यवाणी होती है कि जातक अनेक शास्त्रों का ज्ञाता होगा, राजा का दूत (या प्रतिनिधि) होगा, विदेश यात्रा करेगा, उग्र स्वभाव का होगा तथा सदैव भ्रमित रहेगा।",
            },
            Sun: {
                english:
                    "If the Sun in Leo is aspected by Jupiter, the person will construct temples, gardens and tanks; will have predominant strength, will like loneliness and be highly intelligent.",
                hindi: "यदि सिंह राशि में सूर्य पर बृहस्पति की दृष्टि हो तो व्यक्ति मंदिर, उद्यान और तालाब बनवाएगा, प्रबल शक्ति वाला होगा, अकेलापन पसंद करेगा और अत्यधिक बुद्धिमान होगा।",
            },
            Jupiter: {
                english:
                    "If Jupiter aspects the Sun in Pisces/Sagittarius, the person will move in royal palaces, or be a king himself, will possess elephants, horses and wealth and be ever after learning.",
                hindi: "यदि बृहस्पति मीन/धनु राशि में सूर्य को देखता है, तो व्यक्ति शाही महलों में रहता है, या स्वयं राजा होता है, उसके पास हाथी, घोड़े और धन होता है और वह सदैव विद्या में रुचि रखता है।",
            },
            Venus: {
                english:
                    "If Jupiter should lend his aspect to the Sun in Libra, or Taurus, the subject will have many foes and friends, be a kings minister, will have beautiful eyes, be splendourous and will be a pleased ruler.",
                hindi: "यदि बृहस्पति तुला या वृषभ राशि में सूर्य पर दृष्टि डालता है, तो जातक के अनेक शत्रु और मित्र होंगे, वह राजा का मंत्री होगा, सुंदर नेत्रों वाला होगा, वैभवशाली होगा और प्रसन्न शासक होगा।",
            },
            Saturn: {
                english:
                    "Should Jupiter aspect the Sun in Capricorn, or Aquarius, one will undertake to do auspicious deeds, be wise, will patronize all, widely famous and intelligent.",
                hindi: "यदि बृहस्पति मकर या कुंभ राशि में सूर्य को देखता है, तो व्यक्ति शुभ कार्य करने वाला, बुद्धिमान, सभी का संरक्षण करने वाला, व्यापक रूप से प्रसिद्ध और बुद्धिमान होगा।",
            },
        },
        Mars: {
            Sun: {
                english:
                    "If Jupiter aspects Mars in Leo, the person will be close to the king, be highly learned, be of pure mentality and be an Army chief.",
                hindi: "यदि सिंह राशि में बृहस्पति मंगल को देखता है तो जातक राजा का करीबी, उच्च विद्वान, शुद्ध मानसिकता वाला और सेना प्रमुख होगा।",
            },
            Moon: {
                english:
                    "If Mars in Cancer is aspected by Jupiter, the native will be famous, be kings minister, be learned, charitable, wealthy and be bereft of carnal pleasures.",
                hindi: "यदि कर्क राशि में स्थित मंगल पर बृहस्पति की दृष्टि हो तो जातक प्रसिद्ध, राजा का मंत्री, विद्वान, दानशील, धनवान तथा शारीरिक सुखों से रहित होगा।",
            },
            Mercury: {
                english:
                    "If Mars is in Gemini/Virgo and is aspected by Jupiter, the native will be a kings representative, be bright, will go to foreign countries, as an ambassador, be skillful in all doings and be a leader.",
                hindi: "यदि मंगल मिथुन/कन्या राशि में हो और बृहस्पति से दृष्ट हो तो जातक राजा का प्रतिनिधि, तेजस्वी, विदेश जाने वाला, राजदूत, सभी कार्यों में निपुण और नेता होगा।",
            },
            Mars: {
                english:
                    "Should Mars at birth be in Aries/Scorpio and be aspected by Jupiter, the native will be learned, sweet-spoken, fortunate, dear to parents, be very affluent and will be a king par excellence.",
                hindi: "यदि जन्म के समय मंगल मेष/वृश्चिक राशि में हो और बृहस्पति से दृष्ट हो तो जातक विद्वान, मधुरभाषी, भाग्यशाली, माता-पिता का प्रिय, बहुत धनवान और श्रेष्ठ राजा होगा।",
            },
            Jupiter: {
                english:
                    "If Mars is in Sagittarius, or Pisces and is aspected by Jupiter, the person will be devoid of wife and happiness, will be beyond the reach of enemies, be wealthy and be fond of exercises.",
                hindi: "यदि मंगल धनु या मीन राशि में हो और बृहस्पति से दृष्ट हो तो जातक स्त्री सुख से रहित, शत्रुओं से परे, धनवान और व्यायाम का शौकीन होता है।",
            },
            Venus: {
                english:
                    "If Mars is in Taurus/Libra with the aspect of Jupiter, the subject will be skillful in music and in play of musical instruments, be fortunate, be dear to his relatives and will be pure.",
                hindi: "यदि मंगल वृषभ/तुला राशि में हो और उस पर बृहस्पति की दृष्टि हो तो जातक संगीत और वाद्य यंत्र बजाने में निपुण, भाग्यशाली, अपने संबंधियों का प्रिय और पवित्र होगा।",
            },
            Saturn: {
                english:
                    "Should Mars be in Capricorn, or Aquarius and be aspected by Jupiter, the native will be very beautiful, will possess kingly qualities, will fulfill his undertakings, be long-lived and be endowed with relatives.",
                hindi: "यदि मंगल मकर या कुंभ राशि में हो और बृहस्पति से दृष्ट हो तो जातक अत्यंत सुंदर, राजसी गुणों वाला, अपने कार्यों को पूर्ण करने वाला, दीर्घायु और सगे-संबंधियों से संपन्न होगा।",
            },
        },
        Mercury: {
            Sun: {
                english:
                    "If Jupiter aspects Mercury in Leo, one will be beautiful, very learned, be a gifted speaker, be very famous and be endowed with attendants and conveyances.",
                hindi: "यदि सिंह राशि में बृहस्पति बुध को देखता है, तो व्यक्ति सुंदर, बहुत विद्वान, प्रतिभाशाली वक्ता, बहुत प्रसिद्ध और सेवकों और वाहनों से संपन्न होगा।",
            },
            Moon: {
                english:
                    "If Jupiter aspects Mercury in Cancer, one will be a great scholar, very dear (to all), be fortunate, dear to the king and will cross the boundaries of learning.",
                hindi: "यदि कर्क राशि में बृहस्पति बुध को देखता है, तो व्यक्ति महान विद्वान, सभी का प्रिय, भाग्यशाली, राजा का प्रिय और विद्या की सीमाओं को पार करने वाला होता है।",
            },
            Mars: {
                english:
                    "If Mercury is in a Sign of Mars and is aspected by Jupiter, one will be happy, will possess a glossy and hairy physique, will have attractive hair, will be very rich, will command others and be sinful.",
                hindi: "यदि बुध मंगल की राशि में हो और बृहस्पति से दृष्ट हो तो व्यक्ति सुखी, चमकदार और रोमयुक्त शरीर वाला, आकर्षक बाल वाला, बहुत धनवान, दूसरों पर हुक्म चलाने वाला और पापी होगा।",
            },
            Mercury: {
                english:
                    "Should Mercury be in his own House and receive the aspect of Jupiter, one will be a kings minister, be excellent, be beautiful, charitable, rich, be endowed with his own men and be courageous.",
                hindi: "यदि बुध अपने ही भाव में हो और बृहस्पति की दृष्टि उस पर हो तो वह राजा का मंत्री, श्रेष्ठ, सुन्दर, दानशील, धनवान, अपने लोगों से संपन्न और साहसी होता है।",
            },
            Jupiter: {
                english:
                    "Should Jupiter aspect Mercury in Sagittarius/Pisces, the native will be rich by memory, intelligence and descendency, be beautiful, noble and knowledgeable, be a kings minister, or his treasurer and be a writer.",
                hindi: "यदि धनु/मीन राशि में बृहस्पति बुध को देखता है, तो जातक स्मरण शक्ति, बुद्धि और वंश से समृद्ध, सुंदर, कुलीन और ज्ञानी, राजा का मंत्री या कोषाध्यक्ष और लेखक होगा।",
            },
            Venus: {
                english:
                    "Should Mercury be in a House of Venus and be aspected by Jupiter, the native will be highly learned, will fulfill his promise, will be leader of a country/city/group of men and be famous.",
                hindi: "यदि बुध शुक्र के घर में हो और बृहस्पति से दृष्ट हो तो जातक उच्च विद्वान होगा, अपने वचन को पूरा करने वाला होगा, देश/शहर/पुरुष समूह का नेता होगा और प्रसिद्ध होगा।",
            },
            Saturn: {
                english:
                    "If Mercury be in a House of Saturn and is aspected by Jupiter, one will be endowed with abundant money and grains, be honoured in his village/town and by his men, be happy and be famous.",
                hindi: "यदि बुध शनि के घर में हो और बृहस्पति से दृष्ट हो तो व्यक्ति प्रचुर धन-धान्य से संपन्न होता है, अपने गांव/नगर में तथा अपने लोगों द्वारा सम्मानित होता है, सुखी और प्रसिद्ध होता है।",
            },
        },
        Venus: {
            Sun: {
                english:
                    "If Venus is in Leo and is aspected by Jupiter, one will be endowed with conveyances, wealth and servants, will marry many women and be a kings minister.",
                hindi: "यदि शुक्र सिंह राशि में हो और बृहस्पति से दृष्ट हो तो व्यक्ति वाहन, धन और नौकरों से संपन्न होगा, कई स्त्रियों से विवाह करेगा और राजा का मंत्री होगा।",
            },
            Moon: {
                english:
                    "If Venus is in Cancer and is aspected by Jupiter, one will be endowed with many servants, sons, happiness, relatives and friends and be dear to king.",
                hindi: "यदि शुक्र कर्क राशि में हो और बृहस्पति से दृष्ट हो तो वह बहुत से सेवकों, पुत्रों, सुखों, संबंधियों और मित्रों से युक्त होता है तथा राजा का प्रिय होता है।",
            },
            Mars: {
                english:
                    "If Venus is in Aries, or Scorpio and is aspected by Jupiter, one will be endowed with beautiful eyes, will have a charitable wife, will possess a beautiful and long body and will have many sons.",
                hindi: "यदि शुक्र मेष या वृश्चिक राशि में हो और बृहस्पति से दृष्ट हो तो जातक सुन्दर नेत्रों वाला, दानशील पत्नी वाला, सुन्दर एवं लम्बा शरीर वाला तथा अनेक पुत्रों वाला होता है।",
            },
            Mercury: {
                english:
                    "If Venus is in Gemini, or Virgo and is aspected by Jupiter, one will be highly happy, be radiant, courageous, learned and be a preceptor.",
                hindi: "यदि शुक्र मिथुन या कन्या राशि में हो और बृहस्पति से दृष्ट हो तो व्यक्ति अत्यधिक प्रसन्न, तेजस्वी, साहसी, विद्वान और गुरु होगा।",
            },
            Venus: {
                english:
                    "If Venus is in Taurus, or Libra and is aspected by Jupiter, one will be endowed with wife, sons, abodes, conveyances, riches etc. and will achieve desired objects.",
                hindi: "यदि शुक्र वृषभ या तुला राशि में हो और बृहस्पति से दृष्ट हो तो व्यक्ति पत्नी, पुत्र, निवास, वाहन, धन आदि से संपन्न होता है और इच्छित वस्तुओं की प्राप्ति करता है।",
            },
            Jupiter: {
                english: "-",
                hindi: "-",
            },
            Saturn: {
                english:
                    "If Venus is in Capricorn, or Aquarius and is aspected by Jupiter, one will enjoy robes and garlands, be beautiful, will be skillful in music and musical instruments and will posses a good wife.",
                hindi: "यदि शुक्र मकर या कुंभ राशि में हो और बृहस्पति से दृष्ट हो तो व्यक्ति वस्त्र और मालाओं का आनंद लेता है, सुंदर होता है, संगीत और वाद्य यंत्रों में निपुण होता है और अच्छी पत्नी का स्वामी होता है।",
            },
        },
        Saturn: {
            Sun: {
                english:
                    "If Saturn is in Leo and is aspected by Jupiter, one will be chief and rich in his town, or among his men, will be endowed with progeny and be trustworthy.",
                hindi: "यदि शनि सिंह राशि में हो और बृहस्पति से दृष्ट हो तो व्यक्ति अपने नगर में या अपने लोगों के बीच प्रमुख और धनी होगा, संतान से संपन्न होगा और विश्वसनीय होगा।",
            },
            Moon: {
                english:
                    "If Saturn is in Cancer and is aspected by Jupiter, one will be endowed with lands, houses, friends, sons, wealth, gems and wife.",
                hindi: "यदि शनि कर्क राशि में हो और बृहस्पति से दृष्ट हो तो व्यक्ति भूमि, मकान, मित्र, पुत्र, धन, रत्न और पत्नी से संपन्न होता है।",
            },
            Mars: {
                english:
                    "If Saturn is in Aries, or Scorpio and is aspected by Jupiter, one will be endowed with happiness, wealth and fortune, be a kings minister and be chief.",
                hindi: "यदि शनि मेष या वृश्चिक राशि में हो और बृहस्पति से दृष्ट हो तो व्यक्ति सुख, धन और सौभाग्य से संपन्न होता है, राजा का मंत्री और प्रमुख होता है।",
            },
            Mercury: {
                english:
                    "If Saturn is in Gemini, or Virgo and is aspected by Jupiter, one will be trustworthy in the kings circle, will possess all kinds of (good) qualities, be liked by good men and will earn wealth through his virtues.",
                hindi: "यदि शनि मिथुन या कन्या राशि में हो और बृहस्पति से दृष्ट हो तो वह राजा के बीच विश्वसनीय होगा, सभी प्रकार के गुणों से युक्त होगा, अच्छे लोगों का प्रिय होगा और अपने गुणों से धन अर्जित करेगा।",
            },
            Venus: {
                english:
                    "If Saturn is in Taurus, or Libra and is aspected by Jupiter, one will share happiness and misery of others, will do others jobs, be dear to people, charitable and industrious.",
                hindi: "यदि शनि वृषभ या तुला राशि में हो और बृहस्पति से दृष्ट हो तो व्यक्ति दूसरों के सुख-दुख में भागीदार होगा, दूसरों के काम करेगा, लोगों का प्रिय होगा, दानशील और मेहनती होगा।",
            },
            Jupiter: {
                english:
                    "If Saturn is in Sagittarius, or Pisces and is aspected by Jupiter, one will be a king, or equal to a king, or a minister, or an Army chief and be free from all kinds of danger.",
                hindi: "यदि शनि धनु या मीन राशि में हो और बृहस्पति से दृष्ट हो तो व्यक्ति राजा, राजा के समान, मंत्री या सेनापति होगा तथा सभी प्रकार के खतरों से मुक्त होगा।",
            },
            Saturn: {
                english:
                    "If Saturn is in Capricorn, or Aquarius and is aspected by Jupiter, one will be famous for his good qualities, be a king, or be of royal scion, long-lived and be free from diseases.",
                hindi: "यदि शनि मकर या कुंभ राशि में हो और बृहस्पति से दृष्ट हो तो व्यक्ति अपने अच्छे गुणों के लिए प्रसिद्ध होगा, राजा होगा या राजसी वंश का होगा, दीर्घायु होगा और रोगों से मुक्त होगा।",
            },
        },
    },
    Venus: {
        Moon: {
            Aries: {
                english:
                    "Venus aspecting the Moon in Aries denotes, that the subject will be lucky, be endowed with sons and wealth, will own (i.e. marry) a supreme lady and costly ornaments and will not eat much.",
                hindi: "मेष राशि में चंद्रमा पर शुक्र की दृष्टि यह दर्शाती है कि जातक भाग्यशाली होगा, पुत्र और धन से संपन्न होगा, श्रेष्ठ स्त्री और महंगे आभूषणों का स्वामी होगा (अर्थात विवाह करेगा) और अधिक भोजन नहीं करेगा।",
            },
            Taurus: {
                english:
                    "Should Venus aspect the Moon in Taurus, one will be endowed with ornaments, conveyances and houses and will possess comforts of sleeping and sitting, scents, robes, garlands etc.",
                hindi: "यदि वृषभ राशि में शुक्र की दृष्टि चन्द्रमा पर हो तो जातक को आभूषण, वाहन, मकान, सोने-बैठने, सुगंध, वस्त्र, माला आदि की सुख सुविधाएं प्राप्त होती हैं।",
            },
            Gemini: {
                english:
                    "If Venus aspects the Moon in Gemini, the person will be endowed with the company of supreme females, garlands, robes, conveyances, ornaments and jewels and will be sportive.",
                hindi: "यदि मिथुन राशि में शुक्र की दृष्टि चन्द्रमा पर हो तो जातक श्रेष्ठ स्त्रियों का संग, माला, वस्त्र, वाहन, आभूषण और रत्नों से युक्त होता है तथा खेल-कूद में रुचि रखने वाला होता है।",
            },
            Cancer: {
                english:
                    "If Venus aspects the Moon in Cancer, the subject will be endowed with money, gold, wife, robes and jewels, be head of prostitutes and be splendourous.",
                hindi: "यदि कर्क राशि में शुक्र चन्द्रमा को देखता है तो जातक धन, सोना, पत्नी, वस्त्र और रत्नों से संपन्न होगा, वेश्याओं का मुखिया होगा और वैभवशाली होगा।",
            },
            Leo: {
                english:
                    "Should Venus aspect the Moon in Leo, one will possess a wife, wealth and high knowledge, be sickly disposed, will be a females servant and be skillful in sexual union.",
                hindi: "यदि सिंह राशि में शुक्र की दृष्टि चन्द्रमा पर हो तो व्यक्ति पत्नी, धन और उच्च ज्ञान वाला, रोगग्रस्त स्वभाव वाला, स्त्री सेवक तथा यौन संबंध बनाने में कुशल होता है।",
            },
            Virgo: {
                english:
                    "If Venus aspects the Moon in Virgo, the person will have many wives, be endowed with many kinds of makeups, pleasures and wealth and will always be blessed with fortunes.",
                hindi: "यदि कन्या राशि में शुक्र की दृष्टि चन्द्रमा पर हो तो जातक की अनेक पत्नियां होंगी, वह अनेक प्रकार के श्रृंगार, सुख-सुविधाओं और धन-संपत्ति से संपन्न होगा तथा सदैव सौभाग्यशाली रहेगा।",
            },
            Libra: {
                english:
                    "If Venus lends his aspect to the Moon in Libra, one will be beautiful, be free from sickness, fortunate, strong bodied, be learned and will have knowledge of many means.",
                hindi: "यदि तुला राशि में शुक्र की दृष्टि चन्द्रमा पर हो तो व्यक्ति सुन्दर, रोगमुक्त, भाग्यशाली, बलवान, विद्वान तथा अनेक साधनों का ज्ञाता होता है।",
            },
            Scorpio: {
                english:
                    "If Venus aspects the Moon in Scorpio, the native will be highly intelligent, be fortunate, be endowed with riches, conveyances and beauty and will lose strength on account of women.",
                hindi: "यदि वृश्चिक राशि में शुक्र की दृष्टि चन्द्रमा पर हो तो जातक अत्यधिक बुद्धिमान, भाग्यशाली, धन, संपत्ति और सौंदर्य से संपन्न होगा तथा स्त्रियों के कारण शक्तिहीन होगा।",
            },
            Sagittarius: {
                english:
                    "Should Venus aspect the Moon in Sagittarius, the native will be happy, beautiful and fortunate, be endowed with sons, wealth and sexual desires and will have good friends and wife.",
                hindi: "यदि धनु राशि में शुक्र की दृष्टि चन्द्रमा पर हो तो जातक सुखी, सुन्दर, भाग्यशाली, पुत्र, धन, काम-इच्छाओं से संपन्न होगा, तथा उसके अच्छे मित्र और पत्नी होगी।",
            },
            Capricorn: {
                english:
                    "If Venus aspects the Moon in Capricorn, one will join others wives, be endowed with wealth, ornaments, conveyances, garlands etc., be blameworthy and be issueless.",
                hindi: "मकर राशि में शुक्र की दृष्टि चन्द्रमा पर हो तो व्यक्ति परस्त्रीगामी, धन, आभूषण, वाहन, माला आदि से युक्त, निंदित एवं निःसंतान होता है।",
            },
            Aquarius: {
                english:
                    "If Venus aspects the Moon in Aquarius, the person will be base, issueless, friendless, timid, be censured by preceptors, be sinful, will have a bad wife and will be least happy.",
                hindi: "यदि कुंभ राशि में शुक्र की दृष्टि चंद्रमा पर हो तो जातक नीच, निःसंतान, मित्रहीन, डरपोक, गुरुजनों द्वारा निन्दा प्राप्त करने वाला, पापी, बुरी पत्नी वाला तथा अल्प सुखी होगा।",
            },
            Pisces: {
                english:
                    "If Venus aspects the Moon in Pisces, he will be skillful in coition, interested in dance, instrumental music and songs and will steal the hearts of the fair sex.",
                hindi: "यदि मीन राशि में शुक्र की दृष्टि चन्द्रमा पर हो तो वह मैथुन में कुशल, नृत्य, वाद्य संगीत और गीतों में रुचि रखने वाला तथा स्त्रियों का दिल जीतने वाला होगा।",
            },
        },
        Sun: {
            Moon: {
                english:
                    "If Venus aspects the Sun in Cancer, the native will subordinate his wife (or women), will have money through his wife, be helpful to others, fierce in battle and will speak sweetly.",
                hindi: "यदि कर्क राशि में शुक्र सूर्य को देखता है तो जातक अपनी पत्नी (या स्त्रियों) को वश में रखने वाला, पत्नी के माध्यम से धनवान, दूसरों की मदद करने वाला, युद्ध में उग्र और मीठा बोलने वाला होगा।",
            },
            Mars: {
                english:
                    "If Venus aspects the Sun posited in a House of Mars, the native will be the husband of a bad woman, will have many enemies, but few relatives (or not well-placed relatives), be poor and will suffer from leprosy.",
                hindi: "यदि शुक्र मंगल के घर में स्थित सूर्य को देखता है, तो जातक बुरी स्त्री का पति होगा, उसके कई शत्रु होंगे, लेकिन रिश्तेदार कम होंगे (या रिश्तेदार अच्छे नहीं होंगे), वह गरीब होगा और कुष्ठ रोग से पीड़ित होगा।",
            },
            Mercury: {
                english:
                    "If Venus aspects the Sun, posited in Sign of Mercury, the native will be endowed with money, wife and sons, will make less friends, be free from sickness, be happy and fickle minded.",
                hindi: "यदि शुक्र बुध की राशि में स्थित सूर्य को देखता है तो जातक धनवान, स्त्री और पुत्रवान, कम मित्र बनाने वाला, रोग मुक्त, प्रसन्न और चंचल स्वभाव का होता है।",
            },
            Jupiter: {
                english:
                    "Should Venus aspect the Sun in Jupiters House, one will enjoy women of superior class, be endowed with scents and garlands and be peaceful.",
                hindi: "यदि बृहस्पति के घर में शुक्र सूर्य को देखता है, तो व्यक्ति उच्च कुल की स्त्रियों का सुख भोगता है, सुगंधियों और मालाओं से युक्त होता है और शांतिप्रिय होता है।",
            },
            Venus: {
                english:
                    "When Venus aspects the Sun in Libra, or Taurus, one will be a king, or a kings minister, be endowed with wife, wealth and pleasure galore, be wise and timid.",
                hindi: "जब तुला या वृषभ राशि में शुक्र सूर्य को देखता है, तो व्यक्ति राजा या राजा का मंत्री होगा, पत्नी, धन और सुख से संपन्न होगा, बुद्धिमान और डरपोक होगा।",
            },
            Sun: {
                english:
                    "Venus aspecting the Sun in Leo will make one earn bad name, infamous. Such a person will be troubled by leprosy, be unkind and shameless.",
                hindi: "सिंह राशि में शुक्र की सूर्य पर दृष्टि पड़ने से व्यक्ति बदनाम और बदनाम होगा। ऐसा व्यक्ति कुष्ठ रोग से पीड़ित, निर्दयी और निर्लज्ज होगा।",
            },
            Saturn: {
                english:
                    "If Venus aspects the Sun in a sign of Saturn, the native will deal with conch, coral and ruby, will derive abundant wealth through prostitutes and females and be happy.",
                hindi: "यदि शनि की राशि में शुक्र सूर्य को देखता है, तो जातक शंख, मूंगा और माणिक्य का व्यापार करेगा, वेश्याओं और स्त्रियों के माध्यम से प्रचुर धन अर्जित करेगा और सुखी रहेगा।",
            },
        },
        Mars: {
            Sun: {
                english:
                    "Should Venus aspect Mars in Leo, the person will have union with many women, be fortunate in respect of his wife and will be ever juvenile.",
                hindi: "यदि सिंह राशि में शुक्र की दृष्टि मंगल पर हो तो जातक अनेक स्त्रियों से मिलन करेगा, पत्नी के संबंध में भाग्यशाली होगा तथा सदैव युवा रहेगा।",
            },
            Moon: {
                english:
                    "If Venus aspects Mars in Cancer, the subject will be grieved on account of womens company, be insulted by women and will lose wealth on account of women.",
                hindi: "कर्क राशि में शुक्र की दृष्टि मंगल पर हो तो जातक स्त्री की संगति से दुःखी होगा, स्त्री द्वारा अपमानित होगा तथा स्त्री के कारण धन की हानि होगी।",
            },
            Mercury: {
                english:
                    "If Mars is in Gemini/Virgo and is aspected by Venus, the person will do the jobs of females, be very fortunate and will enjoy food and robes.",
                hindi: "यदि मंगल मिथुन/कन्या राशि में हो और शुक्र से दृष्ट हो तो जातक स्त्रियों का कार्य करेगा, बहुत भाग्यशाली होगा तथा भोजन और वस्त्रों का आनंद लेगा।",
            },
            Jupiter: {
                english:
                    "If Mars is in Sagittarius, or Pisces and is aspected by Venus, the person will be very much dear to women, be interested in cosmetics, makeup etc., be charitable, be libidinous and be fortunate.",
                hindi: "यदि मंगल धनु या मीन राशि में हो और शुक्र से दृष्ट हो तो जातक स्त्रियों का प्रिय, सौंदर्य प्रसाधन, श्रृंगार आदि में रुचि रखने वाला, दानशील, कामातुर और भाग्यशाली होता है।",
            },
            Mars: {
                english:
                    "Should Mars at birth be in Aries/Scorpio and be aspected by Venus, the native will be imprisoned due to females and will be deprived of his money on account of females, more than once.",
                hindi: "यदि जन्म के समय मंगल मेष/वृश्चिक राशि में हो और शुक्र से दृष्ट हो तो जातक को स्त्री के कारण कारावास होगा तथा स्त्री के कारण एक से अधिक बार धन से वंचित होना पड़ेगा।",
            },
            Venus: {
                english:
                    "If Mars is in Taurus/Libra with the aspect of Venus, the person will be a kings minister, be liked by the king, be an Army chief, will have famous name (i.e. titles etc.) and will be happy.",
                hindi: "यदि मंगल वृषभ/तुला राशि में शुक्र की दृष्टि से हो तो जातक राजा का मंत्री, राजा का प्रिय, सेनापति, प्रसिद्ध नाम (अर्थात उपाधि आदि) वाला तथा सुखी होगा।",
            },
            Saturn: {
                english:
                    "Should Mars be in Capricorn, or Aquarius and be aspected by Venus, one will be endowed with various kinds of (carnal) pleasures, be interested in fostering women and be belligerent.",
                hindi: "यदि मंगल मकर या कुंभ राशि में हो और शुक्र से दृष्ट हो तो व्यक्ति विभिन्न प्रकार के (शारीरिक) सुखों से संपन्न होगा, स्त्रियों के प्रति रुचि रखेगा और झगड़ालू होगा।",
            },
        },
        Mercury: {
            Sun: {
                english:
                    "If Venus aspects Mercury in Leo, one will possess unparalleled beauty, be softly disposed, will have an attractive face, will have many conveyances, be very courageous and be a minister.",
                hindi: "यदि सिंह राशि में शुक्र बुध को देखता है तो वह अद्वितीय सौंदर्य से युक्त, सौम्य स्वभाव वाला, आकर्षक चेहरा वाला, अनेक वाहन वाला, बहुत साहसी और मंत्री होता है।",
            },
            Moon: {
                english:
                    "Should Venus aspect Mercury in Cancer, one will be equal to Cupid in appearance, will possess attractive physique, be well-versed in the art of singing and in playing musical instruments, be fortunate and softly disposed.",
                hindi: "कर्क राशि में शुक्र की बुध पर दृष्टि हो तो व्यक्ति कामदेव के समान सुन्दर, आकर्षक शरीर वाला, गायन और वाद्य यंत्र बजाने में निपुण, भाग्यशाली और सौम्य स्वभाव वाला होता है।",
            },
            Mars: {
                english:
                    "If Mercury is in a Sign of Mars and is aspected by Venus, the subject will be in royal service, be fortunate, principal among men, or in his town, will speak skillfully, be trustworthy and will be endowed with a wife.",
                hindi: "यदि बुध मंगल की राशि में हो और शुक्र से दृष्ट हो तो जातक राजसी सेवा में होगा, भाग्यशाली होगा, पुरुषों में या अपने नगर में प्रमुख होगा, कुशल वक्ता होगा, विश्वसनीय होगा और पत्नी से संपन्न होगा।",
            },
            Jupiter: {
                english:
                    "If Venus aspect Mercury in Sagittarius/Pisces, the native will educate boys and girls, be wealthy, soft in disposition and brave.",
                hindi: "यदि धनु/मीन राशि में शुक्र बुध को देखता है तो जातक लड़के-लड़कियों को शिक्षित करेगा, धनवान, स्वभाव से कोमल और साहसी होगा।",
            },
            Venus: {
                english:
                    "Should Mercury be in a House of Venus and be aspected by Venus, the person will be fortunate, soft in disposition, be happy, will enjoy good robes make up etc. and will steal the hearts of the fair sex.",
                hindi: "यदि बुध शुक्र के घर में हो और शुक्र से दृष्ट हो तो व्यक्ति भाग्यशाली, स्वभाव से कोमल, प्रसन्न, अच्छे वस्त्र, श्रृंगार आदि का आनंद लेने वाला तथा स्त्रियों का दिल जीतने वाला होता है।",
            },
            Mercury: {
                english:
                    "Should Mercury be in his own House and receive the aspect of Venus, the native will be highly learned be a royal employee, be a messenger, will honour friendship and will be interested in base women.",
                hindi: "यदि बुध अपने ही भाव में हो और शुक्र की दृष्टि उस पर हो तो जातक उच्च विद्वान, राजसी कर्मचारी, संदेशवाहक, मित्रता का सम्मान करने वाला तथा नीच स्त्रियों में रुचि रखने वाला होगा।",
            },
            Saturn: {
                english:
                    "If Mercury be in a House of Saturn and is aspected by Venus, one will be the husband of a base woman, be ugly, be unintelligible, be troubled by sexual passion and will have many sons.",
                hindi: "यदि बुध शनि के घर में हो और शुक्र से दृष्ट हो तो जातक नीच स्त्री का पति, कुरूप, नासमझ, काम वासना से ग्रस्त तथा अनेक पुत्रों वाला होता है।",
            },
        },
        Jupiter: {
            Sun: {
                english:
                    "If Jupiter is in Leo and is aspected by Venus, the native will be dear to females, be fortunate, will receive royal honours and be very strong.",
                hindi: "यदि बृहस्पति सिंह राशि में हो और शुक्र से दृष्ट हो तो जातक स्त्रियों का प्रिय, भाग्यशाली, राजकीय सम्मान प्राप्त करने वाला तथा बहुत बलवान होगा।",
            },
            Moon: {
                english:
                    "If Jupiter occupies Gemini/Virgo and is aspected by Venus, one will have many wives, extraordinary riches, various ornaments, be happy and fortunate.",
                hindi: "यदि बृहस्पति मिथुन/कन्या राशि में हो और शुक्र से दृष्ट हो तो व्यक्ति की अनेक पत्नियां होंगी, असाधारण धन होगा, विविध आभूषण होंगे, वह सुखी और भाग्यशाली होगा।",
            },
            Mars: {
                english:
                    "If Jupiter occupies Aries/Scorpio and is aspected by Venus, one will be very happy in respect of residences, sleeping comforts, robes, scents, garlands, ornaments and wife and be very timid.",
                hindi: "यदि बृहस्पति मेष/वृश्चिक राशि में हो और शुक्र से दृष्ट हो तो व्यक्ति आवास, शयन सुख, वस्त्र, सुगंध, माला, आभूषण और पत्नी के मामले में बहुत सुखी होगा तथा बहुत डरपोक होगा।",
            },
            Mercury: {
                english:
                    "If Jupiter occupies Gemini/Virgo and is aspected by Venus, the native will undertake acts of temple construction, will visit prostitutes and will win womens hearts.",
                hindi: "यदि बृहस्पति मिथुन/कन्या राशि में हो और शुक्र से दृष्ट हो तो जातक मंदिर निर्माण का कार्य करेगा, वेश्याओं के पास जाएगा और महिलाओं का दिल जीतेगा।",
            },
            Venus: {
                english:
                    "If Jupiter occupies a House of Venus and is aspected by Venus, the native will be very attractive, affluent, will wear excellent ornaments, be merciful and will enjoy excellent sleeping comforts and excellent robes.",
                hindi: "यदि बृहस्पति शुक्र के घर में हो और शुक्र द्वारा देखा जा रहा हो, तो जातक बहुत आकर्षक, धनवान, उत्तम आभूषण पहनने वाला, दयालु होगा तथा उत्तम शयन सुख और उत्तम वस्त्रों का आनंद लेगा।",
            },
            Jupiter: {
                english:
                    "If Jupiter is posited in Sagittarius/Pisces and is aspected by Venus, the native will be happy, learned, be devoid of blemishes, be long-lived, fortunate and will be blessed by Goddess Lakshmi.",
                hindi: "यदि बृहस्पति धनु/मीन राशि में स्थित हो और शुक्र से दृष्ट हो तो जातक सुखी, विद्वान, दोष रहित, दीर्घायु, भाग्यशाली होता है तथा उसे देवी लक्ष्मी की कृपा प्राप्त होती है।",
            },
            Saturn: {
                english:
                    "If Jupiter is in a House of Saturn and is aspected by Venus, the native will be endowed with food, drinks, excellent residence, sleeping comforts, wealth, conveyances, excellent wife, ornaments and robes.",
                hindi: "यदि बृहस्पति शनि के घर में हो और शुक्र से दृष्ट हो तो जातक को भोजन, पेय, उत्तम आवास, शयन सुख, धन, वाहन, उत्तम पत्नी, आभूषण और वस्त्र की प्राप्ति होती है।",
            },
        },
        Saturn: {
            Sun: {
                english:
                    "If Saturn is in Leo and is aspected by Venus, one will be averse to women, be splendourous, slow (or tardy), happy, rich and will attain a good end.",
                hindi: "यदि शनि सिंह राशि में हो और शुक्र से दृष्ट हो तो व्यक्ति स्त्रियों से विमुख, वैभवशाली, मंद (या विलम्बित), सुखी, धनवान तथा अच्छे अंत को प्राप्त करने वाला होता है।",
            },
            Moon: {
                english:
                    "If Saturn is in Cancer and is aspected by Venus, one is of a noble descent, but will be bereft of beauty, grace and happiness.",
                hindi: "यदि शनि कर्क राशि में हो और शुक्र से दृष्ट हो तो व्यक्ति कुलीन वंश का होता है, लेकिन सुंदरता, अनुग्रह और खुशी से वंचित होता है।",
            },
            Mars: {
                english:
                    "If Saturn is in Aries, or Scorpio and is aspected by Venus, one will be quite unsteady in disposition, very ugly, will join other women and courtesans and be bereft of pleasures.",
                hindi: "यदि शनि मेष या वृश्चिक राशि में हो और शुक्र से दृष्ट हो तो व्यक्ति स्वभाव से बहुत अस्थिर, बहुत कुरूप, अन्य स्त्रियों और वेश्याओं के साथ रहने वाला तथा सुखों से वंचित होगा।",
            },
            Mercury: {
                english:
                    "If Saturn is in Gemini, or Virgo and is aspected by Venus, one will be skillful in beautifying women, be a teacher of Yogas, or a saint and be dear to the fair sex.",
                hindi: "यदि शनि मिथुन या कन्या राशि में हो और शुक्र से दृष्ट हो तो व्यक्ति स्त्रियों को सुशोभित करने में कुशल, योग शिक्षक या संत होगा तथा स्त्री का प्रिय होगा।",
            },
            Jupiter: {
                english:
                    "If Saturn is in Sagittarius, or Pisces and is aspected by Venus, one will have two mothers and two fathers, will live in forests and hills, will be unsteady and be endowed with many kinds of assignments.",
                hindi: "यदि शनि धनु या मीन राशि में हो और शुक्र से दृष्ट हो तो व्यक्ति की दो माताएं और दो पिता होंगे, वह जंगलों और पहाड़ों में रहेगा, अस्थिर होगा और उसे अनेक प्रकार के कार्य सौंपे जाएंगे।",
            },
            Venus: {
                english:
                    "If Saturn is in Taurus, or Libra and is aspected by Venus, one will be happy on account of women and wine (i.e. will enjoy these), be endowed with gems, be very strong and be dear to the king.",
                hindi: "यदि शनि वृषभ या तुला राशि में हो और शुक्र से दृष्ट हो तो स्त्री और मदिरा से सुखी (अर्थात इनका भोग करने वाला), रत्नों से युक्त, बहुत बलवान और राजा का प्रिय होगा।",
            },
            Saturn: {
                english:
                    "If Saturn is in Capricorn, or Aquarius and is aspected by Venus, one will be rich, addicted to other women, fortunate, happy and will enjoy food and drinks.",
                hindi: "यदि शनि मकर या कुंभ राशि में हो और शुक्र से दृष्ट हो तो व्यक्ति धनवान, परस्त्रीगामी, भाग्यशाली, सुखी तथा भोजन और पेय का आनंद लेने वाला होता है।",
            },
        },
    },
    Saturn: {
        Moon: {
            Aries: {
                english:
                    "The Moon in Aries aspected by Saturn indicates, that the native will be jealous, miserable to a great extent, be very poor, dirty and untruthful.",
                hindi: "मेष राशि में स्थित चंद्रमा पर शनि की दृष्टि होने से यह संकेत मिलता है कि जातक ईर्ष्यालु, अत्यधिक दुखी, बहुत गरीब, गंदा और असत्य बोलने वाला होगा।",
            },
            Taurus: {
                english:
                    "If it is Saturn, that aspects the Moon in Taurus, one will be devoid of wealth, be inauspicious for mother and wife and will be endowed with sons, friends and relatives.",
                hindi: "यदि वृषभ राशि में शनि की दृष्टि चन्द्रमा पर हो तो जातक धनहीन, माता और पत्नी के लिए अशुभ तथा पुत्र, मित्र और सम्बन्धियों से युक्त होता है।",
            },
            Gemini: {
                english:
                    "Should Saturn aspect the Moon in Gemini, the subject will be devoid of relatives, wife, happiness and wealth and will be inimical to the public.",
                hindi: "यदि मिथुन राशि में शनि की दृष्टि चन्द्रमा पर हो तो जातक बंधु-बांधव, पत्नी, सुख और धन से रहित होगा तथा जनता से शत्रुता रखेगा।",
            },
            Cancer: {
                english:
                    "Should Saturn aspect the Cancer-posited Moon, he will be of wandering disposition, be miserable, very poor, be a liar, a sinner and be mean.",
                hindi: "यदि शनि की दृष्टि कर्क राशि के चंद्रमा पर हो तो वह भ्रमणशील स्वभाव वाला, दुखी, बहुत गरीब, झूठा, पापी और नीच होगा।",
            },
            Leo: {
                english:
                    "If the Moon in Leo is aspected by Saturn, the person will be an agriculturist, be not wealthy, be a liar, will protect forts, be devoid of happiness from wife and be mean.",
                hindi: "यदि सिंह राशि में स्थित चन्द्रमा पर शनि की दृष्टि हो तो जातक कृषक, धनहीन, झूठा, किलों की रक्षा करने वाला, स्त्री सुख से रहित एवं नीच होता है।",
            },
            Virgo: {
                english:
                    "The Moon in Virgo aspected by Saturn indicates, that the native will not have firm memory, will suffer from poverty, will not have happiness, will be bereft of mother, will be at the disposal of women (or be controlled by them) and will derive wealth through females.",
                hindi: "कन्या राशि में स्थित चंद्रमा पर शनि की दृष्टि होने से यह संकेत मिलता है कि जातक की स्मरण शक्ति कमजोर होगी, वह गरीबी से ग्रस्त होगा, सुख से वंचित रहेगा, माता से विहीन होगा, स्त्रियों के अधीन रहेगा (या उनके द्वारा नियंत्रित होगा) तथा स्त्रियों के माध्यम से धन अर्जित करेगा।",
            },
            Libra: {
                english:
                    "Should Saturn aspect the Moon in Libra, the native will be very affluent, be sweet in speech, be endowed with conveyances, be very much interested in sexual affairs, be devoid of happiness and be favourable to his mother.",
                hindi: "तुला राशि में शनि की दृष्टि चन्द्रमा पर हो तो जातक बहुत धनवान, मधुर वाणी वाला, वाहन-सम्पन्न, यौन-संबंधों में अत्यधिक रुचि रखने वाला, सुख से रहित तथा माता के प्रति अनुकूल होता है।",
            },
            Scorpio: {
                english:
                    "If Saturn aspects the Moon in Scorpio, the native will have base sons, be a talebearer, be sick, poor and untruthful.",
                hindi: "यदि वृश्चिक राशि में शनि की दृष्टि चंद्रमा पर हो तो जातक नीच पुत्र वाला, चुगलखोर, रोगी, दरिद्र एवं असत्य बोलने वाला होगा।",
            },
            Sagittarius: {
                english:
                    "If Saturn aspects the Moon in Sagittarius, the person will be sweet in speech, will speak good words, will have wide knowledge of Shastras, be truthful, soft and be a kings man.",
                hindi: "यदि धनु राशि में शनि की दृष्टि चन्द्रमा पर हो तो जातक मधुर वाणी वाला, अच्छे वचन बोलने वाला, शास्त्रों का व्यापक ज्ञान रखने वाला, सत्यवादी, मृदुभाषी और राजा जैसा होगा।",
            },
            Capricorn: {
                english:
                    "If Saturn aspects the Moon in Capricorn one will be indolent, dirty, be endowed with money, be troubled by sexual feelings, will join others housewives and be untruthful.",
                hindi: "मकर राशि में शनि की दृष्टि चन्द्रमा पर हो तो जातक आलसी, गंदा, धनवान, काम वासनाओं से ग्रस्त, अन्य गृहणियों से युक्त तथा असत्यभाषी होता है।",
            },
            Aquarius: {
                english:
                    "Should the Moon in Aquarius have Saturns aspect, the native will have (prominent) nails and hair, be dirty, will seek union with other women, be a dunce, be irreligious and be rich possessing many immovables.",
                hindi: "यदि कुंभ राशि के चंद्रमा पर शनि की दृष्टि हो तो जातक के नाखून और बाल बड़े होंगे, वह गंदा होगा, अन्य स्त्रियों से संबंध बनाने की इच्छा रखेगा, मूर्ख होगा, अधार्मिक होगा तथा उसके पास बहुत सी अचल संपत्ति होगी।",
            },
            Pisces: {
                english:
                    "Should Saturn aspect the Moon in Pisces, he will be deformed, be unfavourable to mother, be sexually distressed, be devoid of sons, wife and intelligence and will be attached to mean and ugly females.",
                hindi: "यदि शनि की दृष्टि मीन राशि के चन्द्रमा पर हो तो वह विकृत, माता के प्रति प्रतिकूल, यौन रूप से दुःखी, पुत्र, पत्नी और बुद्धि से रहित तथा नीच और कुरूप स्त्रियों में आसक्त होगा।",
            },
        },
        Sun: {
            Moon: {
                english:
                    "Saturns aspect on the Sun in Cancer, denotes, that the person will suffer from phlegmatic and windy disorders, be wicked and be a tale-bearer.",
                hindi: "कर्क राशि में सूर्य पर शनि की दृष्टि यह दर्शाती है कि व्यक्ति कफ और वायु विकार से पीड़ित होगा, दुष्ट होगा और चुगलखोर होगा।",
            },
            Mars: {
                english:
                    "In case Saturn aspects the Sun in a Sign of Mars, the native will be subjected to grief on account of physical ailments, will have intense passion in his undertaking, be dull-witted and a dunce.",
                hindi: "यदि शनि मंगल की राशि में सूर्य को देखता है तो जातक शारीरिक रोगों के कारण दुःखी होगा, अपने कार्य में तीव्र जुनून रखेगा, मंदबुद्धि और मूर्ख होगा।",
            },
            Mercury: {
                english:
                    "Should Saturn aspect the Sun in Gemini, or Virgo, the native will have many servants, be anxious (as for an absent lover), will maintain many relatives, will remain delighted and will be crafty.",
                hindi: "यदि मिथुन या कन्या राशि में शनि की दृष्टि सूर्य पर हो तो जातक के पास बहुत से नौकर होंगे, वह चिंतित रहेगा (जैसे कि अनुपस्थित प्रेमी के लिए), बहुत से रिश्तेदारों का पालन-पोषण करेगा, प्रसन्न रहेगा और चालाक होगा।",
            },
            Jupiter: {
                english:
                    "If Saturn aspects the Sun in Pisces, or Sagittarius, the native will be unclean, will eat others food, will join bad men and will breed animals.",
                hindi: "यदि शनि मीन या धनु राशि में सूर्य को देखता है, तो जातक अशुद्ध होगा, दूसरों का अन्न खाएगा, बुरे लोगों से मिलेगा और पशुपालन करेगा।",
            },
            Venus: {
                english:
                    "Saturn aspecting the Sun in fall, or in Taurus denotes, that the native will be mean, indolent, will cohabit with aged women, will be wicked and will be troubled by diseases.",
                hindi: "शरद ऋतु या वृषभ राशि में शनि की सूर्य पर दृष्टि यह दर्शाती है कि जातक नीच, आलसी, वृद्ध स्त्रियों के साथ सहवास करने वाला, दुष्ट और रोगों से ग्रस्त होगा।",
            },
            Sun: {
                english:
                    "Should Saturn aspect the Sun in Leo, the person will be skillful in creating obstacles, will be a eunuch and will cause grief to others.",
                hindi: "यदि सिंह राशि में शनि की दृष्टि सूर्य पर हो तो जातक विघ्न डालने में कुशल, नपुंसक तथा दूसरों को दुःख देने वाला होता है।",
            },
            Saturn: {
                english:
                    "If Saturn aspects the Sun posited in Capricorn, or Aquarius, the person will destroy his enemies and will prosper due to royal honours.",
                hindi: "यदि शनि मकर या कुंभ राशि में स्थित सूर्य पर दृष्टि डालता है तो जातक अपने शत्रुओं का नाश करता है तथा राजकीय सम्मान के कारण समृद्ध होता है।",
            },
        },
        Mars: {
            Sun: {
                english:
                    "Saturn aspecting Mars in Leo denotes, that the person will look, like an old man, be poor, will wander in others houses/be miserable.",
                hindi: "सिंह राशि में शनि की मंगल पर दृष्टि यह दर्शाती है कि व्यक्ति वृद्ध जैसा दिखेगा, गरीब होगा, दूसरों के घरों में भटकेगा/दुखी होगा।",
            },
            Moon: {
                english:
                    "Should Saturn aspect Mars in Cancer, the native will acquire money through journey in water, be equal to a king, be sportive in his acts and be always bright.",
                hindi: "यदि कर्क राशि में शनि की दृष्टि मंगल पर हो तो जातक जल यात्रा से धन प्राप्त करेगा, राजा के समान होगा, अपने कार्यों में क्रीड़ाशील होगा तथा सदैव तेजस्वी रहेगा।",
            },
            Mercury: {
                english:
                    "If Mars is in Gemini/Virgo and is aspected by Saturn, the person will be interested in wandering in mines (i.e. places beneath surface), hills and forests, will have husbandry, as his livelihood, be highly miserable, be very valorous, dirty and be devoid of wealth.",
                hindi: "यदि मंगल मिथुन/कन्या राशि में हो तथा शनि से दृष्ट हो तो जातक खदानों (अर्थात् सतह के नीचे के स्थानों), पहाड़ों और जंगलों में घूमने में रुचि रखने वाला, कृषि को अपना आजीविका का साधन बनाने वाला, अत्यधिक दुखी, बहुत पराक्रमी, गंदा और धनहीन होगा।",
            },
            Jupiter: {
                english:
                    "If Mars is in Sagittarius, or Pisces and is aspected by Saturn, the person will have defective body, be sinful, wandering-nature, devoid of happiness and interested in others religion.",
                hindi: "यदि मंगल धनु या मीन राशि में हो और शनि से दृष्ट हो तो जातक दोषयुक्त शरीर वाला, पापी, भ्रमणशील स्वभाव वाला, सुख से रहित तथा परधर्म में रुचि रखने वाला होता है।",
            },
            Venus: {
                english:
                    "If Mars is in Taurus/Libra with the aspect of Saturn, the native will be happy, famous, wealthy, be endowed with friends and own men, be learned and will be head of a group of villages/towns, or group of men.",
                hindi: "यदि मंगल वृषभ/तुला राशि में शनि की दृष्टि से स्थित हो तो जातक सुखी, प्रसिद्ध, धनवान, मित्रों और व्यक्तियों से संपन्न, विद्वान होगा तथा गांवों/कस्बों के समूह या पुरुषों के समूह का मुखिया होगा।",
            },
            Mars: {
                english:
                    "Should Mars at birth be in Aries/Scorpio and be aspected by Saturn, the native will be capable of hindering thieves in spite of his being not valorous, will be devoid of his men and will maintain another woman.",
                hindi: "यदि जन्म के समय मंगल मेष/वृश्चिक राशि में हो तथा शनि से दृष्ट हो तो जातक वीर न होते हुए भी चोरों को रोकने में सक्षम होगा, अपने घर वालों से विमुख होगा तथा परस्त्री को धारण करेगा।",
            },
            Saturn: {
                english:
                    "Should Mars be in Capricorn, or Aquarius and be aspected by Saturn, the person will be a king, be very affluent, will hate women, will possess many children, be learned, be devoid, of happiness and be timid in war.",
                hindi: "यदि मंगल मकर या कुंभ राशि में हो और शनि से दृष्ट हो तो जातक राजा, बहुत धनवान, स्त्रियों से घृणा करने वाला, बहुत संतान वाला, विद्वान, सुख से रहित और युद्ध में डरपोक होता है।",
            },
        },
        Mercury: {
            Sun: {
                english:
                    "If Saturn aspects Mercury in Leo, one will be tall in stature, be splendourless, be ugly, will emanate bad smell from body out of sweat and be miserable.",
                hindi: "यदि सिंह राशि में शनि बुध को देखता है तो वह लंबा कद, वैभवहीन, कुरूप, पसीने से शरीर से दुर्गंध आने वाला और दुखी होगा।",
            },
            Moon: {
                english:
                    "If Saturn aspects Mercury in Cancer, one will be fond of vanity, be sinful, will face imprisonment, be devoid of virtues and will hate co-born and elders.",
                hindi: "कर्क राशि में शनि की बुध पर दृष्टि हो तो व्यक्ति घमंडी, पापी, कारावास भोगने वाला, सद्गुणों से रहित तथा सहजन्मों और बड़ों से द्वेष रखने वाला होता है।",
            },
            Mars: {
                english:
                    "If Mercury is in a Sign of Mars and is aspected by Saturn, the person will experience miseries, be fierce, be intent upon doing cruel activities and be devoid of his own men.",
                hindi: "यदि बुध मंगल की राशि में हो और शनि से दृष्ट हो तो जातक दुखों का अनुभव करने वाला, उग्र स्वभाव वाला, क्रूर कार्यों में संलग्न रहने वाला तथा अपने प्रियजनों से रहित होगा।",
            },
            Jupiter: {
                english:
                    "If Saturn aspect Mercury in Sagittarius/Pisces, the native will be intent upon living in forests, will eat much, be wicked, dirty and will be unsuccessful in all his undertakings.",
                hindi: "यदि धनु/मीन राशि में शनि बुध को देखता है, तो जातक जंगलों में रहने का इच्छुक होगा, अधिक खाएगा, दुष्ट होगा, गंदा होगा और अपने सभी कार्यों में असफल होगा।",
            },
            Venus: {
                english:
                    "If Saturn throws his aspect on Mercury in a House of Venus, the subject will be devoid of happiness, be dirty, will experience many diseases and evils, will be subjected to grief on account of his relatives and be distressed.",
                hindi: "यदि शनि शुक्र के घर में बुध पर दृष्टि डालता है, तो जातक सुख से रहित, गंदा, अनेक रोगों और बुराइयों का शिकार, अपने रिश्तेदारों के कारण दुःखी और व्यथित होगा।",
            },
            Mercury: {
                english:
                    "Should Mercury be in his own House and receive the aspect of Saturn, one will be progressive-minded, be modest, will achieve success in undertakings started by him and will be wealthy with money and clothes.",
                hindi: "यदि बुध अपने ही भाव में हो और शनि की दृष्टि उस पर हो तो व्यक्ति प्रगतिशील विचारों वाला, विनम्र, अपने द्वारा शुरू किए गए कार्यों में सफलता प्राप्त करने वाला तथा धन और वस्त्रों से संपन्न होगा।",
            },
            Saturn: {
                english:
                    "If Mercury be in a House of Saturn and is aspected by Saturn, one will be sinful, very poor, miserable and mean.",
                hindi: "यदि बुध शनि के घर में हो और शनि से दृष्ट हो तो व्यक्ति पापी, बहुत गरीब, दुखी और नीच होगा।",
            },
        },
        Jupiter: {
            Sun: {
                english:
                    "If Jupiter is in Leo and is aspected by Saturn, one will be garrulous, be an eloquent speaker, be devoid of happiness, be sharp and will have mean children and mean wife.",
                hindi: "यदि बृहस्पति सिंह राशि में हो और शनि से दृष्ट हो तो व्यक्ति बातूनी, वाक्पटु, सुख से रहित, कुशाग्र बुद्धि वाला, नीच संतान और नीच पत्नी वाला होता है।",
            },
            Moon: {
                english:
                    "If Jupiter occupies Gemini/Virgo and is aspected by Saturn, one will be important in his village, or in the Army, or in his town, be talkative, be very affluent, garrulous and will enjoy pleasures in old age.",
                hindi: "यदि बृहस्पति मिथुन/कन्या राशि में हो और शनि से दृष्ट हो तो व्यक्ति अपने गांव में, सेना में, या शहर में महत्वपूर्ण होगा, बातूनी होगा, बहुत धनवान होगा, बातूनी होगा और बुढ़ापे में सुख भोगेगा।",
            },
            Mars: {
                english:
                    "If Jupiter occupies Aries/Scorpio and is aspected by Saturn, the subject will be dirty, miserly, sharp, adventurous, amiable, famous and will not have lasting children and friendship.",
                hindi: "यदि बृहस्पति मेष/वृश्चिक राशि में हो और शनि से दृष्ट हो तो जातक गंदा, कंजूस, तीक्ष्ण बुद्धि वाला, साहसी, मिलनसार, प्रसिद्ध होगा तथा उसके बच्चे और मित्रता स्थायी नहीं होंगे।",
            },
            Mercury: {
                english:
                    "If Jupiter occupies Gemini/Virgo and is aspected by Saturn, the native will be the head of a group, state, or village and be beautiful.",
                hindi: "यदि बृहस्पति मिथुन/कन्या राशि में हो और शनि से दृष्ट हो तो जातक समूह, राज्य या गांव का मुखिया होगा और सुंदर होगा।",
            },
            Venus: {
                english:
                    "If Jupiter occupies a House of Venus and is aspected by Saturn, the native will be a scholar, will be endowed with abundant wealth and corns, be excellent among the people of his village/town, be dirty, ugly and be devoid of wife.",
                hindi: "यदि बृहस्पति शुक्र के घर में हो और शनि से दृष्ट हो तो जातक विद्वान होगा, प्रचुर धन-धान्य से संपन्न होगा, अपने गांव/शहर के लोगों के बीच श्रेष्ठ होगा, गंदा, कुरूप होगा और पत्नी से रहित होगा।",
            },
            Jupiter: {
                english:
                    "If Jupiter is posited in Sagittarius/Pisces and is aspected by Saturn, the native will be dirty, will be fear-stricken, be neglected by the people of his village/town and be devoid of happiness, pleasures and virtues.",
                hindi: "यदि बृहस्पति धनु/मीन राशि में स्थित हो और शनि से दृष्ट हो तो जातक गंदा, भयभीत, अपने गांव/शहर के लोगों द्वारा उपेक्षित तथा सुख, आनंद और गुणों से रहित होगा।",
            },
            Saturn: {
                english:
                    "If Jupiter is in a House of Saturn and is aspected by Saturn, the native will be endowed with incomparable learning, be supreme, be a king of his country, be rich with attendants and quadrupeds and will enjoy pleasures.",
                hindi: "यदि बृहस्पति शनि के घर में हो और शनि से दृष्ट हो तो जातक अतुलनीय विद्या से संपन्न, श्रेष्ठ, अपने देश का राजा, सेवकों और चतुर्भुजों से युक्त तथा सुखों का आनंद लेने वाला होता है।",
            },
        },
        Venus: {
            Sun: {
                english:
                    "If Venus is in Leo and is aspected by Saturn, one will be a king, or equal to a king, be famous, will have abundant wealth and conveyances, will marry a prostitute (or a widow), be beautiful in appearance and be miserable.",
                hindi: "यदि शुक्र सिंह राशि में हो और शनि से दृष्ट हो तो व्यक्ति राजा होगा, या राजा के समान होगा, प्रसिद्ध होगा, प्रचुर धन और वाहन होगा, वेश्या (या विधवा) से विवाह करेगा, दिखने में सुंदर होगा और दुखी होगा।",
            },
            Moon: {
                english:
                    "If Venus is in Cancer and is aspected by Saturn, one will be subdued by women, be poor, base, ugly, fickle-minded and unhappy.",
                hindi: "यदि शुक्र कर्क राशि में हो और शनि से दृष्ट हो तो व्यक्ति स्त्रियों के वशीभूत, दरिद्र, नीच, कुरूप, चंचल और दुखी होता है।",
            },
            Mars: {
                english:
                    "If Venus is in Aries, or Scorpio and is aspected by Saturn, one will be very dirty, lazy and wandering-natured, will serve others and be a thief.",
                hindi: "यदि शुक्र मेष या वृश्चिक राशि में हो और शनि से दृष्ट हो तो व्यक्ति बहुत गंदा, आलसी और घुमक्कड़ स्वभाव का होगा, दूसरों की सेवा करने वाला और चोर होगा।",
            },
            Mercury: {
                english:
                    "If Venus is in Gemini, or Virgo and is aspected by Saturn, one will be very miserable, insulted, fickle-minded, green-eyed and be a dunce.",
                hindi: "यदि शुक्र मिथुन या कन्या राशि में हो और शनि से दृष्ट हो तो व्यक्ति बहुत दुखी, अपमानित, चंचल, हरा-आंखों वाला और मूर्ख होगा।",
            },
            Jupiter: {
                english:
                    "If Venus is in Sagittarius, or Pisces and is aspected by Saturn, one will be always amassing financial gains, be happy, will enjoy pleasures and abundant wealth and be fortunate.",
                hindi: "यदि शुक्र धनु या मीन राशि में हो और शनि से दृष्ट हो तो व्यक्ति सदैव धन लाभ प्राप्त करता रहेगा, प्रसन्न रहेगा, सुखों और प्रचुर धन का आनंद लेगा तथा भाग्यशाली रहेगा।",
            },
            Venus: {
                english:
                    "If Venus is in Taurus, or Libra and is aspected by Saturn, one will have little happiness, little wealth, will be reprobate, will marry a mean lady and will suffer from diseases.",
                hindi: "यदि शुक्र वृषभ या तुला राशि में हो और शनि से दृष्ट हो तो व्यक्ति को सुख कम मिलेगा, धन कम मिलेगा, वह निंदित होगा, नीच स्त्री से विवाह करेगा और रोगों से ग्रस्त रहेगा।",
            },
            Saturn: {
                english:
                    "If Venus is in Capricorn, or Aquarius and is aspected by Saturn, one will be endowed with servants, conveyances and wealth, be dirty and will possess a black, beautiful and broad physique ",
                hindi: "यदि शुक्र मकर या कुंभ राशि में हो और शनि से दृष्ट हो, तो वह नौकरों, वाहनों और धन से संपन्न होगा, गंदा होगा और उसका शरीर काला, सुंदर और चौड़ा होगा।",
            },
        },
    },
    Moon: {
        Sun: {
            Moon: {
                english:
                    "If the Sun in Cancer is aspected by the Moon, the person will be a king, or equal to a king, will become rich by business through water and be cruel.",
                hindi: "यदि कर्क राशि में सूर्य पर चन्द्रमा की दृष्टि हो तो जातक राजा होगा, या राजा के समान होगा, जल से व्यापार करके धनवान होगा तथा क्रूर होगा।",
            },
            Sun: {
                english:
                    "If the Sun occupying Leo is aspected by the Moon, the native will be a scholar, will have a good wife, will suffer from phlegmatic disorders and will be dear to king.",
                hindi: "यदि सिंह राशि में स्थित सूर्य पर चन्द्रमा की दृष्टि हो तो जातक विद्वान, अच्छी पत्नी वाला, कफ विकार से पीड़ित तथा राजा का प्रिय होगा।",
            },
            Mars: {
                english:
                    "Should the Sun be in a Sign of Mars (i.e. either in Aries, or in Scorpio) and be aspected by the Moon, the native will be interested in giving away gifts, will have many servants, be charming, be dear to fair sex and will have a soft physique.",
                hindi: "यदि सूर्य मंगल की राशि (यानि मेष या वृश्चिक) में हो और चंद्रमा से दृष्ट हो तो जातक उपहार देने में रुचि रखने वाला, अनेक नौकर रखने वाला, आकर्षक, स्त्री-पुरुष का प्रिय तथा कोमल शरीर वाला होगा।",
            },
            Mercury: {
                english:
                    "Should the Sun be in Gemini, or Virgo be aspected by the Moon, the native will be put to troubles by enemies and relatives, will be distressed by visits to foreign countries. and will in general be wailing.",
                hindi: "यदि सूर्य मिथुन राशि में हो या कन्या राशि पर चंद्रमा की दृष्टि हो तो जातक को शत्रुओं और रिश्तेदारों से परेशानी होगी, विदेश यात्राओं से कष्ट होगा और सामान्य रूप से विलाप करता रहेगा।",
            },
            Jupiter: {
                english:
                    "Should the Sun at birth be in a sign of Jupiter and be aspected by the Moon, the native will be endowed with eloquent speech, wisdom, wealth and sons. He will be equal to a king and be devoid of misery. He will also possess a pleasing body.",
                hindi: "यदि जन्म के समय सूर्य बृहस्पति की राशि में हो और चंद्रमा से दृष्ट हो, तो जातक वाक्पटु, बुद्धि, धन और पुत्र से संपन्न होगा। वह राजा के समान होगा और दुःखों से रहित होगा। उसका शरीर भी सुंदर होगा।",
            },
            Venus: {
                english:
                    "One, who has the Sun in a sign of Venus aspected by the Moon will be addicted to prostitutes, will be soft spoken, will have many women, as dependents and will derive livelihood through water.",
                hindi: "जिस जातक का सूर्य शुक्र की राशि में हो और उस पर चंद्रमा की दृष्टि हो, वह वेश्याओं का आदी, मृदुभाषी, अनेक स्त्रियों वाला, आश्रित तथा जल से आजीविका चलाने वाला होता है।",
            },
            Saturn: {
                english:
                    "If the Moon aspects the Sun in a sign of Saturn, the native will be highly cunning in disposition and will lose his wealth and happiness on account of his befriending females.",
                hindi: "यदि शनि की राशि में चंद्रमा सूर्य को देखता है, तो जातक स्वभाव से बहुत चालाक होगा और स्त्रियों से मित्रता करने के कारण अपनी संपत्ति और सुख को खो देगा।",
            },
        },
        Mars: {
            Sun: {
                english:
                    "If the Moon aspects Mars in Leo, the native will be ominous for his mother, be intelligent, will possess a hard body, be widely famous and will obtain money through women.",
                hindi: "यदि सिंह राशि में चंद्रमा मंगल को देखता है तो जातक अपनी माता के लिए अशुभ, बुद्धिमान, कठोर शरीर वाला, व्यापक रूप से प्रसिद्ध और स्त्रियों के माध्यम से धन प्राप्त करने वाला होगा।",
            },
            Mars: {
                english:
                    "Should Mars at birth be in Aries/Scorpio and be aspected by the Moon, the native will be bereft of mother, will have a wounded body, will hate his own people, will not have friends, be jealous and will have female children.",
                hindi: "यदि जन्म के समय मंगल मेष/वृश्चिक राशि में हो और चंद्रमा से दृष्ट हो तो जातक माता विहीन, घायल शरीर वाला, अपने लोगों से घृणा करने वाला, मित्र विहीन, ईर्ष्यालु होगा तथा कन्या संतान होगी।",
            },
            Moon: {
                english:
                    "If the Moon aspects Mars in Cancer, the person will be troubled by various diseases, will have mean conduct, will possess an unsightly body and be miserable.",
                hindi: "यदि कर्क राशि में चन्द्रमा मंगल को देखता है तो जातक विभिन्न रोगों से ग्रस्त, नीच आचरण वाला, कुरूप शरीर वाला और दुखी होगा।",
            },
            Mercury: {
                english:
                    "If Mars is in Gemini/Virgo and is aspected by the Moon, the person will be happy, wealthy, splendourous, will guard womens apartments, will be endowed with women and will manage the kings residence.",
                hindi: "यदि मंगल मिथुन/कन्या राशि में हो और चन्द्रमा से दृष्ट हो तो जातक सुखी, धनवान, वैभवशाली, स्त्रियों के घर की रखवाली करने वाला, स्त्रियों से संपन्न तथा राजा के घर का प्रबंध करने वाला होता है।",
            },
            Jupiter: {
                english:
                    "If Mars is in Sagittarius, or Pisces and is aspected by the Moon, the person will be deformed, belligerent, learned and be always inimical to the king.",
                hindi: "यदि मंगल धनु या मीन राशि में हो और चंद्रमा से दृष्ट हो तो जातक विकृत, झगड़ालू, विद्वान और राजा से सदैव शत्रुता रखने वाला होता है।",
            },
            Venus: {
                english:
                    "If Mars is in Taurus/Libra with the aspect of the Moon, the native will not honour his mother, be wicked, will lord many women and be dear to them and will fear war.",
                hindi: "यदि मंगल वृषभ/तुला राशि में हो और उस पर चन्द्रमा की दृष्टि हो तो जातक अपनी माता का सम्मान नहीं करेगा, दुष्ट होगा, अनेक स्त्रियों पर प्रभुता करेगा तथा उनसे प्रिय होगा तथा युद्ध से डरेगा।",
            },
            Saturn: {
                english:
                    "Should Mars be in Capricorn, or Aquarius and be aspected by the Moon, one will be fickle minded, be not well disposed towards his mother, be fond of beautification, be charitable, be not firm in friendship and be rich.",
                hindi: "यदि मंगल मकर या कुंभ राशि में हो और चंद्रमा से दृष्ट हो तो जातक चंचल स्वभाव का, माता के प्रति उदासीन, सौन्दर्य प्रिय, दानशील, मित्रता में दृढ़ न रहने वाला तथा धनवान होता है।",
            },
        },
        Mercury: {
            Sun: {
                english:
                    "If the Moon aspects Mercury in Leo, one will be very beautiful, very skillful, be interested in poetry, fine arts, music and dance, be wealthy and virtuous.",
                hindi: "यदि सिंह राशि में चन्द्रमा बुध को देखता है तो व्यक्ति बहुत सुंदर, बहुत कुशल, कविता, ललित कला, संगीत और नृत्य में रुचि रखने वाला, धनवान और गुणी होगा।",
            },
            Mars: {
                english:
                    "If Mercury is in a Sign of Mars and is aspected by the Moon, the native will steal the hearts of the fair sex, will serve others, be dirty and be bereft of virtues.",
                hindi: "यदि बुध मंगल की राशि में हो और चंद्रमा से दृष्ट हो तो जातक सुंदर स्त्री का दिल चुराने वाला, दूसरों की सेवा करने वाला, गंदा और गुणों से रहित होगा।",
            },
            Mercury: {
                english:
                    "Should Mercury be in his own House and receive the aspect of the Moon, the person will be sweet in disposition, garrulous, will promote quarrels, be interested in acquiring sastric knowledge, firm and will succeed in all his undertakings.",
                hindi: "यदि बुध अपने ही भाव में हो और उस पर चंद्रमा की दृष्टि हो तो जातक स्वभाव से मधुर, बातूनी, झगड़ों को बढ़ावा देने वाला, शास्त्र ज्ञान प्राप्त करने में रुचि रखने वाला, दृढ़ निश्चयी तथा अपने सभी कार्यों में सफल होगा।",
            },
            Moon: {
                english:
                    "If the Moon aspects Mercury in Cancer, one will be deprived of wealth (or energy of the physique) on account of women and will be miserable for the same reason.",
                hindi: "यदि कर्क राशि में चन्द्रमा बुध को देखता है, तो व्यक्ति स्त्रियों के कारण धन (या शरीर की ऊर्जा) से वंचित होगा और उसी कारण से दुखी होगा।",
            },
            Jupiter: {
                english:
                    "If the Moon aspects Mercury in Sagittarius/Pisces, the native will be a writer, be beautiful par excellence, be very affluent, trustworthy, amiable and happy.",
                hindi: "यदि चन्द्रमा धनु/मीन राशि में बुध को देखता है, तो जातक लेखक होगा, अत्यंत सुन्दर होगा, बहुत धनवान, विश्वसनीय, मिलनसार और प्रसन्न होगा।",
            },
            Venus: {
                english:
                    "Should Mercury be in a House of Venus and be aspected by the Moon, the native will be trustworthy, affluent, firmly pious, devoid of sickness, will have lasting family ties, be famous and be a kings minister.",
                hindi: "यदि बुध शुक्र के घर में हो और चन्द्रमा से दृष्ट हो तो जातक विश्वसनीय, धनवान, पवित्र, रोग रहित, स्थायी पारिवारिक सम्बन्ध वाला, प्रसिद्ध और राजा का मंत्री होगा।",
            },
            Saturn: {
                english:
                    "If Mercury be in a House of Saturn and is aspected by the Moon, one will derive his livelihood through water, be plentiful will sell flowers, liquor and bulbs (vegetables), will have fierce appearance and be firm (i.e. not moving much).",
                hindi: "यदि बुध शनि के घर में हो और चन्द्रमा से दृष्ट हो तो व्यक्ति जल से आजीविका प्राप्त करेगा, धनवान होगा, फूल, शराब और कंद (सब्जियां) बेचेगा, भयंकर रूप वाला होगा और दृढ़ होगा (अर्थात् अधिक गतिशील नहीं होगा)।",
            },
        },
        Jupiter: {
            Sun: {
                english:
                    "If Jupiter is in Leo and is aspected by the Moon, the native will be very beautiful, dirty, will be very rich through the fortunes of his wife and will conquer his five senses.",
                hindi: "यदि बृहस्पति सिंह राशि में हो और चंद्रमा से दृष्ट हो तो जातक बहुत सुंदर, गंदा, अपनी पत्नी के भाग्य से बहुत धनवान होगा तथा अपनी पांचों इंद्रियों पर विजय प्राप्त करेगा।",
            },
            Mars: {
                english:
                    "If Jupiter occupies Aries/Scorpio and is aspected by the Moon, the native will be a historical and poetical writer, will be endowed with many precious stones, be dear to women, be a king and be highly learned.",
                hindi: "यदि बृहस्पति मेष/वृश्चिक राशि में हो और उस पर चंद्रमा की दृष्टि हो तो जातक ऐतिहासिक और काव्य लेखक होगा, अनेक रत्नों से युक्त होगा, स्त्रियों का प्रिय होगा, राजा होगा और अत्यधिक विद्वान होगा।",
            },
            Mercury: {
                english:
                    "If Jupiter occupies Gemini/Virgo and is aspected by the Moon, the native will be affluent, dear to mother, fortunate, happy, will have wife and sons and be incomparable.",
                hindi: "यदि बृहस्पति मिथुन/कन्या राशि में हो और चंद्रमा से दृष्ट हो तो जातक धनवान, माता का प्रिय, भाग्यशाली, सुखी, पत्नी और पुत्र वाला तथा अतुलनीय होगा।",
            },
            Moon: {
                english:
                    "If Jupiter occupies Gemini/Virgo and is aspected by the Moon, the native will be very rich, splendourous, be a king, will enjoy abundant wealth and conveyances and will have excellent wife and sons.",
                hindi: "यदि बृहस्पति मिथुन/कन्या राशि में हो और चंद्रमा से दृष्ट हो तो जातक बहुत धनवान, वैभवशाली, राजा होगा, प्रचुर धन और वाहन का आनंद लेगा तथा उसकी पत्नी और पुत्र उत्तम होंगे।",
            },
            Jupiter: {
                english:
                    "If Jupiter is posited in Sagittarius/Pisces and is aspected by the Moon, the native will enjoy many kinds of happiness, be very fortunate in respect of wife and will have the pride of honour, wealth and possessions.",
                hindi: "यदि बृहस्पति धनु/मीन राशि में स्थित हो और चंद्रमा से दृष्ट हो तो जातक अनेक प्रकार के सुखों का आनंद उठाएगा, पत्नी के मामले में बहुत भाग्यशाली होगा तथा सम्मान, धन और संपत्ति का गौरव प्राप्त करेगा।",
            },
            Venus: {
                english:
                    "If Jupiter occupies a House of Venus and is aspected by the Moon, the native will be abundantly rich, be very calm, Sweet, be dear to mother and wife and will enjoy much pleasures.",
                hindi: "यदि बृहस्पति शुक्र के घर में हो और चंद्रमा से दृष्ट हो तो जातक बहुत धनवान, शांत, मधुर स्वभाव वाला, माता और पत्नी का प्रिय होगा तथा बहुत सुख भोगेगा।",
            },
            Saturn: {
                english:
                    "If Jupiter is in a House of Saturn and is aspected by the Moon, the native will be devoted to his parents, be superior by birth, be learned rich, virtuous and very charitable.",
                hindi: "यदि बृहस्पति शनि के घर में हो और चंद्रमा से दृष्ट हो तो जातक अपने माता-पिता के प्रति समर्पित, जन्म से श्रेष्ठ, विद्वान, धनी, गुणी और बहुत दानशील होगा।",
            },
        },
        Venus: {
            Sun: {
                english:
                    "If Venus is in Leo and is aspected by the Moon, one will present obsequial water to his step mother, will be miserable on account of women, be rich and will have various kinds of mental disposition (i.e. be infirm in disposition).",
                hindi: "यदि शुक्र सिंह राशि में हो और चन्द्रमा से दृष्ट हो तो व्यक्ति अपनी सौतेली मां को जल अर्पित करेगा, स्त्रियों के कारण दुखी होगा, धनवान होगा तथा विविध प्रकार की मानसिक प्रवृत्ति वाला होगा (अर्थात् दुर्बल स्वभाव वाला होगा)।",
            },
            Mars: {
                english:
                    "If Venus is in Aries, or Scorpio and is aspected by the Moon, one will be imprisoned, very fickle-minded, be libidinous, will marry a base lady and will be bereft of children.",
                hindi: "यदि शुक्र मेष या वृश्चिक राशि में हो और चंद्रमा से दृष्ट हो तो व्यक्ति कारावास में रहेगा, बहुत चंचल स्वभाव का होगा, कामुक होगा, नीच स्त्री से विवाह करेगा और संतानहीन होगा।",
            },
            Mercury: {
                english:
                    "If Venus is in Gemini, or Virgo and is aspected by the Moon, one will have dark eyes, beautiful hair, be endowed with sleeping comforts, conveyances etc., be splendourous, beautiful in appearance and be fortunate.",
                hindi: "यदि शुक्र मिथुन या कन्या राशि में हो और उस पर चंद्रमा की दृष्टि हो तो जातक की आंखें गहरी होंगी, बाल सुंदर होंगे, उसे शयन सुख, वाहन आदि की सुविधा प्राप्त होगी, वह वैभवशाली, सुंदर और भाग्यशाली होगा।",
            },
            Jupiter: {
                english:
                    "If Venus is in Sagittarius, or Pisces and is aspected by the Moon, one will be famous, be kingly, will eat rich food, be distinguished and will possess incomparable strength.",
                hindi: "यदि शुक्र धनु या मीन राशि में हो और उस पर चंद्रमा की दृष्टि हो तो व्यक्ति प्रसिद्ध, राजसी, गरिष्ठ भोजन करने वाला, प्रतिष्ठित और अतुलनीय शक्ति वाला होगा।",
            },
            Venus: {
                english:
                    "If Venus is in Taurus, or Libra and is aspected by the Moon, it indicates, that one is born of an excellent mother, will be endowed with happiness, wealth, respect and sons, will have excellence and be splendourous.",
                hindi: "यदि शुक्र वृषभ या तुला राशि में हो और उस पर चंद्रमा की दृष्टि हो तो यह दर्शाता है कि जातक उत्तम माता से जन्मा होगा, सुख, धन, सम्मान और पुत्रों से संपन्न होगा, श्रेष्ठ होगा और वैभवशाली होगा।",
            },
            Moon: {
                english:
                    "If Venus is in Cancer and is aspected by the Moon, one will keep his step-mother happy, will have a daughter first and later on many sons, be happy, fortunate and beautiful.",
                hindi: "यदि शुक्र कर्क राशि में हो और उस पर चंद्रमा की दृष्टि हो तो व्यक्ति अपनी सौतेली मां को प्रसन्न रखेगा, पहले एक पुत्री होगी और बाद में कई पुत्र होंगे, सुखी, भाग्यशाली और सुंदर होगा।",
            },
            Saturn: {
                english:
                    "If Venus is in Capricorn, or Aquarius and is aspected by the Moon, one will be very splenderous, very valorous, very affluent and fortunate.",
                hindi: "यदि शुक्र मकर या कुंभ राशि में हो और उस पर चंद्रमा की दृष्टि हो तो व्यक्ति बहुत वैभवशाली, बहुत पराक्रमी, बहुत धनवान और भाग्यशाली होगा।",
            },
        },
        Saturn: {
            Sun: {
                english:
                    "If Saturn is in Leo and is aspected by the Moon, one will enjoy abundant wealth, precious stones and women, be widely famous and be dear to the king.",
                hindi: "यदि शनि सिंह राशि में हो और उस पर चंद्रमा की दृष्टि हो तो जातक प्रचुर धन, रत्न और स्त्रियों का सुख भोगता है, व्यापक प्रसिद्धि प्राप्त करता है तथा राजा का प्रिय होता है।",
            },
            Mars: {
                english:
                    "If Saturn is in Aries, or Scorpio and is aspected by the Moon, one will be fickle minded, base, will join mean and ugly women and be devoid of happiness and wealth.",
                hindi: "यदि शनि मेष या वृश्चिक राशि में हो और चंद्रमा से दृष्ट हो तो व्यक्ति चंचल, नीच, नीच और कुरूप स्त्रियों से युक्त तथा सुख और धन से रहित होगा।",
            },
            Mercury: {
                english:
                    "If Saturn is in Gemini, or Virgo and is aspected by the Moon, one will be equal to a king, will possess a bright physique, will earn wealth and honour through women and will do womens jobs.",
                hindi: "यदि शनि मिथुन या कन्या राशि में हो और उस पर चंद्रमा की दृष्टि हो तो जातक राजा के समान, चमकदार शरीर वाला, स्त्रियों के माध्यम से धन और सम्मान अर्जित करने वाला तथा स्त्रियों के समान कार्य करने वाला होता है।",
            },
            Jupiter: {
                english:
                    "If Saturn is in Sagittarius, or Pisces and is aspected by the Moon, one will be bereft of mother, will have two names and be endowed with wife, children and wealth.",
                hindi: "यदि शनि धनु या मीन राशि में हो और उस पर चंद्रमा की दृष्टि हो तो जातक मातृहीन, दो नाम वाला, स्त्री, संतान और धन से युक्त होता है।",
            },
            Venus: {
                english:
                    "If Saturn is in Taurus, or Libra and is aspected by the Moon, one will gain wealth through women, will be honoured by ministers of kings, be dear to women and be endowed with family.",
                hindi: "यदि शनि वृषभ या तुला राशि में हो और चन्द्रमा से दृष्ट हो तो स्त्रियों के माध्यम से धन प्राप्त होगा, राजाओं के मंत्रियों द्वारा सम्मानित होगा, स्त्रियों का प्रिय होगा और कुटुम्ब से संपन्न होगा।",
            },
            Moon: {
                english:
                    "If Saturn is in Cancer and is aspected by the Moon, one will be a source of evil to his mother, be wealthy and will be troubled by his co-born.",
                hindi: "यदि शनि कर्क राशि में हो और उस पर चंद्रमा की दृष्टि हो तो व्यक्ति अपनी मां के लिए कष्टकारी होगा, धनवान होगा तथा अपने सह-जन्म से परेशान रहेगा।",
            },
            Saturn: {
                english:
                    "If Saturn is in Capricorn, or Aquarius and is aspected by the Moon, one will be fickle-minded, untruthful, sinful, will not have good terms with his mother, be rich and be sorrowful due to wandering.",
                hindi: "यदि शनि मकर या कुंभ राशि में हो और उस पर चंद्रमा की दृष्टि हो तो जातक चंचल, असत्यभाषी, पापी, माता से अमित्र, धनवान और भ्रमणशील होने के कारण दुःखी होता है।",
            },
        },
    },
};
