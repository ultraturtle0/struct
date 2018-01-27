const mongoose = require('mongoose');

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
	console.log('new emp');
	console.log(req.body);
	var Emp = mongoose.model('Emp');
    const emp = new Emp(req.body);
    emp.provider = 'local';
    emp.save((err) => {
        if (err) {
            const message = getErrorMessage(err);
            console.log(message);
        }
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
	var Trade = mongoose.model('Trade');
	if (!req.body.CATEGORY) {
		Trade
			.findOne({'WORKS._id': req.body.SUBCATEGORY}) // WHY DOESN'T THIS WORK?
			.exec(function(err, data) {
				if (err) {
					console.log(err);
				}
				if (data) {
					req.body.CATEGORY = data._id;

					const labor = new Labor(req.body);
	    			labor.save((err) => {
		        		if (err) {
		            		console.log(err);
		        		}
		        		res.redirect('/dashboard/labor');
					});
	    		}
			});
	}
};

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

exports.trades = function(req, res, next) {
	var Trade = mongoose.model('Trade');
	var query = req.query;
	Trade
		.find(query)
		.populate('WORKS')
		.exec(function(err, data) {
			if (err) {
				console.log(err);
				return next(err);
			}
			res.json(data);
		});
};

exports.addtrade = function(req, res, next) {
	console.log('why is the body empty');
	console.log(req.body);
	var WORKS = req.body.WORKS;
	delete req.body.WORKS;
	var Trade = mongoose.model('Trade');
    const trade = new Trade(req.body);
    trade.WORKS = [];
    WORKS.forEach(function(work) {
    	console.log(work.WORK_NAME);
    	trade.WORKS.push(work);
    });
    trade.save((err) => {
        if (err) {

            console.log(err);
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
	console.log(req.body);

	var Request = mongoose.model('Request');
    const request = new Request(req.body);
    request.save((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/dashboard/requests');
    });
};
