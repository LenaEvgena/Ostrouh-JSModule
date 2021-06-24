'use strict';
// const baseRadius = 500; //радиус циферблата
// const numbersBaseRadius = baseRadius / 2.5; //радиус оси цифр циферблата
// const circleRadius = baseRadius / 17; // радиус кружков с цифрами
// const digClockWidth = baseRadius / 3; // ширина табло
// const digClockHeight = baseRadius / 10.5; // высота табло
// const wrapper = document.getElementById('wrapper');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.height = 600;
const baseRadius = canvas.width / 2; //радиус canvas
ctx.translate(baseRadius, baseRadius); // делаем центр часов в самом центре canvas
const bigRadius = baseRadius * 0.95; // радиус циферблата
const smallRadius = baseRadius * 0.75; // радиус расположения цифр
const numCircleRadius = baseRadius * 0.11; //радиус кружков с цифрами
const dotSize = baseRadius * 0.05; //размер точки в центре часов
const font = bigRadius * 0.1 + "px Roboto";//размер шрифта

createWatch();
// setInterval(tickTimer, 0);

// UI

function createWatch() {
  drawClockFace();
  createDecorativeDot(dotSize);

}

function drawClockFace() { //окружность с кружками цифр
  //arc(x,y, r, a1,a2, d)
  ctx.arc(0, 0, bigRadius, 0, 2 * Math.PI);
  ctx.fillStyle = '#ebd8cb';
  ctx.fill();
  ctx.strokeStyle = '#F1CDB3';
  ctx.lineWidth = 10;
  ctx.stroke();

  for (let number = 1; number <= 12; number++) {
      let angle = number / 12 * Math.PI * 2;
      let x = ((bigRadius - smallRadius) / 2 - dotSize * 2) + Math.round(Math.sin(angle) * smallRadius);
      let y = ((bigRadius - smallRadius) / 2 - dotSize * 2) - Math.round(Math.cos(angle) * smallRadius);
      drawHourCircle(x, y);
      drawNumbers(number, x, y);
  }
}

function drawHourCircle(x, y) { //кружки цифр
  ctx.fillStyle = '#F1CDB3';
  ctx.beginPath();
  ctx.arc(x, y, numCircleRadius, 0, 2 * Math.PI); ////////////////
  ctx.fill();
}


function drawNumbers(number, x, y) { //цифры
  ctx.font = font;
  ctx.fillStyle = 'black';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(number, x, y);
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
  ctx.beginPath();
  ctx.arc(0, 0, size, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
}

function createDigitalWatch() { //цифровые часы
  // let textClock = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
  // textClock.setAttribute('x', baseRadius / 2 - digClockWidth / 2);
  // textClock.setAttribute('y',  baseRadius / 2 + digClockHeight);
  // textClock.setAttribute('rx', '5');
  // textClock.setAttribute('ry', '5');
  // textClock.setAttribute('width',  digClockWidth);
  // textClock.setAttribute('height',  digClockHeight);
  // textClock.setAttribute('fill',  'lightgrey');
  // return textClock;
}

function createDigits() { //цифры
  // let digits = document.createElementNS("http://www.w3.org/2000/svg", 'text');
  // digits.id = 'digitWatch';
  // digits.setAttribute('x', baseRadius / 2);
  // digits.setAttribute('y', baseRadius / 2 + digClockHeight * 1.5);
  // digits.setAttribute('text-anchor', 'middle');
  // digits.setAttribute('stroke', 'black');
  // digits.setAttribute('opacity', '0.6');
  // digits.setAttribute('stroke-width', '1');
  // digits.setAttribute('alignment-baseline', 'middle');
  // digits.setAttribute('font-size', '23');
  // digits.setAttribute('textLength', '130');
  // return digits;
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
