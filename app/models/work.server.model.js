var mongoose = require('mongoose');
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