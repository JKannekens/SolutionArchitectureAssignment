using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using RabbitMQ.Client;

namespace Send {
	class Program {
		private static DateTime lastDayCheck;
		private static DateTime lastTimeCheck;
		private static DateTime lastMinuteCheck;

		private static IConnection connection;

		private static bool hasConnection = false;

		static void Main (string[] args) {
			Console.WriteLine ("----- Time service starting ------");

			while (!hasConnection) {
				try {
					connection = CreateConnection ();
					hasConnection = true;
				} catch (Exception e) {
					Console.WriteLine ("Error: " + e.Message);
					Thread.Sleep (10000);
				}
			}

			Console.WriteLine ("----- Time service connected to RabbitMQ ------");

			using (var channel = connection.CreateModel ()) {

                channel.ExchangeDeclare("time", ExchangeType.Topic, durable:true);

                var queueArgs = new Dictionary<string, object>();
                queueArgs.Add("x-message-ttl", 300000);

                channel.QueueDeclare(queue: "time",
                    durable: true,
                    exclusive: false,
                    autoDelete: false,
                    arguments: queueArgs);

                Console.WriteLine ("----- Time service started ------");
				while (true) {
					CheckTime (channel);
					CheckDay (channel);
					CheckMinute (channel);
					Thread.Sleep (6000);
				}
			}
		}

		private static IConnection CreateConnection () {
			var factory = new ConnectionFactory ();
			factory.Uri = new Uri ("amqp://rabbitmquser:DEBmbwkSrzy9D1T9cJfa@rabbitmq");
			return factory.CreateConnection ();
		}

		private static void CheckMinute (IModel channel) {
			if (DateTime.Now.Minute != lastMinuteCheck.Minute) {
				Console.WriteLine ("A minute has passed");
				lastMinuteCheck = DateTime.Now;

				var json = "{ \"Hour\": \"" + lastMinuteCheck.Hour + "\", \"Minute\": \"" + lastMinuteCheck.Minute + "\"  }";
				PublishEvent (channel, "minute", json);
			}
		}

		private static void CheckTime (IModel channel) {
			if (DateTime.Now.Hour != lastDayCheck.Hour) {
				Console.WriteLine ("An hour has passed");
				lastDayCheck = DateTime.Now;

				var json = "{ \"Hour\": \"" + lastDayCheck.Hour + "\", \"Minute\": \"" + lastDayCheck.Minute + "\"  }";
				PublishEvent (channel, "hour", json);
			}
		}

		private static void CheckDay (IModel channel) {
			if (DateTime.Now.Day != lastTimeCheck.Day) {
				Console.WriteLine ("A day has passed");
				lastTimeCheck = DateTime.Now;

				var json = "{ \"Year\": \"" + lastTimeCheck.Year + "\", \"Month\": \"" + lastTimeCheck.Month + "\", \"DayOfTheWeek\": \"" + lastTimeCheck.DayOfWeek + "\" }";
				PublishEvent (channel, "day", json);
			}
		}

		private static void PublishEvent (IModel channel, string routingKey, string message) {
			var body = Encoding.UTF8.GetBytes (message);

			var properties = channel.CreateBasicProperties ();
            properties.DeliveryMode = 2;

			channel.BasicPublish (exchange: "time",
				routingKey : routingKey,
				basicProperties : properties,
				body : body);
		}
	}
}
