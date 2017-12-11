angular.module('Database')
    .controller('JobController', ['$scope', 'JobService', function($scope, JobService) {
        
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

 