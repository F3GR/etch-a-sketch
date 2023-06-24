let currentGridNumber = 1;
let gridGenerated = false;

const selectNewGridButton = document.querySelector('.new-grid-button');
const selectNewGridInput = document.querySelector('.new-grid-input');
const selectGridField = document.querySelector('.sketchpad-grid');
let selectGrids;

selectNewGridButton.addEventListener("click", function(e) {
    e.preventDefault();
    if (selectNewGridInput.value <= 1 || selectNewGridInput.value > 100 || selectNewGridInput.value % 2 !== 0 ) {
        alert('Entered number is not valid, please pick a number from range 2-100, which is divisible by 2');
    } else if (currentGridNumber === selectNewGridInput.value) {
        const selectAllCells = document.querySelectorAll('.generated');
        selectAllCells.forEach(cell => { cell.classList.add("white-colored") });
    } else {
        currentGridNumber = selectNewGridInput.value;
        selectGrids = document.querySelectorAll('.generated');
        generateNewGrid.call(this);
        addEventListenersForEachGrid();
        gridGenerated = true;
    }
});

function addEventListenersForEachGrid() {
    selectGridField.addEventListener("click", function(e) {
        const clickedGrid = e.target;
        if (clickedGrid.classList.contains("generated")) {
            if (clickedGrid.style.backgroundColor === 'white') {
                clickedGrid.classList.remove("white-colored");
                clickedGrid.classList.add("black-colored");
            }
        }
    });
 };

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
            generatedRow.appendChild(generatedGrid);
        }
    }
}
