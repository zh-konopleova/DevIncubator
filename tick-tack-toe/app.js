"use strict";

let currentPlayer = 1;
let gameField = [];
let cells = document.querySelectorAll(".field__item");

let xPoints = 0;
let oPoints = 0;

function clearGameField() {
  cells.forEach(function (cell) {
    cell.innerText = '';
  });

  gameField = [
    undefined, undefined, undefined,
    undefined, undefined, undefined,
    undefined, undefined, undefined
  ];
}

let restartButton = document.querySelector('.btn--restart');
restartButton.addEventListener("click", function(event) {
  event.preventDefault();

  xPoints = 0;
  oPoints = 0;

  document.querySelector('.score__result--o').innerText = oPoints;
  document.querySelector('.score__result--x').innerText = xPoints;
});

clearGameField();

cells.forEach(function(cell) {
  cell.addEventListener("click", function(event) {
    event.preventDefault();
    let index = +this.getAttribute("data-id");
    if (gameField[index - 1] !== undefined) {
      return;
    }
    if (currentPlayer === 1) {
      this.innerText = 'X';
      gameField[index - 1] = 'X';
      currentPlayer = 2;
      document.querySelector('.current-player__number').innerText = 'O';
      if (checkWinner('X')) {
        xPoints++;
        document.querySelector('.score__result--x').innerText = xPoints;
        clearGameField();
        document.querySelector('.modal-title').innerText = 'Крестики победили! Продолжить?';
        $('#modalCenter').modal('show');
      }
    } else {
      this.innerText = 'O';
      gameField[index - 1] = 'O';
      currentPlayer = 1;
      document.querySelector('.current-player__number').innerText = 'X';
      if (checkWinner('O')) {
        oPoints++;
        document.querySelector('.score__result--o').innerText = oPoints;
        clearGameField();
        document.querySelector('.modal-title').innerText = 'Нолики победили! Продолжить?';
        $('#modalCenter').modal('show');
      }
    }
    let draw = true;
    for (let i = 0; i < gameField.length; i++) {
      if (gameField[i] === undefined) {
        draw = false;
      }
    };
    if (draw) {
      clearGameField();
      document.querySelector('.modal-title').innerText = 'Ничья! Продолжить?';
      $('#modalCenter').modal('show');
    }
  });
});

let randomMoveButton = document.querySelector('.btn--random');
randomMoveButton.addEventListener('click', function(event) {
  event.preventDefault();
  let randomFieldPosition = [];
  for (let i = 0; i < gameField.length; i++) {
    if (gameField[i] === undefined) {
      randomFieldPosition.push(i);
    }
  }
  let item = randomFieldPosition[Math.floor(Math.random()*randomFieldPosition.length)];
  gameField[item] = 'X';
  cells[item].innerText = 'X';
})

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
