//html Elements
returnEL = document.querySelector("#return-game");
ClearScoreBoardEL = document.querySelector("#clear-scores-btn");
//URLs
var Page_index = "./index.html";
var storagekey = "quiz-scores";
var storedScores;

//event handler to return to game
returnEL.addEventListener('click',function() {
    document.location.href = Page_index;
})

ClearScoreBoardEL.addEventListener('click',ClearScoreBoard)


//clear scores from local storage
function ClearScoreBoard ()
{
    localStorage.setItem(storagekey,[]);
    renderScoreboard();
}

//render scores from local storage
function renderScoreboard()
{
    //read scores from local storage
    storedScores = localStorage.getItem(storagekey);
}