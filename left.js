// เก็บตัวแปรหลัก
let playerName = "";
let score = 0;            // คะแนนที่ได้จากการเล่นรอบนี้
let totalScore = 0;       // คะแนนสะสม
let currentQuestion = 0;
let totalQuestions = 10;   // จำนวนข้อทั้งหมด
let timer;
let timeLeft = 10;
let selectedQuestions = [];

// โครงสร้างข้อมูลคำถาม
const fullQuestionBank = [
    { word: "Dog", type: "noun" },
    { word: "Cat", type: "noun" },
    { word: "House", type: "noun" },
    { word: "School", type: "noun" },
    { word: "Friend", type: "noun" },
    { word: "Ball", type: "noun" },
    { word: "Book", type: "noun" },
    { word: "Tree", type: "noun" },
    { word: "Car", type: "noun" },
    { word: "Apple", type: "noun" },
    { word: "Chair", type: "noun" },
    { word: "River", type: "noun" },
    { word: "Mountain", type: "noun" },
    { word: "Sun", type: "noun" },
    { word: "Moon", type: "noun" },
    { word: "Star", type: "noun" },
    { word: "Flower", type: "noun" },
    { word: "Cloud", type: "noun" },
    { word: "Ocean", type: "noun" },
    { word: "Road", type: "noun" },
    { word: "Run", type: "verb" },
    { word: "Jump", type: "verb" },
    { word: "Read", type: "verb" },
    { word: "Write", type: "verb" },
    { word: "Play", type: "verb" },
    { word: "Sing", type: "verb" },
    { word: "Eat", type: "verb" },
    { word: "Sleep", type: "verb" },
    { word: "Talk", type: "verb" },
    { word: "Draw", type: "verb" },
    { word: "Laugh", type: "verb" },
    { word: "Cry", type: "verb" },
    { word: "Climb", type: "verb" },
    { word: "Swim", type: "verb" },
    { word: "Dance", type: "verb" },
    { word: "Think", type: "verb" },
    { word: "Listen", type: "verb" },
    { word: "Watch", type: "verb" },
    { word: "Throw", type: "verb" },
    { word: "Catch", type: "verb" },
    { word: "Big", type: "adjective" },
    { word: "Small", type: "adjective" },
    { word: "Happy", type: "adjective" },
    { word: "Sad", type: "adjective" },
    { word: "Fast", type: "adjective" },
    { word: "Slow", type: "adjective" },
    { word: "Beautiful", type: "adjective" },
    { word: "Funny", type: "adjective" },
    { word: "Tall", type: "adjective" },
    { word: "Strong", type: "adjective" },
    { word: "Cold", type: "adjective" },
    { word: "Hot", type: "adjective" },
    { word: "Soft", type: "adjective" },
    { word: "Hard", type: "adjective" },
    { word: "Clean", type: "adjective" },
    { word: "Dirty", type: "adjective" },
    { word: "Kind", type: "adjective" },
    { word: "Angry", type: "adjective" },
    { word: "Friendly", type: "adjective" },
    { word: "Lazy", type: "adjective" }

];

// เก็บดัชนีของคำถามที่เคยใช้แล้ว (ไม่ให้ซ้ำ)
let usedIndices = [];

// ตัวแปร 5 ข้อที่จะใช้ในรอบนี้
let questions = [];

/* ======================== ฟังก์ชันต่างๆ ======================== */


function goToStart() {
    window.location.href = "index.html";
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
        alert("Please Enter Player's Name!");
        return;
    }

    // โหลดคะแนนสะสมเดิมจาก localStorage (ถ้ามี)
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
    currentQuestion = 0;

    // แสดงชื่อผู้เล่น
    document.getElementById("player-name-display").textContent = playerName;
    // อัปเดตคะแนนสะสมที่มุมบนซ้าย
    document.getElementById("accum-score").textContent = score;
    // อัปเดตตัวเลขจำนวนข้อทั้งหมด
    document.getElementById("total-questions").textContent = totalQuestions;

    // เปิดหน้าเกม
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("game-screen").style.display = "block";

    selectRandomQuestions();
    loadQuestion();
    updateBackground();
}



// --- ตรวจคำตอบ ---
function checkAnswer(answer) {
    clearInterval(timer);
    const question = selectedQuestions[currentQuestion]; // ใช้คำถามจาก selectedQuestions
    const feedback = document.getElementById("feedback");

    if (answer === question.type) {
        score++;
        totalScore++;
        feedback.innerText = "Correct! Well done.";
    } else {
        feedback.innerText = `Nice try! Your answer is wrong. The answer is ${question.type}.`;
    }

    currentQuestion++;

    setTimeout(() => {
        feedback.innerText = "";
        loadQuestion();

        // อัปเดตคะแนนของเกมปัจจุบันในระหว่างเกม
        document.getElementById("accum-score").textContent = score;


    }, 2000);
}

function loadQuestion() {
    if (currentQuestion < selectedQuestions.length) {
        const question = selectedQuestions[currentQuestion];
        // แสดงคำถาม
        document.getElementById("question").innerText = `${question.word}`;

        // แสดงรูปภาพ
        const imageElement = document.getElementById("question-image");
        imageElement.src = `img/left/q/${question.word}.jpg`; // ใช้ชื่อคำถามเป็นชื่อไฟล์รูป
        imageElement.alt = question.word; // เพิ่ม alt text เพื่อช่วยในการเข้าถึง

        resetTimer();

        document.getElementById("question-number").textContent = currentQuestion + 1;
    } else {
        goToScoreSummary();
    }
}

function selectRandomQuestions() {
    const shuffled = [...fullQuestionBank].sort(() => 0.5 - Math.random()); // สุ่มเรียงลำดับใหม่
    selectedQuestions = shuffled.slice(0, totalQuestions); // เลือกจำนวนคำถามตาม totalQuestions
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 10;
    document.getElementById("timer").innerText = `Time: ${timeLeft}`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(null);
        }
    }, 1000);
}

// --- ไปหน้าสรุปคะแนน ---
function goToScoreSummary() {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("score-summary").style.display = "block";

    document.getElementById("summary-player-name").textContent = playerName;
    document.getElementById("final-score").textContent = score + " Point(s)";

    // เงื่อนไขกำหนดข้อความชมตามคะแนน
    if (score >= 0 && score <= 3) {
        document.getElementById("compliment-text").textContent = "Try harder!";
    } else if (score >= 3 && score <= 6) {
        document.getElementById("compliment-text").textContent = "Good!";
    } else if (score >= 5 && score <= 10) {
        document.getElementById("compliment-text").textContent = "Excellent!";
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
        localStorage.setItem(playerName, totalScore);

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
        alert("Enter Your Name!");
        return;
    }

    let ownedStr = localStorage.getItem(playerName + "_owned");
    let ownedArr = JSON.parse(ownedStr);

    if (ownedArr.includes(index)) {
        alert("OWNED!");
        return;
    }

    // ราคา 5 คะแนน
    if (totalScore >= 5) {
        totalScore -= 5;
        localStorage.setItem(playerName, totalScore);
        document.getElementById("shop-score").textContent = totalScore;

        ownedArr.push(index);
        localStorage.setItem(playerName + "_owned", JSON.stringify(ownedArr));

        alert("BOUGHT!");
        updateOwnedButtons();
    } else {
        alert("NOT ENOUGH POINTS!");
    }
}

// --- ใช้พื้นหลัง ---
function useBackground(index) {
    let ownedStr = localStorage.getItem(playerName + "_owned");
    let ownedArr = JSON.parse(ownedStr);

    if (!ownedArr.includes(index)) {
        alert("NOT OWNED!");
        return;
    }

    localStorage.setItem(playerName + "_using", index);
    alert("USED!");
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
            alert("NOT ENOUGH POINTS!");
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
            button.textContent = "Buy";
            button.classList.add("shop-button");
            button.classList.remove("active");
            bgItem.classList.remove("owned");
        } else {
            // พื้นหลังที่มีแล้ว
            button.textContent = "Use";
            button.classList.add("shop-button");
            button.classList.remove("active");
            bgItem.classList.add("owned");

            if (usingIndex === i) {
                // ถ้าเลือกใช้พื้นหลังนี้ ให้เปลี่ยนเป็นสีน้ำเงิน
                button.classList.add("active");
                button.innerHTML = ``;
            } else {
                button.classList.remove("active");
                button.innerHTML = "Use";
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
        backgroundDiv.style.backgroundImage = "url('img/left/home.jpg')";
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