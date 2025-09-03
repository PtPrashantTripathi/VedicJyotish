import type { HouseNumber } from "src/services/constants/Houses";
import type {
    NavagrahaEn,
    Planet,
    PlanetEn,
} from "src/services/constants/Planet";
import type { RasiEn } from "src/services/constants/Rasi";
import type { Translation } from "src/services/types";
import type { Phala } from "src/services/YogPhala";

/**
 * Returns a list of house position details for a given planet position map.
 *
 * @param planetPositions - All planet data keyed by planet English name.
 */
export function getBhriguSamhitaPlanetRasiHouseYogPhala(
    planetPositions: Record<PlanetEn, Planet>
): Phala[] {
    const ascendantRasi = planetPositions.Ascendant.rasi.name;
    const ascendantHouseMap = PlanetRasiHouseEffects[ascendantRasi.english];

    return Object.entries(ascendantHouseMap).map(
        ([planetName, planetEffects]) => {
            const planet = planetPositions[planetName];

            return {
                description: {
                    english: `${ascendantRasi.english} ascendant, ${planet.name.english} in the ${planet.house.name.english} House in ${planet.rasi.name.english} Rasi`,
                    hindi: `${ascendantRasi.hindi} लग्न, ${planet.name.hindi} ${planet.house.name.hindi} भाव में, ${planet.rasi.name.hindi} राशि में`,
                },
                effect: planetEffects[planet.house.num],
            };
        }
    );
}

/** House positions and their effects for each Rasi and planet. */
export const PlanetRasiHouseEffects: Record<
    RasiEn,
    Record<NavagrahaEn, Record<HouseNumber, Translation<string, string>>>
> = {
    Aries: {
        Sun: {
            1: {
                hindi: "जातक विद्वान होता है, अच्छी शिक्षा प्राप्त करता है, आत्म-ज्ञानी होता है, लंबा कद होता है, बच्चों से खुश रहता है, मानसिक रूप से चतुर होता है, पत्नी के घर में कुछ कमी होती है, यौन रुचि की कमी होती है, और व्यवसायिक गतिविधियों में रुचि नहीं लेता है।",
                english:
                    "The native is learned, gets good education, self-knowledge, is oftall stature, happy with children, mentally shrewd, somewhat deficient in the house ofwife, lacks sexual interest, and does not care for occupational pursuits",
            },
            2: {
                hindi: "शिक्षा प्राप्ति में कठिनाई महसूस होती है, मानसिक रूप से चिंतित रहते हैं, नियमित कार्य से धन प्राप्त करते हैं, बच्चों से समस्या होती है, आर्थिक स्थिति कमजोर होती है",
                english:
                    "Feels difficulties in acquiring education, mentally worried, gains wealth by routine work, problems with children, weak finances",
            },
            3: {
                hindi: "प्रखर बुद्धि, विद्या प्राप्ति, संतान की शक्ति, वाणी का प्रभाव, शारीरिक रूप से बलवान, परिश्रमी, भाइयों के साथ शांतिप्रिय, धर्म और ईश्वर में आस्था रखने वाला, बहुत साहसी और वीरतापूर्वक बोलने वाला",
                english:
                    "Powerful intellect, gets education, power of children, influence of speech, physically strong, hard-working, peace with brothers, believes in Dharma and has faith in God, very courageous and speaks bravely",
            },
            4: {
                hindi: "अच्छी शिक्षा पाता है, संतान का बल और माता के गुण पाता है, मीठा बोलता है, जमीन-जायदाद पाता है, पिता के घर में रुचि नहीं लेता, कभी-कभी सुस्त हो जाता है, सरकार और समाज के प्रति द्वेषपूर्ण, बुद्धिमान",
                english:
                    "Gets good education, gets the power ofchildren and qualities ofa mother, speaks sweetly, gets land and property, uninterested in the house of father, gets slack at times, malicious in respect of government and society, wise",
            },
            5: {
                hindi: "अच्छी शिक्षा प्राप्त करता है, अच्छा वक्ता, बुद्धिमान, दूरदर्शी, बच्चों का प्रभाव, आय में कमी, दूसरों की तुलना में श्रेष्ठ महसूस करता है।",
                english:
                    "Acquires good education, good speaker, intellectual, farsighted, influence from the side ofchildren, shortage ofincome, feels superior with regard to others",
            },
            6: {
                hindi: "शिक्षा में कमी, मानसिक रूप से चिंतित, शत्रुओं पर विजय, कठिनाइयों और बाधाओं पर विजय, समस्याओं से उबरने के लिए दूसरों का मार्गदर्शन, बच्चों से खुश नहीं, नाना से प्रभावित, अधिक खर्च और बौद्धिक गतिविधियों से लाभ",
                english:
                    "Deficient in education, mentally worried, wins enemies, overcomes difficulties and hindrances, guides others to get over the problem, not happy with children, influence from maternal grandfather, spends much and gains due to intellectual pursuits",
            },
            7: {
                hindi: "पत्नी और बच्चों से खुश नहीं, शिक्षा में कष्ट, मूर्ख, पारिवारिक जीवन में परेशानी, अधिक से अधिक कमाने के लिए काम करना, सही और गलत दोनों तरीकों में लिप्त होना, यौन जीवन से खुश नहीं, रहस्यों से भरा व्यक्ति",
                english:
                    "Not happy with wife and children, suffers in education, unwise, troubled family life, works to earn more and more, indulges in both right and wrong methods, not happy with sexual life, a man of secrets",
            },
            8: {
                hindi: "संतान के कारण कष्ट, शिक्षा बाधित, मानसिक रूप से चिंतित, गुप्तचर, नियमित जीवन, दूसरों से धन प्राप्त करने वाला, कुटिल स्वभाव, कठोर वाणी और जल्दबाज़ी",
                english:
                    "Miseries on account of children, education suffers, mentally worried, secretive, routine life, gains wealth from others, crooked in nature, harsh speech and rash",
            },
            9: {
                hindi: "अच्छी शिक्षा प्राप्त करता है, अपनी बुद्धि से भाग्य सुधारता है, धार्मिक, पुत्रों से सुखी, भाई-बहनों से सुखी, ऊर्जावान, अप्रत्याशित धन प्राप्त करता है, न्यायपूर्ण बोलता है, प्रभावशाली और विद्वान होता है।",
                english:
                    "Gets good education, improves his destiny by his wisdom, religious, happiness from sons, happiness from brothers and sisters, energetic, gets windfall, speaks justly, influential and learned",
            },
            10: {
                hindi: "व्यवहार में बचकाना, पिता से शत्रुता, व्यवसाय में उन्नति में बाधा, समाज व सरकार में विरोध, कार्य में शालीनता का अभाव, माता का आदर, मकान व जमीन जायदाद के मामलों में सुख",
                english:
                    "Childish in behaviour, develops enmity with father, faces hindrances in the advancement ofoccupation side i. e. profession, gets opposition in society and government, his work lacks decency, respects mother, happiness in the matters concerning houses and landed property",
            },
            11: {
                hindi: "शिक्षा प्राप्ति में उदासीनता, संतान से असंतुष्ट, बौद्धिक कार्यों में रुचि, स्वार्थी, कठोर वाणी, महत्वाकांक्षी",
                english:
                    "Feels indifference in acquiring education, dissatisfied with children, goes for intellectual pursuits, selfish, harsh speech, ambitious",
            },
            12: {
                hindi: "अच्छी शिक्षा का अभाव, कमजोर आंखें, अधिक खर्च करने वाला, बच्चों से खुश न रहने वाला, गोलमोल बातें करने वाला, मानसिक रूप से चिंतित, शत्रुओं से ग्रस्त, व्यय भाव को नियंत्रित करने का प्रयास करने वाला, बाहरी लोगों से अच्छा संपर्क",
                english:
                    "Lacks good education, has weak eyes, spends much, not happy with children, talks in a rounded about way, mentally worried, suffers from enemies, tries to control house of expenditure, good contact with outsiders",
            },
        },
        Moon: {
            1: {
                hindi: "सुख और सभी सुखों का आनंद प्राप्त करता है, माता का स्नेह प्राप्त करता है और भूमि और मकान का आनंद लेता है, सुंदर, पत्नी से सुख, यौन सुख, सफलता प्राप्त करता है, व्यवसाय में सम्मान, अच्छे सहायकों से संपर्क और विलासिता का आनंद लेता है",
                english:
                    "Gets happiness and enjoys all pleasures, gets mother's affection and enjoys land and house, good-looking, happiness from wife, sexual pleasure, gets success, respect in occupation, contact with good helpers and enjoys luxury",
            },
            2: {
                hindi: "धन, भूमि और मकान की संपत्ति प्राप्त होती है, बड़ा परिवार होता है, धन तो मिलता है लेकिन उसका उपभोग नहीं कर पाते, मानसिक रूप से प्रसन्न रहते हैं, दैनिक दिनचर्या में व्यवधान होता है, दूसरों से सहायता मिलती है",
                english:
                    "Gets wealth, lands and house property, large family, gets wealth but cannot enjoy it, mentally happy, disturbance in daily routine, help from others",
            },
            3: {
                hindi: "भाई-बहनों से सुख, माता से लाभ, यश, ईश्वर में आस्था, धर्म से प्रेम, भूमि-सम्पत्ति का सुख, भाइयों से सहायता",
                english:
                    "Happiness through brothers and sisters, gains from mother, gets fame, has faith in God, loves Dharma, enjoys landed property, help through brothers",
            },
            4: {
                hindi: "माता से उत्तम स्नेह और भूमि-सम्पत्ति प्राप्त करता है, निश्चिंत और मानसिक रूप से प्रसन्न रहता है, माता को पिता से श्रेष्ठ मानता है, शासन और समाज से संबंधित कार्य करता है तथा सुख-सुविधाओं का आनंद लेता है।",
                english:
                    "Gets good motherly affection and landed property through her, is carefree and mentally happy, considers mother as superior to father, undertakes works relating to government and society and enjoys pleasures and luxuries",
            },
            5: {
                hindi: "वह स्वयं को बुद्धिमान, संतान सुखी, धनवान, अच्छा वक्ता, दूसरों को कष्ट न देने वाला, गहन चिंतनशील और माता के प्रति समर्पित समझता है।",
                english:
                    "Feels he is intelligent, happiness from children, acquires wealth, good speaker and does not hurt others, deep thinking and devoted to mother",
            },
            6: {
                hindi: "सुख में बाधा आती है, मातृ स्नेह का अभाव होता है, पारिवारिक सुख नहीं मिलता, अच्छी जमीन-जायदाद नहीं होती, मानसिक रूप से दुखी, शत्रुओं से भय, अधिक व्यय, नाना से सहायता नहीं मिलती",
                english:
                    "Finds hindrances in happiness, lacks motherly affection, does not get family happiness, does not possess good landed properties, mentally unhappy, fear from enemies, spends much, gets help from maternal grandfather",
            },
            7: {
                hindi: "पारिवारिक सुखों का आनंद लेता है, सुन्दर पत्नी पाता है, माता से सुखी रहता है, भूमि और मकान का सुख भोगता है, शारीरिक रूप से स्वस्थ और सुन्दर होता है, यौन सुखों का आनंद लेता है, बहुत कुशल होता है, पारिवारिक संबंधों और सांसारिक मामलों को संभालने में निपुण होता है।",
                english:
                    "Enjoys family pleasures, gets a good-looking wife, happy with mother, enjoys lands and houses, physically healthy and handsome, enjoys sexual pleasures, very skilful, expert in maintaining family relations and worldly affairs",
            },
            8: {
                hindi: "माता को खो देने वाला, मातृ-सम्बन्धियों से दुःखी, अशांत एवं संकीर्ण सोच वाला, उदर रोग से ग्रस्त, दुर्घटना ग्रस्त, धन संचय न करने वाला, दरिद्रता एवं क्लेशों से ग्रस्त",
                english:
                    "Loses mother and unhappy with maternal relatives, disturbed and narrow-minded, suffers from stomach troubles, accident prone, does not accumulate wealth, feces penury and troubles",
            },
            9: {
                hindi: "माता के घर से सौभाग्य प्राप्त होता है, भूमि और भवन प्राप्त होते हैं, दैवीय सहायता मिलती है, सुखी और संतुष्ट रहते हैं, धर्म में विश्वास रखते हैं, भाई-बहनों से सहयोग प्राप्त करते हैं, उद्योग में लाभ प्राप्त करते हैं",
                english:
                    "Has good luck from the house of mother, acquires lands and buildings, gets Divine help, happy and satisfied, believes in Dharma, gets support from brothers and sisters, gains in industry",
            },
            10: {
                hindi: "पिता से स्नेह मिलता है, जमीन जायदाद मिलती है, सरकार और समाज से मदद मिलती है, उपकार मिलता है, व्यापार में सफलता मिलती है, अच्छे कर्म होते हैं, अच्छे कपड़े पहनते हैं, सुंदरता और सजावट की सराहना करते हैं, उच्च विचार रखते हैं",
                english:
                    "Gets affection from father, acquires landed property, help from government and society, gets favours, success in business, does good deeds, wears good dress, appreciates beauty and decoration, thinks high",
            },
            11: {
                hindi: "अच्छी आय होती है, कुछ कठिनाइयों के साथ सुख मिलता है, भूमि और मकान से लाभ होता है, अच्छी शिक्षा मिलती है, संतान से सुख मिलता है, मीठा बोलता है, सुख प्राप्त करता है",
                english:
                    "Gets good income, gains happiness with some difficulties, gains from lands and houses gets good education happiness through, , children, speaks sweetly, gets pleasures",
            },
            12: {
                hindi: "सुख-सुविधाओं पर अधिक व्यय, अच्छे कार्यों पर व्यय, माता की मृत्यु, भूमि-सम्पत्ति का अभाव, शत्रुओं से संगति, व्यय की योजना सहजता से बनाना, मानसिक बेचैनी",
                english:
                    "Spends much for pleasure, expenditure for good causes, loses mother, lacks landed properties, associates with enemies, plans the expenditure with ease, mental restlessness",
            },
        },
        Mars: {
            1: {
                hindi: "प्रसिद्धि और भौतिक महानता प्राप्त करता है, आध्यात्मिक शक्तियाँ होती हैं, माँ उत्साहवर्धक नहीं होती, पत्नी और पारिवारिक सुखों से सुख नहीं मिलता, बेचैन रहता है",
                english:
                    "Gets fame and physical greatness, has spiritual powers with mother not encouraging, lacking happiness from wife and family pleasures, is restless",
            },
            2: {
                hindi: "धन कमाने में सदैव व्यस्त, किन्तु धन गँवाने वाला, अवैध लाभ उठाने वाला, संतान से कुछ हानि, कटु वाणी से बाधा, अधार्मिक",
                english:
                    "Always busy in earning money, but loses wealth, enjoys illegal gains, loses something from children, hindered by harsh speech, irreligious",
            },
            3: {
                hindi: "ऊर्जावान, भाइयों से दुखी, सरकार और समाज द्वारा मान्यता प्राप्त, अपनी योग्यता से आगे बढ़ता है, अच्छा व्यापार करता है, शत्रुओं पर विजय प्राप्त करता है, कठिनाइयों पर विजय प्राप्त करता है, पिता से सुख प्राप्त करता है",
                english:
                    "Energetic, unhappy with brothers, recognised by government and society, comes up by his own merit, does good business, conquers the enemies, overcomes difficulties, gains happiness through father",
            },
            4: {
                hindi: "कद में छोटा, मातृ स्नेह खो देता है, बेचैन हो जाता है, भूमि और भवन खो देता है, पत्नी से खुश नहीं रहता, परिश्रमी होता है",
                english:
                    "Short in stature, loses motherly affection, becomes restless, loses lands and buildings, not happy with wife, hard-working",
            },
            5: {
                hindi: "बुद्धिमान और जल्दबाज़, बच्चों से खुश नहीं, बहुत ज़्यादा खर्च करने वाला, महत्वाकांक्षी",
                english:
                    "Wise and rash in approach, not happy with children, spends heavily, ambitious",
            },
            6: {
                hindi: "प्रभावशाली, उद्योग के कारण प्रसिद्धि प्राप्त करने वाला, शत्रुओं पर विजय पाने वाला, हानि उठाने वाला, शारीरिक रूप से बीमार तथा शरीर में कष्ट अनुभव करने वाला, किन्तु उनसे उबर जाने वाला, आत्मविश्वास न खोने वाला, थोड़ा अधार्मिक, अधिक व्यय करने वाला, साहसी, गुप्त शक्तियों वाला तथा स्वार्थी होता है।",
                english:
                    "Influential, gets fame due to industry, wins enemies, gets losses, physically sick and feels troubles in body but gets over them, does not lose confidence, a bit irreligious, spends much, brave, has occult powers and is selfish",
            },
            7: {
                hindi: "कर्तव्यों का निर्वहन बड़ी कठिनाई से करता है, पत्नी से परेशानी और वैवाहिक जीवन में निरंतर कलह, व्यवसाय की बेहतरी के लिए कार्य करता है, सरकार और समाज द्वारा सम्मानित, प्रतिष्ठा प्राप्त करता है, सर्वोत्तम प्रयासों के बावजूद अपनी संपत्ति में वृद्धि नहीं कर पाता, यौन जीवन का आनंद लेने में कमी।",
                english:
                    "Carries duties with great difficulty, troubles with wife and constant clashes in married life, works for the betterment ofbusiness, honoured by government and society, gets reputation, cannot improve his wealth in spite of best efforts, deficient in enjoying the sexual life",
            },
            8: {
                hindi: "दुबला शरीर और आकार में कमी, बेचैनी महसूस करना, दूसरों को जीवन की शक्ति देकर या यहाँ तक कि आत्म-पहचान को समाप्त करके बहुत लाभ प्राप्त करना, समय से पहले बूढ़ा हो जाना, भाईचारे में कमी आना, लेकिन प्रसिद्ध होना",
                english:
                    "Lean body and deficient in size, feels restless, gains heavily by giving the power of life to others with pride, or even putting an end to self-identity, becomes prematurely aged, brotherly relations suffer, but becomes famous",
            },
            9: {
                hindi: "भाग्यवान, भाग्य उन्नति में बाधा, दूसरों से तथा दूर के रिश्तेदारों से लाभ, अधिक व्यय, मातृ सम्बन्धियों से अप्रसन्न, भूमि, सुख-शांति के प्रति लापरवाह, भाईचारे से अप्रसन्न, दिखावटी स्वभाव",
                english:
                    "Fortunate, faces hindrances in the advancement of luck, gains from others and distant relatives, spends much, unhappy with motherly relations, careless about lands, peace and happiness, not happy with brotherly relations, showy in nature",
            },
            10: {
                hindi: "शारीरिक रूप से बलवान, जीवन के दैनिक कार्यों में प्रतिष्ठा और सर्वोच्चता प्राप्त करने वाला, स्वाभिमानी और गौरवशाली, प्रसिद्ध तथा सरकार और समाज में सम्मानित, महान कार्य करने वाला, अच्छा व्यक्तित्व वाला, अपना काम करवाने वाला, स्वतंत्र और आज्ञाकारी, किन्तु सुखों के प्रति लापरवाह, विद्या और बुद्धि में अच्छा, कर्तव्यनिष्ठ पुत्र नहीं, शरारती",
                english:
                    "Great physical strength, gets the dignity and supremacy in the daily routine of life, has self-respect and pride, becomes famous and is respected by the government and society, does grand deeds, has a good personality, gets his work done, is independent and orders, but careless about pleasures, good in education and intellect, not a dutiful son, naughty",
            },
            11: {
                hindi: "परिश्रमी और परिश्रम से लाभ पाने वाला, लाभ के सम्बन्ध में कटु नीतियाँ अपनाने वाला, धन की हानि करने वाला, परिवार की हानि से चिन्तित, शत्रुओं पर विजय पाने वाला, थोड़ा लापरवाह, ज्ञान और बुद्धि में रहस्यमय शक्तियों का प्रयोग करने वाला",
                english:
                    "Hard-working and gains by hard work, bitter policies related to gains, loses wealth, worried over loss with regard to family, overcomes enemies, a bit careless, uses mysterious powers in knowledge and intelligence",
            },
            12: {
                hindi: "बेचैनी महसूस करना, भाईचारे से नाखुश रहना, अधिक खर्च करना, पत्नी से नाखुश रहना, दैनिक कार्यों में चिंता और परेशानी, शत्रुओं पर विजय, बड़ी कठिनाई से अपना काम पूरा करना, यौन जीवन और घरेलू कामों से नाखुश रहना, शारीरिक रूप से कमजोर होना",
                english:
                    "Feels restless, unhappy with brotherly relations, spends much, unhappy with wife, worries and distress in the daily occupation, overcomes enemies, gets his work done with great difficulty, unhappy in sexual life and domestic work, physically weak",
            },
        },
        Mercury: {
            1: {
                hindi: "बहन-भाई मिलनसार होते हैं, नाना पक्ष से सहायता प्राप्त होती है, शत्रुओं पर विजय प्राप्त होती है, विवादों और बाधाओं से पार पाने में सक्षम होते हैं, चतुराई से अपना कार्य संपन्न करते हैं, पत्नी और परिवार से सहयोग प्राप्त होता है, योजना और उद्योग से अपने कार्य की स्थिति में सुधार करते हैं।",
                english:
                    "Sisters and brothers are friendly, gets help from maternal grandfather's side, overcomes enemies, able to get over disputes and hindrances, gets his work done cleverly, support from wife and family, improves his working conditions with planning and industry",
            },
            2: {
                hindi: "धन कमाने वाला, बुद्धिमान, परिवार से मिले-जुले संबंध रखने वाला, भाई-बहनों से अच्छा सहयोग न पाने वाला, महत्वाकांक्षी, अधिक कमाने की चाह रखने वाला",
                english:
                    "Earns wealth, is intelligent, has mixed relations with family, does not get good support from brothers and sisters, ambitious, wants to earn more",
            },
            3: {
                hindi: "बुद्धिमान और पूर्णतावादी, भाई-बहनों से अधिक सहयोग नहीं मिलता, कड़ी मेहनत से धन में वृद्धि होती है, प्रभावशाली होता है और शत्रुओं पर विजय प्राप्त करता है",
                english:
                    "Intelligent and perfectionist, not much support from brothers and sisters, improves wealth by hard work, is influential and conquers over enemies",
            },
            4: {
                hindi: "ऊर्जावान और मेहनती, भाई-बहनों से बाधा, नाना-नानी से सुख, माता से नापसंद, संपत्ति में समस्या, बेचैन, शत्रुओं पर विजय, व्यवसाय में लाभ, राज्य और समाज से सम्मान",
                english:
                    "Energetic and industrious, faces hindrances from brothers and sisters, happiness from maternal grandfather, dislikes mother, problems in the property, restless, wins over the enemies, gains from occupation, honour from state and society",
            },
            5: {
                hindi: "बहुत सावधान और विवेकशील, चतुर, बच्चों से खुश, दुश्मनों पर विजय पाने वाला, अच्छा धन कमाने वाला",
                english:
                    "Very careful and judicious, clever, happy with children, conquers enemies, earns good wealth",
            },
            6: {
                hindi: "प्रभावशाली, भाइयों से शत्रुता, नाना से सहायता, शत्रुओं पर विजय, व्यय के प्रति लापरवाह, बुद्धि के कारण प्रतिष्ठित, बहुत परिश्रमी, साहसी एवं वीर होता है।",
                english:
                    "Influential, enmity with brothers, help from maternal grandfather, wins over enemies, careless about expenditure, dignified due to intelligence, is very industrious, courageous and brave",
            },
            7: {
                hindi: "कठोर परिश्रम करना पड़ता है, व्यवसाय में समस्याएँ होती हैं, फिर भी उन्नति होती है, पत्नी से बहुत खुश नहीं रहता, यौन सुख भोगता है, घरेलू और सांसारिक मामलों में उन्नति करता है, नाना से सहायता प्राप्त करता है",
                english:
                    "Has to work hard, problems in occupation, yet he progresses, not very happy with wife, enjoys sexual pleasures, advances in domestic and worldly affairs, receives help from maternal grandfather",
            },
            8: {
                hindi: "आर्थिक रूप से कमजोर, नाना की ऊर्जा, भाई-बहनों से बहुत खुश नहीं, अपना काम निकलवाने में चतुर, गुप्त शक्तियों में विश्वास, धन प्राप्ति के लिए कठोर परिश्रम, पेट की समस्याओं से ग्रस्त, दैनिक दिनचर्या में चिंतित, शत्रु का साहसपूर्वक सामना करने वाला",
                english:
                    "Weakness in finances, energies from maternal grandfather, not very happy with brothers and sisters, clever in getting his work done, has faith in occult power, works hard for getting wealth, suffers from stomach problems, worried in daily routine, faces the enemy with courage",
            },
            9: {
                hindi: "उद्योग से सफलता, प्रसिद्धि और शक्ति प्राप्त करना, धर्म में दृढ़ विश्वास न होना, भाई-बहनों से सहायता न मिलना, अपनी भलाई के लिए सही और गलत दृष्टिकोण का निर्णय न कर पाना",
                english:
                    "Success through industry, gets fame and power, not a strong believer in Dharma, help from brothers and sisters, cannot decide about the right and wrong approach for his betterment",
            },
            10: {
                hindi: "विवेकशील, भाई-बहनों से सहायता, पिता से सहायता, अपने परिश्रम से सरकार और समाज में सम्मान और शक्ति प्राप्त करता है, उद्योग में उन्नति करता है",
                english:
                    "Discriminative, help from brothers and sisters, help from father, gets honour and power in government and society due to his hard labour, improvement in industry",
            },
            11: {
                hindi: "भाई-बहनों से लाभ, धन अर्जित करता है, अधिक आय के लिए कड़ी मेहनत करता है, शिक्षा में लाभ, अच्छा वक्ता और चतुर होता है।",
                english:
                    "Gains from brothers and sisters, earns wealth, works hard for more income, gains in education, good speaker and clever",
            },
            12: {
                hindi: "भाई-बहन के स्नेह का अभाव, हानि, व्यय पर नियंत्रण, शत्रुओं से सहायता, गुप्त शक्ति, बढ़ते व्यय से चिंतित और कंजूस",
                english:
                    "Lacks brotherly and sisterly affection, losses keep the expenditure under control, help through enemies, has occult power, worried about growing expenditure and is miserly",
            },
        },
        Jupiter: {
            1: {
                hindi: "सुन्दर, भाग्यशाली और सम्मानित, उचित तरीके से खर्च करने वाला, अच्छा स्वास्थ्य रखने वाला, धार्मिक, संतान वाला, सुशिक्षित, पारिवारिक सुखी, व्यवसाय में सफल, दूरदर्शिता वाला और दयालु।",
                english:
                    "Handsome, fortunate and honoured, spending in a right way, maintains good health, religious, has children, well-educated, domestic happiness, successful in occupations, good forethought and kind-hearted",
            },
            2: {
                hindi: "भाग्यशाली, अच्छा धन अर्जित करता है, ईश्वरीय सहायता प्राप्त करता है, संचित धन में थोड़ी कमी होती है, व्यय पर नियंत्रण रखता है, कभी-कभी अधिक खर्च करता है, धार्मिक दृष्टिकोण रखता है, शत्रुओं पर विजय प्राप्त करता है, दैनिक दिनचर्या से प्रसन्न रहता है",
                english:
                    "Fortunate, earns good wealth, Divine help, slight loss in accumulated wealth, controls expenditure, sometimes spends more, religious in outlook, conquers enemies, feels happy with daily routine",
            },
            3: {
                hindi: "भाग्यशाली, व्यय पर नियंत्रण रखने वाला, भाई-बहनों की सहायता करने वाला, परिश्रमी, व्यवसाय में सफल, पारिवारिक सुख का आनंद लेने वाला",
                english:
                    "Fortunate, controls the expenditure, brothers and sisters are helpful, works hard, successful in occupation, enjoys family happiness",
            },
            4: {
                hindi: "मकान से सुख और लाभ, सौभाग्यशाली, दिखावटी और धार्मिक, माता की ओर से सुख, पिता से सुख न मिलने वाला और भाग्यशाली होता है।",
                english:
                    "Happiness through houses and gains, has good luck, is showy and religious, pleasures from the side ofmother, gets no happiness from father and is fortunate",
            },
            5: {
                hindi: "भाग्यशाली, बुद्धिमान, अच्छी शिक्षा प्राप्त, धर्मशास्त्र पर पकड़, अच्छा वक्ता, संतान से सुख, सम्मान प्राप्त",
                english:
                    "Fortunate, intelligent and gets good education, has command over dharmashastra, good orator, happiness through children, gets honour",
            },
            6: {
                hindi: "भाग्यहीन, अधार्मिक, यशहीन, व्यय का प्रबंधन करने वाला, बड़े-बड़े विवादों को झेलने वाला तथा विजयी, कर्तव्यनिष्ठ पुत्र नहीं, सरकार तथा समाज से शत्रुता रखने वाला, शत्रुओं को वश में करने में चतुर, बुद्धि से काम लेने वाला तथा चतुर होता है।",
                english:
                    "Not very fortunate, irreligious, loss of fame, manages expenditure, bears great disputes and wins, not a dutiful son, enmity with government and society, clever in controlling enemies, works with wisdom and is clever",
            },
            7: {
                hindi: "दैनिक जीवन में सफल, घरेलू जीवन में सुखी, प्रतिष्ठित पत्नी, विनम्रतापूर्वक खर्च, ईश्वर में आस्था, सफल, ऊर्जावान, धार्मिक दृष्टिकोण",
                english:
                    "Successful in daily life, happiness in domestic life, gets a dignified wife, spends humbly, has faith in God and is successful, works energetically, dharmic in outlook",
            },
            8: {
                hindi: "अशुभ और अधार्मिक, दीर्घायु, भाग्य से अप्रियता",
                english:
                    "Unlucky and irreligious, has a long life, unpleasantness from destiny",
            },
            9: {
                hindi: "भाग्यशाली और अपने कार्यों में अच्छी सफलता पाने वाला, ईश्वरीय सहायता प्राप्त, अच्छी बुद्धि और शिक्षा वाला, संतान से सुखी, भाई-बहनों का सहयोग पाने वाला, धार्मिक दृष्टिकोण वाला",
                english:
                    "Fortunate and gets good success in his activities, has Divine help, good intellect and education, happy with children, gets the cooperation of brothers and sisters, religious in outlook",
            },
            10: {
                hindi: "व्यापार में सफलता मिलती है, लेकिन समाज व सरकार में विशेष महत्व नहीं मिलता, सम्मानजनक व्यय होता है, सुख-शांति मिलती है, ईश्वरीय सहायता मिलती है",
                english:
                    "Successful in business but does not get special importance in society and government, honourable spending, gets peace and happiness, Divine help",
            },
            11: {
                hindi: "भाग्य की सहायता से लाभ, कार्यों में सहायता, भाई-बहनों से सहयोग, व्यवसाय में सफलता, यौन सुख, शिक्षा और भाषण में सफलता",
                english:
                    "Gets gains with the help of destiny, gets help in his activities, cooperation from brothers and sisters, successful in occupation, enjoys sexual pleasures, success in education and speeches",
            },
            12: {
                hindi: "धार्मिक दृष्टिकोण वाला, परन्तु बहुत भाग्यशाली नहीं, अधिक खर्च करने वाला, परन्तु साथ ही व्यय पर नियंत्रण रखने वाला, कुछ हानि होने वाला, धार्मिक कार्यों पर व्यय करने वाला, प्रतिष्ठित, शत्रुओं से सावधान।",
                english:
                    "Religious in outlook, but not very fortunate, spends much but at the same time controls the expenditure, some losses, spends for religious works, dignified, careful from enemies",
            },
        },
        Venus: {
            1: {
                hindi: "अच्छा पेशा, धनवान, सुन्दर पत्नी और अच्छे यौन सुखों का आनंद लेने वाला, कलात्मक और चतुर, अच्छा परिवार, सांसारिक मामलों में बहुत सक्षम और सफल, घरेलू जीवन का आनंद लेने वाला, कुशल और सम्माननीय",
                english:
                    "Has a good profession, earns wealth, possesses beautiful wife and enjoys good sexual pleasures, artistic and clever, good family, very able and successful in worldly affairs, enjoy the domestic life, skilful and honourable",
            },
            2: {
                hindi: "अच्छा धन, बड़ा परिवार, विभिन्न व्यवसाय, अच्छा धन संचय, पत्नी से सुख और यौन सुखों का आनंद, मान-सम्मान प्राप्त होता है।",
                english:
                    "Gets good wealth, large family, undertakes different professions, accumulates good wealth, happy with wife and enjoys sexual pleasures, gets honour and respect",
            },
            3: {
                hindi: "अपनी चतुराई से प्रचुर धन अर्जित करता है, अच्छे पद पर आसीन होता है, उसके अनेक सहायक भाई-बहन होते हैं, प्रभावशाली एवं सुन्दर पत्नी होती है, धार्मिक होता है, अच्छे यौन सुखों का आनंद उठाता है, कर्तव्य एवं धर्म के प्रति सजग रहता है, अपने भाग्य को सुधारने के लिए विभिन्न प्रयास करता है, प्रतिष्ठित, प्रभावशाली एवं सुन्दर व्यक्ति होता है, घरेलू एवं सांसारिक मामलों में आनंद लेता है।",
                english:
                    "Earns huge wealth through his cleverness, occupies good position, has many helpful brothers and sisters, has influential and good- looking wife, religious, enjoys good sexual pleasures, careful about duty and religion, does different efforts to improve his lot, a man of prestige and is influential and handsome, enjoys domestic and worldly affairs",
            },
            4: {
                hindi: "सुखी और धनवान, अच्छी पत्नी, माता का स्नेह, अच्छे पद पर आसीन, सरकार और समाज में सम्मान, पिता सहायक, सांसारिक सुखों का आनंद लेने वाला और व्यवहार में चतुर होता है।",
                english:
                    "Happy and wealthy, gets a good wife, has affection from mother, occupies good position, gets honour in government and society, father helpful, enjoys worldly pleasures and is clever in approach",
            },
            5: {
                hindi: "अच्छा व्यवसाय, धन कमाने वाला, परिवार और पत्नी से अधिक सुख न पाने वाला, कामुक विचारों में लिप्त, मानसिक रूप से चिंतित, बच्चों से थका हुआ, अच्छा वार्ताकार और शिक्षित",
                english:
                    "Has good occupation, earns wealth, not much happiness from family and wife, indulges in sexual thoughts, mentally worried, tired with children, good conversationalist and educated",
            },
            6: {
                hindi: "धन की चिंता, कुटुम्ब की हानि, पत्नी से दुःखी, यौन सुख से दुःखी, कठोर परिश्रम करना पड़ता है, दादा पक्ष से सुखी नहीं, अधिक व्यय करने वाला, अपना कार्य विनम्रता से करने वाला, नीतियों में गुप्त रहने वाला, अस्वस्थता से ग्रस्त, उधार लेकर व्यय करने वाला।",
                english:
                    "Anxiety on the part of wealth, gets loss of family, unhappy with wife, sexually unhappy, has to work hard, not happy on the side of grandfather, spends much, does his own work politely, secretive in his policies and suffers from ill-health, does the business ofborrowing and spending",
            },
            7: {
                hindi: "बहुत धन कमाता है और अच्छे पद पर होता है, सुंदर पत्नी और अमीर ससुर पाता है, पारिवारिक बंधन अच्छा होता है, यौन सुखों का भरपूर आनंद उठाता है, कमाने में चतुर होता है, बहुत सम्मानित और प्रतिष्ठित होता है, दिखने में सुंदर होता है।",
                english:
                    "Earns much wealth and occupies good position, gets a beautiful wife and a rich father-in-law, has good family bondage, enjoys sexual pleasures to the most, clever in earning, much respected and honoured, handsome in appearance",
            },
            8: {
                hindi: "स्वास्थ्य कमजोर और धन हानि, विदेशी सहयोग से सफलता, पत्नी और परिवार से असंतुष्ट, यौन सुख में कमी, गुप्त रूप से कामुक",
                english:
                    "Weak in health and loses wealth, gets success through foreign collaboration, unhappy with wife and also with family, deficient in sexual pleasures, secretly passionate",
            },
            9: {
                hindi: "बहुत भाग्यशाली और चतुर, पत्नी और परिवार से सुख पाने वाला, धन कमाने वाला, धर्म का पालन करने वाला, वीर और साहसी होता है",
                english:
                    "Very fortunate and clever, gets happiness from wife and family, earns wealth, follows Dharma, is brave and courageous",
            },
            10: {
                hindi: "पिता से लाभ, माता के घर में सुख और ज़मीन-जायदाद मिलती है, बहुत धनवान, प्रसिद्ध और बुद्धिमान होता है।",
                english:
                    "Gets advantage from father, happiness in the house ofmother and landed property, is very rich, famous and wise",
            },
            11: {
                hindi: "बहुत धन कमाता है और पेशेवर रूप से अच्छा पद प्राप्त करता है, पत्नी से लाभ प्राप्त करता है, अच्छे यौन संबंधों का आनंद लेता है, बच्चों और शिक्षा के संबंध में थोड़ा नाखुश रहता है।",
                english:
                    "Earns much wealth and occupies a good position professionally, gains from wife, enjoys good sexual affairs, a little unhappy with regard to children and also in education",
            },
            12: {
                hindi: "अधिक व्यय करता है तथा धन, परिवार और सगे-संबंधियों को खो देता है, पत्नी से अप्रसन्न रहता है, व्यवसाय में उन्नति करता है, यौन सुखों पर अधिक व्यय करता है, शत्रुओं से भयभीत रहता है, झगड़ालू होता है तथा नाना से अप्रसन्न रहता है।",
                english:
                    "Spends much and loses wealth, family and kinsmen, unhappy with wife, improves the occupation, spends much for sexual pleasures, fear from enemies, is quarrelsome and unhappy with maternal grandfather",
            },
        },
        Saturn: {
            1: {
                hindi: "दिखने में आकर्षक नहीं, पिता से सुख नहीं, आश्रित, धन के लिए कड़ी मेहनत करनी पड़ती है, बहुत मेहनती और ऊर्जावान, पत्नी को विशेष महत्व देने वाला और थोड़ा आलसी",
                english:
                    "Not attractive in appearance, no happiness from father, is dependent, has to work hard for money, is very industrious and energetic, gives special importance to wife and is a bit lazy",
            },
            2: {
                hindi: "अच्छी कमाई होती है, सरकार और समाज से लाभ मिलता है, माता से स्नेह नहीं मिलता, दैनिक जीवन में बेचैन रहता है, धन बढ़ाने के लिए कड़ी मेहनत करता है",
                english:
                    "Earns well, gains from government and society, does not get affection from mother, is restless in daily life, works hard to increase wealth",
            },
            3: {
                hindi: "ऊर्जावान और पराक्रमी, भाई-बहनों से शिक्षा और सहायता प्राप्त करने वाला, सरकार और समाज से सम्मान पाने वाला, अधिक खर्च करने वाला, संतान से दुखी, धर्म के प्रति उदासीन और अभिमानी होता है।",
                english:
                    "Is energetic and valorous, gets education and help from brothers and sisters, gets honour from government and society, spends much, unhappy with children, is insipid about religion and is proud",
            },
            4: {
                hindi: "पिता से सुख, सरकार और समाज से सहायता, माता से अधिक स्नेह नहीं, शत्रुओं से कष्ट, थोड़ा लापरवाह और बहुत अधिक परिश्रम करना पड़ता है।",
                english:
                    "Happiness from father, help from government and society, not much affection from mother, suffers from enemies, a bit careless and has to work very hard",
            },
            5: {
                hindi: "पिता से अधिक सुख नहीं, शिक्षा और बुद्धि से लाभ, व्यवसाय में उन्नति के लिए कठोर परिश्रम, यौन सुख प्राप्ति के लिए प्रसन्नतापूर्वक कार्य, पत्नी को महत्व, सामाजिक कार्यों के लिए कठोर परिश्रम, बच्चों से खुश नहीं",
                english:
                    "Not much happiness from father, gains through education and intellect, works hard to progress in the occupation, works with joy to gain sexual pleasures, gives importance to wife, works hard for social activities, not happy with children",
            },
            6: {
                hindi: "पिता से खुश नहीं, जीवन की दिनचर्या से चिंतित, शत्रुओं से कोई परेशानी नहीं, कमाई में असुरक्षित महसूस करते हैं, नियंत्रण से बाहर कारणों से भारी खर्च, भाई-बहनों से कुछ मदद",
                english:
                    "Not happy with father, worried about the daily routine of life, no problem with enemies, feels insecure in earnings, heavy expenditure due to reasons beyond control, some help from brothers and sisters",
            },
            7: {
                hindi: "अच्छा व्यापार करता है, कमाई के लिए कड़ी मेहनत करता है, बेचैन रहता है, यौन सुख का आनंद लेता है, घमंडी होता है",
                english:
                    "Does good business, has to work hard for earnings, feels restless, enjoys sexual pleasures, is proud",
            },
            8: {
                hindi: "पिता की चिंता, अकेले रहना, विदेशी सहयोग से लाभ पाने के लिए कठोर परिश्रम, बड़ी हठ और योग्यता से काम करना, बौद्धिक रूप से चिंतित, संतान और शिक्षा से सुख न मिलना, अभिमानी",
                english:
                    "Worried about father, lives alone, works hard to get gain from foreign collaboration, works with great obstinacy and ability, intellectually worried, no happiness from children and education, arrogant",
            },
            9: {
                hindi: "भाग्य भाव से भारी लाभ, नियमित निश्चित आय, भाग्यशाली, धार्मिक, शत्रु रहित, परेशानियों और बाधाओं पर विजय",
                english:
                    "Gains heavily by the house ofdestiny, gets the regular fixed income, fortunate, religious, no enemies, wins over the troubles and hindrances",
            },
            10: {
                hindi: "बड़ा व्यवसाय करता है, अच्छी आय होती है, सरकार और समाज से सहायता मिलती है, खूब खर्च करता है, यौन सुख भोगता है, उन्नति के लिए परिश्रमी कार्य करता है और आत्म-गौरवशाली होता है।",
                english:
                    "Conducts big business, good income, help from government and society spends lavishly, enjoys sexual pleasures, does industrious actions to progress and has self-pride",
            },
            11: {
                hindi: "पक्की आय प्राप्त करता है, सम्माननीय कार्य करता है, सरकार और समाज से सहायता प्राप्त करता है, अपनी सुख-सुविधाओं की परवाह न करते हुए भी कठोर परिश्रम करता है, जीवन की दैनिक दिनचर्या में बौद्धिक रूप से चिंतित रहता है।",
                english:
                    "Gets firm income, does honourable deeds, gets help from government and society, works very hard even not caring for his comforts, intellectually worried in the daily routine of life",
            },
            12: {
                hindi: "पिता के कारण हानि, अनेक प्रकार से धन व्यय, धन वृद्धि के लिए कठोर परिश्रम, धर्म की रक्षा के लिए नाना प्रकार के कर्म तथा शत्रुओं के घर में प्रभाव बनाए रखना।",
                english:
                    "Loss through father, spends much money in many ways, works hard to increase the wealth, does various kinds ofdeeds to rear Dharma and keep influence in the house of enemies",
            },
        },
        Rahu: {
            1: {
                hindi: "बीमार महसूस करता है और चेहरा रोगग्रस्त होता है, साहसी होता है, लोकप्रिय होता है, अनधिकृत प्रयास करता है, गुप्त रहता है, विपत्तियों का बहादुरी से सामना करता है",
                english:
                    "Feels sickly and has a diseased face, courageous, becomes popular, makes unauthorised efforts, secretive, faces the calamities bravely",
            },
            2: {
                hindi: "धन की हानि और परिवार से अलगाव, धन कमाने में चतुर, धन प्राप्ति के लिए गुप्त रूप से अनाधिकृत प्रयास, घरेलू समस्याओं और पारिवारिक कलह का सामना, साहसी, बेचैनी महसूस करने वाला",
                english:
                    "Loss ofwealth and separation from family, clever in earning wealth, makes unauthorised efforts secretly to get wealth, faces domestic problems and family bickering, courageous, feels restlessness",
            },
            3: {
                hindi: "धन कमाने के लिए साहसी और कड़ी मेहनत करने वाला, भाई-बहनों को नियंत्रित करने वाला, किसी भी प्रकार का भय न रखने वाला, दूसरों पर दबाव डालने वाला और प्रभावशाली होता है",
                english:
                    "Has courage and works hard to earn wealth, controls brothers and sisters, no fear ofany kind, exerts pressure on others and is influential",
            },
            4: {
                hindi: "माँ को खो देता है, दुखी और शांति खो देता है, संपत्ति और ज़मीन खो देता है, मानसिक तनाव झेलता है, दूसरों को आश्चर्यचकित करता है",
                english:
                    "Loses mother, unhappy and loses peace, loses property and lands, bears mental stress, makes others astonish",
            },
            5: {
                hindi: "अच्छी शिक्षा न मिलना, बच्चों से नाखुश रहना, मानसिक रूप से परेशान रहना, चिड़चिड़ा और कठोर वाणी वाला होना, दूसरों को समझ न पाना",
                english:
                    "Does not get good education, unhappy with children, is mentally worried, peevish and with harsh speech, cannot understand others",
            },
            6: {
                hindi: "कमाई पर काबू पाने वाला, सभी प्रकार की कठिनाइयों और परेशानियों पर विजय पाने वाला, स्वार्थी, नाना की ओर से बाधाओं का सामना करने वाला",
                english:
                    "Overcomes the earnings, has upper hand over all types ofdifficulties and troubles, selfish, faces hindrances from the side of maternal grandfather",
            },
            7: {
                hindi: "पत्नी से परेशानी, घर का प्रबंधन बड़ी कठिनाई से करना, कठिनाइयों और समस्याओं से गुजरने के बाद व्यवसाय में सफलता, यौन असंतोष, सांसारिक मामलों से अनधिकृत लाभ",
                english:
                    "Problem with wife, manages the house with great difficulty, success in the occupation after undergoing difficulties and problems, sexual dissatisfaction, unauthorised gains from worldly affairs",
            },
            8: {
                hindi: "दैनिक जीवन में चिंताएं, आजीविका में हानि, उदर में आंतरिक रोग, कटु नीति वाला व्यक्ति",
                english:
                    "Gets worries in daily life, loss in livelihood, gets internal diseases in the abdomen, a man of bitter policies",
            },
            9: {
                hindi: "दुःखी रहता है, भाग्य की प्रगति के सम्बन्ध में अत्यधिक चिन्ता और घबराहट का सामना करता है, गुप्त रूप से अनेक अनुचित योजनाएँ बनाता है, धर्म में भारी हानि उठाता है, अधार्मिक, बदनाम और बेचैन रहता है।",
                english:
                    "Feels unhappy, has to face great anxieties and nervousness in connection with the progress of destiny, uses many improper schemes secretly, meets heavy losses in Dharma, irreligious, defamed and restless",
            },
            10: {
                hindi: "पिता से खुश नहीं रहता, उन्नति, व्यापार और व्यवसाय में बाधा आती है, अपने कार्य करवाने की शक्ति अव्यक्त रहती है, बहुत प्रयास के बाद सफलता मिलती है।",
                english:
                    "Not happy with father, faces hindrances in the way of progress, business and occupation, has latent power to get his work done, gets success after great efforts",
            },
            11: {
                hindi: "भारी लाभ कमाता है, आय और संपत्ति अर्जित करता है, अपने लक्ष्यों को प्राप्त करने के लिए गुप्त (कभी-कभी अनधिकृत) तरीके अपनाता है",
                english:
                    "Gains heavily, gets income and wealth, has secret (sometimes unauthorised) methods to achieve his ends",
            },
            12: {
                hindi: "खर्च करने में अप्रसन्न, बाहरी लोगों से शत्रुता, घोर कठिनाइयों का सामना करने पर भी कभी घबराना नहीं, अंततः व्यय पर नियंत्रण करने में सफल होना",
                english:
                    "Unhappy in spending, enmity with outsiders, never feels nervous even when he has to face grave difficulties, finally succeeds in controlling expenditure",
            },
        },
        Ketu: {
            1: {
                hindi: "बेचैनी महसूस करता है और शरीर में कमजोरी महसूस करता है, दर्द का कोई घातक दौरा पड़ सकता है, अच्छा धैर्य रखता है, दूसरों के दबाव में नहीं आता, जल्दबाज और जिद्दी होता है, आत्मविश्वास की कमी होती है",
                english:
                    "Feels restless and is weak in body, may experience some fatal stroke of pain, has good patience, not under pressure from others, rash and obstinate, lacks self-confidence",
            },
            2: {
                hindi: "धन की हानि और धन की कमी महसूस होना, पारिवारिक दुःख का अनुभव होना",
                english:
                    "Loss in wealth and feels shortage of money, experiences family unhappiness",
            },
            3: {
                hindi: "भाई-बहनों से अप्रसन्नता और शत्रुता, दुर्बल, अनुचित तरीकों का अनुसरण करने वाला, आत्मविश्वास न खोने वाला, अपने स्वार्थ की पूर्ति करने वाला प्रतीत होता है",
                english:
                    "Unhappiness and enmity with brothers and sisters, weak, follows improper methods, does not lose self-confidence, seems to serve his selfish motives",
            },
            4: {
                hindi: "मातृ स्नेह का अभाव, परिवार से अलगाव, अचल संपत्ति, भूमि और भवन में हानि, बेचैनी और दुःख, अपने घर में भयंकर विपत्तियाँ झेलना और अंततः लाभ और सुख प्राप्त करने में सफल होना।",
                english:
                    "Lacks motherly affection, gets separated from family, finds losses in immovable properties, lands and buildings, feels restless and unhappy, has to bear grave calamities in his own place and finally succeeds in achieving gains and pleasures",
            },
            5: {
                hindi: "बच्चों से नाखुश, शिक्षा में कमी, दूसरों को अपने विचार और बातें समझाने में असमर्थ, गुप्तचर",
                english:
                    "Unhappy with children, deficient in education, unable to make others understand his ideas and words, is secretive",
            },
            6: {
                hindi: "शत्रुओं पर विजय पाने वाला, वीर, नाना से कम स्नेह पाने वाला, अचानक शत्रुओं का सामना करने वाला तथा अंततः उन पर विजय पाने वाला, पाप करने वाला",
                english:
                    "Conquers enemies, is brave, gets less affection from the maternal grandfather, has to face sudden enemies and finally succeeds over them, commits sins",
            },
            7: {
                hindi: "पत्नी को खो देता है या उससे कामुक और यौन रूप से नाखुश रहता है, व्यवसाय में समस्याएं आती हैं, फिर भी सावधानी से सब कुछ का सामना करता है और अंततः सफलता प्राप्त करता है",
                english:
                    "Loses wife or is sensually and sexually unhappy with her, finds problems in occupation, however faces everything with care and finally gets success",
            },
            8: {
                hindi: "पीठ और पेट के निचले हिस्से में कमजोरी महसूस होती है, दिनचर्या में लापरवाही, उम्र के कारण कुछ परेशानी, बहुत घमंडी और आजीविका के घर में सहयोग करने वाला, कड़ी मेहनत करनी पड़ती है, अंत में कुछ प्रसिद्धि और प्रभाव प्राप्त होता है।",
                english:
                    "Feels weakness in the back and lower part of stomach, careless in daily routine, some problem due to age, has great pride and creates cooperation in the house oflivelihood, has to work hard, at the end gets some fame and influence",
            },
            9: {
                hindi: "भाग्य की उन्नति के लिए कठोर परिश्रम करता है, कुछ गुप्त स्थानों के प्रयोगों से उन्नति करता है, अधार्मिक है, किन्तु धर्म को दोष नहीं देता।",
                english:
                    "Works hard for the progress ofdestiny, progress through experiments of some hidden places, irreligious but does not blame Dharma",
            },
            10: {
                hindi: "पैतृक स्रोतों से कुछ कष्ट, हानि व कमी, व्यवसाय में सुख न मिलना, अत्यधिक परिश्रम के बाद सफलता, मान-सम्मान की हानि, साहसपूर्वक कार्य करना।",
                english:
                    "Gets some distress, loss and deficiency from paternal sources, not happy in occupation, success after great hard work, loss of honour and respect, works bravely",
            },
            11: {
                hindi: "बहुत अधिक लाभ प्राप्त करता है और अधिक लाभ प्राप्त करने के लिए अधिक प्रयास करता है, हमेशा लाभ प्राप्त करने की कोशिश में लगा रहता है, कमाई में थोड़ा उतावला, स्वार्थी",
                english:
                    "Gains heavily and makes more efforts to gain more, always engaged in trying to get gains, a bit rash in earnings, selfish",
            },
            12: {
                hindi: "बहुत खर्च करता है और खर्च को लेकर चिंतित रहता है, दृढ़ निश्चय के साथ काम करता है, किसी तरह खर्च का प्रबंध करता है और कभी-कभी कठिनाई का अनुभव करता है",
                english:
                    "Spends much and is worried over expenditure, works with determination, somehow manages the expenditure and at times finds difficulty",
            },
        },
    },
    Taurus: {
        Sun: {
            1: {
                hindi: "कुछ ज़मीन-जायदाद मिलती है और व्यवसाय से भी सुख मिलता है, पत्नी और परिवार से भी सुख मिलता है, और यौन सुख भी मिलता है",
                english:
                    "Gets some landed property and also happiness through occupation, happiness through wife and family, and also sexual pleasures",
            },
            2: {
                hindi: "धन, भूमि, माता से संबंधित कुछ बंधन, परिवार का सुख और भवनों के माध्यम से भी सुख प्राप्त होता है।",
                english:
                    "Enjoys wealth, land, some bondage in connection with mother, happiness of family and also through buildings",
            },
            3: {
                hindi: "भाई-बहनों से प्रभावशाली सुख मिलता है, भवन-संपत्ति का सुख मिलता है, माता से सहायता मिलती है, किन्तु अधार्मिक होता है।",
                english:
                    "Gets the influential happiness from brothers and sisters, gets happiness of buildings and property, help from mother, but is irreligious",
            },
            4: {
                hindi: "जमीन-जायदाद मिलती है, मां से सुख मिलता है, पिता से ज्यादा मदद नहीं मिलती, सरकार से संपर्क होता है और अपने घर में सुखी महसूस करते हैं",
                english:
                    "Gets land and property, happiness from mother, not much help from father, contacts with government and feels happy in his own house",
            },
            5: {
                hindi: "बच्चों के माध्यम से शिक्षा और ज्ञान, खुशी प्राप्त करता है, बुद्धिमान होता है",
                english:
                    "Gets education and wisdom, happiness through children, is intelligent",
            },
            6: {
                hindi: "विरोध का सामना करना पड़ता है और माता से वियोग भी होता है, भूमि और संपत्ति का नुकसान होता है, शत्रुओं से चिंता होती है, बेचैनी महसूस होती है और साहस खो देता है",
                english:
                    "Faces opposition and also separation from mother, loses lands and property, worry from enemies, feels restless and loses courage",
            },
            7: {
                hindi: "माता से, परिवार से, पत्नी से सुख मिलता है, कुछ शारीरिक दुःख मिलता है",
                english:
                    "Happiness from mother and from family and also wife, gets some bodily unhappiness",
            },
            8: {
                hindi: "माता को बेचैनी और कष्ट, देश छोड़ना, प्रभावशाली मित्र बनाना, विदेश में जमीन प्राप्त करना, धन वृद्धि के लिए कार्य करना",
                english:
                    "Restlessness and distress with mother, leaves the country, gets influential friends and also lands at foreign places, works for the increase of wealth",
            },
            9: {
                hindi: "माता से सुख, भूमि-भवन की प्राप्ति, धार्मिक, भाई-बहनों से कुछ सुख, सौभाग्यशाली होता है।",
                english:
                    "Happiness from mother and gain of lands and buildings, becomes dharmic, some happiness from brothers and sisters, and is fortunate",
            },
            10: {
                hindi: "माता से सुख तथा पिता से शत्रुता, भूमि-भवन का सुख मिलता है, समाज व सरकार से कुछ मान्यता मिलती है, व्यवसाय में सुख मिलता है, कुछ आलस्य के कारण हानि होती है",
                english:
                    "Happiness from mother and enmity with father, gets the happiness of lands and buildings, some recognition from society and government, happiness in occupation, loss due to some laziness",
            },
            11: {
                hindi: "माता से लाभ, भूमि और भवन प्राप्त होते हैं, कुछ आय भी होती है, शिक्षा और बच्चों से सहायता मिलती है, बहुत चतुर और धैर्यवान होता है",
                english:
                    "Gains from mother, gets lands and buildings, gets some income also, help from education and children, is very clever and has patience",
            },
            12: {
                hindi: "अधिक व्यय, दूसरों से सुख, भवन व संपत्ति से हानि, शत्रुओं से भय, अधिक व्यय से बेचैनी",
                english:
                    "Spends much, happiness from others, loss due to building and property, fear from enemies, restless due to heavy expenditure",
            },
        },
        Moon: {
            1: {
                hindi: "भाई-बहनों से सहायता, साहसी एवं महत्वाकांक्षी, पत्नी से थोड़ा नाखुश, व्यवसाय से भी, तथा यौन सुखों में भी, घरेलू मामलों में बेचैनी महसूस करता है।",
                english:
                    "Help from brothers and sisters, courageous and ambitious, little unhappy with wife and also with profession and also in sexual pleasures, feels restless in domestic affairs",
            },
            2: {
                hindi: "धन संचय करता है, भाई-बहनों से प्रसन्न रहता है, शारीरिक शक्ति में कमजोर महसूस करता है, करियर के माध्यम से दैनिक जीवन में लाभ प्राप्त करता है, बहुत परिश्रम करता है",
                english:
                    "Accumulates wealth, happy with brothers and sisters, feels weak in physical strength, gains in the daily life through career, puts lot of labour",
            },
            3: {
                hindi: "मेहनती काम करता है, भाई-बहनों से बहुत अच्छा सहयोग पाता है, परिश्रमी, मानसिक लाभ प्राप्त करता है, ईश्वर में विश्वास रखता है, धैर्यवान होता है",
                english:
                    "Does industrious work, gets very good cooperation from brothers and sisters, hard-working, mental gains, believes in God, has patience",
            },
            4: {
                hindi: "भाई-बहनों से सुख, भूमि-भवन की प्राप्ति, दूसरों से सहायता, पिता से मधुर संबंध न होना, उद्यमशीलता एवं सुख",
                english:
                    "Happiness through brothers and sisters, gets lands and buildings, help from others, not cordial relations with father, enterprise and happiness",
            },
            5: {
                hindi: "अच्छी शिक्षा प्राप्त करता है, भाई-बहनों और बच्चों से सहायता प्राप्त करता है, अच्छा वक्ता होता है",
                english:
                    "Gets good education, help from brothers and sisters and children, a good conversationalist",
            },
            6: {
                hindi: "भाई-बहनों से मतभेद, थकावट महसूस होना, शत्रुओं के घर में बल मिलना",
                english:
                    "Differences with brothers and sisters, feels exhausted, gets strength in the house of enemies",
            },
            7: {
                hindi: "पत्नी से बहुत खुश नहीं, भाई-बहनों से ज्यादा मदद नहीं, नौकरी में खुश नहीं और यौन सुख में भी खुश नहीं",
                english:
                    "Not very happy with wife, not much help from brothers and sisters, not happy in occupation and also in sexual pleasure",
            },
            8: {
                hindi: "भाई-बहनों से वियोग, जीवन की दिनचर्या में स्वयं को मजबूत महसूस करना, धन प्राप्ति के लिए प्रयास करना, विदेशों से संपर्क, गुप्त विद्याओं में रुचि दिखाना",
                english:
                    "Separation from brothers and sisters, feels strong in daily routine of life, makes efforts to get wealth, contacts with foreign countries, shows interest in occult studies",
            },
            9: {
                hindi: "भाग्य से अनुग्रह प्राप्त होता है, भाई-बहनों का अच्छा मिलन होता है, स्वभाव से धार्मिक होता है, ईश्वर में विश्वास रखता है और प्रसन्न रहता है।",
                english:
                    "Gets favour through destiny, gets the good union ofbrothers and sisters, dharmic in nature, believes in God and is happy",
            },
            10: {
                hindi: "भाई-बहनों से सहायता, सरकारी और सामाजिक कार्यों में प्रगति, माता से सुख और सुखद यादें",
                english:
                    "Help from brothers and sisters, progress ofwork in government and society, happiness from mother and has pleasing memories",
            },
            11: {
                hindi: "अपनी मेहनत से धन प्राप्त करता है, भाई-बहनों से लाभ प्राप्त करता है, शिक्षा में उन्नति करता है और संतान से सुख प्राप्त करता है, चतुर और बुद्धिमान होता है।",
                english:
                    "Gains wealth by his hard work, gains through brothers and sisters, progress in education and also happiness through children, is clever and intelligent",
            },
            12: {
                hindi: "भाई-बहनों से शत्रुता, अत्यधिक व्यय, शत्रुओं से हानि न होना, मानसिक अशांति",
                english:
                    "Enmity with brothers and sisters, lot ofexpenditure, no harm from enemies, mental unrest",
            },
        },
        Mars: {
            1: {
                hindi: "रक्त अशुद्ध होता है, दैनिक जीवन में व्यय होता है, माता की अपेक्षा पत्नी को अधिक महत्व देता है, भूमि और भवन से सुख प्राप्त करता है, भ्रमणशील, कठोर परिश्रम करने वाला तथा परिवार में कुछ हद तक अशांत रहता है।",
                english:
                    "Blood gets impure, expenditure in daily life, gives importance to wife and not to mother, happiness through lands and buildings, wanders, toils hard and is somewhat restless in family",
            },
            2: {
                hindi: "आर्थिक लाभ और परिवार से संबंधित कठिनाइयाँ, व्यवसाय और पत्नी के घर में परेशानी, शिक्षा और बच्चों के घर में परेशानी",
                english:
                    "Difficulties relating to monetary gains and family, distress in profession and in the house ofwife, troubles in education and in the house of children",
            },
            3: {
                hindi: "पत्नी भाव में कष्ट और कमी महसूस होती है, भाइयों से अलगाव, व्यवसाय भाव में कुछ कमजोरी और अस्थिरता, शत्रु भाव में प्रभाव पाने के लिए प्रयास करता है।",
                english:
                    "Feels distress and deficiency in the house of wife, separation from brothers, some weakness and wavering in the house of occupation, makes efforts to get influence in the house of enemies",
            },
            4: {
                hindi: "माता की मृत्यु, मातृभूमि से वियोग, व्यवसाय में सुख, पत्नी पक्ष में प्रबल सुख, अधिक धन कमाने के लिए परिश्रम, यौन सुख में कमजोरी, सरकार व समाज से सम्मान",
                english:
                    "Loss of mother, gets separated from motherland, happiness in occupation, strong happiness in the side ofwife, works hard to earn more wealth, weakness in sexual pleasures, respect from government and society",
            },
            5: {
                hindi: "बहुत अधिक खर्च करता है, शिक्षा में थोड़ा कमजोर होता है, बच्चों की हानि होती है, दूसरों से अधिक काम करवाता है, सांसारिक मामलों और यौन सुखों के बारे में चिंतित रहता है",
                english:
                    "Spends too much, slightly weak in education, loss ofchildren, makes others work hard, anxious about worldly affairs and sexual pleasures",
            },
            6: {
                hindi: "व्यवसाय में चिंता, मिश्रित व्यय, पत्नी की चिंता, मधुमेह रोग होने की संभावना, नाना और उनके परिवार से शत्रुता",
                english:
                    "Worries in the occupation, mixed expenditure, worries about wife, likely to suffer from diabetes, enmity with maternal grandfather and his household",
            },
            7: {
                hindi: "गरिमापूर्ण व्यय, परिवार की गरिमा में कमजोरी, पत्नी के साथ मिश्रित संबंध, यौन सुख में कमजोरी, धन की हानि, कड़ी मेहनत",
                english:
                    "Dignified expenditure, weakness in the dignity of family, mixed relations with wife, weakness in sexual pleasures, loss in wealth, hard-working",
            },
            8: {
                hindi: "कठोर परिश्रम करने वाला, व्यवसाय में अनेक कष्ट एवं कलह सहने वाला, पत्नी से हानि, परिवार में अनेक कलह सहने वाला, व्यय के कारण कुछ हानि, भाई-बहनों से सुखी न रहने वाला, नाभि के नीचे रोग, संचित धन-संपत्ति की हानि, कुछ जैविक विकार एवं अल्पायु।",
                english:
                    "Works hard, bears many troubles and disputes in occupation, loss through wife, bears many disputes in family, somewhat loss due to expenditure, not happy with brothers and sisters, gets diseases below navel, loss of accumulated wealth and property, gets some organic disorders and is short of life",
            },
            9: {
                hindi: "व्यवसाय में अत्यधिक व्यय, धार्मिक नहीं, भाई-बहनों से विवाद, माता से हानि, संतान से दुःख, पत्नी से प्रभावित, थकावट",
                english:
                    "Huge expenditure through profession, not dharmic, disputes with brothers and sisters, loss through mother and unhappy with regard to children, gets influence of wife, gets exhausted",
            },
            10: {
                hindi: "व्यावसायिक क्षेत्र में अच्छा कार्य करता है, शरीर में विकार, संतान से हानि, शिक्षा में कमजोर, पिता से हानि, यौन सुख में मिश्रित भावना",
                english:
                    "Does good work in professional area, disorder in the body, loss through children and weak in education, loss through father, mixed feelings in sexual pleasures",
            },
            11: {
                hindi: "व्यवसाय से धन कमाता है, संतान पक्ष और शिक्षा में कुछ हानि होती है, शत्रुओं को नियंत्रण में रखता है, पत्नी से अप्रसन्न और यौन सुख में कमी होती है, व्यय पर नियंत्रण रखता है फिर भी खर्च करता है।",
                english:
                    "Earns wealth through profession, some loss in children side and also in education, keeps enemies under control, unhappy with wife and deficiency in sexual pleasures, controls the expenditure but still spends",
            },
            12: {
                hindi: "पत्नी के कारण हानि, किन्तु विवाहेतर संबंधों के कारण यौन सुख का आनंद, अतिरिक्त यौन संबंधों के कारण कमजोरी महसूस करना",
                english:
                    "Loss through wife, but enjoys sexual pleasures due to extra-marital affairs, feels weak due to extra sexual connections",
            },
        },
        Mercury: {
            1: {
                hindi: "बुद्धि और शिक्षा प्राप्त करता है, विवेक से धन कमाता है, सुन्दर दिखता है, परिवार और पत्नी में सम्मान पाता है, यौन सुख की इच्छा रखता है, धनवान और चतुर होता है।",
                english:
                    "Gets wisdom and education, earns wealth with discriminations, looks handsome, respect in family and through wife, has the desires of sexual pleasure, becomes rich and clever",
            },
            2: {
                hindi: "अपार धन और शिक्षा अर्जित करता है, संतान सुख प्राप्त करता है, अच्छा योजनाकार होता है और जीवन में सदैव महत्वाकांक्षी रहता है।",
                english:
                    "Accumulates huge wealth and much education, gets bondage of children, a good planner and always ambitious in life",
            },
            3: {
                hindi: "अच्छी शिक्षा और कमाई मिलती है और संतान का बल भी मिलता है, विवेक शक्ति होती है, यश और भाई-बहनों का बल मिलता है, अच्छा वार्ताकार होता है",
                english:
                    "Gets good education and earnings and also power of children, has discretion power, gets fame and power of brothers and sisters, a good conversationalist",
            },
            4: {
                hindi: "अच्छी शिक्षा प्राप्त करता है, संतान सुख प्राप्त करता है, धन-संपत्ति, भवन और संपत्ति भी प्राप्त करता है, अच्छे विचार और सुख-सुविधाएं प्राप्त करता है, अच्छे कर्म करता है, अच्छी वक्तृत्व क्षमता रखता है, व्यापार में उन्नति करता है।",
                english:
                    "Acquires good education gets happiness of children and also gets, wealth and also buildings and property, has decent ideas and happiness and comforts, does happy deeds and has good oratorical ability, progress in business",
            },
            5: {
                hindi: "अच्छी शिक्षा प्राप्त करता है और अच्छा धन प्राप्त करता है, चतुर और विवेकशील होता है, बच्चों से सुख प्राप्त करता है",
                english:
                    "Acquires good education and gets good wealth, clever and discriminate, happiness from children",
            },
            6: {
                hindi: "शिक्षा और परिवार में कमी, शत्रुओं से मेलजोल रखने में चतुर, धन प्राप्ति की चिंता",
                english:
                    "Deficiency in education and also in family, clever in getting along with enemies, worries as to how to get wealth",
            },
            7: {
                hindi: "धन कमाने में चतुर, बच्चों से सहयोग, पत्नी से थोड़ा अप्रसन्नता, अधिक यौन सुख, अधिक धन प्राप्ति में रुचि",
                english:
                    "Clever in earning money, support from children, slight unhappiness with wife, more sexual pleasures, interested in getting more wealth",
            },
            8: {
                hindi: "बच्चों की हानि, शिक्षा का अभाव, धन की हानि, मानसिक रूप से चिंतित, विदेशी सहयोग में संलग्न",
                english:
                    "Loss ofchildren and not much of education, loses wealth, mentally worried, engages in foreign collaboration",
            },
            9: {
                hindi: "अच्छी शिक्षा प्राप्त करता है और धन भी प्राप्त करता है, संतान के मामले में भाग्यशाली होता है, ईश्वर में विश्वास रखता है, भाई-बहनों से सहायता प्राप्त करता है",
                english:
                    "Acquires good education and also gets wealth, fortunate in having children, has belief in God, help from brothers and sisters",
            },
            10: {
                hindi: "उच्च शिक्षा प्राप्त करता है, सरकारी नौकरी पाता है, पिता और संतान से लाभ प्राप्त करता है, व्यापार में प्रचुर धन और प्रतिष्ठा प्राप्त करता है, सरकार और समाज से लाभ प्राप्त करता है, सम्मान पाता है, भवन और भूमि से लाभ प्राप्त करता है और चतुर होता है।",
                english:
                    "Gets high education, gets government job, gains from father and also children, earns huge wealth and distinction in business, enjoys gain from government and society, respected, gains from buildings and lands and is clever",
            },
            11: {
                hindi: "धन प्राप्ति में परेशानी, शिक्षा में कुछ परेशानी, संतान से नाखुश, आय भाव में भेदभाव और चतुराई",
                english:
                    "Problems in getting wealth, some problems in education unhappy with children, discrimination in the house of income and is clever",
            },
            12: {
                hindi: "संतान से हानि, धन की हानि, शिक्षा में कमी, चिंता, अधिक व्यय, दादा के घर से सहायता, शत्रुओं से चिंता, परिवार में हानि और कमी",
                english:
                    "Gets loss through children, loss in wealth, poor in education, worries, spends much, help from the house of grandfather, worries from enemies, loss and deficiency in family",
            },
        },
        Jupiter: {
            1: {
                hindi: "चतुर, कुछ स्वास्थ्य समस्याओं से ग्रस्त, दैनिक दिनचर्या में महत्व और सम्मान प्राप्त, अच्छी शिक्षा, संतान की पीड़ा",
                english:
                    "Clever, suffers from some health problems, gets importance and dignity in the daily routine, good education, sufferings of children",
            },
            2: {
                hindi: "धन लाभ, धन भाव में उन्नति, पिता से कुछ दुःख, सरकार व समाज से संबंधित चिंता, चिंताओं से बाहर आने का प्रयास",
                english:
                    "Gains wealth, progress in the house ofwealth, some unhappiness from father, worries in connection with government and society, tries to come out ofworries",
            },
            3: {
                hindi: "भारी लाभ प्राप्त करता है, वीर, प्रभावशाली, जीवन की दिनचर्या पर महान प्रतिष्ठा, भाई-बहनों पर प्रभाव, धर्म और ईश्वर को कम महत्व देता है",
                english:
                    "Gets huge gains, valorous, influential, great dignity on the daily routine of life, has influence on brothers and sisters, gains little importance to Dharma and God",
            },
            4: {
                hindi: "दीर्घायु, जीवन और करियर में प्रसिद्धि, माता के घर में अलगाव, विदेश संपर्क से लाभ, पिता से मिले-जुले संबंध, सरकार और समाज से विरोध, गुप्त शक्तियां होती हैं।",
                english:
                    "Lives long, fame in life and career, separation in the house of mother, benefit from contact offoreign countries, mixed relations with father, opposition from government and society, has occult powers",
            },
            5: {
                hindi: "शिक्षा के घर में कुछ कमी, लाभ के लिए कड़ी मेहनत, बातचीत के दौरान गुप्त शक्तियां",
                english:
                    "Some deficiency in the house of education, works hard for gains, occult powers during conversation",
            },
            6: {
                hindi: "कठिनाई से लाभ, स्वास्थ्य कष्ट, पिता से शत्रुता, सरकार व समाज से अरुचि, आय में कमी, अधिक व्यय",
                english:
                    "Gains with difficulty, suffers in health, enmity with father, dislike in government and society, deficiency in income, spends much",
            },
            7: {
                hindi: "गौरव और कुलीनता बनाए रखता है, पत्नी के साथ मिश्रित संबंध रखता है, दैनिक व्यवसाय में लाभ प्राप्त करता है, विदेश से सहायता प्राप्त करता है, ऊर्जावान कार्य करता है, भाई-बहनों से सहयोग प्राप्त करता है, सांसारिक कार्यों में लाभ प्राप्त करने के लिए बेहतर उपकरणों का उपयोग करता है।",
                english:
                    "Keeps pride and nobleness, mixed relations with regard to wife, gets gains on the daily occupation, help from foreign countries, does energetic deeds, has support from brothers and sisters, uses better devices on the worldly deeds ofgetting gains",
            },
            8: {
                hindi: "विदेश से सहायता, अधिक व्यय, माता से मिले-जुले संबंध, धन संचय हेतु प्रयत्नशील, दैनिक जीवन में मान-सम्मान, घर-परिवार में मिले-जुले संबंध।",
                english:
                    "Help from foreign countries, spends much, mixed relations with mother, makes efforts to accumulate wealth, dignity in the daily routine, mixed relations in the house of family",
            },
            9: {
                hindi: "भाग्य भाव और धर्म भाव में भारी हानि, स्वास्थ्य संबंधी कुछ समस्या, दैनिक दिनचर्या में बेचैनी, लाभ प्राप्ति के लिए धर्म को थोड़ा नुकसान, आय भाव में कमजोरी और देव भाव में अत्यधिक कमजोरी, संतान भाव में चतुराई का प्रयोग, भाई-बहनों से थोड़ा सहयोग",
                english:
                    "Heavy loss in the house of destiny and also Dharma, some health problem, feels restless in daily routine, injures Dharma a little to acquire gains, gets weakness in the house ofincome and great weakness in the house ofGod, uses cleverness in the house ofchildren, some cooperation from brothers and sisters",
            },
            10: {
                hindi: "विदेश से संबंध, पिता से शत्रुता, हानि, अत्यधिक परिश्रम से लाभ, सरकार और समाज के घर में कुछ कमजोरी, सम्मानजनक व्यय, धन और प्रभाव बढ़ाने के लिए सभी उपाय, माता के घर में थोड़ी कमी और उसे दूर करने का प्रयास।",
                english:
                    "Gets connection with foreign countries and also some enmity loss with father, gains through much hard work, some weakness in the house of government and society, honourable spending, uses all devices to improve wealth and influence, little deficiency in the house of mother and tries to remove it",
            },
            11: {
                hindi: "दीर्घायु होता है, सफल उपायों से धन प्राप्त करता है, भाई-बहनों से कुछ कटुता रहती है, पत्नी और यौन सुख के घर में कुछ अनाधिकृत लाभ प्राप्त करने का प्रयास करता है, गुप्त शक्ति रखता है।",
                english:
                    "Lives long, gets wealth by successful methods, some bitterness with brothers and sisters, tries to get some unauthorised gains in the house of wife and sexual pleasures, has occult strength",
            },
            12: {
                hindi: "अधिक एवं विवेकपूर्ण ढंग से व्यय करता है, लाभ एवं धन प्राप्ति के लिए कठोर परिश्रम करता है, माता से सुखी, नाना से शत्रुता रखता है, धन भाव में न्यूनता रहती है।",
                english:
                    "Spends much and judiciously, works hard to get gains and wealth, happy with mother, enmity with maternal grandfather, deficiency in the house of wealth",
            },
        },
        Venus: {
            1: {
                hindi: "अभिमानी, पत्नी से लाभ, शत्रुओं के घर में बड़ा प्रभाव, दैनिक कार्य में सफलता, कोई रोग, दृढ़ निश्चयी, हठी",
                english:
                    "Proud, gains from wife, keeps huge influence in the house of enemies, success in daily occupation, gets some disease, is offirm determination, and is obstinate",
            },
            2: {
                hindi: "धन वृद्धि के लिए पूरे मन से प्रयास करता है, धन और परिवार के घर में परेशानियाँ होती हैं, और कुछ हद तक बीमार भी रहता है।",
                english:
                    "Makes whole-hearted efforts for the increase of wealth, troubles in the house of wealth and family, and somewhat diseased",
            },
            3: {
                hindi: "कठिन परिश्रम से उन्नति, भाई-बहनों से शत्रुता, महान कार्य, सौभाग्य, नाना के घर से सहायता",
                english:
                    "Progress by laborious and daily hard work, enmity with brothers and sisters, has great cause, fortunate, help from maternal grandfather's house",
            },
            4: {
                hindi: "माता से शत्रुता, भौतिक सुख में कुछ हानि व रोग, पिता के घर में कुछ दुःख, सरकार व समाज द्वारा मान-सम्मान में कमी, भूमि व भवन संबंधी परेशानी, व्यापार व मकान की उन्नति के लिए बहुत प्रयास, शत्रुओं के कारण थोड़ी बेचैनी",
                english:
                    "Enmity with mother, gets some loss and disease in the physical happiness, some unhappiness in the house offather, honour through government and society, problem with regard to land and buildings, tries very hard for the progress of business and house, slight restlessness due to enemies",
            },
            5: {
                hindi: "संतान की ओर से कष्ट, शिक्षा में कमजोर, चिंताग्रस्त, शत्रुओं के घर में कुछ चिंता, शरीर में कमजोरी, घबराहट के कारण अपनी बात दूसरों को समझाने में असमर्थ।",
                english:
                    "Troubles on the part of children, weak in education, has worries, feels some worry in the house of enemies, weakness in the body, unable to make his ideas understood to others due to nervous- mindedness",
            },
            6: {
                hindi: "स्वतंत्र प्रभावशाली कार्य करता है, शरीर में कोई रोग होता है, नाना के घर से सहायता मिलती है, अधिक व्यय करता है, शत्रुओं के घर में बहुत प्रभाव रखता है, कठोर परिश्रम करता है तथा विरोध के बावजूद लोगों को जीत लेता है।",
                english:
                    "Does independent influential deeds, gets some disease in the body, help from maternal grandfather's house, spends much, keeps great influence in the house of enemies, does hard work and wins over people in spite of opposition",
            },
            7: {
                hindi: "सुन्दर शरीर, पत्नी के घर में अनाधिकृत लाभ, यौन सुखों में लिप्त, पत्नी से कुछ परेशानी, व्यवसाय के घर में लगन से काम करना।",
                english:
                    "Has a handsome body, unauthorised gains in the house ofwife, indulges in sexual pleasures, some problem with wife, works diligently in the house of occupation",
            },
            8: {
                hindi: "शरीर में कुछ कष्ट, नाना के घर में हानि, बेचैनी, बहुत कष्टकारी कार्य, धन-सम्पत्ति बढ़ाने के लिए कठोर परिश्रम, शत्रु पक्ष में बेचैनी",
                english:
                    "Some troubles in the body, loss in the side ofmaternal grandfather's house, feels restless, does very troublesome deeds, works hard to improve the wealth, restlessness in the side of enemies",
            },
            9: {
                hindi: "भाग्यवान, धर्म में उन्नति न कर पाने वाला, भाई-बहनों से कुछ सहायता प्राप्त करने वाला, बहुत चतुर एवं सज्जन, शत्रुओं के घर में सफलता पाने वाला",
                english:
                    "Fortunate, unable to progress in Dharma, some help from brothers and sisters, is very clever and gentleman, gets success in the house of enemies",
            },
            10: {
                hindi: "सरकार और समाज में उन्नति मिलती है, पिता से कुछ परेशानी रहती है, शत्रु भाव में अपना प्रभाव बनाये रखता है, माता से अप्रसन्न रहता है, व्यापार में मान-सम्मान और उन्नति पाता है, थोड़ा दुखी रहता है।",
                english:
                    "Gets progress in government and society, some problem with father, keeps his influence in the house ofenemies, unhappy with mother, gets honour and progress in business, feels a little unhappy",
            },
            11: {
                hindi: "भारी लाभ प्राप्त करता है, शिक्षा में कुछ कमजोर होता है, बच्चों से नाखुश होता है, सुंदर दिखता है, धन बढ़ाने के लिए कड़ी मेहनत करता है और बहुत चतुर होता है",
                english:
                    "Gets huge gains, somewhat weak in education, unhappy with children, looks handsome, works hard to increase wealth and is very clever",
            },
            12: {
                hindi: "अधिक खर्च करता है, चिंतित रहता है तथा कुछ रोगों से ग्रस्त रहता है, सम्मान में अनादर पाता है, अकेलापन महसूस करता है।",
                english:
                    "Spends much, worried and suffers from some diseases, gets disrespect in honour, feels lonely",
            },
        },
        Saturn: {
            1: {
                hindi: "प्रभावशाली, भाग्यशाली माना जाता है, पिता, सरकार और समाज से सम्मान पाता है, राजनीति में रुचि रखता है और प्रगति के लिए कड़ी मेहनत करता है, भाई-बहनों से अधिक मदद नहीं मिलती, पत्नी से शत्रुता होती है, यौन सुख में कमी होती है, कठोर परिश्रम करने वाला और जिद्दी होता है।",
                english:
                    "Influential, thought to be fortunate, gets the respect from father, government and society, interested in politics and tries hard for progress, not much help from brothers and sisters, enmity with wife, deficiency in sexual pleasures, does hard work, and is obstinate",
            },
            2: {
                hindi: "भाग्य के सहयोग से धन प्राप्ति, सरकार व समाज से सम्मान, माता से कुछ संतुष्टि, भूमि व भवन के प्रबंधन में कमी, धन भोगने के लिए कठोर परिश्रम, कुछ हद तक बेचैन, सरकार व समाज तथा पिता के घर में बंधन।",
                english:
                    "Gets wealth with the help of Destiny, gets respect from government and society, some satisfaction through mother, deficiency in the management oflands and buildings, works hard for enjoying wealth, somewhat restless, bondage in the house of government and society and father",
            },
            3: {
                hindi: "अपने परिश्रम से बड़ी उन्नति करता है, सफलता और यश पाता है, भाई-बहनों से असंतोष रहता है, अच्छा वार्ताकार, व्यय में लापरवाह, धार्मिक कर्तव्यों का पालन करने वाला, बहुत प्रभावशाली, साहसी और पिता से सहायता प्राप्त करने वाला होता है।",
                english:
                    "Makes huge progress by his hard labour, gets success and fame, dissatisfaction through brothers and sisters, a good conversationalist careless in expenditure, follows religious duties, is very influential, courageous and help from father",
            },
            4: {
                hindi: "माता-पिता से असंतोष, शत्रुओं के घर में प्रभाव और उच्च सत्ता प्राप्त होती है, सरकार और समाज से सम्मान मिलता है, थोड़ा दुखी महसूस करता है, कष्टकारी कार्य करता है और धार्मिक होता है",
                english:
                    "Dissatisfaction from parents, gets the influence and high power in the house of enemies, gets honour from government and society, feels a little unhappy, undertakes troublesome deeds and is religious",
            },
            5: {
                hindi: "पिता के घर से लाभ, बुद्धि और विद्या से लाभ और सम्मान, धर्म-कर्म और शिक्षा का ज्ञान, संतान के संबंध में कुछ उन्नति, पत्नी के घर में कुछ असंतोष, दैनिक व्यवसाय में कुछ परिश्रम से उन्नति, लाभ के लिए परिश्रम, धन की प्राप्ति।",
                english:
                    "Gets gain from the house offather, gets gains and honour by wisdom and education, gets the knowledge ofreligious duties and education, some progress with regard to children, some dissatisfaction in the house of wife, progress with some labour in the daily occupation, works hard for gains, gets wealth",
            },
            6: {
                hindi: "पिता से बहुत बल मिलता है, प्रभावशाली कार्यों से व्यापार करता है, मान-सम्मान पाता है, शत्रुओं के घर में प्रभाव बनाए रखता है, कठिन से कठिन कार्य करने को तत्पर रहता है तथा प्रभाव की उन्नति बनाए रखता है, कुछ लापरवाही से कार्य करता है तथा व्यय में भी, भाई-बहनों से शत्रुता रखता है।",
                english:
                    "Gets great strength from father, does business through influential deeds, gets respect and honour, keeps the influence in the house of enemies, ready to do the hardest work and maintains the progress of influence, works with some carelessness and also in expenditure, enmity with brothers and sisters",
            },
            7: {
                hindi: "भाग्यशाली, भाग्यशाली होने के बावजूद परिवार में बेचैनी, बहुत धार्मिक नहीं, माता से अप्रसन्न, दुखी महसूस करता है, सरकार और समाज से लाभ प्राप्त करता है।",
                english:
                    "Fortunate, uneasiness in family in spite ofbeing fortunate, not very religious, unhappy with mother, feels unhappy, gains from government and society",
            },
            8: {
                hindi: "पिता के घर में कष्ट, यश में कमी, परिश्रम से विदेश के सहयोग से उन्नति का योग, दैवीय शक्ति प्राप्त होती है तथा विद्या में लाभ होता है।",
                english:
                    "Distress in the house of father, deficiency in fame, gets the union of progress through diligence with the cooperation of foreign countries, has Divine power and gains in education",
            },
            9: {
                hindi: "पिता से सुख, सरकार और समाज से लाभ, शत्रुओं के घर में मान-सम्मान, भाई-बहनों के घर में कपट, ऊर्जावान कार्य, धर्म का पालन और सम्मान प्राप्त होता है।",
                english:
                    "Happiness from father, gains from government and society, gets the dignity in the house of enemies, gets insidiousness in the house of brothers and sisters, does energetic work, rears Dharma and gets honour",
            },
            10: {
                hindi: "सरकार और समाज में बड़ा मान-सम्मान मिलता है, व्यय भाव में लापरवाही और गलतियाँ होती हैं, माता से दुःखी, पत्नी से शत्रुता, बड़ा व्यापार करता है और थोड़ा दुखी रहता है।",
                english:
                    "Gets great honour in government and society, carelessness and mistakes in the house of expenditure, unhappy with mother, enmity with wife, does a grand business and feels a bit unhappy",
            },
            11: {
                hindi: "प्रचुर आय और लाभ प्राप्त होता है, धार्मिक कार्य करता है, बहुत परिश्रम करता है, संतान के घर में कुछ सफलता मिलती है।",
                english:
                    "Gets huge income and gains, does religious duties, works very hard, some success in the house of children",
            },
            12: {
                hindi: "पिता भाव में हानि, कुछ नीच व नीच कर्म, व्यय भाव में कमजोरी, शत्रु भाव में प्रभाव, सरकार व समाज में दुःखी",
                english:
                    "Loss in the house offather, does some mean and low deeds, weakness in the house of expenditure, influence in the house of enemies, unhappy in government and society",
            },
        },
        Rahu: {
            1: {
                hindi: "कमजोर शारीरिक बनावट, चिंता और बेचैनी से ग्रस्त, गुप्त और चतुर, साहसी",
                english:
                    "Weak constitution, gets worries and anxieties, secretive and clever, is courageous",
            },
            2: {
                hindi: "धन प्राप्ति के लिए कठोर परिश्रम करता है, धन प्राप्ति की योजना बनाता है, कभी-कभी धन प्राप्ति में परेशानियों का सामना करता है, धन भाव को स्थायी बनाने के लिए बहुत प्रयास करता है",
                english:
                    "Works hard for getting wealth, plans for wealth, sometimes faces troubles in getting wealth, makes great efforts to the house of wealth permanently",
            },
            3: {
                hindi: "भाई-बहनों के घर में हानि या वियोग होता है, गुप्त रूप से काम करता है, स्वार्थी होता है।",
                english:
                    "Gets some loss or separation in the house of brothers and sisters, works secretly, and is selfish",
            },
            4: {
                hindi: "माता के घर में हानि, भूमि और भवन की हानि, दुखी, जन्मस्थान का त्याग, जीवन में कष्ट, गुप्त तरीकों से सुख, रहने और सुख के स्थान पर घातक और गहरी योजनाएँ, बेचैनी महसूस होती है",
                english:
                    "Loss in house of mother, loses land and buildings, unhappy, leaves his birthplace, suffering in life, happiness through secret methods, fatal and deep plans in the place of living and happiness, feels restless",
            },
            5: {
                hindi: "शिक्षा में हानि और बच्चों की हानि, गुप्त रूप से चतुर",
                english:
                    "Loss in education and loss of children, secretly clever",
            },
            6: {
                hindi: "शत्रु भाव में उत्तम प्रभाव, नाना से हानि, स्वार्थी एवं सतर्क",
                english:
                    "Great influence in the house of enemies, loss through maternal grandfather, selfish and cautious",
            },
            7: {
                hindi: "पत्नी के घर में क्लेश, यौन सुख के पक्ष में कष्ट और कमी, ससुर के घर में हानि, व्यवसाय के स्थान में परेशानी के साथ काम, दैनिक दिनचर्या और परिवार में बहुत परेशानी, कुछ यौन सुख प्राप्त करने के लिए विशेष सलाह देने वाला, स्वार्थी होता है।",
                english:
                    "Distress in the house ofwife, distress and deficiency in the side of sexual pleasures, loss in father-in-law house, works with troubles in the place of occupation, many troubles in daily routine and in the family, has special advice to get some sexual pleasures, and is selfish",
            },
            8: {
                hindi: "आयु भाव में अशांति, पेट में कुछ कष्ट, काफी बेचैनी, कभी-कभी जीवन समाप्त करने का विचार, कष्ट आदि कष्ट होते हैं।",
                english:
                    "Disturbance in the house of age, gets some abdominal troubles in stomach, feels quite restlessness, sometimes thinks ofending life and is a sufferer",
            },
            9: {
                hindi: "भाग्य भाव में हानि, धर्म भाव में भूल, यश नहीं मिलता, ईश्वर पर विश्वास नहीं",
                english:
                    "Gets loss in the house of destiny, mistakes in the house ofDharma, does not get fame, no belief in God",
            },
            10: {
                hindi: "पिता से असंतुष्ट, कठोर परिश्रम करता है तथा अपनी स्थिति की उन्नति के लिए प्रयास करता है, सरकार और समाज के मामलों में चिंता के साथ काम करता है, व्यापार और व्यवसाय के संबंध में चिंता के साथ काम करता है",
                english:
                    "Dissatisfaction with father, does hard labour and puts in efforts for the progress of his position, works with anxiety in matters of government and society, works with anxiety in connection with business and occupation",
            },
            11: {
                hindi: "लाभ प्राप्ति में सफलता, आवश्यकता से अधिक लाभ प्राप्ति के लिए अधिक प्रयास करना, स्वार्थी",
                english:
                    "Success in getting gains, makes more efforts to get gains more than required, selfish",
            },
            12: {
                hindi: "घाटा और भारी खर्च, चिंतित, खर्च का प्रबंधन करने में असमर्थ'",
                english:
                    "Loss and huge expenditure, worried, unable to manage the expenditure '",
            },
        },
        Ketu: {
            1: {
                hindi: "शरीर में कमजोरी और मानसिक रूप से पिछड़ापन, बेचैनी, गुप्त और बहादुर, और अनुचित हो जाता है",
                english:
                    "Weakness in body and mentally backward, restlessness, secretive and brave, and becomes unfair",
            },
            2: {
                hindi: "धन की हानि, कष्ट सहना और बेचैन होना, धन की भारी हानि",
                english:
                    "Loss in wealth, bears pains and becomes restless, deep loss in wealth",
            },
            3: {
                hindi: "ऊर्जावान कर्म करता है, उन्नति के लिए कठोर परिश्रम करता है, भाई-बहनों से वियोग में बेचैन, साहसी, चिंतित और परिश्रमी होता है",
                english:
                    "Does energetic deeds, toils hard for progress, separation from brothers and sisters and restless, brave, worried and diligent",
            },
            4: {
                hindi: "मातृभूमि से वियोग, भवन व संपत्ति में कष्ट, अनेक प्रकार की हानि व दुःख, बहुत कष्ट सहने के बाद सुख मिलता है।",
                english:
                    "Separation from motherland, troubles in buildings and property, many kinds of losses and unhappy, gets happiness after suffering a lot",
            },
            5: {
                hindi: "पढ़ाई में बहुत कठिनाई और शिक्षा में कमी, दूसरों से बात करने में कुछ कमजोरी महसूस होना, बच्चों में कमी, बाधाओं और झूठ की परवाह न करना और गुप्त रूप से काम करना",
                english:
                    "Great difficulty in studies and deficiency in education, feels some weakness in talking to others, loss in children, not bothered about hindrances and falsehood and works secretly",
            },
            6: {
                hindi: "शत्रुओं का बहादुरी से सामना, बीमारी और कष्ट, नाना से शत्रुता, थोड़ा उतावला व्यवहार",
                english:
                    "Faces enemies bravely, gets illness and troubles, enmity with maternal grandfather, a bit rash in approach",
            },
            7: {
                hindi: "पत्नी से हानि, यौन सुख के क्षेत्र में कमी और परेशानी, गुप्त संबंध, बहुत सारी परेशानियों और समस्याओं से गुजरने के बाद व्यवसाय में अंतिम सफलता",
                english:
                    "Loss from wife and deficiency and troubles in the area of sexual pleasures, secret associations, final success in occupation after undergoing a lot of troubles and problems",
            },
            8: {
                hindi: "अनेक संदिग्ध कार्य करता है, विदेशी सहयोग के लिए कठोर परिश्रम करता है, जीवन में चिंताएं रहती हैं, जीवनकाल में कुछ कमी रहती है",
                english:
                    "Does many shady deeds, works hard for foreign collaboration, anxieties in life, some deficiency in lifespan",
            },
            9: {
                hindi: "धर्म की हानि और दुर्बलता, यश की कमी और ईश्वर के घर और विश्वास की कमी, भाग्य की उन्नति और फल प्राप्ति के लिए बहुत मेहनत करता है।",
                english:
                    "Loss and weakness in Dharma, deficiency of fame and deficiency of the house ofand beliefofGod, works very hard for the progress of destiny and in getting the effects",
            },
            10: {
                hindi: "पिता से नाखुश, सरकारी और सामाजिक मामलों में परेशानी, व्यवसाय में कड़ी मेहनत",
                english:
                    "Unhappy with father and finds problems in government and society affairs, works hard in the business",
            },
            11: {
                hindi: "अपार धन अर्जित करता है, धन प्राप्ति हेतु कठोर परिश्रम करता है, अनाधिकृत तरीकों का प्रयोग करता है, लाभ में कुछ हानि होती है।",
                english:
                    "Earns huge wealth, works hard for the progress of getting wealth, follows unauthorised methods, some loss in the gains",
            },
            12: {
                hindi: "बहुत खर्चा करता है, धर्म में विश्वास नहीं रखता, बाहरी संबंधों का निर्भीकता से सामना करता है",
                english:
                    "Lot of expenditure, does not believe in Dharma, faces outside relations boldly",
            },
        },
    },
    Gemini: {
        Sun: {
            1: {
                hindi: "प्रभावशाली कार्य करता है, भाई-बहनों का सहयोग प्राप्त होता है, पत्नी के घर में बहुत शक्ति और प्रभाव से कार्य करता है, यौन सुख की शक्ति में वृद्धि होती है।",
                english:
                    "Does influential deeds, has the support of brothers and sisters, works with great strength and influence in the house ofwife, increase in the strength of sexual pleasures",
            },
            2: {
                hindi: "धन वृद्धि के लिए कठोर परिश्रम, भाई-बहनों से वियोग, धन के संबंध में प्रभाव, आर्थिक उन्नति में ही अपने शारीरिक बल की सफलता।",
                english:
                    "Labours hard for increasing the wealth, separation in connection with brothers and sisters, influence in connection with wealth, success of his physical strength only in the monetary progress",
            },
            3: {
                hindi: "शारीरिक बल बहुत अधिक होता है, भाई-बहनों के घर में मान-सम्मान मिलता है, ईश्वर पर कम विश्वास होता है",
                english:
                    "Has great physical strength, gets dignity in the house of brothers and sisters, has less faith in God",
            },
            4: {
                hindi: "भाई-बहनों का सुख मिलता है, भवन और संपत्ति का बल मिलता है, परिश्रम से सुखपूर्वक उन्नति होती है, माता के भाव में प्रभाव मिलता है, पिता का सम्मान होता है, सरकार और समाज से जुड़े मामलों में मान-सम्मान और प्रभाव मिलता है, व्यापार के भाव में प्रभाव और प्रभाव मिलता है।",
                english:
                    "Gets happiness ofbrothers and sisters, gets the strength ofbuildings and property, gets progress by labour happily, gets influence in the house of mother, respect to father, gets honour and influence in connection with government and society, gets and influence in the house of business",
            },
            5: {
                hindi: "जब नीच का सूर्य पंचम भाव में तुला राशि में स्थित हो, तो यह शिक्षा और संतान के मामले में स्पष्ट रूप से कमज़ोरी दर्शाता है। जातक में साहस, पहल और शारीरिक शक्ति की भी कमी होती है। अपने व्यवहार में, वे अक्सर गोपनीयता और चतुराई से काम लेते हैं। एकादश भाव (मेष) पर सूर्य की सप्तम दृष्टि के कारण, जातक अक्सर सच या झूठ की परवाह किए बिना बुद्धि और रणनीति से धन अर्जित करता है। वे छल या गुप्त तरीकों से लाभ प्राप्त करने में कुशल होते हैं।",
                english:
                    "When the debilitated Sun is placed in Libra in the fifth house, it clearly signifies weaknesses in education and children. The native also tends to lack courage, initiative, and physical strength. In their behavior, they often act with secrecy and cleverness. Due to the Sun's 7th aspect on the eleventh house (Aries), the native gains wealth through intelligence and strategy often without concern for truth or falsehood. They are skilled in deriving benefits through deceit or secretive means.",
            },
            6: {
                hindi: "अपनी शक्ति और ऊर्जा से परिश्रम करता है, शत्रु भाव में अत्यधिक प्रभाव और प्रतिष्ठा पाता है, नाना पक्ष में अत्यधिक प्रभाव, व्यय भाव में बेचैनी",
                english:
                    "Labours through his strength and energy, gets huge influence and dignity in the house of enemies, huge influence in the side of maternal grandfather, uneasiness in the house of expenditure",
            },
            7: {
                hindi: "पत्नी पक्ष में अत्यधिक प्रभाव, विवाह के बाद उन्नति, यौन सुख की प्रबल शक्ति, भाई-बहनों का सहयोग मिलता है।",
                english:
                    "Huge influence in the side of wife, gets progress after marriage, great power of sexual pleasures, gets the support ofbrothers and sisters",
            },
            8: {
                hindi: "ऊर्जा और शक्ति के मामले में कुछ कमजोरी महसूस होती है, भाई-बहनों के माध्यम से कुछ हानि होती है, धन की हानि को सुधारने के लिए महान प्रयास और गुप्त शक्ति का उपयोग होता है, दैनिक दिनचर्या में कुछ चिंताएं होती हैं",
                english:
                    "Feels some weakness in the part ofenergy and strength, some loss through brothers and sisters, uses the great effort and secret power ofimproving the loss ofwealth, some worries in the daily routine",
            },
            9: {
                hindi: "भाग्य का सहारा लेने की शक्ति बढ़ती है, अपने उद्योग की सफलता पाने में कुछ कमी महसूस होती है, भाई-बहनों का बल मिलता है, बड़ा साहस होता है, उद्योग की सफलता के कारण कुछ प्रभाव प्राप्त होता है, तथा हठी होता है।",
                english:
                    "Increases the energy of taking support of destiny, feels some deficiency in getting the success ofhis industry, gets the strength ofbrothers and sisters, has huge courage, gets some influence due to success of industry, and is obstinate",
            },
            10: {
                hindi: "ऊर्जा और पराक्रम से बड़ी उन्नति करता है, पिता का प्रभाव पाता है, भाइयों से सहयोग पाता है, सरकार और समाज के घर में उन्नति और प्रभाव पाता है, परिश्रम में सफलता पाता है, कुछ अच्छे कार्य करता है और बहुत साहसी होता है।",
                english:
                    "Makes huge progress by energy and strength, gets the influence of father, gets cooperation from brothers, progress and influence in the house ofgovernment and society, gets success oflabour, does some good and is very courageous",
            },
            11: {
                hindi: "भाई-बहनों से भारी लाभ, शिक्षा के घर में कुछ कमजोरी, संतान पक्ष में कुछ कमी, कुछ अनुचित और कटु वचनों का प्रयोग, बहुत लापरवाह और अति प्रसन्नचित्त",
                english:
                    "Huge gains from brothers and sisters, some weakness in the house of education, some deficiency in the side of children, uses some improper and bitter words, is very careless and overjoyed",
            },
            12: {
                hindi: "शत्रु पक्ष में हानि और दुर्बलता मिलती है, भाई-बहनों से कुछ हानि और वियोग होता है, व्यय भाव में अधिक व्यय और बेचैनी होती है, शत्रु भाव में अत्यधिक प्रभाव होता है, आलस्य अनुभव करता है, अस्वस्थता की परवाह नहीं करता।",
                english:
                    "Gets loss and weakness in his face and enemy, faces some loss and separation ofbrothers and sisters, spends much and restless in the house ofexpenditure, huge influence in the house ofenemies, feels lazy, does not care for ill-health",
            },
        },
        Moon: {
            1: {
                hindi: "धनवान और सुन्दर, पत्नी के घर में शोभायमान, दैनिक कार्य में सफलता, महंगी वस्तुएं पहनने वाला, यौन सुख की ओर अधिक ध्यान, ससुर से सम्मान, स्थिर बुद्धि वाला",
                english:
                    "Gets wealth and looks handsome, beauty in the house of wife, success in daily occupation, wears costly things, more attention in the side of sexual pleasures, respect from father-in-law, is of stable mind",
            },
            2: {
                hindi: "अपार धन प्राप्त होता है, धर्म का पालन करता है, धन भाव में उन्नति करता है और सम्मान पाता है।",
                english:
                    "Gets huge wealth, follows Dharma, progress in the house ofwealth and respectable",
            },
            3: {
                hindi: "बहुत महंगा श्रम करता है, बहुत धन कमाता है, भाई-बहनों के घर में बाधा और बंधन होता है, धन कमाने के लिए कठिन परिश्रम करता है, यश और साहस अर्जित करता है।",
                english:
                    "Does very costly labour, earns huge wealth, hurdles and bondage in the house of brothers and sisters, does hard work to earn wealth, earns fame and courageous",
            },
            4: {
                hindi: "धन, भूमि, भवन का संचय होता है, माता से संबंध बनता है, धन और व्यापार में सफलता मिलती है, सरकार और समाज के घर में सम्मान मिलता है, धैर्य और मन की शांति बहुत अच्छी होती है।",
                english:
                    "Accumulates wealth, lands and buildings and bondage with mother, gets success in wealth and business, honour in the house of government and society, has great patience and peace of mind",
            },
            5: {
                hindi: "शिक्षा प्राप्त करता है, संतान पक्ष में उन्नति करता है, धन प्राप्ति के लिए प्रयत्नशील रहता है तथा बहुत चतुर होता है।",
                english:
                    "Gets education, progress in the side of children, makes efforts to gain wealth and is very clever",
            },
            6: {
                hindi: "बेचैनी महसूस करना, परिवार में हानि (आमतौर पर माँ), शत्रु पक्ष से चिंतित महसूस करना, धन की हानि, झगड़े और कुछ बीमारियाँ, बहुत अधिक खर्च, गुप्त नीतियों के माध्यम से लाभ",
                english:
                    "Feels restless, loss in family (usually mother), feels worried from the side ofenemy, loss ofwealth, quarrels and gets some diseases, spends too much, gains through secret policies",
            },
            7: {
                hindi: "दैनिक व्यवसाय से धन अर्जित करता है, व्यवसाय में समृद्ध बुद्धि वाला, महान सम्मान और प्रतिष्ठा प्राप्त करता है, पत्नी के घर में मिलन होता है, अत्यधिक कामुक, प्रसन्नचित्त व्यक्ति",
                english:
                    "Earns wealth from daily occupation, rich mind in the occupation, gets great honour and dignity, union in the house of wife, highly sexual, a happy fellow",
            },
            8: {
                hindi: "धन की हानि और शरीर में कमजोरी, परिवार में हानि, गुप्त नीतियों से लाभ, आयु भाव में उन्नति",
                english:
                    "Loss ofwealth and weakness in the body, loss in family, gains by secret policies, progress in the house of age",
            },
            9: {
                hindi: "भाग्यबल से धन प्राप्त करता है, धर्म का पालन करता है, भाई-बहनों का आदर करता है, भाग्यशाली होता है, ईश्वर में विश्वास रखता है, मान-सम्मान और परिवार पाता है तथा सम्माननीय होता है।",
                english:
                    "Gets wealth through power of destiny, rears Dharma, respects the brothers and sisters, fortunate, has belief in God, gets honour and family and is respectable",
            },
            10: {
                hindi: "पिता के द्वारा संपत्ति, व्यापार के द्वारा अपार धन, सरकार व समाज में सम्मान, उन्नति की इच्छा, धन भाव में कुछ बंधन",
                english:
                    "Property through father, huge wealth through business, gets respect in government and society, desire to progress, some bondage in the house of wealth",
            },
            11: {
                hindi: "प्रचुर धन अर्जित होता है, शिक्षा में उन्नति होती है, पारिवारिक लाभ होता है तथा संतान से लाभ होता है, सुखमय उन्नति होती है।",
                english:
                    "Earns huge wealth, progress regarding education, family gains and gains through children, gets happy progress",
            },
            12: {
                hindi: "मन के संयोग और दूसरों के संपर्क से धन प्राप्ति, घर-परिवार में बड़ी हानि, नीच व्यक्तियों से लाभ की संभावना, व्यय पर अंकुश लगाने का प्रयास।",
                english:
                    "Gets wealth through union ofmind and contact with others, great loss in the house offamily, benefit likely through low persons, tries to check the expenditure",
            },
        },
        Mars: {
            1: {
                hindi: "शारीरिक श्रम से लाभ, अत्यधिक लाभ, शरीर में कुछ रोग व दुर्बलता, माता के घर में अशांति, सुख-शांति में कुछ बाधा, शत्रु के घर में प्रभाव, पत्नी के घर में कुछ चिंता, कुछ उतावलापन",
                english:
                    "Gains through physical labour, gets huge gains, gets some diseases and weakness in the body, restlessness in the house ofmother, some hindrance in peace and happiness, keeps influence in the house of enemies, some anxiety in the house of wife, somewhat rash",
            },
            2: {
                hindi: "धन में भारी हानि, परिवार में भी हानि, मातृ एवं पितृ पक्ष की ओर से कमजोरी, धन प्राप्ति हेतु कठोर परिश्रम, जटिल नीतियों द्वारा कुछ गुप्त लाभ, संतान पक्ष में कुछ कष्ट, धर्म में बाधा",
                english:
                    "Heavy loss in wealth, also in family, weakness on the side ofmaternal and paternal house, works hard to get wealth, some secret gains by intricate policies, some distress in the house of children, obstacles in Dharma",
            },
            3: {
                hindi: "शत्रु भाव पर गहरा प्रभाव, परिश्रम से भारी लाभ, बड़े अभिमान से काम, भाइयों से शत्रुता, सरकार और समाज में बहुत प्रभाव और लाभ, पिता से शत्रुता, वीर, साहसी, धर्म में कुछ शत्रुता अनुभव करता है।",
                english:
                    "Great influence on the house of enemy, heavy gains by his labour, works with great pride, enmity with brothers, gets much influence and gains in government and society, enmity with father, brave, courageous, and feels some enmity in Dharma",
            },
            4: {
                hindi: "माता के घर में कुछ लाभ और कुछ हानि, नाना के घर से सहायता, भूमि और भवन से लाभ, सुख के संबंध में मिश्रित भाव, शत्रुओं की परवाह न करना परन्तु उनसे लाभ, पत्नी की ओर से मिश्रित संबंध, पिता के घर में कुछ उद्योग तथा सरकार और समाज",
                english:
                    "Some gains and some loss in the house ofmother, help from the side ofmaternal grandfather's house, gets gains from lands and buildings, mixed feeling with regard to happiness, does not care for enemies but gains from them, mixed relations from the side of wife, some industry in the house of father and the government and society",
            },
            5: {
                hindi: "बुद्धि और विद्या के परिश्रम से धन प्राप्त होता है, शत्रु पर विजय प्राप्त होती है, पुत्र-पुत्रियों से बाधाएँ आती हैं, कुछ चिंताएँ होती हैं।",
                english:
                    "Gets income by labour of the intellect and education, defeats the enemy, faces obstacles from sons and daughters, some anxieties",
            },
            6: {
                hindi: "मातृपक्ष और दादापक्ष में प्रबलता, धर्म में कुछ बाधाएँ, रोगों से ग्रस्त, लाभ भाव में बहुत बलवान, व्यय से दुखी और आय में कमी तथा बहुत साहसी मिथुन* 67",
                english:
                    "Strength in the mother's side and grandfather's house, some obstacles in the Dharma, suffers from diseases, keeps great strength in the house of gains, unhappy with expenditure and deficient income and is very courageous Gemini * 67",
            },
            7: {
                hindi: "दैनिक कार्य में अत्यधिक परिश्रम से धन की प्राप्ति, सरकार और समाज से कुछ लाभ, शत्रुता, पिता के घर से प्रभाव, परिवार में कुछ कमी, यौन सुख के कारण कोई रोग।",
                english:
                    "Gain in wealth through very hard labour in daily occupation, gets some gains from the government and society, some enmity, gains the influence from the house offather, some deficiency in the family, gets some disease in connection with sexual pleasures",
            },
            8: {
                hindi: "दीर्घायु में उन्नति, विदेश में परिश्रम से स्थायी लाभ, धन भाव में न्यूनता, आय को बनाये रखने का प्रयास, भाई से मिले-जुले संबंध",
                english:
                    "Progress in longevity, permanent gains by hard work in foreign countries, deficiency in the house of wealth, tries to maintain the income, mixed relations with brother",
            },
            9: {
                hindi: "भाग्य से लाभ, कुछ अधिक खर्च और कुछ चिंताएं मिलती हैं व्यय के घर में, लापरवाही, भगवान के घर में कमी",
                english:
                    "Gains from destiny, spends somewhat more and gets some worries in the house ofexpenditure, careless, deficiency in the house ofGod",
            },
            10: {
                hindi: "प्रभावशाली एवं परिश्रमी कार्य, सरकार एवं समाज से लाभ, शत्रु भाव से विजय एवं लाभ, पिता भाव से कष्ट, शिक्षा भाव में परिश्रम से सफलता, संतान पक्ष में कष्ट के साथ कुछ लाभ, मातृ सुख में कमी",
                english:
                    "Does influential and laborious deeds, gains from government and society, victory and gains from the house of enemy, difficulties with house of father, success with hard labour in the house of education, some gains with difficulty in the side of children, deficiency in the maternal happiness",
            },
            11: {
                hindi: "भारी लाभ और आय, नाना पक्ष से लाभ, शत्रु भाव से भी भारी लाभ और प्रभाव की प्रबलता, उद्योग से लाभ, संचित धन भाव में कमजोरी, अत्यधिक प्रभाव और अधिकार से लाभ, संतान पक्ष में कुछ चिंता",
                english:
                    "Gets huge gains and income, gains from maternal grandfather's side, also get heavy gains and strength of influence from the house of enemy, gains through industry, weakness in the accumulated house ofwealth, gets gains with great influence and authority, some worry in the side of children",
            },
            12: {
                hindi: "आय भाव में चिंता और कमजोरी महसूस होती है, शत्रु भाव में काम बन जाता है, भाई-बहन भाव में कुछ उलझन रहती है, पत्नी भाव में बेचैनी रहती है, अधिक खर्च होता है, यौन विकार होता है।",
                english:
                    "Feels worry and weakness in the house of income, gets the work done in the house ofenemy, some perplexity in the house of brothers and sisters, restlessness in the house ofwife, spends much, gets some sexual disorder",
            },
        },
        Mercury: {
            1: {
                hindi: "बहुत सुन्दर और सुडौल शरीर वाला, भूमि और भवन का बल, दूसरों से बल, व्यवसाय में सुखी, सम्मान, आत्मज्ञान, पत्नी से सुख और सुखी होता है।",
                english:
                    "Is very handsome and is ofgood body, has the strength oflands and buildings, strength from others, happy in the occupation, gets honour, self-knowledge, happiness from wife and happy",
            },
            2: {
                hindi: "अपार धन-संपत्ति का संचय होता है, भूमि-भवन, मातृ-सुख, परिवार एवं धन-संपत्ति में वृद्धि होती है, दैनिक दिनचर्या में प्रसन्नता का अनुभव होता है।",
                english:
                    "Accumulates huge wealth, gets lands and buildings, maternal happiness, increase in family and wealth, feels happy in the daily routine",
            },
            3: {
                hindi: "भाई-बहनों से सुख, भूमि की प्राप्ति, माता से सुख, धर्म की प्रतिष्ठा, यश, न्यायपूर्ण विचार, साहस और उत्साह प्राप्त होता है।",
                english:
                    "Happiness with brothers and sisters, gets land, happy with mother, honours Dharma, gets fame, thinks fair, gets courage and enthusiasm",
            },
            4: {
                hindi: "सुखपूर्वक जीवन व्यतीत करता है, शरीर सुडौल होता है, पिता के घर में कमी रहती है, शासन-समाज की परवाह नहीं करता, भवन-संपत्ति प्राप्त करता है, आध्यात्मिक शक्तियों से सुखी होता है, लापरवाह होता है।",
                english:
                    "Lives happily, has a good physique, deficiency in the house offather, does not care for government and society, gets buildings and property, happy with spiritual powers, careless",
            },
            5: {
                hindi: "गहन विद्या बुद्धि प्राप्त होती है, संतान सुख मिलता है, माता का सहयोग मिलता है, शांति चाहता है तथा मन में चिंता रहती है, संतान की उपेक्षा करता है",
                english:
                    "Gets deep educational intellect, gets happiness of children, gets support from the mother, wants peace and is worried in mind, ignores the children",
            },
            6: {
                hindi: "दुखी, चिंतित और आश्रित, भवन, भूमि और आवासीय मामलों का नुकसान, अधिक खर्च करने वाला, दूसरों को खुशी देने वाला और बुद्धिमान होता है।",
                english:
                    "Unhappy, worried and dependent, loss ofbuildings and lands and residential affairs, spends much, gives happiness to others, and is wise",
            },
            7: {
                hindi: "व्यवसाय से प्रसन्न, पत्नी से प्रसन्न, आध्यात्मिक उन्नति की प्रबल इच्छा, यौन जीवन और सुखों में परम सुख प्राप्त करने वाला तथा आत्म-गौरवशाली",
                english:
                    "Happy with occupation, happy with wife, has great desires for spiritual progress, gets greatest happiness in sexual life and pleasures and has self-pride",
            },
            8: {
                hindi: "शारीरिक शक्तियों में कमी, पत्नी के घर में कुछ उन्नति, जीवन की दिनचर्या में सुख, धन संचय में उन्नति और सफलता, भूमि और भवन की कमी, विदेश में सुख, अव्यवस्थित वातावरण, बलवान",
                english:
                    "Deficiency in physical powers, gets some progress in the house of wife, happiness in the daily routine oflife, progress and success for accumulating wealth, deficiency of lands and buildings, feels happiness in foreign countries, disordered atmosphere, and has force",
            },
            9: {
                hindi: "बहुत भाग्यशाली, सुन्दर शरीर वाला, माता से सुख, भवन और संपत्ति प्राप्त करने वाला, धारणा पालने वाला, ईश्वर में आस्था रखने वाला, महानता और संतोष का पालन करने वाला, भाई-बहनों के घर से सुख, दूरदर्शी होता है।",
                english:
                    "Is very fortunate, has good physique, happiness from mother, gets buildings and property, rears Dharrna, faith in God, rears greatness and satisfaction, happiness from the house of brother and sisters, has foresight",
            },
            10: {
                hindi: "पिता के भाव में कमजोरी मिलती है, मान-सम्मान में कमी आती है, शरीर में कमजोरी आती है, सामाजिक और सरकारी माहौल में कुछ कमजोरी मिलती है, आलसी माना जाता है, उन्नति के भाव में रुकावटें आती हैं",
                english:
                    "Gets weakness in the house offather, gets honour, weakness in the body, gets some weakness in the social and government atmosphere, thought to be lazy, gets obstructions in the house ofprogress",
            },
            11: {
                hindi: "शारीरिक बल से भारी लाभ प्राप्त होता है, सुख की अधिकता होती है, अनेक सुखमय वस्तुएं प्राप्त होती हैं, भवन और संपत्ति प्राप्त होती है, संतान से सुख मिलता है, शिक्षा के घर में सुख मिलता है, बहुत चतुर होता है।",
                english:
                    "Gets huge gains by physical forces, gets much strength ofhappiness, gets many happy things, gets buildings and property, happiness from children, happiness in the house of education, is very clever",
            },
            12: {
                hindi: "भौतिक सुखों में कमी, शरीर में दुर्बलता, अन्यत्र भ्रमण करने वाला, माता से दुखी, मातृभूमि और भवनों से दुखी, अधिक व्यय करने वाला, सभी के साथ मिलकर अपना काम पूर्ण करने वाला, घुमक्कड़ स्वभाव का होता है।",
                english:
                    "Gets deficiency in physical pleasures, weakness in body, goes to other places, unhappy with mother, unhappy with motherland and buildings, spends much, gets his work done fully with everyone, is a wanderer",
            },
        },
        Jupiter: {
            1: {
                hindi: "पत्नी के घर में महत्व मिलता है, विशेष महत्व वाला व्यवसाय होता है, पिता से सहायता मिलती है, सरकार और समाज से लाभ मिलता है, बच्चों को बल मिलता है, अच्छी शिक्षा मिलती है, अच्छा स्वस्थ शरीर मिलता है, कड़ी मेहनत करता है।",
                english:
                    "Gets importance in the house ofwife, has an occupation which gives special importance, help from father, gains from government and society, gets strength of children, gains good education, gets good healthy body, works hard",
            },
            2: {
                hindi: "अपने प्रयासों से धन में वृद्धि, पिता से सहायता, कुछ बंधन और पत्नी के घर से सहायता, जीवन की दिनचर्या में चिंता, शत्रु के घर में भारी प्रभाव रखता है, सरकार और समाज में काम करने के कारण धन प्राप्त करता है, धनी परिवार से होता है",
                english:
                    "Increase in wealth by his efforts, help from father, some bondage and help from the house ofwife, worry in the daily routine of life, keeps huge influence in the house of enemy, gets wealth due to work in the government and society, comes from a wealthy family",
            },
            3: {
                hindi: "पत्नी के घर में विशेष महत्व, शक्ति और सुंदरता प्राप्त होती है, सरकार और समाज से जुड़ा हुआ, यौन सुख की शक्ति का बड़ा लाभ, भाइयों और बहनों से सहायता, धर्म में कमी, बहुत ऊर्जावान और साहसी होता है।",
                english:
                    "Gets special importance, strength and beauty in the house ofwife, connected with government and society, enjoys huge strength of power of sexual pleasures, help from brothers and sisters, deficiency in Dharma, is very energetic and courageous",
            },
            4: {
                hindi: "व्यापार और व्यवसाय का सुख मिलता है, माता के घर से सम्मान मिलता है, पिता के घर से भी सुख मिलता है, दैनिक कार्य सम्मान और उच्च तरीके से करता है, सरकार और समाज से सुख मिलता है, भूमि और भवन का बल मिलता है, मेहनती और सम्माननीय होता है।",
                english:
                    "Gets happiness of business and occupation, gets honour from the house of mother, also happiness from the house of father, does the daily occupation with dignity and in a lofty manner, gets happiness from government and society, gets the strength oflands and buildings, is industrious and honourable",
            },
            5: {
                hindi: "खूब शिक्षा पाता है, खूब कौशल और चतुराई रखता है, संतान सुख पाता है, व्यापार भाव पर व्यापार व्यवसाय का ज्ञान और पत्नी की गरिमा और यौन सुख, सरकार और समाज से सम्मान, सौभाग्य प्राप्त करता है",
                english:
                    "Gets much education, has great skill and cleverness, gets the happiness of children, knowledge of business occupation on the house of business and the dignity of wife and sexual pleasures, honour from government and society, gets good luck",
            },
            6: {
                hindi: "आश्रित व्यवसाय करता है, शत्रु भाव में अधिक प्रभाव और सम्मान पाता है, पत्नी भाव से कठोर, धन भाव में उन्नति, यौन सुख में कमी",
                english:
                    "Does dependent occupation, gets much influence and honour in the house ofenmity, harsh from the house ofwife, progress in the house ofwealth, deficiency in the sexual pleasures",
            },
            7: {
                hindi: "सामान्य जनता से संबंधित कार्यों में दैनिक व्यवसाय, व्यवसाय के घर में बहुत सम्मान और प्रगति मिलती है, सरकार और समाज से लाभ होता है, पिता और पत्नी से सहायता मिलती है, भाइयों और बहनों से भी मदद मिलती है, भावुक, उत्साही और बहुत भाग्यशाली होता है",
                english:
                    "Daily occupation ofthe deeds relating to the general public, gets much respect and progress in the house ofbusiness occupation, gains from government and society, help from father and wife, also from brothers and sisters, is passionate, enthusiastic and very fortunate",
            },
            8: {
                hindi: "पत्नी व पिता के भाव में हानि, व्यापार व्यवसाय के लिए कष्टकारी कार्य, विदेश से कष्ट, सरकार व समाज के भाव में कमजोरी, बेचैनी, मातृ सुख में कमी",
                english:
                    "Loss in the house ofwife and father, does troublesome deeds for business occupation, difficulties from foreign countries, weakness in the house of government and society, feels restless, gets some maternal happiness",
            },
            9: {
                hindi: "पिता और पत्नी से कुछ अप्रसन्नता, कुछ असंतोष महसूस होता है, भाग्य भाव में शक्ति मिलती है, संतान से सहयोग मिलता है, शिक्षा मिलती है",
                english:
                    "Some unhappiness with father and wife, feels some dissatisfaction, gets power in the house of destiny, gets support from children, gets education",
            },
            10: {
                hindi: "व्यापार में बहुत सम्मान और प्रतिष्ठा प्राप्त होती है, व्यवसाय के घर में उन्नति होती है, पिता से सहायता मिलती है, सरकार और समाज में सम्मान मिलता है, पत्नी से सहायता मिलती है, सांसारिक मामलों में महान अधिकार प्राप्त होता है।",
                english:
                    "Feels great respect and dignity in business, progress in the house of occupation, help from father, gets honour in government and society, help from wife, great authority in worldly affairs",
            },
            11: {
                hindi: "भारी लाभ, मान-सम्मान और स्वस्थ पिता, पत्नी की हानि, दैनिक व्यवसाय में सम्मान, पिता से लाभ, सरकार और समाज में लाभ, भाई-बहनों से सहायता, यौन सुख के बहुत अच्छे साधन, महत्वाकांक्षी, धन, संतान और शिक्षा का सुख पाने वाला और बहुत चतुर होता है।",
                english:
                    "Huge gains, dignity and healthy father, loss ofwife, respect in the daily occupation, gains from father, gains in the government and society, help from brothers and sisters, very good means of sexual pleasures, ambitious, gets the happiness of wealth, children and education and is very clever",
            },
            12: {
                hindi: "पिता के घर में कमजोरी, पत्नी के घर में भारी नुकसान, सरकार और समाज से सम्मान पाने में कमजोरी, साथ ही व्यवसाय में भी कमजोरी, भूमि और भवन के घर में कुछ मजबूती, जीवन की दिनचर्या में बेचैनी, यौन सुख में कमजोरी",
                english:
                    "Weakness in the house of father, great loss in the house ofwife, weakness in getting honour from government and society and also in the line ofoccupation, some strength in the house ofland and buildings, feels restlessness in the daily routine oflife, weakness in sexual pleasures",
            },
        },
        Venus: {
            1: {
                hindi: "स्वस्थ शरीर, मन की शक्ति, चतुर, संतान की हानि के संबंध में कमजोर, पत्नी और यौन सुख के बारे में बहुत कुछ कहता है",
                english:
                    "Healthy body, has strength of mind, clever, deficiency with regard to loss of children, speaks much on wife and sexual pleasures",
            },
            2: {
                hindi: "धन में कुछ हानि, योजना बनाकर धन अर्जित करना, शिक्षा प्राप्त करना, कुछ मानसिक चिंताएँ महसूस करना, धन के लिए कड़ी मेहनत करना",
                english:
                    "Some loss in wealth, earns wealth by planning, acquires education, feels some mental worries, works hard for wealth",
            },
            3: {
                hindi: "भाई-बहनों के घर में कमी, शिक्षा में कमी, संतान से दुखी, बहुत चतुर और साहसी",
                english:
                    "Deficiency in the house of brothers and sisters, deficiency in education, unhappy with children, very clever and courageous",
            },
            4: {
                hindi: "माता से वियोग, मातृभूमि व जन्मभूमि से वियोग, शासन व समाज में उन्नति, शिक्षा में कमजोर, संतान से दुखी, किसी घरेलू दुःख के कारण मानसिक चिंता",
                english:
                    "Loss with mother and separation from motherland and birthplace progress in government and society, weak in education, unhappy with children, feels mental worry due to some domestic unhappiness",
            },
            5: {
                hindi: "अच्छी शिक्षा, बच्चों से नाखुश, खर्च में बढ़ोतरी",
                english:
                    "Good education, unhappy with children, gains in expenditure",
            },
            6: {
                hindi: "शिक्षा में कमजोर, संतान से कष्ट, व्यय, शत्रु पक्ष से कुछ कष्ट, अधिक व्यय, गुप्तचर",
                english:
                    "Weak in education, feces suffering from children, expenditure, some suffering in the side ofenemies, spends much, secretive",
            },
            7: {
                hindi: "दैनिक कार्य में अच्छी शक्ति मिलती है, संतान पक्ष में कुछ कमजोरी, पत्नी पक्ष से कुछ चिंता, यौन सुख मिलता है, परिवार और पत्नी पर अधिक खर्च होता है",
                english:
                    "Gets good strength in daily occupation, some weakness in the side of children, some worries from wife side, gets sexual pleasures, spends heavily on family and wife",
            },
            8: {
                hindi: "शिक्षा में कमजोरी, संतान पक्ष में हानि, धन वृद्धि में प्रयत्नशील रहना, व्यय में कुछ कमी।",
                english:
                    "Weakness in education, loss in the side ofchildren, makes efforts in increasing the wealth, some deficiency of expenditure",
            },
            9: {
                hindi: "विद्या भाव में न्यूनता तथा उसे प्राप्त करने के लिए अच्छी शक्ति का न होना, भाग्य उन्नति भाव में बुद्धि का तेज प्राप्त करने में अच्छी चतुराई, संतान पक्ष में लाभ, भाई-बहनों से अधिक सुख न मिलना।",
                english:
                    "Deficiency in the house of education and having good strength to achieve it, decent cleverness in getting splendour ofintellect in the house ofprogress ofdestiny, gains in the side ofchildren, not much happiness from brothers and sisters",
            },
            10: {
                hindi: "संतान से शिक्षा और बल मिलता है, घर से संतोष और व्यापार में मजबूती मिलती है, लेकिन हर मामले में कमजोरी मिलती है, अधिक खर्च करने वाला, माता से शत्रुता रखने वाला, सुखों की परवाह न करने वाला, बहुत चतुर और प्रभावशाली होता है।",
                english:
                    "Gets education and strength ofchildren, satisfaction from the house and strength ofbusiness, but gets weakness in every matter, spends much, enmity with mother, does not care for pleasures, is very clever and influential",
            },
            11: {
                hindi: "अधिक शिक्षा प्राप्त करने से लाभ, संतान में कुछ कमी, लाभ प्राप्त करने में चतुर, तथा बुद्धिमान",
                english:
                    "Gains of acquiring much education, some deficiency in children, clever in acquiring gains, and intelligent",
            },
            12: {
                hindi: "विद्या भाव में बहुत कमजोरी, संतान पक्ष में हानि, अधिक व्यय, शत्रु भाव में कार्य निकालने में चतुर, कुछ संदिग्ध बुद्धि",
                english:
                    "Much weakness in the house ofeducation, has loss in the side of children, spends much, clever in getting the work done in the house of enemy, some suspicious intellect",
            },
        },
        Saturn: {
            1: {
                hindi: "सौभाग्य, उन्नति की चिंता, अच्छी दीर्घायु, भाई-बहनों के घर की चिंता",
                english:
                    "Fortunate, worries about progress, good longevity, worry in the house ofbrothers and sisters",
            },
            2: {
                hindi: "संचित धन की हानि, दिनचर्या में आलस्य, घर-परिवार में कमजोरी और बाधाएं",
                english:
                    "Loss in accumulated wealth, spends the daily routine lazily, weakness in the house of family and also hindrances",
            },
            3: {
                hindi: "बहुत कठिन परिश्रम करता है, भाई-बहनों से दुखी रहता है, दीर्घायु होता है, तामसिक धर्म का पालन करता है, बहुत कठिन परिश्रम करता है और बहुत खर्च करता है",
                english:
                    "Labours very hard, unhappy with brothers and sisters, good longevity, follows Tammasic Dharma, toils very hard and spends much",
            },
            4: {
                hindi: "मातृ स्नेह में कुछ हानि, प्रभाव से जीवन की दिनचर्या व्यतीत, कुछ चिंता और कुछ भाग्य, भवन प्राप्ति में लगे रहते हैं।",
                english:
                    "Some loss in the maternal affection, spends the daily routine of life with influence, some worry and some fortune, engaged in acquiring buildings",
            },
            5: {
                hindi: "महान बुद्धि, संतान से बल, विद्या प्राप्ति, आय भाव में कमी, पत्नी भाव में अशांति",
                english:
                    "Has great wisdom, gets the strength ofchildren, acquires education, deficiency in the house of income, restless in the house ofwife",
            },
            6: {
                hindi: "जीवन को उन्नत करने के लिए भव्य, जटिल, श्रमसाध्य, धार्मिक उपायों से कार्य करवाता है, धर्म की परवाह नहीं करता, भाई-बहनों से शत्रुता रखता है, शत्रु के घर में प्रभाव रखता है, अधिक व्यय करता है, ईश्वर में विश्वास नहीं रखता तथा कुछ हद तक प्रसिद्ध होता है।",
                english:
                    "Gets work done with grand, intricate, laborious, religious devices to develop the life, not caring for religion, enmity with brothers and sisters, influence in the house ofenemy, spends much, no faith in God and is somewhat famous",
            },
            7: {
                hindi: "दैनिक जीवन में उन्नति, व्यवसाय में उन्नति, यश, सुख, भोग विलास, दीर्घायु, सौभाग्य की प्राप्ति होती है।",
                english:
                    "Progress in the daily life ofoccupation, gets fame in the progress of occupation, acquires more happiness and sexual pleasures, good longevity, and fortunate",
            },
            8: {
                hindi: "अच्छी आयु, विदेश से उन्नति और भाग्य के भाव में बाधा, व्यवसाय की रेखा में प्रसिद्धि, विवाह के सुख में उन्नति, व्यवसाय में उन्नति, बुद्धि और शिक्षा के भाव में विशेष बल, संतान के भाव में कमी, सरकार और समाज में उन्नति",
                english:
                    "Good longevity, hindrances in the house of progress and destiny through foreign countries, fame in the line of occupation, progress in the happiness ofmarriage, progress in occupation, special force in the house of intellect and education, deficiency in the house of children, progress in government and society",
            },
            9: {
                hindi: "दीर्घायु, सौभाग्यशाली एवं उन्नतिशील, धर्म भाव में कमजोरी, आय में कमी, शत्रु भाव में अधिक प्रभाव, भाई-बहनों से अप्रसन्नता, विदेश से सम्पर्क",
                english:
                    "Long life, fortunate and progress, weakness in the house of Dharma, deficiency in income, great influence in the house ofenemy, unhappy with brothers and sisters, contact with foreign countries",
            },
            10: {
                hindi: "पिता के घर में हानि, उन्नति की रेखा में वृद्धि, सरकार और समाज में सम्मान पाने के लिए बड़े-बड़े काम करता है, चिंताएं होती हैं, अधिक खर्च होता है, दैनिक व्यवसाय में उन्नति होती है, पत्नी और परिवार से कुछ दुश्मनी होती है, प्रभावशाली होता है।",
                english:
                    "Loss in the house of father, rise in line of progress, does grand deeds to get respect in government and society, gets worries, spends much, progress in the daily occupation, some enmity with wife and family, influential",
            },
            11: {
                hindi: "आय भाव में कुछ कमजोरी, कुछ चिंता रहेगी, विद्या व बुद्धि भाव में विशेष बल, संतान से सहयोग, महत्वाकांक्षी",
                english:
                    "Some weakness in the house of income, gets some worry, special strength in the house of education and intellect, support from children, ambitious",
            },
            12: {
                hindi: "जीवन में बेचैनी, धर्म में कमजोरी, अधिक व्यय, धन वृद्धि का प्रयास, शत्रु पक्ष में अधिक प्रभाव, धन में कुछ हानि, यश में कमी, तथा कुछ हद तक अवैयक्तिकता।",
                english:
                    "Restless in life, weakness in Dharma, more expenditure, tries to increase the wealth, great influence in the side ofenemy, some loss in wealth, deficiency in fame, and somewhat impersonal",
            },
        },
        Rahu: {
            1: {
                hindi: "लंबा कद, हृदय में गहरी और कटु नीतियाँ पालन करने वाला, आत्म-अभिमानी, यश पाने में सफल, आवश्यकता से अधिक विचार रखने वाला, आध्यात्मिक ज्ञान वाला",
                english:
                    "Gets tall stature, follows deep and bitter policies in heart, has self- pride, succeeds in getting fame, moves his ideas more than necessary beyond limit, has spiritual knowledge",
            },
            2: {
                hindi: "धन भाव में हानि होती है, हानि के कारण अत्यधिक चिंतित रहता है, परिवार भाव में अत्यधिक कष्ट होता है, धन कमाने के लिए गुप्त योजनाएँ बनाता है, दूसरों का सर्वोत्तम लाभ उठाता है।",
                english:
                    "Gets losses in the house of wealth, highly worried on account of loss, great distress in the house offamily, makes secret schemes for making wealth, takes the best of others",
            },
            3: {
                hindi: "भाई-बहनों की हानि और कष्ट, हिम्मत नहीं हारता, कठोर परिश्रम करता है, थक जाता है और डरपोक, स्वार्थी, बहुत साहसी होता है",
                english:
                    "Loss and distress ofbrothers and sisters, does not lose courage, does hard labour, gets fatigued and is timid, selfish, very courageous",
            },
            4: {
                hindi: "माता के सुख में कमी, भूमि-भवन से संबंधित हानि, गृहस्थ जीवन में दुःख, अति गंभीर",
                english:
                    "Deficiency in the happiness ofmother, gets loss in connection with lands and buildings, unhappy in domestic life, very serious",
            },
            5: {
                hindi: "बुद्धि में कमी, शिक्षा भाव में कमी, संतान पक्ष में कुछ हानि और चिंता",
                english:
                    "Deficiency in wisdom, deficiency in the house of education, some loss and worries in the side of children",
            },
            6: {
                hindi: "शत्रु भाव में उच्च प्रभाव रखने वाला, नाना भाव में हानि, रोग आदि की चिंता न करने वाला, धर्म की परवाह न करने वाला, पाप और अपराध करने वाला, स्वार्थी और साहसी",
                english:
                    "Keeps high influence in the house of enemies, loss in maternal grandfather house, does not care for worries like disease etc, does not care for Dharma, commits sins and crimes, selfish and brave",
            },
            7: {
                hindi: "पत्नी के घर में हानि और कठिनाइयाँ, दैनिक कार्य में गहरी चिंताएँ, यौन सुख के घर में कमी और दुःख, यद्यपि कुछ गुप्त और अनुचित तरीके से, आलसी",
                english:
                    "Loss and difficulties in the house of wife, deep worries in daily occupation, deficiency and sorrows in the house of sexual pleasures though in a somewhat secret and improper way, lazy",
            },
            8: {
                hindi: "बहुत चिंता करता है, कभी-कभी घातक और तंत्रिका संबंधी परेशानियों का सामना करना पड़ता है, बहुत गुप्त सोचता है, जीवन की दिनचर्या में कमी महसूस करता है, पेट की समस्याएं होती हैं",
                english:
                    "Worries a lot, sometimes has to face fatal and nervous troubles, thinks very secret, feels deficiency in the daily routine oflife, gets stomach troubles",
            },
            9: {
                hindi: "पिता के घर में कमजोरी, धर्म पालन में कमजोरी, ईश्वर के प्रति आस्था में कमी, अंततः भाग्य में कुछ दृढ़ता मिलती है।",
                english:
                    "Weakness in the house of father, weakness in rearing Dharma, deficiency in the faith ofGod, finally gets some firmness ofdestiny",
            },
            10: {
                hindi: "पिता के घर में चिंता, अपनी उन्नति के लिए कुछ कष्टकारी युक्तियों से काम लेता है, सरकार और समाज के घर में कमजोरी और परेशानी, बड़ी सावधानी से स्थिति को नियंत्रित करता है और अंत में उन्नति पाता है",
                english:
                    "Worry in the house of father, works through some troublesome devices for his progress, weakness and trouble in the house of government and society, controls the situation with great care and at last gets progress",
            },
            11: {
                hindi: "भारी आय अर्जित करता है और लाभ प्राप्त करता है, घर में स्वार्थ बढ़ता है",
                english:
                    "Earns huge income and gets gains, selfishness in the house",
            },
            12: {
                hindi: "कभी-कभी अधिक व्यय के कारण परेशानी उठाता है, अन्य स्थानों के संबंध में लापरवाह होता है, गुप्त उपकरणों से काम करता है और दूर से सोचता है",
                english:
                    "Sometimes bears troubles on account ofhigh expenditure, careless in connection with other places, works with secret devices and thinks remotely",
            },
        },
        Ketu: {
            1: {
                hindi: "शरीर में अत्यधिक कमजोरी और बेचैनी, सौंदर्य में कमी, कभी-कभी शरीर को घातक आघात या खतरा, हृदय में कमजोरी, अत्यधिक धैर्य, गुप्त और जिद्दी स्वभाव",
                english:
                    "Great weakness and anxiety in the body, deficiency of beauty, sometimes gets some fatal stroke or danger to body, feels weakness in heart, has great sense ofpatience, secretive and obstinate fellow",
            },
            2: {
                hindi: "धन भाव में भारी हानि और निराशा, परिवार में क्लेश, धन प्राप्ति के लिए कठोर परिश्रम, अंततः सफलता मिलती है",
                english:
                    "Great loss and frustrations in the house of wealth, distress in the family, works hard to get wealth, finally gets success",
            },
            3: {
                hindi: "भाई-बहनों के घर में बड़ी चिंताएँ और कठिनाइयाँ, भाईचारे का प्रभाव खोना, गंभीर परिश्रम करना, कठिन परिश्रम करना",
                english:
                    "Great worries and difficulties in the house ofbrothers and sisters, loses brotherly effect, does serious labour, toils hard",
            },
            4: {
                hindi: "माता के घर में हानि और कमी, भूमि और भवन के संबंध में कुछ बाधाएं, कई अशांति और कठिनाइयों के बाद सुख के घर में स्थिर स्थिति",
                english:
                    "Loss and deficiency in the house of mother, some hindrances in connection with lands and buildings, stable position in the house of happiness after many disturbances and difficulties",
            },
            5: {
                hindi: "शिक्षा प्राप्त करने में कठिनाई, कुछ मानसिक चिंताएं, बच्चों की ओर से कुछ हानि, दूसरों को अपने विचार समझाने में असमर्थ, कुछ कड़वा बोलने वाला, स्वार्थी बुद्धि वाला तथा नम्रता का अभाव।",
                english:
                    "Difficulties in acquiring education, bears some mental worries, some losses on the part ofchildren, unable to make others understand the ideas, speaks somewhat bitterly, full of selfish intellect and lacks gentleness",
            },
            6: {
                hindi: "शत्रु भाव में प्रबल प्रभाव रखता है, नाना पक्ष से हानि, कठिनाइयों व चिंताओं पर विजय पाने के लिए आंतरिक दृढ़ता व प्रखर शक्ति का प्रयोग करता है, स्वार्थी व निडर होता है।",
                english:
                    "Keeps huge influence in the house ofenemies, loss on the side of maternal grandfather, uses inner firmness and rash power to win difficulties and worries, selfish and fearless",
            },
            7: {
                hindi: "पत्नी में विशेष शक्ति का संयोग, अत्यधिक यौन सुख प्राप्त होता है, दैनिक कार्य के घर में महान कार्य करता है, घरेलू मामलों के प्रबंधन में शांति की कुछ कमी होती है",
                english:
                    "Union ofsome special strength in wife, gets excess sexual pleasures, does great deeds in the house of daily occupation, gets some deficiency of peace in the management of domestic affairs",
            },
            8: {
                hindi: "जीवन की दैनिक दिनचर्या में कुछ बेचैनी और चिंताएं रहती हैं, कड़ी मेहनत करनी पड़ती है और पेशेवर जीवन में कठिनाइयों का सामना करना पड़ता है, पेट की कुछ शिकायतें रहती हैं",
                english:
                    "Bears some restlessness and worries in the daily routine of life, labours hard and faces difficulties helping the professional life, gets some stomach complaints",
            },
            9: {
                hindi: "भाग्य भाव में कुछ चिंताएं होती हैं, उन्नति के लिए बहुत मेहनत करनी पड़ती है, धर्म भाव में कुछ हानि होती है, प्रसिद्धि पाने में कठिनाई होती है, असफल और स्वार्थी होता है।",
                english:
                    "Bears some worries in the house of destiny, labours very hard for making progress, some loss in the house ofDharma, difficulties in getting fame, unsuccessful and selfish",
            },
            10: {
                hindi: "पद प्राप्ति में कुछ हानि और कुछ चिंता, शासन-समाज के कार्यों में सम्मान पाने के लिए कठोर परिश्रम करता है, अंत में कुछ प्रबल शक्ति प्राप्त करता है।",
                english:
                    "Some loss and some worry in the way ofposition, does hard work to get honour in the works ofgovernment and society, at the end gets some strong power",
            },
            11: {
                hindi: "आय भाव में बल, लाभ भाव में उन्नति, कुछ अनाधिकृत लाभ, कुछ गुप्त बल से सफलता",
                english:
                    "Strength in the house of income, progress in the house of gains, gets some unauthorised gains, gets some success with some hidden strength",
            },
            12: {
                hindi: "बहुत खर्च करता है, खर्च का सामना करने के लिए कड़ी मेहनत करता है",
                english: "Spends much, labours hard to face expenditure",
            },
        },
    },
    Cancer: {
        Sun: {
            1: {
                hindi: "प्रतिष्ठित एवं धनवान, यशस्वी, पत्नी एवं व्यवसाय से लाभ में कुछ नीरसता, कुछ बाधाएं भी अनुभव करता है, परिवार युक्त होता है।",
                english:
                    "Is dignified and wealthy, glorious, some dullness in the gains from the side ofwife and occupational pursuits and in addition feels some hindrances also, possesses family",
            },
            2: {
                hindi: "बहुत धनवान और बड़े परिवार वाला, जीवन की दिनचर्या में चिंताग्रस्त, धन पक्ष से प्रभाव, धन में वृद्धि और बहुत सम्मानीय होता है।",
                english:
                    "Is very rich and possesses a big family, anxiety in the daily routine of life, influence from the side ofwealth, increases the wealth and is much respected",
            },
            3: {
                hindi: "धन और यश अर्जित करता है, धर्म की उन्नति करता है, भाग्यशाली माना जाता है, भाई-बहनों से युक्त होता है, उच्च पारिश्रमिक पर कठोर परिश्रम करता है तथा सम्मान पाता है, दूसरों को प्रभावित करने की शक्ति रखता है।",
                english:
                    "Earns wealth and fame, progress of religion, supposed to be lucky, has brothers and sisters, works hard with high remuneration and is respected, strength of influencing others",
            },
            4: {
                hindi: "धन के कारण परेशानी, सुख भाव में अशांति, पिता भाव में कुछ कमी, माता भाव में कुछ कमी, व्यापार में मान-सम्मान, धन-संपत्ति में कमी, जमीन-जायदाद से संबंधित परेशानी, सरकार व समाज में सम्मान की कमी, परिवार व धन भाव में अशांति",
                english:
                    "Feels troublesome on account ofwealth, restlessness in the house of happiness, some deficiency in the house of father, some deficiency in the house ofmother, honour in business, lacks in cash possessions, experiencing troubles regarding land and property, gets respect in government and society, restlessness in the house of family and wealth",
            },
            5: {
                hindi: "बहुत बुद्धिमान और धन कमाने वाला, बहुत लाभ कमाने वाला, बड़े परिवार का पिता, बहुत दूरदर्शी, संतान पक्ष में बंधन, शिक्षा के घर में प्रभाव, भारी काम करने के लिए अपने दिमाग का उपयोग करने वाला और गुस्सैल स्वभाव का होता है।",
                english:
                    "Is very wise and earns wealth, gains enormously, becomes the father of a big family, is very farsighted, bondage in the side of children, influences in the house ofeducation, uses his brain to perform heavy tasks and is of hot temper",
            },
            6: {
                hindi: "बहुत प्रभावशाली होता है तथा अपने परिश्रम से धन कमाता है तथा शत्रुओं और कठिनाइयों की परवाह नहीं करता, शत्रुओं से धन लाभ और धन की कठिनाइयाँ, अधिक खर्च करने वाला, धन भाव में कमी महसूस करता है, नाना भाव में कुछ प्रभाव, बीमारी को बल देता है, पारिवारिक सुख भाव में कुछ कमी, सम्मान,",
                english:
                    "Is very influential and earns wealth through his diligence and does not care for enemies and difficulties, gains from enemies and difficulties ofwealth, spends much, feels deficiency in the house of wealth, some influence in the house of maternal grandfather, empowers illness, some deficiency in the house of family pleasures respected,",
            },
            7: {
                hindi: "धन-सम्पत्ति में कुछ कठिनाइयों के साथ दैनिक कार्य करता है, कठिनाई से धन प्राप्त करता है, पत्नी के घर में कुछ कष्ट भोगता है, धनवान माना जाता है, सम्मानजनक नौकरी पाता है, यौन सुखों में कुछ नीरसता और बंधन पाता है।",
                english:
                    "Pursues daily occupation with some difficulties ofwealth, gets wealth with difficulty, experiences some hardships in the house ofwife, is supposed to be rich, gets respectable job, gets some dullness and bondage in the sexual pleasures",
            },
            8: {
                hindi: "कष्टकर धन कमाना, धन की कमी महसूस होना, पैतृक धन या रोगी व्यक्ति का धन प्राप्त होना, अचानक धन की हानि होना",
                english:
                    "Earns wealth through painful means, feels deficiency ofwealth, gets ancestral wealth or the wealth of a diseased person, sudden loss of wealth",
            },
            9: {
                hindi: "बहुत भाग्यशाली, धार्मिक और अमीर होता है, धन और भाग्य प्राप्त करता है, बहुत ऊर्जावान होता है और उसके भाई होते हैं, लाभ प्राप्त करता है",
                english:
                    "Is very lucky, religious, and rich, gets wealth and luck, is very energetic and has brothers, secures advantages",
            },
            10: {
                hindi: "प्रबल प्रभाव का स्वामी, जमीन-जायदाद के प्रति थोड़ा लापरवाह, पिता के घर में धन, सम्मान पाने वाला, व्यापार या अन्य सम्मानजनक नौकरी से धन कमाने वाला, माता के घर में कुछ बाधा, शांति में बाधा पाने वाला, सरकार व समाज से सम्मान पाने वाला, उच्च कुल का, प्रतिष्ठित व प्रभावशाली होता है।",
                english:
                    "Owner of the powerful influence, is a bit careless about land and property, gets wealth, respect in the house of father, earns wealth through trade or some other respectable job, some hindrance in the house of mother, gets obstacles in peace, respect from government and society, possesses high family, is dignified and influential",
            },
            11: {
                hindi: "धन-लाभ की शक्ति प्राप्त करता है, धन से धन कमाता है, रत्न-आभूषण प्राप्त करता है, बहुत प्रतिभाशाली होता है, शिक्षा और संतान के भाव में लाभ प्राप्त करता है, प्रभावशाली वक्ता होता है।",
                english:
                    "Gets power of wealth and gains, makes money through money, gets jewels and ornaments, is very brilliant, gets advantages in the house of education and children, influential orator",
            },
            12: {
                hindi: "बहुत अधिक धन खर्च करता है, धन संचय नहीं कर पाता, बाहरी स्रोतों से धन प्राप्त करता है, व्यय द्वारा शत्रु पक्ष पर प्रभाव बनाए रखता है, रोगों और कष्टों से बचता है, धन और परिवार के कारण दुखी रहता है",
                english:
                    "Spends too much wealth, unable to accumulate wealth, gets wealth from outside sources, keeps influence on the side of enemies by spending, escape from diseases and troubles, feels unhappy on account of wealth and family",
            },
        },
        Moon: {
            1: {
                hindi: "गोरा रंग और सुडौल शरीर, इच्छाओं पर नियंत्रण रखने वाला, स्थिर व्यक्ति, स्वाभिमानी, पारिवारिक परिस्थितियों, दैनिक कार्यों और व्यवसाय पर विशेष ध्यान देने वाला, सुखों की चाहत और प्राप्ति वाला, सम्मानित, अपनी इच्छा से कार्य करने वाला, स्वतंत्र जीवन जीने वाला, पत्नी के घर में कुछ समस्या रहने वाला, प्रसिद्ध और स्थिर मन वाला।",
                english:
                    "Is offair complexion and symmetrical body, can control the desires, is a stable person, has self-respect, pays final attention to the family circumstances, day-to-day affairs and occupation, wants and gets pleasures, is respected, acts according to his own will, lives independent, some problem in the house ofwife, is famous and is of stable mind",
            },
            2: {
                hindi: "अपार धन कमाता है, दैनिक जीवन में कुलीनता बनाए रखता है और मर्यादा बनाए रखता है, सांसारिक कार्यों में संलग्न रहता है, सम्मान प्राप्त करता है, स्वार्थी होता है।",
                english:
                    "Earns huge wealth, maintains aristocracy in the daily routine and keeps dignity, engages himselfin worldly affairs, gets respect, selfish",
            },
            3: {
                hindi: "ऊर्जावान और विकास के लिए पूरे मन से काम करने वाला, सदैव प्रसन्न रहने वाला, धर्म में आस्था रखने वाला, भाग्यशाली, भाई-बहनों से बहुत प्रेम करने वाला, सुन्दर शरीर वाला, प्रसिद्धि पाने वाला और शांतिपूर्वक काम करने वाला तथा दृढ़ इच्छाशक्ति वाला होता है।",
                english:
                    "Is energetic and works whole-heartedly for the development, is always happy, is faith in Dharma, is lucky, loves brothers and sisters very much, gets handsome physique, gets the fame and does the work peacefully and has strong will-power",
            },
            4: {
                hindi: "जन्मस्थान पर सुखपूर्वक निवास करता है, सुन्दर शरीर वाला होता है, भूमि-सम्पत्ति का सुख पाता है, बड़े-बड़े कार्य करता है, दूसरों को प्रसन्न रखता है, माता-पिता का आदर करता है, विदेश जाने में कष्ट अनुभव करता है, सरकार और समाज में यश और प्रशंसा पाता है, सुखपूर्वक जीवन व्यतीत करता है और सफलता प्राप्त करता है।",
                english:
                    "Lives happily at his birthplace, is ofhandsome physique, gets the happiness of lands and property, does big works, makes others cheerful, respects parents, feels troublesome to go to foreign places, gets name and appreciation from government and society, lives peacefully and gets success",
            },
            5: {
                hindi: "शिक्षा और बुद्धि में कमजोर, संतान पक्ष में कुछ कष्ट अनुभव करने वाला, बेचैन रहने वाला, संकीर्ण दृष्टिकोण वाला, अपनी अभिव्यक्ति और वाणी से अपनी बात स्पष्ट न कर पाने वाला, झूठ बोलने से लाभ पाने वाला, छोटे कद का",
                english:
                    "Weak in education and intellect, experiences some hardships in the side ofchildren, gets restless, is ofnarrow outlook, unable to make himself clear through his expression and speech, gains from telling lies, is of short stature",
            },
            6: {
                hindi: "शरीर में कमजोरी और रोग, दूसरों पर निर्भर, बेचैनी महसूस करने वाला, दादा के साथ रहना पसंद करने वाला, अधिक खर्च करने वाला, शत्रुओं से डरने वाला, शांत और साहसी होता है",
                english:
                    "Weakness and disease in the body, dependent on others, feels restless, likes to live with grandfather, spends much, afraid of enemies, is calm and courageous",
            },
            7: {
                hindi: "कुछ प्रशंसा पाता है, दैनिक कार्यों में बहुत रुचि लेता है, भावुक होता है, यौन सुख चाहता है और उसका आनंद लेता है, सुंदर पत्नी पाता है, पत्नी को अधिक महत्व देता है, दबाव में काम करवाता है, दृढ़ इच्छाशक्ति के कारण अपने व्यवसाय का सुख भोगता है, बड़े कष्ट सहता है, विदेश जाता है, शरीर के स्वास्थ्य से पीड़ित रहता है, धन प्राप्ति के लिए सदैव सावधान रहता है।",
                english:
                    "Gets some admiration, conducts the day-to-day affairs very interestedly, is passionate, wants and enjoys sexual pleasures, gets beautiful wife, gives more importance to wife, gets the work done under pressure, enjoys the pleasures ofhis occupation due to strong will-power, suffers great troubles, goes to the foreign countries, suffers in health of the body, always careful to get wealth",
            },
            8: {
                hindi: "सुंदरता में कमी, व्यवसाय में बाधाओं का सामना, कठिन शारीरिक श्रम से कमाई और प्रगति",
                english:
                    "Deficiency in beauty, faces hindrances in occupation, earns and progresses through hard physical labour",
            },
            9: {
                hindi: "बहुत भाग्यशाली और धार्मिक होता है, ईश्वर में विश्वास रखता है, सुन्दर शरीर वाला होता है, सदैव प्रसन्न और ऊर्जावान रहता है, भाई-बहनों वाला होता है, यश और पुण्य प्राप्त करता है",
                english:
                    "Is very lucky and religious, believes in God, possesses a handsome body, is always happy, energetic, has brothers and sisters, gets fame and virtue",
            },
            10: {
                hindi: "राजसी, माता-पिता से लाभ पाने वाला, बड़ा व्यवसाय करने वाला, शान-शौकत से रहने वाला, सुखी, जमीन-जायदाद का इच्छुक, अच्छे कर्म करने वाला, सरकार और समाज से सम्मान पाने वाला",
                english:
                    "Majestic, gains from parents, conducts big occupation, lives with great pomp and show, feels happy, wants land and property, does good deeds, gets the respect of government and society",
            },
            11: {
                hindi: "मोटा शरीर, प्रभावशाली, धन कमाने वाला, भारी लाभ पाने वाला, तीक्ष्ण बुद्धि वाला, शान-शौकत से रहने वाला, संतानवान, शिक्षा भाव में कमी",
                english:
                    "Has a fat physique, influential, earns wealth, gets huge gains, has sharp intelligence, lives with pomp and show, has children, deficiency in the house of education",
            },
            12: {
                hindi: "शरीर में कुछ कमी और कमजोरी होती है, विदेश में रहता है और वहां सम्मान पाता है, शारीरिक और मानसिक कष्ट पाता है, अधिक खर्च करता है, शत्रुओं के घर में प्रभाव जमाने का प्रयास करता है, शंकालु स्वभाव का होता है।",
                english:
                    "Gets some deficiency and weakness in physique, lives in foreign places and gets honour there, feels some physical and mental distress, spends much, makes efforts to have influence in the house ofenemies, suspicious nature",
            },
        },
        Mars: {
            1: {
                hindi: "प्रभावशाली नहीं होता, माता-पिता से अच्छा सम्मान नहीं पाता, व्यवसाय पर अधिक ध्यान देता है, पत्नी के घर में कुछ सम्मान नहीं, बच्चों से दुखी, शिक्षा में कमी, जीवन में नीरसता, कुछ यौन सुखों की चाहत",
                english:
                    "Is not influential, does not get good respect from parents, pays great attention to occupation, some respect in the house ofwife, unhappy with children, lacks in education, dullness in life, wants some sexual pleasures",
            },
            2: {
                hindi: "अपने जीवन में बुद्धि द्वारा महान एवं मूल्यवान कार्य करता है, प्रचुर धन कमाता है, उन्नति करता है, सुखी संतान प्राप्त करता है, विद्या प्राप्त करता है, राज-घर, समाज एवं परिवार में सम्मान प्राप्त करता है, अपनी चतुराई के कारण लाभ प्राप्त करता है, दैनिक जीवन में कुछ चंचलता रहती है, बहुत ही बुद्धिमतापूर्ण होता है।",
                english:
                    "Does great and valuable deeds in his life through wisdom, earns huge wealth, rises, gets happy children, gets education, gets respect in the house ofgovernment and society and family, enjoys gains due to his cleverness, some restlessness in the daily life, is very witty",
            },
            3: {
                hindi: "बहुत प्रतिष्ठित होता है और सरकार तथा समाज में बहुत सम्मान पाता है, पिता के घर में सम्मान पाता है, शत्रु के घर में प्रभाव रखता है, कभी घबराता या हिम्मत नहीं हारता, भाई, संतान, पिता या धर्म की परवाह नहीं करता, सफल और बहादुर होता है, बहुत कुशल होता है।",
                english:
                    "Is very dignified and gets much respect in government and society, respect in the house offather, keeps influence in the house ofenemy, never feels nervous or loses courage, does not care for brothers, children, father or Dharma, successful and brave, is very skilful",
            },
            4: {
                hindi: "बहुत बुद्धिमान होता है, बड़ा व्यापार और बड़े उपक्रम करता है, घर-गृहस्थी और सांसारिक कार्यों में निपुण होता है, दैनिक जीवन में लाभ प्राप्त करता है, अपने घर और पत्नी पक्ष में बहुत सम्मान और प्रभाव प्राप्त करता है, पिता, पुत्र और माता से सुख प्राप्त करता है, भूमि और संपत्ति प्राप्त करता है, अधिक यौन सुख प्राप्त करने की इच्छा रखता है, सरकार और समाज में प्रसिद्धि प्राप्त करता है और विशेष यौन सुख प्राप्त करता है।",
                english:
                    "Gains much intelligence, has a huge business and big undertakings, is an expert in conducting the domestic and worldly affairs, gains profit in the daily routine oflife, gets much honour and influence in his own house and in the side ofhis wife, happiness from father, son and mother, gets land and property, wants to get more sexual pleasures, gets fame in government and society and gets special sexual pleasures",
            },
            5: {
                hindi: "राजनीति शास्त्र का विशेष ज्ञान, पुत्र प्राप्ति के कारण मानसिक रूप से अति प्रसन्न, लाभ प्राप्ति से अधिक व्यय, महत्वपूर्ण बातें करने वाला, प्रतिष्ठित व्यवसायी",
                english:
                    "Has the special knowledge of political science, mentally overjoyed due to son, spends more than securing gains, talks importantly, respectable businessman",
            },
            6: {
                hindi: "वीर एवं प्रभावशाली, अपनी गरिमा एवं गौरव को बनाए रखने वाला, शत्रुओं एवं रोगों पर विजय पाने वाला, शरीर में कुछ कष्ट, अधिक व्यय, शिक्षा एवं संतान में कुछ कमी",
                english:
                    "Is brave and influential, maintains his dignity and glory, gets victory over enemies and diseases, some trouble in his body, spends much, some deficiency in education and children",
            },
            7: {
                hindi: "शानदार व्यवसाय करता है, अपनी बुद्धि से उन्नति करता है और पत्नी का सौभाग्य प्राप्त करता है, प्रभावशाली और राजसी पत्नी प्राप्त करता है, सरकार और समाज से सम्मान प्राप्त करता है, शरीर में कुछ कमजोरी होती है, यौन सुख प्राप्त करता है, पिता और पुत्र का सहयोग प्राप्त करता है, सम्मानित और प्रभावशाली होता है।",
                english:
                    "Does splendid occupation, gets raise through his wisdom and gets good luck ofwife, gets influential and majestic wife, gets respect of government and society, some weakness in his body, gets sexual pleasures, gets the help of father and son, respected and influential",
            },
            8: {
                hindi: "पुत्र और पिता की हानि सहता है, बड़े और कठिन कार्य करता है, कम शिक्षा प्राप्त करता है, झूठ बोलता है, कड़वी बातें करता है, उन्नति और धन प्राप्ति के लिए अधर्मी तरीकों का प्रयोग करता है, सरकार और समाज से असंतुष्ट रहता है, थोड़ा आलसी होता है",
                english:
                    "Bears the losses of son and father, does big and difficult tasks, gets little education, tells lies, talks bitterly, follows unrighteous methods to get rise and wealth, feels dissatisfied with government and society, is a bit lazy",
            },
            9: {
                hindi: "बहुत भाग्यशाली होता है तथा पुत्र और पिता के सुखों का आनंद उठाता है, गणित और लेखाशास्त्र का अच्छा ज्ञान रखता है, सरकार और समाज से प्रसिद्धि और सम्मान प्राप्त करता है, अच्छी शिक्षा प्राप्त करता है, प्रसिद्ध और दूरदर्शी होता है।",
                english:
                    "Is very fortunate and enjoys the pleasures ofson and father, has good knowledge of mathematics and accountancy, gets fame and respect from government and society, gets good education, is famous and farsighted",
            },
            10: {
                hindi: "महान प्रबंधकीय क्षमता वाला, सरकार और समाज के लिए काम करने वाला, बहुत बुद्धिमान, बौद्धिक रूप से बोलने वाला, सम्मान और आदर पाने वाला, बहुत सुंदर, शरीर में कमजोरी वाला, बहुत प्रतिष्ठित और प्रभावशाली होता है",
                english:
                    "Is of great managerial ability, works for government and society, is very wise, speaks intellectually, gets honour and respect, is very beautiful, weakness in the body, is very dignified and influential",
            },
            11: {
                hindi: "बुद्धि और व्यवसाय के कारण भारी लाभ प्राप्त करता है, पुत्र और पिता का लाभ प्राप्त करता है, व्यापार के माध्यम से धन प्राप्ति के लिए महान प्रयास करता है, अच्छी शिक्षा और अच्छे बच्चे होते हैं, बहुत प्रभावशाली और स्वार्थी होता है",
                english:
                    "Gets huge gains due to wisdom and occupation, gets the advantage of son and father, great efforts to gain wealth through business, good education and good children, is very influential and selfish",
            },
            12: {
                hindi: "कुछ सम्मान मिलता है, पुत्र से कष्ट होता है, शिक्षा और बुद्धि में कमजोरी होती है, अधिक खर्च होता है, यौन सुख मिलता है, बड़े व्यवसाय में हानि होती है, बहुत साहसी और ऊर्जावान होता है",
                english:
                    "Gets some respect, experiences troubles from son, gets weakness in education and intelligence, spends much, gets sexual pleasures, losses in big occupation, is very courageous and energetic",
            },
        },
        Mercury: {
            1: {
                hindi: "सुन्दर शरीर वाला, वैभवशाली, व्यापारी एवं साहसी, व्यवसाय एवं घरेलू कार्यों में बहुत बलवान, भाई-बहनों के घर में कुछ कमी, प्रतिष्ठित, विदेश यात्रा करने वाला।",
                english:
                    "Has a good physique, spends majestically, is a businessman and courageous, much strength in occupation and domestic affairs, some deficiency in the house ofbrothers and sisters, is respectable, goes to foreign countries",
            },
            2: {
                hindi: "धन अर्जित करता है, भाई-बहनों के घर में कुछ अधूरी खुशियाँ रहती हैं, खर्च पर नियंत्रण रखने का प्रयास करता है, मान-सम्मान प्राप्त होता है।",
                english:
                    "Earns money, some incomplete happiness in the house ofbrothers and sisters, tries to control the expenditure, gets respect",
            },
            3: {
                hindi: "बहुत ऊर्जावान, भाई-बहनों से लाभ पाने वाला, धर्म में कम विश्वास रखने वाला, अच्छे कद का, व्यय करने की शक्ति वाला, बहुत साहसी, महत्वाकांक्षी और विनम्र होता है।",
                english:
                    "Is very energetic, gets the advantage ofbrothers and sisters, has little faith in Dharma, is ofgood height, possesses the power ofexpenditure, has great courage, ambition and modesty",
            },
            4: {
                hindi: "अपना काम करता है और खर्च का प्रबंध प्रसन्नतापूर्वक करता है, माता-पिता के घर में कमी, कुछ जमीन-जायदाद की हानि, भाई-बहनों के घर में कुछ कमी, सरकार और समाज से संबंधित सफलता-असफलता का सामना करता है।",
                english:
                    "Does his work and manages the expenditure with happiness, deficiency in the house ofparents, loss of some land and property, some deficiency in the house ofbrothers and sisters, meets success and failures in relation to government and society",
            },
            5: {
                hindi: "शिक्षा और बुद्धि के भाव में शक्ति, शिक्षा पर खर्च, संतान और भाई-बहन के भाव में कुछ कमी, बहुत चतुर और बुद्धिमान, लोगों को अपने पक्ष में करने का प्रयास",
                english:
                    "Power in the house of education and intelligence, spends for education, some deficiency in the house of children and brothers and sisters, is very clever and wise, tries to win over people to his side",
            },
            6: {
                hindi: "व्यय में कुछ रुकावट, कुछ आश्रित कार्य, अधिक व्यय, परेशानियों का सामना, व्यय कम करने का प्रयास, कुछ हद तक बेचैन",
                english:
                    "Some hindrance in expenditure, does some dependent work, spends much, faces troubles, tries to curtail expenditure, somewhat restless",
            },
            7: {
                hindi: "अपने परिश्रम से व्यय शक्ति प्राप्त करता है, भाई की अपेक्षा बहन का सुख अधिक प्राप्त करता है, पत्नी के घर में भी शक्ति और साहस प्राप्त करता है, व्यवसाय में शक्ति और दुर्बलता का मिश्रण होता है तथा सांसारिक कार्यों में सफलता प्राप्त करता है।",
                english:
                    "Gets power ofexpenditure due to his labour, gets the happiness of sister more than that of a brother, power and courage also in the house of wife, mixture of power and weakness in the occupation and gets success in the worldly affairs",
            },
            8: {
                hindi: "शक्ति और बल में दुर्बलता, शत्रुओं से रहित, गुप्त शक्ति, व्यय का प्रबंधन करने वाला, धन प्राप्ति के लिए सबसे बुरे और कठिन कार्य करने वाला, भाई-बहनों का वियोग भोगने वाला, लापरवाही और नम्रता दिखाने वाला।",
                english:
                    "Weakness in his energy and strength, devoid of foes, hidden power, manages the expenditure, does even the worst and difficult work to acquire money, experiences the separation of brothers and sisters, shows carelessness and gentleness",
            },
            9: {
                hindi: "ईश्वर में थोड़ी भक्ति, भाई-बहनों से अपूर्ण सुख, धर्म में थोड़ी दुर्बलता, व्यय में कमी, यश-कीर्ति की हानि और संकीर्ण बुद्धि वाला होता है।",
                english:
                    "Has some devotion to God, some incomplete happiness from brothers and sisters, some weakness in Dharma, deficiency in expenditure, gets the loss of fame and fortune and is of narrow discernment",
            },
            10: {
                hindi: "विवेक शक्ति से बड़े पैमाने पर कार्य करता है, भाई और पिता के घर में कुछ महानता और कुछ कमजोरी रखता है, सुख के लिए अधिक खर्च करता है, माता के घर में कुछ कमजोरी, सरकार और समाज के घर के संबंध में सफलता की कुछ कमी",
                english:
                    "Works in a big way through the power of discrimination, possesses some greatness and some weakness in the house of brother and father, spends much for happiness, some weakness in the house of mother, some deficiency of success in connection with the house of government and society",
            },
            11: {
                hindi: "अपने शारीरिक बल से बहुत लाभ प्राप्त करता है, व्ययबल से कुछ लाभ प्राप्त करता है, घर में लाभ, हानि तथा संतान पक्ष में कुछ लाभ की स्थिति में कुछ दुर्बलता अनुभव करता है, विवेकशील तथा शक्तिशाली तर्क-वितर्क करने वाला होता है, शान से बोलता है।",
                english:
                    "Gains much due to his physical strength, gets some advantage from the power ofexpenditure, feels some weakness in the house ofgains, some loss and some gain in the side of children, has good discriminating powerful arguments, speaks majestically",
            },
            12: {
                hindi: "अधिक व्यय करने की क्षमता रखता है, भाई-बहनों से दूर संबंध रखता है, बल में कमी, शत्रु भाव में कुछ प्रभाव, कुछ रोग और कष्टों के लिए व्यय करता है, व्यय भाव में कभी बाधा नहीं डालता।",
                english:
                    "Has the power of spending much, keeps distant relations with brothers and sisters, deficiency in strength, some influence in the house of enemy, spends for some disease and hardships, never puts any obstacles in the house of expenditure",
            },
        },
        Jupiter: {
            1: {
                hindi: "संकोची, प्रतिष्ठित, भाग्यशाली, गुणवान, हृदय से साहसी, न्याय और सत्य को पसंद करने वाला, धर्म-अधर्म को अच्छी तरह समझने वाला, बहुत सम्मान पाने वाला, सुनहरे रंग का और सुंदर, बहुत बुद्धिमान और चौड़े माथे वाला, लंबा कद, संतान वाला, यौन सुख में कुछ कमी वाला, परिवार के प्रति थोड़ा लापरवाह, प्रभाव डालने की शक्ति वाला, विद्वान और प्रबल प्रेम करने वाला, बहुत चतुर, शत्रुओं को परास्त करने वाला होता है।",
                english:
                    "Is self-conscious, dignified, fortunate, virtuous, brave in heart, likes justice and truth, understands Dharma and vice very much, gets great respect, is of golden complexion and handsome, is very intelligent and has broad forehead, is of tall stature, has children, some deficiency in sexual pleasures, is a bit careless regarding family, has the power ofinfluence, is learned and loves strongly, very clever, defeats his enemies",
            },
            2: {
                hindi: "प्रचुर धन अर्जित करता है, प्रभावशाली कार्य करता है, कठोर परिश्रम करता है, सरकार, समाज और पिता के घर से कुछ साधारण कठिनाइयों के साथ बहुत सम्मान, आदर और प्रतिष्ठा प्राप्त करता है।",
                english:
                    "Earns huge wealth, does influential deeds, puts hard labour, gets much honour, respect and honour with some ordinary difficulties from the house of government and society and father",
            },
            3: {
                hindi: "अपने तेज और शारीरिक बल के कारण उन्नति करता है, पत्नी और आमोद-प्रमोद के बारे में अधिक सोचता है, छोटा परिवार, भाइयों का बल पाता है, शत्रु के घर में बड़ी सफलता पाता है, सदैव व्यस्त रहता है, यौन सुखों में कमी और परिवार में चिंता रहती है।",
                english:
                    "Rises due to his vigour and physical strength, thinks much ofwife and merriments, small family, gets the power ofbrothers, gets success in the big way in the house of enemy, always busy, gets deficiency in sexual pleasures and anxiety in family",
            },
            4: {
                hindi: "भाग्यशाली माना जाता है, बहुत खर्च करता है, माँ के घर में मिश्रित परेशानियाँ होती हैं",
                english:
                    "Supposed to be lucky, spends much, mixed troubles in the house of mother",
            },
            5: {
                hindi: "बहुत बुद्धिमान और गुणी होता है, धार्मिक पक्ष पर अधिक ध्यान देता है, ज्योतिष का अधिक ज्ञान रखता है, सौभाग्यवान होता है, शत्रु भाव पर विजय प्राप्त करता है, सत्य को प्राथमिकता देता है, संतान पक्ष से कुछ शत्रुता रहती है, राजनीतिज्ञ होता है",
                english:
                    "Is very wise and virtuous, pays much attention to the religious side, , has more knowledge of astrology, gets good luck, gets victory over the house ofenemies, gives priority to truth, some enmity from the side of children, is a politician",
            },
            6: {
                hindi: "धर्म का पालन ठीक से न कर पाने वाला, शत्रु को परास्त करने वाला, शत्रुओं पर विजय पाने वाला, शासन व समाज में प्रभाव पाने वाला, अधिक व्यय करने वाला, अत्यधिक प्रभावशाली तथा उन्नति के लिए प्रयत्नशील होता है।",
                english:
                    "Unable to rear up Dharma properly, defeats the enemy, victory over enemies, gets influence in government and society, spends much, is very influential and tries hard to acquire progress",
            },
            7: {
                hindi: "भाग्योदय और विवाह के सम्बन्ध में उलझन और कष्ट, दैनिक कार्य सावधानी से करना, भाई-बहनों से युक्त होना, धर्म के पालन में भूल करना, पत्नी और यौन सुख के पक्ष में कुछ बेचैनी और कमी होना।",
                english:
                    "Perplexity and hardship in connection with the rise ofdestiny and marriage, conducts the daily occupation carefully, has brothers and sisters, commits mistakes in rearing up Dharma, some restlessness and deficiency in the side ofwife and sexual pleasures",
            },
            8: {
                hindi: "धर्म पालन में असमर्थ, अधिक व्यय, शत्रुओं के घर में सज्जनता, यश की कमी, अस्पष्ट धर्म का पालन",
                english:
                    "Unable to rear Dharma, spends much, gentility in the house of enemies, deficiency offame, follows obscure Dharma",
            },
            9: {
                hindi: "बहुत भाग्यशाली होता है, बड़ी बुद्धि से काम करता है, संतान की शक्ति पाता है, शिक्षा की शक्ति पाता है, अच्छे धर्म का पालन करता है, शत्रुओं पर विजय प्राप्त करता है",
                english:
                    "Is very fortunate, works with great intelligence, gets the power of children, gets the power ofeducation, rears up good Dharma, gets victory over enemies",
            },
            10: {
                hindi: "बहुत प्रभावशाली और भाग्यशाली होता है और बहुत अच्छी प्रबंधकीय क्षमता रखता है और बहुत पेचीदा व्यावसायिक समस्याओं को हल करता है, सरकार और समाज और पिता के घर में प्रभाव प्राप्त करता है, पद में ऊपर उठने के लिए बहुत मेहनत करता है, अपने क्षेत्र में प्रमुख बनता है, बहुत चतुर होता है",
                english:
                    "Is very influential and fortunate and has great managerial ability and solves very knotty business problems, gets influence in the house of government and society and father, works very hard to rise in position, becomes head in his circle, is very clever",
            },
            11: {
                hindi: "बहुत ऊर्जावान, कुछ लापरवाह, पत्नी और यौन सुख में कमी, शिक्षा और संतान की प्राप्ति, भाई-बहनों से सहायता, दैनिक कार्य में कुछ अपमान और बाधाएं, बहुत चतुर और बुद्धिमान होता है।",
                english:
                    "Is very energetic, somewhat careless, deficiency in the side ofwife and sexual pleasures, gets education and children, help from brothers and sisters, some humiliation and obstacles in the daily occupation, is very clever and intelligent",
            },
            12: {
                hindi: "अधिक व्यय, भाग्य भाव में कुछ कमजोरी, व्यय प्रबंधन में श्रम और भाग्य का सहयोग, यश प्राप्ति में कुछ कमी, सुख और जीवन की दिनचर्या में कुछ बाधाएं।",
                english:
                    "Spends much, some weakness in the house of destiny, gets the support oflabour and destiny in the power to manage expenditure, some deficiency to acquire fame, some obstacles in the happiness and in daily routine of life",
            },
        },
        Venus: {
            1: {
                hindi: "माता का बल मिलता है, शरीर सुन्दर और सुखमय रहता है, भवन और संपत्ति की प्राप्ति होती है, पत्नी के घर में सुख मिलता है, दैनिक व्यवसाय में लाभ और प्रसन्नता मिलती है, स्वभाव शांत होता है और पारिवारिक और सांसारिक मामलों में सफलता मिलती है।",
                english:
                    "Gets power of mother, keeps the body handsome and in comfort, gets buildings and property, gets happiness in the house of wife, gains and happiness in the daily occupation, calm nature and success in family and worldly affairs",
            },
            2: {
                hindi: "धन प्राप्ति हेतु संघर्ष, मातृभूमि के घर में कुछ हानि तथा माता के सुख में कमी, दैनिक जीवन में कुलीनता तथा सम्माननीय होता है।",
                english:
                    "Struggles to gain wealth, some loss in the house ofmotherland and in the happiness of mother, aristocracy in the daily routine and is respectable",
            },
            3: {
                hindi: "धन में कमजोरी, भाई पक्ष में कमी, धर्म भाव से सुख, माता भाव से कमजोरी, भवन व संपत्ति भाव में कुछ कमजोरी, तथा कुछ आलसी होता है।",
                english:
                    "Weakness in wealth, deficiency in the side ofbrother, happiness in the house ofDharma, weakness from the house ofmother, some weakness in the house ofbuildings and property and is somewhat lazy",
            },
            4: {
                hindi: "मकान और जमीन का बड़ा लाभ मिलता है, सुखपूर्वक आय होती है, सुख के कुछ अच्छे साधन मिलते हैं, पिता से भय होता है, बेचैनी होती है, सम्मानीय और विनम्र होता है, सरकार और समाज से सुख प्राप्त करता है, बहुत अच्छे कर्म करता है।",
                english:
                    "Gets the great advantage of the house and land, gets income at ease, gets some decent things of pleasure, fear from the father, gets restless, is respectable and humble, enjoys happiness from government and society, does very decent deeds",
            },
            5: {
                hindi: "महान बुद्धि का स्वामी, ज्ञान से बहुत लाभ प्राप्त करने वाला, संतान का सुख भोगने वाला, संपत्ति वाला, प्रतिष्ठित और आदरणीय, शिक्षा प्राप्त करने वाला, बहुत चतुर और शांत स्वभाव का होता है।",
                english:
                    "Possesses great intelligence, gains much from wisdom, enjoys the happiness of children, has property, respectable and honourable, acquires education, is very clever and peaceful",
            },
            6: {
                hindi: "अधिक व्यय, माता के घर में कमी, संपत्ति की सुख-शांति में बाधा, कुछ रोग और शत्रुओं से संघर्ष, गुप्त रूप से बहुत चतुर",
                english:
                    "Spends much, deficiency in the house ofmother, hindrance in peace and happiness ofproperty, some diseases and struggle from enemies, secretly very clever",
            },
            7: {
                hindi: "सुखपूर्वक दैनिक कार्य करता है, पत्नी से सुख पाता है, यौन सुख का भरपूर लाभ प्राप्त करता है, शांतिपूर्वक सफलता प्राप्त करता है, तथा बहुत चतुर होता है।",
                english:
                    "Pursues daily occupation happily, happiness with wife, gets the grand advantage of sexual pleasures, gets success peacefully, and is very clever",
            },
            8: {
                hindi: "युक्ति से लाभ प्राप्त करता है, माता के घर से असंतोष, अच्छी दीर्घायु, बहुत चतुर",
                english:
                    "Gets advantage through tactics, dissatisfaction from the house of mother, good longevity, very clever",
            },
            9: {
                hindi: "बहुत भाग्यशाली, लाभ की उन्नति सुनिश्चित, भूमि और संपत्ति का अधिकार, ऊर्जा में कमजोरी, भाइयों पर निर्भर नहीं, ईश्वर पर अत्यधिक भरोसा",
                english:
                    "Is very fortunate, secures progress of gains, gets the power of land and property, weakness in energy, not dependent upon brothers, great reliance on God",
            },
            10: {
                hindi: "माता-पिता से लाभ, सरकार और समाज से लाभ और शक्ति, अच्छे कर्म, भूमि और संपत्ति प्राप्त, वाहन का स्वामी, कुशल और चतुर",
                english:
                    "Gain from parents and advantage and power from the government and society, does decent deeds, gains land and property, owns vehicles, skilful and clever",
            },
            11: {
                hindi: "बिना किसी चिंता के सुखपूर्वक आय प्राप्त करता है, जमीन-जायदाद प्राप्त करता है, शिक्षा प्राप्त करता है, संतान का सुख भोगता है, निश्चित आय को महत्व देता है",
                english:
                    "Gets the income happily without anxiety, gets land and property, acquires education, enjoys the pleasure of children, gives the importance to fixed income",
            },
            12: {
                hindi: "माता के घर से कुछ हानि होती है, अधिक व्यय होता है, आय को खर्च करने में सुख मिलता है, शत्रु के घर में लापरवाही रहती है तथा कुछ हद तक बेचैन रहता है।",
                english:
                    "Gets some loss of the house of mother, spends much, feels the pleasure in spending the income, carelessness in the house ofenemy and is somewhat restless",
            },
        },
        Saturn: {
            1: {
                hindi: "दैनिक कार्य को लगन से करता है, दीर्घायु होता है, पत्नी से संतुष्ट नहीं होता, यौन सुख के संबंध में उच्च और अस्पष्ट युक्तियों से काम करता है, व्यवसाय के संबंध में कठिनाइयाँ, सरकार के घर और पिता के घर में लापरवाही, लोभी और लापरवाह",
                english:
                    "Pursues daily occupation diligently, good longevity, not satisfied with wife, works with high and obscure tactics in connection with sexual pleasures, hardships in connection with occupation, carelessness in the house of government and in the house of father, avaricious and careless",
            },
            2: {
                hindi: "उत्तम आयु, पत्नी व परिवार के सम्बन्ध में बेचैनी, जीवन की दिनचर्या में कुलीनता, पूर्व से संचित धन की प्राप्ति, आनंददायी",
                english:
                    "Good longevity, restlessness in connection with wife and family, aristocracy in the daily routine oflife, gets the already accumulated wealth, is delightful",
            },
            3: {
                hindi: "बहुत अधिक शक्ति लगाता है, ऊर्जावान कार्यों के साथ दैनिक कार्य करता है, बच्चों के पक्ष में कुछ कष्ट अनुभव करता है, पत्नी और यौन सुखों के पक्ष में शक्ति प्राप्त करता है, भाई-बहनों के घर में उलझन होती है, स्वार्थी, बहुत कड़वा बोलता है, धर्म को नुकसान पहुंचाता है।",
                english:
                    "Puts in great energy, follows the daily occupation with energetic deeds, experiences some hardship in the side of children, gets the power in the side of wife and sexual pleasures, perplexity in the house ofbrothers and sisters, selfish, speaks very bitterly, causes Dharma injury to",
            },
            4: {
                hindi: "महान सुख और प्रसन्नता, अच्छी दीर्घायु, सरकार और समाज के घर में कमी, दैनिक व्यवसाय में गंभीर भ्रम के साथ खुशी का आनंद, शत्रुओं के घर में वृद्धि, पत्नी के संबंध में बहुत खुशी, यौन और पारिवारिक सुख",
                english:
                    "Great happiness and joyousness, good longevity, deficiency in the house of government and society, enjoys happiness with solemn delusion in the daily occupation, increment in the house ofenemies, much happiness in connection with wife, sexual and family pleasures",
            },
            5: {
                hindi: "व्यवसाय, संतान, पत्नी के कारण मानसिक उलझन, पत्नी से सुख और यौन सुख प्राप्त करने वाला, सदैव सावधान रहने वाला, कुछ कड़वा बोलने वाला और बहुत परिश्रमी होता है।",
                english:
                    "Mental perplexity on account ofoccupation, children, wife, acquires happiness in connection with wife and sexual pleasures, always careful, speaks somewhat bitterly and is very industrious",
            },
            6: {
                hindi: "दीर्घायु, दैनिक कार्य को लगन से करने वाला, पत्नी के घर में कुछ कष्ट, यौन सुख में कमी, बहुत क्रोधी",
                english:
                    "Good longevity, pursues the daily occupation diligently, experiences some distress in the house ofwife, deficiency in the side of sexual pleasures and is very wrathful",
            },
            7: {
                hindi: "प्रतिदिन बहुत परिश्रम वाला कार्य करने वाला, घर में पत्नी और व्यवसाय में प्रभाव पाने वाला, दीर्घायु, यौन सुख में कुछ परिवर्तन, शरीर में कुछ कष्ट पाने वाला, स्वार्थी, भूमि-संपत्ति और सुख में वृद्धि करने वाला, धर्म को हानि पहुँचाने वाला और कामी होता है।",
                english:
                    "Follows the very laborious occupation daily, gets the influence in the house ofwife and occupation, good longevity, some changes in the side of sexual pleasures, gets some trouble in his physique, selfish, increases the land and property and happiness, injures Dharma and is passionate",
            },
            8: {
                hindi: "पत्नी, पिता और पुत्रों की ओर से जीवन में चिंता, मान-सम्मान में कुछ कमी, व्यापार और दैनिक कार्य में कमजोरी और उलझन, विदेश से सहायता, कुछ कड़वा बोलने वाला, मन ही मन बहुत परिश्रमी",
                english:
                    "Anxiety in life from the side of wife, father and sons, gets some deficiency in honour, weakness and perplexity in connection with his business and daily occupation, help from foreign countries, speaks somewhat bitterly, secretly very industrious",
            },
            9: {
                hindi: "दैनिक दिनचर्या सौभाग्यपूर्वक व्यतीत करता है, दीर्घायु होता है, भाग्य भाव में असंतोष, लापरवाह",
                english:
                    "Spends the daily routine in a fortunate way, has a long life, dissatisfaction in the house of fate, careless",
            },
            10: {
                hindi: "पिता के घर में भारी क्लेश, व्यापार-व्यवसाय के दैनिक विकास से श्रमसाध्य एवं जटिल कार्य, पत्नी एवं परिवार के सम्बन्ध में विचित्र संघर्ष, सुख एवं कुछ भवन एवं सम्पत्ति प्राप्त होती है, माता के घर में कृत्रिम सुख, अधिक व्यय, सरकार एवं समाज के घर में गुप्त युक्तियों द्वारा दैनिक व्यापार-व्यवसाय के लाभ का भोग, यौन सुख की विशेष इच्छा में कुछ कमी, कुछ आलसी।",
                english:
                    "Great trouble in the house offather, undertakes laborious and intricate deeds from the daily development ofbusiness and occupation, strange struggle in connection with the wife and family, gets happiness and some buildings and property, artificial happiness in the house of mother, spends much, enjoys the gains of daily business occupation through some secret devices in the house ofgovernment and society, some deficiency on having special desire ofsexual pleasures, somewhat lazy",
            },
            11: {
                hindi: "दीर्घायु भाव में अत्यधिक वृद्धि, दैनिक व्यवसाय में भारी लाभ, अधिक धन अर्जित, शरीर के किसी अंग में कमी, यौन सुख, अनुचित लाभ, वाणी और संतान में कुछ कटुता, विदेश से लाभ।",
                english:
                    "Great rise in the house of longevity, gets heavy gains in daily occupation, earns much wealth, some deficiency in some part ofhis body, gets sexual pleasures, takes undue profits, some bitterness in speech and children, gains from foreign countries",
            },
            12: {
                hindi: "अधिक व्यय, कष्टकारी युक्तियों एवं गुप्त युक्तियों से भाग्य की उन्नति, पत्नी एवं परिवार के सुख में कुछ कमी, धन की हानि एवं परिवार में कमी।",
                english:
                    "Spends much, progress of destiny through troublesome devices and secret tactics, some weakness with the happiness ofwife and family, loss of wealth and deficiency in family",
            },
        },
        Rahu: {
            1: {
                hindi: "शरीर में कुछ कमी और कुछ कष्ट, मानसिक कष्ट, विचारों में चिंता, सुख में वृद्धि के लिए संघर्ष।",
                english:
                    "Some deficiency and some calamity in the body, mental distress, anxiety in his thoughts, struggles for the rise in the happiness",
            },
            2: {
                hindi: "धन की हानि, धन की हानि के कारण सिर में चिंता, ऋण लेना और चिंतित रहना",
                english:
                    "Loss of wealth, worries in the head due to loss of wealth, takes loans and is anxious",
            },
            3: {
                hindi: "भाई-बहनों से अप्रसन्न, न्याय का पालन न करने वाला तथा अन्यायपूर्ण मार्ग अपनाने वाला, बहुत चतुर, सावधान, धैर्यवान और साहसी",
                english:
                    "Unhappiness with brothers and sisters, does not follow justice and takes to unjust courses, very clever, careful, patient and courageous",
            },
            4: {
                hindi: "सुख-शांति में बाधा, माता से मधुर संबंध न होना, भूमि, भवन व संपत्ति की हानि, निवास में दुःख, अंत में कुछ सुख, बहुत चालाक होता है।",
                english:
                    "Hindrance in peace and happiness, no cordial relations with the mother, loss of land, buildings and property, unhappiness in the residence, some happiness at the end, is very clever",
            },
            5: {
                hindi: "संतान भाव में भारी कष्ट और हानि, शिक्षा भाव में सफलता, साहस",
                english:
                    "Great hardships and losses in the house ofchildren, gets success in the house of education, brave",
            },
            6: {
                hindi: "गुप्त युक्तियों का प्रयोग करने वाला, अपने स्वार्थ की पूर्ति में न्याय-अन्याय की परवाह न करने वाला, शत्रुओं के साथ गुप्त नीति रखने वाला, नाना के घर में हानि वाला, स्वार्थी एवं सतर्क।",
                english:
                    "Uses secret devices, does not care forjustice and injustice in the way ofserving his selfishness, secret policy with enemies, loss in maternal grandfather's house, selfish and cautious",
            },
            7: {
                hindi: "पत्नी के घर में कुछ परेशानी, घबराहट, व्यवसाय के घर में घातक हानि, परिश्रम से सफलता मिलती है, यौन सुख और दैनिक कार्यों में कमी, स्वार्थी होता है।",
                english:
                    "Some trouble in the house ofwife, becomes nervous, fatal losses in the house ofoccupation, gets success through hard work, deficiency in the side of sexual pleasures and daily affairs, is selfish",
            },
            8: {
                hindi: "दैनिक दिनचर्या में शक्ति मिलती है, शीघ्रता से काम करता है, पेट में कुछ समस्या, दैनिक दिनचर्या में चिंता",
                english:
                    "Gets power in the daily routine, works promptly, some problem in the stomach, anxiety in the daily routine",
            },
            9: {
                hindi: "भाग्य भाव में भारी नुकसान, बाहरी दिखावा अच्छा कर सकते हैं, बड़ी घबराहट के बाद सफलता मिलती है, व्यवहार कुशल",
                english:
                    "Great loss in the house of destiny, can demonstrate outward show nicely, gets success after great nervousness, tactful",
            },
            10: {
                hindi: "पिता के घर में क्लेश, व्यापार में भारी कष्ट, भारी कष्ट सहने के बाद सरकार और समाज से सम्मान, मन में बड़ी कलात्मक योजनाएँ रखने वाला और बहुत परिश्रमी होता है।",
                english:
                    "Trouble in the house of father, bears great hardship in trade, gets respect from government and society after bearing great troubles, possesses great artistic schemes in his mind and is very industrious",
            },
            11: {
                hindi: "व्यवसाय के घर में बहुत धन प्राप्त होता है, बुद्धिमान और सतर्क होता है, अधिकृत लाभ से अधिक लेता है, अत्यधिक प्रतिष्ठित होता है",
                english:
                    "Gains much money in the house of occupation, intelligent and cautious, takes more than authorised profits, is highly dignified",
            },
            12: {
                hindi: "कुलीनतापूर्वक खर्च करता है, व्यय भाव में उच्च श्रेणी की योजनाएं बनाता है, व्यय का प्रबंधन बहुत आसानी से करता है, महान शक्ति रखता है",
                english:
                    "Spends aristocratically, high class schemes in the house of expenditure, manages the expenditure very easily, possesses great power",
            },
        },
        Ketu: {
            1: {
                hindi: "शरीर में कमजोरी, शरीर में दुर्बलता, कोई घातक परेशानी, साहसी और हठी होता है",
                english:
                    "Weakness in the body, emaciation in physique, some fatal trouble, is courageous and obstinate",
            },
            2: {
                hindi: "अपनी शारीरिक और ऊर्जावान शक्ति की महान शक्ति प्राप्त करता है और धैर्य की महान शक्ति के माध्यम से अच्छी सफलता प्राप्त करता है, कड़ी मेहनत की शक्ति के कारण सफलता और साहस प्राप्त करता है",
                english:
                    "Gets great power of his physical and energetic strength and attains good success through great power of patience, gets success and courage due to power of hard labour",
            },
            3: {
                hindi: "धन भाव में भारी हानि होती है, धन वृद्धि के लिए कठोर परिश्रम करना पड़ता है, कभी-कभी धनार्जन में समस्या आती है, धन संचय करने में असमर्थ होता है।",
                english:
                    "Gets heavy loss in the house of wealth, labours hard to increase the wealth, sometimes finds problems in earnings, unable to accumulate wealth",
            },
            4: {
                hindi: "माता और सुख के भाव में हानि और कमी, भूमि और भवन की हानि, कठोर परिश्रम, निवास भाव में कष्ट और सुख में बाधा, फिर भी अंत में सुख मिलता है।",
                english:
                    "Loss and deficiency in the house of mother and happiness, loss of land and buildings, labours hard, hardship in the house ofresidence and hindrance in the happiness, yet in the end gets happiness",
            },
            5: {
                hindi: "संतान की हानि और समस्याएं, शिक्षा के घर में बड़ी कठिनाई, कठोर वाणी और शब्द, मानसिक चिंता",
                english:
                    "Loss and problems with children, great hardship in the house of education, harsh speech and words, mental anxiety",
            },
            6: {
                hindi: "बहुत बहादुर, शत्रुओं के घर में शानदार प्रभाव, अपनी उन्नति के लिए गुप्त युक्तियों का बहुत अधिक प्रयोग, शील का उल्लंघन, स्वार्थ के आगे पाप-पुण्य की परवाह न करना, बहुत खतरनाक, निडर, असंतुष्ट और विजयी",
                english:
                    "Is very brave, splendid influence in the house ofenemies, uses very extravagantly the secret devices for his advancement, violates modesty, does not care for ah the virtues or sin before his selfishness, is very dangerous, fearless, dissatisfied and victorious",
            },
            7: {
                hindi: "पत्नी भाव में क्लेश, व्यवसाय में प्रगति में कठिनाइयाँ, धक्के लगने पर भी घबराहट नहीं होती, व्यवसाय में असहायता होती है, किन्तु अन्त में स्थायी दृढ़ता प्राप्त होती है, यौन सुख भाव में गुप्त शक्तियाँ, एक पत्नी से संतुष्ट नहीं होना।",
                english:
                    "Distress in the house ofwife, difficulties in progress for his occupation, does not feel nervousness even on getting shocks, derives helplessness in his occupation but in the end gets permanent firmness, secret powers in the house of sexual pleasures, not satisfied with one wife",
            },
            8: {
                hindi: "पेट में कुछ अभिन्न शिकायत, बिना चिंता के जीवन बिताता है, कड़ी मेहनत करता है",
                english:
                    "Some integral complaint in his stomach, spends life without anxiety, works hard",
            },
            9: {
                hindi: "भाग्य के घर में महान संकट, भाग्य के उदय को देखने के लिए धर्म की हानि को सहन करना, गुप्त परामर्श का उपयोग करना और एक दिखावटी धार्मिक व्यक्ति होना।",
                english:
                    "Great distress in the house of destiny, further bears the loss of Dharma for seeing the rise ofdestiny, uses the secret consultations and is a showy religious man",
            },
            10: {
                hindi: "पिता के घर में हानि, व्यापार के घर में कष्ट और दंड सहना, व्यापार की उन्नति के लिए कठोर परिश्रम, सरकार और समाज के घर में कष्ट और परेशानी सहना, बहुत मेहनती",
                english:
                    "Loss in the house of father, bears hardships and penalties in the house of trade, labours hard for the rise of trade, bears hardships and perplexity in the house of government and society, is very industrious",
            },
            11: {
                hindi: "लाभ के साथ भारी आय अर्जित करता है, स्वार्थी, बहुत उद्यमी और ऊर्जावान होता है",
                english:
                    "Acquires heavy income with profits, selfish, is very enterprising and energetic",
            },
            12: {
                hindi: "व्यय भाव में बड़ी बेचैनी और कठिनाइयाँ, व्यय भाव में कुछ विपत्तियाँ, बहुत अधीरता",
                english:
                    "Great restlessness and difficulties in the house ofexpenditure, some calamities in the house of expenditure, is very impatient",
            },
        },
    },
    Leo: {
        Sun: {
            1: {
                hindi: "महान प्रतिष्ठा, प्रसिद्धि पाने वाला, राजसी और लंबा कद, बहुत अभिमानी और घमंडी, व्यवसाय और घरेलू मामलों में रुचि नहीं दिखाने वाला, यौन सुखों का विरोध करने वाला, और बहादुर होता है।",
                english:
                    "Great dignity, gets fame, majestic and of tall stature, is very much conceited and haughty, does not show interest in occupation and domestic affairs, opposition in sexual pleasures, and is brave",
            },
            2: {
                hindi: "धन कमाता है, बहुत अमीर कहलाता है, कुलीन जीवनशैली अपनाता है, दीर्घायु होता है, परिवार पर प्रभाव रखता है",
                english:
                    "Earns wealth, is called very rich, maintains an aristocratic lifestyle, long-lived, has the influence on family",
            },
            3: {
                hindi: "बहुत भाग्यशाली, ईश्वर में आस्था रखने वाला, धर्म को महत्व देने वाला, भाई-बहनों के घर में असंतोष, शक्ति के घर में कुछ कमजोरी, घोर निराशा, साहसी माना जाता है।",
                english:
                    "Is supposed to be very lucky, has faith in God, gives importance to Dharma, dissatisfaction in the house of brothers and sisters, gets some weakness in the house of vigour, great hopelessness, and is courageous",
            },
            4: {
                hindi: "माता के भाव में महाबली, भूमि-संपत्ति का सुख प्राप्त करने वाला, अपने स्थान पर सुखपूर्वक रहने वाला, पिता के भाव व व्यवसाय में कुछ परेशानियां, विदेश यात्रा में दुखी, निर्भय, शांति चाहने वाला, अभिमानी होता है।",
                english:
                    "Great power in the house of mother, earns happiness of land and property, lives happily in his own place, some problems in the house of father and business, unhappy in foreign travel, is fearless, wants peace, and is haughty",
            },
            5: {
                hindi: "शिक्षा के घर में विशेष शक्ति, बहुत सम्मान मिलता है, विद्वान और प्रभावशाली होता है, बच्चों के घर में बहुत प्रतिष्ठा होती है",
                english:
                    "Special power in the house ofeducation, gets great respect, is learned and influential, great dignity in the house of children",
            },
            6: {
                hindi: "शत्रुओं पर विजय, अधिक व्यय, बाधाओं और परेशानियों की परवाह न करना",
                english:
                    "Victory over enemies, spends much, does not care for the hindrances and troubles",
            },
            7: {
                hindi: "पत्नी से कुछ नाखुश, प्रभावशाली व्यवसाय करने वाला, यौन सुख के मामले में असंतुष्ट और बेचैन",
                english:
                    "A bit unhappy with wife, undertakes influential business, is dissatisfied in the side of sexual pleasures, and is restless",
            },
            8: {
                hindi: "किसी अन्य स्थान पर रहता है, धन कमाने में बहुत सावधानी बरतता है, शरीर में कुछ थकान होती है, कुछ एकांत का अनुभव करता है",
                english:
                    "lives in some other place, is very careful in earning wealth, some fatigue in the body, experiences some seclusion",
            },
            9: {
                hindi: "बहुत सुन्दर, बड़ा माथा, भाई-बहनों की परवाह न करने वाला, विशेष प्रकार का धर्म, बहुत सम्मान, यश, धार्मिक स्थानों पर उच्च स्थान पाने वाला।",
                english:
                    "Is very handsome, possesses a big forehead, does not care for brothers and sisters, possesses a special kind ofDharma, is much respected, earns fame, gets high position at religious places",
            },
            10: {
                hindi: "जब सूर्य शुक्र की शत्रु राशि वृषभ में दसवें भाव में होता है, तो यह जातक के पिता के साथ संबंधों में तनाव पैदा कर सकता है। फिर भी, यह स्थिति पेशेवर और सामाजिक जीवन में मान्यता, सम्मान और प्रतिष्ठा भी दिलाती है। कभी-कभी प्रेरणा की कमी के बावजूद, जातक परिश्रमी बना रहता है और स्वाभाविक रूप से अधिकार जताता है। वृश्चिक (मंगल राशि) में चतुर्थ भाव पर सूर्य की सप्तम दृष्टि पड़ने से, जातक का अपनी माता के साथ गहरा भावनात्मक बंधन होता है और उसे संपत्ति, घर और वाहन का सुख मिलता है। वे घरेलू और भौतिक सुख-सुविधाओं को बेहतर बनाने के लिए निरंतर प्रयास करते रहते हैं।",
                english:
                    "When the Sun is in the 10th house in Taurus—Venus's enemy sign—it may strain the native's relationship with their father. Yet, this placement also brings recognition, honor, and respect in professional and social life. Despite occasional lack of inspiration, the native remains diligent and exudes natural authority. With the Sun's 7th aspect on the 4th house in Scorpio (Mars sign), the native shares a deep emotional bond with the mother and enjoys property, home, and vehicles. They consistently strive to improve domestic and material comforts.",
            },
            11: {
                hindi: "भारी लाभ प्राप्त करता है और बहुत कमाता है, अच्छा शरीर रखता है, अधिकतम लाभ कमाता है, संतान और शक्ति प्राप्त करता है, शिक्षा प्राप्त करता है, बहुत संतुष्ट और दूरदर्शी होता है",
                english:
                    "Gets heavy gains and earns much, has a good body, rears the maximum profit, gets children and power, gets education, is very satisfied and is farsighted",
            },
            12: {
                hindi: "शरीर दुर्बल, परदेश में रहने वाला, हृदय दुर्बल, अधिक व्यय करने वाला, शत्रु के घर पर तीव्र दृष्टि रखने वाला, अकेलापन अनुभव करने वाला, भ्रमणशील तथा दुर्बल होता है।",
                english:
                    "Is ofemaciated body, lives in foreign place, weakness in his heart, spends much, aspects the house ofenemy very sharply, feels loneliness, possesses the power of touring, and feels weak",
            },
        },
        Moon: {
            1: {
                hindi: "विभिन्न स्थानों की यात्रा करने की शक्ति रखता है, शरीर में कुछ कमजोरी होती है, राजसी और प्रभावशाली ढंग से खर्च करता है, दैनिक व्यवसाय और पत्नी के घर में कुछ कमजोरी होती है, कमजोर दिल और संदिग्ध दिमाग वाला होता है।",
                english:
                    "Possesses the power to travel to various places, some weakness in the body, spends majestically and influentially, some weakness in the daily occupation and in the house of wife, is of weak heart and suspicious mind",
            },
            2: {
                hindi: "धन संचय के घर में कुछ हानि और कुछ कमजोरी, परिवार में कुछ हानि, धन संचय करने में मानसिक रूप से पूर्ण रूप से संलग्न, कुलीन होता है",
                english:
                    "Some loss and some weakness in the house of accumulation of wealth, some loss in the family, is fully engaged mentally to accumulate wealth, and is aristocratic",
            },
            3: {
                hindi: "भाई-बहनों के घर में हानि और कमजोरी, भाई-बहनों पर खर्च, भारी खर्च के कारण शक्ति में कमजोरी, शांत और ऊर्जावान",
                english:
                    "Losses and weakness in the house ofbrothers and sisters, spends on brothers and sisters, expresses weakness in the vigour due to reasons of heavy expenditure, is calm and energetic",
            },
            4: {
                hindi: "माता के घर में दुर्बलता और कमी आती है, सुख-शांति में अनेक बाधाएँ आती हैं, अपने घर और संपत्ति की हानि और दुर्बलता मिलती है, मानसिक चिंताएँ रहती हैं।",
                english:
                    "Gets weakness and deficiency in the house of mother, gets many hindrances in peace and happiness, gets the loss and weakness ofhis own house and property, bears mental worries",
            },
            5: {
                hindi: "ज्ञान और बुद्धि प्राप्त होती है, संतान पक्ष में व्यय, हानि और कमजोरी तथा शिक्षा की हानि का प्रबंधन होता है",
                english:
                    "Gets knowledge and wisdom, manages the expenditure, loss and weakness in the side of children and loss of education",
            },
            6: {
                hindi: "व्यय भाव में कुछ निर्भरता, मानसिक रूप से थका हुआ, विनम्रता से अपना काम निकलवाता है, शत्रु भाव में लापरवाह, रोगों पर खर्च करता है।",
                english:
                    "Some dependence in the house ofexpenditure, gets mentally fatigued, gets his work done politely, careless in the house of enemy, spends on diseases",
            },
            7: {
                hindi: "घर-परिवार में हानि और कमजोरी, स्थानीय व्यवसाय में हानि, यौन और अन्य सुखों में कमजोरी, कुछ हद तक चिंतित और पाप करने वाला, रोजमर्रा के कार्यों में कमजोरी",
                english:
                    "Loss and weakness in the house ofwife and family, gets loss in the local occupation, gets weakness in the sexual and other pleasures, is somewhat anxious and commits sins, weakness in everyday tasks",
            },
            8: {
                hindi: "खर्च का प्रबंधन, घर की दिनचर्या में कुछ कमी महसूस होना, धन संचय में कमजोरी, आयु में कुछ चिंता",
                english:
                    "Manages expenditure, feels some deficiency in the house ofthe daily routine oflife, weakness in the storage ofwealth, some anxiety in the age",
            },
            9: {
                hindi: "खर्च का प्रबंध करता है, धारणा के घर में कुछ कमजोरी आती है, मन में बेचैनी रहती है, भाई-बहनों के घर में कुछ कमी रहती है, बल और ऊर्जा में कुछ कमजोरी रहती है।",
                english:
                    "Manages the expenditure, gets some weakness in the house of Dharrna, restless in mind, some deficiency in the house ofbrothers and sisters, some weakness in the strength and energy",
            },
            10: {
                hindi: "स्थानीय व्यापार में हानि, पिता या स्थानीय पद के भाव में कुछ कमजोरी, भवन और संपत्ति के भाव में कुछ कमजोरी, सुख भाव में कुछ कमजोरी और राजसी तरीके से अत्यधिक खर्च, सरकार और समाज के भाव में व्यय की शक्ति और भाव",
                english:
                    "Gets losses in local business, some weakness in the house offather or local position, some weakness in building and property, some weakness in the house ofhappiness and also spends too much in a royal manner, power ofexpenditure in the house ofgovernment and society and houses",
            },
            11: {
                hindi: "मन की एकाग्रता से सफलता मिलती है, व्यय के बल से भी धनार्जन होता है, भारी व्यय का बल मिलता है, संतान पक्ष में कुछ कमजोरी, शिक्षा प्राप्ति में कुछ कमजोरी",
                english:
                    "Gains success through the concentration of mind, earns by the power of expenditure also, gets the strength ofheavy expenditure, some weakness in the side of children, some weakness in acquiring education",
            },
            12: {
                hindi: "बहुत खर्च करता है, खर्च को नियंत्रित करने में असमर्थ, कुछ हद तक संयमित और ईमानदार दिमाग का",
                english:
                    "Spends much, unable to control the expenditure, somewhat resdess and of scrupulous mind",
            },
        },
        Mars: {
            1: {
                hindi: "जमीन-जायदाद मिलती है, आदर्श माता मिलती है, सुख प्राप्ति के लिए बहुत ऊंचे साधन और प्रभाव मिलते हैं, शरीर सुंदर होता है, पत्नी, परिवार और दैनिक व्यवसाय में नीरसता रहती है।",
                english:
                    "Gets land and property, gets an ideal mother, gets very high means and influence to acquire happiness, has a good physique, dullness in the house of wife, family and daily occupation",
            },
            2: {
                hindi: "बहुत भाग्यशाली होता है, प्राकृतिक संपदा में वृद्धि पाता है, जमीन-जायदाद प्राप्त करता है, घरेलू सुख के घर और माता के पक्ष में कुछ उपद्रव करता है, संतान का सुख प्राप्त करता है, शिक्षा के घर में सौम्यता लाता है",
                english:
                    "Is very fortunate, gets increment in the natural wealth, gets land and property, makes some nuisance like in the house of domestic happiness and in the side of mother, gets the pleasures of children, bears gentleness in the house of education",
            },
            3: {
                hindi: "बहुत भाग्यशाली, अपने शारीरिक बल और पराक्रम से महान सफलता प्राप्त करने वाला, शत्रु भाव में बहुत प्रभाव रखने वाला, रोगों और कठिनाइयों की तनिक भी परवाह न करने वाला, बहुत साहसी, भाई-बहनों का बल पाने वाला, बहुत प्रभावशाली होता है।",
                english:
                    "Is very fortunate, achieves great success through his physical strength and vigour, great influence in the house of enemy, does not care a bit for the diseases and difficulties, is very courageous, gets the power of brothers and sisters, and is very influential",
            },
            4: {
                hindi: "भूमि, संपत्ति और माता का अधिकार प्राप्त करता है, सौभाग्य, शांति और खुशी का आनंद लेता है, व्यापार और व्यवसाय के घर में नीरसता, सरकार और समाज के घर में कुछ असंतोष, सांसारिक मामलों, सम्मान में वृद्धि, पत्नी और पिता के घर में कुछ नीरसता, खुश और प्रसन्न होता है।",
                english:
                    "Gets the power of land and property and mother, enjoys good luck, peace and happiness insipidness in the house of business and, occupation, assumes some dissatisfaction in the house ofgovernment and society, worldly affairs, promotion of honour, some insipidness in the house of wife and father, is happy and joyous",
            },
            5: {
                hindi: "सुखपूर्वक विद्या प्राप्त करता है, संतान सुख पाता है, व्यय भाव में कुछ कमी रहती है, गुप्त सेवा और विज्ञान का ज्ञान होता है",
                english:
                    "Acquires education happily, gets happiness of children, some deficiency in the house of expenditure, has knowledge of secret service and science",
            },
            6: {
                hindi: "शत्रु से रक्षा, माता के भाव में कुछ कमजोरी, सुख-शांति में बाधा, भवन निर्माण की शक्ति, व्यय भाव में कमी",
                english:
                    "Defends the enemy, some weakness in the house of mother, gets hindrance in peace and happiness, possesses the power ofbuildings, deficiency in the house of expenditure",
            },
            7: {
                hindi: "माता-पत्नी पक्ष में सुस्ती, गृहस्थ सुख के घर में कुछ असंतोष, दैनिक व्यवसाय के घर में सफलता",
                english:
                    "Dullness in the side ofmother and wife, some dissatisfaction in the house ofdomestic happiness, success in the house ofdaily occupation",
            },
            8: {
                hindi: "सुख-शांति में अनेक बाधाएँ आती हैं, माता के घर में क्लेश, आवास भवन की कमजोरी, यश प्राप्ति में कमी, गुप्त विद्याओं का ज्ञान नहीं होता।",
                english:
                    "Gets many hindrances in happiness and peace, troubles in the house of mother, weakness of residential building, deficiency in acquiring fame, knowledge of secret methods",
            },
            9: {
                hindi: "बहुत भाग्यशाली, जमीन-जायदाद मिलती है, बहुत सुख मिलता है, व्यय भाव में कमी होती है, ईश्वर में आस्था होती है, बहुत सम्मान मिलता है",
                english:
                    "Very fortunate, gets lands and property, great happiness, deficiency in the house of expenditure, has faith in God, gets great respect",
            },
            10: {
                hindi: "व्यापार से उन्नति और सुख मिलता है, अच्छी संपत्ति और जमीन होती है, धार्मिक औपचारिकताओं का पालन करता है, सरकार और समाज में बहुत सम्मान पाता है, शिक्षा के क्षेत्र में सफलता मिलती है, संतान से सुख और शांति मिलती है, स्वास्थ्य अच्छा रहता है, बहुत प्रभावशाली होता है।",
                english:
                    "Gets progress and happiness through business, has good property and land, observes religious formalities, gets great respect in government and society, gets success in the line of education, peace and happiness from children, good health, is very influential",
            },
            11: {
                hindi: "धन संचय, माता का लाभ, भवन व भूमि का लाभ, शत्रु भाव में प्रबल प्रभाव, परिवार का सुख देख सकता है, शिक्षा भाव में बहुत बुद्धिमानी से कार्य करता है, संतान के कुछ साहसिक कार्य, धर्मपरायण व स्वार्थी होता है।",
                english:
                    "Accumulates wealth, advantage ofmother, gets the gains ofbuildings and land, great influence in the house ofenemy, can see the happiness of family, works very intelligently in the house of education, some adventures of children, is pious and selfish",
            },
            12: {
                hindi: "भाग्य भाव में अत्यधिक कमजोरी, माता भाव में हानि, भूमि-भवन एवं निवास स्थान की हानि, व्यय भाव में अशांत, शत्रु भाव में प्रभाव",
                english:
                    "Great weakness in the house of destiny, gets loss in the house of mother, loss oflands and buildings and residential places, restless in the house of expenditure, influence in the house of enemy",
            },
        },
        Mercury: {
            1: {
                hindi: "भारी लाभ और बहुत धन प्राप्त होता है, दैनिक व्यवसाय में बड़ी सफलता मिलती है, पत्नी के घर में बड़ा लाभ होता है, सांसारिक मामलों और यौन सुखों में बड़ी सफलता मिलती है, सम्मानित और चतुर होता है",
                english:
                    "Gets heavy gains and much wealth gets great success in daily, occupation, great advantage in the house of wife, great success in worldly affairs and of sexual pleasures, is respectable and clever",
            },
            2: {
                hindi: "बहुत धन संचय करता है, उच्च आय प्राप्त करता है, बड़ा परिवार होता है, जीवन की दिनचर्या में लापरवाही नहीं बरतता, आय के घर में सीमित मार्ग से सम्मान प्राप्त करता है,",
                english:
                    "Accumulates much wealth, gets high income, has a big family, carelessness in the daily routine oflife, limited way in the house of income acquires respect,",
            },
            3: {
                hindi: "धन और लाभ के अनेक मार्ग अर्जित करता है, भाई-बहनों से लाभ उठाता है, ईश्वर पर बहुत विश्वास रखता है, बहुत चतुर होता है",
                english:
                    "Earns wealth and many ways ofgains, gets the advantage ofbrothers and sisters, much confidence in God, is very clever",
            },
            4: {
                hindi: "धन संचय करता है, भवन और संपत्ति की शक्ति प्राप्त करता है, घर बैठे सुखपूर्वक अपनी सभी इच्छाएं पूरी करता है, अच्छे वस्त्र और आभूषण आदि प्राप्त करता है, धन के बल पर व्यापार करता है, सरकार और समाज में सम्मान प्राप्त करता है, चतुर कार्यकर्ता होता है।",
                english:
                    "Accumulates wealth, gets the power of building and property, gets his every want satisfied happily sitting at his house, gets good garments and ornaments etc, conducts business through the power ofwealth, gets respect in government and society, is a clever worker",
            },
            5: {
                hindi: "वह शिक्षा प्राप्त करता है और उसकी बुद्धि में महान कला होती है, वह बहुत धन कमाता है, बच्चों से बहुत लाभ उठाता है, बहुत मूल्यवान योजनाएँ बनाता है, सम्मान और आदर प्राप्त करता है, अपने उद्देश्य को विनम्रता से पूरा करता है, और बहुत चतुर होता है।",
                english:
                    "Acquires education and possesses great art in his intellect, earns much money, gets the great advantage ofchildren, draws very valuable plans, gets respect and honour, serves his purpose with politeness, and is very clever",
            },
            6: {
                hindi: "धन संचय में कमजोरी, शत्रुओं और रोगों के संबंध में धन के कारण कुछ लाभ उठाता है, बहुत खर्च करता है, बहुत चालाक होता है",
                english:
                    "Weakness in accumulating wealth, takes some advantage due to wealth in connection with enemies and diseases, spends much, is very clever",
            },
            7: {
                hindi: "दैनिक व्यवसाय में बड़ी सफलता और उन्नति, ससुर के परिवार से बहुत धन और लाभ अर्जित करता है, पत्नी और परिवार के घर में बहुत सुख मिलता है, यौन सुखों का भरपूर लाभ उठाता है, सुंदर सभ्य व्यवसाय करता है।",
                english:
                    "Great success and rise in daily occupation, earns much wealth and gains from the father-in-law's family, great pleasure in the house of wife and family, gets great advantage of sexual pleasures pursues, beautifully the decent occupation",
            },
            8: {
                hindi: "धन भाव में बड़ी हानि, बहुत कठिन कर्मों से धन संचय, दीर्घायु भाव में बेचैनी और जीवन की दिनचर्या में अशांति, जीवन में चिंता",
                english:
                    "Great loss in the house ofwealth, accumulates wealth through very difficult deeds, restlessness in the house oflongevity and in the daily routine of life, anxiety in life",
            },
            9: {
                hindi: "भाग्य की शक्ति से धन प्राप्त करता है, ईश्वर पर बहुत भरोसा रखता है, भाई-बहनों से लाभ प्राप्त करता है, बहुत सम्मानीय होता है",
                english:
                    "Gains wealth due to power of destiny, has great reliance in God, gets advantage from the brothers and sisters, is very respectable",
            },
            10: {
                hindi: "व्यापार-व्यवसाय में उन्नति, धन-संपत्ति में वृद्धि, सरकार व समाज में बड़ा सम्मान, धन-संपत्ति में वृद्धि, पिता के घर के व्यवसाय में वृद्धि, माता की ओर से लाभ, भूमि-भवन का बल मिलता है।",
                english:
                    "Secures progress in trade and business, gets power ofwealth, gets great respect in government and society, increase ofwealth and in the profession of father's house, acquires gains from the side of mother, gets strength of lands and buildings",
            },
            11: {
                hindi: "आय भाव में अत्यधिक लाभ और धन प्राप्ति, सीमित मान-सम्मान, संतान पक्ष से लाभ, शिक्षा भाव में कला और धन प्राप्ति, अपनी चतुराई के कारण अवसर और प्रशंसा प्राप्त होती है।",
                english:
                    "Gets huge gains and earns much money, confined dignity in the house ofincome, advantage from the side ofchildren, art and earns wealth in the house of education, gets the opportunity and appreciation of his cleverness",
            },
            12: {
                hindi: "बहुत सारा धन खर्च करता है, धन संचय को महत्व नहीं देता, शत्रुओं, रोगों और कठिनाइयों को दूर भगाने के लिए धन का सहारा लेता है, धन के भण्डार में कुछ कष्ट अनुभव करता है।",
                english:
                    "Spends a lot ofmoney, not giving importance to accumulate wealth, takes the help of money to drive away enemies, diseases and difficulties, experiences some distress in the store ofwealth",
            },
        },
        Jupiter: {
            1: {
                hindi: "दीर्घायु होता है और खूब शिक्षा प्राप्त करता है, संतान को बल मिलता है, जीवन की दिनचर्या शान से व्यतीत करता है, सुंदरता में कुछ कमी होती है, बहुत विद्वत्ता दिखाता है, पारिवारिक वातावरण में नीरसता रहती है।",
                english:
                    "Gets good longevity and acquires much education, gets the strength of the children, spends the daily routine of his life with eminence, some deficiency in handsomeness, shows great scholarship, insipidness in family environment",
            },
            2: {
                hindi: "बहुत ही कुलीन तरीके से जीवन व्यतीत करता है और कुछ कमजोरियां होती हैं, बच्चों के संबंध में कुछ उलझन का अनुभव करता है",
                english:
                    "Spends life in a very aristocratic way and some weakness, experiences some perplexity with regard to children",
            },
            3: {
                hindi: "अच्छी दीर्घायु, भाई-बहनों के घर में कष्ट, शिक्षा प्राप्त होती है",
                english:
                    "Good longevity, pain in the house of brothers and sisters, gets education",
            },
            4: {
                hindi: "अपनी दिनचर्या बड़े सुख से व्यतीत करता है, माता के घर में कुछ कमी रहती है, संतान का बल कुछ कमी के साथ प्राप्त होता है, स्थानीय सुख में कुछ कठिनाई होती है।",
                english:
                    "Spends his daily routine oflife with great happiness, some deficiency in the house of mother, gets the power of children with some deficiency, some difficulty in local pleasure",
            },
            5: {
                hindi: "संतान सुख और शिक्षा प्राप्ति, कुछ हद तक भाग्यशाली, शरीर से सम्मान, आनंदपूर्वक जीवन व्यतीत करने वाला तथा सदैव पारंपरिक ढंग से बात करने वाला होता है।",
                english:
                    "Gets the happiness of children and getting education, supposed to be somewhat fortunate, gets honour for body, spends the life joyfully and always talks intricately in traditional manner",
            },
            6: {
                hindi: "जीवन की दिनचर्या में बेचैनी का अनुभव करता है, बहुत खर्च करता है, शत्रु के घर में बड़ी कूटनीति का प्रयोग करता है, धन बढ़ाने के लिए बहुत प्रयास करता है",
                english:
                    "Experiences restlessness in the daily routine of life, spends much, uses great diplomacy in the house of enemy, puts great efforts in increasing the wealth",
            },
            7: {
                hindi: "पत्नी के घर में उलझन, व्यापार-सम्बन्धी शक्ति प्राप्त करने में बड़ी कठिनाई और बाधाएँ, शिक्षा और संतान के घर में कुछ परेशानी, भाई-बहनों के सम्बन्ध में कुछ नीरसता, सम्मान में कुछ कमी।",
                english:
                    "Perplexity in the house ofwife, bears great hardships and hindrances in acquiring power ofmanaging business, some trouble in the house of education and children, some insipidness with regard to brothers and sisters, somewhat respectable",
            },
            8: {
                hindi: "आयु में वृद्धि, संतान से कष्ट, शिक्षा भाव में कुछ कमी, माता भाव में कुछ हानि, सुख भाव में कमी",
                english:
                    "Increased longevity, bears troubles from children, some deficiency in the house ofeducation, some loss in the house ofmother, deficiency in the house of happiness",
            },
            9: {
                hindi: "खूब शिक्षा प्राप्त करता है, संतान से बल प्राप्त करता है, सम्मान प्राप्त करता है, महान धार्मिक विचारों को जटिल ढंग से प्रस्तुत करता है, प्रसिद्धि प्राप्त करने में कुछ कमी होती है, जीवन सौभाग्य और बुद्धिमत्ता से व्यतीत करता है।",
                english:
                    "Acquires much education, gets the strength ofchildren, gets respect, puts forward great religious ideas in some intricate manner, some deficiency in acquiring fame, spends the life fortunately and intelligently",
            },
            10: {
                hindi: "पिता के घर में कमी, संतान से बल प्राप्त, शत्रु के घर में गुप्त नीति, सरकार और समाज में सम्मान पाने के लिए कठोर परिश्रम, अभिमानी और कुशल होता है।",
                english:
                    "Deficiency in the house of father, gets the power of children, secret policy in the house of enemy, hard labour to acquire honour in government and society, is self-conceited and skilful",
            },
            11: {
                hindi: "दीर्घायु, विद्या प्राप्ति, संतान से बल, प्रसन्नचित्त जीवन, दैनिक जीवन में बड़ी असुविधा, पत्नी एवं परिवार, घर में पराक्रम एवं भाई-बहनों में भी कुछ कमी।",
                english:
                    "Gets good longevity, acquires education, gets the strength ofchildren, spends life in cheerful disposition, great inconvenience in the daily life, wife and family, some deficiency in the house of vigour and brothers and sisters also",
            },
            12: {
                hindi: "बहुत खर्चा होता है, थोड़ी शिक्षा और कुछ बच्चे होते हैं, अच्छी आयु प्राप्त होती है, सुख के घर में कुछ हानि होती है।",
                english:
                    "Spends much, gets a little education and a few children, gets good age, some loss in the house ofhappiness",
            },
        },
        Venus: {
            1: {
                hindi: "अपनी शक्ति और ऊर्जा से खूब काम करता है, व्यापार और व्यवसाय में सम्मान और उन्नति पाता है, पत्नी के घर में सम्मान और बल तथा विशेष शक्तियां और यौन सुख प्राप्त करता है, सरकार और समाज में सम्मान की वृद्धि के लिए कठिन परिश्रम करता है, अपने काम को चतुराई से पूरा करता है, और बहुत मेहनती होता है।",
                english:
                    "Works much with his strength and energy, gets honour and progress in trade and occupation, honour and strength in the house ofwife and special powers and sexual pleasures, exerts a bit hard for securing the rise of honour in government and society, gets his work done tactfully, and is very industrious",
            },
            2: {
                hindi: "धन और परिवार के घर में कुछ कमजोरी",
                english: "Some weakness in the house of wealth and family",
            },
            3: {
                hindi: "भाई-बहन और पिता का बल प्राप्त होता है, सरकार और समाज से सम्मान मिलता है, यश मिलता है, धार्मिक कार्य करता है, व्यापार में उन्नति करता है, परिश्रमी, साहसी और कुशल होता है।",
                english:
                    "Gets the power ofbrothers, sisters and father, honour in connection with government and society, gets fame, does religious deeds, gets progress from business, industrious, courageous and skilful",
            },
            4: {
                hindi: "महान व्यवसाय शुरू करता है, भाई-बहनों और पिता से सुख प्राप्त करता है, सरकार और समाज से शक्ति प्राप्त करता है, भवन और संपत्ति की महान ताकत, खुशी प्राप्त करता है, एक कुशल कार्यकर्ता",
                english:
                    "Embarks on a great business, gets the happiness from brothers, sisters and father, gets power from government and society, great strengths of buildings and property, acquires happiness, a skilled worker",
            },
            5: {
                hindi: "विद्या के घर में वैभव प्राप्त होता है, संतान का बल मिलता है तथा पिता, भाई-बहनों की उन्नति होती है, सरकार और समाज से लाभ और सम्मान मिलता है, बहुत व्यवहार कुशल होता है।",
                english:
                    "Gets grandeur in the house ofeducation, gets the power of children and progress of father, brothers and sisters, gets the advantage and respect from government and society, is very tactful",
            },
            6: {
                hindi: "पिता के घर में कुछ शत्रुता, सम्मान के घर में बाधाएं, सरकार और समाज में कुछ साधारण ताकत, बहुत खर्च, व्यवसाय चलाने में कठिनाइयों का सामना करना पड़ता है, दुश्मन के घर में प्रभाव, प्रगति प्राप्त करने में बहुत कठिनाई महसूस होती है।",
                english:
                    "Some enmity in the house of father, hindrances in the house of honour, some ordinary strength in government and society, spends much, faces difficulties in conducting the occupation, influence in the house of enemy, feels very hard to acquire progress",
            },
            7: {
                hindi: "दैनिक एवं स्थायी व्यापार एवं व्यवसाय में महान शक्ति प्राप्त होती है, भाई-बहनों एवं पिता के घर में शक्ति प्राप्त होती है, शासन एवं समाज में बड़ा सम्मान एवं प्रभाव प्राप्त होता है, पत्नी एवं परिवार के घर में महान शक्ति एवं वैभव प्राप्त होता है, यौन सुख में महान शक्ति प्राप्त होती है, बहुत कुशल, साहसी, चतुर एवं ओजस्वी शक्ति प्राप्त होती है।",
                english:
                    "Gets a great power of daily and permanent trade and occupation, gets the power of brothers and sisters and in the house of father, great respect and influence in connection with government and society, gets a great power and grandeur in the house of wife and family, gets great power ofsexual pleasure, is very skilled, courageous, clever and gets the power of vigour",
            },
            8: {
                hindi: "दूर-दराज के देशों में व्यापार करता है, अपने भाइयों, बहनों और पिता के संबंध में विचित्र प्रकार का सुख प्राप्त करता है, धन भाव में कमी होती है।",
                english:
                    "Conducts business in far-offforeign countries, gets a curious sort of happiness in connection with his brothers, sisters and father, deficiency in the house of wealth",
            },
            9: {
                hindi: "भाग्य की प्रगति से अपार सफलता और उन्नति प्राप्त करता है, भाई-बहनों और पिता के घर का सुख भोगता है, धार्मिक कार्य करता है, सरकार और समाज में सम्मान और सफलता प्राप्त करता है।",
                english:
                    "Gets grand success and progress through the progress of destiny, enjoys the house of brothers, sisters and father, performs religious functions, gets honour and success in government and society",
            },
            10: {
                hindi: "भाई-बहनों और पिता से लाभ, यश और प्रशंसा, यश और सम्मान, सरकार और समाज में सफलता, व्यापार में बड़ी सफलता, प्रतिष्ठा में वृद्धि, भवन और संपत्ति की शक्ति, व्यापार में सफलता, महत्वाकांक्षी, राजसी, मेहनती और आत्म-अभिमानी",
                english:
                    "Advantage from brothers, sisters and father, gets fame and appreciation for success and honour and success in government and society, great success in business, rise in prestige, power ofbuildings and property, gets success in business, ambitious, majestic, industrious and self-conceited",
            },
            11: {
                hindi: "बहुत धन कमाता है, सरकार और समाज से लाभ उठाता है, शिक्षा के भाव में सफलता पाता है, पिता और संतान के भाव में शक्ति प्राप्त करता है, बहुत उत्साही कार्यकर्ता होता है",
                english:
                    "Earns much wealth, enjoys the advantage from government and society, success in the house of education, gets power from father and in the house of children, is a very zealous worker",
            },
            12: {
                hindi: "अधिक खर्च, पिता व भाई के घर में हानि, व्यापार में हानि, सरकार व समाज के घर में कुछ कमजोरी मिलती है।",
                english:
                    "Spends much, loss in the house of father and brothers, loss in business, gets some weakness in the house ofgovernment and society",
            },
        },
        Saturn: {
            1: {
                hindi: "शरीर से कोई न कोई कठिन दैनिक कार्य करता है, घर-परिवार और पत्नी में सुख रहता है, कुछ रोग होते हैं, काम-वासनाओं का विशेष संयोग होता है, उन्नति के मार्ग में प्रबल उत्साह रहता है तथा कठोर परिश्रम और युक्ति के बल पर कार्य करता है।",
                english:
                    "Pursues some laborious daily occupation through his body, happiness in the house of family and wife, gets some diseases, special conjunction of sexual passions, great vigour in the way ofprogress and works with the power of hard labour and tactics",
            },
            2: {
                hindi: "धन भाव में कुछ सफलता और कुछ हानि, सुख और माता भाव में बाधा, भवन और निवास स्थान में कुछ अशांति, पत्नी भाव और दैनिक व्यवसाय में अशांति।",
                english:
                    "Some success and also losses in the house ofwealth, hindrances in the house of happiness and mother, some restlessness in the buildings and residential places, restlessness in the house of wife and daily occupation",
            },
            3: {
                hindi: "शत्रु भाव में विजय मिलती है, रोजमर्रा के कामों में बहुत ताकत मिलती है, साहसपूर्वक काम करता है, संतान भाव में कुछ बेचैनी रहती है, व्यय भाव में कुछ बेचैनी रहती है",
                english:
                    "Gets victory in the house of enemies, great power in everyday occupation, works courageously, some restlessness in the house of children, some restless in the house of expenditure",
            },
            4: {
                hindi: "माता के घर में स्नेह की कमी, पत्नी के घर में कुछ अरुचि, कठोर परिश्रम, जीवन की परेशानियों और रोगों पर विजय पाने के लिए बहुत दृढ़ और हठी होता है।",
                english:
                    "Loss in the affection ofhouse ofmother, some dislike in the house of wife, labours hard, is very steady and obstinate on gaining victory over troubles of life and diseases, etc",
            },
            5: {
                hindi: "अपनी बुद्धि के बल पर दैनिक कार्यों को बड़ी लगन से करता है, काम-भोगों की शक्ति प्राप्त करता है, मन में काम-सुख की महान योजनाएँ बनाता है, संतान पक्ष में सुस्ती, विद्या और बुद्धि के भाव में गुप्त नीतियाँ, मानसिक रूप से चिंतित, अत्यंत कुशल, शत्रु को प्रभावित करने वाला",
                english:
                    "Pursues the everyday occupation very diligently through his intelligence, gets power of sexual enjoyments, chalks out great schemes of sexual pleasures in the mind, dullness in the side of children, hidden policies in the house of education and wisdom, mentally worried, very skilful, and influences the enemy",
            },
            6: {
                hindi: "पत्नी की ओर से परेशानी, यौन सुखों में कुछ कमी, शत्रु के घर में प्रभाव, दैनिक व्यवसाय में बड़ी परेशानियों के बाद प्रभाव",
                english:
                    "Perplexity from the side ofwife, some deficiency in the advantages of sexual pleasures, gets influence in the house of enemy, gets influence in the daily occupation after going through great troubles",
            },
            7: {
                hindi: "कठिन परिश्रम और युक्तियों से दैनिक कार्य की स्थिर शक्ति प्राप्त होती है, कामवासना की महान शक्ति प्राप्त होती है, पत्नी के घर में कुछ शत्रुता होती है, धर्म को चोट पहुँचती है, शरीर में कुछ रोग होते हैं, माता और सुख के घर में बड़ी बाधा आती है।",
                english:
                    "Gets the stable power of daily occupation through hard labour and tactics, gets the grand power ofsexual passions, some enmity in the house ofwife, injures Dharma, gets some diseases in the body, great hindrance in the house of mother and happiness",
            },
            8: {
                hindi: "पत्नी भाव में यौन हानि, दैनिक व्यवसाय भाव में कष्ट, विदेश से सहयोग, संतान पक्ष में कष्ट, व्यवसाय भाव में कुछ हानि, दीर्घायु भाव में कुछ निराशा, सरकार और समाज में उपयोग के लिए बहुत प्रयास करता है।",
                english:
                    "Sexual loss in the house ofwife, faces hardships in the house ofdaily occupation, collaboration with foreign countries, distress in the side of children, some loss in the house of occupation, some despair in the house of longevity, puts in great efforts for use in government and society",
            },
            9: {
                hindi: "भाग्य के घर में बड़ी कमजोरी, भगवान के घर में कुछ कमजोरी, पर्याप्त धन मिलता है",
                english:
                    "Great weakness in the house ofdestiny, some weakness in the house of God, gets sufficient wealth",
            },
            10: {
                hindi: "दैनिक कार्य की शक्ति प्राप्त करता है, दैनिक कार्य की क्षमता से बड़ा सम्मान प्राप्त करता है, सरकार और समाज में सम्मान की उन्नति करता है, पत्नी और यौन सुख की शक्ति प्राप्त करता है, अधिक खर्च करता है, शांति और खुशी प्राप्त करने में कुछ बाधाओं का सामना करता है, कुशल और मेहनती होता है।",
                english:
                    "Gets the power of daily occupation, gets great respect through his ability of daily occupation, progress of honour in government and society, gets power ofwife and sexual pleasures, spends much, faces some hindrance in achieving peace and happiness, skilful and industrious",
            },
            11: {
                hindi: "दैनिक कार्यों और व्यवसाय के घर में बहुत धन कमाता है, कुछ बीमारियों को पकड़ता है, कठिन परिश्रम के माध्यम से कई लाभों का आनंद लेता है, पत्नी और यौन सुख का बड़ा लाभ उठाता है, दुश्मन के घर में बहुत प्रभाव डालता है",
                english:
                    "Earns great wealth in daily affairs and in the house of occupation, catches some diseases, enjoys many advantages through hard labour, enjoys the great advantage of wife and sexual enjoyment, has great influence in the house of enemy",
            },
            12: {
                hindi: "अधिक खर्च, पत्नी के घर में कुछ हानि, शत्रु के घर में प्रभाव, ईश्वर और भाग्य में कम विश्वास, बीमारियों पर खर्च",
                english:
                    "Spends much, some loss in the house ofwife, keeps in the influence of in the house ofenemy, has less faith in God and destiny, spends on diseases",
            },
        },
        Rahu: {
            1: {
                hindi: "शरीर में कमजोरी, मस्तिष्क में कुछ चिंता और कुछ तनाव, आंतरिक भय महसूस होना, स्वार्थी होना और प्रभाव बनाये रखना",
                english:
                    "Weakness in body, some anxiety and some stress in the brain, feels inner fear, selfish and keeps influence",
            },
            2: {
                hindi: "धन भाव में कुछ हानि, परिवार भाव में कुछ कमजोरी, धन प्राप्ति के लिए गुप्त उपाय, तथा कुछ हद तक बेचैनी",
                english:
                    "Some loss in the house ofwealth, experiences some weakness in the house of family, uses secret means to acquire wealth, and is somewhat restless",
            },
            3: {
                hindi: "महान प्रभाव, कुछ अलगाव और कुछ बेचैनी की शक्ति प्राप्त होती है, कठिन से कठिन कार्य को प्राप्त करने में धैर्य और कूटनीति की महान शक्ति होती है, परेशानियों और कठिनाइयों की परवाह नहीं करता, बहुत चतुर होता है और अंत में धन की वृद्धि करता हुआ प्रतीत होता है।",
                english:
                    "Gets power ofgreat influence, some separation and some restlessness, possesses the great power of patience and diplomacy in acquiring the most difficult task, does not care for troubles and difficulties, is very clever and in the end seems the increase ofwealth",
            },
            4: {
                hindi: "माता का वियोग या वियोग अथवा माता के घर में कष्ट, सुख प्राप्ति में कुछ हानि, सुख प्राप्ति के लिए गुप्त कार्य, गृहस्थ वातावरण में क्लेश, बहुत समय बाद सुख प्राप्ति तथा अनेक उलझनें",
                english:
                    "Gets the loss or separation of mother or in the house of mother, some loss in acquiring happiness, does secret deeds for acquiring happiness, distress in the domestic environment, acquires happiness after much time and many perplexities",
            },
            5: {
                hindi: "वह महान मिथ्यात्व के बल से अपना कार्य करवाता है, संतान के घर में महान कष्ट पाता है, विद्या प्राप्ति के घर में दुर्बलता पाता है, मानसिक रूप से व्याकुल रहता है, अपने विचारों को उचित शब्दों में व्यक्त करने में उसे बहुत कठिनाई होती है, कुछ हद तक बेचैन रहता है।",
                english:
                    "Gets his work done through power of great falsehood, bears great distress in the house of children, gets weakness in the house of acquiring education, is mentally perplexed, finds great hardship to express his views properly and in appropriate words, somewhat restless",
            },
            6: {
                hindi: "शत्रु के घर में प्रभाव डालने की महान शक्ति रखता है, विनम्रता, सज्जनता और संतोष का उल्लंघन करता है, प्रभावशाली और बहादुर होता है",
                english:
                    "Possesses the great power ofinfluence in the house ofenemy, violates politeness, gentility and satisfaction, influential and brave",
            },
            7: {
                hindi: "माता के घर में बेचैनी, दैनिक कार्यों में बड़ी उलझन, यौन अंगों से संबंधित कुछ दोष, अपनी अतृप्त वासनाओं को संतुष्ट करने की इच्छा, यौन सुख के लिए गुप्त योजनाएं, व्यवसाय के क्षेत्र में गुप्त युक्तियां, अंत में कुछ शक्ति प्राप्त होती है।",
                english:
                    "Restless in the house of mother, bears great perplexity in the daily occupation, some defect relating to sexual organs, desires to satisfy his unsatisfied passions, uses secret schemes in sexual pleasure, secret devices in the line of occupation, gets some strength at the end",
            },
            8: {
                hindi: "जीवन की दिनचर्या के भाव में अनेक उलझनें, पेट में कुछ आंतरिक परेशानी, अनेक कष्ट सहने के बाद दीर्घायु के भाव में घातक हानि",
                english:
                    "Many perplexities in the house of daily routine of life, some inner trouble in the stomach, fatal losses in the house of longevity after bearing many hardships",
            },
            9: {
                hindi: "भाग्य भाव में हानि, ईश्वर पर विश्वास और भरोसे में कमी, उन्नति के लिए अत्यंत जटिल और गुप्त युक्तियों का प्रयोग, बड़ी बाधाओं का सामना करने के बाद अंत में सफलता की शक्ति प्राप्त करना, यश में कमी",
                english:
                    "Loss in the house of fortune, deficiency in the faith and reliance on God, uses very intricate and secret devices for the rise, gets the power of success in the end after facing great hindrances, deficiency in fame",
            },
            10: {
                hindi: "पिता के घर में बड़ी कठिनाइयाँ, सरकार और समाज से संबंधित कुछ परेशानियाँ, उन्नति के लिए गुप्त युक्तियों से काम लेना, मान-सम्मान और भाग्य में बाधाएँ, अनेक कठिनाइयों का सामना करने के बाद बड़ी कूटनीतिक युक्तियों से उन्नति का मार्ग प्राप्त करना।",
                english:
                    "Great difficulties in the house offather, some troubles in connection with government and society, working through secret devices for securing progress, gets hindrances in the respect and fortunes, gets the way to progress through great diplomatic tactics after facing many hardships",
            },
            11: {
                hindi: "अधिक आय प्राप्त करने वाला, बहुत साहसी, अधिकतम लाभ का आनंद लेने का तरीका खोजने वाला, लालची, तथा धन प्राप्ति के घर में कभी संतुष्ट नहीं होने वाला",
                english:
                    "Acquires large income, great courage, finds way to enjoy the maximum profits, is greedy, and is never satisfied in the house of acquiring wealth",
            },
            12: {
                hindi: "बहुत खर्च करता है, बड़ी कठिनाइयों और चिंताओं के साथ व्यय का प्रबंधन करने की शक्ति प्राप्त करता है, कभी-कभी व्यय के घर में शत्रुतापूर्ण गणना का सामना करता है",
                english:
                    "Spends much gets the power to manage expenditure with great, hardships and anxieties, sometimes faces hostile calculations in the house of expenditure",
            },
        },
        Ketu: {
            1: {
                hindi: "शरीर में कुछ कमजोरी, शरीर में मृत्यु जैसा खतरा, कठोर शारीरिक श्रम करने वाला, साहसी, स्वाभिमानी, यौन सुख की महान शक्ति वाला तथा बहुत कठिन परिश्रम करने वाला",
                english:
                    "Some weakness in the body, death like danger in the body, does hard physical labour, is courageous, proud, possesses the great power of sexual pleasures, and labours very hard",
            },
            2: {
                hindi: "धन के भण्डार में कुछ कमी, परिवार के घर में कुछ कमजोरी, तथा सांसारिक ज्ञान के विषय में बहुत धैर्य से काम लेना।",
                english:
                    "Some deficiency in the store ofwealth, some weakness in the house of family, and works very patiently regarding his worldly wisdom",
            },
            3: {
                hindi: "भाई-बहनों के घर में कुछ अशांति, प्रभाव में बहुत वृद्धि, विनम्रता और सज्जनता की परवाह न करना, सदैव अपने स्वार्थ सिद्धि के लिए तत्पर रहना, तथा शक्तिशाली होना।",
                english:
                    "Some restlessness in the house ofbrothers and sisters, great rise in influence, does not care for politeness and gentility, always keen to accomplish his selfishness, and is powerful",
            },
            4: {
                hindi: "माता के घर में कुछ कमी, मातृभूमि और जन्मभूमि से वियोग, सुख प्राप्ति में बड़ी बाधाएँ, निवास स्थान और भवन सम्बन्धी कमी।",
                english:
                    "Some deficiency in the house ofmother, gets the separation from his motherland and birthplace, faces great obstacles getting happiness, deficiency in connection with residential place and buildings",
            },
            5: {
                hindi: "कठिन बौद्धिक श्रम से शिक्षा प्राप्त करता है, बच्चों की ओर से कुछ कष्ट होता है, अपने वास्तविक विचारों या वास्तविक राय को उचित रूप से समझाने में कुछ कठिनाई महसूस करता है।",
                english:
                    "Acquires education by hard intellectual labour, some distress on the side ofchildren, feels some difficulty in explaining his real views or real opinion properly",
            },
            6: {
                hindi: "शत्रु भाव में प्रबल प्रभाव, रोगों व कष्टों का नाश, शील भंग, स्वार्थ सिद्धि, अति वीर व साहसी",
                english:
                    "Great influence in the house of enemy, destroys the diseases and difficulties, violates modesty, gets the selfishness accomplished, is very brave and courageous",
            },
            7: {
                hindi: "पत्नी के घर में हानि, विशेष शक्तियां प्राप्त, यौन सुख भोगता, रोजमर्रा के कामों में कठिन परिश्रम करता",
                english:
                    "Loss in the house of wife, gets the special powers, enjoys sexual pleasures, puts in hard labour in the house of everyday occupation",
            },
            8: {
                hindi: "उनके जीवन की दिनचर्या के घर में बड़ी उलझनें, पेट में कुछ आंतरिक परेशानी, उम्र के घर में घातक नुकसान",
                english:
                    "Great perplexities in the house of daily routine of his life, some internal trouble in his stomach, fatal loss in the house of age",
            },
            9: {
                hindi: "भाग्य भाव में भारी कष्ट, उन्नति भाव में बाधा, धर्म भाव और देव भाव में न्यूनता, कुछ कष्टों के बाद अंत में भाग्य में दृढ़ता मिलती है",
                english:
                    "Great troubles in the house of destiny, hindrance in the house progress, deficiency in the house of Dharma and God, after some troubles gets firmness of destiny in the end",
            },
            10: {
                hindi: "पिता के घर में कुछ हानि, व्यापार और व्यवसाय के घर में कठोर परिश्रम और कष्ट सहना, सरकार और समाज में उन्नति के लिए बहुत कष्ट सहना, बहुत मेहनती और गुप्त ऊर्जा से युक्त होना।",
                english:
                    "Some loss in the house of father, puts in hard labour and bears hardships in the house ofbusiness and occupation, bears great trouble to rise in government and society, is very industrious and possesses secret energy",
            },
            11: {
                hindi: "आय भाव में कुछ कम परिश्रम का प्रबल बल, कुछ निश्चित लाभ भी, धन की आय बढ़ाने के लिए दूसरों के लाभ हानि की परवाह नहीं, मन ही मन धैर्यवान।",
                english:
                    "Great strength of somewhat less labour in the house of income, some definite gains also, does not care about the profit or loss of others for raising the income of wealth, is secretly patient",
            },
            12: {
                hindi: "व्यय भाव में बड़ी बेचैनी, बाहरी स्थानों से जुड़े कार्यों में कुछ बेचैनी, बड़े कष्ट सहते हुए आंतरिक धैर्य से अपना काम निकालता है और अंत में व्यय भाव में कुछ दृढ़ता पाता है।",
                english:
                    "Great restlessness in the house of expenditure, some restlessness in the labour connected with outside places, gets his work done with internal patience bearing great troubles and in the end gets some firmness of expenditure",
            },
        },
    },
    Virgo: {
        Sun: {
            1: {
                hindi: "अधिक व्यय करने वाला, दुर्बल एवं कृश शरीर वाला, शारीरिक श्रम से व्यय चलाने वाला, व्यय की शक्ति से दैनिक कार्य करने वाला, पत्नी के घर में दुर्बलता, व्यवसाय में हानि एवं दुर्बलता, अभिमानी होता है।",
                english:
                    "Spends much, is of weak and emaciated body, manages his expenditure by physical labour, conducts the daily occupation with the power ofexpenditure, gets weakness in the house ofwife, gets some losses and weakness in occupation, is haughty",
            },
            2: {
                hindi: "धन की भारी हानि, अनावश्यक रूप से धन खर्च, परिवार का नुकसान, जीवन की दिनचर्या पर कुछ प्रभाव, गहन एवं जटिल नीतियों के माध्यम से अपने उद्देश्य की पूर्ति",
                english:
                    "Great loss ofwealth, spends money unnecessarily, faces the loss of family, gets some influence in the daily routine of life, serves his purpose through deep and intricate policies",
            },
            3: {
                hindi: "अपने बल से व्यय का प्रबंध करता है, भाइयों को हानि पहुँचाता है, कुछ चिन्ताएँ अनुभव करता है, दुर्बल भाग्य वाला होता है, बहुत परिश्रमी होता है।",
                english:
                    "Manages the expenditure by his own power, injures brothers, experiences some anxieties, has a weak destiny, is very industrious",
            },
            4: {
                hindi: "सुख के साधनों में कमी, माता के घर में अलगाव, पिता के घर में कुछ कमजोरी और बड़े व्यवसाय में, मान-सम्मान के मामले में कमी और सरकारी और सामाजिक मामलों से जुड़े मामलों में व्यय का प्रबंधन करता है।",
                english:
                    "Manages the expenditure with deficient in the means ofhappiness, separation in the house ofmother, some weakness in the house of father and in big business occupation, deficiency in the case of honour and in connection with government and society affairs",
            },
            5: {
                hindi: "विद्या भाव में कमी, संतान के सम्बन्ध में कष्ट, मानसिक चिंता, लाभ में कुछ कमी, अभिमानी, अपने विचारों को ठीक से समझा न पाने वाला, चतुर",
                english:
                    "Is deficient in the house of education, feels troubles in respect of children, is mentally worried, some weakness in profits, is haughty, is unable to make his ideas properly understandable, and is clever",
            },
            6: {
                hindi: "कुछ आश्रित क्रियाओं द्वारा अपने व्यय का उचित प्रबंधन करता है, चाहकर भी अपने व्यय पर नियंत्रण नहीं रख पाता, बीमारी के कारण व्यय करना पड़ता है।",
                english:
                    "Manages his expenditure properly through some dependent actions, unable to check his expenditure even when he wishes to do so, has to spend in the matter of illness",
            },
            7: {
                hindi: "दैनिक व्यवसाय से अपना व्यय चलाता है, व्यवसाय के घर में कुछ दुर्बलता पाता है, परिवार में कुछ विलम्ब व अशांति पाता है, व्यय के कारण सुख, बेचैनी, क्षीण शरीर वाला होता है।",
                english:
                    "Manages his expenditure from the daily occupation, gets some weakness in the house ofoccupation, gets some delay and restlessness in the family, happiness, restlessness due to expenditure, is of emaciated figure",
            },
            8: {
                hindi: "अधिक व्यय, संचित धन के प्रयास में कुछ कमजोरी, कुटुम्ब के घर में कुछ कमजोरी, विदेश के संयोग आदि मिलते हैं।",
                english:
                    "Spends much, gets some weakness in the pursuits of accumulated wealth, gets some weakness in the house of family, gets the conjunction of foreign countries, etc",
            },
            9: {
                hindi: "भाग्य में कमजोरी मिलती है, भाग्य को लेकर चिंतित रहते हैं, भगवान की भक्ति में कुछ कमी आती है, भाइयों के घर में कुछ हानि होती है",
                english:
                    "Gets weakness in destiny, feels anxious about the fate, gets some deficiency in the devotion to God, gets some loss in the house of brothers",
            },
            10: {
                hindi: "पिता के घर में कुछ हानि, आय और व्यापार के घर से शानदार खर्च, माता के घर में कुछ हानि, व्यापार के घर में सम्मान, प्रतिष्ठा में कुछ कमी",
                english:
                    "Some losses in the house offather, spends from the house ofincome and business magnificently, some loss in the house ofmother, some deficiency in the rise of respect, honour in the house of business",
            },
            11: {
                hindi: "अपनी आय से खर्च करता है, अन्य भावों से लाभ प्राप्त करता है, संतान पक्ष से कुछ हानि, शिक्षा में कुछ कमी, वाणी में कुछ कटुता एवं रूखापन",
                english:
                    "Spends due to his income, gets gains from the other houses, some losses on the side of children, some deficiency in education, some bitterness and roughness in speech",
            },
            12: {
                hindi: "बहुत खर्च करता है, शत्रुओं पर प्रभाव रखता है, विवाद और बीमारी के मामलों में खर्च करता है, व्यय भाव में प्रभाव की महान शक्ति प्राप्त करता है",
                english:
                    "Spends much, keeps influence on enemies, spends in matters of dispute and illness, gets the great power of influence in the house of expenditure",
            },
        },
        Moon: {
            1: {
                hindi: "शारीरिक और मानसिक सुख से लाभ प्राप्त करता है, सुन्दर होता है, शांत स्वभाव का होता है, सुन्दर पत्नी प्राप्त करता है, व्यवसाय में अत्यधिक लाभ प्राप्त करता है, सभी सुखों और भोगों को प्राप्त करता है, बहुत सम्मानित होता है, प्रसन्न स्वभाव का होता है, पत्नी के घर में रुचि रखता है, ससुर के घर से लाभ प्राप्त करता है, आय और दैनिक व्यवसाय के प्रति बहुत सावधान रहता है, विशेष यौन सुखों की इच्छा रखता है।",
                english:
                    "Gets gains with physical and mental happiness, is handsome, is of calm nature, gets a beautiful wife, gains heavily in the occupation, gets all pleasures and enjoyments, is much respected, is ofdelightful nature, is interested in the house ofwife, gains from the house of father-in-law, is very careful about income and daily occupation, wants special sexual pleasures",
            },
            2: {
                hindi: "बहुत धन कमाता है और उसे संचित करता है, बड़ा परिवार रखता है, जीवन काल में लाभ की अपार खुशी महसूस करता है, दीर्घायु होता है, गहन राजनीति में व्यस्त रहता है, सम्मानीय होता है।",
                english:
                    "Earns huge wealth and accumulates it, has a big family, feels great happiness of gains during the period oflife, lives long, remains busy in deep politics, is respectable",
            },
            3: {
                hindi: "मस्तिष्क के कठिन परिश्रम से साधारण लाभ प्राप्त करता है, परिश्रम के कारण भाग्यशाली माना जाता है, ईश्वर और धर्म में विश्वास रखता है, भाइयों की ओर से कष्ट होता है।",
                english:
                    "Gets ordinary gains through hard labour of brain, is thought to be fortunate due to laborious working, has faith in God and Dharma, distress in the side ofbrothers",
            },
            4: {
                hindi: "सुखपूर्वक बड़ी आय प्राप्त होती है, भूमि और भवन का लाभ मिलता है, माता-पिता का सुख मिलता है, व्यवसाय में लाभ होता है, सरकार और समाज से लाभ होता है, मानसिक रूप से प्रसन्न रहता है, सुंदर वस्तुएं, वस्त्र और आभूषण प्राप्त होते हैं, माता के घर से सुख मिलता है।",
                english:
                    "Gets huge income comfortably, gets the gains oflands and buildings, gets the pleasure of parents, gains in business of occupation, gains from government and society, is mentally delighted, gets beautiful things, clothes and ornaments, gets happiness from the house of mother",
            },
            5: {
                hindi: "अपनी बुद्धि के कारण लाभ पाता है, संतान प्राप्त करता है, शिक्षा प्राप्त करता है, बुद्धि में मानसिक विचारों की प्रधानता प्राप्त करता है, बौद्धिक शक्ति और बुद्धि से लाभ प्राप्त करता है और बहुत समझदार होता है।",
                english:
                    "Gains due to his wisdom, gets children, gets education, gets the supremacy ofmental ideas in intellect, gains from intellectual power and wisdom and is very sensible",
            },
            6: {
                hindi: "लाभ के सम्बन्ध में कुछ कमजोरी, मानसिक चिंताएं, अधिक व्यय, आय या लाभ के लिए किसी प्रकार पर निर्भर, नाना से थोड़ा धन प्राप्त, मन कुछ व्यस्त, मिलनसार स्वभाव",
                english:
                    "Some weakness in connection with gains, gets mental anxieties, spends much, gets some sort of dependence for income or gains, gets a little from maternal grandfather, finds his mind somewhat occupied, and is of amiable disposition",
            },
            7: {
                hindi: "दैनिक कार्य में प्रचुर लाभ, सुन्दर पत्नी, उत्तम यौन सुखों का आनंद, कुटुम्ब में सम्बन्धी की उपस्थिति में ही सहवास, सुन्दर, ससुर के घर से लाभ, सभी सांसारिक कार्यों में सफलता, चतुरता।",
                english:
                    "Gains heavily in the daily occupation, gets a beautiful wife, enjoys sexual pleasures splendidly, is mutually engaged only in the presence ofthe relation of the family, is handsome, gains from father-in-law's house, gets success in every worldly affairs, and is clever",
            },
            8: {
                hindi: "कठोर केन्द्रों से सम्बन्ध के कारण लाभ की चिंता रहती है, धन प्राप्ति के लिए प्रयत्नशील रहता है, मानसिक कष्ट सहता है, धन, परिवार और भाग्य में वृद्धि चाहता है।",
                english:
                    "Is worried ofgains due to relation with tough centres, efforts to get wealth, bears mental distress, always likes the increase in wealth, family and destiny",
            },
            9: {
                hindi: "बहुत भाग्यशाली और भाग्य की शक्ति से प्रचुर लाभ प्राप्त करने वाला, ईश्वर और धर्म में विशेष आस्था रखने वाला, यश पाने वाला, भाई पक्ष में कमी वाला, दूरदर्शी और सत्य को स्वीकार करने वाला, प्रभावशाली, चौबीस वर्ष की आयु के बाद लाभ में बहुत वृद्धि पाने वाला।",
                english:
                    "Very fortunate and gains heavily due to power ofdestiny, has special faith in God and Dharma, gets fame, deficiency in the side of brother, is farsighted and accepts truths, is influential, secures much increment in gains after the age of twenty-four",
            },
            10: {
                hindi: "व्यापार से प्रचुर लाभ, पिता के घर, सरकार और समाज से प्रचुर लाभ, शान-शौकत से जीवन यापन, महंगी वस्तुएं प्राप्त, सुख-सुविधाओं का आनंद, माता के घर, भूमि और भवन से लाभ, पारिवारिक सुखों की प्राप्ति",
                english:
                    "Gains majestically from the business, gains heavily from the house of father, government and society, lives with great pomp and show, gets costly things, enjoys the pleasures, gains from the house of mother, land and buildings, gets family enjoyments",
            },
            11: {
                hindi: "अनायास और बिना प्रयास के अच्छे लाभ मिलते हैं, संतान से संबंधित कुछ सुख मिलते हैं, शिक्षा और बुद्धि की शक्ति मिलती है",
                english:
                    "Gets decent gains spontaneously and without making efforts, gets some happiness regarding children, gets the power of education and wisdom",
            },
            12: {
                hindi: "अधिक व्यय करने वाला, चंचल एवं अशांत मन वाला, दूर की बातों के बारे में सोचने वाला, लाभ कमाने, बीमारी या विवाद से संबंधित मामलों में पूरी आय खर्च करने वाला, शत्रुओं के पक्ष में अपना काम निकालने के लिए ठंडे दिमाग से सोचने वाला, आय प्राप्ति में कुछ कमजोरी वाला, नीरस होता है।",
                english:
                    "Spends much, is of fickle and restless mind, thinks ofremote things, spends the whole income on things ofsecuring gains, matters relating to illness or disputes, thinks with a cool mind in the side ofenemies to get his work done, some weakness in gaining income, and is insipid",
            },
        },
        Mars: {
            1: {
                hindi: "दीर्घायु, शरीर में कष्ट, बहुत बलवान, माता के घर में कुछ हानि, पत्नी पक्ष में कष्ट, भाई-बहनों की ओर से कुछ कार्यकुशलता एवं सहयोग मिलता है।",
                english:
                    "Gets a long life, feels some distress the body, is very powerful, some loss in the house ofmother, feels some distress in the side ofwife, gets some efficiency and cooperation on the side of brothers and sisters",
            },
            2: {
                hindi: "धन-संपत्ति में लोटता हुआ जीवन व्यतीत करता है, दीर्घायु होता है, भाई की ओर से कुछ कमी अनुभव करता है, धन संचय में कुछ हानि होती है, परिवार में कुछ हानि होती है, तथा बहुत बातूनी होता है।",
                english:
                    "Spends his life rolling in wealth, gets a long life, feels some deficiency on the side ofbrother, some loss in accumulating wealth, some loss in family, and is very talkative",
            },
            3: {
                hindi: "कठोर परिश्रम करता है, पिता के पक्ष को हानि पहुँचाता है, शत्रु पक्ष पर प्रभाव बनाए रखने के कर्तव्य में कुछ कमजोरी पाता है",
                english:
                    "Labours hard, injures the side of father, gets some weakness in the duty of keeping influence on the side of enemies",
            },
            4: {
                hindi: "दीर्घायु, जीवन के सम्पूर्ण काल का आनंद, माता के घर में कुछ हानि, धन-लाभ, पत्नी के घर को कुछ हानि, आय के घर में कुछ कमी, पिता के घर में कमी",
                english:
                    "Has a long life, enjoys the whole period of life, some loss in the house ofmother, gets wealth and gains, injures the house ofwife a little, some deficiency in the house of income, deficiency in the house of father",
            },
            5: {
                hindi: "वह अपना जीवन वैभव के साथ व्यतीत करता है, प्रसिद्धि प्राप्त करता है, सम्मानीय और प्रभावशाली होता है, कूटनीति का बुद्धिमानी से प्रयोग करता है, अधिक खर्च करता है, भाषण कला में निपुण होता है, बच्चों की ओर से सुख और दुःख का प्रबल मिश्रण अनुभव करता है, अभिमानी होता है।",
                english:
                    "Spends his life with grandeur, gets fame, is honourable and influential, uses diplomacy with wisdom, spends much, has an art in speech, experiences some strong mixture ofhappiness and unhappiness on the side ofchildren, is haughty",
            },
            6: {
                hindi: "नाना की ओर से कुछ हानि, भाई की ओर से कुछ शत्रुता या वियोग, शत्रुओं और विरोधियों को बेचैन करना, एक प्रकार के बंधन में रहना।",
                english:
                    "Some losses on the side of his maternal grandfather, gets some enmity or separation on the side ofbrother, makes the enemies and opponents uneasy, lives in a sort ofbondage",
            },
            7: {
                hindi: "पत्नी के घर में कष्ट, उद्योग में सफलता, व्यवसाय के पक्ष में चिंता, व्यवसाय में लाभ की स्थिति में वृद्धि के लिए गुप्त नीतियाँ बनाना, पिता के घर में कुछ कष्ट और कष्ट, भाई-बहनों के घर में कुछ कमी।",
                english:
                    "Bears distress in the house ofwife, gets success in industry, worries on the side of occupation, plans secret policies for increase in the case ofgains ofoccupation, some trouble and distress in the house of father, gets some deficiency in the house ofbrothers and sisters",
            },
            8: {
                hindi: "दीर्घायु, लाभ पक्ष में कुछ कमी, भाई पक्ष में कुछ हानि, धन-संपत्ति के प्रबंधन और परिश्रम में कुछ कमी।",
                english:
                    "Has a long life, some deficiency in the side ofgains, some loss in the side of brother, gets some deficiency in handling wealth and hard labour",
            },
            9: {
                hindi: "दीर्घायु, अधिक व्यय, माता के घर में कुछ हानि, सुख के घर में कुछ कमी, धर्म और भाग्य के घर में कुछ कमजोरी, ईश्वर में कम विश्वास",
                english:
                    "Has a long life, spends much, some loss in the house ofmother, some deficiency in the house ofhappiness and some weakness in the house ofDharma and destiny, less faith in God",
            },
            10: {
                hindi: "पिता के घर में क्लेश, उनकी सामाजिक और व्यावसायिक उन्नति में कुछ सुख-दुख, संतान पक्ष में कुछ विशेष शक्ति, कर्कश वचन, माता के घर में कुछ कमी और सुख",
                english:
                    "Troubles in the house offather, some pleasures and sufferings in his social and professional progress, some special power on the side of children, speaks roughly, some deficiency in the house of mother and happiness",
            },
            11: {
                hindi: "आय और लाभ के घर में कुछ कमी महसूस होती है, भाई के घर में कुछ कमी महसूस होती है, शिक्षा बुद्धि और संतान के पक्ष में प्रगति होती है, धन संचय में कुछ कमी होती है",
                english:
                    "Some deficiency in the house of income and gains, feels some deficiency in the house ofbrother, progress in the side ofeducation intelligence and children, some loss in the accumulation ofwealth",
            },
            12: {
                hindi: "शत्रु पक्ष और नाना पक्ष से कुछ हानि होती है, भाई और पत्नी से कुछ हानि होती है, दैनिक व्यवसाय से कुछ हानि होती है",
                english:
                    "Gets some loss in the side ofenemies and maternal grandfather, gets some loss ofbrother and wife, loss on the side ofdaily occupation",
            },
        },
        Mercury: {
            1: {
                hindi: "लंबा और सुडौल स्वभाव वाला, राजसी वैभव का आनंद लेने वाला, बहुत प्रभावशाली, पिता के घर से उन्नति पाने वाला, व्यापार करने वाला, पत्नी पक्ष में कुछ कमी वाला, यौन सुखों में कुछ कमी वाला, बहुत चतुर, बुद्धिमान और कुशल, महान राजनीतिज्ञ, परिश्रमी और अच्छे आचरण वाला होता है।",
                english:
                    "Is tall and of symmetrical nature, enjoys the royal grandeur, is very influential, progress from the house of father, conducts business, some deficiency in the side ofwife, gets some deficiency on the side ofsexual pleasures, is very clever, wise and skilful, is a great politician, is diligent and has good manners",
            },
            2: {
                hindi: "अपार धन कमाता है, व्यापार से उन्नति करता है, परिवार की उन्नति और धन का योग बनाता है, बहुत धनवान होता है, दीर्घायु होता है",
                english:
                    "Earns huge wealth, progresses through business, links the progress of family and wealth, is very rich, has a long life",
            },
            3: {
                hindi: "सुन्दर एवं ऊर्जावान होता है, भाई-बहनों का बल पाता है, अपनी कार्यकुशलता के कारण सफलता पाता है, शालीनता से रहता है, आत्म-गौरववान होता है, ईश्वर में विश्वास रखता है",
                english:
                    "Is handsome and energetic, gets the power of brothers and sisters, success due to his efficiency, lives with decency, has self-pride, and is a believer in God",
            },
            4: {
                hindi: "सुखपूर्वक रहता है, अपना मकान रखता है, सुन्दर ढंग से सजाए गए मकान में रहता है, माता-पिता का सुख पाता है, सुख-शांति से अच्छा व्यापार करता है, मान-सम्मान पाता है, बहुत ही चतुर कार्यकर्ता होता है, सरकार और समाज से मान-सम्मान और सुख पाता है, प्रसन्नचित्त होता है।",
                english:
                    "Lives happily, possesses his own house, lives in a beautifully decorated house, gets the happiness ofparents, does good business with peace and happiness, gets respect and honour, is a very clever worker, gets honour and happiness from government and society, is a jolly fellow",
            },
            5: {
                hindi: "बहुत बुद्धिमान और उच्च शिक्षित है, बच्चों की शक्ति प्राप्त करता है, आत्म-गौरव रखता है और कर्तव्य जानता है, सुंदर और सजा हुआ जीवन जीता है, आत्म-जागरूक है, सरकार और समाज के कानूनों को समझता है",
                english:
                    "Is very intelligent and highly educated gets the power of children, has self-pride and knows what is duty, lives in a beautiful and decorated manner, is self-conscious, understands the laws of government and society",
            },
            6: {
                hindi: "आश्रित जीवन व्यतीत करता है, पिता के घर में कुछ शत्रुता रहती है, रोग आदि की उलझनों से ग्रस्त होकर उन्नति में बाधा आती है, शत्रुओं की ओर से कष्ट की प्रबलता रहती है, अधिक व्यय होता है, कुछ पापों से ग्रस्त होता है तथा लिंग-दोष से ग्रस्त होता है।",
                english:
                    "Lives dependently, some enmity in the house of father and gets some hindrances in his progress being overtaken by the perplexities of illness etc, power of discomfort from the side of enemies, spends much, has to suffer from some sins and is gende",
            },
            7: {
                hindi: "परिवार में कुछ चिंताएं होती हैं, पिता और पत्नी के घर में कुछ कमी होती है, शरीर में कुछ कमजोरी होती है, सम्मान की रक्षा करने में सक्षम नहीं होता है, यौन सुख से संबंधित मामलों में उसके प्रभाव में कुछ कमी होती है, व्यवसाय के पक्ष में बहुत मेहनती होता है, चिंताओं में घिरा रहता है।",
                english:
                    "Gets some worries in the family, some deficiency in the house of father and wife, gets some weakness in the body, is able to safeguard the honour, some deficiency in his influence in matters relating to sexual pleasures, is very industrious on the side of occupation, is engulfed in worries",
            },
            8: {
                hindi: "शरीर और पिता के सुख में कुछ हानि या कष्ट, उन्नति के सम्बन्ध में मन में दुःख और दुर्बलता, विदेश में निवास, धन वृद्धि की योजनाओं में संलग्न, व्यापार में कष्ट।",
                english:
                    "Some loss or distress in the happiness in his body and father, feels unhappy and weak in his heart in connection with progress, lives in foreign countries, engaged in the schemes ofincreasing wealth, bears troubles in business",
            },
            9: {
                hindi: "बहुत भाग्यशाली होता है, पिता के घर से सहायता और सम्मान प्राप्त होता है, सरकार और समाज में सम्मान प्राप्त होता है, सुंदर और आकर्षक शरीर वाला होता है, भाई-बहनों से युक्त होता है, व्यापार में सफलता प्राप्त करता है, ईश्वर में विश्वास रखता है, दैवीय सहायता प्राप्त करता है",
                english:
                    "Is very fortunate, help and honour from the house of father, gets honour in government and society, is of handsome and attractive body, has brothers and sisters, gets success in business, has faith in God, gets divine help",
            },
            10: {
                hindi: "सुन्दर शरीर, अपना व्यवसाय करता है, पिता के राज्य और घर से सुख और उन्नति पाता है, माता, भवन और संपत्ति का सुख भोगता है, अच्छा प्रबंधक होता है।",
                english:
                    "Handsome body, does his business, gets pleasure and progress from the government and house offather, enjoys the happiness ofmother, buildings and property, is a good manager",
            },
            11: {
                hindi: "बहुत धन कमाता है, पिता के घर से बहुत लाभ प्राप्त करता है, व्यापार से बहुत लाभ प्राप्त करता है, सरकार से संबंधित लाभ प्राप्त करता है, सुंदर वस्त्र और आभूषण पहनता है, चतुराई से कुशल कार्य करता है, बहुत शिक्षा प्राप्त करता है, संतान का सुख प्राप्त करता है।",
                english:
                    "Earns much wealth, gets huge gains from the house offather, gains much from business, gains connected with government, wears beautiful clothes and ornaments, does skiliiil deeds cleverly, acquires much education, gets the pleasures of children",
            },
            12: {
                hindi: "अधिक व्यय करने वाला, परदेश में रहने वाला, पिता के घर में कुछ दुर्बलता, शत्रुओं के पक्ष में कुछ साहस पाने वाला, विवेक के बल पर व्यय करने वाला।",
                english:
                    "Spends much, lives in foreign countries, some weakness in the house of father, gets some courage on the side of enemies, makes the expenditure through the power of discretion",
            },
        },
        Jupiter: {
            1: {
                hindi: "पारिवारिक सुख मिलता है, बहुत ही चतुर पत्नी मिलती है, सुखदायी व्यवसाय मिलता है, सौभाग्यशाली माना जाता है, धर्म और पारिवारिक मामलों में सावधान रहता है, संतान पक्ष में कुछ कमी महसूस होती है, बुद्धि और शिक्षा में कुछ कमजोरी होती है, पत्नी के कारण परिवार के कारण बौद्धिक चिंता होती है, स्थूल शरीर वाला होता है, संपत्ति का स्वामी होता है, बहुत ही चतुर और सुखी होता है।",
                english:
                    "Gets domestic happiness, gets a very clever wife, gets the pleasant occupation, is thought to be fortunate, is careful about Dharma and also in family affairs, feels some deficiency in the side of children, some weakness in wisdom and education, intellectual worries due to the reasons offamily regarding wife, is of fat body, is the owner of property, is very clever and happy",
            },
            2: {
                hindi: "मान-सम्मान और धन-बल की प्राप्ति होती है, संपत्ति का सुख मिलता है, माता-पत्नी के घर के सुखों में कुछ बंधन होता है, दैनिक व्यवसाय से धन मिलता है, पिता के घर से सहयोग मिलता है, सरकार और समाज में मान-सम्मान और सुख मिलता है, जीवन में कुछ सुख मिलता है, दीर्घायु होती है, शत्रुओं के घर में प्रभाव होता है, नाना के परिवार की ओर से सुख मिलता है।",
                english:
                    "Gets honour and power of wealth, gets the pleasure of property, some bondage in the pleasures in the house ofmother and wife, gets wealth from the daily occupation, gets the help from the house of father, gets honour and happiness in government and society, some happiness in life, has a long life, has influence in the house of enemies, happiness in the side of maternal grandfather's family",
            },
            3: {
                hindi: "अनेक सुखदायी कार्यों से प्रचुर लाभ प्राप्त करता है, सुन्दर एवं प्रभावशाली पत्नी प्राप्त करता है, उत्तम कद का होता है, पर्याप्त यौन सुख प्राप्त करता है, परिवार का पालन-पोषण अच्छी तरह करता है, धर्म में आस्था रखता है, भाई-बहनों से युक्त होता है, मायके से शक्ति प्राप्त करता है, कठोर परिश्रम करता है, ससुर के घर से कुछ शक्ति प्राप्त करता है, विवाह के बाद उन्नति करता है, सोलह वर्ष की आयु के बाद इन सब बातों में उन्नति प्राप्त करता है, तथा सौभाग्यशाली होता है।",
                english:
                    "Gains heavily by undertaking many pleasant occupations, gets a beautiful and influential wife, is of good stature, gets sufficient sexual pleasures, brings up the family well, has faith in Dharma, has brothers and sisters, gets the power from the house of mother, labours hard, gets some power from the father-in-law's house, rises after the marriage, gets the development of all these things after the age of sixteen, and is fortunate",
            },
            4: {
                hindi: "माता-पत्नी के घर से सुख मिलता है, संपत्ति मिलती है, व्यवसाय से सुख मिलता है, अधिक खर्च करता है, व्यवसाय को सुखपूर्वक करता है, पिता के घर से सुख मिलता है, परिवार के सुखों का आनंद लेता है।",
                english:
                    "Gets the happiness from the house ofmother and wife, gets property, gets the happiness from the occupation, spends much, does the occupation with happiness, happiness from the house of father, enjoys the pleasures of the family",
            },
            5: {
                hindi: "परिवार के सुखों के सम्बन्ध में दुःखी रहता है, सभी ओर से (माता, पत्नी, बच्चों से) दुर्बलता और कमी रहती है, दैनिक कार्य में कुछ चिन्ता रहती है, विद्या और बुद्धि में कुछ दुर्बलता आती है, बोलते समय थोड़ा झिझक होती है, सुख-शान्ति में कुछ बाधा आती है, यौन सुखों के विषय में अनुचित विचार आते हैं और व्यथित रहता है।",
                english:
                    "Feels unhappy in connection with the pleasures of the family, gets weakness and deficiency on all the side (from mother, wife, children), gets some worries in the daily occupation, gets some weakness in education and wisdom, hesitates a little while speaking, some hindrance in happiness and peace, has improper ideas about sexual pleasures and is distressed",
            },
            6: {
                hindi: "कुटुम्ब के सुख में बाधा, माता-पत्नी की ओर से कष्ट, सुख-शांति में कमी, दैनिक कार्य में बाधा, कुटुम्ब से कष्ट, अधिक व्यय, शत्रुओं की ओर से विनम्रता से कार्य कराना, यौन-संबंधों में बाधा, निवास-स्थान में कमी, बड़े व्यापारिक प्रतिष्ठानों से सहायता प्राप्त होना।",
                english:
                    "Gets hindrance in the pleasure ofthe family, bears some distress on the side ofmother and wife, gets deficiency in peace and happiness, hindrance in daily occupation, has family, spends much, gets work done with some politeness on the side of enemies, gets some hindrance in sexual affairs, some deficiency in residential places, and gets some help from the big business concerns",
            },
            7: {
                hindi: "महान सुखों की प्राप्ति होती है, बहुत प्रतिष्ठित व्यवसाय करता है, दैनिक व्यवसाय कर्मों से सम्मान और खुशी प्राप्त होती है, विवाह के बाद सुखों में वृद्धि होती है, वैवाहिक जीवन में शांति का अनुभव होता है, भाई-बहन होते हैं, अच्छे बल के कारण सफलता मिलती है",
                english:
                    "Gets great pleasures does very dignified occupation gets honour, , and happiness by the daily occupation deeds pleasures increase, after marriage, experiences peace in married life, has brothers and sisters, success due to good strength",
            },
            8: {
                hindi: "पारिवारिक जीवन में बहुत कष्ट, माता के घर में कुछ कमी, पत्नी की ओर से कष्ट और वियोग, दैनिक कार्य में सफलता, बड़ी बाधाओं का सामना, अधिक व्यय, धन संचय के लिए प्रयास।",
                english:
                    "Much suffering in the family life, some deficiency in the house of mother, bears distress and separation on the side ofwife, gets success on the side of daily occupation bearing great hindrances spends, much, makes efforts to hoard wealth",
            },
            9: {
                hindi: "भाग्यवान, ईश्वर का ध्यान करने वाला, भाग्यबल से परिवार का सुख प्राप्त करने वाला, भवन और संपत्ति प्राप्त करने वाला, भाई-बहनों से युक्त, संतान को कष्ट, विद्या और बुद्धि में कुछ दुर्बलता, दोषपूर्ण और कमजोर वचन बोलने वाला, शांत और दूरदर्शी होता है।",
                english:
                    "Fortunate, pays some attention to God, gets the pleasures of the family with the power of destiny, gets some buildings and property, has brothers and sisters, some distress ofchildren, gets some weakness in education and intellect, utters some faulty and weak words, is peaceful and farsighted",
            },
            10: {
                hindi: "प्रतिष्ठित, परिश्रमी, राजसी भोग-विलास प्राप्त करने वाला, बड़ा व्यापार करने वाला, अपार धन कमाने वाला, भू-सम्पत्ति वाला, माता-पिता का सुख पाने वाला, सरकार व समाज में सम्मान पाने वाला, पत्नी के घर में सुख, व्यवसाय से सम्मान पाने वाला होता है।",
                english:
                    "Is dignified, industrious and gets the royal sexual pleasures, does a big business, earns huge wealth, has landed property, gets the pleasure ofparents, gets respect in government and society, happiness in the house of wife, gets respect from occupation",
            },
            11: {
                hindi: "दैनिक कार्य से भारी लाभ, अत्यंत सुंदर पत्नी का सुख, उत्तम यौन सुख, माता, भूमि और भवन का भरपूर लाभ, भाई-बहनों का सुख, संतान पक्ष में कुछ कमी, बुद्धि और शिक्षा में कुछ कमजोरी।",
                english:
                    "Gets heavy gains from daily occupation, gets the pleasure ofhaving an extraordinarily beautiful wife, gets very decent sexual pleasure, gets heavy gains ofmother, land and buildings, enjoys the happiness ofbrothers and sisters, feels some deficiency in the side ofchildren, some weakness in the side of intellect and education",
            },
            12: {
                hindi: "अधिक व्यय, पत्नी का नाश, दैनिक कार्य में चिंता, माता के घर में कुछ कमजोरी, दीर्घायु का सुख, संपत्ति की हानि।",
                english:
                    "Spends much, gets the loss of wife, gets worries in the daily occupation, gets some weakness in the house ofmother, gets the happiness ofa long age, gets some loss ofproperty",
            },
        },
        Venus: {
            1: {
                hindi: "शरीर में कुछ कमजोरी, धन में कुछ कमी, सौभाग्यशाली पत्नी, बड़ा दैनिक व्यवसाय, यौन सुखों का अधिक आनंद, विवाह के बाद व्यवसाय में उन्नति",
                english:
                    "Some weakness in body, gets some deficiency in wealth, gets a fortunate wife, pursues a big daily occupation, gets excess in enjoying the sexual pleasures, progress in occupation after marriage",
            },
            2: {
                hindi: "बहुत अमीर है, बहुत भाग्यशाली और सम्मानित है, उसका एक परिवार है, वह अपना जीवन कुलीन तरीके से बिताता है",
                english:
                    "Is very rich, is very fortunate and respectable, has a family, spends his life in an aristocratic way",
            },
            3: {
                hindi: "भाग्य की शक्ति से धन में वृद्धि होती है, बहुत प्रसिद्धि मिलती है, बहुत धार्मिक होता है, भाई-बहन होते हैं, सम्माननीय और प्रभावशाली होता है",
                english:
                    "Gets increase in wealth due to the power of destiny, gets much fame, is very religious, has brothers and sisters, honourable and influential",
            },
            4: {
                hindi: "धन संचय करने वाला, बहुत भाग्यशाली और परिश्रमी, भूमि और भवन वाला, माता-पिता से लाभ पाने वाला",
                english:
                    "Hoards wealth, is very fortunate and industrious, has land and buildings, gets the gain of parents",
            },
            5: {
                hindi: "बहुत चतुर और भाग्यशाली होता है, धर्म का उचित पालन करता है और धार्मिक विषयों पर अच्छा वक्ता होता है, बहुत धन कमाता है, बहुत विद्वान कलाकार होता है, ज्योतिष का कुशल प्रेमी और राजनीतिज्ञ होता है, संतान से विशेष बल प्राप्त करता है, पारिवारिक सुखों का आनंद लेता है, सम्माननीय होता है।",
                english:
                    "Is very clever and fortunate, undertakes the Dharma properly and is a good speaker on religious subjects, earns huge wealth, is a very learned artist, skilful lover ofastrology and a politician, gets special power of children, enjoys the family pleasures, is respectable",
            },
            6: {
                hindi: "सफल राजनीतिज्ञ, धन कमाने वाला, धर्म की हानि करने वाला, धर्म के बल पर शत्रुओं पर विजय पाने वाला, भाग्य के सम्बन्ध में कुछ चिंताएं रखने वाला।",
                english:
                    "Is a successful politician, earns wealth, injures Dharma, wins the enemies with the power ofDharma, some worries in connection with destiny",
            },
            7: {
                hindi: "बहुत भाग्यशाली होता है, बहुत उच्च स्तर का यौन सुख भोगने की शक्ति प्राप्त करता है, बहुत धन कमाता है, बड़ा दैनिक व्यवसाय करता है, सुंदर पत्नी होती है, धनी ससुर होता है",
                english:
                    "Is quite fortunate, gets the power of enjoying sexual pleasure of very high standard, earns huge wealth, conducts a big daily occupation, has a beautiful wife, gets a rich father-in-law",
            },
            8: {
                hindi: "परिवार और भाग्य में कमजोरी, धर्म में कुछ कमजोरी, विदेश में सफलता मिलती है",
                english:
                    "Gets weakness in family and destiny, some weakness in religion, gets success in foreign countries",
            },
            9: {
                hindi: "बहुत भाग्यशाली, धार्मिक, धनवान, पारिवारिक सुख भोगने वाला, यश पाने वाला, भाई-बहनों और परिवार का सुख भोगने वाला, ईश्वर में विश्वास रखने वाला होता है।",
                english:
                    "Is very fortunate, religious, gets wealth, enjoys family pleasures, gets fame, enjoys the pleasures of brothers and sisters and the family, believes in God",
            },
            10: {
                hindi: "बहुत सम्मान पाता है, बहुत भाग्यशाली माना जाता है, पिता के घर से सफलता मिलती है, बड़े व्यवसाय से चतुराई से धन कमाता है",
                english:
                    "Gets great respect, thought to be very fortunate, success from the house of father, earns wealth through cleverness from big business",
            },
            11: {
                hindi: "बहुत धन कमाता है, चतुर और बुद्धिमान होता है, धर्म का पालन करता है, संतान का सुख भोगता है, पारिवारिक लाभ, वस्त्र, आभूषण और अन्य सुंदर वस्तुएं प्राप्त करता है, आकस्मिक धन से भी सफलता प्राप्त करता है।",
                english:
                    "Earns huge wealth, is clever and intelligent, rears Dharma, enjoys the pleasure of children, gets the family gains, clothes, ornaments and other beautiful things, gets success from windfalls also",
            },
            12: {
                hindi: "अधिक व्यय, कुछ दुर्बलता, धन संचय न कर पाना, पारिवारिक हानि, शत्रुओं को कुछ-कुछ मित्र बनाना, धर्म की कुछ हानि।",
                english:
                    "Spends much, some weakness, is unable to accumulate money, gets family losses, makes the enemies somewhat friends, some loss of Dharma",
            },
        },
        Saturn: {
            1: {
                hindi: "विजयी, गंभीर एवं गहन नीति वाला होता है, योग्य संतान एवं शिक्षा प्राप्त करता है, दैनिक कार्य में उन्नति करता है, संतान पक्ष में कुछ शत्रुता एवं कुछ अलगाव, शरीर में कुछ रोग",
                english:
                    "Is victorious, serious and is of deep intricate policies, gets able children and also the education, gets progress in connection with daily occupation, some enmity and some separation in the side of children, some illness in the body",
            },
            2: {
                hindi: "बहुत धन कमाता है और कुछ बड़े-बड़े काम करता है, माता के घर को कुछ नुकसान पहुंचाता है, उम्र के साथ कुछ लापरवाही होती है, संतान पक्ष से कुछ कठिनाइयों के साथ उन्नति मिलती है, कुछ बेचैनी होती है",
                english:
                    "Earns huge wealth and does some grand deeds, injures the house of mother a bit, some carelessness with age, gets progress with some difficulties on the side of children, somewhat restlessness",
            },
            3: {
                hindi: "बुद्धि द्वारा बहुत ऊर्जावान कार्य करता है, विशेष व्यय की योजनाओं में कुछ कड़वाहट लाता है, शत्रुओं पर विजय प्राप्त करता है, भाई के पक्ष में प्रभाव रखता है, झगड़ालू, बहुत साहसी और प्रभावशाली होता है",
                english:
                    "Does very energetic deeds through the wisdom, gets some bitterness in the plans of special expenditure, wins the enemies, keeps the influence on the side of brother, quarrelsome, is very courageous and influential",
            },
            4: {
                hindi: "अपने भवनों के कारण बड़ा प्रभाव रखता है, मान-सम्मान पाता है, माता-पिता के सुख में कमी और कष्ट पाता है, माता के घर में किसी अन्य स्त्राी का सहयोग भी प्राप्त करता है, सुख-शांति में कमी रहती है।",
                english:
                    "Has huge influence due to his buildings, gets honour, spends deficiency and distress in the happiness ofparents, gets the help of some other lady also in the house ofmother, deficiency in connection with peace and happiness",
            },
            5: {
                hindi: "कुशाग्र बुद्धि वाला, संतान की उन्नति में कुछ रुकावटों के साथ, धन और व्यवसाय के संबंध में अनेक नीतियां अपनाने वाला, शत्रुओं पर विजय पाने वाला, एक पत्नी से संतुष्ट न होने वाला, दैनिक व्यवसाय और पत्नी के पक्ष में कुछ कष्ट और कष्ट सहने वाला होता है।",
                english:
                    "Is of sharp intelligence, progress in children with some hindrance, uses many policies in connection with wealth and occupation, wins the enemies, is not satisfied with one wife, bears some distress and toil on the side of daily occupation and wife",
            },
            6: {
                hindi: "शत्रु पक्ष को परास्त करता है, झगड़े और रोग की परवाह नहीं करता, भाइयों से कटु विरोध रखता है, बेचैनी पाता है, व्यय से कुछ कष्ट होता है, संतान पक्ष से बहुत कष्ट होता है, शिक्षा में कुछ कमी होती है, टेढ़ी बातें करता है।",
                english:
                    "Defeats the side of enemies, does not care for quarrels and diseases, keeps bitter opposition with brothers, gets restlessness, some distress with expenditure, gets very much distresses on the side of children, some deficiency in educational ways, talks in a crooked way",
            },
            7: {
                hindi: "अनेक प्रकार से यौन सुख भोगता है तथा पत्नी और बच्चों से दुःख पाता है, सुख के लिए किसी अन्य स्त्री से माता के समान सहायता प्राप्त करता है, व्यवसाय में उन्नति करता है, आवश्यकता के अनुसार शिक्षा प्राप्त करता है तथा धर्म की आलोचना करता है।",
                english:
                    "Enjoys the sexual pleasures in many ways and distress on the side ofwife and children, gets the mother like help from some other lady in connection with happiness, progress in occupation, gathers much education he needs and criticises Dharma",
            },
            8: {
                hindi: "संतान पक्ष में बहुत कष्ट, अल्प शिक्षा, व्यापार में बहुत कुशल, बातूनी, तम्बाकू आदि का सेवन करने वाला, पेट की बीमारी और गुदा के रोग से ग्रस्त।",
                english:
                    "Great distress in the side of children, gets little education, is very skilful in business occupation, is talkative, takes tobacco etc, gets stomach troubles and the disease of anus",
            },
            9: {
                hindi: "बहुत बुद्धिमान और चतुर, बहुत प्रभावशाली और परिश्रमी, भारी लाभ पाने वाला, शुभ कार्यों और रोगों के मामलों में निपुण, अपनी बुद्धि बल से शत्रु को परास्त करने वाला, धर्म के घर में गहरी रुचि रखने वाला, भाइयों के पक्ष से कुछ शत्रुता रखने वाला, साहसी और अभिमानी",
                english:
                    "Very intelligent and clever, seems to be very influential and industrious, gets heavy gains, is an expert in quaifelsome affairs and matters of diseases, defeats the enemy by his intellectual power, deep interest in the house of Dharma, some enmity with the side of brothers, courageous and haughty",
            },
            10: {
                hindi: "अपनी योग्यता से प्रभाव बढ़ाता है, बुद्धिबल से सम्मान पाता है, संतान पक्ष से सम्मान कुछ कठिनाइयों के साथ पाता है, राजनीतिक मामलों में निपुण होता है, पिता के घर से कुछ कठिनाइयों के साथ उन्नति प्राप्त करता है, व्यापार में सफलता पाता है, व्यय से कुछ कटुता रखता है, बहुत कुशल होता है।",
                english:
                    "Increases his influence by his ability, gets honour through the intellectual power, gets respect on the side of children with some difficulties, has great skill in political affairs, secures progress from the house of father with some difficulties, gets success in business, some bitterness with expenditure, is very skilful",
            },
            11: {
                hindi: "बौद्धिक युक्तियों से बहुत कुछ प्राप्त करता है, सदैव बेचैन रहता है, बुद्धिमान एवं चतुर होता है, धन कमाने की कला जानता है, शत्रुओं पर प्रभाव रखता है।",
                english:
                    "Gains much through intellectual tactics, always feels restless, intellectual and clever, knows the art ofearning wealth, keeps influence on enemies",
            },
            12: {
                hindi: "व्यर्थ व्यय से चिन्तित, संतान पक्ष में हानि व कष्ट, बुद्धि व विद्या में न्यूनता, धन वृद्धि हेतु बड़ी-बड़ी योजनाएँ बनाना, सदैव चिन्तित रहना, कम बोलना",
                english:
                    "Worried due to tasteless expenditure, gets loss and distress in the side of children, deficiency in intellect and education, prepares a grand scheme for the increase of wealth, is always worried, speaks less",
            },
        },
        Rahu: {
            1: {
                hindi: "बहुत चालाकी और चतुराई से बात करता है, अपना प्रभाव बनाए रखता है, गुप्त शक्तियों के कारण बहुत सफलता प्राप्त करता है, शरीर में कुछ कष्ट सहता है, पत्नी और गुप्त विद्या का बहुत ध्यान रखता है, तथा कठोर परिश्रम करता है।",
                english:
                    "Talks very cunningly and cleverly, keeps his influence, gets much success due to occult power, bears some trouble in the body, keeps great care in the house of wife and occultism, and labours hard",
            },
            2: {
                hindi: "धन के मामले में कुछ कमजोरी, कुछ पारिवारिक परेशानियां, कर्ज लेकर कुछ समय तक अपना काम चलाना, धन के मामले में अचानक हानि",
                english:
                    "Some weakness in the side of wealth, gets some family troubles, manages his affairs for some time by taking loans, gets sudden loss in the matter of wealth",
            },
            3: {
                hindi: "बहुत परिश्रमी और पराक्रमी होता है, भाइयों की ओर से कुछ कष्ट पाता है, बहुत साहसी और स्वार्थी होता है।",
                english:
                    "Is very industrious and full ofvalour, gets some distress in the side of brothers, is very courageous and selfish",
            },
            4: {
                hindi: "सुख के घर में बड़ी बेचैनी होती है, माता के घर में कुछ हानि होती है, भूमि, भवन और निवास स्थान में कुछ कष्ट होता है, गुप्त शक्तियों का आनंद मिलता है।",
                english:
                    "Gets great restlessness in the house ofhappiness, some loss in the house of mother, feels some sufferings of land, building and the residential place, enjoys the occult power",
            },
            5: {
                hindi: "शिक्षा में कमजोरी, झूठ बोलना, भांग, तम्बाकू और अन्य उत्तेजक पदार्थों का सेवन करना, अत्यधिक क्रोध और अंतर्ज्ञान से काम करवाना, बच्चों को कुछ कष्ट देना",
                english:
                    "Weakness in education, talks falsehood, uses hemp, tobacco and other stimulants, gets the work done with great anger and intuition, some distress of children",
            },
            6: {
                hindi: "शत्रु को परास्त करता है, रोगों पर विजय प्राप्त करता है, अनुचित साधनों से लाभ प्राप्त करता है, कुछ आंतरिक कमजोरी महसूस करता है, स्वार्थी और चालाक होता है",
                english:
                    "Defeats the enemy, overcomes the diseases, gains through improper means, feels some internal weakness, selfish and clever",
            },
            7: {
                hindi: "पत्नी की ओर से कुछ कष्ट, परिवार के सम्बन्ध में चिन्तित, व्यवसाय में बड़ी परेशानियाँ और चिन्ताएँ झेलता, व्यवसाय को चलाने में चतुराई का प्रयोग करता, व्यवसाय में कभी-कभी बड़ी परेशानियाँ, व्यवसाय में छिपी हुई शक्ति का प्रयोग करता,",
                english:
                    "Some distress on the side of wife, is worried in connection with family, bears great troubles and worries in occupation, uses intricate cleverness in managing the occupation, sometimes great troubles in occupation uses hidden power in occupation,",
            },
            8: {
                hindi: "जीवन में बड़े कष्ट उठाता है और दुखी रहता है, वृद्धाश्रम में बड़ा क्लेश होता है, पेट और गुदा में रोग होते हैं।",
                english:
                    "Bears great troubles and feels unhappy during his life, great trouble in the house ofage, gets diseases in the stomach and in the anus",
            },
            9: {
                hindi: "भाग्य में कुछ कमजोरी, धर्म के घर में कुछ कम मिलता है लेकिन अंत में दृढ़ता मिलती है और झूठी बात को भी सच मानने में सक्षम हो जाता है",
                english:
                    "Some weakness in destiny, gets something less in the house ofDharma but in the end gets firmness and is able to evaluate even a false thing to be true",
            },
            10: {
                hindi: "व्यापार में प्रतिष्ठा प्राप्त करता है, चिंता करता है तथा गहरी युक्तियों से सरकार और समाज के मामलों में प्रभाव प्राप्त करता है।",
                english:
                    "Gets dignity in business, worries and gets influence in the matters of government and society through deep tactics",
            },
            11: {
                hindi: "लाभ मिलता है, लाभ भाव में कुछ चिंताएं होती हैं, वस्त्र-आभूषणों की कुछ कमी होती है, शरीर में कुछ कमी महसूस होती है।",
                english:
                    "Gets gains, some worries in the house of gains, gets some deficiency of clothes and ornaments, feels some deficiency in his body",
            },
            12: {
                hindi: "व्यय के सम्बन्ध में अत्यधिक कष्ट, चिन्ताओं का सामना, कभी-कभी व्यय भाव में घोर कठिनाइयों का सामना, तथा अन्त में व्यय के सम्बन्ध में दृढ़ता प्राप्त।",
                english:
                    "Great distress in connection with expenditure, faces worries, sometimes faces grave difficulties in the house ofexpenditure, and in the end achieves firmness in connection with expenditure",
            },
        },
        Ketu: {
            1: {
                hindi: "बहुत घमंडी, शरीर में कमजोरी, शरीर में विशेष प्रकार की कमजोरी, दिखावे में दृढ़ता, बहुत चतुर, सम्माननीय, जल्दबाजी में काम करने वाला",
                english:
                    "Is much self-conceited, gets weakness in the body, experiences some weakness ofa special kind in his body, keeps firmness in outward show, is very clever, respectable, works rashly",
            },
            2: {
                hindi: "धन संचय करने में असमर्थ, पारिवारिक क्लेश भी होता है, धन की बाह्य दृढ़ता की तुलना में आंतरिक दुर्बलता अनुभव करता है, बहुत प्रयत्न से धन में वृद्धि करता है।",
                english:
                    "Unable to hoard wealth, gets family distress also, feels internal weakness in comparison to outward firmness ofwealth, manages to increase wealth with great efforts",
            },
            3: {
                hindi: "परिश्रम करता है, भाई-बहनों के पक्ष में कुछ हानि उठाता है, वियोग सहता है, बड़े साहस से काम करता है, निडर होता है।",
                english:
                    "Works hard, gets some loss in the side ofbrothers and sisters and bears separation, works with great courage, is fearless",
            },
            4: {
                hindi: "भवन और संपत्ति है, कुछ सुख मिलता है, वास्तविक शांति में कुछ कमजोरी मिलती है, धैर्य से भरपूर",
                english:
                    "Has buildings and property, gets some pleasures, gets some weakness in real peace, full ofpatience",
            },
            5: {
                hindi: "शैक्षणिक जीवन में अनेक कष्ट पाता है, मन में कठोरता रहती है, घर में सन्तान को कुछ कष्ट रहता है, कुछ अभिमानी, बौद्धिक रूप से चिन्तित, कभी-कभी विनय का पालन न करने वाला, राजनीतिज्ञ होता है।",
                english:
                    "Gets many troubles during educational life, has harshness in mind, some distress in the house of children, is somewhat proud, is intellectually worried, sometimes does not obey modesty, and is a politician",
            },
            6: {
                hindi: "महान शक्ति और ऊर्जा वाला, स्वयं को निडर समझता है, शत्रुओं को परास्त करता है, गर्व से काम करता है, रोगों पर विजय प्राप्त करता है, न्याय या अन्याय की परवाह नहीं करता, स्वार्थी और प्रभावशाली",
                english:
                    "Has great power and energy, thinks himselfto be fearless, defeats the enemies, works with pride, overcomes the diseases, does not care for justice or injustice, selfish and influential",
            },
            7: {
                hindi: "पत्नी पक्ष में कष्ट, परिवार चलाने में कठिनाई, व्यवसाय के पक्ष में बड़ी कठिनाई और परिश्रम से काम, यौन सुख के संबंध में कुछ उत्सुकता, परंतु कुछ अपूर्ण सुखों का अनुभव।",
                english:
                    "Finds distress in the side of wife, gets difficulties in running the family, works with great difficulty and through hard labour in the side of occupation, gets some keenness in connection with sexual pleasures, but experiences some incomplete pleasures",
            },
            8: {
                hindi: "जीवन में बहुत बेचैन, बड़ी कठिनाइयों से दिन गुजारता है, पेट के निचले हिस्से (नाभि के नीचे या गुदा में) में कोई रोग रहता है, जीवन में हर समय कोई बड़ी दुर्घटना होती है, चिंताओं से भरा रहता है, कठोर परिश्रम करता है।",
                english:
                    "Highly restless in his life, passes his days with great difficulties, gets some disease in the lower parts ofstomach (below naval or in anus), meets with some major accident every time in life, full ofanxieties, does some hard labour",
            },
            9: {
                hindi: "भाग्य के घर में कुछ कमजोरी आती है, अपने तरीके से धर्म में विश्वास करता है, भाग्य के उदय में उत्सुकता से लगा रहता है",
                english:
                    "Gets some weakness in the house ofdestiny, believes in Dharma in his own way, keenly engages in the rise offortune",
            },
            10: {
                hindi: "पिता के घर में हानि और कष्ट, सरकार के घर में कुछ चिंताएं, व्यापार की प्रगति में बाधा",
                english:
                    "Gets loss and distress in the house offather, gets some worries in the house of government, hindrance in progress ofbusiness",
            },
            11: {
                hindi: "आय के घर में कुछ चिंताओं के माध्यम से भारी लाभ कमाता है, लाभ के घर में कुछ दृढ़ता पैदा करता है",
                english:
                    "Makes heavy gains through some worries in the house of income, creates some firmness in the house ofgains",
            },
            12: {
                hindi: "व्यय भाव में बड़ी कठिनाई का सामना करता है, और अंत में उस पर विजय प्राप्त कर लेता है।",
                english:
                    "Bears great difficulty in the house of expenditure, and in the end overpowers it",
            },
        },
    },
    Libra: {
        Sun: {
            1: {
                hindi: "शारीरिक श्रम से आय होती है, किन्तु आय और शरीर में कुछ कमजोरी भी होती है, दैनिक कार्य में दृढ़ता मिलती है, घर-परिवार में विशेष लाभ होता है, विशेष यौन सुख मिलता है, दुबला-पतला शरीर होता है।",
                english:
                    "Gets the income through physical labour but gets some weakness in income and physique also, gets firmness in the daily occupation, special gains in the house ofwife and family, gets special sexual pleasures, is of lean and thin body",
            },
            2: {
                hindi: "बहुत धन संचय करता है, भारी आय प्राप्त करता है, परिवार और धन का लाभ प्राप्त करता है, दिखने में धनवान लगता है, यशस्वी और प्रतिष्ठित होता है",
                english:
                    "Accumulates much wealth, gets heavy income, gets the advantage of the family and wealth, apparently seems to be rich, is glorious and respectable",
            },
            3: {
                hindi: "महान शक्ति और प्रभाव वाला और साहसी होता है, भाइयों से लाभ प्राप्त करता है, धर्म के घर से धन और लाभ प्राप्त करता है, बहुत ऊर्जावान होता है",
                english:
                    "Has great power and influence and is courageous, gets advantage of brothers, gets wealth and gains from the house ofDharma, is very energetic",
            },
            4: {
                hindi: "लाभ की योजनाओं में कुछ कमी और बेचैनी महसूस होती है, पिता और माता का लाभ मिलता है लेकिन कुछ कमी के साथ, माता और भवन का सुख मिलता है।",
                english:
                    "Feels some deficiency and uneasiness in the schemes ofgains, gets the advantage offather and also ofmother but with some deficiency, happiness of mother and buildings",
            },
            5: {
                hindi: "विद्या से लाभ, संतान पक्ष से लाभ, धन प्राप्ति के कारण मन में कुछ थकान व स्वार्थ का अनुभव, बुद्धिमान, शीघ्र बोलने वाला",
                english:
                    "Gains from education, gets the advantage from the house of children, feels some fatigue and selfishness in his mind due to acquiring wealth, is intelligent, speaks swiftly",
            },
            6: {
                hindi: "शत्रुओं के घर में विजय प्राप्त करता है, अधिक व्यय करता है, प्रभावशाली, अच्छे आचरण वाला, प्रतिभाशाली और निडर होता है।",
                english:
                    "Gets victory in the house of enemies, spends much, influential, of good manners, brilliant and fearless",
            },
            7: {
                hindi: "प्रभावशाली व्यवसाय करता है, पत्नी से लाभ प्राप्त करता है, सुन्दर पत्नी पाता है, पत्नी की ओर से विशेष यौन सुख प्राप्त करता है, पत्नी के घर में बहुत प्रभाव रखता है, काम की अधिकता या आय की विशिष्टता के कारण शारीरिक रूप से थका हुआ महसूस करता है, यौन सुख की अधिकता के कारण कुछ कमजोरी महसूस करता है, मेहनती होता है।",
                english:
                    "Pursues influential occupation, gets the gains from the wife, gets a beautiful wife, gets special sexual pleasures on the side ofwife, gets huge influence in the house ofwife, feels physically fatigued due to excess ofwork or due to peculiarity ofincome, feels some weakness due to excess sexual pleasures, is industrious",
            },
            8: {
                hindi: "भालू आय की चिंता करता है, विदेश में लाभ कमाता है, धन संचय के प्रति सावधान रहता है, वंशानुगत लाभ प्राप्त करता है, परिश्रमपूर्ण जीवन व्यतीत करता है और परिवार का विकास करता है।",
                english:
                    "Bears worries about income, gains in foreign countries, is careful about accumulating wealth gets the hereditary gains spends a, , laborious life and develops the family",
            },
            9: {
                hindi: "बहुत भाग्यशाली होता है, भाग्य की शक्ति से भारी लाभ प्राप्त करता है, प्रतिभाशाली, प्रभावशाली और लापरवाह होता है",
                english:
                    "Is very fortunate, gets heavy gains due to the power of destiny, is brilliant, influential and carefree",
            },
            10: {
                hindi: "सम्मानपूर्वक आय प्राप्त करता है, बड़ा व्यापार करता है, पिता के घर में भारी लाभ प्राप्त करता है, प्रतिष्ठित होता है और सरकार के घर से लाभ प्राप्त करता है, भूमि और भवन से संबंधित लाभ के बारे में उदासीन होता है, व्यापार और व्यवसाय के संबंध में दूरदर्शिता का उपयोग करता है।",
                english:
                    "Gets the income with respect, conducts a big business, gets heavy gains in the house offather, is respectable and gains from the house of government, insipid about gains in connection with land and buildings, uses farsightedness in connection with business and occupation",
            },
            11: {
                hindi: "बहुत लाभ होता है, नियमित रूप से ठोस आय होती है, घर में बच्चों की कुछ कमी होती है, शिक्षा प्राप्त नहीं होती, शत्रुता होती है, बातचीत में कठोरता और चिड़चिड़ापन का प्रयोग होता है।",
                english:
                    "Gains much, gets the concrete income regularly, some deficiency in the house ofchildren, gets education, acquires enmity, uses harshness and irritation in conversation",
            },
            12: {
                hindi: "बहुत खर्च करता है, सारा लाभ खर्च कर देता है, त्याग का विचार रखता है, शत्रुओं से लाभ प्राप्त करता है",
                english:
                    "Spends much, spends the whole profit, has the idea ofrenunciation, gains from enemies",
            },
        },
        Moon: {
            1: {
                hindi: "प्रतिष्ठित, राजसी और सम्मानित, पिता के घर में उन्नति पाता है, उच्च श्रेणी के यौन सुखों का आनंद लेता है, पत्नी का सुख प्राप्त करता है, व्यवसाय के संबंध में बहुत राजसी ढंग से काम करता है, सरकार और समाज में सम्मान प्राप्त करता है।",
                english:
                    "Dignified, majestic and respected, gets progress in the house of father, enjoys high class sexual pleasures, gets the happiness ofwife, works very majestically in connection with occupation, gets honour in government and society",
            },
            2: {
                hindi: "धन भाव में कमजोरी, व्यापार से भाग्य की हानि, आयु में वृद्धि, धन प्राप्ति हेतु गुप्त कार्य",
                english:
                    "Weakness in the house ofwealth, loss of fortune through business, increase in longevity, works secretly to get wealth",
            },
            3: {
                hindi: "भाई-बहनों का संयोग प्राप्त होता है, बहुत भाग्यशाली और यशस्वी होता है, धर्म का पालन करता है, ईश्वर में अटूट आस्था रखता है, बहुत चतुर और परिश्रमी होता है।",
                english:
                    "Gets the conjunction of brothers and sisters, is very fortunate and successful, rears Dharma, has Ml faith in God, very clever and industrious",
            },
            4: {
                hindi: "स्वयं का भवन होता है, मान-सम्मान मिलता है, माता-पिता से सुख मिलता है, बड़े व्यवसाय का सुख मिलता है, बहुत ही नेक और मानसिक विचार होते हैं, सरकार और समाज से सम्मान मिलता है।",
                english:
                    "Has his own buildings, gets honour and respect, happiness from parents, pleasure ofa big business, has very noble and mental ideas, respect and honour from government and society",
            },
            5: {
                hindi: "शिक्षित है, प्रगति के लिए अपने मन में बहुत ऊंची योजनाएं सोचता है, बच्चे हैं, और उनके माध्यम से प्रगति करता है, प्रबंधकीय कर्तव्य निभाता है",
                english:
                    "Is educated, thinks ofvery high schemes in his mind for progress, has children, and progresses through them, has managerial duties",
            },
            6: {
                hindi: "पिता के घर में कुछ कमी, शानदार व्यापार, आय से अधिक व्यय, चिंता और शत्रु के घर में मान-सम्मान, बाहरी स्थानों से संपर्क बना रहता है।",
                english:
                    "Some deficiency in the house offather, does splendid business, more expenditure than income, dignity in the house ofworries and enemies, keeps contact with outside places",
            },
            7: {
                hindi: "सुन्दर पत्नी मिलती है और यौन सुखों का आनंद उठाता है, विवाह के बाद सम्मान की प्राप्ति होती है, चतुर और कुशल कार्यकर्ता होता है, व्यवसाय में सफलता प्राप्त करता है, मानसिक रूप से यौन मामलों में व्यस्त रहता है, अच्छा व्यापार करता है।",
                english:
                    "Gets a pretty wife and enjoys the sexual pleasures, gets the progress ofhonour after the marriage, is clever and a skilful worker, gets the success in occupation, mentally busy in sexual affairs, does good business",
            },
            8: {
                hindi: "पिता के घर में कमजोरी, धन के घर में कमजोरी, विदेश से सम्मान मिलता है, दर्दनाक मौत होती है, मृत्यु के बाद प्रशंसा मिलती है",
                english:
                    "Weakness in the house of father, weakness in the house ofwealth, gets honour from foreign countries, dies a painful death, praised after death",
            },
            9: {
                hindi: "बहुत भाग्यशाली होता है, धर्म और कर्तव्य का पालन करता है, सरकार और समाज के घर में उन्नति करता है, भाई-बहनों को प्राप्त करता है और बहुत भाग्यशाली माना जाता है, प्रसिद्धि प्राप्त करता है और भगवान में विश्वास करता है",
                english:
                    "Is very fortunate, rears the religion and duty, progress in the house of government and society, gets the brothers and sisters and is considered very fortunate, gets fame and believes in God",
            },
            10: {
                hindi: "राजसत्ता में सम्मान पाता है, पिता से सहायता पाता है, बड़ा व्यापार करता है, मान-सम्मान के कारण बहुत सुख पाता है, स्वाभिमान शांत रहता है, माता के घर में सुख मिलता है, संपत्ति होती है, बहुत परिश्रमी होता है।",
                english:
                    "Is respected in government, gets help from father, does big business, gets much pleasure because ofhis respect and honour, is lull ofself- pride, gets happiness in the house ofmother, has property, is very industrious",
            },
            11: {
                hindi: "बहुत अच्छा और प्रभावशाली लाभ प्राप्त होता है, पिता से लाभ होता है, बुद्धि और शिक्षा होती है, बच्चों का सुख मिलता है, अच्छा कर्मचारी होता है, सरकार में सम्मान होता है, बड़ा व्यवसाय करता है, समाज से लाभ होता है",
                english:
                    "Gets very decent and influential gains, gains from father, has wisdom and education, pleasure of children, is a good worker, respect in government, conducts a big business, gains from society",
            },
            12: {
                hindi: "व्यापार व्यवसाय में हानि, सरकार के घर में हानि, मान-सम्मान के घर में कमजोरी, शत्रुओं के घर में प्रभाव, मन में कमी",
                english:
                    "Loss in business occupation, loss in the house ofgovernment, rears weakness in the house ofhonour and respect, creates influence in the house of enemies, deficiency in mind",
            },
        },
        Mars: {
            1: {
                hindi: "बहुत धनवान और प्रतिष्ठित होता है, शरीर में दुर्बलता होती है, मूल्यवान व्यवसाय करता है, बहुत योग्य और सुंदर पत्नी प्राप्त करता है, आदर्श सुख प्राप्त करता है, महान सुख प्राप्त करता है, घरेलू लाभ, भवन आदि प्राप्त करता है।",
                english:
                    "Is very rich and respectable, gets emaciation in his physique, pursues valuable occupation, gets very able and beautiful wife, gets ideal pleasures, gets great happiness, gets the household profits, buildings, etc",
            },
            2: {
                hindi: "व्यापार और व्यवसाय के भाव से धन में वृद्धि, बहुत शक्ति मिलती है, पत्नी के भाव से सुख में कमी, यौन सुख की अधिकता, पुत्र से कुछ सुख मिलता है।",
                english:
                    "Gets increment in wealth through the house of business and occupation, gets much power, deficiency in the happiness from the house of wife, gets excess of sexual pleasures, some happiness from son",
            },
            3: {
                hindi: "प्रभावशाली परिश्रम, व्यवसाय के संबंध में प्रभाव और उन्नति, प्रभावशाली और सुंदर पत्नी मिलती है, लेकिन पत्नी और भाई की ओर से कुछ बंधन, पिता के घर में कुछ असंतोष, यौन सुख, व्यवसाय, धन और शक्ति के कारण कुछ कमजोरी, सरकार और समाज के घर में कुछ कमी, शत्रु के घर में उलझनें।",
                english:
                    "Does influential labour, influence and progress in connection with occupation, gets influential and beautiful wife, but gets some bondage in the side ofwife and brother, some dissatisfaction in the house of father, some weakness on account of sexual pleasures, occupation, wealth and power, some deficiency in the house ofgovernment and society, perplexities in the house of enemies",
            },
            4: {
                hindi: "दैनिक कार्य से सुख एवं प्रचुर धन प्राप्त होता है, भूमि एवं संपत्ति प्राप्त होती है, पत्नी का सुख मिलता है, विवाह के बाद धन में वृद्धि होती है, घर में पत्नी का वर्चस्व होता है, माता का सुख मिलता है, राजभवन में कुछ कमजोरी होती है, पद में वृद्धि कुछ कमजोर होती है, यौन सुख प्राप्त होता है तथा परिवार में सुखी रहता है।",
                english:
                    "Gets happiness and huge wealth due to daily occupation, gets land and property, gets happiness of wife, increase ofwealth after marriage, gets supremacy of wife in his house, gets the happiness of the mother, some weakness in the house ofgovernment, rise in position is somewhat weak, acquires sexual pleasures and is happy in the family",
            },
            5: {
                hindi: "धन कमाता है, शिक्षा प्राप्त करता है, संतान पक्ष में कुछ विरोध होता है, बुद्धिमान पत्नी मिलती है, स्वार्थी होता है।",
                english:
                    "Earns wealth, gets education, some opposition in the side ofchildren, gets an intelligent wife, is selfish",
            },
            6: {
                hindi: "धन और व्यवसाय के संबंध में कमजोरी, पत्नी और परिवार से कुछ कष्ट, अधिक व्यय, शत्रु पक्ष में प्रभाव, यौन सुख में कमी",
                english:
                    "Weakness in connection with wealth and occupation, some distress from his wife and family, spends much, keeps influence in the side of enemies, deficiency in the sexual pleasures",
            },
            7: {
                hindi: "बहुत धन कमाता है, प्रतिष्ठित माना जाता है, कठोर स्वभाव वाली पत्नी मिलती है, पिता और सरकार के घर में कुछ कमी होती है, व्यवसाय में कमजोरी होती है",
                english:
                    "Earns much wealth, supposed to be respectable, gets iron-minded wife, some deficiency in the house offather and government, weakness in occupation",
            },
            8: {
                hindi: "वर्तमान धन की हानि, व्यवसाय में उलझन, पत्नी और परिवार में क्लेश, भाई-बहनों के घर में कुछ बंधन",
                english:
                    "Loss ofthe present wealth, perplexity in occupation, gets distress in wife and family, some bondage in the house ofbrothers and sisters",
            },
            9: {
                hindi: "अपने और अपनी पत्नी के भाग्य से धन प्राप्त करता है, दैनिक कार्य से उन्नति करता है, अधिक व्यय करता है तथा भूमि-सम्पत्ति का बड़ा सुख भोगता है, भाग्यशाली और प्रतिष्ठित होता है।",
                english:
                    "Gets wealth due to his own and his wife's luck, progress through everyday occupation, spends much and enjoys great happiness of land and property, is fortunate and respectable",
            },
            10: {
                hindi: "धन और व्यवसाय में कमजोरी, राज-काज और समाज में कमी, धन की कमी के कारण पत्नी और पिता के घर में अपमानजनक पीड़ा, पिता में कमी और कष्ट, पत्नी का व्यवसाय निम्न स्तर का, यौन सुख में कमी, राज-काज में सम्मान, पिता से सहायता, बड़ा व्यापार, मान-सम्मान के कारण बहुत सुख, आत्म-गौरवशाली, माता के घर में सुख, बहुत परिश्रमी।",
                english:
                    "Gets the weakness of wealth and occupation, gets deficiency in government and society, bears the insulting agony in the house of wife and father on account of deficiency of wealth, bears deficiency and trouble in father, wife with a low standard of occupation, deficiency in sexual pleasures, is respected in government, help from father, does big business, gets much pleasure because of his respect and honour, is Ml of self-pride, gets happiness in the house of mother, very industrious",
            },
            11: {
                hindi: "बहुत अच्छा प्रभावशाली लाभ प्राप्त होता है, पिता से लाभ होता है, बुद्धि और शिक्षा प्राप्त होती है, बच्चों का सुख मिलता है, अच्छा कर्मचारी होता है, सरकार में सम्मान होता है, बड़ा व्यवसाय होता है, समाज से लाभ होता है, व्यवसाय के कारण भारी आय प्राप्त होती है, पत्नी का सुख मिलता है, बहुत साहसी होता है",
                english:
                    "Gets very decent influential gains, gains from father, acquires wisdom and education, pleasure of children, is a good worker, respect in government, has a big business, gains from society, acquires heavy income due to occupation, gets the happiness of wife, is very courageous",
            },
            12: {
                hindi: "जन-धन की भारी हानि, पत्नी और परिवार में अशांति, दैनिक व्यवसाय में हानि, विरोधियों पर कुछ प्रभाव, धन की हानि और व्यवसाय में कुछ विशेषता का अनुभव।",
                english:
                    "Heavy loss ofmen and wealth, gets restlessness in wife and family, loss in everyday occupation, some influence over opponents, feels loss of wealth and some speciality in occupation",
            },
        },
        Mercury: {
            1: {
                hindi: "भाग्यवान, शरीर का सुख भोगने वाला, दुबला-पतला शरीर वाला, पत्नी के साथ पारिवारिक सुख भोगने वाला, व्यवसाय में सफलता पाने वाला, बहुत चतुर, बहुत बुद्धिमान और न्याय करने वाला, प्रभावशाली और कोमल स्वभाव वाला होता है।",
                english:
                    "Fortunate, enjoys the happiness of physique, has a thin and lean body, enjoys domestic happiness in connection with wife, gets success in occupation, is very clever, is very wise and does justice, is influential, and is of tender nature",
            },
            2: {
                hindi: "धनवान और प्रतिष्ठित होता है, व्ययबल और भाग्यबल के कारण जीवन में सुख भोगता है, परिवार के घर में कुछ कमजोरी के साथ उन्नति पाता है।",
                english:
                    "Is wealthy and respectable, experiences pleasures in life due to power ofexpenditure and destiny, gets progress with some weakness in the house of family",
            },
            3: {
                hindi: "बहुत भाग्यशाली माना जाता है, साहसी होता है, कोमल शरीर का होता है, कुछ कमजोरी के बाद भाई-बहन के साथ संपर्क को नवीनीकृत करता है, सम्मानीय और संकोची होता है",
                english:
                    "Thought to be very fortunate, is courageous, possesses tender physique, renews contact with brother and sister after some weakness, is respectable and reserved",
            },
            4: {
                hindi: "सुख भोगता है, सुखपूर्वक व्यतीत करता है, माता के घर में कुछ अभाव रहता है, माता और भूमि का सुख पाता है, धर्म का पालन-पोषण व्यवहारिक रूप से करता है।",
                english:
                    "Enjoys pleasures, spends comfortably, some deficiency in the house of mother, gets the pleasure of mother and land, rears Dharma practically",
            },
            5: {
                hindi: "धर्म के सम्बन्ध में बहुत गहन एवं दूरगामी ज्ञान रखता है, बुद्धि एवं वाणी द्वारा उन्नति प्राप्त करता है, संतान के घर में कुछ कमी के साथ सुखी रहता है, व्यय का प्रबंधन बुद्धिमानी से करता है, अच्छा राजनीतिज्ञ होता है।",
                english:
                    "Has very deep and far reaching knowledge in connection with Dharma, secures rise though intellect and speech, happiness with some deficiency in the house ofchildren, manages the expenditure wisely, is a good politician",
            },
            6: {
                hindi: "भाग्य में घोर दुर्बलता और अपमान, भाग्य में हानि, शत्रुओं के घर में अशांति, व्यय में चिंता, गुप्त चालें चलने वाला।",
                english:
                    "Great weakness and dishonour in his destiny, gets loss in his fortune, restlessness in the house ofenemies, gets worries in expenditure, and follows secret tactics",
            },
            7: {
                hindi: "बहुत भाग्यशाली होता है और परिवार का सुख भोगता है, विवाह के बाद व्यवसाय में उन्नति पाता है, व्यय पर नियंत्रण पाता है, पत्नी के घर में कुछ कमी के साथ अच्छे और सभ्य सुख पाता है, यौन सुख के अच्छे साधन पाता है, व्यवसाय में कुछ सफलता के साथ अच्छी उन्नति पाता है।",
                english:
                    "Is very fortunate and enjoys the pleasures of family, gets progress from occupation after marriage, gets control over the expenditure, gets good and decent pleasures with some deficiency in the house ofwife, gets good means of sexual pleasures, gets decent progress in occupation with some success",
            },
            8: {
                hindi: "भाग्य में कष्ट, व्यय के सम्बन्ध में दुर्बलता और बेचैनी, आयु में कुछ दृढ़ता, शान्तिपूर्ण मृत्यु।",
                english:
                    "Feels distress in destiny, weakness and restlessness in connection with expenditure, some firmness in age, dies a peaceful death",
            },
            9: {
                hindi: "बहुत भाग्यशाली, यश पाने वाला, भाग्य की उन्नति पाने वाला, व्यय की शक्ति पाने वाला, साहसी, भाई-बहनों वाला होता है।",
                english:
                    "Is very fortunate, gets fame, gets the progress of destiny, gets the power of expenditure, is courageous, and has brothers and sisters",
            },
            10: {
                hindi: "वीरता और वैभव से परिपूर्ण, बहुत शानदार व्यापार करने वाला, अपने अच्छे कार्यों से सम्मान पाने वाला, शान से खर्च करने वाला, सम्माननीय और प्रतिष्ठित व्यक्ति होता है।",
                english:
                    "Full ofvalour and grandeur, conducts a very splendid business, gets honour by his good deeds, spends majestically, is respectable and a man of prestige",
            },
            11: {
                hindi: "भाग्य की शक्ति से भारी सफलता पाता है, अपनी बुद्धि से आय बढ़ाता है, शिक्षा और बुद्धि प्राप्त करता है, बहुत बुद्धिमान और दूरदर्शी होता है, बच्चों के घर में कुछ कमजोरी के साथ सफलता पाता है, भाग्यशाली और चतुर होता है।",
                english:
                    "Gets heavy success through the power ofdestiny, increases the income by his wisdom, acquires education and wisdom, is very wise and farsighted, gets success with some weakness in the house ofchildren, is fortunate and clever",
            },
            12: {
                hindi: "बहुत खर्च करता है, भाग्य के घर में नुकसान होता है, तीर्थयात्राओं में बहुत खर्च करता है और धार्मिक होता है, दुश्मनों के संबंध में कुछ बुद्धिमानी की नीति का उपयोग करता है",
                english:
                    "Spends much, losses in the house of destiny, spends much in pilgrimages and is religious, uses some policy ofwisdom in relation with enemies",
            },
        },
        Jupiter: {
            1: {
                hindi: "बहुत प्रभावशाली कार्य करने वाला, बहुत साहसी, कठोर शारीरिक श्रम करने वाला, बहुत बुद्धिमान तथा चतुराईपूर्ण नीतियाँ अपनाने वाला, चतुराई से व्यवसाय करने वाला, धार्मिक आचरण में सावधानी रखने वाला, संतान पक्ष में शत्रुता रखने वाला, पत्नी पक्ष में मान-सम्मान रखने वाला।",
                english:
                    "Does very influential deeds, has great courage, does hard physical labour, is very wise and follows shrewd policies, follows occupation tactfully, is careful about religious behaviour, gets some enmity in the house of children, dignity in the side ofwife",
            },
            2: {
                hindi: "अपार धन-संपत्ति प्राप्त करता है, मान-सम्मान पाता है, शत्रु भाव में प्रभाव रखता है, पिता के साथ से कुछ उन्नति करता है और बुद्धिमान होता है",
                english:
                    "Gets huge wealth, gets respect, keeps influence in the house of enemies, some progress with father and is wise",
            },
            3: {
                hindi: "बहुत अच्छे और प्रभावशाली ऊर्जावान कर्म करता है, व्यवसाय में लाभ प्राप्त करता है, बहुत भाग्यशाली माना जाता है, भाई के घर में शक्ति और अधिकार प्राप्त करता है",
                english:
                    "Does very good and influential energetic deeds, gets gains in occupation, thought to be very fortunate, gets the power and authority in the house of brother",
            },
            4: {
                hindi: "माता के घर में हानि होती है, घर में भी शांति नहीं मिलती, भाई के पक्ष में अशांति होती है, अधिक खर्च होता है, विरोधी पराजित होते हैं।",
                english:
                    "Gets loss in the house ofmother, does not get peace even at home, gets restlessness in the side of brother, spends much, defeats the opposition",
            },
            5: {
                hindi: "बुद्धि और संतान से बल प्राप्त होता है, संतान सुख प्राप्त करने में कुछ कठिनाई महसूस होती है, शिक्षा प्राप्ति में कमजोरी आती है, साहसी स्वभाव का होता है, साहसी संतान होती है, बहुत चतुर, बुद्धिमान और दक्ष होता है।",
                english:
                    "Gets strength from the power of intellect and children, feels some difficulties in getting the happiness ofchildren, gets weakness while acquiring education, is of courageous disposition, has courageous children, is very clever, wise and skifful",
            },
            6: {
                hindi: "वह साहसी स्वभाव का होता है, अपने परिश्रम से प्रतिष्ठा प्राप्त करता है, विरोधियों को परास्त करता है, अधिक व्यय करता है, अपने कार्यों में बंधन पाता है और लापरवाह होता है।",
                english:
                    "Is of brave nature, gets dignity by his hard labour, defeats the opponents, spends much, gets bondage in his work and is careless",
            },
            7: {
                hindi: "दैनिक व्यवसाय प्राप्त करता है, सफल औद्योगिक व्यक्ति होता है, पत्नी से महान शक्ति प्राप्त करता है, भाइयों का उत्तम सहयोग प्राप्त करता है, शत्रुओं को पराजित करता है, इच्छा-शक्ति के कारण विजय प्राप्त करता है।",
                english:
                    "Gets the daily occupation, is a successful industrial man, great power through wife, gets the best cooperation of the brothers, defeats the enemies, gets victory due to will-power",
            },
            8: {
                hindi: "बहुत कमजोरी का अनुभव करता है, बड़ी गुप्त नीतियों से काम करता है, बहुत खर्च करता है, माता, भूमि और सुख के घर में कमजोरी महसूस करता है",
                english:
                    "Experiences great weakness, works with great secret policies, spends much, feels weakness in the house ofmother, land and happiness",
            },
            9: {
                hindi: "भाग्य भाव से शक्ति प्राप्त होती है, भाई का सहयोग मिलता है लेकिन कुछ बाधाओं के साथ, झगड़ों और शत्रुओं की बिल्कुल भी परवाह नहीं करता, न्याय की शक्ति को स्वीकार करता है, संतानवान होता है।",
                english:
                    "Gets power from the house of destiny, cooperation ofbrother but with some hindrances, does not care at all about quarrels and enemies, acknowledges the power ofjustice, has children",
            },
            10: {
                hindi: "बहुत प्रभावशाली होता है, माता के घर में अलगाव का अनुभव करता है और पिता के घर में उन्नति करता है, बहुत कम व्यापार करता है, बहुत बहादुर और शक्तिशाली होता है, भाई-बहनों से युक्त होता है, जटिल नीति में निपुण होता है",
                english:
                    "Is very influential, experiences separation in the house ofmother and progresses in the house of father, does very little business, is very brave and powerful, has brothers and sisters, expert in intricate policy",
            },
            11: {
                hindi: "बहुत ऊर्जावान और बहुत धन कमाने वाला, व्यवसाय में सफलता पाने वाला, सफल और मेहनती कार्यकर्ता, प्रभावशाली, भाइयों का प्रभुत्व पाने वाला, पत्नी के घर में बहुत शक्ति का आनंद लेने वाला, संतान पक्ष में कमी वाला होता है।",
                english:
                    "Is very energetic and earns large wealth, gets success in occupation, is a successful and industrious worker, is influential, gets the power of the brothers, enjoys the great power of the house ofwife, deficiency in the side ofchildren",
            },
            12: {
                hindi: "बल और ऊर्जा में क्षीणता आती है, भाई से शत्रुता होती है, विरोधी को परास्त करता है, लापरवाह होता है तथा अधिक व्यय के कारण दुर्बलता प्राप्त करता है।",
                english:
                    "Gets weakness in his strength and energy, has enmity with brother, defeats the opponent, careless and gets weakness due to heavy expenditure",
            },
        },
        Venus: {
            1: {
                hindi: "उसकी उन्नति में असहयोग मिलता है, दीर्घायु होता है, बहुत सम्मानीय होता है, यश प्राप्त होता है, शरीर में कुछ दुर्बलता होती है, आत्मज्ञान बहुत अच्छा होता है, दूरदर्शी होता है, कूटनीतिज्ञ होता है और प्रभावशाली होता है।",
                english:
                    "Gets non-cooperation in his progress, gets a long life, is very respectable, gets fame, gets some weakness in the body, has very good knowledge ofself, is farsighted, is a diplomat and is influential",
            },
            2: {
                hindi: "धन का लाभ पाता है, दीर्घायु होता है, धन वृद्धि के लिए बल का प्रयोग करता है, धन के घर में कभी हानि होती है, परिवार में कुछ सुख और कुछ संघर्ष होता है, आश्रित होता है।",
                english:
                    "Gets advantage of wealth, gets long life, uses strength to increase wealth, sometimes gets losses in the house ofwealth, some pleasures and some struggles in his family, is dependent",
            },
            3: {
                hindi: "बहुत ऊर्जावान, कठोर परिश्रम करने वाला, भाई के घर में कुछ कमी, तथा बहुत चतुर होता है।",
                english:
                    "Is very energetic, toils hard, some deficiency in the house ofbrother, and is very clever",
            },
            4: {
                hindi: "अपने घर पर सुखपूर्वक जीवन व्यतीत करता है, दीर्घायु होता है, माता-पिता के घर में कुछ कमी रहती है, राजकीय, सामाजिक तथा घरेलू कार्यों को बड़ी चतुराई से करता है, गंभीर स्वभाव का होता है।",
                english:
                    "Spends his life comfortably and happily at his own place, gets long life, some deficiency in the house of parents, performs the governmental, social and domestic tasks very cleverly, is solemn",
            },
            5: {
                hindi: "आत्मज्ञान की शक्ति प्राप्त होती है तथा गहन ज्ञान से युक्त होता है, संतान के घर में कुछ कष्टकारी सुख प्राप्त होता है, दीर्घायु होता है, बहुत दूरदर्शी होता है, राजनीतिज्ञ होता है तथा कठिन समस्याओं का सामना करता है।",
                english:
                    "Gets the power of self-knowledge and possesses deep knowledge, gets some troublesome happiness in the house of children, has a long life, is very farsighted, is a politician and faces difficult problems",
            },
            6: {
                hindi: "अपने जीवन की कठिनतम समस्याओं का समाधान करने वाला, लापरवाह, व्यय भाव में कुछ कमी वाला होता है।",
                english:
                    "Solves the most difficult problems of his life, is careless, some deficiency in the house of expenditure",
            },
            7: {
                hindi: "महान विशेष शक्तियों के माध्यम से अपने दैनिक कार्यों का प्रबंधन करता है, अच्छी आयु का और सुंदर होता है, आत्म-दृष्टि वाला, कूटनीतिज्ञ, अपना कार्य संपन्न कराने में बहुत चतुर, पत्नी से संबंधित परिवार में कुछ परेशानी, आत्म-केंद्रित, यौन एहसान की चाहत रखता है।",
                english:
                    "Manages his daily occupation through great special powers, is of good age and handsome, self-sighted, diplomatic, very clever in getting his work completed, some distress in the family connected with wife, self-centred, seeks sexual favours",
            },
            8: {
                hindi: "दीर्घायु, शरीर में कुछ कमी, धन प्राप्ति के लिए जी-जान से प्रयास, परिवार की चाहत",
                english:
                    "Has a long life, some deficiency in the body, makes whole-hearted attempt to get wealth, wants family",
            },
            9: {
                hindi: "सौभाग्य से जीवन व्यतीत करता है, चिन्ता रहित, भाग्यवादी एवं परिश्रमी, भाई-बहनों के स्नेह में कुछ कमी, बहुत सम्मानीय एवं चतुर होता है।",
                english:
                    "Spends his life with good luck, no anxieties, is fatalistic and industrious, some deficiency in the affection of brothers and sisters, is very respectable and clever",
            },
            10: {
                hindi: "राजसी जीवन व्यतीत करता है, अधिकार प्राप्त करता है, सुख-सुविधाओं को बहुत पसंद करता है, मान-सम्मान की उन्नति में कठिनाई होती है, व्यापार में कठिनाई से उन्नति होती है, हठी होता है",
                english:
                    "Spends life royally, gets authority, likes comforts and pleasures very much, difficulties in the progress of honour, gets progress in the business with some difficulty, is obstinate",
            },
            11: {
                hindi: "जीवन में अनेक प्रकार के लाभ प्राप्त होते हैं, किन्तु व्यक्तिगत लाभ के घर में कुछ आलस्य का अनुभव होता है, बहुत चतुर होता है, संतान और अच्छी शिक्षा प्राप्त करता है।",
                english:
                    "Gets many kinds ofgains in his life, but feels some laziness in the house of personal gains, is very clever, gets children and good education",
            },
            12: {
                hindi: "उसके शरीर में बहुत कमजोरी आ जाती है, कष्ट होता है और व्यय में कमी आती है, जीवन की दैनिक दिनचर्या में कष्ट महसूस होता है",
                english:
                    "Gets much weakness in his body, gets distress and deficiency in expenditure, feels sufferings in his daily routine of life",
            },
        },
        Saturn: {
            1: {
                hindi: "अत्यंत सुन्दर शरीर वाला, सुखों का भरपूर आनंद लेने वाला, खूब शिक्षा प्राप्त करने वाला, बहुत बुद्धिमान, प्रभावशाली, परिश्रमी और बड़े व्यापार की ओर ध्यान देने वाला, वाणी और बुद्धि के कारण घरेलू मामलों में पत्नी से कष्ट पाने वाला, यौन सुख और पत्नी के क्षेत्र में कुछ कमी वाला, संपत्ति का भरपूर सुख पाने वाला, आत्म-गौरव वाला होता है।",
                english:
                    "Is of very handsome physique, enjoys pleasures very much, gets much education, is very wise, influential, diligent and pays attention towards a big business, faces troubles with wife in domestic affairs due to speech and intellect, some deficiency in the side of sexual pleasures and in the sphere ofwife, gets much pleasure and happiness of property, possesses self-pride",
            },
            2: {
                hindi: "भूमि-सम्पत्ति का अधिकार प्राप्त होता है, संचित धन-संपत्ति का बहुत ध्यान रखता है, बुद्धि, जन और धन के बल से बहुत प्रसन्नता अनुभव करता है, माता के घर में सुधार करता है, माता और संतान पक्ष की समस्याओं और बंधनों से मुक्ति पाता है।",
                english:
                    "Gets powers ofland and property, cares much about the accumulated cash deposit, feels great happiness due to power of intellect, people and wealth, improves the house of mother, gets the problems and bondage in the side of mother and children",
            },
            3: {
                hindi: "बहुत ऊर्जावान और महान बुद्धि वाला, बहुत बातूनी, नम्र नहीं, बहुत खुलकर बात करने वाला, उत्सुक बच्चे वाला, बहुत खर्च करने वाला, परिश्रम करने वाला, माता के घर में विरोध वाला होता है।",
                english:
                    "Is very energetic and has the great power ofintellect, is very talkative, is not gentle, talks very freely, has keen children, spends much, puts in labour, opposition in the house of mother",
            },
            4: {
                hindi: "बहुत प्रसन्न होता है, सुख प्राप्ति के लिए अधिक ध्यान देता है, शत्रु भाव में अपना प्रभाव रखता है, मातृभूमि और संपत्ति का अधिकार पाता है, संतान पक्ष में पूर्णता होती है, चिंतामुक्त होता है।",
                english:
                    "Is very happy, pays more attention to get the happiness, keeps Ml influence in the house ofenemies, gets the power ofmotherland and property, completeness in the side of children, is carefree",
            },
            5: {
                hindi: "शिक्षा प्राप्त करता है और बहुत बुद्धिमान होता है, संतान का सुख अनायास ही प्राप्त होता है, पत्नी भाव में कमी महसूस करता है, वाणी से कष्ट देता है, धन वृद्धि के लिए प्रयत्नशील रहता है, धन भाव में कुछ कमी, व्यवसाय और लाभ भाव में कुछ कमी, माता का सुख",
                english:
                    "Gets education and is very intelligent, gets the happiness ofchildren spontaneously, feels deficiency in the house of wife, gives sufferings through his speech, puts efforts to increase wealth, some deficiency in the house ofwealth, some deficiency in the house of occupation and gains, happiness of mother",
            },
            6: {
                hindi: "माता और संतान के घर से दुःख, सुख और शिक्षा प्राप्ति में कमी, आयु और दिनचर्या में सुख का अनुभव, कुछ कड़वा बोलना, भाई से कुछ शत्रुता",
                english:
                    "Unhappiness from the house ofmother and children, gets deficiency in getting happiness and education, feels happiness in age and daily routine, speaks somewhat bitterly, some enmity with brother",
            },
            7: {
                hindi: "पत्नी के घर में कष्ट, पिता के घर में हानि, घरेलू शांति में हानि, शिक्षा प्राप्ति में कुछ परेशानियों के बाद शिक्षा से सुख, दैनिक व्यवसाय में कष्ट",
                english:
                    "Feels distress in the house ofwife, loss in the house of father, loss in domestic peace, happiness from education after experiencing some troubles in acquiring it, distress in daily occupation",
            },
            8: {
                hindi: "कूटनीतिज्ञ, दूर की बातों पर विचार करने वाला, शिक्षा व संतान पक्ष में कमी, मातृ भाव में अलगाव, धन भाव में कमी, कुछ रहस्यमयी ज्ञान रखने वाला",
                english:
                    "Is a diplomat, thinks about remote things, deficiency in the side of education and children, separation in the house ofmother, deficiency in the house of wealth, possesses some mysterious knowledge",
            },
            9: {
                hindi: "बहुत बुद्धिमान, भाग्य से सुखी, दृढ़ शिक्षा पाता है, संतान सुखी, भाग्यशाली, सुखी और न्यायप्रिय होता है।",
                english:
                    "Is very wise, happiness from destiny, gets firm education, happiness of children, is fortunate, happy and just",
            },
            10: {
                hindi: "पिता के घर में शत्रुता, माता से सुख, संतान पक्ष में पराक्रम, पत्नी के घर में कमी व भूल का अनुभव, वाणी से पत्नी को कष्ट, व्यवसाय में कुछ कमजोरी, भवन का स्वामी व सुखी होता है।",
                english:
                    "Enmity in the house of father, gets happiness from mother, gets power in the side of children, feels deficiency and mistakes in the house ofwife, hurts wife by speech, some weakness in occupation, possesses buildings and is happy",
            },
            11: {
                hindi: "भारी लाभ और सुख मिलता है, संतान से कुछ सुख मिलता है, आय भाव में चिंता रहती है",
                english:
                    "Gets heavy gains and happiness, some happiness from children, worried in the house of income",
            },
            12: {
                hindi: "सुख प्राप्ति के लिए अधिक व्यय करता है, व्यय से ही सुख का अनुभव करता है, मातृभूमि में अभाव पाता है, बुद्धि और विद्या में कुछ दुर्बलता होती है, संतान पक्ष में हानि होती है तथा सुख कम मिलता है, कुटुम्ब से घोर शत्रुता होती है तथा धन संचय होता है।",
                english:
                    "Spends much to get happiness, feels happiness only by expenditure, gets deficiency in his mother country, some weakness in intellect and education, gets loss in the side of children and gets little happiness, great enmity in connection with family and hoarding of wealth",
            },
        },
        Rahu: {
            1: {
                hindi: "बड़ी युक्ति और चतुराई से काम निकलवाता है, बहुत सतर्क रहता है, शारीरिक और मानसिक रूप से चिंतित रहता है, कुछ प्रसिद्धि पाता है, शरीर पर विशेष प्रहार सहता है, घबराता है",
                english:
                    "Gets the work done with great tactics and cleverness, is very cautious, physically and mentally worried, gets some fame, bears special blows on body, becomes nervous",
            },
            2: {
                hindi: "धन संचय के स्थान पर कुछ दुःख, कुटुम्ब के सम्बन्ध में कुछ क्लेश, धन और जन पर भयंकर आघात।",
                english:
                    "Some unhappiness in the place ofaccumulating wealth, some distress in connection with family, bears severe blows on wealth and people",
            },
            3: {
                hindi: "भाईयों के घर में हानि, गुप्त शक्तियों का प्रयोग, कुछ निष्क्रिय और आलसी, शरीर में कुछ कमजोरी",
                english:
                    "Loss in the house ofbrothers, uses occult power, somewhat inactive and lazy, gets some weakness in physique",
            },
            4: {
                hindi: "सुख के साधनों में कुछ कमी, माता के घर में कुछ कमजोरी, निवास स्थान में अशांति, भवन और भूमि के घर में बाधा",
                english:
                    "Some deficiency in the means of happiness, some weakness in the house of mother, restlessness in the residential place, hindrance in buildings and the house of land",
            },
            5: {
                hindi: "शिक्षा प्राप्ति में कठिनाई, संतान पक्ष में कुछ परेशानी",
                english:
                    "Gets difficulties in getting education, some trouble in the side of children",
            },
            6: {
                hindi: "रोग आदि कठिनाइयों पर विजय प्राप्त करता है, शत्रुओं को परास्त करता है, सावधान, सतर्क एवं स्वार्थी होता है।",
                english:
                    "Gets victory over the difficulties like diseases etc, defeats the enemies, is careful, alert and selfish",
            },
            7: {
                hindi: "पत्नी पक्ष में कुछ कष्ट, दैनिक कार्य की चिंता, अंगों में विकार",
                english:
                    "Some distress in the side ofwife, bears worries in the side of daily occupation, gets some disorder in organs",
            },
            8: {
                hindi: "जीवन में कुछ कष्ट, दिनचर्या अनुचित तरीके से व्यतीत होना, पेट संबंधी विकार या कब्ज या गुदा या पेट के निचले हिस्से में विकार, पैतृक धन की हानि, दीर्घायु भाव में घातक आघात",
                english:
                    "Some distress in life, spends the daily routine in an improper way, gets some disorders of stomach or constipation or disorder in anus or in the lower part of stomach, loss in hereditary wealth, fatal blows in the house of longevity",
            },
            9: {
                hindi: "भाग्य वृद्धि के लिए प्रयास करता है, धर्म की बहुत अधिक चर्चा करता है, भाग्य पक्ष में कमजोरी पाता है",
                english:
                    "Makes efforts to increase fortune, speaks too much about Dharma, gets weakness in the side ofdestiny",
            },
            10: {
                hindi: "पिता के घर में कुछ हानि, सरकार और समाज में कुछ परेशानी और व्यापार के घर में कुछ परेशानी",
                english:
                    "Some loss in the house offather, some distress in government and society and the house ofbusiness",
            },
            11: {
                hindi: "लाभ बहुत हुआ, लाभ में कुछ कमजोरी भी",
                english: "Gains much, also some weakness in the gains",
            },
            12: {
                hindi: "बहुत अधिक खर्च करता है, व्यय भाव में कुछ अपूर्णता होती है, व्यय भाव में अल्पता होती है",
                english:
                    "Spends much, some incompleteness in the house of expenditure, bears deficiently in the house of expenditure",
            },
        },
        Ketu: {
            1: {
                hindi: "शरीर में कुछ दुर्बलता, स्वयं में कुछ अपूर्णता, अभिमान और वीरता से जीवन व्यतीत करना, कष्ट सहना, अपने स्थान पर स्थायी रूप से रहना तथा अपना कार्य करना, हठी होना।",
                english:
                    "Some weakness in body, some incompleteness in himself, lives in a manner ofpride and bravery, works in hardships, stays permanently at his place and pursues his work, is obstinate",
            },
            2: {
                hindi: "धन भाव में कुछ हानि, कुटुम्ब में कुछ हानि, अचानक हानि, धन संचय हेतु कठोर परिश्रम",
                english:
                    "Some loss in the house of wealth, some loss of family, faces sudden losses, toils hard for accumulating wealth",
            },
            3: {
                hindi: "बहुत परिश्रमी, भाई के घर में कुछ विशेष व अपूर्ण महत्व, बहुत प्रभावशाली, परिश्रमी व मेहनती, चालाक व हिंसक होता है।",
                english:
                    "Toils very hard, some special and incomplete importance in the house ofbrother, is very influential, hard worker and diligent, is cunning and violent",
            },
            4: {
                hindi: "माता के घर में सुख की हानि, कुछ बेचैन और चतुर होता है।",
                english:
                    "Loss in the house ofmother and happiness, somewhat restless and is clever",
            },
            5: {
                hindi: "शिक्षा प्राप्ति में बड़ी कठिनाई का सामना करना पड़ता है, संतान पक्ष से कष्ट होता है, बुद्धि में कुछ चिंताएं होती हैं।",
                english:
                    "Faces great troubles to get education, gets distress in the side of children, has some anxieties in wisdom",
            },
            6: {
                hindi: "शत्रुओं पर भारी प्रभाव रखता है, दादा के घर में कम मिलता है, धैर्य और साहस रखता है, रोगों से मुक्ति के लिए प्रयत्नशील रहता है और निडर स्वभाव का होता है।",
                english:
                    "Keeps huge influence on enemies, gets less in the house of grandfather, has patience and courage, makes efforts to free from diseases and is of fearless nature",
            },
            7: {
                hindi: "पत्नी के घर में हानि और क्लेश, परिवार में चिंताएं, दैनिक कार्य में हानि और चिंताएं, व्यवसाय से संबंधित बाधा और सुख में कमी",
                english:
                    "Loss and distress in the house of wife, gets anxieties in family, gets loss and worries in daily occupation, feces hindrances and happiness in connection with occupation",
            },
            8: {
                hindi: "जीवन में कुछ शिथिलता, दिनचर्या में कुछ कमजोरी और अधूरापन, पैतृक संपत्ति में कमजोरी, पेट संबंधी कुछ विकार",
                english:
                    "Gets some resdessness in his life, some weakness and incompleteness in his daily routine, weakness in hereditary wealth, has some stomach disorder",
            },
            9: {
                hindi: "भाग्य में सुख, बदनामी, धर्म में कमजोरी, ईश्वर में कम विश्वास",
                english:
                    "Happiness in destiny, is defamed, gets weakness ofDharma, keeps less faith in God",
            },
            10: {
                hindi: "पिता के घर में हानि, व्यापार और व्यवसाय में हानि, मानसिक चिंताएं, सरकार का विरोध",
                english:
                    "Loss in the house offather, bears losses in the business and occupation, bears mental anxieties, and opposes the government",
            },
            11: {
                hindi: "अपनी आय को बढ़ाने के लिए प्रयास करता है, भारी लाभ प्राप्त करता है, आय भाव में कुछ रुकावटें आती हैं",
                english:
                    "Tries for the great strength ofhis income, gets huge gains, some hindrance in the house of income",
            },
            12: {
                hindi: "निर्धारित तरीके से खर्च करता है, व्यय के मामले में कुछ कमजोरी होने पर भी बहुत साहसपूर्वक काम करता है।",
                english:
                    "Spends in a determined way, works very boldly even in having some weakness in the matters of expenditure.",
            },
        },
    },
    Scorpio: {
        Sun: {
            1: {
                hindi: "राजसी वैभव प्राप्त करता है, बहुत प्रतापी और प्रभावशाली होता है, बहुत अभिमानी होता है, आदेशानुसार कार्य करवाता है, पत्नी के घर में कुछ कमी होती है, यौन सुख प्राप्त करता है, पिता के घर में शक्ति प्राप्त करता है, बहुत बड़ा व्यापार करता है, सुंदर वस्त्र और आभूषण पहनता है, वैभव और गर्व के साथ व्यवसाय करता है।",
                english:
                    "Gets royal grandeur, is very glorious and influential, gets much pride, gets his work done by order, some deficiency in the house of wife, gets sexual pleasures, gets the power in the house of father, conducts a very big business, wears beautiful garments and ornaments, does the occupation with grandeur and pride",
            },
            2: {
                hindi: "अपने व्यापार और व्यवसाय से बहुत धन कमाता है, सरकार और समाज से लाभ उठाता है, परिवार में प्रभाव प्राप्त करता है, वंशानुगत लाभ प्राप्त करता है, बहुत मेहनती और सम्माननीय होता है",
                english:
                    "Earns a lot of wealth from his business and occupation, enjoys gains from government and society, gets influence in family, gets hereditary gains, is very industrious and honourable",
            },
            3: {
                hindi: "बहुत ऊर्जावान और मेहनती, पिता और भाई के घर की शक्ति प्राप्त करता है, कुछ दुश्मनी के साथ, अपने परिश्रम से प्रगति करता है, सम्मान और प्रतिष्ठा प्राप्त करता है, भाग्यशाली कहा जाता है, प्रसिद्धि अर्जित करता है, पूर्ण सफलता प्राप्त करने में असमर्थ।",
                english:
                    "Very energetic and industrious, gets the power ofthe house offather and brother with some enmity, progresses through his diligence, gets respect and honour, is said to be fortunate, earns fame, unable to get full success",
            },
            4: {
                hindi: "व्यवसाय को कुछ खुशी के साथ चलाता है, लेकिन कुछ बाधाओं को सहन करता है, भूमि का सामान्य लाभ प्राप्त करता है, खुशी और वैभव में कुछ बाधाओं को सहन करता है, सम्मानित और वफादार होता है",
                english:
                    "Conducts the occupation with some happiness, but bears some hindrances, gets the ordinary gains oflands, bears some hindrances in the happiness and grandeur, is respectable and loyal",
            },
            5: {
                hindi: "बहुत चतुर, व्यापार के बारे में बहुत ज्ञान रखने वाला, शिक्षा को व्यावहारिक और कूटनीतिक तरीकों से प्राप्त करने वाला, संतान उत्पन्न करने वाला, व्यापार से बहुत लाभ प्राप्त करने वाला, सदैव अपनी उन्नति में लगा रहने वाला, सदैव अपने स्वार्थ पर ध्यान देने वाला",
                english:
                    "Is very clever, possesses great knowledge about business, acquires and uses the education in practical and diplomatic ways, gets children, gains much from business, always engaged in his progress, always pays attention to his selfishness",
            },
            6: {
                hindi: "शत्रुओं पर विजय प्राप्त करता है, व्यय पक्ष में कुछ कमजोरी पाता है, अन्य स्थानों से सम्पर्क प्राप्त करता है, चिन्ता एवं कठिनाइयों से विचलित नहीं होता, बड़ी युक्तियों से यश एवं प्रतिष्ठा अर्जित करता है।",
                english:
                    "Gets victory over the enemies, gets some weakness in the side of expenditure, gets the contact with other places, does not get perplexed due to worries and difficulties, earns his fame and reputation through great tactics",
            },
            7: {
                hindi: "राजसी ढंग से व्यवसाय करता है, कुछ कठिनाइयाँ होने पर भी व्यवसाय में कुछ प्रतिष्ठा प्राप्त करता है, पत्नी के घर में कुछ शत्रुता के साथ सम्मान प्राप्त करता है, क्रोधी पत्नी प्राप्त करता है, पत्नी और यौन सुख में कुछ कमी होती है, चतुर होता है।",
                english:
                    "Does the occupation in a majestic way, gets some dignity in occupation even on having some difficulties, gets the honour with some enmity in the house ofwife, gets a temperamental wife, some deficiency in the side of wife and sexual pleasures, is clever",
            },
            8: {
                hindi: "पिता के घर में हानि होती है, मान-सम्मान में कमी महसूस होती है, अनेक विदेश में कठिन परिश्रम करता है, उन्नति के लिए कष्ट उठाता है, धन प्राप्ति के लिए अनेक प्रयास करता है, दीर्घायु तथा जीवन की दिनचर्या में उन्नति पाता है।",
                english:
                    "Gets loss in the house of father, feels deficiency in respect and honour, tries hard in many foreign countries, bears troubles to achieve progress, puts in many efforts in getting wealth, gets progress in longevity and in the daily routine of life",
            },
            9: {
                hindi: "बहुत भाग्यशाली होता है और धार्मिक कर्तव्यों का पालन करता है, दैवीय शक्ति के चमत्कारों में बहुत आनंद प्राप्त करता है, बड़ा व्यवसाय करता है, प्रभावशाली माना जाता है",
                english:
                    "Is very fortunate and performs religious duties, gets much pleasure in the wonders ofthe divine power, pursues big business, is thought to be influential",
            },
            10: {
                hindi: "राजकाज और समाज का वैभव प्राप्त करता है, बड़ा अधिकारी होता है, पिता की परवाह नहीं करता, माता के घर में कुछ विरोध होता है, तथा बेचैन रहता है।",
                english:
                    "Gets the splendour of government and society, has great authority, does not care for father, some opposition in the house of mother, and is restless",
            },
            11: {
                hindi: "भारी लाभ, व्यापार से बहुत धन, पिता के घर से लाभ, शिक्षा में शालीनता, संतान से वैभव, राजनीति के संबंध में अच्छी बातें, अच्छे कर्म, शीघ्रता से कार्य करने से लाभ।",
                english:
                    "Gets heavy gains, earns much wealth from business, gains from the house offather, gets decency in education, gets grandeur ofchildren, can talk well in connection with politics, does good deeds and gets gains by working swiftly",
            },
            12: {
                hindi: "पिता के घर की हानि, व्यापार और व्यवसाय में हानि, मान-सम्मान की हानि, व्यय भाव में कष्ट, शत्रु भाव में कुछ प्रभाव, रोगों की परवाह न करना, गुप्त शक्तियों से युक्त होना।",
                english:
                    "Loss ofthe house offather, gets loss in business and occupation, gets loss ofrespect and honour, bears distress in the house ofexpenditure, some influence in the house ofenemies, does not care for diseases, has occult power",
            },
        },
        Moon: {
            1: {
                hindi: "मानसिक चिंताएं और भाग्य की कुछ कमजोरी होती है, व्यवसाय के लिए कठिन परिश्रम करता है, दुबला शरीर प्राप्त करता है, परिवार का पूरा ध्यान रखता है, पत्नी और भोग आदि में विशेष मानसिक आकर्षण रखता है, मानसिक बल और भाग्य बल से व्यवसाय के संबंध में उन्नति करता है, धर्म का अपूर्ण पालन करता है।",
                english:
                    "Gets mental anxieties and some weakness ofdestiny, toils hard for the occupation, gets a lean body, takes full care ofthe family, has special mental fascination in wife and in the side ofsexual pleasures etc, progresses in connection with occupation by mental power and the power of destiny, rears Dharma incompletely",
            },
            2: {
                hindi: "बहुत भाग्यशाली और धनवान होता है, भाग्य की शक्ति से बहुत धन प्राप्त करता है, परिवार का सुख पाता है, सांसारिक मामलों में सफलता प्राप्त करता है, आयु में वृद्धि करता है",
                english:
                    "Is very fortunate and wealthy, gets a lot ofwealth by the pow* of destiny, gets pleasures of family, gets the success in worldly affairs, increases in age",
            },
            3: {
                hindi: "बहुत उत्साही और भाग्यशाली, धार्मिक और ईश्वर भक्त, भाई-बहनों से अप्रत्याशित खुशी प्राप्त करता है, प्रगति के लिए सदैव उच्च विचारों के साथ कार्य करता है।",
                english:
                    "Very enthusiastic and fortunate, religious and a devotee to God, gets unforeseen joy ofbrothers and sisters, always works with lofty ideas for progress",
            },
            4: {
                hindi: "बहुत भाग्यशाली, बहुत सुख भोगने वाला, धर्म-कर्म का पालन-पोषण करने वाला, माता और भूमि का सुख भोगने वाला, बड़ा व्यापार करने वाला, ईश्वर में विश्वास रखने वाला और परिश्रमी होता है।",
                english:
                    "Is very fortunate, enjoys much happiness, rears religious duties, enjoys the happiness of mother and the house of land, does a big business, believes in God and is diligent",
            },
            5: {
                hindi: "बहुत बुद्धिमान, शिक्षित, दूरदर्शी, संतान की ओर से बहुत भाग्यशाली, बहुत मीठा बोलने वाला और गुणवान होता है।",
                english:
                    "Is very intelligent, educated, farsighted, is very fortunate from the side ofchildren, speaks very sweetly and is virtuous",
            },
            6: {
                hindi: "धर्म और ईश्वर में कम आस्था, भाग्य पक्ष में कुछ कमजोरी, व्यय के साधन अधिक, शत्रु पक्ष में विरोध",
                english:
                    "Has less faith in Dharma and God, gets some weakness in the side of destiny, gets more means ofexpenditure, gets opposition in the side of enemies",
            },
            7: {
                hindi: "पत्नी के घर का सुख और लाभ मिलता है, व्यवसाय में भारी लाभ मिलता है",
                english:
                    "Gets happiness and advantages of the house of wife, gets heavy gains in occupation",
            },
            8: {
                hindi: "मानसिक कष्ट सहता है, अनेक कष्ट उठाता है, धन की वृद्धि के लिए अनेक मानसिक चिंताएं करता है, धर्म की हानि करता है, उत्तम आयु प्राप्त करता है, धन प्राप्ति के लिए न्याय-अन्याय की परवाह नहीं करता।",
                english:
                    "Bears mental distress, feces many troubles, has many mental anxieties for the increase ofwealth, injures Dharma, gets good age, does not care for justice or injustice for getting wealth",
            },
            9: {
                hindi: "बहुत भाग्यशाली होता है और प्रसिद्धि पाता है, धर्म का पालन बहुत अच्छी तरह से करता है, भाई का सहयोग पाता है और हंसमुख स्वभाव का होता है",
                english:
                    "Is very fortunate and gets fame, rears the Dharma very decently, gets the cooperation of the brother and is a jolly fellow",
            },
            10: {
                hindi: "बहुत भाग्यशाली होता है, सरकार से सुख प्राप्त करता है, बहुत अच्छे कर्म और व्यापार करता है, माता का सहयोग प्राप्त करता है।",
                english:
                    "Is very fortunate, gets the happiness from government, does many good deeds and business, gets the help of mother",
            },
            11: {
                hindi: "भाग्यबल से शानदार लाभ प्राप्त करता है, आय पक्ष से कैरियर प्राप्त करता है, शिक्षा के घर का उचित उपयोग करता है, संतान का सुख प्राप्त करता है, बहुत भाग्यशाली और दयालु होता है।",
                english:
                    "Gets splendid gains due to the power of destiny, gets careireeness from the side ofincome, uses the house ofeducation properly, gets the happiness of children, is very fortunate and kind",
            },
            12: {
                hindi: "भाग्य में कमजोरी का सामना करना पड़ता है, व्यय के प्रबंधन में भाग्य का सहयोग मिलता है, शत्रुओं के घर से तथा नाना के परिवार से कुछ मेल-मिलाप होता है।",
                english:
                    "Faces weakness in destiny, gets the support ofdestiny in managing the expenditure, gets some conciliation from the house of enemies and in the maternal grandfather's family",
            },
        },
        Mars: {
            1: {
                hindi: "प्रभावशाली और नाटे शरीर वाला, क्रोधी और अभिमानी, शरीर में गर्मी के कारण कोई विकार या रोग, माता का नाश, भवन और सुख-शांति में कष्ट, पत्नी के घर में अशांति और क्लेश, व्यवसाय में कष्ट, बहुत साहसी।",
                english:
                    "Is influential and possesses a short body, is furious and proud, some disorder in the body due to heat in the shape ofsome diseases, faces loss of mother, gets difficulties about buildings and in peace and happiness, gets some restlessness and distress in the house of wife, bears some difficulties in occupation, is very courageous",
            },
            2: {
                hindi: "शरीर से धनवान, धन प्राप्ति के लिए सदैव विशेष प्रयत्नशील, धन संचय के लिए कठोर परिश्रम करने वाला, विद्या प्राप्त करने वाला, संतान पक्ष से कुछ शत्रुता रखने वाला, नीच धर्म का पालन करने वाला।",
                english:
                    "Rich due to his physique, always puts in special efforts for getting wealth, toils hard for accumulating wealth, acquires education, some enmity in the side of children, follows low Dharma",
            },
            3: {
                hindi: "बहुत प्रभावशाली होता है, बड़े-बड़े काम करके मान-सम्मान पाता है, नाना के घर में पराक्रमी होता है, विघ्न-बाधाओं पर विजय पाता है, शत्रुओं पर पूर्ण प्रभाव रखता है, व्यापार में उन्नति पाता है, पिता के घर में कमजोरी होती है, भाई के घर पर अपनी कठोरता बनाये रखता है तथा स्वाभिमानी होता है।",
                english:
                    "Is very influential, gets dignity by doing grand deeds, strength in maternal grandfather's house, gets victory over hindrances, acquires full influence over enemies, gets progress in business, weakness in the house of father, keeps his severity over on the house of brother and is Ml of self-respect",
            },
            4: {
                hindi: "माता पक्ष में कुछ हानि, सुख में कुछ हानि, अपने ही स्थान पर रहता है, दैनिक कार्य करता है, पत्नी के घर में कुछ विरोध का सामना करता है, भारी लाभ प्राप्त करता है तथा सरकार और समाज में कुछ सम्मान प्राप्त करता है और कुछ भूमि का स्वामी होता है।",
                english:
                    "Some loss in the side ofmother, some loss in happiness, lives in his own place does daily occupation faces some opposition in the, , house ofwife, acquires heavy gains and some honour in government and society and possesses some land",
            },
            5: {
                hindi: "बुद्धिमान, चतुर, आत्म-दृष्टि वाला, गर्म स्वभाव का कूटनीतिज्ञ, आय प्राप्ति के लिए अत्यधिक प्रयास करने वाला, अधिक व्यय करने वाला, पुत्र पक्ष में विरोध एवं चिंता का सामना करने वाला, शरीर में कुछ रोग होने वाला होता है।",
                english:
                    "Is wise, clever, self-sighted and a diplomat of hot temperament, makes great efforts to get the income, spends much, faces opposition and worries in the side of son, some diseases in the body",
            },
            6: {
                hindi: "बहुत वीर, गठीले शरीर वाला, शत्रुओं की परवाह न करने वाला, इच्छाशक्ति से सम्मान पाने वाला, धर्म के घर में कुछ दुर्बल, जटिल उपायों से अपना काम निकालने वाला, शरीर में थकान अनुभव करने वाला, द्वेषी होता है।",
                english:
                    "Is very brave, has a stout body, does not care about the enemies, gets honour through will-power, some weakness in the house ofDharma, gets his work done through intricate means, feels fatigue in the body, and is caustic",
            },
            7: {
                hindi: "पत्नी भाव में कुछ शत्रुता, शक्ति, संघर्ष और लाभ, व्यवसाय भाव में परिश्रमपूर्वक कार्य करने वाला, भावुक और यौन सुख प्राप्त करने वाला, अहंकारी, शरीर और अंगों में कुछ कष्ट और रोग प्राप्त करने वाला, धन और सम्मान का विशेष ध्यान रखने वाला, सरकार और समाज में कुछ शक्ति और प्रभाव वाला, सम्माननीय होता है।",
                english:
                    "Some enmity, power, struggle and benefits in the house of wife, works diligently in the house of profession, passionate and gets sexual pleasures, is self-conceited, gets some troubles and diseases in the body and in the organs, takes particular care of wealth and honour, some power and influence in the side of government and society, and is respectable",
            },
            8: {
                hindi: "रोगग्रस्त, हृदय में सूजन, परदेश में निवास, क्लेशों से घिरा, प्रयत्न करने पर धन प्राप्त, भाई से बहुत प्रेम, अपमान की परवाह न करने वाला",
                english:
                    "Gets diseases, gets inflammation of heart, lives in a foreign place, engulfed in troubles, gains wealth after putting in efforts, loves his brother very much, does not care about insult",
            },
            9: {
                hindi: "भाग्य की कमजोरी महसूस होती है, शरीर और धर्म में कमजोरी आती है, परिश्रम से चिंता होती है, अधिक खर्च होता है, माता के पक्ष में कमजोरी होती है, भूमि और सुख के साधनों पर अधिकार करने के लिए प्रयास करता है",
                english:
                    "Feels the weakness of destiny, gets weakness in body and Dharma, gets worries due to labour, spends much, weakness in the side of mother, puts in efforts to get possession of land and means of happiness",
            },
            10: {
                hindi: "बहुत शक्तिशाली, शरीर का सुख भोगने वाला, कामी, चतुर, परिश्रमी, पिता के घर की उन्नति करने वाला, सरकार और समाज में सम्मान पाने वाला, माता से विरोध, संतान से शक्ति पाने वाला, बहुत बुद्धिमान और विद्वान, दृढ़ता से बोलने वाला, आज्ञाकारी शक्ति और प्रसिद्धि पाने वाला होता है।",
                english:
                    "Is very powerful, enjoys the pleasure ofphysique, is lustful, clever, diligent, secures the progress ofthe house of father, gets honour in the government and society, opposition in mother, gets the power ofchildren is very wise and learned, speaks firmly, gets commanding power and fame",
            },
            11: {
                hindi: "शारीरिक श्रम से भारी आय प्राप्त करने वाला, प्रभावशाली, बहुत अच्छे कार्य करने वाला, संतान के घर में कुछ कष्ट, शत्रुओं पर विजय, शरीर में कुछ दुर्बलता, क्रोधी एवं सतर्क होता है।",
                english:
                    "Acquires a heavy income through physical labour and is influential, undertakes very decent deeds, some trouble in the house ofchildren, victors over enemies, gets some weakness in body, is furious and cautious",
            },
            12: {
                hindi: "शारीरिक कष्ट, दुर्बल शरीर, व्यय की समस्या से चिन्तित, झगड़ों और रोगों में व्यय करने वाला, परदेश में रहने वाला, भाइयों से प्रेम करने वाला, दुर्बल अवस्था में भी प्रभाव बनाए रखने वाला और अपना व्यवसाय चलाने वाला, पत्नी और परिवार से अप्रसन्न, यौन सुख चाहने वाला और उसे प्राप्त करने के लिए विशेष प्रयत्न करने वाला, चंचल बुद्धि वाला और अधिक भटकने वाला होता है।",
                english:
                    "Experiences troubles in physique, has a weak body, worried about problems of expenditure, spends in matters relating to quarrels and diseases, lives in foreign places, loves brothers, maintains the influences and pursues his occupation even in the weak position, unhappiness with wife and family, wants sexual pleasures and puts special efforts in acquiring the same, is fickle-minded and wanders much",
            },
        },
        Mercury: {
            1: {
                hindi: "लाभ और आय प्राप्त करता है, सौम्य व्यवहार और सौम्य स्वभाव का होता है, दीर्घायु होता है, व्यवसाय में लाभ होता है, आय के बल पर परिवार का पूर्ण ध्यान रखता है।",
                english:
                    "Gets gains and income, is ofgentle behaviour and gentle nature, has a long life, gains in occupation, takes full care offamily through the power of income",
            },
            2: {
                hindi: "धन संचय में सफलता मिलती है, कुछ हानि भी होती है, जीवन के दैनिक जीवन में उच्च जीवन स्तर के कारण धन संचय में कुछ कमी आती है, दीर्घायु होता है, सम्मानीय होता है और धन का आनंद लेता है, भारी लाभ प्राप्त करता है।",
                english:
                    "Gets success in accumulating wealth, faces some losses also, gets some deficiency in accumulating wealth on account ofrich standard ofliving in the daily routine oflife, has a long life, is respectable and enjoys riches, gets heavy gains",
            },
            3: {
                hindi: "पुरुषार्थपूर्वक ऊर्जावान कार्य करने वाला, दीर्घायु, भाई-बहनों के साथ घनिष्ठ संबंध रखने वाला, कुछ कष्ट सहने वाला, धर्म के संबंध में स्वार्थपूर्ण युक्तियां रखने वाला",
                english:
                    "Does energetic deeds in a gende manner, has a long life, intimacy in connection with brothers and sisters with some hardship, selfish tactics in connection with Dharma",
            },
            4: {
                hindi: "कुछ बाधाओं के साथ सुखपूर्वक धन अर्जित करता है, दीर्घायु होता है, रहस्यमयी उपकरणों से सुख प्राप्त करता है",
                english:
                    "Acquires the income happily mixed with some hindrances, has a long life, gets happiness from mysterious devices",
            },
            5: {
                hindi: "बुद्धि और विद्या में कुछ दुर्बलता, अल्प शिक्षा, संतान पक्ष में कुछ हानि, आयु में कुछ दुर्बलता, जीवन में कुछ कष्ट, कटु वचन बोलने वाला, गोपनीयता बनाए रखने वाला।",
                english:
                    "Gets some weakness in intellect and education, possesses little education, some loss in the side of children, feels some weakness in age, finds some sufferings in his life, speaks bitterly and maintains secrecy",
            },
            6: {
                hindi: "आय प्राप्ति के लिए जीवन में चिंताएं और निर्भरता रहती है, कुछ कष्टकारी कार्यों से थोड़ा-बहुत धन कमाता है, अपने दैनिक जीवन का सदुपयोग नहीं कर पाता, चिंताओं का सामना करता है, गुप्त योजनाओं का प्रयोग करता है।",
                english:
                    "Gets worries and dependence in life for acquiring income, earns a little through some troublesome deeds, unable to make good use of the daily routine or his life, faces anxieties, uses secret schemes",
            },
            7: {
                hindi: "पत्नी के घर में सुख के साथ-साथ गुप्त कष्ट भी सहता है, विवाह के बाद सुख मिलता है, यौन सुख के संबंध में पहले से अधिक अप्रत्यक्ष लाभ मिलता है, व्यवसाय में लाभ मिलता है, कड़ी मेहनत करता है।",
                english:
                    "Bears hidden distress in addition to happiness in the house ofwife, happiness after marriage, gets more of indirect advantages than the existing ones in connection with sexual pleasures, gets gains in occupation, works hard",
            },
            8: {
                hindi: "लंबी आयु प्राप्त करता है, जीवन की दिनचर्या में वैभव और भव्यता प्राप्त करता है, बहुत लापरवाह होता है और जीवन की दिनचर्या में सख्ती और कोमलता दोनों का प्रयोग करता है।",
                english:
                    "Gets a long life, gets glory and grandeur in the daily routine oflife, is very careless and uses both strictness and tenderness in the daily routine of life",
            },
            9: {
                hindi: "भाग्यबल से आय, वंशानुगत लाभ, अधूरा कार्य, जीवन की दिनचर्या में आनंद, दीर्घायु, यश में कुछ कमी",
                english:
                    "Income through power of destiny, gets hereditary gains, leaves the worii incomplete, feels pleasure in the daily routine of life, gets a long life, some deficiency in fame",
            },
            10: {
                hindi: "मान-सम्मान की प्राप्ति, वंश-परंपरा से लाभ, पिता के घर में कष्ट, दीर्घायु, प्रभावशाली कार्य करने वाला जीवन, मान-सम्मान में बाधा, पद-वृद्धि।",
                english:
                    "Gains respect and honour, gets the hereditary gains, distress in the house offather, gets a long life, spends the life doing very influential deeds, hindrances in connection with respect and honour for the rise ofposition",
            },
            11: {
                hindi: "दीर्घायु, बुद्धि और शिक्षा में कुछ कमजोरी, संतान पक्ष में कुछ कष्ट, बोलने में कमजोरी, रूखा वार्तालाप",
                english:
                    "Has a long life, gets some weakness in intellect and in education, some distress in the side of children, weakness while speaking, rude conversation",
            },
            12: {
                hindi: "बहुत अधिक खर्च, अन्य स्थानों का सम्पर्क, जीवन के उत्तरार्ध में लाभ, व्यय से लाभ, लाभ में कमजोरी, दीर्घायु भाव में तंत्रिका युति, कुछ संघर्ष और रोग आदि।",
                english:
                    "Spends too much, gets the contact of other places, gets the gains through the later period of life, gains from expenditure, gets the weakness in the gains, nervous conjunction in the house oflongevity, some struggles and diseases etc",
            },
        },
        Jupiter: {
            1: {
                hindi: "बहुत बुद्धिमान, विद्वान, धार्मिक और कूटनीतिज्ञ होता है, धन की प्राप्ति होती है, संतान होती है, पुत्र के माध्यम से उन्नति होती है, परिवार और व्यवसाय का बहुत ध्यान रखता है, न्याय प्रिय, ज्योतिष प्रिय, आध्यात्मिक ज्ञान रखता है, प्रभावशाली होता है, ईश्वर में आस्था रखता है।",
                english:
                    "Is very wise, learned, religious and is a diplomat, gets the strength ofwealth, gets children, gets progress through son, takes great care of family and occupation, loves justice, loves astrology, possesses spiritual knowledge, influential, keeps faith in God",
            },
            2: {
                hindi: "बुद्धि और विद्या के बल से धन संचय करता है, सरकार और समाज से लाभ प्राप्त करता है, संतान प्राप्त करता है",
                english:
                    "Accumulates wealth through the power of intellect and education, gets advantage from the government and society, gets children",
            },
            3: {
                hindi: "अपने भाइयों को हानि पहुँचाता है, कुटुम्बियों के घर में दुर्बलता होती है, शिक्षा में दुर्बलता होती है, धार्मिक होता है, ईश्वर में अगाध आस्था रखता है, व्यवसाय के घर से भारी लाभ प्राप्त करता है, पत्नी से सहयोग प्राप्त करता है, यौन सुखों का आनंद लेता है, तथा कमजोर हृदय का होता है।",
                english:
                    "Causes injury to his brothers, weakness in the house ofkith and kin, gets weakness in education, is religious, has great faith in God, enjoys heavy gains from the house of occupation, gets cooperation from the wife, enjoys sexual pleasures, ahd is of weak heart",
            },
            4: {
                hindi: "धनवान, बुद्धिमान और प्रतिष्ठित होता है, संतान प्राप्त करता है, दीर्घायु होता है, अधिक खर्च करता है, सुख में दुर्बलता अनुभव करता है, माता से सहयोग प्राप्त करता है, पिता से लाभ प्राप्त करता है, जीवन की दिनचर्या कुलीन ढंग से व्यतीत करता है, धन के रख-रखाव और संचय में कुछ कठिनाइयों का अनुभव करता है।",
                english:
                    "Is rich, intelligent and respectable, gets children, gets a long life, spends much, feels weakness in happiness, gets cooperation from mother, receives advantage from father, spends the daily routine of life in an aristocratic manner, experiences some difficulties in maintaining and accumulating wealth",
            },
            5: {
                hindi: "बहुत विद्वान और शिक्षित, गरिमा के साथ बोलने वाला, धार्मिक और आध्यात्मिक विषयों पर अधिकार और ज्ञान रखने वाला, संतान प्राप्त करने वाला, भारी लाभ पाने वाला, बुद्धि से धनवान, वैज्ञानिक ज्ञान रखने वाला और बहुत भाग्यशाली होता है।",
                english:
                    "Is very learned and educated, speaks with dignity, possesses authority and knowledge on religious and spiritual, gets children, gets heavy gains, gets rich through wisdom, possesses scientific knowledge, and is very fortunate",
            },
            6: {
                hindi: "कुछ निर्भरता और कठिनाई से नियमित रूप से धन अर्जित करता है, शत्रुओं के घर में चतुराई से अपना काम निकलवाता है, धन संचय के लिए अधिकाधिक प्रयास करता है, संतान और शिक्षा में दुर्बलता पाता है, अधिक खर्च करता है और अपनी बात ठीक से नहीं रख पाता।",
                english:
                    "Earns wealth regularly with some dependence and difficulty, gets his work done cleverly in the house of enemies, puts in more and more efforts to accumulate wealth, gets weakness of children and education, spends much and is unable to put forward his views properly",
            },
            7: {
                hindi: "दैनिक कार्य से धन अर्जित करता है, कोई सम्मानजनक व्यवसाय करता है, भाई के घर में कुछ कमजोरी होती है, विवाह के बाद पत्नी से धन में वृद्धि होती है, संतान प्राप्ति होती है तथा पत्नी में प्रभाव होता है, तथा सतर्क रहता है।",
                english:
                    "Earns wealth through daily occupation, does some respectable occupation, has some weakness in the house ofbrother, increased wealth from wife after marriage, gets children and influence in wife and is cautious",
            },
            8: {
                hindi: "अल्प शिक्षा और अल्प धन प्राप्त होता है, संतान पक्ष में कष्ट रहता है, मन अशांत रहता है, अधिक धन कमाने के लिए अधिक व्यय करता है, कठोर परिश्रम से कार्य करवाता है, विदेश से सम्पर्क रखता है तथा धन के लिए भी कार्य करता है, सुख के साधनों में कुछ नीरसता, भवन और माता के विषय में चिंता, दीर्घायु होता है, धनवान व्यक्ति के समान जीवन व्यतीत करता है।",
                english:
                    "Gets little education and little wealth, has distress in the side of children, restless in heart, spends much in order to earn more wealth, gets the work done through hard labour, contact with foreign countries and also for wealth, some insipidness in the means of happiness, about buildings and mother, gets a long life, lives like a rich man",
            },
            9: {
                hindi: "बहुत भाग्यशाली, बुद्धिमान, धार्मिक कार्य करने वाला, अच्छे और भाग्यशाली बच्चे वाला, महान सम्मान पाने वाला, ज्योतिष का ज्ञाता, दूरदर्शी, बहुत धनवान, सनातन धर्म का पालन करने वाला, भाई-बहनों की ओर से कुछ कमी वाला, आध्यात्मिक ज्ञान वाला होता है।",
                english:
                    "Is very fortunate, intelligent, does religious deeds, gets good and fortunate children, gets great honour, possess knowledge ofastrology, is farsighted, gets much wealth, rears eternal Dharma, some deficiency from the side ofbrothers and sisters, possesses spiritual knowledge",
            },
            10: {
                hindi: "बहुत प्रतिष्ठित, बहुत धन कमाने वाला, बुद्धि द्वारा सरकार और समाज से धन की शक्ति प्राप्त करने वाला, व्यापार और पिता के घर से धन की शक्ति प्राप्त करने वाला, बड़ा व्यवसाय करने वाला, उत्साही होता है।",
                english:
                    "Is very respectable, earns much wealth, gets the power ofwealth from government and society through intellect, gets the strength of wealth through business and from the house offather, pursues a big occupation, and is zealous",
            },
            11: {
                hindi: "बुद्धि और विद्या से धन कमाता है, संतान सुख पाता है, भाई के घर में कमजोरी होती है, कुछ बेचैनी के साथ व्यवसाय करने से बहुत लाभ होता है, स्त्री और पुरुष का प्रभाव होता है, घरेलू लाभ प्राप्त होता है, धनवान और प्रतिष्ठित होता है।",
                english:
                    "Earns wealth through wisdom and education, gets the happiness of children, weakness in the house ofbrother, gains much by pursuing the occupation with some uneasiness, possesses the influence ofsex and wife, gets domestic gains, is wealthy and respectable",
            },
            12: {
                hindi: "अधिक व्यय, धन में दुर्बलता, संतान पक्ष में भारी हानि, अल्प शिक्षा, शिक्षा प्राप्ति के समय अनेक कठिनाइयों का सामना, गलत वार्तालाप, दूसरों को अपनी बात ठीक से समझा न पाना, सुख-शांति एवं माता के घर में न्यूनता, शत्रु पक्ष से मित्रता, कुलीन जीवन व्यतीत करना।",
                english:
                    "Spends much, weakness in wealth, heavy losses in children's side, gets little education, feces many difficulties at the time of getting education, faces a wrong mode of conversation, is unable to make others understand the ideas properly, deficiency in the house of peace, happiness and mother, possesses the friendship on the side of enemies, spends the life aristocratically",
            },
        },
        Venus: {
            1: {
                hindi: "अच्छा व्यवसाय प्राप्त करता है, वैभवपूर्वक व्यय करता है, बहुत सावधानी से काम करता है, पत्नी के घर में कुछ सुख प्राप्त करता है, अधिक व्यय करता है, पत्नी के कारण कुछ दुर्बलता प्राप्त करता है, व्यवसाय के कारण एक स्थान से दूसरे स्थान पर जाता है, सम्मान प्राप्त करता है, चतुर होता है तथा उच्च स्तर के सुखों का भोग करना चाहता है, सांसारिक कार्यों को बहुत कुशलता से संचालित करता है, कुशल, सावधान और दूरदर्शी होता है, सौंदर्य पसंद करता है।",
                english:
                    "Gets a good occupation, spends majestically, works very carefully, acquires some happiness in the house of wife, spends much, gets some weakness on account ofwife, goes from place to place due to occupation, gets honour, is clever and wants to enjoy pleasures of high standard, conducts the worldly affairs very ably, is skilful, careful and farsighted, likes beauty",
            },
            2: {
                hindi: "व्यवसाय से धन प्राप्त होता है, धन संचय भाव में कुछ कमजोरी आती है तथा धन हानि होती है, अधिक यौन सुख की इच्छा होती है, व्यय पर नियंत्रण रखने का प्रयास करता है।",
                english:
                    "Gets wealth from occupation, gets some weakness in the house of accumulating wealth and gets some monetary loss, wants more sexual pleasures, tries to check the expenditure",
            },
            3: {
                hindi: "कठोर परिश्रम करता है, व्यवसाय में शक्ति लगाता है, पत्नी से उत्साह और यौन सुख प्राप्त करता है, भाई-बहनों से कुछ शक्ति प्राप्त करता है, पत्नी का सहयोग प्राप्त करता है तथा अपनी और पत्नी की शक्ति से व्यय का आनंद लेता है, व्यवसाय में भी न्याय की ओर ध्यान देता है।",
                english:
                    "Labours hard, puts energies in the occupation, gets enthusiasm and sexual pleasures from wife, gets some power ofbrothers and sisters, gets cooperation ofwife and enjoys the expenditure through his own and wife's energies, pays attention towards justice also in occupation",
            },
            4: {
                hindi: "व्यवसाय में कुछ हानि और कमी होती है, माता के घर में कुछ हानि होती है, पत्नी के घर से सुख मिलता है, व्यय और सुखों का आनंद लेता है, पिता के घर में शत्रुता होती है, भूमि का कुछ स्वामित्व प्राप्त होता है, प्रसन्नचित्त होता है।",
                english:
                    "Bears some loss and deficiency in occupation, gets some loss in the house of mother, gets happiness from the house of wife, enjoys expenditure and pleasures, enmity in the house offather, gets some ownership of land, is a jolly fellow",
            },
            5: {
                hindi: "बहुत चतुर, शिक्षित, बुद्धिमान, अधिक खर्च करने वाला, आय में कुछ कमी, प्रभावशाली पत्नी, संतान, उच्च यौन प्रवृत्ति वाला, संतान पक्ष में कुछ कमी, अधिक व्यय के कारण कुछ परेशानी का अनुभव, व्यवसाय के लिए प्रयत्नशील।",
                english:
                    "Is very clever, educated, intelligent, spends much, some deficiency in income, has an influential wife, gets children, possesses a high degree ofsexual instinct, gets some deficiency in the side ofchildren, experiences some perplexity due to heavy expenditure, strives for occupation",
            },
            6: {
                hindi: "पत्नी से विरोध, व्यवसाय में कमजोरी, चिंताओं में उलझकर अधिक व्यय, पारिवारिक सुख में कुछ घरेलू बाधाएं, यौन सुख में कमी, पत्नी पक्ष में अत्यधिक व्यय, बहुत चतुर और सावधान",
                english:
                    "Gets the opposition from his wife, gets weaknesses in occupation spends much being entangled in worries, bears some domestic obstacles in the domestic happiness, gets deficiency in sexual pleasures, bears extraordinary expenditure in wife's side, is very clever and careful",
            },
            7: {
                hindi: "अनेक व्यवसाय करता है, कठोर परिश्रम करता है, व्यवसाय की दृढ़ता पर अधिक व्यय करता है, पत्नी और परिवार से सुख प्राप्त करता है, यौन सुखों का भरपूर आनंद लेता है, व्यवसाय में सौन्दर्य, आकर्षण और कला पर ध्यान देता है तथा व्यवसाय को अच्छी तरह चलाता है, फिर भी व्यवसाय में कुछ कमजोरी होती है, पत्नी से विशेष सम्बन्ध होता है।",
                english:
                    "Pursues many occupations, labours hard, spends much on firmness ofoccupation, gets pleasure ofwife and family, gets sexual pleasures very much, pays attention to beauty, charm and art in occupation and manages the occupation well, yet some weakness in the occupation, has a special relation with wife",
            },
            8: {
                hindi: "पत्नी के घर में कुछ हानि होती है, कुछ कठिनाइयों के साथ व्यवसाय का प्रबंधन करता है, व्यवसाय में बाधाओं का सामना करता है और धन की वृद्धि के लिए उनका प्रबंधन करने में सक्षम होता है, यौन सुख में भारी कमी का अनुभव करता है, गुप्त नीतियों का पालन करता है।",
                english:
                    "Some loss in the house of wife, manages the occupation through some difficulties, faces hindrances in the occupation and is able to manage the same very much for the increase ofwealth, experiences heavy deficiency in the sexual pleasures, pursues secret policies",
            },
            9: {
                hindi: "व्यवसाय की शक्ति मिलती है, भाग्य के कारण व्यय की शक्ति मिलती है, पत्नी और परिवार का सुख कुछ कमजोरी के साथ मिलता है, भाई-बहनों का संयोग कुछ कमजोरी के साथ मिलता है",
                english:
                    "Gets the power of occupation, gets power of expenditure due to destiny, gets some happiness of wife and family mixed with some weakness, gets the conjunction of brothers and sisters with some weakness",
            },
            10: {
                hindi: "व्यवसाय में कुछ उलझनें, पत्नी पक्ष में कुछ कमजोरी, माता पक्ष में संतोषजनक सुख, भवन प्राप्ति, सुख में कमी, यौन सुख अच्छा, पिता के घर में कुछ अशांति",
                english:
                    "Some perplexities in occupation, some weakness in wife's side, satisfactory happiness in the side ofmother, gets buildings, deficiency in happiness, good sexual pleasures, some restlessness in the house of father",
            },
            11: {
                hindi: "कमजोर व्यवसाय, आय में बहुत कमजोरी, पत्नी और परिवार का कमजोर लाभ, यौन सुख में कुछ कमी, व्यय भाव में कुछ लाभ, संतान प्राप्ति",
                english:
                    "Weak occupation, bears much weakness in income, weak advantage of wife and family, some deficiency in the sexual pleasures, some advantage in the house of expenditure, gets children",
            },
            12: {
                hindi: "पत्नी और परिवार की हानि, व्यय की युति से पत्नी और मैथुन का सुख मिलता है, शत्रुओं के घर में काम बनता है",
                english:
                    "Loss ofwife and family, gets the pleasures ofwife and sex through conjunction of expenditure, gets the work done in the house of enemies",
            },
        },
        Saturn: {
            1: {
                hindi: "बहुत ऊर्जावान और उत्साही होता है, भाई-बहनों का सहयोग प्राप्त करता है, व्यवसाय में उन्नति प्राप्त करता है, सरकार और बड़े व्यवसाय के घर में कुछ उलझन होती है, तीखा स्वभाव होता है, यौन सुख चाहता है, उन्नति के लिए कठोर परिश्रम करता है, मेहनती और साहसी होता है।",
                english:
                    "Is very energetic and zealous, gets the power ofbrothers and sisters, acquires progress in occupation, some perplexity in the house of government and big business, possesses pungency, wants sexual pleasures, labours hard for progress, is industrious and courageous",
            },
            2: {
                hindi: "भूमि-सम्पत्ति से आय होती है, धन संचय में सुख मिलता है, माता के सुख में कुछ बंधन रहता है, अच्छी आय होती है, दीर्घायु और दिनचर्या में कुछ सुख मिलता है, धन वृद्धि के लिए सदैव प्रयत्नशील रहता है, सदैव प्रसन्न रहता है।",
                english:
                    "Gets the income from land and property, feels pleasure in accumulating wealth, some bondage in the happiness of mother, gets good income, some happiness in longevity and daily routine, always attempts to increase the wealth, and is always happy",
            },
            3: {
                hindi: "बहुत ऊर्जावान और बड़े-बड़े काम करने वाला, भाई-बहनों का सुख पाने वाला, बहुत अधिक खर्च करने वाला, बच्चों के घर में थोड़ी देर से उन्नति करने वाला, जमीन-जायदाद में थोड़ा मजबूत, ठंडा-गरम कहने की आदत वाला, अन्य स्थानों से सुख पाने वाला।",
                english:
                    "Very energetic and does grand deeds, gets the happiness ofbrothers and sisters, spends too much, progress in the house of children a bit late, some strength ofland and property, has a habit ofsaying cold and hot, happiness from other places",
            },
            4: {
                hindi: "बड़ी संपत्ति का स्वामी तथा भूमि, संपत्ति और भवन का सुख, माता से सुख और बल, भाई-बहनों से सुख, शत्रु पक्ष में बेचैनी, शरीर में कुछ कमी, पिता के घर में कमी",
                english:
                    "Possesses large property and gets the happiness of land, property and buildings, happiness and strength from mother, gets happiness from brothers and sisters, feels restlessness in the side ofenemies, some deficiency in his body, deficiency in the house of father",
            },
            5: {
                hindi: "बहुत तीव्र बुद्धि वाला, उच्च शिक्षित, संतान पक्ष से कुछ नीरसता, व्यवसाय में उन्नति, यौन सुखों के प्रति विशेष आकर्षण",
                english:
                    "Is ofvery sharp intellect, is highly educated, some insipidness from the side ofchildren, acquires progress in occupation, has a special fascination for sexual pleasures",
            },
            6: {
                hindi: "माता के सुख में हानि, भाइयों से शत्रुता, कुछ रोगों में शक्ति की कमी, शत्रुओं के घर में कष्ट महसूस करना, गलत योजनाएं अपनाना",
                english:
                    "Loss in the happiness of mother, enmity from brothers, lack of power in some diseases, feels distressed in the house of enemies, adopts wrong schemes",
            },
            7: {
                hindi: "गृहस्थ जीवन में सुख मिलता है, स्वयं का भवन होता है, पत्नी और व्यवसाय से कुछ सुख मिलता है, यौन सुखों के प्रति आकर्षण होता है, शारीरिक थकान होती है, व्यवसाय में उन्नति के लिए प्रयत्नशील रहता है।",
                english:
                    "Gets happiness in domestic life, possesses his own buildings, some happiness from the house ofwife and occupation, has a fascination for sexual pleasures, gets some physical tiredness, tries hard for the progress of occupation",
            },
            8: {
                hindi: "दूसरों की ओर से सुख की हानि, भाई-बहनों से अशांति, लंबी आयु प्राप्त होती है, पिता के घर में अशांति, विदेश गमन।",
                english:
                    "Loss ofhappiness from others' side, restlessness from brothers and sisters, gets a long life, restlessness in the house offather, goes to foreign countries",
            },
            9: {
                hindi: "बहुत ऊर्जावान और बहुत अच्छे कर्म करने वाला, भाग्यशाली माना जाता है और भारी लाभ प्राप्त करता है, भाइयों का सहयोग प्राप्त करता है, ईश्वर और धर्म की भक्ति में प्रसन्न रहता है, भूमि और भवन प्राप्त करता है।",
                english:
                    "Is very energetic and does very nice deeds, supposed to be lucky and gets heavy gains, gets the cooperation ofbrothers, feels happy in devotion to God and in Dharma, gets land and buildings",
            },
            10: {
                hindi: "कुछ कठिनाई के बाद भाई और पिता का आदर करता है, अधिक खर्च करता है, दृढ़ता से व्यवसाय चलाता है, स्वयं का भवन और संपत्ति रखता है, पत्नी के घर से इन्द्रिय सुख प्राप्त करता है।",
                english:
                    "Respects brother and father after some difficulty, spends much, conducts the occupation with determination, possesses his own building and properties, acquires sensual pleasures from the house of wife",
            },
            11: {
                hindi: "भारी आय को सुखपूर्वक वहन करता है, भाई-बहनों का लाभ पाता है, आयु में वृद्धि होती है, भूमि-भवन का लाभ मिलता है, आय में वृद्धि के लिए प्रयत्नशील रहता है तथा सुख प्राप्त करता है।",
                english:
                    "Bears heavy income comfortably, gets the advantage ofbrothers and sisters, gets increased longevity, gets the advantage of land and buildings, tries hard for increased income and gets happiness",
            },
            12: {
                hindi: "अपनी शक्ति से खर्च करता है, खर्च करने से अधिक सुख-सुविधा का अनुभव करता है, धर्म और ईश्वर में आसक्ति रखता है, शत्रु पक्ष को कुछ कमजोर समझता है",
                english:
                    "Spends through his own power, feels more comfortable due to spending, has fascination for Dharma and God, estimates the side of enemy to be somewhat weak",
            },
        },
        Rahu: {
            1: {
                hindi: "क्षीण शरीर, अनेक बार शारीरिक आघात सहना, सौम्य स्वभाव बनाये रखने में असमर्थ, कोई महान शक्ति प्राप्त करने के लिए बहुत कठोर रणनीति अपनाना, बहुत साहसी एवं चतुर होना।",
                english:
                    "Gets emaciated physique, gets physical shocks many times, unable to maintain the gentle nature, undertakes very strong tactics to acquire some great power, is very courageous and clever",
            },
            2: {
                hindi: "धन का संकट, धन की हानि और कमी को सहन करने वाला, परिवार में हानि और कमी वाला, दरिद्र, तथा कर्म करने में निष्ठा रखने वाला",
                english:
                    "Distress of wealth, bears the loss and the shortage of wealth, loss and deficiency in family, is poor, and has devotion to do the work",
            },
            3: {
                hindi: "वीरता से परिपूर्ण, अत्यंत साहसी एवं चतुर, उन्नति पथ पर अग्रसर, बलवान युक्तियों से सफलता पाने वाला, भाई का विरोध करने वाला, दुर्बलताओं का सामना करते हुए भी धैर्य बनाए रखने वाला, कभी-कभी साहस खो देने वाला किन्तु विजयी होता है।",
                english:
                    "Is full of valour, is very courageous and smart, moves on the path ofprogress, gets success with the help ofstrong devices, opposes the brother, maintains patience even when facing weaknesses, sometimes loses courage but emerges victorious",
            },
            4: {
                hindi: "माता के घर में कुछ कमजोरी मिलती है, सुख के घर में कुछ कमी मिलती है, जमीन में कुछ रुकावट आती है, पारिवारिक कलहपूर्ण वातावरण के कारण कुछ बेचैन रहता है।",
                english:
                    "Gets some weakness in the house ofmother, gets some deficiency in the house ofhappiness, gets some hindrance in the land, is somewhat restless on account of quarrelsome family atmosphere",
            },
            5: {
                hindi: "बहुत बुद्धिमान, स्वार्थी विचार रखने वाला, सत्य-असत्य की परवाह न करने वाला, बच्चों से कष्ट सहने वाला, शिक्षा प्राप्ति में कमी वाला, बातचीत में मधुर न होने वाला, लापरवाह, अपने विचारों को सही मानने वाला",
                english:
                    "Is very wise, puts forth his selfish ideas, does not care for truthfulness or falsehood, bears some trouble with children, deficiency in acquiring education, is not sweet in conversation, is careless, considers his views correct",
            },
            6: {
                hindi: "बहुत प्रभावशाली होता है और शत्रुओं पर विजय प्राप्त करता है, सौम्यता और संतोष का पालन-पोषण करने में असमर्थ होता है, कष्टों या रोगों की परवाह न करते हुए बहुत धैर्यपूर्वक अपना कार्य संपन्न करता है, कूटनीतिज्ञ होता है।",
                english:
                    "Is very influential and gets victory over the enemies, is unable to rear gentleness and satisfaction, gets his work done very patiently not caring for troubles or diseases, is a diplomat",
            },
            7: {
                hindi: "व्यवसाय के सम्बन्ध में अपना कार्य बहुत सावधानी एवं चतुराई से करवाता है, परिश्रम एवं रहस्यमय युक्तियों से व्यवसाय का संचालन करता है, पत्नी के घर में क्लेश सहता है, अपनी दुर्बलता प्रकट नहीं होने देना चाहता, कुछ चिंतित रहता है।",
                english:
                    "Gets his work done very carefully and cleverly in connection with occupation, conducts the occupation through diligence and mysterious devices, bears affliction in the house of wife, does not want his weakness to be disclosed, somewhat worried",
            },
            8: {
                hindi: "अपने जीवन में महान वैभव की कल्पना करता है, बल और शोख़ी दिखाता है, अस्पष्ट और रहस्यमय विषयों पर बहुत गहराई से सोचता है, दीर्घायु प्राप्त करता है",
                english:
                    "Thinks of a great grandeur in his life, shows force and coquetry, thinks very deeply on the obscure and mysterious matters, gets a long life",
            },
            9: {
                hindi: "अपने भाग्य को लेकर बहुत चिंतित रहता है, अपने भाग्य पर दुःखी रहता है, ईश्वर और धर्म के संबंध में वास्तविक कमी महसूस करता है, मानसिक पीड़ा सहता है",
                english:
                    "Very much anxious about his destiny, feels sorry about his luck, gets real deficiency with regard to God and religion, bears mental agony",
            },
            10: {
                hindi: "पिता के घर में हानि और कष्ट, सरकार और समाज में बाधाओं का सामना, सम्मान नहीं, व्यापार और व्यवसाय में बड़ी परेशानी, प्रगति में बाधाओं का सामना",
                english:
                    "Bears loss and distress in the house of father, faces obstacles in government and society, is not honoured, faces great botheration in business and occupation, faces obstacles in the progress",
            },
            11: {
                hindi: "बहुत सारा धन कमाता है और भारी आय प्राप्त करता है, धन प्राप्ति के सम्बन्ध में सत्य या असत्य के न्याय की परवाह नहीं करता तथा बहुत सतर्क रहता है।",
                english:
                    "Earns a lot ofwealth and gets a heavy income, does not care for justice of truthfulness or falsehood in connection acquiring wealth and is very cautious",
            },
            12: {
                hindi: "बहुत खर्च करता है, बड़ी युक्ति से काम निकालता है, खर्च के सम्बन्ध में कभी चिन्ता नहीं करता, धन प्राप्ति में आने वाली परेशानियों की परवाह नहीं करता, सदैव खर्च का प्रबन्ध करता है,",
                english:
                    "Spends much, gets the work done with great tactics, never worries in connection with expenditure, does not care for the troubles in acquiring wealth always manages the expenditure,",
            },
        },
        Ketu: {
            1: {
                hindi: "शरीर में दुर्बलता और घाव होते हैं, हृदय में बड़ा धैर्य होता है, अपने बल के आगे किसी की परवाह नहीं करता, वीर स्वभाव का होता है, ज्ञान की कमी अनुभव करता है, इंद्रिय शक्ति बहुत अधिक रखता है, अधिक कष्ट सहता है, चिन्तित और गंभीर होता है।",
                english:
                    "Gets weakness and wounds in the body, has great patience in his heart, does not care for anybody before his excessive strength, is of heroic nature, feels the deficiency of knowledge, possesses sensual power very much, bears more troubles, is anxious and solemn",
            },
            2: {
                hindi: "धन-संपत्ति बढ़ाने का प्रयत्न करता है, परिवार की उन्नति के विषय में बड़ी अव्यवस्था होती है, कुलीनता का दिखावा करता है, धन प्राप्ति के सम्बन्ध में बड़ी परेशानियों का सामना करना पड़ता है।",
                english:
                    "Tries to increase the wealth, great disorder about the progress ofthe family, gets a show of aristocracy, has to face great troubles in connection with acquiring wealth",
            },
            3: {
                hindi: "वीर स्वभाव का, लम्बी भुजाओं वाला, परिश्रमी, वियोग का सामना करने वाला, अनेक असफलताओं के बावजूद उत्साहपूर्वक आगे बढ़ने वाला, तथा अन्त में प्रबल शक्ति प्राप्त करने वाला होता है।",
                english:
                    "Is ofheroic nature, has long arms, is diligent, faces separation, goes forward enthusiastically though there may be numerous failures, and in the end gets some strong power",
            },
            4: {
                hindi: "माता के घर में कुछ कमी मिलती है, भवन और संपत्ति में भी कमी मिलती है, सुख में भी कमी मिलती है, जन्मस्थान से वियोग मिलता है",
                english:
                    "Gets some deficiency in the house of mother, gets deficiency in buildings and property also, deficiency in happiness also, separation from birthplace",
            },
            5: {
                hindi: "बौद्धिक रूप से चिंतित रहता है तथा शिक्षा में कमजोरी आती है तथा पढ़ाई में अनेक बाधाएं आती हैं, लेकिन शिक्षा प्राप्ति हेतु धैर्यपूर्वक कार्य करता है, संतान पक्ष में कष्ट, कठोर वाणी, जिद्दी स्वभाव का होता है",
                english:
                    "Is intellectually worried and gets weakness in education and gets many hurdles in studies, but works patiently to get education, distress in children's side, rude speech, is of obstinate nature",
            },
            6: {
                hindi: "बहुत साहसी और वीर स्वभाव वाला होता है, शत्रुओं पर विजय प्राप्त करता है, आने वाली परेशानियों की परवाह नहीं करता, रोगों और कठिनाइयों से बहुत सावधानी और सतर्कता से छुटकारा पाता है, अपने स्वार्थ की पूर्ति पर ध्यान देता है।",
                english:
                    "Is very brave and has a heroic nature, gets victory over enemies, does not care about the troubles that he may have to face, gets rid of diseases and difficulties very carefully and alertly, pays attention towards serving his selfishness",
            },
            7: {
                hindi: "पत्नी के घर में कष्ट सहता है, व्यवसाय में कुछ चिंताएं होती हैं, लेकिन धैर्य और लगन से काम करता है, व्यवसाय में गंभीर परेशानियों का सामना करने पर भी घबराता और निष्क्रिय नहीं होता, कभी-कभी परिवार से संबंधित परेशानियों का सामना करता है और चतुराई से मामलों का प्रबंधन करता है, यौन सुखों को बहुत अधिक प्राप्त करता है।",
                english:
                    "Bears agony in the house ofwife, bears some worries in the occupation but works patiently and diligently, does not get nervous and inactive though has to face grave troubles in the occupation, sometimes faces troubles in connection with family and manages the affairs tactfully, acquires sexual pleasures very much",
            },
            8: {
                hindi: "बहुत दुःख का अनुभव करता है, परेशान रहता है, आयु में कुछ कमी रहती है, दिनचर्या अव्यवस्थित रहती है, गुदा या पेट में कोई रोग हो जाता है",
                english:
                    "Experiences great unhappiness, remains disturbed, some weakness in longevity, has a clumsy daily routine, gets some disease in anus or stomach",
            },
            9: {
                hindi: "भाग्य में बड़ी बेचैनी, धर्म में कमजोरी महसूस करना, अपने भाग्य के उत्थान के लिए बहुत मजबूत लाभकारी रणनीति का पीछा करना, कुछ कमजोर धर्म का पालन करना",
                english:
                    "Great restlessness in the destiny, feels weakness in Dharma, pursues a very strong advantageous tactics for the rise ofhis fate, rears some weak Dharma",
            },
            10: {
                hindi: "पिता के घर में कुछ कमजोरी और हानि होती है और सरकार और समाज में बाधाओं का सामना करना पड़ता है, पद या प्रतिष्ठा की वृद्धि में बाधाओं का सामना करना पड़ता है, व्यापार की प्रगति में कई जटिलताओं का सामना करना पड़ता है, देर से सफलता मिलती है, साहसी और धैर्य से काम करने वाला होता है",
                english:
                    "Some weakness and loss in the house of father and faces hindrances in government and society, faces obstacles in the rise ofposition or prestige, faces many complexities in business progress, gets success late, is courageous and works patiently",
            },
            11: {
                hindi: "भारी आय प्राप्त करता है, भले-बुरे की परवाह न करते हुए अपने स्वार्थ की पूर्ति पर ध्यान देता है, कभी-कभी आय पर कुछ आघात सहता है, किन्तु साहस के कारण सदैव लाभ ही पाता है।",
                english:
                    "Gets a heavy income, pays attention to serve his selfishness not caring about good or bad, sometimes bears some blow on income, but always gets the advantage due to courage",
            },
            12: {
                hindi: "बहुत अधिक खर्च करता है, व्यय के संबंध में धैर्य और चतुराई से काम लेता है, कभी-कभी स्वयं को व्यय प्रबंधन करने में असमर्थ पाता है।",
                english:
                    "Spends much, works patiently and tactfully in connection with expenditure, sometimes finds himself unable to manage expenditure.",
            },
        },
    },
    Sagittarius: {
        Sun: {
            1: {
                hindi: "बहुत भाग्यशाली और सुंदर, धर्म और परोपकार का पालन करने वाला, ईश्वर में आस्था रखने वाला, व्यवसाय में सफल, पत्नी और परिवार से जुड़े मामलों में भी प्रभावशाली, बहुत प्रभावशाली और प्रतिष्ठित होता है।",
                english:
                    "Is very fortunate and handsome, follows Dharma and benevolence, possesses faith in God, gets success in occupation, has influence in the matters connected with wife and family also, is very influential and illustrious",
            },
            2: {
                hindi: "बड़ी कठिनाई से धन प्राप्त होता है, पारिवारिक मामलों में परेशानी होती है, धन संचय करने में कठिनाई होती है, दीर्घायु होता है, धर्म के पक्ष में कुछ हानि होती है, धर्म की अपेक्षा धन को अधिक महत्व देता है, सभ्य जीवन व्यतीत करता है, तथा सौभाग्यशाली होता है।",
                english:
                    "Gets wealth with great difficulty, faces problems in family matters, has difficulties in accumulating wealth, has a long life, faces some loss in the side ofDharma, gives more importance to wealth than to Dharma, spends life in a civilised way, and is fortunate",
            },
            3: {
                hindi: "धर्म का पालन करता है, बड़े साहस से काम करता है, किन्तु परिश्रम में कुछ कमी रहती है, भाई-बहनों से कुछ कमी रहती है, फिर भी उनका सहयोग प्राप्त करता है, यशस्वी एवं सौभाग्यशाली होता है।",
                english:
                    "Rears Dharma, works with great courage, but faces some weakness in his diligence, some deficiency from the brothers and sisters though gets their cooperation, is famous and fortunate",
            },
            4: {
                hindi: "बहुत भाग्यशाली होता है और उसके पास जमीन-जायदाद होती है, दूसरों से सुख मिलता है, पिता से लाभ मिलता है, सरकार से लाभ होता है, व्यापार में लाभ होता है, अच्छे कर्म करता है",
                english:
                    "Is very fortunate and possesses land and property, gets happiness from other, gets the advantage of father, advantage from the government, gains in the business, does nice deeds",
            },
            5: {
                hindi: "बहुत बुद्धिमान और विद्वान होता है, धर्म के बारे में ज्ञान रखता है, बच्चों के घर में सौभाग्य प्राप्त करता है, आय के घर में कमजोरी देखता है, दूरदर्शी, विद्वान, चतुर और भाग्यशाली होता है",
                english:
                    "Is very wise and learned, possesses knowledge about Dharma, gets good luck in the house ofchildren, thinks weakness in the house of income, is farsighted, learned, clever and fortunate",
            },
            6: {
                hindi: "कठिनाइयों का योग, भाग्य के बारे में चिंता, धर्म का पालन करने में असमर्थ, विरोधियों और शत्रुओं के घर में प्रभाव, विपत्तियों का शमन, रोगों पर नियंत्रण, अधिक व्यय, प्रभावशाली",
                english:
                    "Gets conjunction of difficulties, distress about destiny, unable to rear Dharma, gets the influence in the house of opponents and enemies, suppresses the calamities, gets control over the diseases, spends much, is influential",
            },
            7: {
                hindi: "सुंदर एवं प्रभावशाली पत्नी मिलती है, व्यवसाय में उन्नति होती है, व्यवसाय से सम्मान एवं प्रसिद्धि प्राप्त होती है, व्यवसाय के क्षेत्र में ईमानदार होता है, सौभाग्यशाली होता है, बहुत परिश्रमी होता है।",
                english:
                    "Gets a beautiful and influential wife, experiences progress in occupation, gains respect and fame from occupation, is honest in the sphere of profession, enjoys good luck, is very industrious",
            },
            8: {
                hindi: "भाग्य के संबंध में हानि, विदेश से भाग्योदय देर से और बड़ी कठिनाई से होता है, जीवन बहुत ही सभ्य और प्रभावशाली तरीके से व्यतीत होता है, आयु में वृद्धि होती है।",
                english:
                    "Loss in connection with destiny, gets rise of fortune from foreign countries a bit late with great difficulty, spends the life in a very decent and influential manner, gets the increase of age",
            },
            9: {
                hindi: "बहुत भाग्यशाली और यशस्वी होता है, बहुत उग्र धर्म का पालन करता है, भाई-बहनों पर कम विश्वास करता है",
                english:
                    "Is very fortunate and illustrious, rears a very fiery Dharma, has less faith in brothers and sisters",
            },
            10: {
                hindi: "बहुत भाग्यशाली होता है, भाग्य की प्रबलता से बहुत मान-सम्मान पाता है, व्यापार में यश और सफलता पाता है, पिता से लाभ प्राप्त करता है, सरकार और समाज से उन्नति और लाभ प्राप्त करता है, धार्मिक रीति-रिवाजों का बहुत पालन करता है, माता के घर में सफलता पाता है, बहुत प्रभावशाली होता है, न्याय चाहता है और अधिकारी होता है।",
                english:
                    "Is very fortunate, gets great honour and respect due to the power of the destiny, gets fame and success in business, gains from the father, gets progress and advantage from the government and society, follows the religious formalities very much, gets success in the house of mother, is very influential, wants justice and is an officer",
            },
            11: {
                hindi: "धन-संपत्ति में कुछ कमी रहती है, धर्म-पालन में कमजोरी रहती है, संतान की प्राप्ति में बाधा आती है, आय के संबंध में कुछ बंधन और उलझन का सामना करना पड़ता है।",
                english:
                    "Experiences some deficiency in the house ofgains, gets weakness in rearing Dharma, gets the power ofchildren, faces some bondage and perplexity regard income",
            },
            12: {
                hindi: "भाग्य से संबंधित हानि, भाग्योदय में विलम्ब, अधिक व्यय, शत्रु भाव में प्रभाव, ईश्वर में पूर्ण विश्वास न होना, सांसारिक बुद्धि से युक्त चंद्रमा",
                english:
                    "Loss in connection with destiny, faces delays in the rise of fortune, spends much, influence in the house of enemies, does not possess full faith in God, possesses worldly wisdom Moon",
            },
        },
        Moon: {
            1: {
                hindi: "दीर्घायु होता है, शरीर की सुन्दरता में कुछ कमी और कमजोरी का अनुभव करता है, व्यवसाय में कुछ चिंताएं होती हैं, पत्नी के घर में कुछ परेशानी होती है।",
                english:
                    "Has a long life, experiences some weakness and deficiency in the handsomeness ofthe body, gets some worries in occupation, bears some perplexity in the house ofwife",
            },
            2: {
                hindi: "दैनिक दिनचर्या या जीवन कुलीन तरीके से व्यतीत करता है, धन संचय में हानि और कमी का अनुभव करता है, परिवार को हानि होती है, दीर्घायु होता है, कठिनाइयों के बावजूद काम करता है।",
                english:
                    "Spends the daily routine or life in an aristocratic manner, experiences loss and deficiency in the accumulation ofwealth, gets family loss, has a long life, works through difficulties",
            },
            3: {
                hindi: "भाई-बहनों के घर में हानि होती है, धर्म में हानि होती है, अनेक युक्तियों वाला होता है, तथा बहुत प्रसन्न रहता है।",
                english:
                    "Gets loss in the house of brothers and sisters, faces some loss in Dharma, is a man having numerous tactics, and is overjoyed",
            },
            4: {
                hindi: "माता के घर में कुछ हानि, आयु अच्छी, पारिवारिक सुख में कुछ कमी, उन्नति, मान-सम्मान, व्यापार आदि में परेशानी, पेट की समस्याओं से मुक्ति, लापरवाही से समय व्यतीत करने वाला",
                english:
                    "Some loss in the house ofmother, good longevity, some loss in domestic happiness, troubles in progress, honour, business etc, is free from stomach troubles, spends the time carelessly",
            },
            5: {
                hindi: "संतान के घर में हानि और क्लेश सहता है, शिक्षा प्राप्ति में कष्ट उठाता है, वैभव और सम्मान के साथ जीवन व्यतीत करता है।",
                english:
                    "Bears loss and distress in the house ofchildren, faces troubles while acquiring education, spends the life with grandeur and dignity",
            },
            6: {
                hindi: "व्यय के संबंध में कमजोर, शत्रु भाव में प्रभाव रखने वाला, निर्भयता से अपना काम करवाने वाला तथा विनम्र न होने वाला",
                english:
                    "Weakness in connection with expenditure, possesses influence in the house of enemies, gets his work done fearlessly and is not modest",
            },
            7: {
                hindi: "घरेलू जीवन में परेशानियां, लम्बी आयु, पत्नी के घर में कुछ छिपी हुई परेशानियां, व्यवसाय को लेकर कुछ उलझनें, व्यवसाय और पत्नी के पक्ष में मानसिक रूप से कुछ सख्त।",
                english:
                    "Bears troubles with domestic life, gets a long age with some hidden trouble in the house ofwife, some perplexities about occupation, somewhat mentally strict in the side of occupation and wife",
            },
            8: {
                hindi: "दीर्घायु, एकाग्रता शक्ति का गहन ज्ञान, वंशानुगत लाभ, धन भाव में कुछ हानि का सामना करना पड़ता है।",
                english:
                    "Has a long life, possesses deep knowledge of the power of concentration, gets hereditary advantage, faces some loss in the house of wealth",
            },
            9: {
                hindi: "धर्म भाव में हानि, दीर्घायु, आजीविका के अच्छे साधन, भाग्य भाव में कष्ट और बाधाएँ, भाई-बहनों से कुछ बाधाएँ।",
                english:
                    "Bears loss in the house ofDharma, has a long life, gets a good means of livelihood, laces troubles and obstacles in the house of fortune, and some obstacles from brothers and sisters",
            },
            10: {
                hindi: "पिता के घर में बाधाओं का सामना करता है, लम्बी आयु वाला होता है, पद-वृद्धि में बाधाओं का सामना करता है, सरकार, समाज और व्यवसाय के घर में अनेक परेशानियों का सामना करता है, बहुत अस्पष्ट रणनीति अपनाता है।",
                english:
                    "Faces obstacles in the house offather, has a long age, faces obstacles in the rise ofposition, bears numerous troubles in the house of government, society and occupation, follows very obscure tactics",
            },
            11: {
                hindi: "दीर्घायु होता है, आय के भाव में कुछ बाधाएं आती हैं और संतान पक्ष में कुछ कष्ट होता है, शिक्षा के भाव में बाधाएं आती हैं।",
                english:
                    "Has a long life, feces some hindrances in the house ofincome and gains some distress in children's side, obstacles in the house of education",
            },
            12: {
                hindi: "जीवन भाव में कष्ट और निराशा का सामना करना पड़ता है, आयु में कमजोरी, व्यय में उलझन, शत्रु पक्ष में प्रभाव, अधिक भ्रमणशील, संकीर्ण सोच वाला होता है।",
                english:
                    "Confronts distress and resdessness in the house oflife, weakness in longevity, perplexity in expenditure, gets influence in the side of enemies, wanders much, and is narrow-minded",
            },
        },
        Mars: {
            1: {
                hindi: "अधिक यात्रा करने वाला, दुर्बल शरीर वाला, उच्च स्तर के कार्य करने वाला, चतुराई से बातें करके तथा दूसरों को फंसाकर काम निकलवाने वाला, माता का देहांत होने पर पत्नी के घर में हानि तथा क्लेश का योग, दैनिक जीवन में अत्यधिक बेचैनी, अधिक व्यय करने वाला, संतान पक्ष में कुछ कमी वाला।",
                english:
                    "Travels much, has a weak physique, does high standard tasks, gets work done by talking very cunningly and implicating others, experiences loss ofmother, gets the conjunction ofloss and distress in wife's house, feces great restlessness in the daily routine of life, spends much, has some deficiency in the children's side",
            },
            2: {
                hindi: "धन भाव में हानि-लाभ, अपनी बुद्धि के कारण बहुत धन प्राप्त करता है, अति उच्च एवं गहन बौद्धिक शक्ति से विद्यमान धन को व्यय करता है।",
                english:
                    "Loss and gain in the house ofwealth, gets much wealth due to his wisdom, spends the existing wealth of very high and deep intellectual power",
            },
            3: {
                hindi: "भाई के घर में हानि, शत्रु के घर में प्रभाव बना रहता है, संतान में कमी रहती है, व्यवसाय में कुछ हानि होती है, अभिमानी बुद्धि से कार्य संपन्न होता है, बहुत साहसी होता है।",
                english:
                    "Loss in the brother's house, maintains the influence in the house of enemies, experiences deficiency in children, faces some loss in occupation, gets the work done with conceited intellect, is very courageous",
            },
            4: {
                hindi: "माता का देहांत हो, भवन और संपत्ति का नुकसान हो, पत्नी के घर में हानि हो, शिक्षा में कुछ कमी हो, खर्च का प्रबंधन सावधानी से करें, विदेश में रहें।",
                english:
                    "Experiences loss ofmother, faces the loss ofbuildings and property, loss in the house ofwife, has some deficiency in education, manages the expenditure with care, lives in foreign places",
            },
            5: {
                hindi: "बहुत खर्च करता है, बच्चों का दुःख सहता है, दूसरों को फंसाता है, कम शिक्षा प्राप्त करता है, अहंकार से बात करता है",
                english:
                    "Spends much, bears agony ofchildren, implicates others, gets little education, talks conceitedly",
            },
            6: {
                hindi: "संतान की पीड़ा सहता है, शिक्षा में कमी रखता है, व्यय भाव में अशांति का अनुभव करता है, शत्रुओं का दमन करता है, क्रोधी स्वभाव का होता है, विनय का पालन नहीं करता।",
                english:
                    "Bears the agony ofchildren, feces deficiency in education, experiences uneasiness in the house of expenditure, suppresses the enemies, is of hot temperament, does not follow modesty",
            },
            7: {
                hindi: "पत्नी के घर में हानि होती है, व्यवसाय के घर में कुछ हानि होती है, धन वृद्धि के विशेष साधन बनते हैं, सरकार के घर में हानि होती है, शिक्षा में कुछ कमी होती है और शरीर कमजोर होता है।",
                english:
                    "Experiences loss in wife's house, faces some loss in the house of occupation, creates special means for increasing wealth, gets loss in the house of government, has some deficiency in education and weakness in physique",
            },
            8: {
                hindi: "संतान पक्ष में विशेष कष्ट, शिक्षा में कमी, व्यय के मामले में अत्यधिक परेशानी, अल्पायु, गुप्त बातें करने वाला, भाई के घर में हानि, आय-लाभ के लिए अत्यधिक प्रयत्नशील, गुदा में रोग।",
                english:
                    "Faces some special trouble in the children's side, gets deficiency in education, feels greatly troubled in matters of expenditure, has a short life, uses secrecies, bears loss in the house ofbrother, tries very hard for income and gains, gets some disease in anus",
            },
            9: {
                hindi: "अधिक खर्च करता है, भाग्य भाव में कुछ हानि होती है, माता भाव में कुछ हानि होती है, शिक्षा में कमी होती है तथा भाई भाव में भी कमी होती है, भाग्य में वृद्धि देर से तथा दूरस्थ स्रोतों से होती है।",
                english:
                    "Spends much, faces some loss in the house ofdestiny, and some loss in the house of mother, has deficiency in education and in the house of brothers, experiences the rise in fortune a bit late and from remote sources",
            },
            10: {
                hindi: "शिक्षित, बुद्धिमान और राज-काज की अच्छी जानकारी रखने वाला, पिता को चोट पहुँचाने वाला, वैभवपूर्ण व्यय करने वाला, शरीर में कुछ कमजोरी वाला होता है।",
                english:
                    "Is literate, wise and has a good knowledge about government, injures father, spends much majestically, has some weakness in the body",
            },
            11: {
                hindi: "धन वृद्धि के लिए कठोर प्रयत्न करता है, विद्या में कमी होती है, संतान में कुछ कमी होती है, शत्रुओं को हानि होती है।",
                english:
                    "Tries hard for the increase of wealth, has deficiency in education, and some deficiency in the house ofchildren, injures the enemies",
            },
            12: {
                hindi: "अधिक व्यय करने वाला, संतान पक्ष में भारी हानि उठाने वाला, पत्नी पक्ष में हानि उठाने वाला, भाई की भी हानि उठाने वाला, व्यवसाय में हानि उठाने वाला, बुद्धि और शिक्षा में कमजोर, शत्रुओं पर कुछ प्रभाव डालने वाला।",
                english:
                    "Spends much, bears heavy losses in children, gets the loss in wife's side, loss ofthe brother also, bears loss in occupation, has weakness in wisdom and education, creates some influence over the enemies",
            },
        },
        Mercury: {
            1: {
                hindi: "एक सुंदर और कुशल व्यवसाय का संचालन करता है, बहुत मेहनती और पापी भी होता है, सांसारिक मामलों का अच्छा ज्ञान रखता है और सांसारिक मामलों में संतोषजनक सफलता प्राप्त करता है, घरेलू मामलों में सम्मान प्राप्त करता है, एक प्रभावशाली पत्नी प्राप्त करता है, यौन सुख और सम्मान में हानि का सामना करता है, पिता के घर में कमी होती है, बहुत चतुर, बुद्धिमान और एक अच्छा प्रबंधक होता है।",
                english:
                    "Conducts an elegant and dexterous occupation, is very industrious and also sinful, possesses good knowledge ofworldly affairs and gets satisfactory success in worldly affairs, achieves honour in domestic affairs, gets an influential wife, faces loss in sexual pleasure and respect, has deficiency in the house of father, is very clever, intelligent and a good manager",
            },
            2: {
                hindi: "व्यापार और व्यवसाय से बहुत धन कमाता है, व्यापार में उन्नति करता है, पिता से बहुत धन प्राप्त करता है, बड़ा परिवार रखता है, पत्नी और परिवार में कुछ बंधन महसूस करता है, अधिक यौन सुख चाहता है, धन संचय करता है, सरकार से लाभ प्राप्त करता है, बहुत बुद्धिमान और चतुर होता है।",
                english:
                    "Earns much wealth through business and occupation, gets progress in business, gets lot ofwealth from father, possesses a big family, feces some bondage in wife and family, wants more sexual pleasures, accumulates wealth, gets advantage from the government, is very wise and clever",
            },
            3: {
                hindi: "भाई-बहनों का सहयोग मिलता है, परिवार और पत्नी में उन्नति होती है, व्यापार-व्यवसाय में उल्लेखनीय सफलता मिलती है, चतुराई और लगन से काम करता है, आत्म-अभिमानी, भाग्यशाली और बुद्धिमान होता है।",
                english:
                    "Gets the power ofbrothers and sisters, gets progress in family and wife, gets remarkable success in business occupation, works cleverly and diligently, is self-conceited, fortunate and wise",
            },
            4: {
                hindi: "मान-सम्मान भाव में हानि और कमजोरी, पारिवारिक मामलों में अशांति, भूमि-संपत्ति में कमी, व्यवसाय में कुछ कमी, बड़े व्यापार में कुछ उन्नति, पत्नी पक्ष से कमजोरी, बुद्धिमान होता है, परन्तु प्रकट रूप से नहीं।",
                english:
                    "Bears loss and weakness in the house ofhonour, faces restlessness in family affairs, gets deficiency in the land and property, some deficiency in occupation, acquires some progress in big business, gets weaknesses from the wife's side, and is wise but not apparently",
            },
            5: {
                hindi: "बड़ा व्यवसाय चलाता है, बहुत बुद्धिमान होता है, संतान को शक्ति प्राप्त होती है, सरकार और समाज का अच्छा ज्ञान रखता है, पत्नी की ओर से लाभ प्राप्त करता है, यौन सुख की इच्छा रखता है",
                english:
                    "Manages a big business, is very wise, gets children power, possesses a good knowledge ofgovernment and society, gains advantage from wife's side, desires sexual pleasures",
            },
            6: {
                hindi: "पिता के घर से शत्रुता और विरोध, व्यापार व्यवसाय में बड़ी परेशानी, शत्रुओं के घर में थोड़ी विनम्रता, यौन सुख में कमी",
                english:
                    "Enmity and opposition from the father's house, bears great troubles in business occupation, has some politeness in the house ofenemies, feces deficiency in sexual pleasures",
            },
            7: {
                hindi: "बहुत प्रतिष्ठित व्यवसाय करता है, परिवार का सुख पाता है, सुंदर, प्रभावशाली और चतुर पत्नी मिलती है, अच्छे कपड़े पहनता है, सफलतापूर्वक व्यापार करता है, यौन सुखों का भरपूर आनंद उठाता है, बहुत अच्छा ससुर मिलता है",
                english:
                    "Does a very dignified occupation, gets happy pleasures of family, gets beautiful, influential and clever wife, wears a nice dress, conducts business successfully, enjoys the sexual pleasures very much, gets a very good father-in-law",
            },
            8: {
                hindi: "व्यापार व्यवसाय में हानि और उलझन, पत्नी के घर में हानि, विदेश में नौकरी का योग, धन वृद्धि के लिए प्रयत्नशील, यौन सुख में कुछ कमी",
                english:
                    "Bears loss and perplexity in the business occupation, feces loss in the house of wife, gets the conjunction of work in foreign countries, tries hard for the increase of wealth, has some deficiency in exual pleasures",
            },
            9: {
                hindi: "व्यापार और व्यवसाय में धर्म का ध्यान रखता है, कर्तव्यपरायण और सुंदर पत्नी प्राप्त करता है, भाई-बहनों से अच्छा सहयोग प्राप्त करता है, सरकार और समाज से लाभ प्राप्त करता है।",
                english:
                    "Takes good care ofDharma in business and occupation, gets a dutiful and beautiful wife, gets nice cooperation from brothers and sisters, gets advantage from the government and society",
            },
            10: {
                hindi: "बड़ा व्यापार करता है, सरकार और समाज से बहुत सम्मान पाता है, सुन्दर और प्रभावशाली पत्नी मिलती है, मातृ पक्ष से कमजोरी होती है, घर में धन और संपत्ति की कमी होती है, यौन सुख प्राप्त होता है।",
                english:
                    "Conducts a big business, gets much respect from government and society, gets a beautiful and influential wife, feces weakness from mother's side, has deficiency in the house oflaud and property, gets sexual pleasures",
            },
            11: {
                hindi: "व्यापार व्यवसाय से भारी लाभ मिलता है, सुन्दर पत्नी मिलती है, उच्च शिक्षा प्राप्त होती है, यौन सुखों की अधिकता होती है, सरकार और समाज से लाभ मिलता है।",
                english:
                    "Gets heavy gains from business occupation, gets a beautiful wife, achieves high education, gets sexual pleasures very much, gains advantage from the government and society",
            },
            12: {
                hindi: "व्यापार व्यवसाय में तथा पिता के घर में हानि होती है, अधिक व्यय होता है, पत्नी के घर में हानि होती है, व्यवसाय के लिए परिश्रम करता है, सरकार तथा समाज में दुर्बलता पाता है, उन्नति में बाधा पाता है, आलसी स्वभाव का होता है, परिवार में क्लेश पाता है।",
                english:
                    "Bears loss in business occupation and in father's house, spends much, bears loss in the house of wife, labours for occupation, feces weakness in government and society, finds obstacles in progress, is of lazy nature, feces troubles in family,",
            },
        },
        Jupiter: {
            1: {
                hindi: "सुख भोगता है और मान पाता है, स्थूल शरीर वाला होता है, सम्माननीय और शांतिप्रिय होता है, मीठा और स्वादिष्ट भोजन चाहता है, पत्नी से सुख पाता है, सुखपूर्वक व्यवसाय करता है, अपने स्थान पर रहता है, विद्या और धर्म का सुख पाता है, संतान प्राप्त करता है, सौभाग्यशाली होता है।",
                english:
                    "Enjoys happiness and gets honour, possesses a bulky body, is respectable and loves peace, wants sweet and delicious food, gets happiness from wife, has a comfortable occupation, lives at his own place, gets the happiness of education and Dharma, gets children, is fortunate",
            },
            2: {
                hindi: "धन प्राप्ति के लिए प्राणों की बाजी भी लगा देता है, धन को अपने प्राणों से भी अधिक महत्व देता है, धन पक्ष में दुखी रहता है, माता के घर में हानि होती है, भूमि और भवन में कमी होती है, शरीर दुर्बल होता है, परिवार से कष्ट पाता है, व्यापार और व्यवसाय से सुखी होता है, तथा सम्मान पाता है।",
                english:
                    "Takes even the risk oflife for acquiring wealth, gives more importance to wealth than his life, remains unhappy in the side ofwealth, bears loss in the house of mother, gets deficiency in land and buildings gets weakness in physique, bears distress of family, is happy from business and occupation, and is respectable",
            },
            3: {
                hindi: "धन लाभ, पत्नी के घर से सुख, माता और भाई पक्ष में कमी, पारिवारिक सुख, परिश्रमी होता है।",
                english:
                    "Gets monetary gains, gains happiness from wife's house, has deficiency in the side of mother and brother, gets family happiness, and is industrious",
            },
            4: {
                hindi: "माता का सुख प्राप्त होता है, भूमि और भवन का स्वामी होता है, जीवन के दैनिक कार्यों में मान-सम्मान और सुख प्राप्त होता है, दीर्घायु होता है, अपने स्थान पर रहता है, तथा ऊर्जावान होता है।",
                english:
                    "Gets happiness ofmother, possesses lands and buildings, gets dignity and pleasures in the daily routine oflife, gets a long life, lives in his own place, and is energetic",
            },
            5: {
                hindi: "बहुत बुद्धिमान, आत्म-अभिमानी और प्रतिष्ठित, सुंदर शरीर, शानदार बच्चे और बुद्धि, आंतरिक ज्ञान, कूटनीतिज्ञ, बहुत भाग्यशाली और संपत्ति का स्वामी होता है।",
                english:
                    "Is very wise, self-conceited and dignified, gets a handsome physique, gets illustrious children and wisdom, possesses inner knowledge, is a diplomat, is very fortunate, and possesses property",
            },
            6: {
                hindi: "सुख-शांति में बाधा आती है, सहयोग कम मिलता है, गृह क्लेश होता है, धन में कमजोरी होती है, चतुर शत्रु होता है।",
                english:
                    "Faces obstacles in peace and happiness, gets some cooperation, bears domestic distress, has weakness in wealth, is a clever enemy",
            },
            7: {
                hindi: "सुखपूर्वक व्यवसाय करता है, सुन्दर एवं प्रभावशाली पत्नी प्राप्त करता है, भाई-बहनों में शत्रुता रखता है, मकान, जमीन-जायदाद प्राप्त करता है, आत्म-अभिमानी होता है।",
                english:
                    "Pursues the occupation comfortably, gets a beautiful and influential wife, enmity in the brothers, and sisters, house, gets some landed property, is self-conceited",
            },
            8: {
                hindi: "अपनी दिनचर्या और जीवन में अद्वितीय शक्तियों, लालित्य और वैभव का आनंद लेता है, धन के मामले में कुछ कमजोरी का सामना करता है, बहुत खर्च करता है, राजसी शैली में रहता है लेकिन अपनी स्थिति में कुछ कमजोरी महसूस करता है, जमीन और संपत्ति प्राप्त करता है, माँ की शक्ति प्राप्त करता है",
                english:
                    "Enjoys unique powers, elegance and splendour in his daily routine and in his life, faces some weakness in the side ofwealth, spends much, lives in a majestic style but feels some weakness in his position gets land and property, gets the power of mother",
            },
            9: {
                hindi: "बहुत भाग्यशाली, वैज्ञानिक ज्ञान से युक्त, धार्मिक अनुष्ठान करने वाला, ईश्वर में आस्था रखने वाला, विद्या में बुद्धि एवं अधिकार रखने वाला, सुन्दर शरीर वाला, भूमि-संपत्ति वाला, संतान सुख प्राप्त करने वाला, भाई-बहनों से शत्रुता रखने वाला होता है।",
                english:
                    "Is very fortunate, possesses scientific knowledge, performs religious formalities, has faith in God, possesses wisdom and authority in education, possesses handsome physique, gets land and property, gets the happiness of children, has some enmity in connection with brothers and sisters",
            },
            10: {
                hindi: "बड़ा व्यापार आराम से करता है, व्यवसाय में उन्नति करता है, जमीन-जायदाद प्राप्त करता है, सरकार और समाज में सम्मान पाता है, धन में कुछ कमी होती है, परिश्रमी और अभिमानी होता है",
                english:
                    "Pursues a big business comfortably, gets progress in occupation, gets land and property, gets honour in government and society, has some deficiency in wealth, is industrious and arrogant",
            },
            11: {
                hindi: "भाई-बहनों के घर में सुख मिलता है, लेकिन कुछ शत्रुता भी मिलती है, शिक्षा में श्रेष्ठता मिलती है, संतान का सुख मिलता है, पत्नी का सुख मिलता है, व्यवसाय से आय होती है।",
                english:
                    "Gets happiness but gets some enmity in the house of brothers and sisters, gets command in education, gets the happiness ofthe children, happiness with wife, income from occupation",
            },
            12: {
                hindi: "शरीर की सुन्दरता में कमी, अधिक व्यय, दैनिक जीवन में वैभव की प्राप्ति, शत्रुओं के घर में शांति और प्रभाव का उपयोग, अधिक यात्रा",
                english:
                    "Deficiency in the handsomeness of the body, spends much, gets splendour in the daily routine iflife, uses peace and influence in the house of enemies, travels much",
            },
        },
        Venus: {
            1: {
                hindi: "शारीरिक परिश्रम से धन प्राप्त करता है, शरीर में कोई रोग होता है, अपने व्यवसाय पर अधिक ध्यान देता है, पत्नी के घर में कुछ उलझनों तथा लाभ का सामना करता है, बहुत अधिक कमाता है, शत्रुओं का दमन करता है, अलंकरण तथा सुख की इच्छा रखता है।",
                english:
                    "Gets income due to his physical labours, gets some disease in body, pays great attention to his occupation, faces some perplexity and also advantage in the wife's house, earns very much, suppresses the enemies, wants ornamentation and joy",
            },
            2: {
                hindi: "बहुत धन कमाता है और उसे संचित करता है, कुछ हानि उठाता है, तथा सम्मानीय होता है",
                english:
                    "Earns much wealth and accumulates it, gets some loss, and is respectable",
            },
            3: {
                hindi: "अनेक लाभ और भारी आय प्राप्त होती है, भाइयों के घर में कुछ सहयोग और विरोध मिलता है",
                english:
                    "Gets numerous advantages and a heavy income, gets some cooperation and antagonism in the house of brothers",
            },
            4: {
                hindi: "अधिक आय, भूमि व भवन की प्राप्ति, माता से लाभ, स्वादिष्ट भोजन की इच्छा, पिता के घर में कमी",
                english:
                    "Heavy income, gets land and buildings, gains advantage from mother, wants delicious food, has deficiency in the house of father",
            },
            5: {
                hindi: "बौद्धिक चतुराई के कारण बहुत लाभ होता है, धन और आय प्राप्ति के स्थायी साधन, बुद्धि और शिक्षा में चतुरता, संतान में कुछ कमी और शत्रुओं पर विजय प्राप्त होती है।",
                english:
                    "Gains much due to intellectual cleverness, permanent means of acquiring wealth and income, cleverness in wisdom and education, some deficiency in children and defeats the enemies",
            },
            6: {
                hindi: "आय प्राप्त करने में कुछ कठिनाइयों का सामना करना पड़ता है, बहुत खर्च करता है, बहुत चालाक होता है और बहुत जटिल रणनीति का उपयोग करता है, बहुत घमंडी और चालाक होता है",
                english:
                    "Has to face some difficulties in getting income, spends much, is very clever and uses very intricate tactics, is very haughty and clever",
            },
            7: {
                hindi: "व्यवसाय में लाभ, पत्नी के घर में अच्छा सहयोग, पत्नी पक्ष से कुछ शत्रुता, अधिक यौन सुख की इच्छा, सौंदर्य प्रिय, पत्नी से कुछ रोग, व्यवसाय और घरेलू जीवन में बहुत लाभ, सम्मान प्राप्त, बहुत चतुर",
                english:
                    "Gains in the occupation, gets good cooperation in wife's house, some enmity through wife side, wants much sexual pleasures, likes beauty, gets some diseases in wife, great advantage in occupation and domestic life, gets honour, very clever",
            },
            8: {
                hindi: "लाभ और आय प्राप्ति के लिए अनेक चिंताएं, जीवन की दिनचर्या में कुछ शान-शौकत, लाभ में कमी, शत्रुओं का दमन",
                english:
                    "Bears numerous worries for getting gains and income, some elegance in daily routine of life, deficiency in gains, suppresses the enemies",
            },
            9: {
                hindi: "लाभ तो मिलता है, परन्तु लाभ के सम्बन्ध में कुछ बेचैनी, भाग्य की प्रगति में कुछ बाधाएँ, परेशानियाँ और बेचैनी, भाई के पक्ष में कुछ निरंतरता, बहुत साहसी और चतुर, धर्म के वेश में लाभ प्राप्त करता है।",
                english:
                    "Gets gains but some uneasiness in connection with gains, some obstacles and troubles and uneasiness in the way ofthe progress of the destiny, some continuity in the side of brother, is very courageous and clever, gets the advantages in the garb ofDharma",
            },
            10: {
                hindi: "पिता के घर में कष्ट, व्यापारिक उन्नति और आय के पक्ष में कमजोरी, संपत्ति के घर में लाभ",
                english:
                    "Distress in the father's house, gets the weakness in the side of business progress and income, advantage in the house ofproperty",
            },
            11: {
                hindi: "बहुत भारी आय प्राप्त होती है, महान युक्तियों से बुद्धि और शिक्षा में लाभ होता है, संतान पक्ष में कुछ लाभ होता है, शत्रुओं से भी लाभ मिलता है।",
                english:
                    "Gets a very heavy income, gains in intellect and education through great tactics, some advantage in the children side, gets the advantage from the enemies also",
            },
            12: {
                hindi: "अधिक खर्च करने वाला, परिश्रम से लाभ प्राप्त करने वाला, लाभ में कमी पाने वाला, अनेक चिंताओं के कारण अधिक खर्च करने वाला, बड़ी चतुराई और चिंताओं के साथ काम करने वाला, जटिल युक्तियों से व्यय की कठिनाइयों को सुलझाने वाला और चतुर होता है।",
                english:
                    "Spends much, gets the gains through diligence, gets deficiency of gains, spends much due to numerous worries, manages to work with great cleverness and with worries, solves the difficulties of expenditure through intricate tactics and is clever",
            },
        },
        Saturn: {
            1: {
                hindi: "बहुत ऊर्जावान और मेहनती, परिश्रम से धन में वृद्धि, भाई-बहनों का बल प्राप्त, शरीर में कुछ बेचैनी, बड़ा व्यापार करने वाला, पत्नी और पिता का बल प्राप्त",
                english:
                    "Very energetic and industrious, increases wealth working diligently, gets the strength of brothers and sisters, some restlessness in his body, conducts a big business, gets the power of wife and father",
            },
            2: {
                hindi: "बहुत धनवान होता है तथा भूमि और भवन में वृद्धि के साधन प्राप्त होते हैं, माता के घर में कुछ हानि होती है, भारी आय होती है, जीवन की दिनचर्या में कुछ ढिलाई होती है।",
                english:
                    "Is very rich and gets the means to increase land and buildings, some loss in the house of mother, gets heavy income, some resdessness in the daily routine of life",
            },
            3: {
                hindi: "धन-सम्बन्धी मामलों में संकीर्ण बुद्धि, कटु एवं रूखे वचन बोलने वाला, बच्चों की शिक्षा में भी कमी, बेचैनी से अधिक व्यय, धर्म में कुछ कष्ट, बहुत परिश्रमी एवं साहसी होता है।",
                english:
                    "Narrow wisdom in the affairs connected with wealth, speaks bitterly and rudely, gets deficiency in education also in children's side, spends much with uneasiness, some distress in Dharma, is very industrious and courageous",
            },
            4: {
                hindi: "धन के मामले में सुख-दुःख दोनों प्राप्त करता है, सौतेली माँ की युति, शत्रुओं के घर में मधुर प्रभाव, रोगों के मामले में अपना काम निकलवाता है, शारीरिक रूप से कुछ बेचैन रहता है",
                english:
                    "Achieves both happiness and unhappiness with regard to wealth, conjunction of stepmother, sweet influence in the house of enemies, gets his work done with regard to diseases, is somewhat physically restless",
            },
            5: {
                hindi: "कठिन बौद्धिक परिश्रम से धन में वृद्धि होती है, धन संचय की चिंता होती है, धन वृद्धि के कारण शिष्टाचार से बात करता है, संतान पक्ष में कमी होती है, शिक्षा में कमी होती है, व्यवसाय में उन्नति होती है, पत्नी के घर में विशेष अधिकार प्राप्त होता है, अधिक धन अर्जित करता है।",
                english:
                    "Gets increased wealth through his hard intellectual labour, anxieties about accumulation ofwealth, speaks courtly due to increased wealth, deficiency in children's side, gets deficiency in education, improves the occupation, gets some special power in the wife's house, earns much",
            },
            6: {
                hindi: "धन पक्ष में कमजोरी, भाइयों से विरोध तथा भाइयों का सहयोग भी प्राप्त होता है, शत्रुओं का दमन करने वाला, रोग व कष्टों का शमन करने वाला, जीवन की दिनचर्या में कुछ उलझनें रहने वाला, बहुत साहसी, आत्म अभिमानी व बेचैन होता है,",
                english:
                    "Weakness in the side of wealth, opposes the brothers and also gets the support of brothers, suppresses the enemies, suppresses diseases and difficulties, some perplexity in the daily routine of life, is very brave self-conceited and restless,",
            },
            7: {
                hindi: "व्यवसाय में उन्नति, परिश्रमपूर्वक धन अर्जित करने वाला, शरीर में कुछ दुर्बलता, पत्नी के घर में अधिकार प्राप्त करने वाला, धर्म का साथ न देने वाला, आवेशग्रस्त",
                english:
                    "Progress in occupation, earns wealth diligently, some weakness in his body, gets the power in wife's house, does not support Dharma, is passionate",
            },
            8: {
                hindi: "धन और जनशक्ति की कमी होती है, दुखी होता है, धन की हानि होती है, विद्या और बुद्धि में कमी होती है, दीर्घायु होता है, गुप्त विद्या से युक्त होता है",
                english:
                    "Gets deficiency of wealth and manpower, is unhappy, gets loss in wealth, has a deficiency in education and intellect, has a long life, possesses secret wisdom",
            },
            9: {
                hindi: "धन में वृद्धि, भारी आय, शत्रु के घर में प्रभाव प्राप्त होता है",
                english:
                    "Increases wealth, gets heavy income, acquires influence in the house of enemy",
            },
            10: {
                hindi: "सरकारी प्रशासन में प्रतिष्ठा प्राप्त करता है, खूब उन्नति करता है, धन कमाता है, प्रभावशाली व्यवसाय करता है, पत्नी के घर में कुछ बंधनों का सामना करता है, व्यवसाय की उन्नति के लिए अपनी पूरी शक्ति लगाता है, तथा हठी होता है।",
                english:
                    "Gets dignity in government administration, progresses much, earns wealth has an influential occupation faces some bondage in the, , wife's house, uses his full strength for the progress of occupation, and is obstinate",
            },
            11: {
                hindi: "अधिक कमाता है, धन-संपत्ति की प्राप्ति होती है, कुटुम्ब में लाभ होता है, सुन्दरता में कमी होती है।",
                english:
                    "Earns much, gets the power of wealth, advantage in the house of family, deficiency in handsomeness",
            },
            12: {
                hindi: "अधिक खर्च करता है, धन-संपत्ति का बल प्राप्त करता है, धनवानों जैसा दिखावा करता है, धर्म का पालन करने में असमर्थ होता है, गुप्त युक्तियों से शत्रु के घर में प्रभाव बनाए रखता है।",
                english:
                    "Spends much, gets the power ofwealth, maintains the show like a rich person, unable to rear Dharma, maintains influence in the house of enemy through secret tactics",
            },
        },
        Rahu: {
            1: {
                hindi: "शारीरिक कष्ट और चिंता सहता है, शरीर की सुन्दरता में कमी पाता है और कभी-कभी शारीरिक मार भी सहता है, शरीर को जोखिम में डालता है, युक्ति से काम निकालता है, अपनी उन्नति के लिए बहुत कठिन कार्य करता है, कभी-कभी दूसरों पर निर्भर रहना पड़ता है।",
                english:
                    "Bears physical distress and worry, gets the deficiency in handsomeness ofbody and sometimes bears physical blows, faces risk of his body, gets the work done with tactics, undertakes very difficult deeds for his progress, sometimes has to depend on others",
            },
            2: {
                hindi: "धन भाव में हानि, परिवार में कुछ कष्ट, धन प्राप्ति के लिए गूढ़ युक्तियां अपनाना, धन में कुछ दुःख सहना",
                english:
                    "Loss in the house ofwealth, bears some affliction in the family, uses deep tactics for getting wealth, bears some unhappiness in wealth",
            },
            3: {
                hindi: "बहुत ऊर्जावान होता है, बहुत साहस से काम करता है, महान युक्तियों का उपयोग करके सफलता प्राप्त करता है, भाई के घर में कुछ झगड़े का सामना करता है",
                english:
                    "Is very energetic, works very courageously, achieves success by using great tactics, faces some wrangling in the house of brother",
            },
            4: {
                hindi: "माता के घर में हानि होती है, सुख में अनेक बाधाएं आती हैं, भूमि और भवन के संबंध में कुछ कमी रहती है, माता और मातृभूमि से वियोग का सामना करना पड़ता है",
                english:
                    "Gets loss in mother's house, faces many obstacles in happiness, has some deficiency in connection with land and buildings, faces separation from mother and motherland",
            },
            5: {
                hindi: "शिक्षा और संतान पक्ष में कमी पाता है, बुद्धि भाव में कटुता और गोपनीयता का प्रयोग करता है, सत्य दिखाता है परंतु सत्य की परवाह नहीं करता",
                english:
                    "Gets deficiency in education and in children's side, uses bitterness and secrecy in the house of intellect, shows the truth but does not care for truth",
            },
            6: {
                hindi: "बहुत प्रभावशाली होता है और शत्रुओं का दमन करता है, बाधाओं और परेशानियों की परवाह नहीं करता, अपने स्वार्थ की पूर्ति करता है",
                english:
                    "Is very influential and suppresses the enemies, does not care for hindrances and troubles, serves his selfishness",
            },
            7: {
                hindi: "व्यवसाय में बहुत चतुराई से काम करता है, बहुत मेहनत करता है और व्यवसाय में प्रगति प्राप्त करने के लिए जटिल योजनाएँ बनाता है, असाधारण रूप से आकर्षक पत्नी पाता है, अधिक यौन सुख प्राप्त करता है, चतुर और चालाक होता है",
                english:
                    "Works very tactfully in the occupation, works very hard and chalks out complex plans for acquiring progress of occupation, gets an extraordinarily charming wife, gets more sexual pleasures, is clever and cunning",
            },
            8: {
                hindi: "जीवन में उलझनें, पेट और गुदा संबंधी शिकायतें, दैनिक जीवन में कठिनाई, गुप्त चिंताओं का सामना, तथा विदेश यात्रा में आनंद",
                english:
                    "Bears perplexities in his life, complaints about stomach and anus, gets difficulty in the daily routine of life, faces the secret anxieties, and finds happiness in travelling in foreign countries",
            },
            9: {
                hindi: "अपने भाग्य को लेकर चिंतित रहता है, भाग्य के उदय के संबंध में बाधाएं, परेशानियां और हानियां प्राप्त करता है, धर्म के संबंध में कमजोरी महसूस करता है",
                english:
                    "Gets anxious about his destiny, gets hindrances, troubles and losses in connection with the rise of fate, weakness in connection with Dharma",
            },
            10: {
                hindi: "अपनी उन्नति के लिए बड़े-बड़े हथकंडे अपनाता है, पिता से अप्रसन्न रहता है, व्यापारिक व्यवसाय में बहुत गुप्त रूप से कार्य करता है, सरकारी मामलों में लाभ पाता है, सामाजिक मामलों में चिंता पाता है।",
                english:
                    "Uses great tactics for his progress, unhappiness with father, works very secretly in business occupation, gets the advantage in government affairs, gets worry in social affairs",
            },
            11: {
                hindi: "अनेक लाभ प्राप्त करता है, आय के संबंध में दृढ़ता से कार्य करता है, लाभ प्राप्त करने के लिए गुप्त एवं जटिल नीतियों का प्रयोग करता है, सत्य या असत्य की परवाह नहीं करता",
                english:
                    "Gets numerous advantages, works with determination in connection with income, uses secret and intricate policies to get advantage, does not care for truth or falsehood",
            },
            12: {
                hindi: "अधिक खर्च करता है, व्यय में कष्ट और परेशानियों का सामना करता है, व्यय संबंधी चिंताओं से बचने के लिए अनेक उपाय करता है, व्यय को नियंत्रित करने में दृढ़ता लाने का बहुत प्रयत्न करता है, सत्य और असत्य का विचार करने में असमर्थ होता है।",
                english:
                    "Spends much, faces distress and troubles in the expenditure, uses many devices to escape from the worries in connection with expenditure, tries very hard to get firmness in managing the expenditure, is unable to think about truth and falsehood",
            },
        },
        Ketu: {
            1: {
                hindi: "लम्बे कद का, बहादुर, परिश्रमी और अभिमानी, अंधविश्वासी और लापरवाह, शारीरिक सुन्दरता में कमी, स्वयं को महान समझने वाला, छुपने और बहादुरी की शक्ति वाला, स्वार्थी",
                english:
                    "Is oftall stature, is brave, diligent and conceited, also superstitious and careless, gets deficiency in physical handsomeness, thinks himself to be great, has the power of concealment and bravery, is selfish",
            },
            2: {
                hindi: "धन संबंधी परेशानियां झेलता है, घर-परिवार में हानि उठाता है, हमेशा धन संचय के लिए प्रयास करता है और गुप्त विद्याओं का प्रयोग करता है।",
                english:
                    "Bears troubles in connection with wealth, gets loss in the house of family, always works for the accumulation ofwealth and uses occult practices",
            },
            3: {
                hindi: "भाई के घर में हानि, उसकी उन्नति के लिए बहुत परिश्रम, बहुत प्रभाव के साथ जीवन व्यतीत करना।",
                english:
                    "Loss in the house ofbrother, labours very hard for his progress, lives with great influence",
            },
            4: {
                hindi: "माता के घर में कष्ट पाता है तथा उनसे वियोग सहता है। सुख के सम्बन्ध में बेचैन रहता है, भूमि-भवन का अभाव पाता है, सुख प्राप्ति हेतु जोखिम उठाता है तथा अन्त में कुछ सुख प्राप्त करता है, सुख प्राप्ति हेतु हठी तथा धैर्यवान होता है।",
                english:
                    "Gets troubles in the house of mother and faces separation from her. is restless in connection with happiness, gets deficiency of land and buildings, takes risk in getting happiness and in the end gets some happiness, is obstinate about achieving happiness, and is patient",
            },
            5: {
                hindi: "बौद्धिक चिंताएं रखता है, बच्चों को कष्ट देता है, शिक्षा प्राप्त करने में अनेक कठिनाइयां पाता है, दूसरों को अपनी बात समझाने में असमर्थ होता है, कुछ कड़वा बोलता है, सत्य और शील का पालन नहीं करता, बहुत स्वार्थी और हठी होता है।",
                english:
                    "Bears intellectual worries, bears troubles in children, finds many difficulties in acquiring education, is unable to make others understand him, speaks somewhat bitterly, does not follow truth and modesty, is very selfish and obstinate",
            },
            6: {
                hindi: "वीर स्वभाव का, शत्रुओं का दमन करने वाला, बहुत अभिमानी, विरोधियों पर विजय पाने के लिए कठोर परिश्रम करने वाला, शत्रु और रोगों पर नियंत्रण पाने वाला, गुप्त योजनाएँ बनाने वाला, स्वार्थी कार्य करने वाला",
                english:
                    "Is of brave nature, suppresses the enemies, is very self-conceited, labours hard to get victory over opponents, gets control over the opponent and diseases, chalks out secret schemes, does selfish deeds",
            },
            7: {
                hindi: "पत्नी के घर में बहुत कष्ट सहता है, व्यवसाय में निर्भरता से परेशान रहता है, थका हुआ महसूस करता है, बड़ी कठिनाई और युक्तियों से आजीविका कमाता है, यौन सुख में कमी होती है।",
                english:
                    "Bears great trouble in wife's house, is troubled by dependence in occupation, feels fatigued, earns livelihood with great difficulty and tactics, deficiency in the sexual pleasures",
            },
            8: {
                hindi: "जीवन में बड़ी परेशानियां आती हैं, पेट, शरीर के निचले हिस्से या गुदा में शिकायत रहती है, दैनिक दिनचर्या में अनेक चिंताएं रहती हैं, रूखा स्वभाव होता है तथा धैर्यपूर्वक काम करता है।",
                english:
                    "Great troubles in his life, gets complaints in stomach, lower part of the body or anus, bears many worries in the daily routine, is rude and works patiently",
            },
            9: {
                hindi: "अपने भाग्य से चिंतित रहता है, यश में कमी होती है, धर्म में आस्था नहीं रखता",
                english:
                    "Feels worried by his destiny, deficiency in fame, does not keep faith in Dharma",
            },
            10: {
                hindi: "पिता के घर में कुछ कमी रहती है, व्यापार में कुछ चिंता रहती है, व्यापार और व्यवसाय की उन्नति के लिए धैर्यपूर्वक काम करता है",
                english:
                    "Has some deficiency in father's house, bears some worry in business, works patiently for progress of business and occupation",
            },
            11: {
                hindi: "भारी लाभ प्राप्त करता है, धन पाने के लिए बहुत हठपूर्वक काम करता है, बड़े लाभ के लिए प्रयास करता है",
                english:
                    "Gets heavy gains, works very obstinately to get money, tries for huge advantages",
            },
            12: {
                hindi: "अधिक खर्च करता है, व्यय के लिए स्थिर शक्ति के लिए काम करने की कोशिश करता है, भारी खर्च के साथ परेशानियों को सहन करता है, साहसपूर्वक काम करता है",
                english:
                    "Spends much, tries to work for stable power for expenditure, bears troubles with heavy expenditure, works courageously",
            },
        },
    },
    Capricorn: {
        Sun: {
            1: {
                hindi: "शारीरिक कष्ट और कठिन कार्य करने वाला, चेचक और उपदंश जैसे रोग से ग्रस्त, दीर्घायु, जीवन में कुछ अशांति, पत्नी के घर में कुछ विपत्ति, शिक्षा के घर में कुछ उलझन, आकर्षण और रंग में कुछ कमी, अभिमानी, तथा छिपाने की शक्ति वाला होता है।",
                english:
                    "Bears physical affliction and does difficult works, gets diseases like smallpox and syphilis, has a long life, has some restlessness in life, feces some calamity in the house ofwife, bears some perplexity in the house of education, has some deficiency in charm and complexion, is haughty, and gets the power of concealment",
            },
            2: {
                hindi: "धन भाव में हानि और कमी तथा परिवार के सदस्यों से अलगाव होता है, जीवन की दिनचर्या बहुत ही भव्यता और शान से व्यतीत होती है, दीर्घायु होती है और धन संचय में परेशानी होती है।",
                english:
                    "Bears loss and deficiency in the house of wealth and separation from family members, spends the daily routine oflife very aristocratically and with elegance, gets increased longevity and bears troubles in accumulating wealth",
            },
            3: {
                hindi: "प्रभाव के साथ जीवन व्यतीत करता है, दीर्घायु होता है, भाग्य और धर्म के घर को हानि पहुँचाता है, भाई के घर में क्लेश उत्पन्न करता है।",
                english:
                    "Spends his life with influence, gets a long age, injures the house of fortune and Dharma, feces distress in the house ofbrother",
            },
            4: {
                hindi: "गुप्त धन प्राप्त होता है, माता के घर में हानि होती है, दीर्घायु होता है, पिता के घर में कष्ट होता है, राज-काज और समाज में दुर्बलता होती है, दैनिक जीवन सुखपूर्वक व्यतीत करता है, कुछ हद तक निष्क्रिय और शीघ्रता करने वाला होता है।",
                english:
                    "Gets the hidden wealth, bears some loss in the mother's house, gets a long age, faces distress in father's house, gets weakness in government and society, spends the daily life with pleasure, is somewhat inactive, and is hasty",
            },
            5: {
                hindi: "संतान पक्ष में हानि और कष्ट सहता है, शिक्षा में कमजोरी होती है, कड़वी बातें करता है, अधिक धन कमाने के लिए अनेक हथकंडे अपनाता है।",
                english:
                    "Bears loss and distress in children's side, gets weakness in education, talks bitterly, uses numerous tactics to earn more wealth",
            },
            6: {
                hindi: "बहुत प्रभावशाली और अभिमानी होता है, दैनिक जीवन में प्रतिष्ठित होता है, लंबी आयु प्राप्त करता है, शत्रुओं को परास्त करता है, साहसी और धैर्यवान होता है",
                english:
                    "Is very influential and haughty, is dignified in daily life, gets long age, defeats enemies, courageous and is patient",
            },
            7: {
                hindi: "पत्नी पक्ष में कष्ट, गृहस्थ जीवन में चिंता, व्यवसाय के संबंध में चिंता, यौन जीवन में कष्ट, व्यवसाय के संबंध में विदेश से सम्पर्क, विचित्र एवं भयंकर कर्म।",
                english:
                    "Gets some affliction in wife's side, feels worried over domestic life, worries in connection with occupation, some distress in sexual life, gets the contact of foreign countries in connection with occupation and does some strange and dreadful deeds",
            },
            8: {
                hindi: "दीर्घायु, प्रभावशाली जीवन, धन की हानि, पारिवारिक क्लेश, गोपनीयता, अपने जीवन में गरिमामयी अनुभव, भविष्य की बिल्कुल भी परवाह न करने वाला, अभिमानी, तथा बड़बड़ाने वाला स्वभाव।",
                english:
                    "Lives long, spends influential life, loss ofmoney, gets family affliction, has a power of secrecy, feels dignified in his living, does not care at all about bis future, is haughty, and is of grumbling nature",
            },
            9: {
                hindi: "लंबी आयु प्राप्त करता है, भाग्य भाव में हानि पाता है, जीवन की दिनचर्या सौभाग्य से व्यतीत करता है, भाइयों के घर में कष्ट पाता है, स्वार्थी धर्म का पालन करता है, तथा सज्जनों जैसा जीवन व्यतीत करता है।",
                english:
                    "Gets long age, gets loss in the house of destiny, spends the daily routine of life fortunately, finds problems in the brothers' house, rears selfish Dharma, and lives like a gentlemen",
            },
            10: {
                hindi: "पिता के घर में हानि होती है, आयु के संबंध में कुछ कमजोरी होती है, कठोर परिश्रम करता है तथा व्यापार में चिंता का सामना करता है, सरकार में कुछ बेचैनी होती है, पैतृक भूमि और भवन का कुछ लाभ प्राप्त होता है।",
                english:
                    "Bears loss in father's house, has some weakness in connection with longevity, labours hard and faces worries in business, has some restlessness in the government, gains some parental advantages of land and buildings",
            },
            11: {
                hindi: "दीर्घायु, दैनिक दिनचर्या को प्रभाव और लाभ के साथ व्यतीत करने वाला, संतान पक्ष में हानि और विपत्ति सहने वाला, शिक्षा के मामले में कुछ चिंता करने वाला, बातचीत में कुछ गोपनीयता और कटुता बरतने वाला।",
                english:
                    "Good longevity, spends daily routine with influence and advantage, bears loss and calamity in children's side, has some worry in the house ofeducation, uses some secrecy and bitterness in conversation",
            },
            12: {
                hindi: "जीवन के प्रभाव में कुछ कमी रहती है, आयु के कारण कमजोरी आती है, अधिक खर्च करता है, शत्रुओं पर प्रभाव रखता है, व्यय भाव में कुछ कठिनाइयों का सामना करता है, नाभि के नीचे पेट में कुछ शिकायतें रहती हैं।",
                english:
                    "Has some deficiency in the influence of life, gets weakness in connection with age, spends much, keeps the influence on enemies, faces some difficulties in the house of expenditure, gets some complaints in the stomach below navel",
            },
        },
        Moon: {
            1: {
                hindi: "व्यवसाय को उच्च स्तर की एकाग्रता से संचालित करता है, पत्नी के घर में सौंदर्य और सुख में कुछ कमी होती है, यौन सुख की बहुत इच्छा रखता है और उसे प्राप्त भी करता है, श्वेत वर्ण का होता है, बहुत परिश्रमी होता है।",
                english:
                    "Conducts the occupation through a high standard ofconcentration, has some deficiency in the beauty and happiness in wife's house, wants sexual pleasures very much and gets the same, is ofwhite complexion, is very diligent",
            },
            2: {
                hindi: "व्यवसाय रेखा के माध्यम से बहुत धन संचय करता है, पत्नी के घर में बंधन और कमी का सामना करता है, परिवार में कुछ अप्रियता झेलता है",
                english:
                    "Accumulates much wealth through the line of occupation, faces bondage and deficiency in the house of wife, bears some unpleasantness in family",
            },
            3: {
                hindi: "व्यवसाय के लिए बहुत मेहनत करता है, प्रभावशाली और सुंदर पत्नी प्राप्त करता है, विशेष यौन शक्तियां प्राप्त करता है, धन वृद्धि पर ध्यान देता है, भाई-बहनों का संयोग होता है",
                english:
                    "Works very hard for occupation, gets an influential and beautiful wife, gets special sexual powers, pays attention to the rise of wealth, has conjunction of brothers and sisters",
            },
            4: {
                hindi: "परिवार में अच्छा सुख मिलता है, सुंदर पत्नी मिलती है, संपत्ति मिलती है, यौन सुख मिलता है, व्यवसाय में सुख मिलता है, सरकार और समाज में सम्मान मिलता है, खुश और प्रसन्न व्यक्ति होता है",
                english:
                    "Gets good happiness in family, gets a beautiful wife, gets property, gets sexual pleasures, gets happiness in occupation, gets honour in government and society, is a happy and jolly fellow",
            },
            5: {
                hindi: "व्यवसाय में अच्छा ज्ञान प्राप्त करता है, व्यवसाय को दृढ़तापूर्वक संचालित करता है, सुन्दर एवं बुद्धिमान पत्नी प्राप्त करता है, बहुत भावुक होता है, आय के घर में कुछ कमी होती है, कुशल एवं भावुक होता है।",
                english:
                    "Gets good knowledge in occupation, conducts the occupation in a determined way, gets a beautiful and wise wife, is very passionate, has some deficiency in the house ofincome, is skilful and passionate",
            },
            6: {
                hindi: "नौकरी में बाधा आती है, मानसिक उलझन रहती है, पत्नी के घर में चिंता रहती है, यौन सुख में कमी रहती है, रोगों और शत्रुओं से बचने के लिए अधिक व्यय करना पड़ता है।",
                english:
                    "Gets hindrances in occupation, faces mental perplexity, bears worries in wife's house, has deficiency in sexual pleasures, spends much to escape the diseases and enemies",
            },
            7: {
                hindi: "बहुत सुंदर पत्नी मिलती है, यौन सुख बहुत अधिक मिलता है, दृढ़ और अच्छा व्यवसाय करता है",
                english:
                    "Gets a very beautiful wife, gets sexual pleasures very much, pursues a firm and nice occupation",
            },
            8: {
                hindi: "पत्नी के घर में हानि, पारिवारिक मामलों के कारण मानसिक कष्ट, यौन सुख में कमी, व्यवसाय में कठिनाइयाँ, गुप्त ज्ञान की प्राप्ति",
                english:
                    "Bears loss in wife's house, bears mental affliction on account of family affairs, gets deficiency in the side of sexual pleasures, bears difficulties in occupation, gets secret knowledge",
            },
            9: {
                hindi: "सौभाग्यशाली पत्नी मिलती है, यौन मामलों में पवित्रता मिलती है, धार्मिक कार्यों में संलग्न रहता है, व्यापार में भाग्यशाली माना जाता है, तथा भाई-बहन मिलते हैं।",
                english:
                    "Gets a fortunate wife, gets the piety in sexual affairs, gets engaged in religious affairs, is thought to be fortunate in business, and gets brothers and sisters",
            },
            10: {
                hindi: "बहुत अच्छा व्यवसाय करता है, व्यापार में सम्मान पाता है, सरकार, समाज और परिवार में सम्मान पाता है, माता-पिता से सहायता प्राप्त करता है, पत्नी की ओर से सम्मान प्राप्त करता है, पत्नी से सुख प्राप्त करता है।",
                english:
                    "Pursues a very good occupation, gets honour in dealing with business, gets respect in government, society and family, gets the help from parents, gets dignity from wife's side, acquires happiness from wife",
            },
            11: {
                hindi: "पत्नी के घर से मानसिक अशांति, परिवार में सुख का अनुभव, साधारण यौन सुख प्राप्त, आय में कमी, विद्या एवं बुद्धि में तीखापन, बातचीत में क्रोध, व्यवसाय की उन्नति से प्रसन्नता",
                english:
                    "Mental restlessness from wife's house, experiences happiness in family, gets ordinary sexual pleasures, has deficiency in income, gets pungency in education and intellect, shows anger in conversation, is happy with the progress of occupation",
            },
            12: {
                hindi: "पत्नी के घर में हानि, यौन सुख में कमी, व्यवसाय में कमजोरी, अधिक खर्च, परिवार के बारे में चिंता, शत्रुओं के घर में शांति से काम करना, पारिवारिक व्यवसाय और व्यय में सफलता।",
                english:
                    "Bears loss in wife's house, deficiency in the side ofsexual pleasures, weakness in line ofoccupation, spends much, bears perplexity about family, works calmly in the house ofenemies, gets success in family occupation and expenditure",
            },
        },
        Mars: {
            1: {
                hindi: "बहुत सुख पाता है, बहुत संपत्ति और लाभ पाता है, मायके में विशेष सुख पाता है, व्यवसाय में और पत्नी के घर से भी कमी पाता है, यौन सुख में कमी होती है, व्यवसाय और यौन सुख के पक्ष में सुख के साधन बनाता है, अभिमानी और घमंडी होता है।",
                english:
                    "Gets happiness very much, gets lot ofproperty and gains, speciality in mother's house, gets deficiency in occupation and also from wife's house, deficiency in sexual pleasures, creates the means of happiness in the side of occupation and sexual pleasures Is self conceited and proud",
            },
            2: {
                hindi: "धन लाभ, भूमि-संपत्ति, सुख मिलता है, साथ ही संतान और शिक्षा के मामले में कुछ कमी रहती है।",
                english:
                    "Gets monetary gains, land and property, happiness with some deficiency in the house of children and education",
            },
            3: {
                hindi: "भाइयों का बल मिलता है, भूमि और माता के घर का लाभ मिलता है, व्यापार व्यवसाय में लाभ मिलता है, सरकार और समाज से भी सुख मिलता है, मान-सम्मान और प्रतिष्ठा मिलती है और चिंतामुक्त रहता है।",
                english:
                    "Gets the power of brothers, gets advantage of land and mother's house advantage in business occupation also happiness from, , government and society, gets honour and prestige and is carefree",
            },
            4: {
                hindi: "भूमि एवं संपत्ति से आय प्राप्त होती है, व्यवसाय के संबंध में आलस्य मिलता है, पत्नी से कमी मिलती है, यौन सुख में कमी मिलती है, सरकार एवं समाज से सुख मिलता है",
                english:
                    "Gets income from land and property, idleness in connection with occupation, deficiency from wife, gets deficiency in sexual pleasure, gets happiness from government and society",
            },
            5: {
                hindi: "अपनी बुद्धि से लाभ उठाता है, शिक्षा और संतान प्राप्त करता है, सदैव लाभदायक योजनाओं की बात करता है",
                english:
                    "Advantages through his intellect, gets education and children, always talks of profitable schemes",
            },
            6: {
                hindi: "कुछ प्रभावशाली पराधीनता कार्यों से लाभ और आय प्राप्त करता है, माता के घर में दुःख रहता है, रोगों और कठिनाइयों को दूर रखता है, धर्म में कुछ आस्था रखता है, शत्रुओं के पक्ष में लाभ प्राप्त करता है, अधिक व्यय करता है।",
                english:
                    "Gets the advantage and income through some influential deeds of dependence, unhappiness in mother's house, sets aside the diseases and difficulties, some faith in Dharma, gets the advantage in the side of enemies, spends much",
            },
            7: {
                hindi: "पत्नी के घर में हानि, माता के घर में कमी, व्यवसाय के संबंध में कमजोरी, आय के घर में अशांति और घरेलू सुख, यौन सुख में कमी",
                english:
                    "Gets loss in wife's house, deficiency in mother's house, weakness in connection with occupation, restless in the house of income and in domestic happiness, deficiency in sexual pleasures",
            },
            8: {
                hindi: "बहुत कुछ प्राप्त होता है, माता से वियोग, दीर्घायु का सुख मिलता है, जीवन की दिनचर्या में सुख मिलता है, घरेलू सुखों में दुःख होता है, साहस और लगन से काम करता है,",
                english:
                    "Gains much, separation from mother, gets happiness in longevity, happiness in the daily routine of life, unhappiness in domestic pleasures works courageously and diligently,",
            },
            9: {
                hindi: "बहुत भाग्यशाली और भाग्य का आनंद लेने वाला, जमीन और संपत्ति पाने वाला, माता से सुख पाने वाला, अति प्रसन्न, ऊर्जावान और भाइयों का सहयोग पाने वाला होता है।",
                english:
                    "Very fortunate and enjoys the fortune, gets land and property, acquires happiness from mother, is overjoyed, energetic and gets the support of brothers",
            },
            10: {
                hindi: "व्यापार और व्यवसाय से आय प्राप्त करता है, सरकार से लाभ प्राप्त करता है, पिता से लाभ प्राप्त करता है, शिक्षा से लाभ प्राप्त करता है, प्रभावशाली कार्य करता है",
                english:
                    "Gets income through business and occupation, gets the advantage from government, gets advantage from father, gets the advantage from education, does influential deeds",
            },
            11: {
                hindi: "आय में वृद्धि होती है, मायके से लाभ मिलता है, परिवार में शत्रुता दूर होती है, शिक्षा मिलती है, संतान की प्राप्ति होती है, शत्रुओं पर प्रभाव पड़ता है, रोग और विपत्तियों पर विजय मिलती है।",
                english:
                    "Gets the increased income, gets advantage from mother's house, gets enmity in family, gets some education, gets children, creates influence over enemies, gets victory over diseases and calamities",
            },
            12: {
                hindi: "माता और मातृभूमि की हानि होती है, आय में कमी होती है, पत्नी के सुख में कमी होती है, भाई के घर में कमी होती है, अधिक खर्च होता है, शत्रुओं के घर में प्रभाव रहता है, यौन सुख में कमी होती है।",
                english:
                    "Bears loss ofmother and motherland, gets weakness in income, has deficiency in happiness gets wife's happiness gets deficiency in, , brother's house, spends much, keeps influence in the enemies' house, has deficiency in sexual pleasures",
            },
        },
        Mercury: {
            1: {
                hindi: "चतुर, भाग्यशाली, सज्जन और प्रभावशाली, धर्म में आस्था रखने वाला, शत्रुओं पर विजय पाने वाला, शरीर में कुछ सामान्य रोग होने पर भी, व्यवसाय करने वाला, यौन सुखों में सामान्य रुचि रखने वाला होता है।",
                english:
                    "Is clever, fortunate, gentle and influential, has faith in Dharma, gets victory over enemies, gets some ordinary diseases in physique, pursues the occupation, has ordinary liking for sexual pleasures",
            },
            2: {
                hindi: "बहुत धनवान और भाग्यशाली होता है, परिवार से लाभ प्राप्त करता है लेकिन परिवार में थोड़ी कमी भी होती है, धन प्राप्ति में थोड़ी बेचैनी होती है",
                english:
                    "Is very wealthy and fortunate, gets advantage from the family but also has a little deficiency in the family, has some restlessness in acquiring wealth",
            },
            3: {
                hindi: "निष्क्रिय रहता है, भाग्य को महान समझता है, शत्रु पक्ष से चिंतित रहता है, किन्तु भाग्य से सुरक्षा प्राप्त करता है, भाग्योदय में कुछ विलम्ब का सामना करता है।",
                english:
                    "Is idle, thinks destiny to be great, feels worried from enemy side but gets the protection from destiny, faces some delay in the rise offate",
            },
            4: {
                hindi: "भाग्यबल से सुख मिलता है, भूमि-भवन का सुख मिलता है, शत्रुओं के घर में विजय मिलती है।",
                english:
                    "Gets the happiness through the power ofdestiny, gets the happiness of some land and buildings, gets the victory in enemies house",
            },
            5: {
                hindi: "बहुत चतुराई और बुद्धिमत्ता से काम करता है, धर्म का अच्छा ज्ञान रखता है, बहुत चतुर संतान प्राप्त करता है, सांसारिक शिक्षा प्राप्त करता है, बहुत धन अर्जित करता है, शत्रुओं पर प्रभाव रखता है",
                english:
                    "Works very cleverly and intelligently, possess good knowledge of Dharma, gets very clever progeny, gets worldly education, acquires much wealth, gets influence over enemies",
            },
            6: {
                hindi: "भाग्य में कमजोरी आती है, भाग्य की प्रगति के मार्ग में सदैव कुछ चिंताएं और कठिनाइयां आती रहती हैं, रोग, शत्रु और परेशानियों पर नियंत्रण हो जाता है, अधिक व्यय होता है।",
                english:
                    "Gets weakness in destiny, always gets some worries and difficulties in the way ofthe progress ofhis destiny, gets control over diseases, enemies and troubles, spends much",
            },
            7: {
                hindi: "अपने प्रबल भाग्य से व्यवसाय में उन्नति प्राप्त करता है, व्यवसाय के दैनिक प्रबंधन में सौभाग्य प्राप्त करता है, पत्नी पक्ष में कुछ सामान्य कष्ट होता है, पत्नी के कारण कुछ धार्मिक कर्तव्य करता है।",
                english:
                    "Gets the progress in occupation through his powerful destiny, gets good fortune in the daily management ofoccupation, some ordinary affliction in the wife's side, does some religious duties on account of wife",
            },
            8: {
                hindi: "भाग्य कमजोर, धर्म पक्ष में कमजोरी, धन वृद्धि के लिए युक्तियां अपनाने वाला, दीर्घायु एवं स्वार्थी होता है।",
                english:
                    "Gets weak destiny, weakness in the side of Dharma, uses the tactics for the increased ofwealth, gets a long age and is selfish",
            },
            9: {
                hindi: "भाग्यशाली होता है और बुद्धि से महान लाभ प्राप्त करता है, धर्म का पालन करता है, भाई से विरोध पाता है, और बहुत चतुर होता है",
                english:
                    "Is fortunate and gets great advantage through wisdom, rears Dharma, gets the opposition from brother, and is very clever",
            },
            10: {
                hindi: "प्रभाव प्राप्त करता है, स्वार्थपूर्वक धर्म का पालन करता है, व्यापार में उन्नति प्राप्त करता है, पिता के घर में कुछ बल और कुछ दुर्बलता प्राप्त करता है, सरकार से लाभ प्राप्त करता है, सम्माननीय और भाग्यशाली होता है।",
                english:
                    "Gets influence, rears the Dharma selfishly, acquires the progress in business, gains some strength and some weakness in the father's house, gets the advantage from the government, is honourable and fortunate",
            },
            11: {
                hindi: "चतुराई के कारण सौभाग्य प्राप्त होता है, आय के घर में कठिनाइयों का सामना नहीं करना पड़ता, अच्छी शिक्षा और बुद्धि प्राप्त होती है, शत्रुओं के घर से लाभ प्राप्त होता है, और प्रभावशाली होता है।",
                english:
                    "Gets good fortune on account ofcleverness, does not face difficulties in the house ofincome, gets good education and intelligence, gains advantage from enemies' house, and is influential",
            },
            12: {
                hindi: "धर्म के घर में हानि, अधिक व्यय, भाग्योदय में विलम्ब और चिंता।",
                english:
                    "Loss in the house ofDharma, spends much, finds delays and worries in the rise of fete",
            },
        },
        Jupiter: {
            1: {
                hindi: "शारीरिक कष्ट और क्षीण शरीर, व्यय में कमी, भाई-बहनों की ओर से कमजोरी, शारीरिक सुन्दरता में कमी, पत्नी के घर में कुछ शोभा, व्यवसाय में उन्नति, संतान पक्ष से बल प्राप्त होता है।",
                english:
                    "Bears physical troubles and has an emaciated body, has deficiency in expenditure, has weakness from the side of brothers and sisters, has deficiency in physical handsomeness, gets some elegance in the wife's house, acquires the progress of occupation, gains strength from children's side",
            },
            2: {
                hindi: "धन भाव में हानि और कमी होती है, भाई पक्ष में कमी होती है, अपेक्षित सफलता नहीं मिलती, परिवार भाव में कुछ कमी होती है।",
                english:
                    "Bears loss and deficiency in the house ofwealth, has deficiency in brother's side, does not achieve the required success, some deficiency in the house of family",
            },
            3: {
                hindi: "अधिक खर्च करता है, परिवार और व्यवसाय में लाभ प्राप्त करता है, यौन सुख की विशेष इच्छा रखता है, और भाइयों के घर में कमजोरी पाता है",
                english:
                    "Spends much, gets advantage with family and profession, possesses a special desire for sexual pleasures, and gets weakness in brothers' house",
            },
            4: {
                hindi: "शान से खर्च करता है, खर्च को आराम से चलाता है और जमीन-जायदाद में कुछ नुकसान और कमजोरी झेलता है, सुख-शांति पाने में रुकावटों का सामना करता है, खर्च की अधिकता पर नियंत्रण नहीं रख पाता, कुछ हद तक बेचैन रहता है",
                english:
                    "Spends majestically, manages the expenditure comfortably and bears some loss and weakness in land and property, faces obstacles in acquiring peace and happiness, unable to control the excess of expenditure, is somewhat restless",
            },
            5: {
                hindi: "व्यय का प्रबंधन बुद्धिमानी से करता है, शिक्षा में कमी रखता है, संतान पक्ष में हानि उठाता है, शरीर की सुन्दरता में कमी होती है, बेचैनी महसूस करता है, और चतुर होता है।",
                english:
                    "Manages the expenditure wisely, has deficiency in education, bears some loss in children's side, has deficiency in handsomeness of the body, feels restlessness, and is clever",
            },
            6: {
                hindi: "व्यय के सम्बन्ध में चिन्ता और निर्भरता रहती है, भाइयों से विरोध का सामना करना पड़ता है, धन संचय में कमी रहती है, स्वतन्त्रता में बाधा आती है, चतुराई से शत्रुता उत्पन्न करता है, गुप्त नीतियों से काम करता है, आलसी स्वभाव का होता है।",
                english:
                    "Has worries and dependence in connection with expenditure, faces opposition from brothers, has deficiency in accumulating wealth, faces obstacles in his independence, causes enmity cleverly, works with hidden policies, is of idle nature",
            },
            7: {
                hindi: "व्यवसाय में ऊर्जावान तरीके से काम करता है, अधिक खर्च करता है, विशेष यौन शक्ति और खुशी प्राप्त करता है, शरीर में कमजोरी होती है, भाई-बहनों के साथ संपर्क बनाए रखता है",
                english:
                    "Works energetically in the line of occupation, spends much, gets special sexual powers and happiness, has weakness in body, maintains contact with brothers and sisters",
            },
            8: {
                hindi: "बल और ऊर्जा में कमजोरी होती है, व्यय के संबंध में बाधाओं का सामना करना पड़ता है और अधिक खर्च होता है, विदेश से लाभ होता है, भाई-बहनों के संबंध में कमजोरी होती है, धन संचय भाव में कमी होती है, जीवन की दिनचर्या प्रभावशाली और सम्मानपूर्वक व्यतीत होती है।",
                english:
                    "Has weakness in his strength and energy, faces hindrances in connection with expenditure and spends much, gets gains from foreign countries, gets weakness in connection with brothers and sisters, has deficiency in the house ofaccumulating wealth, spends the daily routine of life influentially and with dignity",
            },
            9: {
                hindi: "भाग्य और धर्म में कमजोरी मिलती है, भाई से सहयोग मिलता है, सुन्दर नहीं होता, बच्चों के घर में कुछ हानि होती है।",
                english:
                    "Gets weakness in destiny and Dharma, gets the cooperation from the brother with some weakness, is not handsome, gets some loss in children's house",
            },
            10: {
                hindi: "पिता के घर में हानि, व्यवसाय, मान-प्रतिष्ठा में कुछ कमी और हानि, विशेष प्रयास के बावजूद सफलता नहीं मिलती, अधिक व्यय, धन की कमी और धन हानि होती है।",
                english:
                    "Loss in father's house, bears some deficiency and loss in occupation, honour and prestige, does not get success in spite ofputting special efforts, spends much, faces some monetary deficiency and some monetary loss",
            },
            11: {
                hindi: "अनेक लाभ प्राप्त होते हैं, कुछ कमी वाले भाई-बहनों का लाभ मिलता है, सुंदर पत्नी मिलती है, व्यवसाय में उन्नति होती है",
                english:
                    "Gets numerous advantages, gets the advantage ofthe brothers and sisters with some deficiency, gets a beautiful wife, acquires progress in occupation",
            },
            12: {
                hindi: "अधिक व्यय करने वाला, माता पक्ष में कुछ दुर्बलता का सामना करने वाला, भाइयों के घर में अभावग्रस्त, अपने दैनिक जीवन में वैभव प्राप्त न कर पाने वाला, प्रयत्न करने पर भी व्यय कम न कर पाने वाला, अधिक भटकने वाला, तथा अशांत स्वभाव का होता है।",
                english:
                    "Spends much, faces some weakness in mother's side, gets deficiency in brothers' house, fails to get grandeur in his daily routine oflife, is unable to decrease the expenditure though tries hard for the same, wanders much, and is ofrestless disposition",
            },
        },
        Venus: {
            1: {
                hindi: "बहुत सम्मानीय, चतुर, बुद्धिमान और बहुत अच्छे और उच्च स्तर के कर्म करने वाला, बड़े व्यवसाय करने वाला, पिता से सम्मान और लाभ पाने वाला, सरकार से लाभ पाने वाला, जनता में सम्मान पाने वाला, अनेक व्यवसाय करने वाला, यौन सुखों का आनंद लेने वाला और संतान का सुख पाने वाला, सौंदर्य पसंद करने वाला और ज्योतिष का बहुत बड़ा प्रेमी होता है।",
                english:
                    "Is very respectable, clever, wise and does very nice and high standard deeds pursues big occupation gets honour and advantage from, , father, gets advantage from the government, gets respect in public, does many occupations, enjoys the sexual pleasures and gets the happiness of children, likes beauty, and is very much a lover of astrology",
            },
            2: {
                hindi: "बहुत धन संचय करता है, पिता के घर से शक्ति प्राप्त करता है, विद्या और बुद्धि से चतुराई से धन अर्जित करता है, बड़ा व्यापार चलाता है, सौभाग्यशाली होता है, संतान पक्ष से कष्ट भोगता है, सरकार और समाज से लाभ प्राप्त करता है, दैनिक जीवन में मान-सम्मान प्राप्त करता है।",
                english:
                    "Accumulates much wealth, gets power from father's house, earns wealth cleverly through education and intellect, manages a big business, has good luck, faces bondage from the children's side, gets the advantage from the government and society, acquires honour and respect in the daily routine",
            },
            3: {
                hindi: "बहुत प्रभावशाली और सुंदर कद-काठी वाला होता है, भाई-बहनों वाला होता है, बहुत ज्ञान और शिक्षा प्राप्त करता है, सरकारी मामलों में लाभ पाता है, धर्म में हानि होती है, अच्छा प्रबंधक होता है",
                english:
                    "Is very influential and possesses a handsome stature, has brothers and sisters, gets much wisdom and education, gets advantage in government affairs, gets loss in Dharma, is a good manager",
            },
            4: {
                hindi: "अनेक लाभ प्राप्त करता है, बड़ा व्यवसाय चलाता है, माता-पिता और बच्चों से सुख प्राप्त करता है, शिक्षा प्राप्त करता है, भवन और संपत्ति का स्वामी होता है, सरकार और समाज से लाभ प्राप्त करता है, सौंदर्य और कला का इच्छुक होता है, सम्मानीय होता है।",
                english:
                    "Gets numerous advantages, manages a big business, gains happiness from parents and children, gets education, owns building and property, gets the advantage from the government and society, wants beauty and art, is respectable",
            },
            5: {
                hindi: "विभिन्न विषयों का ज्ञान प्राप्त करता है, अधिक राजनीतिक ज्ञान प्राप्त करता है, बच्चों से सहयोग प्राप्त करता है, सरकार और समाज से लाभ प्राप्त करता है, सजावट, सौंदर्य और नशा पसंद करता है, तथा मजाकिया होता है।",
                english:
                    "Acquires knowledge on various things, gets more political knowledge, gets support from children, gains advantages from government and society, likes decoration, beauty and intoxication, and is witty",
            },
            6: {
                hindi: "पिता के घर से शत्रुता, संतान से कष्ट, विद्या का प्रभाव, परावलंबन, अधिक व्यय, गुप्त बुद्धि से शत्रुओं को परास्त, रोगों पर नियंत्रण, शासन व समाज से विरोध, बहुत चतुर",
                english:
                    "Enmity from father's house, faces some trouble from children, gets the influence of education, gets some dependence, spends much, defeats the enemies with secret tactics of wisdom, gets control over the diseases, faces some opposition from government and society, and is very clever",
            },
            7: {
                hindi: "शक्तिशाली व्यवसाय करता है, बच्चों से बल प्राप्त करता है, परिवार का सुख प्राप्त करता है, सरकार और समाज के लिए सम्माननीय कार्य करता है, व्यापार में कुछ कमी होती है, धन वृद्धि पर ध्यान देता है, बहुत कूटनीतिक नीतियाँ बनाता है, मानसिक रूप से चिंतित रहता है।",
                english:
                    "Pursues a powerful occupation, gets the strength from children, gains happiness of the family, does honourable deeds for the government and society, has some deficiency in business, pays attention to increase the wealth, rears very diplomatic policies, and is mentally worried",
            },
            8: {
                hindi: "पिता की मृत्यु का दुःख सहता है, शिक्षा में कमी होती है, बातें छिपाकर बोलता है, सरकार और समाज में सम्मान पाने का प्रयास करता है, व्यापार की प्रगति में कुछ कमी होती है, लेकिन धन वृद्धि पर ध्यान देता है।",
                english:
                    "Bears loss offather, has deficiency in education, talks by concealing things, tries to get honour in the government and society, has some deficiency in the progress ofbusiness, but pays attention to increase the wealth",
            },
            9: {
                hindi: "भाग्य भाव में कुछ कमजोरी होती है, पिता की ओर से कुछ कमजोरी होती है, भाग्यशाली माना जाता है, सरकार और समाज में सम्मान प्राप्त होता है, भाई-बहन होते हैं, व्यापार और व्यवसाय में कुछ कमजोरी का सामना करना पड़ता है",
                english:
                    "Has some weakness in the house ofdestiny, some weakness from the side offather, is supposed to be fortunate, gets honour in government and society, gets brothers and sisters, faces some weakness in business and occupation",
            },
            10: {
                hindi: "शासकीय एवं प्रशासनिक शक्ति प्राप्त करता है, न्यायाधीश होता है, उच्च स्तर की शिक्षा प्राप्त करता है, पिता से शक्ति और माता से सुख प्राप्त करता है, संपत्ति का स्वामी होता है, बड़े व्यवसाय करता है, सौंदर्य और कला को पसंद करता है, गरिमा और प्रभाव के साथ बात करता है, बहुत अभिमानी, सम्माननीय, विद्वान और मेहनती होता है।",
                english:
                    "Gets government and administrative power, is a judge, gets a very high standard education, gets power from father and happiness from mother, possesses property, follows a big occupation, likes beauty and art, talks with dignity and influence, is very self-conceited, respectable, learned and industrious",
            },
            11: {
                hindi: "व्यापार से बड़ा लाभ पाता है, पिता-पुत्र, वार्तालाप, सरकार और समाज से लाभ पाता है, यौन सुख और वैभव के सुगम साधन प्राप्त करता है, चतुर और परिश्रमी होता है",
                english:
                    "Gets great advantages from business, gets advantage from father and son, conversation, government and society, gets the easy means of sexual pleasures and grandeur, is clever and industrious",
            },
            12: {
                hindi: "अधिक खर्च करता है, पिता और पुत्र की हानि उठाता है, शिक्षा में कमी रखता है, व्यापार, सरकार और समाज में हानि उठाता है, व्यय का प्रबंधन चतुराई से करता है, तथा कुछ हद तक निष्क्रिय और आलसी होता है।",
                english:
                    "Spends much, bears the loss of father and son, has deficiency in education, bears loss in business, government and society, manages the expenditure cleverly, and is somewhat inactive and idle",
            },
        },
        Saturn: {
            1: {
                hindi: "बहुत धनवान, कुलीन जीवन जीने वाला, महंगे वस्त्र पहनने वाला, पिता के घर से उन्नति पाने वाला, बड़ा व्यापार करने वाला, भाइयों के घर में कमज़ोर, समाज में नाम और सम्मान पाने वाला, परिवार में विरोध सहने वाला तथा सम्माननीय होता है।",
                english:
                    "Is very rich, lives aristocratically, wears costly dresses, gets progress from father's house, pursue a big business occupation, deficiency in brothers' house, gets name and honour in the society, gets some opposition in family and is honourable",
            },
            2: {
                hindi: "बहुत धनवान होता है तथा धन संचय करता है, धन के लिए अपने प्राणों को जोखिम में डालता है, परिवार की उन्नति होती है, पराये पक्ष से कमजोरी होती है, जमीन जायदाद में कमी होती है, सुख के घर में कमी होती है, जीवन की दिनचर्या में अशांति होती है",
                english:
                    "Is very rich and accumulates wealth, risks his life for wealth, acquires progress of the family, weakness from other's side, deficiency in landed property, deficiency in the house of happiness, restlessness in the daily routine of life",
            },
            3: {
                hindi: "बहुत प्रभावशाली और ऊर्जावान होता है, बहुत मेहनत करता है, भाई-बहनों के घर में कमी होती है, खर्च में कमी होती है, ईश्वर में विश्वास रखता है",
                english:
                    "Is very influential, and energetic, works very hard, has deficiency in the house ofbrothers and sisters, deficiency in expenditure, believes in God",
            },
            4: {
                hindi: "सुख भाव में अशांति व कमी, शत्रु भाव में प्रभाव, बड़ा व्यापार, भूमि-संपत्ति में कमी",
                english:
                    "Restlessness and deficiency in the house of happiness, gets influence in the house ofenemies, does a big business, deficiency in the land and property",
            },
            5: {
                hindi: "वह अत्यंत सुंदर, बुद्धिमान, चतुर और विद्वान होता है, अपनी बुद्धि से बहुत धन कमाता है, पत्नी के घर में कुछ शत्रुता का सामना करता है, अनेक विषय-सुखों की इच्छा रखता है, व्यवसाय की प्रगति पर ध्यान देता है और एक अच्छा प्रबंधक होता है।",
                english:
                    "Is very handsome, wise, clever and learned, earns much wealth through his wisdom, faces some enmity in the house ofwife, wants many sensual pleasures, pays attention to the progress of occupation and is a good manager",
            },
            6: {
                hindi: "बहुत प्रभावशाली और शत्रुओं पर विजय पाने वाला, जीवन की दिनचर्या में कुछ चिंता और बेचैनी वाला, व्यय में बाधा, भाई के घर में शत्रुता, धन संचय में कमी, सुंदरता में कमी, चतुर और सतर्क होता है।",
                english:
                    "Is very influential and gets victory over enemies, has some worry and uneasiness in the daily routine of life, experiences hindrances in expenditure, gets enmity in the house of brother, has deficiency in accumulating wealth, has deficiency in the handsomeness, is clever and cautious",
            },
            7: {
                hindi: "व्यवसाय में कठोर परिश्रम, पत्नी के प्रति अत्यधिक मोह, परिवार में शत्रुता, व्यवसाय में बेचैनी, भाग्य वृद्धि के लिए अत्यधिक प्रयत्न, भूमि एवं भवन की कमी।",
                english:
                    "Labours hard in the line ofoccupation, has a great fascination for wife, develops some enmity in the family, gets uneasiness in occupation, tries very hard for the rise ofdestiny, deficiency ofland and buildings",
            },
            8: {
                hindi: "विदेश में रहने वाला, शरीर में कष्ट सहने वाला, धन की हानि सहने वाला, विद्या और संतान प्राप्त करने वाला, दीर्घायु होता है, धन संचय में बाधाएँ झेलने वाला, बहुत परिश्रमी होता है।",
                english:
                    "Lives in foreign countries and bears troubles in the body, bears the loss ofwealth, gets education and children, gets a long age, faces hindrances in accumulating wealth, is very industrious",
            },
            9: {
                hindi: "बहुत भाग्यशाली, धार्मिक, गुणी और सुन्दर शरीर वाला, बहुत भाग्यशाली प्रतीत होता है, आय भाव में शत्रुता होती है, शत्रुओं और विरोधियों पर अच्छा प्रभाव होता है, रोगों पर नियंत्रण रखता है, भाई-बहनों के भाव में कुछ खटास उत्पन्न करता है।",
                english:
                    "Is very fortunate, religious, virtuous and possesses a handsome body, seems to be very lucky, has enmity in the house ofincome, has nice influence over enemies and opponents, controls the diseases, feces some sourness in the house ofbrothers and sisters",
            },
            10: {
                hindi: "धन के बल पर बड़ा व्यापार करता है, तेजस्वी शरीर पाता है, बहुत प्रभावशाली होता है, राजभवन में सम्मान और पिता के भाव में उन्नति पाता है, माता के भाव में कमी होती है, पत्नी पक्ष में शत्रुता होती है, व्यवसाय में चिंता होती है, यौन सुख का वैभव प्राप्त होता है।",
                english:
                    "Does a big business with the help ofmoney, gets a splendid body, is very influential, gets honour in the house of government and progress in the house of father, has deficiency in mother's house, gets enmity in wife's side, gets worries in the line of occupation, gets the splendour of sexual pleasure",
            },
            11: {
                hindi: "खूब धन कमाता है, यश पाता है, धन वृद्धि में सदैव लगा रहता है, विद्या और बुद्धि में उन्नति करता है, संतान से बल पाता है, भारी विचार रखता है",
                english:
                    "Earns much wealth, gets fame, is always busy in increasing money, gets progress in education and wisdom, gets the power from children, puts forward weighty ideas",
            },
            12: {
                hindi: "अधिक व्यय करता है, अन्य स्थानों पर रहता है, शरीर क्षीण हो जाता है, अन्य घरों से धन प्राप्त होता है, अत्यधिक व्यय के कारण धन वृद्धि में कठिनाई होती है, तथा सदैव दुखी रहता है।",
                english:
                    "Spends much and lives in other places, gets emaciated body gets wealth through other houses, difficulties for the increase of wealth due to excessive expenditure, and always unhappy",
            },
        },
        Rahu: {
            1: {
                hindi: "कुछ शारीरिक व्याकुलता और एक प्रकार का नशा, शरीर में कुछ कमी महसूस करता है, बहुत चतुराई से और छिपाव की शक्ति से उन्नति का मार्ग खोज लेता है, कुछ चिंताओं को सहकर कुछ दृढ़ता प्राप्त कर लेता है, सत्य-असत्य की परवाह न करते हुए बहुत ही सौम्यता से अपना कार्य संपन्न कर लेता है।",
                english:
                    "Bears some physical perplexity and feels a sort ofintoxication, some deficiency in his body, finds the way ofprogress very cleverly and through the power ofconcealment, gets some firmness after bearing some worries, gets his work done through very gentle manner not caring for truth or falsehood",
            },
            2: {
                hindi: "धन भाव में हानि होती है, धन वृद्धि के लिए सदैव चिन्तित रहता है, धन वृद्धि के लिए कठिन कर्म करता है, धन के लिए कभी-कभी बड़ी विपत्ति का सामना करता है, परिवार से वियोग पाता है।",
                english:
                    "Gets loss in the house ofwealth, is always worried for the increase in the wealth, does difficult deeds for increasing the wealth, sometimes faces great calamity for wealth, gets the separation of family",
            },
            3: {
                hindi: "बहुत प्रभावशाली और बहुत साहस से काम करने वाला, भाई के घर में कुछ नुकसान का सामना करने वाला, अपना प्रभाव बढ़ाने के लिए बहुत गुप्त युक्तियों का उपयोग करने वाला, बहुत चालाक, सतर्क और घमंडी होता है।",
                english:
                    "Is very influential and works very courageously, faces some loss in the house of brother, uses very secret tactics to increase his influence, is very clever, cautious and haughty",
            },
            4: {
                hindi: "माता को कष्ट होता है, निवास स्थान में कुछ कमी होती है, सुख-सुविधाओं का अभाव होता है, गुप्त शक्तियों का सहयोग प्राप्त होता है।",
                english:
                    "Causes affliction to mother, has some deficiency in the residential place, lacks pleasures and happiness, gets the support of hidden powers",
            },
            5: {
                hindi: "संतान पक्ष से कष्ट, शिक्षा में कमी, नशे की इच्छा, बातचीत में स्पष्टता, सच-झूठ की परवाह न करना",
                english:
                    "Gets distress in children's side, gets deficiency in education, wants some intoxicants, shows clarity in conversation, does not care for truth or falsehood",
            },
            6: {
                hindi: "बहुत प्रभावशाली होता है, शत्रु को परास्त करता है, महान विजय प्राप्त करता है, कूटनीति, बुद्धि और चतुराई से उन्नति करता है, बहुत लापरवाही और अभिमान के साथ काम करवाता है, रोगों पर नियंत्रण पाता है, स्वार्थी, निडर और अभिमानी होता है",
                english:
                    "Is very influential, defeats the enemy, gets great victory, progresses through diplomacy, wisdom and cleverness, gets the work done very carelessly and with pride, gets control over diseases, is selfish, fearless and haughty",
            },
            7: {
                hindi: "पत्नी के घर में भारी हानि, यौन सुख में कमी, व्यवसाय में बाधा, पारिवारिक मामलों में मानसिक चिंता, यौन सुख के प्रति अंधाधुंध होकर अनाधिकृत लाभ उठाने का प्रयास, अस्थिर मन",
                english:
                    "Bears great loss in wife's house, deficiency in sexual pleasures, finds obstacles in occupation, faces the mental worries in connection with family affairs, tries to reap the unauthorised advantages being indiscriminate in the side of sexual pleasures, and is of unstable mind",
            },
            8: {
                hindi: "चिंतित रहता है, नाभि के नीचे पेट में रोग होता है, दैनिक जीवन में कष्ट सहता है, दीर्घायु पर आघात सहता है, विरासत को हानि पहुँचाता है, विदेश यात्रा में कष्ट पाता है, धन वृद्धि चाहता है",
                english:
                    "Is worried, gets diseases in the stomach below navel, bears agony in daily routine of life, bears blows over longevity, injures the legacy, faces distress in travelling to foreign countries, wants to increase wealth",
            },
            9: {
                hindi: "अपने जीवन के बारे में चिंतित रहता है, भाग्य से आघात सहता है, धर्म में कमी होती है, बहुत चतुर और चालाक होता है",
                english:
                    "Has anxieties about his life, faces blows over destiny, has deficiency in Dharma, is very clever and cunning",
            },
            10: {
                hindi: "पिता के घर में कुछ दुःख रहता है, व्यापार और उन्नति में कुछ बाधाएँ आती हैं, सरकार से जुड़े कार्य कुछ चिंताओं का सामना करने के बाद पूरे होते हैं।",
                english:
                    "Has some unhappiness in father's house, gets some obstacles in business and progress, gets the work done connected with government after facing some worries",
            },
            11: {
                hindi: "बहुत अधिक लाभ प्राप्त करता है, अधिक से अधिक पाने के लिए प्रयत्नशील रहता है, अनावश्यक धन चाहता है और उसे प्राप्त भी कर लेता है, आय के घर में चिंता रहती है, स्वार्थी होता है।",
                english:
                    "Gains very much, tries hard to get more and more, wants gratuitous wealth and gets it likewise, worries in the house ofincome, selfish",
            },
            12: {
                hindi: "खर्च के सम्बन्ध में कुछ कष्ट सहता है, कुछ कमी से खर्च चलाता है, लालची होता है",
                english:
                    "Bears some troubles regarding expenditure, manages the expenditure with some shortage, is greedy",
            },
        },
        Ketu: {
            1: {
                hindi: "बहुत हठी, शरीर में घाव होने, शारीरिक चिंताएं झेलने वाला, यश पाने के लिए अपयश की परवाह न करने वाला, कष्टों की परवाह न करने वाला, शारीरिक रूप से आवेशी, गुप्त तरीकों से अपना काम निकलवाने वाला, स्वार्थी होता है।",
                english:
                    "Is very obstinate, gets wounds in the body, bears some physical worries, does not care about disrepute for acquiring the fame, does not care about the troubles, is physically passionate, gets his work done through secret means, is selfish",
            },
            2: {
                hindi: "धन की कमी होती है, धन प्राप्ति के लिए कठोर परिश्रम करता है, भयंकर विपत्तियों का सामना करता है",
                english:
                    "Has deficiency in the side of wealth, works hard for acquiring wealth, feces severe calamities",
            },
            3: {
                hindi: "बहुत ऊर्जावान और परिश्रमपूर्वक काम करने वाला, भाई-बहनों की हानि सहने वाला, गंभीर असफलताओं का सामना करने वाला, शक्ति में कमी महसूस करने वाला होता है।",
                english:
                    "Is very energetic and works diligently, bears loss ofbrothers and sisters, feces severe failures, feels deficiency in the strength",
            },
            4: {
                hindi: "माता के सुख में कमी, मातृभूमि और जन्मभूमि से वियोग सहना, भवन और निवास स्थान में बाधा उत्पन्न करना, गुप्त नीतियों से साहस प्राप्त करना",
                english:
                    "Deficiency of happiness from mother, bears separation from motherland and birthplace, feces obstacles in buildings and residential places, gains courage through secret policies",
            },
            5: {
                hindi: "स्थिर बुद्धि और आंतरिक ज्ञान से काम करता है, शिक्षा प्राप्त करने में कठिनाई होती है, संतान पक्ष में कष्ट होता है, गुप्त युक्तियों का प्रयोग करता है और सत्य और असत्य की परवाह नहीं करता।",
                english:
                    "Works with stable wisdom and inner knowledge, has difficulties in acquiring education, feces distress in the side ofchildren, uses secret devices and does not care for truth and falsehood",
            },
            6: {
                hindi: "शत्रुओं को कष्ट पहुंचाता है, रोगों और कष्टों से मुक्ति दिलाता है, निर्भय होता है",
                english:
                    "Causes injury to enemies, gets rid of the diseases and difficulties, is fearless",
            },
            7: {
                hindi: "पत्नी के घर में हानि और बाधाएँ, पारिवारिक जीवन में बड़ी चिंताएँ, व्यवसाय में अनेक असफलताएँ और हानि, यौन सुख की लालसा मकर * 227",
                english:
                    "Loss and obstacles in wife's house, experiences great worries in family life, faces many failures and loss in the occupation, longs for sexual pleasures Capricorn * 227",
            },
            8: {
                hindi: "नाभि के नीचे पेट में कष्ट और विकार, दैनिक जीवन में चिंता, आयु में कष्ट, यात्रा में कष्ट",
                english:
                    "Bears troubles and disorder in the stomach below navel, bears worries in daily routine of life, gets blows on the age, gets distress in connection with travelling",
            },
            9: {
                hindi: "भाग्य भाव में चिंताएं रहती हैं, आंतरिक दुर्बलता रहती है, भाग्योदय में विलम्ब होता है, गुप्त शक्तियों का प्रयोग होता है, यश में कमी होती है, धर्म का पालन नहीं करता।",
                english:
                    "Bears worries in the house ofdestiny, gets some internal weakness, feces delay in rise offortune, uses secret powers, has deficiency in fame, does not rear Dharma",
            },
            10: {
                hindi: "पिता के घर में कुछ बाधाओं का सामना करना पड़ता है, व्यापार में चिंताएं रहती हैं, व्यापार की उन्नति के लिए कठोर परिश्रम करना पड़ता है, सरकार में कुछ उलझनें रहती हैं, स्वार्थी और मेहनती होता है।",
                english:
                    "Faces some obstacles in the father's house, bears worries in business, puts hard work for the progress ofbusiness, some perplexity in the government, is selfish and industrious",
            },
            11: {
                hindi: "अनेक लाभ प्राप्त करता है, धन प्राप्ति के लिए कठिन कर्म करता है, अधिक धन प्राप्ति के लिए गुप्त युक्तियों का प्रयोग करता है, आय में स्थिरता प्राप्त करता है, तथा स्वार्थी होता है",
                english:
                    "Gets many advantages, does difficult deeds for getting wealth, uses secret devices for getting more wealth, gets stability in income, and is selfish",
            },
            12: {
                hindi: "बहुत अधिक फिजूलखर्ची करता है, खर्च को बड़ी ताकत से प्रबंधित करता है, खर्च को नियंत्रित करने में असमर्थ होता है, दूसरों पर अंधविश्वास करता है",
                english:
                    "Spends much extravagantly, manages the expenditure with great force, unable to control the expenditure, has blind faith on others",
            },
        },
    },
    Aquarius: {
        Sun: {
            1: {
                hindi: "प्रभावशाली पत्नी मिलती है और प्रभावशाली व्यवसाय करता है, शरीर में कुछ कमजोरी आती है, यौन सुख भोगने की शक्ति मिलती है, पत्नी को बहुत सम्मान देता है, कुछ शत्रुता रखता है, सम्मान पाता है, ओजस्वी होता है, तथा बड़े कार्य करने पर भी असंतुष्ट रहता है।",
                english:
                    "Gets influential wife and pursues influential occupation, gets some weakness in the body, gets the power of enjoying sexual pleasures, gives much dignity to wife with some enmity, gets honour, possesses vigour, and feels unsatisfied even on accomplishing big tasks",
            },
            2: {
                hindi: "व्यवसाय से धन अर्जित करता है, पत्नी के घर में आकर्षण पाता है, जीवन की दिनचर्या पर प्रभाव डालता है, मूल्यवान कार्य करता है और परिवार का स्वामी होता है।",
                english:
                    "Earns wealth through occupation, gets fascination in the house of wife, has some influence in the daily routine oflife, does valuable deeds and possesses family",
            },
            3: {
                hindi: "महान व्यवसाय करता है, दैनिक कार्य बहुत प्रभावशाली ढंग से करता है, बहुत प्रभावशाली पत्नी प्राप्त करता है, भाई और परिवार की शक्ति का सम्मान प्राप्त करता है, यौन सुखों की अधिकता प्राप्त करता है, बहुत कठिन परिश्रम करता है, भाग्य में कमजोरी, धर्म में कमी",
                english:
                    "Pursues a great business, accomplishes the daily task very influentially, gets very influential wife, gets the dignity of the power ofbrother and family, gets excess of sexual pleasures, labours very hard, weakness in destiny, deficiency in Dharma",
            },
            4: {
                hindi: "बिजॉय को पत्नी भाव से कुछ सुख मिलता है, व्यवसाय भाव से भी सुख मिलता है, प्रगति के लिए नियमित रूप से काम पर ध्यान देते हैं।",
                english:
                    "Bijoys some happiness from the house ofwife, also from the house of occupation, pays attention to work regularly for progress",
            },
            5: {
                hindi: "बुद्धि के बल पर व्यापार करता है, बुद्धिमान पत्नी पाता है, प्रभावशाली एवं चतुर संतान प्राप्त करता है, तकनीकी शिक्षा प्राप्त करता है, प्रभावशाली ढंग से बात करता है, पत्नी से बौद्धिक सलाह प्राप्त करता है, लाभ प्राप्ति में सदैव सावधान रहता है।",
                english:
                    "Pursues business with power of intellect, gets a wise wife, gets influential and clever progeny, gets technical education, talks very influentially, secures intellectual advice from the wife, always careful in acquiring gains",
            },
            6: {
                hindi: "पत्नी के घर से प्रभाव प्राप्त करता है और उसे बनाए रखता है, पत्नी के साथ कुछ संघर्ष करता है, व्यवसाय में कुछ कठिनाइयों को सहन करता है, व्यवसाय की रेखा से कुछ प्रभाव प्राप्त करता है, व्यवसाय का प्रबंधन करता है, दुश्मनों पर विजय प्राप्त करता है, खर्च करने में कुछ कड़वाहट रखता है।",
                english:
                    "Gets influence from the house ofwife and maintains it, feces some struggle with wife, bears some hardships in occupation, gains some influence from the line of occupation, manages a business, gets victory over the enemies, has some bitterness in spending",
            },
            7: {
                hindi: "व्यवसाय से प्रभावशाली शक्ति प्राप्त होती है, शरीर में कुछ कष्ट होता है, परिवार पर बहुत प्रभाव रहता है, यौन सुख के कारण कुछ परेशानी का सामना करना पड़ता है",
                english:
                    "Gains influential power from occupation, experiences some distress in the body, maintains great influence on family, faces some disturbance due to sexual pleasures",
            },
            8: {
                hindi: "पत्नी के घर में अशांति और कष्ट का सामना करना पड़ता है, यौन सुख में कमी होती है, व्यवसाय में कष्ट होता है, व्यवसाय में विदेशी देशों से संबंध बनता है, परिवार के घर में कुछ कष्ट और अलगाव का सामना करना पड़ता है, अंगों में कुछ दोष होता है।",
                english:
                    "Faces restlessness and distress in the house of wife, has deficiency in the side ofsexual pleasures, bears hardship in the line ofoccupation, gets the association from foreign countries in occupation, faces some troubles and separation in the house offamily, has some defect in organs",
            },
            9: {
                hindi: "भाग्य में तथा व्यवसाय में कुछ कमजोरी का अनुभव होता है, धर्म पालन में कमजोरी होती है, भाई-बहनों का बल मिलता है, यौन सुखों में कमी होती है।",
                english:
                    "Experiences some weakness in luck and also in the side of occupation, weakness in rearing Dharma, gets the power ofbrothers and sisters, gets deficiency in the side of sexual pleasures",
            },
            10: {
                hindi: "दैनिक व्यवसाय को बहुत प्रभाव और सम्मान के साथ करता है, पत्नी के माध्यम से शक्ति प्राप्त करता है, प्रभावशाली पत्नी और यौन सुख प्राप्त करता है, सरकार में सम्मान प्राप्त करता है, एक अच्छा प्रबंधक होता है, माँ के घर में कुछ कमी होती है",
                english:
                    "Pursues the daily occupation with great influence and honour in the line of occupation, gets power through wife, gets influential wife and sexual pleasures, gets honour in government, is a good manager, has some deficiency in the house of mother",
            },
            11: {
                hindi: "दैनिक व्यवसाय से बहुत धन कमाता है, व्यवसाय में प्रभाव प्राप्त करता है, पत्नी से बहुत सम्मान प्राप्त करता है और उसके माध्यम से बहुत धन प्राप्त करता है, बच्चों और शिक्षा का लाभ प्राप्त करता है, अत्यधिक बुद्धिमान होता है कुंभ * 233",
                english:
                    "Earns much wealth through the daily occupation, gains influence in occupation, gets great honour from the wife and gains much wealth through her, gets the advantage of children and education, is highly intelligent Aquarius * 233",
            },
            12: {
                hindi: "पत्नी भाव में हानि, व्यवसाय में हानि, काम-सुख में भारी कमी, परिवार में हानि और अशांति, व्यय भाव में खटास, काम-सुख में अन्य भाव का सहयोग, शत्रु भाव में प्रभाव, रोग आदि उलझनें, सांसारिक कार्यों में चतुरता का अभाव।",
                english:
                    "Bears loss in the house ofwife, gets loss in occupation, has great deficiency in the side of sexual pleasures, gets loss and disturbance in family, has sourness in the house ofexpenditure, gets the support ofsome other place in the side ofsexual pleasures, keeps influence in the house ofenemy, has perplexities like diseases and deficiency of cleverness in the worldly affairs",
            },
        },
        Moon: {
            1: {
                hindi: "एकाग्रता के बल पर सम्मान प्राप्त करता है, शारीरिक कष्टों और सर्दी से मुक्ति पाता है, मानसिक विकार से ग्रस्त होता है, पत्नी से संघर्ष करता है, व्यवसाय में गुप्त नीतियों का प्रयोग करता है।",
                english:
                    "Gets honour through the power ofconcentration, surfers from physical perplexities and from cold, gets some mental disorder, faces struggle with wife, uses secret policies in the line of occupation",
            },
            2: {
                hindi: "धन संचय करता है, परिवार में अलगाव का सामना करता है, शत्रु पर प्रभाव बनाए रखता है, वैभवपूर्ण जीवन व्यतीत करता है।",
                english:
                    "Accumulates wealth, faces some separation in family, keeps the influence over the enemy, spends life majestically",
            },
            3: {
                hindi: "ऊर्जावान कर्म करता है, एकाग्रता के बल से प्रभाव प्राप्त करता है, शत्रु का दमन करता है, भाई के विरोध का सामना करता है, धर्म का बहुत ध्यान रखता है, कठोर परिश्रम करता है और शक्तिशाली होता है",
                english:
                    "Puts forward energetic deeds, gets influence due to the power of concentration, suppresses the enemy, faces opposition from the brother, takes great care about Dharma, toils hard and is powerful",
            },
            4: {
                hindi: "शत्रु पक्ष की परवाह नहीं करता, सुख-शांति में बाधा पाता है, माता के घर में कष्ट, भूमि के घर में कुछ प्रभाव, सरकार से व्यापारिक सम्बन्धों में कुछ कमजोरी, बहुत लापरवाह होता है",
                english:
                    "Does not care for the enemies side, gets hindrance in peace and happiness, distress in the house of mother, some influence in the house ofland, some weakness in business relations with government, is very careless",
            },
            5: {
                hindi: "संतान पक्ष से कुछ कष्ट, शिक्षा में कुछ कमी, धन प्राप्ति के लिए महान उपाय सोचना, उतार-चढ़ाव से युक्त बातें",
                english:
                    "Faces some distress from children's side, has some deficiency in education, thinks of great devices to gain wealth, talks with vicissitudes",
            },
            6: {
                hindi: "शत्रु पक्ष में बहुत सावधान और सतर्क रहता है तथा विजय प्राप्त करता है, विपत्तियों की परवाह नहीं करता, अधिक खर्च करता है, प्रसन्न और निश्चिंत रहता है, व्यय में प्रभाव का प्रयोग करता है, तथा घातक शत्रु होता है।",
                english:
                    "Is very careful and cautious in the enemies' side and gets victory, does not care about calamities, spends much, remains happy and carefree, uses influence in expenditure, and is a fatal enemy",
            },
            7: {
                hindi: "व्यवसाय को लगन और एकाग्रता की उलझनों के साथ करता है, पत्नी और यौन सुख के घर में शत्रुता का सामना करता है, शरीर में कुछ कष्ट और बंधन होता है, पत्नी के पक्ष में चेचक की शिकायत होती है, व्यवसाय में कूटनीति का प्रयोग करता है।",
                english:
                    "Pursues the occupation diligently and with perplexities of concentration, faces enmity in the house ofwife and sexual pleasures, has some distress and bondage in body, gets the complaint ofsmallpox in the wife's side, uses diplomacy in occupation",
            },
            8: {
                hindi: "शत्रु पक्ष से परेशान रहता है, पेट की समस्या रहती है, धन वृद्धि के लिए प्रयत्नशील रहता है, तथा मन अशांत रहता है।",
                english:
                    "Bears perplexities in the side ofenemies, gets some stomach troubles, tries hard for the increase ofwealth, and is of disturbed mind",
            },
            9: {
                hindi: "भाग्य भाव में कुछ चिंताएं, शत्रु पर प्रभाव, परिश्रमी एवं ऊर्जावान कार्य, भाई-बहनों की ओर से कुछ शत्रुता का सामना, शत्रुओं से मैत्रीपूर्ण संबंध, शांतिप्रिय",
                english:
                    "Some anxieties in the house of destiny, keeps influence on enemy, does laborious and energetic deeds, faces some enmity in the side of brothers and sisters, keeps friendly relations with enemies, is peaceful",
            },
            10: {
                hindi: "पिता के घर में अशांति का अनुभव होता है, कुछ कष्टों का सामना करना पड़ता है, उन्नति के मार्ग में हानि होती है, मान-सम्मान के घर में सरकार से कुछ आघात और झटके लगते हैं, शत्रु के घर में कुछ बेचैनी होती है और पहले से संचित पापों का पश्चाताप होता है।",
                english:
                    "Experiences restlessness in the house offather, faces some hardships, bears loss in the way ofprogress, feces some blows and shocks in the house of honour and respect from government, is somewhat restless in the house of enemy and repents over the already accumulated sins",
            },
            11: {
                hindi: "शत्रु का दमन करके लाभ प्राप्त करता है, प्राप्ति और लाभ के भाव में कुछ मानसिक कष्ट और उलझनों का अनुभव करता है, मुफ्त में धन चाहता है, संतान में कुछ परेशानी का सामना करता है, शिक्षा के भाव में कमी होती है, रोगों और कष्टों की परवाह नहीं करता है।",
                english:
                    "Gains by suppressing the enemy, experiences some mental distress and perplexities in the house ofreceipts and gains, wants gratis-like wealth, faces some trouble in the progeny, has deficiency in the house of education, does not care for diseases and afflictions",
            },
            12: {
                hindi: "शत्रु भाव में दुर्बलता, प्रभाव में दुर्बलता, शत्रु पक्ष में गुप्त नीतियाँ अपनाना, अधिक व्यय के कारण परेशानी, रोगों पर व्यय",
                english:
                    "Gets weakness in the house ofenemies, gets weakness in influence, uses the secret policies in the enemies' side, faces perplexity due to heavy expenditure, spends over diseases",
            },
        },
        Mars: {
            1: {
                hindi: "शरीर की शक्ति से उन्नति करता है, अच्छी कार्य शक्ति और साहस का प्रयोग करता है, पिता और भाई का साथ सामान्य रूप से प्राप्त करता है, माता के पक्ष में कष्ट का सामना करता है, व्यवसाय में उन्नति करता है, सरकार और समाज में सम्मान और यश प्राप्त करता है, पत्नी के घर में कुछ क्लेश होता है, वीर्य दोष होता है।",
                english:
                    "Progresses due to the vigour of his body, uses good working power and courage, secures the association of father and brother in an ordinary way, faces uneasiness in the side ofmother, acquires progress in occupation, achieves honour and good name with government and society, bears some perplexity in the wife's house, gets some seminal defects",
            },
            2: {
                hindi: "मान-सम्मान की प्राप्ति होती है, पिता का सहयोग मिलता है, भाई के बंधनों का सामना करना पड़ता है, धन प्राप्ति के लिए अच्छे प्रयास करता है, धर्म-कर्म की ओर ध्यान देता है, विद्या प्राप्ति का बल प्राप्त करता है, संतान का बल प्राप्त करता है, भाग्य की उन्नति के लिए प्रयत्नशील रहता है।",
                english:
                    "Acquires respect, gets the support of the father, faces some bondage ofbrother, puts good efforts for acquiring wealth, pays some attention to religious deeds, gets the power of education, gains some power of children, tries hard for the progress of the destiny",
            },
            3: {
                hindi: "सरकार और समाज में महान अधिकार और प्रभाव रखता है, दुश्मन को हराता है, भाई की शक्ति प्राप्त करता है, बहुत प्रतिष्ठित और ऊर्जावान होता है",
                english:
                    "Possesses great authority and influence in government and society, defeats the enemy, gets the power of brother, is very dignified and energetic",
            },
            4: {
                hindi: "पिता से सहयोग प्राप्त होता है, माता और भाई का सुख कुछ अभावों के साथ प्राप्त होता है, सरकार और समाज से बड़ा सम्मान प्राप्त होता है, भवन और संपत्ति का स्वामी होता है, पत्नी के पक्ष में प्रभाव रखता है, अपने कर्मों से अच्छी आय प्राप्त करता है, तथा बहुत प्रभावशाली होता है।",
                english:
                    "Gets supporting power from father, acquires the usual happiness of mother and brother with some deficiency, gets great honour from the government and society, owns building and property, keeps influence in the side of wife, secures a good income through his deeds, and is very influential",
            },
            5: {
                hindi: "राजसी शिक्षा का ज्ञान रखता है, पिता और भाई का सहयोग पाता है, अधिक खर्च करता है, शीघ्रता करता है, अच्छा लाभ प्राप्त करता है",
                english:
                    "Possesses knowledge of royal education, gets support of father and brother, spends much, is hasty, acquires good gains",
            },
            6: {
                hindi: "जातक बेचैन रहता है तथा पिता और भाई से विरोध का सामना करता है, किसी गुप्त शक्ति का स्वामी होता है, शत्रु को छल से मारता है, अधिक व्यय करता है, पद में बाधा का सामना करता है, विदेश में सम्मान पाता है।",
                english:
                    "Is restless and faces opposition with father and brother, possesses some hidden power, kills the enemy deceitfully, spends much, faces hindrances in position, gets respect in foreign places",
            },
            7: {
                hindi: "वह अपना व्यवसाय बड़े सम्मान और प्रतिष्ठा के साथ करता है, भाई-बहनों से युक्त होता है, सरकार और समाज में मामलों का अच्छी तरह से प्रबंधन करता है, पत्नी के घर में प्रभाव रखता है, एक अच्छा प्रशासक होता है।",
                english:
                    "Pursues the occupation with great respect and honour, gets brothers and sisters, manages the affairs nicely in the government and society, keeps influence in the house of wife, is a good administrator",
            },
            8: {
                hindi: "पिता के घर में हानि होती है, भाई-बहनों से शक्ति क्षीण होती है, बहुत कठिन परिश्रम से धन अर्जित करता है, मान-सम्मान में कमी होती है, वस्त्र में कमी होती है।",
                english:
                    "Bears loss in the house offather, has debilitated powers from brothers and sisters, acquires the income by very hard labour, has deficiency in honour and respect, has deficiency in dress",
            },
            9: {
                hindi: "बहुत भाग्यशाली होता है, भाग्य और ऊर्जा के माध्यम से व्यापार या व्यवसाय में प्रगति सुनिश्चित करता है, धार्मिक औपचारिकताएं करता है, अधिक खर्च करता है, सुख और भवन की शक्ति प्राप्त करता है, सरकार और समाज में सम्मान प्राप्त करता है",
                english:
                    "Is very fortunate, secures progress ofbusiness or occupation through destiny and energy, performs religious formalities, spends much, gets strength of happiness and buildings, gets honour in the government and society",
            },
            10: {
                hindi: "बहुत शक्तिशाली होता है और स्वतंत्र व्यवसाय करता है, सरकार और समाज में बहुत सम्मान पाता है, भूमि और भवन प्राप्त करता है, भाई-बहनों की परवाह नहीं करता, महंगे कपड़े पहनता है, प्रशासनिक शिक्षा प्राप्त करता है, और कानूनी विशेषज्ञ होता है",
                english:
                    "Is very powerful and pursues independent occupation, gets great respect in government and society, gets land and buildings, does not care for brothers and sisters, wears rich dresses, acquires administrative education, and is a legal expert",
            },
            11: {
                hindi: "व्यापार से प्रचुर आय प्राप्त करता है, पिता से बहुत लाभ प्राप्त करता है, सरकार और समाज से लाभ प्राप्त करता है, भाई का बल पाता है, धन संचय करने में पूरी शक्ति लगाता है, तीव्र बुद्धि वाला होता है, संतान प्राप्त करता है, शत्रुओं के घर में सफलता प्राप्त करता है, अच्छे वस्त्र और आभूषण धारण करता है, प्रभावशाली होता है।",
                english:
                    "Acquires huge income through business occupation, gains much from father, enjoys the gains from government and society, gets the strength of brother, uses full power to accumulate wealth, possesses keen wisdom, gets children, gets success in enemies' house, wears good clothes and ornaments, and is influential",
            },
            12: {
                hindi: "अधिक व्यय करने वाला, पिता के घर में हानि उठाने वाला, भाई से विचित्र सम्पर्क रखने वाला, व्यापार में हानि उठाने वाला, शत्रु के घर में गुप्त शक्ति का प्रयोग करने वाला, पत्नी के घर में प्रभाव रखने वाला, दैनिक कार्य में बल पाने वाला तथा प्रभावशाली होता है।",
                english:
                    "Spends much, bears loss in the father's house, strange contact of brother, acquires loss in business occupation, uses secret power in the house ofenemies, possesses influence in the house ofwife, gets the strength in daily occupation and is influential",
            },
        },
        Mercury: {
            1: {
                hindi: "दीर्घायु, शान-शौकत से दिनचर्या व्यतीत करने वाला, अच्छी शिक्षा और बुद्धि प्राप्त करने वाला, संतान पक्ष में थोड़ी उलझन वाला, मित्रता में थोड़ा उलझने वाला और पत्नी पक्ष में थोड़ा उलझन वाला, व्यापार में चतुराई से काम लेने वाला।",
                english:
                    "Has a long life, spends the daily routine majestically, gets good education and wisdom, feces some perplexity in the side ofchildren, has some friendship and some perplexity in the house ofwife, uses shrewdness in business",
            },
            2: {
                hindi: "विद्या और संतान में कमी होती है, धन में कुछ कमी होती है, परिवार में हानि और क्लेश होता है, संचित धन की हानि होती है, बुद्धि नष्ट होती है, विद्या और बुद्धि के संकीर्ण मार्ग से जीवन व्यतीत करता है, तथा हठी बुद्धि से बात करता है।",
                english:
                    "Has deficiency in education and also in children, has some weakness in wealth, gets loss and distress in the family, causes loss to already accumulated wealth, gets wisdom, spends life through the narrow way of education and wisdom, and talks with obstinate power of intellect",
            },
            3: {
                hindi: "विद्या और बुद्धि की शक्ति प्राप्त होती है, संतान की प्राप्ति होती है, किन्तु संतान पक्ष में कष्ट होता है, शक्ति की प्राप्ति होती है, तथा भाई-बहनों से कष्ट होता है, आयु में वृद्धि होती है, सांसारिक विषयों पर अधिकारपूर्वक तथा प्रबलता से बोलता है, यात्रा के समय बुद्धि और साहस का प्रयोग करता है, तथा बहुत निश्चिंत होता है।",
                english:
                    "Gets the power of education and intellect, gets children but feces some distress in the side of children, gains some power and also distress from brother and sisters, gets increased longevity, speaks authoritatively and forcibly on worldly affairs, uses intellect and courage in the matters oftravelling, and is very carefree",
            },
            4: {
                hindi: "आयु में वृद्धि होती है, जीवन का समय बुद्धिमानी और सुखपूर्वक व्यतीत होता है, माता के घर में कष्ट रहता है, संतान में कुछ कमी रहती है, भवन और भूमि में कुछ हानि होती है।",
                english:
                    "Gets increased longevity, spends the period of life intelligently and comfortably, faces uneasiness in the house of mother, has some deficiency in children, gets some loss in the buildings and lands",
            },
            5: {
                hindi: "वह बहुत ज्ञान और शिक्षा से युक्त होता है, संतान पक्ष में कुछ बेचैनी होती है, दीर्घायु होता है, बहुत धन प्राप्त करता है, औपचारिक मामलों में बातें छिपाता है, मन में कुछ व्यथा रखता है, तथा कुछ उलझन में रहता है।",
                english:
                    "Possesses great wisdom and education, feces some uneasiness in the side of children, gets a long life, gains much wealth, hides things in formal affairs, bears some distress in his mind, and is somewhat perplexed",
            },
            6: {
                hindi: "हानि उठाता है, संतान पक्ष में कष्ट और संकट का सामना करता है, शिक्षा में कमी रखता है, बौद्धिक रूप से चिंतित रहता है, जीवन की दिनचर्या में विनम्रता का प्रयोग करता है, दीर्घायु पर आघात करता है, जीवन में अनेक बाधाओं और गड़बड़ियों का सामना करता है, पेट की शिकायत होती है।",
                english:
                    "Bears loss, faces affliction and distress in the side of children, has deficiency in education, is intellectually worried, uses modesty in the daily routine of life, bears blows on longevity, faces many hindrances and disturbances in life, gets the stomach complaints",
            },
            7: {
                hindi: "शिक्षा और संतान की प्राप्ति होती है, व्यवसाय में बुद्धि से काम करता है, पत्नी के घर में कुछ मोह और उलझन होती है, अच्छी आयु प्राप्त करता है, जीवन की दिनचर्या सांसारिक और घरेलू कार्यों में व्यतीत करता है, मान-सम्मान प्राप्त करता है, यौन सुखों में कुछ कमी का अनुभव करता है।",
                english:
                    "Gets education and children, works with wisdom in the line of occupation, has some fascination and perplexity in the house of wife, gets good age, spends the daily routine oflife in worldly and domestic affairs, gets honour, experiences some deficiency in the sexual pleasures",
            },
            8: {
                hindi: "शिक्षा में कुछ कमजोरी होती है, आयु अधिक होती है, संतान पक्ष में कुछ कष्ट होता है, संचित धन की उपेक्षा होती है, बहुत चतुराई से बात करता है",
                english:
                    "Has some weakness in education, gets long age, some distress in the children side, neglects accumulated wealth, talks very cleverly",
            },
            9: {
                hindi: "संचित धन का लाभ मिलता है, आयु अच्छी होती है, जीवन के दैनिक कार्यों में भाग्य अच्छा रहता है, धार्मिक ज्ञान होता है, भाग्य के सम्बन्ध में कुछ चिंता रहती है, भाई-बहनों के सम्पर्क में कुछ उलझन रहती है, संतान की प्राप्ति होती है, तथा बहुत चतुर होता है।",
                english:
                    "Gains advantage ofalready accumulated wealth, gets good age, gets good luck in the daily routine oflife, has religious knowledge, gets some anxiety in connection with destiny, faces some perplexity in the contact with brothers and sisters, gets children, and is very clever",
            },
            10: {
                hindi: "सांसारिक ज्ञान प्राप्त होता है, संतान प्राप्ति होती है, उत्तम आयु प्राप्त होती है, दिनचर्या या जीवन बड़े प्रभाव से व्यतीत होता है, पिता के घर में हानि होती है, व्यापार और व्यवसाय में कुछ परेशानी होती है, सरकार के घर में कुछ चिंता होती है, माता के घर में थोड़ी परेशानी होती है।",
                english:
                    "Gets worldly knowledge, gets children, gets good age, spends the daily routine or life with great influence, feces loss in father's house, bears some trouble in business and occupation, feces some worry in the house of government, has little perplexity in mother's house",
            },
            11: {
                hindi: "शिक्षा प्राप्त करता है, संतान और संचित धन का लाभ उठाता है, दीर्घायु का लाभ प्राप्त करता है, जीवन की दैनिक दिनचर्या में लाभ प्राप्त करता है, और सम्माननीय होता है",
                english:
                    "Gets education, gets advantage ofchildren and already accumulated wealth, gains the advantage oflongevity, gets advantage in the daily routine of life, and is honourable",
            },
            12: {
                hindi: "संतान की हानि होती है, शिक्षा में कमजोरी आती है, आयु कमजोर होती है, अधिक खर्च होता है, जीवन की दिनचर्या में बेचैनी महसूस होती है, शत्रु पक्ष में समता बनी रहती है।",
                english:
                    "Gets the loss ofchildren, gets weakness ofeducation, has weakness in longevity, spends much, feels restlessness in the daily routine of life, maintains equality in the side of enemies",
            },
        },
        Jupiter: {
            1: {
                hindi: "परिश्रम से धन-संपत्ति प्राप्त करता है, शरीर का मान-सम्मान प्राप्त करता है, संतान और विद्या का लाभ प्राप्त करता है, अच्छी बातें बोलता है, भाग्य में उन्नति प्राप्त करता है, व्यवसाय में लाभ प्राप्त करता है, पत्नी के घर में सुख प्राप्त करता है, अपनी आवश्यकताओं की पूर्ति करता है, तथा कुछ हद तक आश्रित होता है।",
                english:
                    "Gets income and power ofwealth by his diligence, gets the respect and honour of the body, gets advantage of children, education, utters good things, acquires the progress in destiny, gains from occupation, gets advantage in the house of wife, gets his wants satisfied, and is somewhat dependent",
            },
            2: {
                hindi: "बहुत धनवान होता है और भारी लाभ प्राप्त करता है, धन संचय करने के लिए जी-जान से प्रयास करता है, शत्रुओं के घर में बहुत प्रभाव रखता है, कठोर परिश्रम करता है, धन प्राप्ति के लिए चालाकी करता है और बड़े व्यवसाय करता है, पिता के घर से भारी लाभ प्राप्त करता है, सरकार और समाज से सम्मान प्राप्त करता है, सम्मानीय होता है, और प्रभावशाली परिवार का स्वामी होता है।",
                english:
                    "Is very rich and gets heavy gains, tries whole-heartedly to accumulate income, possesses great influence in the house of enemies, labours hard, follows tricks and pursues big business occupation to get wealth, gets heavy gains from the house of father, gains respect from government and society, is respectable, and possesses an influential family",
            },
            3: {
                hindi: "वह अपने पराक्रम से धन कमाता है, व्यवसाय में तत्परता से लगा रहता है, व्यापार में बहुत लाभ कमाता है, सुन्दर पत्नी पाता है और उसकी सहायता प्राप्त करता है, भाई से सहायता प्राप्त करता है, धर्म का पालन करता है, अनेक प्रकार के लाभ, वस्त्र, आभूषण, धन आदि प्राप्त करता है, उसके मन में विषय-सुख के प्रति आकर्षण होता है, तथा सौन्दर्यप्रिय होता है।",
                english:
                    "Earns wealth through his vigour, pursues the occupation vigorously, makes much profit in business, gets a beautiful wife and secures her help, gets help from brother, rears Dharma also, gets many kinds of gains, clothes, ornaments, wealth etc, has fascination regarding sexual pleasures in his heart, and loves beauty",
            },
            4: {
                hindi: "धन संचय करता है, जीवन की दिनचर्या का आनंद लेता है, व्यय को बहुत कम करने का प्रयास करता है, सरकार और समाज से लाभ और सम्मान प्राप्त करता है, धन के कारण सुख प्राप्त करता है, भवन और संपत्ति प्राप्त करता है",
                english:
                    "Accumulates wealth, enjoys the daily routine of life, tries to curtail expenditure very much, acquires gains and respect from government and society, gets happiness on account of wealth, gains buildings and property",
            },
            5: {
                hindi: "बहुत बुद्धिमान है और शिक्षा प्राप्त करता है, संतान प्राप्त करता है, शिक्षा के माध्यम से धन की शक्ति प्राप्त करता है, मूल्यवान बातें बोलता है, भारी लाभ प्राप्त करता है, धर्म का पालन करता है, मर्यादा बनाए रखता है",
                english:
                    "Is very wise and gets education, gets children, gets power ofwealth through education, utters valuable things, gets heavy gains, maintains Dharma, maintains dignity",
            },
            6: {
                hindi: "धन की अपार शक्ति प्राप्त करना, धन का दुरुपयोग करना, अचानक मुफ्त में धन प्राप्त करना, संकीर्ण और गलत तरीके से खर्च करना",
                english:
                    "Gets huge power of wealth, misuses the wealth, gets gratis-like wealth suddenly, spends in a narrow and wrong manner",
            },
            7: {
                hindi: "धन के बल पर बड़ा व्यवसाय करता है, व्यवसाय से बहुत धन कमाता है, विवाह के बाद धन प्राप्त करता है, अनेक प्रकार के लाभ प्राप्त करता है, भाई-बहनों से बल प्राप्त करता है, पर्याप्त निश्चित आय प्राप्त करता है, धन कमाने में चतुर होता है।",
                english:
                    "Pursues big occupation by the power ofwealth, earns much wealth by occupation, acquires wealth after marriage, gets many kinds of advantages, gets the strength irom brothers and sisters, gets sufficient fixed income, is clever in earning wealth",
            },
            8: {
                hindi: "जन-धन की हानि उठाता है, कठोर परिश्रम करता है, धन प्राप्ति के लिए विदेश यात्रा करता है, फिर भी उसे पर्याप्त धन नहीं मिलता, कभी-कभी धन प्राप्त हो जाता है।",
                english:
                    "Bears loss ofmen and wealth, labours hard and travels to foreign countries for income, even then does not get sufficient income, secures wealth occasionally",
            },
            9: {
                hindi: "भाग्य की शक्ति से धन प्राप्त करता है, बुद्धि, शिक्षा और चतुरता प्राप्त करता है, संतान प्राप्त करता है, और आत्म-अभिमानी होता है",
                english:
                    "Gets wealth through power ofdestiny, gets wisdom, education and cleverness, gets children, and is self-conceited",
            },
            10: {
                hindi: "बड़ा व्यवसाय या पेशा करता है, धन कमाता है, सरकार और समाज से बहुत सम्मान और प्रतिष्ठा प्राप्त करता है, पिता से शक्ति और माता से सहयोग प्राप्त करता है, शत्रु भाव में बहुत प्रभाव रखता है।",
                english:
                    "Pursues a big business or occupation, earns wealth, gets much respect and honour from government and society, gets power from father and support from mother, has great influence in the house ofenemy",
            },
            11: {
                hindi: "भारी आय प्राप्त करता है, दृढ़ निश्चय के कारण सफलता प्राप्त करता है, संतान का लाभ प्राप्त करता है, भाई-बहनों का साथ पाता है, पत्नी और ससुर से सहायता प्राप्त करता है, सम्मानीय और हंसमुख होता है।",
                english:
                    "Gets heavy income, achieves success due to grand determination, gets the advantage of children, gets brothers and sisters, gets assisting power from wife and father-in-law, is respectable and jolly",
            },
            12: {
                hindi: "धन की हानि और कमी सहन करता है, खर्च में कटौती करता है, दूसरों को रिश्वत देकर धन प्राप्त करता है, शत्रुओं के घर में प्रभाव प्राप्त करता है, परिवार में कमी और कष्ट का सामना करता है, भवन और भूमि का लाभ प्राप्त करता है, जीवन की दिनचर्या में कुलीनता प्राप्त करता है, अच्छे वस्त्र या आभूषण नहीं पाता है।",
                english:
                    "Bears loss and deficiency in wealth, manages to curtail expenditure, gets wealth by giving bribe to others, attains influence in enemies' house, faces deficiency and distress in family, gets the gains of buildings and lands, gets the aristocracy in the daily routine oflife, does not get good garments or ornaments",
            },
        },
        Venus: {
            1: {
                hindi: "भाग्य के कारण बहुत सुख भोगता है, माता से सुख पाता है, भूमि-भवन पाता है, अन्न-जल-वस्त्र पाता है, धर्म का पालन-पोषण भली-भाँति करता है, दैवी सहयोग और यश पाता है, शत्रुता वाले परिवार से सम्बन्ध रखने पर व्यवसाय की शक्ति और स्त्री का सुख प्राप्त करता है।",
                english:
                    "Enjoys happiness very much on account of his good luck, gets happiness from mother, gets lands and buildings, gets food, drink and clothes, rears the Dharma properly, gets the divine support and fame, gets the power ofoccupation and happiness ofwife in connection with family with some enmity",
            },
            2: {
                hindi: "बहुत धन प्राप्त होता है, धन की वृद्धि में सुख-समृद्धि का अनुभव होता है, बड़ा परिवार मिलता है, भूमि और भवन प्राप्त होते हैं, पुण्य का संचय होता है, भाग्य के सहयोग से धन में वृद्धि होती है, जीवन की दिनचर्या में कुछ कमी का अनुभव होता है, धन की वृद्धि के लिए बहुत चतुराई से काम करता है, आयु के संबंध में कुछ कमजोरी का सामना करता है।",
                english:
                    "Gets much wealth, experiences the happiness and prosperity in the increase of wealth, gets a big family, gets lands and buildings, accumulates virtue, increases the wealth with the help of destiny, experiences some deficiency in the daily routine of life, works very cleverly for the increase ofwealth, faces some weakness in connection with age",
            },
            3: {
                hindi: "भाग्य में उन्नति सुखपूर्वक प्राप्त होती है, भवन और संपत्ति प्राप्त होती है, भाई और माता भी प्राप्त होते हैं, चतुरता और दूरदर्शिता होती है, यश मिलता है, न्याय की शक्ति का प्रयोग होता है, शांति प्रिय होता है।",
                english:
                    "Gets the progress ofdestiny comfortably, gets buildings and property, gets brothers and also a mother, possesses cleverness and farsightedness, gets fame, uses the strength ofjustice, loves peace",
            },
            4: {
                hindi: "धार्मिक अनुष्ठानों का पालन-पोषण करता है, भूमि और भवन प्राप्त करता है, माता से शक्ति प्राप्त करता है, भाग्य से सुख प्राप्त करता है, व्यापार करता है, पिता से लाभ प्राप्त करता है, मान-सम्मान और प्रतिष्ठा प्राप्त करता है, सरकार और समाज में सुख प्राप्त करता है",
                english:
                    "Rears religious formalities, gets land and buildings, gets power from mother, gets happiness through destiny, pursues business, gains advantage from father, gets honour and prestige, gets happiness in government and society",
            },
            5: {
                hindi: "उत्तम संतान प्राप्त होती है, उत्तम शिक्षा और बुद्धि प्राप्त होती है, माता से शक्ति प्राप्त होती है, भवन और संपत्ति का सुख मिलता है, देवत्व संबंधी लेख प्रकाशित होते हैं, दूरदर्शी होते हैं",
                english:
                    "Gets good children, gets good education and wisdom, achieves power from mother, gets happiness of buildings and property, publishes articles about divinity, is farsighted",
            },
            6: {
                hindi: "भाग्य में कमजोरी, दूसरों से विरोध का सामना, सुख-शांति में बाधा, अधिक व्यय, शत्रु का दमन, कुछ रोगों की निःशुल्क औषधि देना तथा दूसरों की चिंता दूर करने में सहायक।",
                english:
                    "Has weakness in destiny, faces opposition from others, finds obstacles in peace and happiness, spends much, suppresses the enemy, gives free medicines of some diseases, and helps to remove the worries of others",
            },
            7: {
                hindi: "परिवार में सुख और शुभता मिलती है, लेकिन परिवार में आपसी प्रेम में कुछ कमी रहती है, दूसरों से दुःख मिलता है, भूमि और भवन का बल मिलता है, शरीर अच्छा होता है, कार्य, व्यवसाय में संतोष और सच्चाई से कार्य करता है।",
                english:
                    "Gets happiness and auspiciousness in family but some deficiency in mutual love in the family, gets unhappiness from others, gets the strength of lands and buildings has a good physique works, , satisfactorily and truthfully in the occupation",
            },
            8: {
                hindi: "धर्म से संबंधित अत्यधिक दुर्बलता, माता के घर में हानि, सुख में कमी, भूमि, भवन और संपत्ति में दुर्बलता, भाग्य में दुर्बलता, सफलता देर से मिलती है, विदेश में अत्यधिक बेचैनी, अधिक धन प्राप्ति का प्रयत्न",
                english:
                    "Great weakness in connection with Dharma, bears loss in mother's house, has deficiency in happiness, has weakness in land and buildings and property, has weakness in destiny, gets success late, faces great restlessness in foreign countries, tries to get more money",
            },
            9: {
                hindi: "बहुत भाग्यशाली और धर्म का पालन करने वाला, यश पाने वाला, माता से बल पाने वाला, भूमि, भवन और संपत्ति का मान-सम्मान पाने वाला, दैवी शक्ति का महान सहयोग पाने वाला, भाई-बहनों से सहायता पाने वाला, दूरदर्शी, विद्वान और चतुर होता है।",
                english:
                    "Is very fortunate and rears Dharma, gets fame, gains strength from mother, gets the dignity of land, buildings and property, receives grand help of divine power, gets help from brothers and sisters, is farsighted, learned and clever",
            },
            10: {
                hindi: "भाग्य के कारण बहुत ऊंचा पद प्राप्त करता है, सरकार और समाज से अधिकार और लाभ प्राप्त करता है, माता-पिता से सहायता प्राप्त करता है, भूमि और संपत्ति का बल प्राप्त करता है, राजसी सुख भोगता है, अपने व्यापारिक मामलों में योग्यता से कार्य करता है, शांति और न्याय चाहता है।",
                english:
                    "Gets very high position on account of destiny, gets the authority and advantage from government and society, gets help from parents, gets the strength ofland and property, enjoys royal pleasures, works with ability in his business affairs, wants peace and justice",
            },
            11: {
                hindi: "भाग्य की शक्ति से बहुत कुछ प्राप्त करता है, मायके से सहायता प्राप्त करता है, भूमि का लाभ प्राप्त करता है, कुछ धार्मिक कार्य करता है, अन्न, वस्त्र और आभूषण प्राप्त करता है, शिक्षा प्राप्त करता है, विनम्रता से बात करता है और दूरदर्शी, स्वार्थी और गुणी होता है।",
                english:
                    "Gains much through the power of destiny, gets help from mother's house, gets the advantage of land, performs some religious deeds, acquires food, clothes and ornaments, gets education, talks modestly and is farsighted, selfish and virtuous",
            },
            12: {
                hindi: "अधिक व्यय, भाग्य में कमजोरी, माता की हानि, भूमि, भवन या निवास स्थान में कमजोरी, सुख में कमी, शत्रु पक्ष में विनम्रता से कार्य करना।",
                english:
                    "Spends much, gets weakness in destiny, bears loss of mother, has weakness in lands, buildings or residential place, has deficiency in happiness, works politely in the side of enemies",
            },
        },
        Saturn: {
            1: {
                hindi: "इच्छाशक्ति और आत्मसम्मान से युक्त, कुछ प्रसिद्धि प्राप्त करता है, भाई के घर में हानि उठाता है, पत्नी और पिता के घर में कष्ट पाता है, व्यवसाय, कारोबार और प्रतिष्ठा में कमजोरी पाता है, सरकार और समाज के घर में कमजोरी पाता है।",
                english:
                    "Possesses will-power and self-respect, gets some fame, bears loss in the house ofbrother, faces affliction in the house ofwife and father, gets weakness in occupation, business and prestige, gets weakness in the house of government and society",
            },
            2: {
                hindi: "अपने शरीर के बल पर धन वृद्धि का प्रयास करता है, कभी-कभी धन हानि भी उठाता है, व्यय पर नियंत्रण रखने का प्रयास करता है, माता और भूमि से कुछ लाभ प्राप्त करता है।",
                english:
                    "Tries to increase wealth with the help of his physique, sometimes bears loss in wealth, tries to control expenditure, gets some advantage from mother and land",
            },
            3: {
                hindi: "जल्दी थक जाना, गुप्त रूप से परिश्रम करना, शारीरिक रूप से दुर्बल होना, छोटा कद, सुन्दरता में कमी, अधिक व्यय, व्यय कम करने का प्रयास, भाइयों की हानि, संकीर्ण एवं गलत मार्ग पर चलना तथा गलत तरीके से व्यय करना, शिक्षा एवं संतान के मामले में कुछ हानि तथा कुछ मजबूती का सामना करना।",
                english:
                    "Gets easily tired, labours secretly, has physical weakness, is of short stature, has deficiency in handsomeness, spends much, tries to curtail expenditure, bears loss ofbrothers, follows a narrow and wrong path and spends in a wrong way, faces some loss and some strength in the side of education and children",
            },
            4: {
                hindi: "बहुत प्रभावशाली, आध्यात्मिक ज्ञान और सुन्दर शरीर वाला, भौतिक सुख-सुविधाओं का आनंद लेने वाला, मातृपक्ष में हानि, किन्तु अन्य स्त्रियों से सहयोग पाने वाला, सुख में कमजोर, भूमि-भवन में कमी वाला, शत्रुओं पर प्रबल प्रभाव रखने वाला, आत्म-सम्मान की रक्षा करने वाला, अत्यधिक व्यय से चिन्तित रहने वाला।",
                english:
                    "Is very influential, possesses the spiritual knowledge and a handsome physique, enjoys physical luxury, bears loss in mother's side but gets support from other ladies, has weakness in happiness, has deficiency in the land and buildings, maintains great influence over the enemies, safeguards self-pride, worries on account of excessive expenditure",
            },
            5: {
                hindi: "अधिकार प्राप्त होता है, किन्तु शिक्षा में कुछ कमी रहती है, आत्मज्ञान होता है, पत्नी पक्ष से कुछ शत्रुता रहती है, व्यवसाय में भोग-विलास रहता है, किन्तु कुछ कष्टों का सामना करना पड़ता है।",
                english:
                    "Gets authority but some deficiency in education, has self-knowledge, faces some enmity in the side of wife, works indulgently in occupation though has to face some troubles",
            },
            6: {
                hindi: "बहुत प्रभावशाली कार्य करता है, कुछ निर्भरता के साथ सम्मान प्राप्त करता है, बहुत साहस और धैर्य से काम करता है, भाई के घर में कमजोरी का सामना करता है, दुश्मनों की परवाह नहीं करता है, जीवन की दिनचर्या में गरिमा बनाए रखता है, खर्च को नियंत्रित करने की कोशिश करके बहुत खर्च करता है, स्वार्थी और दयालु नहीं होता है कुंभ * 245",
                english:
                    "Does very influential deeds, gets dignity with some dependence, works very courageously and patiently, faces weakness in brother's house, does not care for the enemies, maintains dignity in the daily routine oflife, spends much through tries to control the expenditure, is selfish and not kind Aquarius * 245",
            },
            7: {
                hindi: "गृहस्थ जीवन में उलझनों का सामना करना पड़ता है, पत्नी के घर में अभाव और शत्रुता रहती है, व्यवसाय में चिंता और हानि होती है, धर्म पर उचित ध्यान देता है, छोटे कद का होता है।",
                english:
                    "Faces perplexity in domestic life, has deficiency and enmity in the house of wife, gets worries and loss in occupation, pays proper attention to Dharma, is of short stature",
            },
            8: {
                hindi: "गुप्त शक्ति प्राप्त होती है, खतरनाक कार्य करता है, दीर्घायु होता है, कुछ शारीरिक चिंताएं होती हैं, पिता के घर में शत्रुता का सामना करना पड़ता है, संतान पक्ष में कुछ बल प्राप्त होता है, शिक्षा प्राप्त होती है",
                english:
                    "Gets hidden strength, does dangerous deeds, gets a long life, gets some physical worries, faces enmity in father's house, gains some strength in children's side, gets education",
            },
            9: {
                hindi: "सुन्दर शरीर वाला, भाग्यशाली, धन प्राप्ति के लिए कठोर परिश्रम करने वाला, शत्रुओं के घर में बड़ा प्रभाव रखने वाला, भाई के घर में अभावग्रस्त, अधिक व्यय करने वाला, प्रसन्नचित्त एवं निडर होता है।",
                english:
                    "Gets a handsome body, is fortunate, works very hard to get wealth, has great influence in the house ofenemies, faces deficiency in the house of brother, spends much, is overjoyed and fearless",
            },
            10: {
                hindi: "प्रभावशाली कार्य करता है, अनेक कठिनाइयों के बाद सम्मान प्राप्त करता है, अधिक व्यय करता है, पिता के घर में हानि, पत्नी के घर में कुछ शत्रुता, माता के घर में कुछ कमजोरी, तथा बहुत परिश्रमी होता है।",
                english:
                    "Does influential deeds, gets respect after many difficulties, spends much, loss in the house offather, some enmity in the house ofwife some weakness in mother's house, and is very industrious",
            },
            11: {
                hindi: "बहुत धन कमाता है, प्रसिद्धि पाता है, बहुत खर्च करता है लेकिन खर्च को नियंत्रित करने की कोशिश करता है, आयु और संतान में कमी होती है, तथा शरीर में कुछ कमी होती है",
                english:
                    "Earns much wealth, gets fame, spends much but tries to check the expenditure, deficiency in age and children, and some deficiency in physique",
            },
            12: {
                hindi: "अधिक व्यय करता है, शरीर क्षीण होता है, धर्म का पालन-पोषण करता है, विदेश में सम्मान पाता है, शत्रुओं के घर में प्रभाव पाता है, धन की हानि होती है।",
                english:
                    "Spends much, gets an emaciated body, pays attention to and rears Dharma, gets honour in foreign places, gets influence in the house of enemies, bears some loss in wealth",
            },
        },
        Rahu: {
            1: {
                hindi: "कुछ शारीरिक कष्टों से ग्रस्त रहता है और कुछ विपत्तियों का सामना करता है, गुप्त युक्तियों का प्रयोग करता है, नाम और प्रसिद्धि पाने के लिए कड़ी मेहनत करता है, हमेशा अपने स्वार्थ की पूर्ति के लिए कुछ न कुछ करने में लगा रहता है।",
                english:
                    "Gets some physical perplexity and faces some calamities, uses secret tactics, tries to work hard to acquire name and fame, is always busy in trying something to serve his selfishness",
            },
            2: {
                hindi: "धन की कमी होती है, परिवार में हानि होती है, ऋण लेकर या दूसरों से सहायता लेकर खर्च चलाता है, धन के घर में घातक आघात सहता है, तथा बेचैन रहता है।",
                english:
                    "Has deficiency in wealth, bears loss in the family, manages the expenditure by taking loans and support from others, bears fatal blows in the house ofwealth, and is restless",
            },
            3: {
                hindi: "भाई के घर में कष्टों का सामना करता है, उन्नति के लिए कठोर परिश्रम करता है, अपने स्वार्थ के लिए गुप्त युक्तियों का प्रयोग करता है, अपनी शक्ति पर कठोर आघात सहते हुए भी सतर्क रहता है, बहुत प्रभावशाली और ऊर्जावान होता है।",
                english:
                    "Faces troubles in brother's house, labours very hard to progress, uses secret devices to serve his selfishness, remains cautioned even when bearing severe blows on his power, is very influential and energetic",
            },
            4: {
                hindi: "माता के घर में कुछ हानि और अलगाव सहना पड़ता है, सुख में कमी होती है, स्थायी सुख पाने के लिए गुप्त युक्तियों का प्रयोग करता है, भूमि और भवन के प्रबंधन में कुछ कमजोरी होती है।",
                english:
                    "Bears some loss and separation in mother's house, has deficiency in happiness, uses secret tactics to get permanent happiness, has some weakness in the management of land and buildings",
            },
            5: {
                hindi: "बुद्धि में चतुराई और तीक्ष्णता होती है, सदैव दूसरों को मूर्ख बनाने का प्रयत्न करता है, विद्या प्राप्त करता है, सत्य-असत्य की परवाह नहीं करता, संतान पक्ष से कष्ट पाता है।",
                english:
                    "Possesses cleverness and pungency in his mind, always tries to fool others, gets education, does not care for truth or falsehood, gets trouble from children's side",
            },
            6: {
                hindi: "शत्रु भाव में प्रभाव पाता है, शत्रुओं को भी परास्त करता है, शत्रु पक्ष से कुछ चिंता का सामना करता है, बहुत सतर्क और चतुर होता है।",
                english:
                    "Gets influence in the house of enemies, defeats the enemies also, faces some anxiety from enemies' side, is very cautious and clever",
            },
            7: {
                hindi: "पत्नी के घर में हानि, पत्नी से कष्ट, यौन सुख में कमजोरी, व्यवसाय में विपत्तियां, परिश्रमी कार्य, परिवार और व्यवसाय में अनुचित लाभ प्राप्त करने वाला कुंभ * 247",
                english:
                    "Bears loss in wife's house, bears affliction from wife, has weakness in sexual pleasures, bears calamities in the line of profession, does laborious deeds, enjoys some unjustified advantage in family and occupation Aquarius * 247",
            },
            8: {
                hindi: "जीवन में परेशानियों के साथ-साथ मान-सम्मान भी मिलता है, पैतृक संपत्ति के घर में कुछ बेचैनी रहती है, पेट और शरीर के निचले हिस्से में कुछ शिकायत रहती है।",
                english:
                    "Gets some dignity along with troubles in his life, faces some uneasiness in the house ofhereditary property, gets some complaint in stomach and in the lower part ofthe body",
            },
            9: {
                hindi: "भाग्य पक्ष में कष्ट और बाधाओं का सामना करना पड़ता है, यश प्राप्ति में कमी रहती है, स्वार्थ सिद्धि के लिए किसी भी प्रकार का धर्म अपनाने में समर्थ होता है, भाग्य की दुर्बलता से छुटकारा पाने का सदैव प्रयत्न करता है।",
                english:
                    "Faces trouble and hindrances in the side ofdestiny, feces deficiency in getting fame, is able to rear any kind ofDharma for serving his selfishness, always tries to get rid of the weakness of destiny",
            },
            10: {
                hindi: "पिता के घर में क्लेश, व्यापार और व्यवसाय में अनेक चिंताएँ, सरकार और समाज से जुड़े कार्यों में अनेक बाधाओं का सामना, पद-वृद्धि में बाधा, सर्वांगीण उन्नति के लिए गुप्त उपायों का प्रयोग",
                english:
                    "Bears affliction in father's house, bears many worries in business and occupation, faces many obstacles in the deeds connected with government and society, faces problems in rise of position, uses secret devices for acquiring all-round progress",
            },
            11: {
                hindi: "गुप्त नीतियों और योजनाओं के माध्यम से कम धन प्राप्त करता है, प्रत्यक्ष आय में कमी का सामना करता है, आय की चिंता से छुटकारा पाने के लिए कर्म करता है",
                english:
                    "Gets little money through secret policies and plans, faces deficiency in the apparent income, does deeds to get rid ofworry for income",
            },
            12: {
                hindi: "फिजूलखर्ची की योजनाएँ बनाता है, खर्च के कारण दुःखी रहता है, गुप्त विचार करता है",
                english:
                    "Gets the schemes ofextravagant expenditure, feces unhappiness on account of expenditure, thinks secretly",
            },
        },
        Ketu: {
            1: {
                hindi: "अपने शरीर में कुछ कमी महसूस करता है, दूसरों के भले-बुरे की परवाह नहीं करता, दृढ़ निश्चयी होता है",
                english:
                    "Feels some deficiency in his body, does not care about the good or bad for others, is of firm determination",
            },
            2: {
                hindi: "धन संचय में कमी का सामना करना पड़ता है, धन की हानि होती है, परिवार में अशांति और अलगाव का सामना करना पड़ता है, धन प्राप्ति के लिए बहुत परिश्रम करना पड़ता है",
                english:
                    "Faces deficiency in accumulating wealth, bears loss in wealth, faces disturbance and separation in the family, labours very hard to get wealth",
            },
            3: {
                hindi: "बहुत ऊर्जावान और साहस से काम करने वाला, भाई के घर में संकट का सामना करने वाला, गुप्त योजनाएँ रखने वाला, अपनी शक्ति में कमी महसूस करने वाला",
                english:
                    "Is very energetic and works with great courage, faces distress in the house ofbrother, possesses secret plans, feels deficiency in his strength",
            },
            4: {
                hindi: "माता के घर में कुछ हानि होती है, भूमि और भवन में कमजोरी होती है, सुख प्राप्ति में कठिनाई होती है, कष्टों में धैर्यपूर्वक कार्य करता है।",
                english:
                    "Bears some loss in mother's house, gets weakness in lands and buildings, feels complexity in acquiring happiness, works patiently in the troubles",
            },
            5: {
                hindi: "झूठ के बल पर अपना काम निकलवाता है, बहुत गुप्त योजनाएँ बनाता है, शिक्षा में कमजोर होता है, बच्चों से कष्ट पाता है, स्मरण शक्ति कमजोर होती है।",
                english:
                    "Gets his work done through the strength of falsehood, chalks out very secret schemes, gets weakness in education, faces affliction with children, has weak memory",
            },
            6: {
                hindi: "शत्रुओं के घर में विजय प्राप्त होती है, कुछ परेशानियों से चिंतित रहता है, शत्रुओं की परवाह नहीं करता, शत्रुओं के दमन में गुप्त योजनाओं का प्रयोग करता है।",
                english:
                    "Gets victory in the house ofenemies, is worried about some troubles, does not care for the enemies, uses secret schemes in suppressing the enemies",
            },
            7: {
                hindi: "पत्नी के घर में क्लेश रहता है, व्यवसाय के क्षेत्र में चिंता के साथ काम करता है और व्यवसाय में घातक हानि भी होती है, यौन सुख के संबंध में बेचैनी होती है, यौन मामलों के लिए मजबूत शक्ति होती है।",
                english:
                    "Bears distress in wife's house, works with worries in the field of occupation and also faces a fatal loss in occupation, has uneasiness in connection with sexual pleasures, has strong power for sexual affairs",
            },
            8: {
                hindi: "जीवन की दिनचर्या में चिंतित रहता है, सबसे अस्पष्ट मामलों पर ध्यान देता है, दीर्घायु के घर में आघात सहता है, भयावह परिस्थितियों में भी निडरता से काम करता है, प्रभावशाली होता है।",
                english:
                    "Feels worried in the daily routine oflife, pays attention to the most obscure affairs, faces blows in the house oflongevity, works fearlessly even in the fearful circumstances, is influential",
            },
            9: {
                hindi: "यश और भाग्य भाव में कुछ कमी रहती है, गुप्त शक्तियों का प्रयोग बहुत चतुराई से करता है, आय या भाग्य में वृद्धि नहीं होती, धर्म का वास्तविक स्वरूप प्राप्त नहीं होता",
                english:
                    "Faces some deficiency in fame and house ofdestiny, uses the secret powers very cleverly, does not get rise in income or fortune, does not get the real shape of Dharma",
            },
            10: {
                hindi: "पिता के घर में कुछ विपत्तियों का सामना करता है, व्यापार में कष्ट और संकट सहता है, सरकार और समाज में चिंतित रहता है, किसी गुप्त शक्ति के सहयोग से बहुत धैर्य से काम करता है, गुप्त साहस वाला और परिश्रमी होता है।",
                english:
                    "Faces some calamities in father's house, bears troubles and distress in business, feels worried in government and society, works very patiently through the support of some secret power, is of hidden courage and is industrious",
            },
            11: {
                hindi: "अपनी भव्य एवं गुप्त शक्तियों से भारी आर्थिक लाभ प्राप्त करता है, विशेष लाभ प्राप्त करने के स्थान पर उचित-अनुचित की परवाह नहीं करता, भारी अनुचित लाभ प्राप्त करता है, अत्यधिक लाभ प्राप्त करने का प्रयास करता है।",
                english:
                    "Gets heavy monetary advantages through his grand and secret powers, does not care for the right or wrong in the place ofgetting special benefits, gets heavy gratuitous gains, tries to get too many advantages",
            },
            12: {
                hindi: "बहुत अधिक खर्च करता है, अत्यधिक व्यय के कारण कुछ कष्ट और पीड़ा का अनुभव करता है, गुप्त शक्तियों का प्रयोग करता है, व्यय को नियंत्रित करने में असमर्थ होता है",
                english:
                    "Spends too much, experiences some distress and agony due to reasons of excessive expenditure, uses secret powers, is unable to check the expenditure",
            },
        },
    },
    Pisces: {
        Sun: {
            1: {
                hindi: "बहुत प्रभावशाली और शत्रुओं पर विजय पाने वाला, शरीर में कष्ट, बंधन, अभिमानी, पत्नी के घर में कष्ट और यौन सुख में कमी, व्यवसाय में बाधा, बहुत परिश्रमी होता है।",
                english:
                    "Is very influential and gets victory over enemies, faces some distress in the physique, experiences some bondage, is very haughty, experiences troubles in wife's house and some deficiency in the side ofsexual pleasures, feces some hindrances in occupation, and is very industrious",
            },
            2: {
                hindi: "कठिन परिश्रम के बाद बहुत सारा धन प्राप्त होता है, परिवार में कुछ प्रभाव और कुछ अलगाव होता है, जीवन की दिनचर्या में बेचैनी का सामना करना पड़ता है",
                english:
                    "Gets a lot ofwealth after hard labour, gets some influence and some separation in the family, faces restlessness in the daily routine oflife",
            },
            3: {
                hindi: "बहुत परिश्रमी, धर्म का आदर करने वाला, भाई-बहनों से विरोध सहने वाला, परिश्रम के कारण कुछ थकान महसूस करने वाला, चतुर एवं यशस्वी होता है।",
                english:
                    "Is very diligent, respects Dharma, feces opposition from brothers and sisters, feels some fatigue due to labour, is clever and illustrious",
            },
            4: {
                hindi: "माता-पिता के घर में कष्ट, भूमि, भवन और निवास स्थान की हानि, सुख में कमी, समाज में मान-सम्मान की कमी, हिंसात्मक कार्य करने वाला, प्रभावशाली होता है।",
                english:
                    "Faces some distress in the house ofparents, faces loss in lands, buildings and residential places, faces some deficiency in happiness, gets respect and honour in society, does violent deeds, and is influential",
            },
            5: {
                hindi: "शिक्षा में कुछ कमी रहती है, कुछ चिंताएं और कठिनाइयां रहती हैं, आय के लिए काम करता है, शत्रु पक्ष पर विजय प्राप्त करता है, असभ्य होता है",
                english:
                    "Gets some deficiency in education, experiences some worries and difficulties, works for income, gets victory over enemies' side, is rude",
            },
            6: {
                hindi: "शत्रुओं को परास्त करता है, महान प्रभाव प्राप्त करता है, संकटों और विपत्तियों को दूर करने की महान शक्ति प्राप्त करता है, शत्रुओं पर सदैव दबाव बनाए रखता है",
                english:
                    "Defeats the enemies, gains great influence, gets grand power of removing troubles and calamities, always maintains pressure on enemies",
            },
            7: {
                hindi: "पत्नी के घर में विरोध का सामना करना पड़ता है, परिवार में कुछ कष्ट सहना पड़ता है, व्यवसाय में बाधाएँ और चिंताएँ आती हैं, यौन सुख में कुछ कमी रहती है।",
                english:
                    "Faces opposition in wife's house, bears some distress in family, gets hindrances and worries in the line of occupation, faces some deficiency in the side of sexual pleasures",
            },
            8: {
                hindi: "बड़ी बेचैनी और बाधाएं झेलता है, नाभि के नीचे पेट में विकार की शिकायत रहती है, कूटनीति से शत्रुओं के घर में काम निकलवाता है, कभी-कभी बहुत भयंकर विपत्तियों का सामना करता है",
                english:
                    "Bears great restlessness and hindrances, gets some complaints about the disorder in stomach below navel, gets the work done in the enemies' house through diplomatic tactics, faces very severe calamities sometimes",
            },
            9: {
                hindi: "शत्रु पक्ष में प्रभाव बना रहता है, भाग्य भाव में कुछ बाधाओं का सामना करना पड़ता है, धर्म भाव में कमजोरी होती है, भाई-बहनों से कुछ विरोध का सामना करना पड़ता है",
                english:
                    "Maintains influence in enemies' side, faces some hindrances in the house of destiny, has weakness in the house ofDharma, faces some opposition from the brothers and sisters",
            },
            10: {
                hindi: "प्रभाव और परिश्रम से सरकार और समाज से लाभ प्राप्त करता है, सरकार और समाज में महान कार्य करता है, पिता के घर में विरोध का सामना करता है, माता की ओर से भी कुछ कष्ट पाता है, सुख-शांति में कुछ बाधाएँ पाता है, भूमि और भवन के सम्बन्ध में कुछ रुकावटें पाता है, प्रभुता चाहता है, और परिश्रमी होता है।",
                english:
                    "Gets the advantage from the government and the society through influence and diligence, does grand deeds in government and society, faces opposition in father's house, faces some distress from mother's side also, finds some obstacles in peace and happiness, finds some hindrances in connection with lands and buildings, wants sovereignty, and is diligent",
            },
            11: {
                hindi: "लाभ भाव में कुछ बेचैनी का अनुभव होता है, संतान पक्ष से कुछ चिंता और परेशानी होती है, शिक्षा प्राप्ति में कमी होती है, शत्रु पक्ष से लाभ प्राप्त होता है, और बहुत चतुर होता है।",
                english:
                    "Experiences some uneasiness in the house ofgains, faces some worry and problem from children's side, has deficiency in acquiring education, gains advantage from enemies' side, and is very clever",
            },
            12: {
                hindi: "प्रभाव भाव में कमजोरी महसूस करता है, शत्रु भाव में गुप्त रूप से अपना काम करवाता है, भाइयों से कुछ परेशानी का सामना करता है, व्यय भाव में रुकावटें पाता है, अभिमानी और क्रोधी होता है।",
                english:
                    "Feels weakness in the house ofinfluence, gets his work done secretly in the house of enemies, faces some trouble with brothers, finds hindrances in the house of managing expenditure, is haughty and foil of anger",
            },
        },
        Moon: {
            1: {
                hindi: "मन की उत्तम शक्ति प्राप्त होती है, शिक्षा में विशेष तेज होता है, वाणी में गरिमा होती है, संतान पक्ष में वैभव प्राप्त होता है, पत्नी से सौंदर्य और संतुष्टि प्राप्त होती है, उसके प्रति आकर्षित होता है, व्यवसाय में सफलता प्राप्त होती है, यौन सुख की शक्ति प्राप्त होती है, गुप्त ज्ञान का स्वामी होता है।",
                english:
                    "Gets ideal strength of mind, has a peculiar splendour in education, has a dignity in speech, gets grandeur in children's side, gets beauty and satisfaction from wife, is attracted towards her, gets success in occupation, gets the strength of sexual pleasures, possesses hidden knowledge",
            },
            2: {
                hindi: "शिक्षा प्राप्त करता है, इच्छाशक्ति से धन कमाता है, परिवार की उन्नति और धन वृद्धि से प्रसन्न होता है, संतान के संबंध में कुछ बंधनों का सामना करता है, जीवन में सुख पाता है, धनवान और सम्माननीय माना जाता है।",
                english:
                    "Gets education, earns wealth through will-power, is happy with the progress in family and increase in wealth, faces some bondage regarding children, finds happiness in life, is said to be wealthy and is respectable",
            },
            3: {
                hindi: "विद्या और बुद्धि पर आश्रित रहता है, संतान और भाई-बहनों का बल प्राप्त करता है, धर्म का ध्यान नहीं रख पाता, ईश्वर में कम विश्वास रखता है, माता से सुख पाता है, भवन और संपत्ति प्राप्त करता है, सरकार और समाज में सम्मान बढ़ाता है, व्यापार में उन्नति करता है।",
                english:
                    "Has reliance on education and intellect, gets the power of children and strength of brothers and sisters, is unable to care for Dharma, has less faith in God, gets happiness from mother, gets buildings and property, gets rise in honour in government and society, develops business",
            },
            4: {
                hindi: "संतान सुख मिलता है, अच्छी शिक्षा मिलती है, माता का सुख मिलता है, भूमि, भवन और संपत्ति का सुख मिलता है, पिता से अच्छा संपर्क बना रहता है, सरकार और समाज में मान-सम्मान बढ़ता है, व्यापार में उन्नति होती है",
                english:
                    "Gets the happiness of children, gets good education, gets the happiness from mother, gets the pleasure of land, buildings and property, maintains a decent contact with father, experiences a rise of honour in government and society, gets progress in business",
            },
            5: {
                hindi: "बहुत बुद्धिमान और विद्वान होता है, विश्वसनीय विचार रखता है, बच्चों से सुख प्राप्त करता है, बहुत संतुलित सिद्धांतों के बारे में सोचता है, स्थिर मन वाला होता है, सौम्य स्वभाव का होता है",
                english:
                    "Is very wise and learned, puts forth convincing ideas, gets the happiness of children, thinks of very balancing principles, has a stabilised mind, is of gentle nature",
            },
            6: {
                hindi: "शिक्षा में कठिनाई और कमी का सामना करना पड़ता है, बच्चों की शिक्षा में कष्ट होता है, बहुत सोच-विचार कर काम पूरा होता है, शत्रुओं के घर में अशांति का सामना करना पड़ता है, बहुत अधिक खर्च करना पड़ता है।",
                english:
                    "Faces difficulties and deficiency in education, experiences distress in children's education, gets the work done by thinking very intricately, faces restlessness in enemies' house, spends much",
            },
            7: {
                hindi: "अपनी इच्छा शक्ति से व्यवसाय में सफलता प्राप्त करता है, शिक्षित एवं सुशील पत्नी पाता है, यौन सुखों के प्रति अत्यधिक आकर्षण रखता है, बहुत चतुर एवं प्रसन्न स्वभाव का होता है।",
                english:
                    "Achieves success in occupation through his will-power, gets an educated and gentle wife, has a great fascination for sexual pleasures, is very clever and is ofhappy disposition",
            },
            8: {
                hindi: "शिक्षा में कमी, संतान पक्ष में रोग और कमी, अत्यधिक परिश्रम के बाद धन की प्राप्ति, जीवन की दिनचर्या में शान, परिवार में उन्नति",
                english:
                    "Gets the deficiency in education, bears disease and deficiency in children's side, gets wealth after great labour, has elegance in the daily routine of life, acquires the progress in family",
            },
            9: {
                hindi: "विद्या और बुद्धि में दुर्बलता, भाग्य की हानि और संतान पक्ष में कष्ट, भाई-बहनों के प्रति अच्छा व्यवहार, गलत और अनुचित तरीकों से उन्नति पाने की योजनाएँ बनाना।",
                english:
                    "Faces weakness in education and intellect, gets the loss of destiny and distress in children's side, possesses nice attitude about brothers and sisters, chalks out schemes to acquire progress through some wrong and improper means",
            },
            10: {
                hindi: "शिक्षा में उत्तम योग्यता होती है, पिता के घर से उन्नति प्राप्त होती है, राज-काज और समाज में बड़ा मान-सम्मान मिलता है, माता का सुख मिलता है, भूमि-भवन का कुछ बल प्राप्त होता है, अधिकारी की तरह बात करता है।",
                english:
                    "Has a great ability in education, acquires progress from father's house, has great respect and honour in the deeds ofgovernment and society, gets the happiness from mother, gains some strength of lands and buildings, talks like an officer",
            },
            11: {
                hindi: "अच्छी शिक्षा प्राप्त करता है, धन कमाता है, आय भाव में कुछ बाधाओं का सामना करता है, संतान प्राप्त करता है, सदैव लाभ की बात करता है",
                english:
                    "Gets good education, earns wealth, faces some hindrances in the house of income, gets children, always talks about gains",
            },
            12: {
                hindi: "संतान के घर में हानि, नेत्र दोष, विद्या भाव में दुर्बलता, स्मरण शक्ति कमजोर, बेचैन, अधिक व्यय करने वाला, व्यय के सम्बन्ध में चिन्तित, शत्रु भाव में प्रभाव, थोड़ा डरने वाला, अस्थिर मन वाला होता है।",
                english:
                    "Bears loss in children's house, gets defects in eyes, faces weakness in the house of education, has a weak memory, is restless, spends much, has some worry in connection with expenditure, acquires influence in enemies' house, fears a little, and is ofunstable mind",
            },
        },
        Mars: {
            1: {
                hindi: "भाग्य से धन प्राप्त करता है, धर्म का पालन करता है, भाग्यशाली माना जाता है, माता से भूमि, भवन और सुख प्राप्त करता है, पत्नी की ओर से सौभाग्य प्राप्त करता है, दैनिक जीवन में कुलीन स्तर बनाए रखता है, परिवार का सुख प्राप्त करता है",
                english:
                    "Gets wealth due to destiny, follows Dharma, is thought to be fortunate, gets lands, buildings and happiness from mother, gets good fortune from wife's side, maintains an aristocratic standard in the daily life, gets the pleasures of the family",
            },
            2: {
                hindi: "धनवान और भाग्यशाली, भाग्य से धनवान, संतान पक्ष में कुछ कमी और बेचैनी, शिक्षा और बुद्धि में कमी, दैनिक जीवन में कुलीनता बनाए रखने वाला, ईश्वर में आस्था रखने वाला और प्रसिद्धि वाला होता है।",
                english:
                    "Is rich and fortunate, gets wealthier through destiny, experiences some deficiency and restlessness in the children's side, has deficiency in education and wisdom, maintains aristocracy in the daily life, has faith in God, and possesses fame",
            },
            3: {
                hindi: "धर्म का पालन करता है, सरकार और समाज से लाभ प्राप्त करता है, पिता के घर से लाभ प्राप्त करता है, भाई से बल प्राप्त करता है, शत्रु पक्ष में प्रभाव प्राप्त करता है",
                english:
                    "Rears Dharma, gets advantage from government and society, gains advantage from father's house, gets the strength from brother, gains influence in the side of enemies",
            },
            4: {
                hindi: "भवन और संपत्ति का स्वामी, धन संचय करने वाला, प्रचुर आय वाला, धार्मिक अनुष्ठानों को पूर्ण करने वाला, माता से सहयोग पाने वाला, पत्नी के घर से सौभाग्य प्राप्त करने वाला, व्यापार व्यवसाय में सफलता पाने वाला, बहुत भाग्यशाली होता है।",
                english:
                    "Owns buildings and property, accumulates wealth, gets heavy income, fulfils religious formalities, gets cooperation from mother, gets good luck from wife's house, gets success in business occupation, and is very fortunate",
            },
            5: {
                hindi: "संतान से कष्ट, शिक्षा में कमी, धन संचय में कमी, धर्म से सम्बन्ध कमजोर, अधिक व्यय, व्यय भाव से सुख नहीं मिलता।",
                english:
                    "Bears distress from children, gets deficiency in education, faces deficiency in accumulating wealth, has weakness in connection with Dharma, spends much, acquires no enjoyment from the house of expenditure",
            },
            6: {
                hindi: "किसी कठिन साधन से सौभाग्य प्राप्त होता है, जटिल युक्तियों से सफलता मिलती है, शत्रु भाव में विजय मिलती है, व्यय भाव में किसी से शत्रुता होती है, परिवार द्वारा विरोध होता है",
                english:
                    "Gets good luck through some difficult means, gets success due to intricate tactics, gets victory in the house of enemies, has some enmity in the house of expenditure, being opposed by the family",
            },
            7: {
                hindi: "भाग्य से व्यवसाय में उन्नति करता है, धन कमाता है, पत्नी के सौभाग्य से धन प्राप्त करता है, किन्तु पत्नी को कष्ट देता है, बड़े पैमाने पर व्यापार करता है, सरकार और समाज से लाभ प्राप्त करता है, पिता से कुछ सहयोग प्राप्त करता है, यौन सुखों का आनंद लेता है, धन को बहुत महत्व देता है और धन प्राप्ति के लिए कठोर परिश्रम करता है।",
                english:
                    "Experiences progress in occupation through his fortune, earns wealth, gains wealth due to the good luck ofwife but causes unrest to wife, conducts a large scale business, gets advantage from government and society, gets some cooperation from father, enjoys the sexual pleasures, gives much importance to wealth and labours very hard for wealth",
            },
            8: {
                hindi: "भाग्य भाव में कुछ कमजोरी होती है, धन की हानि होती है, धन संचय में अनेक बाधाओं का सामना करना पड़ता है, विदेश से भारी आय होती है, जीवन की दिनचर्या में सौभाग्य की प्राप्ति होती है, भाई से शत्रुता होती है।",
                english:
                    "Has some weakness in the house of destiny, feces some loss in wealth, faces many obstacles in accumulating wealth, gains heavy income from foreign countries, gets good fortune in the daily routine of life, develops some enmity with brother",
            },
            9: {
                hindi: "बहुत भाग्यशाली और धार्मिक होता है, भाग्य के बल से धन कमाता है, परिवार का सुख पाता है, भाई से कुछ शत्रुता रहती है, भूमि और भवन प्राप्त करता है, माता से सहायता प्राप्त करता है, प्रभावशाली होता है",
                english:
                    "Is very fortunate and religious, earns wealth through the power of destiny, gets the pleasures of the family, has some enmity with brother, gets land and buildings, receives help from mother, is influential",
            },
            10: {
                hindi: "बहुत प्रभावशाली, बहुत सम्मान और आदर पाने वाला, सरकार और समाज से लाभ प्राप्त करने वाला, बड़े पैमाने पर व्यवसाय करने वाला, कुछ कड़वा बोलने वाला, संतान पक्ष में कुछ कमी वाला, शिक्षा में कुछ कमजोर, भूमि और भवन पाने वाला, धार्मिक औपचारिकताओं का पालन करने वाला",
                english:
                    "Is very influential, gets great honour and respect, enjoys the advantage from the government and society, pursues the occupation on a large scale, speaks somewhat bitterly, feces some deficiency in children's side, has some weakness in education, gets land and buildings, observes religious formalities",
            },
            11: {
                hindi: "अनेक आर्थिक लाभ प्राप्त होते हैं, अकस्मात् धन संचय होता है, अनुग्रहपूर्ण एवं भव्य लाभ प्राप्त होते हैं, शिक्षा में कुछ कमी रहती है, संतान पक्ष में कमी अनुभव होती है, शत्रुओं के घर में प्रभाव बढ़ता है, संकटों से स्वतः मुक्ति मिलती है, पारिवारिक सुख प्राप्त होता है, धन वृद्धि पर ध्यान रहता है।",
                english:
                    "Gets many monetary advantages, accumulates wealth accidentally, gets gracious and grand advantages, gets some deficiency in education, feels deficiency in children's side, gains influence in the house of enemies, escapes automatically from troubles, gets family happiness, pays attention to the increase ofwealth",
            },
            12: {
                hindi: "बहुत धन नष्ट होता है, भाग्य में कमजोरी होती है, असहाय होकर अधिक खर्च करता है, भाई के साथ सामान्य संबंध होता है, दैनिक व्यवसाय में उन्नति होती है, पत्नी के घर में सौभाग्य प्राप्त होता है, परिवार में हानि होती है, मितव्ययिता का ध्यान नहीं रखता।",
                english:
                    "Loses much wealth, feces weakness in destiny, spends much being helpless, has an ordinary relation with brother, gets progress in diurnal occupation, gets good luck in wife's house, gets losses in the family, does not observe economy",
            },
        },
        Mercury: {
            1: {
                hindi: "शरीर दुबला-पतला होता है, माता के सुख में कमी होती है, भवन, भूमि और संपत्ति में कुछ कमी होती है, पत्नी के घर में कुछ कमी होती है, कठोर शारीरिक श्रम करने के बाद व्यवसाय में उन्नति होती है, अनुचित तरीके से यौन संबंधों में अधिक लाभ प्राप्त होता है।",
                english:
                    "Has a slim body, faces some deficiency in the happiness from mother, gets some weakness in buildings, lands and property, has some deficiency in wife's house, gets the progress in occupation after doing hard physical labour, enjoys more advantages in sexual affairs in an unjustified manner",
            },
            2: {
                hindi: "सम्मानजनक व्यवसाय से धन अर्जित करता है, संपत्ति का बल प्राप्त करता है, पारिवारिक सुख में कुछ बंधन का सामना करता है, मायके में कमी होती है, पत्नी की ओर से कुछ बंधन का सामना करता है, यौन सुख में कमी होती है, जीवन की दैनिक दिनचर्या में सुख पाता है",
                english:
                    "Earns wealth through a respectable occupation, gets the strength of property, faces some bondage in family happiness, deficiency in mother's house, faces some bondage from wife's side, has deficiency in sexual pleasures, finds happiness in the daily routine of life",
            },
            3: {
                hindi: "व्यवसाय में सफलता मिलती है, माता से शक्ति मिलती है, भूमि, भवन, भाई-बहन और पत्नी से बल मिलता है, सुखपूर्वक जीवन व्यतीत होता है, यौन सुख प्राप्त होता है",
                english:
                    "Gets success in occupation, gets power from mother, gets the strength ofland, buildings, brothers and sisters and ofwife, lives comfortably, gets sexual pleasures",
            },
            4: {
                hindi: "भूमि और भवन से बल मिलता है, परिवार का अभूतपूर्व सुख मिलता है, माता से अपार सुख मिलता है, व्यवसाय में बल मिलता है, सरकार और समाज से लाभ मिलता है",
                english:
                    "Gains strength from lands and buildings, gets unprecedented happiness ofthe family, achieves great happiness from mother, gains strength in occupation, gets advantage from government and society",
            },
            5: {
                hindi: "व्यवसाय सुखपूर्वक करता है, पारिवारिक मामलों को अच्छी तरह से संभालता है, पत्नी और बच्चों का सुख प्राप्त करता है, यौन सुखों का भरपूर आनंद उठाता है, भूमि और भवन का आनंद लेता है, शरीर में कुछ कमजोरी होती है।",
                english:
                    "Pursues the occupation comfortably, manages the family affairs well, gains happiness ofwife and children, gets excess of sexual pleasures, enjoys the lands and buildings, has some weakness in physique",
            },
            6: {
                hindi: "माता के घर में अलगाव का सामना करना पड़ता है, पत्नी पक्ष में कुछ शत्रुता होती है, भूमि और भवन में कुछ कमजोरी होती है, व्यवसाय की ओर से कुछ परेशानियों का सामना करना पड़ता है, शत्रु के घर को शांतिपूर्वक चलाता है, बहुत खर्च करता है।",
                english:
                    "Faces separation in mother's house, gets some enmity in wife's side, gets some weakness in land and buildings, faces some troubles from the side of occupation, manages the enemy's house peacefully, spends much",
            },
            7: {
                hindi: "अत्यंत सुंदर पत्नी मिलती है, प्रभावशाली व्यवसाय करता है और सुख व सफलता प्राप्त करता है, माता के घर में प्रतिष्ठा प्राप्त करता है, अत्यधिक सुख व यौन सुख प्राप्त करता है, भूमि व भवन का आनंद लेता है।",
                english:
                    "Gets a very beautiful wife, pursues influential occupation and gets happiness and success, gets dignity in mother's house, gets excessive happiness and sexual pleasures, enjoys lands and buildings",
            },
            8: {
                hindi: "माता और पत्नी के घर में हानि होती है, भूमि और भवन में कुछ कमी होती है, सुख में कमी होती है, व्यवसाय द्वारा मामलों का प्रबंधन होता है, विदेश से सहायता मिलती है, दीर्घायु का सुख मिलता है, जीवन की दिनचर्या में सुख मिलता है।",
                english:
                    "Bears loss in mother's and wife's house, has some deficiency in lands and buildings, feces deficiency in happiness, manages the affairs through occupation, gets support from foreign countries, gets happiness ofa long age, finds happiness in the daily routine oflife",
            },
            9: {
                hindi: "परिवार के संबंध में सौभाग्य प्राप्त होता है, माता का स्नेह प्राप्त होता है, पत्नी के कारण भाग्य में वृद्धि होती है, दैनिक व्यवसाय में सफलता मिलती है, धार्मिक पत्नी मिलती है, भाई-बहनों का सुख मिलता है, भवन और संपत्ति का स्वामी होता है।",
                english:
                    "Gets good luck in connection with family, gets the affection of mother, gains increased fortune due to wife, gets success in diurnal occupation, gets a religious wife, happiness ofbrothers and sisters, possesses buildings and property",
            },
            10: {
                hindi: "राजसी सुख-सुविधाएं प्राप्त होती हैं, पत्नी का वैभव प्राप्त होता है, पारिवारिक सुख प्राप्त होता है, भवन और संपत्ति का अधिकार प्राप्त होता है, बड़े व्यवसाय में संलग्न होता है, सरकार और समाज से लाभ प्राप्त करता है, सुसज्जित घर में रहता है और सज्जन कर्म करता है।",
                english:
                    "Gets royal pleasures and happiness, gets the grandeur ofwife, gets domestic happiness, gets the power of buildings and property, pursues a big occupation, enjoys advantages from government and society, lives in a decorated house, and does gentle deeds",
            },
            11: {
                hindi: "व्यवसाय से सुखपूर्वक भारी लाभ और आय प्राप्त करता है, भवन और संपत्ति का लाभ प्राप्त करता है, पत्नी से लाभ प्राप्त करता है, यौन सुख का आनंद लेता है, माता से लाभ प्राप्त करता है, बच्चों से सुख प्राप्त करता है, शिक्षा में सफलता प्राप्त करता है, मीठा बोलता है",
                english:
                    "Gets heavy gains and income comfortably through the occupation, gets the advantage ofbuildings and property, gets advantage from wife, enjoys sexual pleasures, gains advantage from mother, gets happiness from children, gets success in education, speaks sweetly",
            },
            12: {
                hindi: "माता के घर और पत्नी के घर में कुछ हानि होती है, भवन और संपत्ति में कुछ हानि होती है, व्यवसाय में कुछ हानि होती है और सुख-सुविधाओं में कुछ कमी होती है, यौन सुख के घर में कुछ कमी होती है, विदेशी संपर्क से व्यवसाय में अधिक व्यय होता है, व्यय शक्ति से यौन सुख प्राप्त होता है, शत्रुओं के घर में विनम्रता से अपना काम निकलवाता है।",
                english:
                    "Bears some loss in mother's house and in the house ofwife, gets some loss in buildings and property, gets some loss in occupation and finds some deficiency in happiness and comforts, has some deficiency in the house of sexual pleasures, spends much pursuing the occupation through foreign contact, gets sexual pleasures through the power of expenditure, gets his work done politely in enemies' house",
            },
        },
        Jupiter: {
            1: {
                hindi: "मान-सम्मान प्राप्त होता है, आदर्श कर्म करता है, अनेक सांसारिक और दैवी गुणों से युक्त होता है, सुगठित शरीर वाला होता है, पिता का सहयोग प्राप्त होता है, अच्छी शिक्षा प्राप्त होती है, संतान का विशेष बल प्राप्त होता है, सरकार और समाज में सम्मान प्राप्त होता है, पत्नी पक्ष में सम्मान प्राप्त होता है, वैभवशाली जीवन व्यतीत करता है और आत्म-सम्मान से युक्त होता है।",
                english:
                    "Gets dignity, does ideal deeds, possesses a host ofworldly and divine qualities, has a good physique, gets support from the father, gets good education, gets the special power of the children, gets honour in government and society, gets honour in wife's side, lives majestically and possesses great self-respect",
            },
            2: {
                hindi: "पिता के धन से बल पाता है, खूब धन कमाता है, बड़ा व्यवसाय करता है, सरकार और समाज में बड़ा सम्मान पाता है, धन और परिवार में बड़ा मान-सम्मान पाता है, शत्रुओं के घर में बड़ा प्रभाव रखता है, कठिनाइयों पर विजय प्राप्त करता है, और बहुत प्रभावशाली होता है।",
                english:
                    "Gets strength of wealth of his father, earns much wealth, manages a big occupation, gets great respect in government and society, gets great dignity in wealth and family, holds great influence in the house ofenemies, gets victory over difficulties, and is very influential",
            },
            3: {
                hindi: "बहुत परिश्रम और वंशानुक्रम से उन्नति प्राप्त करता है, राज्य और समाज का सहयोग पाता है, भाई से कुछ विरोध का सामना करता है, आय में कमी अनुभव करता है, धर्म का पालन करता है, व्यवसाय में प्रतिष्ठा प्राप्त करता है, पत्नी में वैभव प्राप्त करता है, परिवार का प्रभाव और सुख प्राप्त करता है, हठी स्वभाव का होता है, प्रभावशाली होता है।",
                english:
                    "Acquires the progress after labouring very hard and through hereditary deeds, gets the support of government and society, faces some opposition from brother, feels deficiency in income, rears Dharma, gets dignity in the line of occupation, gets grandeur in wife, gets influence and pleasures ofthe family, is ofobstinate nature, and is influential",
            },
            4: {
                hindi: "सुखपूर्वक जीवन व्यतीत करता है, भूमि और भवन का बल रखता है, परिवार में उच्च प्रभाव रखता है, माता-पिता का सुख पाता है, अपनी इच्छा शक्ति से सुखपूर्वक व्यवसाय करता है, अधिकार और प्रभुता का आनंद लेता है, दीर्घायु होता है, व्यय भाव में शत्रुता होती है।",
                english:
                    "Lives comfortably, possesses the strength of land and buildings, holds great influence in family, gets happiness of parents, pursues the occupation happily through his will-power, lives enjoying authority and sovereignty, gets a long age, gets some enmity in the house of expenditure",
            },
            5: {
                hindi: "बुद्धि में महान बल प्राप्त होता है, बहुत विद्वान होता है, प्रभावशाली वक्ता होता है, पिता और पुत्र का बल प्राप्त करता है, सुन्दर शरीर वाला होता है, धर्म का बहुत पालन करता है, बहुत भाग्यशाली होता है, आय में कमी महसूस करता है, आत्म-अभिमानी होता है, प्रसिद्ध और दूरदर्शी होता है।",
                english:
                    "Gets great strength in wisdom, is very learned, is an influential orator, gets the strength offather and son, has a handsome physique, rears Dharma very much, is very fortunate, feels the deficiency in income, self-conceited, is famous and farsighted",
            },
            6: {
                hindi: "कुछ हद तक आश्रित किन्तु प्रभावशाली कार्य करता है, पिता के घर से कुछ विरोध का सामना करता है, धन में वृद्धि पाता है, सरकार और समाज से लाभ प्राप्त करता है, निर्भरता और स्वतंत्रता का मिश्रण विचित्र रूप से प्राप्त करता है, स्वयं उलझनों में घिरे होने पर भी दूसरों के घावों को दूर करने का प्रयास करता है।",
                english:
                    "Does somewhat dependent but influential deeds, faces some opposition from father's house, gets increased wealth, gets the advantage from government and society, gets the mixture of dependence and independence in a strange manner, tries to remove the wounds ofothers even when he is engulfed in perplexities himself",
            },
            7: {
                hindi: "सुन्दर शरीर, शारीरिक श्रम और मन की शक्ति से व्यवसाय में उन्नति, व्यवसाय में सम्मान, पत्नी के घर में सुख, यौन सुख, आय के घर में कुछ कमी, भाइयों से कुछ शत्रुता",
                english:
                    "Gets a handsome physique, gets progress in the occupation through physical labour and the power of heart, gets respect in the line of occupation, gets happiness in wife's house, enjoys sexual pleasures, feels some deficiency in the house of income, some enmity with brothers",
            },
            8: {
                hindi: "राजसी कार्य करने से मान-सम्मान मिलता है, पिता के घर से कष्ट मिलता है, क्षीण शरीर मिलता है, उन्नति में बाधा आती है, सरकार और समाज से कुछ असंतोष मिलता है, व्यय भाव में चिंता बनी रहती है, जीवन की दिनचर्या में कुछ मान-सम्मान बना रहता है।",
                english:
                    "Gets respect by working majestically, finds distress from father's house, gets an emaciated body, faces obstacles in the progress, finds some dissatisfaction from government and society, remains worried in the house of expenditure, maintains some dignity in the daily routine of life",
            },
            9: {
                hindi: "बहुत भाग्यशाली, धार्मिक और न्यायप्रिय, सरकार, समाज और पिता से लाभ पाने वाला, सुन्दर शरीर वाला, इच्छाशक्ति और दैवी शक्ति से युक्त, हृदय में पवित्रता वाला, संतान से लाभ पाने वाला, बहुत अच्छा बोलने वाला, आत्मसम्मान को अधिक महत्व देने वाला, भाई को कम महत्व देने वाला, प्रभावशाली और विद्वान होता है।",
                english:
                    "Is very fortunate, religious and likes justice, gets advantage from government, society and father, has a handsome body, gets enhanced will-power and divine power, possesses purity in heart, gains advantage from children, speaks very nicely, pays much importance to self-respect, gives less importance to brother, and is influential and learned",
            },
            10: {
                hindi: "बड़ा व्यापार करता है, पिता के साथ मिलकर व्यापार को बराबरी से चलाता है, सरकार और समाज से बड़ा मान-सम्मान पाता है, धन-संपत्ति में वृद्धि होती है, माता और भूमि से सुख मिलता है, शत्रु भाव में प्रभाव होता है।",
                english:
                    "Pursues a big business, maintains the business equally with father, gets great honour and respect from government and society, gets increased wealth, gains happiness from mother and land, possesses influence in the house of enemies",
            },
            11: {
                hindi: "आलसी होता है तथा आय भाव में कुछ कमी और कष्ट पाता है, पिता से संबंधित लाभ में कुछ कमजोरी का सामना करता है, संतान से कुछ बल प्राप्त करता है, दैनिक व्यवसाय में सम्मान पाता है, बहुत बातूनी होता है।",
                english:
                    "Is lazy and gets some deficiency and distress in the house ofincome, faces some weakness in the gains connected with father, acquires some strength of children, gets respect in diurnal occupation, is very talkative",
            },
            12: {
                hindi: "पिता के घर में हानि होती है, शरीर क्षीण होता है, बेचैन रहता है, भारी नुकसान उठाकर सरकार और समाज का संचालन करता है, मान-सम्मान और व्यापार में कमजोरी होती है, व्यय भाव में कमी होती है, अनाप-शनाप खर्च करता है, शत्रु भाव में प्रभाव रखता है।",
                english:
                    "Bears loss in father's house, gets an emaciated body, is restless, manages the government and society after bearing heavy losses, gets weakness in honour and business, has deficiency in the house of expenditure, spends irreverently, holds influence in the house of enemies",
            },
        },
        Venus: {
            1: {
                hindi: "लम्बे कद का, बहुत परिश्रमी और ऊर्जावान, आयु में वृद्धि, वैभवपूर्ण जीवन, पत्नी के घर में कुछ कमी, दैनिक व्यवसाय में कुछ कमी",
                english:
                    "Is oftall stature, is very diligent and energetic, gets an increased age, spends life majestically, bears some deficiency in wife's house, faces some deficiency in diurnal occupation",
            },
            2: {
                hindi: "भाई के सम्बन्ध में कुछ बंधन का सामना करना पड़ता है, जीवन की दिनचर्या में कुलीनता प्राप्त होती है, दीर्घायु होती है, विद्यमान धन में कुछ हानि होती है, बहुत कूटनीतिक युक्तियों से धन अर्जित होता है, धन में कुछ हानि होती है।",
                english:
                    "Faces some bondage in connection with brother, gets the aristocracy in the daily routine of life, gets a long age, bears some loss in existing wealth, acquires wealth through very diplomatic devices, bears some loss in wealth",
            },
            3: {
                hindi: "भाई-बहनों से कुछ कष्ट पाता है, जीवन की दिनचर्या पर बहुत गर्व करता है, अच्छी आयु प्राप्त करता है, धर्म को हानि पहुँचाता है, निडर और प्रभावशाली होता है।",
                english:
                    "Faces some troubles with brothers and sisters, possesses great pride in the daily routine oflife, gets good age, injures Dharma, is fearless and influential",
            },
            4: {
                hindi: "माता के घर में कुछ हानि होती है, भाई-बहनों से कुछ सुख मिलता है, दीर्घायु होता है, जीवन के दैनिक कार्यों का सुख प्राप्त होता है, सुख पाने में कठिनाई होती है, पिता से अप्रसन्न रहता है, विदेश में भी कुछ सुख मिलता है, बहुत चतुर और सम्माननीय होता है।",
                english:
                    "Bears some loss in the house of mother, gets some happiness from brothers and sisters, gets a long life, gets the pleasure of daily routine oflife, faces difficulties in finding happiness, remains unhappy with father, gets some happiness in foreign countries also, is very clever and honourable",
            },
            5: {
                hindi: "संतान पक्ष में कष्ट का सामना करना पड़ता है, जीवन की दिनचर्या में आनंद मिलता है, दीर्घायु होती है, भाई-बहनों से कुछ अभावों के साथ प्रेम मिलता है।",
                english:
                    "Faces distress in children's side, gets pleasure in the daily routine of life, gets a long age, loves brothers and sisters with some deficiency",
            },
            6: {
                hindi: "जीवन में बेचैनी महसूस होती है, भाइयों से विरोध मिलता है, जीवन में कुछ हद तक पराश्रितता रहती है, पेट के रोग होते हैं",
                english:
                    "Feels restlessness in his life, gets opposition from brothers, is somewhat dependent in life, gets stomach diseases",
            },
            7: {
                hindi: "परिवार और पत्नी के कारण जीवन की दिनचर्या में चिंताएं होती हैं, पत्नी पक्ष में कुछ नुकसान होता है, व्यवसाय के घर में बड़ी विपत्तियों और चिंताओं का सामना करना पड़ता है, भाई-बहनों की हानि होती है, दीर्घायु के घर में लाभ प्राप्त होता है, यौन सुखों में बहुत खुश नहीं होता है, गुप्त रूप से चतुर और साहसी होता है।",
                english:
                    "Gets worries in the daily routine of life on account of family and wife, bears some loss in wife's side, faces great calamities and worries in the house of occupation, bears the loss of brothers and sisters, acquires benefits in the house oflongevity, is not very happy in the sexual pleasures, is secretly clever and courageous",
            },
            8: {
                hindi: "आयु में वृद्धि होती है, दैनिक जीवन में बहुत सुख मिलता है, ऊर्जा की कुछ कमी होती है, भाई-बहनों का नुकसान होता है, धन प्राप्ति के लिए बहुत प्रयास करता है, कुछ दूरदर्शी होता है।",
                english:
                    "Gets increased age, gets great happiness in daily routine oflife, bears some loss of energy, bears loss of brothers and sisters, tries hard to acquire wealth, is somewhat farsighted",
            },
            9: {
                hindi: "भाग्य के द्वारा जीवन की दिनचर्या में बहुत आनंद प्राप्त होता है, यश में कुछ कमी आती है, बहुत चतुराई से काम करता है",
                english:
                    "Attains great joy in the daily routine oflife through the destiny, gets some deficiency in fame, works very cleverly",
            },
            10: {
                hindi: "पिता के घर में हानि सहता है, भाई का कुछ बल पाता है, आयु में शोभा पाता है, जीवन की दिनचर्या प्रभावशाली ढंग से व्यतीत करता है, सुख और भूमि की उन्नति के लिए प्रयत्नशील रहता है, कठिन कार्यों को चतुराई से करके सरकार और समाज में सम्मान पाता है, बहुत साहसी होता है।",
                english:
                    "Bears loss in the house offather, gets some strength of brother, gets elegance in age, spends daily routine of life influentially, tries hard for acquiring the progress of happiness and land, gets honour in government and society by doing very difficult tasks cleverly, is very courageous",
            },
            11: {
                hindi: "दीर्घायु होता है, भाई-बहनों से लाभ मिलता है, दैनिक जीवन का सुख मिलता है, संतान पक्ष में कष्ट होता है, शिक्षा में कुछ कमी होती है, आय में कुछ परेशानी होती है।",
                english:
                    "Gets a long life, gets the advantage from brothers and sisters, gets pleasure of daily routine of life, bears some agony in the children's side, has some deficiency in education, bears some uneasiness in the line of income",
            },
            12: {
                hindi: "जीवन में कुछ अशांति का सामना करता है, आयु में कुछ हानि उठाता है, भाई-बहनों से कुछ अशांति सहता है, अधिक व्यय करता है, जीविका का बल प्राप्त करता है, शत्रुओं और विपत्तियों पर विजय प्राप्त करता है",
                english:
                    "Faces some restlessness in life, bears some losses in age, suffers some restlessness from brothers and sisters, spends much, gets the strength of livelihood, wins the enemies and calamities",
            },
        },
        Saturn: {
            1: {
                hindi: "शारीरिक दृष्टि से दुर्बल, किन्तु बाहर से अच्छा दिखाई देता है, पिता से विरोध का सामना करता है, भाई से कुछ मित्रतापूर्ण तथा कुछ कमजोर सम्बन्ध रखता है, पत्नी के घर में हानि उठाता है, व्यवसाय में कठोर परिश्रम करता है, सरकार तथा समाज में कुछ बाधाएँ पाता है।",
                english:
                    "Is physically weak internally but appears to be good from the outside, faces opposition from father, has some friendly and some weak relation with the brother, bears losses in the house ofwife, labours hard in occupation, finds some hindrance in the government and society",
            },
            2: {
                hindi: "धन संचय में कमजोरी का अनुभव करता है, धन के घर में भारी नुकसान उठाता है, माता के घर में कुछ नुकसान उठाता है, दैनिक व्यवसाय और जीवन की दिनचर्या में आनंद पाता है, परिवार के घर में कुछ कमी होती है",
                english:
                    "Experiences weakness in accumulation ofwealth, bears heavy loss in the house ofwealth, bears some loss in mother's house, finds joy in the diurnal occupation and routine of life, has some deficiency in the house of family",
            },
            3: {
                hindi: "बहुत ऊर्जावान, आय से अधिक खर्च करने वाला, भाई के कारण हानि उठाने वाला, शिक्षा में कुछ कमी वाला, संतान पक्ष में हानि उठाने वाला, धर्म घर में कुछ हानि उठाने वाला, यश में कमी वाला, शारीरिक बल में कुछ कमजोरी वाला होता है।",
                english:
                    "Is very energetic, spends more than he earns, bears some loss through brother, has some deficiency in education, bears loss in the side of children, bears some loss in the house ofDharma, has deficiency in fame, has some weakness in his physical strength",
            },
            4: {
                hindi: "हानि और लाभ दोनों पाता है, व्यय को संतुलित रखता है, निवास में कुछ कमजोरी होती है, शत्रुओं के घर में प्रभाव रखता है, भूमि की हानि उठाता है, और साहसी होता है",
                english:
                    "Gets both losses and gains, balances the expenditure, has some weakness in residence, holds influence in the enemies' house, bears loss of land, and is courageous",
            },
            5: {
                hindi: "संतान पक्ष में हानि, विद्या भाव में कुछ हानि और कुछ लाभ, संचित धन भाव में कमजोरी, परिवार में अलगाव, व्यवसाय में कुछ हानि और लाभ, पत्नी भाव में कुछ हानि और लाभ, स्वार्थी बातें करने वाला",
                english:
                    "Loss in the side of children, gets some loss and some gain in the house of education, faces weakness in the house of accumulated wealth, bears separation in the family, gets some loss and gain in occupation, gets some loss and benefit in the house of wife, and talks selfishly",
            },
            6: {
                hindi: "खर्च और लाभ की प्रबलता, साहसपूर्वक मामलों का प्रबंधन, दैनिक व्यवसाय और जीवन की दिनचर्या में प्रभाव बनाए रखना, शत्रुओं पर प्रभाव बनाना, भाई के साथ कमजोर संबंध",
                english:
                    "Gets the strength of expenses and gains, manages the affairs courageously, maintains influence in diurnal occupation and routine of life, creates influence on enemies, has a weak connection with brother",
            },
            7: {
                hindi: "व्यय भाव में कुछ हानि और लाभ होता है, धर्म भाव में चिंता होती है, आय और व्यय के कारण सुख में कुछ कमी होती है।",
                english:
                    "Bears some losses and gains in the house ofexpenditure, faces anxiety in the house ofDharma, has some deficiency in happiness on account of income and expenditure",
            },
            8: {
                hindi: "सुखपूर्वक जीवन व्यतीत करता है, आय को सम्मानपूर्वक खर्च करता है, दीर्घायु होता है, धन संचय में कुछ कमजोरी होती है, पिता से कुछ शत्रुता रहती है, संतान की ओर से कुछ हानि-लाभ होता है।",
                english:
                    "Spends life happily, spends income in a dignified way, gets a long life, has some weakness in accumulating wealth, faces some enmity with father, bears some losses and gains from the side of children",
            },
            9: {
                hindi: "भाग्य से भारी आय प्राप्त करता है, कठोर परिश्रम करता है, शत्रुओं पर बहुत प्रभाव रखता है, तथा स्वार्थी होता है।",
                english:
                    "Gets heavy income due to destiny, labours hard, holds great influence over enemies, and is selfish",
            },
            10: {
                hindi: "पिता के भाव में हानि, अधिक व्यय, अत्यधिक व्यय से जूझना, सरकार और समाज से संबंध कमजोर, व्यापार व्यवसाय में हानि, सुख, माता और पत्नी के भाव में कुछ हानि और लाभ, दैनिक व्यवसाय में साधारण सफलता",
                english:
                    "Gets losses in the house of father, spends much, has to deal with excessive expenditure, gets weakness in connection with government and society, bears loss in business occupation, gets some losses and gains in the house of happiness, mother and wife, gets ordinary success in diurnal occupation",
            },
            11: {
                hindi: "धन संबंधी प्रचुर लाभ, दैनिक जीवन के घर में अपार सुख, आय-व्यय में कुछ उलझन, संतान के घर में चिंता, शिक्षा में कुछ कमजोरी, स्वार्थी",
                english:
                    "Gets huge monetary gains, experiences great happiness in the house of daily routine of life, has some perplexity in income and expenditure, gets worries in the house ofchildren, has some weakness in education, is selfish",
            },
            12: {
                hindi: "आय से अधिक खर्च करता है, धन के सम्बन्ध में कमजोर होता है, परिवार में अशांति रहती है, भाग्य को लेकर चिन्तित रहता है, शत्रुओं के घर पर प्रभाव रखता है, कठिनाइयों पर विजय प्राप्त करता है, दूसरों के लिए अच्छा सोचता है।",
                english:
                    "Spends much more than he earns, has weakness in connection with wealth, gets restless in family, remains anxious about destiny, maintains influence over the house of enemies, gets victory over difficulties, thinks good for others",
            },
        },
        Rahu: {
            1: {
                hindi: "शारीरिक चिंताएं महसूस करता है और कुछ शारीरिक कमी का अनुभव करता है, कभी-कभी शरीर पर चोट का अनुभव करता है, अपने काम को बहुत चतुराई और सावधानी से करता है, बहुत मेहनत वाले काम करता है, गुप्त रणनीति का पालन करता है",
                english:
                    "Feels physical anxieties and experiences some physical deficiency, sometimes experiences blows on the body, gets his work done very cleverly and cautiously, does very laborious deeds, follows secret tactics",
            },
            2: {
                hindi: "धन की हानि सहता है, परिवार में हानि और संकट का सामना करता है, बहुत संघर्ष और जोखिम उठाकर प्रगति प्राप्त करता है, धन के लिए गुप्त शक्ति का प्रयोग करता है और कठिन परिश्रम करता है",
                english:
                    "Bears loss in wealth, faces loss and distress in the family, secures progress after struggling very hard and bearing risks, uses secret power for wealth and labours hard",
            },
            3: {
                hindi: "अपने ऊर्जावान कार्यों में सफलता प्राप्त करता है, कठोर परिश्रम करता है, भाइयों के घर में कुछ चिंतित रहता है, कुछ अनुचित युक्तियों का पालन करता है, बहुत चतुर और लापरवाह होता है",
                english:
                    "Gets success in his energetic deeds, labours hard, gets somewhat worried in brothers' house, follows some unjust devices, is very clever and carefree",
            },
            4: {
                hindi: "सुख प्राप्ति हेतु विपत्तियों का सामना करता है, भवन का स्वामी होता है, माता के घर में घमंड का अनुभव करता है, वास्तविक स्थान में बाधा पाता है।",
                english:
                    "Faces calamities to get happiness, owns buildings, experiences vanity in the house of mother, gets hindrance in the real place",
            },
            5: {
                hindi: "संतान पक्ष में विपत्तियों का सामना करता है, शिक्षा के घर में कमी होती है, मानसिक और बौद्धिक रूप से चिंतित रहता है, अपनी बुद्धि और इच्छाशक्ति से कठिन समस्याओं का समाधान कर लेता है।",
                english:
                    "Faces calamities in the side of children, has deficiency in the house ofeducation, is mentally and intellectually worried, solves very hard problems through his wisdom and will-power",
            },
            6: {
                hindi: "शत्रुओं के घर से कष्ट पाकर अपने शत्रुओं का नाश करता है, कठिनाइयों और विपत्तियों में बहुत परिश्रम, चतुराई और धैर्य से काम लेकर विजय प्राप्त करता है, रोगों की परवाह नहीं करता, बहुत स्वार्थी और साहसी होता है।",
                english:
                    "Gets perplexity from the house of enemies and ruins his foes, gets victory by working very hard, cleverly and patiently in the difficulties and calamities, does not care about diseases, is very selfish and courageous",
            },
            7: {
                hindi: "व्यवसाय की उन्नति के लिए बहुत कठिन परिश्रम करता है, पत्नी के घर में कुछ परेशानियों का सामना करता है, परिवार में कुछ चिंताओं को झेलने के बाद सुख में स्थिरता प्राप्त करता है, कभी-कभी दैनिक व्यवसाय के क्षेत्र में बहुत गंभीर विपत्तियों का सामना करता है, यौन सुख के बारे में एक अजीब रुचि रखता है, हालांकि इस क्षेत्र में कुछ कमी पाता है।",
                english:
                    "Labours very hard for the progress ofoccupation, faces some troubles in wife's house, gets stability in happiness after bearing some worries in the family, sometimes faces very deep calamities in the line of diurnal occupation, has a peculiar taste about sexual pleasures though finds some deficiency in this area",
            },
            8: {
                hindi: "जीवन की दिनचर्या में चिन्तित, पेट के नीचे कुछ रोग हो जाते हैं, अनेक कष्ट सहकर जीवन की दिनचर्या में दृढ़ता प्राप्त होती है, दीर्घायु के घर में घातक आघात होते हैं, विदेश जाने में बाधा आती है।",
                english:
                    "Worried in the daily routine of life, gets some diseases below the stomach, gains firmness in daily routine of life after bearing numerous difficulties, gets fatal blows in the house oflongevity, finds hindrance in going to foreign countries",
            },
            9: {
                hindi: "भाग्य भाव में बाधा आती है, धर्म भाव में हानि होती है, भाग्य भाव में अचानक आघात होता है, स्त्री में कमी होती है।",
                english:
                    "Bears hindrances in the house of destiny, incurs loss in the house ofDharma, feces sudden blows in the house offate, has deficiency in feme",
            },
            10: {
                hindi: "पिता के घर में हानि, समाज और सरकार के मामलों में हानि और बेचैनी, पतन के मार्ग पर चलना, मान-प्रतिष्ठा के घर में आघात सहना।",
                english:
                    "Bears loss in the house offather, bears loss and restlessness in the affairs of society and government, follows the path ofdeterioration, faces blows in the house ofhonour and prestige",
            },
            11: {
                hindi: "अपनी क्षमता से अधिक लाभ पाने का प्रयास करता है, सदैव अधिक धन प्राप्त करता है, अनाप-शनाप धन पाने की इच्छा रखता है, लाभ भाव में कुछ चिंता रहती है, लाभ की परवाह नहीं करता",
                english:
                    "Tries to get profits more than his capacity, always gets more wealth, wants to get gratuitous wealth, has some worry in the house of gains, does not care for the benefits",
            },
            12: {
                hindi: "बहुत अधिक खर्च करता है, व्यय भाव में उलझन महसूस करता है, व्यवसाय के अन्य लोगों की मदद से गुप्त उपकरणों के माध्यम से बहुत चतुराई से अपना काम करवाता है, व्यय भाव में घबराहट महसूस करता है।",
                english:
                    "Spends too much, finds perplexity in the house ofexpenditure, gets his work done very cleverly through secret devices with the help of other people in the line of occupation, feels nervousness in the house of expenditure",
            },
        },
        Ketu: {
            1: {
                hindi: "अपने शरीर पर घातक प्रहार सहता है और कुछ कठिनाइयों से गुजरता है, शारीरिक सुंदरता में भी कुछ कमी का सामना करता है, बंधन और निर्भरता का अनुभव करता है, अपनी शक्ति का गुप्त रूप से उपयोग करता है",
                english:
                    "Bears fatal blows on his body and passes through some clangers, also faces some deficiency in the handsomeness of physique, experiences bondage and dependence, uses his strength secretly",
            },
            2: {
                hindi: "धन के मामले में बड़ी कठिनाई झेलता है, धन की कमी के कारण बहुत कष्ट सहता है, घर-परिवार में क्लेश झेलता है, धन वृद्धि के लिए बहुत परिश्रम करता है तथा प्रयत्नशील रहता है, कुछ हद तक बेचैन रहता है।",
                english:
                    "Bears great difficulty in the side ofwealth, bears severe pain due to the deficiency of the wealth, bears distress in the house of family, labours very hard and tries his best to get an increase the wealth, is somewhat restless",
            },
            3: {
                hindi: "बहुत साहसी और कठिन परिश्रम करने वाला, भाई के घर में बेचैन रहने वाला, बहुत शारीरिक शक्ति वाला, बहुत साहसी, गंभीर विपत्तियों का सामना करने वाला, बहुत धैर्य से काम करने वाला, किसी भी काम को असंभव नहीं मानने वाला।",
                english:
                    "Is very bold and labours very hard, is restless in the house ofbrother, possesses great physical strength, possesses great courage, faces some severe calamities, works very patiently, does not consider anything impossible",
            },
            4: {
                hindi: "माता का वियोग और वियोग सहता है, सुख और घर के स्थान में भारी कमी होती है, छोटे घर में रहता है, पड़ोसियों और सहकर्मियों से परेशान रहता है, निम्न वर्ग के लोगों से सम्पर्क में रहता है, भवन और संपत्ति की हानि सहता है, सुख पाने के लिए गुप्त शक्तियों का प्रयोग करता है।",
                english:
                    "Bears the loss ofmother and separation from her, has severe deficiency in the place of happiness and home, lives in a small house, feels troubled by the neighbours and colleagues gets the contact of, low-class people, bears loss of buildings and property, uses secret powers to get happiness",
            },
            5: {
                hindi: "संतान पक्ष में घोर विपत्ति झेलता है, शिक्षा में कमी पाता है, छोटी उम्र से ही मानसिक चिंताओं का सामना करता है और अंत में बड़ी बाधाओं और रुकावटों को पार करने के बाद शिक्षा के विषय में कुछ स्थिर शक्ति प्राप्त करता है, दूसरों को अपने विचार समझाने में असमर्थ होता है।",
                english:
                    "Bears severe calamity in the side of children, gets deficiency in education, faces mental anxieties from young age and in the end gets some stable power about education after going through great hindrances and obstacles, is unable to make others understand his ideas",
            },
            6: {
                hindi: "शत्रुओं के घर को बर्बाद करने वाला, बहुत परिश्रम करने वाला, बहुत धैर्य और साहस से काम करने वाला, यद्यपि शत्रुओं और विरोधियों द्वारा प्रायः परेशान किया जाता है, संकटों और कठिनाइयों पर विजय प्राप्त करने वाला, गुप्त शक्तियों वाला, स्वार्थी और हठी होता है।",
                english:
                    "Ruins the house ofenemies, labours very hard, works very patiendy and courageously though is often disturbed by the enemies and opponents, gets victory over troubles and difficulties, possesses secret strength, is selfish and obstinate",
            },
            7: {
                hindi: "पत्नी के घर में कुछ बेचैनी रहती है, विशेष यौन सुख मिलता है, दैनिक कार्य में बहुत मेहनत करता है, कार्य में आंतरिक स्थिरता प्राप्त होती है।",
                english:
                    "Some restlessness in the house ofwife, gets special sexual pleasures, labours very hard in diurnal occupation, gets an internal stability in the occupation",
            },
            8: {
                hindi: "दैनिक जीवन में कुछ बेचैनी, पेट की बीमारियाँ, उम्र के कारण चोट लगना, स्थिर सिद्धांतों का पालन करना, तथा हठी होना।",
                english:
                    "Some restlessness in the daily routine oflife, gets stomach disorders, experiences blows in connection with age, follows stable principles, and is obstinate",
            },
            9: {
                hindi: "भाग्य भाव में घोर चिंता, धर्म भाव में हानि, आय व भाग्य वृद्धि के लिए कठोर परिश्रम, गुप्त उपायों से उन्नति, यश में कमी, ईश्वर पर विश्वास में कमी, तथा कुछ हद तक बेचैनी।",
                english:
                    "Faces severe anxiety in the house of destiny, bears loss in the house of Dharma, works very hard for the rise of income and fortune, progresses with secret devices, gets deficiency in fame, has deficiency in the reliance on God, and is somewhat restless",
            },
            10: {
                hindi: "राजकार्य और समाज में बहुत परिश्रम के बाद उन्नति प्राप्त करता है, पिता के घर में अच्छा नहीं रहता, निर्भयता और बिना किसी संकोच के काम करता है, गुप्त शक्तियों से बड़े-बड़े काम करता है, मान-सम्मान, प्रतिष्ठा और व्यवसाय में उन्नति पाने के लिए बहुत परिश्रम करता है, पिता का विरोध करता है।",
                english:
                    "Gets the progress in the affairs of government and society after labouring very hard, is not good in the father's house, works fearlessly and without reserve, does grand deeds through secret powers, labours very hard to acquire the progress in honour, prestige and occupation, opposes the father",
            },
            11: {
                hindi: "धन प्राप्ति के लिए बहुत प्रयास करता है, अधिक धन प्राप्त करता है, धन प्राप्ति के लिए साहसपूर्वक कार्य करता है, गुप्त शक्ति से बहुत कुछ प्राप्त करता है, आय प्राप्ति में कुछ परेशानियों का सामना करता है तथा उस दिशा में कमी महसूस करता है।",
                english:
                    "Tries very hard for getting wealth, gets more wealth, works courageously for acquiring wealth, gains much through secret strength, faces some troubles in getting income and feels deficiency in that direction",
            },
            12: {
                hindi: "व्यय भाव में कुछ परेशानी का सामना करना पड़ता है, बहुत मेहनत के बाद खर्च का प्रबंधन करता है और कुछ गंभीर परेशानियों का सामना करता है, गुप्त शक्ति के कारण सफल होता है",
                english:
                    "Faces some trouble in the house ofexpenditure, manages expenditure after labouring very hard and faces some severe troubles, succeeds due to secret strength",
            },
        },
    },
};
