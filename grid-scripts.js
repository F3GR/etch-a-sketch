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
        selectAllCells.forEach(cell => {
            cell.classList.remove("black-colored"); 
            cell.classList.add("white-colored"); 
        });
    } else {
        currentGridNumber = selectNewGridInput.value;
        generateNewGrid.call(this);
        gridGenerated = true;
    }
});

selectButtonColorMode.addEventListener("click", function(e) {
    if (selectButtonColorMode.classList.contains('on')) {
        selectButtonColorMode.classList.remove("on");
        colorMode = false;
    } else {
        selectButtonColorMode.classList.add("on");
        colorMode = true;
    }
});

selectButtonDarkeningMode.addEventListener("click", function(e) {
    if (selectButtonDarkeningMode.classList.contains('on')) {
        selectButtonDarkeningMode.classList.remove("on");
        darkeningMode = false;
    } else {
        selectButtonDarkeningMode.classList.add("on");
        darkeningMode = true;
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
        drawAGrid(clickedGrid);
    }));
    selectGrids.forEach(grid => grid.addEventListener("mouseover", function(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        const clickedGrid = e.target;
        drawAGrid(clickedGrid);
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

function drawAGrid(selectedGrid) {
    if (mousedown === true) {
        if (colorMode === false && darkeningMode === false) {
            if (selectedGrid.classList.contains('white-colored')) {
                selectedGrid.classList.remove("white-colored");
                selectedGrid.classList.add("black-colored");
            }
        } else if (colorMode === true && darkeningMode === false) {
            if (selectedGrid.classList.contains('black-colored')) {
                selectedGrid.classList.remove("black-colored");
            }
        } else if (colorMode === false && darkeningMode === true) {
            if (selectedGrid.classList.contains('black-colored')) {
                selectedGrid.classList.remove("black-colored");
            }
        } else {
            if (selectedGrid.classList.contains('black-colored')) {
                selectedGrid.classList.remove("black-colored");
            }
        }
    }
}

function generateRandomHSLColor(selectedElement) {
    const randomH = Math.floor(Math.random() * 361);
    const S = 100;
    const L = 50;
    const HSL = `hsl(${randomH}, ${S}%, ${L}%)`;

    selectedElement.style.backgroundColor = HSL;
}

function darkenHSLColor(selectedElement) {
    const computedStyle = getComputedStyle(selectedElement);
    const backgroundColor = computedStyle.backgroundColor;
    const hslValues = backgroundColor.match(/\d+/g);

    const r = parseInt(hslValues[0]);
    const g = parseInt(hslValues[1]);
    const b = parseInt(hslValues[2]);

    const arrayHSL = hslToRgbColorSet(r, g, b);

    const h = arrayHSL[0];
    const s = arrayHSL[1];
    const l = arrayHSL[2] - 10;

    const HSL = `hsl(${h}, ${s}%, ${l}%)`;

    selectedElement.style.backgroundColor = HSL;
}

function hslToRgbColorSet(r, g, b) {

    r /= 255;
    g /= 255;
    b /= 255;

    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);

    var h, s, l;

    if (max === min) {
        h = 0;
    } else if (max === r) {
        h = 60 * ((g - b) / (max - min));
    } else if (max === g) {
        h = 60 * ((b - r) / (max - min)) + 120;
    } else if (max === b) {
        h = 60 * ((r - g) / (max - min)) + 240;
    }

    if (h < 0) {
        h += 360;
    }

    l = (max + min) / 2;

    if (max === min) {
        s = 0;
    } else if (l <= 0.5) {
        s = (max - min) / (2 * l);
    } else {
        s = (max - min) / (2 - 2 * l);
    }

    h = Math.round(h);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return [h, s, l];
}