'use strict';

//Задание 1
var userString = prompt('Введите строку...');

while (userString == '') {
  userString = prompt('Введите строку еще раз!');
}

var stringArray = userString.toString().split('');

function countLetters(item) {
  return item.replace(/[^аеёиоуыэюя]/gmi,'');
}

var result = stringArray.filter(countLetters).length;

console.log('Русских гласных букв в строке: ' + result);
