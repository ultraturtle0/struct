var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
	VEHICLE_NAME: String
}, {
	autoIndex: false
});

mongoose.model('Vehicle', VehicleSchema)
	.on('index', (err) => {
		console.log('indexing error: ' + err.message);
	});

const RepairSchema = new Schema({
	REPAIR_NAME: String,
	REPAIR_COST: Number,
	REPAIR_DATE: {
		type: Date,
		default: Date.now
	},
	VEHICLE: {
		type: Schema.Types.ObjectId,
		ref: 'Vehicle'
	},
	DESCRIPTION: String
}, {
	autoIndex: false
});

mongoose.model('Repair', RepairSchema)
	.on('index', (err) => {
		console.log('indexing error: ' + err.message);
	});

