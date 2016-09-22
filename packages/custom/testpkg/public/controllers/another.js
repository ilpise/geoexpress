// (function() {
//     'use strict';
//
//     /* jshint -W098 */
//
//     function AnothermyController($scope, Global, $stateParams) {
//         $scope.global = Global;
//         $scope.anothermy = 'testing';
//
//         console.log($scope);
//     }
//
//     angular
//         .module('mean.testpkg')
//         .controller('AnothermyController', AnothermyController);
//
//     AnothermyController.$inject = ['$scope', 'Global', '$stateParams'];
//
// })();
(function() {
    'use strict';

    /* jshint -W098 */

    function AnothermyController($scope, Global, Testpkg, $stateParams) {
        $scope.global = Global;
        $scope.anothermy = 'testing';

        console.log($scope);
    }

    angular
        .module('mean.testpkg')
        .controller('AnothermyController', AnothermyController);

    AnothermyController.$inject = ['$scope', 'Global', 'Testpkg', '$stateParams'];

})();
