class CustomerRegistered {

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

    public CustomerRegistered(patientId, bsn, password, firstName, middleName, lastName, age, streetName, houseNr, postalCode, city, deceased) {
        this.bsn = bsn;
        this.password = password;
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
