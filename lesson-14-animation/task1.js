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

var BallH =
  {
    PosX: 275,
    PosY: 175,
    SpeedX: 2,
    SpeedY: 1,
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
  },
  // moveUp: function () {
  //   var Racket1 = document.getElementById('racket1');
  //   Racket1.PosY -= Racket1.SpeedY;
  //   Racket1.style.top = this.PosY + "px";
  // },
  // moveDown: function () {
  //   var Racket1 = document.getElementById('racket1');
  //   Racket1.PosY += Racket1.SpeedY;
  //   Racket1.style.top = this.PosY + "px";
  // }
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
  },
  // moveUp: function () {
  //   var Racket2 = document.getElementById('racket2');
  //   Racket2.PosY -= Racket2.SpeedY;
  //   Racket2.style.top = this.PosY + "px";
  // },
  // moveDown: function () {
  //   var Racket2 = document.getElementById('racket2');
  //   Racket2.PosY += Racket2.SpeedY;
  //   Racket2.style.top = this.PosY + "px";
  // }
}

function Start() {
  RequestAnimationFrame(throwBall);
  RequestAnimationFrame(moveRacket);
}

function throwBall() {
  BallH.PosX += BallH.SpeedX;
  // вылетел ли мяч правее стены
  if (BallH.PosX + BallH.Width > AreaH.Width) {
    BallH.SpeedX = -BallH.SpeedX;
    BallH.PosX = AreaH.Width - BallH.Width;
  }
  // вылетел ли мяч левее стены
  if (BallH.PosX < 0) {
    BallH.SpeedX = -BallH.SpeedX;
    BallH.PosX = 0;
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

document.addEventListener('keydown', moveRacket, false);
// document.addEventListener('keyup', stopRacket, false);

function moveRacket(event) {
  if (event.code === 'ShiftLeft') {
    Racket1.SpeedY = 1;
    Racket1.PosY -= Racket1.SpeedY;
  }
  if (event.code === 'ControlLeft') {
    Racket1.SpeedY = 1;
    Racket1.PosY += Racket1.SpeedY;
  }
  if (event.code === 'ArrowUp') {
    Racket2.SpeedY = 1;
    Racket2.PosY -= Racket2.SpeedY;
  }
  if (event.code === 'ArrowDown') {
    Racket2.SpeedY = 1;
    Racket2.PosY += Racket2.SpeedY;
  }
  checkPosition(Racket1);
  checkPosition(Racket2);
  RequestAnimationFrame(moveRacket);
}

// function stopRacket(whatRacket) {
  //   whatRacket.SpeedY = 0;
  //   whatRacket.Update();
  //   // RequestAnimationFrame(dropBall);
  // }

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

