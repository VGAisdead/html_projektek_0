let computerChoice;

function getRandomComputerResult() {
  const options = ["Kő", "Papír", "Olló"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return (computerChoice = options[randomIndex]);
}

function hasPlayerWonTheRound(player, computer) {
  return (
    (player === "Kő" && computer === "Olló") ||
    (player === "Olló" && computer === "Papír") ||
    (player === "Papír" && computer === "Kő")
  );
}

let playerScore = 0;
let computerScore = 0;

function getRoundResults(userOption) {
  const computerResult = getRandomComputerResult();

  if (hasPlayerWonTheRound(userOption, computerResult)) {
    playerScore++;
    return `Győztél!`;
  } else if (computerResult === userOption) {
    return `Döntetlen!`;
  } else {
    computerScore++;
    return `Vesztettél!`;
  }
}

const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");

function showResults(userOption) {
  roundResultsMsg.innerText = getRoundResults(userOption);
  computerScoreSpanElement.innerText = computerScore;
  playerScoreSpanElement.innerText = playerScore;

  if (playerScore === 3) {
    winnerMsgElement.innerText = `Sikeresen legyőzted a számítógépet!
    Gratulálok!`;
    resetGameBtn.style.display = "block";
    optionsContainer.style.display = "none";
  } else if (computerScore === 3) {
    winnerMsgElement.innerText = ` A számítógép győzött.`;
    resetGameBtn.style.display = "block";
    optionsContainer.style.display = "none";
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  computerScoreSpanElement.innerText = computerScore;
  playerScoreSpanElement.innerText = playerScore;
  resetGameBtn.style.display = "none";
  optionsContainer.style.display = "flex";
  winnerMsgElement.innerText = "";
  roundResultsMsg.innerText = "";
}

resetGameBtn.addEventListener("click", resetGame);

const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");

rockBtn.addEventListener("click", function () {
  showResults("Kő");
  koPapirOllo("Kő", computerChoice);
});

paperBtn.addEventListener("click", function () {
  showResults("Papír");
  koPapirOllo("Papír", computerChoice);
});

scissorsBtn.addEventListener("click", function () {
  showResults("Olló");
  koPapirOllo("Olló", computerChoice);
});

//  ANIMATION  //

function koPapirOllo(playerChoice, computerChoice) {
  const playerHand = document.getElementById("jatekosvalasztas");
  const computerHand = document.getElementById("szamitogepvalasztas");

  const choicesMap = {
    Kő: "rock",
    Papír: "paper",
    Olló: "scissors",
  };

  playerHand.src = `../../../assets/images/rockpaperscissors/player-${choicesMap[playerChoice]}.png`;
  computerHand.src = `../../../assets/images/rockpaperscissors/computer-${choicesMap[computerChoice]}.png`;

  // Képek rejtett előtöltése
  const playerImage = new Image();
  playerImage.src = `../../../assets/images/rockpaperscissors/player-${choicesMap[playerChoice]}.png`;
  const computerImage = new Image();
  computerImage.src = `../../../assets/images/rockpaperscissors/computer-${choicesMap[computerChoice]}.png`;

  // Miután a képek betöltődtek, állítsuk be őket a src attribútumra
  playerImage.onload = () => {
    playerHand.src = playerImage.src;
  };
  computerImage.onload = () => {
    computerHand.src = computerImage.src;
  };

  playerHand.style.animation = "none";
  computerHand.style.animation = "none";

  setTimeout(() => {
    playerHand.style.animation = "";
    computerHand.style.animation = "";
  }, 100);
}

const imagesToPreload = [
  "../../../assets/images/rockpaperscissors/player-rock.png",
  "../../../assets/images/rockpaperscissors/player-paper.png",
  "../../../assets/images/rockpaperscissors/player-scissors.png",
  "../../../assets/images/rockpaperscissors/computer-rock.png",
  "../../../assets/images/rockpaperscissors/computer-paper.png",
  "../../../assets/images/rockpaperscissors/computer-scissors.png",
  "../../../assets/images/background.png",
];

imagesToPreload.forEach((src) => {
  const img = new Image();
  img.src = src;
});
