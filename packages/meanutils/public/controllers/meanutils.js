'use strict';


angular.module('mean.meanutils').controller('MeanutilsController', ['$scope', 'Global', 'Meanutils','ProjectService',
    function($scope, Global, Meanutils, projectService) {
        $scope.global = Global;
        $scope.package = {
            name: 'meanutils'
        };

        $scope.menuUtil = [ {title: 'Project', link:'#!/meanutils/example/project'},
                            {title:'User', link: ''},
                            {title: 'Add project',link: '#!/meanutils/example/project/add' }
                          ];
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
                    $location.path('meanutils/example/project/');
                });
                this.title = '';
                this.discription = '';
            } else {
                $scope.submitted = true;
            }
        };
        MenuService.query(function(menu) {
            console.log('Inside----');
            console.log(menu[0].menuName);
            console.log(menu[0].submenu);
            $scope.menuUtil = [ {title: menu[0].menuName, subMenu: menu[0].submenu}];
        });

        $scope.all = function(){
            projectService.query(function(projects) {
               $scope.projects = projects;
             });
        };
    }
]);
