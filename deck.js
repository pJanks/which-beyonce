class Deck {
  constructor(cards) {
    this.cards = cards;
    this.matchedCards = [];
    this.selectedCards = [];
    this.matches = 0;
  }

  shuffle() {

  }

  checkSelectedCards(id) {
    var selectedCard = this.cards.find(function(card) {
      if (card.id === Number(id)) {
        return card
      }
    })
    if (this.selectedCards.length < 2) {
      this.selectedCards.push(selectedCard)
    }
    if (this.selectedCards.length === 2 && this.selectedCards[0].matchInfo === this.selectedCards[1].matchInfo) {
      this.matchedCards = this.selectedCards.concat(this.matchedCards);
      this.matches += 1;
      this.selectedCards = []
      return true;
    } return false;

  }

  moveToMatched() {

  }
}
