const questions = [
    {
        type: "text",
        question: "Qual è la capitale dell'Australia?",
        answers: ["Sydney", "Melbourne", "Canberra"],
        correct: 2
    },
    {
        type: "image",
        question: "Che monumento è questo?",
        media: "assets/colosseo.jpg",
        answers: ["Colosseo", "Arena di Verona", "Partenone"],
        correct: 0
    },
    {
        type: "audio",
        question: "Riconosci questa canzone?",
        media: "assets/sample.mp3",
        answers: ["Coldplay - Viva la Vida", "Queen - Another One Bites the Dust", "Adele - Hello"],
        correct: 0
    }
];

let current = 0;
let timerInterval;

document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("nextBtn").addEventListener("click", nextQuestion);

function startGame() {
    document.getElementById("setup").classList.add("hidden");
    showQuestion();
}

function showQuestion() {
    document.getElementById("result").classList.add("hidden");
    document.getElementById("question-box").classList.remove("hidden");

    const q = questions[current];
    document.getElementById("question-text").textContent = q.question;

    // media (image, audio, video)
    const mediaBox = document.getElementById("media");
    mediaBox.innerHTML = "";

    if (q.type === "image") {
        mediaBox.innerHTML = `<img src="${q.media}" style="max-width:300px;">`;
    }
    if (q.type === "audio") {
        mediaBox.innerHTML = `<audio controls src="${q.media}"></audio>`;
    }
    if (q.type === "video") {
        mediaBox.innerHTML = `<video width="300" controls src="${q.media}"></video>`;
    }

    // answers
    const answersBox = document.getElementById("answers");
    answersBox.innerHTML = "";
    q.answers.forEach((ans, index) => {
        const btn = document.createElement("button");
        btn.textContent = ans;
        btn.onclick = () => selectAnswer(index);
        answersBox.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    let time = 10;
    document.getElementById("time").textContent = time;

    timerInterval = setInterval(() => {
        time--;
        document.getElementById("time").textContent = time;

        if (time === 0) {
            clearInterval(timerInterval);
            showResult(false);
        }
    }, 1000);
}

function selectAnswer(choice) {
    clearInterval(timerInterval);
    const q = questions[current];
    const correct = choice === q.correct;
    showResult(correct);
}

function showResult(isCorrect) {
    document.getElementById("question-box").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    document.getElementById("result-text").textContent =
        isCorrect ? "CORRETTO 🎉" : "SBAGLIATO ❌";
}

function nextQuestion() {
    current++;
    if (current >= questions.length) {
        document.getElementById("result-text").textContent = "Quiz finito!";
        document.getElementById("nextBtn").style.display = "none";
        return;
    }
    showQuestion();
}
