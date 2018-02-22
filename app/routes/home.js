const acl = require('../../config/acl');
const home = require('../controllers/home.server.controller');
const api = require('../controllers/api.server.controller');
const dashboard = require('../controllers/dashboard.server.controller');
const passport = require('passport');
const verify = require('../middleware/verify');
var router = require('express').Router();


var roleRedirect = function (req, res, next) {
	acl.instance.hasRole(req.session.passport.user.toString(), 'admin', function (err, hasRole) {
        if (hasRole) {
            res.redirect('/dashboard');
        } else {
            res.redirect('/user');
        }
    });
};


module.exports = function (app) {
	app.route('/')
		.get((req, res) => {
			res.redirect('/signin');
		});
    app.route('/signin')
    	.get(home.signin)
    	.post(passport.authenticate('local'), roleRedirect);
    app.route('/signup')
    	.get(home.signup)
        .post(api.addemp);
    app.route('/user')
    	.get(verify, home.user);
}
