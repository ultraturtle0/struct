const home = require('../controllers/home.server.controller');
const dashboard = require('../controllers/dashboard.server.controller');
const passport = require('passport');

module.exports = function (app, acl) {
	app.route('/')
		.get((req, res) => {
			res.redirect('/signin');
		});
    app.route('/signin')
    	.get(home.signin)
    	.post(function(req, res, next) {
    		passport.authenticate('local', function (err, user, info) {

	        	if (err) {
	        		return next(err);
	        	}
	        	if (!user) {
	        		return res.redirect('/signin');
	        	}
	        	req.login(user, function(err) {
	        		if (err) {
	        			return next(err);
	        		}
	        		if (acl.hasRole(user, 'admin')) {
	        			return res.redirect('/dashboard');
	        		}
	        		return res.redirect('/user');
	        	});
	        })(req, res, next);
    	});
}