process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configMongoose = require('./config/mongoose');
const configExpress = require('./config/express');
const configPassport = require('./config/passport');
const configAcl = require('./config/acl');
const config = require('./config/config');

const $db = configMongoose();
const acl = configAcl($db);
const app = configExpress(acl);
const passport = configPassport();


app.listen(config.port);

module.exports = app;

console.log('Server running at ' + config.domain + ':' + config.port + '/');
