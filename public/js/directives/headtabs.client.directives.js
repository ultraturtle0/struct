angular.module('Database')
	.directive('headtabs', ['$location', function($location) {
		return {
			templateUrl: '/public/templates/headtabs.html',
			link: function(scope, element, attrs) {
				var locs = [
	                {name: "Jobs", url: "/jobs"},
	                {name: "Employees", url: "/emps"},
	                {name: "Labor", url: "/labor"},
	                {name: "Travel", url: "/travel"},
	                {name: "Repairs", url: "/repairs"},
	                {name: "Requests", url: "/requests"},
	                {name: "Payroll", url: "/payroll"}
	            ];

                scope.tabs = [
                    {name: "Add Labor", url: "/#!add_labor"},
                    {name: "Add Job", url: "/#!add_job"},
                    {name: "Add Employee", url: "/#!add_emp"},
                    {name: "Add Travel", url: "/#!add_travel"},
                    {name: "Add Repairs", url: "/#!add_repair"},
                    {name: "Add Request", url: "/#!add_request"},
                    {name: "Add Vehicle", url: "/#!add_vehicle"}
                ];

	            scope.pages = [];
	            locs.forEach(function(value) {
	            	if (value.url !== window.location.pathname) {
	            		scope.pages.push(value);
	            	}
	            });
                
                //scope.menu = element[0].querySelector('#menu');
                //scope.menu.on(
			}
		}
	}]);
