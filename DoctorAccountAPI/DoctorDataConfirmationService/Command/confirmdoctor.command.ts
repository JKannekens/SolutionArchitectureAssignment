class ConfirmDoctorCommand {
    public doctorId: Number;
    public password: String;

    public ConfirmDoctorCommand(doctorId: Number, password: String) {
        this.doctorId = doctorId;
        this.password = password;
    }
}
