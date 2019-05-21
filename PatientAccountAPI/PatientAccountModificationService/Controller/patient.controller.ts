const messagePublisher = require('../../Messaging/RabbitMQMessagePublisher');
const Patient = require('../../Model/patient.model.ts');
// let registerPatient = require('../Command/registerpatient.command.ts');
// let patientRegistered = require('../Event/patientRegistered.event.ts');

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
        const registerPatient = req.body;

        Patient.findOne({bsn: registerPatient.bsn})
            .then((patient) => {
                if(patient === null) {
                    Patient.create(registerPatient)
                        .then(() => {
                            const patientRegistered = registerPatient;
                            messagePublisher.publish("patient", "patient.register", patientRegistered);
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
    }
};
