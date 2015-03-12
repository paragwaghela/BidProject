/**
 * Created by arunsahni on 3/11/15.
 */

'use strict';

var user = require('../controllers/userServerCtrl');

var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && req.project.user.id !== req.user.id) {
        return res.status(401).send('User is not authorized');
    }
    next();
};

module.exports = function(Meanutils, app, auth) {

    app.route('/users')
        .get(user.count, user.all)
        .post(auth.requiresLogin, user.create);

    app.route('/users/:userId')
        .get(auth.isMongoId, user.show)
        .put(user.update)
        .delete(user.deleteUser);

    app.param('userId', user.userByID);

};
