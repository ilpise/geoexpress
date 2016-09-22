'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  /**
   * Map Schema
   */
  var MapSchema = new Schema({
    created: {type: Date, default: Date.now},
    title: { type: String, required: true, trim: true},
    layers: [],
    user: { type: Schema.ObjectId, ref: 'User', required: true},

    // // permissions: {
    // //   type: Array
    // // },
    // updated: {
    //   type: Array
    // }
  });


  /**
   * Statics
   */
  MapSchema.statics.load = function(id, cb) {
    this.findOne({
      _id: id
    }).populate('user', 'name username').exec(cb);
  };


mongoose.model('Map', MapSchema);
