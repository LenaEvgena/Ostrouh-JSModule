'use strict';
(function() {

  var container = document.createElement('div');
  var digitPosRadius = 237;
  createClockFace(container);

  var deg = 6;
  var hourA = document.querySelector('.hour');
  var minA = document.querySelector('.min');
  var secA = document.querySelector('.sec');
  var time = document.querySelector('.time');

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

  function createClockFace(container) {
    var clock = document.createElement('div');
    clock.className = 'clock';

    clock.appendChild(createArrows());
    clock.appendChild(createPunto());
    clock.appendChild(createDigitalClock());
    clock.appendChild(createDigits());

    container.className = 'wrapper';
    container.appendChild(clock);
    document.body.appendChild(container);
    posDigits();
  }

  function createArrows() {
    var arrows = document.createElement('div');
    arrows.className = 'arrows';
    var hour = document.createElement('div');
    hour.className = 'hour';
    var min = document.createElement('div');
    min.className = 'min';
    var sec = document.createElement('div');
    sec.className = 'sec';
    arrows.appendChild(hour);
    arrows.appendChild(min);
    arrows.appendChild(sec);
    return arrows;
  }

  function createPunto() {
    var punto = document.createElement('div');
    punto.className = 'punto';
    return punto;
  }

  function createDigitalClock() {
    var digitalClock = document.createElement('div');
    digitalClock.className = 'digitalClock';
    var time = document.createElement('div');
    time.className = 'time';
    digitalClock.appendChild(time);
    return digitalClock;
  }

  function createDigits() {
    var digits = document.createElement('div');
    digits.className = 'digits';
    for (var i = 1; i <= 12; i++) {
      var digit = document.createElement('div');
      digit.className = 'digit';
      digits.appendChild(digit);
    }
    return digits;
  }

  function posDigits() {
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

})();
