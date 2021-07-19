const deckCards = 
["Agility.png", "Agility.png", "Boat.png", "Boat.png", "Citizenship.png", "Citizenship.png", "Hack.png", "Hack.png", "Nerd-Rage.png", "Nerd-Rage.png", "Nuka-Cola.png", "Nuka-Cola.png", "Robotics.png", "Robotics.png", "Shock.png", "Shock.png"];

const deck = document.querySelector(".deck");
let opened = [];
let matched = [];
const modal = document.getElementById("modal");
const reset = document.querySelector(".reset-btn");
const playAgain = document.querySelector(".play-again-btn");
const movesCount = document.querySelector(".moves-counter");
let moves = 0;
const star = document.getElementById("star-rating").querySelectorAll(".star");
let starCount = 3;
const timeCounter = document.querySelector(".timer");
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }
  return array;
}

function startGame() {
  // Invoke shuffle function and store in variable
  const shuffledDeck = shuffle(deckCards); 
  // Iterate over deck of cards array
  for (let i = 0; i < shuffledDeck.length; i++) {
    // Create the <li> tags
    const liTag = document.createElement('LI');
    // Give <li> class of card
    liTag.classList.add('card');
    // Create the <img> tags
    const addImage = document.createElement("IMG");
    // Append <img> to <li>
    liTag.appendChild(addImage);
    // Set the img src path with the shuffled deck
    addImage.setAttribute("src", "img/" + shuffledDeck[i]);
    // Add an alt tag to the image
    addImage.setAttribute("alt", "image of vault boy from fallout");
    // Update the new <li> to the deck <ul>
    deck.appendChild(liTag);
  }
}
startGame();

function removeCard() {
  // As long as <ul> deck has a child node, remove it
  while (deck.hasChildNodes()) {
    deck.removeChild(deck.firstChild);
  }
}

function timer() {
  // Update the count every 1 second
  time = setInterval(function() {
    seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
    // Update the timer in HTML with the time it takes the user to play the game
    timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: " + minutes + " Mins " + seconds + " Secs" ;
  }, 1000);
}

function stopTime() {
  clearInterval(time);
}

function resetEverything() {
  // Stop time, reset the minutes and seconds update the time inner HTML
  stopTime();
  timeStart = false;
  seconds = 0;
  minutes = 0;
  timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: 00:00";
  // Reset star count and the add the class back to show stars again
  star[1].firstElementChild.classList.add("fa-star");
  star[2].firstElementChild.classList.add("fa-star");
  starCount = 3;
  // Reset moves count and reset its inner HTML
  moves = 0;
  movesCount.innerHTML = 0;
  // Clear both arrays that hold the opened and matched cards
  matched = [];
  opened = [];
  // Clear the deck
  removeCard();
  // Create a new deck
  startGame();
}

function movesCounter() {
  // Update the html for the moves counter
  movesCount.innerHTML ++;
  // Keep track of the number of moves for every pair checked
  moves ++;
}

function starRating() {
  if (moves === 14) {
    // First element child is the <i> within the <li>
    star[2].firstElementChild.classList.remove("fa-star");
    starCount--;
  }
  if (moves === 18) {
    star[1].firstElementChild.classList.remove("fa-star");
    starCount--;
  }
}

function compareTwo() {
  // When there are 2 cards in the opened array
  if (opened.length === 2) {
      // Disable any further mouse clicks on other cards
      document.body.style.pointerEvents = "none";
  }
  // Compare the two images src
  if (opened.length === 2 && opened[0].src === opened[1].src) {
    // If matched call match()
    match();
    // console.log("It's a Match!");
  } else if (opened.length === 2 && opened[0].src != opened[1].src) {
    // If No match call noMatch()
    noMatch();
    // console.log("NO Match!");
  }
}
function match() {
  /* Access the two cards in opened array and add
  the class of match to the imgages parent: the <li> tag
  */
  setTimeout(function() {
    opened[0].parentElement.classList.add("match");
    opened[1].parentElement.classList.add("match");
    // Push the matched cards to the matched array
    matched.push(...opened);
    // Allow for further mouse clicks on cards
    document.body.style.pointerEvents = "auto";
    // Check to see if the game has been won with all 8 pairs
    winGame();
    // Clear the opened array
    opened = [];
  }, 600);
  // Call movesCounter to increment by one
  movesCounter();
  starRating();
}

function compareTwo() {
  // When there are 2 cards in the opened array
  if (opened.length === 2) {
      // Disable any further mouse clicks on other cards
      document.body.style.pointerEvents = "none";
  }
  // Compare the two images src
  if (opened.length === 2 && opened[0].src === opened[1].src) {
    // If matched call match()
    match();
    // console.log("It's a Match!");
  } else if (opened.length === 2 && opened[0].src != opened[1].src) {
    // If No match call noMatch()
    noMatch();
    // console.log("NO Match!");
  }
}
function match() {
  /* Access the two cards in opened array and add
  the class of match to the imgages parent: the <li> tag
  */
  setTimeout(function() {
    opened[0].parentElement.classList.add("match");
    opened[1].parentElement.classList.add("match");
    // Push the matched cards to the matched array
    matched.push(...opened);
    // Allow for further mouse clicks on cards
    document.body.style.pointerEvents = "auto";
    // Check to see if the game has been won with all 8 pairs
    winGame();
    // Clear the opened array
    opened = [];
  }, 600);
  // Call movesCounter to increment by one
  movesCounter();
  starRating();
}

function winGame() {
  if (matched.length === 16) {
    stopTime();
    AddStats();
    displayModal();
  }
}
deck.addEventListener("click", function(evt) {
  if (evt.target.nodeName === "LI") {
    // To console if I was clicking the correct element 
    console.log(evt.target.nodeName + " Was clicked");
    // Start the timer after the first click of one card
  // Executes the timer() function
    if (timeStart === false) {
      timeStart = true; 
      timer();
    }
    // Call flipCard() function
    flipCard();
  }
  //Flip the card and display cards img
  function flipCard() {
    // When <li> is clicked add the class .flip to show img
    evt.target.classList.add("flip");
    // Call addToOpened() function
    addToOpened();
  }
   
  //Add the fliped cards to the empty array of opened
  function addToOpened() {
    /* If the opened array has zero or one other img push another 
    img into the array so we can compare these two to be matched
    */
    if (opened.length === 0 || opened.length === 1) {
      // Push that img to opened array
      opened.push(evt.target.firstElementChild);
    }
    // Call compareTwo() function
    compareTwo();
  }
});
reset.addEventListener('click', resetEverything);
playAgain.addEventListener('click',function() {
  modal.style.display = "none";
  resetEverything();
});
