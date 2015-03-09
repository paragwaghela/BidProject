/**
 * Created by sumasoft on 3/5/15.
 */
'use strict';

var projects = require('../controllers/project');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
        return res.status(401).send('User is not authorized');
    }
    next();
};

module.exports = function(Meanutils, app, auth) {

    app.route('/projects')
        .get(projects.count, projects.all)
        .post(auth.requiresLogin, projects.create);

};