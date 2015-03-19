/**
 * Created by arunsahni on 3/19/15.
 */

'use strict';

angular.module('mean.meanutils').controller('menuController', ['$scope', '$location','Global', 'MenuService','$stateParams',
    function($scope, $location, Global, menuService, $stateParams) {

        $scope.submenu = [{}];
        $scope.roles = [];
        $scope.value1 = "Admin";
        $scope.value2 ="User";
        $scope.id = $stateParams.menuId;

        $scope.global = Global;

        $scope.addOp = function() {
            if($scope.submenu.value1 == true){
                $scope.submenu.value1 = 'admin';
            } else {
                $scope.submenu.value1 = '';
            }
            if($scope.submenu.value2 == true){
                $scope.submenu.value2 = 'user';
            } else {
                $scope.submenu.value2 = '';
            }

            $scope.roles.push($scope.submenu.value1, $scope.submenu.value2);
            $scope.submenu.push({title: $scope.submenu.title, reference:$scope.submenu.reference, roles: $scope.roles });
            console.log($scope.submenu);
           // $scope.submenu.push({});


        };

        $scope.deleteOp = function(idx) {
            $scope.submenu.splice(idx, 1);
        };
        $scope.createMenu = function (isValid) {


            if( $scope.id) {
                var menu1 = $scope.user;

                menu1.$update(function() {
                    $location.path('/meanutils/users');
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            } else {
                var menu = new menuService({
                    menuName: $scope.menuName,
                    submenu: $scope.submenu
                });

                menu.$save(function (response) {
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



