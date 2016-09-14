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

      // NOTE Simple swig rendering
      app.get('/api/geoexpress/simpleswig', function(req, res) {
        var title = 'Swig Primer!'
        var description = 'Swig is "a simple, powerful, and extendable JavaScript Template Engine" for NodeJS.'
        res.render('newtest/index.html', {title: title, description: description});
      });

    };
})();
