var config = require('./config');
var acl = require('acl');
const mongoose = require('mongoose');

module.exports = function ($db) {
	return $db.then(function () {
		acl = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_', true));
		acl.allow([
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
                        permissions: 'view'
                    },
                    {
                        resources: ['/api/requests'],
                        permissions: 'put'
                    }
                ]
            },
        ]);

		acl.addUserRoles('5a838a88016f6cf9858a4c11', 'admin');
		acl.addUserRoles('5a838e1e3ccc2005afca3917', 'user');
		return acl;
	});
}
