const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Emp = require('mongoose').model('Emp');

module.exports = function() {
    passport.use(new LocalStrategy((username, password, done) => {
        console.log(username);
        console.log(password);
        Emp.findOne({
            EMP_NAME: username
        }, (err, user) => {
            console.log(user);
            if (err) {
                return done(err);
            }

            if (!user) {
                console.log('NO USER');
                return done(null, false, {
                    message: 'User not found.'
                });
            }

            if (!user.authenticate(password)) {
                console.log('WRONG PASSWORD');
                return done(null, false, {
                    message: 'Invalid password.'
                });
            }

            return done(null, user);
        });
    }));
};
