var receive = require("./Messaging/RabbitMQMessageReciever.js");

receive.receive("patient", "#");
receive.receive("doctor", "#");
receive.receive("data", "#");
