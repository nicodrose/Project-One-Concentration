//* constants
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const originalDeck = buildOriginalDeck();
renderDeckInContainer(originalDeck, document.getElementById('original-deck-container'));

// const CARD_BACK = 


/*----- state variables -----*/
let shuffledDeck;

// let firstCard;
// let numBad;
// let ignoreClicks;


//* cached element references
const shuffledContainer = document.getElementById('shuffled-deck-container');

// const msgEl = document.querySelector('h3');


//* event listeners
document.querySelector('button').addEventListener('click', renderNewShuffledDeck);

// document.querySelector('main').addEventListener('click', handleChoice);

//* functions
function getNewShuffledDeck() {
  const tempDeck = [...originalDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

function renderNewShuffledDeck() {
  shuffledDeck = getNewShuffledDeck();
  renderDeckInContainer(shuffledDeck, shuffledContainer);
}

function renderDeckInContainer(deck, container) {
  container.innerHTML = '';
  let cardsHtml = '';
  deck.forEach(function(card) {
    cardsHtml += `<div class="card ${card.face}"></div>`;
  });
  container.innerHTML = cardsHtml;
}

function buildOriginalDeck() {
  const deck = [];
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        face: `${suit}${rank}`,
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}

renderNewShuffledDeck();





// //* constants
// //need to include image urls for front and backs of the cards in the empty strings in the constants below
// const SOURCE_CARDS = [
//   {img: 'https://i.imgur.com/QfBgEMw.jpg', matched: false},
//   {img: 'https://i.imgur.com/QB5nIq1.jpg', matched: false},
//   {img: 'https://i.imgur.com/gcMXISM.jpg', matched: false},
//   {img: 'https://i.imgur.com/rYZZqG1.jpg', matched: false},
//   {img: 'https://i.imgur.com/8lNJKun.jpg', matched: false},
//   {img: 'https://i.imgur.com/ORkhI77.jpg', matched: false},
//   {img: 'https://i.imgur.com/oRqfOar.jpg', matched: false},
//   {img: 'https://i.imgur.com/vuFhVHk.jpg', matched: false}
// ];
// const CARD_BACK = 'https://i.imgur.com/CMVQ3mc.png';

// /*----- state variables -----*/
// let cards; // Array of 16 shuffled card objects
// let firstCard; // First card clicked (card object) or null
// let numBad; // Number of incorrect guesses
// let ignoreClicks;

// //winning logic: array iterator methods: could use "every" to determine if there's a win or not in this game

// //* cached element references
// const msgEl = document.querySelector('h3');

// //* event listeners
// document.querySelector('main').addEventListener('click', handleChoice);


// //* functions
// init();

// // Job of init - initialize all state, then call render()
// function init() {
//   cards = getShuffledCards();
//   firstCard = null;
//   numBad = 0;
//   ignoreClicks = false;
//   render();
// }

// function render() {
//   cards.forEach(function(card, idx) {
//     const imgEl = document.getElementById(idx);
//     const src = (card.matched || card === firstCard) ? card.img : CARD_BACK;
//     imgEl.src = src;
//     // card.img will return the string of the card image from the constants SOURCE_CARDS
//   });
//   msgEl.innerHTML = `Bad Count: ${numBad}`;
// }

// function getShuffledCards() {
//   let tempCards = [];
//   let cards = [];
//   for (let card of SOURCE_CARDS) {
//     tempCards.push({...card}, {...card});
//   }
//   while (tempCards.length) {
//     let rndIdx = Math.floor(Math.random() * tempCards.length);
//     let card = tempCards.splice(rndIdx, 1)[0];
//     cards.push(card);
//   }
//   return cards;
// }

//  // In response to user action, update all impacted state, then call render()
// function handleChoice(evt) {
//   const cardIdx = parseInt(evt.target.id);
//   if (isNaN(cardIdx) || ignoreClicks) return;
//   const card = cards[cardIdx];
//   if (firstCard) {
//     if (firstCard.img === card.img) {
//       // correct match
//       firstCard.matched = card.matched = true;
//     } else {
//       numBad++;
//     }
//     firstCard =  null;
//   } else {
//     firstCard = card;
//   }
//   render();
// }
