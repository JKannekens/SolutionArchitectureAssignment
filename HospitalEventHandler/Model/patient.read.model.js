const mongoose = require('mongoose');
var conn = mongoose.createConnection('mongodb://mongo:27017/hospitalpatientread');

const PatientRead = conn.model('patientRead', new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.Object,
        ref: 'patient',
        required: false
    },
    appointment: {
        type: mongoose.Schema.Types.Object,
        ref: 'appointment',
        required: false
    }
}));

module.exports = PatientRead;
