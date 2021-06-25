'use strict';
var RequestAnimationFrame =
      // находим, какой метод доступен
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };

var BallH =
  {
    PosX: 300,
    PosY: 200,
    SpeedX: 4,
    SpeedY: 2,
    Width: 50,
    Height: 50,

    Update: function () {
      var BallObj = document.getElementById('IBall');
      BallObj.style.left = this.PosX + "px";
      BallObj.style.top = this.PosY + "px";
    }
  };

var AreaH =
  {
    Width: 600,
    Height: 400
  }

function Start() {
  RequestAnimationFrame(Tick);
}

function Tick() {
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
  RequestAnimationFrame(Tick);
}
BallH.Update();


