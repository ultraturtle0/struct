const dashboard = require('../controllers/dashboard.server.controller');
const passport = require('passport');

/* var verify = function(acl) {
    return function (req, res, next) {
        if (acl.isAllowed(req.session.user, req.url, req.method)) {
            next();
        }
} */

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
        .get(acl.middleware(0, (req) => {
            acl.isAllowed(req.session.passport.user, 'requests', 'view', (_, role) => {
                console.log(role);
            });
            return req.session.passport.user;
        }), dashboard.requests);

    app.route('/signin')
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/labor',
            failureFlash: true
        }));
});
    
