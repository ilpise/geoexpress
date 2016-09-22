'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Map = mongoose.model('Map'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(Maps) {

    return {
        /**
         * Find map by id
         */
        map: function(req, res, next, id) {
            Map.load(id, function(err, map) {
                if (err) return next(err);
                if (!map) return next(new Error('Failed to load map ' + id));
                req.map = map;
                next();
            });
        },
        /**
         * Create a map
         */
        create: function(req, res) {

            console.log(req.body)
            // TODO add mapnik functionalities to generate a preview image from
            // the shapefile
            // 1 - create a generic stylesheet.xml with default styles foreach shape

            var map = new Map(req.body);

            map.user = req.user;

            map.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the map'
                    });
                }

                Maps.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/maps/' + map._id,
                    name: map.title
                });

                res.json(map);
            });
        },
        /**
         * Update a map
         */
        update: function(req, res) {
            var map = req.map;

            console.log(req.map);
            map = _.extend(map, req.body);

            console.log(map);
            map.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the map'
                    });
                }

                Maps.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: map.title,
                    url: config.hostname + '/maps/' + map._id
                });

                res.json(map);
            });
        },
        /**
         * Delete a map
         */
        destroy: function(req, res) {
            var map = req.map;


            map.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the map'
                    });
                }

                Maps.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: map.title
                });

                res.json(map);
            });
        },
        /**
         * Show a map
         */
        show: function(req, res) {

            Maps.events.publish({
                action: 'viewed',
                user: {
                    name: req.user.name
                },
                name: req.map.title,
                url: config.hostname + '/maps/' + req.map._id
            });

            res.json(req.map);
        },
        /**
         * List of Maps
         */
        all: function(req, res) {

            // var query = req.acl.query('Map');

            Map.find().exec(function(err, maps) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the maps'
                    });
                }

                res.json(maps)
            });

        }
    };
}
