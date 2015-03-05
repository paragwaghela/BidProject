'use strict';

angular.module('mean.meanutils').controller('MeanutilsController', ['$scope', 'Global', 'MenuService',
    function($scope, Global, MenuService) {
        $scope.global = Global;
        $scope.package = {
            name: 'meanutils'
        };

        MenuService.query(function(menu) {
            console.log('Inside----');
            console.log(menu[0].menuName);
            console.log(menu[0].submenu);
            $scope.menuUtil = [ {title: menu[0].menuName, subMenu: menu[0].submenu}];
        });

        $scope.all = function(){

        };
    }
]);
