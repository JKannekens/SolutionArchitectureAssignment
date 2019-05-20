class QuestionnaireAnsweredEvent {
    public questionnaireId: Number;
    public bsn: Number;
    public questions: Array<String>;
    public answers: Array<String>;

    public QuestionnaireAnsweredEvent(questionnaireId: Number, bsn: Number, questions: Array<String>, answers: Array<String>) {
        this.questionnaireId = questionnaireId;
        this.bsn = bsn;
        this.questions = questions;
        this.answers = answers;
    }
}
