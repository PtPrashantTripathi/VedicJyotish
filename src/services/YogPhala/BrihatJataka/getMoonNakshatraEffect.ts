import type { NakshatraEn } from "src/services/constants/Nakshatra";
import type { Planet, PlanetEn } from "src/services/constants/Planet";
import type { Translation } from "src/services/types";
import type { Phala } from "src/services/YogPhala";

/**
 * Returns Moon Nakshatra effects from Brihat Jataka data.
 *
 * @param planetPositions - All planet data keyed by planet English name.
 * @returns A `phala` object describing the Moon Nakshatra effect in both
 *   English and Hindi.
 */
export function getBrihatJatakaMoonNakshatraEffectYogPhala(
    planetPositions: Record<PlanetEn, Planet>
): Phala {
    const { english: moonNakshatraEng, hindi: moonNakshatraHin } =
        planetPositions.Moon.nakshatra.name;

    return {
        description: {
            english: `Moon in ${moonNakshatraEng} Nakshatra`,
            hindi: `चंद्रमा ${moonNakshatraHin} नक्षत्र में`,
        },
        effect: MoonNakshatraEffects[moonNakshatraEng],
    };
}

/** Moon Nakshatra effects from Brihat Jataka */
export const MoonNakshatraEffects: Record<
    NakshatraEn,
    Translation<string, string>
> = {
    Aswini: {
        english:
            "The person born In Aswini will be fond of decoration, handsome, popular, skilful and intelligent ",
        hindi: "अश्विनी नक्षत्र में जन्मा व्यक्ति सजावट का शौकीन, सुंदर, लोकप्रिय, कुशल और बुद्धिमान होगा।",
    },
    Bharani: {
        english:
            "One born in Bharani will be determined, truthful, healthy, skilful and happy.",
        hindi: "भरणी नक्षत्र में जन्म लेने वाला व्यक्ति दृढ़ निश्चयी, सत्यनिष्ठ, स्वस्थ, कुशल और प्रसन्न होगा।",
    },
    Krittika: {
        english:
            "The person born in Krittika will be a voracious enter, fond of others wives, attractive and renowned ",
        hindi: "कृत्तिका नक्षत्र में जन्मा जातक लालची, दूसरों की पत्नियां चाहने वाला, आकर्षक और प्रसिद्ध होगा।",
    },
    Rohini: {
        english:
            "Rohini makes a man truthful, clean, following religious and moral principles, sweet in speech, fixed mind and handsome.",
        hindi: "रोहिणी ग्रह मनुष्य को सत्यनिष्ठ, स्वच्छ, धार्मिक और नैतिक सिद्धांतों का पालन करने वाला, मधुर वाणी वाला, स्थिर मन वाला और सुंदर बनाता है।",
    },
    Mrigashira: {
        english:
            "Mrigashira-Capricious, skilful, cowardly, good speaker, hopeful, rich and enjoying.",
        hindi: "मृगशिरा-मनमौजी, कुशल, कायर, अच्छा वक्ता, आशावादी, धनी और आनंद लेने वाला।",
    },
    Ardra: {
        english:
            "Aridra-Dissimulating in self-interest, proud, ungrateful, cruel and sinful.",
        hindi: "अरिद्र- स्वार्थ में भटकने वाला, अभिमानी, कृतघ्न, क्रूर और पापी।",
    },
    Punarvasu: {
        english:
            "Punarvasu-Religious endurance, happy, good, dull, sickly, thirsty and pleased with small gifts.",
        hindi: "पुनर्वसु-धार्मिक सहनशीलता, प्रसन्न, अच्छा, सुस्त, बीमार, प्यासा और छोटे उपहारों से प्रसन्न।",
    },
    Pushya: {
        english:
            "Pushya-Control over passions, popular, learned, rich and charitable.",
        hindi: "पुष्य- वासनाओं पर नियंत्रण, लोकप्रिय, विद्वान, धनी और दानशील।",
    },
    Ashlesha: {
        english:
            "Aslesha-Dissimulator, clever in selfishness, sinful, ungrateful and a cheat.",
        hindi: "अश्लेषा-छल करने वाला, स्वार्थ में चतुर, पापी, कृतघ्न और धोखेबाज।",
    },
    Magha: {
        english:
            "Magha-Many servants and great wealth, enjoying, respector of elders and gods and very enterprising.",
        hindi: "मघा- बहुत से सेवक और महान धन, आनंद लेने वाला, बड़ों और देवताओं का सम्मान करने वाला और बहुत उद्यमी।",
    },
    PurvaPhalguni: {
        english:
            "Pubba-Sweet speech, liberal, handsome, fond of traveling and royal servant.",
        hindi: "पुब्बा-मीठी वाणी, उदार, सुन्दर, यात्रा का शौकीन और राजसेवक।",
    },
    UttaraPhalguni: {
        english: "Uttara-Popular, self-acquired property, enjoying and happy.",
        hindi: "उत्‍तर - लोकप्रिय, स्वअर्जित संपत्ति, आनंदित एवं सुखी।",
    },
    Hasta: {
        english:
            "Hasta-Enterprising, intelligent or (shameless), drunkard, cruel and thievish.",
        hindi: "हस्त-उद्यमी, बुद्धिमान या (बेशर्म), शराबी, क्रूर और चोर।",
    },
    Chitra: {
        english:
            "Chitra-Using various clothes and garlands, good looks and limbs.",
        hindi: "चित्रा-विभिन्न वस्त्र और मालाओं, सुन्दर रूप और अंगों का प्रयोग।",
    },
    Swati: {
        english:
            "Swati-Polite, merchant, kind hearted, not able to endure thirst, sweet tongued and generous.",
        hindi: "स्वाति-विनम्र, व्यापारी, दयालु, प्यास सहन न करने वाली, मधुरभाषी और उदार।",
    },
    Vishakha: {
        english:
            "Visakha-Jealous, avaricious, handsome, clever speaker and quarrelsome, or maker of money.",
        hindi: "विशाखा- ईर्ष्यालु, लोभी, सुन्दर, चतुर वक्ता और झगड़ालू, या धन कमाने वाला।",
    },
    Anuradha: {
        english:
            "Anuradha-Master or chief, living in foreign countries, not able to bear hunger and fond of traveling.",
        hindi: "अनुराधा- स्वामी या मुखिया, विदेश में रहने वाला, भूख सहन न कर पाने वाला तथा यात्रा का शौकीन।",
    },
    Jyeshtha: {
        english: "Jyeshta-Few friends, contented, charitable, very irritable.",
        hindi: "ज्येष्ठा- कम मित्र, संतुष्ट, दानशील, बहुत चिड़चिड़ा।",
    },
    Mula: {
        english: "Mula-Proud, rich happy, good, steady and enjoying.",
        hindi: "मूला- गर्वित, धनी, सुखी, अच्छा, स्थिर और आनंदित।",
    },
    PurvaShadha: {
        english:
            "Purvashada-Good and pleasant wife, proud and a steady friend.",
        hindi: "पूर्वाषाढ़ा-अच्छी और सुखद पत्नी, गौरवान्वित और स्थिर मित्र।",
    },
    UttaraShadha: {
        english:
            "Uttarashada-Polite, knowing, virtuous, many friends, grateful and popular.",
        hindi: "उत्तराषाढ़ा-विनम्र, ज्ञानी, गुणवान, अनेक मित्र, कृतज्ञ और लोकप्रिय।",
    },
    Sravana: {
        english:
            "Sravana-Rich surroundings, learned, good and liberal or liberal to wife, wealthy and renowned.",
        hindi: "श्रवण-समृद्ध परिवेश, विद्वान, अच्छा और उदार या पत्नी के प्रति उदार, धनी और प्रसिद्ध।",
    },
    Dhanishta: {
        english:
            "Dhanishta-Liberal, rich, courageous, fond of music and money.",
        hindi: "धनिष्ठा- उदार, धनी, साहसी, संगीत और धन का शौकीन।",
    },
    Shatabhisha: {
        english:
            "Satabhisha-Plain and truthful, striken from sorrow through females, etc., killer of enemies, adventurous and irreconcilable.",
        hindi: "शतभिषा- स्पष्टवादी, सत्यवादी, स्त्रियों आदि के द्वारा दुःख से पीड़ित, शत्रुओं का संहारक, साहसी और असाध्य।",
    },
    PurvaBhadra: {
        english:
            "Poorvabhadra-Sorrowful, loss of money through females, skilful and miserly.",
        hindi: "पूर्वभद्रा-दुःखी, स्त्रियों के द्वारा धन की हानि, कुशल और कंजूस।",
    },
    UttaraBhadra: {
        english:
            "Uttarabhadra-Good and witty speaker in society and meetings, happy, many children and grandchildren, successful over enemies and charitable.",
        hindi: "उत्तराभाद्र-समाज और सभाओं में अच्छा और विनोदी वक्ता, सुखी, अनेक संतान और पौत्रों वाला, शत्रुओं पर विजय पाने वाला और दानशील।",
    },
    Revati: {
        english:
            "Revati-Well, developed organs, popular, courageous, clean and wealthy. developed organs, popular, courageous, clean and wealthy.",
        hindi: "रेवती-अच्छी तरह विकसित अंग, लोकप्रिय, साहसी, स्वच्छ और धनवान। विकसित अंग, लोकप्रिय, साहसी, स्वच्छ और धनवान।",
    },
};
