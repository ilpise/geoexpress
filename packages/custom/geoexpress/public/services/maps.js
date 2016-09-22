(function() {
    'use strict';

    // Define Layers - $resource class
    function Maps($resource) {
          // $resource(url, [paramDefaults], [actions], options);
          return $resource('/api/maps/:mapId', {
            mapId: '@_id'
          }, {
            update: {
              method: 'PUT'
            }
          });

    }

    angular
        .module('mean.geoExpress')
        .factory('Maps', Maps);

    Maps.$inject = ['$resource'];

})();
