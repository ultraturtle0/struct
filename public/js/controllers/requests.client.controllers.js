angular.module('Database')
    .controller('ReqController', ['$scope', '$window', 'JobService', function($scope, $window, JobService) {
        
        

        var getData = function(query) {
            JobService
                [query]
                .query({})
                .$promise
                .then(function(data) {
                    if (data.length) {
                        $scope[query] = data;
                    } else {
                        console.log('error loading ' + query);
                    }
                });
            };

        var loadTimes = function(request, time, date) {
            $scope.fp[request][time].setDate(date, true);
        };

        $scope.getReqs = function(query) {
            JobService
                .requests
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        console.log(data);
                        $scope.requests = {};

                        angular.forEach(data, function (value) {
                            if (!(value.EMP_ID.EMP_NAME in $scope.requests)) {
                                $scope.requests[value.EMP_ID.EMP_NAME] = [value];
                            } else {
                                $scope.requests[value.EMP_ID.EMP_NAME].push(value);
                            }

                            setTimeout(() => {
                                loadTimes(value._id, 'TIME_START', value.TIME_START);
                                loadTimes(value._id, 'TIME_END', value.TIME_END);
                            }, 0);

                        });
                        angular.forEach($scope.requests, function (emp) {
                            var counter = 0;
                            angular.forEach(emp, function (value) {
                                $scope.select[value._id] = {
                                    _id: value._id,
                                    JOB_ID: value.JOB_ID._id || null,
                                    EMP_ID: value.EMP_ID._id,
                                    LOCATION: value.LOCATION || null,
                                    VEHICLE_ID: value.VEHICLE_ID,
                                    SUBCATEGORY: value.SUBCATEGORY,
                                    TIME_START: value.TIME_START,
                                    TIME_END: value.TIME_END,
                                    DESCRIPTION: value.DESCRIPTION
                                }
                            });
                            
                        });

                    }
                });
        };

        $scope.requestApprove = function(req) {
            var request = $scope.select[req];
            request.HOURS = (request.TIME_END - request.TIME_START) / 3600000;
            var target = request._id;
            delete request._id;
            JobService
                .labors
                .save({}, request)
                .$promise
                .then(function (res) {
                    if (res.error) {
                        console.log(res.error);
                    } else {
                        // find and delete the pending request
                        JobService
                            .requests
                            .delete({_id: target})
                            .$promise
                            .then(function (res) {
                                if (res.err) {
                                    console.log(res.err);
                                } else {
                                    console.log(res.message);
                                    angular.forEach($scope.requests, function (emp) {
                                        angular.forEach(emp, function (value, index) {
                                            if (value._id == req) {
                                                emp.splice(index, 1);
                                            }
                                        });
                                    });
                                    delete $scope.select[req];
                                }
                            });
                        
                    }
                });
        }

        var init = function() {
            $scope.fp = {};
            $scope.getReqs({});

            queries = ['jobs', 'works', 'vehicles'];
            queries.forEach(getData);

            $scope.select = {};
            $scope.focus = {};
        }

        init();
    }]);

 
