/**
 * Created by arunsahni on 3/5/15.
 */
'use strict';

angular.module('mean.meanutils').factory('MenuService', ['$resource',
    function($resource) {
        return $resource('meanutils/:menuId', {
            menuId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
