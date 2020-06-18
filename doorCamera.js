var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.region = 'ap-northeast-2';
AWS.config.apiVersions = {
    s3: '2006-03-01',
};
var s3 = new AWS.S3({ 
    "accessKeyId": "",
    "secretAccessKey": ""
});

var awsIot = require('aws-iot-device-sdk');

var doorCamera = awsIot.device({
  keyPath: "",
  certPath: "",
  caPath: "",
  clientId: "doorCamera",
  host: ""
});

function createObject(params) {
  return new Promise(function (resolve, reject) {
      s3.upload(params, function (err, data) {
          if (err) reject(err);
          else resolve(data);
      })
  });
}

var v1 = async function () {
  try {
      const co_params1 = {
          Bucket: "2020-cit-sda-db",
          Key: 'visitor.png',
          Body: fs.createReadStream("./faces/chapman.png")
      };
      var res2 = await createObject(co_params1);
      console.log(res2);
      
  } catch (err) {
      console.log('-- Error --');
      console.log(err);
  }
}

var v2 = async function () {
  try {
      const co_params2 = {
          Bucket: "2020-cit-sda-db",
          Key: 'visitor.png',
          Body: fs.createReadStream("./faces/cole.png")
      };
      var res2 = await createObject(co_params2);
      console.log(res2);
      
  } catch (err) {
      console.log('-- Error --');
      console.log(err);
  }
}

var v3 = async function () {
  try {
      const co_params3 = {
          Bucket: "2020-cit-sda-db",
          Key: 'visitor.png',
          Body: fs.createReadStream("./faces/judge.png")
      };
      var res2 = await createObject(co_params3);
      console.log(res2);
      
  } catch (err) {
      console.log('-- Error --');
      console.log(err);
  }
}

var v4 = async function () {
  try {
      const co_params4 = {
          Bucket: "2020-cit-sda-db",
          Key: 'visitor.png',
          Body: fs.createReadStream("./faces/stanton.png")
      };
      var res2 = await createObject(co_params4);
      console.log(res2);
      
  } catch (err) {
      console.log('-- Error --');
      console.log(err);
  }
}

var v5 = async function () {
  try {
      const co_params5 = {
          Bucket: "2020-cit-sda-db",
          Key: 'visitor.png',
          Body: fs.createReadStream("./faces/torres.png")
      };
      var res2 = await createObject(co_params5);
      console.log(res2);
      
  } catch (err) {
      console.log('-- Error --');
      console.log(err);
  }
}

var v6 = async function () {
  try {
      const co_params6 = {
          Bucket: "2020-cit-sda-db",
          Key: 'visitor.png',
          Body: fs.createReadStream("./faces/bogaerts.png")
      };
      var res2 = await createObject(co_params6);
      console.log(res2);
      
  } catch (err) {
      console.log('-- Error --');
      console.log(err);
  }
}

var v7 = async function () {
  try {
      const co_params7 = {
          Bucket: "2020-cit-sda-db",
          Key: 'visitor.png',
          Body: fs.createReadStream("./faces/devers.png")
      };
      var res2 = await createObject(co_params7);
      console.log(res2);
      
  } catch (err) {
      console.log('-- Error --');
      console.log(err);
  }
}

var v8 = async function () {
  try {
      const co_params8 = {
          Bucket: "2020-cit-sda-db",
          Key: 'visitor.png',
          Body: fs.createReadStream("./faces/martinez.png")
      };
      var res2 = await createObject(co_params8);
      console.log(res2);
      
  } catch (err) {
      console.log('-- Error --');
      console.log(err);
  }
}

var v9 = async function () {
  try {
      const co_params9 = {
          Bucket: "2020-cit-sda-db",
          Key: 'visitor.png',
          Body: fs.createReadStream("./faces/rodriguez.png")
      };
      var res2 = await createObject(co_params9);
      console.log(res2);
      
  } catch (err) {
      console.log('-- Error --');
      console.log(err);
  }
}

var v10 = async function () {
  try {
      const co_params10 = {
          Bucket: "2020-cit-sda-db",
          Key: 'visitor.png',
          Body: fs.createReadStream("./faces/sale.png")
      };
      var res2 = await createObject(co_params10);
      console.log(res2);
      
  } catch (err) {
      console.log('-- Error --');
      console.log(err);
  }
}


doorCamera.on('connect', function () {
  console.log('Door Camera connected');

  setInterval(function () {
    var idx = Math.ceil(Math.random() * 10);
    switch(idx){
      case 1:
        v1();
        break;
      case 2:
        v2();
        break;
      case 3:
        v3();
        break;
      case 4:
        v4();
      break;
      case 5:
        v5();
      break;
      case 6:
        v6();
      break;
      case 7:
        v7();
      break;
      case 8:
        v8();
      break;
      case 9:
        v9();
      break;
      case 10:
        v10();
      break;
    }
    var message = { 'notify': 'faceRecog/notify/door'};
    console.log('publish to faceRecog/request' + JSON.stringify(message));
    doorCamera.publish('faceRecog/request', JSON.stringify(message));
  }, 10000);
});


