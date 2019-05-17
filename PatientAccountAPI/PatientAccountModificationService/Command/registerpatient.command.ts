class RegisterPatientCommand {

    public bsn: Number;
    public password: String;
    public firstName: String;
    public middleName: String;
    public lastName: String;
    public age: Number;
    public streetName: String;
    public houseNr: String;
    public postalCode: String;
    public city: String;
    public deceased: Boolean;

    public RegisterPatientCommand(patient) {
        this.bsn = patient.bsn;
        this.password = patient.password;
        this.firstName = patient.firstName;
        this.middleName = patient.middleName;
        this.lastName = patient.lastName;
        this.age = patient.age;
        this.streetName = patient.streetName;
        this.houseNr = patient.houseNr;
        this.postalCode = patient.postalCode;
        this.city = patient.city;
        this.deceased = patient.deceased;
    }
}
