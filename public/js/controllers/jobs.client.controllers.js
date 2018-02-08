angular.module('Database')
    .controller('JobController', ['$scope', '$location', '$window', 'JobService', 'daterangeFilter', function($scope, $location, $window, JobService, daterangeFilter) {
        
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

        $scope.showJob = function(job) {
            $window.location.href = '/dashboard/labor?job=' + job;
        }

        var init = function() {
            $scope.fpOptions = {
                noCalendar: false,
                altInput: true,
                altFormat: 'm-d-Y',
                dateFormat: 'Z'
            };

            getData('jobs');
        }

        init();
    }]);

 
