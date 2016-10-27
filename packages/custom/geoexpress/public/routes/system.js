'use strict';

<<<<<<< HEAD:packages/custom/geoexpress/public/routes/system.js
//Setting up route
angular.module('mean.geoExpress').config(['$meanStateProvider', '$urlRouterProvider',
  function($meanStateProvider, $urlRouterProvider) {
=======
// Setting up route
angular.module('mean.meanStarter').config(['$meanStateProvider', '$urlRouterProvider',
  function ($meanStateProvider, $urlRouterProvider) {
>>>>>>> upstream/master:packages/custom/meanStarter/public/routes/system.js
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $meanStateProvider
      .state('home', {
        url: '/',
<<<<<<< HEAD:packages/custom/geoexpress/public/routes/system.js
        templateUrl: 'geoExpress/views/system/index.html'
      });
=======
        templateUrl: 'meanStarter/views/system/index.html'
<<<<<<< HEAD:packages/custom/geoexpress/public/routes/system.js
      })
>>>>>>> upstream/master:packages/custom/meanStarter/public/routes/system.js
=======
      });
>>>>>>> 15bb05b2fff427d1cb71e7e2c2ea895628e9057c:packages/custom/meanStarter/public/routes/system.js
  }
]).config(['$locationProvider',
  function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
]);
