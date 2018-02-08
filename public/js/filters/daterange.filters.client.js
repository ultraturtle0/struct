angular.module('Database')
	.filter("daterange", function () {
		return function(items, key, startDate, endDate) {
			var result = [];
			if (!startDate || !endDate) {
				return items;
			}
			angular.forEach(items, function(value) {
				if (moment(value[key]).isAfter(startDate) &&
					moment(value[key]).isBefore(endDate)) {
						result.push(value);
					}
			});
			return result;
		}
	});
