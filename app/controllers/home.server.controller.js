
exports.signin = (function(req, res, next) {
	res.render('signin', {});
});

exports.signup = (function(req, res, next) {
	res.render('signup', {});
});

exports.user = (function(req, res, next) {
	res.render('user', {
		user: req.session.passport.user
	});
});
