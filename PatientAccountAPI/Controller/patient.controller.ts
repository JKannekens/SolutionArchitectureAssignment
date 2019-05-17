const Patient = require('../Model/patient.model');

module.exports = {
    async getPatient(req, res, next) {
        let patientnr = req.body.patientNr;

        Patient.find({patientNr: patientnr})
            .then((patient) => {
                res.sendStatus(200).contentType('application/json').send(patient);
            })
    }
}
