angular.module('Database')
    .controller('JobController', ['$scope', '$location', 'JobService', 'daterangeFilter', function($scope, $location, JobService, daterangeFilter) {
        
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

        var init = function() {
            $scope.getJobs({});
        }

        init();
    }]);

 