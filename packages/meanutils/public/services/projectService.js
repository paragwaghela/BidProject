/**
 * Created by sumasoft on 3/5/15.
 */
'use strict';

//Project service used for articles REST endpoint
angular.module('mean.meanutils').factory('ProjectService', ['$resource',
    function($resource) {
        return $resource('meanutils/example/projects/:projectId', {
            projectId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
