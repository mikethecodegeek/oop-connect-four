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
            // target.setAttribute("class","click-target black")
            target.classList.add('black');
            target.clasList.remove('red')
        } else {
            // target.setAttribute("class","click-target red");
            target.classList.add('red');
            target.clasList.remove('black')
        }
    }

    let updateUI = () =>{
        if (game == undefined) {
            boardHolder.classList.add('is-invisible');
        } else {
            boardHolder.classList.remove('is-invisible');
            gameName.innerHTML = `${game.getName()}`
            let currentPlayer = game.firstPlayer;
            for (let i = 0; i <= 5; i++) {
                for (let j = 0; j <=6; j++) {
                    const cell = document.getElementById(`square-${5-i}-${j}`);
                    cell.innerHTML = "";
                    const token = game.getTokenAt(i, j);
                    const div = document.createElement("div");
                    if (token === 1) {
                        div.setAttribute("class", "token black");
                        cell.appendChild(div);
                    } else if (token ===2 ) {
                        div.setAttribute("class", "token red");
                        cell.appendChild(div);
                    }
                }
            }
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
        let colIndex = Number(ev.target.id.slice(ev.target.id.length-1));
        if (!game.isColumnFull(colIndex)){
            game.playInColumn(colIndex);
            updateUI();
        }
    })

    clickTargets.addEventListener("mouseover", ev => {
        let colIndex = Number(ev.target.id.slice(ev.target.id.length-1));
        if (ev.target.className == "click-target" && !game.isColumnFull(colIndex)) {
            // console.log(ev.target.className.includes('click-target'))

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
