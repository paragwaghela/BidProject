/**
 * Created by sumasoft on 3/4/15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Project Schema
 */
var ProjectSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    expiryDate: {
        type: Date
    },
    users: {
        type: Array,
        ref: 'User'
    },
    bid: {
        type: Number,
        required: true
    }
});

/**
 * Validations
 */
/*
ProjectSchema.path('title').validate(function(title) {
    return !!title;
}, 'Title cannot be blank');

ProjectSchema.path('content').validate(function(expiryDate) {
    return !!expiryDate;
}, 'Content cannot be blank');
*/

/**
 * Statics
 */
ProjectSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Projects', ProjectSchema);