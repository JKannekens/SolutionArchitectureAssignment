const Prescription = require('../../Model/prescription.model');
let prescribePrescriptionCommand = require('../Command/prescribeprescription.command');
let prescriptionPrescribedEvent = require('../Event/prescriptionprescribed.event');

module.exports = {

    async getPrescriptionById(req, res, next) {
        let prescriptionId = req.body.prescriptionid;

        Prescription.find({prescriptionId: prescriptionId})
            .find((prescription) => {
                if(prescription !== null) {
                    res.status(200)
                        .contentType('application/json')
                        .send(prescription);
                } else {
                    res.status(400)
                        .json({msg: "Could not find prescription"});
                }
            })
            .catch((err) => {
                res.status(500)
                    .json({msg: "Something went wrong retrieving prescription"});
                console.log(err);
            })
    },

    async prescribePrescription(req, res, next) {
        prescribePrescriptionCommand = req.body.prescription;

        Prescription.find({})
            .then((prescriptions) => {
                prescribePrescriptionCommand.prescriptionId = prescriptions.size + 1;
                Prescription.create(prescribePrescriptionCommand)
                    .then((resp) => {
                        prescriptionPrescribedEvent = resp;
                        res.status(200)
                            .contentType('application/json')
                            .send(resp);
                    })
                    .catch((err) => {
                        res.status(500)
                            .json({msg: "Error retrieving prescription"});
                        console.log(err);
                    });
            })
            .catch((err) => {
                res.status(400)
                    .json({msg: "Error"});
                console.log(err);
            });
    },

    async editPrescriptionById(req, res, next) {
        let prescriptionId = req.body.prescriptionId;

        Prescription.find({prescriptionId: prescriptionId})
            .then((prescription) => {
                if(prescription !== null) {
                    Prescription.findOneAndUpdate({prescriptionId: prescriptionId})
                        .then((resp) => {
                            res.status(200)
                                .contentType('application/json')
                                .send(resp);
                        })
                        .catch((err) => {
                            res.status(400)
                                .json({msg: "Error edit prescription"});
                            console.log(err);
                        });
                }
            })
            .catch((err) => {
                res.status(400)
                    .json({msg: "Error finding prescription"});
                console.log(err);
            })
    },

    async deletePrescriptionById(req, res, next) {
        let prescriptionId = req.body.prescriptionId;

        Prescription.FindOneAndDelete({prescriptionId: prescriptionId})
            .then((resp) => {
                res.status(200)
                    .contentType('application/json')
                    .send(resp);
            })
            .catch((err) => {
                res.status(400)
                    .json({msg: 'Error deleting prescription'});
                console.log(err);
            })
    }
};
