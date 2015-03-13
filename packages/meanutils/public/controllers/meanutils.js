'use strict';


angular.module('mean.meanutils').controller('MeanutilsController', ['$scope', '$location','$http','Global', 'MenuService','ProjectService','$stateParams','MeanUser','fileReader',
    function($scope, $location,$http,Global, MenuService, ProjectService, $stateParams,MeanUser,fileReader) {

        $scope.project = {};
        $scope.menuUtil = [];
        $scope.filteredTodos = [];


        MenuService.query({role: Global.user.roles[0]}, function (menu) {
            console.log('menu data', menu);
            $scope.menuUtil = menu;
        });



        $scope.global = Global;
        $scope.currentDate = new Date();

        $scope.myInterval = 2000;
        $scope.slides = [{image: '/images/aa.jpeg',text: "Hey This is carsoul"},
                 {image: '/images/av.jpeg', text: "Hey This is carsoul"},
                 {image: '/images/gt.jpeg', text: "Hey This is carsoul"},
                 {image: '/images/pf1.jpeg', text: "Hey This is carsoul"},
                 {image: '/images/pf2.jpeg', text: "Hey This is carsoul"}];

        $scope.package = {
            name: 'meanutils'
        };
        $scope.assingUser ={};
        $scope.filteredTodos = [];

        $scope.currentPage = 1;
        $scope.maxSize = 2;

        $scope.itemsPerPage= 5;
        $scope.files = [];

        $scope.getFile = function () {
            $scope.progress = 0;
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    $scope.imageSrc = result;
                });
        };

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




        $scope.addProject = function (isValid) {

            if (isValid) {
                var project = new ProjectService({
                    title: this.title,
                    deadline: this.deadline,
                    discription: this.discription,
                    price: this.price,
                    createdBy : $scope.global.user._id,
                    createdUserName : $scope.global.user.username
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
                window.alert("else Add project");
                $scope.submitted = true;
            }
        };
        function findUserfromId(UserId){
            $http.get('/users/:' + UserId).success(function(data){
                $scope.userdata=data;
                console.log(data);
            });
        }
        $scope.findOne = function() {

            $scope.allow = true;
            ProjectService.get({
                projectId: $stateParams.projectId
            }, function (project) {
                $scope.project = project;
                $scope.bidUsers = project.bid;
                var diff = Math.floor((new Date(project.deadline).getTime() / 86400000) - (new Date().getTime() / 86400000) + 1);
                if(diff < 0 )
                  $scope.allow = false;
                    for(var i=0; i < $scope.bidUsers.length;i++) {
                        if (($scope.bidUsers[i].userId === $scope.global.user._id)){
                            $scope.allow = false;
                        }

                    }

            });
        };
        $scope.addBinding = function(isValid){
            if (isValid) {
                var project = new ProjectService({
                    bid: {
                        userId: $scope.global.user._id,
                        userName: $scope.global.user.username,
                        bid: this.bid,
                        day: this.day,
                        initialmileston : this.milestone
                    },
                    projectId : $stateParams.projectId
                });

                project.$update(function () {
                    console.log(project);
                    $location.path('//meanutils/example/projects');
                });
            }else {
                 $scope.submitted = true;
             }
        };
        $scope.findBidUsers = function(){

        };
        $scope.UsersOnProject = function(){

            ProjectService.get({
                projectId: $stateParams.projectId
            }, function (project) {
                $scope.project = project;
                $scope.users = project.bid;
            });
        };
        $scope.account = function(){
           $http.get('/users/me').success(function(data){
               $scope.userdata=data;
               console.log(data);
            });
        }
    }
]);
