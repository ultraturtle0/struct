var config = require('./config');
var acl = require('acl');
const mongoose = require('mongoose');

var instance;
var $acl = (function () {
        console.log(mongoose.connection.db);
		instance = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_', true));
		return instance.allow([
            {
                roles: ['admin'],
                allows: [
                    {
                        resources: ['/', '/dashboard', '/public', '/user', '/api'],
                        permissions: '*'
                    }
                ]
            },
		    {
                roles: ['user'],
                allows: [
                    {
                        resources: ['/', '/user', '/api'],
                        permissions: 'GET'
                    },
                    {
                        resources: ['/api/requests'],
                        permissions: 'POST'
                    }
                ]
            },
        ]);
    })();

module.exports = {
    $acl: $acl,
    instance: instance
};
