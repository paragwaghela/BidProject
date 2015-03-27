'use strict';

angular.module('mean.meanutils').config(['$stateProvider', '$locationProvider',
    function ($stateProvider, $locationProvider) {

        // Check if the user is not connected
        var checkLoggedOut = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        $stateProvider
            .state('meanutils', {
            url: '/meanutils',
            templateUrl: 'meanutils/views/index.html',
            resolve: {
                loggedin: checkLoggedOut
            }
            })
            .state('project', {
                url: '/meanutils/example/projects',
                templateUrl: 'meanutils/views/list.html',
                resolve: {
                    loggedin: checkLoggedOut
                }
            })
            .state('projectL', {
                url: '/meanutils/example/projects/:status',
                templateUrl: 'meanutils/views/list.html'
            })

            .state('project add', {
                url: '/meanutils/example/project/add',
                templateUrl: 'meanutils/views/addProject.html',
                resolve: {
                    loggedin: checkLoggedOut
                }
            })
            .state('project by id', {
                url: '/meanutils/example/project/:projectId',
                templateUrl: 'meanutils/views/view.html',
                resolve: {
                    loggedin: checkLoggedOut
                }
            })
            .state('project for bid', {
                url: '/meanutils/example/project/bid/:projectId',
                templateUrl: 'meanutils/views/biding.html',
                resolve: {
                    loggedin: checkLoggedOut
                }
            })
            .state('project Assing', {
                url: '/meanutils/example/project/assing/:projectId/:userId',
                templateUrl: 'meanutils/views/assingProject.html',
                resolve: {
                    loggedin: checkLoggedOut
                }
            })
            .state('users', {
                url: '/meanutils/users',
                templateUrl: 'meanutils/views/userList.html',
                resolve: {
                    loggedin: checkLoggedOut
                }
            })
            .state('user add', {
                url: '/meanutils/users/createUser',
                templateUrl: 'meanutils/views/createUser.html',
                resolve: {
                    loggedin: checkLoggedOut
                }
            })
            .state('user by id', {
                url: '/meanutils/users/:userId',
                templateUrl: 'meanutils/views/updateUser.html',
                resolve: {
                    loggedin: checkLoggedOut
                }
            })
            .state('Account ', {
                url: '/meanutils/example/user/account',
                templateUrl: 'meanutils/views/account.html',
                resolve: {
                    loggedin: checkLoggedOut
                }

            }).state("UploadImage", {
                url: '/meanutils/example/uploadImage',
                templateUrl: 'meanutils/views/account.html',
                resolve: {
                    loggedin: checkLoggedOut
                }
            })
            .state('project update', {
                url: '/meanutils/example/project/update/:projectId',
                templateUrl: 'meanutils/views/updateProjectDetail.html',
                resolve: {
                    loggedin: checkLoggedOut
                }
            })
            .state('menus ', {
                url: '/meanutils/menu/menuList',
                templateUrl: 'meanutils/views/menuList.html'
            })
            .state('menu by id', {
                url: '/meanutils/:menuId',
                templateUrl: 'meanutils/views/updateMenu.html'
            })
            .state('menu ', {
                url: '/meanutils/menu/addMenu',
                templateUrl: 'meanutils/views/addMenu.html',
                resolve: {
                    loggedin: checkLoggedOut
                }
            })
            .state('My project', {
                url: '/meanutils/example/myProjects',
                templateUrl: 'meanutils/views/myProjects.html',
                resolve: {
                    loggedin: checkLoggedOut
                }
            });
    }
]);
