var startButton = document.querySelector(".start-game");
var playerOneName = document.querySelector(".player-name");
var playerTwoName = document.querySelector(".player-two");
var page = document.querySelector(".intro-main");
var main = document.querySelector("main");
var card = document.querySelector(".card")
var gameCards = [];

startButton.addEventListener("click", formValidation);
page.addEventListener("click", startGame)
// main.addEventListener("click", flipCard)

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
      <h2 class="welcome">WELCOME ${playerOneName.value.toUpperCase()} NAME AND ${playerTwoName.value.toUpperCase()} NAME!</h2>
        <p class="description">The goal of the game is to find all 5 pairs of cards as quickly as possible. The player that finds the greatest number of pairs, wins</p>
        <p class="description">To begin playing, the player whose name is highlighted can click any card in the card pile. It will flip over and reveal a picture of Beyonc&eacute;. Click another card. If they match, they will disappear and you will have completed a match! If they don't, you'll have three seconds to look at them before they flip back over. Then it's time for the other player to try!</p>
        <p class="description">After you play, you'll see the name of the final winner and how long it took to win the game.</p>
        <button class="start-game overview-button">PLAY GAME</button>
    </section>
  </main>`
  page.style.padding = "0px";
}

function createInstance() {
  // debugger;
  for (var i = 0; i < 10; i++) {
  var beyCard = new Card(i);
  gameCards.push(beyCard);
}
  console.log(gameCards)
  // gameCards.beyCard[i].matchInfo = i;
  console.log(gameCards);
  return gameCards;
}


function startGame (event) {
  if (event.target.classList.contains("overview-button")) {
    var newCard = createInstance();

    page.innerHTML = `<main class="game-page">
      <aside class="left">
        <header class="game-header one">
          <h3>PLAYER 1 NAME</h3>
          <span class="top-player aside-text">#4 TOP PLAYER</span>
        </header>
        <section class="score one">
          <span class="aside-text">MATCHES THIS ROUND</span>
          <span class="score-number">5</span>
        </section>
        <footer>
          <h3>GAME WINS</h3>
          <div class="round-info"><span class="aside-text">ROUND 1</span><span class="aside-text time">1000 MINUTES</span></div>
          <div class="round-info"><span class="aside-text">ROUND 1</span><span class="aside-text time">1000 MINUTES</span></div>
        </footer>
      </aside>
      <section class="cards">

      <div class="card-${newCard[0].matchInfo}-front card">B</div>
      <div class="card-${newCard[0].matchInfo}-back card"></div>
      <div class="card-${newCard[1].matchInfo}-front card">B</div>
      <div class="card-${newCard[1].matchInfo}-back card"></div>
      <div class="card-${newCard[2].matchInfo}-front card">B</div>
      <div class="card-${newCard[2].matchInfo}-back card"></div>
      <div class="card-${newCard[3].matchInfo}-front card">B</div>
      <div class="card-${newCard[3].matchInfo}-back card"></div>
      <div class="card-${newCard[4].matchInfo}-front card">B</div>
      <div class="card-${newCard[4].matchInfo}-back card"></div>
      <div class="card-${newCard[5].matchInfo}-front card">B</div>
      <div class="card-${newCard[5].matchInfo}-back card"></div>
      <div class="card-${newCard[6].matchInfo}-front card">B</div>
      <div class="card-${newCard[6].matchInfo}-back card"></div>
      <div class="card-${newCard[7].matchInfo}-front card">B</div>
      <div class="card-${newCard[7].matchInfo}-back card"></div>
      <div class="card-${newCard[8].matchInfo}-front card">B</div>
      <div class="card-${newCard[8].matchInfo}-back card"></div>
      <div class="card-${newCard[9].matchInfo}-front card">B</div>
      <div class="card-${newCard[9].matchInfo}-back card"></div>

      </section>
      <aside class="right">
        <header class="game-header two">
          <h3>PLAYER 2 NAME</h3>
          <span class="top-player aside-text">#4 PLAYER</span>
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

  } console.log(gameCards);
}




// function flipCard(event) {
//   if (event.target.classList.contains("card").matchInfo === event.target.classList.contains("card").matchInfo){
//     console.log(event);
//   }
// }
