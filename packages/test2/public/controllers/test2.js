'use strict';

angular.module('mean.test2').controller('Test2Controller', ['$scope', 'Global', 'Test2',
    function($scope, Global, Test2) {
        $scope.global = Global;
        $scope.package = {
            name: 'test2'
        };
    }
]);
