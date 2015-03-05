/**
 * Created by sumasoft on 3/5/15.
 */
'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.meanutils').factory('ProjectService', ['$resource',
    function($resource) {
        return $resource('projects/:projectId', {
            articleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
