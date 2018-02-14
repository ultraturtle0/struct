angular.module('Database')
    .controller('DashboardController', ['$scope', '$route', '$routeParams', '$location', '$window', '$templateCache', 'JobService', 'GeoService', function($scope, $route, $routeParams, $location, $window, $templateCache, JobService, GeoService) {
        
        var getData = function(query) {
            JobService
                [query]
                .query({})
                .$promise
                .then(function(data) {
                    if (data.length) {
                        $scope[query] = data;
                    }
                });
        };

        var init = function() {
            $scope.fpOptions = {
                noCalendar: false,
                altInput: true,
                altFormat: 'm-d-Y',
                dateFormat: 'Z'
            }

            let queries = ['jobs', 'employees', 'works', 'vehicles', 'requests'];
            queries.forEach(getData);
            $templateCache.removeAll();
        }

        $scope.tabs = [
            {name: "Add Labor", url: "/#!add_labor"},
            {name: "Add Job", url: "/#!add_job"},
            {name: "Add Employee", url: "/#!add_emp"},
            {name: "Add Travel", url: "/#!add_travel"},
            {name: "Add Repairs", url: "/#!add_repair"},
            {name: "Add Request", url: "/#!add_request"},
            {name: "Add Vehicle", url: "/#!add_vehicle"}
        ];

        $scope.jobs = [];
        $scope.emps = [];
        $scope.select = {};
        $scope.focus = {};

        $scope.$watch('select.EMP_ID', function (newValue) {
            var latest = new Date(0);
            var last;
            angular.forEach($scope.requests, function(value) {
                if ((value.EMP_ID == newValue) && (moment(moment().toDate(value.DATE_CREATED)).isAfter(latest))) {
                    last = value;
                }
            });
            $scope.lastrequest = last;
        });
            
		$scope.requestSubmit = function () {
            var date = moment();
            var start = moment($scope.select.TIME_START);
            var end = moment($scope.select.TIME_END);
 
            $scope.select.TIME_START = start.year(date.year()).month(date.month()).date(date.date()).toDate();
            $scope.select.TIME_END = end.year(date.year()).month(date.month()).date(date.date()).toDate();

            $scope.message = 'Submitting...'
            JobService
                .requests
                .save({}, $scope.select)
                .$promise
                .then(function(res) {
                	console.log(res.message);
                	$scope.message = res.message;
                	// $scope.reset();
                });
        }

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

        $scope.travelSubmit = function () {
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

 
