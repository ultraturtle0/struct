angular.module('Services')
    .directive('flatpickr', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                flatpickr(element[0], {
                    enableTime: true,
                    noCalendar: true,
                    altInput: true,
                    altFormat: 'H:i',
                    dateFormat: 'Z'
                });
            }
        };
    }]);
