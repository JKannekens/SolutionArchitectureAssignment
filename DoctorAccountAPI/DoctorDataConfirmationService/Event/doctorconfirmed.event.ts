function DoctorConfirmedEvent(request) {
    let credentials = {
        doctorId: request.doctorId,
        password: request.password
    };
    return credentials;
}

module.exports = DoctorConfirmedEvent;
