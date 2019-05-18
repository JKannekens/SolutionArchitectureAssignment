var publish = require("./Publish.js");

publish.publish("doctor", "doctor.update", "Doctor was appointed");
publish.publish("doctor", "doctor.create", "Doctor registered");
publish.publish("patient", "patient.create","patient registered");