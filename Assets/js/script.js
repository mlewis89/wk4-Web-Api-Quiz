//html elements
StartGameEL = document.querySelector("#btn-start");
ViewScoresEL = document.querySelector("#btn-view-scores");
tryAgainEL = document.querySelector("#btn-tryAgain");
QuestionTiltleEL = document.querySelector("#question-title");
QuestionEL = document.querySelector("#question");
OptionEL = document.querySelector("#quiz-options");
timerEL = document.querySelector("#quiz-timer");
runningscoreEL = document.querySelector("#current-score")
finalScoreEL = document.querySelector("#final-score")
StartingblockEL = document.querySelector("#start-page");
QuizBlockEL = document.querySelector("#quiz-block");
endQuizBlockEL = document.querySelector("#quiz-end-block");
recordScore = document.querySelector('#game-score-submit')
playerNameEL = document.querySelector("#playername");
AudioSuccessEL = document.querySelector("#audio-success");
AudioFailEL = document.querySelector("#audio-fail");

//URLs
var Page_scores = "./highscores.html"
var storagekey = "quiz-scores";

var timerCount;
var timerID;
var timerDefault = 60; //time in seconds of timer
var currentQuestion = 0;
var score = 0;


//event handler to redirect to highscores.html
ViewScoresEL.addEventListener('click', function () {
    document.location.href = Page_scores;

});
//event handler to start game on button press
StartGameEL.addEventListener('click', function () {
    timerCount = timerDefault;
    //start timer
    StartingblockEL.setAttribute('class', 'hidden');
    QuizBlockEL.setAttribute('class', 'visible');
    StartTimer();
    nextQuestion();
});

//eventhandler to record quiz selection
QuizBlockEL.addEventListener('click', function () {
    var buttonID = parseInt(event.target.id.slice(-1));
    if (questionArr[parseInt(currentQuestion - 1)].answer == buttonID) {
        score++;
        runningscoreEL.textContent = score
        AudioSuccessEL.play();
    }
    else {
        timerCount = timerCount - 15;
        AudioFailEL.play();
    }
    UpdateScore(score);
    nextQuestion();
});

//save score to local storage
recordScore.addEventListener('submit', function () {
    event.preventDefault();
    var storedScores = JSON.parse(localStorage.getItem(storagekey));
    if (storedScores === null || storedScores === undefined) {
        var storedScores = [];
    }
    if (playername.value !== "") {
        var playerscore = {
            name: playername.value,
            score: score,
            time: timerDefault - timerCount
        };
        storedScores.push(playerscore);
        localStorage.setItem(storagekey, JSON.stringify(storedScores));
        document.location.href = Page_scores;
    } else {
        alert("please enter a name");
    }
})

function UpdateScore(x)
{
    score = x;
    runningscoreEL.textContent = x;
    finalScoreEL.textContent = x;

}

tryAgainEL.addEventListener('click',function(){
    StartingblockEL.setAttribute('class', 'visible');
    QuizBlockEL.setAttribute('class', 'hidden');
    endQuizBlockEL.setAttribute('class', 'hidden');
    UpdateScore(0);
    currentQuestion = 0;

})

function nextQuestion() {
    if (currentQuestion >= questionArr.length) //endgame if there are no more questions
    {
        endGame();
        return;
    }

    var questionObj = questionArr[currentQuestion];
    QuestionTiltleEL.textContent = "Question " + parseInt(currentQuestion + 1) + " of " + questionArr.length;
    QuestionEL.textContent = questionObj.question;
    OptionEL.innerHTML = "";
    for (var i = 0; i < questionObj.options.length; i++) {
        var li = document.createElement("li");
        li.textContent = questionObj.options[i];
        li.setAttribute("id", "quiz-option_" + i);
        li.setAttribute("class", "quizbutton");
        OptionEL.appendChild(li);
    }
    currentQuestion++;
}

function endGame() {
    QuizBlockEL.setAttribute('class', 'hidden');
    endQuizBlockEL.setAttribute('class', 'visible');
    UpdateScore(score);
    clearInterval(timerID);
}

//start timer
function StartTimer(sec) {
    //
    timerID = setInterval(function () {
        timerCount--;
        timerEL.textContent = timerCount;
        if (timerCount <= 0) {
            clearInterval(timerID);
            endGame();
        }
    }, 1000);
}

//list of questions
questionArr = [
    {
        question: "Which of these is Not a javascrit datatype?", //question
        options: ["Integer", "Boolean", "Css", "String"], //list of possible answers
        answer:  2//index of the correct answer in the option arr
    },
    {
        question: "Which of the below denotes an array in javascript?", //question
        options: ["''", "[]", "{}", "Arr"], //list of possible answers
        answer:  1//index of the correct answer in the option arr
    },
    {
        question: "Which of the following is a Method of a javascript string?", //question
        options: [".skin()", ".peel()", ".slice()", ".tape()"], //list of possible answers
        answer:  2//index of the correct answer in the option arr
    },
    {
        question: "What method would you use to listen for an event?", //question
        options: ["addEventListener","listen",  "string", "array"], //list of possible answers
        answer:  0//index of the correct answer in the option arr
    },
    {
        question: "Which is correct way to read an object called 'name' from local storage?", //question
        options: ["name", "JSON.parse(localStorage.getItem('name'))", "localStorage.value", "localStorage.getitem('name')"], //list of possible answers
        answer:  1//index of the correct answer in the option arr
    },
    {
        question: "Bonus: What is the average airspeed of an unlaiden swallow?", //question
        options: ["1mph", "10kmh", "African or European?", "100 kmh"], //list of possible answers
        answer: 2 //index of the correct answer in the option arr
    }
];


