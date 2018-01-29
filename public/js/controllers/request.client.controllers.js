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
			})
			$scope.request.$setPristine();
		}

		$scope.requestSubmit = function () {
            var date = new Date(Date.now());
            $scope.select.TIME_START.setFullYear(date.getFullYear());
            $scope.select.TIME_END.setFullYear(date.getFullYear());
            $scope.select.TIME_START.setMonth(date.getMonth());
            $scope.select.TIME_END.setMonth(date.getMonth());
            $scope.select.TIME_START.setDate(date.getDate());
            $scope.select.TIME_END.setDate(date.getDate());

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

		$scope.message = '';

	}]);