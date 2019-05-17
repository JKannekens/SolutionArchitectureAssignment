var amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmquser:DEBmbwkSrzy9D1T9cJfa@localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';
        var msg = {
            name: "test",
            age: 12
        };

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));

        console.log(" [x] Sent %s", JSON.stringify(msg));
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
