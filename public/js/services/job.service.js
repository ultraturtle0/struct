angular.module('Services')
    .factory('JobService', ['$resource', function($resource) {
        var service = {
            jobs: $resource('/api/jobs', {
                    JOB_NUMBER: "@JOB_NUMBER",
                    JOB_NAME: "@JOB_NAME",
                    JOB_ADDRESS: "@JOB_ADDRESS",
                    JOB_STATE: "@JOB_STATE",
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

            employees: $resource('/api/emps', {
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

            labors: $resource('/api/labor', {
                    JOB_ID: "@JOB_ID",
                    EMP_ID: "@EMP_ID",
                    TIME_START: "@TIME_START",
                    TIME_END: "@TIME_END",
                    HOURS: "@HOURS",
                    CATEGORY: "@CATEGORY",
                    SUBCATEGORY: "@SUBCATEGORY",
                    DESCRIPTION: "@DESCRIPTION"
                }),

            travels: $resource('/api/travel', {
                    JOB_ID_START: "@JOB_ID_START",
                    JOB_ID_END: "@JOB_ID_END",
                    LOC_START: "@LOC_START",
                    LOC_END: "@LOC_END",
                    EMP_ID: "@EMP_ID",
                    VEHICLE_ID: "@VEHICLE_ID",
                    TIME_START: "@TIME_START",
                    TIME_END: "@TIME_END"
                }),
 
            works: $resource('/api/work', {
                    WORK_NAME: "@WORK_NAME",
                }),

            vehicles: $resource('/api/vehicles', {
                    VEHICLE_NAME: "@VEHICLE_NAME"
                }),

            repairs: $resource('/api/repairs', {
                    REPAIR_NAME: "@REPAIR_NAME",
                    REPAIR_COST: "@REPAIR_COST",
                    REPAIR_DATE: "@REPAIR_DATE",
                    DESCRIPTION: "@DESCRIPTION",
                    VEHICLE_ID: "@VEHICLE_ID"
                }),

            requests: $resource('/api/requests', {
                    _id: "@_id",
                    JOB_ID: "@JOB_ID",
                    LOCATION: "@LOCATION",
                    EMP_ID: "@EMP_ID",
                    VEHICLE_ID: "@VEHICLE_ID",
                    TIME_START: "@TIME_START",
                    TIME_END: "@TIME_END",
                    SUBCATEGORY: "@SUBCATEGORY",
                    DESCRIPTION: "@DESCRIPTION"
                })
        }

        return service;
    }]);
