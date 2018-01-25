const dashboard = require('../controllers/dashboard.server.controller');
const passport = require('passport');
var router = require('express').Router();

var verify = function(acl) {
    return function (req, res, next) {
        var message;
        if (req.session.passport) {
            acl.isAllowed(req.session.passport.user, req.url, req.method, (err, res) => {
                if (res) {
                    console.log('does this work?');
                    next();
                } else {
                    message = err;
                }
            });
        } else {
            message = "You do not have permission to access that page.";      
            res.redirect('/signin');
        }
    }
}

module.exports = (function(app, acl) {
    router.use(verify(acl));

    router
        .get('/', dashboard.dashboard)
        .get('/jobs', dashboard.jobs)
    	.get('/emps', dashboard.emps)
    	.get('/labor', dashboard.labor)
    	.get('/payroll', dashboard.payroll)
    	.get('/travel', dashboard.travel)
        .get('/repairs', dashboard.repairs)
        .get('/requests', dashboard.requests);

    app.use('/dashboard', router);
        
});
    
