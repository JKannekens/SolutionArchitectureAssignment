const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    bsn: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    streetName: {
        type: String,
        required: true
    },
    houseNr: {
        type: Number,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    deceased: {
        type: Boolean,
        required: true
    }
});

const Patient = mongoose.model('patient', PatientSchema);

module.exports = Patient;
