'use strict';

//function to create secret number
const secretCreator = () => {
  return Math.trunc(Math.random() * maxNumber + 1);
};

// variables
const minNumber = 1;
const maxNumber = 20;
let score = 20;
let highScore = 0;
let drawNumber = secretCreator();

// handles
const playAgain = document.querySelector('.again-button');
const guessValue = document.querySelector('.guess');
const checkValue = document.querySelector('.check-input');
const check = document.querySelector('.check-button');
const correctValue = document.querySelector('.correct-number');
const hintContent = document.querySelector('.hint');
let scoreValue = document.getElementById('score-span');
const highScoreValue = document.getElementById('highScore-span');

//initial text contentes
hintContent.textContent = 'Start guessing ...';
scoreValue.textContent = score;
highScoreValue.textContent = highScore;

// function to check the highscore
const checkHighScore = () => {
  if (score > highScore) {
    highScore = score;
  }
  highScoreValue.textContent = highScore;
};
// function to display hint
const displayHint = message => {
  hintContent.textContent = message;
};
//function to set initial values when playing again
const setInitialValues = () => {
  check.disabled = false;
  guessValue.disabled = false;
  guessValue.value = '';
  correctValue.textContent = '?';
  document.body.style.backgroundColor = 'var(--black)';
  correctValue.style.width = '100px';
  correctValue.style.fontSize = '2em';
  correctValue.style.backgroundColor = 'var(--yellow)';
  displayHint('Start guessing ... ');
};
// input functioning also with enter
guessValue.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    check.click();
  }
});

// game functionalities
check.addEventListener('click', function () {
  // When no guess given or if incorrect value
  if (!guessValue.value) {
    displayHint('⛔ add value!');
  } else if (guessValue.value < minNumber || guessValue.value > maxNumber) {
    displayHint(`⛔ check your guess!`);
    //When score is above 1 (minimum value)
  } else if (score > minNumber) {
    // When player wins
    if (+guessValue.value === drawNumber) {
      correctValue.textContent = drawNumber;
      score--;
      displayHint('✌️ correct !!!');
      scoreValue.textContent = score;
      checkHighScore();
      document.body.style.backgroundColor = 'var(--green)';
      correctValue.style.width = '200px';
      correctValue.style.fontSize = '2.2em';
      correctValue.style.backgroundColor = 'var(--orange)';
      // or document.querySelector('body').style.backgroundColor='#60b347'
      check.disabled = true;
      guessValue.disabled = true;

      // When guess is too high or too low
    } else {
      // guessValue.value > drawNumber
      //   ? displayHint("📈 Too high! Try again.")
      //   : displayHint("📉 Too low! Try again.");
      displayHint(
        guessValue.value > drawNumber
          ? '📈 Too high! Try again.'
          : '📉 Too low! Try again.'
      );
      score--;
      scoreValue.textContent = score;
    }
    // When player looses
  } else {
    displayHint('🥸 No more guesses. Try again?!');
    score = 0;
    scoreValue.textContent = score;
    check.disabled = true;
    guessValue.disabled = true;
  }
});
// play again button's functionalities
playAgain.addEventListener('click', () => {
  drawNumber = secretCreator();
  score = maxNumber;
  scoreValue.textContent = score;
  setInitialValues();
});
