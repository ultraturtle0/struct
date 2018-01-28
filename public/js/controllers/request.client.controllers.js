angular.module('Request')
	.controller('RequestController', ['$scope', 'JobService', function($scope, JobService) {
		
		var getData = function() {
			queries = ['jobs', 'employees', 'vehicles', 'works'];
			queries.forEach((query) => {
				JobService[query]
					.query({})
					.$promise
					.then(function(data) {
						if (data) {
							console.log(data);
							$scope[query] = data;
						}
					});
				});
		};

		getData();

	}]);