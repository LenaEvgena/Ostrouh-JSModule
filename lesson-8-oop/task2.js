'use strict';

function isPal(string) {
  var clearString = string.toLowerCase().split('');
  for (var i = 0; i < clearString.length; i++) {
    if (clearString[i] === ' ') {
      clearString.splice(i, 1);
    }
  }

  clearString = clearString.join('');
  var newString = clearString.split('').reverse().join('');

  return clearString === newString ? true : false;
}

console.log( isPal('Anna') ); // true
console.log( isPal('А роза упала на лапу Азора') ); //true
console.log( isPal('Вася') ); //false
console.log( isPal('12321') ); //true
console.log( isPal('123212') ); //false
