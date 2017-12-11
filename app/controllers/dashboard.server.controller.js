const Job = require('mongoose').model('Job');

exports.dashboard = (function(req, res, next) {
    res.render('dashboard', {
        user: req.user || {},
        formtype: 'none'
    });
});

exports.jobs = (function(req, res, next) {
    console.log('getting here tho');
    res.render('jobs', {});
});

