const questionText = document.querySelector('.question');
const optionList = document.querySelector('.option_list');
const option = document.querySelector('.option');
const rulesBox = document.querySelector('.rules_box');
const quizBox = document.querySelector('.quiz_box');
const resultBox = document.querySelector('.results');

let questionCounter = 0; // Kullanıcının kaçıncı soruda olduğunu takip etmek için.. Sorular ilerledikçe bu değer artar
let currentQuestion; // Şu anda görüntülenen soruyu temsil eder, her soru gösterildiğinde bu değişken güncellenir
let availableQuestions = []; // Bu dizi soruların listesini tutar, başlangıçta boştur ancak quiz başladığında sorular bu diziye eklenir
let availableOptions = []; // Bu dizi şu anda görüntülenen sorunun seçeneklerini tutar her soru gösterildiğinde seçenekler bu diziye eklenir
let correctAnswers = 0; // Doğru cevap sayısını takip etmek için.. Kullanıcı doğru cevap verdiğinde değer artar
let attempt = 0; // Kullanıcının çözdüğü soru sayısını takip etmek için.. Kullanıcı her soru çözdüğünde bu değer artar

// bu fonksiyon çağırıldığında quiz array'indeki tüm soruları availableQuestions'a ekleyerek soru listesi oluşturur
function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i])
    }
}

function getNewQuestion() {
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]; // rastgele soru gelmesi için rastgele bir indeks alır
    currentQuestion = questionIndex; // seçilen soruyu currentQuestion'a atar
    questionText.innerHTML = currentQuestion.question; // questionText'i currentQuestion'ın question'ıyla günceller
    const index1 = availableQuestions.indexOf(questionIndex); // availableQuestions dizisinde seçilen sorunun indeksini bulur ve index1 değişkenine atar
    availableQuestions.splice(index1, 1); // availableQuestions dizisinden seçilen soruyu çıkarır
    const optionLength = currentQuestion.options.length; // Seçilen sorunun seçeneklerinin length'ini optionLength değişkenine atar

    for (let i = 0; i < optionLength; i++) {
        availableOptions.push(i); // availableOptions'a şıkların indeksini ekler
    }

    optionList.innerHTML = ''; // elementin içeriğini temizler yani önceki sorunun şıklarını kaldırır

    // for döngüsü mevcut sorunun seçeneklerini tek tek döner
    for (let i = 0; i < optionLength; i++) {
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[i];
        option.id = i;
        option.className = "option";
        optionList.appendChild(option);
        option.setAttribute("onclick", "getResult(this)");
    }

    questionCounter++; // mevcut sorunun sayacını bir arttırır

    // Level warning box
    const warnBox = document.querySelector('#warningBox');
    if (currentQuestion.level) {
        warnBox.textContent = currentQuestion.level + " Level";
        warnBox.classList.add("show");
    } else {
        warnBox.classList.remove("show");
    }
}

function getResult(element) {
    const id = parseInt(element.id); // tıklanan şıkkın id'sini alır
    if (id === currentQuestion.answer) {
        element.classList.add("correct"); // tıklanan seçeneğin id'si doğru cevaba eşitse "correct" class'ını ekler
        correctAnswers++;
        console.log("correct:" + correctAnswers)
    } else {
        element.classList.add("wrong"); // tıklanan seçeneğin id'si doğru cevaba eşit değilse "wrong" class'ını ekler
        const optionLength = optionList.children.length;
        // her şık için for döngüsü..
        for (let i = 0; i < optionLength; i++) {
            if (parseInt(optionList.children[i].id) === currentQuestion.answer) {
                optionList.children[i].classList.add("correct"); // şıklardan herhangi biri sorunun doğru cevabıyla eşitse "correct" class'ını seçeneğe ekler
            }
        }
    }
    attempt++; // çözülen soru sayısı birer artar

}

// bu fonksiyon bir önceki soruya getirir
function back() {
    if (questionCounter > 0) {
        questionCounter--; // soru sayacını bir azaltır
        currentQuestion = availableQuestions[questionCounter]; // mevcut soruyu günceller
        questionText.innerHTML = currentQuestion.question; // soru metnini günceller
        optionList.innerHTML = ''; // yeni soruya geçerken önceki sorunun şıklarını temizler

        const optionLength = currentQuestion.options.length;
        for (let i = 0; i < optionLength; i++) {
            const option = document.createElement("div");
            option.innerHTML = currentQuestion.options[i];
            option.id = i;
            option.className = "option";
            optionList.appendChild(option);
            option.setAttribute("onclick", "getResult(this)");
        }
    }
}

// bu fonksiyon tüm sorular cevaplandıysa quizOver()'ı bir sonraki soruyu almak içinse getNewQuestion()'ı çağırır
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
    resultBox.querySelector(".totalScore").innerHTML = quiz.length + " / " + correctAnswers;

    const warnBox = document.querySelector('#warningBox');
    warnBox.classList.remove("show");
}

function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function quitButton() {
    resultBox.classList.add("hide");
    rulesBox.classList.remove("hide");
    resetQuiz();
}

function start() {
    rulesBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQuestions(); // soru listesi için..
    getNewQuestion(); // yeni soru getirmek için..
}