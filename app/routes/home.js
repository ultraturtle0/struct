const home = require('../controllers/home.server.controller');
const dashboard = require('../controllers/dashboard.server.controller');
const passport = require('passport');

var roleRedirect = function (acl) {
	return (function (req, res, next) {
		acl.hasRole(req.session.passport.user.toString(), 'admin', function (err, hasRole) {
			if (hasRole) {
				res.redirect('/dashboard');
			} else {
				res.redirect('/submit');
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
}