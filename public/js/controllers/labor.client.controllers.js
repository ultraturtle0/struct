angular.module('Database')
    .controller('LaborController', ['$scope', 'JobService', 'daterangeFilter', function($scope, JobService, daterangeFilter) {
        
        $scope.getData = function(query) {
            JobService
                .labor
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        console.log(data);
                        $scope.labors = data;
                    }
                });
            JobService
                .works
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        console.log(data);
                        $scope.works = data;
                    }
                });
            JobService
                .trades
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        console.log(data);
                        $scope.trades = data;
                    }
                });
        };

        $scope.sumHours = function(filtered) {
            var hours = 0;
            filtered.forEach(function(value) {
                hours += value.HOURS;
            });
            return hours;
        }

        var init = function() {
            $scope.getData({});
            $scope.focus = {
                time_end: new Date()
            };
            $scope.$watch('focus.time_start', function () {
                console.log($scope.focus.time_start);
            });
            console.log($scope.labors);
        }

        init();
    }]);

 