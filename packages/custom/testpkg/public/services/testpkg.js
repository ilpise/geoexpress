(function() {
    'use strict';

    function Testpkg($http, $q) {
        return {
            name: 'testpkg',

            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/testpkg/example/' + circle).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            }
        };
    }

    angular
        .module('mean.testpkg')
        .factory('Testpkg', Testpkg);

    Testpkg.$inject = ['$http', '$q'];

})();
