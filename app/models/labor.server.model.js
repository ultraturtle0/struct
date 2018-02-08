const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const WorkSchema = new Schema({
	WORK_NAME: String
}, {
	autoIndex: false
});

mongoose.model('Work', WorkSchema)
	.on('index', (err) => {
		console.log('indexing error: ' + err.message);
	});

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
	SUBCATEGORY: {
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


const RequestSchema = new Schema({
	JOB_ID: {
		type: Schema.Types.ObjectId,
		ref: 'Job'
	},
	LOCATION: String,
	EMP_ID: {
		type: Schema.Types.ObjectId,
		ref: 'Emp',
		required: true
	},
    VEHICLE_ID: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
	TIME_START: {
		type: Date,
		required: true
	},
	TIME_END: {
		type: Date,
		required: true
	},
	SUBCATEGORY: {
		type: Schema.Types.ObjectId,
		ref: 'Work',
		required: true
	},
	DESCRIPTION: String,
	DATE_CREATED: {
		type: Date,
		default: Date.now
	}
}, {
	autoIndex: false
});

mongoose.model('Request', RequestSchema)
	.on('index', (err) => {
		console.log('indexing error: ' + err.message);
	});
