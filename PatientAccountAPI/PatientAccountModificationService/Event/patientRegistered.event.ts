function patientRegisteredEvent(request) {
    let registerPatient = {
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
    return registerPatient;
};

module.exports = patientRegisteredEvent;
