let playerTurn = true;
const bothPlayerButtons = document.querySelectorAll('.js-player-button-container');
let showWinner;
let resetButton;
const game = document.querySelector('.game');
const infoContainer = document.querySelector('.info-container');
let boxesHTML = '';
let playerComputer = false;

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
  let occupiedBoxes = 0;

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

      occupiedBoxes ++;
      checkWinner(occupiedBoxes);
    })
    })

  function computerMove () {
    boxes.forEach((box) => {
      const occupied = box.innerHTML;
      if(!occupied) {
        
      }
    })
  }

  function checkWinner (occupiedBoxes) {

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
        showWinner.classList.add('X');
      }
      else if(checkBoxes_o === 3) {
        declareWinner('O');
        showWinner.classList.add('O');
      }
      else if(occupiedBoxes === 9) {
        declareWinner("Draw");
      }

    })
  }

  function declareWinner (player) {
    showWinner.innerHTML = `${(player === 'Draw')? player : `${player} Wins`}`

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

  document.querySelectorAll('.js-player-button').forEach((playerButton) => {

  playerButton.addEventListener('click', () => {
    const selectedOption = playerButton.dataset.option;
    if(selectedOption) {playerComputer = true};
    playGame();
    document.body.style.backdropFilter = "blur(3px)";
    bothPlayerButtons.forEach((button) => {
      button.remove();
    })

  })
})
}

choosePlayer();
