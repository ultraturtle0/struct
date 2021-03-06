angular.module('Services')
    .directive('flatpickr', [function() {
        return {
            restrict: 'A',
            scope: {
                api: '=',
                fpOptions: '=options'
            },
            require: '^ngModel', // DOES MODEL NEED PARENT INDICATOR?
            link: function(scope, element, attrs, ngModel) {

                
                fp = flatpickr(element[0], scope.fpOptions || {
                    enableTime: true,
                    noCalendar: true,
                    altInput: true,
                    altFormat: 'H:i',
                    dateFormat: 'Z'
                });

                if (attrs.api) {
                    scope.api = {
                        clear: fp.clear,
                        setDate: fp.setDate
                    };
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
