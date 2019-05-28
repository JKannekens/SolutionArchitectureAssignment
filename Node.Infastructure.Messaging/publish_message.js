var publish = require("./RabbitMQMessagePublisher.js");

publish.publish("patient", "patient-deleted-queue","patient.edited", {"doctorId": 1, "patientID": 2});
publish.publish("patient", "patient-edited-queue","patient.deleted", {"firstname": "piet", "lastname": "hendriks"});
publish.publish("patient", "patient-registered-queue","patient.registered",{"firstname": "Cas", "lastname": "de Pender", "dead": false});
