var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TravelSchema = new Schema({
	JOB_ID_START: {
		type: Schema.Types.ObjectId,
		ref: 'Job'
	},
	JOB_ID_END: {
		type: Schema.Types.ObjectId,
		ref: 'Job'
	},
	LOC_START_LAT: Number,
	LOC_START_LNG: Number,
	LOC_END_LAT: Number,
	LOC_END_LNG: Number,
	EMP_ID: {
		type: Schema.Types.ObjectId,
		ref: 'Emp'
	},
	VEHICLE_ID: {
		type: Schema.Types.ObjectId,
		ref: 'Vehicle'
	},
	TIME_START: Date,
	TIME_END: Date
}, {
	autoIndex: false
});

mongoose.model('Travel', TravelSchema)
	.on('index', (err) => {
		console.log('indexing error: ' + err.message);
	});