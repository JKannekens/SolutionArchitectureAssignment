const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorEventSchema = new Schema({
    routingkey: {
        type: String,
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.Object,
        ref: 'doctor',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const DoctorEvent = mongoose.model('doctorEvent', DoctorEventSchema);

module.exports = DoctorEvent;
