'use strict';

var AjaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";

function AJAXStorage() {
  var UpdatePassword = Math.random();

  var self = this;
  self.hash = {};

  self.addValue = function(key, value) {
    self.hash[key] = value;
    lockStorage();
  };

  self.deleteValue = function(key) {
    delete self.hash[key];
    lockStorage();
  };

  self.getValue = function(key) {
    return self.hash[key];
  };

  self.getKeys = function() {
    return Object.keys(self.hash);
  };

  update();

  function update() {
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      datatype: 'json',
      data: {
        f: 'READ',
        n: 'OSTROUH_STORAGE'},
      cache: false,
      success: readReady,
      error: errorHandler
    })
  };

  function readReady(data) {
    if (data) {
      self.hash = JSON.parse(data.result);
      console.log(data.result);
    } else {
      initStorage();
    }
  };

  function initStorage() {
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      datatype: 'json',
      data: {
        f: 'INSERT',
        n: 'OSTROUH_STORAGE',
        v: JSON.stringify(self.hash)},
      cache: false,
      success: dataLoaded,
      error: errorHandler
    })
  };

  function lockStorage() {
    $.ajax({
      url: AjaxHandlerScript,
      type: 'POST',
      datatype: 'json',
      data: {
        f: 'LOCKGET',
        n: 'OSTROUH_STORAGE',
        p: UpdatePassword},
        cache: false,
        success: updateStorage,
        error: errorHandler
      })
    };

    function updateStorage() {
      $.ajax({
        url: AjaxHandlerScript,
        type: 'POST',
        datatype: 'json',
        data: {
          f: 'UPDATE',
          n: 'OSTROUH_STORAGE',
          p: UpdatePassword,
          v: JSON.stringify(self.hash)},
        cache: false,
        success: dataLoaded,
        error: errorHandler
      })
    };

    function dataLoaded(data) {
      console.log("Данные загружены:" + data.result);
    }

    function errorHandler(jqXHR, StatusStr, ErrorStr) {
      alert(StatusStr + ' ' + ErrorStr);
    };
}
