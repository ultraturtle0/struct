angular.module('Database')
	.filter("daterange", function () {
		return function(items, key, startDate, endDate) {
			var result = [];
			if (!startDate || !endDate) {
				return items;
			}
			angular.forEach(items, function(value) {
                console.log(value[key]);
				if (moment(value[key]).isAfter(startDate) &&
					moment(value[key]).isBefore(endDate)) {
						result.push(value);
					}
			});
			return result;
		}
	});
