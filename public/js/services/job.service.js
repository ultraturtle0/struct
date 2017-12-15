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
                    HOURS: "@HOURS",
                    CATEGORY: "@CATEGORY",
                    SUBCATEGORY: "@SUBCATEGORY",
                    DESCRIPTION: "@DESCRIPTION"
                }),

            travel: $resource('http://localhost:5000/api/travel', {
                    JOB_ID_START: "@JOB_ID_START",
                    JOB_ID_END: "@JOB_ID_END",
                    LOC_START: "@LOC_START",
                    LOC_END: "@LOC_END",
                    EMP_ID: "@EMP_ID",
                    VEHICLE_ID: "@VEHICLE_ID",
                    TIME_START: "@TIME_START",
                    TIME_END: "@TIME_END"
                }),

            trades: $resource('http://localhost:5000/api/trades', {
                }),

            works: $resource('http://localhost:5000/api/work', {
                    TRADE_NAME: "@WORK_NAME",
                })
        }

        return service;
    }]);
