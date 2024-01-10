//html elements
StartGameEL = document.querySelector("#btn-start");
ViewScoresEL = document.querySelector("#btn-view-scores");
QuestionBlockEL = document.querySelector("#quiz-active");
QuestionTiltleEL = document.querySelector("#question-title");
QuestionEL = document.querySelector("#question");
OptionEL = document.querySelector("#quiz-options");
timerEL = document.querySelector("#quiz-timer");
runningscoreEL = document.querySelector("#current-score")
StartingblockEL = document.querySelector("#start-page");
QuizBlockEL = document.querySelector("#quiz-block");
endQuizBlockEL = document.querySelector("#quiz-end-block");

//URLs
var Page_scores = "./highscores.html"

var timerCount;
var timerID;
var currentQuestion = 0;


//event handler to redirect to highscores.html
ViewScoresEL.addEventListener('click', function () {
    document.location.href = Page_scores;

});
//event handler to start game on button press
StartGameEL.addEventListener('click', function () {
    timerCount = 60;
    //start timer
    //loadFirstQuestion();
    StartingblockEL.setAttribute(class='hidden');
    QuizBlockEL.setAttribute(class='visible');
    endQuizBlockEL.setAttribute(class='hidden');
    StartTimer();
    nextQuestion();
    //for items in questiosn array
    //render question[i]

});


function nextQuestion()
{

   

//eventhandler to record quiz selection


//save score to local storage

//start timer
function StartTimer(sec) {
    //
    timerID = setInterval(function () 
    {
        timerCount--;
        timerEL.textContent = timerCount;
        if (timerCount <= 0) 
        {
            clearInterval(timerID);
            endGame();
        }
     } ,1000);
}

//list of questions
questionArr = [
    {   question: "what is the average airspeed of an unlaiden swallow?", //question
        options: ["1mph","10kmh","African or europeaN?", "100 kmh"], //list of possible answers
        answer: 2 //index of the correct answer in the option arr
    },
    {   question: "which of the following is primarily responsible for the formatting of a webpage?", //question
        options: ["css","html","javascript", "gitHub"], //list of possible answers
        answer: 0 //index of the correct answer in the option arr
    },
    {   question: "what does DOM stand for", //question
        options: ["Document Over Music","Document Object Model","Data Object Mode ", "Display On Mouse"], //list of possible answers
        answer: 1 //index of the correct answer in the option arr
    }
];


