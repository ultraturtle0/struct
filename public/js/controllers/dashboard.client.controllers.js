angular.module('Database')
    .controller('DashboardController', ['$scope', 'JobService', function($scope, JobService) {
        
        $scope.getData = function(query) {
            JobService
                .jobs
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        console.log(data);
                        $scope.jobs = data;
                    }
                });
            JobService
                .employees
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        console.log(data);
                        $scope.emps = data;
                    }
                });
        };

        var init = function() {
            $scope.getData({});
        }
        $scope.jobs = [];
        $scope.emps = [];
        $scope.select = {};

        $scope.laborSubmit = function () {
            console.log($scope.select);
            JobService
                .labor
                .save({}, $scope.select)
                .$promise
                .then(function(err) {
                    if (err) {
                        console.log(err)
                    }
                });
        }
        init();
    }]);

 