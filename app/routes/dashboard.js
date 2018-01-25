const dashboard = require('../controllers/dashboard.server.controller');
const passport = require('passport');
var router = require('express').Router();
var verify = require('../middleware/verify');

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
    
