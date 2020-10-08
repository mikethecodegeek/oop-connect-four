import Game from './game.js';

let game = undefined;


window.addEventListener('DOMContentLoaded', ev=>{
    const player1 = document.getElementById('player-1-name');
    const player2 = document.getElementById('player-2-name');
    const newGame = document.getElementById('new-game');


    let boardHolder = document.getElementById('board-holder');
    const gameName = document.getElementById('game-name');
    const clickTargets = document.getElementById('click-targets');

    const showPlayerColor = (player, target) => {
        if (player == 1) {
            target.setAttribute("class","click-target black")
        } else {
            target.setAttribute("class","click-target red");
        }
    }

    let updateUI = () =>{
        if (game == undefined) {
            boardHolder.classList.add('is-invisible');
        } else {
            boardHolder.classList.remove('is-invisible');
            gameName.innerHTML = `${game.getName()}`
            let currentPlayer = game.firstPlayer;
        }
    }

    const checkPlayerStatus = () =>{
        if(player1.value !== '' && player2.value !== '') {
            newGame.removeAttribute('disabled');
        } else {
            newGame.setAttribute('disabled','true');
        }
    }

    player1.addEventListener('keyup',checkPlayerStatus);
    player2.addEventListener('keyup',checkPlayerStatus);

    clickTargets.addEventListener("click", ev => {
        game.playInColumn();
        updateUI();
    })

    clickTargets.addEventListener("mouseover", ev => {
        if (ev.target.className == "click-target") {
            console.log(ev.target.className.includes('click-target'))
            showPlayerColor(game.firstPlayer, ev.target);
        }
    })

    clickTargets.childNodes.forEach(x => x.addEventListener("mouseleave", ev => {
        if (ev.target.className.includes("click-target")) {
            ev.target.setAttribute("class", "click-target");
        }
    }))

    newGame.addEventListener('click', ev=>{
        game = new Game(player1.value,player2.value)
        newGame.setAttribute('disabled','true');
        updateUI();
    })



})
