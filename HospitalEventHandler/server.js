const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const receive = require("./Messaging/RabbitMQMessageReciever.js");

mongoose
    .connect(
        'mongodb://mongo:27017/hospitaleventstore',
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

receive.receive("patient", "#");
//receive.receive("doctor", "#");
//receive.receive("data", "#");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.listen(8010, () => {
  console.log('Example app listening on port 8000!')
});