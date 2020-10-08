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
}
