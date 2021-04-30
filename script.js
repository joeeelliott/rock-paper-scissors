const buttons = Array.from(document.querySelectorAll('.game-btn'));
const commentary = document.querySelector('.commentary-text');
const instructions = document.querySelector('.instructions');
const userChoiceDisplay = document.querySelector('.user-move').lastElementChild;
const compChoiceDisplay = document.querySelector('.comp-move').lastElementChild;  
const result = document.querySelector('.result');

const userScoreDisplay = document.querySelector('.user-score');
const compScoreDisplay = document.querySelector('.comp-score');

const modal = document.querySelector('.modal-div');
const modalIcon = document.querySelector('.modal-icon');
const modalTitle = document.querySelector('.modal-title');
const modalText = document.querySelector('.modal-text');

const continueBtn = document.querySelector('.continue-btn');
const restartBtn = document.querySelector('.restart-btn');

let userChoice;
let compChoice;
let winner;
let userScore = 0;
let compScore = 0;

let gameReset = true; 

let halfwayWinner; 


// activate game
window.addEventListener('DOMContentLoaded', () => {
  commentary.addEventListener('click', () => {
    if(gameReset){
      startGame();
      gameReset = false;
    } 
  })  
});



// saves each players moves to variables 
function userMove(e){
  if(e.currentTarget.classList.contains('rock-btn')){
    userChoice = 'rock';
  } else if(e.currentTarget.classList.contains('paper-btn')){
    userChoice = 'paper';
  } else if(e.currentTarget.classList.contains('scissors-btn')){
    userChoice = 'scissors';
  } 
}

function compMove(){
  let randomNum = Math.floor(Math.random() * 3);
  if(randomNum === 0){
    compChoice = 'rock';
  } else if(randomNum === 1){
    compChoice = 'paper';
  } else {
    compChoice = 'scissors';
  }
}



// Play out the functionality of the game
// show choices, calculate winner, show score, determine game winner 
function displayChoices(){

  if(userChoice === 'rock'){
    userChoiceDisplay.classList.add('fa-hand-rock');
  } else if(userChoice === 'paper'){
    userChoiceDisplay.classList.add('fa-hand-paper');
  } else {
    userChoiceDisplay.classList.add('fa-hand-scissors');
  }

  if(compChoice === 'rock'){
    compChoiceDisplay.classList.add('fa-hand-rock');
  } else if(compChoice === 'paper'){
    compChoiceDisplay.classList.add('fa-hand-paper');
  } else {
    compChoiceDisplay.classList.add('fa-hand-scissors');
  }

  if(userChoice === 'rock' && compChoice === 'paper'){
    winner = 'compWin';
  } else if(userChoice === 'rock' && compChoice === 'scissors'){
    winner = 'userWin';
  } else if (userChoice === 'rock' && compChoice === 'rock'){
    winner = 'draw';
  } else if (userChoice === 'paper' && compChoice === 'rock'){
    winner = 'userWin';  
  } else if (userChoice === 'paper' && compChoice === 'paper'){
    winner = 'draw';  
  } else if (userChoice === 'paper' && compChoice === 'scissors'){
    winner = 'compWin';  
  } else if (userChoice === 'scissors' && compChoice === 'rock'){
    winner = 'compWin';  
  } else if (userChoice === 'scissors' && compChoice === 'paper'){
    winner = 'userWin';  
  } else if (userChoice === 'scissors' && compChoice === 'scissors'){
    winner = 'draw';  
  } else {
    alert('something has gone wrong'); 
  }

  if(winner === 'userWin'){
    userPoint();
    if(userScore === 5 && compScore < 5){
      userHalfWayModal(); 
      halfwayWinner = "user";
      console.log(`halfwayWinner is ${halfwayWinner}`); 
    } else if(userScore === 10 && compScore < 10){
      console.log(`halfwayWinner was ${halfwayWinner}`); 
      if(halfwayWinner === "user"){
        userWinGameOver();
      } else if(halfwayWinner === "comp"){
        userComeBackWinGameOver();
      }
      
    }
  } else if(winner === 'compWin'){
    compPoint();
    if(compScore === 5 && userScore < 5){
      compHalfWayModal();
      halfwayWinner = "comp"; 
      console.log(`halfwayWinner is ${halfwayWinner}`); 
    } else if(compScore === 10 && userScore < 10){
      console.log(`halfwayWinner was ${halfwayWinner}`); 
      if(halfwayWinner === "comp"){
        compWinGameOver();
      } else if(halfwayWinner === "user"){
        compComeBackWinGameOver();
      }
    }
  } else {
    drawNoPoints();
  }

  setTimeout(nextMove, 1000);
}

function capitalizeFirstLetter(word){
  return word.charAt(0).toUpperCase() + word.slice(1); 
}

function userPoint(){
  commentary.innerText = `${capitalizeFirstLetter(userChoice)} beats ${capitalizeFirstLetter(compChoice)}`;
  result.classList.add('result-win');
  result.innerText = "You win!";
  userScore ++;
  userScoreDisplay.innerText = userScore; 
  instructions.innerText = "Congratulations."
}

function compPoint(){
  commentary.innerText = `${capitalizeFirstLetter(compChoice)} beats ${capitalizeFirstLetter(userChoice)}`;
  result.classList.add('result-loss');
  result.innerText = "Computer wins.";
  compScore ++;
  compScoreDisplay.innerText = compScore; 
  instructions.innerText = "Unlucky."
}

function drawNoPoints(){
  commentary.innerText = `Draw!`;
  result.innerText = `No winner.`;
  instructions.innerText = "We go again."
}

function openModalWinner(winning){
  let displayWinner;
  let codeWinner;
  if(winning === "user"){
    displayWinner = 'You';
    codeWinner = 'user'
  } else if(winning === "comp"){
    displayWinner = 'The computer';
    codeWinner = 'comp'; 
  }
  modal.classList.add('visible');
  modal.classList.add(`${codeWinner}-win`);
  modalIcon.classList.add('visibile');
}

function userHalfWayModal(){
  openModalWinner('user'); 
  modalIcon.classList.add('fa-smile');
  modalTitle.innerText = "Well played!";
  modalText.innerText = "You made it to 5 first! You are winning at the half way point.";
  continueBtn.innerText = "Finish him";
  restartBtn.innerText = "Show mercy";
}

function compHalfWayModal(){
  openModalWinner('comp');
  modalIcon.classList.add('fa-frown');
  modalTitle.innerText = "Unlucky.";
  modalText.innerText = "The computer made it to 5 first. They are winning at the half way point.";
  continueBtn.innerText = "Keep fighting";
  restartBtn.innerText = "Give up";
}

function userWinGameOver(){
  openModalWinner('user'); 
  modalIcon.classList.add('fa-trophy');
  modalTitle.innerText = "Congratulations!";
  modalText.innerText = "We're giving you the dub here.";
  continueBtn.classList.add('displayNone');
  restartBtn.innerText = "Restart";
}

function compWinGameOver(){
  openModalWinner('comp');
  modalIcon.classList.add('fa-sad-cry');
  modalTitle.innerText = "Commiserations!";
  modalText.innerText = "The computer has taken the dub.";
  continueBtn.classList.add('displayNone');
  restartBtn.innerText = "Restart";
}

function userComeBackWinGameOver(){
  openModalWinner('user'); 
  modalIcon.classList.add('fa-trophy');
  modalTitle.innerText = "Congratulations!";
  modalText.innerText = "What a comeback win! Grab yourself a beer.";
  continueBtn.classList.add('displayNone');
  restartBtn.innerText = "Restart";
}

function compComeBackWinGameOver(){
  openModalWinner('comp');
  modalIcon.classList.add('fa-sad-cry');
  modalTitle.innerText = "Commiserations!";
  modalText.innerText = "The computer has humiliated you. Hang your head in shame.";
  continueBtn.classList.add('displayNone');
  restartBtn.innerText = "Restart";
}

function nextMove(){
  instructions.innerText = "Make your move.";
  commentary.innerText = "Let's go again!"; 
  userChoiceDisplay.classList.remove('fa-hand-rock');
  userChoiceDisplay.classList.remove('fa-hand-paper');
  userChoiceDisplay.classList.remove('fa-hand-scissors');
  compChoiceDisplay.classList.remove('fa-hand-rock');
  compChoiceDisplay.classList.remove('fa-hand-paper');
  compChoiceDisplay.classList.remove('fa-hand-scissors');
  result.classList.remove('result-loss');
  result.classList.remove('result-win');
  result.innerText = "";
}

function resetModalClasses(){
  modal.classList.remove('visible');
  modal.classList.remove('user-win');
  modal.classList.remove('comp-win');
  modalIcon.classList.remove('fa-trophy');
  modalIcon.classList.remove('fa-frown');
  modalIcon.classList.remove('fa-smile');
  modalIcon.classList.remove('fa-sad-cry');
  modalIcon.classList.remove('visibile');
  continueBtn.classList.remove('displayNone');
}



// game 
function startGame(){

  commentary.innerText = `Let's play!`; 
  instructions.classList.toggle('show-instructions');

  buttons.forEach(button => {
      // console.log(button.firstElementChild);
      button.firstElementChild.classList.add('btn-start-game');
      // button.classList.add('btn-start-game');
      button.addEventListener('click', userMove);
      button.addEventListener('click', compMove);
      button.addEventListener('click', displayChoices);
  });
}

continueBtn.addEventListener('click', () => {
  resetModalClasses();
});

restartBtn.addEventListener('click', () => {
  resetModalClasses()


  userScore = 0;
  userScoreDisplay.innerText = userScore; 

  compScore = 0;
  compScoreDisplay.innerText = compScore; 

  commentary.innerText = "Let's go again.";
});