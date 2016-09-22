(function() {
'use strict';

/**
 * Module dependencies.
 */


var mongoose = require('mongoose'),
    Layer = mongoose.model('Layer'),
    config = require('meanio').loadConfig(),
    _ = require('lodash'),
    mapnikOmnivore = require('mapnik-omnivore'),
    mapnik = require('mapnik'),
    // path = require('path'),
    fs = require('fs'),
    builder = require('xmlbuilder');

module.exports = function(Layers) {

    return {
        /**
         * Find layer by id
         */
        layer: function(req, res, next, id) {
            Layer.load(id, function(err, layer) {
                if (err) return next(err);
                if (!layer) return next(new Error('Failed to load layer ' + id));
                req.layer = layer;
                next();
            });
        },
        /**
         * Create a layer
         */
        create: function(req, res) {

            // req.body - post data
            // req.params - get data
            console.log(req.body)
            // TODO add mapnik functionalities to generate a preview image from
            // the shapefile
            // 1 - create a generic stylesheet.xml with default styles foreach shape

            var layer = new Layer(req.body);

            layer.user = req.user;

            layer.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the layer'
                    });
                }

                Layers.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/layers/' + layer._id,
                    name: layer.title
                });

                res.json(layer);
            });
        },
        /**
         * Update a layer
         */
        update: function(req, res) {
            var layer = req.layer;

            console.log(req.layer);
            layer = _.extend(layer, req.body);

            console.log(layer);
            layer.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the layer'
                    });
                }

                Layers.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: layer.title,
                    url: config.hostname + '/layers/' + layer._id
                });

                res.json(layer);
            });
        },
        /**
         * Delete a layer
         */
        destroy: function(req, res) {
            var layer = req.layer;


            layer.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the layer'
                    });
                }

                Layers.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: layer.title
                });

                res.json(layer);
            });
        },
        /**
         * Show a layer
         */
        show: function(req, res) {

            // Layers.events.publish({
            //     action: 'viewed',
            //     user: {
            //         name: req.user.name
            //     },
            //     name: req.layer.title,
            //     url: config.hostname + '/layers/' + req.layer._id
            // });

            res.json(req.layer);
        },
        /**
         * List of Layers
         */
        all: function(req, res) {

            // var query = req.acl.query('Layer');

            Layer.find().exec(function(err, layers) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the layers'
                    });
                }

                res.json(layers)
            });

        },

        // Get layer info using
        // mapnik to get fields, geometry_type, type
        // mapnikOmnivore to get projection
        info : function(req, res) {
          // req.params se in get
          // req.body se in post
          // console.log(req.body.filepath);
          // var file = path.resolve(config.root + req.body.filepath);
          var file = config.root + req.body.filepath;
          console.log(file);
          // NOTE working code -
          // NOTE - we have to verify if the .prj file has been uploaded
          mapnikOmnivore.digest(file, function(err, metadata){
              if (err) return res.end(err);
              else {
                  // console.log('Metadata returned!');
                  //console.log(metadata);
                  var projection = metadata.projection;
                  var shapefile = new mapnik.Datasource({type: 'shape', file : file});
                  // This response is similar to the gdalinfo response
                  //console.log(shapefile.describe());
                  var geometryType = shapefile.describe().geometry_type;
                  var symbolizerName = geometryType.charAt(0).toUpperCase() + geometryType.slice(1) + 'Symbolizer';
                  // NON funziona -- bisogna mappare i nomi
                  var Rule = {};
                  Rule[symbolizerName] = {};

                  //
                  // Create the xml document with symple style and the layer
                  //
                  var root = builder.create('Map',
                             {version: '1.0', encoding: 'UTF-8'}).dtd().root();

                  var obj = {
                    Style: {
                      '@name': geometryType,
                      Rule,
                    },
                    Layer: {
                      '@name': metadata.filename,
                      '@srs' : projection,
                      StyleName: geometryType,
                      Datasource: {
                        Parameter:[
                          {'#text': metadata.dstype, '@name': 'type'},
                          {'#text': metadata.filename + metadata.filetype, '@name': 'file'}
                        ]
                      }
                    }
                  };

                  var xml = root.att('srs', projection)
                      .ele(obj)
                      .end({pretty: true});

                  console.log(xml);
                  var path = config.root + '/files/public/layers/'+metadata.filename+'.xml',
                  buffer = new Buffer(xml);

                  fs.open(path, 'w', function(err, fd) {
                      if (err) {
                          throw 'error opening file: ' + err;
                      }

                      fs.write(fd, buffer, 0, buffer.length, null, function(err) {
                          if (err) throw 'error writing file: ' + err;
                          fs.close(fd, function() {
                              console.log('file written');
                          })
                      });
                  });
                  res.json(shapefile.describe());
              }
          });


        }
    };
}
})();
