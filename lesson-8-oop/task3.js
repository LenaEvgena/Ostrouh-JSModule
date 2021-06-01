'use strict';

function anClean(arr) {
  var hash = {};
  for (var i = 0; i < arr.length; i++) {
    var keyWord = arr[i].toLowerCase().split('').sort().join('');
    if (keyWord in hash) {
      continue;
    }
    hash[keyWord] = arr[i];
  }
  return Object.values(hash);
}

var arr = ['воз', 'киборг', 'корсет', 'ЗОВ', 'гробик', 'костер', 'сектор'];
console.log( anClean(arr) );
