class Deck {
  constructor(cards) {
    this.cards = cards;
    this.matchedCards = [];
    this.selectedCards = [];
    this.matches = 0;
  }

  shuffle(cardDivs) {
    var currentIndex = cardDivs.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = cardDivs[currentIndex];
      cardDivs[currentIndex] = cardDivs[randomIndex];
      cardDivs[randomIndex] = temporaryValue;
    }
    return cardDivs;
  }

  checkSelectedCards(id) {
    var selectedCard = this.cards.find(function(card) {
      if (card.id === Number(id)) {
        return card
      }
    });
    if (this.selectedCards.length < 2) {
      this.selectedCards.push(selectedCard)
    }
    if (this.selectedCards.length === 2 && this.selectedCards[0].id === this.selectedCards[1].id) {
      this.matchedCards = this.selectedCards.concat(this.matchedCards);
      this.matches += 1;
      this.selectedCards = []
      return true;
    } return false;
  }
}
