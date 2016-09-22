(function() {
    'use strict';

    var mapnik = require('mapnik');
    // var fs = require('fs');
    mapnik.register_default_fonts();
    mapnik.register_default_input_plugins();

    var mercator = require('./utils/sphericalmercator')
    //var mappool = require('./utils/pool.js')
    var parseXYZ = require('./utils/tile.js').parseXYZ;

    // var L = require('leaflet');
    // var leafletMap = require('leaflet-map');


    // TODO  sostituire con pool.js usato in node-mapnik-sample-code che si basa
    // sul pacchetto generic-pool
    // node-mapnik-sample-code/wms/wms_pool.js
    // node-mapnik-sample-code/utils/pool.js
    // var Pool = require('./pool');


    // TODO define directoryes where to store .xml and .shp files
    // var dir = __dirname;
    var config = require('meanio').loadConfig();
    var dir = config.root + '/files/public/mapnik';


    var stylesheet = dir + '/stylesheet.xml';
    var tylesymbols = dir + '/tile_symbols.xml';
    var concurrency = 32;
    var bufferSize = 0;
    var TMS_SCHEME = false;

    var Pool = require('./pool');
    // var xml = require('xml');
    // TEST
    var mongoose = require('mongoose');
    // ContactInformation = mongoose.model('ContactInformation');

    // Possiamo usare il nome che vogliamo poi viene trasformato nella routes
    // module.exports = function(ciccio) {
    module.exports = function(Testpkg) {

      return {
        layeronthefly: function(req,res){

          console.log(req.params)
          var title = 'Swig Primer!'
          var description = 'Swig is "a simple, powerful, and extendable JavaScript Template Engine" for NodeJS.'
          // the absolute path is given from the geoexpress package
          // geoexpress/server/views/
          // res.render('newtest/mapniktestpkg.html', {title: title, description: description});
          // res.render(stylesheet); // Error: Cannot find module 'xml'
          // res.send(stylesheet);

          // We are loading a .shp file on the fly and we wre using
          // tylesymbols.xml file to just apply styles
          var map = new mapnik.Map(256, 256);
          var layer = new mapnik.Layer('tile');
          var shapefile = new mapnik.Datasource({type: 'shape', file : dir + '/testdata/world_latlon.shp'});
          // var shapefile = new mapnik.Datasource({type: 'shape', file : dir + '/testdata/marker.shp'});
          console.log('DESCRIBE');
          console.log(shapefile.describe());
          // var postgis = new mapnik.Datasource(postgis_settings); // settings defined above
          // var bbox = mercator.xyz_to_envelope(parseInt(params.x),
          //                                        parseInt(params.y),
          //                                        parseInt(params.z), false); // coordinates provided by the sphericalmercator.js script
          // layer.datasource = postgis;
          layer.datasource = shapefile;
          layer.styles = ['polygon']; // this pertains the the style in the xml doc
          map.bufferSize = 0; // how much edging is provided for each tile rendered
          map.load(tylesymbols, {strict: true}, function(err,map) {
              if (err) {
                  return res.end(err.message);
              }
              map.add_layer(layer);
              // map.extent = bbox;
              map.zoomAll();
              var im = new mapnik.Image(map.width, map.height);
              map.render(im, function(err, im) {
                if (err) {
                    res.end(err.message);
                } else {
                    im.encode('png', function(err,buffer) {
                        if (err) {
                            res.end(err.message);
                        } else {
                            res.writeHead(200, {'Content-Type': 'image/png'});
                            res.end(buffer);
                        }
                    });
                }

              });
          });

        },

        tileserver: function(req,res){

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


            parseXYZ(req, TMS_SCHEME, function(err,params) {
              maps.acquire(function(map) {
                  // map.resize(req.query.width, req.query.height);
                  // if (req.query.srs) map.srs = '+init=' + req.query.srs.toLowerCase();
                  var bbox = mercator.xyz_to_envelope(params.x, params.y, params.z, TMS_SCHEME);
                  map.extent = bbox;

                  console.log(map);

                  var canvas = new mapnik.Image(map.width, map.height);
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
          });

        }

      };
    }
})();
