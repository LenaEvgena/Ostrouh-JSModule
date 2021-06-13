'use strict';

function HashStorage() {
  this.storage = {};// хранилище для значений
}

HashStorage.prototype.addValue = function(key, value) {
  this.storage[key] = value;
}

HashStorage.prototype.getValue = function(key) {
  if (!(key in this.storage)) {
    return undefined;
  } else {
    return this.storage[key];
  }
}

HashStorage.prototype.deleteValue = function(key) {
  if (!(key in this.storage)) {
    return false;
  } else {
    delete this.storage[key];
    return true;
  }
}

HashStorage.prototype.getKeys = function() {
  return Object.keys(this.storage);
}



