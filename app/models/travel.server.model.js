var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TravelSchema = new Schema({
	LOC_START: Number,
	LOC_END: Number,
	EMP_ID: {
		Schema.Types.ObjectId,
		ref: 'Emp'
	},
	VEHICLE_ID {
		Schema.Types.ObjectId,
		ref: 'Vehicle'
	},
	TIME_START: Date,
	TIME_END: Date,
	DESCRIPTION: String
});

mongoose.model('Travel', TravelSchema)
	.on('index', (err) => {
		console.log('indexing error: ' + err.message);
	});