"use strict";

let currentPlayer = 'X';
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

    if (cellIsNotEmpty(this)) return;
    round(this);
  });
});

function cellIsNotEmpty(cell) {
  let index = +cell.getAttribute("data-id");
  return gameField[index - 1] !== undefined;
};

function playerMove(cell, player) {
  let index = +cell.getAttribute("data-id");
  cell.innerText = player;
  gameField[index - 1] = player;
};

function switchPlayer(player) {
  currentPlayer = player;
  document.querySelector('.current-player__number').innerText = player;
};

function nextPlayer() {
  return currentPlayer === 'X' ? 'O' : 'X';
};

function changeScore() {
  if (currentPlayer === 'X') {
    xPoints++;
    document.querySelector('.score__result--x').innerText = xPoints;
  } else {
    oPoints++;
    document.querySelector('.score__result--o').innerText = oPoints;
  }
};

function isDraw() {
  let draw = true;
  for (let i = 0; i < gameField.length; i++) {
    if (gameField[i] === undefined) {
      draw = false;
    }
  }
  return draw;
};


function openDialogue(text) {
  document.querySelector('.modal-title').innerText = text;
  $('#modalCenter').modal('show');
};

function round(cell) {
  playerMove(cell, currentPlayer);
  if (checkWinner(currentPlayer)) {
    changeScore();
    setTimeout(clearGameField, 1000);
    openDialogue(currentPlayer + ' победили! Продолжить?');
  }
  switchPlayer(nextPlayer());

  if (isDraw()) {
    clearGameField();
    openDialogue('Ничья! Продолжить?');
  }
};

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
  round(cells[item]);
});

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
