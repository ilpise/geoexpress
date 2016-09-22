(function() {
    'use strict';

    var mapnik = require('mapnik');
    // var fs = require('fs');
    mapnik.register_default_fonts();
    mapnik.register_default_input_plugins();

    // TODO  sostituire con pool.js usato in node-mapnik-sample-code che si basa
    // sul pacchetto generic-pool
    // node-mapnik-sample-code/wms/wms_pool.js
    // node-mapnik-sample-code/utils/pool.js
    var Pool = require('./pool');

    // TODO define directoryes where to store .xml and .shp files
    var config = require('meanio').loadConfig();

    // TODO ovverride di stylesheet
    var dir = config.root + '/files/public/layers/'
    var stylesheet;

    // var dir = config.root + '/files/public/mapnik';
    // var stylesheet = dir + '/world_latlon.xml';


    var concurrency = 32;
    var bufferSize = 0;

    var xml = require('xml');
    // TEST
    var mongoose = require('mongoose');
    // ContactInformation = mongoose.model('ContactInformation');

    // Possiamo usare il nome che vogliamo poi viene trasformato nella routes
    // module.exports = function(ciccio) {
    module.exports = function(Testpkg) {

      return {
        ows: function(req, res) {
          console.log('------------ gws entered ----------------')
          for (var key in req.query) {
            console.log(req.query[key]);
            req.query[key.toLowerCase()] = req.query[key].toLowerCase();
          }
          if (req.query.service == 'wms' && req.query.request=='getcapabilities'){
            var jsonobj = [ { toys: [ { toy: 'Transformers' } , { toy: 'GI Joe' }, { toy: 'He-man' } ] } ];
            //console.log(xml(jsonobj));
            var response = xml(jsonobj)
            // res.set('Content-Type', 'text/xml');
            res.type('text/xml');
            //res.render(response); //Error: Failed to lookup view "<toys><toy>Transformers</toy><toy>GI Joe</toy><toy>He-man</toy></toys>" in views directory "/home/ilpise/geoexpress/packages/custom/geoexpress/server/views"
            res.send(response);
          }
          if (req.query.service == 'wms' && req.query.request=='getmap'){
            stylesheet = dir + req.query.layers +'.xml'
            console.log('--------------------------------');
            console.log(stylesheet);
            console.log('--------------------------------');

            var maps = new Pool(function() {
                var map = new mapnik.Map(256, 256);
                map.bufferSize = bufferSize;

                map.load(stylesheet, {
                    strict: true,
                    base: dir
                }, function(err, map) {
                    if (err) throw err;
                    map.zoomAll();
                    // created++;
                    //util.print('\rCreating map objects (' + created + '/' + args.concurrency + ')...');
                    maps.release(map);
                });
            }, concurrency);

            console.log('testpkg.js - wms maps');
            console.log(maps)

            for (var key in req.query) {
              req.query[key.toLowerCase()] = req.query[key];
            }

            req.query.width = +req.query.width || 256;
            req.query.height = +req.query.height || 256;
            if (req.query.width < 1 || req.query.width > 2048 || req.query.height < 1 || req.query.height > 2048) {
                res.send('Invalid size');
            }
            var bbox = req.query.bbox ? req.query.bbox.split(',') : [];
            if (bbox.length !== 4) res.send('Invalid bbox: ');
            bbox = bbox.map(parseFloat);
            for (var i = 0; i < 4; i++) {
                if (isNaN(bbox[i])) res.send('Invalid bbox: ');
            }

            maps.acquire(function(map) {
                map.resize(req.query.width, req.query.height);
                if (req.query.srs) map.srs = '+init=' + req.query.srs.toLowerCase();
                map.extent = bbox;

                var canvas = new mapnik.Image(req.query.width, req.query.height);
                map.render(canvas, function(err, image) {
                    // Wait until the next tick to avoid Mapnik warnings.
                    process.nextTick(function() { maps.release(map); });
                    if (err) {
                        res.end(err.message);
                    } else {
                        // if (args.palette) {
                        //     image.encode('png8:z=1', {palette: args.palette}, callback);
                        // } else {
                            image.encode('png32:z=1', function(err,buffer) {
                                if (err) {
                                    console.log('error two');
                                    res.end(err.message);
                                } else {
                                    res.writeHead(200, {'Content-Type': 'image/png'});
                                    res.end(buffer);
                                }
                            });
                        // }
                    }
                });
            });

          }
        },
        /**
         * Create ContactInformation
         */
        create: function(req, res) {

            var ci = new ContactInformation(req.body);
            ci.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the article'
                    });
                }
                console.log(json(ci))
                res.json(ci);
            });
        }

      };
    }
})();
