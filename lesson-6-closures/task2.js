'use strict';

function interviewQuestion(profession) {
  return function(name) {
    if (profession === 'designer') {
      console.log(name + ' can you please explain what UX design is?');
    }
    if (profession === 'teacher') {
      console.log('What subject do you teach ' + name + '?');
    }
    if (profession === 'other') {
      console.log('Hello ' + name + ', what do you do?');
    }
  }
}

interviewQuestion('teacher')('John');
