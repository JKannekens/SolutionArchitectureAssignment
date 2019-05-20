const messagePublisher = require('../../Node.Infastructure.Messaging/IMessagePublisher');
const Patient = require('../Model/patient.model');
let registerPatient = require('../Command/registerpatient.command');
let patientRegistered = require('../Event/patientRegistered.event');

module.exports = {
    async getPatientByBsn(req, res, next) {
        let bsn = req.body.bsn;

        Patient.find({bsn: bsn})
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
                    .json({msg: "Patient does not exist"});
                console.log(err);
            })
    },

    async editPatientByBsn(req, res, next) {
        let bsn = req.body.bsn;
        let editedPatient = req.body.patient;

        Patient.findOneAndUpdate({bsn: bsn}, editedPatient)
            .then((patient) => {
                res.sendStatus(200)
                    .contentType('application/json')
                    .send(patient)

            })
            .catch((err) => {
                res.sendStatus(500)
                    .json({msg: "Something went wrong, try again later"});
                console.log(err);
            });
    },

    async registerPatient(req, res, next) {
        registerPatient = req.body.patient;

        Patient.find({bsn: registerPatient.bsn})
            .then((patient) => {
                if(patient === null) {
                    Patient.create(registerPatient)
                        .then(() => {
                            patientRegistered = registerPatient;
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
