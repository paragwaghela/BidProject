'use strict';

angular.module('mean.meanutils').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('meanutils', {
            url: '/meanutils/example',
            templateUrl: 'meanutils/views/index.html'
        })
        .state('project', {
                url: '/meanutils/example/project',
                templateUrl: 'meanutils/views/list.html'
            });
    }

]);
