(function() {
    'use strict';

    function Contacttpkg($resource) {

          console.log('------------------------------------')
          console.log($resource)
          console.log('------------------------------------')

          return $resource('api/testpkg/:contactId', {
            contactId: '@_id'
          }, {
            update: {
              method: 'PUT'
            }
          });

    }

    angular
        .module('mean.testpkg')
        .factory('Contacttpkg', Contacttpkg);

    Contacttpkg.$inject = ['$resource'];

})();
