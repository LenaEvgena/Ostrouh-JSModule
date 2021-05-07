'use strict';

function startCalc() {
  var arr = [];

  while (true) {
    var num = prompt('Введите числовое значение');
    if (num === null || num === '' || isNaN(num)) {
      break;
    }
    arr.push(parseFloat(num));
  }

  var sum = 0;
  for (var num of arr) {
    sum += num;
  }
  alert(sum);

  // console.log(sum);
  // console.log(arr);
}

startCalc();



