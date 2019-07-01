const DoctorAccountController = require('../DoctorAccountModificationService/Controller/doctor.controller.ts');
const DoctorConfirmationController = require('../DoctorDataConfirmationService/Controller/doctorConfirmation.controller.ts');

const express = require('express');
const router = express.Router();

//Account
router.post('/api/doctorAccount/getDoctorById', DoctorAccountController.getDoctorById);
router.post('/api/doctorAccount/getDoctorByLastName', DoctorAccountController.getDoctorByLastName);
router.post('/api/doctorAccount/registerDoctor', DoctorAccountController.registerDoctor);
router.put('/api/doctorAccount/editDoctor', DoctorAccountController.editDoctorById);
router.delete('/api/doctorAccount/deleteDoctor', DoctorAccountController.deleteDoctor);

//Confirmation
router.post('/api/doctorConfirmation/loginDoctor', DoctorConfirmationController.loginDoctor);
router.post('/api/doctorConfirmation/logoutDoctor', DoctorConfirmationController.logoutDoctor);

module.exports = router;
