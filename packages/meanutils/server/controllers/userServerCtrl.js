/**
 * Created by arunsahni on 3/11/15.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('lodash');

/**
 * Find project by id
 */
exports.user = function(req, res, next, id) {
    User.load(id, function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load user ' + id));
        req.user = user;
        next();
    });
};

exports.create=function(req,res){
    var user = new User(req.body);
    user.createdBy = req.use;
    console.log(req.body);
    user.save(function(err,data){
        if(err)
            return res.status(500).json({
                error: 'Cannot list the user'
            });
        else {
            res.json(data);
        }
    });
};

exports.deleteUser = function(req, res) {
    var user = req.user;

    user.remove(function(err) {
        if (err) {
            return res.status(400).send({
                error: 'Cannot delete the user'
            });
        } else {
            res.json(user);
        }
    });
};
exports.userByID = function(req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'user is invalid'
        });
    }

    User.findById(id).exec(function(err, user) {
        if (err) return next(err);
        if (!user) {
            return res.status(404).send({
                message: 'User not found'
            });
        }
        req.user = user;
        next();
    });
};

exports.update = function(req, res) {
    var user = req.user;

    user = _.extend(user, req.body);

    user.save(function(err) {
        if (err) {
            return res.status(400).send({
                error: 'Cannot save'
            });
        } else {
            res.json(user);
        }
    });
};

var count = 0;
exports.count = function (req, res , next) {
    User.find().count().exec(function(err, user) {
        if(err) {
            return res.status(400).send({

            });
        } else {
            count= user;
            console.log('Exact count', count);
            next();
        }
    });
};

exports.all=function(req,res){
    var i = req.param('begin');

    User.find({roles: { $in: ['user']}}).skip(i).limit(5).exec(function(err,user){
        if(err){
            return res.status(500).json({
                error: 'Cannot list the users'
            });
        }else
        console.log(user);
            var arr = [{users: user, count: count}];


        res.send(arr);
    });

};

exports.show = function(req, res) {
    console.log("here",req.user);
    res.json(req.user);
};
