'use strict';
(function(){
  var app = angular.module('app',['App.filters']);

  var memory = [];
  for (var i = 0; i < 1000; i++) {
    memory.push(0);
  }

  var registers = {
    d0: 0x0,
    d1: 0x0,
    d2: 0x0,
    d3: 0x0,
    d4: 0x0,
    d5: 0x0,
    d6: 0x0,
    d7: 0x0
  };

  app.controller('m68k', function($scope) {
    $scope.registers = registers;
    $scope.memory = memory;

    $scope.logs = [
      {text: 'TUTOR IS WELCOMING YOU!'}
    ];

    $scope.enterInput = function() {
      $scope.logs.push({text: $scope.terminalInput});
      parseInput($scope.terminalInput);
      $scope.terminalInput = '';
    }


    var parseInput = function (input) {

      try {
        //MOVE
        if (input.substr(0, 4).toLowerCase() === 'move') {
          move(input.substr(5));

        // AND
        } else if (input.substr(0, 3).toLowerCase() === 'and') {
          and(input.substr(4));

        // OR
        } else if (input.substr(0, 2).toLowerCase() === 'or') {
          or(input.substr(3));

        // XOR
        } else if (input.substr(0, 3).toLowerCase() === 'xor') {
          xor(input.substr(4));

        // LSL
        } else if (input.substr(0, 3).toLowerCase() === 'lsl') {
          lsl(input.substr(4));

        //LSR
        } else if (input.substr(0, 3).toLowerCase() === 'lsr') {
          lsr(input.substr(4));
        }

      } catch (err) {
        $scope.logs.push({text: err.message});
      }
      console.log(registers);
    };

    var getDestination = function(destination) {
      if (registers.hasOwnProperty(destination)) {
        return destination;
      }
      throw new Error('Unvalid destination');
    };

    var getValue = function(value) {
      if (value.substr(0,1) === '#') {
        if (value.substr(1,1) === '$') {
          return parseInt(value.substr(2), 16);
        }
        else {
          return parseInt(value.substr(1), 2);
        }
      } else if (registers.hasOwnProperty(value)) {
        return registers[value];
      }
      throw new Error('Unvalid source');
    };



    /*
     * Assembly instructions
     */

    var move = function(input) {
      var source = input.split(',')[0];
      var destination = getDestination(input.split(',')[1]);

      registers[destination] = getValue(source);
    };

    var and = function(input) {
      var source = input.split(',')[0];
      var destination = getDestination(input.split(',')[1]);

      registers[destination] = getValue(source) & getValue(destination);
    };

    var or = function(input) {
      var source = input.split(',')[0];
      var destination = getDestination(input.split(',')[1]);

      registers[destination] = getValue(source) | getValue(destination);
    };

    var xor = function(input) {
      var source = input.split(',')[0];
      var destination = getDestination(input.split(',')[1]);

      registers[destination] = getValue(source) ^ getValue(destination);
    };

    var lsl = function(input) {
      var source = input.split(',')[0];
      var destination = getDestination(input.split(',')[1]);

      registers[destination] = getValue(source) ^ getValue(destination);
    };

    var lsr = function(input) {
      var source = input.split(',')[0];
      var destination = getDestination(input.split(',')[1]);

      registers[destination] = getValue(source) ^ getValue(destination);
    };
  });
})();