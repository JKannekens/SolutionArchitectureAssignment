const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const receive = require("./Messaging/RabbitMQMessageReciever.js");



receive.receive("patient", "patient-registered-queue","patient.registered");
receive.receive("patient", "patient-edited-queue","patient.edited");
receive.receive("patient", "patient-deleted-queue","patient.deleted");

receive.receive("doctor", "doctor-registered-queue","doctor.registered");
receive.receive("doctor", "doctor-edited-queue","doctor.edited");
receive.receive("doctor", "doctor-deleted-queue","doctor.deleted");

receive.receive("appointment", "appointment-created-queue","appointment.created");
receive.receive("appointment", "appointment-edited-queue","appointment.edited");
receive.receive("appointment", "appointment-deleted-queue","appointment.deleted");

// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected!');
//     connection.query(`CREATE DATABASE IF NOT EXISTS hospital`, (err) => {
//         if(err) throw err});

//     connection.query(`CREATE TABLE IF NOT EXISTS hospital.patient (id int(32) NOT NULL AUTO_INCREMENT,bsn int(32) NOT NULL,password varchar(255) NOT NULL,firstName varchar(255) NOT NULL,middleName varchar(255) DEFAULT NULL,lastName varchar(255) NOT NULL,age int(32) NOT NULL,streetName varchar(255) NOT NULL, houseNr varchar(255) NOT NULL, postalCode varchar(255) NOT NULL, city varchar(255) NOT NULL, deceased boolean NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=latin1`, (err) => {
//         if(err) throw err
//     });

//     connection.query(`CREATE TABLE IF NOT EXISTS hospital.doctor (id int(11) NOT NULL AUTO_INCREMENT,doctorId int(11) NOT NULL,password varchar(255) NOT NULL,firstName varchar(255) NOT NULL,middleName varchar(255) DEFAULT NULL,lastName varchar(255) NOT NULL,specialization varchar(255) NOT NULL,address varchar(255) NOT NULL,postalCode varchar(255) NOT NULL, city varchar(255) NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=latin1`, (err) => {
//         if(err) throw err
//     });

//     connection.query(`CREATE TABLE IF NOT EXISTS hospital.appointment (id int(11) NOT NULL AUTO_INCREMENT,appointmentId int(11) NOT NULL,bsn int(32) NOT NULL,doctorId int(11) NOT NULL, date datetime NOT NULL, location varchar(255) NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=latin1`, (err) => {
//         if(err) throw err
//     });

//     console.log("Database with tables created");

//     connection.end()
// });

// mongoose
//     .connect(
//         'mongodb://mongo:27017/hospitaleventstore',
//         { useNewUrlParser: true }
//     )
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log(err));

// receive.receive("data", "#","#");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.listen(8010, () => {
  console.log('Example app listening on port 8000!')
});
