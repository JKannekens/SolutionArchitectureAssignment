const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const receive = require("./Messaging/RabbitMQMessageReciever.js");

receive.receive("time", "#"); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.listen(8050, () => {
  console.log('Example app listening on port 8050!')
});