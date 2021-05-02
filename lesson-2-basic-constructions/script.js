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





//Задание 2
var userSurname = prompt('Ваша фамилия');
while (userSurname == '' || userSurname == null) {
  userSurname = prompt('Информация не введена! \nВаша фамилия');
}

var userName = prompt('Ваше имя');
while (userName == '' || userName == null) {
  userName = prompt('Информация не введена! \nВаше имя');
}

var userSecondName = prompt('Ваше отчество');
while (userSecondName == '' || userSecondName == null) {
  userSecondName = prompt('Информация не введена! \nВаше отчество');
}

var userAge = parseInt(prompt('Ваш возраст, лет'));
while (userAge == '' || userAge == null || isNaN(userAge)) {
  userAge = parseInt(prompt('Информация не введена! \nВаш возраст, лет'));
}
while (userAge < 0 || userAge > 100 || isNaN(userAge)) {
  userAge = parseInt(prompt('Некорректные данные! \nВаш возраст, лет'));
}

var userGender = confirm('Ваш пол мужской?');
function whatGender() {
  if (userGender == true) {
    return 'мужской';
  } else {
    return 'женский';
  }
}

function isRetired() {
  if ((userGender == true && userAge >= 63) || (userGender == false && userAge >= 58)) {
    return 'да';
  } else {
    return 'нет';
  }
}

alert('Ваше ФИО: ' + userSurname + ' ' + userName + ' ' + userSecondName +
'\nВаш возраст в годах: ' + userAge +
'\nВаш возраст в днях: ' + userAge * 365 +
'\nЧерез 5 лет вам будет: ' + (userAge + 5) +
'\nВаш пол: ' + whatGender() +
'\nВы на пенсии: ' + isRetired());
