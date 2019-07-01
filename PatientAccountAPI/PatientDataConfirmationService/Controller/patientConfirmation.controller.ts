const Patient = require('../../Model/patient.model.ts');
let patientConfirmatinonCommand = require('../Command/confirmPatient.command.ts');

module.exports = {

    async loginPatient(req, res, next) {
        let patientConfirmCmd = patientConfirmatinonCommand(req.body);

        Patient.find({bsn: patientConfirmCmd.bsn})
            .then((patient) => {
                if(patient.password === patientConfirmCmd.password) {
                    //TODO: login
                }
            })
    },

    async logoutPatient(req, res, next) {
        //TODO: logout
    }
};
