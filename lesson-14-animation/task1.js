'use strict';

//UI
createGame();

function createGame() {
  var wrapper = document.querySelector('.wrapper');
  wrapper.appendChild( createControls() );
  wrapper.appendChild( createDesk() );
}

function createControls() {
  var title = createDivElement('', 'title');
  title.appendChild( createButton('reset', 'btn', 'Reset') );
  title.appendChild( createButton('start', 'btn', 'Start!') );
  var div = createDivElement('', 'score');
  div.appendChild( createSpan('player1-score', '0') );
  div.appendChild( createSpan('', ':') );
  div.appendChild( createSpan('player2-score', '0') );
  title.appendChild(div);
  return title;
}

function createButton(id, className, value) {
  var button = document.createElement('input');
  button.setAttribute('type', 'button');
  button.setAttribute('id', id);
  button.className = className;
  button.setAttribute('value', value)
  return button;
}

function createDivElement(id, className) {
  var div = document.createElement('div');
  div.setAttribute('id', id);
  div.className = className;
  return div;
}

function createSpan(className, text) {
  var span = document.createElement('span');
  span.className = className;
  span.textContent = text;
  return span;
}

function createDesk() {
  var div = createDivElement('', 'area');
  div.style.width = 600 + 'px';
  div.style.height = 400 + 'px';
  div.appendChild( createGameElement('Racket1', 'racket1', 16, 140, 'racket') );
  div.appendChild( createGameElement('Racket2', 'racket2', 16, 140, 'racket') );
  div.appendChild( createGameElement('Ball', 'ball', 40, 40) );

  return div;
}

function createGameElement(elem, id, width, height, className) {
  var elem = createDivElement('div');
  elem.className = className;
  elem.id = id;
  elem.style.width = width + 'px';
  elem.style.height = height + 'px';
  return elem;
}

//Logic
var Area =
  {
    width: 600,
    height: 400
  }

var Ball =
  {
    PosX: 0,
    PosY: 0,
    SpeedX: 4,
    SpeedY: 3,
    width: 40,
    height: 40,
    Update: function () {
      var Ball = document.getElementById('ball');
      Ball.style.left = this.PosX + "px";
      Ball.style.top = this.PosY + "px";
    },
  };

var Racket1 =
  {
    PosX: 0,
    PosY: 0,
    SpeedY: 0,
    width: 16,
    height: 140,
    Update: function () {
      var Racket1 = document.getElementById('racket1');
      Racket1.style.left = this.PosX + "px";
      Racket1.style.top = this.PosY + "px";
    },
    Move: function () {
      this.PosY += this.SpeedY;
    },
    Stop: function () {
      this.SpeedY = 0;
    },
  }

var Racket2 =
  {
    PosX: 0,
    PosY: 0,
    SpeedY: 0,
    width: 16,
    height: 140,
    Update: function () {
      var Racket2 = document.getElementById('racket2');
      Racket2.style.left = this.PosX + "px";
      Racket2.style.top = this.PosY + "px";
    },
    Move: function () {
      this.PosY += this.SpeedY;
    },
    Stop: function () {
      this.SpeedY = 0;
    },
  }
var player1Score = 0;
var player2Score = 0;


startRacketsPos();

//движение мяча
//отталкивание от стены
//отталктвание от ракеток
//фиксация мяча у стены
function throwBall() {
  Ball.PosX += Ball.SpeedX;
  // слева
  if (Ball.PosX < 0 + Racket1.width) {
    if (Ball.PosY + Ball.height > Racket1.PosY && Ball.PosY < Racket1.PosY + Racket1.height) {//мяч напротив ракетки
      Ball.SpeedX = -Ball.SpeedX;
      Ball.PosX = 0 + Racket1.width;
    } else {
      goalBall(1);
      player2Score++;
      setScore(2, player2Score);
      stopBall();
    }
  }
  //справа
  if (Ball.PosX + Ball.width > Area.width - Racket2.width) {
    if (Ball.PosY + Ball.height > Racket2.PosY && Ball.PosY < Racket2.PosY + Racket2.height) {//мяч напротив ракетки
      Ball.SpeedX = -Ball.SpeedX;
      Ball.PosX = Area.width - Racket2.width - Ball.width;
    } else {
      goalBall(2);
      player1Score++;
      setScore(1, player1Score);
      stopBall();
    }
  }
  Ball.PosY += Ball.SpeedY;
  // вылетел ли мяч ниже пола?
  if (Ball.PosY + Ball.height > Area.height) {
    Ball.SpeedY = -Ball.SpeedY;
    Ball.PosY = Area.height - Ball.height;
  }
  // вылетел ли мяч выше потолка?
  if (Ball.PosY < 0) {
    Ball.SpeedY = -Ball.SpeedY;
    Ball.PosY = 0;
  }
  Ball.Update();
}
Ball.Update();
Racket1.Update();
Racket2.Update();

//рандомный вылет
function randomBallStart() {
  Ball.PosX = Area.width / 2 - Ball.width / 2;
  Ball.PosY = Area.height / 2 - Ball.height / 2;

  var direction = Math.random();

  if(direction > 0.5) {
    Ball.SpeedX = Math.floor(Math.random() * 5 + 3);
    Ball.SpeedY = Math.floor(Math.random() * 5 + 3);
  } else {
    Ball.SpeedX = -1 * Math.floor(Math.random() * 5 + 3);
    Ball.SpeedY = -1 * Math.floor(Math.random() * 5 + 3);
  }
}

//движение ракеток
function startRacketsPos() {
  Racket1.PosX = 0;
  Racket1.PosY = Area.height / 2 - Racket1.height / 2;
  Racket2.PosX = Area.width - Racket2.width;
  Racket2.PosY = Area.height / 2 - Racket2.height / 2;
}

function moveRackets() {
  Racket1.Move();
  Racket2.Move();
  checkRacketsPosition(Racket1);
  checkRacketsPosition(Racket2);
}

function checkRacketsPosition(racket) {
  // сместилась ли ракетка выше потолка?
  if (racket.PosY < 0) {
    racket.PosY = 0;
  }
  // сместилась ли ракетка ниже пола?
  if (racket.PosY + racket.height > Area.height) {
    racket.PosY = Area.height - racket.height;
  }
  // сместилась ли ракетка выше потолка?
  if (racket.PosY < 0) {
    racket.PosY = 0;
  }
  // сместилась ли ракетка ниже пола?
  if (racket.PosY + racket.height > Area.height) {
    racket.PosY = Area.height - racket.height;
  }
  racket.Update();
}

function getSpeed(event) {
  event.preventDefault();
  switch (event.keyCode) {
    case 16:
      setSpeed('up', Racket1);
      break;
    case 17:
      setSpeed('down', Racket1);
      break;
    case 38:
      setSpeed('up', Racket2);
      break;
    case 40:
      setSpeed('down', Racket2);
      break;
  }
}

function setSpeed(direction, racket) {
  if (direction == 'up') {
    racket.SpeedY = -5;
  }
  if (direction == 'down') {
    racket.SpeedY = 5;
  }
}

//счет
function setScore(player, score) {
  var playerScore = document.querySelector('.player'+ player +'-score');
  playerScore.innerHTML = score;
}



//старт
function loadGame() {
  throwBall();
  moveRackets(Racket1);
  moveRackets(Racket2);
  requestAnimationFrame(loadGame);
}
stopBall();

function Start() {
  startRacketsPos();
  randomBallStart();
}

function stopRackets() {
  Racket1.Stop();
  Racket2.Stop();
}

function stopBall() {
  Ball.PosX = Area.width / 2 - Ball.width / 2;
  Ball.PosY = Area.height / 2 - Ball.height / 2;
  Ball.SpeedX = 0;
  Ball.SpeedY = 0;
  Ball.Update();
}
function goalBall(player) {
  if ((Ball.PosX + Ball.width > Area.width) || (Ball.PosX < Area.width)) {
    if (player === 1) {
    Ball.PosX = 0;
    Ball.PosY = Ball.PosY;
    Ball.SpeedX = 0;
    Ball.SpeedY = 0;
  } else {
    Ball.PosX = Area.width - Ball.width;
    Ball.PosY = Ball.PosY;
    Ball.SpeedX = 0;
    Ball.SpeedY = 0;
  }
  Ball.Update();
  }

}

function resetAllPositions() {
  stopBall();
  Racket1.PosX = 0;
  Racket1.PosY = Area.height / 2 - Racket1.height / 2;
  Racket2.PosX = Area.width - Racket2.width;
  Racket2.PosY = Area.height / 2 - Racket2.height / 2;
  //score обнулить
  player1Score = 0;
  player2Score = 0;
  document.querySelector('.player1-score').textContent = '0';
	document.querySelector('.player2-score').textContent = '0';
}

document.addEventListener('DOMContentLoaded', loadGame);
document.addEventListener('keydown', getSpeed);
document.addEventListener('keyup', stopRackets);
document.querySelector('#start').addEventListener('click', Start);
document.querySelector('#reset').addEventListener('click', resetAllPositions);



// function score() {
//   var sc = 0;
//   return function(correct) {
//     if (correct) {
//       sc++;
//     }
//     return sc;
//   }
// }

// var keepScore = score();
// Question.prototype.checkAnswer = function(ans, callback) {
//   var sc;

//   if (ans === this.correct) {
//     console.log('Correct answer!');
//     sc = callback(true);
//   } else {
//     console.log('Wrong answer. Try again :)');
//     sc = callback(false);
//   }

//   this.displayScore(sc);
// };
