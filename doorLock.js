
var awsIot = require('aws-iot-device-sdk');

var doorLock = awsIot.device({
  keyPath: "",
  certPath: "",
  caPath: "",
  clientId: "doorLock",
  host: ""
});


doorLock.on('connect', function () {
  console.log('Door Lock connected');
  doorLock.subscribe('faceRecog/notify/door', function () {
    console.log('subscribing to the topic faceRecog/notify/door !');
  });

  doorLock.on('message', function (topic, message) {
    if (topic == 'faceRecog/notify/door') {
      var noti = JSON.parse(message.toString());
      if (noti.command == 'unlock') console.log(noti.image, ': unlock door')
      else console.log(noti.image, ': unauthenticated person')
    }
  })
});
