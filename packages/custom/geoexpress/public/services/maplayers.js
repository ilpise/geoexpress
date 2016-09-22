//
// Implementation of a service in order to share layers
// (provided from LayersController) with map view and MapsController
//

(function() {
    'use strict';

    function Maplayers($http, $q) {
        // var layersList = [];
        var layersList = [];
        var addLayer = function(newObj) {
            console.log(newObj);
            layersList.push(newObj);
            // layersList = newObj;
        };

        var getLayers = function(){
            return layersList;
        };

        return {
          addLayer: addLayer,
          getLayers: getLayers
        };
    }

    angular
        .module('mean.geoExpress')
        .factory('Maplayers', Maplayers);

    Maplayers.$inject = ['$http', '$q'];

})();
