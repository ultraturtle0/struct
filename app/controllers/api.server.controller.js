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
        return res.redirect('/jobs');
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
	console.log(req.body);
	var Emp = mongoose.model('Emp');
    const emp = new Emp(req.body);
    emp.save((err) => {
        if (err) {
            const message = getErrorMessage(err);
            console.log(message);
        }
        return res.redirect('/emps');
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
			console.log(data);
			if (err) {
				return next(err);
			}
			res.json(data);
		});
};

exports.addlabor = function(req, res, next) {
	console.log(req.body);
	var Labor = mongoose.model('Labor');
    const labor = new Labor(req.body);
    labor.save((err) => {
        if (err) {
            const message = getErrorMessage(err);
            console.log(message);
        }
        return res.redirect('/labor');
    });
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
			console.log(data);
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
        return res.redirect('/travel');
    });
};

exports.work = function(req, res, next) {
	var Work = mongoose.model('Work');
	var query = req.query;
	Work
		.find(query)
		.exec(function(err, data) {
			console.log(data);
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
        return res.redirect('/');
    });
};

exports.trades = function(req, res, next) {
	var Trade = mongoose.model('Trade');
	var query = req.query;
	Trade
		.find(query)
		.populate('WORKS')
		.exec(function(err, data) {
			console.log(data);
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
        return res.redirect('/');
    });
};

exports.vehicles = function(req, res, next) {
	var Vehicle = mongoose.model('Vehicle');
	var query = req.query;
	Vehicle
		.find(query)
		.exec(function(err, data) {
			console.log(data);
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
        return res.redirect('/travel');
    });
};

exports.repairs = function(req, res, next) {
	var Repair = mongoose.model('Repair');
	var query = req.query;
	Repair
		.find(query)
		.populate('VEHICLE')
		.exec(function(err, data) {
			console.log(data);
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
        return res.redirect('/repairs');
    });
};
