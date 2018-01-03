angular.module('Database')
    .controller('DashboardController', ['$scope', '$route', '$routeParams', '$location', '$templateCache', 'JobService', 'GeoService', function($scope, $route, $routeParams, $location, $templateCache, JobService, GeoService) {
        $scope.getData = function(query) {
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
                .employees
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        console.log(data);
                        $scope.emps = data;
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
                        data.forEach(function(value) {
                            console.log(value.WORK_NAME);
                            if (value.WORK_NAME == '') {
                                $scope.workblank = value._id;
                            }
                        });
                        console.log('blank: ' + $scope.workblank);
                    }
                });
            JobService
                .trades
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        console.log(data);
                        $scope.trades = data;
                    }
                });
            JobService
                .vehicles
                .query(query)
                .$promise
                .then(function(data) {
                    if (data.length) {
                        console.log(data);
                        $scope.vehicles = data;
                    }
                });
        };

        var init = function() {
            $scope.getData({});
            $templateCache.removeAll();
        }

        $scope.tabs = [
            {name: "Add Labor", url: "/#!add_labor"},
            {name: "Add Job", url: "/#!add_job"},
            {name: "Add Employee", url: "/#!add_emp"},
            {name: "Add Travel", url: "/#!add_travel"},
            {name: "Add Repairs", url: "/#!add_repair"}
        ];

        $scope.jobs = [];
        $scope.emps = [];
        $scope.select = {};

        $scope.laborSubmit = function () {
            var date = $scope.select.DATE;
            $scope.select.TIME_START.setFullYear(date.getFullYear());
            $scope.select.TIME_END.setFullYear(date.getFullYear());
            $scope.select.TIME_START.setMonth(date.getMonth());
            $scope.select.TIME_END.setMonth(date.getMonth());
            $scope.select.TIME_START.setDate(date.getDate());
            $scope.select.TIME_END.setDate(date.getDate());
            $scope.select.HOURS = ($scope.select.TIME_END - $scope.select.TIME_START) / 3600000;
            console.log($scope.select.HOURS);
            delete $scope.select.DATE;
            
            $scope.select.CATEGORY = $scope.select.trade._id;
            delete $scope.select.trade;
            
            if (!$scope.select.SUBCATEGORY) {
                $scope.select.SUBCATEGORY = $scope.workblank;
            }

            console.log($scope.select);
            JobService
                .labor
                .save({}, $scope.select)
                .$promise
                .then(function(err) {
                    if (err) {
                        console.log(err)
                    }
                });
        }

        $scope.vehicleSubmit = function () {
            console.log($scope.select);
            var query = {
                VEHICLE_NAME: $scope.select.VEHICLE_NAME
            }
            JobService
                .vehicles
                .save({}, query)
                .$promise
                .then(function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
        };

        $scope.repairSubmit = function () {
            console.log($scope.select);
            JobService
                .repairs
                .save({}, $scope.select)
                .$promise
                .then(function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
        };

        $scope.tradeSubmit = function () {
            console.log($scope.select.WORKS);
            var query = {
                TRADE_NAME: $scope.select.TRADE_NAME,
                WORKS: $scope.select.WORKS
            }
            console.log('query');
            console.log(query);
            JobService
                .trades
                .save({}, query)
                .$promise
                .then(function(err) {
                    if (err) {
                        console.log(err)
                    }
                });
        }

        $scope.travelSubmit = function () {
            console.log("do we get here");
            var date = $scope.select.DATE;
            $scope.select.TIME_START.setFullYear(date.getFullYear());
            $scope.select.TIME_END.setFullYear(date.getFullYear());
            $scope.select.TIME_START.setMonth(date.getMonth());
            $scope.select.TIME_END.setMonth(date.getMonth());
            $scope.select.TIME_START.setDate(date.getDate());
            $scope.select.TIME_END.setDate(date.getDate());
            $scope.select.HOURS = ($scope.select.TIME_END - $scope.select.TIME_START) / 3600000;

            delete $scope.select.DATE;

            var job_start, job_end, start_format, end_format;

            if ($scope.select.hasOwnProperty('JOB_ID_START')) {
                job_start = $scope.select.JOB_ID_START;
                $scope.select.JOB_ID_START = $scope.select.JOB_ID_START._id;
                start_format = job_start.JOB_ADDRESS + ' ' + job_start.JOB_CITY + ',' + job_start.JOB_STATE;
            } else {
                start_format = $scope.select.LOC_START;
            }

            if ($scope.select.hasOwnProperty('JOB_ID_END')) {
                job_end = $scope.select.JOB_ID_END;
                $scope.select.JOB_ID_END = $scope.select.JOB_ID_END._id;
                end_format = job_end.JOB_ADDRESS + ' ' + job_end.JOB_CITY + ',' + job_end.JOB_STATE;
            } else {
                end_format = $scope.select.LOC_END;
            }

            var geoquery = {
                origins: start_format,
                destinations: end_format,
                units: "imperial"
            };

            GeoService
                .distance
                .get(geoquery)
                .$promise
                .then(function(data) {
                    if (data) {
                        $scope.select.LOC_START_ADDR = data.origin_addresses[0];
                        $scope.select.LOC_END_ADDR = data.destination_addresses[0];
                        $scope.select.MILES = data.rows[0].elements[0].distance.value / 1000.0 * 0.621371;

                        JobService
                            .travel
                            .save({}, $scope.select)
                            .$promise
                            .then(function(err) {
                                if (err) {
                                    console.log(err);
                                }
                            });
                    }
                });
        }

        $scope.testDistance = function () {
            console.log($scope.select);
            var query = {
                origins: $scope.select.origins,
                destinations: $scope.select.destinations
            }

            GeoService
                .distance
                .get(query)
                .$promise
                .then(function(data) {
                    if (data) {
                        $scope.distance = data.rows[0].elements[0].distance.value / 1000.0 * 0.621371;
                    }
                });
        }

        init();
    }]);

 