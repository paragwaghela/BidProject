'use strict';

angular.module('mean.meanutils').controller('MeanutilsController', ['$scope', '$location','Global', 'MenuService','ProjectService','$stateParams',
    function($scope, $location,Global, MenuService, ProjectService, $stateParams) {
        $scope.project={};
        $scope.global = Global;
        $scope.package = {
            name: 'meanutils'
        };
        /*$scope.tinyoptions = {
            resize: false,
            width: 400,  // I *think* its a number and not '400' string
            height: 300,
            plugins: 'print textcolor',
            toolbar: "undo redo styleselect bold italic print forecolor backcolor"
        };*/
        $scope.menuUtil = [ {title: 'Project', link:'#!/meanutils/example/projects'},
                            {title:'User', link: ''},
                            {title: 'Add project',link: '#!/meanutils/example/project/add' }
                          ];


        MenuService.query(function (menu) {
            console.log('Inside----');
            console.log(menu[0].menuName);
            console.log(menu[0].submenu);
            $scope.menuUtil = [{title: menu[0].menuName, subMenu: menu[0].submenu}];
        });

        $scope.addProject = function(isValid) {
            if (isValid) {

                var project = new ProjectService({
                    title: this.title,
                    deadline: this.deadline,
                    discription: this.discription,
                    price: this.price
                });
                console.log(project);
                project.$save(function (response) {
                    $scope.project=response;
                    $location.path('/meanutils/example/project/'+response._id);
                });
                this.title = '';
                this.discription = '';
                this.deadline='';
                this.price='';
            } else {
                $scope.submitted = true;
            }
        };

        $scope.all = function () {
            ProjectService.query(function (projects) {
                $scope.projects = projects;
                console.log("Projects",projects);
            });
        };
        $scope.findOne = function() {
            window.alert($scope.project);
            window.alert($stateParams.projectId);
            ProjectService.get({
                projectId: $stateParams.projectId
            }, function(project) {
                $scope.project = project;
            });
        };
    }
]);
