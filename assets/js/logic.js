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


//Function for startQuiz  //
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


//Function for checking the answer/question //
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
        wrongSoundEffect();
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

//Function for audiosounds  //

function correctSoundEffect() {
    var audio = new Audio();
    audio.src = "assets/sfx/correct.wav";
    audio.play();
  }
  
  function wrongSoundEffect() {
    var audio = new Audio();
    audio.src = "assets/sfx/incorrect.wav";
    audio.play();
  }

  function showResult() {
    questionWrap.classList.add("hide");
    endScreen.classList.remove("hide");
    finalScore.innerText = timeLeft;
  }
  
  function clearAll() {
    questionTitle.innerHTML = "";
    choicesOptions.innerHTML = "";
    feedback.innerHTML = "";
    feedback.classList.add("hide");
  }

  function initials() {
    var inputText = document.getElementById("initials").value;
  
    if (timeLeft === 0) {
      userScore = 0;
    } else {
      userScore = timeLeft + 2;
    }
  
    var initial = {
      initial: inputText,
      score: userScore,
    }
  
    var scoreListJSON = JSON.stringify(initial);
  
    localStorage.setItem("initials", scoreListJSON);
  
    window.location.href = "highscores.html";
  }



startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", startTimer);
choicesOptions.addEventListener("click", checkAnswer);
submitButton.addEventListener("click", initials);




