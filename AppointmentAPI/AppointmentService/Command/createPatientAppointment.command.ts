function createPatientAppointmentCommand(request) {
    let appointment = {
        appointmentId: request.appointmentId,
        bsn: request.bsn,
        doctorId: request.doctorId,
        date: request.date,
        location: request.location,
    };
    return appointment;
};

module.exports = createPatientAppointmentCommand;
