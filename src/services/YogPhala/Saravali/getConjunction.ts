import type {
    NavagrahaEn,
    Planet,
    PlanetEn,
} from "src/services/constants/Planet";
import type { Phala } from "src/services/YogPhala";
/**
 * Returns conjunction-based effects from predefined conjunction data.
 *
 * A conjunction is identified when all planets in the rule array occupy the
 * same rasi (zodiac sign number).
 *
 * @param planets - All planetary data keyed by English planet name.
 * @returns An array of phala objects with descriptions and effects.
 */
export function getSaravaliConjunctionYogPhala(
    planets: Record<PlanetEn, Planet>
): Phala[] {
    const results: Phala[] = [];

    for (const conjunction of conjunctionData) {
        const { conjunctionPlanets, english, hindi } = conjunction;

        // Get all rasi numbers for the planets in the rule
        const rasiNumbers = conjunctionPlanets.map(
            planetName => planets[planetName].rasi.rasi_num
        );

        // Check if all planets share the same rasi number
        const isConjunction = rasiNumbers.every(num => num === rasiNumbers[0]);

        if (isConjunction) {
            results.push({
                description: {
                    english: `Conjunction of ${conjunctionPlanets.join(", ")} in ${planets[conjunctionPlanets[0]].house.name.english} house`,
                    hindi: `${conjunctionPlanets
                        .map(p => planets[p].name.hindi)
                        .join(
                            ", "
                        )} की युति ${planets[conjunctionPlanets[0]].house.name.english} भाव में`,
                },
                effect: {
                    english,
                    hindi,
                },
            });
        }
    }

    return results;
}

// Conjunction reference data
const conjunctionData: {
    english: string;
    hindi: string;
    conjunctionPlanets: NavagrahaEn[];
}[] = [
    {
        english:
            "One, who has the Sun and Moon together will be at the disposal of his wife (or females), immodest, be a metallurgist (can be interpreted also, as \\u201cable to deceive\\u201d), will be quite wealthy and be an expert in sale of intoxicants.",
        hindi: "जिसके पास सूर्य और चंद्रमा एक साथ हों, वह अपनी पत्नी (या महिलाओं) के अधीन रहने वाला, निर्लज्ज, धातुकर्मी (जिसे 'धोखा देने में सक्षम' भी समझा जा सकता है), काफी धनवान होगा और मादक पदार्थों की बिक्री में विशेषज्ञ होगा।",
        conjunctionPlanets: ["Sun", "Moon"],
    },
    {
        english:
            "Should the Sun, the Moon and Mars be together at birth, the native will be bereft of shame, be sinful, will have knowledge of machinery, will destroy enemies, be brave and will be expert in any kind of work.",
        hindi: "यदि जन्म के समय सूर्य, चन्द्रमा और मंगल एक साथ हों तो जातक लज्जाहीन, पापी, मशीनरी का ज्ञान रखने वाला, शत्रुओं का नाश करने वाला, साहसी और किसी भी कार्य में निपुण होगा।",
        conjunctionPlanets: ["Sun", "Moon", "Mars"],
    },
    {
        english:
            "Should these four planets be together at birth. the native will be a writer, a thief and be scurrilous in speech. He will be sickly, cunning and be capable of deceiving others.",
        hindi: "यदि जन्म के समय ये चारों ग्रह एक साथ हों, तो जातक लेखक, चोर, वाणी में कटुभाषी, रोगी, धूर्त और दूसरों को धोखा देने वाला होगा।",
        conjunctionPlanets: ["Sun", "Moon", "Mars", "Mercury"],
    },
    {
        english:
            "One, who has these four planets in one House at birth, will be wealthy, dear to women, splendourous, will maintain decorum, be free from grief and expert in work.",
        hindi: "जिसके जन्म के समय ये चारों ग्रह एक ही भाव में हों, वह धनवान, स्त्रियों का प्रिय, वैभवशाली, मर्यादा में रहने वाला, शोक से रहित और कार्य में निपुण होता है।",
        conjunctionPlanets: ["Sun", "Moon", "Mars", "Jupiter"],
    },
    {
        english:
            "If these four planets join at birth, one will speak and conduct himself, as a great person, be happy, expert, intent on gathering money and will have learning, sons and wife.",
        hindi: "यदि जन्म के समय ये चारों ग्रह एक साथ हों तो व्यक्ति महान व्यक्ति की तरह बोलने और आचरण करने वाला, सुखी, विशेषज्ञ, धन संचय करने वाला, विद्या, पुत्र और पत्नी वाला होता है।",
        conjunctionPlanets: ["Sun", "Moon", "Mars", "Venus"],
    },
    {
        english:
            "One, who has these four planets together at birth, will have uneven physique, be short in stature, be unwealthy and will collect food by begging and be a proven dunce.",
        hindi: "जिसके जन्म के समय ये चारों ग्रह एक साथ हों, उसका शरीर असमान होगा, कद छोटा होगा, धनहीन होगा, भिक्षा मांगकर भोजन जुटाएगा तथा वह सिद्ध मूर्ख होगा।",
        conjunctionPlanets: ["Sun", "Moon", "Mars", "Saturn"],
    },
    {
        english:
            "If the Sun, Moon and Mercury are together, the native will be splendourous, very intelligent, will be fond of arts, assembly and drinks, be in royal service and bold.",
        hindi: "यदि सूर्य, चन्द्रमा और बुध एक साथ हों तो जातक तेजस्वी, बहुत बुद्धिमान, कला, सभा और मदिरा का शौकीन, राजसी सेवा में रहने वाला और साहसी होगा।",
        conjunctionPlanets: ["Sun", "Moon", "Mercury"],
    },
    {
        english:
            "If these four planets are in one House, the native will be a goldsmith (or a gold dealer etc.), be long eyed, be a sculptor, be very wealthy, bold and beautiful bodied.",
        hindi: "यदि ये चारों ग्रह एक ही भाव में हों तो जातक सुनार (या स्वर्ण व्यापारी आदि) होगा, लंबी आंखों वाला, मूर्तिकार, बहुत धनवान, साहसी और सुंदर शरीर वाला होगा।",
        conjunctionPlanets: ["Sun", "Moon", "Mercury", "Jupiter"],
    },
    {
        english:
            "The native, who has these four planets together at birth, will be deformed, lucky, short-statured and dear to king.",
        hindi: "जिस जातक के जन्म के समय ये चारों ग्रह एक साथ हों, वह विकृत शरीर वाला, भाग्यशाली, छोटे कद का और राजा का प्रिय होता है।",
        conjunctionPlanets: ["Sun", "Moon", "Mercury", "Venus"],
    },
    {
        english:
            "If these four planets are together at birth, the native will lose his parents in childhood, be devoid of money and happiness, be wandering, will earn food by begging and will be a liar.",
        hindi: "यदि जन्म के समय ये चारों ग्रह एक साथ हों तो जातक बचपन में ही अपने माता-पिता को खो देगा, धन और सुख से रहित होगा, भ्रमणशील होगा, भिक्षा मांगकर भोजन करेगा और झूठा होगा।",
        conjunctionPlanets: ["Sun", "Moon", "Mercury", "Saturn"],
    },
    {
        english:
            "Should the Sun, Moon and Jupiter be in one House; the native will be given to anger, be cunning, expert in service, intent on going to foreign places, be intelligent and fickle minded.",
        hindi: "यदि सूर्य, चन्द्रमा और बृहस्पति एक ही भाव में हों तो जातक क्रोधी, चालाक, सेवा में निपुण, विदेश जाने का इच्छुक, बुद्धिमान और चंचल स्वभाव का होता है।",
        conjunctionPlanets: ["Sun", "Moon", "Jupiter"],
    },
    {
        english:
            "Should these planets be in one House at birth, the subject concerned will be head of water, animals and forests (i.e. his livelihood may be through such sources), will be happy, honoured by the king and be an expert.",
        hindi: "यदि जन्म के समय ये ग्रह एक ही भाव में हों, तो संबंधित व्यक्ति जल, पशु और वन का स्वामी होगा (अर्थात् उसकी आजीविका इन स्रोतों से हो सकती है), सुखी होगा, राजा द्वारा सम्मानित होगा और विशेषज्ञ होगा।",
        conjunctionPlanets: ["Sun", "Moon", "Jupiter", "Venus"],
    },
    {
        english:
            "If the said planets join at birth, the native will be dark-eyed, fierce, will have many sons, be wealthy and fortunate through women.",
        hindi: "यदि जन्म के समय उक्त ग्रह एक साथ हों तो जातक श्याम वर्ण, उग्र स्वभाव वाला, अनेक पुत्रों वाला, धनवान तथा स्त्रियों के माध्यम से सौभाग्यशाली होगा।",
        conjunctionPlanets: ["Sun", "Moon", "Jupiter", "Saturn"],
    },
    {
        english:
            "Should the Sun, Moon and Venus be in one House at birth, the native will steal others money, will be a debaucher and be expert in Shastras.",
        hindi: "यदि जन्म के समय सूर्य, चन्द्रमा और शुक्र एक ही भाव में हों तो जातक दूसरों का धन चुराने वाला, व्यभिचारी और शास्त्रों में निपुण होगा।",
        conjunctionPlanets: ["Sun", "Moon", "Venus"],
    },
    {
        english:
            "Should one have a combination of these planets in one House at birth, the native will have habits, like a female, be very weak, desirous of coming up and timid at all times.",
        hindi: "यदि किसी व्यक्ति के जन्म के समय इन ग्रहों की युति एक ही भाव में हो, तो जातक की आदतें स्त्रियों जैसी होंगी, वह बहुत कमजोर होगा, आगे बढ़ने का इच्छुक होगा तथा हर समय डरपोक रहेगा।",
        conjunctionPlanets: ["Sun", "Moon", "Venus", "Saturn"],
    },
    {
        english:
            "If the Sun, Moon and Saturn be together in one House, the native will be lustful, be expert in arguments, be a dunce, be at the disposal of others and be poor.",
        hindi: "यदि सूर्य, चन्द्रमा और शनि एक ही भाव में हों तो जातक कामुक, तर्क-वितर्क में निपुण, मूर्ख, दूसरों पर आश्रित और दरिद्र होगा।",
        conjunctionPlanets: ["Sun", "Moon", "Saturn"],
    },
    {
        english:
            "Should the Sun and Mars be in one House the native will be splendourous, valorous, dull witted, strong, be a liar, be sinful, disposed to kill (or torture) and be fierce.",
        hindi: "यदि सूर्य और मंगल एक ही भाव में हों तो जातक तेजस्वी, वीर, मंदबुद्धि, बलवान, झूठा, पापी, हत्या (या अत्याचार) करने वाला और क्रूर होगा।",
        conjunctionPlanets: ["Sun", "Mars"],
    },
    {
        english:
            "If the Sun, Mars and Mercury are in one House at birth, the native will be famous, hard-hearted, shameless and be devoid of wealth, sons and wife.",
        hindi: "यदि जन्म के समय सूर्य, मंगल और बुध एक ही भाव में हों तो जातक प्रसिद्ध, कठोर हृदय वाला, निर्लज्ज, धन, पुत्र और पत्नी से रहित होगा।",
        conjunctionPlanets: ["Sun", "Mars", "Mercury"],
    },
    {
        english:
            "These four planets together at birth indicate, that the subject will be brave, be a composer of Shastras, or a ruler of province, will lose his wife and money, be undesirable and will wander.",
        hindi: "जन्म के समय इन चारों ग्रहों का एक साथ होना यह दर्शाता है कि जातक साहसी होगा, शास्त्रों का रचयिता होगा, या प्रान्त का शासक होगा, अपनी पत्नी और धन को खो देगा, अवांछनीय होगा और भटकेगा।",
        conjunctionPlanets: ["Sun", "Mars", "Mercury", "Jupiter"],
    },
    {
        english:
            "If these four planets be together at birth, the native will be addicted to other women, be a thief, will have uneven limbs, will be a bad person and will be bereft of energy.",
        hindi: "यदि जन्म के समय ये चारों ग्रह एक साथ हों तो जातक पराई स्त्रियों में आसक्त, चोर, असमान अंगों वाला, दुष्ट व्यक्ति तथा ऊर्जाहीन होगा।",
        conjunctionPlanets: ["Sun", "Mars", "Mercury", "Venus"],
    },
    {
        english:
            "If these four planets are together at birth, the subject will be a warrior, scholar, be fierce, will be meanly disposed, be chief among poets and be a minister, or a king.",
        hindi: "यदि जन्म के समय ये चारों ग्रह एक साथ हों तो जातक योद्धा, विद्वान, उग्र, नीच स्वभाव वाला, कवियों में प्रमुख, मंत्री या राजा होता है।",
        conjunctionPlanets: ["Sun", "Mars", "Mercury", "Saturn"],
    },
    {
        english:
            "Should Mars, Jupiter and the Sun be together at birth, the native will be an expert speaker, very wealthy, either a kings minister, or even a king himself, be truthful and fierce.",
        hindi: "यदि जन्म के समय मंगल, बृहस्पति और सूर्य एक साथ हों तो जातक कुशल वक्ता, बहुत धनवान, राजा का मंत्री या स्वयं राजा, सत्यवादी और प्रखर होगा।",
        conjunctionPlanets: ["Sun", "Mars", "Jupiter"],
    },
    {
        english:
            "With the conjunction of these four planets, one will be fortunate, worth worship by the people, be wealthy, dear to king and famous.",
        hindi: "इन चार ग्रहों की युति से व्यक्ति भाग्यशाली, लोगों द्वारा पूजित, धनवान, राजा का प्रिय और प्रसिद्ध होता है।",
        conjunctionPlanets: ["Sun", "Mars", "Jupiter", "Venus"],
    },
    {
        english:
            "Should these join at birth, one will be rash, prime among his group, will have cherished desires, will be endowed with relatives and friends and dear to king.",
        hindi: "यदि ये जन्म से ही एक साथ हों, तो व्यक्ति शीघ्रगामी, अपने समूह में श्रेष्ठ, अभिलाषाओं वाला, बंधु-बांधवों से संपन्न तथा राजा का प्रिय होगा।",
        conjunctionPlanets: ["Sun", "Mars", "Jupiter", "Saturn"],
    },
    {
        english:
            "One, who has Venus, Mars and the Sun in one House, will be subjected to eye diseases, belongs to a good race, will be fortunate, harsh and wealthy.",
        hindi: "जिस व्यक्ति की कुण्डली में शुक्र, मंगल और सूर्य एक ही भाव में हों, वह नेत्र रोग से ग्रस्त, उत्तम कुल का, भाग्यशाली, कठोर और धनवान होता है।",
        conjunctionPlanets: ["Sun", "Mars", "Venus"],
    },
    {
        english:
            "One, who has these four planets together at birth, will be deformed, mean in conduct, oblique-sighted, will hate his relatives and will always be insulted.",
        hindi: "जिसके जन्म के समय ये चारों ग्रह एक साथ हों, वह विकृत, नीच आचरण वाला, तिरछी दृष्टि वाला, अपने संबंधियों से द्वेष रखने वाला तथा सदैव अपमानित होने वाला होता है।",
        conjunctionPlanets: ["Sun", "Mars", "Venus", "Saturn"],
    },
    {
        english:
            "Should Mars, Saturn and the Sun be together, the native will have deformed limbs, be without wealth, always sick, without his people and be a big fool.",
        hindi: "यदि मंगल, शनि और सूर्य एक साथ हों तो जातक विकृत अंगों वाला, धनहीन, सदैव बीमार, जनहीन और महामूर्ख होता है।",
        conjunctionPlanets: ["Sun", "Mars", "Saturn"],
    },
    {
        english:
            "If the Sun and Mercury are in one House, the native will be in service, will have unsteady wealth, be sweet in speech, will have fame and money, be noble, dear to king and good people and will possess strength, beauty and learning.",
        hindi: "यदि सूर्य और बुध एक ही भाव में हों तो जातक नौकरीपेशा, अस्थिर धन वाला, मधुर वाणी वाला, यश और धन वाला, कुलीन, राजा और अच्छे लोगों का प्रिय, बल, सौंदर्य और विद्या से युक्त होगा।",
        conjunctionPlanets: ["Sun", "Mercury"],
    },
    {
        english:
            "If Jupiter, Mercury and the Sun be together at birth, the native will be subjected to eye-diseases, be very wealthy, be interested in Shastras, fables, poetry, meetings and stonework and will become a good writer.",
        hindi: "यदि जन्म के समय बृहस्पति, बुध और सूर्य एक साथ हों तो जातक नेत्र रोग से ग्रस्त होगा, बहुत धनवान होगा, शास्त्रों, दंतकथाओं, कविता, सभा और पत्थर के काम में रुचि रखेगा और एक अच्छा लेखक बनेगा।",
        conjunctionPlanets: ["Sun", "Mercury", "Jupiter"],
    },
    {
        english:
            "With these planets in one House, one will be wealthy, happy, chief, will have cherished desires, will have relatives and be noble.",
        hindi: "इन ग्रहों के एक भाव में होने पर व्यक्ति धनवान, सुखी, प्रमुख, अभिलाषा रखने वाला, सगे-संबंधी तथा कुलीन होगा।",
        conjunctionPlanets: ["Sun", "Mercury", "Jupiter", "Venus"],
    },
    {
        english:
            "One, who has these four planets together at birth, will have a neuters habits, be prestigious, fond of quarrels, will have brothers, or sisters and be not enthusiastic.",
        hindi: "जिसके जन्म के समय ये चारों ग्रह एक साथ हों, वह नपुंसक स्वभाव वाला, प्रतिष्ठित, झगड़ालू, भाई-बहन वाला तथा उत्साही नहीं होगा।",
        conjunctionPlanets: ["Sun", "Mercury", "Jupiter", "Saturn"],
    },
    {
        english:
            "If Mercury, Sun and Venus be together, the native will be insatiable, talkative, intent on wandering and subjected to grief on account of women.",
        hindi: "यदि बुध, सूर्य और शुक्र एक साथ हों तो जातक अतृप्त, बातूनी, भ्रमणशील और स्त्री के कारण दुःखी होगा।",
        conjunctionPlanets: ["Sun", "Mercury", "Venus"],
    },
    {
        english:
            "Should these four planets be in conjunction at birth, one will be scurrilous in speech, fortunate, learned, soft spoken, happy, energetic, pure, wealthy, bold and helpful to friends.",
        hindi: "यदि जन्म के समय ये चारों ग्रह एक साथ हों तो व्यक्ति कर्कश वाणी वाला, भाग्यशाली, विद्वान, मृदुभाषी, प्रसन्न, ऊर्जावान, पवित्र, धनवान, साहसी और मित्रों की सहायता करने वाला होता है।",
        conjunctionPlanets: ["Sun", "Mercury", "Venus", "Saturn"],
    },
    {
        english:
            "One, who has Saturn, the Sun and Mercury in one House will be a neuter, will hate others and will be given up by his relatives.",
        hindi: "जिस व्यक्ति की कुण्डली में शनि, सूर्य और बुध एक ही भाव में हों, वह नपुंसक होगा, दूसरों से घृणा करेगा और उसके रिश्तेदार उसे त्याग देंगे।",
        conjunctionPlanets: ["Sun", "Mercury", "Saturn"],
    },
    {
        english:
            "If the Sun and Jupiter be together, one will be virtuous, be a minister of king, will gain through friends, be with good mind and be a preceptor.",
        hindi: "यदि सूर्य और बृहस्पति एक साथ हों तो जातक गुणवान, राजा का मंत्री, मित्रों से लाभ पाने वाला, उत्तम बुद्धि वाला और गुरु होता है।",
        conjunctionPlanets: ["Sun", "Jupiter"],
    },
    {
        english:
            "Should Venus, Jupiter and the Sun be together at birth, the native will be weak-sighted, bold, intelligent, indigent, be a minister and be devoted to others jobs.",
        hindi: "यदि जन्म के समय शुक्र, बृहस्पति और सूर्य एक साथ हों तो जातक कमजोर दृष्टि वाला, साहसी, बुद्धिमान, निर्धन, मंत्री तथा दूसरों के कामों में समर्पित होगा।",
        conjunctionPlanets: ["Sun", "Jupiter", "Venus"],
    },
    {
        english:
            "These four planets in conjunction at birth will make the person a miser, a poet, chief, leader of sculptors and mean.",
        hindi: "जन्म के समय इन चारों ग्रहों की युति व्यक्ति को कंजूस, कवि, सरदार, मूर्तिकारों का नेता और नीच बनाती है।",
        conjunctionPlanets: ["Sun", "Jupiter", "Venus", "Saturn"],
    },
    {
        english:
            "If Jupiter, Saturn and the Sun be together at birth. the native will not have a prominent physique, will be worshipped, will hate his own men, will have good wife, children and friends, be dear to the king and be fearless.",
        hindi: "यदि जन्म के समय बृहस्पति, शनि और सूर्य एक साथ हों तो जातक का शरीर सुडौल नहीं होगा, वह पूज्य होगा, अपने ही लोगों से घृणा करेगा, उसकी पत्नी, संतान और मित्र अच्छे होंगे, वह राजा का प्रिय होगा और वह निडर होगा।",
        conjunctionPlanets: ["Sun", "Jupiter", "Saturn"],
    },
    {
        english:
            "If the Sun and Venus be together, one will be skillful in use of weapons, be mighty, weak-sighted in old age, will be able to amuse the public and will have abundant money earned through women.",
        hindi: "सूर्य और शुक्र एक साथ हों तो व्यक्ति शस्त्र चलाने में निपुण, पराक्रमी, वृद्धावस्था में कम दृष्टि वाला, जनता का मनोरंजन करने वाला तथा स्त्रियों से प्रचुर धन अर्जित करने वाला होता है।",
        conjunctionPlanets: ["Sun", "Venus"],
    },
    {
        english:
            "One, who has Venus, Saturn and the Sun together at birth will be emotionally upset due to fear from enemies, will be devoid of honour and knowledge of arts and poetry, will have a mean history and will suffer from Leprosy.",
        hindi: "जिसके जन्म के समय शुक्र, शनि और सूर्य एक साथ हों, वह शत्रुओं से भय के कारण मानसिक रूप से परेशान रहेगा, सम्मान और कला व काव्य के ज्ञान से रहित होगा, उसका इतिहास खराब होगा और वह कुष्ठ रोग से पीड़ित होगा।",
        conjunctionPlanets: ["Sun", "Venus", "Saturn"],
    },
    {
        english:
            "If the Sun and Saturn are together, the native will be a metallurgist, be virtuous, mindful of his own duties, will lose his wife and son, will have the qualities suitable to his race, will be pure, but not so upright.",
        hindi: "यदि सूर्य और शनि एक साथ हों तो जातक धातुकर्मी, गुणवान, अपने कर्तव्यों के प्रति सजग, पत्नी और पुत्र से रहित, अपनी जाति के अनुरूप गुणों वाला, शुद्ध, किन्तु उतना ईमानदार नहीं होगा।",
        conjunctionPlanets: ["Sun", "Saturn"],
    },
    {
        english:
            "One, who has the Moon and Mars together, will be valorous, brave in war, be a boxer, will suffer bloody imbalances, or diseases, will manufacture articles of mud, skin and minerals and will be an artisan and a metallurgist.",
        hindi: "जिसकी कुण्डली में चन्द्रमा और मंगल एक साथ हों, वह वीर, युद्ध में बहादुर, मुक्केबाज, रक्त असंतुलन या रोगों से ग्रस्त, मिट्टी, चमड़े और खनिजों से बनी वस्तुओं का निर्माण करने वाला, कारीगर और धातुकर्मी होगा।",
        conjunctionPlanets: ["Moon", "Mars"],
    },
    {
        english:
            "Should the Moon Mercury and Mars be together at birth, the native will be sinful, mean in habits and conduct and devoid of friends and relatives throughout life.",
        hindi: "यदि जन्म के समय चन्द्रमा, बुध और मंगल एक साथ हों तो जातक पापी, नीच आचरण वाला, जीवन भर मित्रों और रिश्तेदारों से रहित होगा।",
        conjunctionPlanets: ["Moon", "Mars", "Mercury"],
    },
    {
        english:
            "One, who has the conjunction of these four planets at birth, will be an expert in Shastras, be a king, or a great minister and be extremely intelligent.",
        hindi: "जिसके जन्म के समय इन चार ग्रहों की युति हो, वह शास्त्रों का विशेषज्ञ, राजा या महान मंत्री होगा और अत्यंत बुद्धिमान होगा।",
        conjunctionPlanets: ["Moon", "Mars", "Mercury", "Jupiter"],
    },
    {
        english:
            "One, who has these four planets together will be bold, be without parents, is from an ignoble race, will have many wives, friends and sons and will have good conduct.",
        hindi: "जिसके पास ये चार ग्रह एक साथ हों, वह साहसी, माता-पिता से रहित, नीच कुल का, अनेक स्त्रियों, मित्रों और पुत्रों वाला तथा अच्छे आचरण वाला होता है।",
        conjunctionPlanets: ["Moon", "Mars", "Mercury", "Jupiter"],
    },
    {
        english:
            "If these four planets are together at birth, one will be fond of quarrels, will sleep much, be mean, will marry an unchaste lady, be fortunate, will hate his relatives and be not happy.",
        hindi: "यदि जन्म के समय ये चारों ग्रह एक साथ हों तो व्यक्ति झगड़ालू, अधिक सोने वाला, नीच, पतित स्त्री से विवाह करने वाला, भाग्यहीन, अपने संबंधियों से द्वेष रखने वाला तथा सुखी नहीं होगा।",
        conjunctionPlanets: ["Moon", "Mars", "Mercury", "Venus"],
    },
    {
        english:
            "A native, who has Mars, the Moon and Jupiter together at birth will have an even body, be addicted to women, be a thief, be splendourous, dear to women and given to anger.",
        hindi: "जिस जातक के जन्म के समय मंगल, चन्द्रमा और बृहस्पति एक साथ हों, वह सम शरीर वाला, स्त्रियों में आसक्त, चोर, वैभवशाली, स्त्रियों का प्रिय और क्रोधी होता है।",
        conjunctionPlanets: ["Moon", "Mars", "Jupiter"],
    },
    {
        english:
            "One, who has these four planets conjunct at birth will be deaf, wealthy, bold, rash in speech, firm in nature, wise and liberal. ",
        hindi: "जिसके जन्म के समय ये चार ग्रह एक साथ हों, वह व्यक्ति बधिर, धनवान, साहसी, वाणी में तेज, स्वभाव में दृढ़, बुद्धिमान और उदार होता है।",
        conjunctionPlanets: ["Moon", "Mars", "Jupiter", "Venus"],
    },
    {
        english:
            "If these four planets are together at birth, one will be deformed, will have a good wife, be highly tolerant, be self-respected, learned will have many friends and be happy.",
        hindi: "यदि जन्म के समय ये चारों ग्रह एक साथ हों तो व्यक्ति विकृत होगा, उसकी पत्नी अच्छी होगी, वह अत्यधिक सहनशील होगा, वह स्वाभिमानी होगा, विद्वान होगा, उसके अनेक मित्र होंगे और वह सुखी होगा।",
        conjunctionPlanets: ["Moon", "Mars", "Jupiter", "Saturn"],
    },
    {
        english:
            "One, who has Mars, Venus and the Moon together at birth is the son of a bad woman and also will wed such a lady. He will be of wandering disposition and will have fear from cold.",
        hindi: "जिसके जन्म के समय मंगल, शुक्र और चन्द्रमा एक साथ हों, वह दुष्ट स्त्री का पुत्र होता है और ऐसी ही स्त्री से विवाह भी करता है। वह भ्रमणशील स्वभाव का होता है और शीत से डरता है।",
        conjunctionPlanets: ["Moon", "Mars", "Venus"],
    },
    {
        english:
            "If these four planets are together, one will marry an unchaste lady, will be proud, will have eyes resembling that of a snake and will be always emotional. This is certain.",
        hindi: "यदि ये चारों ग्रह एक साथ हों, तो जातक का विवाह कुकर्मी स्त्री से होगा, वह अभिमानी होगा, उसकी आँखें साँप के समान होंगी और वह सदैव भावुक रहेगा। यह निश्चित है।",
        conjunctionPlanets: ["Moon", "Mars", "Venus", "Saturn"],
    },
    {
        english:
            "If Mars, Moon and Saturn join at birth, the person concerned will lose his mother in boyhood, be mean, wicked and inimical to people.",
        hindi: "यदि जन्म के समय मंगल, चन्द्रमा और शनि एक साथ हों तो संबंधित व्यक्ति बचपन में ही अपनी मां को खो देगा, वह दुष्ट, दुष्ट और लोगों से द्वेष रखने वाला होगा।",
        conjunctionPlanets: ["Moon", "Mars", "Saturn"],
    },
    {
        english:
            "One, who has the Moon Mercury combination will be expert in poems and fables, be wealthy, amiable to his wife, beautiful, smiling-faced and will be endowed with distinct virtues.",
        hindi: "जिस व्यक्ति के पास चंद्र बुध का संयोजन होता है, वह कविताओं और दंतकथाओं में निपुण, धनवान, अपनी पत्नी के प्रति मिलनसार, सुंदर, मुस्कुराते चेहरे वाला और विशिष्ट गुणों से संपन्न होगा।",
        conjunctionPlanets: ["Moon", "Mercury"],
    },
    {
        english:
            "Should Mercury, Moon and Jupiter be together, the native will be wealthy, skillful, eloquent in speech, bright, famous and will have many sons and brothers.",
        hindi: "यदि बुध, चन्द्रमा और बृहस्पति एक साथ हों तो जातक धनवान, कुशल, वाकपटु, तेजस्वी, प्रसिद्ध और अनेक पुत्रों और भाइयों वाला होता है।",
        conjunctionPlanets: ["Moon", "Mercury", "Jupiter"],
    },
    {
        english:
            "One, who has these four planets together will be learned, be devoid of parents, good looking, wealthy, very lucky and be without enemies.",
        hindi: "जिसके कुंडली में ये चारों ग्रह एक साथ हों, वह विद्वान, माता-पिता से रहित, सुंदर, धनवान, बहुत भाग्यशाली और शत्रु रहित होता है।",
        conjunctionPlanets: ["Moon", "Mercury", "Jupiter", "Venus"],
    },
    {
        english:
            "Should these be conjunct one will be virtuous, famous, noble and splendourous, fond of relatives, wise, be a kings minister and be a chief poet.",
        hindi: "यदि ये दोनों ग्रह एक साथ हों तो जातक गुणवान, यशस्वी, कुलीन, वैभवशाली, स्वजनों का प्रिय, बुद्धिमान, राजा का मंत्री और प्रधान कवि होता है।",
        conjunctionPlanets: ["Moon", "Mercury", "Jupiter", "Saturn"],
    },
    {
        english:
            "One, who has Mercury, Venus and Moon together at birth, will be mean in conduct in spite of his being learned and cultured. be Jealous and miserly.",
        hindi: "जिसके जन्म के समय बुध, शुक्र और चन्द्रमा एक साथ हों, वह विद्वान और सुसंस्कृत होने के बावजूद नीच आचरण वाला, ईर्ष्यालु और कंजूस होगा।",
        conjunctionPlanets: ["Moon", "Mercury", "Venus"],
    },
    {
        english:
            "If these planets are together at birth, the native will be intent on seeking sexual pleasures with others wives, will have an unchaste wife, be devoid of relatives, learned and will hate people.",
        hindi: "यदि ये ग्रह जन्म के समय एक साथ हों तो जातक दूसरों की पत्नियों के साथ यौन सुख चाहने वाला, पतित पत्नी वाला, संबंधियों से रहित, विद्वान और लोगों से घृणा करने वाला होगा।",
        conjunctionPlanets: ["Moon", "Mercury", "Venus", "Saturn"],
    },
    {
        english:
            "If Saturn, Moon and Mercury be together, the person concerned will be dependent, deformed, learned, be an able speaker and respected by the king.",
        hindi: "यदि शनि, चन्द्रमा और बुध एक साथ हों तो जातक आश्रित, विकृत, विद्वान, कुशल वक्ता और राजा द्वारा सम्मानित होता है।",
        conjunctionPlanets: ["Moon", "Mercury", "Saturn"],
    },
    {
        english:
            "One with Jupiter and the Moon together will be firm in friendship, modest, respectful towards his relatives, wealthy, virtuous and regardful of Gods and the wise.",
        hindi: "बृहस्पति और चंद्रमा एक साथ होने पर व्यक्ति मित्रता में दृढ़, विनम्र, अपने रिश्तेदारों के प्रति सम्मान रखने वाला, धनवान, गुणवान, देवताओं और बुद्धिमानों का सम्मान करने वाला होता है।",
        conjunctionPlanets: ["Moon", "Jupiter"],
    },
    {
        english:
            "Should Venus, Jupiter and the Moon be in one House at birth, the native will be a chaste womans son, be a scholar, will have knowledge of arts and many Shastras, be virtuous and beautiful.",
        hindi: "यदि जन्म के समय शुक्र, बृहस्पति और चंद्रमा एक ही भाव में हों तो जातक पतिव्रता स्त्री का पुत्र होगा, विद्वान होगा, कला और अनेक शास्त्रों का ज्ञान रखेगा, गुणवान और सुंदर होगा।",
        conjunctionPlanets: ["Moon", "Jupiter", "Venus"],
    },
    {
        english:
            "The native with these four planets conjunct will be devoid of mother, be lucky, will suffer from skin diseases, will be subjected to grief, be intent on roaming, will know many languages and will be truthful.",
        hindi: "इन चारों ग्रहों की युति वाला जातक मातृहीन, भाग्यहीन, चर्मरोग से ग्रस्त, शोकग्रस्त, भ्रमणशील, अनेक भाषाओं का ज्ञाता एवं सत्यभाषी होता है।",
        conjunctionPlanets: ["Moon", "Jupiter", "Venus", "Saturn"],
    },
    {
        english:
            "One, who has Moon, Jupiter and Saturn combination at birth will know the inner meaning of Shastras, will seek union with aged women, be devoid of shame and be the head of a village and people.",
        hindi: "जिसके जन्म के समय चन्द्र, बृहस्पति और शनि का योग हो, वह शास्त्रों के आंतरिक अर्थ को जानने वाला, वृद्ध स्त्रियों से संबंध बनाने वाला, लज्जा से रहित तथा गांव और प्रजा का मुखिया होगा।",
        conjunctionPlanets: ["Moon", "Jupiter", "Saturn"],
    },
    {
        english:
            "Should the Moon and Venus be together, the native will be endowed with flowers, incense and clothes, will know to perform duties (kriya also means rites), be dear to his race, very lazy and expert in buying and selling.",
        hindi: "यदि चन्द्रमा और शुक्र एक साथ हों तो जातक पुष्प, धूप और वस्त्र से संपन्न होगा, कर्तव्य पालन करना जानता होगा (क्रिया का अर्थ संस्कार भी होता है), अपने कुल का प्रिय होगा, बहुत आलसी होगा और क्रय-विक्रय में निपुण होगा।",
        conjunctionPlanets: ["Moon", "Venus"],
    },
    {
        english:
            "If the Moon, Venus and Saturn are in combination at birth, one will be a writer, reader of books, Purohita (family guru), will have to his credit merits of past birth and be an astrologer.",
        hindi: "यदि जन्म के समय चन्द्रमा, शुक्र और शनि एक साथ हों तो व्यक्ति लेखक, पुस्तक पाठक, पुरोहित (पारिवारिक गुरु) होगा, उसे पूर्वजन्म के पुण्यों का श्रेय प्राप्त होगा और वह ज्योतिषी होगा।",
        conjunctionPlanets: ["Moon", "Venus", "Saturn"],
    },
    {
        english:
            "Should the Moon and Saturn be together, the native will possess a decayed wife, be dear to public, will breed elephants and horses, be devoid of virtues, be under the control of others, unwealthy and defeated.",
        hindi: "यदि चन्द्रमा और शनि एक साथ हों तो जातक पतित पत्नी वाला, जनता का प्रिय, हाथी-घोड़े पालने वाला, गुणहीन, दूसरों के अधीन, धनहीन और पराजित होता है।",
        conjunctionPlanets: ["Moon", "Saturn"],
    },
    {
        english:
            "If Mars and Mercury are together at birth, the native will have unlucky wife, little wealth, will work with gold and iron, be an architect, will keep a wicked widow and be expert in making medicines.",
        hindi: "यदि जन्म के समय मंगल और बुध एक साथ हों तो जातक की पत्नी अशुभ होगी, धन कम होगा, सोने और लोहे का काम करेगा, वास्तुकार होगा, दुष्ट विधवा को रखेगा और औषधि बनाने में निपुण होगा।",
        conjunctionPlanets: ["Mars", "Mercury"],
    },
    {
        english:
            "One, who has Mercury, Jupiter and Mars together will be a good poet, Lord of a group, will marry a virtuous lady, be intent on helping others and an expert singer.",
        hindi: "जिस व्यक्ति की कुंडली में बुध, बृहस्पति और मंगल एक साथ हों, वह अच्छा कवि, समूह का स्वामी, गुणी स्त्री से विवाह करने वाला, दूसरों की सहायता करने वाला तथा कुशल गायक होगा।",
        conjunctionPlanets: ["Mars", "Mercury", "Jupiter"],
    },
    {
        english:
            "If these four planets are in one House, the subject will be fond of picking up quarrels with his wife, will be wealthy, worshipped by the people, will possess good qualities and be free from sickness.",
        hindi: "यदि ये चारों ग्रह एक ही भाव में हों तो जातक अपनी पत्नी से झगड़ा करने वाला, धनवान, लोगों द्वारा पूजित, अच्छे गुणों वाला तथा रोग मुक्त होगा।",
        conjunctionPlanets: ["Mars", "Mercury", "Jupiter", "Venus"],
    },
    {
        english:
            "One, who has these four planets in one House at birth, will be brave, learned, be a good speaker, be without wealth, truthful and will have good habits. He will be able to argue and endure. He will be intelligent.",
        hindi: "जिस व्यक्ति के जन्म के समय ये चारों ग्रह एक ही भाव में हों, वह वीर, विद्वान, अच्छा वक्ता, धनहीन, सत्यवादी और उत्तम आदतों वाला होगा। वह तर्क करने और सहन करने में सक्षम होगा। वह बुद्धिमान होगा।",
        conjunctionPlanets: ["Mars", "Mercury", "Jupiter", "Saturn"],
    },
    {
        english:
            "Should Mars, Mercury and Venus be together at birth, the native will give up his caste, be deformed, fickle-minded, wicked and garrulous.",
        hindi: "यदि जन्म के समय मंगल, बुध और शुक्र एक साथ हों तो जातक अपनी जाति त्याग देगा, विकृत, चंचल, दुष्ट और बातूनी होगा।",
        conjunctionPlanets: ["Mars", "Mercury", "Venus"],
    },
    {
        english:
            "If these four planets are together at birth, the native will be an expert boxer, will depend on others, will have coarse body, will possess pride of war, be famous and will breed dogs.",
        hindi: "यदि जन्म के समय ये चारों ग्रह एक साथ हों तो जातक कुशल मुक्केबाज होगा, दूसरों पर निर्भर रहेगा, स्थूल शरीर वाला होगा, युद्ध में गौरव रखेगा, प्रसिद्ध होगा तथा कुत्ते पालेगा।",
        conjunctionPlanets: ["Mars", "Mercury", "Venus", "Saturn"],
    },
    {
        english:
            "Should Mercury, Saturn and Mars be together at birth, one will be a servant, will have dark eyes, be intent on living in foreign places, will have facial diseases and will be witty.",
        hindi: "यदि जन्म के समय बुध, शनि और मंगल एक साथ हों तो व्यक्ति नौकर होगा, उसकी आंखें काली होंगी, वह विदेश में रहने का इच्छुक होगा, चेहरे के रोग से ग्रस्त होगा और वह बुद्धिमान होगा।",
        conjunctionPlanets: ["Mars", "Mercury", "Saturn"],
    },
    {
        english:
            "If Mars and Jupiter be together at birth, the native will be an artisan, Vedic expert, intelligent, expert in speech, wise and fond of using weapons.",
        hindi: "यदि जन्म के समय मंगल और बृहस्पति एक साथ हों तो जातक शिल्पी, वैदिक विशेषज्ञ, बुद्धिमान, वाणी में निपुण, बुद्धिमान और शस्त्र चलाने का शौकीन होगा।",
        conjunctionPlanets: ["Mars", "Jupiter"],
    },
    {
        english:
            "One, who has Venus, Jupiter and Mars together at birth will be dear to king, will have good sons and enjoy pleasures through women. He will please all persons.",
        hindi: "जिसके जन्म के समय शुक्र, बृहस्पति और मंगल एक साथ हों, वह राजा का प्रिय, उत्तम पुत्र वाला और स्त्रियों से सुख भोगने वाला होता है। वह सभी लोगों को प्रसन्न करने वाला होता है।",
        conjunctionPlanets: ["Mars", "Jupiter", "Venus"],
    },
    {
        english:
            "If these four planets are together at birth, the native will be splendourous, wealthy, addicted to other women, fond of bravery, fickle-minded and ill-disposed.",
        hindi: "यदि जन्म के समय ये चारों ग्रह एक साथ हों तो जातक वैभवशाली, धनवान, परस्त्रीगामी, वीरताप्रिय, चंचल स्वभाव वाला तथा दुर्बुद्धि वाला होता है।",
        conjunctionPlanets: ["Mars", "Jupiter", "Venus", "Saturn"],
    },
    {
        english:
            "If Jupiter, Mars and Saturn be together at birth, the native will be honoured by the king, will have wounds on the body, be mean and blamed by friends. He will also be unkind.",
        hindi: "यदि जन्म के समय बृहस्पति, मंगल और शनि एक साथ हों, तो जातक राजा द्वारा सम्मानित, शरीर पर घाव वाला, दुष्ट और मित्रों द्वारा निंदित होगा। वह निर्दयी भी होगा।",
        conjunctionPlanets: ["Mars", "Jupiter", "Saturn"],
    },
    {
        english:
            "One, who had Mars and Venus together at birth will be worshipped, be chief among his men, be a mathematician (or an astrologer) and be fond of gambling, untruth etc.",
        hindi: "जिसके जन्म के समय मंगल और शुक्र एक साथ हों, वह पूज्य होगा, अपने लोगों में प्रमुख होगा, गणितज्ञ (या ज्योतिषी) होगा तथा जुआ, असत्य आदि का शौकीन होगा।",
        conjunctionPlanets: ["Mars", "Venus"],
    },
    {
        english:
            "If Saturn, Mars and Venus are in one House at birth, the native is born to an immoral lady, will marry such a lady, will be devoid of happiness and will be intent on wandering in distant places.",
        hindi: "यदि जन्म के समय शनि, मंगल और शुक्र एक ही भाव में हों तो जातक अनैतिक स्त्री से जन्म लेता है, ऐसी स्त्री से विवाह करेगा, सुख से रहित होगा तथा दूर स्थानों पर भटकने का इच्छुक होगा।",
        conjunctionPlanets: ["Mars", "Venus", "Saturn"],
    },
    {
        english:
            "Mars and Saturn be together, one will be a metallurgist. be expert in jugglery, be deceitful, skillful in thieving, troubled by weapons and poison and be fond of quarrels.",
        hindi: "मंगल और शनि एक साथ हों तो व्यक्ति धातुकर्मी, जादूगर, धोखेबाज, चोरी में निपुण, शस्त्र और विष से परेशान और झगड़ालू होता है।",
        conjunctionPlanets: ["Mars", "Saturn"],
    },
    {
        english:
            "One, who has Mercury and Jupiter together will be a noted dancer, scholar, singer and instrumentalist. He will be wise and happy.",
        hindi: "जिस व्यक्ति की कुंडली में बुध और बृहस्पति एक साथ हों, वह प्रसिद्ध नर्तक, विद्वान, गायक और वादक होगा। वह बुद्धिमान और सुखी होगा।",
        conjunctionPlanets: ["Mercury", "Jupiter"],
    },
    {
        english:
            "Should Mercury, Jupiter and Venus be together, the native will have good physique, be successful over his enemies, be a king, fortunate, widely famous and truthfully disposed.",
        hindi: "यदि बुध, बृहस्पति और शुक्र एक साथ हों तो जातक का शरीर अच्छा होगा, वह अपने शत्रुओं पर विजय प्राप्त करेगा, राजा होगा, भाग्यशाली होगा, व्यापक रूप से प्रसिद्ध होगा और सत्यवादी होगा।",
        conjunctionPlanets: ["Mercury", "Jupiter", "Venus"],
    },
    {
        english:
            "Should these be together at birth, the native will be intelligent, interested in Shastras, be a debaucher and an obedient servant.  ",
        hindi: "यदि ये दोनों जन्म से एक साथ हों तो जातक बुद्धिमान, शास्त्रों में रुचि रखने वाला, व्यभिचारी और आज्ञाकारी सेवक होगा।",
        conjunctionPlanets: ["Mercury", "Jupiter", "Venus", "Saturn"],
    },
    {
        english:
            "When Mercury, Saturn and Jupiter are together at birth, it denotes, that the native will enjoy honour, wealth and sovereignty, be learned, will have abundant pleasures, be attached to his wife, be courageous and fortunate.",
        hindi: "जब जन्म के समय बुध, शनि और बृहस्पति एक साथ हों तो यह दर्शाता है कि जातक सम्मान, धन और प्रभुता का आनंद उठाएगा, विद्वान होगा, प्रचुर सुखों से युक्त होगा, अपनी पत्नी से लगाव रखेगा, साहसी और भाग्यशाली होगा।",
        conjunctionPlanets: ["Mercury", "Jupiter", "Saturn"],
    },
    {
        english:
            "Should Mercury and Venus be together at birth, the native will be abundantly rich, a politician, an artisan, will study Vedas, be good in speech, will know to sing, make fun and like scents and flowers.",
        hindi: "यदि जन्म के समय बुध और शुक्र एक साथ हों तो जातक बहुत धनवान, राजनीतिज्ञ, शिल्पी, वेदों का अध्ययन करने वाला, वाणी में निपुण, गाना गाने वाला, हंसी-मजाक करने वाला तथा सुगंध और फूलों का शौकीन होगा।",
        conjunctionPlanets: ["Mercury", "Venus"],
    },
    {
        english:
            "One, who has Mercury, Venus and Saturn together at birth will be scurrilous in speech, fraudulent, be a liar, addicted to other women, vehement, (vishama has several other meanings, viz., irregular, uneven, mysterious, inaccessible, rough, painful, troublesome etc.), will have knowledge of arts and be attached to his own country.",
        hindi: "जिसके जन्म के समय बुध, शुक्र और शनि एक साथ हों, वह वाणी में कटु, कपटी, झूठा, परस्त्रीगामी, उग्र, (विषम के कई अन्य अर्थ भी हैं, जैसे अनियमित, असमान, रहस्यमय, दुर्गम, रूखा, कष्टकारी, कष्टकारी आदि), कलाओं का ज्ञाता और अपने देश के प्रति आसक्त होगा।",
        conjunctionPlanets: ["Mercury", "Venus", "Saturn"],
    },
    {
        english:
            "One, who has Mercury and Saturn together at birth, will contract debts, be proud, deceiving, an able poet, intent on moving, expert and will possess auspicious speech.",
        hindi: "जिसके जन्म के समय बुध और शनि एक साथ हों, वह ऋणग्रस्त, अभिमानी, धोखेबाज, कुशल कवि, गतिशील, निपुण और शुभ वाणी वाला होता है।",
        conjunctionPlanets: ["Mercury", "Saturn"],
    },
    {
        english:
            "One, who has Jupiter and Venus together at birth will live by education and arguments, will follow a highly virtuous path, will have accurate conception, or notion (of things) and will have a supreme wife.",
        hindi: "जिसके जन्म के समय बृहस्पति और शुक्र एक साथ हों, वह शिक्षा और तर्क से जीवन व्यतीत करेगा, बहुत ही पुण्य पथ पर चलेगा, उसकी धारणा सही होगी और उसकी पत्नी उत्तम होगी।",
        conjunctionPlanets: ["Jupiter", "Venus"],
    },
    {
        english:
            "Should Jupiter, Venus and Saturn be in one House at birth one will become a king even though he might be of mean natal order, will be very famous and be a repository of virtues.",
        hindi: "यदि जन्म के समय बृहस्पति, शुक्र और शनि एक ही भाव में हों तो व्यक्ति राजा बनेगा, भले ही वह जन्म से ही नीच राशि का हो, बहुत प्रसिद्ध होगा और गुणों का भण्डार होगा।",
        conjunctionPlanets: ["Jupiter", "Venus", "Saturn"],
    },
    {
        english:
            "A native, who has Jupiter and Saturn together at birth will be heroic, will have plenty of wealth, will be chief of the city (mayor etc.), famous and will be the head of an assembly, a village, or an association.",
        hindi: "जिस जातक के जन्म के समय बृहस्पति और शनि एक साथ हों, वह वीर होगा, उसके पास बहुत धन होगा, वह नगर का मुखिया (महापौर आदि) होगा, प्रसिद्ध होगा और किसी सभा, गांव या संघ का प्रमुख होगा।",
        conjunctionPlanets: ["Jupiter", "Saturn"],
    },
    {
        english:
            "If Venus and Saturn are together at birth, one will be expert in breaking wood, be a barber, painter, or sculptor, boxer, be intent on wandering and be owner of quadrupeds.",
        hindi: "यदि जन्म के समय शुक्र और शनि एक साथ हों तो व्यक्ति लकड़ी तोड़ने में निपुण, नाई, चित्रकार या मूर्तिकार, मुक्केबाज, भ्रमणशील तथा चौपाया होता है।",
        conjunctionPlanets: ["Venus", "Saturn"],
    },
];
