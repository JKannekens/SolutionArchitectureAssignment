var amqp = require('amqplib/callback_api');

module.exports = {
    publish: function (exchange, queueName, arg, msg) {
        amqp.connect('amqp://rabbitmquser:DEBmbwkSrzy9D1T9cJfa@rabbitmq', function(error0, connection) {
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
                    autoDelete : false,
                    durable    : true,
                    persistent: true,
                    arguments  : {
                        "x-message-ttl" : 300000
                    }
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

                    channel.publish(exchange, arg, Buffer.from(JSON.stringify(msg)), {persistent: true});
                    console.log(" [x] Sent %s: '%s'", arg, msg);
                });
            });

            setTimeout(function() {
                connection.close();
            }, 500);
        });
    }
};


