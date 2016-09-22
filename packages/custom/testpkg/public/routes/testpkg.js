(function() {
    'use strict';

    function Testpkg($stateProvider) {
        // override the root path to point to the package
        // TODO verify the viewPathProvider solution at
        // http://stackoverflow.com/questions/30052258/override-the-system-package-in-mean-io/30077148#30077148
        $stateProvider
        // .state('/', {
        //     url: '/',
        //     templateUrl: 'testpkg/views/index.html'
        // })
        .state('testpkg example page', {
            url: '/testpkg/example',
            templateUrl: 'testpkg/views/index.html'
        })
        .state('testpkg circles example', {
            url: '/testpkg/example/:circle',
            templateUrl: 'testpkg/views/example.html'
        })
        // .state('create article', {
        //   url: '/testpkg/contactinformation',
        //   templateUrl: '/testpkg/views/contactinformation.html',
        // })
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

// (function() {
//     'use strict';
//
//     function Testpkg($stateProvider, $viewPathProvider) {
//
//         console.log($viewPathProvider)
//
//         $viewPathProvider.override('system/views/index.html', 'testpkg/views/index.html');
//
//         $stateProvider.state('testpkg example page', {
//             url: '/testpkg/example',
//             templateUrl: 'testpkg/views/index.html'
//         }).state('testpkg circles example', {
//             url: '/testpkg/example/:circle',
//             templateUrl: 'testpkg/views/example.html'
//         })
//         .state('mapnik', {
//           url: '/testpkg/:bbox',
//           templateUrl: '/testpkg/views/view.html'
//         });
//     }
//
//     angular
//         .module('mean.testpkg', ['mean.system'])
//         .config(Testpkg);
//
//     Testpkg.$inject = ['$stateProvider', '$viewPathProvider'];
//
// })();
