//html elements
StartGameEL = document.querySelector("#btn-start");
ViewScoresEL = document.querySelector("#btn-view-scores");
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

//URLs
var Page_scores = "./highscores.html"

var timerCount;
var timerID;
var currentQuestion = 0;
var score = 0;


//event handler to redirect to highscores.html
ViewScoresEL.addEventListener('click', function () {
    document.location.href = Page_scores;

});
//event handler to start game on button press
StartGameEL.addEventListener('click', function () {
    timerCount = 60;
    //start timer
    StartingblockEL.setAttribute('class','hidden');
    QuizBlockEL.setAttribute('class', 'visible');
    //endQuizBlockEL.setAttribute('class','hidden');
    StartTimer();
    nextQuestion();
});

QuizBlockEL.addEventListener('click', function () {
    var buttonID = parseInt(event.target.id.slice(-1));
    if (questionArr[parseInt(currentQuestion - 1)].answer == buttonID) {
        //alert("Corect");
        score++;
        runningscoreEL.textContent = score
    }
    else {
        //alert("Wrong!");
        timerCount = timerCount - 15;
    }

    nextQuestion();

});

recordScore.addEventListener('submit', function(){
    event.preventDefault();
    //var temp = event;
    var storedScores = JSON.parse(localStorage.getItem('quiz-score'));
    if(storedScores === null || storedScores === undefined)
    {
        var storedScores = [];
    }
    if(playername.value !== null)
    {
        var playerscore = {name: playername.value,
                          score:score};
        storedScores.push(playerscore);
    }else
    {
        alert("please enter a name");
    }
    localStorage.setItem('quiz-score',JSON.stringify(storedScores));
    document.location.href = Page_scores;

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
    //StartingblockEL.setAttribute('class','hidden');
    QuizBlockEL.setAttribute('class','hidden');
    endQuizBlockEL.setAttribute('class', 'visible');
    finalScoreEL.textContent = score;
    clearInterval(timerID);
}


//eventhandler to record quiz selection


//save score to local storage

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
        question: "what is the average airspeed of an unlaiden swallow?", //question
        options: ["1mph", "10kmh", "African or europeaN?", "100 kmh"], //list of possible answers
        answer: 2 //index of the correct answer in the option arr
    },
    {
        question: "which of the following is primarily responsible for the formatting of a webpage?", //question
        options: ["css", "html", "javascript", "gitHub"], //list of possible answers
        answer: 0 //index of the correct answer in the option arr
    },
    {
        question: "what does DOM stand for", //question
        options: ["Document Over Music", "Document Object Model", "Data Object Mode ", "Display On Mouse"], //list of possible answers
        answer: 1 //index of the correct answer in the option arr
    }
];


