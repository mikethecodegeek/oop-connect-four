import Column from "./column.js";
// import ColumnWinInspector from "./column-win-inspector.js";

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
        if(!this.checkForTie()){
            for (let i = 0; i < 7; i++) {
                if (this.columns[i].inspect()) {
                    const clickTarget = document.getElementById("click-targets");
                    clickTarget.setAttribute("style", "visibility: hidden;");
                    this.winnerNumber = this.columns[i].inspect();
                    return true;
                }
            }
        }

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
        const clickTarget = document.getElementById("click-targets");
        clickTarget.setAttribute("style", "visibility: hidden;");
        this.winnerNumber = 3;
        return true;
    }

    getName() {
        if (this.winnerNumber===3) {
            return `${this.player1} ties with ${this.player2}`
        } else if (this.winnerNumber === 1) {
            return `${this.player1.toUpperCase()} WON!!!`
        } else if (this.winnerNumber === 2) {
            return `${this.player2.toUpperCase()} WON!!!`
        }
        return `${this.player1} vs ${this.player2}`
    }

    getTokenAt(rowIndex, colIndex) {
        return this.columns[colIndex].getTokenAt(rowIndex);
    }
}
