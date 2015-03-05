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