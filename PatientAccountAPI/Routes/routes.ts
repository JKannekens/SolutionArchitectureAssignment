const PatientAccountController = require('../PatientAccountModificationService/Controller/patient.controller');
const PatientConfirmationController = require('../PatientDataConfirmationService/Controller/patientConfirmation.controller');

module.exports = (app) => {
    //Account
    app.post('/api/patientAccount/getPatientByBsn', PatientAccountController.getPatientByBsn);
    app.post('/api/patientAccount/getPatientByLastName', PatientAccountController.getPatientByLastName);
    app.put('/api/patientAccount/editPatientByBsn', PatientAccountController.editPatientByBsn);
    app.post('/api/patientAccount/registerPatient', PatientAccountController.registerPatient);

    //Confirmation
    app.post('/api/patientConfirmation/login', PatientConfirmationController.loginPatient);
    app.post('/api/patientConfirmation/logout', PatientConfirmationController.logoutPatient);
};
