var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LaborSchema = new Schema({
	JOB_ID: {
		type: Schema.Types.ObjectId,
		ref: 'Job'
	},
	EMP_ID: {
		type: Schema.Types.ObjectId,
		ref: 'Emp'
	},
	TIME_START: Date,
	TIME_END: Date,
	HOURS: Number,
	LABOR_TYPE: {
		type: Schema.Types.ObjectId,
		ref: 'Work'
	},
	DESCRIPTION: String
}, {
	autoIndex: false
});

mongoose.model('Labor', LaborSchema)
	.on('index', (err) => {
		console.log('indexing error: ' + err.message);
	});