/**
 * Created by sumasoft on 3/4/15.
 */
'use strict'

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Project = mongoose.model('Projects'),
    _ = require('lodash');

/**
 * Find project by id
 */
exports.project = function(req, res, next, id) {
    Project.load(id, function(err, project) {
        if (err) return next(err);
        if (!project) return next(new Error('Failed to load article ' + id));
        req.project = project;
        next();
    });
};
exports.create=function(req,res){
    var project = new Project(req.body);
    project.createdBy = req.use;
    console.log(req.body);
    project.save(function(err,data){
       if(err)
          return res.status(500).json({
          error: 'Cannot list the project'
       });
       else {
           res.json(data);
       }
    });
};

exports.all=function(req,res){
  Project.find({},function(err,projects){
      if(err){
          return res.status(500).json({
              error: 'Cannot list the articles'
          });
      }else
        res.json(projects);
  });
};

exports.show = function(req, res) {
    console.log("here",req.project);
    res.json(req.project);
};
