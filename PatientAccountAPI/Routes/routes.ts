const PatientAccountController = require('../PatientAccountModificationService/Controller/patient.controller.ts');
// const PatientConfirmationController = require('../PatientDataConfirmationService/Controller/patientConfirmation.controller.ts');
const AppointmentController = require('../AppointmentService/Controller/appointment.controller.ts');
const express = require('express');
const router = express.Router();

    //Account
    router.post('/patientAccount/getPatientByBsn', PatientAccountController.getPatientByBsn);
    router.post('/patientAccount/getPatientByLastName', PatientAccountController.getPatientByLastName);
    router.put('/patientAccount/editPatientByBsn', PatientAccountController.editPatientByBsn);
    router.post('/patientAccount/registerPatient', PatientAccountController.registerPatient);
    router.delete('/patientAccount/deletePatient', PatientAccountController.deletePatient);

    //Confirmation
    // app.post('/patientConfirmation/login', PatientConfirmationController.loginPatient);
    // app.post('/patientConfirmation/logout', PatientConfirmationController.logoutPatient);

    //Appointments
    router.post('/appointments/getAppointmentsByDate', AppointmentController.getAppointmentsByDate);
    router.post('/appointments/getAppointmentById', AppointmentController.getAppointmentById);
    router.post('/appointments/createAppointment', AppointmentController.createAppointment);
    // app.put('/appointments/editAppointmentById', AppointmentController.editAppointmentById);
    // app.delete('/appointments/deleteAppointmentById', AppointmentController.deleteAppointmentById);

module.exports = router;
