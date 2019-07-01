function ConfirmDoctorCommand(request) {
    let credentials = {
        doctorId: request.doctorId,
        password: request.password
    };
    return credentials;
}

module.exports = ConfirmDoctorCommand;
