const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ReadSchema = new Schema({
    patient: {
        bsn: {
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
    },
    doctor: {
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
    },
    appointment: {
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
        location: {
            type: String,
            required: true
        }
});

const Read = mongoose.model('read', ReadSchema);

module.exports = Read;
