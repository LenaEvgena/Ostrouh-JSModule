'use strict';

var deg = 6;
var hourA = document.getElementById('hr');
var minA = document.getElementById('mn');
var secA = document.getElementById('sc');
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


