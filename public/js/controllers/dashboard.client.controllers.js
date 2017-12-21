angular.module('Database')
    .controller('DashboardController', ['$scope', '$route', '$routeParams', '$location', '$templateCache', 'JobService', function($scope, $route, $routeParams, $location, $templateCache, JobService) {
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
            {name: "Labor", url: "/#!add_labor"},
            {name: "Job", url: "/#!add_job"},
            {name: "Employee", url: "/#!add_emp"},
            {name: "Travel", url: "/#!add_travel"},
            {name: "Repairs", url: "/#!add_repair"}
        ];

        $scope.pages = [
            {name: "Jobs", url: "/jobs"},
            {name: "Employees", url: "/emps"},
            {name: "Labor", url: "/labor"},
            {name: "Travel", url: "/travel"},
            {name: "Repairs", url: "/repairs"}
        ]

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
            
            $scope.select.CATEGORY = $scope.focustrade._id;
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

        init();
    }]);

 