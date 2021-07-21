'use strict';
const AjaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";

let articles = [
  {title: 'Aprilia', id: 'aprilia'},
  {title: 'Beta', id: 'beta'},
  {title: 'BMW', id: 'bmw'},
  {title: 'Ducati', id: 'ducati'},
  {title: 'Gasgas', id: 'gasgas'},
  {title: 'Harley-Davidson', id: 'harley'},
  {title: 'Honda', id: 'honda'},
  {title: 'Husqvarna', id: 'husqvarna'},
  {title: 'Kawasaki', id: 'kawasaki'},
  {title: 'KTM', id: 'ktm'},
  {title: 'Suzuki', id: 'suzuki'},
  {title: 'Triumph', id: 'triumph'},
  {title: 'Yamaha', id: 'yamaha'},
];

let hash = {};



update();
function update() {
  $.ajax({
    url: AjaxHandlerScript,
    type: 'POST',
    datatype: 'json',
    data: {
      f: 'READ',
      n: 'OSTROUH_ARTICLES'},
      cache: false,
      success: motoListReady,
      error: errorHandler
    })
  };

function motoListReady(data) {
  console.log(data);
  let motoArray = JSON.parse(data.result);
  let optionsString = "";
  for (let i = 0; i < motoArray.length; i++) {
    let motoH = motoArray[i];
    optionsString += "\n<a href=#item id="+ motoH.id +">" + motoH.title + "</a>";
  }
  document.getElementById('moto_list').innerHTML = optionsString;
  console.log("Сформированы строки:", optionsString);
};

function readReady(data) {
  if (data) {
    // hash = JSON.parse(data.result);
    console.log('data.result', data.result);
    console.log(data);
  // } else {
  //   initStorage();
  }
};

// function lockStorage() {
//   $.ajax({
//     url: AjaxHandlerScript,
//     type: 'POST',
//     datatype: 'json',
//     data: {
//       f: 'LOCKGET',
//       n: 'OSTROUH_ARTICLES',
//       p: UpdatePassword},
//       cache: false,
//       success: updateStorage,
//       error: errorHandler
//     })
//   };

//   function updateStorage() {
//     $.ajax({
//       url: AjaxHandlerScript,
//       type: 'POST',
//       datatype: 'json',
//       data: {
//         f: 'UPDATE',
//         n: 'OSTROUH_ARTICLES',
//         p: UpdatePassword,
//         v: JSON.stringify(articles)},
//       cache: false,
//       success: dataLoaded,
//       error: errorHandler
//     })
//   };

  // function dataLoaded(data) {
  //   console.log("Данные загружены:" + data.result);
  // }

  function errorHandler(jqXHR, StatusStr, ErrorStr) {
    alert(StatusStr + ' ' + ErrorStr);
  };

// initStorage();
// function initStorage() {
//   $.ajax({
//     url: AjaxHandlerScript,
//     type: 'POST',
//     datatype: 'json',
//     data: {
//       f: 'INSERT',
//       n: 'OSTROUH_ARTICLES',
//       v: JSON.stringify(articles)},
//     cache: false,
//     success: dataLoaded,
//     error: errorHandler
//   })
// };
