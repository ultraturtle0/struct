angular.module('Request')
	.controller('RequestController', ['$scope', '$window', 'JobService', function($scope, $window, JobService) {
		
		var getData = function(query) {
			JobService[query]
				.query({})
				.$promise
				.then(function(data) {
					if (data) {
						console.log(data);
						$scope[query] = data;
					}
				});
			};

		$scope.reset = function () {
			$scope.select = {};
			let inputs = ['JOB_ID', 'LOCATION', 'VEHICLE', 'TIME_START', 'TIME_END'];
			inputs.forEach((input) => {
				$scope.request[input].$setUntouched();
                $scope.request[input].$dirty = false;
                console.log($scope.request[input]);
                if ($scope.request[input].fp) {
                    console.log('SO THAT WORKS');
                    $scope.request[input].fp.clear();
                }
			})
			$scope.request.$setPristine();
		}


		$scope.requestSubmit = function () {
            var date = moment();
            var start = moment($scope.select.TIME_START);
            var end = moment($scope.select.TIME_END);
            console.log($scope.select.TIME_START);
 
            $scope.select.TIME_START = start.year(date.year()).month(date.month()).date(date.date()).toDate();
            $scope.select.TIME_END = end.year(date.year()).month(date.month()).date(date.date()).toDate();
            console.log(date);

            $scope.message = 'Submitting...'
            JobService
                .requests
                .save({}, $scope.select)
                .$promise
                .then(function(res) {
                	console.log(res.message);
                	$scope.message = res.message;
                	$scope.reset();
                });
        }

        let queries = ['jobs', 'employees', 'vehicles', 'works'];
		queries.forEach(getData);

		$scope.select = {};
		$scope.message = '';

	}]);
