angular.module('Database')
    .controller('RepairsController', ['$scope', 'JobService', 'daterangeFilter', function($scope, JobService, daterangeFilter) {
        
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

        var init = function() {
            $scope.fpOptions = {
                noCalendar: false,
                altInput: true,
                altFormat: 'm-d-Y',
                dateFormat: 'Z'
            }

            $scope.select = {};
            let queries = ['repairs', 'vehicles'];
            queries.forEach(getData);

            $scope.focus = {
                time_end: new Date()
            };
        }

        init();
    }]);

 
