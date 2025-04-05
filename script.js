const quizQuestion = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<js>", "<scripting>", "<script>", "<javascript>"],
        answer: "<script>"
    },
    {
        question: "Which of the following will trigger an error in JavaScript?",
        options: ["let x = 10;", "var x = 10;", "const x = 10;", "const x;"],
        answer: "const x;"
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function = myFunction()", "function:myFunction()", "function myFunction()", "function => myFunction()"],
        answer: "function myFunction()"
    },
    {
        question: "How to write an IF statement in JavaScript?",
        options: ["if i == 5 then", "if (i == 5)", "if i = 5", "if i = 5 the"],
        answer: "if (i == 5)"
    },
    {
        question: "How can you add a comment in a JavaScript?",
        options: ["<!--This is a comment-->", "'This is a comment", "//This is a comment", "//This is a comment//"],
        answer: "//This is a comment"
    },
    {
        question: "How do you declare a JavaScript variable?",
        options: ["let carName;", "variable carName;", "v carName;", "lets carName;"],
        answer: "let carName;"
    },
    {
        question: "One of these is not a way to declare function?",
        options: ["Scope Function", "Function Declaration", "Arrow Function", "Function Expression"],
        answer: "Scope Function"
    },
    {
        question: "What does the (this) keyword refer to in a method of an object?",
        options: ["The function itself", "The global object", "The object that calls the method", "The method's parameters"],
        answer: "The object that calls the method"
    },
    {
        question: "Which of the following is used to declare a constant in JavaScript?",
        options: ["const", "let", "var", "constant"],
        answer: "const"
    },
    {
        question: "Which of the following methods can be used to parse a JSON string into a JavaScript object?",
        options: ["JSON.parse()", "JSON.stringify()", "JSON.toObject()", "JSON.parseObject()"],
        answer: "JSON.parse()"
    }
];

const questionNumberEl = document.getElementById("question-number");
const questionEl = document.getElementById("question");
const optionEl = document.querySelectorAll(".option");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const startBtn = document.getElementById("start-btn");
const quizEl = document.getElementById("quiz");

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;
let answerSelected = false;

quizEl.classList.add("hide"); 
resultEl.classList.add("hide"); 

function loadQuestion() {
    const { question, options } = quizQuestion[currentQuestion];
    
    questionNumberEl.textContent = `Question ${currentQuestion + 1} of ${quizQuestion.length}`;
    questionEl.textContent = question;

    optionEl.forEach((option, index) => {
        option.textContent = options[index];
        option.classList.remove("correct", "incorrect");
        option.onclick = () => selectOption(option);
    });

    answerSelected = false;
    nextBtn.disabled = true;
    startTimer();
}

function selectOption(option) {
    if (!answerSelected) {
        answerSelected = true;
        const selectedAnswer = option.textContent;
        const correctAnswer = quizQuestion[currentQuestion].answer;
        
        if (selectedAnswer === correctAnswer) {
            score++;
            option.classList.add("correct");
        } else {
            option.classList.add("incorrect");
            optionEl.forEach(opt => {
                if (opt.textContent === correctAnswer) {
                    opt.classList.add("correct");
                }
            });
        }
        
        nextBtn.disabled = false;
    }
}

function loadNextQuestion() {
    clearInterval(timer);
    if (currentQuestion < quizQuestion.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResult();
    }
}

nextBtn.addEventListener("click", () => {
    loadNextQuestion();
});

function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerEl.textContent = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!answerSelected) {
                loadNextQuestion();
            }
        }
    }, 1000);
}

function showResult() {
    quizEl.classList.add("hide");
    resultEl.classList.remove("hide");
    scoreEl.textContent = `${score} out of ${quizQuestion.length}`;

    if (score < 5) {
        resultEl.innerHTML += "<p>You fail the quiz!</p>";
        resultEl.style.color = "red"
    } else {
        resultEl.innerHTML += "<p>Congratulations! You passed!</p>";
        resultEl.style.color = "green"
    }

}

startBtn.addEventListener("click", () => {
    startBtn.classList.add("hide"); 
    quizEl.classList.remove("hide"); 

    loadQuestion();  
});