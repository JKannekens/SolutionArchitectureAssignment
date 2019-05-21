var amqp = require('amqplib/callback_api');
const Event = require('../Model/event.model.ts');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'mysql',
    user: 'user',
    password: 'password',
    database: 'hospital'
});

//
// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected!');
//     connection.query('SELECT * FROM patient', (err,rows) => {
//         if(err) throw err;
//         console.log('Data received from Db:\n');
//         console.log(rows);
//     });
// });



module.exports = {
    receive: function (exchange, arg) {
        amqp.connect('amqp://rabbitmquser:DEBmbwkSrzy9D1T9cJfa@rabbitmq', function (error0, connection) {
            if (error0) {
                return setTimeout(module.exports.receive, 10000, exchange,arg);
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }

                channel.assertExchange(exchange, 'topic', {
                    durable: false
                });

                channel.assertQueue('', {
                    exclusive: true
                }, function (error2, q) {
                    if (error2) {
                        throw error2;
                    }
                    console.log(' [*] Waiting for logs. To exit press CTRL+C');


                    channel.bindQueue(q.queue, exchange, arg);

                    channel.consume(q.queue, function (msg) {
                        module.exports.handleMessage(msg.fields.routingKey,JSON.parse(msg.content));
                    }, {
                        noAck: true
                    });
                });
            });
        });
    },

    handleMessage: function (routingkey, message) {
        Event.create({
            routingkey: routingkey,
            eventdata: message
        }).then(() => {
            connection.connect();
            if (routingkey.includes("patient")) {
                connection.query('INSERT INTO patient SET ?', message, function(err, result) {
                    console.log(result);
                });
            } else if (routingkey.includes("doctor")) {
                connection.query('INSERT INTO doctor SET ?', message, function(err, result) {
                    console.log(result);
                });
            }

            connection.end();
        })
    }
};
