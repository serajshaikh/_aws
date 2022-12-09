const { Kafka } = require("kafkajs")

const clientId = "node-kafka-producer-consumer"
const brokers = ["localhost:9092"]
const topic = "test"

const kafka = new Kafka({ clientId, brokers })

/* const consumer = kafka.consumer({ groupId: clientId }) */
const consumer = kafka.consumer({
	groupId: clientId,
	minBytes: 5,
})

const consume = async () => {
  console.log("Connecting...");
	await consumer.connect()
  console.log("Connected");
	await consumer.subscribe({ topic })
	await consumer.run({
		eachMessage: ({ message }) => {
			console.log(`received message: ${message.value}`)
		},
	})
}

consume().catch((err) => {
	console.error("error in consumer: ", err)
})