
const SOURCE_CARDS = [
  { img: 'css/card-library/images/diamonds/diamonds-r02.svg', matched: false },
  { img: 'css/card-library/images/diamonds/diamonds-r03.svg', matched: false },
  { img: 'css/card-library/images/diamonds/diamonds-r04.svg', matched: false },
  { img: 'css/card-library/images/diamonds/diamonds-r05.svg', matched: false },
  { img: 'css/card-library/images/diamonds/diamonds-r06.svg', matched: false },
  { img: 'css/card-library/images/diamonds/diamonds-r07.svg', matched: false },
  { img: 'css/card-library/images/diamonds/diamonds-r08.svg', matched: false },
  { img: 'css/card-library/images/diamonds/diamonds-r09.svg', matched: false },
  { img: 'css/card-library/images/diamonds/diamonds-r10.svg', matched: false },
  { img: 'css/card-library/images/diamonds/diamonds-J.svg', matched: false },
  { img: 'css/card-library/images/diamonds/diamonds-Q.svg', matched: false },
  { img: 'css/card-library/images/diamonds/diamonds-K.svg', matched: false }
];
const CARD_BACK = 'css/card-library/images/backs/red.svg';

/*----- state variables -----*/
let cards; // Array of 16 shuffled card objects
let firstCard; // First card clicked (card object) or null
let secondCard
let numBad; // Number of incorrect guesses
let ignoreClicks;


//* cached element references
const msgEl = document.querySelector('h3');

//* event listeners
document.querySelector('main').addEventListener('click', handleChoice);


//* functions
init();


function init() {
  cards = getShuffledCards();
  firstCard = null;
  secondCard = null;
  numBad = 0;
  ignoreClicks = false;
  render();
}

function render() {
  cards.forEach(function(card, idx) {
    const imgEl = document.getElementById(idx);
    const src = (card.matched || card === firstCard || card === secondCard) ? card.img : CARD_BACK;
    imgEl.src = src;
  });
  msgEl.innerHTML = `Wrong Guess Count: ${numBad}`;
}

function getShuffledCards() {
  let tempCards = [];
  let cards = [];
  for (let card of SOURCE_CARDS) {
    tempCards.push({ ...card }, { ...card });
  }
  while (tempCards.length) {
    let rndIdx = Math.floor(Math.random() * tempCards.length);
    let card = tempCards.splice(rndIdx, 1)[0];
    cards.push(card);
  }
  return cards;
}

function handleChoice(evt) {
  const cardIdx = parseInt(evt.target.id);
  if (isNaN(cardIdx) || ignoreClicks) return;
  const card = cards[cardIdx];
  if (firstCard) {
    if (secondCard) {
      if (firstCard.img === secondCard.img) {
        firstCard.matched = secondCard.matched = true;
      }      
      firstCard = null;
      secondCard = null;
    } else {
      if (
        isNaN(cardIdx) ||
        ignoreClicks ||
        cards[cardIdx] === firstCard) return;
      secondCard = card;
      numBad++
    }
  } else {
    firstCard = card;
  }
  render();
}
