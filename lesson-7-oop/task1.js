'use strict';

(function () {
  function Question(question, answer1, answer2, answer3, numOfCorrectAnswer) {
  this.question = question;
  this.answers = [answer1, answer2, answer3];
  this.numOfCorrectAnswer = numOfCorrectAnswer;
  }

  Question.prototype.showQuestion = function () {
    console.log(this.question);
    for (var i = 0; i < this.answers.length; i++) {
      console.log((i + 1) + '. ' + this.answers[i]);
    }
  }

  Question.prototype.isCorrectAnswer = function(num) {
    if (num === this.numOfCorrectAnswer) {
      console.log('It\'s a correct answer!');
    } else {
      console.log('Your answer is wrong!');
    }
  }

  Object.prototype.chooseRandomQuestion = function() {
    this[index].showQuestion();
    return this[index];
  }

  var quest1 = new Question('What is Expression in programming?', 'It is a unit of code that results in a value', 'It is emotion',
    'I don\'t know', 1);
  var quest2 = new Question('What is Coersion in programming?', 'I don\'t know', 'It is a process of converting a value from one type to another',
    'Some default value', 2);
  var quest3 = new Question('Execution context is...', 'a program that reads your code', 'a wrapper to help manage the code that is running',
    'I don\'t know', 2);

  var questionsArray = new Array(quest1, quest2, quest3);
  var index = Math.floor(Math.random() * 3);
  var userAnswer = '';

  function getUserAnswer() {
    while (userAnswer == '' || userAnswer == null || isNaN(userAnswer)) {
      userAnswer = +prompt('Choose the right answer!');
    }
    return userAnswer;
  }

  questionsArray.chooseRandomQuestion().isCorrectAnswer( getUserAnswer() );
})();
