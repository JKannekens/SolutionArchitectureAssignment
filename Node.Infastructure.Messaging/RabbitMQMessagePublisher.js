var amqp = require('amqplib/callback_api');

module.exports = {
    publish: function (exchange, arg, msg) {
        amqp.connect('amqp://rabbitmquser:DEBmbwkSrzy9D1T9cJfa@localhost', function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                console.log(arg);
                console.log(msg);

                channel.assertExchange(exchange, 'topic', {
                    durable: false
                });
                channel.publish(exchange, arg, Buffer.from(JSON.stringify(msg)));
                console.log(" [x] Sent %s: '%s'", arg, msg);
            });

            setTimeout(function() {
                connection.close();
            }, 500);
        });
    }
};

