'use strict';

//Test service used for Tests REST endpoint
angular.module('mean.tests').factory('Tests', ['$resource',
  function($resource) {


    return $resource('tests/:testId', {
      testId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
