var awsIot = require('aws-iot-device-sdk');
require('dotenv').config();

var thingShadows = awsIot.thingShadow({
    clientId: 'RaspberryMQTTClient',
    host: process.env.ENDPOINT,
    port: 8883,
    keyPath: './AWS_Raspberry_secrets/de-private.pem.key',
    certPath: './AWS_Raspberry_secrets/de-certificate.pem.crt',
    caPath: './AWS_Raspberry_secrets/AmazonRootCA1.pem',
});

//
// Client token value returned from thingShadows.update() operation
//
var clientTokenUpdate;

//
// Simulated device values
//
var rval = 200;
var gval = 115;
var bval = 333;

thingShadows.on('connect', function () {
    thingShadows.register('RGBLedLamp', {}, function () {

        var rgbLedLampState = {
                                "state": { 
                                    "desired":{ 
                                        "red": rval,
                                        "green": gval,
                                        "blue": bval 
                                    }
                                }
                             };

        clientTokenUpdate = thingShadows.update('RGBLedLamp', rgbLedLampState);
        if (clientTokenUpdate === null) {
            console.log('update shadow failed, operation still in progress');
        }
    });
});
thingShadows.on('status',
    function (thingName, stat, clientToken, stateObject) {
        console.log('received ' + stat + ' on ' + thingName + ': ' +
            JSON.stringify(stateObject));
    });

thingShadows.on('delta',
    function (thingName, stateObject) {
        console.log('received delta on ' + thingName + ': ' +
            JSON.stringify(stateObject));
    });

thingShadows.on('timeout',
    function (thingName, clientToken) {
        console.log('received timeout on ' + thingName +
            ' with token: ' + clientToken);
    });
