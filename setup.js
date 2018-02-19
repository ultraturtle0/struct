const $mongoose = require('./config/mongoose')();
const $acl = require('./config/acl').init($mongoose);

const mongoose = require('mongoose');

var Emp = mongoose.model('Emp');

var webmaster = require('../../../../struct_keys/webmaster.js');

var emp = new Emp(webmaster);
emp.save()
    .then((wm) => {
        return $acl.then((acl) => {
            acl.addUserRoles(wm._id.toString(), 'admin');
        });
    })
    .catch((err) => {
        console.log(err);
    });
        
