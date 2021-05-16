'use strict';

function createDesk(width, height) {
  var desk = '';
  for (var i = 0; i < width; i++) {
    var substr = '';
    var br = '\n';
    for (var j = 0; j < height; j++) {
      if ((i + j) % 2 === 0) {
        substr += '#';
      } else {
        substr += ' ';
      }
    }
    substr += br;
    desk += substr;
  }
  return desk;
}

console.log( createDesk(8, 8) );



// Начальный вариант
var desk = '';
for (var i = 0; i < 8; i++) {
  var substr = '';
  var br = '\n';

  for (var j = 0; j < 8; j++) {
    if ((i + j) % 2 === 0) {
      substr += '#';
    } else {
      substr += ' ';
    }
  }
  substr += br;
  desk += substr;
}

console.log(desk);
