import Game from './game.js';

let game = undefined;


window.addEventListener('DOMContentLoaded', ev=>{
    const player1 = document.getElementById('player-1-name');
    const player2 = document.getElementById('player-2-name');


    let boardHolder = document.getElementById('board-holder');
    const gameName = document.getElementById('game-name');

    let updateUI = () =>{
        if (game == undefined) {
            boardHolder.classList.add('is-invisible');
        } else {
            boardHolder.classList.remove('is-invisible');
            gameName.innerHTML = `${game.gameName()}`
        }
    }
    const newGame = getElementById('new-game');

         const checkPlayerStatus = () =>{
            if(player1.value !== '' && player2.value !== '') {
                newGame.removeAttribute('disabled');
            } else {
                newGame.setAttribute('disabled','true');
            }
        }

    player1.addEventListener('keyup',checkPlayerStatus);
    player2.addEventListener('keyup',checkPlayerStatus);

    newGame.addEventListener('click', ev=>{
        game = new Game(player1.value,player2.value)
        newGame.setAttribute('disabled','true');
        updateUI();
    })



})