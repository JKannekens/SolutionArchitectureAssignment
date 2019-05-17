class RegisterPatientCommand {

    public bsn;
    public firstName;
    public middleName;
    public lastName;
    public age;
    public streetName;
    public houseNr;
    public postalCode;
    public city;
    public deceased;

    public RegisterPatientCommand(patientId, bsn, firstName, middleName, lastName, age, streetName, houseNr, postalCode, city, deceased) {
        this.bsn = bsn;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.age = age;
        this.streetName = streetName;
        this.houseNr = houseNr;
        this.postalCode = postalCode;
        this.city = city;
        this.deceased = deceased;
    }
}
