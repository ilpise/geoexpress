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

    // TODO define directories where to store .xml and .shp files
    var dir = __dirname;

    var stylesheet = dir + '/world_latlon.xml';
    var concurrency = 32;
    var bufferSize = 0;

    module.exports = function(Testpkg) {

      return {
        gws: function(req, res) {
          // console.log('------------ gws entered ----------------')
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
        },

        // z: function(req, res, next, id) {
        //     Article.load(id, function(err, article) {
        //         if (err) return next(err);
        //         if (!article) return next(new Error('Failed to load article ' + id));
        //         req.article = article;
        //         next();
        //     });
        // },
        // x: function(req, res, next, id) {
        //     Article.load(id, function(err, article) {
        //         if (err) return next(err);
        //         if (!article) return next(new Error('Failed to load article ' + id));
        //         req.article = article;
        //         next();
        //     });
        // },
        // y: function(req, res, next, id) {
        //     Article.load(id, function(err, article) {
        //         if (err) return next(err);
        //         if (!article) return next(new Error('Failed to load article ' + id));
        //         req.article = article;
        //         next();
        //     });
        // },
        bboxc: function(req, res, next, id) {
              console.log('------------ bbox iterator ---------------------')
              console.log(id)
              req.bboxc = id;
              next();
        },

        wms: function(req, res) {
          // console.log(req)
          console.log('-----------------   WMS  --------------------')
          console.log(req.bboxc)
          var bbox = {}
          bbox.val = req.bboxc
          // var bbox = req.bbox ? req.bbox.split(',') : [];
          // if (bbox.length !== 4) return callback(new Error('Invalid bbox: ' + util.inspect(bbox)));
          // bbox = bbox.map(parseFloat);
          // for (var i = 0; i < 4; i++) {
          //     if (isNaN(bbox[i])) return callback(new Error('Invalid bbox: ' + util.inspect(bbox)));
          // }
          res.json(bbox || null)
        }
      };
    }
})();
