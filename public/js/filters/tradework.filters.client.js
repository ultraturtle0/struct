angular.module('Database')
	.filter("tradework", function () {
		return function(items, trade) {
			var works = [];
			angular.forEach(trade.WORKS, function(value) {
				works.push(value.WORK_NAME);
			});
			var result = [];
			angular.forEach(items, function(value) {
				if (works.includes(value.NAME))
			});
			return result;
		}
	});