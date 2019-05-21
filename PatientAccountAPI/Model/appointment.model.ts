const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    appointmentId: {
        type: Number,
        required: true
    },
    bsn: {
        type: Number,
        required: true
    },
    doctorId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const Appointment = mongoose.model('appointment', AppointmentSchema);

module.exports = Appointment;