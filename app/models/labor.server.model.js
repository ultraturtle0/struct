var mongoose = require('mongoose')
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

const TradeSchema = new Schema({
	TRADE_NAME: String,
	WORKS: [WorkSchema]
}, {
	autoIndex: false
});

mongoose.model('Trade', TradeSchema)
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
	CATEGORY: {
		type: Schema.Types.ObjectId,
		ref: 'Trade'
	},
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