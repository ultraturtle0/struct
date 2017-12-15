angular.module('Database')
	.filter("checksub", function () {
		return function(items, subcategory) {
			var result = [];
			angular.forEach(items, function(value) {
				if (!subcategory || value.SUBCATEGORY.WORK_NAME == subcategory) {
					result.push(value);
				}
			});
			return result;
		}
	});