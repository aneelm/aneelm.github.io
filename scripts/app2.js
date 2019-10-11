var ranks =
["2", "3", "4", "5", "6", "7", "8", "9", "X", "J", "Q", "K", "A"];
var suits =
["C", "D", "H", "S"];
var cards = [], deck = [];
var firstCard, secondCard;
var lockedBoard = false;
var originalTimeLeft = 100;
var timeRemaining = 100;
var scoreOG = 100, scoreTemp = 100, gamesPlayed = 0;
var wonOrLost, clockIsRunning = false, isTimeUp = false;
var highScores = [];
var scoresString = "";
var sizeOpt, gameOptZ, sizeValue, gameOpt;
var myInterval;

function limit(element)
{
    var max_chars = 8;
    if(element.value.length > max_chars) {
        element.value = element.value.substr(0, max_chars);
    }
}
function checkInputLength() {
  var inputInterval = setInterval(() => {
    gid("name").value = gid("name").value.substr(0, 8);
  }, 100);
}

function addToHighScores() {
  var name = gid("name").value;
  console.log(name)
  if (name == "") {
    name = "unknown"
  }
  if (gameOpt == 1) {
    difficulty = "hard";
  } else {
    difficulty = "easy";
  }
  highScores.push(
    {name: name, gamesPlayed: gamesPlayed, score: scoreTemp,
      time: timeRemaining, ending: wonOrLost, difficulty: difficulty,
    size: sizeValue}
  )
  scoresString += highScores[highScores.length-1].name +
  " --- Game Number: " +
  highScores[highScores.length-1].gamesPlayed +
  " ended with a score of " +
  highScores[highScores.length-1].score + " and you had " +
  highScores[highScores.length-1].time + " seconds left. You " +
  highScores[highScores.length-1].ending + " the game. Game size was " +
  highScores[highScores.length-1].size + " and you were playing " +
  "on " + highScores[highScores.length-1].difficulty + " mode.\n\n";
  console.log(highScores[0].score)
  addHighScoresToTable();
}
function addHighScoresToTable() {
  var body = gid("body");
  body.innerHTML = "";
  for (var i = 0; i < highScores.length; i++) {
    var tr = document.createElement("tr");
    for (var key in highScores[i]) {
      var th = document.createElement("th");
      console.log(highScores[i][key]);
      th.innerHTML = highScores[i][key];
      tr.appendChild(th);
    }
    body.appendChild(tr);
  }

}
function clock() {
  if (clockIsRunning) {
    return;
  } else {
    clockIsRunning = true;
  }
  myInterval = setInterval(() => {
    if (!clockIsRunning) {
      clearInterval(myInterval);
      return;
    }
    if (timeRemaining < 0.5) {
      wonOrLost = "lost";
    }
    if (wonOrLost == null) {
      timeRemaining = timeRemaining - 0.5;
      gid("timer").innerHTML = "Timer: " + timeRemaining;
    }
  }, 500);
}
function allCardsInvisible() {
  var cardstochange = document.getElementsByClassName("card")
  for (var i = 0; i < cardstochange.length; i++) {
    cardstochange[i].classList.add("correct")
  }
}
function gid(name) {
  return document.getElementById(name);
}
function resetBoard(){
  sizeOpt = selection.options[selection.selectedIndex];
  gameOptZ = gameType.options[gameType.selectedIndex];
  sizeValue = parseInt(sizeOpt.value);
  gameOpt = parseInt(gameOptZ.value);
  clearCards();
  timeRemaining = originalTimeLeft;
  scoreTemp = scoreOG;
  lockedBoard = false;
  wonOrLost = null;
  clockIsRunning = false;
  isTimeUp = false;
  wonOrLost = null;
  gid("timer").innerHTML = "Timer: " + timeRemaining;
  gid("score").innerHTML = "Score: " + (scoreTemp);
  gid("play_area").innerHTML = "";
  allCardsInvisible()
}
function makeAllCards() {
  ranks.forEach(rank => {
    suits.forEach(suit => {
      cards.push(
        {rank: rank, suit:suit}
      )
    })
  })
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function makeDeck(value) {
  if (!(deck.length == 0)) {
    deck = [];
  }
  var diffCardsNeeded = value/2;
  for (var i = 0; i < diffCardsNeeded; i++) {
    var x = Math.floor(Math.random()*52);
    if (!deck.includes(cards[x])) {
      deck.push(cards[x]);
      deck.push(cards[x]);
    } else {
      i = i-1;
    }
  }
  shuffle(deck);
}
function checkCards() {
  if (!(firstCard == null) && !(secondCard == null)) {
    console.log("checking cards wtf")
    console.log(firstCard, secondCard)
    if (gameOpt == 1) {
      if (firstCard.className == secondCard.className) {
        return true;
      }
    } else if (gameOpt == 2) {
      if (
        firstCard.className.substring(9, 10) ==
        secondCard.className.substring(9,10)) {
        return true;
      }
    }

  }
  return false;
}
function clearCards() {
  console.log("clearing cards");
  firstCard = null;
  secondCard = null;
}
function setCardsCorrect() {
  firstCard.classList.add("correct")
  secondCard.classList.add("correct")
}
function flipCards() {
  firstCard.classList.toggle("flipped")
  secondCard.classList.toggle("flipped")
}
function gameOverCheck() {
  console.log("gameOverCheck")
  var divCards = gid("play_area").children
  var containsFlipped = false;
  for (var i = 0; i < divCards.length; i++) {
    if (divCards[i].classList.contains("flipped")) {
      containsFlipped = true;
    }
  }
  if (timeRemaining < 0.5 && !isTimeUp) {
    clearInterval(myInterval);
    isTimeUp = true;
    lockedBoard = true;
    wonOrLost = "lost";
    gamesPlayed = gamesPlayed + 1;
    addToHighScores();
    gid("gameNR").innerHTML = "Game count: " + gamesPlayed
    alert("GAME OVER YOU LOSE HAHHAHAHAH\nNOT ENOUGH TIME HAHAHAH")
    console.log("GAME OVER YOU LOSE BITCH")
    clockIsRunning = false;
    return;
  }
  if (!containsFlipped) {
    lockedBoard = true;
    wonOrLost = "won";
    gamesPlayed = gamesPlayed + 1;
    clearInterval(myInterval);
    gid("gameNR").innerHTML = "Game count: " + gamesPlayed
    clockIsRunning = false;
    addToHighScores();
    alert("GAME OVER YOU WIN")
    console.log("GAME OVER YOU WIN BITCH")
    return;
  }
  console.log(divCards);
}
function clickedCard(card) {
  if (lockedBoard) {
    return;
  }
  if (timeRemaining == 100) {
    clock();
    clockIsRunning = true;
  }
  if (card.classList.contains("correct")) {
    return;
  }
  if (firstCard == card) {
    return
  }
  card.classList.remove("flipped")
  if (firstCard == null) {
    firstCard = card
  } else if (secondCard == null) {
    secondCard = card;
  }
  if (checkCards()) {
    console.log("CARDS ARE SAME")
    lockedBoard = true;
    setTimeout(() => {
      setCardsCorrect();
      clearCards();
      gameOverCheck();
      lockedBoard = false;
    }, 1000);
    scoreTemp = scoreTemp + 20;
    gid("score").innerHTML = "Score: " + (scoreTemp);
    return;
  }
  if (!(firstCard == null) && !(secondCard == null)) {
    scoreTemp = scoreTemp - 10;
    gid("score").innerHTML = "Score: " + (scoreTemp);
    lockedBoard = true;
    setTimeout(() => {
      flipCards();
      clearCards();
      lockedBoard = false;
    }, 1500);
  }
}
function startGame() {
  if (lockedBoard) {
    setTimeout(() => {
      lockedBoard = false;
      startGame()
    }, 50);
    return
  }
  resetBoard();
  setTimeout(() => {
    if (Number.isInteger(sizeValue)) {
      makeDeck(sizeValue);
        for (var j = 0; j < deck.length; j++) {
          var card = document.createElement("div");
          card.className = "card";
          card.classList.add(deck[j].suit)
          card.classList.add("f-" + deck[j].rank)
          card.classList.add("flipped")
          card.addEventListener("click", function() {
            clickedCard(this);
          })
          gid("play_area").appendChild(card);
        }
      }
  }, 50);
  console.log(deck);
  console.log(cards.length);
}
checkInputLength();
makeAllCards();
gid("name").addEventListener("keypress", function(){
  limit(this);
});
gid("checkHighScores").addEventListener("click", function(){
  alert(scoresString);
});
gid("start_game").addEventListener("click", startGame);
