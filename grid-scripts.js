let currentGridNumber = 1;
let gridGenerated = false;

const selectNewGridButton = document.querySelector('.new-grid-button');
const selectNewGridInput = document.querySelector('.new-grid-input');
const selectGridField = document.querySelector('.sketchpad-grid');
let selectGrids;

let mousedown = false;
let mouseup = false;

let colorMode = false;
let darkeningMode = false;

selectNewGridButton.addEventListener("click", function(e) {
    e.preventDefault();
    if (selectNewGridInput.value <= 1 || selectNewGridInput.value > 100 || selectNewGridInput.value % 2 !== 0 ) {
        alert('Entered number is not valid, please pick a number from range 2-100, which is divisible by 2');
    } else if (currentGridNumber === selectNewGridInput.value) {
        const selectAllCells = document.querySelectorAll('.generated');
        selectAllCells.forEach(cell => { cell.classList.add("white-colored") });
    } else {
        currentGridNumber = selectNewGridInput.value;
        generateNewGrid.call(this);
        gridGenerated = true;
    }
});

function generateNewGrid() {
    alert("Generating");
    selectGridField.innerHTML = "";
    for (let i = 0; i < currentGridNumber; i++) {
        let generatedRow = document.createElement('div');
        generatedRow.setAttribute("class", "generated-row");
        selectGridField.appendChild(generatedRow);
        for (let j = 0; j < currentGridNumber; j++) {
            let generatedGrid = document.createElement('div');
            generatedGrid.setAttribute("class", "generated");
            generatedGrid.classList.add("white-colored");
            generatedRow.appendChild(generatedGrid);
        }
    }
    selectGrids = document.querySelectorAll('.generated');
    addEventListenersForEachGrid();
}

function addEventListenersForEachGrid() {
    selectGrids.forEach(grid => grid.addEventListener("mousedown", function(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        const clickedGrid = e.target;
        mousedown = true;
        if (clickedGrid.classList.contains('white-colored')) {
            clickedGrid.classList.remove("white-colored");
            clickedGrid.classList.add("black-colored");
        }
        selectGrids.forEach(grid => grid.addEventListener("mouseover", function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            const clickedGrid = e.target;
            if (mousedown === true && clickedGrid.classList.contains('white-colored')) {
                clickedGrid.classList.remove("white-colored");
                clickedGrid.classList.add("black-colored");
            }
        }));
        selectGrids.forEach(grid => grid.addEventListener("mouseup", function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            const clickedGrid = e.target;
            if (clickedGrid.classList.contains('white-colored')) {
                clickedGrid.classList.remove("white-colored");
                clickedGrid.classList.add("black-colored");
            }
            mousedown = false;
        }));
    }));
 };
