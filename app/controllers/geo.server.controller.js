const request = require('request');
const config = require('../../config/config');
const geo = require('../services/geo.server.service.js');

exports.distance = function (req, res, next) {
    geo.$distance(req.query)
        .then(res.json(JSON.parse(body)))
		.catch((err) => {
            console.log('error pinging google api: ');
            console.log(err);
        });
}
