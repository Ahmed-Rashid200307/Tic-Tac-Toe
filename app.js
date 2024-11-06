let playerTurn = '';
let occupiedBoxes = 0;
const bothPlayerButtons = document.querySelectorAll('.js-player-button-container');
let selectedOption;
let selectedButton;
let showWinner;
let resetButton;
const game = document.querySelector('.game');
const infoContainer = document.querySelector('.info-container');
let playerComputer = false;
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

function playGame () {
  
  let boxesHTML = '';

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
  
  
  let boxes = document.querySelectorAll('.box');
  
  boxes.forEach((box) => {
    box.addEventListener('click', () => {
      
      box.innerHTML = playerTurn;

      box.classList.add(playerTurn, "disabled");
      
      playerTurn = playerTurn === 'X'? 'O' : 'X';

      checkWinner();

      occupiedBoxes ++;
      if (playerComputer && occupiedBoxes < 9){
        computerMove();
        occupiedBoxes ++;
      }

      checkWinner();
    })
    })

  function computerMove () {
    flag = true;

    while(flag) {
      const randomBoxNum = Math.round(Math.random() * 8);
      let randomBox = boxes[randomBoxNum];
      
      if(!randomBox.innerHTML) {
        randomBox.innerHTML = playerTurn;
        randomBox.classList.add(playerTurn, "disabled");
        playerTurn = playerTurn === 'X'? 'O' : 'X';
        flag = false;
      }
    }

    checkWinner();
  }

  function checkWinner () {
    let winnerFound = false;

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
        winnerFound = true;
        showWinner.classList.add('X');
      }
      else if(checkBoxes_o === 3) {
        declareWinner(selectedButton === "Computer"? selectedButton : 'O');
        winnerFound = true;
        showWinner.classList.add('O');
      }
      else if(occupiedBoxes === 9 && !winnerFound) {
        declareWinner("Draw");
      }

    })
  }

  function declareWinner (player) {
    playerComputer = false;
    showWinner.innerHTML = `${(player === 'Draw')? player : `${player} Wins`}`;

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
    selectedOption = playerButton.dataset.option;
    selectedButton = playerButton.dataset.button;
    playerTurn = selectedOption;
    
    if(selectedButton === 'Computer') {playerComputer = true};
    playGame();
    document.body.style.backdropFilter = "blur(3px)";
    bothPlayerButtons.forEach((button) => {
      button.remove();
    })

  })
})
}

choosePlayer();
