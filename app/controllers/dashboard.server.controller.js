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

exports.new_job = (function(req, res, next) {
    console.log(req.body);
    const job = new Job(req.body);
    job.save((err) => {
        if (err) {
            const message = getErrorMessage(err);
            console.log(message);
        }
        return res.redirect('/');
    });
});
