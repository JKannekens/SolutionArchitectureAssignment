const DoctorAccountController = require('../DoctorAccountModificationService/Controller/doctor.controller');
const DoctorConfirmationController = require('../DoctorDataConfirmationService/Controller/doctorConfirmation.controller');

module.exports = (app) => {
    //Account
    app.post('/api/doctorAccount/getDoctorById', DoctorAccountController.getDoctorById);
    app.post('/api/doctorAccount/getDoctorByLastName', DoctorAccountController.getDoctorByLastName);
    app.post('/api/doctorAccount/registerDoctor', DoctorAccountController.registerDoctor);
    app.put('/api/doctorAccount/editDoctor', DoctorAccountController.editDoctorById);
    app.delete('/api/doctorAccount/deleteDoctor', DoctorAccountController.deleteDoctor);

    //Confirmation
    app.post('/api/doctorConfirmation/loginDoctor', DoctorConfirmationController.loginDoctor);
    app.post('/api/doctorConfirmation/logoutDoctor', DoctorConfirmationController.logoutDoctor);
};
