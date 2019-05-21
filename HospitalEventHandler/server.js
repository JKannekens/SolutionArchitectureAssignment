const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const receive = require("./Messaging/RabbitMQMessageReciever.js");
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'mysql',
    user: 'user',
    password: 'password',
    database: 'hospital'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
    connection.query('SELECT * FROM patient', (err,rows) => {
        if(err) throw err;
        console.log('Data received from Db:\n');
        console.log(rows);
    });
});


mongoose
    .connect(
        'mongodb://mongo:27017/hospitaleventstore',
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

receive.receive("patient", "#");
receive.receive("doctor", "#");
receive.receive("data", "#");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.listen(8010, () => {
  console.log('Example app listening on port 8000!')
});
