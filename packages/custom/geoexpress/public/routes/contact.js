(function() {
    'use strict';

    function Geoexpress($stateProvider) {
        $stateProvider
        .state('contact', {
            url: '/geoexpress/contact',
            templateUrl: 'geoexpress/views/system/contact.html'
        })
    }

    angular
        .module('mean.geoExpress')
        .config(Geoexpress);

    Geoexpress.$inject = ['$stateProvider'];

})();
