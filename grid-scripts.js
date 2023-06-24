let currentGridNumber = 1;
let gridGenerated = false;

const selectNewGridButton = document.querySelector('.new-grid-button');
const selectNewGridInput = document.querySelector('.new-grid-input');
const selectGridField = document.querySelector('.sketchpad-grid');

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
            generatedRow.appendChild(generatedGrid);
        }
    }
}
