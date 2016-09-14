(function() {
  'use strict';

  angular.module('mean.geoExpress')
    .controller('StarterController', StarterController);

  StarterController.$inject = ['$scope', 'Global'];

  function StarterController($scope, Global) {
    // Original scaffolded code.
    $scope.global = Global;
    $scope.package = {
      name: 'geoExpress'
    };
  }
})();
