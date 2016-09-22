(function() {
    'use strict';

    /* jshint -W098 */

    // Injecting services
    // Maps return the $resource object to talk with database
    // Maplayers is used to push and get layers between the LayersController and
    // this MapsController controller
    function MapsController($scope, $location, Global, Maps, Maplayers, $stateParams) {
        $scope.global = Global;
        // Map list functionalities on load
        $scope.find = function() {
          Maps.query(function(maps) {
            $scope.maps = maps;
            console.log($scope.maps);
          });
        };


        // Leaflet section
        var availablelayers = Maplayers.getLayers();
        console.log(availablelayers);

        $scope.definedOverlays = {
                testlayer: {
                  name: 'Self WMS served layer',
                  type: 'wms',
                  visible: true,
                  url: 'http://127.0.0.1:3000/api/geoexpress/ows',
                  layerParams: {
                      layers: 'layerdue',
                      format: 'image/png',
                      transparent: true
                  }
                }
            };

        angular.extend($scope, {
          center : {
            lat: 45.53,
            lng: 9.35,
            zoom: 8
          },
          layers : {
            baselayers: {
              xyz: {
                  name: 'OpenStreetMap (XYZ)',
                  url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                  type: 'xyz'
              }
            },
            overlays: {
              testlayer: $scope.definedOverlays.testlayer
              // testlayer : Maplayers.getLayers();
              // $scope.definedOverlays
            }
          }
        });

    }

    angular
        .module('mean.geoExpress')
        .controller('MapsController', MapsController);

    MapsController.$inject = ['$scope', '$location', 'Global', 'Maps', 'Maplayers', '$stateParams'];

})();
