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
				/*.then(() => {
					JobService.employees
					.query(e_query)
					.$promise
					.then(function(_emps) {
						employees = _emps;
					})
					.then(() => {
						console.log(labor_data);
						console.log(employees);
						consolidate_payroll({
							start: new Date(),
							end: new Date()
						});
					});
				});
                */
                .catch((err) => {
                    console.log('error getting Days:');
                    console.log(err);
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
			//$scope.$watch('focus.time_start', consolidate_payroll);
			//$scope.$watch('focus.time_end', consolidate_payroll);
			var current = new Date();
			var before = new Date();
			before.setDate(current.getDate() - 14);
			$scope.focus = {
				time_start: before,
				time_end: current
			};
            console.log($scope.employees);			
		}

		init();
	}])
