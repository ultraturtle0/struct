process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configMongoose = require('./config/mongoose');

const configExpress = require('./config/express');
const configPassport = require('./config/passport');
const config = require('./config/config');
var app;

const $db = configMongoose();
var configure = $db.then(require('./config/acl.js'))
    .then(() => {
        configPassport();
        const app = configExpress();
        return app;
    })
    .catch((err) => {
        console.log(err);
    });


configure
    .then((app) => {
        app.listen(config.port);
        module.exports = app;
        console.log('Server running at ' + config.domain + ':' + config.port + '/');
    });

