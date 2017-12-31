angular.module('Database')
    .controller('JobController', ['$scope', '$location', '$window', 'JobService', 'daterangeFilter', function($scope, $location, $window, JobService, daterangeFilter) {
        
        $scope.getJobs = function(query) {
            JobService
                .jobs
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        $scope.jobs = data;
                    }
                });
        };

        $scope.showJob = function(job) {
            $window.location.href = 'labor?job=' + job;
        }

        var init = function() {
            $scope.getJobs({});
        }

        init();
    }]);

 