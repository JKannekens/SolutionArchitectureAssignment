var publish = require("./RabbitMQMessagePublisher.js");

publish.publish("doctor", "doctor.update", {"doctorId": 1, "patientID": 2});
publish.publish("doctor", "doctor.create", {"firstname": "piet", "lastname": "hendriks"});
publish.publish("patient", "patient.create",{"firstname": "Cas", "lastname": "de Pender", "dead": false});
