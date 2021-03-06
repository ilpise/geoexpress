(function() {
    'use strict';

    function Geoexpress($stateProvider) {
        $stateProvider
        .state('layers list', {
            url: '/layers',
            templateUrl: 'geoexpress/views/layers/list.html'
        })
        .state('create layer', {
          url: '/layers/create',
          templateUrl: '/geoexpress/views/layers/create.html',
          // requiredCircles : {
          //   circles: ['can create content']
          // }
        })
        .state('edit layer', {
          url: '/layers/:layerId/edit',
          templateUrl: '/geoexpress/views/layers/edit.html',
          // requiredCircles : {
          //   circles: ['can edit content']
          // }
        })
        .state('layer by id', {
          url: '/layers/:layerId',
          templateUrl: '/geoexpress/views/layers/view.html',
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
