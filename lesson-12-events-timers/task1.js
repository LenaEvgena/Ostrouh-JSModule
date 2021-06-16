'use strict';

(function() {

  var doc = document;
  var body = doc.body;
  var div = doc.createElement('div');
  div.className = 'wrapper';
  body.appendChild(div);

  function createDivElem(elem, className, parentClassName) {
    var elem = doc.createElement('div');
    elem.className = className;
    (doc.querySelector(parentClassName)).appendChild(elem);
    return elem;
  }

  createDivElem('clock', 'clock', '.wrapper');
  createDivElem('arrows', 'arrows', '.clock');
  createDivElem('hour', 'hour', '.arrows');
  createDivElem('min', 'min', '.arrows');
  createDivElem('sec', 'sec', '.arrows');

  createDivElem('digitalClock', 'digitalClock', '.clock');
  createDivElem('time', 'time', '.digitalClock');
  createDivElem('punto', 'punto', '.clock');

  createDivElem('digits', 'digits', '.clock');
  for (var i = 1; i <= 12; i++) {
    createDivElem('digit', 'digit', '.digits');
  }

  var deg = 6;
  var hourA = doc.querySelector('.hour');
  var minA = doc.querySelector('.min');
  var secA = doc.querySelector('.sec');
  var time = doc.querySelector('.time');
  var bigRadius = 237;
  var smallRadius = 35;

  setInterval(function() {
    var day = new Date();
    var seconds = day.getSeconds() * deg;
    var minutes = day.getMinutes() * deg;
    var hours = (day.getHours() + (1 / 60) * day.getMinutes()) * 30;

    hourA.style.transform = 'rotate(' + hours + 'deg)';
    hourA.style.transformOrigin = 'left center';
    minA.style.transform = 'rotate(' + minutes + 'deg)';
    minA.style.transformOrigin = 'left center';
    secA.style.transform = 'rotate(' + seconds + 'deg)';
    secA.style.transformOrigin = 'left center';

    time.innerHTML = day.toLocaleTimeString();
  });


  function PosDigits() {
    var clockCenter = doc.querySelector('.digits');
    var digits = doc.querySelectorAll('.digit');

    var clockCenterX = clockCenter.offsetLeft + clockCenter.offsetWidth / 2;
    var clockCenterY = clockCenter.offsetTop + clockCenter.offsetHeight / 2;

    for (var h = 0; h < digits.length; h++) {
      var digit = digits[h];
      var angle = (h + 1) / 12 * Math.PI * 2;
      var digitCenterX = clockCenterX + bigRadius * Math.sin(angle);
      var digitCenterY = clockCenterY - bigRadius * Math.cos(angle);

      digit.style.left = Math.round(digitCenterX - digit.offsetWidth / 2) + 'px';
      digit.style.top = Math.round(digitCenterY - digit.offsetHeight / 2) + 'px';
      digit.innerHTML = h + 1;
    }
  }
  PosDigits();
})();



// (function () {
//   function generateForm(parent, origForm, formFields) {
//     var cloneForm = origForm.cloneNode(true);
//     formFields.forEach(buildFormElement);

//     function buildFormElement(obj) {
//       switch (obj.type) {
//         case 'text':
//           cloneForm.appendChild(createText(obj));
//           break;
//         case 'select':
//           cloneForm.appendChild(createSelect(obj));
//           break;
//         case 'radio':
//           cloneForm.appendChild(createRadio(obj));
//           break;
//         case 'checkbox':
//           cloneForm.appendChild(createCheckbox(obj));
//           break;
//         case 'textarea':
//           cloneForm.appendChild(createTextarea(obj));
//           break;
//         case 'submit':
//           cloneForm.appendChild(createSubmit(obj));
//           break;
//         default:
//           console.error('Invalid form element. Break form creation');
//           break;
//       }
//     }

//     parent.replaceChild(cloneForm, origForm);
//   }

//   function createInput(type, name) {
//     var input = doc.createElement('input');
//     input.name = name;
//     input.type = type;
//     return input;
//   }

//   function createLabel(name, inner) {
//     var label = doc.createElement('label');
//     label.for = name;
//     label.innerHTML = inner;
//     return label;
//   }

//   function createText(obj) {
//     var inner = obj.label;
//     var type = obj.type;
//     var name = obj.name;

//     var div = doc.createElement('div');
//     div.appendChild(createLabel(name, inner));
//     div.appendChild(createInput(type, name));
//     return div;
//   }

//   function createSelect(obj) {
//     var inner = obj.label;
//     var name = obj.name;
//     var options = obj.options;

//     var div = doc.createElement('div');
//     var label = createLabel(name, inner);
//     var select = doc.createElement('select');
//     select.name = name;

//     function option(optIn) {
//       var option = doc.createElement('option');
//       option.innerHTML = optIn;
//       return option;
//     }

//     div.appendChild(label);
//     div.appendChild(select);
//     for (var i = 0; i < options.length; i++) {
//       select.appendChild(option(options[i]));
//     }
//     return div;
//   }

//   function createRadio(obj) {
//     var inner = obj.label;
//     var type = obj.type;
//     var name = obj.name;
//     var options = obj.options;

//     var div = doc.createElement('div');
//     div.appendChild(createLabel(name, inner));
//     for (var i = 0; i < options.length; i++) {
//       div.appendChild(createInput(type, name));
//       div.appendChild(doc.createTextNode(options[i]));
//     }
//     return div;
//   }

//   function createCheckbox(obj) {
//     var inner = obj.label;
//     var type = obj.type;
//     var name = obj.name;

//     var div = doc.createElement('div');
//     var label = createLabel(name, inner);
//     div.appendChild(label);
//     div.appendChild(createInput(type, name));
//     return div;
//   }

//   function createTextarea(obj) {
//     var inner = obj.label;
//     var cols = obj.cols;
//     var rows = obj.rows;
//     var name = obj.name;

//     var div = doc.createElement('div');
//     var label = createLabel(name, inner);
//     var websiteDescription = doc.createElement('textarea');
//     websiteDescription.cols = cols;
//     websiteDescription.rows = rows;
//     div.appendChild(label);
//     div.appendChild(websiteDescription);
//     return div;
//   }

//   function createSubmit(obj) {
//     var inner = obj.label;
//     var type = obj.type;
//     var name = obj.name;

//     var sbmt = createInput(type, name);
//     sbmt.value = inner;
//     return sbmt;
//   }

//   //Generate Form
//   var doc = document;
//   var container = doc.body;
//   var origForm = doc.forms['profileForm'];
//   var formFields = [
//     {label: 'Название сайта *: ', type: 'text', name: 'websiteName'},
//     {label: 'Разработчики: ', type: 'text', name: 'devName'},
//     {label: 'URL сайта *: ', type: 'text', name: 'URL'},
//     {label: 'Дата запуска сайта: ', type: 'text', name: 'publishDate'},
//     {label: 'Посетителей в сутки: ', type: 'text', name: 'visitorsPerDay'},
//     {label: 'E-mail для связи *: ', type: 'text', name: 'email'},
//     {label: 'Рубрика: ', type: 'select', name: 'catSection', options: ['бытовая техника', 'здоровье', 'домашний уют']},
//     {label: 'Размещение: ', type: 'radio', name: 'tariff', options: [' бесплатное ', ' платное ', ' VIP ']},
//     {label: 'Разрешить отзывы: ', type: 'checkbox', name: 'allowComments'},
//     {label: 'Описание сайта: ', type: 'textarea', name: 'description', rows: 6, cols: 25},
//     {label: 'Опубликовать', type: 'submit', name: 'publishBtn'}
//   ];

//   generateForm(container, origForm, formFields);
// })();
