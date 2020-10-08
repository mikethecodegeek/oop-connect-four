export default class Column {
    constructor(){
        this.tokens =[]
    }

    add(playerNumber) {
        this.tokens.push(playerNumber);
    }

    getTokenAt(rowIndex) {
        return this.tokens[rowIndex];
    }
}
