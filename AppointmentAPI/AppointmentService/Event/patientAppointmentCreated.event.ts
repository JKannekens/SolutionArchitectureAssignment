function PatientAppointmentCreatedEvent(routingkey, request) {
    let appointment = {
        routingkey: routingkey,
        appointment: {
            appointmentId: request.appointmentId,
            bsn: request.bsn,
            doctorId: request.doctorId,
            date: request.date,
            location: request.location,
        },
        timestamp: Date.now()
    };
    return appointment;
}

module.exports = PatientAppointmentCreatedEvent;