'use strict';


angular.module('mean.meanutils').controller('MeanutilsController', ['$scope', '$location', '$http', 'Global', 'MenuService', 'ProjectService', 'userService', '$stateParams',
    function ($scope, $location, $http, Global, MenuService, ProjectService, userService, $stateParams) {

        $scope.project = {};
        $scope.menuUtil = [];
        $scope.status='Assing';

        $scope.filteredTodos = [];
        $scope.imageStoreTemp = 'meanutils/assets/img';
        $scope.imgHight = 200;
        $scope.imgWidth = 200;
        $scope.id = $stateParams.userId;

        MenuService.query({role: Global.user.roles[0]}, function (menu) {
            $scope.menuUtil = menu;
        });

        $scope.global = Global;
        console.log( $scope.global.user);
        $scope.currentDate = new Date();

        $scope.myInterval = 2000;
        $scope.slides = [{image: '/images/1.jpeg', text: "Hey This is carsoul1"},
            {image: '/images/111.jpeg', text: "Hey This is carsoul2"},
            {image: '/images/pf2.jpeg', text: "Hey This is carsoul3"}];

        $scope.package = {
            name: 'meanutils'
        };

        $scope.filteredTodos = [];

        $scope.currentPage = 1;
        $scope.maxSize = 2;

        $scope.itemsPerPage = 5;
        $scope.files = [];

        var pagCount,
            begin = 0;
            var i = 0,j=0;

        ProjectService.query(function(proj){
            //console.log("MY Projects",proj)
            $scope.totalProj = proj[0].projects.length;

            angular.forEach(proj[0].projects,function(val){
                if($scope.global.user._id === val.assingProjectTo){
                    i = i + 1;
                } else if(status === 'completed'){
                    j = j + 1;
                }
            });
            $scope.myProj = i;
            $scope.compProj = j;
            console.log("Single val", i);

        });


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

                    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);

                    ProjectService.query({
                        begin: begin
                    }, function (data) {
                        $scope.filteredTodos = data[0].projects;

                    });
                });
            });
        };


        $scope.addProject = function (isValid) {

            if (isValid) {
                var project = new ProjectService({
                    title: this.title,
                    deadline: this.deadline,
                    discription: this.discription,
                    price: this.price,
                    createdBy: $scope.global.user._id,
                    createdUserName: $scope.global.user.username
                });

                project.$save(function (response) {
                    $location.path('/meanutils/example/projects');
                });
                this.title = '';
                this.discription = '';
                this.deadline = '';
                this.price = '';
            } else {
                window.alert("else Add project");
                $scope.submitted = true;
            }
        };

        $scope.findOne = function () {

            $scope.allow = true;
            $scope.expired = false;
            ProjectService.get({
                projectId: $stateParams.projectId
            }, function (project) {
                $scope.project = project;
                $scope.project.deadline =new Date(project.deadline);
                $scope.bidUsers = project.bid;
                var diff = Math.floor((new Date(project.deadline).getTime() / 86400000) - (new Date().getTime() / 86400000) + 1);
                if (diff < 0)
                    $scope.expired = true;
                if ($scope.global.user._id === project.createdBy)
                    $scope.allow = false;
                for (var i = 0; i < $scope.bidUsers.length; i++) {
                    if (($scope.bidUsers[i].userId === $scope.global.user._id)) {
                        $scope.allow = false;
                    }

                }

            });
        };

        $scope.addBinding = function (isValid) {
            if (isValid) {
                var project = new ProjectService({
                    bid: {
                        userId: $scope.global.user._id,
                        userName: $scope.global.user.username,
                        bid: this.bid,
                        day: this.day,
                        initialmileston: this.milestone
                    },
                    projectId: $stateParams.projectId
                });

                project.$update(function () {
                    $location.path('/meanutils/example/projects');
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.UsersOnProject = function () {

            ProjectService.get({
                projectId: $stateParams.projectId
            }, function (project) {
                $scope.project = project;
            });
            userService.get({
                userId: $stateParams.userId
            }, function (user) {
                $scope.assingUser = user;
            });
        };

        $scope.UserDetail = function () {
            userService.get({}, function (user) {
                $scope.userdata = user;
            });
        };

        $scope.account = function () {
            userService.get({
                userId: $scope.global.user._id
            }, function (user) {
                $scope.userdata = user;
            });
        };

        $scope.accountUpdate = function (isValid) {
            var userd = $scope.userdata;
            userd.$update(function () {
                $location.path('/meanutils/example/projects');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };

        $scope.assing = function (userId) {
            var project = $scope.project;
            project.status = "Assing";
            project.assingProject = true;
            project.assingProjectTo = userId;
            project.$update(function () {
                $location.path('/meanutils/example/projects');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };

        $scope.updateProjectDetail = function (isValid) {
            if (isValid) {
                var project = $scope.project;
                project.$update(function (response) {
                    $location.path('/meanutils/example/project/' + response._id);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            } else
                $scope.submitted = true;
        };

        $scope.remove = function (index, projectId) {
            $scope.project = ProjectService.get({
                projectId: projectId
            }, function () {
                $scope.project.$delete(function () {
                    $scope.filteredTodos.splice(index, 1);
                    $location.path('/meanutils/example/projects');
                });
            });
        }
    }
]);
