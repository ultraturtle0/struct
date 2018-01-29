angular.module('Database')
    .controller('EmpController', ['$scope', '$window', 'JobService', function($scope, $window, JobService) {
        
        var getData = function(query) {
            JobService
                [query]
                .query({})
                .$promise
                .then(function(data) {
                    if (data.length) {
                        $scope[query] = data;
                    }
                });
        };

        $scope.showEmp = function(emp) {
            $window.location.href = '/dashboard/labor?emp=' + emp;
        }

        var init = function() {
            let queries = ['employees'];
            queries.forEach(getData);
        }

        init();
    }]);

 