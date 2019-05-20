const Appointment = require('../../Model/appointment.model');
let createPatientAppointment = require('../Command/createPatientAppointment.command');
let patientAppointmentCreated = require('../Event/patientAppointmentCreated.event');

module.exports = {
    getAppointmentsByDate(req, res, next) {
        let date = req.body.date;

        Appointment.find({date: date})
            .then((appointments) => {
                res.sendStatus(200)
                    .contentType('application/json')
                    .send(appointments);
            })
            .catch((err) => {
                res.sendStatus(500)
                    .json({msg: "Error getting appointments, try again later"});
                console.log(err);
            });
    },

    getAppointmentById(req, res, next) {
        let appointmentId = req.body.appointmentid;

        Appointment.find({appointmentId: appointmentId})
            .then((appointment) => {
                if(appointment !== null) {
                    res.sendStatus(200)
                        .contentType('application/json')
                        .send(appointment);
                } else {
                    res.sendStatus(400)
                        .json({msg: "Appointment doesn't exist"});
                }
            })
            .catch((err) => {
                res.sendStatus(500)
                    .json({msg: "Error getting appointment"});
                console.log(err);
            });
    },

    createAppointment(req, res, next) {
        createPatientAppointment = req.body.appointmentrequest;

        Appointment.find({datetime: createPatientAppointment.date})
            .then((appointments) => {
                let alreadyTaken = false;
                appointments.filter((appointment) => {
                    if (appointment.time == createPatientAppointment.time) {
                        alreadyTaken = true
                    }
                });
                if(!alreadyTaken) {
                    Appointment.create(createPatientAppointment)
                        .then((response) => {
                            res.sendStatus(200)
                                .contentType('application/json')
                                .send(response);
                        })
                        .catch((err) => {
                            res.sendStatus(500)
                                .json({msg: "Error creating appointment"});
                            console.log(err);
                        })
                }
            })
            .catch((err) => {
                res.sendStatus(500)
                    .json({msg: "Error, try again later"});
                console.log(err);
            });
    },

    editAppointmentById(req, res, next) {
        let editedAppointment = req.body.appointment;

        Appointment.findOneAndUpdate({appointmentId: editedAppointment.appointmentId})
            .then((response) => {
                res.sendStatus(200)
                    .contentType('application/json')
                    .send(response);
            })
            .catch((err) => {
                res.sendStatus(500)
                    .json({msg: "Error editing appointment"});
                console.log(err);
            });
    },

    deleteAppointmentById(req, res, next) {
        let appointment = req.body.appointment;

        Appointment.findOne({appointmentId: appointment.appointmentId})
            .then((response) => {
                if(response !== null) {
                    Appointment.findOneAndDelete({appointmentId: appointment.appointmentId})
                        .then((response) => {
                            res.sendStatus(200)
                                .contentType('application/json')
                                .send(response);
                        })
                        .catch((err) => {
                            res.sendStatus(500)
                                .json({msg: "Error deleting apppointment, try again later"});
                            console.log(err);
                        })
                }
            });
    }
};