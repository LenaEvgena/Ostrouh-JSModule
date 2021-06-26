'use strict';
var RequestAnimationFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };

var AreaH =
  {
    Width: 600,
    Height: 400
  }

// function GameObject(PosX, PosY, SpeedX, SpeedY, width, height) {
//     this.PosX = PosX,
//     this.PosY = PosY,
//     this.SpeedX = SpeedX,
//     this.SpeedY = SpeedY,
//     this.Width = width,
//     this.Height = height
// }

// GameObject.prototype.Update = function() {
//   this.style.left = this.PosX + "px";
//   this.style.top = this.PosY + "px";
// }

var BallH =
  {
    PosX: 275,
    PosY: 175,
    SpeedX: 3,
    SpeedY: 3,
    Width: 50,
    Height: 50,
    Update: function () {
      var Ball = document.getElementById('IBall');
      Ball.style.left = this.PosX + "px";
      Ball.style.top = this.PosY + "px";
    }
  };

var Racket1 =
{
  PosX: 0,
  PosY: 135,
  SpeedY: 0,
  Width: 15,
  Height: 130,
  Update: function () {
    var Racket1 = document.getElementById('racket1');
    Racket1.style.top = this.PosY + "px";
  }
}

var Racket2 =
{
  PosX: 585,
  PosY: 135,
  SpeedY: 0,
  Width: 15,
  Height: 130,
  Update: function () {
    var Racket2 = document.getElementById('racket2');
    Racket2.style.top = this.PosY + "px";
  }
}


//старт
function Start() {
  // resetPositions();
  RequestAnimationFrame(throwBall);
  RequestAnimationFrame(moveRacket);
}

document.querySelector('#start').addEventListener('click', Start);
document.querySelector('#reset').addEventListener('click', resetPositions);
document.addEventListener('keydown', moveRacket);
// document.addEventListener('keyup', stopRacket, false);

//движение мяча
//отталкивание от стены
function resetPositions() {
  BallH.PosX = 275;
  BallH.PosY = 175;
  Racket1.PosX = 0;
  Racket1.PosY = 135;
  Racket2.PosX = 585;
  Racket2.PosY = 135;
  //score обнулить
}

function throwBall() {
  BallH.PosX += BallH.SpeedX;
  //справа
  if (BallH.PosX + BallH.Width > AreaH.Width - Racket2.Width) {
    if (BallH.PosY + BallH.Height > Racket2.PosY && BallH.PosY < Racket2.PosY + Racket2.Height) {
      BallH.SpeedX = -BallH.SpeedX;
      BallH.PosX = AreaH.Width - Racket2.Width - BallH.Width;
    } else {
      BallH.SpeedX = 0;
      BallH.SpeedY = 0;
      BallH.PosX = AreaH.Width - BallH.Width + 5;
      BallH.PosY = BallH.PosY;
      BallH.Update();
    }
  }
  // слева
  if (BallH.PosX < 0 + Racket1.Width) {
    if (BallH.PosY + BallH.Height > Racket1.PosY && BallH.PosY < Racket1.PosY + Racket1.Height) {
      BallH.SpeedX = -BallH.SpeedX;
      BallH.PosX = 0 + Racket1.Width;
    } else {
      BallH.SpeedX = 0;
      BallH.SpeedY = 0;
      BallH.PosX = 0;
      BallH.PosY = BallH.PosY;
      BallH.Update();
    }
  }
  BallH.PosY += BallH.SpeedY;
  // вылетел ли мяч ниже пола?
  if (BallH.PosY + BallH.Height > AreaH.Height) {
    BallH.SpeedY = -BallH.SpeedY;
    BallH.PosY = AreaH.Height - BallH.Height;
  }
  // вылетел ли мяч выше потолка?
  if (BallH.PosY < 0) {
    BallH.SpeedY = -BallH.SpeedY;
    BallH.PosY = 0;
  }
  BallH.Update();
  RequestAnimationFrame(throwBall);
}
BallH.Update();

//отталктвание от ракеток
function ifItsGoal() {
  // вылетел ли мяч правее стены
  if (BallH.PosY + BallH.Height < Racket2.PosY || BallH.PosY > Racket2.PosY + Racket2.Height) {
    BallH.SpeedX = 0;
    BallH.SpeedY = 0;
    BallH.PosX = AreaH.Width - BallH.Width;
    BallH.PosY = BallH.PosY;
  }
  // вылетел ли мяч левее стены
  if (BallH.PosY + BallH.Height < Racket1.PosY || BallH.PosY > Racket1.PosY + Racket1.Height) {
    BallH.SpeedX = 0;
    BallH.SpeedY = 0;
    BallH.PosX = 0;
    BallH.PosY = BallH.PosY;

  }
  BallH.PosY += BallH.SpeedY;

  BallH.Update();
}


//рандомный вылет



//движение ракеток
function moveRacket(event) {
  if (event.code === 'ShiftLeft') {
    Racket1.SpeedY = -5;
    Racket1.PosY += Racket1.SpeedY;
  }
  if (event.code === 'ControlLeft') {
    Racket1.SpeedY = 5;
    Racket1.PosY += Racket1.SpeedY;
  }
  if (event.code === 'ArrowUp') {
    Racket2.SpeedY = -5;
    Racket2.PosY += Racket2.SpeedY;
  }
  if (event.code === 'ArrowDown') {
    Racket2.SpeedY = 5;
    Racket2.PosY += Racket2.SpeedY;
  } else {
    Racket1.SpeedY = 0;
    Racket2.SpeedY = 0;
  }
  checkPosition(Racket1);
  checkPosition(Racket2);
  RequestAnimationFrame(moveRacket);
}

function getSpeed(event, racket) {
  if (event.code === 'ShiftLeft' || event.code === 'ArrowUp') {
    racket.SpeedY = -5;
  }
  if (event.code === 'ControlLeft' || event.code === 'ArrowDown') {
    racket.SpeedY = 5;
  } else {
    racket.SpeedY = 0;
  }
  return racket.SpeedY;
}

function checkPosition(racket) {
  // сместилась ли ракетка выше потолка?
  if (racket.PosY < 0) {
    racket.PosY = 0;
  }
  // сместилась ли ракетка ниже пола?
  if (racket.PosY + racket.Height > AreaH.Height) {
    racket.PosY = AreaH.Height - racket.Height;
  }
  // сместилась ли ракетка выше потолка?
  if (racket.PosY < 0) {
    racket.PosY = 0;
  }
  // сместилась ли ракетка ниже пола?
  if (racket.PosY + racket.Height > AreaH.Height) {
    racket.PosY = AreaH.Height - racket.Height;
  }
  racket.Update();
}

function moveUp(racket) {
  var racket = document.getElementById('racket');
  racket.PosY -= racket.SpeedY;
  racket.style.top = racket.PosY + "px";
}
function moveDown(racket) {
  var racket = document.getElementById('racket');
  racket.PosY += racket.SpeedY;
  racket.style.top = racket.PosY + "px";
}
function stopRacket(racket) {
  racket.SpeedY = 0;
  racket.Update();
}

//фиксация мяча у стены
//счет
//выигрыш

//UI
