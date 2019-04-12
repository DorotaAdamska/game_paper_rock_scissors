'use strict'

var paperBtn = document.querySelector('#paper');
var rockBtn = document.querySelector('#rock');
var scissorsBtn = document.querySelector('#scissors');
var gameBtn = document.querySelector('#new-game');

var output = document.querySelector('#output');
var scoreDiv = document.querySelector('#score');
var roundNumberInfo = document.querySelector('#round-number');
var gameResultInfo = document.querySelector('#game-result');

var player = {
  score: 0,
  choice: ''
}

var computer = {
  score: 0,
  choice: ''
}

var roundsNumber;

rockBtn.addEventListener('click', function() { playerMove('kamień') });
paperBtn.addEventListener('click', function() { playerMove('papier') });
scissorsBtn.addEventListener('click', function() { playerMove('nożyczki') });

function computerMove() {
  var choices = ['kamień', 'papier', 'nożyczki'];
  var random = Math.floor(Math.random()*3);
  return choices[random]
}

function checkRoundWinner() {
  if((player.choice === 'nożyczki' && computer.choice === 'papier') || (player.choice === 'papier' && computer.choice === 'kamień') || (player.choice === 'kamień' && computer.choice === 'nożyczki')) {
    player.score++;
    output.innerHTML ='WYGRANA - Twój wybór to ' + player.choice + ', komputer wybrał ' + computer.choice;
  } 
  else if(player.choice === computer.choice) {
     output.innerHTML = 'REMIS - Ty i komputer wybraliście ' + player.choice;
  } else {
    computer.score++;
    output.innerHTML = 'PRZEGRANA - Twój wybór to Twój wybór to ' + player.choice + ', komputer wybrał ' + computer.choice;
  }
} 

function refreshScore() {
  score.innerHTML = player.score + ' - ' + computer.score;
}

var btnChoice = document.querySelectorAll('.player-move'); 

for (var i = 0; i < btnChoice.length; i++) {
  var dataMove = btnChoice[i].getAttribute('data-move');
  btnChoice[i].addEventListener('click', function(){
    playerMove(dataMove);
  });
};

function playerMove(dataMove) {
  
    player.choice = dataMove;
    computer.choice = computerMove();
  
    checkRoundWinner();
    refreshScore();
  
    roundsNumber--;
    gameOver();

}

// new game

gameBtn.addEventListener('click', function() {
  roundsNumber = window.prompt('Ile rund ma mieć Twoja gra?');
  
  if ((roundsNumber === null) || (roundsNumber < 3)) {
      roundNumberInfo.innerHTML = 'Wpisz prawidłową wartość (minimum 3)'
  }
  else {
      player.score = 0;
      computer.score = 0;
      player.choice = '';
      computer.choice = '';
      refreshScore();
      var winner = Math.floor(roundsNumber*1/2 +1);
      roundNumberInfo.innerHTML = 'Ilość rund ' + roundsNumber + ' -   zwyciężysz jeśli wygrasz ' + winner + ' razy';
      paperBtn.disabled = false;
      rockBtn.disabled = false;
      scissorsBtn.disabled = false;
      gameBtn.disabled = true;  
  };  
}); 


// game over

function gameOver() {
  
  if(roundsNumber === 0) {
    if(player.score > computer.score) {
      gameResultInfo.innerHTML = 'Koniec gry. Gratulacje wygranej!';
    } else if(player.score < computer.score) {
      gameResultInfo.innerHTML = 'Koniec gry. Wygrał komputer.';
    } else gameResultInfo.innerHTML = 'Remis';
    paperBtn.disabled = true;
    rockBtn.disabled = true;
    scissorsBtn.disabled = true;
    gameBtn.disabled = false;  
  }
 
};