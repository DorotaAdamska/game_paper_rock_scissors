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

var progress = [];
var roundsNumber;

function computerMove() {
  var choices = ['kamień', 'papier', 'nożyczki'];
  var random = Math.floor(Math.random()*3);
  return choices[random]
}

function checkRoundWinner() {
  if((player.choice === 'nożyczki' && computer.choice === 'papier') || (player.choice === 'papier' && computer.choice === 'kamień') || (player.choice === 'kamień' && computer.choice === 'nożyczki')) {
    player.score++;
    output.innerHTML ='WYGRANA - Twój wybór to ' + player.choice + ', komputer wybrał ' + computer.choice;
    return 'wygrana';
  }
  else if(player.choice === computer.choice) {
     output.innerHTML = 'REMIS - Ty i komputer wybraliście ' + player.choice;
     return 'remis';
  } else {
    computer.score++;
    output.innerHTML = 'PRZEGRANA - Twój wybór to ' + player.choice + ', komputer wybrał ' + computer.choice;
    return 'przegrana'
  }
}

function refreshScore() {
  score.innerHTML = player.score + ' - ' + computer.score;
}

var btnChoice = document.querySelectorAll('.player-move');

for (var i = 0; i < btnChoice.length; i++) {
  let dataMove = btnChoice[i].getAttribute('data-move');
  btnChoice[i].addEventListener('click', function(){
    playerMove(dataMove);
  })
  
}

function addRoundResult() {
    progress.push({
      roundsNumber: roundsNumber,
      playerChoice: player.choice,
      computerChoice: computer.choice,
      playerScore: player.score,
      computerScore: computer.score,
      roundWinner: checkRoundWinner()
    })
}

function playerMove(dataMove) {

    player.choice = dataMove;
    computer.choice = computerMove();

    checkRoundWinner();
    refreshScore();

    roundsNumber--;
    addRoundResult();
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
      showModal ('<br> Koniec gry. Gratulacje wygranej! <br>');
    } else if(player.score < computer.score) {
      showModal ('<br> Koniec gry. Wygrał komputer. <br>');
    } else showModal ('<br> Remis <br>');
    paperBtn.disabled = true;
    rockBtn.disabled = true;
    scissorsBtn.disabled = true;
    gameBtn.disabled = false;
    
    // Tabela

var table = document.getElementById('table');
var tbody = table.querySelector('tbody');

for (let i = 0; i < progress.length; i++) {
  
  var row = document.createElement('tr');
  let roundsNumber = document.createElement('td')
  roundsNumber.innerText = progress[i].roundsNumber + 1;

  var playerChoice = document.createElement('td')
  playerChoice.innerText = progress[i].playerChoice;

  var computerChoice = document.createElement('td')
  computerChoice.innerText = progress[i].computerChoice;

  var roundResult = document.createElement('td')
  roundResult.innerText = progress[i].playerScore + ':' + progress[i].computerScore;

  var roundWinner = document.createElement('td')
 roundWinner.innerText = progress[i].roundWinner;

   row.append(roundsNumber, playerChoice, computerChoice, roundResult, roundWinner)
   console.log(row);
    tbody.append(row);
 }



  }
};

// modale 
var showModal = function(text){
  document.querySelector('#modal-overlay').classList.add('show');
  document.querySelector('#modal-one').classList.add('show');
  result.querySelector(".msg").innerHTML = text;
};

var hideModal = function(event){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');
  document.querySelector('#modal-one').classList.remove('show');
};
  
 var closeButtons = document.querySelectorAll('.modal .close');
  
for(var i = 0; i < closeButtons.length; i++){
  closeButtons[i].addEventListener('click', hideModal);
}
  
document.querySelector('#modal-overlay').addEventListener('click', hideModal);
  
var modals = document.querySelectorAll('.modal');
  
for(var i = 0; i < modals.length; i++){
  modals[i].addEventListener('click', function(event){
  event.stopPropagation();
  }
  );
}