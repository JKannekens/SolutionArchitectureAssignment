// import createPatientAppointmentCommand from '../Command/createPatientAppointment.command';

const Appointment = require('../../Model/appointment.model.ts');
const messagePublisher = require('../../Messaging/RabbitMQMessagePublisher.js');
let createPatientAppointmentCommand = require('../Command/createPatientAppointment.command.ts');
let patientAppointmentCreated = require('../Event/patientAppointmentCreated.event.ts');

module.exports = {
    async getAppointmentsByDate(req, res, next) {
        let date = req.body.date;

        Appointment.find({ date: date })
            .then((appointments) => {
                res.status(200)
                    .contentType('application/json')
                    .send(appointments);
            })
            .catch((err) => {
                res.status(500)
                    .json({ msg: "Error getting appointments, try again later" });
                console.log(err);
            });
    },

    async getAppointmentById(req, res, next) {
        let appointmentId = req.body.appointmentId;

        Appointment.findOne({ appointmentId: appointmentId })
            .then((appointment) => {
                if (appointment !== null) {
                    res.status(200)
                        .contentType('application/json')
                        .send(appointment);
                } else {
                    res.status(400)
                        .json({ msg: "Appointment doesn't exist" });
                }
            })
            .catch((err) => {
                res.status(500)
                    .json({ msg: "Error getting appointment" });
                console.log(err);
            });
    },

    async createAppointment(req, res, next) {
        let appointmentToCreate = createPatientAppointmentCommand(req.body);

        Appointment.findOne({ date: appointmentToCreate.date })
            .then((appointment) => {

                if (appointment === null || appointment.date !== appointment.date ) {
                    Appointment.create(patientAppointmentCreated("appointment.create", appointmentToCreate))
                        .then((response) => {
                            messagePublisher.publish("appointment", "appointment.create", appointmentToCreate);
                            res.status(200)
                                .contentType('application/json')
                                .send(response);
                        })
                        .catch((err) => {
                            res.status(500)
                                .json({ msg: "Error creating Appointment" });
                            console.log(err);
                        });
                } else {
                    res.status(400)
                        .json({ msg: "Appointment already exists" });
                }
            })
            .catch((err) => {
                res.status(500)
                    .json({ msg: "Something went wrong, try again later" });
                console.log(err);
            })
    },

    async editAppointmentById(req, res, next) {
        let editedAppointment = req.body.appointment;

        Appointment.findOneAndUpdate({ appointmentId: editedAppointment.appointmentId })
            .then((response) => {
                res.status(200)
                    .contentType('application/json')
                    .send(response);
            })
            .catch((err) => {
                res.status(500)
                    .json({ msg: "Error editing appointment" });
                console.log(err);
            });
    },

    async deleteAppointmentById(req, res, next) {
        let appointmentId = req.body;

        Appointment.findOne({ appointmentId: appointmentId })
            .then((response) => {
                if (response !== null) {
                    Appointment.findOneAndDelete({ appointmentId: appointmentId })
                        .then((response) => {
                            res.status(200)
                                .contentType('application/json')
                                .send(response);
                        })
                        .catch((err) => {
                            res.status(500)
                                .json({ msg: "Error deleting appointment, try again later" });
                            console.log(err);
                        })
                }
            });
    },
};
