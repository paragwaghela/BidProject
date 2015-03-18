'use strict';

angular.module('mean.meanutils').config(['$stateProvider', '$locationProvider',
    function($stateProvider, $locationProvider) {

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
            })
        .state('project for bid', {
            url: '/meanutils/example/project/bid/:projectId',
            templateUrl: 'meanutils/views/biding.html'
        })
        .state('project Assing', {
            url: '/meanutils/example/project/assing/:projectId/:userId',
            templateUrl: 'meanutils/views/assingProject.html'
        })
        .state('users', {
            url: '/meanutils/users',
            templateUrl: 'meanutils/views/userList.html'
        })
        .state('user add', {
            url: '/meanutils/users/createUser',
            templateUrl: 'meanutils/views/createUser.html'
        })
        .state('user by id', {
            url: '/meanutils/users/:userId',
            templateUrl: 'meanutils/views/updateUser.html'
       })
        .state('Account ', {
             url: '/meanutils/example/user/account',
             templateUrl: 'meanutils/views/account.html'
        }).state("UploadImage",{
           url: '/meanutils/example/uploadImage',
           templateUrl:'meanutils/views/account.html'
        })
        .state('project update', {
            url: '/meanutils/example/project/update/:projectId',
            templateUrl: 'meanutils/views/updateProjectDetail.html'
        });
    }
]);
