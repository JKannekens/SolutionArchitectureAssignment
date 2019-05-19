class DoctorRegisteredEvent {
    public doctorId: Number;
    public firstName: String;
    public middleName: String;
    public lastName: String;
    public specialization: String;

    public DoctorRegisteredEvent(doctorId: Number, firstName: String, middleName: String, lastName: String, specialization: String) {
        this.doctorId = doctorId;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.specialization = specialization;
    }
}
