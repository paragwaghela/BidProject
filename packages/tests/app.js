/**
 * Created by sumasoft on 2/18/15.
 */
var Module = require('meanio').Module;
 var Test = new Module('tests');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Test.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Test.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Test.menus.add({
        'roles': ['authenticated'],
        'title': 'Create New Test',
        'link': 'create test'
    });
    Test.menus.add({
        'roles': ['authenticated'],
        'title': 'view Test',
        'link': 'all test'
    });

    //Articles.aggregateAsset('js','/packages/system/public/services/menus.js', {group:'footer', absolute:true, weight:-9999});
    //Articles.aggregateAsset('js', 'test.js', {group: 'footer', weight: -1});

    /*
     //Uncomment to use. Requires meanio@0.3.7 or above
     // Save settings with callback
     // Use this for saving data from administration pages
     Articles.settings({'someSetting':'some value'},function (err, settings) {
     //you now have the settings object
     });

     // Another save settings example this time with no callback
     // This writes over the last settings.
     Articles.settings({'anotherSettings':'some value'});

     // Get settings. Retrieves latest saved settings
     Articles.settings(function (err, settings) {
     //you now have the settings object
     });
     */
    Test.aggregateAsset('css', 'test.css');

    return Test;
});
