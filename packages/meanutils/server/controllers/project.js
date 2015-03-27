/**
 * Created by sumasoft on 3/4/15.
 */
'use strict'

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Project = mongoose.model('Projects'),
    _ = require('lodash'),
    User = mongoose.model('User');

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

var count = 0;
exports.count = function (req, res , next) {
    Project.find().count().exec(function(err, projects) {
        if(err) {
            return res.status(400).send({

            });
        } else {
            count= projects;
            console.log('Exact count', count);
            next();
        }
    });
};

exports.all=function(req,res){
    var i = req.param('begin');

  Project.find().skip(i).sort('-created').limit(10).exec(function(err,projects){
      if(err){
          return res.status(500).json({
              error: 'Cannot list the articles'
          });
      }else
      var arr = [{projects: projects, count: count}];


        res.send(arr);
  });

};

exports.show = function(req, res) {
    console.log("Project",req.project)
    res.json(req.project);
};

exports.updateProject = function(req, res){
    console.log("Here",req.body);
    var project = req.project;

    project = _.extend(project, req.body);

    project.save(function(err) {
        if (err) {
            return res.status(400).send({
                error: 'Cannot save'
            });
        } else {
            res.json(project);
        }
    });
}

exports.uploadFiles = function(req,res){
    console.log(req.body);
    Project.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body.projectId)},{$push:{uploadedFiles : req.body.uploadedFiles}}).exec(function(err,data) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot add the bid'
            });
        } else {
            res.json(data);
        }
    });
}

/**
 * Update an Project
 */
exports.update = function(req, res) {
    Project.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body.projectId)},{$push:{ bid : req.body.bid}}).exec(function(err,data) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot add the bid'
            });
        } else {
            res.json(data);
        }
    });
};
/*
* Delete Project
*
* */
exports.deleteProject = function(req, res) {
    var project = req.project;

    project.remove(function(err) {
        if (err) {
            return res.status(400).send({
                error: 'Cannot delete the user'
            });
        } else {
            res.json(project);
        }
    });
};

exports.myProject = function(req,res){
    console.log("Here In my project",req.body.userId);
    Project.find({'assingProjectTo' : req.body.userId}).exec(function(err,data){
       if(err) {
           return res.status(500).json({
               error: "Projects not able to find"
           });
       }else {
           console.log(data);
           res.json(data);
           }
    });
}
