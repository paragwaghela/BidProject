'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global',
  function($scope, Global) {
    $scope.global = Global;
      $scope.myInterval = 2000;
      $scope.slides = [{image: '/images/1.jpeg', text: "Hey This is carsoul1"},
          {image: '/images/111.jpeg', text: "Hey This is carsoul2"},
          {image: '/images/pf2.jpeg', text: "Hey This is carsoul3"}];

  }
]);
