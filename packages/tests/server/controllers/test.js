'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Test = mongoose.model('Test'),
  _ = require('lodash');


/**
 * Find test by id
 */
exports.test = function(req, res, next, id) {
   Test.load(id, function(err, test) {
    if (err) return next(err);
    if (!test) return next(new Error('Failed to load article ' + id));
    req.test = test;
    next();
  });
};

/**
 * Create an test
 */
exports.create = function(req, res) {
  var test = new Test(req.body);
  test.user = req.user;

  test.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the article'
      });
    }
    res.json(test);

  });
};

/**
 * Update an article
 */
exports.update = function(req, res) {
  var test = req.test;

  test = _.extend(test, req.body);

  test.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the article'
      });
    }
    res.json(test);

  });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
  var test = req.test;

  test.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the test'
      });
    }
    res.json(test);

  });
};

/**
 * Show an test
 */
exports.show = function(req, res) {
  res.json(req.test);
};
var counts=0;

exports.count=function(req,res,next){
  Test.find().count().exec(function(err,count){
    if(err){
      return res.status(500).json({
        error:"cannot count the test"
      });
    }else {
      counts = count;
      next();
    }
  });
};
/**
 *
 * List of Articles
 */
exports.all = function(req, res) {
  var begin=req.param('begin');
  var end=req.param('end');
  Test.find().skip(begin).limit(5).sort('-created').populate('user', 'name username').exec(function(err, tests) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the articles'
      });
    };
    var arr=[{tests:tests,count:counts}];
    res.json(arr);
});
};
