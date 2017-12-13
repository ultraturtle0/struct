var mongoose = require('mongoose')
const Schema = mongoose.Schema;
const TradeSchema = mongoose.model('Trade');
const WorkSchema = mongoose.model('Work');

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
	CATEGORY: [TradeSchema],
	SUBCATEGORY: [WorkSchema],
	DESCRIPTION: String
}, {
	autoIndex: false
});

mongoose.model('Labor', LaborSchema)
	.on('index', (err) => {
		console.log('indexing error: ' + err.message);
	});