angular.module('Database')
    .controller('LaborController', ['$scope', 'JobService', 'daterangeFilter', function($scope, JobService, daterangeFilter) {
        
        $scope.getLabors = function(query) {
            JobService
                .labor
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        console.log(data);
                        $scope.labors = data;
                    }
                });
        };

        var init = function() {
            $scope.getLabors({});
            $scope.focus = {
                time_end: new Date()
            };
            $scope.$watch('focus.time_start', function () {
                console.log($scope.focus.time_start);
            });
            console.log($scope.labors);
        }

        init();
    }]);

 