const config = require('./config');
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

module.exports = function() {
    var $db = mongoose.connect(config.db);
    require('../app/models/job.server.model.js');
    require('../app/models/employee.server.model.js');
    require('../app/models/labor.server.model.js');
    require('../app/models/travel.server.model.js');
    require('../app/models/vehicle.server.model.js');
    require('../app/models/day.server.model.js');
    return $db;
};
