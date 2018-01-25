module.exports = function(acl) {
    return function (req, res, next) {
        var message;
        if (req.session.passport) {
            acl.isAllowed(req.session.passport.user, req.url, req.method, (err, res) => {
                if (res) {
                    console.log('does this work?');
                    next();
                } else {
                    message = err;
                }
            });
        } else {
            message = "You do not have permission to access that page.";      
            res.redirect('/signin');
        }
    }
}