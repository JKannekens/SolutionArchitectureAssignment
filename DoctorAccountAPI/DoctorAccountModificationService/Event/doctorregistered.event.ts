function DoctorRegisteredEvent(routingkey, request) {
    let doctor = {
        routingkey: routingkey,
        doctor: {
            doctorId: request.doctorId,
            password: request.password,
            firstName: request.firstName,
            middleName: request.middleName,
            lastName: request.lastName,
            specialization: request.specialization,
            address: request.address,
            postalCode: request.postalCode,
            city: request.city
        },
        timestamp: Date.now()
    };
    return doctor;
}

module.exports = DoctorRegisteredEvent;
