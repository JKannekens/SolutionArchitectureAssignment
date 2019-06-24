var amqp = require('amqplib/callback_api');
const Event = require('../Model/event.model.ts');
const Doctor = require('../Model/doctor.model.ts');
const Patient = require('../Model/patient.model.ts');
const Appointment = require('../Model/appointment.model.ts');
const PatientRead = require('../Model/patient.read.model.js');
const DoctorRead = require('../Model/doctor.read.model.js');

// module.exports = {
//     receive: function (exchange, arg) {
//         amqp.connect('amqp://rabbitmquser:DEBmbwkSrzy9D1T9cJfa@rabbitmq', function (error0, connection) {
//             if (error0) {
//                 return setTimeout(module.exports.receive, 10000, exchange,arg);
//             }
//             connection.createChannel(function (error1, channel) {
//                 if (error1) {
//                     throw error1;
//                 }
//
//                 channel.assertExchange(exchange, 'topic', {
//                     durable: true,
//                     persistent: true
//                 });
//
//                 channel.assertQueue('', {
//                     exclusive: true
//                 }, function (error2, q) {
//                     if (error2) {
//                         throw error2;
//                     }
//                     console.log(' [*] Waiting for logs. To exit press CTRL+C');
//
//
//                     channel.bindQueue(q.queue, exchange, arg);
//
//                     channel.consume(q.queue, function (msg) {
//                         module.exports.handleMessage(msg.fields.routingKey,JSON.parse(msg.content));
//                     }, {
//                         noAck: true
//                     });
//                 });
//             });
//         });
//     },
//
//     handleMessage: function (routingkey, message) {
//         Event.create({
//             routingkey: routingkey,
//             eventdata: message
//         }).then(() => {
//             const connection = mysql.createConnection(mySQLConfig);
//             connection.connect();
//             if (routingkey.includes("patient.register")) {
//                 connection.query('INSERT INTO patient SET ?', message, function(err, result) {
//                     console.log(err);
//                 });
//             } else if (routingkey.includes("patient.delete")) {
//                 connection.query('DELETE FROM patient WHERE bsn = ' + message.bsn, function (err, result) {
//                     console.log(err);
//                 });
//             }else if (routingkey.includes("patient.edit")) {
//                 connection.query('DELETE FROM patient WHERE bsn = ' + message.bsn);
//                 connection.query(`INSERT INTO patient SET ?`, message, function (err, result) {
//                     console.log(err);
//                 });
//             } else if (routingkey.includes("doctor.register")) {
//                 connection.query('INSERT INTO doctor SET ?', message, function(err, result) {
//                     console.log(err);
//                 });
//             } else if (routingkey.includes("doctor.delete")) {
//                 connection.query('DELETE FROM doctor WHERE doctorId = ' + message.doctorId, function (err, result) {
//                     console.log(err);
//                 });
//             } else if (routingkey.includes("doctor.edit")) {
//                     connection.query('DELETE FROM doctor WHERE doctorId = ' + message.doctorId);
//                     connection.query(`INSERT INTO doctor SET ?`, message, function (err, result) {
//                         console.log(err);
//                     });
//             } else if (routingkey.includes("appointment.create")) {
//                 connection.query('INSERT INTO appointment SET ?', message, function (err, result) {
//                     console.log(err);
//                 });
//             }
//
//             connection.end();
//         })
//     }
// };

// var amqp = require('amqplib/callback_api');

module.exports = {
    receive: function (exchange, queueName, arg) {
        amqp.connect('amqp://rabbitmquser:DEBmbwkSrzy9D1T9cJfa@rabbitmq', function(error0, connection) {
            if (error0) {
                return setTimeout(module.exports.receive, 10000, exchange, queueName, arg);
            }

            console.log("LISTENING ON exchange: " + exchange);
            console.log("LISTENING ON QUEUE: " + queueName);
            console.log("LISTENING ON routing: " + arg);

            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }

                channel.assertExchange(exchange, 'topic', {
                    durable: false,
                    persistent: false
                });

                channel.assertQueue(queueName, {
                    autoDelete : false,
                    durable    : true,
                    arguments  : {
                        "x-message-ttl" : 300000
                    }
                }, function(error2, q) {
                    if (error2) {
                        throw error2;
                    }
                    console.log(' [*] Waiting for logs. To exit press CTRL+C');


                    channel.bindQueue(q.queue, exchange, arg);

                    channel.consume(q.queue, function(msg) {
                        console.log("CONSUMED INSIDE EVENTHANDLER");
                        module.exports.handleMessage(msg.fields.routingKey,JSON.parse(msg.content));
                    }, {
                        noAck: true
                    });
                });
            });
        });
    },

    handleMessage: function (routingkey, message) {
        console.log("INSIDE HANDLEMESSAGE FUNCTION EVENTHANDLER");
        console.log(routingkey);
        console.log(message);
        Event.create({
            routingkey: routingkey,
            eventdata: message
        }).then(() => {
            if (routingkey.includes("patient.registered")) {
                PatientRead.create({
                    patient: message
                })

            } else if (routingkey.includes("patient.deleted")) {
                PatientRead.findOneAndDelete({"patient.bsn": message.bsn}).catch((err) => console.log(err));

            }else if (routingkey.includes("patient.edited")) {
                PatientRead.findOneAndUpdate({"patient.bsn": message.bsn}, { patient: message } ).catch((err) => console.log(err));

            } else if (routingkey.includes("doctor.registered")) {
                DoctorRead.create({
                    doctor: message
                })

            } else if (routingkey.includes("doctor.deleted")) {
                DoctorRead.findOneAndDelete({"doctor.doctorId": message.doctorId}).catch((err) => console.log(err))

            } else if (routingkey.includes("doctor.edited")) {
                DoctorRead.findOneAndUpdate({"doctor.doctorId": message.doctorId}, { doctor: message } ).catch((err) => console.log(err));

            } else if (routingkey.includes("appointment.created")) {
                console.log("Before patient update, before doctor update");
                PatientRead.findOneAndUpdate({"patient.bsn": message.bsn}, { appointment: message } ).catch((err) => console.log(err));
                DoctorRead.findOneAndUpdate({"doctor.doctorId": message.doctorId}, { appointment: message } ).catch((err) => console.log(err));

            } else if (routingkey.includes("appointment.edited")) {
                PatientRead.findOneAndUpdate({"appointment.appointmentId": message.appointmentId}, { appointment: message } ).catch((err) => console.log(err));
                DoctorRead.findOneAndUpdate({"appointment.appointmentId": message.appointmentId}, { appointment: message } ).catch((err) => console.log(err));
            } else if (routingkey.includes("appointment.deleted")) {

                PatientRead.findOneAndUpdate({"appointment.appointmentId": message.appointmentId}, {$unset: {appointment:1}}).catch((err) => console.log(err));
                DoctorRead.findOneAndUpdate({"appointment.appointmentId": message.appointmentId}, {$unset: {appointment:1}}).catch((err) => console.log(err));

            }
        })
    }
};

