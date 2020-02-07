let length, pressedButton = { row: 1, column: 1 }, sudoku, immutableTable, difficulty, started = false, easy, medium, hard, expert, validColorMode, validColorModeButton;
let colorModes = {
    whiteMode: { background: 255, lineColor: 0, buttonRectColor: 0, buttonNumberColor: 255, immutableNumberColor: 0, tableNumberColor: 0 },
    blackMode: { background: 0, lineColor: 255, buttonRectColor: 255, buttonNumberColor: 0, immutableNumberColor: 255, tableNumberColor: 255 }
};

function setup() {
    length = windowWidth > windowHeight ? windowHeight : windowWidth;
    length -= 4;
    createCanvas(length, length);
    length -= length / 7;
    validColorMode = colorModes.blackMode;
    validColorModeButton = createButton("Color Mode");
    validColorModeButton.position(length/2, 140);
    validColorModeButton.style("font-family","Comic Sans MS");
    validColorModeButton.style("background-color","#00f");
    validColorModeButton.style("color","#fff");
    validColorModeButton.mousePressed(() => validColorMode = validColorMode === colorModes.blackMode ? colorModes.whiteMode : colorModes.blackMode);

    easy = createButton("Easy");
    medium = createButton("Medium");
    hard = createButton("Hard");
    expert = createButton("Expert");
    [easy, medium, hard, expert].map((button, index) => {
        button.position(length/2, length/2 - 60 + index * 40);
        button.size(60, 25);
        button.style("font-family","Comic Sans MS");
        button.style("background-color","#00f");
        button.style("color","#fff");
        button.mousePressed(() => startGame(index));
    })
}

function draw() {
    background(validColorMode.background);
    translate(length/14, length/28);
    if(started) {
        drawLines();
        drawNumbers();
        fillRect();
        fillNumbers();
    }
}

function startGame(difficulty) {
    const difficulties = [43, 51, 56, 58];
    sudoku = new Sudoku(difficulties[difficulty]);
    sudoku.generateBoard();
    started = true;
    [easy, medium, hard, expert, validColorModeButton].map(button => button.remove());
}

function mousePressed() {
    const l = length / 9;
    for (let i = 1; i <= 9; i++) {
        if (mouseX >  length/14+length/99+(i-1)*l && mouseX < length/14+length/99+length/11+(i-1)*l && mouseY > length+length/56 && mouseY < length+56+length/11) {
            if(sudoku.immutableTable[pressedButton.column-1][pressedButton.row-1] === 0) {
                sudoku.table[pressedButton.column-1][pressedButton.row-1] = sudoku.table[pressedButton.column-1][pressedButton.row-1] === i ? 0 : i;
            }
        }
        for (let j = 1; j <= 9; j++) {
            if (mouseX > (i-1)*l + length/14 && mouseX < (i-1)*l + length / 14 + length/9 && mouseY > (j-1)*l + length / 28 && mouseY < j*l + length/28) {
                pressedButton = { row: i, column: j };
            }    
        }
    }
}

function keyPressed() {
    for(let i = 1; i <= 9; i++) {
        if (keyCode === 48 + i) {
            if(sudoku.immutableTable[pressedButton.column-1][pressedButton.row-1] === 0) {
                sudoku.table[pressedButton.column-1][pressedButton.row-1] = sudoku.table[pressedButton.column-1][pressedButton.row-1] === i ? 0 : i;
            }
        }
    }

    if (keyCode === BACKSPACE) {
        if(sudoku.immutableTable[pressedButton.column-1][pressedButton.row-1] === 0)
            sudoku.table[pressedButton.column-1][pressedButton.row-1] = 0;
    }
    if (keyCode === LEFT_ARROW && pressedButton.row > 1) pressedButton.row -= 1;
    if (keyCode === RIGHT_ARROW && pressedButton.row < 9) pressedButton.row += 1;
    if (keyCode === UP_ARROW && pressedButton.column > 1) pressedButton.column -= 1;
    if (keyCode === DOWN_ARROW && pressedButton.column < 9) pressedButton.column += 1;
}

function fillNumbers() {
    const l = length/18;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            sudoku.immutableTable[i][j] === 0 ? fill(135) : fill(validColorMode.tableNumberColor);
            textSize(3*length/44);
            const value = sudoku.table[i][j];
            if (value !== 0)
                text(value.toString(), (j+1)*length/9-3*length/44, -l/2+(i+1)*length/9);
        }
    }
}

function fillRect() {
    fill(100);
    const l = length / 9;
    rect((pressedButton.row - 1) * l, (pressedButton.column - 1) * l, l, l);
}

function drawNumbers() {
    for (let i = 0; i <= 8; i++) {
        fill(validColorMode.buttonRectColor);
        rect(i*length/9 + length / 99, length + length/56, length/11, length/11);
        fill(validColorMode.buttonNumberColor);
        textSize(3*length/44);
        text((i+1).toString(), i*length/9+length/27, length+length/12);
    }
}

function drawLines() {
    stroke(validColorMode.lineColor);
    for (let i = 0; i <= 9; i++) {
        if (i === 0 || i === 3 || i === 6 || i === 9) strokeWeight(length/130);
        const l = i * length / 9;
        line(l, 0, l, length);
        line(0, l, length, l);
        strokeWeight(length/650);
    }
}