import DateTimeFormat = Intl.DateTimeFormat;

class CreatePatientAppointmentCommand {
    public appointmentId: Number;
    public bsn: Number;
    public doctorId: Number;
    public date: Date;
    public time: Date;
    public location: String;

    public CreatePatientAppointmentCommand(appointmentData) {
        this.appointmentId = appointmentData.appointmentId;
        this.bsn = appointmentData.bsn;
        this.doctorId = appointmentData.doctorId;
        this.date = appointmentData.date;
        this.time = appointmentData.time;
        this.location = appointmentData.location;
    }
}
