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

//Global Variables
var Page_scores = "./highscores.html"
var storagekey = "quiz-scores";
var timerCount;
var timerID;
var timerDefault = 60; //time in seconds of timer
var currentQuestion = 0;
var score = 0;

//event handler to redirect to highscores.html on button click
ViewScoresEL.addEventListener('click', function () {
    document.location.href = Page_scores;
});

//event handler to start game on button press
StartGameEL.addEventListener('click', function () {
    //set timer to default value
    timerCount = timerDefault;
    //change visiblity of HTML blocks to enable the quiz questione.
    StartingblockEL.setAttribute('class', 'hidden');
    QuizBlockEL.setAttribute('class', 'visible');
    //load first question
    nextQuestion();
    //start timer
    StartTimer();
});

//eventhandler to record quiz selection
QuizBlockEL.addEventListener('click', function () {
    //get user sellection, and convert to integer for comparison with answer
    var buttonID = parseInt(event.target.id.slice(-1));
    //check if user selected the correct answer
    if (questionArr[parseInt(currentQuestion - 1)].answer == buttonID) {
        //if correct
        score++; // increase score
        AudioSuccessEL.play(); //play audio effect
    }
    else {
        //if wrong
        timerCount = timerCount - 15; //decrease remaining time
        AudioFailEL.play(); //play failed audio effect
    }
    UpdateScore(score); //update score elements
    nextQuestion(); //load the next question
});

//save score to local storage
recordScore.addEventListener('submit', function () {
    event.preventDefault(); //prevent form from clearing input
    var storedScores = JSON.parse(localStorage.getItem(storagekey)); //retrieve existing data from local storage
    if (storedScores === null || storedScores === undefined) //if not defined, define as array
    {
        var storedScores = [];
    }
    if (playername.value !== "") //if user's name is not empy 
    {
        var playerscore = {
            name: playername.value,
            score: score,
            time: timerDefault - timerCount
        }; //store data with an opbject
        storedScores.push(playerscore); // add object to end of the array
        localStorage.setItem(storagekey, JSON.stringify(storedScores)); //convert to a string and send to local storage
        document.location.href = Page_scores;//navigate to high score page
    } else {
        window.alert("please enter a name");//alert if no name or inials are entered
    }
})

function UpdateScore(x) {
    score = x; //update local viable
    runningscoreEL.textContent = x; //update score elemet at top of page
    finalScoreEL.textContent = x; //update score in final section
}

tryAgainEL.addEventListener('click', function () {
    //resest visibility to original
    StartingblockEL.setAttribute('class', 'visible');
    QuizBlockEL.setAttribute('class', 'hidden');
    endQuizBlockEL.setAttribute('class', 'hidden');
    //reset quiz veriables to defauls
    UpdateScore(0);
    currentQuestion = 0;
})

function nextQuestion() {
    if (currentQuestion >= questionArr.length) //check if there are more questions
    {
        endGame(); //endgame if there are no more questions
        return;
    }

    var questionObj = questionArr[currentQuestion]; //load question data into temp object
    QuestionTiltleEL.textContent = "Question " + parseInt(currentQuestion + 1) + " of " + questionArr.length; //display question number and progress
    QuestionEL.textContent = questionObj.question; //display question
    OptionEL.innerHTML = ""; //clear data from quiz options 
    for (var i = 0; i < questionObj.options.length; i++) {
        var li = document.createElement("li"); //create list element
        li.textContent = questionObj.options[i];  //add text of option
        li.setAttribute("id", "quiz-option_" + i); //add id for use in the answer verification
        li.setAttribute("class", "quizbutton"); //add class for styling
        OptionEL.appendChild(li); //add element to the page
    }
    currentQuestion++;
}

function endGame() {
    //set block visiblity
    QuizBlockEL.setAttribute('class', 'hidden');
    endQuizBlockEL.setAttribute('class', 'visible');
    UpdateScore(score);  //update score elements
    clearInterval(timerID);//cancel timer
}

//start timer
function StartTimer(sec) {
    //create timer element
    timerID = setInterval(function () { //function to run each time the timer trigers
        timerCount--; //decrease cound by 1
        timerEL.textContent = timerCount; //update timer html element
        if (timerCount <= 0) //when timer runs out
        {
            clearInterval(timerID); //cancel timer
            endGame(); //endgame
        }
    }, 1000);
}

//list of questions
questionArr = [
    {
        question: "Which of these is Not a javascrit datatype?", //question
        options: ["Integer", "Boolean", "Css", "String"], //list of possible answers
        answer: 2//index of the correct answer in the option arr
    },
    {
        question: "Which of the below denotes an array in javascript?", //question
        options: ["''", "[]", "{}", "Arr"], //list of possible answers
        answer: 1//index of the correct answer in the option arr
    },
    {
        question: "Which of the following is a Method of a javascript string?", //question
        options: [".skin()", ".peel()", ".slice()", ".tape()"], //list of possible answers
        answer: 2//index of the correct answer in the option arr
    },
    {
        question: "What method would you use to listen for an event?", //question
        options: ["addEventListener", "listen", "string", "array"], //list of possible answers
        answer: 0//index of the correct answer in the option arr
    },
    {
        question: "Which is correct way to read an object called 'name' from local storage?", //question
        options: ["name", "JSON.parse(localStorage.getItem('name'))", "localStorage.value", "localStorage.getitem('name')"], //list of possible answers
        answer: 1//index of the correct answer in the option arr
    },
    {
        question: "Bonus: What is the average airspeed of an unlaiden swallow?", //question
        options: ["1mph", "10kmh", "African or European?", "100 kmh"], //list of possible answers
        answer: 2 //index of the correct answer in the option arr
    }
];


