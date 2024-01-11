//html Elements
returnEL = document.querySelector("#return-game");
ClearScoreBoardEL = document.querySelector("#clear-scores-btn");
ScoreboardListEL = document.querySelector("#scoreboard");
//URLs
var Page_index = "./index.html";
var storagekey = "quiz-scores";
var storedScores;

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
        for (var i = 0; i < storedScores.length; i++) {
            var li = document.createElement("li");
            li.textContent = storedScores[i].name + " - " + storedScores[i].score + " points";
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