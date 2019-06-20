function PatientAppointmentCreatedEvent(request) {
    let appointment = {
        routingkey: {
            type: String,
            required: true
        },
        eventdata: {
            appointmentId: request.appointmentId,
            bsn: request.bsn,
            doctorId: request.doctorId,
            date: request.date,
            location: request.location,
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    };
    return appointment;
}

module.exports = PatientAppointmentCreatedEvent;
