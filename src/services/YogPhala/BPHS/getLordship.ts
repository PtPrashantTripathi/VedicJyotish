import { HouseDetails, type HouseNumber } from "src/services/constants/Houses";
import type { Planet, PlanetEn } from "src/services/constants/Planet";
import { RasiDetails } from "src/services/constants/Rasi";
import type { Translation } from "src/services/types";
import { reorderArray } from "src/services/utils";
import type { Phala } from "src/services/YogPhala";

/**
 * Get the BPHS (Brihat Parashara Hora Shastra) phala for each house lord's
 * placement in the horoscope.
 */
export function getBPHSLordshipYogPhala(
    planetPositions: Record<PlanetEn, Planet>
): Phala[] {
    // Determine the sequence of Rashis starting from the Ascendant
    const reorderedRashiNames = reorderArray(
        Object.values(RasiDetails).map(rasi => rasi.name.english),
        planetPositions.Ascendant.rasi.name.english
    );

    // Get the house number where the lord of a given house is placed
    const getLordHouseNumber = (houseNumber: HouseNumber): HouseNumber => {
        const rashiNameForHouse = reorderedRashiNames[houseNumber - 1];
        const lordPlanetKey = RasiDetails[rashiNameForHouse].lord;
        return planetPositions[lordPlanetKey].house.num;
    };

    return Array.from({ length: 12 }, (_, index) => {
        const currentHouseNumber = (index + 1) as HouseNumber;
        const rashiNameForCurrentHouse = reorderedRashiNames[index];
        const lordPlacementHouseNumber = getLordHouseNumber(currentHouseNumber);

        return {
            description: {
                english: `Lord of ${HouseDetails[currentHouseNumber].name.english} House (${rashiNameForCurrentHouse}) in ${HouseDetails[lordPlacementHouseNumber].name.english} House`,
                hindi: `${HouseDetails[currentHouseNumber].name.hindi} भाव का स्वामी (${rashiNameForCurrentHouse}) ${HouseDetails[lordPlacementHouseNumber].name.hindi} भाव में`,
            },
            effect: HouseLordPositionEffect[currentHouseNumber][
                lordPlacementHouseNumber
            ],
        };
    });
}

export const HouseLordPositionEffect: Record<
    HouseNumber,
    Record<HouseNumber, Translation<string, string>>
> = {
    1: {
        1: {
            english:
                "The native will be endowed with physical happiness and prowess. He will be intelligent, fickle-minded, will have two wives and will unite with other females.",
            hindi: "जातक शारीरिक सुख एवं पराक्रम से संपन्न होगा। वह बुद्धिमान, चंचल स्वभाव वाला, दो पत्नियां वाला तथा अन्य स्त्रियों से संबंध रखने वाला होगा।",
        },
        2: {
            english:
                "the native will be gainful, scholarly, happy, endowed with good qualities, be religious, honourable and will have many wives.",
            hindi: "जातक लाभ कमाने वाला, विद्वान, सुखी, अच्छे गुणों से युक्त, धार्मिक, सम्माननीय और अनेक पत्नियां वाला होगा।",
        },
        3: {
            english:
                "The native will equal a lion in valour, be endowed with all kinds of wealth, be honourable, will have two wives, be intelligent and happy.",
            hindi: "जातक वीरता में सिंह के समान होगा, सभी प्रकार के धन से संपन्न होगा, सम्माननीय होगा, दो पत्नियां होंगी, बुद्धिमान और सुखी होगा।",
        },
        4: {
            english:
                "The native will be endowed with paternal and maternal happiness, will have many brothers, be lustful, virtuous and charming.",
            hindi: "जातक पितृ एवं मातृ सुख से संपन्न होगा, उसके कई भाई होंगे, वह कामुक, गुणवान एवं आकर्षक होगा।",
        },
        5: {
            english:
                "The native will have mediocre progenic happiness, will lose his first child, be honourable, given to anger and be dear to king.",
            hindi: "जातक को संतान सुख सामान्य रहेगा, प्रथम संतान की मृत्यु होगी, वह सम्माननीय, क्रोधी तथा राजा का प्रिय होगा।",
        },
        6: {
            english:
                "If Ascendants Lord is related to a malefic the native will be devoid of physical happiness and will be troubled by enemies, if there is no benefic aspect.",
            hindi: "यदि लग्नेश का संबंध पाप ग्रह से हो तो जातक भौतिक सुख से वंचित रहेगा तथा यदि शुभ दृष्टि न हो तो शत्रुओं से परेशान रहेगा।",
        },
        7: {
            english:
                "The natives wife will not live (long). If the planet in question is a benefic, one will wander aimlessly, face penury and be dejected. He will alternatively become a king (if the said planet is strong).",
            hindi: "जातक की पत्नी (दीर्घायु) नहीं होगी। यदि संबंधित ग्रह शुभ हो, तो जातक लक्ष्यहीन भटकेगा, दरिद्रता का सामना करेगा और निराश रहेगा। इसके विपरीत, वह राजा भी बन सकता है (यदि उक्त ग्रह बलवान हो)।",
        },
        8: {
            english:
                "The native will be an accomplished scholar, be sickly, thievish, be given to much anger, be a gambler and will join others wives.",
            hindi: "जातक विद्वान, रोगी, चोर, क्रोधी, जुआरी तथा अन्य स्त्रियों से युक्त होगा।",
        },
        9: {
            english:
                "The native will be fortunate, dear to people, be a devotee of Sri Vishnu, be skilful, eloquent in speech and be endowed with wife, sons and wealth.",
            hindi: "जातक भाग्यशाली, लोगों का प्रिय, श्री विष्णु का भक्त, कुशल, वाकपटु, स्त्री, पुत्र और धन से संपन्न होगा।",
        },
        10: {
            english:
                "The native will be endowed with paternal happiness, royal honour, fame among men and will doubtlessly have self-earned wealth.",
            hindi: "जातक को पितृ सुख, राजसी सम्मान, लोगों के बीच प्रसिद्धि मिलेगी और निस्संदेह उसके पास स्वयं अर्जित धन होगा।",
        },
        11: {
            english:
                "The native will always be endowed with gains, good qualities, fame and many wives.",
            hindi: "जातक सदैव लाभ, अच्छे गुण, प्रसिद्धि और कई पत्नियों से संपन्न होगा।",
        },
        12: {
            english:
                "If Ascendants Lord is devoid of benefic aspect and/or conjunction, the native will be bereft of physical happiness, will spend unfruitfully and be given to much anger.",
            hindi: "यदि लग्न स्वामी शुभ दृष्टि और/या युति से रहित हो तो जातक भौतिक सुख से वंचित रहेगा, निष्फल व्यय करेगा और अत्यधिक क्रोधी होगा।",
        },
    },
    2: {
        1: {
            english:
                "The native will be endowed with sons and wealth, be inimical to his family, lustful, hard-hearted and will do others jobs.",
            hindi: "जातक पुत्र और धन से युक्त, अपने परिवार से द्वेष रखने वाला, कामी, कठोर हृदय वाला तथा दूसरों की नौकरी करने वाला होगा।",
        },
        2: {
            english:
                "The native will be wealthy, proud, will have two, or more wives and be bereft of progeny.",
            hindi: "जातक धनवान, स्वाभिमानी, दो या अधिक पत्नियां रखने वाला तथा संतानहीन होगा।",
        },
        3: {
            english:
                "The native will be valorous, wise, virtuous, lustful and miserly; all these, when related to a benefic. If related to a malefic, the native will be a heterodox.",
            hindi: "यदि शुभ ग्रह से संबंध हो तो जातक वीर, बुद्धिमान, गुणी, कामी और कंजूस होगा। यदि अशुभ ग्रह से संबंध हो तो जातक विधर्मी होगा।",
        },
        4: {
            english:
                "The native will acquire all kinds of wealth. If the second Lord is exalted and is in conjunction with Jupiter, one will be equal to a king.",
            hindi: "जातक को सभी प्रकार की संपत्ति प्राप्त होती है। यदि द्वितीयेश उच्च का हो और बृहस्पति के साथ युति में हो तो जातक राजा के समान होता है।",
        },
        5: {
            english:
                "The native will be wealthy. Not only the native, but also his sons will be intent on earning wealth.",
            hindi: "जातक धनवान होगा। न केवल जातक, बल्कि उसके पुत्र भी धन कमाने के इच्छुक होंगे।",
        },
        6: {
            english:
                "If the second Lord is along with a benefic, the native will gain wealth through his enemies; if the Lord is in conjunction with a malefic, there will be loss through enemies apart from mutilation of shanks.",
            hindi: "यदि द्वितीयेश शुभ ग्रह के साथ हो तो जातक को अपने शत्रुओं के माध्यम से धन लाभ होगा; यदि द्वितीयेश अशुभ ग्रह के साथ हो तो जातक को शत्रुओं के माध्यम से हानि होगी, तथा टांगों में विकृति भी होगी।",
        },
        7: {
            english:
                "The native will be addicted to others wives and he will be a doctor. If a malefic is related to the said placement by conjunction with the second Lord, or by aspect, the natives wife will be of questionable character.",
            hindi: "जातक दूसरों की पत्नियों का आदी होगा और वह डॉक्टर होगा। यदि कोई पाप ग्रह द्वितीयेश के साथ युति या दृष्टि द्वारा उक्त स्थान से संबंधित हो, तो जातक की पत्नी संदिग्ध चरित्र वाली होगी।",
        },
        8: {
            english:
                "The native will be endowed with abundant land and wealth. But he will have limited marital felicity and be bereft of happiness from his elder brother.",
            hindi: "जातक के पास प्रचुर भूमि और धन होगा, लेकिन वैवाहिक सुख सीमित होगा और बड़े भाई से सुख नहीं मिलेगा।",
        },
        9: {
            english:
                "The native will be wealthy, diligent, skilful, sick during childhood and will later on be happy and will visit shrines, observing religious code etc.",
            hindi: "जातक धनवान, परिश्रमी, कुशल, बचपन में बीमार तथा बाद में सुखी होगा, तीर्थस्थानों पर जाएगा, धार्मिक नियमों का पालन करेगा आदि।",
        },
        10: {
            english:
                "The native will be libidinous, honourable and learned; he will have many wives and much wealth, but he will be bereft of filial happiness.",
            hindi: "जातक कामुक, सम्माननीय और विद्वान होगा; उसकी कई पत्नियां और बहुत धन होगा, लेकिन वह पुत्र सुख से वंचित रहेगा।",
        },
        11: {
            english:
                "The native will have all kinds of wealth, be ever diligent, honourable and famous.",
            hindi: "जातक के पास सभी प्रकार की संपत्ति होगी, वह सदैव परिश्रमी, सम्माननीय और प्रसिद्ध होगा।",
        },
        12: {
            english:
                "The native will be adventurous, be devoid of wealth and be interested in others wealth, while his eldest child will not keep him happy.",
            hindi: "जातक साहसी, धनहीन और दूसरों के धन में रुचि रखने वाला होगा, जबकि उसकी सबसे बड़ी संतान उसे खुश नहीं रख पाएगी।",
        },
    },
    3: {
        1: {
            english:
                "The native will have self-made wealth, be disposed to worship, be valorous and be intelligent, although devoid of learning.",
            hindi: "जातक स्वयं द्वारा अर्जित धनवान, पूजा-पाठ में रुचि रखने वाला, वीर और बुद्धिमान होगा, यद्यपि विद्या से रहित होगा।",
        },
        2: {
            english:
                "The native will be corpulent, devoid of valour, will not make much efforts, be not happy and will have an eye on others wives and others wealth.",
            hindi: "जातक मोटा, पराक्रम से रहित, अधिक प्रयास न करने वाला, सुखी न रहने वाला, दूसरों की पत्नी और दूसरों के धन पर नजर रखने वाला होगा।",
        },
        3: {
            english:
                "The native will be endowed with happiness through co-born and will have wealth and sons, be cheerful and extremely happy.",
            hindi: "जातक को सहजन्य सुख प्राप्त होगा, धन-संपत्ति और पुत्र होंगे, वह प्रसन्नचित्त और अत्यंत प्रसन्न रहेगा।",
        },
        4: {
            english:
                "The native will be happy, wealthy and intelligent, but will acquire a wicked spouse.",
            hindi: "जातक सुखी, धनवान और बुद्धिमान होगा, लेकिन उसे दुष्ट जीवनसाथी मिलेगा।",
        },
        5: {
            english:
                "The native will have sons and be virtuous. If in the process the 3rd Lord be in conjunction with, or receives an aspect from a malefic, the native will have a formidable wife.",
            hindi: "जातक पुत्रवान और गुणवान होगा। यदि तृतीयेश किसी पाप ग्रह से युति या दृष्टि संबंध में हो, तो जातक की पत्नी बहुत शक्तिशाली होगी।",
        },
        6: {
            english:
                "The native will be inimical to his co-born, be affluent, will not be well disposed to his maternal uncle and be dear to his maternal aunt.",
            hindi: "जातक अपने सहजन्म से शत्रुतापूर्ण, धनवान, मामा से अरुचिकर तथा मामी का प्रिय होगा।",
        },
        7: {
            english:
                "The native will be interested in serving the king. He will not be happy during boyhood, but the end of his life he will be happy.",
            hindi: "जातक राजा की सेवा में रुचि रखेगा। वह बचपन में तो सुखी नहीं रहेगा, लेकिन जीवन के अंत में सुखी रहेगा।",
        },
        8: {
            english:
                "The native will be a thief, will derive his livelihood serving others and will die at the gate of the royal palace.",
            hindi: "जातक चोर होगा, दूसरों की सेवा करके अपनी आजीविका चलाएगा तथा राजमहल के द्वार पर ही उसकी मृत्यु होगी।",
        },
        9: {
            english:
                "The native will lack paternal bliss, will make fortunes through wife and will enjoy progenic and other pleasures.",
            hindi: "जातक को पैतृक सुख की कमी होगी, पत्नी के माध्यम से भाग्य बनाएगा और संतान और अन्य सुखों का आनंद लेगा।",
        },
        10: {
            english:
                "The native will have all lands of happiness and self-made wealth and be interested in nurturing wicked females.",
            hindi: "जातक को सुख-समृद्धि, स्व-निर्मित धन-संपत्ति प्राप्त होगी तथा दुष्ट स्त्रियों के पालन-पोषण में उसकी रुचि होगी।",
        },
        11: {
            english:
                "The native will always gain in trading, be intelligent, although not literate, be adventurous and will serve others.",
            hindi: "जातक को व्यापार में सदैव लाभ होगा, वह बुद्धिमान होगा, यद्यपि साक्षर नहीं होगा, साहसी होगा तथा दूसरों की सेवा करेगा।",
        },
        12: {
            english:
                "The native will spend on evil deeds, will have a wicked father and will be fortunate through a female.",
            hindi: "जातक बुरे कार्यों में खर्च करेगा, उसका पिता दुष्ट होगा तथा स्त्री के माध्यम से उसे सौभाग्य की प्राप्ति होगी।",
        },
    },
    4: {
        1: {
            english:
                "The native will be endowed with learning, virtues, ornaments, lands, conveyances and maternal happiness.",
            hindi: "जातक विद्या, गुण, आभूषण, भूमि, वाहन और मातृ सुख से संपन्न होगा।",
        },
        2: {
            english:
                "The native will enjoy pleasures, all kinds of wealth, family life and honour and be adventurous. He will be cunning in disposition.",
            hindi: "जातक सुख-सुविधाओं, सभी प्रकार के धन, पारिवारिक जीवन और सम्मान का आनंद लेगा तथा साहसी होगा। वह स्वभाव से चालाक होगा।",
        },
        3: {
            english:
                "The native will be valorous, will have servants, be liberal, virtuous and charitable and will possess self-earned wealth. He will be free from diseases.",
            hindi: "जातक पराक्रमी, सेवकों वाला, उदार, गुणवान, दानशील होगा तथा स्वअर्जित धन से युक्त होगा। वह रोगों से मुक्त होगा।",
        },
        4: {
            english:
                "The native will be a minister and will possess all kinds of wealth. He will be skilful, virtuous, honourable, learned, happy and be well disposed to his spouse.",
            hindi: "जातक मंत्री होगा और सभी प्रकार की सम्पत्ति से संपन्न होगा। वह कुशल, गुणी, सम्माननीय, विद्वान, सुखी और जीवनसाथी के प्रति अच्छा व्यवहार रखने वाला होगा।",
        },
        5: {
            english:
                "The native will be happy and be liked by all. He will be devoted to Sri Vishnu, be virtuous, honourable and will have self-earned wealth.",
            hindi: "जातक सुखी और सभी का प्रिय होगा। वह श्री विष्णु का भक्त, गुणवान, सम्माननीय और स्व-अर्जित धनवान होगा।",
        },
        6: {
            english:
                "The native will be devoid of maternal happiness, be given to anger, be a thief and a conjurer, be independent in action and be indisposed.",
            hindi: "जातक मातृ सुख से रहित, क्रोधी, चोर, जादूगर, स्वतंत्र कर्म करने वाला तथा अस्वस्थ होगा।",
        },
        7: {
            english:
                "The native will be endowed with a high degree of education, will sacrifice his patrimony and be akin to the dumb in an assembly.",
            hindi: "जातक उच्च शिक्षा प्राप्त करेगा, अपनी पैतृक सम्पत्ति का त्याग करेगा तथा सभा में गूंगे के समान होगा।",
        },
        8: {
            english:
                "The native will be devoid of domestic and other comforts, will not enjoy much parental happiness and be equal to a neuter.",
            hindi: "जातक घरेलू एवं अन्य सुखों से वंचित रहेगा, माता-पिता का सुख नहीं प्राप्त करेगा तथा नपुंसक समान होगा।",
        },
        9: {
            english:
                "The native will be dear to one and all, be devoted to God, be virtuous, honourable and endowed with every land of happiness.",
            hindi: "जातक सभी का प्रिय, ईश्वर भक्त, गुणवान, सम्माननीय तथा सुख की सभी वस्तुओं से संपन्न होगा।",
        },
        10: {
            english:
                "The native will enjoy royal honours, be an alchemist, be extremely pleased, will enjoy pleasures and will conquer his five senses.",
            hindi: "जातक राजकीय सम्मान का आनंद उठाएगा, रसायनशास्त्री होगा, अत्यंत प्रसन्न रहेगा, सुखों का आनंद लेगा तथा अपनी पांचों इंद्रियों पर विजय प्राप्त करेगा।",
        },
        11: {
            english:
                "The native will have fear of secret disease, he will be liberal, virtuous, charitable and helpful to others.",
            hindi: "जातक को गुप्त रोग का भय रहेगा, वह उदार, गुणी, दानशील एवं दूसरों की सहायता करने वाला होगा।",
        },
        12: {
            english:
                "The native will be devoid of domestic and other comforts, will have vices and be foolish and indolent.",
            hindi: "जातक घरेलू एवं अन्य सुख-सुविधाओं से रहित होगा, दुर्गुणों से युक्त होगा, मूर्ख एवं आलसी होगा।",
        },
    },
    5: {
        1: {
            english:
                "The native will be scholarly, be endowed with progenic happiness, be a miser, be crooked and will steal others wealth.",
            hindi: "जातक विद्वान, संतान सुख से संपन्न, कंजूस, कुटिल और दूसरों का धन चुराने वाला होगा।",
        },
        2: {
            english:
                "The native will have many sons and wealth, be a pater familias, be honourable, be attached to his spouse and be famous in the world.",
            hindi: "जातक अनेक पुत्रों और धनवान होगा, कुलपिता होगा, सम्माननीय होगा, जीवनसाथी से लगाव रखेगा और संसार में प्रसिद्ध होगा।",
        },
        3: {
            english:
                "The native will be attached to his co-born, be a tale bearer and a miser and be always interested in his own work.",
            hindi: "जातक अपने सहजन्म से जुड़ा हुआ, चुगलखोर और कंजूस होगा तथा हमेशा अपने काम में रुचि रखेगा।",
        },
        4: {
            english:
                "The native will be happy, endowed with maternal happiness, wealth and intelligence and be a king, or a minister, or a preceptor.",
            hindi: "जातक सुखी, मातृ सुख, धन और बुद्धि से संपन्न होगा तथा राजा, मंत्री या गुरु होगा।",
        },
        5: {
            english:
                "The native will have progeny, if related to a benefic; there will be no issues, if malefic is related to the 5th Lord, placed in the 5th. 5th Lord in 5th Bhava will, however, make one virtuous and dear to friends.",
            hindi: "यदि जातक का संबंध शुभ ग्रह से हो तो उसे संतान की प्राप्ति होगी; यदि पंचम भाव में स्थित पंचमेश से अशुभ ग्रह का संबंध हो तो कोई संतान नहीं होगी। तथापि, पंचम भाव में पंचमेश जातक को गुणवान और मित्रों का प्रिय बनाता है।",
        },
        6: {
            english:
                "The native will obtain such sons, who will be equal to his enemies, or will lose them, or will acquire an adopted, or purchased son.",
            hindi: "जातक को ऐसे पुत्र प्राप्त होंगे, जो उसके शत्रुओं के समान होंगे, या उन्हें खो देंगे, या गोद लिया हुआ या खरीदा हुआ पुत्र प्राप्त करेंगे।",
        },
        7: {
            english:
                "The native will be honourable, very religious, endowed with progenic happiness and be helpful to others.",
            hindi: "जातक सम्माननीय, बहुत धार्मिक, संतान सुख से संपन्न और दूसरों की मदद करने वाला होगा।",
        },
        8: {
            english:
                "The native will not have much progenic happiness, be troubled by cough and pulmonary disorders, be given to anger and be devoid of happiness.",
            hindi: "जातक को संतान सुख कम मिलेगा, खांसी और फुफ्फुसीय विकारों से परेशान रहेगा, क्रोधी होगा और सुख से रहित होगा।",
        },
        9: {
            english:
                "The native will be a prince, or equal to him, will author treatises, be famous and will shine in his race.",
            hindi: "जातक राजकुमार होगा, या उसके समकक्ष होगा, ग्रंथों की रचना करेगा, प्रसिद्ध होगा और अपने वंश में चमकेगा।",
        },
        10: {
            english:
                "The native will enjoy a Raja Yoga and various pleasures and be very famous.",
            hindi: "जातक राजयोग और विभिन्न सुखों का आनंद लेगा और बहुत प्रसिद्ध होगा।",
        },
        11: {
            english:
                "The native will be learned, dear to people, be an author of treatises, be very skilful and be endowed with many sons and wealth.",
            hindi: "जातक विद्वान, लोगों का प्रिय, ग्रंथों का लेखक, बहुत कुशल और बहुत पुत्रों और धन से संपन्न होगा।",
        },
        12: {
            english:
                "The native will be bereft of happiness from his own sons, will have an adopted, or purchased son.",
            hindi: "जातक को अपने पुत्रों से सुख नहीं मिलेगा, गोद लिया हुआ या खरीदा हुआ पुत्र होगा।",
        },
    },
    6: {
        1: {
            english:
                "The native will be sickly, famous, inimical to his own men, rich, honourable, adventurous and virtuous.",
            hindi: "जातक बीमार, प्रसिद्ध, अपने लोगों से शत्रुता रखने वाला, धनवान, सम्माननीय, साहसी और गुणवान होगा।",
        },
        2: {
            english:
                "The native will be adventurous, famous among his people, will live in alien countries, be happy, be a skilful speaker and be always interested in his own work.",
            hindi: "जातक साहसी, अपने लोगों में प्रसिद्ध, विदेशी देशों में निवास करने वाला, प्रसन्नचित्त, कुशल वक्ता तथा अपने कार्य में सदैव रुचि रखने वाला होगा।",
        },
        3: {
            english:
                "The native will be given to anger, be bereft of courage, inimical to all of his co-born and will have disobedient servants.",
            hindi: "जातक क्रोधी, साहसहीन, अपने सभी सहजनों से शत्रुतापूर्ण तथा अवज्ञाकारी नौकरों वाला होगा।",
        },
        4: {
            english:
                "The native will be devoid maternal happiness, be intelligent, be a tale bearer, be jealous, evil-minded and very rich.",
            hindi: "जातक मातृ सुख से रहित, बुद्धिमान, चुगलखोर, ईर्ष्यालु, दुष्ट स्वभाव वाला और बहुत धनवान होगा।",
        },
        5: {
            english:
                "The native will have fluctuating finances. He will incur enmity with his sons and friends. He will be happy, selfish and kind.",
            hindi: "जातक की आर्थिक स्थिति उतार-चढ़ाव भरी रहेगी। वह अपने पुत्रों और मित्रों से शत्रुता रखेगा। वह सुखी, स्वार्थी और दयालु होगा।",
        },
        6: {
            english:
                "The native will have enmity with the group of his kinsmen, but be friendly to others and will enjoy mediocre happiness in matters, like wealth.",
            hindi: "जातक अपने रिश्तेदारों के समूह के साथ शत्रुतापूर्ण व्यवहार करेगा, लेकिन दूसरों के साथ मित्रवत व्यवहार करेगा और धन जैसे मामलों में औसत सुख का आनंद लेगा।",
        },
        7: {
            english:
                "The native will be deprived of happiness through wedlock. He will be famous, virtuous, honourable, adventurous and wealthy.",
            hindi: "जातक वैवाहिक सुख से वंचित रहेगा। वह प्रसिद्ध, गुणवान, सम्माननीय, साहसी और धनवान होगा।",
        },
        8: {
            english:
                "The native will be sickly, inimical, will desire others wealth, be interested in others wives and be impure.",
            hindi: "जातक रोगी, शत्रुवत, दूसरों के धन की इच्छा रखने वाला, दूसरों की पत्नियों में रुचि रखने वाला तथा अशुद्ध होगा।",
        },
        9: {
            english:
                "The native will trade in wood and stones (Pashan also means poison) and will have fluctuating professional fortunes.",
            hindi: "जातक लकड़ी और पत्थरों (पाषाण का अर्थ जहर भी होता है) का व्यापार करेगा और उसके पेशेवर जीवन में उतार-चढ़ाव रहेगा।",
        },
        10: {
            english:
                "The native will be well known among his men, will not be respectfully disposed to his father and will be happy in foreign countries. He will be a gifted speaker.",
            hindi: "जातक अपने लोगों में सुप्रसिद्ध होगा, पिता के प्रति आदरपूर्ण व्यवहार नहीं रखेगा तथा विदेश में सुखी रहेगा। वह एक कुशल वक्ता होगा।",
        },
        11: {
            english:
                "The native will gain wealth through his enemies, be virtuous, adventurous and will be somewhat bereft of progenic happiness.",
            hindi: "जातक अपने शत्रुओं के माध्यम से धन प्राप्त करेगा, गुणवान, साहसी होगा तथा संतान सुख से कुछ हद तक वंचित रहेगा।",
        },
        12: {
            english:
                "The native will always spend on vices, be hostile to learned people and will torture living beings.",
            hindi: "जातक सदैव बुराइयों पर खर्च करेगा, विद्वानों से द्वेष रखेगा तथा जीवों को सताएगा।",
        },
    },
    7: {
        1: {
            english:
                "The native will go to others wives, be wicked, skilful, devoid of courage and afflicted by windy diseases.",
            hindi: "जातक परस्त्रीगामी, दुष्ट, कुटिल, साहसहीन, वायुजनित रोगों से ग्रस्त होगा।",
        },
        2: {
            english:
                "The native will have many wives, will gain wealth through his wife and be procrastinating in nature.",
            hindi: "जातक की कई पत्नियां होंगी, वह अपनी पत्नी के माध्यम से धन अर्जित करेगा तथा स्वभाव से टालमटोल करने वाला होगा।",
        },
        3: {
            english:
                "The native will face loss of children and sometimes with great difficulty there will exist a living son. There is also the possibility of birth of a daughter.",
            hindi: "जातक को संतान की हानि का सामना करना पड़ता है और कभी-कभी बड़ी कठिनाई से जीवित पुत्र की प्राप्ति होती है। कन्या के जन्म की भी संभावना रहती है।",
        },
        4: {
            english:
                "The wife of the native will not be under his control. He will be fond of truth, intelligent and religious. He will suffer from dental diseases.",
            hindi: "जातक की पत्नी उसके नियंत्रण में नहीं रहेगी। वह सत्यप्रिय, बुद्धिमान एवं धार्मिक होगा। उसे दंत रोग होगा।",
        },
        5: {
            english:
                "The native will be honourable, endowed with all (i.e. seven principal) virtues, always delighted and endowed with all kinds of wealth.",
            hindi: "जातक सम्माननीय, सभी (अर्थात सात प्रमुख) गुणों से संपन्न, सदैव प्रसन्नचित्त और सभी प्रकार की सम्पत्ति से संपन्न होगा।",
        },
        6: {
            english:
                "The native will beget a sickly wife and he will be inimical to her. He will be given to anger and will be devoid of happiness.",
            hindi: "जातक की पत्नी बीमार होगी और वह उससे शत्रुतापूर्ण व्यवहार करेगा। वह क्रोधी होगा और सुख से रहित होगा।",
        },
        7: {
            english:
                "The native will be endowed with happiness through wife, be courageous, skilful and intelligent, but only afflicted by windy diseases.",
            hindi: "जातक पत्नी से सुख प्राप्त करने वाला, साहसी, कुशल और बुद्धिमान होगा, लेकिन केवल वायुजन्य रोगों से पीड़ित होगा।",
        },
        8: {
            english:
                "The native will be deprived of marital happiness. His wife will be troubled by diseases, be devoid of good disposition and will not obey the native.",
            hindi: "जातक वैवाहिक सुख से वंचित रहेगा। उसकी पत्नी रोगों से ग्रस्त रहेगी, स्वभाव से कमजोर होगी तथा जातक की आज्ञा का पालन नहीं करेगी।",
        },
        9: {
            english:
                "The native will have union with many women, be well disposed to his own wife and will have many undertakings.",
            hindi: "जातक अनेक स्त्रियों से संबंध रखेगा, अपनी पत्नी के प्रति अच्छा व्यवहार रखेगा तथा अनेक कार्य करेगा।",
        },
        10: {
            english:
                "The native will beget a disobedient wife, will be religious and endowed with wealth, sons etc.",
            hindi: "जातक अवज्ञाकारी पत्नी को जन्म देगा, धार्मिक होगा तथा धन, पुत्र आदि से संपन्न होगा।",
        },
        11: {
            english:
                "The native will gain wealth through his wife, be endowed with less happiness from sons etc. and will have daughters.",
            hindi: "जातक अपनी पत्नी के माध्यम से धन प्राप्त करेगा, पुत्र आदि से सुख कम प्राप्त होगा तथा पुत्रियां होंगी।",
        },
        12: {
            english:
                "The native will incur penury, be a miser and his livelihood will be related to clothes. His wife will be a spendthrift.",
            hindi: "जातक दरिद्र, कंजूस होगा, उसकी आजीविका वस्त्रों से संबंधित होगी। उसकी पत्नी फिजूलखर्ची करने वाली होगी।",
        },
    },
    8: {
        1: {
            english:
                "The native will be devoid of physical felicity and will suffer from wounds. He will be hostile to gods and Brahmins.",
            hindi: "जातक शारीरिक सुख से वंचित रहेगा, घावों से पीड़ित रहेगा, देवताओं और ब्राह्मणों से द्वेष रखेगा।",
        },
        2: {
            english:
                "The native will be devoid of bodily vigour, will enjoy a little wealth and will not regain lost wealth.",
            hindi: "जातक शारीरिक शक्ति से रहित होगा, थोड़ा धन प्राप्त करेगा तथा खोया हुआ धन पुनः प्राप्त नहीं कर सकेगा।",
        },
        3: {
            english:
                "The native will be devoid of fraternal happiness, be indolent and devoid of servants and strength.",
            hindi: "जातक भ्रातृ सुख से रहित, आलसी, सेवकों और शक्ति से रहित होगा।",
        },
        4: {
            english:
                "The child will be deprived of its mother. He will be devoid of a house, lands and happiness and will doubtlessly betray his friends.",
            hindi: "बच्चा अपनी माँ से वंचित हो जाएगा। वह घर, ज़मीन और सुख से वंचित हो जाएगा और निस्संदेह अपने दोस्तों के साथ विश्वासघात करेगा।",
        },
        5: {
            english:
                "The native will be dull witted, will have limited number of children, be long-lived and wealthy.",
            hindi: "जातक मंदबुद्धि, सीमित संतान वाला, दीर्घायु एवं धनवान होगा।",
        },
        6: {
            english:
                "The native will win over his enemies, be afflicted by diseases and during childhood will incur danger through snakes and water.",
            hindi: "जातक अपने शत्रुओं पर विजय प्राप्त करेगा, रोगों से ग्रस्त रहेगा तथा बचपन में सांप और पानी से खतरा रहेगा।",
        },
        7: {
            english:
                "The native will have two wives. If the 8th Lord is conjunct with a malefic in the 7th Bhava, there will surely be downfall in his business.",
            hindi: "जातक की दो पत्नियाँ होंगी। यदि अष्टमेश सप्तम भाव में पाप ग्रह से युत हो तो जातक के व्यवसाय में निश्चित रूप से गिरावट आएगी।",
        },
        8: {
            english:
                "The native will be long-lived. If the said planet is weak, being in the 8th Bhava, the longevity will be medium, while the native will be a thief, be blameworthy and will blame others as well.",
            hindi: "जातक दीर्घायु होगा। यदि उक्त ग्रह निर्बल होकर अष्टम भाव में हो तो आयु मध्यम होगी, साथ ही जातक चोर, निंदनीय तथा दूसरों को दोष देने वाला होगा।",
        },
        9: {
            english:
                "The native will betray his religion, be a heterodox, will beget a wicked wife and will steal others wealth.",
            hindi: "जातक अपने धर्म के साथ विश्वासघात करेगा, विधर्मी होगा, दुष्ट पत्नी उत्पन्न करेगा तथा दूसरों का धन चुराएगा।",
        },
        10: {
            english:
                "The native will be devoid of paternal bliss, be a talebearer and be bereft of livelihood. If there is aa aspect in the process from a benefic, then these evils will not mature.",
            hindi: "जातक पितृ सुख से वंचित, चुगलखोर और आजीविका से वंचित रहेगा। यदि इस पर शुभ ग्रह की दृष्टि हो तो ये बुराइयाँ पनप नहीं पाएंगी।",
        },
        11: {
            english:
                "If the 8th Lord along with a malefic is in the 11th Bhava, the native will be devoid of wealth and will be miserable in boyhood, but happy later on. Should the 8th Lord be conjunct with a benefic and be in the 11th Bhava, the native will be long-lived.",
            hindi: "यदि अष्टमेश पाप ग्रह के साथ एकादश भाव में हो, तो जातक धनहीन होगा और बचपन में दुखी रहेगा, लेकिन बाद में सुखी रहेगा। यदि अष्टमेश शुभ ग्रह से युति करके एकादश भाव में हो, तो जातक दीर्घायु होगा।",
        },
        12: {
            english:
                "The native will spend on evil deeds and will incur a short life. More so, if there be additionally a malefic in the said Bhava.",
            hindi: "जातक बुरे कर्मों में धन खर्च करेगा और अल्पायु होगा। और भी अधिक, यदि उक्त भाव में कोई पाप ग्रह भी हो।",
        },
    },
    9: {
        1: {
            english:
                "The native will be fortunate, will be honoured by the king, be virtuous, charming, learned and honoured by the public.",
            hindi: "जातक भाग्यशाली, राजा द्वारा सम्मानित, गुणवान, आकर्षक, विद्वान और जनता द्वारा सम्मानित होगा।",
        },
        2: {
            english:
                "The native will be a scholar, be dear to all, wealthy, sensuous and endowed with happiness from wife, sons etc.",
            hindi: "जातक विद्वान, सभी का प्रिय, धनवान, कामुक तथा पत्नी, पुत्र आदि से सुखी होगा।",
        },
        3: {
            english:
                "The native will be endowed with fraternal bliss, be wealthy, virtuous and charming.",
            hindi: "जातक भाईचारे से भरपूर, धनवान, गुणवान और आकर्षक होगा।",
        },
        4: {
            english:
                "The native will enjoy houses, conveyances and happiness, will have all kinds of wealth and be devoted to his mother.",
            hindi: "जातक को मकान, वाहन और सुख-सुविधाएं प्राप्त होंगी, उसके पास सभी प्रकार की संपत्ति होगी और वह अपनी मां के प्रति समर्पित होगा।",
        },
        5: {
            english:
                "The native will be endowed with sons and prosperity, devoted to elders, bold, charitable and learned.",
            hindi: "जातक पुत्र और समृद्धि से संपन्न, बड़ों के प्रति समर्पित, साहसी, दानशील और विद्वान होगा।",
        },
        6: {
            english:
                "The native will enjoy meagre prosperity, be devoid of happiness from maternal relatives and be always troubled by enemies.",
            hindi: "जातक अल्प समृद्धि का आनंद लेगा, मातृ संबंधियों से सुख से वंचित रहेगा और शत्रुओं से सदैव परेशान रहेगा।",
        },
        7: {
            english:
                "The native will beget happiness after marriage, be virtuous and famous.",
            hindi: "जातक विवाह के बाद सुख प्राप्त करेगा, गुणवान एवं प्रसिद्ध होगा।",
        },
        8: {
            english:
                "The native will not be prosperous and will not enjoy happiness from his elder brother.",
            hindi: "जातक समृद्ध नहीं होगा और अपने बड़े भाई से सुख नहीं प्राप्त करेगा।",
        },
        9: {
            english:
                "The native will be endowed with abundant fortunes, virtues and beauty and will enjoy much happiness from co-born.",
            hindi: "जातक प्रचुर धन, गुण और सौंदर्य से संपन्न होगा तथा सहजन्य से बहुत सुख भोगेगा।",
        },
        10: {
            english:
                "The native will be a king, or equal to him, or be a minister, or an Army chief, be virtuous and dear to all.",
            hindi: "जातक राजा होगा, या उसके समकक्ष होगा, या मंत्री होगा, या सेना प्रमुख होगा, गुणवान होगा और सभी का प्रिय होगा।",
        },
        11: {
            english:
                "The native will enjoy financial gains day by day, be devoted to elders, virtuous and meritorious in acts.",
            hindi: "जातक दिन-प्रतिदिन आर्थिक लाभ प्राप्त करेगा, बड़ों के प्रति समर्पित होगा, पुण्यवान और कर्मशील होगा।",
        },
        12: {
            english:
                "The native will incur loss of fortunes, will always spend on auspicious acts and will become poor on account of entertaining guests.",
            hindi: "जातक को धन की हानि होगी, वह सदैव शुभ कार्यों पर खर्च करेगा तथा अतिथि सत्कार के कारण गरीब हो जाएगा।",
        },
    },
    10: {
        1: {
            english:
                "The native will be scholarly, famous, be a poet, will incur diseases in boyhood and be happy later on. His wealth will increase day by day.",
            hindi: "जातक विद्वान, यशस्वी, कवि होगा, बाल्यावस्था में रोगग्रस्त होगा तथा बाद में सुखी होगा। उसकी धन-संपत्ति दिन-प्रतिदिन बढ़ती जाएगी।",
        },
        2: {
            english:
                "The native will be wealthy, virtuous, honoured by the king, charitable and will enjoy happiness from father and others.",
            hindi: "जातक धनवान, गुणवान, राजा द्वारा सम्मानित, दानशील तथा पिता एवं अन्य लोगों से सुख प्राप्त करने वाला होगा।",
        },
        3: {
            english:
                "The native will enjoy happiness from brothers and servants, be valorous, virtuous, eloquent and truthful.",
            hindi: "जातक भाई-बहनों और नौकरों से सुख प्राप्त करेगा, वीर, गुणवान, वाक्पटु और सत्यवादी होगा।",
        },
        4: {
            english:
                "The native will be happy, be always interested in his mothers welfare, will Lord over conveyances, lands and houses, be virtuous and wealthy.",
            hindi: "जातक सुखी होगा, अपनी माता के कल्याण में सदैव रुचि रखेगा, वाहन, भूमि और मकान का स्वामी होगा, गुणवान और धनवान होगा।",
        },
        5: {
            english:
                "The native will be endowed with all kinds of learning, he will be always delighted and he will be wealthy and endowed with sons.",
            hindi: "जातक सभी प्रकार की विद्याओं से संपन्न होगा, सदैव प्रसन्न रहेगा, धनवान एवं पुत्रवान होगा।",
        },
        6: {
            english:
                "The native will be bereft of paternal bliss. Although he may be skilful, he will be bereft of wealth and be troubled by enemies.",
            hindi: "जातक को पितृ सुख से वंचित रहना पड़ेगा। यद्यपि वह कुशल होगा, फिर भी वह धन से वंचित रहेगा और शत्रुओं से परेशान रहेगा।",
        },
        7: {
            english:
                "The native will be endowed with happiness through wife, be intelligent, virtuous, eloquent, truthful and religious.",
            hindi: "जातक पत्नी से सुख प्राप्त करने वाला, बुद्धिमान, गुणवान, वाक्पटु, सत्यवादी और धार्मिक होगा।",
        },
        8: {
            english:
                "The native will be devoid of acts, long-lived and intent on blaming others.",
            hindi: "जातक कर्महीन, दीर्घायु और दूसरों को दोष देने वाला होगा।",
        },
        9: {
            english:
                "One born of royal scion will become a king, whereas an ordinary native will be equal to a king. This placement will confer wealth and progenic happiness etc.",
            hindi: "राजसी वंश में जन्मा व्यक्ति राजा बनेगा, जबकि सामान्य जातक राजा के समान होगा। यह स्थिति धन और संतान सुख आदि प्रदान करेगी।",
        },
        10: {
            english:
                "The native will be skilful in all jobs, be valorous, truthful and devoted to elders.",
            hindi: "जातक सभी कार्यों में कुशल, वीर, सत्यवादी एवं बड़ों के प्रति समर्पित होगा।",
        },
        11: {
            english:
                "The native will be endowed with wealth, happiness and sons. He will be virtuous, truthful and always delighted.",
            hindi: "जातक धन, सुख और पुत्र से संपन्न होगा। वह सदाचारी, सत्यवादी और सदैव प्रसन्न रहेगा।",
        },
        12: {
            english:
                "The native will spend through royal abodes, will have fear from enemies and will be worried in spite of being skilful.",
            hindi: "जातक राजसी सुखों में व्यतीत करेगा, शत्रुओं से भय रहेगा तथा कुशल होते हुए भी चिंतित रहेगा।",
        },
    },
    11: {
        1: {
            english:
                "The native will be genuine in disposition, be rich, happy, even-sighted, be a poet, be eloquent in speech and be always endowed with gains.",
            hindi: "जातक स्वभाव से सच्चा, धनवान, सुखी, समदर्शी, कवि, वाकपटु और सदैव लाभ से युक्त होगा।",
        },
        2: {
            english:
                "The native will be endowed with all kinds of wealth and all kinds of accomplishments, charitable, religious and always happy.",
            hindi: "जातक सभी प्रकार के धन और सभी प्रकार की उपलब्धियों से संपन्न, दानशील, धार्मिक और सदैव प्रसन्न रहेगा।",
        },
        3: {
            english:
                "The native will be skilful in all jobs, wealthy, endowed with fraternal bliss and may sometimes incur gout pains.",
            hindi: "जातक सभी कार्यों में कुशल, धनवान, भाईचारे से संपन्न होगा तथा कभी-कभी गठिया रोग से पीड़ित हो सकता है।",
        },
        4: {
            english:
                "The native will gain from maternal relatives, will undertake visits to shrines and will possess happiness of house and lands.",
            hindi: "जातक को मातृ सम्बन्धियों से लाभ होगा, धार्मिक स्थलों की यात्रा होगी तथा मकान और भूमि का सुख प्राप्त होगा।",
        },
        5: {
            english:
                "The native will be happy, educated and virtuous. He will be religious and happy.",
            hindi: "जातक सुखी, शिक्षित एवं गुणवान होगा। वह धार्मिक एवं प्रसन्न रहेगा।",
        },
        6: {
            english:
                "The native will be afflicted by diseases, be cruel, living in foreign places and troubled by enemies.",
            hindi: "जातक रोगों से ग्रस्त, क्रूर, विदेशी स्थानों पर रहने वाला और शत्रुओं से परेशान होगा।",
        },
        7: {
            english:
                "The native will always gain through his wifes relatives, be liberal, virtuous, sensuous and will remain at the command of his spouse.",
            hindi: "जातक सदैव अपनी पत्नी के रिश्तेदारों से लाभ प्राप्त करेगा, उदार, गुणवान, कामुक होगा तथा अपने जीवनसाथी के आदेश का पालन करेगा।",
        },
        8: {
            english:
                "The native will incur reversals in his undertakings and will live long, while his wife will predecease him.",
            hindi: "जातक को अपने कार्यों में प्रतिकूलता का सामना करना पड़ेगा तथा वह दीर्घायु होगा, जबकि उसकी पत्नी की मृत्यु उससे पहले हो जाएगी।",
        },
        9: {
            english:
                "The native will be fortunate, skilful, truthful, honoured by the king and be affluent.",
            hindi: "जातक भाग्यशाली, कुशल, सत्यवादी, राजा द्वारा सम्मानित और धनवान होगा।",
        },
        10: {
            english:
                "The native will be honoured by the king, be virtuous, attached to his religion, intelligent, truthful and will subdue his senses.",
            hindi: "जातक राजा द्वारा सम्मानित, गुणवान, धर्मनिष्ठ, बुद्धिमान, सत्यनिष्ठ तथा अपनी इन्द्रियों को वश में रखने वाला होगा।",
        },
        11: {
            english:
                "The native will gain in all his undertakings, while his learning and happiness will be on the increase day by day.",
            hindi: "जातक को अपने सभी कार्यों में लाभ होगा, जबकि उसकी शिक्षा और खुशी दिन-प्रतिदिन बढ़ती जाएगी।",
        },
        12: {
            english:
                "The native will always depend on good deeds, be sensuous, will have many wives and will befriend barbarians.",
            hindi: "जातक सदैव अच्छे कर्मों पर निर्भर रहेगा, कामुक होगा, उसकी कई पत्नियां होंगी तथा वह बर्बर लोगों से मित्रता रखेगा।",
        },
    },
    12: {
        1: {
            english:
                "The native will be a spendthrift, be weak in constitution, will suffer from phlegmatic disorders and be devoid of wealth and learning.",
            hindi: "जातक अपव्ययी, कमजोर शरीर वाला, कफ विकार से ग्रस्त, धन और विद्या से रहित होगा।",
        },
        2: {
            english:
                "The native will always spend on inauspicious deeds, be religious, will speak sweetly and will be endowed with virtues and happiness.",
            hindi: "जातक सदैव अशुभ कार्यों पर व्यय करने वाला, धार्मिक, मधुर वाणी बोलने वाला तथा गुणों एवं सुखों से युक्त होगा।",
        },
        3: {
            english:
                "The native will be devoid of fraternal bliss, will hate others and will promote self-nourishment.",
            hindi: "जातक भाईचारे के आनंद से रहित होगा, दूसरों से घृणा करेगा और आत्म-पोषण को बढ़ावा देगा।",
        },
        4: {
            english:
                "The native will be devoid of maternal happiness and will day by day accrue losses with respect to lands, conveyances and houses.",
            hindi: "जातक मातृ सुख से वंचित रहेगा तथा भूमि, वाहन और मकान के संबंध में दिन-प्रतिदिन हानि होती रहेगी।",
        },
        5: {
            english:
                "The native will be bereft of sons and learning. He will spend, as well as visit shrines in order to beget a son.",
            hindi: "जातक पुत्र और विद्या से वंचित रहेगा। पुत्र प्राप्ति के लिए वह धन व्यय करेगा तथा तीर्थस्थानों पर भी जाएगा।",
        },
        6: {
            english:
                "The native will incur enmity with his own men, be given to anger, be sinful, miserable and will go to others wives.",
            hindi: "जातक अपने ही लोगों से शत्रुता करेगा, क्रोधी होगा, पापी होगा, दुखी होगा तथा दूसरों की पत्नियों के पास जाएगा।",
        },
        7: {
            english:
                "The native will incur expenditure on account of his wife, will not enjoy conjugal bliss and will be bereft of learning and strength.",
            hindi: "जातक अपनी पत्नी के कारण व्यय करेगा, वैवाहिक सुख का आनंद नहीं ले पाएगा तथा विद्या और बल से रहित होगा।",
        },
        8: {
            english:
                "The native will always gain, will speak affably, will enjoy a medium span of life and be endowed with all good qualities.",
            hindi: "जातक सदैव लाभ प्राप्त करेगा, मधुर वाणी बोलेगा, मध्यम आयु का होगा तथा सभी अच्छे गुणों से संपन्न होगा।",
        },
        9: {
            english:
                "The native will dishonour his elders, be inimical even to his friends and be always intent on achieving his own ends.",
            hindi: "जातक अपने बड़ों का अपमान करेगा, अपने मित्रों के प्रति भी शत्रुतापूर्ण व्यवहार करेगा तथा सदैव अपने स्वार्थ सिद्धि के लिए प्रयासरत रहेगा।",
        },
        10: {
            english:
                "The native will incur expenditure through royal persons and will enjoy only moderate paternal bliss.",
            hindi: "जातक को राजसी व्यक्तियों के माध्यम से व्यय होगा तथा उसे केवल मध्यम पैतृक सुख ही प्राप्त होगा।",
        },
        11: {
            english:
                "The native will incur losses, be brought up by others and will sometimes gain through others.",
            hindi: "जातक को हानि होगी, दूसरों द्वारा पाला जाएगा तथा कभी-कभी दूसरों के माध्यम से लाभ भी होगा।",
        },
        12: {
            english:
                "The native will only face heavy expenditure, will not have physical felicity, be irritable and spiteful.",
            hindi: "जातक को केवल भारी व्यय का सामना करना पड़ेगा, शारीरिक सुख नहीं मिलेगा, चिड़चिड़ा और द्वेषपूर्ण होगा।",
        },
    },
};
