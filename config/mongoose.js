const config = require('./config');
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

module.exports = function() {
    const db = mongoose.connect(config.db);
    require('../app/models/job.server.model.js');
    return db;
};
