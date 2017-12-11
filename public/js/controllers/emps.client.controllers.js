angular.module('Database')
    .controller('EmpController', ['$scope', 'JobService', function($scope, JobService) {
        
        $scope.getEmps = function(query) {
            JobService
                .employees
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        $scope.emps = data;
                    }
                });
        };

        var init = function() {
            $scope.getEmps({});
        }

        init();
    }]);

 