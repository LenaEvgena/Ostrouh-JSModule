'use strict';

var AreaH =
  {
    Width: 600,
    Height: 400
  }

var BallH =
  {
    PosX: AreaH.Width / 2 - 25,
    PosY: AreaH.Height / 2 - 25,
    SpeedX: 4,
    SpeedY: 3,
    Width: 50,
    Height: 50,
    Update: function () {
      var Ball = document.getElementById('IBall');
      Ball.style.left = this.PosX + "px";
      Ball.style.top = this.PosY + "px";
    },
  };

var Racket1 =
  {
    PosX: 0,
    PosY: AreaH.Height / 2 - 70,
    SpeedY: 0,
    Width: 16,
    Height: 140,
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
    PosX: AreaH.Width - 16,
    PosY: AreaH.Height / 2 - 70,
    SpeedY: 0,
    Width: 16,
    Height: 140,
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

//движение мяча
//отталкивание от стены
//отталктвание от ракеток
//фиксация мяча у стены
function throwBall() {
  BallH.PosX += BallH.SpeedX;
  // слева
  if (BallH.PosX < 0 + Racket1.Width) {
    if (BallH.PosY + BallH.Height > Racket1.PosY && BallH.PosY < Racket1.PosY + Racket1.Height) {//мяч напротив ракетки
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
  //справа
  if (BallH.PosX + BallH.Width > AreaH.Width - Racket2.Width) {
    if (BallH.PosY + BallH.Height > Racket2.PosY && BallH.PosY < Racket2.PosY + Racket2.Height) {//мяч напротив ракетки
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
}
BallH.Update();
Racket1.Update();
Racket2.Update();

// function ifItsGoal(racket) {
//   // вылетел ли мяч левее стены
//   if (racket === 'Racket1') {
//     BallH.SpeedX = 0;
//     BallH.SpeedY = 0;
//     BallH.PosX = 0;
//     BallH.PosY = BallH.PosY;
//   }
//   // вылетел ли мяч правее стены
//   if (racket === 'Racket2') {
//     BallH.SpeedX = 0;
//     BallH.SpeedY = 0;
//     BallH.PosX = AreaH.Width - BallH.Width + 5;
//     BallH.PosY = BallH.PosY;
//   }
//   BallH.Update();
// }

//рандомный вылет


//движение ракеток
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
//выигрыш


//старт
var animatedRackets = setInterval(function fn() {
  moveRackets(Racket1);
  moveRackets(Racket2);
}, 1000/60);

function Start() {
  clearInterval(animatedRackets);
  throwBall();
  moveRackets(Racket1);
  moveRackets(Racket2);
  requestAnimationFrame(Start);
}

function stopRackets() {
  Racket1.Stop();
  Racket2.Stop();
}

function resetPositions() {
  BallH.PosX = AreaH.Width / 2 - BallH.Width / 2;
  BallH.PosY = AreaH.Height / 2 - BallH.Height / 2;
  Racket1.PosX = 0;
  Racket1.PosY = AreaH.Height / 2 - Racket1.Height / 2;
  Racket2.PosX = AreaH.Width - Racket2.Width;
  Racket2.PosY = AreaH.Height / 2 - Racket2.Height / 2;
  //убрать таймер
  cancelAnimationFrame(Start);
  //score обнулить
}

document.addEventListener('keydown', getSpeed);
document.addEventListener('keyup', stopRackets);
document.querySelector('#start').addEventListener('click', Start);
document.querySelector('#reset').addEventListener('click', resetPositions);




//UI
