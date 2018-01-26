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
    	.post(passport.authenticate('local'),
    		function (req, res, next) {
    			//console.log(req.session.passport.user);
	    		acl.roleUsers('admin', function (err, users) {
	    			if (users.indexOf(req.session.passport.user.toString()) != -1) {
	    				res.redirect('/dashboard');
	    			} else {
	    				res.redirect('/users')
	    			}
	    		});

    		}
    	);
}