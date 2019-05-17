interface IMessagePublisher {
    publishMessageAsync(messageType, message, routingKey);
}
