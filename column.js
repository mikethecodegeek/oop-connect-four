export default class Column {
    constructor(){
        this.tokens =[]
    }

    add(playerNumber) {
        if (!this.isFull()){
            this.tokens.push(playerNumber);
        }
    }

    getTokenAt(rowIndex) {
        return this.tokens[rowIndex];
    }

    isFull() {
        return this.tokens.length == 6;
    }

    inspect() {
        for (let i = 0; i < 3; i++) {
            if (this.tokens[i] === this.tokens[i + 1] &&
                this.tokens[i] === this.tokens[i + 2] &&
                this.tokens[i] === this.tokens[i + 3]) {
                return this.tokens[i];
            }
        }
        return 0;
    }
}
