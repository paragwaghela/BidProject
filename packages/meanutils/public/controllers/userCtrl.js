/**
 * Created by arunsahni on 3/11/15.
 */
'use strict';

angular.module('mean.meanutils').controller('usersController', ['$scope', '$location','Global', 'MenuService','userService','$stateParams',
    function($scope, $location, Global, MenuService, userService, $stateParams) {

        $scope.user = {};
        $scope.menuUtil = [];
        $scope.filteredTodos = [];
        $scope.id = $stateParams.userId;

        $scope.global = Global;
        //console.log("Global value",$scope.global.user.roles[0]);
        $scope.package = {
            name: 'meanutils'
        };

        $scope.currentPage = 1;
        $scope.maxSize = 2;

        $scope.itemsPerPage= 5;


        var pagCount,
            begin = 0;

        $scope.onSelect = function(item){
            console.log(item)
            $location.path('/meanutils/users');
        };

        $scope.all = function () {
            userService.query({
                begin: begin
            }, function (users) {

                pagCount = users[0].count;

                $scope.totalItems = pagCount;
                $scope.currentPage = 1;
                $scope.maxSize = 2;
                $scope.itemsPerPage = 5;
                $scope.numofPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);

                $scope.$watch('currentPage + numPerPage', function () {
                    $scope.filteredTodos = [];


                    var begin = (($scope.currentPage -1) * $scope.itemsPerPage);


                    userService.query({
                        begin: begin
                    }, function (data) {
                        $scope.filteredTodos = data[0].users;

                    });
                });
            });
        };

        MenuService.query({role: $scope.global.user.roles[0]}, function (menu) {
            $scope.menuUtil = menu;
        });

        $scope.createUser = function (isValid) {

            if( $scope.id) {
                var userd = $scope.user;

                userd.$update(function() {
                    $location.path('/meanutils/users');
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            } else {
                var user = new userService({
                    name: $scope.user.name,
                    email: $scope.user.email,
                    username: $scope.user.username,
                    password: $scope.user.password,
                    confirmPassword: $scope.user.confirmPassword,
                    roles: ['user']
                });

                user.$save(function (response) {
                    $location.path('/meanutils/users');
                });

                $scope.submitted = true;
            }

        };

        $scope.findOne = function() {
            userService.get({
               userId: $stateParams.userId
            }, function (user) {
                $scope.user = user;
            });
        };

        $scope.remove = function(index, userId) {
            $scope.user = userService.get({
                userId: userId
            }, function() {
                $scope.user.$delete(function() {
                    $scope.filteredTodos.splice(index, 1);
                    $location.path('/meanutils/users');
                    console.log('Deleted');
                });
            });
        };

    }
]);



