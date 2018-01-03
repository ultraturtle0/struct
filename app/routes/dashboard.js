const dashboard = require('../controllers/dashboard.server.controller');

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
});
    
