(function() {
    'use strict';

    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(GeoExpress, app, auth, database, circles) {
    // module.exports = function(Contact, app, auth, database, circles) {

    // TODO sembra che il link a testcontact funzioni sia se passiamo Contact
    // sia se passiamo GeoExpress ???

      // to make this links work you need to enable routing in app.js
      app.get('/api/geoexpress/test', function(req, res) {
          res.send('Anyone can access this');
      });

      // This style of code is taken from menaio-admin/server/routes/index.js
      // var contact = require('../controllers/contact')
      // Here is the one taken from Articles
      // NOTE the (Contact) or (GeoExpress) added at the end
      // var contact = require('../controllers/contact')(Contact);
      var contact = require('../controllers/contact')(GeoExpress);
      app.get('/api/geoexpress/testcontact', contact.all);
      // NOTE : contact.all is function(req, res)

      // app.route('/api/geoexpress/contact/:contactId')
      app.route('/api/geoexpress/contact')
          .get(contact.mycontact)
          .post(contact.create);
      app.route('/api/geoexpress/contact/:contactId')
          .put(contact.update);

      //
      // Layers - server routing
      //
      var layers = require('../controllers/layers')(GeoExpress);
      app.route('/api/layers')
        .get(layers.all)
        // .post(requiresLogin, hasPermissions, layers.create);
        .post(layers.create);
      app.route('/api/layers/:layerId')
        // .get(auth.isMongoId, layers.show)
        // .put(auth.isMongoId, requiresLogin, hasAuthorization, hasPermissions, layers.update)
        // .delete(auth.isMongoId, requiresLogin, hasAuthorization, hasPermissions, layers.destroy);
        .get(layers.show)
        .put(layers.update)
        .delete(layers.destroy);
      // Finish with setting up the layerId param
      app.param('layerId', layers.layer);

      app.route('/api/geoexpress/layerinfo')
        .post(layers.info);

      // Layers upload functionalities
      // NOTE here we are not casting the meanUpload variable with the (GeoExpress)
      var multipart = require('connect-multiparty'),
          multipartMiddleware = multipart(),
          meanUpload = require('../controllers/meanUpload');

      app.post('/api/layerUpload/upload', multipartMiddleware, meanUpload.upload);

      //
      // Maps - server routing
      //
      var maps = require('../controllers/maps')(GeoExpress);
      app.route('/api/maps')
        .get(maps.all)
        // .post(requiresLogin, hasPermissions, layers.create);
        .post(maps.create);
      app.route('/api/maps/:layerId')
        // .get(auth.isMongoId, layers.show)
        // .put(auth.isMongoId, requiresLogin, hasAuthorization, hasPermissions, layers.update)
        // .delete(auth.isMongoId, requiresLogin, hasAuthorization, hasPermissions, layers.destroy);
        .get(maps.show)
        .put(maps.update)
        .delete(maps.destroy);
      // Finish with setting up the mapId param
      app.param('mapId', maps.map);


      // NOTE Simple swig rendering
      app.get('/api/geoexpress/simpleswig', function(req, res) {
        var title = 'Swig Primer!'
        var description = 'Swig is "a simple, powerful, and extendable JavaScript Template Engine" for NodeJS.'
        res.render('newtest/index.html', {title: title, description: description});
      });

    };
})();
