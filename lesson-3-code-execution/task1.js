'use strict';

var tasksCompleted = {
  'Anna': 29,
  'Serg': 35,
  'Elena': 1,
  'Anton': 99
  };

  function bestWorker(obj) {
    var tasksArray = Object.entries(obj);
    var bestNumber = 0;
    var bestName = '';

    for(var [key, value] of tasksArray) {
      if(value > bestNumber) {
        bestNumber = value;
        bestName = key;
      }
    }
    return bestName;
  }

  console.log( bestWorker(tasksCompleted) );
