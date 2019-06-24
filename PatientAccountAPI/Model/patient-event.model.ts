const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientEventSchema = new Schema({
    routingkey: {
        type: String,
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.Object,
        ref: 'patient',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const PatientEvent = mongoose.model('patientEvent', PatientEventSchema);

module.exports = PatientEvent;
