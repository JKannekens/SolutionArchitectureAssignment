var publish = require("./RabbitMQMessagePublisher.js");

publish.publish("doctor", "doctor.update", {"doctorId": 1, "patientID": 2});
publish.publish("poep", "poep.create", {"firstname": "piet", "lastname": "hendriks"});
publish.publish("patient", "patient.register",{"firstname": "Cas", "lastname": "de Pender", "dead": false});
