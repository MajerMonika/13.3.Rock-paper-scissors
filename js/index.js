'use strict';

var output = document.getElementById("output"); 
var comment = document.getElementById("comment"); 
var result = document.getElementById("result"); 
var round = document.getElementById("round"); 
var button = document.getElementById('start-game');
var rounds = 0;
var loses = 0;
var wins = 0;
var games = 0; 

button.addEventListener('click', newGame);

function newGame() {
  loses = 0;
  wins = 0;
  games = 0;
  
  rounds = window.prompt('How many round need to play to be a winner?');
  if (!isNaN(rounds) && rounds>0) {
   document.getElementById("game").style.display = "block";
   round.innerHTML = '<h2><br> Player, you will be a winner if you win ' +rounds+' rounds.<br><h2>'
  } else {
    output.innerHTML = 'Please, write a number' + '<br><br>'; 
  }
}

var rock = document.getElementById('rock');
var paper = document.getElementById('paper');
var scissors = document.getElementById('scissors');

rock.addEventListener('click', move);
paper.addEventListener('click', move);
scissors.addEventListener('click', move);
 

function results() {
  if (games < rounds) {  
    result.innerHTML = 'Player: '+wins+ ' - Computer: '+loses+'<br><br> Games played: '+games+'.';
  }
}

function move() {
  var playerMove = this.id;
  
  var compMove = Math.floor(Math.random() * 3);
  
  if (compMove == 0)  {
    compMove = "rock";
  } else if (compMove == 1) {
    compMove = "paper";
  } else {
    compMove = "scissors";
  } 

  compare (playerMove, compMove);
  games = wins + loses;
  
  output.innerHTML = 'Player: '+playerMove+ '<br> Computer: '+compMove + '<br><br>'; 
  result.innerHTML = 'Player: '+wins+ ' - Computer: '+loses+ '<br><br> Games played: '+games+'.';
  gameOver();
  
}
  
function compare (player, comp) {
    
  if (player === comp) {
    comment.innerHTML = 'Draw!';
  } else if (
    (player == 'paper' && comp == 'scissors') 
    ||
    (player == 'rock' && comp == 'paper')
    ||
    (player == 'scissors' && comp == 'rock')
  ) {
    loses++;
    comment.innerHTML = 'Player lost!';
  } else {
    wins++;
    comment.innerHTML = 'Player won!';
  }
}    
     
function gameOver() {
  if ((wins == rounds) || (loses==rounds)) {
      document.getElementById("game").style.display = "none";
      output.innerHTML = '<br><h2>Game over!</h2> <br><br> Finall result: <br> Player: '+wins+ ' - Computer:'+loses ;
      comment.innerHTML = '';
      result.innerHTML = '';
  } 
}