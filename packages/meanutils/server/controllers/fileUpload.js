/**
 * Created by sumasoft on 3/16/15.
 */
'use strict';

var fs = require('fs'),
    config = require('meanio').loadConfig(),
    mkdirOrig = fs.mkdir,
    directory = config.root + '/images',
    osSep = '/';


function rename(file, dest,filename, user, callback) {
    fs.rename(file.path, directory + dest + filename, function(err) {
        if (err) throw err;
        else
            callback({
                success: true,
                file: {
                    src: '/images' + dest + filename,
                    name: filename,
                    size: file.size,
                    type: file.type,
                    created: Date.now(),
                    createor: (user) ? {
                        id: user.id,
                        name: user.name
                    } : {}
                }
            });
    });
}

function mkdir_p(path, callback, position) {
    var parts = require('path').normalize(path).split(osSep);

    position = position || 0;

    if (position >= parts.length) {
        return callback();
    }

    var directory = parts.slice(0, position + 1).join(osSep) || osSep;
    fs.stat(directory, function(err) {
        if (err === null) {
            mkdir_p(path, callback, position + 1);
        } else {
            mkdirOrig(directory, function(err) {
                if (err && err.code !== 'EEXIST') {
                    return callback(err);
                } else {
                    mkdir_p(path, callback, position + 1);
                }
            });
        }
    });
}

exports.upload = function(req, res) {
    var path = directory + req.body.dest;
    console.log(req.body.dest);
    if(req.files.file.type == 'image/jpeg')
        var filename = req.user._id+".png";
    else
        var filename = req.files.file.name;
    if (!fs.existsSync(path)) {
        mkdir_p(path, function(err) {
            rename(req.files.file, req.body.dest, filename,req.user, function(data) {
                res.jsonp(data);
            });
        });
    } else {
        rename(req.files.file, req.body.dest,filename, req.user, function(data) {
             res.jsonp(data);
        });
    }
};