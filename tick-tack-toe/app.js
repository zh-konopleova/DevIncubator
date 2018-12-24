"use strict";

let currentPlayer = 1;
let gameField = [];
let cells = document.querySelectorAll(".field__item");

let xPoints = 0;
let oPoints = 0;

clearGameField();

cells.forEach(function(cell) {
  cell.addEventListener("click", function(event) {
    event.preventDefault();
    let index = +this.getAttribute("data-id");

    if (currentPlayer === 1) {
      this.innerText = 'X';
      gameField[index - 1] = 'X';
      currentPlayer = 2;
      document.querySelector('.current-player__number').innerText = 'O';
      if (checkWinner('X')) {
        xPoints++;
        document.querySelector('.score__result--x').innerText = xPoints;
        document.querySelector('.modal-title').innerText = 'Крестики победили! Продолжить?';
        clearGameField();
        $('#exampleModalCenter').modal('show');
      }
    } else {
      this.innerText = 'O';
      gameField[index - 1] = 'O';
      currentPlayer = 1;
      document.querySelector('.current-player__number').innerText = 'X';
      if (checkWinner('O')) {
        oPoints++;
        document.querySelector('.score__result--o').innerText = oPoints;
        document.querySelector('.modal-title').innerText = 'Нолики победили! Продолжить?';
        clearGameField();
        $('#exampleModalCenter').modal('show');
      }
    }
  });
});

function clearGameField() {
  cells.forEach(function (cell) {
    cell.innerText = '';
  });

function clearPoints() {
  if () {
    xPoints = 0;
    oPoints = 0;
  }
}

  gameField = [
    undefined, undefined, undefined,
    undefined, undefined, undefined,
    undefined, undefined, undefined
  ];
}

function checkWinner(player) {
  if (gameField[0] == player && gameField[1] == player && gameField[2] == player ||
      gameField[3] == player && gameField[4] == player && gameField[5] == player ||
      gameField[6] == player && gameField[7] == player && gameField[8] == player ||
      gameField[0] == player && gameField[3] == player && gameField[6] == player ||
      gameField[1] == player && gameField[4] == player && gameField[7] == player ||
      gameField[2] == player && gameField[5] == player && gameField[8] == player ||
      gameField[0] == player && gameField[4] == player && gameField[8] == player ||
      gameField[2] == player && gameField[4] == player && gameField[6] == player) {
    return true;
  }
  return false;
}
