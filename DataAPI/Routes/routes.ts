const PrescriptionController = require('../DataWritingService/Controller/prescription.controller');
const QuestionnaireController = require('../DataWritingService/Controller/questionnaire.controller');

module.exports = (app) => {
    //Prescription
    app.post('api/prescription/getPrescriptionById', PrescriptionController.getPrescriptionById);
    app.post('api/prescription/prescribePrescription', PrescriptionController.prescribePrescription);
    app.put('api/prescription/editPrescriptionById', PrescriptionController.editPrescriptionById);
    app.delete('api/prescription/deletePrescriptionById', PrescriptionController.deletePrescriptionById);

    //Questionnaire
    app.post('api/questionnaire/getQuestionnaireById', QuestionnaireController.getQuestionnaireById);
    app.post('api/questionnaire/createQuestionnaire', QuestionnaireController.createQuestionnaire);
    app.put('api/questionnaire/editQuestionnaireById', QuestionnaireController.editQuestionnaire);
    app.delete('api/questionnaire/deleteQuestionnaireById', QuestionnaireController.deleteQuestionnaireById);
};
