'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.height = 600;
const baseRadius = canvas.width / 2; //радиус canvas
ctx.translate(baseRadius, baseRadius); // делаем центр часов в самом центре canvas
const bigRadius = baseRadius * 0.95; // радиус циферблата
const smallRadius = baseRadius * 0.75; // радиус расположения цифр
const numCircleRadius = baseRadius * 0.11; //радиус кружков с цифрами
const dotSize = baseRadius * 0.04; //размер точки в центре часов
const font = bigRadius * 0.1 + "px Roboto";//размер шрифта
const digClockWidth = baseRadius / 1.5; // ширина табло
const digClockHeight = baseRadius / 6; // высота табло

setInterval(createWatch, 0);

// UI

function createWatch() {
  drawClockFace();
  createDigitalWatch();
  updateTime();
  createDecorativeDot(dotSize);
}

function drawClockFace() { //окружность с кружками цифр
  //arc(x,y, r, a1,a2, d)
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, bigRadius, 0, 2 * Math.PI);
  ctx.fillStyle = '#f1d7c7';
  ctx.strokeStyle = '#F1CDB3';
  ctx.lineWidth = 10;
  ctx.fill();
  ctx.stroke();

  for (let number = 1; number <= 12; number++) {
      let angle = number / 12 * Math.PI * 2;
      let x = ((bigRadius - smallRadius) / 2 - dotSize * 2.5) + Math.round(Math.sin(angle) * smallRadius);
      let y = ((bigRadius - smallRadius) / 2 - dotSize * 2.5) - Math.round(Math.cos(angle) * smallRadius);
      drawHourCircle(x, y);
      drawNumbers(number, x, y);
  }
  ctx.restore();
}

function drawHourCircle(x, y) { //кружки цифр
  ctx.save();
  ctx.fillStyle = '#F1CDB3';
  ctx.beginPath();
  ctx.arc(x, y, numCircleRadius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
}

function drawNumbers(number, x, y) { //цифры
  ctx.save();
  ctx.font = font;
  ctx.fillStyle = 'black';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(number, x, y);
  ctx.restore();
}

function createArrow(ang, arrowWidth, arrowLength) {
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = arrowWidth;
  ctx.lineCap = 'round';
  ctx.moveTo(0, 0);
  ctx.rotate(ang); //повернулись
  ctx.lineTo(0, -arrowLength); //отрисовали
  ctx.stroke(); //зарисовали
  ctx.rotate(-ang); // в исходное
  ctx.restore();
}

function createDecorativeDot(size) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, size, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
}

function createDigitalWatch() { //цифровые часы
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = 'lightgrey';
  ctx.rect(-digClockWidth / 2, digClockHeight, digClockWidth, digClockHeight);
  ctx.fill();
  ctx.restore();
  createDigits();
}

function createDigits() { //цифры
  ctx.save();
  ctx.font = font;
  ctx.fillStyle = 'black';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(updateDigitalWatch(), 0, digClockHeight * 1.5);
  ctx.restore();
}

// Logic

function updateTime() {
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  //hours
  let thisHourRotate = (hour * Math.PI / 6 ) + (minute * Math.PI / (6 * 60));
  createArrow(thisHourRotate, bigRadius * 0.045, bigRadius * 0.5);
  //minutes
  let thisMinuteRotate = (minute * Math.PI / 30);
  createArrow(thisMinuteRotate, bigRadius * 0.035, bigRadius * 0.75);
  //seconds
  let thisSecondRotate = second * Math.PI / 30;
  createArrow(thisSecondRotate, bigRadius * 0.01, bigRadius * 0.85);
}

function updateDigitalWatch() {
  let now = new Date();
  let time = now.toLocaleTimeString();
  return time;
}
