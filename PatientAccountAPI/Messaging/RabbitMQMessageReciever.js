var amqp = require('amqplib/callback_api');

module.exports = {
    receive: function (exchange, queueName, arg) {
        amqp.connect('amqp://rabbitmquser:DEBmbwkSrzy9D1T9cJfa@rabbitmq', function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }

                channel.assertExchange(exchange, 'topic', {
                    durable: false,
                    persistent: true
                });

                channel.assertQueue(queueName, {
                    autoDelete : false,
                    durable    : true,
                    persistent: true,
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
                        console.log(" [x] %s:'%s'", msg.fields.routingKey, JSON.parse(msg.content));
                    }, {
                        noAck: true
                    });
                });
            });
        });
    }
};


