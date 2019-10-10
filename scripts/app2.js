var ranks =
["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var suits =
["C", "D", "H", "S"];
var cards = [];
var deck = [];
var firstCard, secondCard;
var lockedBoard = false;

function gid(name) {
  return document.getElementById(name);
}
function clearBox(name){
    gid(name).innerHTML = "";
    clearCards();
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
    if (firstCard.className == secondCard.className) {
      return true;
    } else {
      return false;
    }
  }
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
  if (lockedBoard) {
    return;
  }
  if (card.classList.contains("correct")) {
    return;
  }
  card.classList.remove("flipped")
  if (firstCard == null) {
    firstCard = card
  } else if (secondCard == null) {
    secondCard = card;
  }
  if (checkCards()) {
    console.log("CARDS ARE SAME")
    setCardsCorrect();
    clearCards();
    gameOverCheck();
    return;
  } else {
    console.log("CARDS ARE NOT THE SAME")
  }
  if (!(firstCard == null) && !(secondCard == null)) {
    lockedBoard = true;
    setTimeout(() => {
      flipCards();
      clearCards();
      lockedBoard = false;
    }, 1500);
  }
}
function startGame(){
  console.log("start game")
  var opt = selection.options[selection.selectedIndex];
  var value = parseInt(opt.value);
  clearBox("play_area");
  if (Number.isInteger(value)) {
    makeAllCards();
    makeDeck(value);
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
    console.log(deck);
    console.log(cards.length);
}

gid("start_game").addEventListener("click", startGame);