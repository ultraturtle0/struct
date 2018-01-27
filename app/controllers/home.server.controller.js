
exports.signin = (function(req, res, next) {
	res.render('signin', {});
});

exports.user = (function(req, res, next) {
	res.render('user', {
		user: req.session.passport.user
	});
});