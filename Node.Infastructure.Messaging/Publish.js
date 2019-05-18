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
                // var exchange = 'topic_logs';
                // var args = process.argv.slice(2);
                // var key = (args.length > 0) ? args[0] : 'anonymous.info';
                // var msg = args.slice(1).join(' ') || 'Hello World!';
                console.log(arg);
                console.log(msg);

                channel.assertExchange(exchange, 'topic', {
                    durable: false
                });
                channel.publish(exchange, arg, Buffer.from(msg));
                console.log(" [x] Sent %s: '%s'", arg, msg);
            });

            setTimeout(function() {
                connection.close();
                process.exit(0);
            }, 500);
        });
    }
};

