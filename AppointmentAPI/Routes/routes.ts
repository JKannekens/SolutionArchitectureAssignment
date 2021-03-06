const AppointmentController = require('../AppointmentService/Controller/appointment.controller.ts');
const express = require('express');
const router = express.Router();

    //Appointments
    router.post('/getAppointmentsBetweenDates', AppointmentController.getAppointmentsBetweenDates);
    router.post('/createAppointment', AppointmentController.createAppointment);
    router.put('/editAppointmentById', AppointmentController.editAppointmentById);
    router.delete('/deleteAppointmentById', AppointmentController.deleteAppointmentById);

module.exports = router;
