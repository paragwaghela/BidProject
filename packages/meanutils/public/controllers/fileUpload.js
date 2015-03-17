/**
 * Created by sumasoft on 3/16/15.
 */
angular.module('mean.meanutils').controller('FileUploadController', ['$scope', 'Global',
    function($scope, Global) {
        $scope.global = Global;
        $scope.images = [];
        $scope.files = [];
        $scope.package = {
            name: 'meanutils'
        };
        $scope.count=0;
        $scope.images = [];

        $scope.uploadFileCallback = function(file) {
            console.log("Here");
            if (file.type.indexOf('image') !== -1){
                $scope.images.push(file);
                $scope.addSlide(file.src);
                $scope.count=1;
            }
            else{
                $scope.files.push(file);
            }
        };

        $scope.uploadFinished = function(files) {

            console.log(files);
        };

        $scope.myInterval = 5000;
        var slides = $scope.slides = [];
        $scope.addSlide = function(url) {

//           var newWidth = 600 + slides.length;
            slides.push({
                image: url
            });
        };
    }
]);
