'use strict';

angular.module('mean.meanutils').controller('MeanutilsController', ['$scope', '$location','Global', 'MenuService','ProjectService','$stateParams',
    function($scope, $location,Global, MenuService, ProjectService, $stateParams) {
        $scope.project = {};


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
            ProjectService.query({
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


                    ProjectService.query({
                        begin: begin
                    }, function (data) {
                        $scope.filteredTodos = data[0].projects;

                    });
                });
            });
        };

        MenuService.query(function (menu) {
            console.log('Inside----');
            console.log(menu[0].menuName);
            console.log(menu[0].submenu);
            $scope.menuUtil = [{title: menu[0].menuName, subMenu: menu[0].submenu}];
        });

        $scope.addProject = function (isValid) {
            if (isValid) {

                var project = new ProjectService({
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
                this.deadline = '';
                this.price = '';
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

        $scope.findOne = function() {
            ProjectService.get({
                projectId: $stateParams.projectId
            }, function (project) {
                $scope.project = project;
            });
        };

    }
]);
