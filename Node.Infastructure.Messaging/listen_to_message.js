var receive = require("./RabbitMQMessageReciever.js");

receive.receive("doctor", "doctor.create");
receive.receive("doctor", "doctor.update");
receive.receive("patient", "patient.create");
