angular.module('Database')
	.filter("daterange", function () {
		return function(items, startDate, endDate) {
			var result = [];
			if (!startDate && !endDate) {
				return items;
			}
			angular.forEach(items, function(value) {
				if (moment(value.TIME_START).isAfter(startDate) &&
					moment(value.TIME_START).isBefore(endDate)) {
						result.push(value);
					}
			});
			return result;
		}
	});