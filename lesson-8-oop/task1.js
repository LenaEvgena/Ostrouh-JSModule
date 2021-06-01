'use strict';

(function() {
  function Question(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
  }

  Question.prototype.displayQuestion = function() {
    console.log(this.question);

    for (var i = 0; i < this.answers.length; i++) {
        console.log(i + ': ' + this.answers[i]);
    }
  }

  Question.prototype.checkAnswer = function(ans, fn) {
    var currentScore;
    if (ans === this.correct) {
      console.log('Correct answer!');
      console.log('You\'ve got 1 point for the answer!');
      currentScore = fn(true);
    } else {
      console.log('Wrong answer. Try again :)');
      console.log('You\'ve got 0 point for the answer!');
      currentScore = fn(false);
    }
    this.logScore();
  }

  Question.prototype.logScore = function() {
    console.log('Your current score is: ' + curScore());
    console.log('*****NEXT*****');
  }

  function getCurrentScore() {
    var currentScore = 0;
    return function(isTrue) {
      if (isTrue) {
      currentScore += 1;
    }
      return currentScore;
    }
  }

  var curScore = getCurrentScore();

  var q1 = new Question('Is JavaScript the coolest programming language in the world?',
    ['Yes', 'No'],
    0);

  var q2 = new Question('What is the name of this course\'s teacher?',
    ['John', 'Michael', 'Jonas'],
    2);

  var q3 = new Question('What does best describe coding?',
    ['Boring', 'Hard', 'Fun', 'Tediuos'],
    2);

  var questions = [q1, q2, q3];

  function showNextQuestion() {
    var n = Math.floor(Math.random() * questions.length);
    questions[n].displayQuestion();
    var answer = prompt('Please select the correct answer.');

    if (answer !== 'exit' && answer !== null) {
      questions[n].checkAnswer( parseInt(answer), curScore );
      showNextQuestion();
    } else {
      console.log('Your final score is: ' + curScore());
      console.log('*****THE*END*****');
    }
  }

  showNextQuestion();
})();
