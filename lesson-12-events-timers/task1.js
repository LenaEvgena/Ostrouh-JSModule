'use strict';
(function() {

  function createClockFace() {
    var div = document.createElement('div');
    div.className = 'wrapper';
    document.body.appendChild(div);
    createDivElem('clock', 'clock', '.wrapper');
    createArrows();
    createDigitalClock();
    createDigits();
  }

  createClockFace();

  function createDivElem(elem, className, parentClassName) {
    var elem = document.createElement('div');
    elem.className = className;
    (document.querySelector(parentClassName)).appendChild(elem);
    return elem;
  }

  function createArrows() {
    createDivElem('arrows', 'arrows', '.clock');
    createDivElem('hour', 'hour', '.arrows');
    createDivElem('min', 'min', '.arrows');
    createDivElem('sec', 'sec', '.arrows');
    createDivElem('punto', 'punto', '.clock');
  }

  function createDigitalClock() {
    createDivElem('digitalClock', 'digitalClock', '.clock');
    createDivElem('time', 'time', '.digitalClock');
  }

  function createDigits() {
    createDivElem('digits', 'digits', '.clock');
    for (var i = 1; i <= 12; i++) {
      createDivElem('digit', 'digit', '.digits');
    }
  }

  var deg = 6;
  var hourA = document.querySelector('.hour');
  var minA = document.querySelector('.min');
  var secA = document.querySelector('.sec');
  var time = document.querySelector('.time');
  var digitPosRadius = 237;

  setInterval(function() {
    var day = new Date();
    var seconds = day.getSeconds() * deg;
    var minutes = day.getMinutes() * deg;
    var hours = (day.getHours() + (1 / 60) * day.getMinutes()) * 30;

    hourA.style.transform = 'rotate(' + hours + 'deg)';
    hourA.style.transformOrigin = 'left center';
    minA.style.transform = 'rotate(' + minutes + 'deg)';
    minA.style.transformOrigin = 'left center';
    secA.style.transform = 'rotate(' + seconds + 'deg)';
    secA.style.transformOrigin = 'left center';

    time.innerHTML = day.toLocaleTimeString();
  });

  function PosDigits() {
    var clockCenter = document.querySelector('.digits');
    var digits = document.querySelectorAll('.digit');

    var clockCenterX = clockCenter.offsetLeft + clockCenter.offsetWidth / 2;
    var clockCenterY = clockCenter.offsetTop + clockCenter.offsetHeight / 2;

    for (var h = 0; h < digits.length; h++) {
      var digit = digits[h];
      var angle = (h + 1) / 12 * Math.PI * 2;
      var digitCenterX = clockCenterX + digitPosRadius * Math.sin(angle);
      var digitCenterY = clockCenterY - digitPosRadius * Math.cos(angle);

      digit.style.left = Math.round(digitCenterX - digit.offsetWidth / 2) + 'px';
      digit.style.top = Math.round(digitCenterY - digit.offsetHeight / 2) + 'px';
      digit.innerHTML = h + 1;
    }
  }
  PosDigits();
})();
