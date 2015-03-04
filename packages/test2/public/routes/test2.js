'use strict';

angular.module('mean.test2').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('test2 example page', {
            url: '/test2/example',
            templateUrl: 'test2/views/index.html'
        });
    }
]);
