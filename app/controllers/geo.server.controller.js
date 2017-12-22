const request = require('request');
const config = require('../../config/config');

exports.distance = function (req, res, next) {
	var query = {};

	query.key = config.google_key;

	var api_url = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
	/*var start_url = req.query.start.split(' ').join('+');
	var end_url = req.query.end.split(' ').join('+');*/

	query.key = config.google_key;
	query.origins = req.query.origins; //start_url.concat('|', end_url);
	query.destinations = req.query.destinations;
	console.log(query);

	request.get({
			url: api_url,
			qs: query
		}, function (err, data, body) {
			if (data) {
				console.log(data);
			}
			if (err) {
				console.log(err);
				next(err);
			}
			res.json(data);
		});
}