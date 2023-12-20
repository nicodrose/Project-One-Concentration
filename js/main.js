
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
let secondCard // Second card clicked
let numBad; // Number of guesses
let ignoreClicks;
let outcome; 

//* cached element references
const msgEl = document.querySelector('h3');
const msgOutcomeEl = document.querySelector('h2');
const playAgain = document.querySelector('button');

//* event listeners
document.querySelector('main').addEventListener('click', handleChoice);
playAgain.addEventListener('click', init);

//* functions
init();

function init() {
  cards = getShuffledCards();
  firstCard = null;
  secondCard = null;
  numBad = 0;
  ignoreClicks = false;
  outcome = null;
  render();
}

function render() {
  cards.forEach(function(card, idx) {
    const imgEl = document.getElementById(idx);
    const src = (card.matched || card === firstCard || card === secondCard) ? card.img : CARD_BACK;
    imgEl.src = src;
  });
  msgEl.innerHTML = `Bad Guesses: ${numBad}`;
  if (outcome === 'win') {
    msgOutcomeEl.innerHTML = `You da winner!`;
    playAgain.style.visibility = 'visible';
  } else if (outcome === 'lose') {
    msgOutcomeEl.innerHTML = 'Better luck next time :(';
    playAgain.style.visibility = 'visible';
  } else if (outcome === null) {
    msgOutcomeEl.innerHTML = '';
    playAgain.style.visibility = 'hidden';
  }
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
    secondCard = card;
    if (secondCard) {
      if (firstCard.img === secondCard.img) {
        firstCard.matched = secondCard.matched = true;
        firstCard = null;
        secondCard = null;
         if (cards.every(card => card.matched === true)) {
          outcome = 'win';
         }
      } else {
        numBad++
        if (numBad >= 25) {
          outcome = 'lose';
        }
        const timeout = setTimeout(function() {
          firstCard = null;
          secondCard = null;
          render();
        }, 500) 
      }
    } 
  } else {
    firstCard = card;
  }
  render();
}
