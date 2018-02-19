var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const EmpSchema = new Schema({
	EMP_NAME: String,
	EMP_PHONE: Number,
	EMP_EMAIL: String,
    ADMIN: {
        type: Boolean,
        default: false
    },
	WAGE: {
		type: Number,
		default: 15,
	},
	MILEAGE: Number,
	password: String,
	salt: String,
	provider: String,
	providerId: String,
	providerData: {},
}, {
	autoIndex: false
});

EmpSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

EmpSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

EmpSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

mongoose.model('Emp', EmpSchema)
	.on('index', (err) => {
    	console.log('indexing error: ' + err.message);
	});
