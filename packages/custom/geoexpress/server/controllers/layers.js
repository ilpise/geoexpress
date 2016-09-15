'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Layer = mongoose.model('Layer'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

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

            console.log(req.body)
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

            Layers.events.publish({
                action: 'viewed',
                user: {
                    name: req.user.name
                },
                name: req.layer.title,
                url: config.hostname + '/layers/' + req.layer._id
            });

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

        }
    };
}
