let playerTurn = true;
const bothPlayerButtons = document.querySelectorAll('.js-player-button-container');
let showWinner;
let resetButton;
const game = document.querySelector('.game');
const infoContainer = document.querySelector('.info-container');
let boxesHTML = '';

function playGame () {
    

  for (let i=1; i<=9; i++) {
    boxesHTML += '<button class="box"></button>';
  }

  document.querySelector('.game').innerHTML = boxesHTML;

  infoContainer.innerHTML = `
        <p class="winner"></p>
      <button class="js-reset-button reset-button">Restart Game</button>
  `;

  showWinner = document.querySelector('.winner');
  resetButton = document.querySelector('.js-reset-button');

  let combinationArray = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
  ];

  let boxes = document.querySelectorAll('.box');

  boxes.forEach((box) => {
    box.addEventListener('click', () => {

      playerTurn? box.innerHTML = 'X' : box.innerHTML = 'O';

      if(playerTurn) {
        box.innerHTML = 'X';
        box.classList.add("X", "disabled");
      }
      else{
        box.innerHTML = 'O';
        box.classList.add("O", "disabled");
      }

      playerTurn? playerTurn=false : playerTurn=true;

      checkWinner(combinationArray);
    })
    })

  function checkWinner (combinationArray) {
    combinationArray.forEach((combination) => {
      let checkBoxes_x = 0;
      let checkBoxes_o = 0;
      combination.forEach((num) => {

        const char = boxes[num].innerHTML;
        if(char === 'X') {
        checkBoxes_x ++; 
        }
        else if (char === 'O') {
          checkBoxes_o ++;
        }

      })
      
      if(checkBoxes_x === 3) {
        declareWinner('X');
      }
      else if(checkBoxes_o === 3) {
        declareWinner('O');
      } 

    })
  }

  function declareWinner (player) {
    showWinner.classList.add(player)
    showWinner.innerHTML = `Player ${player} Wins`
    console.log(`Player ${player} wins`);
    boxes.forEach(box => {
      box.disabled = true
      box.classList.add('disabled');
    });

  }

  resetButton.addEventListener('click', () => {
    location.reload();
  })
}

function choosePlayer() {
  game.innerHTML = `
  <div class="js-player-button-container">
  <p class="choose-color">CHOOSE YOUR COLOR</p>
  <button class="js-player-button player1">Blue X</button>
  <button class="js-player-button player2">Red O</button>
  </div>
  `;

  document.querySelectorAll('.js-player-button').forEach((playerButton) => {

  playerButton.addEventListener('click', () => {
    playGame();

    bothPlayerButtons.forEach((button) => {
      button.remove();
    })

  })
})
}

choosePlayer();
