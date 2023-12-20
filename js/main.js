
const SOURCE_CARDS = [
  { img: 'https://i.imgur.com/QfBgEMw.jpg', matched: false },
  { img: 'https://i.imgur.com/QB5nIq1.jpg', matched: false },
  { img: 'https://i.imgur.com/gcMXISM.jpg', matched: false },
  { img: 'https://i.imgur.com/rYZZqG1.jpg', matched: false },
  { img: 'https://i.imgur.com/8lNJKun.jpg', matched: false },
  { img: 'https://i.imgur.com/ORkhI77.jpg', matched: false },
  { img: 'https://i.imgur.com/oRqfOar.jpg', matched: false },
  { img: 'https://i.imgur.com/vuFhVHk.jpg', matched: false },
  { img: 'https://i.imgur.com/YagzY3j.jpg', matched: false },
  { img: 'https://i.imgur.com/UkWIeAv.jpg', matched: false },
  { img: 'https://i.imgur.com/vkJmw0D.jpg', matched: false },
  { img: 'https://i.imgur.com/3tEibUk.jpg', matched: false }
];
const CARD_BACK = 'https://i.imgur.com/CMVQ3mc.png';

/*----- state variables -----*/
let cards; // Array of 16 shuffled card objects
let firstCard; // First card clicked (card object) or null
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
  numBad = 0;
  ignoreClicks = false;
  render();
}

function render() {
  cards.forEach(function(card, idx) {
    const imgEl = document.getElementById(idx);
    const src = (card.matched || card === firstCard) ? card.img : CARD_BACK;
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
    if (firstCard.img === card.img) {
      firstCard.matched = card.matched = true;
    } else {
      numBad++;
    }
    firstCard = null;
  } else {
    firstCard = card;
  }
  render();
}
