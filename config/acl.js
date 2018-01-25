var config = require('./config');
var acl = require('acl');
const mongoose = require('mongoose');

module.exports = function ($db) {
	return $db.then(function () {
		acl = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_', true));
		acl.allow('admin',
			['/', '/jobs', '/emps', '/labor', '/payroll', '/travel', '/repairs', '/requests'],
			'*'
		);

		acl.addUserRoles('5a6932f75159a437de872ceb', 'admin');
		return acl;
	});
}