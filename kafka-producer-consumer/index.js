const { Kafka } = require("kafkajs");

const main = async () => {
  const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: "test-topic",
    messages: [{ value: "Hello KafkaJS user!" }],
  });

  await producer.disconnect();

  const consumer = kafka.consumer({ groupId: "test-group" });

  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      });
    },
  });
};

main();

/* 
docker-compose exec kafka bash
cd /usr/bin
kafka-console-consumer --topic test-topic --bootstrap-server localhost:9092 --from-beginning
*/
// ./kafka-console-consumer --topic test-topic --bootstrap-server localhost:9092 --from-beginning