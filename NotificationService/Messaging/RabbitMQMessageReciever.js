var amqp = require('amqplib/callback_api');

module.exports = {
    receive: function (exchange, arg) {
        amqp.connect('amqp://rabbitmquser:DEBmbwkSrzy9D1T9cJfa@rabbitmq', function (error0, connection) {
            if (error0) {
                return setTimeout(module.exports.receive, 10000, exchange, arg);
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }

                channel.assertExchange(exchange, 'topic', {
                    durable: false,
                    persistent: true
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
                        module.exports.handleMessage(msg.fields.routingKey, JSON.parse(msg.content));
                    }, {
                            noAck: true
                        });
                });
            });
        });
    },

    handleMessage: function (routingkey, message) {
        if (routingkey == "minute") {
            console.log(message);
        }
    }
};