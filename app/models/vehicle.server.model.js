var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RepairSchema = new Schema({
	REPAIR_NAME: String,
	REPAIR_COST: Number,
	REPAIR_DATE: {
		type: Date,
		default: Date.now
	},
	DESCRIPTION: String
}, {
	autoIndex: false
});

mongoose.model('Repair', RepairSchema)
	.on('index', (err) => {
		console.log('indexing error: ' + err.message);
	});

const VehicleSchema = new Schema({
	VEHICLE_NAME: String,
	VEHICLE_REPAIRS: [{
		type: Schema.Types.ObjectId,
		ref: 'Repair'
	}]
}, {
	autoIndex: false
});

mongoose.model('Vehicle', VehicleSchema)
	.on('index', (err) => {
		console.log('indexing error: ' + err.message);
	});