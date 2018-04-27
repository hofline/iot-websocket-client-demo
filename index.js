const Client = require('node-rest-client').Client;
const AWSMqtt = require('aws-mqtt-client').default;
 
var client = new Client();
 
client.get("<auth-service-url>", function (data, response) {    
    
    console.log(data);

    let mqttc = new AWSMqtt({
        accessKeyId: data.accessKey,
        secretAccessKey: data.secretKey,
        sessionToken: data.sessionToken,
        endpointAddress: data.iotEndpoint,
        region: data.region
    });
    
    mqttc.on('connect', () => {
        mqttc.subscribe('test-topic');
        console.log('connected to iot mqtt websocket');
    });
    
    mqttc.on('message', (topic, message) => {
        console.log(message.toString());
    });

});





