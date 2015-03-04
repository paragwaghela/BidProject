'use strict';

var test = require('../controllers/test');

// Test authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Tests, app, auth) {

  app.route('/tests')
    .get(test.count,test.all)
    .post(auth.requiresLogin, test.create);
  app.route('/tests/:testId')
    .get(auth.isMongoId, test.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, test.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, test.destroy);

  // Finish with setting up the articleId param
  app.param('testId', test.test);
};
