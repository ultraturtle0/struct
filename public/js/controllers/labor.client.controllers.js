angular.module('Database')
    .controller('EmpController', ['$scope', 'JobService', function($scope, JobService) {
        
        $scope.getEmps = function(query) {
            JobService
                .labor
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        $scope.labors = data;
                    }
                });
        };

        var init = function() {
            $scope.getEmps({});
        }

        init();
    }]);

 