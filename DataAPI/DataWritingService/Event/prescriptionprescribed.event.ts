class PrescriptionPrescribedEvent {
    public prescriptionId: Number;
    public bsn: Number;
    public doctorId: Number;
    public prescription: Array<String>;
    public dateOfPrescription: Date;

    public PrescriptionPrescribedEvent(prescriptionId: Number, bsn: Number, doctorId: Number, prescription: Array<String>, dateOfPrescription: Date) {
        this.prescriptionId = prescriptionId;
        this.bsn = bsn;
        this.doctorId = doctorId;
        this.prescription = prescription;
        this.dateOfPrescription = dateOfPrescription;
    }
}
