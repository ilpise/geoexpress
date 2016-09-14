(function() {
    'use strict';

    // Define Contactresource class
    function Contactresource($resource) {

          // console.log('------------------------------------')
          // console.log($resource)
          // console.log('------------------------------------')

          // $resource(url, [paramDefaults], [actions], options);
          return $resource('/api/geoexpress/contact/:contactId', {
            contactId: '@_id'
          }, {
            update: {
              method: 'PUT'
            }
          });

    }

    angular
        .module('mean.geoExpress')
        .factory('Contactresource', Contactresource);

    Contactresource.$inject = ['$resource'];

})();
