(function() {
    'use strict';

    /* jshint -W098 */

    function TestpkgController($scope, Global, Testpkg, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'testpkg'
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
