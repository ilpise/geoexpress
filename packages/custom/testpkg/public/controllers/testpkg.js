(function() {
    'use strict';

    /* jshint -W098 */

    function TestpkgController($scope, Global, Testpkg, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'testpkg'
        };

        $scope.center = {
          lat: 45.53,
          lng: 9.35,
          zoom: 8
        };

        $scope.defaults = {
          tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          maxZoom: 14,
          path: {
              weight: 10,
              color: '#800000',
              opacity: 1
          }
        };

        $scope.layers = {
          baselayers: {
            xyz: {
                name: 'OpenStreetMap (XYZ)',
                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                type: 'xyz'
            }
          },
          overlays: {
            wms: {
                name: 'Self WMS served layer',
                type: 'wms',
                visible: true,
                url: 'http://127.0.0.1:3000/api/testpkg/geowebservices/',
                layerParams: {
                    layers: 'layerdue',
                    format: 'image/png',
                    transparent: true
                }
            }
          }
        };

        $scope.checkCircle = function() {
            Testpkg.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };

    }

    angular
        .module('mean.testpkg')
        .controller('TestpkgController', TestpkgController);

    TestpkgController.$inject = ['$scope', 'Global', 'Testpkg', '$stateParams'];

})();
