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
});
    
