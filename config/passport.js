const passport = require('passport');
const mongoose = require('mongoose');

module.exports = function() {
    const Emp = mongoose.model('Emp');

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        Emp.findOne({
            _id: id
        }, '-password -salt', (err, user) => {
            done(err, user);
        });
    });

    require('./strategies/local.js')();
}

