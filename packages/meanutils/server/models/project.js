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
    createdBy :{
        type: String,
        trim: true
    },
    createdUserName :{
        type: String,
        trim: true
    },
    status: {
        type : String,
        default : 'New'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    deadline: {
        type: Date
    },
    discription :{
        type : String,
        trim :true
    },
    price:{
        type: Number
    },
    bid :[{
        userId : {type :String},
        userName : {type:String},
        bid : {type : Number},
        day : {type : Number},
        initialmileston : {type : Number}
        }]
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