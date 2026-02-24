console.log("JavaScript File is linked");


//Variables -- Labels, Target Zones, Reset Button, Dragged Piece, etc. 
const labels = document.querySelectorAll('.label');
const targetZones = document.querySelectorAll('.target-zone');
const resetButton = document.querySelector('#reset-btn')
let currentDraggedElement = null;

const startBtn = document.querySelector('#startButton');
const startMenu = document.querySelector('#gameStart');
let startTime;

const scoreCard = document.querySelector('#scoreCard');
const playAgainBtn = document.querySelector('#playAgain');
const userScore = document.querySelector('#userScore');
const gameMessage = document.querySelector('#gameMessage');
let finalMessage;
let score = 0;





//Functions

function dragStart() {
    //Whatever the user is dragging, store it in currentDraggedElement 
    currentDraggedElement = this;
}


function draggedOver(e) {
    e.preventDefault();
}


function dropped(e) {
    e.preventDefault();

    // prevent dropping if zone already has a drag item
    // checks to see if the element represented by '.this' already has an element with a class called label
    // if it does, then it exits the function using 'return' and doesn't execute the rest of the code
    if (this.querySelector('.label')) return;

    this.appendChild(currentDraggedElement);

    //Confirms whether the label was dropped into the correct zone. If it was, then the user gets a point
    if (this.id === currentDraggedElement.dataset.anatomy) {
      addPoint();
    }

    //Checks to see if all of the targetZones have a label
    //If they all do, then it calls the function endGame()
    let allFilled = true;

    for (const zone of targetZones) {
      if (!zone.querySelector('.label')) {
        allFilled = false;
        break;
      } 
    }

    if (allFilled) {
      endGame();
    }

    //reset the reference
    currentDraggedElement = null;
}


labels.forEach(label => {
  // adds a dataset to each label that has the value of the parent elements id for when the drops are reset
  label.dataset.originalParent = label.parentElement.id; 
});


function resetDrops() {
  labels.forEach(label => {
    //Uses the id saved to each labels dataset as well as query selector to hook into the parent element
    const originalParentId = label.dataset.originalParent;
    const originalParent = document.querySelector(`#${originalParentId}`);

    //sets a conditional statement, so that if the parent container exists, the label is appended to it as a child element
    if (originalParent) {
      originalParent.appendChild(label);
    }
  });

  score = 0;
}


function startGame() {
  if (startMenu.classList.contains('open')) {
    startMenu.classList.remove('open')
  }

  startTime = performance.now();
}


function addPoint() {
  score++;
}


function endGame() {
  const endTime = performance.now();
  const elapsedTime = ((endTime - startTime) / 1000).toFixed(2);

  //Multiplies the users score if they got all 5 correct
  if (score === 5) {
    score*=5;
  }

  //User gains additional points if their time was under a certain length
  if (elapsedTime < 15 && score === 25) {
    score = score + 50;
  } else if (elapsedTime < 25 && score === 25) {
    score = score + 15;
  }

  if (score > 50) {
    finalMessage = "Great Job!"
  } else {
    finalMessage = "Better luck next time!"
  }

  displayScoreCard();
}


function displayScoreCard() {
  console.log('Display Score Card')

  if (!scoreCard.classList.contains('open')) {
    scoreCard.classList.add('open');
  }

  userScore.textContent = `${score}`;
  gameMessage.textContent = `${finalMessage}`;

  resetDrops();

  playAgainBtn.addEventListener('click', playAgain);

  score = 0;
  finalMessage = "";
}


function playAgain() {
  if (scoreCard.classList.contains('open')) {
    scoreCard.classList.remove('open') 
  }

  if (!startMenu.classList.contains('open')) {
    startMenu.classList.add('open');
  }
}



// Event Listeners -- Drag Labels, Drop Labels 
labels.forEach(label => label.addEventListener('dragstart', dragStart));


targetZones.forEach(zone => {
    zone.addEventListener('dragover', draggedOver);
    zone.addEventListener('drop', dropped);
})

resetButton.addEventListener('click', resetDrops);

startBtn.addEventListener('click', startGame);