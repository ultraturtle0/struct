angular.module('Database')
    .controller('RepairsController', ['$scope', 'JobService', 'daterangeFilter', function($scope, JobService, daterangeFilter) {
        
        $scope.getData = function(query) {
            JobService
                .repairs
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        console.log(data);
                        $scope.repairs = data;
                    }
                });
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

        var init = function() {
            $scope.select = {};
            $scope.getData({});

            $scope.focus = {
                time_end: new Date()
            };
        }

        init();
    }]);

 