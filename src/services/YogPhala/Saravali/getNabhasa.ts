import type { HouseNumber } from "src/services/constants/Houses";
import type { Planet, PlanetEn } from "src/services/constants/Planet";
import { memoizeFunction, MOD360 } from "src/services/utils";
import type { Phala } from "src/services/YogPhala";

export function getSaravaliNabhasaYogPhala(
    planets: Record<PlanetEn, Planet>
): Phala[] {
    const countPlanetsInHouse = memoizeFunction(
        (houseNum: HouseNumber): number =>
            Object.values(planets).filter(
                p =>
                    (p.type === "Saptagraha" || p.type === "Chhayagraha") &&
                    p.house.num === houseNum
            ).length
    );

    const numberOfOccupiedSigns = new Set(
        Object.values(planets)
            .filter(p => p.type === "Saptagraha" || p.type === "Chhayagraha")
            .map(p => p.rasi.name.english)
    ).size;

    /**
     * Checks if the target planet is conjunct with any malefic planet in the
     * same rasi (sign).
     *
     * @param target - The planet to check for conjunction with malefics.
     * @returns {boolean} - True if any malefic planet shares the same rasi as
     *   the target, false otherwise.
     */
    const hasMaleficConjunction = memoizeFunction((target: Planet): boolean =>
        Object.values(planets).some(
            graha =>
                graha.name.english !== target.name.english &&
                !isBenefic(graha) &&
                target.rasi.rasi_num === graha.rasi.rasi_num
        )
    );

    /**
     * Checks if the target planet is aspected by any malefic planet using graha
     * drishti.
     *
     * @param target - The planet to check for malefic aspects.
     * @returns {boolean} - True if any malefic planet aspects the target
     *   planet, false otherwise.
     */
    const isAspectedByMalefic = memoizeFunction((target: Planet): boolean =>
        Object.values(planets).some(
            graha =>
                graha.name.english !== target.name.english &&
                !isBenefic(graha) &&
                graha.isAspecting(target)
        )
    );

    const isBenefic = memoizeFunction((p: Planet): boolean => {
        const { english } = p.name;

        if (english === "Venus" || english === "Jupiter") return true;

        if (english === "Moon") {
            // Bright Moon condition:
            return MOD360(planets.Moon.degree - planets.Sun.degree) < 180;
        }

        if (english === "Mercury") {
            // Check if Mercury is not associated/aspected by malefics
            return !(hasMaleficConjunction(p) || isAspectedByMalefic(p));
        }

        return false;
    });

    const effectTable: Array<Phala & { rule: boolean }> = [
        {
            description: {
                english:
                    "Akriti/Sringataka: all planets in Ascendant or its trines",
                hindi: "आकृति/श्रृंगटक: लग्न या उसके त्रिकोण में सभी ग्रह",
            },
            effect: {
                english:
                    "SRINGATAKA YOGA. One born with this Yoga will be fond of quarrels, be a warrior, be happy, dear to king, will have a fortunate wife, be rich and will hate the fair sex.",
                hindi: "श्रृंगटक योग। इस योग से युक्त व्यक्ति झगड़ालू, योद्धा, सुखी, राजा का प्रिय, सौभाग्यशाली पत्नी वाला, धनवान तथा स्त्री से घृणा करने वाला होता है।",
            },
            rule:
                planets.Sun.house.num % 4 === 0 &&
                planets.Moon.house.num % 4 === 0 &&
                planets.Mars.house.num % 4 === 0 &&
                planets.Mercury.house.num % 4 === 0 &&
                planets.Jupiter.house.num % 4 === 0 &&
                planets.Venus.house.num % 4 === 0 &&
                planets.Saturn.house.num % 4 === 0,
        },
        {
            description: {
                english: "Akriti/Hala: all planets in trines without Ascendant",
                hindi: "आकृति/हल: लग्न के बिना त्रिकोण में सभी ग्रह",
            },
            effect: {
                english:
                    "HALA YOGA. The native of this Yoga will eat in plenty, will be indigent, will have agricultural profession, will be subjected to grief, be emotional, be forsaken by relatives and friends and will be a servant.",
                hindi: "हल योग। इस योग से पीड़ित जातक अधिक भोजन करने वाला, निर्धन, कृषि व्यवसाय वाला, दुःखी, भावुक, सगे-संबंधियों और मित्रों द्वारा त्यागा हुआ तथा नौकर होगा।",
            },
            rule:
                planets.Sun.house.num % 4 === 0 &&
                planets.Moon.house.num % 4 === 0 &&
                planets.Mars.house.num % 4 === 0 &&
                planets.Mercury.house.num % 4 === 0 &&
                planets.Jupiter.house.num % 4 === 0 &&
                planets.Venus.house.num % 4 === 0 &&
                planets.Saturn.house.num % 4 === 0 &&
                countPlanetsInHouse(1) === 0,
        },
        {
            description: {
                english:
                    "Akriti/Sakata: all planets occupy Ascendant and the 7th",
                hindi: "आकृति/सकट: सभी ग्रह लग्न और सप्तम भाव में हों",
            },
            effect: {
                english:
                    "SAKATA YOGA. One born with Sakata Yoga will be troubled by diseases, will have a bad wife, will be a dunce, will live by pulling carts, will be poor and be without relatives and friends.",
                hindi: "शकट योग। शकट योग में जन्म लेने वाला व्यक्ति रोगों से ग्रस्त होगा, उसकी पत्नी बुरी होगी, वह मूर्ख होगा, गाड़ी खींचकर जीवनयापन करेगा, गरीब होगा और उसके रिश्तेदार और मित्र नहीं होंगे।",
            },
            rule:
                planets.Sun.house.num % 6 === 1 &&
                planets.Moon.house.num % 6 === 1 &&
                planets.Mars.house.num % 6 === 1 &&
                planets.Mercury.house.num % 6 === 1 &&
                planets.Jupiter.house.num % 6 === 1 &&
                planets.Venus.house.num % 6 === 1 &&
                planets.Saturn.house.num % 6 === 1,
        },
        {
            description: {
                english:
                    "Akriti/Vihaga: all planets occupy the 4th and the 10th",
                hindi: "आकृति/विहग: सभी ग्रह चौथे और दसवें भाव में होते हैं",
            },
            effect: {
                english:
                    "VIHAGA YOGA. (PAKSHI YOGA). The native with this Yoga will be intent on wandering, will have mean habits, will be a messenger, will live through sexual dealings, shameless and fond of quarrels.",
                hindi: "विहग योग (पक्षी योग) - इस योग से युक्त जातक भ्रमणशील, नीच प्रवृत्ति वाला, दूत, भोग विलास करने वाला, निर्लज्ज एवं झगड़ों का शौकीन होता है।",
            },
            rule:
                planets.Sun.house.num % 6 === 4 &&
                planets.Moon.house.num % 6 === 4 &&
                planets.Mars.house.num % 6 === 4 &&
                planets.Mercury.house.num % 6 === 4 &&
                planets.Jupiter.house.num % 6 === 4 &&
                planets.Venus.house.num % 6 === 4 &&
                planets.Saturn.house.num % 6 === 4,
        },
        {
            description: {
                english:
                    "Dala/Maala: all angles exclusively occupied by benefics",
                hindi: "दला/माला: सभी कोण विशेष रूप से शुभ ग्रहों द्वारा अधिगृहित",
            },
            effect: {
                english:
                    "MAALA YOGA. One born with maala Yoga will always be happy, be endowed with conveyances, robes, wealth and pleasures, splendourous and will have plurality of wives.",
                hindi: "माला योग। माला योग में जन्म लेने वाला व्यक्ति सदैव सुखी, वाहन, वस्त्र, धन और सुखों से संपन्न, वैभवशाली और अनेक पत्नियां वाला होता है।",
            },
            rule:
                planets.Venus.house.categories.includes("Kendra") &&
                planets.Jupiter.house.categories.includes("Kendra") &&
                isBenefic(planets.Mercury) &&
                planets.Mercury.house.categories.includes("Kendra") &&
                isBenefic(planets.Moon) &&
                planets.Moon.house.categories.includes("Kendra") &&
                !planets.Sun.house.categories.includes("Kendra") &&
                !planets.Mars.house.categories.includes("Kendra") &&
                !planets.Saturn.house.categories.includes("Kendra") &&
                countPlanetsInHouse(1) > 0 &&
                countPlanetsInHouse(4) > 0 &&
                countPlanetsInHouse(7) > 0,
        },
        {
            description: {
                english: "Akriti/Padma (Kamala): all planets in kendra",
                hindi: "आकृति/पद्म (कमला): केंद्र में सभी ग्रह",
            },
            effect: {
                english:
                    "KAMALA YOGA. One born with Kamala Yoga will be highly famous, very virtuous, assuredly long living, very rich, very bright in appearance and will be the Lord of the earth.",
                hindi: "कमला योग। कमला योग के साथ जन्म लेने वाला व्यक्ति अत्यधिक प्रसिद्ध, बहुत गुणी, निश्चित रूप से दीर्घायु, बहुत धनी, दिखने में बहुत उज्ज्वल और पृथ्वी का स्वामी होगा।",
            },
            rule:
                planets.Sun.house.categories.includes("Kendra") &&
                planets.Moon.house.categories.includes("Kendra") &&
                planets.Mars.house.categories.includes("Kendra") &&
                planets.Mercury.house.categories.includes("Kendra") &&
                planets.Jupiter.house.categories.includes("Kendra") &&
                planets.Venus.house.categories.includes("Kendra") &&
                planets.Saturn.house.categories.includes("Kendra"),
        },
        {
            description: {
                english: "Akriti/Vapi: all planets in apoklima or panaphara",
                hindi: "आकृति/वापी: अपोक्लिमा या पनाफारा में सभी ग्रह",
            },
            effect: {
                english:
                    "VAPI YOGA. One born with Vapi Yoga will be skillful in amassing wealth, will enjoy lasting riches and happiness, be beautiful and will be endowed with happiness from sons.",
                hindi: "वापी योग। वापी योग में जन्म लेने वाला व्यक्ति धन संचय करने में कुशल होगा, स्थायी धन और सुख का आनंद उठाएगा, सुंदर होगा और पुत्रों से सुख प्राप्त करेगा।",
            },
            rule:
                (planets.Sun.house.categories.includes("Apoklima") &&
                    planets.Moon.house.categories.includes("Apoklima") &&
                    planets.Moon.house.categories.includes("Apoklima") &&
                    planets.Mars.house.categories.includes("Apoklima") &&
                    planets.Mercury.house.categories.includes("Apoklima") &&
                    planets.Jupiter.house.categories.includes("Apoklima") &&
                    planets.Venus.house.categories.includes("Apoklima") &&
                    planets.Saturn.house.categories.includes("Apoklima")) ||
                (planets.Sun.house.categories.includes("Panaphara") &&
                    planets.Moon.house.categories.includes("Panaphara") &&
                    planets.Moon.house.categories.includes("Panaphara") &&
                    planets.Mars.house.categories.includes("Panaphara") &&
                    planets.Mercury.house.categories.includes("Panaphara") &&
                    planets.Jupiter.house.categories.includes("Panaphara") &&
                    planets.Venus.house.categories.includes("Panaphara") &&
                    planets.Saturn.house.categories.includes("Panaphara")),
        },
        {
            description: {
                english: "Asraya/Rajju: all planets in movable signs",
                hindi: "आश्रय/रज्जु: सभी ग्रह चर राशियों में",
            },
            effect: {
                english:
                    "RAJJU YOGA. The subject with this Yoga will be fond of wandering, attractive in appearance, will earn money in foreign countries, be cruel and mischievously disposed.",
                hindi: "रज्जु योग। इस योग से युक्त जातक भ्रमण प्रिय, आकर्षक, विदेश से धन कमाने वाला, क्रूर एवं शरारती स्वभाव का होता है।",
            },
            rule:
                planets.Sun.rasi.nature === "Movable" &&
                planets.Moon.rasi.nature === "Movable" &&
                planets.Mars.rasi.nature === "Movable" &&
                planets.Mercury.rasi.nature === "Movable" &&
                planets.Jupiter.rasi.nature === "Movable" &&
                planets.Venus.rasi.nature === "Movable" &&
                planets.Saturn.rasi.nature === "Movable",
        },
        {
            description: {
                english: "Asraya/Musala: all planets in fixed signs",
                hindi: "आश्रय/मुसल: सभी ग्रह स्थिर राशियों में",
            },
            effect: {
                english:
                    "MUSALA YOGA. One born under this Yoga will be endowed with honour, wealth and wisdom, be attached to his duty, be liked by king, be famous. steady-minded and bold.",
                hindi: "मुसल योग। इस योग में जन्म लेने वाला व्यक्ति सम्मान, धन और बुद्धि से संपन्न होगा, अपने कर्तव्य के प्रति समर्पित होगा, राजा का प्रिय होगा, प्रसिद्ध होगा, स्थिरचित्त और साहसी होगा।",
            },
            rule:
                planets.Sun.rasi.nature === "Fixed" &&
                planets.Moon.rasi.nature === "Fixed" &&
                planets.Mars.rasi.nature === "Fixed" &&
                planets.Mercury.rasi.nature === "Fixed" &&
                planets.Jupiter.rasi.nature === "Fixed" &&
                planets.Venus.rasi.nature === "Fixed" &&
                planets.Saturn.rasi.nature === "Fixed",
        },
        {
            description: {
                english: "Asraya/Nala: all planets in dual signs",
                hindi: "आश्रय/नल: सभी ग्रह द्वि राशियों में",
            },
            effect: {
                english:
                    "NALA YOGA. One born with nala Yoga will have uneven physique (i.e. some limbs long and some short), will gather money, be skillful, be helpful to his relatives and be attractive in appearance.",
                hindi: "नाला योग। नाला योग के साथ पैदा हुआ व्यक्ति असमान शरीर वाला होगा (अर्थात् कुछ अंग लंबे और कुछ छोटे), धन इकट्ठा करने वाला, कुशल होगा, अपने रिश्तेदारों की मदद करने वाला और दिखने में आकर्षक होगा।",
            },
            rule:
                planets.Sun.rasi.nature === "Dual" &&
                planets.Moon.rasi.nature === "Dual" &&
                planets.Mars.rasi.nature === "Dual" &&
                planets.Mercury.rasi.nature === "Dual" &&
                planets.Jupiter.rasi.nature === "Dual" &&
                planets.Venus.rasi.nature === "Dual" &&
                planets.Saturn.rasi.nature === "Dual",
        },
        {
            description: {
                english:
                    "Akriti/Vajra: all benefics in Ascendant and 7, all malefics in 4 and 10",
                hindi: "आकृति/वज्र: लग्न और 7 में सभी शुभ ग्रह, 4 और 10 में सभी अशुभ ग्रह",
            },
            effect: {
                english:
                    "VAJRA YOGA. One born with Vajra Yoga will be happy at the beginning and end of his life, bold, beautiful, free from sickness, unfortunate and be inimical to his own people.",
                hindi: "वज्र योग। वज्र योग के साथ जन्म लेने वाला व्यक्ति अपने जीवन के आरंभ और अंत में सुखी, साहसी, सुंदर, रोग मुक्त, दुर्भाग्यशाली और अपने लोगों के प्रति शत्रुतापूर्ण होगा।",
            },
            rule:
                planets.Sun.house.num % 6 === 3 &&
                (isBenefic(planets.Moon) || planets.Moon.house.num % 6 === 0) &&
                (!isBenefic(planets.Moon) ||
                    planets.Moon.house.num % 6 === 3) &&
                planets.Mars.house.num % 6 === 3 &&
                (isBenefic(planets.Mercury) ||
                    planets.Mercury.house.num % 6 === 0) &&
                (!isBenefic(planets.Mercury) ||
                    planets.Mercury.house.num % 6 === 3) &&
                planets.Venus.house.num % 6 === 0 &&
                planets.Saturn.house.num % 6 === 3,
        },
        {
            description: {
                english:
                    "Akriti/Yava: all malefics in Ascendant and 7, all benefics in 4 and 10",
                hindi: "आकृति/यव: लग्न और 7 में सभी पाप ग्रह, 4 और 10 में सभी शुभ ग्रह",
            },
            effect: {
                english:
                    "YAVA YOGA One born with Yava Yoga will observe fasts and other religious rules, be intent on doing auspicious acts, be happy in the middle of life, be liberal and will have lasting wealth.",
                hindi: "यव योग - यव योग में जन्म लेने वाला व्यक्ति व्रत और अन्य धार्मिक नियमों का पालन करेगा, शुभ कार्य करने का इच्छुक होगा, जीवन के मध्य में प्रसन्न रहेगा, उदार होगा और उसके पास स्थायी धन होगा।",
            },
            rule:
                planets.Sun.house.num % 6 === 0 &&
                (isBenefic(planets.Moon) || planets.Moon.house.num % 6 === 3) &&
                (!isBenefic(planets.Moon) ||
                    planets.Moon.house.num % 6 === 0) &&
                planets.Mars.house.num % 6 === 0 &&
                (isBenefic(planets.Mercury) ||
                    planets.Mercury.house.num % 6 === 3) &&
                (!isBenefic(planets.Mercury) ||
                    planets.Mercury.house.num % 6 === 0) &&
                planets.Venus.house.num % 6 === 3 &&
                planets.Saturn.house.num % 6 === 0,
        },
        {
            description: {
                english:
                    "Dala/Sarpa: all angles exclusively occupied by malefics",
                hindi: "दला/सर्प: सभी कोण जो विशेष रूप से पाप ग्रहों द्वारा व्याप्त हैं",
            },
            effect: {
                english:
                    "SARPA YOGA. The native born under this Yoga will be crooked in disposition, pitiless, always be a subject of grief, poor and will live in others House and eat their food.",
                hindi: "सर्प योग। इस योग में जन्म लेने वाला जातक कुटिल स्वभाव वाला, निर्दयी, सदैव दुःखी रहने वाला, दरिद्र, दूसरों के घर में रहकर उनका अन्न खाने वाला होता है।",
            },
            rule:
                planets.Sun.house.categories.includes("Kendra") &&
                planets.Mars.house.categories.includes("Kendra") &&
                planets.Saturn.house.categories.includes("Kendra") &&
                (isBenefic(planets.Moon) ||
                    planets.Moon.house.categories.includes("Kendra")) &&
                (isBenefic(planets.Mercury) ||
                    planets.Mercury.house.categories.includes("Kendra")) &&
                countPlanetsInHouse(1) > 0 &&
                countPlanetsInHouse(4) > 0 &&
                countPlanetsInHouse(7) > 0,
        },
        {
            description: {
                english: "Sankhya/Gola: all planets in 1 sign",
                hindi: "सांख्य/गोल: सभी ग्रह एक राशि में",
            },
            effect: {
                english:
                    "GOLA YOGA. One born in this Yoga will be indigent, indolent, devoid of learning and honour, dirty and always grieved.",
                hindi: "गोला योग। इस योग में जन्म लेने वाला व्यक्ति दरिद्र, आलसी, विद्या और सम्मान से रहित, गंदा और हमेशा दुखी रहेगा।",
            },
            rule: numberOfOccupiedSigns === 1,
        },
        {
            description: {
                english: "Sankhya/Yuga: all planets in 2 signs",
                hindi: "सांख्य/युग: सभी ग्रह 2 राशियों में",
            },
            effect: {
                english:
                    "YUGA YOGA. One born with this Yoga will be a religious hypocrite, be bereft of wealth, forsaken by people and devoid of sons, honour and virtues.",
                hindi: "युग योग। इस योग में जन्म लेने वाला व्यक्ति धार्मिक पाखंडी, धनहीन, लोगों द्वारा त्यागा हुआ, पुत्र, सम्मान और गुणों से रहित होगा।",
            },
            rule: numberOfOccupiedSigns === 2,
        },
        {
            description: {
                english: "Sankhya/Sula: all planets in 3 signs",
                hindi: "सांख्य/शुला: सभी ग्रह 3 राशियों में",
            },
            effect: {
                english:
                    "SULA YOGA. The native with sula Yoga will be harsh, indolent, poor, torturous, become a prohibited person, bold, successful in war and fearful.",
                hindi: "सुला योग। सुला योग से पीड़ित जातक कठोर, आलसी, दरिद्र, अत्याचारी, निषिद्ध व्यक्ति, साहसी, युद्ध में सफल और भयभीत होता है।",
            },
            rule: numberOfOccupiedSigns === 3,
        },
        {
            description: {
                english: "Sankhya/Kedara: all planets in 4 signs",
                hindi: "सांख्य/केदार: सभी ग्रह 4 राशियों में",
            },
            effect: {
                english:
                    "KEDARA YOGA. One born under this Yoga will be useful to many, will have agricultural profession, be truthfully disposed, fickle minded and wealthy.",
                hindi: "केदार योग। इस योग में जन्म लेने वाला व्यक्ति अनेकों के लिए उपयोगी, कृषि व्यवसाय वाला, सत्यनिष्ठ, चंचल मन वाला और धनवान होगा।",
            },
            rule: numberOfOccupiedSigns === 4,
        },
        {
            description: {
                english: "Sankhya/Pasa: all planets in 5 signs",
                hindi: "सांख्य/पासा: सभी ग्रह 5 राशियों में",
            },
            effect: {
                english:
                    "PASA YOGA. One born with pasa Yoga will be bonded, be attached to work, worldly in disposition, will talk too much, will not have good qualities and will have many servants.",
                hindi: "पासा योग। पासा योग के साथ जन्म लेने वाला व्यक्ति बंधुआ, काम में आसक्त, सांसारिक स्वभाव वाला, बहुत अधिक बोलने वाला, अच्छे गुणों वाला नहीं तथा बहुत से नौकरों वाला होगा।",
            },
            rule: numberOfOccupiedSigns === 5,
        },
        {
            description: {
                english: "Sankhya/Damini: all planets in 6 signs",
                hindi: "सांख्य/दामिनी: सभी ग्रह 6 राशियों में",
            },
            effect: {
                english:
                    "DAMINI YOGA. One born with this Yoga will be helpful, will have cattle, be Lord of money, be foolish, will have many sons and jewels, be bold and learned.",
                hindi: "दामिनी योग। इस योग में जन्म लेने वाला व्यक्ति सहायक, पशु वाला, धन का स्वामी, मूर्ख, अनेक पुत्रों और रत्नों वाला, साहसी और विद्वान होता है।",
            },
            rule: numberOfOccupiedSigns === 6,
        },
        {
            description: {
                english: "Sankhya/Veena: all planets in 7 signs",
                hindi: "सांख्य/वीणा: सभी ग्रह 7 राशियों में",
            },
            effect: {
                english:
                    "VEENA YOGA. One born with this combination will have friends, be eloquent, interested in Sastras, musical instruments and singing. He will be happy, will have many servants and be famous.",
                hindi: "वीणा योग। इस योग में जन्म लेने वाला व्यक्ति मित्रवान, वाक्पटु, शास्त्रों, वाद्यों और गायन में रुचि रखने वाला होता है। वह सुखी, अनेक सेवकों वाला और प्रसिद्ध होता है।",
            },
            rule: numberOfOccupiedSigns === 7,
        },
        {
            description: {
                english:
                    "Akriti/Yupa: All planets in 4 continuous houses from the Ascendant",
                hindi: "आकृति/यूप: लग्न से लगातार 4 घरों में सभी ग्रह",
            },
            effect: {
                english:
                    "YUPA YOGA. The native with this Yoga will have self-protection, be charitable, be endowed with riches and happiness and will observe religious fastings and vows. He will be a distinguished person.",
                hindi: "यूप योग। इस योग से युक्त जातक आत्मरक्षा करने वाला, दानशील, धन-धान्य से संपन्न, धार्मिक व्रतों और व्रतों का पालन करने वाला होता है। वह प्रतिष्ठित व्यक्ति होता है।",
            },
            rule:
                countPlanetsInHouse(1) !== 0 &&
                countPlanetsInHouse(2) !== 0 &&
                countPlanetsInHouse(3) !== 0 &&
                countPlanetsInHouse(4) !== 0 &&
                countPlanetsInHouse(1) +
                    countPlanetsInHouse(2) +
                    countPlanetsInHouse(3) +
                    countPlanetsInHouse(4) ===
                    7,
        },
        {
            description: {
                english:
                    "Akriti/Sara: All planets in 4 continuous houses from the 4th",
                hindi: "आकृति/सार: चौथे भाव से लगातार चार घरों में सभी ग्रह",
            },
            effect: {
                english:
                    "SARA YOGA. The native with sara Yoga will manufacture arrows (arms etc. in modern context), will catch hold of thieves (for example, be a police officer), will live in forests to hunt animals, will be equal to a mad person, will torture and be fond of mean handiworks.",
                hindi: "सार योग। सार योग वाला जातक तीर (आधुनिक संदर्भ में शस्त्र आदि) बनाएगा, चोरों को पकड़ेगा (उदाहरण के लिए, पुलिस अधिकारी होगा), जानवरों का शिकार करने के लिए जंगलों में रहेगा, पागल व्यक्ति के समान होगा, अत्याचार करेगा और नीच हस्तकलाओं का शौकीन होगा।",
            },
            rule:
                countPlanetsInHouse(4) !== 0 &&
                countPlanetsInHouse(5) !== 0 &&
                countPlanetsInHouse(6) !== 0 &&
                countPlanetsInHouse(7) !== 0 &&
                countPlanetsInHouse(4) +
                    countPlanetsInHouse(5) +
                    countPlanetsInHouse(6) +
                    countPlanetsInHouse(7) ===
                    7,
        },
        {
            description: {
                english:
                    "Akriti/Nauka: Seven planets in seven houses from Ascendant",
                hindi: "आकृति/नौका: लग्न से सात घरों में सात ग्रह",
            },
            effect: {
                english:
                    "NAU YOGA. The natives livelihood will be through water; he will have many gains, will be very famous, be pleased, mean, strong and stingy. This and other Yogas are effective at all times independant of Dasas.",
                hindi: "नव योग। जातक की आजीविका जलमार्ग से होगी; उसे अनेक लाभ होंगे, वह बहुत प्रसिद्ध होगा, सुखी होगा, मितव्ययी होगा, बलवान होगा और कंजूस होगा। यह और अन्य योग दशाओं से स्वतंत्र होकर हर समय प्रभावी रहते हैं।",
            },
            rule:
                countPlanetsInHouse(1) === 1 &&
                countPlanetsInHouse(2) === 1 &&
                countPlanetsInHouse(3) === 1 &&
                countPlanetsInHouse(4) === 1 &&
                countPlanetsInHouse(5) === 1 &&
                countPlanetsInHouse(6) === 1 &&
                countPlanetsInHouse(7) === 1,
        },
        {
            description: {
                english: "Akriti/Gada: all planets occupy 2 successive angles",
                hindi: "आकृति/गदा: सभी ग्रह दो क्रमागत कोणों पर होते हैं",
            },
            effect: {
                english:
                    "GADA YOGA. One born with this Yoga, will always care for honour and money, will perform yagnas etc., will be expert in Sastras and music and will be endowed with money, gold, jewels and wealth.",
                hindi: "गदा योग। इस योग में जन्म लेने वाला व्यक्ति सदैव मान-सम्मान और धन की चिंता करेगा, यज्ञ आदि करेगा, शास्त्रों और संगीत में निपुण होगा तथा धन, स्वर्ण, रत्न और संपत्ति से संपन्न होगा।",
            },
            rule:
                countPlanetsInHouse(1) + countPlanetsInHouse(4) === 7 ||
                countPlanetsInHouse(4) + countPlanetsInHouse(7) === 7 ||
                countPlanetsInHouse(7) + countPlanetsInHouse(10) === 7 ||
                countPlanetsInHouse(10) + countPlanetsInHouse(1) === 7,
        },
        {
            description: {
                english:
                    "Akriti/Sakti: All planets in 4 continuous houses from the 7th",
                hindi: "आकृति/शक्ति: 7वें भाव से लगातार 4 भावों में सभी ग्रह",
            },
            effect: {
                english:
                    "SAKTI YOGA. One born with this Yoga will be devoid of wealth, deformed, subjected to grief, mean, lazy, short-lived, expert in war and be beautiful.",
                hindi: "शक्ति योग। इस योग से युक्त जातक धनहीन, विकृत, दुःखी, क्षुद्र, आलसी, अल्पायु, युद्ध में निपुण और सुन्दर होता है।",
            },
            rule:
                countPlanetsInHouse(7) !== 0 &&
                countPlanetsInHouse(8) !== 0 &&
                countPlanetsInHouse(9) !== 0 &&
                countPlanetsInHouse(10) !== 0 &&
                countPlanetsInHouse(7) +
                    countPlanetsInHouse(8) +
                    countPlanetsInHouse(9) +
                    countPlanetsInHouse(10) ===
                    7,
        },
        {
            description: {
                english:
                    "Akriti/Koota: Seven planets in seven houses from the 4th",
                hindi: "आकृति/कूट: चतुर्थ भाव से सात घरों में सात ग्रह",
            },
            effect: {
                english:
                    "KOOTA YOGA. The native with Koota Yoga will be a liar, be crafty, be a jailer, be poor, wicked, cruel and will always live in hills and fortresses.",
                hindi: "कूट योग। कूट योग वाला जातक झूठा, धूर्त, जेलर, गरीब, दुष्ट, क्रूर होगा और हमेशा पहाड़ियों और किलों में रहेगा।",
            },
            rule:
                countPlanetsInHouse(4) === 1 &&
                countPlanetsInHouse(5) === 1 &&
                countPlanetsInHouse(6) === 1 &&
                countPlanetsInHouse(7) === 1 &&
                countPlanetsInHouse(8) === 1 &&
                countPlanetsInHouse(9) === 1 &&
                countPlanetsInHouse(10) === 1,
        },
        {
            description: {
                english:
                    "Akriti/Chapa: Seven planets in seven houses from the 10th",
                hindi: "आकृति/चपा: दसवें भाव से सात घरों में सात ग्रह",
            },
            effect: {
                english:
                    "CHAPA YOGA. (KARMUKA YOGA). The native with Chapa Yoga will be a liar, jailer, thief and will live in forests. He will not have wealth in the middle of his life.",
                hindi: "चाप योग (कर्मुका योग)। चाप योग वाला जातक झूठा, जेलर, चोर और जंगलों में रहने वाला होता है। जीवन के मध्यकाल में उसके पास धन नहीं होता।",
            },
            rule:
                countPlanetsInHouse(10) === 1 &&
                countPlanetsInHouse(11) === 1 &&
                countPlanetsInHouse(12) === 1 &&
                countPlanetsInHouse(1) === 1 &&
                countPlanetsInHouse(2) === 1 &&
                countPlanetsInHouse(3) === 1 &&
                countPlanetsInHouse(4) === 1,
        },
        {
            description: {
                english:
                    "Akriti/Danda: All planets in 4 continuous houses from the 10th",
                hindi: "आकृति/दंड: 10वें भाव से लगातार 4 भावों में सभी ग्रह",
            },
            effect: {
                english:
                    "DANDA YOGA. The native with this Yoga will lose his wife and sons, will be poor, discarded by all people, be out of the men of his circle, be grieved, mean and will be servant.",
                hindi: "दण्ड योग। इस योग से युक्त जातक अपनी पत्नी और पुत्रों को खो देगा, दरिद्र होगा, सभी लोगों द्वारा त्याग दिया जाएगा, अपने मण्डल के लोगों से अलग हो जाएगा, दुःखी, नीच और सेवक होगा।",
            },
            rule:
                countPlanetsInHouse(10) !== 0 &&
                countPlanetsInHouse(11) !== 0 &&
                countPlanetsInHouse(12) !== 0 &&
                countPlanetsInHouse(1) !== 0 &&
                countPlanetsInHouse(10) +
                    countPlanetsInHouse(11) +
                    countPlanetsInHouse(12) +
                    countPlanetsInHouse(1) ===
                    7,
        },
        {
            description: {
                english:
                    "Akriti/Chatra: Seven planets in seven houses from the 7th",
                hindi: "आकृति/चत्र: सातवें भाव से सात घरों में सात ग्रह",
            },
            effect: {
                english:
                    "CHATRA YOGA. The native with Chatra Yoga will help his own men, be kind, liberal, dear to king, very intelligent and will enjoy happiness in boyhood and at the end.",
                hindi: "छत्र योग। छत्र योग वाला जातक अपने लोगों की सहायता करने वाला, दयालु, उदार, राजा का प्रिय, बहुत बुद्धिमान होगा तथा बचपन और अंत में सुख का आनंद लेगा।",
            },
            rule:
                countPlanetsInHouse(7) === 1 &&
                countPlanetsInHouse(8) === 1 &&
                countPlanetsInHouse(9) === 1 &&
                countPlanetsInHouse(10) === 1 &&
                countPlanetsInHouse(11) === 1 &&
                countPlanetsInHouse(12) === 1 &&
                countPlanetsInHouse(1) === 1,
        },
        {
            description: {
                english:
                    "Akriti/Ardha Moon: planets occupying seven continuous houses, not starting from an angle",
                hindi: "आकृति/अर्ध चन्द्रमा: सात लगातार घरों में स्थित ग्रह, एक कोण से शुरू नहीं होते",
            },
            effect: {
                english:
                    "ARDHA CHANDRA YOGA. One born with Ardha Moon Yoga will be fortunate, be an Army chief, be brilliant bodied, dear to king and strong. He will possess gems, gold and ornaments.",
                hindi: "अर्ध चंद्र योग। अर्ध चंद्र योग में जन्म लेने वाला व्यक्ति भाग्यशाली, सेनापति, तेजस्वी शरीर वाला, राजा का प्रिय और बलवान होता है। उसके पास रत्न, स्वर्ण और आभूषण होते हैं।",
            },
            rule:
                (countPlanetsInHouse(2) === 1 &&
                    countPlanetsInHouse(3) === 1 &&
                    countPlanetsInHouse(4) === 1 &&
                    countPlanetsInHouse(5) === 1 &&
                    countPlanetsInHouse(6) === 1 &&
                    countPlanetsInHouse(7) === 1 &&
                    countPlanetsInHouse(8) === 1) ||
                (countPlanetsInHouse(3) === 1 &&
                    countPlanetsInHouse(4) === 1 &&
                    countPlanetsInHouse(5) === 1 &&
                    countPlanetsInHouse(6) === 1 &&
                    countPlanetsInHouse(7) === 1 &&
                    countPlanetsInHouse(8) === 1 &&
                    countPlanetsInHouse(9) === 1) ||
                (countPlanetsInHouse(5) === 1 &&
                    countPlanetsInHouse(6) === 1 &&
                    countPlanetsInHouse(7) === 1 &&
                    countPlanetsInHouse(8) === 1 &&
                    countPlanetsInHouse(9) === 1 &&
                    countPlanetsInHouse(10) === 1 &&
                    countPlanetsInHouse(11) === 1) ||
                (countPlanetsInHouse(6) === 1 &&
                    countPlanetsInHouse(7) === 1 &&
                    countPlanetsInHouse(8) === 1 &&
                    countPlanetsInHouse(9) === 1 &&
                    countPlanetsInHouse(10) === 1 &&
                    countPlanetsInHouse(11) === 1 &&
                    countPlanetsInHouse(12) === 1) ||
                (countPlanetsInHouse(8) === 1 &&
                    countPlanetsInHouse(9) === 1 &&
                    countPlanetsInHouse(10) === 1 &&
                    countPlanetsInHouse(11) === 1 &&
                    countPlanetsInHouse(12) === 1 &&
                    countPlanetsInHouse(1) === 1 &&
                    countPlanetsInHouse(2) === 1) ||
                (countPlanetsInHouse(9) === 1 &&
                    countPlanetsInHouse(10) === 1 &&
                    countPlanetsInHouse(11) === 1 &&
                    countPlanetsInHouse(12) === 1 &&
                    countPlanetsInHouse(1) === 1 &&
                    countPlanetsInHouse(2) === 1 &&
                    countPlanetsInHouse(3) === 1) ||
                (countPlanetsInHouse(11) === 1 &&
                    countPlanetsInHouse(12) === 1 &&
                    countPlanetsInHouse(1) === 1 &&
                    countPlanetsInHouse(2) === 1 &&
                    countPlanetsInHouse(3) === 1 &&
                    countPlanetsInHouse(4) === 1 &&
                    countPlanetsInHouse(5) === 1) ||
                (countPlanetsInHouse(12) === 1 &&
                    countPlanetsInHouse(1) === 1 &&
                    countPlanetsInHouse(2) === 1 &&
                    countPlanetsInHouse(3) === 1 &&
                    countPlanetsInHouse(4) === 1 &&
                    countPlanetsInHouse(5) === 1 &&
                    countPlanetsInHouse(6) === 1),
        },
        {
            description: {
                english:
                    "Akriti/Chakra: all planets in 6 alternative signs from the ascendant",
                hindi: "आकृति/चक्र: लग्न से 6 वैकल्पिक राशियों में सभी ग्रह",
            },
            effect: {
                english:
                    "CHAKRA YOGA. One born in this Yoga will be a king at whose feet will be the heads of the other prostrating kings adoring diamond-studded crowns. (That is, the subordinate kings, wearing diamond-studded crowns will honour a Chakra Yoga native, who will be the chief of such kings)",
                hindi: "चक्र योग। इस योग में जन्म लेने वाला राजा होगा जिसके चरणों में अन्य राजाओं के सिर हीरे जड़ित मुकुट धारण किए हुए होंगे। (अर्थात, अधीनस्थ राजा हीरे जड़ित मुकुट धारण करके चक्र योग वाले जातक का सम्मान करेंगे, जो ऐसे राजाओं का मुखिया होगा।)",
            },
            rule:
                countPlanetsInHouse(1) >= 1 &&
                countPlanetsInHouse(3) >= 1 &&
                countPlanetsInHouse(5) >= 1 &&
                countPlanetsInHouse(7) >= 1 &&
                countPlanetsInHouse(9) >= 1 &&
                countPlanetsInHouse(11) >= 1 &&
                countPlanetsInHouse(2) === 0 &&
                countPlanetsInHouse(4) === 0 &&
                countPlanetsInHouse(6) === 0 &&
                countPlanetsInHouse(8) === 0 &&
                countPlanetsInHouse(10) === 0 &&
                countPlanetsInHouse(12) === 0,
        },
        {
            description: {
                english:
                    "Akriti/Samudra: all planets in 6 alternative signs from the 2th",
                hindi: "आकृति/समुद्र: 2वें भाव से 6 वैकल्पिक राशियों में सभी ग्रह",
            },
            effect: {
                english:
                    "SAMUDRA YOGA. Should a person be born under this Yoga, he will have abundant wealth and precious stones, will be a king, be endowed with pleasures, be dear to people, will have steady mind and be truthful in disposition (\\u201cSattvavanta\\u201d).",
                hindi: "समुद्र योग। यदि कोई व्यक्ति इस योग में जन्म लेता है, तो उसके पास प्रचुर धन और रत्न होंगे, वह राजा होगा, सुखों से संपन्न होगा, लोगों का प्रिय होगा, स्थिर मन वाला होगा और स्वभाव से सत्यवादी (\\u201cसत्त्ववंत\\u201d) होगा।",
            },
            rule:
                countPlanetsInHouse(2) >= 1 &&
                countPlanetsInHouse(4) >= 1 &&
                countPlanetsInHouse(6) >= 1 &&
                countPlanetsInHouse(8) >= 1 &&
                countPlanetsInHouse(10) >= 1 &&
                countPlanetsInHouse(12) >= 1 &&
                countPlanetsInHouse(1) === 0 &&
                countPlanetsInHouse(3) === 0 &&
                countPlanetsInHouse(5) === 0 &&
                countPlanetsInHouse(7) === 0 &&
                countPlanetsInHouse(9) === 0 &&
                countPlanetsInHouse(11) === 0,
        },
    ];

    return effectTable.filter(entry => entry.rule); // keep only where rule is true
}
