//Challenge 1: Age in days

// function ageInDays() {
//   var birthYear = prompt("what is your Birth year ?");

//   if (birthYear != "") {
//     let age = (2020 - birthYear) * 365;

//     let h1 = document.createElement("h1");
//     let text = document.createTextNode("Your are: " + age + "Days Old");
//     h1.setAttribute("id", "ageIndays");
//     h1.appendChild(text);
//     document.getElementById("flex-box-result").appendChild(h1);
//   }
// }

// function reset() {
//   document.getElementById("ageIndays").remove();
// }

//Challenge 2: Cat Generator

//The function creates an img tag and add Id attribute to it.
// The Id attribute is needed to perform other operations later.
function generateCat() {
  var image = document.createElement("img");
  image.setAttribute("id", "catImages");
  var div = document.getElementById("flex-cat-gen");
  image.src =
    "https://api.thecatapi.com/api/images/get?format=src&type=gif&size=small";
  div.appendChild(image);  // adding img tag inside the div
}

function removeAllCats() {
  var imageCount = document.getElementsByTagName("img").length; // gets the number of image tags on the page
  while (imageCount != 0) {
    document.getElementById("catImages").remove();  // using the Id attribute created earlier to remove the img tag
    imageCount--;
  }
}

function removeCats() {
  if (document.getElementsByTagName("img").length > 0) {
    document.getElementById("catImages").remove();
  }
}

//Challenge 3: RPS
function rpsGame(yourChoice) {
  let humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randToRpsInt());

  let result = decideWinner(humanChoice, botChoice); // return an array of winner and looser[1,0]

  let message = finalMessage(result); //Object contaning the message and color

  rpsFrontEnd(humanChoice, botChoice, message);
}

function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ["rock", "paper", "scissors"][number];
}

function decideWinner(humanChoice, botChoice) {
  // Object stores the possible win, loss and draw scenarios when a rock, paper of scissor is selected.
  const rpsDatabase = {                       
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };

  let yourScore = rpsDatabase[humanChoice][botChoice];
  let computerScore = rpsDatabase[botChoice][humanChoice];

  return [yourScore, computerScore];
}

//returns an object containing the message text and the color of the message
function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { message: "You Lost", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "You Tied", color: "orange" };
  } else {
    return { message: "You Won", color: "green" };
  }
}

// We need to remove all the existing images from the div and add the choisec selected by
//the user and the bot along with the message

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  const imagesDatabase = {                    // Object containing the src of image tags
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };
  //Remove all the images
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  //Create new divs for the img tags 
  let humanDiv = document.createElement("div");
  let botDiv = document.createElement("div");
  let messageDiv = document.createElement("div");

  //displaying the Human selection
  humanDiv.innerHTML =
    "<img src='" +
    imagesDatabase[humanImageChoice] +
    "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
  document.getElementById("flex-box-rps-div").append(humanDiv);

  //Displaying the Win or loss messages
  messageDiv.innerHTML =
    "<h1 style='color:" +
    finalMessage["color"] +
    "; font-size: 60px; padding:30px'>" +
    finalMessage["message"] +
    "</h1>";
  document.getElementById("flex-box-rps-div").append(messageDiv);

  //Displaying the bot selection image
  botDiv.innerHTML =
    "<img src='" +
    imagesDatabase[botImageChoice] +
    "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";
  document.getElementById("flex-box-rps-div").append(botDiv);
}

//Refresh the page

function playAgain() {
  window.location.reload();
}

//Challenge 4: Change color of all buttons
//Gets all the buttons on tha Page
//We need to keep track of the initial color of the buttons(the button classes)
let all_buttons = document.getElementsByTagName("button");
let copyButtons = [];

// Object containing the button classes for random indexes
const randomButtons = {
  0: "btn-primary",
  1: "btn-danger",
  2: "btn-success",
  3: "btn-warning",
};

//save copy of the buttons
for (let i = 0; i < all_buttons.length; i++) {
  copyButtons.push(all_buttons[i].classList[1]);
}

//Function calls the respective color function based on selection
function buttonColorChange(option) {
  if (option.value === "red") {
    buttonsRed();
  } else if (option.value === "green") {
    buttonsGreen();
  } else if (option.value === "reset") {
    buttonsReset();
  } else if (option.value === "random") {
    randomColors();
  }
}

function buttonsRed() {
  for (let i = 0; i < all_buttons.length; i++) {
// ClassList gets the class of current button, it is a List because the button has 2 classes
// btn and btn-primary and so on. Here we need to change the class of second index ie 1 to selected option
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);                                                               
    all_buttons[i].classList.add("btn-danger");
  }
}

function buttonsGreen() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
}


function randomColors() {
  for (let i = 0; i < all_buttons.length; i++) {
    const random = Math.floor(Math.random() * 4); //Every Button gets a new random color
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(randomButtons[random]);
  }
}

// Remove the classes of all the button and add the ne classes from the previously saved copy
function buttonsReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyButtons[i]);
  }
}

//Challenge 5: Blackjack

let blackjackGame = {
  you: {                                 // User id object
    scoreSpan: "#your-blackjack-result", // Id of the score span
    div: "#your-box",                    //user dibv id   
    score: 0,             
  },
  dealer: {                             //dealer id objectri
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },                                    // sample card object
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
  cardsMap: {                           // score associated with every card
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 1,
  },
  wins: 0,    
  losses: 0,
  draws: 0,
  isStand: false,                       // Handles the enabling and disabling of buttons
  turnsOver: false,
};

const YOU = blackjackGame["you"];         // getting the user and dealer objects for simplified access
const DEALER = blackjackGame["dealer"];

const hitSound = new Audio("/static/sounds/swish.m4a");   // initializing the sounds for every action
const winSound = new Audio("/static/sounds/cash.mp3");
const lossSound = new Audio("/static/sounds/aww.mp3");

//Here, we are using Event listerners for every button click, instead of creating onclick methods for every button
// we use querySelector to access the button based on its Id

document
  .querySelector("#blackjack-hit-button")       
  .addEventListener("click", blackjackHit);
document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", dealerLogic);
document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);

  //Function for User hit button
function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();
    showCard(YOU, card);
    updateScore(card, YOU);
    showScore(YOU);
  }
}

//return a random card
function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
}

//Displays cards when Hit is clicked by creating an img tag and adding the randomly selected card image to it,
// the name of image file is same as the object key.
// calls play() for sound

function showCard(activePlayer, card) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}


function blackjackDeal() {
  //operation is performed only when the user and bot have performed their operations

  if (blackjackGame["turnsOver"] === true) {

    //get all the user and bot selected images using the ids
    blackjackGame["isStand"] = false;
    let yourImage = document
    .querySelector("#your-box")
    .querySelectorAll("img");

    let dealerImage = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");

    // removing all the images if present
    if (yourImage.length > 0) {
      for (let i = 0; i < yourImage.length; i++) {
        yourImage[i].remove();
      }
    }

    if (dealerImage.length > 0) {
      for (let i = 0; i < dealerImage.length; i++) {
        dealerImage[i].remove();
      }
    }

    //Sets the scores to 0
    YOU["score"] = 0;
    DEALER["score"] = 0;

    //Resets all the values and colors to their initial values

    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;
    document.querySelector("#your-blackjack-result").style.color = "#ffffff";
    document.querySelector("#dealer-blackjack-result").style.color = "#ffffff";

    document.querySelector("#blackjack-result").textContent = "Let's Play";
    document.querySelector("#blackjack-result").style.color = "black";

    blackjackGame['turnsOver'] = false;
  }
}

//Gets the value of every card from the object and adds it to the existing score.
function updateScore(card, activePlayer) {
  activePlayer["score"] += blackjackGame["cardsMap"][card];
}

//shows score based on card value, handles the bust situation
function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

// Adds a break between dealer cards
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// dealer operations are async because we do not want the browser to wait when cards are dealt
async function dealerLogic() {
  blackjackGame["isStand"] = true;

  //keep dealing cards till the score becomes greater than 16
  while (DEALER["score"] < 16 && blackjackGame["isStand"] === true) {
    let card = randomCard();
    showCard(DEALER, card);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }

  //Enables the deal button after the dealer operations are finished
  blackjackGame["turnsOver"] = true;
  let winner = computeWinner();
  showResult(winner);
}

// consditions to check the winner based on score of User and Dealer
function computeWinner() {
  let winner;
  if (YOU["score"] <= 21) {
    if (DEALER["score"] < YOU["score"] || DEALER["score"] > 21) {
      winner = YOU;
      blackjackGame["wins"]++;
    } else if (DEALER["score"] > YOU["score"]) {
      winner = DEALER;
      blackjackGame["losses"]++;
    } else if (YOU["score"] === DEALER["score"]) {
      blackjackGame["draws"]++;
    }
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    winner = DEALER;
    blackjackGame["losses"]++;
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    blackjackGame["draws"]++;
  }
  return winner;
}

//Updates the count of wins, losses and draws, along with the message and color of Text.
//Play sound based on result
function showResult(winner) {
  let message, messageColor;
  if(blackjackGame['turnsOver'] === true) {
    if (winner === YOU) {
        document.querySelector("#wins").textContent = blackjackGame["wins"];
        message = "You Won!";
        messageColor = "green";
        winSound.play();
      } else if (winner === DEALER) {
        document.querySelector("#losses").textContent = blackjackGame["losses"];
        message = "You Lost!";
        messageColor = "red";
        lossSound.play();
      } else {
        document.querySelector("#draws").textContent = blackjackGame["draws"];
        message = "Draw!";
        messageColor = "black";
      }
    
      document.querySelector("#blackjack-result").textContent = message;
      document.querySelector("#blackjack-result").style.color = messageColor;
  }
  
}
