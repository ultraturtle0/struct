angular.module('Database')
    .controller('TravelController', ['$scope', 'JobService', 'daterangeFilter', 'jobfilterFilter', function($scope, JobService, daterangeFilter, jobfilterFilter) {
        
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

        $scope.sumMiles = function (filtered) {
            var miles = 0;
            filtered.forEach(function(value) {
                miles += value.MILES;
            });
            return miles;
        }

        $scope.sumHours = function (filtered) {
            var hours = 0;
            filtered.forEach(function(value) {
                hours += value.HOURS;
            });
            return hours;
        }

        var init = function() {
            $scope.select = {};

            let queries = ['travels', 'vehicles', 'jobs', 'employees'];
            queries.forEach(getData);

            $scope.focus = {
                time_end: new Date()
            };
        }

        init();
    }]);

 