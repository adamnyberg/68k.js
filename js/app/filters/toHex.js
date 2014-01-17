angular.module('App.filters', [])
  .filter('toHex', function () {
    return function (text) {
      text = text.toString(2);
      var length = text.length;
      var string = '';
      for (var i = 0; i < 32 - length; i++) {
        string += '0';
      }
      string += text;
      return string.toUpperCase().toString(2);
    };
});