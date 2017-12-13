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
		.populate('JOB_ID')
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
