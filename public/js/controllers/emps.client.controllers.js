angular.module('Database')
    .controller('EmpController', ['$scope', '$window', 'JobService', function($scope, $window, JobService) {
        
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

        $scope.showEmp = function(emp) {
            $window.location.href = '/labor?emp=' + emp;
        }

        var init = function() {
            $scope.getEmps({});
        }

        init();
    }]);

 