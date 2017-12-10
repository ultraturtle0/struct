angular.module('Database')
    .factory('JobService', ['$resource', function($resource) {
        var service = {
            query: $resource('http://localhost:5000/api/jobs', {
                JOB_NUMBER: "@JOB_NUMBER",
                JOB_NAME: "@JOB_NAME",
                CUSTOMER_NAME: "@CUSTOMER_NAME",
                CUSTOMER_PHONE: "@CUSTOMER_PHONE",
                CUSTOMER_EMAIL: "@CUSTOMER_EMAIL"
            })
        };

        return service;
    }]);
