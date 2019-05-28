const messagePublisher = require('../../Messaging/RabbitMQMessagePublisher.js');
const Patient = require('../../Model/patient.model.ts');
let registerPatient = require('../Command/registerpatient.command.ts');
// let patientRegistered = require('../Event/patientRegistered.event.ts');

module.exports = {
    async getPatientByBsn(req, res, next) {
        let bsn = req.body.bsn;

        Patient.findOne({bsn: bsn})
            .then((patient) => {
                res.status(200)
                    .contentType('application/json')
                    .send(patient);
            })
            .catch((err) => {
                res.status(500)
                    .json({msg: "Could not find patient"});
                console.log(err);
            })
    },

    async getPatientByLastName(req, res, next) {
        let lastname = req.body.lastName;

        Patient.find({lastName: lastname})
            .then((patients) => {
                res.status(200)
                    .contentType('application/json')
                    .send(patients)
            })
            .catch((err) => {
                res.status(500)
                    .json({msg: "Patient does not exist"});
                console.log(err);
            })
    },

    async editPatientByBsn(req, res, next) {
        let editedPatient = req.body;

        Patient.findOne({ bsn: editedPatient.bsn })
            .then((doctor) => {
                if (doctor !== null) {
                    Patient.findOneAndUpdate({ bsn: editedPatient.bsn }, editedPatient)
                        .then((resp) => {
                            messagePublisher.publish("patient", "patient-edited-queue","patient.edited", editedPatient);
                            res.status(200)
                                .contentType('application/json')
                                .send(resp);
                        })
                        .catch((err) => {
                            res.status(500)
                                .json({ msg: "Something went wrong editing, try again later" });
                            console.log(err);
                        });
                } else {
                    res.status(400)
                        .json({ msg: "Could not find patient" });
                }
            })
            .catch((err) => {
                res.status(500)
                    .json({ msg: "Error finding patient" });
                console.log(err);
            })
    },

    async registerPatient(req, res, next) {
        const registerPatientCmd = registerPatient(req.body);

        Patient.findOne({bsn: registerPatientCmd.bsn})
            .then((patient) => {
                if(patient === null) {
                    Patient.create(registerPatientCmd)
                        .then(() => {
                            messagePublisher.publish("patient", "patient-registered-queue","patient.registered", registerPatientCmd);
                            res.status(200).json({msg: "Patient created"});
                        })
                } else {
                    res.status(400)
                        .json({msg: "Patient already exists"});
                }
            })
            .catch((err) => {
                res.status(500)
                    .json({msg: "Something went wrong, try again later"});
                console.log(err);
            })
    },

    async deletePatient(req, res, next) {
        let patientBSN = req.body.bsn;

        Patient.findOne({ bsn: patientBSN })
            .then((doctor) => {
                if (doctor !== null) {
                    Patient.findOneAndDelete({ bsn: patientBSN })
                        .then((resp) => {
                            messagePublisher.publish("patient", "patient-deleted-queue","patient.deleted", req.body);
                            res.status(200)
                                .contentType('application/json')
                                .send(resp);
                        })
                        .catch((err) => {
                            res.status(500)
                                .json({ msg: "Could not delete patient" });
                            console.log(err);
                        });
                } else {
                    res.status(400)
                        .json({ msg: "Patient does not exist in system" });
                }
            })
            .catch((err) => {
                res.status(400)
                    .json({ msg: "Error looking for patient in system" });
                console.log(err);
            })
    }
};
