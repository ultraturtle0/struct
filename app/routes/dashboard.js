const dashboard = require('../controllers/dashboard.server.controller');
const passport = require('passport');

var verify = function(acl) {
    return function (req, res, next) {
        var message;
        if (req.session.passport) {
            acl.isAllowed(req.session.passport.user, req.url, req.method, (err, res) => {
                if (res) {
                    next();
                } else {
                    message = err;
                }
            });
        } else {
            message = "You do not have permission to access that page.";      
            res.redirect('/');
        }
        console.log(message);
    }
}

module.exports = (function(app, acl) {
    app.route('/')
        .get(dashboard.dashboard);

    app.route('/jobs')
        .get(dashboard.jobs);

    app.route('/emps')
    	.get(dashboard.emps);

    app.route('/labor')
    	.get(dashboard.labor);

    app.route('/payroll')
    	.get(dashboard.payroll);

    app.route('/travel')
    	.get(dashboard.travel);

    app.route('/repairs')
        .get(dashboard.repairs);

    app.route('/requests')
        .get(verify(acl), dashboard.requests);

    app.route('/signin')
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/labor',
            failureFlash: true
        }));
});
    
