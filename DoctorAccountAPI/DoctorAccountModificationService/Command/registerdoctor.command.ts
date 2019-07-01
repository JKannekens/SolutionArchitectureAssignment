function RegisterDoctorCommand(request) {
    let doctor = {
        doctorId: request.doctorId,
        password: request.password,
        firstName: request.firstName,
        middleName: request.middleName,
        lastName: request.lastName,
        specialization: request.specialization,
        address: request.address,
        postalCode: request.postalCode,
        city: request.city
    };
    return doctor;
};

module.exports = RegisterDoctorCommand;
