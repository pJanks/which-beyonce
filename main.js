var startButton = document.querySelector(".start-game");
var playerOneName = document.querySelector(".player-name");
var playerTwoName = document.querySelector(".player-two");
var page = document.querySelector(".intro-main");
var main = document.querySelector("main");
var card = document.querySelector(".card")

startButton.addEventListener("click", formValidation);
page.addEventListener("click", startGame)
main.addEventListener("click", flipCard)
// card.addEventListener("click", flipCard)

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

function startGame (event) {
  if (event.target.classList.contains("overview-button")) {
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
        <div class="card-one card">B</div>
        <div class="card-two card">B</div>
        <div class="card-three card">B</div>
        <div class="card-four card">B</div>
        <div class="card-five card">B</div>
        <div class="card-six card">B</div>
        <div class="card-seven card">B</div>
        <div class="card-eight card">B</div>
        <div class="card-nine card">B</div>
        <div class="card-ten card">B</div>
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
  }
}

function flipCard(event) {
  if (event.target.classList.contains("card")){
    console.log(event);
  }
}
