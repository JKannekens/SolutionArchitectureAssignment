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
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
    connection.query(`CREATE DATABASE IF NOT EXISTS hospital`, (err) => {
        if(err) throw err});

    connection.query(`CREATE TABLE IF NOT EXISTS hospital.patient (id int(32) NOT NULL AUTO_INCREMENT,bsn int(32) NOT NULL,password varchar(255) NOT NULL,firstName varchar(255) NOT NULL,middleName varchar(255) DEFAULT NULL,lastName varchar(255) NOT NULL,age int(32) NOT NULL,streetName varchar(255) NOT NULL, houseNr varchar(255) NOT NULL, postalCode varchar(255) NOT NULL, city varchar(255) NOT NULL, deceased boolean NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=latin1`, (err) => {
        if(err) throw err
    });

    connection.query(`CREATE TABLE IF NOT EXISTS hospital.doctor (id int(11) NOT NULL AUTO_INCREMENT,doctorId int(11) NOT NULL,password varchar(255) NOT NULL,firstName varchar(255) NOT NULL,middleName varchar(255) DEFAULT NULL,lastName varchar(255) NOT NULL,specialization varchar(255) NOT NULL,address varchar(255) NOT NULL,postalCode varchar(255) NOT NULL, city varchar(255) NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=latin1`, (err) => {
        if(err) throw err
    });

    connection.query(`CREATE TABLE IF NOT EXISTS hospital.appointment (id int(11) NOT NULL AUTO_INCREMENT,appointmentId int(11) NOT NULL,bsn int(32) NOT NULL,doctorId int(11) NOT NULL, date datetime NOT NULL, location varchar(255) NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=latin1`, (err) => {
        if(err) throw err
    });

    console.log("Database with tables created");

    connection.end()
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
receive.receive("appointment", "#");
receive.receive("data", "#");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.listen(8010, () => {
  console.log('Example app listening on port 8000!')
});
