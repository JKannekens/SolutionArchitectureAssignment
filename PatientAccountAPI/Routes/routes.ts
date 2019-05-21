const PatientAccountController = require('../PatientAccountModificationService/Controller/patient.controller.ts');
// const PatientConfirmationController = require('../PatientDataConfirmationService/Controller/patientConfirmation.controller.ts');
const AppointmentController = require('../AppointmentService/Controller/appointment.controller.ts');
const express = require('express');
const router = express.Router();

    //Account
    // app.post('/patientAccount/getPatientByBsn', PatientAccountController.getPatientByBsn);
    // app.post('/patientAccount/getPatientByLastName', PatientAccountController.getPatientByLastName);
    // app.put('/patientAccount/editPatientByBsn', PatientAccountController.editPatientByBsn);
    // app.post('/patientAccount/registerPatient', PatientAccountController.registerPatient);
    router.post('/patientAccount/registerPatient', PatientAccountController.registerPatient);

    //Confirmation
    // app.post('/patientConfirmation/login', PatientConfirmationController.loginPatient);
    // app.post('/patientConfirmation/logout', PatientConfirmationController.logoutPatient);

    //Appointments
    // app.get('/appointments/getAppointmentsByDate', AppointmentController.getAppointmentsByDate);
    // app.get('/appointments/getAppointmentById', AppointmentController.getAppointmentById);
    router.post('/appointments/createAppointment', AppointmentController.createAppointment);
    // app.put('/appointments/editAppointmentById', AppointmentController.editAppointmentById);
    // app.delete('/appointments/deleteAppointmentById', AppointmentController.deleteAppointmentById);

module.exports = router;
