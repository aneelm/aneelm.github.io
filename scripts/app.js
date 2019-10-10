var firstCard, secondCard;
var cardsAreFlipped = false;
var cardsAreSame = false;
var lockBoard = false;

function gid(name) {
  return document.getElementById(name);
}

var selection = gid('selection')

function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}
function getCardRowAmounts(value) {
  if (value == 16) {
    var rowAmount = 4;
    var cardAmount = 4;
  } else if (value == 6) {
    var rowAmount = 1;
    var cardAmount = 6;
  } else if (value == 26) {
    var rowAmount = 2;
    var cardAmount = 13;
  } else if (value == 52) {
    var rowAmount = 4;
    var cardAmount = 13;
  }
  return [rowAmount, cardAmount];
}
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.getElementsByClassName('back-face')[0]
    .style.visibility = "visible";
    secondCard.getElementsByClassName('back-face')[0]
    .style.visibility = "visible";
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [cardsAreFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
function areCardsSame() {
  var firstXPosition = firstCard.getElementsByClassName('front-face')[0]
  .style.backgroundPositionX;
  var secondXPosition = secondCard.getElementsByClassName('front-face')[0]
  .style.backgroundPositionX;
  var firstYPosition = firstCard.getElementsByClassName('front-face')[0]
  .style.backgroundPositionY;
  var secondYPosition = secondCard.getElementsByClassName('front-face')[0]
  .style.backgroundPositionY;
  if (firstXPosition == secondXPosition) {
    console.log(firstXPosition + " " + secondXPosition);
    if (firstYPosition == secondYPosition) {
      console.log(firstYPosition + " " + secondYPosition);
      return true;
    }
  }
  return false;
}
function flipCard(j) {
  console.log("trying to flip")
  if (lockBoard) {
    return;
  }
  if (cardsAreFlipped && cardsAreSame) {
    cardsAreSame = false;
    cardsAreFlipped = false;
    firstCard = null;
    secondCard = null;
    return;
  }
  if (gid(j) == firstCard) {
    return;
  }
  if (firstCard == null) {
      firstCard = gid(j);
  } else if (secondCard == null) {
      secondCard = gid(j);
  }
  gid(j).getElementsByClassName('back-face')[0]
  .style.visibility = "hidden";
  if (!(firstCard == null) && !(secondCard == null)) {
    cardsAreFlipped = true;
    if (areCardsSame()) {
      cardsAreSame = true;
      console.log("BOTH ARE SAME!!!!");
    }
  }
  if (cardsAreFlipped && !cardsAreSame) {
    unflipCards();
   return;
 }
  console.log(firstCard);
  console.log(secondCard);
}

function assignFrontFace(j) {
  var x = Math.floor(Math.random()*13);
  var y = Math.floor(Math.random()*4);
  gid(j).getElementsByClassName('front-face')[0]
  .style.backgroundPositionX = -(x*80) + "px";
  gid(j).getElementsByClassName('front-face')[0]
  .style.backgroundPositionY = -(y*120) + "px";
}

function startGame() {
  resetBoard();
  var opt = selection.options[selection.selectedIndex];
  var value = parseInt(opt.value);
  clearBox("play_area");
  if (Number.isInteger(value)) {
    var rowAmount = getCardRowAmounts(value)[0];
    var cardAmount = getCardRowAmounts(value)[1];
    for (var i = 0; i < rowAmount; i++) {
      var innerDivRow = document.createElement("div");
      innerDivRow.className = "row";
      innerDivRow.id = "row" + i;
      gid("play_area").appendChild(innerDivRow);
      for (var j = 0; j < cardAmount; j++) {
        var innerDiv = document.createElement("div");
        var backImg = document.createElement("img");
        var frontImg = document.createElement("img");
        backImg.className = "back-face";
        frontImg.className = "front-face"
        innerDiv.className = "card";
        innerDiv.id = "card" + i + j;
        innerDiv.appendChild(frontImg);
        innerDiv.appendChild(backImg);
        innerDiv.addEventListener("click", function() {
          flipCard(this.id)});
        gid("row" + i).appendChild(innerDiv);
        assignFrontFace(innerDiv.id);
      }
    }
    gid("play_area").style.width = (82*cardAmount) + "px";
  }

  console.log(value);
}
gid("start_game").addEventListener("click", startGame);
