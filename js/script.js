'use strict'

var paperBtn = document.querySelector('#paper');
var rockBtn = document.querySelector('#rock');
var scissorsBtn = document.querySelector('#scissors');
var gameBtn = document.querySelector('#new-game');

var output = document.querySelector('#output');
var scoreDiv = document.querySelector('#score');
var roundNumberInfo = document.querySelector('#round-number');
var gameResultInfo = document.querySelector('#game-result');

/* zmienne globalne */
var params = {
  player: {
    score: 0,
    choice: ''
  },
  computer: {
    score: 0,
    choice: ''
  },

  progress: [],
  roundsNumber: ''
}

function computerMove() {
  var choices = ['kamień', 'papier', 'nożyczki'];
  var random = Math.floor(Math.random()*3);
  return choices[random]
}

function checkRoundWinner() {
  if((params.player.choice === 'nożyczki' && params.computer.choice === 'papier') || (params.player.choice === 'papier' && params.computer.choice === 'kamień') || (params.player.choice === 'kamień' && params.computer.choice === 'nożyczki')) {
    params.player.score++;
    output.innerHTML ='WYGRANA - Twój wybór to ' + params.player.choice + ', komputer wybrał ' + params.computer.choice;
    return 'wygrana';
  }
  else if(params.player.choice === params.computer.choice) {
     output.innerHTML = 'REMIS - Ty i komputer wybraliście ' + params.player.choice;
     return 'remis';
  } else {
    params.computer.score++;
    output.innerHTML = 'PRZEGRANA - Twój wybór to ' + params.player.choice + ', komputer wybrał ' + params.computer.choice;
    return 'przegrana'
  }
}

function refreshScore() {
  score.innerHTML = params.player.score + ' - ' + params.computer.score;
}

var btnChoice = document.querySelectorAll('.player-move');

for (var i = 0; i < btnChoice.length; i++) {
  let dataMove = btnChoice[i].getAttribute('data-move');
  btnChoice[i].addEventListener('click', function(){
    playerMove(dataMove);
  })
  
}

function addRoundResult() {
    params.progress.push({
      roundsNumber: params.roundsNumber,
      playerChoice: params.player.choice,
      computerChoice: params.computer.choice,
      playerScore: params.player.score,
      computerScore: params.computer.score,
      roundWinner: checkRoundWinner()
    })
}


function playerMove(dataMove) {

    params.player.choice = dataMove;
    params.computer.choice = computerMove();

    checkRoundWinner();
    refreshScore();

    params.roundsNumber--;
    addRoundResult();
    gameOver();  
}

// new game

gameBtn.addEventListener('click', function() {
  params.roundsNumber = window.prompt('Ile rund ma mieć Twoja gra?');
  if ((params.roundsNumber === null) || (params.roundsNumber < 3)) {
      roundNumberInfo.innerHTML = 'Wpisz prawidłową wartość (minimum 3)'
  }
  else {
      params.player.score = 0;
      params.computer.score = 0;
      params.player.choice = '';
      params.computer.choice = '';
      refreshScore();
      var winner = Math.floor(params.roundsNumber*1/2 +1);
      roundNumberInfo.innerHTML = 'Ilość rund ' + params.roundsNumber + ' -   zwyciężysz jeśli wygrasz ' + winner + ' razy';
      paperBtn.disabled = false;
      rockBtn.disabled = false;
      scissorsBtn.disabled = false;
      gameBtn.disabled = true;
  };
});

// game over

function gameOver() {
  if(params.roundsNumber === 0) {
    if(params.player.score > params.computer.score) {
      showModal ('<br> Koniec gry. Gratulacje wygranej! <br>');
    } else if(params.player.score < params.computer.score) {
      showModal ('<br> Koniec gry. Wygrał komputer. <br>');
    } else showModal ('<br> Remis <br>');
    paperBtn.disabled = true;
    rockBtn.disabled = true;
    scissorsBtn.disabled = true;
    gameBtn.disabled = false;
    
    // Tabela

var table = document.getElementById('table');
var tbody = table.querySelector('tbody');

for (let i = 0; i < params.progress.length; i++) {
  
  var row = document.createElement('tr');
  let roundsNumber = document.createElement('td')
  roundsNumber.innerText = params.progress[i].roundsNumber + 1;

  var playerChoice = document.createElement('td')
  playerChoice.innerText = params.progress[i].playerChoice;

  var computerChoice = document.createElement('td')
  computerChoice.innerText = params.progress[i].computerChoice;

  var roundResult = document.createElement('td')
  roundResult.innerText = params.progress[i].playerScore + ':' + params.progress[i].computerScore;

  var roundWinner = document.createElement('td')
 roundWinner.innerText = params.progress[i].roundWinner;

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