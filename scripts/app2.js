var ranks =
["2", "3", "4", "5", "6", "7", "8", "9", "X", "J", "Q", "K", "A"];
var suits =
["C", "D", "H", "S"];
var cards = [];
var deck = [];
var firstCard, secondCard;
var lockedBoard = false;
var gameOpt;
var originalTimeLeft = 100;
var timeRemaining = 100;
var scoreOG = 100;
var scoreTemp = 100;
var isTimeUp = false;

#// TODO: VISKAB MINGIT LOOPI KUI AEG OTSA SAAB
function clock() {
  var myInterval = setInterval(() => {
    timeRemaining = timeRemaining - 1;
    gid("timer").innerHTML = "Timer: " + timeRemaining;
    if (timeRemaining < 1) {
      clearInterval(myInterval);
      isTimeUp = true;
      gameOverCheck();
    }
  }, 1000);
}
function allCardsInvisible() {
  var cardstochange = document.getElementsByClassName("flipped")
  for (var i = 0; i < cardstochange.length; i++) {
    cardstochange[i].classList.add("correct")
  }
}
function gid(name) {
  return document.getElementById(name);
}
function clearBox(name){
    gid(name).innerHTML = "";
    clearCards();
    lockedBoard = false;
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
  if (!(firstCard.classList.contains("flipped"))) {
    if (!(secondCard.classList.contains("flipped"))) {
      firstCard.classList.add("flipped")
      secondCard.classList.add("flipped")
    }
  }
}
function gameOverCheck() {
  console.log("gameOverCheck")
  if (isTimeUp) {
    lockedBoard = true;
    alert("GAME OVER YOU LOSE HAHHAHAHAH\nNOT ENOUGH TIME HAHAHAH")
    console.log("GAME OVER YOU LOSE BITCH")
  }
  var divCards = gid("play_area").children
  var containsFlipped = false;
  for (var i = 0; i < divCards.length; i++) {
    if (divCards[i].classList.contains("flipped")) {
      containsFlipped = true;
    }
  }
  if (!containsFlipped) {
    lockedBoard = true;
    alert("GAME OVER YOU WIN")
    console.log("GAME OVER YOU WIN BITCH")
  }
  console.log(divCards);
}
function clickedCard(card) {
  if (timeRemaining == 100) {
    clock();
  }
  if (lockedBoard) {
    return;
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
  } else {
    console.log("CARDS ARE NOT THE SAME")
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
function startGame(){
  console.log(gameOpt)
  console.log("start game")
  console.log(lockedBoard.toString())
  if (lockedBoard) {
    setTimeout(() => {
      lockedBoard = false;
      startGame()
    }, 50);
    return
  }
  var sizeOpt = selection.options[selection.selectedIndex];
  var gameOptZ = gameType.options[gameType.selectedIndex];
  gameOpt = parseInt(gameOptZ.value)
  var sizeValue = parseInt(sizeOpt.value);
  clearBox("play_area");
  timeRemaining = originalTimeLeft;
  gid("timer").innerHTML = "Timer: " + timeRemaining;
 // allCardsInvisible()
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
makeAllCards();
gid("start_game").addEventListener("click", startGame);
