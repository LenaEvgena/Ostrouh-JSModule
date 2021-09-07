'use strict';
const baseRadius = 500; //радиус циферблата
const numbersBaseRadius = baseRadius / 2.5; //радиус оси цифр циферблата
const circleRadius = baseRadius / 17; // радиус кружков с цифрами
const dotSize = 15; //размер точки в центре часов
const wrapper = document.getElementById('wrapper');
const digClockWidth = baseRadius / 3; // ширина табло
const digClockHeight = baseRadius / 10.5; // высота табло

wrapper.appendChild(createWatch());
setInterval(tickTimer, 0);

// UI

function createWatch() {
  let base = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  base.id = 'base';
  base.style.width = baseRadius;
  base.style.height = baseRadius;
  base.appendChild(createClockFace());
  base.appendChild(createDigitalWatch());
  base.appendChild(createDigits());
  base.appendChild(createArrow('hours', 150, 9, 'black'));
  base.appendChild(createArrow('minutes', 180, 6, 'black'));
  base.appendChild(createArrow('seconds', 210, 2, 'red'));
  base.appendChild(createDecorativeDot(dotSize));
  return base;
}

function createClockFace() { //окружность с кружками цифр
  let clockFace = document.createDocumentFragment();
  for (let number = 1; number <= 12; number++) {
    let angle = number / 12 * Math.PI * 2;
    let x = ((baseRadius - circleRadius) / 2 + dotSize) + Math.round(Math.sin(angle) * numbersBaseRadius);
    let y = ((baseRadius - circleRadius) / 2 + dotSize) - Math.round(Math.cos(angle) * numbersBaseRadius);
    clockFace.appendChild(createHourCircle(x, y));
    clockFace.appendChild(createNumbers(x, y, number));
  }
  return clockFace;
}

function createHourCircle(circleX, circleY) { //кружки цифр
  let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', circleX);
  circle.setAttribute('cy', circleY);
  circle.setAttribute('r', circleRadius);
  circle.setAttribute('fill', '#F1CDB3');
  circle.setAttribute('stroke', '#F1CDB3');
  return circle;
}

function createNumbers(circleX, circleY, number) { //цифры
  let num = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  num.setAttribute('y', circleY);
  num.setAttribute('x', circleX);
  num.setAttribute('text-anchor', 'middle');
  num.setAttribute('font-size', '20');
  num.setAttribute('alignment-baseline', 'middle');
  num.setAttribute('stroke', 'black');
  num.textContent = number;
  return num;
}

function createArrow(arrowType, arrowWidth, arrowHeight, arrowColor) {
  let arrow = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  arrow.setAttribute('x1', baseRadius / 2);
  arrow.setAttribute('y1', baseRadius / 2);
  arrow.setAttribute('x2', baseRadius / 2 + arrowWidth);
  arrow.setAttribute('y2', baseRadius / 2);
  arrow.setAttribute('stroke-linecap', 'round');
  arrow.setAttribute('stroke', arrowColor);
  arrow.setAttribute('stroke-width', arrowHeight);
  arrow.id = arrowType;
  arrow.setAttribute('transform', `translate(${baseRadius, baseRadius})`);
  arrow.style.transformOrigin = 'center';
  return arrow;
}

function createDecorativeDot(size) {
  let dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  dot.setAttribute('cy', baseRadius / 2);
  dot.setAttribute('cx', baseRadius / 2);
  dot.setAttribute('r', size / 2);
  dot.setAttribute('fill', 'red');
  return dot;
}

function createDigitalWatch() { //цифровые часы
  let textClock = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
  textClock.setAttribute('x', baseRadius / 2 - digClockWidth / 2);
  textClock.setAttribute('y',  baseRadius / 2 + digClockHeight);
  textClock.setAttribute('rx', '5');
  textClock.setAttribute('ry', '5');
  textClock.setAttribute('width',  digClockWidth);
  textClock.setAttribute('height',  digClockHeight);
  textClock.setAttribute('fill',  'lightgrey');
  return textClock;
}

function createDigits() { //цифры
  let digits = document.createElementNS("http://www.w3.org/2000/svg", 'text');
  digits.id = 'digitWatch';
  digits.setAttribute('x', baseRadius / 2);
  digits.setAttribute('y', baseRadius / 2 + digClockHeight * 1.5);
  digits.setAttribute('text-anchor', 'middle');
  digits.setAttribute('stroke', 'black');
  digits.setAttribute('opacity', '0.6');
  digits.setAttribute('stroke-width', '1');
  digits.setAttribute('alignment-baseline', 'middle');
  digits.setAttribute('font-size', '23');
  digits.setAttribute('textLength', '130');
  return digits;
}
// Logic

function tickTimer() {
  let now = new Date();
  let thisSecond = now.getSeconds();
  let thisMinute = now.getMinutes();
  let thisHour = now.getHours();
  updateWatch(thisHour, thisMinute, thisSecond);
  updateDigitalWatch(now);
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
  let arrow = document.getElementById(`${handle}`);
  arrow.style.transform = `rotate(${degree}deg)`;
}

function updateDigitalWatch(day) {
  let time = document.getElementById('digitWatch');
  time.textContent = day.toLocaleTimeString();
}
