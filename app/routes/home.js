const home = require('../controllers/home.server.controller');
const dashboard = require('../controllers/dashboard.server.controller');
const passport = require('passport');
const verify = require('../middleware/verify');
var router = require('express').Router();

var debug = function(acl) {
	return (function(req, res, next) {
		acl.userRoles(req.session.passport.user.toString(), (err, roles) => {
			console.log('roles: ');
			console.log(roles);
			next();
		})
	});
}

var roleRedirect = function (acl) {
	return (function (req, res, next) {
		acl.hasRole(req.session.passport.user.toString(), 'admin', function (err, hasRole) {
			if (hasRole) {
				res.redirect('/dashboard');
			} else {
				res.redirect('/user');
			}
		});
	});
}

module.exports = function (app, acl) {
	app.route('/')
		.get((req, res) => {
			res.redirect('/signin');
		});
    app.route('/signin')
    	.get(home.signin)
    	.post(passport.authenticate('local'), roleRedirect(acl));
    app.route('/user')
    	.get(verify(acl), home.user);
}