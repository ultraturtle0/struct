const Job = require('mongoose').model('Job');
const Emp = require('mongoose').model('Emp');

/*function isAuthenticated(req, res, next) {
    if (req.user) {
        Emp
            .findOne({_id: req.user}, function (err, emp) {
                if (emp) {
                    if 
                }
            })
}*/


exports.dashboard = (function(req, res, next) {
    if (req.session) {
        console.log(req.session);
    }
    if (req.user) {
        console.log(req.user);
    }
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
    console.log(req.flash('error') || req.flash('info'));
    if (req.isAuthenticated()) {
        console.log('WELL THAT WORKS');
    }
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

