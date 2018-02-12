const request = require('request-promise');
const config = require('../../config/config');

exports.$distance = function (query) {
    query.key = config.google_key;
    const api_url = 'https://maps.googleapis.com/maps/api/distancematrix/json?';

    return request.get({
            url: api_url,
            qs: query
        })
        .catch((err) => {
            console.log('error pinging google api: ');
            console.log(err);
        });
}
