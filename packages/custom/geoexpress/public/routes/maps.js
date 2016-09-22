(function() {
    'use strict';

    function Geoexpress($stateProvider) {
        $stateProvider
        .state('maps list', {
            url: '/maps',
            templateUrl: 'geoexpress/views/maps/list.html'
        })
        .state('create map', {
          url: '/maps/create',
          templateUrl: '/geoexpress/views/maps/create.html',
          // requiredCircles : {
          //   circles: ['can create content']
          // }
        })
        .state('edit map', {
          url: '/maps/:mapId/edit',
          templateUrl: '/geoexpress/views/maps/edit.html',
          // requiredCircles : {
          //   circles: ['can edit content']
          // }
        })
        .state('map by id', {
          url: '/maps/:mapId',
          templateUrl: '/geoexpress/views/maps/view.html',
          // requiredCircles : {
          //   circles: ['authenticated'],
          //   denyState: 'auth.login'
          // }
        })
    }

    angular
        .module('mean.geoExpress')
        .config(Geoexpress);

    Geoexpress.$inject = ['$stateProvider'];

})();
