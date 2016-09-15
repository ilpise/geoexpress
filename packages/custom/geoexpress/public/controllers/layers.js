(function() {
    'use strict';

    /* jshint -W098 */

    // Injecting services
    function LayersController($scope, $location, Global, Layers, $stateParams) {
        $scope.global = Global;
        $scope.files = [];
        // Init function to list layers
        // layerslist.html
        // Layers is the $resource injected service
        $scope.find = function() {
          Layers.query(function(layers) {
            $scope.layers = layers;
            console.log($scope.layers);
          });
        };

        // Layer creation
        $scope.create = function(isValid) {
          if (isValid) {
            // $scope.layer.permissions.push('test test');
            var files = $scope.files;
            // Add files array to the layer object
            $scope.layer.files = files;
            var layer = new Layers($scope.layer);

//            console.log(layer);

            layer.$save(function(response) {
              $location.path('layers');
            });
            // reset the scope elements
            $scope.layer = {};
            $scope.files = [];

          } else {
            $scope.submitted = true;
          }
        };

        $scope.remove = function(layer) {
          if (layer) {
            layer.$remove(function(response) {
              for (var i in $scope.layers) {
                if ($scope.layers[i] === layer) {
                  $scope.layers.splice(i, 1);
                }
              }
              // $location.path('layers');
            });
          } else {
            $scope.layer.$remove(function(response) {
              // $location.path('layers');
            });
          }
        };

        $scope.update = function(isValid) {
          if (isValid) {
            var layer = $scope.layer;
            console.log(layer);
            if (!layer.updated) {
              layer.updated = [];
            }
            layer.updated.push(new Date().getTime());

            layer.$update(function() {
              $location.path('layers/' + layer._id);
            });
          } else {
            $scope.submitted = true;
          }
        };

        $scope.findOne = function() {
          console.log($stateParams.layerId)
          Layers.get({
            layerId: $stateParams.layerId
          }, function(layer) {
            $scope.layer = layer;
            console.log($scope.layer)
          });
        };

        // Layers files upload functionalities
        $scope.layerFileCallback = function(file) {
              console.log(file)
              $scope.files.push(file);
        };

        $scope.layerFinished = function(files) {
          console.log(files);
        };

    }

    angular
        .module('mean.geoExpress')
        .controller('LayersController', LayersController);

    LayersController.$inject = ['$scope', '$location', 'Global', 'Layers', '$stateParams'];

})();
