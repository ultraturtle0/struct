const mongoose = require('mongoose');
const moment = require('moment');
const request = require('request-promise');
mongoose.Promise = require('bluebird');
const bluebird = require('bluebird');

const $geo = require('../services/geo.server.service.js');
const acl = require('../../config/acl').instance;

exports.jobs = function(req, res, next) {
	var Job = mongoose.model('Job');
	var query = req.query;
	Job
		.find(query, function (err, jobs) {
			if (err) {
				return next(err);
			}
			res.json(jobs);
		});
};

exports.addjob = function(req, res, next) {
	console.log(req.body);
	var Job = mongoose.model('Job');
    const job = new Job(req.body);
    job.save((err) => {
        if (err) {
            const message = getErrorMessage(err);
            console.log(message);
        }
        res.redirect('/dashboard/jobs');
    });
};

exports.emps = function(req, res, next) {
	var Emp = mongoose.model('Emp');
	var query = req.query;
	Emp
		.find(query, function (err, emps) {
			if (err) {
				return next(err);
			}
			res.json(emps);
		});
};

exports.addemp = function(req, res, next) {
    if (req.body.ADMIN) {
        req.body.ADMIN = true;
    }
	var Emp = mongoose.model('Emp');
    const emp = new Emp(req.body);
    emp.provider = 'local';
    emp.save()
        .then((new_emp) => {
            if (req.body.ADMIN) {
                role = 'admin';
            } else {
                role = 'user';
            }
            return acl.addUserRoles(new_emp._id.toString(), role);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            res.redirect('/dashboard/emps');
        });
};

exports.labor = function(req, res, next) {
	var Labor = mongoose.model('Labor');
	var query = req.query;
	Labor
		.find(query)
		.populate('JOB_ID')
		.populate('EMP_ID')
		.populate('CATEGORY')
		.populate('SUBCATEGORY')
		.exec(function(err, data) {
			if (err) {
				return next(err);
			}
			res.json(data);
		});
};

exports.addlabor = function(req, res, next) {

	var Labor = mongoose.model('Labor');
    var Travel = mongoose.model('Travel');
	var Job = mongoose.model('Job');
    var Day = mongoose.model('Day');
    var labor;

    let today = moment(new Date(req.body.TIME_START)).startOf('day');
    let tomorrow = moment(today).add(1, 'days'); // DO YOU EVEN NEED THIS? 

    // add Labor
    
    labor = new Labor(req.body);
    
    labor.save()
        .then(() => {
            return Day                         // FIND DAY
                .findOneAndUpdate({
                    DAY: {
                        $gte: today.toDate(),
                        $lt: tomorrow.toDate()
                    },
                    EMP_ID: req.body.EMP_ID
                }, {
                    DAY: today,
                    EMP_ID: req.body.EMP_ID,

                    $min: {
                        TIME_START: req.body.TIME_START
                    },
                    $max: {
                        TIME_END: req.body.TIME_END
                    },
                    $push: {
                        LABORS: {
                            $each: [labor],
                            $sort: {
                                TIME_START: 1
                            }
                        }
                    }
                }, {
                    upsert: true
                })
                .populate('LABORS');
        })
        .then((oldday, err) => {                     // DETERMINE TRAVEL
            if (!oldday) {
                return;
            }
            var last = oldday.LABORS[oldday.LABORS.length-1];
            if (last.JOB_ID.toString() == labor.JOB_ID.toString()) {
                return;
            }

            var $lastJob = Job.findById(last.JOB_ID).exec();
            var $thisJob = Job.findById(labor.JOB_ID).exec();

            // get Job addresses
            return bluebird.Promise.all([$lastJob, $thisJob])
                .then((results) => {
                    console.log('entering Promise.all section');
                    var job_start = results[0];
                    var job_end = results[1];

                    var start_format = job_start.JOB_ADDRESS + ' ' + job_start.JOB_CITY + ',' + job_start.JOB_STATE;
                    var end_format = job_end.JOB_ADDRESS + ' ' + job_end.JOB_CITY + ',' + job_end.JOB_STATE;

                    var geoQuery = {
                        origins: start_format,
                        destinations: end_format,
                        units: 'imperial'
                    };

                    var START_moment = moment(last.TIME_END);
                    var END_moment = moment(labor.TIME_START);
                    var duration = moment.duration(END_moment.diff(START_moment)).asMinutes() / 60;

                    var new_travel = {
                        JOB_ID_START: job_start._id,
                        JOB_ID_END: job_end._id,
                        // LOC_START_ADDR: job_start.LOC_START,
                        // LOC_END_ADDR: job_end.LOC_END,
                        HOURS: duration, 
                        // MILES: ,
                        EMP_ID: labor.EMP_ID,
                        VEHICLE_ID: req.body.VEHICLE_ID,
                        TIME_START: last.TIME_END,
                        TIME_END: labor.TIME_START
                    }

                    return $geo.$distance(geoQuery)
                        .then((google) => {
                            google = JSON.parse(google);
                            if (google) {
                                new_travel.MILES = google.rows[0].elements[0].distance.value / 1000.0 * 0.621371;
                            }
                            console.log(new_travel);
                            var travel = new Travel(new_travel);
                            return travel.save();
                        })
                        .then((travel) => {
                            console.log(travel);
                            return Day
                                .findOneAndUpdate({
                                    _id: oldday._id
                                }, {
                                    $push: {
                                        TRAVELS: travel._id
                                    }
                                });
                        });
                });
        })
        .catch((err) => {
            console.log('error adding/updating day: ');
            console.log(err);
        })
        .finally(() => {
            res.redirect('/dashboard/labor'); // DEPRECATED?
        });
}

exports.travel = function(req, res, next) {
    var Travel = mongoose.model('Travel');
    var query = req.query;
    Travel
        .find(query)
        .populate('JOB_ID_START')
        .populate('JOB_ID_END')
        .populate('EMP_ID')
        .populate('VEHICLE_ID')
        .exec(function(err, data) {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.json(data);
        });
};

exports.addtravel = function(req, res, next) {
    console.log(req.body);
    var Travel = mongoose.model('Travel');
    const travel = new Travel(req.body);
    travel.save((err) => {
        if (err) {
            const message = getErrorMessage(err);
            console.log(message);
        }
        res.redirect('/dashboard/travel');
    });
    };

    exports.work = function(req, res, next) {
    var Work = mongoose.model('Work');
    var query = req.query;
    Work
        .find(query)
        .exec(function(err, data) {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.json(data);
        });
    };

    exports.addwork = function(req, res, next) {
    console.log(req.body);
    var Work = mongoose.model('Work');
    const work = new Work(req.body);
    work.save((err) => {
        if (err) {
            const message = getErrorMessage(err);
            console.log(message);
        }
        res.redirect('/');
    });
};

exports.vehicles = function(req, res, next) {
	var Vehicle = mongoose.model('Vehicle');
	var query = req.query;
	Vehicle
		.find(query)
		.exec(function(err, data) {
			if (err) {
				console.log(err);
				return next(err);
			}
			res.json(data);
		});
};

exports.addvehicle = function(req, res, next) {
	console.log(req.body);
	var Vehicle = mongoose.model('Vehicle');
    const vehicle = new Vehicle(req.body);
    vehicle.save((err) => {
        if (err) {
            const message = getErrorMessage(err);
            console.log(message);
        }
        res.redirect('/dashboard/travel');
    });
};

exports.repairs = function(req, res, next) {
	var Repair = mongoose.model('Repair');
	var query = req.query;
	Repair
		.find(query)
		.populate('VEHICLE')
		.exec(function(err, data) {
			if (err) {
				console.log(err);
				return next(err);
			}
			res.json(data);
		});
};

exports.addrepair = function(req, res, next) {
	console.log(req.body);

	var Repair = mongoose.model('Repair');
    const repair = new Repair(req.body);
    repair.save((err) => {
        if (err) {
            console.log(err);
        }
        res.setHeader("Content-Type", "text/html");
        res.redirect('/dashboard/repairs');
    });
};

exports.requests = function(req, res, next) {
	var Request = mongoose.model('Request');
	var query = req.query;
	Request
		.find(query)
		.populate('EMP_ID')
		.populate('JOB_ID')
		.exec(function(err, data) {
			if (err) {
				console.log(err);
				return next(err);
			}
			res.json(data);
		});
}

exports.addrequest = function(req, res, next) {
	
	req.body.EMP_ID = req.session.passport.user;
	console.log(req.body);

	var Request = mongoose.model('Request');
    const request = new Request(req.body);
    request.save((err) => {
    	let success = false;
    	let message = '';
        if (err) {
            message = err;
        } else {
        	message = 'Success!';
        	success = true;
        }
        res.send({success: success, message: message});
    });
};

exports.deleterequest = function(req, res, next) {
	var query = req.query;
	console.log(query);

	var Request = mongoose.model('Request');
	Request
		.findByIdAndRemove(query, function(err) {
			if (err) {
				res.json({err: err});
			} else {
				res.json({message: "success!"});
			}
		});
}
