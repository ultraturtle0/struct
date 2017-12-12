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
                }),
            labor: $resource('http://localhost:5000/api/labor', {
                    JOB_ID: "@JOB_ID",
                    EMP_ID: "@EMP_ID",
                    TIME_START: "@TIME_START",
                    TIME_END: "@TIME_END",
                    DESCRIPTION: "@DESCRIPTION"
                })
        }

        return service;
    }]);
