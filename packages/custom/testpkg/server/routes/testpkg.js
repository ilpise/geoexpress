(function() {
    'use strict';

    // var xml = require('xml');
    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Testpkg, app, auth, database, circles) {

        // var testmapnik = require('../controllers/testmapnik')(Testpkg);
        // // app.route('/api/mapnik/tests/maps/:mapId/slips/:slipsId')
        // //    .get(testmapnik.mapnik);
        //
        // app.route('/api/mapnik/tests/')
        //    .get(testmapnik.layeronthefly);
        //
        // // route for tileserver
        // app.route('/api/mapnik/tests/tileserver/:z/:x/:y')
        //     .get(testmapnik.tileserver);


        // http://build-failed.blogspot.it/2014/04/generating-server-side-tile-maps-with.html
        var testpkg = require('../controllers/testpkg')(Testpkg);

        // route to web geo services api
        app.route('/api/geoexpress/ows')
           .get(testpkg.ows);

        // TODO Sembra che se non si specifica /api/nomepackage le url non vengono risolte
        // app.route('/geoexpress/ows')
        // .get(testpkg.ows);

        // TESTING - add a contact entry in the database
        app.route('/api/contact')
           .post(testpkg.create);

        /**/
        /* Get back an xml formatted file from a server route */
        /* This can be used to query the database for the contact document and */
        /* attach it to the WMS GetCapabilities response */
        /**/
        // app.get('/api/testpkg/example/anyone', function(req, res) {
        //
        //     console.log(database);
        //
        //     var jsonobj = [ { toys: [ { toy: 'Transformers' } , { toy: 'GI Joe' }, { toy: 'He-man' } ] } ];
        //     //console.log(xml(jsonobj));
        //     var response = xml(jsonobj)
        //     // res.set('Content-Type', 'text/xml');
        //     res.type('text/xml');
        //     //res.render(response); //Error: Failed to lookup view "<toys><toy>Transformers</toy><toy>GI Joe</toy><toy>He-man</toy></toys>" in views directory "/home/ilpise/geoexpress/packages/custom/geoexpress/server/views"
        //     res.send(response);
        // });


        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        app.get('/api/testpkg/example/auth', requiresLogin, function(req, res) {
            res.send('Only authenticated users can access this');
        });

        app.get('/api/testpkg/example/admin', requiresAdmin, function(req, res) {
            res.send('Only users with Admin role can access this');
        });

        app.get('/api/testpkg/example/render', function(req, res) {
            Testpkg.render('index', {
                package: 'testpkg'
            }, function(err, html) {
                //Rendering a view from the Package server/views
                res.send(html);
            });
        });
      };
})();
