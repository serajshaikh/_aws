// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
var awsIot = require('aws-iot-device-sdk');
require('dotenv').config();

const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const dateTime = date + ' ' + time;

const device = awsIot.device({
    clientId: 'RaspberryMQTTClient',
    host: process.env.ENDPOINT,
    port: 8883,
    keyPath: './AWS_Raspberry_secrets/de-private.pem.key',
    certPath: './AWS_Raspberry_secrets/de-certificate.pem.crt',
    caPath: './AWS_Raspberry_secrets/AmazonRootCA1.pem',
});

// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.

const IoTDevice = {
    serialNumber: "SN-D7F3C8947687",
    dateTime,
    activated: true,
    device: "MyRaspberry-01",
    type: "MySmartIoTDevice",
    payload: {}
}

device
  .on('connect', function() {
    console.log('connect');
    device.publish('topic_2', JSON.stringify(IoTDevice));
    device.subscribe('topic_1');
  });

device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });