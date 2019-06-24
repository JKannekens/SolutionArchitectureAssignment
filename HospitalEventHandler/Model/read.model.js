const mongoose = require('mongoose');
var conn = mongoose.createConnection('mongodb://mongo:27017/hospitalread');

const Read = conn.model('read', new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.Object,
        ref: 'patient',
        required: false
    },
    doctor: {
        type: mongoose.Schema.Types.Object,
        ref: 'doctor',
        required: false
    },
    appointment: {
        type: mongoose.Schema.Types.Object,
        ref: 'appointment',
        required: false
    }
}));

module.exports = Read;
