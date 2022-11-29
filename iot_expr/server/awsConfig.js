

import awsIot from 'aws-iot-device-sdk';
// const awsIot=require('aws-iot-device-sdk')
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)

var thingShadows = awsIot.thingShadow({
    clientId: 'Raspberry-00858',
    host: 'a23863q04fgfdc-ats.iot.us-east-1.amazonaws.com',
    keyPath: path.join(__dirname,'./AWS_Raspberry_secrets/63efc683ecde-private.pem.key'),
    certPath:path.join(__dirname, './AWS_Raspberry_secrets/63efc683ecde-certificate.pem.crt'),
    caPath: path.join(__dirname, './AWS_Raspberry_secrets/AmazonRootCA1.pem'),
    region: 'us-east-1'
});

thingShadows
    .on('status', (thingName, stat, clientToken, stateObject) => {
        console.log(JSON.stringify(stateObject.state));
    });

export default { thingShadows }; 
// module.exports=thingShadows;