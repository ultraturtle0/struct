angular.module('Services')
    .directive('flatpickr', [function() {
        return {
            restrict: 'A',
            scope: {
                api: '='
            },
            require: '^ngModel', // DOES MODEL NEED PARENT INDICATOR?
            link: function(scope, element, attrs, ngModel) {

                fp = flatpickr(element[0], {
                    enableTime: true,
                    noCalendar: true,
                    altInput: true,
                    altFormat: 'H:i',
                    dateFormat: 'Z'
                });

                scope.api = {
                    clear: fp.clear
                };
                
                var validate = function() {
                    var valid = (new Date(ngModel.$modelValue)) > (new Date(attrs.min));
                    ngModel.$setValidity('timepickr', valid);

                };

                if ('min' in attrs) { 
                    attrs.$observe('min', validate);
                    scope.$watch(() => {
                        return ngModel.$modelValue;
                    }, validate); 
                }
                
            }
        };
    }]);
