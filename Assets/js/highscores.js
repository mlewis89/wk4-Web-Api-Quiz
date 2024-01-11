//html Elements
returnEL = document.querySelector("#return-game");
ClearScoreBoardEL = document.querySelector("#clear-scores-btn");
ScoreboardListEL = document.querySelector("#scoreboard");
//Global Variables
var Page_index = "./index.html";
var storagekey = "quiz-scores";

//event handler for button click  - to return to game page
returnEL.addEventListener('click', function () {
    document.location.href = Page_index;
});

//event handler clear score board on button click
ClearScoreBoardEL.addEventListener('click', ClearScoreBoard);

//clear scores from local storage and update displayed scoreboard
function ClearScoreBoard() {
    localStorage.setItem(storagekey, JSON.stringify([]));
    renderScoreboard();
}

//render scores from local storage to html elements
function renderScoreboard() {
    //read scores from local storage
    var storedScores = JSON.parse(localStorage.getItem(storagekey));
    ScoreboardListEL.innerHTML = "";
    if (storedScores.length > 0) {
        storedScores[storedScores.length - 1].last = true;
        //sort Scoreboard by scores in decending order
        var sortedScores = storedScores.sort((a, b) => { if(b.score == a.score){return a.time - b.time}else{return b.score - a.score;} });
        //loop through each score and add it to the scoreboard
        for (var i = 0; i < sortedScores.length; i++) {
            //create new HTML element
            var li = document.createElement("li");
            li.textContent = sortedScores[i].name + " - " + sortedScores[i].score + " points, in " + sortedScores[i].time + " seconds" ;
            //add additional class to the last score in the array
            if(sortedScores[i].last){
                li.setAttribute('class','lastAttempt');
            }
            //add list item to HTML element
            ScoreboardListEL.appendChild(li);
        }
    }
    else {
        //handle an empty scoreboard condition
        var li = document.createElement("li");
        li.textContent = "Please play the game to recored a score!";
        ScoreboardListEL.appendChild(li);
    }
}

//reder scoreboard on page load
renderScoreboard();