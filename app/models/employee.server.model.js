var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpSchema = new Schema({
	EMP_NAME: String,
	EMP_PHONE: Number,
	EMP_EMAIL: String,
	WAGE: {
		type: Number,
		default: 15,
	},
	MILEAGE: Number
}, {
	autoIndex: false
});

mongoose.model('Emp', EmpSchema)
	.on('index', (err) => {
    	console.log('indexing error: ' + err.message);
	});