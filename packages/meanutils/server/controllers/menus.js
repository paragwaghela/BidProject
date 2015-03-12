/**
 * Created by arunsahni on 3/5/15.
 */
'use strict';

var mongoose = require('mongoose'),
    Menu = mongoose.model('menus'),
    _ = require('lodash');


exports.read = function(req, res) {
    console.log("REad",req.state);
    res.json(req.state);
};


exports.list = function(req, res) {

    var role = req.param('role');
    if(role === 'admin'){
        Menu.find().exec(function(err, menus) {
            if (err) {
                return res.status(400).send(err);
            } else {
               res.send(menus);
            }
        });
    } else {
        Menu.find({roles: { $in: ['user']}}).exec(function(err, menus) {
            if (err) {
                return res.status(400).send(err);
            } else {
                res.send(menus);
            }
        });
    }

};

exports.hasAuthorization = function(req, res, next) {
    if (req.state.user.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};
