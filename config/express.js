const config = require('./config');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

module.exports = function() {
    const app = express();

    (process.env.NODE_ENV === 'development') ?
        app.use(morgan('dev'))
        : app.use(morgan('combined'));

    app.use(bodyParser()); /* .urlencoded({
        extended: true
    })); */

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    require('../app/routes/dashboard.js')(app);
    require('../app/routes/api.js')(app);
    
    app.use('/lib', express.static('./node_modules'));
    app.use('/public', express.static('./public'));

    return app;

};
