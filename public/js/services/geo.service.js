angular.module('Services')
	.factory('GeoService', ['$resource', function($resource) {
		var service = {
			distance: $resource('http://localhost:5000/api/geo', {
					origins: "@origins",
					destinations: "@destinations",
					units: "@units"
				})
			}
		return service;
	}]);