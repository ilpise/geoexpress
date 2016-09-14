(function() {
    'use strict';

    /* jshint -W098 */

    // Contact is defined in the services contact.js file
    // all the injection we need inside the ContactController can be performed
    // from the service Contact

    // We are injecting services inside the controller
    // In particular the Contactresource controller that is an 'extension' of
    // angularjs $resource
    function ContactController($scope, Global, Contactresource, $stateParams) {
    // function  GeoExpressController($scope, Global, Contactresource, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'geoexpress'
        };

        $scope.init = function() {
            // the query action of the resource class object
            // return an array of resources becouse the default is
            // 'query':  {method:'GET', isArray:true}
            Contactresource.query(function(contact) {
              if (contact.length) {
                console.log('contact exist');
                console.log(contact[0])
                // the contact[0] is the resource object
                $scope.contact = contact[0];
              } else {
                $scope.contact = {};
              }
            });
            // Contactresource.get({
            //   contactId: '57d7f0da9e1449e92bf62fb3'
            // }, function(contact) {
            //   $scope.contact = contact;
            //   console.log($scope.contact)
            // });
        };
        $scope.createorupdate = function(isValid) {
          if (isValid) {
            console.log($scope.contact);
            Contactresource.query(function(contact) {
              if (contact.length) {
                console.log('contact exist');
                var contact = $scope.contact;
                contact.$update(function(response) {
                  //$location.path('articles/' + article._id);
                  console.log(response);
                });
              } else {
                //We are going to istantiate a new Contactresource with the
                // $scope.contact values
                var contact = new Contactresource($scope.contact);
                console.log(contact);

                // then we are going to save the resource
                // from documentation
                // The actions save, remove and delete are available on it
                // as methods with the $ prefix.
                // This allows you to easily perform CRUD operations
                // (create, read, update, delete) on server-side data like this:
                contact.$save(function(response) {
                  // this is a redirect
                  // $location.path('articles/' + response._id);
                  console.log(response);
                });
              }
            });
            // Contactresource.query(function(contact) {
            //   if (contact.length) {
            //     console.log('contact exist');
            //     // var mycontact = $scope.contact;
            //     console.log(contact)
            //     // var cont = {contact[0]}
            //     // console.log(cont);
            //     // contact is an array of Resources if we use the query method
            //     contact.$update(function(response) {
            //       //$location.path('articles/' + article._id);
            //       console.log(response);
            //     });
            //   } else {
            //       // We are going to istantiate a new Contactresource with the
            //       // $scope.contact values
            //       var contact = new Contactresource($scope.contact);
            //       console.log(contact);
            //
            //       // then we are going to save the resource
            //       // from documentation
            //       // The actions save, remove and delete are available on it
            //       // as methods with the $ prefix.
            //       // This allows you to easily perform CRUD operations
            //       // (create, read, update, delete) on server-side data like this:
            //       contact.$save(function(response) {
            //         // this is a redirect
            //         // $location.path('articles/' + response._id);
            //         console.log(response);
            //       });
            //
            //       $scope.contact = {};
            //   }
            // });
        } else {
          $scope.submitted = true;
        }
      };


    }

    angular
        .module('mean.geoExpress')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['$scope', 'Global', 'Contactresource', '$stateParams'];
    // angular
    //     .module('mean.geoExpress')
    //     .controller('GeoExpressController', GeoExpressController);
    //
    // GeoExpressController.$inject = ['$scope', 'Global', 'Contactresource', '$stateParams'];

})();
