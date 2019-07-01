function PatientRegisteredEvent(routingkey, request) {
    let patient = {
        routingkey: routingkey,
        patient: {
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
        },
        timestamp: Date.now()
    };
    return patient;
}

module.exports = PatientRegisteredEvent;
