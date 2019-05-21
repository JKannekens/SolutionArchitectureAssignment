const Questionnaire = require('../../Model/questionnaire.model');
let answerQuestionnaireCommand = require('../Command/answerquestionnaire.command');
let questionnaireAnsweredEvent = require('../Event/questionnaireanswered.event');

module.exports = {

    async getQuestionnaireById(req, res, next) {
        let questionnaireId = req.body.questionnaireId;

        Questionnaire.find({questionnaireId: questionnaireId})
            .then((questionnaire) => {
                res.status(200)
                    .contentType('application/json')
                    .send(questionnaire);
            })
            .catch((err) => {
                res.status(400)
                    .json({msg: "Error retrieving questionnaire"});
                console.log(err);
            })
    },

    async createQuestionnaire(req, res, next) {
        let createdQuestionnaire = req.body.questionnaire;

        Questionnaire.create(createdQuestionnaire)
            .then((resp) => {
                res.status(200)
                    .contentType('application/json')
                    .send(resp);
            })
            .catch((err) => {
                res.status(400)
                    .json({msg: "Error creating questionnaire"});
                console.log(err);
            })
    },

    async editQuestionnaire(req, res, next) {
        answerQuestionnaireCommand = req.body.questionnaire;

        Questionnaire.findOneAndUpdate({questionnaireId: answerQuestionnaireCommand.questionnaireId}, answerQuestionnaireCommand)
            .then((resp) => {
                res.status(200)
                    .contentType('application/json')
                    .send(resp);
            })
            .catch((err) => {
                res.status(400)
                    .json({msg: "Error editing questionnaire"});
                console.log(err);
            })
    },

    async deleteQuestionnaireById(req, res, next) {
        let questionnaireId = req.body.questionnaireId;

        Questionnaire.delete({questionnaireId: questionnaireId})
            .then((resp) => {
                res.status(200)
                    .contentType('application/json')
                    .send(resp);
            })
            .catch((err) => {
                res.status(400)
                    .json({msg: "Error deleting questionnaire"});
                console.log(err);
            })
    }
};
