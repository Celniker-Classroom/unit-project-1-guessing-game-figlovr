// add javascript here
//Game State
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = [];

//time and date
let totalTime = 0;
let fastestTime = Infinity;
let startTime;
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let now = new Date();
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let suffix = " ";

if (date % 10 === 1 && date !== 11) {
    suffix = "st";
} else if (date % 10 === 2 && date !== 12) {
    suffix = "nd";
} else if (date % 10 === 3 && date !== 13) {
    suffix = "rd";
} else {
    suffix = "th";
}

let initialDate = now.toDateString(); // store initial date for comparison
document.getElementById("date").textContent = month + " " + date + suffix + ", " + year;

// Function to check and update date
function time() {
    let currentDate = new Date();
    if (currentDate.toDateString() !== initialDate) {
        // Date has changed, update display
        initialDate = currentDate.toDateString();
        month = months[currentDate.getMonth()];
        date = currentDate.getDate();
        year = currentDate.getFullYear();
        suffix = " ";
        if (date % 10 === 1 && date !== 11) {
            suffix = "st";
        } else if (date % 10 === 2 && date !== 12) {
            suffix = "nd";
        } else if (date % 10 === 3 && date !== 13) {
            suffix = "rd";
        } else {
            suffix = "th";
        }
        document.getElementById("date").textContent = month + " " + date + suffix + ", " + year;
        // Optionally clear the interval if you want to stop checking after date change
        // clearInterval(intervalId);
    }
}

let intervalId = setInterval(time, 2000);


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
guessCount = 0; 
startTime = Date.now(); 
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
        document.getElementById("msg").textContent = "Please enter a valid number!";
        return;
    }

  guessCount ++;
  let diff = Math.abs(num - answer);

  //correct
  if (num === answer){
    let elapsed = (Date.now() - startTime) / 1000; // calculate time in seconds
    document.getElementById("msg").textContent = "Correct! " + playerName + " got it in " + guessCount + " guesses.";
    updateScore(guessCount, elapsed);
    resetButtons(); //stop guess & give up; restart play
  }
  //higher
  else if (num > answer) {
    document.getElementById("guess").value="";
    let temp = "";
    if (diff <= 2){
        temp = "Hot!";
    } else if (diff <=5){
        temp = "Warm...";
    } else {
        temp = "Cold.";
    }
    document.getElementById("msg").textContent = temp + " Too high. Guess again.";
  }
  //lower
  else {
    document.getElementById("guess").value="";
    let temp = "";
    if (diff <= 2){
        temp = "Hot!";
    } else if (diff <=5){
        temp = "Warm...";
    } else {
        temp = "Cold.";
    }
    document.getElementById("msg").textContent = temp + " Too low. Guess again.";
  }
})

//Give up button
document.getElementById("giveUpBtn").addEventListener("click", function() {
    let elapsed = (Date.now() - startTime) / 1000; 
    let lastGuessInput = document.getElementById("guess").value;
    let lastGuessNum = parseInt(lastGuessInput);
    let num = parseInt(input);
    let diff = Math.abs(lastGuessNum - answer);
    if (guessCount === 1){
        document.getElementById("msg").textContent = playerName + " has given up after " + guessCount + " guess." + " The correct answer was " + answer + ".";
    } else {
        document.getElementById("msg").textContent = playerName + " has given up after " + guessCount + " guesses." + " The correct answer was " + answer + ".";
    }
    
    if (diff <= 2){
        updateScore(5, elapsed);
    } else if (diff <=5){
        updateScore(10, elapsed);
    } else {
        updateScore(20, elapsed);
    }
    
    resetButtons();
})


//update score for wins
function updateScore(score, time) { 
    totalWins ++;
    totalGuesses += score;
    totalTime += time;
    if (time < fastestTime) {
        fastestTime = time;
    }

    document.getElementById("wins").textContent = "Total wins: " + totalWins;
    document.getElementById("avgScore").textContent = "Average Score: " + (totalGuesses/totalWins).toFixed(1);
    document.getElementById("fastest").textContent = "Fastest Game: " + (fastestTime === Infinity ? "--" : fastestTime.toFixed(2) + "s");
    document.getElementById("avgTime").textContent = "Average Time: " + (totalTime/totalWins).toFixed(2) + "s";

//update leader board
    scores.push(score);
    scores.sort(function(a,b){return a-b});

    let leaderboard = document.getElementsByName("leaderboard");
    for (let i=0; i < leaderboard.length; i++){
        if (i < scores.length){
        leaderboard[i].textContent = scores[i];
        } else {
        leaderboard[i].textContent = "--";
        }
    }
}

function resetButtons() {
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;
    
    let radios = document.getElementsByName("level");
    for (let i=0; i < radios.length; i++){
        radios[i].disabled = false;
    }
}