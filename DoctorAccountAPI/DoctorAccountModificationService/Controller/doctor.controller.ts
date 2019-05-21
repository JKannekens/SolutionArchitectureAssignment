const Doctor = require('../../Model/doctor.model.ts');
// let registerDoctor = require('../Command/registerdoctor.command.ts');

module.exports = {

    async getDoctorById(req, res, next) {
        let doctorId = req.body.doctorid;

        Doctor.find({ doctorId: doctorId })
            .then((doctor) => {
                if (doctor !== null) {
                    res.sendStatus(200)
                        .contentType('application/json')
                        .send(doctor);
                } else {
                    res.sendStatus(400)
                        .json({ msg: "Could not find doctor" });
                }
            })
            .catch((err) => {
                res.sendStatus(500)
                    .json({ msg: "Something went wrong, try again later" });
                console.log(err);
            });
    },

    async getDoctorByLastName(req, res, next) {
        let lastName = req.body.lastname;

        Doctor.find({ lastName: lastName })
            .then((doctor) => {
                if (doctor !== null) {
                    res.sendStatus(200)
                        .contentType('application/json')
                        .send(doctor);
                } else {
                    res.sendStatus(400)
                        .json({ msg: "Could not find doctor" });
                }
            })
            .catch((err) => {
                res.sendStaus(500)
                    .json({ msg: "Error retrieving Doctor" });
                console.log(err);
            })
    },

    async registerDoctor(req, res, next) {
        let registerDoctor = req.body;

        Doctor.findOne({ lastName: registerDoctor.lastName })
            .then((doctors) => {
                let alreadyExists = false;

                if (doctors !== null) {
                    doctors.filter((doctor) => {
                        if (doctor.address == registerDoctor.address) {
                            alreadyExists = true
                        }
                    })
                }

                if (!alreadyExists) {
                    Doctor.create(registerDoctor)
                        .then((response) => {
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
        let editedDoctor = req.body.doctor;

        Doctor.find({ doctorId: editedDoctor.doctorId })
            .then((doctor) => {
                if (doctor !== null) {
                    Doctor.findOneAndUpdate({ doctorId: editedDoctor.doctorId })
                        .then((resp) => {
                            res.sendStatus(200)
                                .contentType('application/json')
                                .send(resp);
                        })
                        .catch((err) => {
                            res.sendStatus(500)
                                .json({ msg: "Something went wrong editing, try again later" })
                            console.log(err);
                        });
                } else {
                    res.sendStatus(400)
                        .json({ msg: "Could not find doctor" });
                }
            })
            .catch((err) => {
                res.sendStatus(500)
                    .json({ msg: "Error finding doctor" });
                console.log(err);
            })
    },

    async deleteDoctor(req, res, next) {
        let doctorId = req.body.doctorid;

        Doctor.find({ doctorId: doctorId })
            .then((doctor) => {
                if (doctor !== null) {
                    Doctor.findOneAndDelete({ doctorId: doctorId })
                        .then((resp) => {
                            res.sendStatus(200)
                                .contentType('application/json')
                                .send(res);
                        })
                        .catch((err) => {
                            res.sendStatus(500)
                                .json({ msg: "Could not delete doctor" });
                            console.log(err);
                        });
                } else {
                    res.sendStatus(400)
                        .json({ msg: "Doctor does not exist in system" });
                }
            })
            .catch((err) => {
                res.sendStatus(400)
                    .json({ msg: "Error looking for doctor in system" });
                console.log(err);
            })
    }
};
