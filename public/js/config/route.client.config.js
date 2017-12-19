angular.module('Database')
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		console.log('do we even get here tho');
		$routeProvider
			.when('/add_job', {
				templateUrl: '/public/templates/addjob.ejs'
			})
			.when('/add_emp', {
				templateUrl: '/public/templates/addemp.ejs'
			})
			.when('/add_labor', {
				templateUrl: '/public/templates/addlabor.ejs'
			})
			.when('/add_travel', {
				templateUrl: '/public/templates/addtravel.ejs'
			})
			.when('/add_repair', {
				templateUrl: '/public/templates/addrepair.ejs'
			});
	}]);
