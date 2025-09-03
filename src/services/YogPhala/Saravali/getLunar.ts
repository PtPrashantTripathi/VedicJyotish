import type { Planet, PlanetEn } from "src/services/constants/Planet";
import { NORMALIZE12 } from "src/services/utils";
import type { Phala } from "src/services/YogPhala";
export function getSaravaliLunarYogPhala(
    planets: Record<PlanetEn, Planet>
): Phala[] {
    const effectTable: Array<Phala & { rule: boolean }> = [
        {
            description: {
                english: "Sunapha Yoga caused by Mars",
                hindi: "मंगल के कारण सुनफा योग",
            },
            effect: {
                english:
                    "If Sunapha Yoga is caused by Mars (by being in the 2nd of the Moon), the native will be valorous, wealthy, cruel in speech, be an Army chief, will be fierce, torturous, proud and inimical.",
                hindi: "यदि मंगल के कारण (चन्द्रमा के द्वितीय भाव में होने से) सुनफा योग हो तो जातक वीर, धनवान, वाणी में क्रूर, सेनापति, उग्र, अत्याचारी, अभिमानी और शत्रुवत होगा।",
            },
            rule:
                planets.Mars.rasi.rasi_num ===
                NORMALIZE12(planets.Moon.rasi.rasi_num + 1),
        },
        {
            description: {
                english: "Anapha Yoga caused by Mars",
                hindi: "मंगल के कारण अनफा योग",
            },
            effect: {
                english:
                    "If Anapha Yoga is caused by Mars-being in the 12th from the Moonthe native will head a band of thieves, will be arrogant in disposition, be honoured, fond of war, given to anger, good, praiseworthy, good-bodied and proud.",
                hindi: "यदि चन्द्रमा से बारहवें भाव में स्थित मंगल के कारण अनफा योग हो तो जातक चोरों के गिरोह का मुखिया, अहंकारी, प्रतिष्ठित, युद्धप्रिय, क्रोधी, अच्छा, प्रशंसनीय, सुडौल और अभिमानी होगा।",
            },
            rule:
                planets.Mars.rasi.rasi_num ===
                NORMALIZE12(planets.Moon.rasi.rasi_num - 1),
        },
        {
            description: {
                english: "Durudhura Yoga caused by Mars and Mercury",
                hindi: "मंगल और बुध के कारण दुरुधुर योग",
            },
            effect: {
                english:
                    "If Durudhura Yoga is caused by the pair of Mars and Mercury, the native will be a liar, be very wealthy, expert, very wicked, greatly miserly, addicted to an old lady and be chief in his race.",
                hindi: "यदि दुरुधुर योग मंगल और बुध की जोड़ी के कारण हो तो जातक झूठा, बहुत धनवान, विशेषज्ञ, बहुत दुष्ट, बहुत कंजूस, वृद्ध महिला पर आसक्त तथा अपने कुल में मुखिया होगा।",
            },
            rule:
                (planets.Mars.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) &&
                    planets.Mercury.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num + 1)) ||
                (planets.Mars.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) &&
                    planets.Mercury.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num - 1)),
        },
        {
            description: {
                english:
                    "Sunapha: a planet (excepting Sun) in the 2nd from the Moon",
                hindi: "सुनफा: चंद्रमा से दूसरे भाव में स्थित एक ग्रह (सूर्य को छोड़कर)",
            },
            effect: {
                english:
                    "One born with Sunapha Yoga will be wealthy, will have self-made prowess (or will reach an exalted position of his own efforts), be very virtuous, be learned in Shastras and their meanings, be very famous, virtuous (like Lord Rama), be peacefully disposed, happy, be a king, or a minister and be highly intelligent.",
                hindi: "सुनफा योग में जन्म लेने वाला व्यक्ति धनवान, स्वनिर्मित पराक्रमी (अथवा अपने प्रयासों से उच्च पद पर पहुंच जाएगा), बहुत गुणी, शास्त्रों और उनके अर्थों का ज्ञाता, बहुत प्रसिद्ध, गुणी (भगवान राम के समान), शांत स्वभाव वाला, सुखी, राजा या मंत्री तथा अत्यधिक बुद्धिमान होगा।",
            },
            rule:
                (planets.Mars.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) ||
                    planets.Mercury.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num + 1) ||
                    planets.Jupiter.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num + 1) ||
                    planets.Venus.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num + 1) ||
                    planets.Saturn.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num + 1)) &&
                planets.Mars.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) &&
                planets.Mercury.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) &&
                planets.Jupiter.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) &&
                planets.Venus.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) &&
                planets.Saturn.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1),
        },
        {
            description: {
                english:
                    "Anapha: a planet (excepting Sun) in the 12th from the Moon",
                hindi: "अनाफा: चंद्रमा से 12वें भाव में स्थित एक ग्रह (सूर्य को छोड़कर)",
            },
            effect: {
                english:
                    "One born in Anapha Yoga will be eloquent in speech, magnanimous, virtuous, will enjoy food, drink, flowers, robes and females, will be famous, calm in disposition, happy, pleased and will possess a beautiful body.",
                hindi: "अनफा योग में जन्म लेने वाला व्यक्ति वाकपटु, उदार, गुणवान, भोजन, पेय, पुष्प, वस्त्र और स्त्रियों का भोग करने वाला, प्रसिद्ध, शांत स्वभाव वाला, प्रसन्न, प्रसन्न और सुंदर शरीर वाला होता है।",
            },
            rule:
                (planets.Mars.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) ||
                    planets.Mercury.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num - 1) ||
                    planets.Jupiter.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num - 1) ||
                    planets.Venus.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num - 1) ||
                    planets.Saturn.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num - 1)) &&
                planets.Mars.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) &&
                planets.Mercury.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) &&
                planets.Jupiter.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) &&
                planets.Venus.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) &&
                planets.Saturn.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1),
        },
        {
            description: {
                english:
                    "Durudhura: planets (excepting Sun) in the 2nd and 12th from the Moon",
                hindi: "दुरुधुरा: चंद्रमा से दूसरे और बारहवें भाव में स्थित ग्रह (सूर्य को छोड़कर)",
            },
            effect: {
                english:
                    "One born in Durudhura Yoga will be famous on the earth for his speech, wisdom, valour and virtues. He will enjoy freedom, comforts, wealth and conveyances. He will be liberal, but will come to grief by maintaining his family members. He will have good behavior.",
                hindi: "दुरुधुर योग में जन्म लेने वाला व्यक्ति अपनी वाणी, बुद्धि, पराक्रम और गुणों के लिए पृथ्वी पर प्रसिद्ध होगा। वह स्वतंत्रता, सुख-सुविधाओं, धन और वाहन-सुविधाओं का आनंद उठाएगा। वह उदार होगा, लेकिन अपने परिवार के सदस्यों का पालन-पोषण करते हुए दुःख उठाएगा। उसका आचरण अच्छा होगा।",
            },
            rule:
                (planets.Mars.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) ||
                    planets.Mercury.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num - 1) ||
                    planets.Jupiter.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num - 1) ||
                    planets.Venus.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num - 1) ||
                    planets.Saturn.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num - 1)) &&
                (planets.Mars.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) ||
                    planets.Mercury.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num + 1) ||
                    planets.Jupiter.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num + 1) ||
                    planets.Venus.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num + 1) ||
                    planets.Saturn.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num + 1)),
        },
        {
            description: {
                english:
                    "Kemadruma: no planet (excepting Sun) in the 2nd and 12th from the Moon",
                hindi: "केमद्रुम: चंद्रमा से दूसरे और बारहवें भाव में कोई ग्रह (सूर्य को छोड़कर) नहीं है",
            },
            effect: {
                english:
                    "The native with Kemadruma Yoga will be deprived of life, drinks, food, residence, robes and friends, though he may belong to regal scion. He will suffer from poverty, grief, sickness and be dirty. He will live by hard labor, be wicked and be inimically disposed to one and all.",
                hindi: "केमद्रुम योग वाला जातक जीवन, पेय, भोजन, निवास, वस्त्र और मित्रों से वंचित रहेगा, भले ही वह राजसी वंश का हो। वह दरिद्रता, दुःख, रोग से ग्रस्त रहेगा और गंदा रहेगा। वह कठोर परिश्रम करेगा, दुष्ट होगा और सभी से द्वेष रखेगा।",
            },
            rule:
                planets.Mars.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) &&
                planets.Mercury.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) &&
                planets.Jupiter.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) &&
                planets.Venus.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) &&
                planets.Saturn.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) &&
                planets.Mars.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) &&
                planets.Mercury.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) &&
                planets.Jupiter.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) &&
                planets.Venus.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) &&
                planets.Saturn.rasi.rasi_num !==
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1),
        },
        {
            description: {
                english: "Durudhura Yoga caused by Mars and Jupiter",
                hindi: "मंगल और बृहस्पति के कारण दुरुधुर योग",
            },
            effect: {
                english:
                    "If Durudhura Yoga is caused by Mars and Jupiter, one will be famous by his deeds, be mighty (or wealthy), inimically disposed to many and disposed to anger, will protect his men and will gather money.",
                hindi: "यदि दुरुधुर योग मंगल और बृहस्पति के कारण हो तो व्यक्ति अपने कर्मों से प्रसिद्ध होगा, शक्तिशाली (या धनवान) होगा, बहुतों से शत्रुतापूर्ण व्यवहार करेगा और क्रोधी होगा, अपने लोगों की रक्षा करेगा और धन इकट्ठा करेगा।",
            },
            rule:
                (planets.Mars.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) &&
                    planets.Jupiter.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num + 1)) ||
                (planets.Mars.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) &&
                    planets.Jupiter.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num - 1)),
        },
        {
            description: {
                english: "Durudhura Yoga caused by Mars and Venus",
                hindi: "मंगल और शुक्र के कारण दुरुधुर योग",
            },
            effect: {
                english:
                    "If the Moon has Venus and Mars on either side, the native will have a virtuous wife, will be fortunate, argumentative, pure, skillful, will like doing exercises and be bold in war.",
                hindi: "यदि चन्द्रमा के दोनों ओर शुक्र और मंगल हो तो जातक की पत्नी गुणवान, भाग्यशाली, तर्कशील, पवित्र, कुशल, व्यायाम करने वाला तथा युद्ध में साहसी होगा।",
            },
            rule:
                (planets.Mars.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) &&
                    planets.Venus.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num + 1)) ||
                (planets.Mars.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) &&
                    planets.Venus.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num - 1)),
        },
        {
            description: {
                english: "Durudhura Yoga caused by Mars and Saturn",
                hindi: "मंगल और शनि के कारण दुरुधुर योग",
            },
            effect: {
                english:
                    "If Saturn and Mars plank the Moon, the native will be the husband of a bad lady. He will save a lot of money. He will have vices. He will be given to anger and be a tale bearer. He will win over his enemies.",
                hindi: "यदि शनि और मंगल चंद्रमा पर हों, तो जातक बुरी स्त्री का पति होगा। वह बहुत सारा धन संचय करेगा। उसमें बुराइयाँ होंगी। वह क्रोधी और चुगलखोर होगा। वह अपने शत्रुओं पर विजय प्राप्त करेगा।",
            },
            rule:
                (planets.Mars.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) &&
                    planets.Saturn.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num + 1)) ||
                (planets.Mars.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) &&
                    planets.Saturn.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num - 1)),
        },
        {
            description: {
                english: "Sunapha Yoga caused by Mercury",
                hindi: "बुध के कारण सुनफा योग",
            },
            effect: {
                english:
                    "If Mercury be the cause of Sunapha Yoga, the native will be expert in Vedas, Shastras and music. He will be virtuous and a poet. He will be high-minded, intent on thinking of good for all and will possess a brilliant physique.",
                hindi: "यदि बुध सुनफा योग का कारक हो, तो जातक वेद, शास्त्र और संगीत में निपुण होगा। वह गुणी और कवि होगा। वह उच्च विचारों वाला, सभी का भला सोचने वाला और तेजस्वी शरीर वाला होगा।",
            },
            rule:
                planets.Mercury.rasi.rasi_num ===
                NORMALIZE12(planets.Moon.rasi.rasi_num + 1),
        },
        {
            description: {
                english: "Anapha Yoga caused by Mercury",
                hindi: "बुध के कारण अनफा योग",
            },
            effect: {
                english:
                    "If by Mercury, the native will be an expert in singing, dancing and writing, will be a poet and an able orator. He will be conferred honours by tile ruler. will have a brilliant body and will perform famous deeds.",
                hindi: "यदि बुध ग्रह से युति हो तो जातक गायन, नृत्य और लेखन में निपुण, कवि और कुशल वक्ता होगा। उसे शासक द्वारा सम्मान प्राप्त होगा। उसका शरीर तेजस्वी होगा और वह प्रसिद्ध कार्य करेगा।",
            },
            rule:
                planets.Mercury.rasi.rasi_num ===
                NORMALIZE12(planets.Moon.rasi.rasi_num - 1),
        },
        {
            description: {
                english: "Durudhura Yoga caused by Mercury and Jupiter",
                hindi: "बुध और बृहस्पति द्वारा निर्मित दुरुधुर योग",
            },
            effect: {
                english:
                    "Should Jupiter and Mercury be on either side of the Moon, the native will be virtuous, learned in Shastras, garrulous, be a good poet, be wealthy, capable of making sacrifices and be famous.",
                hindi: "यदि बृहस्पति और बुध चन्द्रमा के दोनों ओर हों तो जातक गुणवान, शास्त्रों का ज्ञाता, वाचाल, अच्छा कवि, धनवान, त्याग करने में सक्षम और प्रसिद्ध होगा।",
            },
            rule:
                (planets.Mercury.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) &&
                    planets.Jupiter.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num + 1)) ||
                (planets.Mercury.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) &&
                    planets.Jupiter.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num - 1)),
        },
        {
            description: {
                english: "Durudhura Yoga caused by Mercury and Venus",
                hindi: "बुध और शुक्र से उत्पन्न दुरुधुर योग",
            },
            effect: {
                english:
                    "If Durudhura Yoga is caused by Mercury and Venus, the person will be a sweet speaker, be fortunate, splendourous, beautiful, be fond of dance, singing etc., be served, valiant and be a minister.",
                hindi: "यदि दुरुधुर योग बुध और शुक्र से बनता है तो जातक मधुरभाषी, भाग्यशाली, तेजस्वी, सुंदर, नृत्य, गायन आदि का शौकीन, सेवाभावी, पराक्रमी और मंत्री होता है।",
            },
            rule:
                (planets.Mercury.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) &&
                    planets.Venus.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num + 1)) ||
                (planets.Mercury.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) &&
                    planets.Venus.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num - 1)),
        },
        {
            description: {
                english: "Durudhura Yoga caused by Mercury and Saturn",
                hindi: "बुध और शनि के कारण दुरुधुर योग",
            },
            effect: {
                english:
                    "If Mercury and Saturn plank the Moon, the native will move from one country to the other to earn money. He will not be much educated, will be worshipped by others, but be inimical to his own men.",
                hindi: "यदि बुध और शनि चन्द्रमा पर दृष्टि डालें, तो जातक धन कमाने के लिए एक देश से दूसरे देश जाता रहेगा। वह अधिक शिक्षित नहीं होगा, दूसरों द्वारा पूजित होगा, लेकिन अपने ही लोगों से द्वेष रखेगा।",
            },
            rule:
                (planets.Mercury.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) &&
                    planets.Saturn.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num + 1)) ||
                (planets.Mercury.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) &&
                    planets.Saturn.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num - 1)),
        },
        {
            description: {
                english: "Sunapha Yoga caused by Jupiter",
                hindi: "बृहस्पति द्वारा उत्पन्न सुनफा योग",
            },
            effect: {
                english:
                    "Should Jupiter cause Sunapha Yoga, a person so born will have high learning, will be famous and himself be a king, or dear to a king. He will have a good family and have plenty of wealth.",
                hindi: "यदि बृहस्पति सुनफा योग का निर्माण करता है, तो इस योग में जन्म लेने वाला व्यक्ति उच्च विद्या वाला, प्रसिद्ध, स्वयं राजा या राजा का प्रिय होगा। उसका परिवार उत्तम होगा और उसके पास प्रचुर धन होगा।",
            },
            rule:
                planets.Jupiter.rasi.rasi_num ===
                NORMALIZE12(planets.Moon.rasi.rasi_num + 1),
        },
        {
            description: {
                english: "Anapha Yoga caused by Jupiter",
                hindi: "बृहस्पति के कारण अनफा योग",
            },
            effect: {
                english:
                    "Should the Yoga be caused by Jupiter, the native will be majestic, strong, intelligent, fond of assembly, famous through a king and will be a poet.",
                hindi: "यदि यह योग बृहस्पति से उत्पन्न हो तो जातक प्रतापी, बलवान, बुद्धिमान, सभाप्रिय, राजा द्वारा प्रसिद्ध तथा कवि होगा।",
            },
            rule:
                planets.Jupiter.rasi.rasi_num ===
                NORMALIZE12(planets.Moon.rasi.rasi_num - 1),
        },
        {
            description: {
                english: "Durudhura Yoga caused by Jupiter and Venus",
                hindi: "बृहस्पति और शुक्र के कारण दुरुधुर योग",
            },
            effect: {
                english:
                    "Should Jupiter and Venus cause this Yoga, by being on either side of the Moon, the native will be courageous, intelligent, will have political wisdom, will possess gold and gems, will be famous and be in the employ of a king.",
                hindi: "यदि बृहस्पति और शुक्र चंद्रमा के दोनों ओर स्थित होकर इस योग का निर्माण करते हैं, तो जातक साहसी, बुद्धिमान, राजनीतिक ज्ञान वाला, स्वर्ण और रत्नों का स्वामी, प्रसिद्ध और राजा के अधीन नौकरी करने वाला होगा।",
            },
            rule:
                (planets.Jupiter.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) &&
                    planets.Venus.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num + 1)) ||
                (planets.Jupiter.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) &&
                    planets.Venus.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num - 1)),
        },
        {
            description: {
                english: "Durudhura Yoga caused by Jupiter and Saturn",
                hindi: "बृहस्पति और शनि के कारण दुरुधुर योग",
            },
            effect: {
                english:
                    "If Jupiter and Saturn be such planets, as to cause Durudhura Yoga the native will be happy, will have knowledge of politics, will be sweet in speech, learned, peaceful, wealthy and good looking.",
                hindi: "यदि बृहस्पति और शनि ऐसे ग्रह हों जो दुरुधुर योग का निर्माण करते हों तो जातक सुखी, राजनीति का जानकार, मधुर वाणी वाला, विद्वान, शांत, धनवान और सुंदर होगा।",
            },
            rule:
                (planets.Jupiter.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) &&
                    planets.Saturn.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num + 1)) ||
                (planets.Jupiter.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) &&
                    planets.Saturn.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num - 1)),
        },
        {
            description: {
                english: "Sunapha Yoga caused by Venus",
                hindi: "शुक्र के कारण सुनफा योग",
            },
            effect: {
                english:
                    "Venus will give wife, lands, wealth, prowess, quadrupeds and valour. The native will further be honoured by king and will also be courageous.",
                hindi: "शुक्र जातक को पत्नी, भूमि, धन, पराक्रम, चतुर्भुज और वीरता प्रदान करेगा। जातक राजा द्वारा सम्मानित होगा और साहसी भी होगा।",
            },
            rule:
                planets.Venus.rasi.rasi_num ===
                NORMALIZE12(planets.Moon.rasi.rasi_num + 1),
        },
        {
            description: {
                english: "Anapha Yoga caused by Venus",
                hindi: "शुक्र के कारण अनफा योग",
            },
            effect: {
                english:
                    "Venus causing this Yoga gives an exceedingly great liking for women. The native will be dear to the king and will enjoy pleasures. He will be splendourous, famous and will have abundant gold.",
                hindi: "इस योग का कारण बनने वाला शुक्र जातक को स्त्रियों के प्रति अत्यधिक आकर्षण प्रदान करता है। जातक राजा का प्रिय और सुख-सुविधाओं का आनंद लेने वाला होता है। वह वैभवशाली, प्रसिद्ध और प्रचुर स्वर्ण से युक्त होता है।",
            },
            rule:
                planets.Venus.rasi.rasi_num ===
                NORMALIZE12(planets.Moon.rasi.rasi_num - 1),
        },
        {
            description: {
                english: "Durudhura Yoga caused by Venus and Saturn",
                hindi: "शुक्र और शनि के कारण दुरुधुर योग",
            },
            effect: {
                english:
                    "One, who has Durudhura Yoga caused by Venus and Saturn will conduct himself, like an old man (i.e. so mature), be chief in his race, skillful, dear to women and will have plenty of money. He will be honoured by the king and gather abundant wealth.",
                hindi: "शुक्र और शनि से उत्पन्न दुरुधुर योग वाले जातक का आचरण वृद्ध (अर्थात परिपक्व) जैसा होगा, वह अपने कुल में प्रधान, कुशल, स्त्रियों का प्रिय और धनवान होगा। राजा द्वारा सम्मानित होगा और प्रचुर धन अर्जित करेगा।",
            },
            rule:
                (planets.Venus.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num - 1) &&
                    planets.Saturn.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num + 1)) ||
                (planets.Venus.rasi.rasi_num ===
                    NORMALIZE12(planets.Moon.rasi.rasi_num + 1) &&
                    planets.Saturn.rasi.rasi_num ===
                        NORMALIZE12(planets.Moon.rasi.rasi_num - 1)),
        },
        {
            description: {
                english: "Sunapha Yoga caused by Saturn",
                hindi: "शनि के कारण सुनफा योग",
            },
            effect: {
                english:
                    "Should Saturn be in the 2nd of the Moon causing Sunapha Yoga, the native will be skillful, be worshipped by the people in his village and city and will have wealth galore. He will be devoted to his work and be brave.",
                hindi: "यदि शनि चन्द्रमा के द्वितीय भाव में हो और सुनफा योग बना रहा हो, तो जातक कुशल होगा, अपने गाँव और शहर के लोगों द्वारा पूजित होगा, उसके पास प्रचुर धन होगा। वह अपने कार्य के प्रति समर्पित और साहसी होगा।",
            },
            rule:
                planets.Saturn.rasi.rasi_num ===
                NORMALIZE12(planets.Moon.rasi.rasi_num + 1),
        },
        {
            description: {
                english: "Anapha Yoga caused by Saturn",
                hindi: "शनि के कारण अनफा योग",
            },
            effect: {
                english:
                    "If Saturn causes this Yoga, the subject will be broad-shouldered, be a leader, be indired to keep up his commitments, be rich with quadrupeds, devoted to an infamous lady and be virtuous.",
                hindi: "यदि शनि इस योग का कारण बनता है, तो व्यक्ति चौड़े कंधों वाला, नेता होगा, अपनी प्रतिबद्धताओं को बनाए रखने के लिए प्रेरित होगा, चौपायों से समृद्ध होगा, बदनाम महिला के प्रति समर्पित होगा और गुणी होगा।",
            },
            rule:
                planets.Saturn.rasi.rasi_num ===
                NORMALIZE12(planets.Moon.rasi.rasi_num - 1),
        },
    ];

    return effectTable.filter(entry => entry.rule); // keep only where rule is true
}
