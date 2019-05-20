const DoctorAccountContorller = require('../DoctorAccountModificationService/Controller/doctor.controller');
const DoctorConfirmationController = require('../DoctorDataConfirmationService/Controller/doctorConfirmation.controller');

module.exports = (app) => {
    //Account
    app.post('/api/doctorAccount/getDoctorById', DoctorAccountContorller.getDoctorById);
    app.post('/api/doctorAccount/getDoctorByLastName', DoctorAccountContorller.getDoctorByLastName);
    app.post('/api/doctorAccount/registerDoctor', DoctorAccountContorller.registerDoctor);
    app.put('/api/doctorAccount/editDoctor', DoctorAccountContorller.editDoctorById);
    app.delete('/api/doctorAccount/deleteDoctor', DoctorAccountContorller.deleteDoctor);

    //Confirmation
    app.post('/api/doctorConfirmation/loginDoctor', DoctorConfirmationController.loginDoctor);
    app.post('/api/doctorConfirmation/logoutDoctor', DoctorConfirmationController.logoutDoctor);
};
