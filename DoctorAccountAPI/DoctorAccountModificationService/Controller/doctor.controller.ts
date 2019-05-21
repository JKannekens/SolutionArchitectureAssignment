const Doctor = require('../../Model/doctor.model.ts');
const messagePublisher = require('../../Messaging/RabbitMQMessagePublisher.js');
// let registerDoctor = require('../Command/registerdoctor.command.ts');

module.exports = {

    async getDoctorById(req, res, next) {
        let doctorId = req.body.doctorId;

        Doctor.findOne({ doctorId: doctorId })
            .then((doctor) => {
                if (doctor !== null) {
                    res.status(200)
                        .contentType('application/json')
                        .send(doctor);
                } else {
                    res.status(400)
                        .json({ msg: "Could not find doctor" });
                }
            })
            .catch((err) => {
                res.status(500)
                    .json({ msg: "Something went wrong, try again later" });
                console.log(err);
            });
    },

    async getDoctorByLastName(req, res, next) {
        let lastName = req.body.lastName;

        Doctor.findOne({ lastName: lastName })
            .then((doctor) => {
                if (doctor !== null) {
                    res.status(200)
                        .contentType('application/json')
                        .send(doctor);
                } else {
                    res.status(400)
                        .json({ msg: "Could not find doctor" });
                }
            })
            .catch((err) => {
                res.status(500)
                    .json({ msg: "Error retrieving Doctor" });
                console.log(err);
            })
    },

    async registerDoctor(req, res, next) {
        let registerDoctor = req.body;

        Doctor.findOne({ lastName: registerDoctor.lastName })
            .then((doctors) => {

                if (doctors === null || doctors.address !== registerDoctor.address ) {
                    Doctor.create(registerDoctor)
                        .then((response) => {
                            messagePublisher.publish("doctor", "doctor.register", registerDoctor);
                            res.status(200)
                                .contentType('application/json')
                                .send(response);
                        })
                        .catch((err) => {
                            res.status(500)
                                .json({ msg: "Error creating Doctor" });
                            console.log(err);
                        });
                } else {
                    res.status(400)
                        .json({ msg: "Doctor already exists" });
                }
            })
            .catch((err) => {
                res.status(500)
                    .json({ msg: "Something went wrong, try again later" });
                console.log(err);
            })
    },

    async editDoctorById(req, res, next) {
        let editedDoctor = req.body;

        Doctor.findOne({ doctorId: editedDoctor.doctorId })
            .then((doctor) => {
                if (doctor !== null) {
                    Doctor.findOneAndUpdate({ doctorId: editedDoctor.doctorId })
                        .then((resp) => {
                            res.status(200)
                                .contentType('application/json')
                                .send(resp);
                        })
                        .catch((err) => {
                            res.status(500)
                                .json({ msg: "Something went wrong editing, try again later" })
                            console.log(err);
                        });
                } else {
                    res.status(400)
                        .json({ msg: "Could not find doctor" });
                }
            })
            .catch((err) => {
                res.status(500)
                    .json({ msg: "Error finding doctor" });
                console.log(err);
            })
    },

    async deleteDoctor(req, res, next) {
        let doctorId = req.body.doctorId;

        Doctor.findOne({ doctorId: doctorId })
            .then((doctor) => {
                if (doctor !== null) {
                    Doctor.findOneAndDelete({ doctorId: doctorId })
                        .then((resp) => {
                            messagePublisher.publish("doctor", "doctor.delete", req.body);
                            res.status(200)
                                .contentType('application/json')
                                .send(resp);
                        })
                        .catch((err) => {
                            res.status(500)
                                .json({ msg: "Could not delete doctor" });
                            console.log(err);
                        });
                } else {
                    res.status(400)
                        .json({ msg: "Doctor does not exist in system" });
                }
            })
            .catch((err) => {
                res.status(400)
                    .json({ msg: "Error looking for doctor in system" });
                console.log(err);
            })
    }
};
