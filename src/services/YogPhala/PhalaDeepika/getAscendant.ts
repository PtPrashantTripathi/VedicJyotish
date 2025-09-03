import type { Planet, PlanetEn } from "src/services/constants/Planet";
import type { RasiEn } from "src/services/constants/Rasi";
import type { Translation } from "src/services/types";
import type { Phala } from "src/services/YogPhala";

/**
 * Retrieves the ascendant effects from Phala Deepika based on the Ascendant's
 * Rasi.
 *
 * @param planets - Object containing all planet data keyed by English planet
 *   names.
 * @returns A `phala` object describing the ascendant effect in both English and
 *   Hindi.
 */
export function getPhalaDeepikaAscendantYogPhala(
    planets: Record<PlanetEn, Planet>
): Phala {
    const { english: rasiEnglishName, hindi: rasiHindiName } =
        planets.Ascendant.rasi.name;

    return {
        description: {
            english: `Ascendant in ${rasiEnglishName}`,
            hindi: `लग्न ${rasiHindiName} में`,
        },
        effect: AscendantEffects[rasiEnglishName],
    };
}

/** Ascendant effects from Phala Deepika, keyed by Rasi English name */
export const AscendantEffects: Record<RasiEn, Translation<string, string>> = {
    Aries: {
        english:
            "If the Ascendant falls in Aries, the native will have round eyes. His knees will be weak and he will have aggressive temperament but he will be afraid of water. He will be active and will always be moving about. His limbs will be bruised. He will eat sparigly and will be passionate. He will speak falsehoods.",
        hindi: "यदि लग्न मेष राशि में हो, तो जातक की आँखें गोल होंगी। उसके घुटने कमज़ोर होंगे, स्वभाव आक्रामक होगा, लेकिन उसे पानी से डर भी लगेगा। वह सक्रिय और हमेशा गतिशील रहेगा। उसके अंगों में चोट लगी होगी। वह कम मात्रा में भोजन करेगा और भावुक होगा। वह झूठ बोलेगा।",
    },
    Taurus: {
        english:
            "The person born with Taurus as the Ascendant, will have plumply thighs and a big face. He will be engaged in agricultural ventures. He will be happy in the middle and last portions of his life. He will be fond of enjoying young women. He will be of sacrificing and forgiving nature, will be capable of endowing hardships and will possess cattle. He will have marks or moles on the back, face and sides.",
        hindi: "वृषभ लग्न में जन्मे जातक की जांघें मोटी और चेहरा बड़ा होगा। वह कृषि कार्यों में संलग्न होगा। जीवन के मध्य और अंतिम भाग में सुखी रहेगा। वह युवतियों के भोग-विलास में रुचि रखेगा। वह त्यागी और क्षमाशील स्वभाव का होगा, कष्टों का निवारण करने में सक्षम होगा और उसके पास पशु होंगे। उसकी पीठ, चेहरे और बगल पर तिल या निशान होंगे।",
    },
    Gemini: {
        english:
            "When the Ascendant is Gemini, the native will have black eyes and curly hair. He will enjoy association with women and will have thick neck and many friends. He will be intelligent and mind reader. His nose will be elevated and he will be fond of music and dancing. He will like to remain indoors.",
        hindi: "मिथुन लग्न होने पर जातक की आँखें काली और बाल घुंघराले होंगे। उसे स्त्रियों का साथ अच्छा लगेगा, उसकी गर्दन मोटी होगी और उसके कई मित्र होंगे। वह बुद्धिमान और मन को पढ़ने वाला होगा। उसकी नाक ऊँची होगी और उसे संगीत और नृत्य का शौक होगा। उसे घर के अंदर रहना पसंद होगा।",
    },
    Cancer: {
        english:
            "Person with Cancer as the Ascendant will be henpacked. He will have a thick neck and will be fond of making friendships. He will possess many houses and will be wealthy. His waist will be thick but he will be short statured. He will be intelligent and fond of watery sports like swimming etc. He will walk fast and will have few sons. He will be crooked.",
        hindi: "कर्क लग्न वाला व्यक्ति दुधारू होगा। उसकी गर्दन मोटी होगी और वह मित्रता करने का शौकीन होगा। उसके पास कई घर होंगे और वह धनवान होगा। उसकी कमर मोटी होगी, लेकिन कद छोटा होगा। वह बुद्धिमान होगा और तैराकी आदि जलीय खेलों का शौकीन होगा। वह तेज चलेगा और उसके पुत्र कम होंगे। वह टेढ़ा-मेढ़ा होगा।",
    },
    Leo: {
        english:
            "A person whose Ascendant is Leo will have reddish eyes, large chin and broad face. He will be arrogant, Powerful valiant, firm minded and obedient to his mother. He will be fond of roaming about in forests and hills. He will get angry on trifles.",
        hindi: "सिंह लग्न वाले व्यक्ति की आँखें लाल, ठोड़ी बड़ी और चेहरा चौड़ा होगा। वह अभिमानी, पराक्रमी, दृढ़ निश्चयी और माता का आज्ञाकारी होगा। उसे जंगलों और पहाड़ों में घूमने का शौक होगा। उसे छोटी-छोटी बातों पर गुस्सा आ जाएगा।",
    },
    Virgo: {
        english:
            "The person born with Virgo as the Ascendant, will be truthful and will speak kindly. His eyes will be full of bashfulness and will be immediately liked by others. He will be well versed in Shastras and will take advantage of other peoples houses and wealth. His arms and shoulders will be drooped and will possess few sons.",
        hindi: "कन्या लग्न वाला व्यक्ति सत्यवादी और मधुर वाणी बोलने वाला होगा। उसकी आँखें शर्मीली होंगी और वह दूसरों को तुरंत पसंद आएगा। वह शास्त्रों का ज्ञाता होगा और दूसरों के घर और धन का दुरुपयोग करेगा। उसकी भुजाएँ और कंधे झुके हुए होंगे और उसके पुत्र कम होंगे।",
    },
    Libra: {
        english:
            "If the Ascendant be Libra, the person born will rever gods, and Brahmins but he will be active and will possess a lean and thin body. He will be tall in stature, deft in trading, patient and intent on being first. He will often have two names. He will have few children and he will be fond of wandering. He will be brave, merciless and impartial In his arguments.",
        hindi: "तुला लग्न होने पर जन्म लेने वाला व्यक्ति देवताओं और ब्राह्मणों का आदर करेगा, लेकिन वह सक्रिय और दुबला-पतला शरीर वाला होगा। वह लंबा कद, व्यापार में कुशल, धैर्यवान और प्रथम स्थान प्राप्त करने का इच्छुक होगा। उसके प्रायः दो नाम होंगे। उसके कम संतान होंगे और वह घूमने-फिरने का शौकीन होगा। वह साहसी, निर्दयी और अपने तर्कों में निष्पक्ष होगा।",
    },
    Scorpio: {
        english:
            "The person with Scorpio Ascendant at birth, will have rounded thighs and knees. His chest will be broad and eyes expansive. He will suffer from diseases from an early age. He will beseperated from his parents and preceptor. He will indulge In cruel actions and will be honoured by the king. His feet will bear marks of lotus.",
        hindi: "जन्म के समय वृश्चिक लग्न वाले व्यक्ति की जांघें और घुटने गोल होंगे। उसकी छाती चौड़ी और आँखें बड़ी होंगी। वह कम उम्र से ही रोगों से ग्रस्त रहेगा। वह अपने माता-पिता और गुरु से अलग रहेगा। वह क्रूर कर्मों में लिप्त रहेगा और राजा द्वारा सम्मानित होगा। उसके पैरों में कमल के चिह्न होंगे।",
    },
    Sagittarius: {
        english:
            "The person with Sagittarius Ascendant at birth \\u2014 His face and neck will be long and his nose and ears will be big. He will always keep himself engaged in some work or the other. He will be eloquent in speech and self sacrificing. He will have a short stature. He will be courageous and will overcome his enemies. He will be wealthy and favourite of the king. He can be won over by persuation and kindness.",
        hindi: "जन्म के समय धनु लग्न वाले व्यक्ति का चेहरा और गर्दन लंबी होगी तथा नाक और कान बड़े होंगे। वह हमेशा किसी न किसी काम में लगा रहेगा। वह वाक्पटु और त्यागी होगा। उसका कद छोटा होगा। वह साहसी होगा और अपने शत्रुओं पर विजय प्राप्त करेगा। वह धनवान और राजा का प्रिय होगा। उसे अनुनय और दया से जीता जा सकता है।",
    },
    Capricorn: {
        english:
            "When Capricorn is the Ascendant at birth, his lower limbs will be weak. He will have vitality. He will accept other peoples advice but will be lazy by nature. He will indulge in affairs with old women of the forbidden category. He will be a religious hypocrite. He will be fond of wandering. He will be fortunate but shameless. He will suffer from wind-diseases.",
        hindi: "जन्म के समय मकर लग्न होने पर उसके निचले अंग दुर्बल होंगे। वह ऊर्जावान होगा। वह दूसरों की सलाह मानेगा, लेकिन स्वभाव से आलसी होगा। वह वर्जित श्रेणी की वृद्ध स्त्रियों के साथ संबंध बनाएगा। वह धार्मिक पाखंडी होगा। उसे घूमने-फिरने का शौक होगा। वह भाग्यशाली होगा, लेकिन निर्लज्ज होगा। उसे वायु रोग होगा।",
    },
    Aquarius: {
        english:
            "The person at whose birth Aquarius is the Ascendant, will commit sinful actions secretly. He will have little wealth, will be greedy and eager to usurp or utilise other peoples money. He will endure long marches on road and will be clever in causing hurt to others. He will have a body like a water pot. He will be fond of perfumes and flowers. His financial position will be of a fluctuating nature.",
        hindi: "जिस व्यक्ति का जन्म लग्न कुंभ हो, वह गुप्त रूप से पाप कर्म करने वाला होगा। उसके पास धन कम होगा, वह लालची होगा और दूसरों का धन हड़पने या उसका दुरुपयोग करने के लिए आतुर होगा। वह सड़क पर लंबी यात्राएँ करेगा और दूसरों को चोट पहुँचाने में चतुर होगा। उसका शरीर जल के घड़े के समान होगा। उसे इत्र और फूलों का शौक होगा। उसकी आर्थिक स्थिति अस्थिर रहेगी।",
    },
    Pisces: {
        english:
            "The Pisces ascendant native will have a beautiful and symmetrical body. His eyes will be very attractive. He will be learned, grateful, satisfied with his wife and fortune. He will have financial gains from selling produce of the seas. He will overcome his enemies.",
        hindi: "मीन लग्न के जातक का शरीर सुंदर और सुडौल होगा। उसकी आँखें अत्यंत आकर्षक होंगी। वह विद्वान, कृतज्ञ, अपनी पत्नी और भाग्य से संतुष्ट होगा। उसे समुद्री उत्पाद बेचने से धन लाभ होगा। वह अपने शत्रुओं पर विजय प्राप्त करेगा।",
    },
};
