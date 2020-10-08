import Column from "./column.js";

export default class Game {
    constructor(player1,player2) {
        this.player1 = player1;
        this.player2=player2;
        this.firstPlayer = 1;
        this.winnerNumber;
        this.columns = [new Column(), new Column(), new Column(),
            new Column(), new Column(), new Column(), new Column()];
    }

    isColumnFull(columnIndex) {
        return this.columns[columnIndex].isFull();
    }

    playInColumn(index) {
        this.columns[index].add(this.firstPlayer);
        this.checkForTie();
        if(this.firstPlayer == 1) {
            this.firstPlayer = 2;
        } else {
            this.firstPlayer = 1;
        }
    }
    checkForTie () {
        for (let i =0; i < 7; i++) {
            if (this.isColumnFull(i) === false) return false;
        }
        this.winnerNumber = 3;
        return true;
    }

    getName() {
        if (this.winnerNumber===3) {
            return `${this.player1} ties with ${this.player2}`
        }
        return `${this.player1} vs ${this.player2}`
    }

    getTokenAt(rowIndex, colIndex) {
        return this.columns[colIndex].getTokenAt(rowIndex);
    }
}
