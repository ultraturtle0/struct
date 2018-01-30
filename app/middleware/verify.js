module.exports = function(acl) {
    return function (req, res, next) {
        if (req.session.passport) {
            var url = req.baseUrl || req.url; // ALLOWS FOR ROUTER OR STANDARD MIDDLEWARE USE
            console.log(url);
            acl.isAllowed(req.session.passport.user.toString(), url, req.method, (err, allowed) => {
                console.log(err);
                if (allowed) {
                    next();
                } else {
                    console.log('ACCESS DENIED');
                    res.redirect('/signin');
                }
            });
        } else {
            console.log("Not signed in.");
            res.redirect('/signin');
        }
    }
}
