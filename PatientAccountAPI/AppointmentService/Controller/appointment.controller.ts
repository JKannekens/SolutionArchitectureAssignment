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
            .catch((error) => {
                res.sendStatus(400)
                    .json({msg: "Error getting appointments, try again later"});
                console.log(error);
            })
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
                        .catch((error) => {
                            res.sendStatus(400)
                                .json({msg: "Error creating appointment"});
                            console.log(error);
                        })
                }
            })
            .catch((error) => {
                res.sendStatus(400)
                    .json({msg: "Error, try again later"});
                console.log(error);
            })
    }
};
