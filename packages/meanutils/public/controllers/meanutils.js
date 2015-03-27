'use strict';


angular.module('mean.meanutils').controller('MeanutilsController', ['$scope', '$location', '$http', 'Global', 'MenuService', 'ProjectService', 'userService', '$stateParams','$upload',
    function ($scope, $location, $http, Global, MenuService, ProjectService, userService, $stateParams,$upload) {

        $scope.project = {};
        $scope.menuUtil = [];
        $scope.filteredTodos = [];
        $scope.imageStoreTemp = 'meanutils/assets/img';
        $scope.imgHight = 200;
        $scope.imgWidth = 200;
        $scope.id = $stateParams.userId;
        $scope.files = [];
        $scope.uplodingfiles = [];
        var files = [];
        $scope.numbers=["0","10","20","30","40","50","60","70","80","90","100"];
        MenuService.query({role: Global.user.roles[0]}, function (menu) {
            $scope.menuUtil = menu;
        });

        $scope.global = Global;
        //console.log( $scope.global.user.roles[0]);
        $scope.currentDate = new Date();

        $scope.myInterval = 2000;
        $scope.slides = [{image: '/images/aa.jpeg', text: "Hey This is carsoul"},
            {image: '/images/av.jpeg', text: "Hey This is carsoul"},
            {image: '/images/gt.jpeg', text: "Hey This is carsoul"},
            {image: '/images/pf1.jpeg', text: "Hey This is carsoul"},
            {image: '/images/pf2.jpeg', text: "Hey This is carsoul"}];

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
                userService.get({
                    userId: $scope.project.createdBy
                }, function (user) {
                    $scope.Owner = user;
                });
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

        $scope.assigned = function (userId) {
            var project = $scope.project;
            project.status = "Assigned";
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
               /* var $files=$scope.files
                    for (var i = 0; i < $files.length; i++) {
                        var file = $files[i];
                        console.log($upload);
                        $scope.upload = $upload.upload({
                            url: 'fileUpload/upload',
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            data: {
                                dest: '/projectFile/' + $scope.project._id + '/'
                            },
                            file: file
                        }).progress(function (evt) {
                            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                        }).success(function (data, status, headers, config) {
                            if (data.success) {
                                files.push(data.file.name);
                                console.log(files);
                            }

                        });
                    };*/
                   // project.uplodingfiles = $scope.files
                    $scope.uploadFile($scope.files);
                    project.$update(function (response) {
                        $http.post('/uploadFiles',{
                            projectId: $scope.project._id,
                            uploadedFiles : $scope.files
                        }).success(function(data){
                            $location.path('/meanutils/example/project/' + response._id);
                        });
                    }, function (errorResponse) {
                        $scope.error = errorResponse.data.message;
                    });
                }

                //

             else
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
        $scope.myProjects= function(){
            $http.post('/myProjects',{
                    userId : $scope.global.user._id
            }).success(function(data) {
                $scope.MyProjecs = data;
            });
        }

        $scope.uploadFile = function($files) {
           for (var i = 0; i < $files.length; i++) {
               var file = $files[i];
                console.log($upload);
                $scope.upload = $upload.upload({
                    url: 'fileUpload/upload',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    data: {
                        dest: '/projectFile/'+$scope.project._id+'/'
                    },
                    file: file
                }).progress(function(evt) {
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function(data, status, headers, config) {
                    if (data.success) {
                        files.push(data.file.name);
                        console.log(files);
                    }

                });
           };
            console.log(files);
        };
        $scope.uploadFinished = function(files) {
            console.log("uploaded obj", files)
            for(var i=0; i < files.length;i++)
                $scope.files.push({fileName: files[i].name});

        };

    }
]);
