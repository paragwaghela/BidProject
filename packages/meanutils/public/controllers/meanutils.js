'use strict';

angular.module('mean.meanutils').controller('MeanutilsController', ['$scope', 'Global', 'MenuService','ProjectService','$location',
    function($scope, Global, MenuService, projectService, $location) {

        $scope.global = Global;

        $scope.package = {
            name: 'meanutils'
        };

        $scope.filteredTodos = [];
        $scope.currentPage = 1;
        $scope.maxSize = 2;
        $scope.itemsPerPage= 5;

        var pagCount,
            begin = 0;

        $scope.all = function () {
            projectService.query({
                begin: begin
            }, function (projects) {

                pagCount = projects[0].count;

                $scope.totalItems = pagCount;
                $scope.currentPage = 1;
                $scope.maxSize = 2;
                $scope.itemsPerPage = 5;
                $scope.numofPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);

                $scope.$watch('currentPage + numPerPage', function () {
                    $scope.filteredTodos = [];
                    var begin = (($scope.currentPage -1) * $scope.itemsPerPage);

                    projectService.query({
                        begin: begin
                    }, function (data) {
                        $scope.filteredTodos = data[0].projects;
                    });
                });
            });
        };

        MenuService.query(function (menu) {
            $scope.menuUtil = [{title: menu[0].menuName, subMenu: menu[0].submenu}];
        });

        $scope.addProject = function(isValid) {
            if (isValid) {
                var project = new projectService({
                    title: this.title,
                    deadline: this.deadline,
                    discription: this.discription,
                    price: this.price
                });
                console.log(project);
                project.$save(function (response) {
                    $location.path('/meanutils/example/project/' + response._id);

                });

                this.title = '';
                this.discription = '';
            } else {
                $scope.submitted = true;
            }
        };

        $scope.findOne = function () {
            window.alert($scope.project);
            window.alert($stateParams.projectId);
            ProjectService.get({
                projectId: $stateParams.projectId
            }, function (project) {
                $scope.project = project;
            });
        };

    }
]);
