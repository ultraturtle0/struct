const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Employee = require('mongoose').model('Employee');

module.exports = function() {
    passport.use(new LocalStrategy((username, password, done) => {
        Employee.findOne({
            EMP_NAME: username
        }, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {
                    message: 'User not found.'
                });
            }

            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password.'
                });
            }

            return done(null, user);
        });
    }));
};
