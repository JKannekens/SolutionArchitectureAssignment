const PatientAccountController = require('../PatientAccountModificationService/Controller/patient.controller');
const PatientConfirmationController = require('../PatientDataConfirmationService/Controller/patientConfirmation.controller');
const AppointmentController = require('../AppointmentService/Controller/appointment.controller');

module.exports = (app) => {
    //Account
    app.post('/api/patientAccount/getPatientByBsn', PatientAccountController.getPatientByBsn);
    app.post('/api/patientAccount/getPatientByLastName', PatientAccountController.getPatientByLastName);
    app.put('/api/patientAccount/editPatientByBsn', PatientAccountController.editPatientByBsn);
    app.post('/api/patientAccount/registerPatient', PatientAccountController.registerPatient);

    //Confirmation
    app.post('/api/patientConfirmation/login', PatientConfirmationController.loginPatient);
    app.post('/api/patientConfirmation/logout', PatientConfirmationController.logoutPatient);

    //Appointments
    app.post('/api/appointments/getAppointmentsByDate', AppointmentController.getAppointmentsByDate);
    app.post('/api/appointments/getAppointmentById', AppointmentController.getAppointmentById);
    app.post('/api/appointments/createAppointment', AppointmentController.createAppointment);
    app.put('/api/appointments/editAppointmentById', AppointmentController.editAppointmentById);
    app.delete('/api/appointments/deleteAppointmentById', AppointmentController.deleteAppointmentById);
};
