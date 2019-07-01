const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentEventSchema = new Schema({
    routingkey: {
        type: String,
        required: true
    },
    appointment: {
        type: mongoose.Schema.Types.Object,
        ref: 'appointment',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const AppointmentEvent = mongoose.model('appointmentEvent', AppointmentEventSchema);

module.exports = AppointmentEvent;
