var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DaySchema = new Schema({
    DAY: Date,
    EMP_ID: {
        type: Schema.Types.ObjectId,
        ref: 'Emp',
        required: true
    },
    TIME_START: Date,
    TIME_END: Date,
    HOURS: Number,
    LABORS: [{
        type: Schema.Types.ObjectId,
        ref: 'Labor',
        default: []
    }],
    TRAVELS: [{
        type: Schema.Types.ObjectId,
        ref: 'Travel',
        default: []
    }]
}, {
    autoIndex: false
});

mongoose.model('Day', DaySchema)
    .on('index', (err) => {
        console.log('indexing error: ' + err.message);
    });
