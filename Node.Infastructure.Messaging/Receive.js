var amqp = require('amqplib/callback_api');

module.exports = {
    receive: function (exchange, arg) {
        amqp.connect('amqp://rabbitmquser:DEBmbwkSrzy9D1T9cJfa@localhost', function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                // var exchange = 'topic_logs';

                channel.assertExchange(exchange, 'topic', {
                    durable: false
                });

                channel.assertQueue('', {
                    exclusive: true
                }, function(error2, q) {
                    if (error2) {
                        throw error2;
                    }
                    console.log(' [*] Waiting for logs. To exit press CTRL+C');

                    // args.forEach(function(key) {
                    //     channel.bindQueue(q.queue, exchange, key);
                    // });

                    channel.bindQueue(q.queue, exchange, arg);

                    channel.consume(q.queue, function(msg) {
                        console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
                    }, {
                        noAck: true
                    });
                });
            });
        });
    }
};

