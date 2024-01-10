//html elements
StartGameEL = document.querySelector("#btn-start");
ViewScoresEL = document.querySelector("#btn-view-scores");
QuestionBlockEL = document.querySelector("#quiz-active");
QuestionTiltleEL = document.querySelector("#question-TILT");
QuestionEL = document.querySelector("#question");
OptionEL = document.querySelector("#quiz-options");
timerEL = document.querySelector("#")
//URLs
var Page_scores = "./highscores.html"


//event handler to redirect to highscores.html
ViewScoresEL.addEventListener('click', function () {
    document.location.href = Page_scores;

});
//event handler to start game on button press
StartGameEL.addEventListener('click', function () {
//start timer
//for items in questiosn array
    //render question[i]

});

//eventhandler to record quiz selection

//list of questions
//save score to local storage
//set timer
//clear timer