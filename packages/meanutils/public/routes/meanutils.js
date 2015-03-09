'use strict';

angular.module('mean.meanutils').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('meanutils', {
            url: '/meanutils',
            templateUrl: 'meanutils/views/index.html'
        })
        .state('project', {
            url: '/meanutils/example/projects',
            templateUrl: 'meanutils/views/list.html'
        })
        .state('project add', {
            url: '/meanutils/example/project/add',
            templateUrl: 'meanutils/views/addProject.html'
        })
        .state('project by id', {
            url: '/meanutils/example/project/:projectId',
            templateUrl: 'meanutils/views/view.html'
         });
    }
]);
