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
    if(role === 'superadmin'){
        Menu.find({"submenu.roles": { $in: ['superadmin']}}).exec(function(err, menus) {
            if (err) {
                return res.status(400).send(err);
            } else {
               res.send(menus);
            }
        });
    }else if(role === 'admin'){
        Menu.find({"submenu.roles": { $in: ['admin']}}).exec(function(err, menus) {
            if (err) {
                return res.status(400).send(err);
            } else {
                res.send(menus);
            }
        });
    } else {

        Menu.aggregate(
            //{$unwind : "$submenu"},
            //{$match : {"submenu.roles" : "user"}},
            //{$project : {submenu:1, menuName: 1}},
            //{ $group: {_id: '$_id', submenu: {$push: '$submenu'}}}
            { $unwind: '$submenu'},
            { $match: {'submenu.roles': "user"}},
            { $group: {_id : {menuName:"$menuName"}, submenu: {$push: '$submenu'}}}

        ).exec(function(err, menus){
                if (err) {
                    return res.status(400).send(err);
                } else {

                    console.log(menus);
                    res.send(menus);
                }
            });

        //Menu.find({"submenu.roles": "user"},{"submenu.roles.$":1, menuName:1}).exec(function(err, menus) {
        //    if (err) {
        //        return res.status(400).send(err);
        //    } else {
        //        console.log(menus);
        //        res.send(menus);
        //    }
        //});
    }
};

exports.create = function(req, res) {
    var menu = new Menu(req.body);
    menu.createdBy = req.use;

    menu.save(function(err,data){
        if(err)
            return res.status(500).json({
                error: 'Cannot'
            });
        else {
            res.json(data);
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
