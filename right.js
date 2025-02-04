// เก็บตัวแปรหลัก
let playerName = "";
let score = 0;            // คะแนนที่ได้จากการเล่นรอบนี้
let totalScore = 0;       // คะแนนสะสม
let currentQuestion = 0;
let totalQuestions = 5;   // จำนวนข้อทั้งหมด

// โครงสร้างข้อมูลคำถาม
const fullQuestionBank = [
    {
        question: "ก่อนคะน้าจะออกจากบ้านเพื่อไปทําธุระ คะน้าพบว่าข้างนอกมีฝนตกท้องฟ้าครึ้ม หากจะออกจากบ้านคะน้าควรพกอะไรไปเพื่อไม่เปียกฝน",
        answers: ["กาละมัง", "ร่ม", "พัดลม"],
        correct: 1,
        image: "img/home2/1.png"
    },
    {
        question: "คะน้ากําลังจะไปศึกษาป่าไม้ในป่า แต่เขากลัวว่าจะลืมสิ่งสําคัญไป เขาควรพกอะไรไปเพื่อไม่ให้เกิดปัญหาในการเดินทาง",
        answers: ["กะละมัง", "พัดลม", "แผนที่"],
        correct: 2,
        image: "img/home2/2.png"
    },
    {
        question: "บีมเดินไปโรงเรียนแล้วเห็นเพื่อนทำกระเป๋าสตางค์ตกอยู่บนพื้น เขาควรทำอย่างไร?",
        answers: ["เดินผ่านไปเฉยๆ", "เก็บไว้ใช้เอง", "เก็บกระเป๋าสตางค์แล้วนำไปให้คุณครู"],
        correct: 2,
        image: "img/home2/3.png"
    },
    {
        question: "ข้าวฟ่างกำลังทำการบ้านวิชาคณิตศาสตร์อยู่ แต่มีโจทย์ที่เธอทำไม่ได้ เธอควรทำอย่างไร?",
        answers: ["เดาสุ่มคำตอบ", "ถามคุณครูหรือเพื่อน", "ข้ามไปไม่ต้องทำ"],
        correct: 1,
        image: "img/home2/4.png"
    },
    {
        question: "เปรมกำลังจะเดินข้ามถนน แต่ไม่มีสะพานลอย เขาควรทำอย่างไร?",
        answers: ["มองซ้ายขวาแล้วข้ามอย่างระมัดระวัง", "ข้ามไปเลยโดยไม่ดูรถ", "วิ่งข้ามถนนเร็วๆ"],
        correct: 0,
        image: "img/home2/5.png"
    },
    {
        question: "ต้นกล้ากำลังเดินเล่นในสวนสาธารณะและพบลูกสุนัขหลงทาง เขาควรทำอย่างไร?",
        answers: ["ปล่อยไว้เฉยๆ", "แจ้งเจ้าหน้าที่สวนสาธารณะ", "พากลับบ้านทันที"],
        correct: 1,
        image: "img/home2/6.png"
    },
    {
        question: "ใบตองเห็นเพื่อนในชั้นถูกรังแกที่โรงเรียน เธอควรทำอย่างไร?",
        answers: ["เดินหนีไปไม่สนใจ", "บอกคุณครูให้ช่วย", "สมทบแกล้งเพื่อน"],
        correct: 1,
        image: "img/home2/7.png"
    },
    {
        question: "ฟ้าใสทำดินสอหักในระหว่างเรียน เธอควรทำอย่างไร?",
        answers: ["รอจนหมดคาบแล้วค่อยทำใหม่", "ขอยืมเพื่อนหรือใช้ดินสอสำรอง", "หยุดเรียนไปเลย"],
        correct: 1,
        image: "img/home2/8.png"
    },
    {
        question: "มิกกี้พบว่าของเล่นที่เขาชอบหายไปจากโต๊ะเรียน เขาควรทำอย่างไร?",
        answers: ["ถามเพื่อนๆ ว่าใครเห็นของเล่น", "กล่าวโทษเพื่อนโดยไม่มีหลักฐาน", "ลืมมันไปและไม่ทำอะไร"],
        correct: 0,
        image: "img/home2/9.png"
    },
    {
        question: "กานต์เห็นเพื่อนลืมปิดฝาขวดน้ำในกระเป๋าของเขา เธอควรทำอย่างไร?",
        answers: ["บอกเพื่อนให้ปิดฝาขวดน้ำให้ดี", "แกล้งให้ขวดน้ำล้มเพื่อให้เขารู้ตัว", "ไม่สนใจ เพราะไม่ใช่เรื่องของเรา"],
        correct: 0,
        image: "img/home2/10.png"
    },
    {
        question: "พีทต้องการเก็บเงินซื้อจักรยาน เขาควรทำอย่างไร?",
        answers: ["ขอเงินจากพ่อแม่ทั้งหมด", "ออมเงินและหยอดกระปุกทุกวัน", "ไม่เก็บเงินและรอให้มีคนซื้อให้"],
        correct: 1,
        image: "img/home2/11.png"
    },
    {
        question: "พลอยต้องทำความสะอาดห้อง แต่ว่าเธอไม่อยากทำ เธอควรทำอย่างไร?",
        answers: ["ปล่อยห้องให้รกต่อไป", "ให้พ่อแม่ทำแทน", "แบ่งงานเป็นส่วนเล็กๆ แล้วทำทีละนิด"],
        correct: 2,
        image: "img/home2/12.png"
    },
    {
        question: "เก่งต้องการทำให้ตัวเองแข็งแรงขึ้น เขาควรทำอะไร?",
        answers: ["ออกกำลังกายและกินอาหารที่ดี", "นั่งเล่นเกมทั้งวัน", "กินแต่ขนมและน้ำอัดลม"],
        correct: 0,
        image: "img/home2/13.png"
    },
    {
        question: "ฟางเห็นเพื่อนลืมปิดไฟห้องเรียนก่อนออกจากห้อง เธอควรทำอย่างไร?",
        answers: ["เรียกเพื่อนกลับมาปิดเอง", "ปิดไฟให้เพื่อประหยัดพลังงาน", "ไม่ต้องปิด เพราะไม่ใช่หน้าที่ของเธอ"],
        correct: 1,
        image: "img/home2/14.png"
    },
    {
        question: "เอกอยากได้โทรศัพท์ใหม่แต่พ่อแม่บอกว่ายังไม่จำเป็น เขาควรทำอย่างไร?",
        answers: ["งอแงให้พ่อแม่ซื้อให้", "ขโมยเงินไปซื้อเอง", "ใช้โทรศัพท์เครื่องเก่าต่อไป"],
        correct: 2,
        image: "img/home2/15.png"
    },
    {
        question: "มินต้องการทำให้เพื่อนสนิทมีความสุขในวันเกิด เธอควรทำอะไร?",
        answers: ["ขอของขวัญจากเพื่อนแทน", "ทำการ์ดอวยพรและให้ของขวัญ", "ไม่ต้องทำอะไร เพราะไม่สำคัญ"],
        correct: 1,
        image: "img/home2/16.png"
    },
    {
        question: "ดิวลืมเอาการบ้านมาโรงเรียน เขาควรทำอย่างไร?",
        answers: ["แต่งเรื่องโกหกว่าหาย", "ขโมยการบ้านเพื่อน", "บอกคุณครูตามตรง"],
        correct: 2,
        image: "img/home2/17.png"
    },
    {
        question: "แพรวาเห็นสุนัขจรจัดข้างถนน เธอควรทำอย่างไร?",
        answers: ["แกล้งให้มันตกใจ", "พามันกลับบ้านทันที", "แจ้งศูนย์ช่วยเหลือสัตว์"],
        correct: 2,
        image: "img/home2/18.png"
    },
    {
        question: "ต้นกล้าอยากช่วยพ่อแม่ทำงานบ้าน เขาควรเริ่มจากอะไร?",
        answers: ["รอพ่อแม่บอกให้ทำ", "ทำลายข้าวของเพื่อไม่ต้องทำงาน", "เก็บของเล่นให้เรียบร้อย"],
        correct: 2,
        image: "img/home2/19.png"
    },
    {
        question: "น้ำฝนเห็นขยะถูกทิ้งเกลื่อนอยู่บนพื้นสนามเด็กเล่น เธอควรทำอย่างไร?",
        answers: ["เดินผ่านไปโดยไม่สนใจ", "เก็บขยะไปทิ้งลงถังขยะ", "เตะขยะให้กระจายมากขึ้น"],
        correct: 1,
        image: "img/home2/21.png"
    },
    {
        question: "บอลต้องการเตรียมตัวสำหรับการสอบครั้งใหญ่ เขาควรทำอย่างไร?",
        answers: ["อ่านหนังสือล่วงหน้าและทบทวนทุกวัน", "รอคืนก่อนสอบแล้วอ่านทั้งหมด", "ไม่ต้องอ่านเลย ใช้เดาสุ่ม"],
        correct: 0,
        image: "img/home2/22.png"
    },
    {
        question: "มะปรางต้องการช่วยแม่ทำกับข้าว แต่ไม่เคยทำมาก่อน เธอควรทำอย่างไร?",
        answers: ["ขอให้แม่สอนและช่วยทำตามขั้นตอน", "ทำเองเลยโดยไม่ถาม", "เล่นมือถือแทนแล้วให้แม่ทำคนเดียว"],
        correct: 0,
        image: "img/home2/23.png"
    },
    {
        question: "บาสกำลังจะเดินกลับบ้านคนเดียวตอนค่ำ เขาควรทำอย่างไรเพื่อความปลอดภัย?",
        answers: ["เดินทางลัดผ่านซอยเปลี่ยว", "ใส่หูฟังเสียงดังและไม่สนใจรอบข้าง", "เดินในที่สว่างและบอกผู้ปกครองให้รู้"],
        correct: 2,
        image: "img/home2/24.png"
    },
    {
        question: "แพทต้องนำเสนองานหน้าชั้นเรียน แต่เธอรู้สึกประหม่า เธอควรทำอย่างไร?",
        answers: ["ไม่ต้องซ้อม พูดไปตามใจชอบ", "บอกคุณครูว่าไม่กล้าพูดแล้วไม่ต้องนำเสนอ", "ฝึกซ้อมล่วงหน้าหลายครั้งเพื่อให้มั่นใจ"],
        correct: 2,
        image: "img/home2/25.png"
    },
    {
        question: "หมูปิ้งกำลังเล่นเกมในโทรศัพท์ แต่พ่อแม่บอกให้หยุดเล่นแล้วไปอาบน้ำ เขาควรทำอย่างไร?",
        answers: ["หยุดเล่นและทำตามที่พ่อแม่บอก", "แอบเล่นต่อโดยไม่สนใจ", "โกหกพ่อแม่ว่าขออีก 5 นาทีแล้วเล่นต่ออีกนาน"],
        correct: 0,
        image: "img/home2/26.png"
    },
    {
        question: "เจเห็นเพื่อนใหม่ที่ย้ายมาโรงเรียนและยังไม่มีเพื่อน เขาควรทำอย่างไร?",
        answers: ["เข้าไปชวนเพื่อนใหม่คุยและเล่นด้วย", "ไม่สนใจและเล่นกับกลุ่มของตัวเอง", "แกล้งเพื่อนใหม่ให้รู้ว่าใครเป็นหัวหน้า"],
        correct: 0,
        image: "img/home2/27.png"
    },
    {
        question: "ฟอร์ดต้องทำงานกลุ่มแต่เพื่อนบางคนไม่ช่วยทำงานเลย เขาควรทำอย่างไร?",
        answers: ["ทำคนเดียวทั้งหมดแล้วโกรธเพื่อน", "คุยกับเพื่อนและแบ่งงานให้ชัดเจน", "ปล่อยให้คนอื่นทำไป ไม่ช่วยเลย"],
        correct: 1,
        image: "img/home2/28.png"
    },
    {
        question: "ซันต้องการเรียนรู้ภาษาอังกฤษให้เก่งขึ้น เขาควรทำอย่างไร?",
        answers: ["ฝึกพูด ฟัง อ่าน เขียนเป็นประจำ", "ไม่ต้องฝึก ใช้แค่ตอนสอบพอ", "รอให้เก่งเองโดยไม่ต้องทำอะไร"],
        correct: 0,
        image: "img/home2/29.png"
    },
    {
        question: "มายด์เห็นเพื่อนทิ้งอาหารเหลือทิ้งเป็นจำนวนมากที่โรงอาหาร เธอควรทำอย่างไร?",
        answers: ["ไม่สนใจ เพราะไม่ใช่เรื่องของเธอ", "แนะนำให้เพื่อนตักอาหารเท่าที่กินไหว", "หัวเราะเยาะเพื่อนที่ทิ้งอาหาร"],
        correct: 1,
        image: "img/home2/30.png"
    },
    {
        question: "นายคะน้าจะเดินทางไปหาคุณตาที่อยู่ในหมู่บ้านที่ห่างไกล และมีฝนตกหนักตลอดเส้นทาง เขาควรพกอะไรเพิ่มไปจากสิ่งที่เตรียมไปแล้วเพื่อความสะดวกในการเดินทาง?",
        answers: ["เสื้อกันฝน", "กระติกน้ำ", "หมอน"],
        correct: 0,
        image: "img/home2/20.png"
    },

];

// เก็บดัชนีของคำถามที่เคยใช้แล้ว (ไม่ให้ซ้ำ)
let usedIndices = [];

// ตัวแปร 5 ข้อที่จะใช้ในรอบนี้
let questions = [];

/* ======================== ฟังก์ชันต่างๆ ======================== */

function goToStart() {
    window.location.href = "start.html";
}

// ฟังก์ชันสุ่มคำถาม โดยไม่เอาข้อที่เคยใช้แล้วซ้ำ
function getRandomQuestions(count) {
    let availableIndices = [];
    for (let i = 0; i < fullQuestionBank.length; i++) {
        if (!usedIndices.includes(i)) {
            availableIndices.push(i);
        }
    }

    // ถ้าเหลือคำถามไม่พอ ให้รีเซ็ต
    if (availableIndices.length < count) {
        usedIndices = [];
        availableIndices = fullQuestionBank.map((_, idx) => idx);
    }

    // สุ่มจาก availableIndices
    let chosenIndices = [];
    for (let i = 0; i < count; i++) {
        let randPos = Math.floor(Math.random() * availableIndices.length);
        let questionIndex = availableIndices[randPos];
        chosenIndices.push(questionIndex);
        availableIndices.splice(randPos, 1);
    }

    // บันทึกว่าใช้แล้ว
    usedIndices.push(...chosenIndices);

    // สร้างอาร์เรย์ "questions"
    let resultQuestions = chosenIndices.map(idx => fullQuestionBank[idx]);
    return resultQuestions;
}

// --- เริ่มเกม ---
function startGame() {
    playerName = document.getElementById("player-name").value.trim();
    if (!playerName) {
        alert("โปรดกรอกชื่อผู้เล่น");
        return;
    }

    // โหลดคะแนนสะสม
    if (localStorage.getItem(playerName)) {
        totalScore = parseInt(localStorage.getItem(playerName));
    } else {
        totalScore = 0;
    }

    // เช็ก owned backgrounds
    if (!localStorage.getItem(playerName + "_owned")) {
        localStorage.setItem(playerName + "_owned", JSON.stringify([]));
    }
    // เช็ก using
    if (!localStorage.getItem(playerName + "_using")) {
        localStorage.setItem(playerName + "_using", "0");
    }

    score = 0;

    // สุ่ม 5 ข้อใหม่
    questions = getRandomQuestions(totalQuestions);
    currentQuestion = 0;

    // อัปเดตหน้าจอ
    document.getElementById("player-name-display").textContent = playerName;
    document.getElementById("earned-score").textContent = score;
    document.getElementById("total-questions").textContent = totalQuestions;

    // เปิดหน้าเกม
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("game-screen").style.display = "block";

    loadQuestion();
    updateBackground();
}

// --- โหลดคำถาม ---
function loadQuestion() {
    let qData = questions[currentQuestion];
    document.getElementById("question").textContent = qData.question;
    document.getElementById("question-image").src = qData.image || "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("question-number").textContent = currentQuestion + 1;

    // สร้างปุ่มตัวเลือก
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
    qData.answers.forEach((ans, idx) => {
        const btn = document.createElement("button");
        btn.textContent = ans;
        btn.onclick = () => checkAnswer(idx);
        choicesDiv.appendChild(btn);
    });
}

// ฟังก์ชันเล่นเสียงเมื่อผู้เล่นตอบผิดหรือถูก
function playSound(correct) {
    let audio = new Audio(correct ? "img/home2/c1.mp3" : "img/home2/e1.mp3");
    audio.play();
}

// --- ตรวจคำตอบ ---
function checkAnswer(answerIndex) {
    const correctIdx = questions[currentQuestion].correct;
    const feedback = document.getElementById("feedback");
    const choiceButtons = document.querySelectorAll("#choices button");

    // disable ปุ่มทั้งหมดหลังเลือก
    choiceButtons.forEach(btn => (btn.disabled = true));

    // เล่นเสียงและเปลี่ยนสีปุ่ม
    if (answerIndex === correctIdx) {
        score++;
        document.getElementById("earned-score").textContent = score;
        feedback.textContent = "ถูกต้อง! เก่งจริง ๆ";
        choiceButtons[correctIdx].classList.add("correct");
        playSound(true); // เล่นเสียงตอบถูก
    } else {
        feedback.textContent = "พยายามได้ดี! คำตอบที่ถูกคือ: " + questions[currentQuestion].answers[correctIdx];
        choiceButtons[answerIndex].classList.add("incorrect");
        choiceButtons[correctIdx].classList.add("correct");
        playSound(false); // เล่นเสียงตอบผิด
    }

    currentQuestion++;

    // แสดงคำถามข้อต่อไปภายใน 2 วินาที (2000 มิลลิวินาที)
    setTimeout(() => {
        if (currentQuestion < totalQuestions) {
            loadQuestion();
        } else {
            // ตอบครบ 5 ข้อ แสดงหน้าสรุปคะแนน
            totalScore += score;
            localStorage.setItem(playerName, totalScore);
            goToScoreSummary();
        }
    }, 1000);
}

// --- ฟังก์ชันอ่านออกเสียงโจทย์ (TTS) ---
function playQuestionTTS() {
    if (!("speechSynthesis" in window)) {
        alert("เบราว์เซอร์นี้ไม่รองรับระบบอ่านออกเสียง");
        return;
    }
    let qData = questions[currentQuestion];
    let utterThis = new SpeechSynthesisUtterance(qData.question);
    utterThis.lang = "th-TH";
    window.speechSynthesis.speak(utterThis);
}

// --- ไปหน้าสรุปคะแนน ---
function goToScoreSummary() {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("score-summary").style.display = "block";

    document.getElementById("summary-player-name").textContent = playerName;
    document.getElementById("final-score").textContent = score + " คะแนน";

    // เงื่อนไขกำหนดข้อความชมตามคะแนน
    if (score >= 0 && score <= 2) {
        document.getElementById("compliment-text").textContent = "พยายามอีกนิดนะ!";
    } else if (score >= 3 && score <= 4) {
        document.getElementById("compliment-text").textContent = "ทำได้ดีมาก!";
    } else if (score >= 5 && score <= 10) {
        document.getElementById("compliment-text").textContent = "ยอดเยี่ยมไปเลย!!";
    } else {
        document.getElementById("compliment-text").textContent = "ลองอีกครั้ง!";
    }

    updateBackground();
}

// --- เล่นอีกครั้ง ---
function restartGame() {
    document.getElementById("score-summary").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    startGame();
}

// --- กลับหน้าหลัก ---
function goToMainMenu() {
    document.getElementById("score-summary").style.display = "none";
    document.getElementById("shop-screen").style.display = "none";
    document.getElementById("main-menu").style.display = "block";
    updateBackground();
}

// --- ไปหน้าร้านค้า ---
function goToShop() {
    // ดึงค่าชื่อผู้เล่นใหม่จาก input
    let typedName = document.getElementById("player-name").value.trim();
    if (typedName) {
        playerName = typedName; // อัปเดตค่าชื่อผู้เล่น

        // โหลดคะแนนของผู้เล่นใหม่
        if (localStorage.getItem(playerName)) {
            totalScore = parseInt(localStorage.getItem(playerName));
        } else {
            totalScore = 0;
        }

        // ตรวจสอบและตั้งค่าพื้นหลังที่เป็นเจ้าของ
        if (!localStorage.getItem(playerName + "_owned")) {
            localStorage.setItem(playerName + "_owned", JSON.stringify([]));
        }
        if (!localStorage.getItem(playerName + "_using")) {
            localStorage.setItem(playerName + "_using", "0");
        }
    }

    // อัปเดตค่าบนหน้าร้านค้า
    document.getElementById("shop-player-name").textContent = playerName;
    document.getElementById("shop-score").textContent = totalScore;

    // แสดงหน้าร้านค้าและซ่อนหน้าปัจจุบัน
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("score-summary").style.display = "none";
    document.getElementById("shop-screen").style.display = "block";

    updateOwnedButtons();
    updateBackground();
}

// --- ซื้อพื้นหลัง ---
function buyBackground(index) {
    if (!playerName) {
        alert("กรุณากรอกชื่อผู้เล่นก่อนซื้อสินค้า!");
        return;
    }

    let ownedStr = localStorage.getItem(playerName + "_owned");
    let ownedArr = JSON.parse(ownedStr);

    if (ownedArr.includes(index)) {
        alert("คุณมีพื้นหลังนี้แล้ว!");
        return;
    }

    // ราคา 5 คะแนน
    if (totalScore >= 5) {
        totalScore -= 5;
        localStorage.setItem(playerName, totalScore);
        document.getElementById("shop-score").textContent = totalScore;

        ownedArr.push(index);
        localStorage.setItem(playerName + "_owned", JSON.stringify(ownedArr));

        alert("ซื้อพื้นหลังสำเร็จ!");
        updateOwnedButtons();
    } else {
        alert("คะแนนไม่เพียงพอ!");
    }
}

// --- ใช้พื้นหลัง ---
function useBackground(index) {
    let ownedStr = localStorage.getItem(playerName + "_owned");
    let ownedArr = JSON.parse(ownedStr);

    if (!ownedArr.includes(index)) {
        alert("คุณยังไม่ได้ซื้อพื้นหลังนี้!");
        return;
    }

    localStorage.setItem(playerName + "_using", index);
    alert("เปลี่ยนพื้นหลังเรียบร้อย!");
    updateOwnedButtons();
    updateBackground();
}

// อัปเดตปุ่มพื้นหลังเมื่อซื้อหรือเลือกใช้
// อัปเดตฟังก์ชันการซื้อและเลือกใช้พื้นหลัง
function handleBackgroundAction(index) {
    let ownedStr = localStorage.getItem(playerName + "_owned") || "[]";
    let ownedArr = JSON.parse(ownedStr);
    let usingIndex = parseInt(localStorage.getItem(playerName + "_using") || "0");

    let button = document.getElementById("btn-bg-" + index);
    let bgItem = document.getElementById("bg-" + index);

    if (!ownedArr.includes(index)) {
        // ตรวจสอบว่ามีคะแนนพอซื้อหรือไม่
        if (totalScore >= 5) {
            totalScore -= 5;
            localStorage.setItem(playerName, totalScore);
            document.getElementById("shop-score").textContent = totalScore;

            ownedArr.push(index);
            localStorage.setItem(playerName + "_owned", JSON.stringify(ownedArr));

            bgItem.classList.add("owned");
            updateOwnedButtons();
        } else {
            alert("คะแนนไม่เพียงพอ!");
        }
    } else {
        // เปลี่ยนพื้นหลังที่เลือก
        localStorage.setItem(playerName + "_using", index);
        updateOwnedButtons();
        updateBackground();
    }
}

// ฟังก์ชันอัปเดตปุ่ม
function updateOwnedButtons() {
    let ownedStr = localStorage.getItem(playerName + "_owned") || "[]";
    let ownedArr = JSON.parse(ownedStr);
    let usingIndex = parseInt(localStorage.getItem(playerName + "_using") || "0");

    for (let i = 1; i <= 6; i++) {
        let button = document.getElementById("btn-bg-" + i);
        let bgItem = document.getElementById("bg-" + i);

        if (!ownedArr.includes(i)) {
            // พื้นหลังที่ยังไม่ได้ซื้อ
            button.textContent = "ซื้อ";
            button.classList.add("shop-button");
            button.classList.remove("active");
            bgItem.classList.remove("owned");
        } else {
            // พื้นหลังที่มีแล้ว
            button.textContent = "ใช้";
            button.classList.add("shop-button");
            button.classList.remove("active");
            bgItem.classList.add("owned");

            if (usingIndex === i) {
                // ถ้าเลือกใช้พื้นหลังนี้ ให้เปลี่ยนเป็นสีน้ำเงิน
                button.classList.add("active");
                button.innerHTML = ``;
            } else {
                button.classList.remove("active");
                button.innerHTML = "ใช้";
            }
        }
    }
}

// --- อัปเดตฉากหลัง ---
function updateBackground() {
    const backgroundDiv = document.getElementById("main-menu-background");

    let usingIndex = 0;
    if (playerName) {
        usingIndex = parseInt(localStorage.getItem(playerName + "_using") || "0");
    }

    if (!usingIndex) {
        backgroundDiv.style.backgroundImage = "url('img/home2/start.jpg')";
    } else {
        let bgItem = document.getElementById("bg-" + usingIndex);
        if (bgItem) {
            let img = bgItem.querySelector("img");
            if (img) {
                backgroundDiv.style.backgroundImage = `url('${img.src}')`;
            }
        }
    }
}