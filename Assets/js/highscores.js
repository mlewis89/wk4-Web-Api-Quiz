//html Elements
returnEL = document.querySelector("#return-game");
ClearScoreBoardEL = document.querySelector("#clear-scores-btn");
ScoreboardListEL = document.querySelector("#scoreboard");
//URLs
var Page_index = "./index.html";
var storagekey = "quiz-scores";

//event handler to return to game
returnEL.addEventListener('click', function () {
    document.location.href = Page_index;
});

ClearScoreBoardEL.addEventListener('click', ClearScoreBoard);

//clear scores from local storage
function ClearScoreBoard() {
    localStorage.setItem(storagekey, JSON.stringify([]));
    renderScoreboard();
}

//render scores from local storage
function renderScoreboard() {
    //read scores from local storage
    var storedScores = JSON.parse(localStorage.getItem(storagekey));
    ScoreboardListEL.innerHTML = "";
    if (storedScores.length > 0) {
        storedScores[storedScores.length - 1].last = true;
        var sortedScores = storedScores.sort((a, b) => { if(b.score == a.score){return a.time - b.time}else{return b.score - a.score;} }); //sort Scoreboard by scores in decending order
        for (var i = 0; i < sortedScores.length; i++) {
            var li = document.createElement("li");
            li.textContent = sortedScores[i].name + " - " + sortedScores[i].score + " points, in " + sortedScores[i].time + " seconds" ;
            if(sortedScores[i].last)
            {
                li.setAttribute('class','lastAttempt');
            }
            ScoreboardListEL.appendChild(li);
        }
    }
    else {
        var li = document.createElement("li");
        li.textContent = "Please play the game to recored a score!";
        ScoreboardListEL.appendChild(li);
    }
}

renderScoreboard();