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