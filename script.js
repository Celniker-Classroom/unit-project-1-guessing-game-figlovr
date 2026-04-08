// add javascript here
//Game State
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = 0;

//Player Name
let playerName = prompt("Enter your name:");

//Play
document.getElementById("playBtn").addEventListener("click", function() {
    let radios = document.getElementsByName("level");
    let range = 3;
    for (let i=0; i < radios.length; i++){
        if(radios[i].checked){
            range = parseInt(radios[i].value);
        }
    }

//round setup
answer = Math.floor(Math.random() * range) + 1;
//Disable & Enable buttons and radio choices
document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range;
document.getElementById("guess").value="";
document.getElementById("guessBtn").disabled = false;
document.getElementById("giveUpBtn").disabled = false;
document.getElementById("playBtn").disabled = true;

    for (let i=0; i < radios.length; i++){
        radios[i].disabled = true;
    }

})

//Guessing
document.getElementById("guessBtn").addEventListener("click", function() {
    let input = document.getElementById("guess").value;
    let num = parseInt(input);

    if (isNaN(num)) {
        document.getElementById("msg").textContent = "Please enter a vald number!";
        return;
    }

  guessCount ++;
  let diff = Math.abs(num - answer);

  //correct
  if (num === answer){
    document.getElementById("msg").textContent = "Correct! " + playerName + " got it in " + guessCount + " guesses.";
    updateScore(guessCount);
    resetButtons(); //stop guess & give up; restart play
  }
  //higher
  else if (num > answer) {
    let temp = "";
    if (diff <= 2){
        temp = "Hot!";
    } else if (diff <=5){
        temp = "Warm...";
    } else {
        temp = "Cold.";
    }
    document.getElementById("proximity").textContent = "Too high... " + temp + "Guess again.";
  }
  //lower
  else {
    let temp = "";
    if (diff <= 2){
        temp = "Hot!";
    } else if (diff <=5){
        temp = "Warm...";
    } else {
        temp = "Cold.";
    }
    document.getElementById("proximity").textContent = "Too low... " + temp + "Guess again.";
  }
})

//update score for wins
function updateScore(score) { 
    totalWins ++;
    totalGuesses += score;

    document.getElementById("wins").textContent = "Total wins: " + totalWins;
    document.getElementById("wins").textContent = "Average score: " + (totalGuesses/totalWins).toFixed(1);
}

function resetButtons() {
document.getElementById("guessBtn").disabled = true;
document.getElementById("giveUpBtn").disabled = false;
document.getElementById("playBtn").disabled = true;
    
    let radios = document.getElementsByName("level");
    for (let i=0; i < radios.length; i++){
        radios[i].disabled = true;
    }
}