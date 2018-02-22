process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('./config/config');

var webmaster = config.webmaster;
var $db = require('./config/mongoose')();

$db
    .then(() => {
        const mongoose = require('mongoose');
        var Emp = mongoose.model('Emp');
        var emp = new Emp(webmaster);
        return emp.save();
    })
    .then((wm) => {
        var acl = require('./config/acl');
        return acl.instance.addUserRoles(wm._id.toString(), 'admin');
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        process.exit();
    });


