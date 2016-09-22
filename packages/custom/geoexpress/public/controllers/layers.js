(function() {
    'use strict';

    /* jshint -W098 */

    // Injecting services
    function LayersController($scope, $location, Global, Layers, Maplayers, $http, $stateParams) {
        $scope.global = Global;
        $scope.files = [];
        $scope.center = {};
        $scope.mylayer = {};
        // Init function to list layers
        // layerslist.html
        // Layers is the $resource injected service
        $scope.find = function() {
          Layers.query(function(layers) {
            $scope.layers = layers;
            // console.log($scope.layers);
            // Maplayers.addLayer(layers);

          });
        };

        // Layer creation
        $scope.create = function(isValid) {
          if (isValid) {
            var files = $scope.files;
            // get the shapefile information
            // we need to pass the path of the file server side to mapnik-omnivore
            // using the $http service
            $http
            .post('/api/geoexpress/layerinfo', {'filepath' : $scope.shapepath})
            .success(function(data){
                //what to do here
                console.log(data)
                /**/
                /* Save the layer data in the database */
                /**/
                // Add files array to the layer object
                $scope.layer.files = files;
                // create a new Layers resource from the layer object
                var layer = new Layers($scope.layer);
                // save the layer resource whith it's $save action/method
                layer.$save(function(response) {
                  console.log(response)
                  $location.path('layers/' + response._id);
                });
                // reset the scope elements
                $scope.layer = {};
                $scope.files = [];

            })
            .error(function(data){
                console.log('Error: ' + data);
            });
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

            var wms = {name: $scope.layer.title,
                  type :'wms',
                  visible: true,
                  url: 'http://127.0.0.1:3000/api/geoexpress/ows',
                  layerParams: {
                      layers: $scope.layer.title,
                      format: 'image/png',
                      transparent: true
                  }
                };

            $scope.mylayer = {
              baselayers: {
                xyz: {
                    name: 'OpenStreetMap (XYZ)',
                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    type: 'xyz'
                }
              },
              overlays: {
                wms
              }
            };
            $scope.center = {
              lat: 45.53,
              lng: 9.35,
              zoom: 8
            };
            // $scope.mylayer = {
            //   baselayers: {
            //     xyz: {
            //         name: 'OpenStreetMap (XYZ)',
            //         url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            //         type: 'xyz'
            //     }
            //   },
            //   overlays: {
            //     wms: {
            //         name: 'Self WMS served layer',
            //         type: 'wms',
            //         visible: true,
            //         url: 'http://127.0.0.1:3000/api/geoexpress/ows',
            //         layerParams: {
            //             layers: 'layerdue',
            //             format: 'image/png',
            //             transparent: true
            //         }
            //     }
            //   }
            // };

          });
        };

        // Layers files upload functionalities
        $scope.layerFileCallback = function(file) {
              console.log(file)
              if ( (file.type.indexOf('application/x-esri-shape') !== -1) && (file.name.indexOf('shp')  !== -1) ){
                // console.log(file.src);
                $scope.shapepath = file.src;
              }
              $scope.files.push(file);
        };

        $scope.layerFinished = function(files) {
          console.log(files);
        };

    }

    angular
        .module('mean.geoExpress')
        .controller('LayersController', LayersController);

    LayersController.$inject = ['$scope', '$location', 'Global', 'Layers', 'Maplayers', '$http', '$stateParams'];

})();
