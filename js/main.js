console.log("JavaScript File is linked");


//Variables -- Labels, Target Zones, Reset Button, Dragged Piece
const labels = document.querySelectorAll('.label');
const targetZones = document.querySelectorAll('.target-zone');
const resetButton = document.querySelector('#reset-btn')
let currentDraggedElement = null;

const startBtn = document.querySelector('#startButton');
const startMenu = document.querySelector('#gameStart');
let startTime;


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
}

function startGame() {
  if (startMenu.classList.contains('open')) {
    startMenu.classList.remove('open')
  }

  startTime = performance.now();
}

function endGame() {

  const endTime = performance.now();
  const elapsedTime = ((endTime - startTime) / 1000).toFixed(2);

  console.log(`It took you: ${elapsedTime} seconds`)
}


// Event Listeners -- Drag Labels, Drop Labels 
labels.forEach(label => label.addEventListener('dragstart', dragStart));


targetZones.forEach(zone => {
    zone.addEventListener('dragover', draggedOver);
    zone.addEventListener('drop', dropped);
})

resetButton.addEventListener('click', resetDrops);

startBtn.addEventListener('click', startGame);