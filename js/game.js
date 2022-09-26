window.onload = init;

//I'm importing here but I can't use
import { getWords } from "./words.js";

//variable just to salve the blur of the background image for later use
const blur = 16;

var typedWord, currentWord;
var currentLevel = errors = hits = totalHits = 0;
const hitsToLevelUP = 10;
const msgGameOver = "You lost";

//screens
const screens = new Object();
screens["Start"] = "#startScreen";
screens["Game"] = "#game";
screens["GameOver"] = "#gameOver";

//How much time you have to type the word
const time = 4100;

//function for saving the Timeout function
var timeOut;

//timer for showing
var timer = {};
timer.count = 0;
timer.start = function () {
  this.timer = setInterval(attTimer, 193, 75);
}
timer.stop = function () {
  this.count = 0;
  clearInterval(this.timer);
}

//words
//gotta find a better way to choose the words
//hehehe
const words = [];
words[0] = ["flu", "rob", "use", "aid", "tap", "sum", "lay", "boy", "fan", "fee", "fly", "dry", "tip", "bat", "pig", "bus", "ice", "low", "set", "buy", "end", "cat", "ant", "map", "hot", "ear", "jam", "get", "cut", "owe"];
words[1] = ["fork", "gate", "sock", "hook", "salt", "flex", "lock", "sigh", "food", "easy", "wire", "foot", "time", "fuss", "fade", "moon", "move", "good", "soar", "shop", "trip", "calf", "suit", "form", "mark", "lose", "host", "mind", "page", "horn"];
words[2] = ["story", "thick", "fault", "build", "thank", "crown", "slice", "judge", "elbow", "alive", "shell", "money", "reign", "peace", "jelly", "chaos", "enjoy", "salon", "cabin", "hobby", "final", "blind", "night", "spine", "smart", "joint", "knife", "slave", "union", "unity"];
words[3] = ["middle", "impact", "margin", "import", "tiptoe", "temple", "strain", "modest", "revise", "insist", "ticket", "foster", "comedy", "divide", "suburb", "shrink", "random", "member", "launch", "frozen", "jacket", "throne", "relief", "record", "earwax", "relate", "admire", "degree", "mirror", "horror"];
words[4] = ["deliver", "swallow", "falsify", "theater", "calorie", "initial", "combine", "deserve", "shelter", "arrange", "offense", "recycle", "outlook", "monarch", "harvest", "trouble", "lighter", "dentist", "pursuit", "charter", "approve", "climate", "hostage", "thirsty", "symptom", "episode", "comfort", "dialect", "deposit", "request"];
words[5] = ["magnetic", "training", "stunning", "resident", "bathroom", "appendix", "reporter", "instinct", "profound", "childish", "collapse", "opposite", "delivery", "marathon", "aviation", "offender", "crackpot", "reckless", "official", "majority", "stubborn", "scenario", "presence", "material", "building", "conceive", "terminal", "abstract", "vertical", "freshman"];
words[6] = ["parachute", "publisher", "violation", "financial", "hierarchy", "staircase", "reproduce", "clearance", "guarantee", "education", "residence", "egg white", "admission", "orchestra", "leftovers", "effective", "cultivate", "architect", "confusion", "beginning", "departure", "landscape", "selection", "important", "prosecute", "miserable", "radiation", "essential", "salvation", "circulate"];
words[7] = ["memorandum", "distortion", "chimpanzee", "tournament", "population", "right wing", "mechanical", "innovation", "photograph", "preference", "transition", "litigation", "possession", "initiative", "attractive", "wilderness", "cell phone", "appearance", "concession", "conspiracy", "conclusion", "convulsion", "experience", "curriculum", "regulation", "first-hand", "substitute", "stereotype", "illustrate", "laboratory"];


function init() {
  let startScreen = document.querySelector("#startScreen");
  startScreen.addEventListener("mouseover", function () {
    var audio = document.querySelector("#heart");
    audio.loop = true;
    audio.play();
  });

  document.querySelector("#header").addEventListener("click", start);

  typedWord = document.querySelector("#typedWord");
  typedWord.onkeyup = checkWord;
};

function start() {
  chooseWord();

  switchScreen("Start", "Game");

  attPainel();

  //timer for showing
  attTimer();
  timer.start();

  //timer for endgame
  timeOut = setTimeout(gameOver, time);

  //focus
  typedWord.focus();
}

function restart() {
  switchScreen("GameOver", "Start");
}

function gameOver(msg) {
  //stop the timers
  timer.stop();
  window.clearTimeout(timeOut);

  var endHits = document.querySelector("#endHits").innerHTML = totalHits;
  var endLevel = document.querySelector("#endLevel").innerHTML = currentLevel;
  var endErrors = document.querySelector("#endErrors").innerHTML = errors;

  //att the local variable with the higher score
  var highscore = document.querySelector("#higherScore");
  if ((localStorage.higherScore === undefined) || (localStorage.higherScore < totalHits)) {
    highscore.innerHTML = "NEW HIGHSCORE!!! " + totalHits;
    localStorage.higherScore = totalHits;
  } else {
    highscore.innerHTML = "Highscore: " + localStorage.higherScore;
  }


  //zero the variables
  currentLevel = errors = hits = totalHits = 0;

  //well
  switchScreen("Game", "GameOver");

  //start the screaming
  var audio = new Audio("http://soundbible.com/mp3/Scary Scream-SoundBible.com-1115384336.mp3");
  audio.play();

  if (msg !== undefined) {
    document.querySelector("#msgGameOver").innerText = msg;
  } else {
    document.querySelector("#msgGameOver").innerText = msgGameOver;
  }
}

function checkWord(event) {
  if (event.keyCode == 13) {
    if (typedWord.value == currentWord) {
      hits++;
      totalHits++;
      resetTimeEndGame();
      checkLevelUp();
    } else {
      errors++;
    }
    chooseWord();
  }
}

function chooseWord() {

  var wordIndex = Math.floor(Math.random() * words[currentLevel].length);
  currentWord = words[currentLevel][wordIndex];

  attPainel();
}

function attPainel() {
  var wordHtml = document.querySelector("#word");
  var hitsHtml = document.querySelector("#hits");
  var levelHtml = document.querySelector("#currentLevel");
  var errorHtml = document.querySelector("#errors");

  wordHtml.innerHTML = currentWord;
  hitsHtml.innerHTML = hitsToLevelUP - hits;
  levelHtml.innerHTML = currentLevel;
  errorHtml.innerHTML = errors;
  typedWord.value = "";
}

//change between screen: start, game, gameover
function switchScreen(screen1, screen2) {
  var current = document.querySelector(screens[screen1]);
  var next = document.querySelector(screens[screen2]);
  current.classList.add("hide");
  next.classList.remove("hide");
}

function resetTimeEndGame() {
  window.clearTimeout(timeOut);
  timeOut = setTimeout(gameOver, time);
  timer.stop();
  attTimer();
  timer.start();
}

//att the timer
//here I'm using the blur of the brackground image to show that the time is passing
//I don't think timer is the best name for this function
function attTimer() {
  var background = document.querySelector("#zombieBackground");
  background.style.filter = "blur(" + Math.max(0, (blur - timer.count)) + "px)";
  timer.count++;
}

function soundOn(option) {
  var audio = document.querySelector("#heart");
  audio.muted = option;
}

//let's try again
function checkLevelUp() {
  if (hits == hitsToLevelUP) {
    currentLevel++;
    hits = 0;
    levelUpAnimation();

    //if the current level is equal the length of the array with the words
    //there are no more words
    if (currentLevel == words.length) return gameOver("Maximum level!!");

    chooseWord();
  }
}

function levelUpAnimation() {
  document.querySelector("#currentLevel").classList.add("levelup");

  window.setTimeout(() => {
    document.querySelector("#currentLevel").classList.remove("levelup");
  }, 2000);
}