console.log("JavaScript File is linked");


//Variables -- Labels, Target Zones, Reset Button, Dragged Piece
const labels = document.querySelectorAll('.label');
const targetZones = document.querySelectorAll('.target-zone');
const resetButton = document.querySelector('#reset-btn')
let currentDraggedElement = null;


//Functions

function dragStart() {
    console.log('Started Dragging')
    //Whatever the user is dragging, store it in currentDraggedElement 
    currentDraggedElement = this;
}

function draggedOver(e) {
    e.preventDefault();
    console.log("Drag over called");
}

function dropped(e) {
    e.preventDefault();
    console.log("dropped");

    this.appendChild(currentDraggedElement);

    //reset the reference
    currentDraggedElement = null;
}


// Event Listeners -- Drag Labels, Drop Labels 
labels.forEach(label => label.addEventListener('dragstart', dragStart));


targetZones.forEach(zone => {
    zone.addEventListener('dragover', draggedOver);
    zone.addEventListener('drop', dropped);
})
