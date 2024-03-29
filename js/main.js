/*----- constants -----*/
const CARD_FRONTS = [
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
const BACK_RED = 'css/card-library/images/backs/red.svg';

/*----- state variables -----*/
let cards; 
let firstCard; 
let secondCard 
let numBad; 
let ignoreClicks;
let outcome; 

/*----- cached element references -----*/
const msgEl = document.querySelector('h2');
const msgOutcomeEl = document.querySelector('h3');
const playAgain = document.querySelector('button');

/*----- event listeners -----*/
document.querySelector('main').addEventListener('click', handleChoice);
playAgain.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
  cards = getShuffledCards();
  firstCard = null;
  secondCard = null;
  numBad = 25;
  ignoreClicks = false;
  outcome = null;
  render();
}

function render() {
  cards.forEach(function(card, idx) {
    const imgEl = document.getElementById(idx);
    const src = (card.matched || card === firstCard || card === secondCard) ? card.img : BACK_RED;
    imgEl.src = src;
  });
  msgEl.innerHTML = `Bad Guesses Left: ${numBad}`;
  if (outcome === 'win') {
    msgOutcomeEl.innerHTML = `You Da Vinner!`;
    playAgain.style.visibility = 'visible';
  } else if (outcome === 'lose') {
    msgOutcomeEl.innerHTML = 'You Need Some Practice...';
    playAgain.style.visibility = 'visible';
  } else if (outcome === null) {
    msgOutcomeEl.innerHTML = '';
    playAgain.style.visibility = 'hidden';
  }
}

function getShuffledCards() {
  let shuffleCards = [];
  let cards = [];
  for (let card of CARD_FRONTS) {
    shuffleCards.push({ ...card }, { ...card });
  }
  while (shuffleCards.length) {
    let rndIdx = Math.floor(Math.random() * shuffleCards.length);
    let card = shuffleCards.splice(rndIdx, 1)[0];
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
        numBad--
        if (numBad <= 0) {
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
