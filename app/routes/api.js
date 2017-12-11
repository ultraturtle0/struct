const api = require('../controllers/api.server.controller');

module.exports = (function (app) {
	app.route('/api/jobs')
		.get(api.jobs)
		.post(api.addjob);
	app.route('/api/emps')
		.get(api.emps)
		.post(api.addemp);
}); 