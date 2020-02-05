class Sudoku {
    constructor(n) {
        this.table = [];
        this.immutableTable = [];
        this.oneToNine = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.n = n;
    }

    generateBoard() {
        this.table = Array.from({length: 9}, () => Array(9).fill(0));
        this.makeBoard();
        this.removeNumbers();
    }

    makeBoard() {
        for(let i = 0; i < 81; i++) {
            const row = floor(i / 9);
            const col = i % 9;
            if(this.table[row][col] === 0) {
                shuffle(this.oneToNine, true);
                for(const value of this.oneToNine) {
                    this.table[row][col] = value;
                    if(this.isSafe(this.table) && (this.checkGrid(this.table) || this.makeBoard(this.table))) return true;
                }
                this.table[row][col] = 0;
                break;
            }
        }
    }

    checkGrid(table) {
        for(let row = 0; row < 9; row++) {
            for(let col = 0; col < 9; col++) {
                if(table[row][col] === 0) return false;
            }
        }
        return true;
    }

    removeNumbers() {
        const arr = Array.from({length: 81}, (_, index) => index);
        shuffle(arr, true);
        for(let i = 0; i < this.n; i++) {
            const row = floor(arr[i] / 9);
            const column = arr[i] % 9;
            this.table[row][column] = 0;
        }
        this.immutableTable = this.table.map(arr => [...arr]);
    }

    checkDuplicateVerticalAndHorizontal(table) {
        const transpose = table[0].map((_, i) => table.map(row => row[i]));
        for (let i = 0; i < 9; i++) {   
            const row = table[i].filter(value => value !== 0);
            const column = transpose[i].filter(value => value !== 0);
            if(this.checkIfDuplicateInArray(row)) return true;
            if(this.checkIfDuplicateInArray(column)) return true;
        }
        return false;
    }

    checkDuplicateInRect(table) {
        const newTable = Array.from({length: 9}, () => []);
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                const row = table[i];
                if(j < 3 && i < 3) newTable[0].push(row[j]);
                else if(j > 2 && j < 6 && i < 3) newTable[1].push(row[j]);
                else if(j > 5 && j < 9 && i < 3) newTable[2].push(row[j]);
                else if(j < 3 && i > 2 && i < 6) newTable[3].push(row[j]);
                else if(j > 2 && j < 6 && i > 2 && i < 6) newTable[4].push(row[j]);
                else if(j > 5 && i > 2 && i < 6) newTable[5].push(row[j]);
                else if(j < 3 && i > 5) newTable[6].push(row[j]);
                else if(j > 2 && j < 6 && i > 5) newTable[7].push(row[j]);
                else if(j > 5 && i > 5) newTable[8].push(row[j]);
            }
        }
        for (let i = 0; i < 9; i++) {
            const row = newTable[i].filter(value => value !== 0);
            if(this.checkIfDuplicateInArray(row)) return true;
        }
        return false;
    }
    
    isSafe = (table) => !this.checkDuplicateVerticalAndHorizontal(table) && !this.checkDuplicateInRect(table);
    checkIfDuplicateInArray = (array) => new Set(array).size !== array.length;
}
