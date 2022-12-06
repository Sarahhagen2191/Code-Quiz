var currentQuestionIndex = 0;

//Timer Values//
var time = document.querySelector("#time");
var timer = document.querySelector(".timer");
var timeLeft= 60;

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
  
  