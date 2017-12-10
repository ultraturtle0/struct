angular.module('Database')
    .controller('JobController' ['$scope', 'API', function($scope, API) {
        
        $scope.getJobs = function(query) {
            API
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

