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

    inspectRows(){
        for (let a=0; a< 6; a++) {
            for(let b=0; b<4; b++) {
                if (this.getTokenAt(a,b)== this.getTokenAt(a,b+1) &&
                this.getTokenAt(a,b)== this.getTokenAt(a,b+2) &&
                this.getTokenAt(a,b)== this.getTokenAt(a,b+3))
                {
                    return this.getTokenAt(a,b);
                }
            }
        }
        return 0;
    }

    inspectDiags(){
        for (let a=0; a< 3; a++) {
            for(let b=0; b<4; b++) {
                if (this.getTokenAt(a,b)== this.getTokenAt(a+1,b+1) &&
                this.getTokenAt(a,b)== this.getTokenAt(a+2,b+2) &&
                this.getTokenAt(a,b)== this.getTokenAt(a+3,b+3))
                {
                    return this.getTokenAt(a,b);
                }
            }
            for (let c=3; c<7; c++) {
                if (this.getTokenAt(a,c)== this.getTokenAt(a+1,c-1) &&
                this.getTokenAt(a,c)== this.getTokenAt(a+2,c-2) &&
                this.getTokenAt(a,c)== this.getTokenAt(a+3,c-3))
                {
                    return this.getTokenAt(a,c);
                }
            }
        }
        return 0;
    }

    playInColumn(index) {
        this.columns[index].add(this.firstPlayer);
        const clickTarget = document.getElementById("click-targets");
        if(this.firstPlayer == 1) {
            this.firstPlayer = 2;
        } else {
            this.firstPlayer = 1;
        }
        if(!this.checkForTie()){
            for (let i = 0; i < 7; i++) {
                if (this.columns[i].inspect()) {
                    clickTarget.setAttribute("style", "visibility: hidden;");
                    this.winnerNumber = this.columns[i].inspect();
                    this.clearStorage();
                    return true;
                } else if (this.inspectRows()) {
                    clickTarget.setAttribute("style", "visibility: hidden;");
                    this.winnerNumber = this.inspectRows();
                    this.clearStorage();
                    return true;
                }else if (this.inspectDiags()) {
                    clickTarget.setAttribute("style", "visibility: hidden;");
                    this.winnerNumber = this.inspectDiags();
                    this.clearStorage();
                    return true;
                }
            }
        }



        this.save();
    }

    checkForTie () {
        for (let i =0; i < 7; i++) {
            if (this.isColumnFull(i) === false) return false;
        }
        const clickTarget = document.getElementById("click-targets");
        clickTarget.setAttribute("style", "visibility: hidden;");
        this.winnerNumber = 3;
        this.clearStorage();
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

    save() {
        localStorage.setItem("game", JSON.stringify(this));
    }
    clearStorage() {
        localStorage.removeItem("game");
    }
}
