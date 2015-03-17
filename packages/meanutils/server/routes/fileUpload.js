/**
 * Created by sumasoft on 3/16/15.
 */
'use strict';

// The Package is past automatically as first parameter
module.exports = function(meanUtils, app, auth, database) {

    var multipart = require('connect-multiparty'),
        multipartMiddleware = multipart(),
        meanUpload = require('../controllers/fileUpload');

    app.get('/fileUpload/example/render', function(req, res, next) {
        MeanUpload.render('index', {
            package: 'meanutil'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });

    app.post('/fileUpload/upload', multipartMiddleware, meanUpload.upload);
};