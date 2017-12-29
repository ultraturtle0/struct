angular.module('Database')
	.filter("jobfilter", function () {
		return function(items, job) {
			var result = [];
			if (!job) {
				return items;
			}
			angular.forEach(items, function(value) {
				if ((value.hasOwnProperty('JOB_ID_START') && value.JOB_ID_START._id == job) || 
					(value.hasOwnProperty('JOB_ID_END') && value.JOB_ID_END._id == job)) {
					result.push(value);
				}
			});
			return result;
		}
	});