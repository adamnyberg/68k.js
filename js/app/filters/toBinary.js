angular.module('App.filters', [])
  .filter('toBinary', function () {
    return function (text) {
      text = text.toString(16);
      var length = text.length;
      var string = '';
      for (var i = 0; i < 2 - length; i++) {
        string += '0';
      }
      string += text;
      return string.toUpperCase();
    };
  });