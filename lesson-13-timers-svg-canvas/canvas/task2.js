'use strict';

const baseRadius = 300; //радиус циферблата
const numbersBaseRadius = baseRadius / 2.5; //радиус оси цифр циферблата
const circleRadius = 30; // радиус кружков с цифрами
const dotSize = 14; //размер точки в центре часов
const wrapper = document.getElementById('wrapper');

wrapper.appendChild(createWatch());
setInterval(tickTimer, 1000);

// UI

function createWatch() {
  let base = document.createElement('div');
  base.id = 'base';
  base.style.width = baseRadius + 'px';
  base.style.height = baseRadius + 'px';
  base.appendChild(createClockFace());
  base.appendChild(createDigitalWatch());
  base.appendChild(createArrow('hours', 6));
  base.appendChild(createArrow('minutes', 4));
  base.appendChild(createArrow('seconds', 2));
  base.appendChild(createDecorativeDot(dotSize));
  return base;
}

function createClockFace() {
  let clockFace = document.createDocumentFragment();
  for (let number = 1; number <= 12; number++) {
    let angle = number * 30 / 180 * Math.PI;
    let x = ((baseRadius - circleRadius) / 2) + Math.round(Math.sin(angle) * numbersBaseRadius);
    let y = ((baseRadius - circleRadius) / 2) - Math.round(Math.cos(angle) * numbersBaseRadius);
    clockFace.appendChild(createHourCircle(x, y, number));
  }
  return clockFace;
}

function createHourCircle(circleX, circleY, number) {
  let circle = document.createElement('div');
  circle.className = "number";
  circle.style.top = circleY + 'px';
  circle.style.left = circleX + 'px';
  circle.appendChild(document.createTextNode(number));
  return circle;
}

function createDigitalWatch() {
  let textClock = document.createElement('div');
  textClock.className = 'textclock';
  textClock.style.top = baseRadius / 2 + baseRadius / 10 + 'px';
  textClock.style.left = baseRadius / 2 - 50 + 'px';
  ['hourstext', 'minutestext', 'secondstext'].map(watchDigits => {
    let digits = document.createElement('span');
    digits.className = watchDigits;
    textClock.appendChild(digits);
  });
  return textClock;
}

function createArrow(arrowType, arrowWidth) {
  let arrow = document.createElement('div');
  arrow.className = arrowType + ' arrow';
  arrow.style.top = baseRadius / 2 - (arrowWidth / 2) + 'px';
  arrow.style.left = baseRadius / 2 + 'px';
  arrow.style.transformOrigin = `0% ${arrowWidth / 2}px`;
  return arrow;
}

function createDecorativeDot(size) {
  let dot = document.createElement('div');
  dot.className = 'dot';
  dot.style.width = size + 'px';
  dot.style.height = size + 'px';
  dot.style.top = baseRadius / 2 - size / 2 + 'px';
  dot.style.left = baseRadius / 2 - size / 2 + 'px';
  return dot;
}

// Logic

function tickTimer() {
  let now = new Date();
  let thisSecond = now.getSeconds();
  let thisMinute = now.getMinutes();
  let thisHour = now.getHours();
  updateWatch(thisHour, thisMinute, thisSecond);
  updateDigitalWatch(thisHour, thisMinute, thisSecond);
}

function updateWatch(hour, minute, second) {
  let thisSecondRotate = (second / 60) * 360 - 90;
  let thisMinuteRotate = (minute) / 60 * 360 - 90;
  let thisHourRotate = (hour + minute / 60) / 12 * 360 - 90;
  rotateHandle('seconds', thisSecondRotate);
  rotateHandle('minutes', thisMinuteRotate);
  rotateHandle('hours', thisHourRotate);
}

function rotateHandle(handle, degree) {
  let arrow = document.querySelector(`.${handle}`);
  arrow.style.transform = `rotate(${degree}deg)`;
}

function updateDigitalWatch(hour, minute, second) {
  let digitalWatchSeconds = document.querySelector('.secondstext');
  let digitalWatchMinutes = document.querySelector('.minutestext');
  let digitalWatchHours = document.querySelector('.hourstext');
  digitalWatchSeconds.textContent = addZeroToNumber(second);
  digitalWatchMinutes.textContent = addZeroToNumber(minute);
  digitalWatchHours.textContent = addZeroToNumber(hour);
}

function addZeroToNumber(currentTime) {
  return (`${currentTime}`.length < 2) ? (`0${currentTime}`) : currentTime;
}


