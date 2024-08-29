import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [answers, setAnswers] = useState({});
  const [symptoms, setSymptoms] = useState([]);
  const [results, setResults] = useState(null);
const questions = {
    "รสชาติอาหารที่ชอบ": {
      "ปิตตะ": "ชอบกินของร้อนๆ เผ็ด เปรี้ยว รสจัด ",
      "วาตะ": "ร้อน ฝาด ขม รสเค็ม (เครื่องเทศ เครื่องแกง)",
      "เสมหะ": "เปรี้ยว หวาน มัน"
    },
    "อาหาร": {
      "ปิตตะ": "ของดิบ ของหมักดอง แอลกอฮอล์",
      "วาตะ": "กินเนื้อแห้ง ปลาแห้ง น้ำอัดลม",
      "เสมหะ": "กินหวานมัน กินยำ กินหลากหลาย น้ำหวาน ขนมหวาน"
    },
    "การกิน": {
      "ปิตตะ": "กินทีละมากๆ กินเป็นมื้อๆ กินกลางคืน",
      "วาตะ": "กินบ่อย กินเก่ง หิวบ่อย",
      "เสมหะ": "กินน้อย กินเหลือ กินช้า"
    },
    "น้ำ": {
      "ปิตตะ": "ดื่มน้ำน้อย กระหายน้ำเย็น",
      "วาตะ": "ไม่ค่อยดื่มน้ำ",
      "เสมหะ": "ดื่มน้ำมาก ชอบน้ำอุ่นๆ"
    },
    "อุจจาระ": {
      "ปิตตะ": "แข็งแห้ง ถ่ายลำบาก",
      "วาตะ": "ท้องผูก ถ่ายบ่อย ถ่ายไม่สุด",
      "เสมหะ": "อุจจาระปกติ ถ่ายวันละครั้ง"
    },
    "ปัสสาวะ": {
      "ปิตตะ": "ปัสสาวะร้อน สีเข้ม ฉี่น้อย",
      "วาตะ": "ปัสสาวะบ่อย กระปริบกระปรอย",
      "เสมหะ": "ปัสสาวะครั้งละมากๆ สีซีด ปัสสาวะกลางคืน"
    },
    "ลักษณะการทำงาน": {
      "ปิตตะ": "ทำงานหนัก ใช้แรงงาน ทำงานกลางแจ้ง นักกีฬา คนออกกำลังกาย",
      "วาตะ": "ทำงานนิ่งๆ ทำงานนั่งโต๊ะ ไม่ค่อยได้ขยับ",
      "เสมหะ": "ทำงานเบาๆ พอดีๆ สบายๆ นั่งๆนอนๆ ทำงานห้องแอร์"
    },
    "อารมณ์": {
      "ปิตตะ": "อารมณ์เสีย โกรธง่าย โมโหง่าย มักโกรธเมื่อตะวันเที่ยง อากาศร้อน หงุดหงิดง่าย",
      "วาตะ": "คิดมาก คิดเยอะ ชอบดูแสงสีเสียง มักกล่าวเรื่องเศร้าโศก อารมณ์แปรปรวน",
      "เสมหะ": "อารมณ์ดี ยิ้มง่าย ชอบอารมณ์นิยมกลืน ใจเย็น คุยเก่ง อัธยาศัยดี"
    },
    "การพูดการคุย": {
      "ปิตตะ": "คุยใช้เหตุผล พูดจาหนักแน่น",
      "วาตะ": "คุยไร้สาระ เนื้อหาไม่เรียบเรียง พูดเร็ว",
      "เสมหะ": "พูดช้า"
    },
    "สมาธิ": {
      "ปิตตะ": "สมาธิจดจ่อ ทำงานละเอียด",
      "วาตะ": "สมาธิสั้น ทำอะไรไม่ได้นาน ย้ำคิดย้ำทำ ทำอะไรหลายอย่างในเวลาเดียวกัน",
      "เสมหะ": "สมาธิดี ทำงานได้นาน"
    },
    "อากาศ": {
      "ปิตตะ": "ชอบอยู่ที่ร้อนๆ",
      "วาตะ": "ชอบอยู่ที่ที่ลมพัด อากาศถ่ายเท",
      "เสมหะ": "ชอบอยู่ที่เย็นๆ ชื้นๆ"
    },
    "อาบน้ำ": {
      "ปิตตะ": "ชอบอาบน้ำร้อน อาบน้ำตอนกลางวันร้อนๆ หรืออาบน้ำดึกๆ",
      "วาตะ": "อาบน้ำเร็ว ไม่ค่อยอาบน้ำ",
      "เสมหะ": "ชอบแช่น้ำ เล่นน้ำ อาบน้ำนาน"
    },
    "การนอน": {
      "ปิตตะ": "นอนกลางวันมาก กลางคืนนอนไม่หลับ",
      "วาตะ": "กลางคืนไม่นอน ชอบคิดฟุ้งซ่าน หลับไม่สนิท",
      "เสมหะ": "ง่วงหงาวหาวนอนนัก นอนเยอะ หลับสนิท"
    },
    "ความฝัน": {
      "ปิตตะ": "ฝันน่ากลัว ผี ปีศาจ ไฟ ความร้อน",
      "วาตะ": "ฝันตื่นเต้น ฝันเยอะ ฝันว่าตกจากที่สูง",
      "เสมหะ": "ฝันดี ฝันว่าได้ว่ายน้ำนอนสระน้ำ เห็นของสวยๆงามๆ"
    },
    "ลักษณะร่างกาย": {
      "ปิตตะ": "ผิวแห้ง ร้อนหน้าร้อนปาก เหงื่อออกน้อย ผิวไม่ผ่องใส",
      "วาตะ": "ผื่นลมพิษทั่วตัว แสบคัน ผิวดำไม่ผ่องใส",
      "เสมหะ": "มักเป็นตุ่ม ฝีกบวม เหงื่อออกมาก"
    }
  };

  const clinicalSymptoms = {
    "ปิตตะ": ["ร้อนใน", "ปากขม", "กระหายน้ำ", "โรคกระเพาะ", "กรดไหลย้อน", "โรคตับ", "ถุงน้ำดี", "ความดันโลหิตสูง", "ตาแห้ง", "เยื่อบุตาอักเสบ", "ท้องผูกพรรดึก", "ไมเกรน"],
    "วาตะ": ["ปวดเมื่อยตามร่างกาย", "โรคทางเดินหายใจ", "หอบหืด", "ภูมิแพ้", "ท้องอืด", "แน่นท้อง", "ลำไส้แปรปรวน", "นอนไม่หลับ", "หลับไม่สนิท", "วิตกกังวล", "อารมณ์แปรปรวน", "ข้อต่อกระดูก", "ชา ปลายประสาทอักเสบ"],
    "เสมหะ": ["อ้วน", "ซึมเศ้รา", "เบาหวาน", "ไขมัน", "มือเย็น เท้าเย็น", "เป็นหวัดบ่อย", "อ่อนเพลีย ล้า เหนื่อยง่าย"]
  };

const handleAnswerChange = useCallback((category, value) => {
    setAnswers(prev => ({ ...prev, [category]: value }));
  }, []);

  const handleSymptomChange = useCallback((symptom) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
 const scores = { "ปิตตะ": 0, "วาตะ": 0, "เสมหะ": 0 };
    
    // คำนวณคะแนนจากคำตอบ
    Object.values(answers).forEach(element => {
      scores[element]++;
    });

    // หาธาตุเด่น
    const dominantElement = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

    // วิเคราะห์ความสัมพันธ์
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const dominantRatio = scores[dominantElement] / totalScore;
    
    const totalSymptoms = clinicalSymptoms[dominantElement].length;
    const userSymptomsCount = symptoms.filter(symptom => 
      clinicalSymptoms[dominantElement].includes(symptom)
    ).length;
    
    const symptomRatio = totalSymptoms > 0 ? userSymptomsCount / totalSymptoms : 0;
    
    const correlation = (dominantRatio + symptomRatio) / 2;

    // ประเมินความเสี่ยงและคำอธิบาย
    let riskLevel, explanation;
    if (correlation <= 0.5) {
      riskLevel = "ไม่มีความเสี่ยงที่ควรเฝ้าระวัง";
      explanation = "ธาตุเด่นของคุณไม่มีความสัมพันธ์มากนักกับอาการทางคลินิกที่พบ คุณควรดูแลสุขภาพตามปกติและสังเกตอาการเปลี่ยนแปลงต่างๆ";
    } else if (correlation <= 0.8) {
      riskLevel = "มีความเสี่ยงในระดับเฝ้าระวัง";
      explanation = "ธาตุเด่นของคุณมีความสัมพันธ์ในระดับปานกลางกับอาการทางคลินิกที่พบ คุณควรเฝ้าระวังและดูแลสุขภาพอย่างใกล้ชิด หากมีอาการรุนแรงขึ้น ควรปรึกษาแพทย์";
    } else {
      riskLevel = "มีความเสี่ยงมาก โปรดพบแพทย์เพื่อประเมินเพิ่มเติม";
      explanation = "ธาตุเด่นของคุณมีความสัมพันธ์สูงกับอาการทางคลินิกที่พบ คุณควรพบแพทย์เพื่อรับการตรวจประเมินอย่างละเอียด อาจจำเป็นต้องได้รับการรักษาหรือการดูแลเฉพาะทาง";
    }

   setResults({
      scores,
      dominantElement,
      correlation,
      riskLevel,
      explanation,
      userSymptoms: symptoms
    });
  };
 }, [answers, symptoms]);

return (
    <div className={styles.container}>
      <Head>
        <title>แบบประเมินธาตุเด่นตามหลักการแพทย์แผนไทย</title>
        <meta name="description" content="แบบประเมินธาตุเด่นตามหลักการแพทย์แผนไทยจากคัมภีร์ธาตุวิวรรณ์" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>แบบประเมินธาตุเด่นตามหลักการแพทย์แผนไทยจากคัมภีร์ธาตุวิวรรณ์</h1>
        <p className={styles.description}>โปรดตอบคำถามตามโดยเลือกตัวเลือกที่ตรงกับพฤติกรรมของท่านมากที่สุด</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {Object.entries(questions).map(([category, options]) => (
            <div key={category} className={styles.questionGroup}>
              <h3 className={styles.questionTitle}>{category}</h3>
              {Object.entries(options).map(([element, description]) => (
                <label key={element} className={styles.optionLabel}>
                  <input
                    type="radio"
                    name={category}
                    value={element}
                    onChange={() => handleAnswerChange(category, element)}
                    required
                    className={styles.radioInput}
                  />
                  <span>{description}</span>
                </label>
              ))}
            </div>
          ))}

          <div className={styles.questionGroup}>
            <h3 className={styles.questionTitle}>อาการทางคลินิก</h3>
            {Object.entries(clinicalSymptoms).map(([element, symptomList]) => (
              <div key={element} className={styles.symptomGroup}>
                <h4 className={styles.symptomTitle}>{element}</h4>
                {symptomList.map(symptom => (
                  <label key={symptom} className={styles.optionLabel}>
                    <input
                      type="checkbox"
                      value={symptom}
                      onChange={() => handleSymptomChange(symptom)}
                      className={styles.checkboxInput}
                    />
                    <span>{symptom}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>

          <button type="submit" className={styles.submitButton}>
            ประเมินผล
          </button>
        </form>

        {results && (
          <div className={styles.results}>
            <h2 className={styles.resultsTitle}>ผลการประเมิน</h2>
            <p><strong>ธาตุเด่นของคุณคือ:</strong> {results.dominantElement}</p>
            <div>
              <strong>คะแนนของแต่ละธาตุ:</strong>
              <ul className={styles.scoreList}>
                {Object.entries(results.scores).map(([element, score]) => (
                  <li key={element}>{element}: {score}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>อาการทางคลินิกที่พบ:</strong>
              <ul className={styles.symptomList}>
                {results.userSymptoms.length > 0 ? (
                  results.userSymptoms.map(symptom => <li key={symptom}>{symptom}</li>)
                ) : (
                  <li>ไม่พบอาการทางคลินิกที่เลือก</li>
                )}
              </ul>
            </div>
            <p><strong>ค่าความเชื่อมโยงระหว่างธาตุเด่นและอาการทางคลินิก:</strong> {results.correlation.toFixed(2)}</p>
            <p><strong>การประเมินความเสี่ยง:</strong> {results.riskLevel}</p>
            <p><strong>คำอธิบายเพิ่มเติม:</strong> {results.explanation}</p>
          </div>
        )}
      </main>
    </div>
  );
}
