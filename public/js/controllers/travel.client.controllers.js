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

        $scope.getVehicles = function(query) {
            JobService
                .vehicles
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        console.log(data);
                        $scope.vehicles = data;
                    }
                });
        };

        $scope.getJobs = function(query) {
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
        };

        $scope.getEmps = function(query) {
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
            $scope.select = {};
            $scope.getTrips({});
            $scope.getVehicles({});
            $scope.getJobs({});
            $scope.getEmps({});

            $scope.focus = {
                time_end: new Date()
            };
        }

        init();
    }]);

 