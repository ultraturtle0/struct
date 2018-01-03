const Job = require('mongoose').model('Job');

exports.dashboard = (function(req, res, next) {
    res.render('dashboard', {
        user: req.user || {},
        formtype: 'none'
    });
});

exports.jobs = (function(req, res, next) {
    res.render('jobs', {});
});

exports.emps = (function(req, res, next) {
    res.render('emps', {});
});

exports.labor = (function(req, res, next) {
    console.log(req.query);
    res.render('labor', {
        focus: {
            job: req.query.job || '',
            emp: req.query.emp || ''
        }
    });
});

exports.payroll = (function(req, res, next) {
    res.render('payroll', {});
});

exports.travel = (function(req, res, next) {
    res.render('travel', {});
});

exports.repairs = (function(req, res, next) {
    res.render('repairs', {});
});

exports.requests = (function(req, res, next) {
    res.render('requests', {});
});
