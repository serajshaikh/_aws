// Dependencies
const awsIot = require('aws-iot-device-sdk');
const sensor = require("node-dht-sensor");

const useDummyData = true
const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const dateTime = date + ' ' + time;

const device = awsIot.device({
    clientId: 'RaspberryMQTTClient',
    host: 'a23863q04yjkdc-ats.iot.us-east-1.amazonaws.com',
    port: 8883,
    keyPath: './AWS_Raspberry_secrets/de-private.pem.key',
    certPath: './AWS_Raspberry_secrets/de-certificate.pem.crt',
    caPath: './AWS_Raspberry_secrets/AmazonRootCA1.pem',
});

// Telemetry data
const IoTDevice = {
    serialNumber: "SN-D7F3C8947687",
    dateTime,
    activated: true,
    device: "MyRaspberry-01",
    type: "MySmartIoTDevice",
    payload: {}
}

/** TOPICS
 * "core/broadcast":  The device will subscribe to a broadcast topic, this will be used to send out messages from the cloud to all IoT devices connected.
 * "topicHouse1:: This topic is used for a specific home and for an specific purpose. In this case, we can use it for send temperature data.
 */

const topicCoreBroadcast = "core/broadcast"
const topicHouse1 = "house/temperature/room1"
const topicRepublish = "core/republish"

const getSensorData = (cb) =>
    useDummyData ? getDummySensorData(cb) : sensor.read(11, 2, function (err, temperature, humidity) {
        if (!err) {
            const temperatureData = { temp: `${temperature}°C`, humidity: `${humidity}%` }
            console.log(`STEP - Sending data to AWS  IoT Core'`, temperatureData)
            console.log(`---------------------------------------------------------------------------------`)
            return cb(temperatureData)
        }
        console.log(err)
    });

const getDummySensorData = (cb) => {
    const temperatureData = { temp: '100°C', humidity: '52%' }
    return cb(temperatureData)

}

const sendData = (data) => {
    const telemetryData = {
        ...IoTDevice,
        payload: data
    }
    console.log(`STEP - Sending data to AWS  IoT Core'`, telemetryData)
    console.log(`---------------------------------------------------------------------------------`)
    return device.publish(topicHouse1, JSON.stringify(telemetryData))
}

// We connect our client to AWS  IoT core. 
device
    .on('connect', function () {
        console.log('STEP - Connecting to AWS  IoT Core');
        console.log(`---------------------------------------------------------------------------------`)
        setInterval(() => getSensorData(sendData), 3000)

    });


// Set handler for the device, it will get the messages from subscribers topics.
device
    .on('message', function (topic, payload) {
        console.log('message', topic, payload.toString());
    });

device
    .on('error', function (topic, payload) {
        console.log('Error:', topic, payload.toString());
    });