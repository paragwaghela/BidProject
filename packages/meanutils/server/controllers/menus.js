/**
 * Created by arunsahni on 3/5/15.
 */
'use strict';

var mongoose = require('mongoose'),
    Menu = mongoose.model('menus'),
    _ = require('lodash');


exports.read = function(req, res) {
    res.json(req.state);
};


exports.list = function(req, res) {
    Menu.find().exec(function(err, menus) {
        if (err) {
            return res.status(400).send(err);
        } else {
            console.log(menus);

            res.send(menus);
        }
    });
};

exports.hasAuthorization = function(req, res, next) {
    if (req.state.user.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};
