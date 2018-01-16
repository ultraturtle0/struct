angular.module('Database')
    .controller('ReqController', ['$scope', '$window', 'JobService', function($scope, $window, JobService) {
        
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
                        });
                        angular.forEach($scope.requests, function (emp) {
                            angular.forEach(emp, function (value) {
                                console.log('setting value');
                                console.log(value);
                                $scope.select[value._id] = {
                                    _id: value._id,
                                    JOB_ID: value.JOB_ID._id || null,
                                    EMP_ID: value.EMP_ID._id,
                                    LOCATION: value.LOCATION || null,
                                    TIME_START: new Date(Date.parse(value.TIME_START)),
                                    TIME_END: new Date(Date.parse(value.TIME_END)),
                                    DESCRIPTION: value.DESCRIPTION
                                }
                            });
                        });
                        console.log($scope.select);
                    }
                });
            JobService
                .jobs
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        console.log(data);
                        $scope.jobs = data;
                    }
                });
            JobService
                .works
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        console.log(data);
                        $scope.works = data;
                    }
                });
        };

        $scope.requestApprove = function(req) {
            var request = $scope.select[req];
            request.HOURS = (request.TIME_END - request.TIME_START) / 3600000;
            var target = request._id;
            delete request._id;
            console.log(request);
            JobService
                .labor
                .save({}, request)
                .$promise
                .then(function (err) {
                    /*if (err) {
                        console.log(err);
                    } else {*/
                        /* find and delete the pending request
                        JobService
                            .requests
                            .*/
                        angular.forEach($scope.requests, function (emp) {
                            angular.forEach(emp, function (value, index) {
                                if (value._id == req) {
                                    emp.splice(index, 1);
                                }
                            });
                        });
                        delete $scope.select[req];
                        console.log($scope.requests);
                    // }
                });
        }

        var init = function() {
            $scope.getReqs({});
            $scope.select = {};
            $scope.focus = {};
        }

        init();
    }]);

 