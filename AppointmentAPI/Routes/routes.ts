const AppointmentController = require('../AppointmentService/Controller/appointment.controller.ts');
const express = require('express');
const router = express.Router();

    //Appointments
    router.post('/getAppointmentsByDate', AppointmentController.getAppointmentsByDate);
    router.post('/getAppointmentById', AppointmentController.getAppointmentById);
    router.post('/createAppointment', AppointmentController.createAppointment);
    // app.put('/editAppointmentById', AppointmentController.editAppointmentById);
    // app.delete('/deleteAppointmentById', AppointmentController.deleteAppointmentById);

module.exports = router;
