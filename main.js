var startButton = document.querySelector(".start-game");
var playerOneName = document.querySelector(".player-name");
var playerTwoName = document.querySelector(".player-two");
var page = document.querySelector(".intro-main");
var main = document.querySelector("main");
var gameCards = [];
var newDeck;
var startTime;
var endTime;
var newPlayer;
var convertedTime;


startButton.addEventListener("click", formValidation);
page.addEventListener("click", clickHandler)


function clickHandler(event) {
  if (event.target.classList.contains("overview-button")) {
    startTime = Date.now();
    startGame(event);
  } if (event.target.classList.contains("card")){
    flipCard(event);
  }
}

function flipCard(event) {
  var matchesThisRound = document.querySelector(".score-number")
  // event.target.classList.contains("card")
  if (newDeck.selectedCards.length >= 2 || event.target.classList.contains("back")) {
    return;
  } else if (event.target.classList.contains("card")) {
    // console.log(event)
    // console.log(newDeck)
    // console.log(event.target)
    event.target.classList.add("flip");
    var cardsDoMatch = newDeck.checkSelectedCards(event.target.dataset.id);
    if (cardsDoMatch === true) {
      matchesThisRound.innerHTML = newDeck.matches;
      setTimeout(removeMatchedCards, 1000);
      console.log(newDeck);
    } if (cardsDoMatch === false && newDeck.selectedCards.length === 2) {
      setTimeout(reflipCards, 1000)
    }
  }
}

function reflipCards() {
  var cardOne = document.querySelectorAll(`[data-id='${newDeck.selectedCards[0].id}']`)
  var cardTwo = document.querySelectorAll(`[data-id='${newDeck.selectedCards[1].id}']`)
  for (var i = 0; i < 2; i++) {
    cardOne[i].classList.remove("flip");
    cardTwo[i].classList.remove("flip");
    newDeck.selectedCards = [];
  }
}

function removeMatchedCards() {
  var cardOne = document.querySelectorAll(`[data-id='${newDeck.matchedCards[0].id}']`)
  var cardTwo = document.querySelectorAll(`[data-id='${newDeck.matchedCards[1].id}']`)
  for (var i = 0; i < 2; i++) {
    cardOne[i].remove();
    cardTwo[i].remove();
    endTime = Date.now();
  } if (newDeck.matchedCards.length === 10) {
    winPage();
    newPlayer = new Player(playerOneName.value, convertedTime);
    newPlayer.saveToLocal()
    console.log(newPlayer)

  }
}

function formValidation() {
  if (!playerOneName.value || playerOneName.value === "ENTER YOUR NAME") {
    (playerOneName.value = "ENTER YOUR NAME");
    // (playerTwoName.value = "ENTER YOUR NAME") !playerTwoName.value ||  || playerTwoName.value === "ENTER YOUR NAME"
  } else goToInstructions(event);
}



function goToInstructions(event) {
  event.target.classList.contains("start-game")
  page.innerHTML = `<main class="overview-page">
    <section class="overview-content">
      <h2 class="welcome">WELCOME ${playerOneName.value.toUpperCase()} AND ${playerTwoName.value.toUpperCase()}!</h2>
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
    main.innerHTML = `<main class="winner-page">
      <h2 class="congrats">CONGRATULATIONS, ${playerOneName.value.toUpperCase()} WINS!</h2>
      <span class="final-time">It took you ${timeConvert(endTime - startTime)} to win!</span>
      <span class="to-restart">Click below to keep playing.</span>
      <div class="game-buttons">
        <button class="new-game btn">NEW GAME</button>
        <button class="rematch btn">REMATCH</button>
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

function startGame (event) {
  var newCard = createInstance();
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
        <h3>GAME WINS</h3>
        <div class="round-info"><span class="aside-text">ROUND 1</span><span class="aside-text time">1000 MINUTES</span></div>
        <div class="round-info"><span class="aside-text">ROUND 1</span><span class="aside-text time">1000 MINUTES</span></div>
      </footer>
    </aside>
    <section class="cards">
      <div class="card-${newCard[0].matchInfo}-front front card" data-id="0">B</div>
      <div class="card-${newCard[0].matchInfo}-back back card" data-id="0"></div>
      <div class="card-${newCard[1].matchInfo}-front front match-zero card" data-id="1">B</div>
      <div class="card-${newCard[1].matchInfo}-back back match-zero card" data-id="1"></div>
      <div class="card-${newCard[2].matchInfo}-front front card" data-id="2">B</div>
      <div class="card-${newCard[2].matchInfo}-back back card" data-id="2"></div>
      <div class="card-${newCard[3].matchInfo}-front front match-one card" data-id="3">B</div>
      <div class="card-${newCard[3].matchInfo}-back back match-one card" data-id="3"></div>
      <div class="card-${newCard[4].matchInfo}-front front card" data-id="4">B</div>
      <div class="card-${newCard[4].matchInfo}-back back card" data-id="4"></div>
      <div class="card-${newCard[5].matchInfo}-front front match-two card" data-id="5">B</div>
      <div class="card-${newCard[5].matchInfo}-back back match-two card" data-id="5"></div>
      <div class="card-${newCard[6].matchInfo}-front front card" data-id="6">B</div>
      <div class="card-${newCard[6].matchInfo}-back back card" data-id="6"></div>
      <div class="card-${newCard[7].matchInfo}-front front match-three card" data-id="7">B</div>
      <div class="card-${newCard[7].matchInfo}-back back match-three card" data-id="7"></div>
      <div class="card-${newCard[8].matchInfo}-front front card" data-id="8">B</div>
      <div class="card-${newCard[8].matchInfo}-back back card" data-id="8"></div>
      <div class="card-${newCard[9].matchInfo}-front front match-four card" data-id="9">B</div>
      <div class="card-${newCard[9].matchInfo}-back back match-four card" data-id="9"></div>
    </section>
    <aside class="right">
      <header class="game-header two">
        <h3>${playerTwoName.value}</h3>
        <span class="top-player aside-text"></span>
      </header>
      <section class="score two">
        <span class="aside-text">MATCHES THIS ROUND</span>
        <span class="score-number">5</span>
      </section>
      <footer>
        <h3>GAME WINS</h3>
        <div class="round-info"><span class="aside-text">ROUND 1</span><span class="aside-text time">1000 MINUTES</span></div>
        <div class="round-info"><span class="aside-text">ROUND 1</span><span class="aside-text time">1000 MINUTES</span></div>
      </footer>
    </aside>
  </main>`
}
