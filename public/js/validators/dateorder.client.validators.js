angular.module('Database')
	.directive('dateorder', [function() {
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, ctrl) {
				ctrl.$validators.dateorder = function(modelValue, viewValue) {
					console.log(modelValue);
					if (ctrl.$isEmpty(modelValue)) return false;
					if (scope.$eval(attrs.start) > modelValue) return false;
					console.log(select.start);
					console.log(select.end);
					return true;
				}
			}
		};
	}]);