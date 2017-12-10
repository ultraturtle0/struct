var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    JOB_NUMBER: Number,
    JOB_NAME: String,
    CUSTOMER_NAME: String,
    CUSTOMER_PHONE: Number,
    CUSTOMER_EMAIL: String
}, {
    autoIndex: false
});

mongoose.model('Job', JobSchema).on('index', (err) => {
    console.log('indexing error: ' + err.message);
});
