'use strict';

angular.module('mean.tests').controller('TestController', ['$scope', '$stateParams', '$location', 'Global', 'Tests',
  function($scope, $stateParams, $location, Global, Tests) {
    $scope.filteredTodos=[];
    $scope.tests=[];
    $scope.global = Global;
    $scope.currentPage=1;
    $scope.perPage=5;
    $scope.maxSize=1;
    $scope.hasAuthorization = function(test) {
      if (!test || !test.user) return false;
      return $scope.global.isAdmin || test.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var test = new Tests({
          title: this.title,
          content: this.content,
          marks: this.marks
        });
        test.$save(function(response) {
          $location.path('tests/' + response._id);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(index,test) {
       /*if (test) {
        test.$remove(function(response) {
          for (var i in $scope.tests) {
            if ($scope.tests[i] === test) {
	      $scope.tests.splice(i,1);
            }
          }
          $location.path('tests');
        });
      } else {
        $scope.test.$remove(function(response) {
          $location.path('tests');
        });
      }*/
      $scope.test = Tests.get({
        testId: test
      }, function() {
        $scope.test.$delete(function() {
          $scope.tests.splice(index, 1);
          $location.path('tests');
        });
      });
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var test = $scope.test;
        if(!test.updated) {
          test.updated = [];
        }
        test.updated.push(new Date().getTime());

        test.$update(function() {
          $location.path('tests/' + test._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      var begin=0;
      var end=5;
       Tests.query({begin: begin,end: end},function(tests) {

         $scope.totalItems=tests[0].count;
         $scope.currentPage=1;
         $scope.perPage=5;
         $scope.numP= Math.ceil($scope.totalItems/$scope.perPage);
         $scope.maxSize=1;

         $scope.$watch('currentPage + numPerPage', function() {

           $scope.filteredTodos=[];
           var begin = (($scope.currentPage - 1) * $scope.perPage)
               , end = begin + $scope.perPage;
           Tests.query({begin: begin, end : end},function(tests1){

             $scope.tests = tests1[0].tests;

             $scope.filteredTodos = $scope.tests;

           });
         });
       });
    };

  /*$scope.find=function(){
    Tests.query(function(tests) {
      $scope.filteredTodos = tests;
    });

  }*/
    $scope.findOne = function() {
      Tests.get({
        testId: $stateParams.testId
      }, function(test) {
        $scope.test = test;

      });
    };
  }
]);
