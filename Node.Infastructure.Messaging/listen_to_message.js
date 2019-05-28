var receive = require("./RabbitMQMessageReciever.js");

// receive.receive("doctor", "doctor.create");
// receive.receive("doctor", "doctor.update");
// receive.receive("patient", "patient-registered-queue","patient.registered");
// receive.receive("patient", "patient-registered-queue","patient.registered");
// receive.receive("patient", "patient-edited-queue","patient.edited");
receive.receive("patient", "patient-registered-queue", "#");

