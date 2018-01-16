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
                .jobs
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        console.log(data[0].JOB_NUMBER);
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

        $scope.saveQuery = function(filtered) {
            var search = {};
            angular.forEach($scope.focus, function(value, key) {
                if (key == "time_start" || key == "time_end") {
                    value = new Date(value);
                }
                search[key] = value;
            });
            search.HOURS = $scope.sumHours(filtered);
            $scope.searches.push(search);
        };

        $scope.sumHours = function(filtered) {
            var hours = 0;
            filtered.forEach(function(value) {
                hours += value.HOURS;
            });
            return hours || "";
        };

        var init = function() {
            var params = (new URL(document.location)).searchParams;

            $scope.focus = {
                time_end: new Date()
            };


            if (params.has("emp"))
                $scope.focus.emp = params.get("emp");
            if (params.has("job"))
                $scope.focus.job = parseInt(params.get("job"));

            $scope.getData({});
            
            $scope.searches = [];
        }

        init();
    }]);

 