const { Kafka } = require("kafkajs")
const clientId = "node-kafka-producer-consumer"
const brokers = ["localhost:9092"]
const topic = "test"

const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()

const produce = async () => {
  console.log("Connecting...");
  await producer.connect()
  console.log("Connecting...");
  let i = 0

  setInterval(async () => {
    try {
      await producer.send({
        topic,
        messages: [
          {
            key: String(i),
            value: "this is message " + i,
          },
        ],
      })

      console.log("writes: ", i)
      i++
    } catch (err) {
      console.error("could not write message " + err)
    }
  }, 1000)
}

produce().catch((err) => {
	console.error("error in consumer: ", err)
})