angular.module('Database')
    .controller('TravelController', ['$scope', 'JobService', 'daterangeFilter', function($scope, JobService, daterangeFilter) {
        
        $scope.getTrips = function(query) {
            JobService
                .travel
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        console.log(data);
                        $scope.trips = data;
                    }
                });
        };

        var init = function() {
            $scope.select = {};
            $scope.getTrips({});

            $scope.focus = {
                time_end: new Date()
            };
            $scope.$watch('select.JOB_START_ID', function () {
                console.log($scope.select);
            });
        }

        init();
    }]);

 