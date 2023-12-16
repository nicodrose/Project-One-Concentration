A.User Stories
1. As a player, I want to be able to click on a timer button to begin the game and see how much time has passed / how much time I have.
2. As a player, I want to be able to flip a card to see it's rank and have 5 seconds to consider it's location.
3. As a player, I want to know if I have successfully matched a pair of cards.
4. As a player, I want to know if I have successfully matched all pairs of cards.

  B.Overall Design
1. Want a relatively minamalist design so there are not too many things distracting the player from the game.

  C.Wireframe
1. https://excalidraw.com/

  D.psuedocode for concentration game( for solo play, not player 1 vs player 2 which would determine winner based on most pairs flipped)

Would not be able to have a leaderboard because there's nowhere I could store the data. Could do more points if they complete in less time.

Game board display:
1. Display title
2. Display board background
3. Display cards in grid(13x4) - us cardstart.min(condensed, takes up less space)
4. Display timer(time limit of 2 minutes)

card sorting:
1. randomly sort cards at each reset of the game - buildOriginalDeck -> getNewShuffledDeck -> renderNewShuffledDeck

card flipping & matching:
1. display back of all cards

2. flip card up when clicked(show face)

3. if current card number and last card rank match, flip both cards up until end of game(suit does not matter)
if card 2 rank === card 1 rank, set values to 1(flipped up)
  show face and shadow matched pairs

4. if current card and last card rank do not match, wait 5 seconds then flip both cards back
if card 2 rank !== card 1 rank, set values to - 1(flipped down)
  (best method to stop the player from clicking on more cards during that 5 seconds ? maybe flip up and gray - out the matched pairs so that I can set a limit on the number of cards that can be flipped up at a time to 2) render

6. matched pairs - ignore clicks on matched pairs

timer:
1. display timer at 0: 00.starts when clicked, ends at the earlier of 2min or when all pairs have been matched(when every card is flipped up)

event listeners:
1. timer
2. cards
3. reset button


/*----- state variables -----*/
all face down cards
selected cards (face up)
matched pairs

results -> {
    pair: shadow
    no pair: face down
}

// constants

// cached element references

// event listeners

// functions