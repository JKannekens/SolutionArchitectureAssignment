const Patient = require('../../Model/patient.model');
let patientConfirmatinonCommand = require('../Command/confirmPatient.command');

module.exports = {

    async loginPatient(req, res, next) {
        patientConfirmatinonCommand = req.body.patientcredentials;

        Patient.find({bsn: patientConfirmatinonCommand.bsn})
            .then((patient) => {
                if(patient.password === patientConfirmatinonCommand.password) {
                    //TODO: login
                }
            })
    },

    async logoutPatient(req, res, next) {
        //TODO: logout
    }
};
