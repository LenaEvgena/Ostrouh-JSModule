function LocalStorage(storageName) {
  var self = this;
  var hash = {}; //приватный хэш
  var data = localStorage.getItem(storageName);// данные в LS

  self.reset = function() {
    if (data) {
      hash = JSON.parse(data);
    }
    return hash;
  };

  self.addValue = function(key, value) {
    hash[key] = value;
    localStorage.setItem(storageName, JSON.stringify(hash));
  };

  self.getValue = function(key) {
    return hash[key];
  };

  self.deleteValue = function(key) {
    delete hash[key];
    localStorage.setItem(storageName, JSON.stringify(hash));
  };

  self.getKeys = function() {
    return Object.keys(hash);
  };
}

