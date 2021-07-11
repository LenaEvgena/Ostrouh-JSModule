'use strict';

function HashStorage() {
  var self = this;
  var storage = {};// приватное хранилище для значений

  self.addValue = function(key, value) {
    storage[key] = value;
  }

  self.getValue = function(key) {
    return storage[key];
  }

  self.deleteValue = function(key) {
    return delete storage[key];
  }

  self.getKeys = function() {
    return Object.keys(storage);
  }
}

// function THashStorage() {
//   var self = this,
//       pHash = {};

//   self.addValue = function(key, value) {
//     pHash[key] = value;
//   };

//   self.getValue = function(key) {
//     return pHash[key];
//   };

//   self.deleteValue = function(key) {
//     return delete pHash[key];
//   };

//   self.getKeys = function() {
//     return (Object.keys(pHash));
//   };
// }

