const messagePublisher = require('../../Node.Infastructure.Messaging/IMessagePublisher');
const Patient = require('../Model/patient.model');
let patientRegistered = require('../Event/patientRegistered.event')

module.exports = {
    async getPatient(req, res, next) {
        let patientnr = req.body.patientNr;

        Patient.find({patientNr: patientnr})
            .then((patient) => {
                res.sendStatus(200)
                    .contentType('application/json')
                    .send(patient);
            })
            .catch((err) => {
                res.sendStatus(500)
                    .json({msg: "Could not find patient"});
                console.log(err);
            })
    },

    async getPatientByLastName(req, res, next) {
        let lastname = req.body.lastName;

        Patient.find({lastName: lastname})
            .then((patient) => {
                res.sendStatus(200)
                    .contentType('application/json')
                    .send(patient)
            })
            .catch((err) => {
                res.sendStatus(500)
                    .json({msg: "Patient does not exist"})
                console.log(err);
            })
    },

    async registerPatient(req, res, next) {
        let newPatient = new Patient();
        newPatient.bsn = req.body.bsn;
        newPatient.firstName = req.body.firstName;
        newPatient.middlename = req.body.middleName;
        newPatient.lastname = req.body.lastName;
        newPatient.age = req.body.age;
        newPatient.streetName = req.body.streetName;
        newPatient.houseNr = req.body.houseNr;
        newPatient.postalCode = req.body.postalCode;
        newPatient.city = req.body.city;
        newPatient.deceased = false;

        Patient.find({bsn: newPatient.bsn})
            .then((patient) => {
                if(patient === null) {
                    Patient.create(newPatient)
                        .then((response) => {
                            patientRegistered = newPatient;
                            messagePublisher(patientRegistered.messageType, patientRegistered, "");
                            res.sendStatus(200)
                                .json({msg: "Patient created"});
                        })
                } else {
                    res.sendStatus(400)
                        .json({msg: "Patient already exists"});
                }
            })
            .catch((err) => {
                res.sendStatus(500)
                    .json({msg: "Something went wrong, try again later"});
                console.log(err);
            })
    }
};
