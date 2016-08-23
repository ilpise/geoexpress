(function() {
    'use strict';

    /* jshint -W098 */

    function TestpkgController($scope, Global, Testpkg, $stateParams) {
        $scope.global = Global;
        $scope.images = [];
        $scope.files = [];
        $scope.package = {
            name: 'testpkg'
        };
        $scope.uploadFileCallback = function(file) {
          if (file.type.indexOf('image') !== -1){
              $scope.images.push(file);
              // $scope.addSlide(file.src);
          }
          else{
              $scope.files.push(file);
          }
        };

        $scope.uploadFinished = function(files) {
          console.log(files);
        };

    //     $scope.myInterval = 5000;
    //     var slides = $scope.slides = [];
    //     $scope.addSlide = function(url) {
    // //           var newWidth = 600 + slides.length;
    //        slides.push({
    //          image: url
    //        });
    //     };
        // $scope.checkCircle = function() {
        //     Testpkg.checkCircle($stateParams.circle).then(function(response) {
        //         $scope.res = response;
        //         $scope.resStatus = 'info';
        //     }, function(error) {
        //         $scope.res = error;
        //         $scope.resStatus = 'danger';
        //     });
        // };
        // console.log($scope)
    }

    angular
        .module('mean.testpkg')
        .controller('TestpkgController', TestpkgController);

    TestpkgController.$inject = ['$scope', 'Global', 'Testpkg', '$stateParams'];

})();
