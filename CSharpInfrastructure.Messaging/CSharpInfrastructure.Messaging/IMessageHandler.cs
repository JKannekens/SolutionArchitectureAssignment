using System;
using System.Collections.Generic;
using System.Text;

namespace CSharpInfrastructure.Messaging
{
    public interface IMessageHandler
    {
        void Start(IMessageHandlerCallback callback);
        void Stop();
    }
}
