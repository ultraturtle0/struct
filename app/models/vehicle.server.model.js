var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RepairSchema = new Schema({
	NAME: String,
	COST: Number,
	DATE: {
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
	NAME: String,
	REPAIRS: [RepairSchema]
}, {
	autoIndex: false
});

mongoose.model('Vehicle', VehicleSchema)
	.on('index', (err) => {
		console.log('indexing error: ' + err.message);
	});