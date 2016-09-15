(function() {
    'use strict';

    // Define Layers - $resource class
    function Layers($resource) {
          // $resource(url, [paramDefaults], [actions], options);
          return $resource('/api/layers/:layerId', {
            layerId: '@_id'
          }, {
            update: {
              method: 'PUT'
            }
          });

    }

    angular
        .module('mean.geoExpress')
        .factory('Layers', Layers);

    Layers.$inject = ['$resource'];

})();
