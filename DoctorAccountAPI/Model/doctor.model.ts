const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DoctorSchema = new Schema({
    doctorId: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

const Doctor = mongoose.model('doctor', DoctorSchema);

module.exports = Doctor;
