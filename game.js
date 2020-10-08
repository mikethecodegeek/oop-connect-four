export default class Game {
    constructor(player1,player2) {
        this.player1 = player1;
        this.player2=player2;
        this.firstPlayer = 1;
    }

    playInColumn() {
        if(this.firstPlayer == 1) {
            this.firstPlayer = 2;
        } else {
            this.firstPlayer = 1;
        }
    }

    getName() {
        return `${this.player1} vs ${this.player2}`
    }
}
