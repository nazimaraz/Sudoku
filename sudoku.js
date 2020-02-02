class Sudoku {
    constructor() {
        this.table = [];
        this.immutableTable = [];
        this.n = 20;
    }

    generateBoard() {
        this.table = Array.from({length: 9}, () => (Array.from({length: 9}, () => 0)));
        this.table[0] = Array.from({length: 9}, (v, k) => k + 1);
        shuffle(this.table[0], true);

        for(let i = 1; i < 9; i++) {
            this.table[i] = Array.from({length: 9}, (v, k) => k + 1);
            while(true) {
                shuffle(this.table[i], true);
                if (!this.checkDuplicateInRect() && !this.checkDuplicateVerticalAndHorizontal()) {
                    break;
                }
            }    
        }
        
        let n = 30;
        let arr = [];
        while(arr.length < n) {
            const r = Math.floor(Math.random() * 81);
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        for(let i = 0; i < n; i++) {
            let row = floor(arr[i]/9);
            let column = arr[i]%9;
            this.table[row][column] = 0;
        }
        this.immutableTable = this.table.map(arr => arr.slice());
    }

    checkDuplicateVerticalAndHorizontal() {
        let transpose = this.table[0].map((col, i) => this.table.map(row => row[i]));
        for (let i = 0; i < 9; i++) {   
            let row = this.table[i];
            let column = transpose[i];
            row = row.filter(value => value !== 0);
            column = column.filter(value => value !== 0);
            let checkIfDuplicateExists = arr => new Set(arr).size !== arr.length;
            if(checkIfDuplicateExists(row)) return true;
            if(checkIfDuplicateExists(column)) return true;
        }
        return false;
    }

    checkDuplicateInRect() {
        let newTable = [];
        for(let i = 0; i < 9; i++) newTable.push([]);
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                let row = this.table[i];
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
            let row = newTable[i];
            row = row.filter(value => value !== 0);
            let checkIfDuplicateExists = arr => new Set(arr).size !== arr.length;
            if(checkIfDuplicateExists(row)) return true;
        }
        return false;
    }

}
