const api = require('../controllers/api.server.controller');
const geo = require('../controllers/geo.server.controller');

module.exports = (function (app) {
	app.route('/api/jobs')
		.get(api.jobs)
		.post(api.addjob);
	app.route('/api/emps')
		.get(api.emps)
		.post(api.addemp);
	app.route('/api/labor')
		.get(api.labor)
		.post(api.addlabor);
	app.route('/api/travel')
		.get(api.travel)
		.post(api.addtravel);
	app.route('/api/work')
		.get(api.work)
		.post(api.addwork);
	app.route('/api/trades')
		.get(api.trades)
		.post(api.addtrade);
	app.route('/api/repairs')
		.get(api.repairs)
		.post(api.addrepair);
	app.route('/api/vehicles')
		.get(api.vehicles)
		.post(api.addvehicle);
	app.route('/api/requests')
		.get(api.requests)
		.post(api.addrequest);

	app.route('/api/geo')
		.get(geo.distance);
}); 