(function() {
    'use strict';

    function Geoexpress($stateProvider) {
        $stateProvider
        .state('layers list', {
            url: '/layers',
            templateUrl: 'geoexpress/views/system/layerslist.html'
        })
        .state('create layer', {
          url: '/layers/create',
          templateUrl: '/geoexpress/views/system/layerscreate.html',
          // requiredCircles : {
          //   circles: ['can create content']
          // }
        })
        .state('edit layer', {
          url: '/layers/:layerId/edit',
          templateUrl: '/geoexpress/views/system/layersedit.html',
          // requiredCircles : {
          //   circles: ['can edit content']
          // }
        })
        .state('layer by id', {
          url: '/layers/:layerId',
          templateUrl: '/geoexpress/views/system/layersview.html',
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
