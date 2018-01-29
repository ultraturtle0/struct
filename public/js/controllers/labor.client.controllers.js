angular.module('Database')
    .controller('LaborController', ['$scope', 'JobService', 'daterangeFilter', function($scope, JobService, daterangeFilter) {
        
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

            let queries = ['labors', 'jobs', 'employees', 'works', 'trades'];
            queries.forEach(getData);
            
            $scope.searches = [];
        }

        init();
    }]);

 