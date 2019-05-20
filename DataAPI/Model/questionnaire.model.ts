const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionnaireSchema = new Schema({
    questionnaireId: {
        type: Number,
        required: true
    },
    bsn: {
        type: Number,
        required: true
    },
    questions: [{
        type: String,
        required: true,
        ref: 'question'
    }],
    answers: [{
        type: String,
        required: true,
        ref: 'answer'
    }]
});

const Questionnaire = mongoose.model('questionnaire', QuestionnaireSchema);

module.exports = Questionnaire;
