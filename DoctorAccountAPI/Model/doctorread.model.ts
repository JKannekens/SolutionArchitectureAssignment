const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://mongo:27017/hospitaldoctorread');

const DoctorRead = conn.model('doctorRead', new mongoose.Schema({
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

module.exports = DoctorRead;
