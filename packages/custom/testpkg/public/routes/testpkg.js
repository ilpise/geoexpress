(function() {
    'use strict';

    function Testpkg($stateProvider) {
        $stateProvider.state('testpkg example page', {
            url: '/testpkg/example',
            templateUrl: 'testpkg/views/index.html'
        }).state('testpkg circles example', {
            url: '/testpkg/example/:circle',
            templateUrl: 'testpkg/views/example.html'
        })
        .state('mapnik', {
          url: '/testpkg/:bbox',
          templateUrl: '/testpkg/views/view.html'
        });
    }

    angular
        .module('mean.testpkg')
        .config(Testpkg);

    Testpkg.$inject = ['$stateProvider'];

})();
