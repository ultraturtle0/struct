angular.module('Services')
    .directive('flatpickr', [function() {
        return {
            restrict: 'A',
            require: '^ngModel',
            link: function(scope, element, attrs, ngModel) {
                console.log(element);
                flatpickr(element[0], {
                    enableTime: true,
                    noCalendar: true,
                    altInput: true,
                    altFormat: 'H:i',
                    dateFormat: 'Z'
                });
                
                var validate = function() {
                    var valid = (new Date(ngModel.$viewValue)) > (new Date(attrs.min));
                    ngModel.$setValidity('min', valid);
                };


                if ('min' in attrs) { 
                    scope.$watch(attrs.ngModel, validate);
                    attrs.$observe('timepickr', validate);
                }

                
            }
        };
    }]);
