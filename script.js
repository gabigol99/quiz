const questions = [
    {
        question: "1. Qual o time que o Neymar mais ganhou títulos?",
        answers: [
            { text: "Barcelona", correct: false },
            { text: "Santos", correct: true },
            { text: "PSG", correct: false },
            { text: "Seleção Brasileira", correct: false }
        ]
    },
    {
        question: "2. Qual o nome completo do Neymar?",
        answers: [
            { text: "Neymar Santos Filho", correct: false },
            { text: "Neymar da Silva Santos Júnior", correct: true },
            { text: "Neymar dos Santos Oliveira", correct: false },
            { text: "Neymar Silva Costa Júnior", correct: false }
        ]
    },
    {
        question: "3. Quantos anos o Neymar tem?",
        answers: [
            { text: "31", correct: false },
            { text: "30", correct: false },
            { text: "29", correct: false },
            { text: "32", correct: true }
        ]
    },
    {
        question: "4. Em que ano ele nasceu?",
        answers: [
            { text: "1991", correct: false },
            { text: "1992", correct: true },
            { text: "1993", correct: false },
            { text: "1990", correct: false }
        ]
    },
    {
        question: "5. Qual a sua patrocinadora?",
        answers: [
            { text: "Nike", correct: false },
            { text: "Puma", correct: true },
            { text: "Adidas", correct: false },
            { text: "Reebok", correct: false }
        ]
    },
    {
        question: "6. Em qual time ele começou sua carreira?",
        answers: [
            { text: "Fluminense", correct: false },
            { text: "PSG", correct: false },
            { text: "Barcelona", correct: false },
            { text: "Santos", correct: true }
        ]
    },
    {
        question: "7. Em qual time ele teve seu auge?",
        answers: [
            { text: "Barcelona", correct: false },
            { text: "Santos", correct: true },
            { text: "PSG", correct: false },
            { text: "Al-Hilal", correct: false }
        ]
    },
    {
        question: "8. Quantos filhos ele tem?",
        answers: [
            { text: "2", correct: false },
            { text: "1", correct: false },
            { text: "3", correct: true },
            { text: "Nenhum", correct: false }
        ]
    },
    {
        question: "9. Em que ano ele ganhou a UEFA Champions League?",
        answers: [
            { text: "2015", correct: true },
            { text: "2014", correct: false },
            { text: "2016", correct: false },
            { text: "2017", correct: false }
        ]
    },
    {
        question: "10. Quantos gols ele tem pelo Barcelona?",
        answers: [
            { text: "108", correct: false },
            { text: "91", correct: false },
            { text: "118", correct: false },
            { text: "105 gols em 186 jogos", correct: true }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const scoreDisplay = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Próxima";
    scoreDisplay.innerText = "";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach((button) => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerText = "Quiz finalizado!";
    scoreDisplay.innerText = `Você acertou ${score} de ${questions.length} perguntas.`;
    nextButton.innerText = "Reiniciar";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
