class DoctorConfirmedEvent {
    public doctorId: Number;
    public password: String;

    public DoctorConfirmedEvent(doctorId: Number, password: String) {
        this.doctorId = doctorId;
        this.password = password;
    }
}
