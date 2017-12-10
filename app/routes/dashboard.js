const dashboard = require('../controllers/dashboard.server.controller');

module.exports = (function(app) {
    app.route('/')
        .get(dashboard.dashboard);
    app.route('/jobs')
        .get(dashboard.jobs)
        .post(dashboard.new_job);
});
    
