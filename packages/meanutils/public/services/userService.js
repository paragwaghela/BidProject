/**
 * Created by arunsahni on 3/11/15.
 */

'use strict';
angular.module('mean.meanutils').factory('userService', ['$resource',
    function($resource) {
        return $resource('/users/:userId', {
            userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
