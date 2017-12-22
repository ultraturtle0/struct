angular.module('Database')
	.factory('GeoService', ['$resource', function($resource) {
		var service = {
			distance: $resource('http://localhost:5000/api/geo', {
					origins: "@origins",
					destinations: "@destinations"
				})
			}
		return service;
	}]);