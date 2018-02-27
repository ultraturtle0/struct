angular.module('Database')
	.controller('PayrollController', ['$scope', 'JobService', function($scope, JobService) {

		var labor_data;

		var getPayroll = function() {
			return JobService.days
				.query({})
				.$promise
				.then(function(_days) {
                    var employees = {};
                    _days.forEach((day) => {
                        day.BILLABLE = day.LABORS.concat(day.TRAVELS);
                        if (!(day.EMP_ID.EMP_NAME in employees)) {
                            employees[day.EMP_ID.EMP_NAME] = [];
                        }
                        employees[day.EMP_ID.EMP_NAME].push(day);
                    });
                    $scope.employees = employees;
				})
                .catch((err) => {
                    console.log('error getting Days:');
                    console.log(err);
                });
		};

        var getJobs = function() {
            return JobService.jobs
                .query({})
                .$promise
                .then(function(_jobs) {
                    var jobs = {}
                    _jobs.forEach((job) => {
                        jobs[job._id] = job;
                    });
                    $scope.jobs = jobs;
                });
        };
        var getWorks = function() {
            return JobService.works
                .query({})
                .$promise
                .then(function(_works) {
                    var works = {}
                    _works.forEach((work) => {
                        works[work._id] = work;
                    });
                    $scope.works = works;
                });
        };
        var getVehicles = function() {
            return JobService.vehicles
                .query({})
                .$promise
                .then(function(_vehicles) {
                    var vehicles = {}
                    _vehicles.forEach((vehicle) => {
                        vehicles[vehicle._id] = vehicle;
                    });
                    $scope.vehicles = vehicles;
                    console.log($scope.vehicles);
                });
        };



/*		var consolidate_payroll = function() {
			var time_start = $scope.focus.time_start;
			var time_end = $scope.focus.time_end;
			console.log("we're in.");
			var employees = {};
			$scope.employees = [];
			angular.forEach(labor_data, function(value) { 
				if (!employees[value.EMP_ID.EMP_NAME]) {
					employees[value.EMP_ID.EMP_NAME] = {
						employee: value.EMP_ID.EMP_NAME,
						hours: 0,
						wage: value.EMP_ID.WAGE,
						paycheck: 0,
						labor: []
					};
				}
				console.log(value.EMP_ID);
				console.log('end: ' + value.EMP_ID.EMP_NAME);
				if (moment(value.TIME_START).isAfter(time_start) &&
					moment(value.TIME_END).isBefore(time_end)) {
						console.log(value.HOURS);
						employees[value.EMP_ID.EMP_NAME].labor.push(value);
						employees[value.EMP_ID.EMP_NAME].hours += value.HOURS;
					}
			});
			angular.forEach(employees, function(value, key) {
				value.paycheck = value.hours * value.wage;
				$scope.employees.push(value);
				console.log('' + key + ': ' + value.paycheck);
				console.log(value.labor);
			});
			console.log('employees');
			console.log($scope.employees);
		}
        */

		var init = function() {
			//$scope.employees = [];
			getPayroll().then(() => {
                console.log($scope.employees);
            });
            getJobs();
            getWorks();
            getVehicles();

			//$scope.$watch('focus.time_start', consolidate_payroll);
			//$scope.$watch('focus.time_end', consolidate_payroll);
			var current = new Date();
			var before = new Date();
			before.setDate(current.getDate() - 14);
			$scope.focus = {
				time_start: before,
				time_end: current
			};
		}

		init();
	}])
