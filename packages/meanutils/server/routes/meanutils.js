'use strict'

//var project = require('../controllers/project');

// The Package is past automatically as first parameter
module.exports = function(Meanutils, app, auth, database) {

    //FRO PROJECT
   // app.get('/meanutils/example/project',project.all);
    //app.post('/meanutils/example/project',project.create);

/*
    app.get('/meanutils/example/project', function(req, res, next) {
        res.send('PROJECT');
    });
*/

    app.get('/meanutils/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/meanutils/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/meanutils/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/meanutils/example/render', function(req, res, next) {
        Meanutils.render('index', {
            package: 'meanutils'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
