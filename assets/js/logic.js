var currentQuestionIndex = 0;

//Timer Values//
var time = document.querySelector("#time");
var timer = document.querySelector(".timer");
var timeLeft = 60;

var feedback = document.querySelector("#feedback");

//Start page Values//
var startButton = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");

//Quiz page Values//
var questionWrap = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choicesOptions = document.querySelector("#choices");

//End of Quiz page Values//
var endScreen = document.querySelector("#end-screen");
var finalScore = document.querySelector("#final-score");

//Sumbit result Values//
var initialsInput = document.querySelector("#initials");
var submitButton = document.querySelector("#submit");
var form = document.querySelector("form");


//Function for timer //
function startTimer() {
    var countDown = setInterval(() => {
        time.innerText = timeLeft;
        timeLeft--;
        if (currentQuestionIndex > 5) {
            clearInterval(countDown);
            timer.classList.add("hide");
        }
        if (timeLeft < 0) {
            clearInterval(countDown);
            timer.classList.add("hide");
            timeLeft = 0;
            time.innerHTML = 0;
            showResult();
        }
    }, 1000);
}

function startQuiz() {
    var currentQuestion = questions[currentQuestionIndex];
    var choices = currentQuestion.choices;

    startScreen.classList.add("hide");

    questionTitle.innerText = currentQuestion.title;

    for (var i = 0; i < choices.length; i++) {
        var choice = choices[i];

        choicesOptions.insertAdjacentHTML(
            "beforeend",
            `
      <button value=${choice} onclick="checkAnswer">${choice}</button>
      `
        );
    }
    questionWrap.classList.remove("hide");
}

function checkAnswer(event) {
    var currentQuestion = questions[currentQuestionIndex];
    var pickAnswer = event.target.value;

    if (pickAnswer === currentQuestion.answer) {
        feedback.classList.remove("hide");
        feedback.innerText = "Correct!";
        correctSoundEffect();
        setTimeout(() => {
            clearAll();
            currentQuestionIndex++;
            if (timeLeft == 0) {
                clearAll();
                showResult();
            } else {
                startQuiz();
            }
        }, 1000);
        if (currentQuestionIndex > 4) {
            clearAll();
            showResult();
        }
    } else {
        feedback.classList.remove("hide");
        feedback.innerText = "Wrong!";
        worngSoundEffect();
        timeLeft = timeLeft - 20;
        setTimeout(() => {
            clearAll();
            currentQuestionIndex++;
            if (timeLeft == 0) {
                clearAll();
                showResult();
            } else {
                startQuiz();
            }
        }, 1000);
        if (currentQuestionIndex > 4) {
            clearAll();
            showResult();
        }
    }
}


startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", startTimer);





