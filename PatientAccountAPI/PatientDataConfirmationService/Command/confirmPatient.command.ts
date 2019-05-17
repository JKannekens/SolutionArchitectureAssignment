class ConfirmPatientCommand {
    public bsn: Number;
    public password: String;

    public ConfirmPatientCommand(patientcredentials) {
        this.bsn = patientcredentials.bsn;
        this.password = patientcredentials.password;
    }
}
