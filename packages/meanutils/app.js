'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Meanutils = new Module('meanutils');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Meanutils.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Meanutils.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Meanutils.menus.add({
        title: 'MeanUtilities',
        link: 'meanutils',
        roles: ['user','superadmin','admin'],
        menu: 'main'
    });

    return Meanutils;
});
