module.exports = function(acl) {
    return function (req, res, next) {
        if (req.session.passport) {
            console.log(req.url);
            acl.isAllowed(req.session.passport.user.toString(), req.url, req.method, (err, allowed) => {
                console.log(err);
                if (allowed) {
                    console.log(req.url);
                    next();
                } else {
                    res.redirect('/signin');
                }
            });
        } else {
            console.log("Not signed in.");
            res.redirect('/signin');
        }
    }
}