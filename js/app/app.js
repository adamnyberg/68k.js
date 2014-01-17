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

      try {
        evaluate_instruction($scope.terminalInput);
      }
      catch (err) {
        $scope.logs.push({text: err.message});
      }

      $scope.terminalInput = '';
    }

    var getDestination = function(destination) {
      if (registers.hasOwnProperty(destination)) {
        return destination;
      }
      throw new Error('Invalid destination');
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
      throw new Error('Invalid source');
    };

    var evaluate_instruction = function (input) {
      var instruction_pair = input.split(' ');
      var operation = instruction_pair[0];
      var operands = instruction_pair[1].split(',');

      var source = operands[0];
      var destination = getDestination(operands[1]);

      operations[operation](source, destination);
      //console.log(registers);
    };

    var operations = {
      move: function(source, destination) {
        registers[destination] = getValue(source);
      },
      and: function(source, destination) {
        registers[destination] = getValue(source) & getValue(destination);
      },
      or: function(source, destination) {
        registers[destination] = getValue(source) | getValue(destination);
      },
      xor: function(source, destination) {
        registers[destination] = getValue(source) ^ getValue(destination);
      },
      // TODO: Check that << and >> really are LOGICAl shifts
      lsl: function(source, destination) {
        registers[destination] = getValue(source) >> getValue(destination);
      },
      lsr: function(source, destination) {
        registers[destination] = getValue(source) << getValue(destination);
      }
    };
  });
})();
