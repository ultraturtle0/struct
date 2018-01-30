const api = require('../controllers/api.server.controller');
const geo = require('../controllers/geo.server.controller');
const verify = require('../middleware/verify');

var router = require('express').Router();

module.exports = (function (app, acl) {
    router.use(verify(acl));

    router
		.get('/jobs', api.jobs)
		.post('/jobs', api.addjob)

        .get('/emps', api.emps)
		.post('/emps', api.addemp)

        .get('/labor', api.labor)
		.post('/labor', api.addlabor)

        .get('/travel', api.travel)
		.post('/travel', api.addtravel)

		.get('/work', api.work)
		.post('/work', api.addwork)

		.get('/trades', api.trades)
		.post('/trades', api.addtrade)

		.get('/repairs', api.repairs)
		.post('/repairs', api.addrepair)

		.get('/vehicles', api.vehicles)
		.post('/vehicles', api.addvehicle)

		.get('/requests', api.requests)
		.post('/requests', api.addrequest)
		.delete('/requests', api.deleterequest);

    app.use('/api', router);

	app.route('/api/geo')
		.get(geo.distance);
}); 
