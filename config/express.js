const config = require('./config');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');

module.exports = function($acl) {
    const app = express();

    (process.env.NODE_ENV === 'development') ?
        app.use(morgan('dev'))
        : app.use(morgan('combined'));

    app.use(bodyParser.urlencoded({ // DOES THIS BREAK THINGS?
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    $acl.then((acl) => {
        console.log(acl);
        require('../app/routes/dashboard.js')(app, acl);
        require('../app/routes/api.js')(app, acl);
    });

    app.use('/lib', express.static('./node_modules'));
    app.use('/public', express.static('./public'));

    return app;

};
