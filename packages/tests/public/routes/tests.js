'use strict';

//Setting up route
angular.module('mean.tests').config(['$stateProvider',
  function($stateProvider) {
     // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
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

    // states for my app
    $stateProvider
      .state('all test', {
        url: '/tests',
        templateUrl: 'tests/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create test', {
        url: '/tests/create',
        templateUrl: 'tests/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit test', {
        url: '/tests/:testId/edit',
        templateUrl: 'tests/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('count tests',{
        url:'tests/count',
        templateUrl: 'tests/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('test by id', {
        url:'/tests/:testId',
        templateUrl: 'tests/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
