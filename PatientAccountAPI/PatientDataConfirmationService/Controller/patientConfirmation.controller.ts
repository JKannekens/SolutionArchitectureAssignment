const Patient = require('../../Model/patient.model');

module.exports = {

    loginPatient(req, res, next) {
        let patientCredentials = req.body.patientcredentials;

        Patient.find({bsn: patientCredentials.bsn})
            .then((patient) => {
                if(patient.password === patientCredentials.password) {
                    //TODO: login
                }
            })
    },

    logoutPatient(req, res, next) {
        //TODO: logout
    }
};
