const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({
    prescriptionId: {
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
    prescriptions: [{
        type: String,
        required: true,
        ref: 'prescription'
    }],
    dateOfPrescription: {
        type: Date,
        required: true
    }
});

const Prescription = mongoose.model('prescription', PrescriptionSchema);

module.exports = Prescription;
