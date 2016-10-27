'use strict';

<<<<<<< HEAD:packages/custom/geoexpress/public/routes/users.js
//Setting up route
angular.module('mean.geoExpress').config(['$meanStateProvider',
  function($meanStateProvider) {

=======
// Setting up route
angular.module('mean.meanStarter').config(['$meanStateProvider',
  function ($meanStateProvider) {
>>>>>>> upstream/master:packages/custom/meanStarter/public/routes/users.js
    // states for users
    $meanStateProvider
      .state('auth', {
        url: '/auth',
        abstract: true,
        templateUrl: 'geoExpress/views/users/index.html'
      })
      .state('auth.login', {
        url: '/login',
        templateUrl: 'geoExpress/views/users/login.html',
        resolve: {
          loggedin: function (MeanUser) {
            return MeanUser.checkLoggedOut()
          }
        }
      })
      .state('auth.register', {
        url: '/register',
        templateUrl: 'geoExpress/views/users/register.html',
        resolve: {
          loggedin: function (MeanUser) {
            return MeanUser.checkLoggedOut()
          }
        }
      })
      .state('forgot-password', {
        url: '/forgot-password',
        templateUrl: 'geoExpress/views/users/forgot-password.html',
        resolve: {
          loggedin: function (MeanUser) {
            return MeanUser.checkLoggedOut()
          }
        }
      })
      .state('reset-password', {
        url: '/reset/:tokenId',
        templateUrl: 'geoExpress/views/users/reset-password.html',
        resolve: {
          loggedin: function (MeanUser) {
            return MeanUser.checkLoggedOut()
          }
        }
      });
  }
]);
