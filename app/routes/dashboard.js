const dashboard = require('../controllers/dashboard.server.controller');
const passport = require('passport');

module.exports = (function(app) {
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
        .get(dashboard.requests);

    app.route('/signin')
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/labor',
            failureFlash: true
        }));
});
    
