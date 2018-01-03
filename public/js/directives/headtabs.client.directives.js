angular.module('Database')
	.directive('headtabs', ['$location', function($location) {
		return {
			templateUrl: 'public/templates/headtabs.html',
			link: function(scope, element, attrs) {
				var locs = [
					{name: "Home", url: "/"},
	                {name: "Jobs", url: "/jobs"},
	                {name: "Employees", url: "/emps"},
	                {name: "Labor", url: "/labor"},
	                {name: "Travel", url: "/travel"},
	                {name: "Repairs", url: "/repairs"},
	                {name: "Requests", url: "/requests"}
	            ];
	            scope.pages = [];
	            locs.forEach(function(value) {
	            	if (value.url !== window.location.pathname) {
	            		scope.pages.push(value);
	            	}
	            });
			}
		}
	}]);