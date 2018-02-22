process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('./config/config');

const $mongoose = require('./config/mongoose')();
var webmaster = config.webmaster;

$mongoose
    .then(() => {
        var mongoose = require('mongoose');
        var Emp = mongoose.model('Emp');
        var emp = new Emp(webmaster);
        return emp.save();
    })
    .then((wm) => {
        var acl = require('./config/acl');
        return acl.$acl.then(() => {
            acl.instance.addUserRoles(wm._id.toString(), 'admin');
        });
    })
    .catch((err) => {
        console.log(err);
    });
       

process.exit();
