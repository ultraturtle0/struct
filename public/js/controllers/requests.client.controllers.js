angular.module('Database')
    .controller('ReqController', ['$scope', '$window', 'JobService', function($scope, $window, JobService) {
        
        $scope.getReqs = function(query) {
            JobService
                .requests
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        console.log(data);
                        $scope.requests = data;
                    }
                });
        };

        $scope.requestFocus = function(index) {
            $scope.focus.request = $scope.requests[index];
        }

        var init = function() {
            $scope.getReqs({});
            $scope.focus = {};
        }

        init();
    }]);

 