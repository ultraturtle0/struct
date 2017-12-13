var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TradeSchema = new Schema({
	TRADE_NAME: String
	WORKS: [{
		type: String
	}]
}, {
	autoIndex: false
});

mongoose.model('Trade', TradeSchema)
	.on('index', (err) => {
		console.log('indexing error: ' + err.message);
	});