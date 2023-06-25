let currentGridNumber = 1;
let gridGenerated = false;

const selectNewGridButton = document.querySelector('.new-grid-button');
const selectNewGridInput = document.querySelector('.new-grid-input');
const selectGridField = document.querySelector('.sketchpad-grid');
const selectNonGridElements = document.querySelectorAll('html > *, body > *');
let selectGrids;

let mousedown = false;

const selectButtonColorMode = document.querySelector('button.color-mode');
let colorMode = false;

const selectButtonDarkeningMode = document.querySelector('button.darkening-mode');
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

toggleColorMode();
toggleDarkeningMode();

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
    }));
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
        mousedown = false;
    }));
    selectNonGridElements.forEach(element => element.addEventListener("mouseover", function(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        mousedown = false;
    }));
 };

 function toggleColorMode() {
    selectButtonColorMode.addEventListener("click", function(e) {
        if (selectButtonColorMode.classList.contains('on')) {
            selectButtonColorMode.classList.remove("on");
            colorMode = false;
        } else {
            selectButtonColorMode.classList.add("on");
            colorMode = true;
        }
    });
 }

 function toggleDarkeningMode() {
    selectButtonDarkeningMode.addEventListener("click", function(e) {
        if (selectButtonDarkeningMode.classList.contains('on')) {
            selectButtonDarkeningMode.classList.remove("on");
            darkeningMode = false;
        } else {
            selectButtonDarkeningMode.classList.add("on");
            darkeningMode = true;
        }
    });
 }

function drawAGrid() {
    if (colorMode === false && darkeningMode === false) {

    } else if (colorMode === true && darkeningMode === false) {

    } else if (colorMode === false && darkeningMode === true) {

    } else {

    }
}

function generateRandomHSLColor(element) {
    const randomH = Math.floor(Math.random * 366);
    const S = 100;
    const L = 100;
    const HSL = `${randomH}, ${S}, ${L}`;
    const randomHSLColor = element.style.backgroundColor('hsl(HSL)');
    return randomHSLColor;
}

function darkenHSLColor(selectedElement) {
    const backgroundColor = getComputedStyle(selectedElement).backgroundColor;
    const hslValues = backgroundColor.match(/\d+/g);

    let h = parseInt(hslValues[0]);
    let s = parseInt(hslValues[1]);
    let l = parseInt(hslValues[2]);

    return l-10;
}