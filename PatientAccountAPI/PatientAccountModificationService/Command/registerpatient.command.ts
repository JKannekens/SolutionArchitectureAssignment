function registerPatientCommand(request) {
    let patientRegistered = {
        bsn: request.bsn,
        password: request.password,
        firstName: request.firstName,
        middleName: request.middleName,
        lastName: request.lastName,
        age: request.age,
        streetName: request.streetName,
        houseNr: request.houseNr,
        postalCode: request.postalCode,
        city: request.city,
        deceased: request.deceased
    };
    return patientRegistered;
};

module.exports = registerPatientCommand;
