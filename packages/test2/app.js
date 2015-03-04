'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Test2 = new Module('test2');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Test2.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Test2.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Test2.menus.add({
        title: 'test2 example page',
        link: 'test2 example page',
        roles: ['authenticated'],
        menu: 'main'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Test2.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Test2.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Test2.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Test2;
});
