var config = require('./config');
var acl = require('acl');
const mongoose = require('mongoose');

module.exports = function ($db) {
	return $db.then(function () {
		acl = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_', true));
		acl.allow('admin',
			['/', '/dashboard', '/public', '/user'],
			'*'
		);
		acl.allow('user',
			['/', '/user'],
			'*'
		);

		acl.addUserRoles('5a6932f75159a437de872ceb', 'admin');
		acl.addUserRoles('5a6cf1e6f18551f99c08698e', 'user');
		return acl;
	});
}