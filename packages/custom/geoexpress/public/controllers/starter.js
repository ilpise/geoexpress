;(function () {
  'use strict'

<<<<<<< HEAD:packages/custom/geoexpress/public/controllers/starter.js
  angular.module('mean.geoExpress')
    .controller('StarterController', StarterController);
=======
  angular.module('mean.meanStarter')
    .controller('StarterController', StarterController)
>>>>>>> upstream/master:packages/custom/meanStarter/public/controllers/starter.js

  StarterController.$inject = ['$scope', 'Global']

  function StarterController ($scope, Global) {
    // Original scaffolded code.
    $scope.global = Global
    $scope.package = {
<<<<<<< HEAD:packages/custom/geoexpress/public/controllers/starter.js
      name: 'geoExpress'
    };
=======
      name: 'meanStarter'
    }
>>>>>>> upstream/master:packages/custom/meanStarter/public/controllers/starter.js
  }
})()
