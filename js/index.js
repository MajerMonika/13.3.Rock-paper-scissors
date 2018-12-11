'use strict'

var buttonPaper = document.getElementById('paper');
var buttonRock = document.getElementById('rock');
var buttonScissor = document.getElementById('scissors');
var buttonNewGame = document.getElementById('newGame');

var params = {
  output: document.getElementById('output'),
  viewResults: document.getElementById('result'),
  outputNewGame: document.getElementById('outputNewGame'),
  playerWins: 0,
  computerWins: 0,
  maxRounds: 0,
  completeRounds: 0,
  progress: [],
};


var btnPlayerMove = document.querySelectorAll('.player-move');

for (var i = 0; i < btnPlayerMove.length; i++) {
  var dataMove = btnPlayerMove[i].getAttribute('data-move');

  btnPlayerMove[i].addEventListener('click', function () {

    playerMove(dataMove);
  });
}

buttonNewGame.addEventListener('click', function () {
  params.output.innerHTML = '';
  params.viewResults.innerHTML = '';
  params.maxRounds = window.prompt('How many round you want to play?');
  params.outputNewGame.innerHTML = 'You have ' + params.maxRounds + ' runds to play.';
  params.completeRounds = 0;
  params.playerWins = 0;
  params.computerWins = 0;
  buttonPaper.removeAttribute('disabled');
  buttonRock.removeAttribute('disabled');
  buttonScissor.removeAttribute('disabled');

  if (params.maxRounds === null || params.maxRounds === '') {
    params.outputNewGame.innerHTML = 'Etnter number!';
  } else if (isNaN(params.maxRounds)) {
    params.outputNewGame.innerHTML = 'This is not a number!';
  } else if (params.maxRounds == params.completeRounds) {
    buttonPaper.removeAttribute('disabled');
    buttonRock.removeAttribute('disabled');
    buttonScissor.removeAttribute('disabled');
  }
})

var getComputerMove = function () {
  var posibleMoves = ['paper', 'rock', 'scissors'];
  return posibleMoves[Math.floor(Math.random() * posibleMoves.length)];
};

var displayResults = function (winnerIs, playerMove, computerMove) {
  if (winnerIs === 'none') {
    params.output.innerHTML = 'Draw!<br>' + params.output.innerHTML;
  } else if (winnerIs === 'player') {
    params.output.innerHTML = 'You won! You played ' + playerMove + ' and computer played ' + computerMove + '<br>' + params.output.innerHTML;
    params.playerWins++;
    params.completeRounds++;
  } else {
    params.output.innerHTML = 'You lost! You played ' + playerMove + ' and computer played ' + computerMove + '<br>';
    params.computerWins++;
    params.completeRounds++;
  }

  params.viewResults.innerHTML = params.playerWins + ' : ' + params.computerWins + '<br>';

  if (params.maxRounds == params.completeRounds) {
    params.viewResults.insertAdjacentHTML('beforeend', 'The game is over! Click the button "Start new game" to play once again.<br>');
    buttonPaper.setAttribute('disabled', true);
    buttonRock.setAttribute('disabled', true);
    buttonScissor.setAttribute('disabled', true);
    params.outputNewGame.insertAdjacentHTML = '';

    showModal();
    const divResults = document.querySelector('.content').children;

    function results() {
      return 'The game is over! Click the button "Start new game" to play once again.<br>';
    };
    divResults[0].insertAdjacentHTML('afterbegin', results());
  } else if (params.playerWins === params.completeRounds) {
    params.viewResults.insertAdjacentHTML('beforeend', 'You won!<br>');
  } else if (params.computerWins === params.completeRounds) {
    params.viewResults.insertAdjacentHTML('beforeend', 'You lost!<br>');
  }
};

var playerMove = function (playerMove) {
  var computerMove = getComputerMove();
  var winnerIs = 'player';
  if (computerMove === 'scissors' && playerMove === 'paper' ||
    computerMove === 'rock' && playerMove === 'scissors' ||
    computerMove === 'paper' && playerMove === 'rock') {
    winnerIs = "computer";
  } else if (computerMove === playerMove) {
    winnerIs = 'none';
  }
  displayResults(winnerIs, playerMove, computerMove);

  params.progress.push({
    winnerIs: winnerIs,
    computerMove: computerMove,
    playerMove: playerMove,
  }, );
}

var showModal = function () {

  var resultsEl = document.querySelector('.content-results');

  for (var i = 0; i < params.progress.length; i++) {
    resultsEl.innerHTML += '<tr><td>' + params.progress[i].winnerIs + '</td><td>' + params.progress[i].playerMove + '</td><td>' + params.progress[i].computerMove + '</td></tr>';
  }

  document.querySelector('#displayResults').classList.add('show');
  document.querySelector('#modal-overlay').classList.add('show');
};

var hideModal = function (event) {
  var activeModal = document.querySelectorAll('.modal')

  event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');

  for (var i = 0; i < activeModal.length; i++) {
    activeModal[i].classList.remove('show');
  }
};

var closeButtons = document.querySelectorAll('.modal .close');

for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', hideModal);
}

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

var modals = document.querySelectorAll('.modal');

for (var i = 0; i < modals.length; i++) {
  modals[i].addEventListener('click', function (event) {
    event.stopPropagation();
  });
}
