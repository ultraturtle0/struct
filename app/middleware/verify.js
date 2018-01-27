module.exports = function(acl) {
    return function (req, res, next) {
        console.log(req.baseUrl || req.url);
        if (req.session.passport) {
            var url = req.baseUrl || req.url; // ALLOWS FOR ROUTER OR STANDARD MIDDLEWARE USE
            acl.isAllowed(req.session.passport.user.toString(), url, req.method, (err, allowed) => {
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