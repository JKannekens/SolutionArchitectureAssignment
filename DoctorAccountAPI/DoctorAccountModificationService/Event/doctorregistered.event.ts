function DoctorRegisteredEvent(request) {
    let doctor = {
        doctorId: request.doctorId,
        firstName: request.firstName,
        middleName: request.middleName,
        lastName: request.lastName,
        specialization: request.specialization,
    };
    return doctor;
};

module.exports = DoctorRegisteredEvent;
