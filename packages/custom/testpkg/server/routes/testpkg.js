(function() {
    'use strict';

    // var mapnik = require('mapnik');
    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Testpkg, app, auth, database, circles) {

        // http://build-failed.blogspot.it/2014/04/generating-server-side-tile-maps-with.html
        var testpkg = require('../controllers/testpkg')(Testpkg);

        // SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&LAYERS=__all__&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&HEIGHT=256&WIDTH=256&DETECTRETINA=true&SRS=EPSG%3A3857&BBOX=0,-7.081154551613622e-10,10018754.171394622,10018754.171394626
        // route to web geo services api
        app.route('/api/testpkg/geowebservices')
        .get(testpkg.gws);

        // app.route('/api/mapnik/:bbox')
        // .get(mapnik.wms);
        // app.route('/api/wms')
        // .get(mapnik.wms);


        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        app.get('/api/testpkg/example/anyone', function(req, res) {
            res.send('Anyone can access this');
        });

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

        // app.get('/api/testpkg/wms/render', function(req, res) {
        //   // var map = new mapnik.Map(256, 256);
        //   console.log(map);
        //   var bbox = req.param('bbox');
        //   bbox.split(',');
        //   // var token = req.param('token');
        //   // var geo = req.param('geo');
        //
        //   res.send(bbox);
        // });

        // Finish with setting up the z x y params
        // app.param('z', mapnik.z);
        // app.param('x', mapnik.x);
        // app.param('y', mapnik.y);
        // app.param('bbox', mapnik.bboxc);
    };
})();
