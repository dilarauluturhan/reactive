const questionText = document.querySelector('.question');
const optionList = document.querySelector('.option_list');
const option = document.querySelector('.option');
const rulesBox = document.querySelector('.rules_box');
const quizBox = document.querySelector('.quiz_box');
const resultBox = document.querySelector('.results');

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }
}

function getNewQuestion() {
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.question;

    const index1 = availableQuestions.indexOf(questionIndex);

    availableQuestions.splice(index1, 1);

    const optionLength = currentQuestion.options.length;
    for (let i = 0; i < optionLength; i++) {
        availableOptions.push(i);
    }

    optionList.innerHTML = '';

    for (let i = 0; i < optionLength; i++) {
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2, 1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.className = "option";
        optionList.appendChild(option);
        option.setAttribute("onclick", "getResult(this)");
    }

    questionCounter++;
}

// correct ve wrong'un css kodları çalışmıyo!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function getResult(element) {
    const id = parseInt(element.id);
    if (id === currentQuestion.answer) {
        element.classList.add("correct");

        correctAnswers++;
        console.log("correct:" + correctAnswers)
    } else {
        element.classList.add("wrong");

        const optionLength = optionList.children.length;
        for (let i = 0; i < optionLength; i++) {
            if (parseInt(optionList.children[i].id) === currentQuestion.answer) {
                optionList.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();
}

// alreadyAnswered'ın css kodları çalışmıyo!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function unclickableOptions() {
    const optionLength = optionList.children.length;
    for (let i = 0; i < optionLength; i++) {
        optionList.children[i].classList.add("alreadyAnswered")
    }
}

function next() {
    if (questionCounter == quiz.length) {
        quizOver();
    } else {
        getNewQuestion();
    }
}

function quizOver() {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult() {
    resultBox.querySelector(".totalQuestion").innerHTML = quiz.length;
    resultBox.querySelector(".totalAttempt").innerHTML = attempt;
    resultBox.querySelector(".totalCorrect").innerHTML = correctAnswers;
    resultBox.querySelector(".totalWrong").innerHTML = attempt - correctAnswers;
    resultBox.querySelector(".totalScore").innerHTML = correctAnswers + " / " + quiz.length;
}

function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function quitButton(){
    resultBox.classList.add("hide");
    rulesBox.classList.remove("hide");
    resetQuiz();
}

function start() {
    rulesBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestion();
}