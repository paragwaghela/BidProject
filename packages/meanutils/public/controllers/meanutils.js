'use strict';

angular.module('mean.meanutils').controller('MeanutilsController', ['$scope', 'Global', 'Meanutils',
    function($scope, Global, Meanutils) {
        $scope.global = Global;
        $scope.package = {
            name: 'meanutils'
        };
        $scope.menuUtil = ['Project','User'];
        $scope.all = function(){

        };
    }
]);
