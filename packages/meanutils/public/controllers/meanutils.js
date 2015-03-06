'use strict';

<<<<<<< HEAD
angular.module('mean.meanutils').controller('MeanutilsController', ['$scope', 'Global', 'Meanutils','ProjectService',
    function($scope, Global, Meanutils, projectService) {
=======
angular.module('mean.meanutils').controller('MeanutilsController', ['$scope', 'Global', 'MenuService',
    function($scope, Global, MenuService) {
>>>>>>> ea6c5b14f390f946a135af9f5e23b2efe78ddde1
        $scope.global = Global;
        $scope.package = {
            name: 'meanutils'
        };
<<<<<<< HEAD
        $scope.menuUtil = [ {title: 'Project', link:'#!/meanutils/example/project'},
                            {title:'User', link: ''},
                            {title: 'Add project',link: '#!/meanutils/example/project/add' }
                          ];
        $scope.addProject = function(isValid){
            if(isValid) {
                var project = new projectService({
                    title: this.title,
                    deadline :this.deadline,
                    discription: this.discription,
                    price : this.price
                });
               console.log(project);
                project.$save(function(response) {
                    $location.path('meanutils/example/project/');
                });
=======

        MenuService.query(function(menu) {
            console.log('Inside----');
            console.log(menu[0].menuName);
            console.log(menu[0].submenu);
            $scope.menuUtil = [ {title: menu[0].menuName, subMenu: menu[0].submenu}];
        });

        $scope.all = function(){
>>>>>>> ea6c5b14f390f946a135af9f5e23b2efe78ddde1

                this.title = '';
                this.discription = '';
            } else {
                $scope.submitted = true;
            }          ;
        }
        $scope.all = function(){
            projectService.query(function(projects) {
               $scope.projects = projects;
             });
        };
    }
]);
