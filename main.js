var box = document.querySelector(".dropdown-box");
var convertedTime;
var endTime;
var hamburger = document.querySelector(".hamburger")
var main = document.querySelector("main");
var newDeck;
// var newPlayer;
var page = document.querySelector(".intro-main");
var playerOneName = document.querySelector(".player-name");
var playerTwoName = document.querySelector(".player-two");
var startButton = document.querySelector(".start-game");
var startTime;

var topPlayer = [];
var gameCards = [];



startButton.addEventListener("click", formValidation);
page.addEventListener("click", clickHandler)
hamburger.addEventListener("click", dropdownBox)

window.onload = checkLocalStorage();


function checkLocalStorage() {
  for (var i = 0; i < localStorage.length; i++) {
    var id = localStorage.key(i);
    var item = JSON.parse(localStorage.getItem(id));
    item = new Player(item.name, item.time, item.id);
    topPlayer.push(item);
  }
}

function clickHandler(event) {
  if (event.target.classList.contains("overview-button") || event.target.classList.contains("btn")) {
    startTime = Date.now();
    startGame(event);
  } if (event.target.classList.contains("card")) {
    flipCard(event);
  } if (event.target.classList.contains("hamburger")) {
    dropdownBox();
  }
}

function dropdownBox() {
  var text = document.querySelector("top-winner")
  box.classList.toggle("show");
}

function flipCard(event) {
  if (newDeck.selectedCards.length >= 2 || event.target.classList.contains("back")) {
    return;
  } else if (event.target.classList.contains("card")) {
    event.target.classList.add("flip");
    var cardsDoMatch = newDeck.checkSelectedCards(event.target.dataset.id);
    var matchesThisRound = document.querySelector(".score-number")
    if (cardsDoMatch === true) {
      matchesThisRound.innerHTML = newDeck.matches;
      setTimeout(removeMatchedCards, 1000);
    } if (cardsDoMatch === false && newDeck.selectedCards.length === 2) {
      setTimeout(reflipCards, 1000)
    }
  }
}

function reflipCards() {
  var cardOne = document.querySelectorAll(`[data-id='${newDeck.selectedCards[0].id}']`)
  var cardTwo = document.querySelectorAll(`[data-id='${newDeck.selectedCards[1].id}']`)
  for (var i = 0; i < 4; i++) {
    cardOne[i].classList.remove("flip");
    cardTwo[i].classList.remove("flip");
    newDeck.selectedCards = [];
  }
}

function removeMatchedCards() {
  var cardOne = document.querySelectorAll(`[data-id='${newDeck.matchedCards[0].id}']`)
  var cardTwo = document.querySelectorAll(`[data-id='${newDeck.matchedCards[1].id}']`)
  for (var i = 0; i < 4; i++) {
    cardOne[i].remove();
    cardTwo[i].remove();
    endTime = Date.now();
  } if (newDeck.matchedCards.length === 10) {
    winPage();
    newPlayer = new Player(playerOneName.value, (endTime - startTime));
    newPlayer.saveToLocal()
  }
}

function formValidation() {
  if (!playerOneName.value || playerOneName.value === "ENTER YOUR NAME") {
    (playerOneName.value = "ENTER YOUR NAME");
    // (playerTwoName.value = "ENTER YOUR NAME") !playerTwoName.value ||  || playerTwoName.value === "ENTER YOUR NAME"
  } else goToInstructions(event);
}

function goToInstructions(event) {
  hideTopFive();
  event.target.classList.contains("start-game")
  page.innerHTML = `<main class="overview-page">
    <section class="overview-content">
      <h2 class="welcome">WELCOME ${playerOneName.value.toUpperCase()}!</h2>
        <p class="description">The goal of the game is to find all 5 pairs of cards as quickly as possible. The player that finds the greatest number of pairs, wins</p>
        <p class="description">To begin playing, the player whose name is highlighted can click any card in the card pile. It will flip over and reveal a picture of Beyonc&eacute;. Click another card. If they match, they will disappear and you will have completed a match! If they don't, you'll have three seconds to look at them before they flip back over. Then it's time for the other player to try!</p>
        <p class="description">After you play, you'll see the name of the final winner and how long it took to win the game.</p>
        <button class="start-game overview-button">PLAY GAME</button>
    </section>
  </main>`
  page.style.padding = "0px";
}

function timeConvert(time) {
  var min = Math.floor(time / 60000);
  var sec = ((time % 60000) / 1000).toFixed(0);
  convertedTime = (sec == 60 ? (min+1) + ":00" : min + ":" + (sec < 10 ? "0" : "") + sec);
  return convertedTime;
}

function winPage() {
  hideTopFive();
    main.innerHTML = `<main class="winner-page">
      <h2 class="congrats">CONGRATULATIONS, ${playerOneName.value.toUpperCase()} WINS!</h2>
      <span class="final-time">It took you ${timeConvert(endTime - startTime)} to win!</span>
      <span class="to-restart">Click below to keep playing.</span>
      <div class="game-buttons">
        <button class="new-game btn">NEW GAME</button>
      </div>
    </main>`
}

function createInstance() {
  for (var i = 0; i < 10; i++) {
  var beyCard = new Card(Math.floor(i/2), i);
  gameCards.push(beyCard);
}
  pushToDeck(gameCards)
  return gameCards;
}

function pushToDeck(gameCards) {
  newDeck = new Deck(gameCards);
}

function hideTopFive() {
  if (box.classList.contains("show")) {
    box.classList.remove("show");
  }
}

function makeCardDivs(newCard) {
  var cardDivs = [];
  for (var i = 0; i < 5; i++) {
    cardDivs.push(
    `<div class="card-container">
       <div class="card-${i}-front front card" data-id="${i}">B</div>
       <div class="card-${i}-back back card" data-id="${i}"></div>
     </div>`
   );
     cardDivs.push(
     `<div class="card-container">
      <div class="card-${i}-front front match-${i} card" data-id="${i}">B</div>
      <div class="card-${i}-back back match-${i} card" data-id="${i}"></div>
    </div>`
    );
  }
  var allDivs = cardDivs;
  return newDeck.shuffle(allDivs);
}

function startGame (event) {
  hideTopFive();
  var newCard = createInstance();
  var randomDivs = makeCardDivs(newCard);
  page.innerHTML = `<main class="game-page">
    <aside class="left">
      <header class="game-header one">
        <h3>${playerOneName.value}</h3>
        <span class="top-player aside-text">#4 TOP PLAYER</span>
      </header>
      <section class="score one">
        <span class="aside-text">MATCHES THIS ROUND</span>
        <span class="score-number">${newDeck.matches}</span>
      </section>
      <footer>
      </footer>
    </aside>
    <section class="cards">
    ${randomDivs[0]}
    ${randomDivs[1]}
    ${randomDivs[2]}
    ${randomDivs[3]}
    ${randomDivs[4]}
    ${randomDivs[5]}
    ${randomDivs[6]}
    ${randomDivs[7]}
    ${randomDivs[8]}
    ${randomDivs[9]}
    </section>
  </main>`
}
