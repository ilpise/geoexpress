'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var GeoExpress = new Module('geoExpress');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
GeoExpress.register(function(app, users, system) {

  // The app variable is an Express instance

  // Set views path, template engine and default layout
  // The default file loaded is the default.html
  app.set('views', __dirname + '/server/views');

  // Client side path - public directory - to icons
  var icons = 'geoExpress/assets/img/icons/';
  // Add menu link in the admin menu
  GeoExpress.menus.add({
    roles: ['admin'],
    title: 'CONTACT',
    link: 'contact',
    icon: icons + 'business-card-of-a-man-with-contact-info.png',
    menu: 'admin'
  });

  // Enable server routing. see server/routes/geoexpress.js
  // the server routing seems always prepend the api name in the url
  GeoExpress.routes(app);

  // Inject angular dependencies
  GeoExpress.angularDependencies(['mean.system', 'mean.users']);

  return GeoExpress;
});
