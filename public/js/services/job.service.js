angular.module('Database')
    .factory('JobService', ['$resource', function($resource) {
        var service = {
            jobs: $resource('http://localhost:5000/api/jobs', {
                    JOB_NUMBER: "@JOB_NUMBER",
                    JOB_NAME: "@JOB_NAME",
                    CUSTOMER_NAME: "@CUSTOMER_NAME",
                    CUSTOMER_PHONE: "@CUSTOMER_PHONE",
                    CUSTOMER_EMAIL: "@CUSTOMER_EMAIL"
                }, {
                    add: {
                        method: 'POST',
                        params: {
                            new_job: true
                        }
                    }
                }),
            employees: $resource('http://localhost:5000/api/emps', {
                    EMP_NAME: "@EMP_NAME",
                    EMP_PHONE: "@EMP_PHONE",
                    EMP_EMAIL: "@EMP_EMAIL"
                }, {
                    add: {
                        method: 'POST',
                        params: {
                            new_emp: true
                        }
                    }
                })
        }

        return service;
    }]);
