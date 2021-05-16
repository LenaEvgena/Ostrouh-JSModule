'use strict';

var classObj = {
  className: 'menu open open my',
};

function removeExistingClass (obj, cls) {
  var classArray = obj.className.split(' ');
  var result = [];
  for (var i = 0; i < classArray.length; i++) {
    if (classArray[i] === cls) {
      continue;
    } else {
      result.push(classArray[i]);
    }
  }
  return obj.className = result.join(' ').trim();
}

removeExistingClass(classObj, 'open');
console.log(classObj.className);
