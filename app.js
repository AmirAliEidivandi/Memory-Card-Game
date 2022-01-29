const cards = document.querySelectorAll(".memory-card");

let cardIsFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!cardIsFlipped) {
        cardIsFlipped = true;
        firstCard = this;
        return;
    }
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatched = firstCard.dataset.name === secondCard.dataset.name;
    isMatched ? disableCards() : unFlipCards();
}

const disableCards = () => {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

const unFlipCards = () => {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1500);
}

const resetBoard = () => {
    [cardIsFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPositions = Math.floor(Math.random() * 12);
        card.style.order = randomPositions;
    });
})();

cards.forEach((card) => {
    card.addEventListener("click", flipCard);
});
