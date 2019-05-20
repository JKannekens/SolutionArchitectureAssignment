﻿using System;
using System.Collections.Generic;
using System.Text;

namespace CSharpInfrastructure.Messaging
{
    public class Event : Message
    {
        public Event()
        {
        }

        public Event(Guid messageId) : base(messageId)
        {
        }

        public Event(string messageType) : base(messageType)
        {
        }

        public Event(Guid messageId, string messageType) : base(messageId, messageType)
        {
        }
    }
}