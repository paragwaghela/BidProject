/**
 * Created by sumasoft on 3/5/15.
 */
'use strict';

var projects = require('../controllers/project');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && req.project.user.id !== req.user.id) {
        return res.status(401).send('User is not authorized');
    }
    next();
};

module.exports = function(Meanutils, app, auth) {

    app.route('/meanutils/example/projects')
        .get(projects.count, projects.all)
        .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, projects.update)
        .post(auth.requiresLogin, projects.create);
    app.route('/myProjects')
        .post(projects.myProject);
    app.route('/uploadFiles')
        .post(projects.uploadFiles);
    app.route('/meanutils/example/projects/:projectId')
        .get(auth.isMongoId, projects.show)
        .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, projects.updateProject)
        .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, projects.deleteProject);
    // Finish with setting up the Id param

    app.param('projectId', projects.project);


};